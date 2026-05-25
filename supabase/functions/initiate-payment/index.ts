import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const PLAN_DATA: Record<string, { points: number; prix: number; duree_jours: number }> = {
  starter: { points: 500, prix: 2500, duree_jours: 1 },
  popular: { points: 6000, prix: 9900, duree_jours: 30 },
  pro: { points: 16000, prix: 24900, duree_jours: 90 },
  ultimate: { points: 45000, prix: 59900, duree_jours: 365 },
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { plan_id, payment_method, nom, telephone, user_id, email } = await req.json();

    if (!plan_id || !payment_method || !nom || !telephone || !user_id) {
      return new Response(
        JSON.stringify({ error: "Paramètres manquants." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const planData = PLAN_DATA[plan_id];
    if (!planData) {
      return new Response(
        JSON.stringify({ error: "Plan invalide." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const paydunya_master_key = Deno.env.get("PAYDUNYA_MASTER_KEY") || "";
    const paydunya_private_key = Deno.env.get("PAYDUNYA_PRIVATE_KEY") || "";
    const paydunya_token = Deno.env.get("PAYDUNYA_TOKEN") || "";
    const app_url = Deno.env.get("APP_URL") || "https://faceswaplive.com";

    const isPaydunyaConfigured = paydunya_master_key && paydunya_private_key && paydunya_token;

    // Create pending transaction
    const { data: transaction, error: txError } = await supabase
      .from("transactions")
      .insert({
        user_id,
        plan_id,
        montant: planData.prix,
        points_ajoutes: planData.points,
        statut: "pending",
        paydunya_token: "",
      })
      .select()
      .single();

    if (txError || !transaction) {
      return new Response(
        JSON.stringify({ error: "Erreur lors de la création de la transaction." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (isPaydunyaConfigured) {
      // PayDunya integration
      const paydunyaPayload = {
        invoice: {
          total_amount: planData.prix,
          description: `FaceSwap Live - Plan ${plan_id.toUpperCase()} - ${planData.points} points`,
          items: {
            [plan_id]: {
              name: `Plan ${plan_id.toUpperCase()}`,
              quantity: 1,
              unit_price: planData.prix,
              total_price: planData.prix,
            },
          },
        },
        store: {
          name: "FaceSwap Live",
          tagline: "Transformation faciale en temps réel",
          postal_address: "Abidjan, Côte d'Ivoire",
        },
        actions: {
          cancel_url: `${app_url}/dashboard/recharge?plan=${plan_id}&status=cancelled`,
          return_url: `${app_url}/dashboard?payment=success`,
          callback_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/payment-callback`,
        },
        custom_data: {
          transaction_id: transaction.id,
          user_id,
          plan_id,
        },
        customer: {
          name: nom,
          phone: telephone,
          email: email || "",
        },
      };

      const paydunyaMode = Deno.env.get("PAYDUNYA_MODE") || "test";
      const baseUrl = paydunyaMode === "live"
        ? "https://app.paydunya.com/api/v1"
        : "https://app.paydunya.com/sandbox-api/v1";

      const pdResponse = await fetch(`${baseUrl}/checkout-invoice/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "PAYDUNYA-MASTER-KEY": paydunya_master_key,
          "PAYDUNYA-PRIVATE-KEY": paydunya_private_key,
          "PAYDUNYA-TOKEN": paydunya_token,
        },
        body: JSON.stringify(paydunyaPayload),
      });

      const pdData = await pdResponse.json();

      if (pdData.response_code === "00" && pdData.invoice_url) {
        // Update transaction with PayDunya token
        await supabase
          .from("transactions")
          .update({ paydunya_token: pdData.token || "" })
          .eq("id", transaction.id);

        return new Response(
          JSON.stringify({ payment_url: pdData.invoice_url, transaction_id: transaction.id }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } else {
        await supabase.from("transactions").update({ statut: "failed" }).eq("id", transaction.id);
        return new Response(
          JSON.stringify({ error: pdData.response_text || "Erreur PayDunya." }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else {
      // PayDunya not configured: simulate (dev mode) - complete transaction
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + planData.duree_jours);

      const { data: currentProfile } = await supabase
        .from("profiles")
        .select("points_solde")
        .eq("id", user_id)
        .maybeSingle();

      const currentPoints = currentProfile?.points_solde || 0;

      await Promise.all([
        supabase.from("transactions").update({ statut: "completed" }).eq("id", transaction.id),
        supabase.from("profiles").update({
          points_solde: currentPoints + planData.points,
          plan_actuel: plan_id.toUpperCase(),
          date_expiration: expirationDate.toISOString(),
        }).eq("id", user_id),
      ]);

      return new Response(
        JSON.stringify({ success: true, transaction_id: transaction.id }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Erreur interne du serveur." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
