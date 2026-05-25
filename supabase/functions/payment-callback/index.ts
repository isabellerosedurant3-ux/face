import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const PLAN_DATA: Record<string, { points: number; duree_jours: number }> = {
  starter: { points: 500, duree_jours: 1 },
  popular: { points: 6000, duree_jours: 30 },
  pro: { points: 16000, duree_jours: 90 },
  ultimate: { points: 45000, duree_jours: 365 },
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { data } = body;

    if (!data || data.status !== "completed") {
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const customData = data.custom_data || {};
    const { transaction_id, user_id, plan_id } = customData;

    if (!transaction_id || !user_id || !plan_id) {
      return new Response(JSON.stringify({ error: "Données manquantes." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: tx } = await supabase
      .from("transactions")
      .select("*")
      .eq("id", transaction_id)
      .maybeSingle();

    if (!tx || tx.statut === "completed") {
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const planData = PLAN_DATA[plan_id];
    if (!planData) {
      return new Response(JSON.stringify({ error: "Plan invalide." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + planData.duree_jours);

    const { data: currentProfile } = await supabase
      .from("profiles")
      .select("points_solde")
      .eq("id", user_id)
      .maybeSingle();

    const currentPoints = currentProfile?.points_solde || 0;

    await Promise.all([
      supabase
        .from("transactions")
        .update({ statut: "completed" })
        .eq("id", transaction_id),
      supabase
        .from("profiles")
        .update({
          points_solde: currentPoints + planData.points,
          plan_actuel: plan_id.toUpperCase(),
          date_expiration: expirationDate.toISOString(),
        })
        .eq("id", user_id),
    ]);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Erreur interne." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
