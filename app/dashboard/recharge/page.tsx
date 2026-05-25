'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase, type Plan } from '@/lib/supabase';
import { Zap, Check, Star, Shield, ArrowLeft, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

const PLAN_COLORS: Record<string, string> = {
  starter: 'from-blue-600 to-blue-800',
  popular: 'from-violet-600 to-blue-600',
  pro: 'from-violet-700 to-violet-500',
  ultimate: 'from-amber-500 to-orange-600',
};

const PAYMENT_METHODS = [
  { id: 'orange_money', label: 'Orange Money', color: '#FF6600' },
  { id: 'mtn_momo', label: 'MTN MoMo', color: '#FFCC00' },
  { id: 'wave', label: 'Wave', color: '#1BA8F1' },
  { id: 'djamo', label: 'Djamo', color: '#5B21B6' },
  { id: 'carte', label: 'Carte bancaire', color: '#1a56db' },
];

function RechargeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get('plan') || 'popular';

  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>(initialPlan);
  const [paymentMethod, setPaymentMethod] = useState('orange_money');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [loading, setLoading] = useState(false);
  const [plansLoading, setPlansLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/connexion');
        return;
      }
      const { data: prof } = await supabase.from('profiles').select('nom').eq('id', user.id).maybeSingle();
      if (prof?.nom) setNom(prof.nom);

      const { data: plansData } = await supabase.from('plans').select('*').order('prix');
      if (plansData) setPlans(plansData);
      setPlansLoading(false);
    })();
  }, [router]);

  const currentPlan = plans.find((p) => p.id === selectedPlan);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!currentPlan) return;
    if (!nom.trim()) { setError('Veuillez saisir votre nom complet.'); return; }
    if (!telephone.trim()) { setError('Veuillez saisir votre numéro de téléphone.'); return; }
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/auth/connexion'); return; }

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

      const response = await fetch(`${supabaseUrl}/functions/v1/initiate-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          plan_id: selectedPlan,
          payment_method: paymentMethod,
          nom,
          telephone,
          user_id: user.id,
          email: user.email,
        }),
      });

      const result = await response.json();
      if (!response.ok || result.error) {
        setError(result.error || 'Erreur lors de l\'initialisation du paiement.');
      } else if (result.payment_url) {
        window.location.href = result.payment_url;
      } else {
        setSuccess(true);
        setTimeout(() => router.push('/dashboard'), 2000);
      }
    } catch {
      setError('Erreur de connexion. Réessayez.');
    }
    setLoading(false);
  };

  if (plansLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-violet-400" />
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Paiement initié !</h2>
        <p className="text-gray-400">Redirection vers votre tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {/* Plan selection */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Choisissez votre plan</h2>
        <div className="space-y-3 mb-6">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                selectedPlan === plan.id
                  ? 'border-violet-500 bg-violet-500/10'
                  : 'border-[#222] bg-[#111] hover:border-violet-500/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${PLAN_COLORS[plan.id] || 'from-gray-600 to-gray-700'} flex items-center justify-center`}>
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{plan.nom}</span>
                      {plan.populaire && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30">
                          Populaire
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{plan.points.toLocaleString('fr-FR')} points · {plan.qualite}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-black text-white">{plan.prix.toLocaleString('fr-FR')} FCFA</div>
                  <div className="text-xs text-gray-500">{plan.duree_jours} jour{plan.duree_jours > 1 ? 's' : ''}</div>
                </div>
              </div>
              {selectedPlan === plan.id && (
                <div className="mt-3 pt-3 border-t border-violet-500/20">
                  <ul className="space-y-1">
                    {plan.description.split(' · ').map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-[#0d0d0d] border border-[#1a1a1a]">
          <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wider">Récapitulatif</div>
          {currentPlan && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Plan</span>
                <span className="text-white font-medium">{currentPlan.nom}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Points</span>
                <span className="text-violet-400 font-medium">{currentPlan.points.toLocaleString('fr-FR')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Durée</span>
                <span className="text-white">{currentPlan.duree_jours} jour{currentPlan.duree_jours > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between border-t border-[#222] pt-2 mt-2">
                <span className="text-white font-bold">Total</span>
                <span className="text-white font-black text-lg">{currentPlan.prix.toLocaleString('fr-FR')} FCFA</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment form */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Informations de paiement</h2>
        <form onSubmit={handlePayment} className="space-y-5">
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-400 mb-2">Nom complet</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              placeholder="Votre nom et prénom"
              className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#333] text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Numéro de téléphone</label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              required
              placeholder="+225 07 00 00 00 00"
              className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#333] text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-3">Moyen de paiement</label>
            <div className="grid grid-cols-1 gap-2">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === m.id
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-[#222] bg-[#1a1a1a] hover:border-violet-500/30'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: paymentMethod === m.id ? '#7C3AED' : '#444' }}>
                    {paymentMethod === m.id && <div className="w-2 h-2 rounded-full bg-violet-500"></div>}
                  </div>
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: m.color }}></div>
                  <span className="text-sm text-white">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !currentPlan}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-500 hover:to-blue-400 text-white font-bold text-base transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            {loading ? 'Traitement...' : `Payer ${currentPlan?.prix.toLocaleString('fr-FR') ?? ''} FCFA`}
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
            <Shield className="w-3.5 h-3.5" />
            Paiement sécurisé via <span className="text-violet-400">PayDunya</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RechargePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="bg-[#0a0a0a] border-b border-[#1a1a1a] px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Retour au tableau de bord
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Recharger mes points</h1>
          <p className="text-gray-400 text-sm">Choisissez un plan et procédez au paiement sécurisé</p>
        </div>

        <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-violet-400" /></div>}>
          <RechargeForm />
        </Suspense>
      </div>
    </div>
  );
}
