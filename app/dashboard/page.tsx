'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase, type Profile, type Transaction } from '@/lib/supabase';
import {
  Zap,
  Clock,
  Calendar,
  ShoppingCart,
  Download,
  LogOut,
  ChevronRight,
  CreditCard,
  BookOpen,
  AlertCircle,
  Loader2,
} from 'lucide-react';

function secondesToDuration(sec: number): string {
  if (sec < 60) return `${sec} sec`;
  const min = Math.floor(sec / 60);
  const rem = sec % 60;
  if (min < 60) return rem > 0 ? `${min} min ${rem} sec` : `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

function formatDate(date: string | null): string {
  if (!date) return 'Aucun plan actif';
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/connexion');
        return;
      }
      const [{ data: prof }, { data: txs }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(20),
      ]);
      setProfile(prof);
      setTransactions(txs || []);
      setLoading(false);
    })();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin" />
          Chargement...
        </div>
      </div>
    );
  }

  const secondesRestantes = profile ? Math.floor(profile.points_solde / 2) : 0;
  const isExpired = profile?.date_expiration ? new Date(profile.date_expiration) < new Date() : true;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Top nav */}
      <nav className="bg-[#0a0a0a] border-b border-[#1a1a1a] px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">
              <span className="text-white">FaceSwap</span>
              <span className="gradient-text"> Live</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">{profile?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white px-3 py-2 rounded-lg border border-[#222] hover:border-[#333] transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Déconnexion</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            Bonjour, {profile?.nom || 'Utilisateur'}
          </h1>
          <p className="text-gray-500 text-sm">Bienvenue sur votre tableau de bord</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Points */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-900/30 to-[#111] border border-violet-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-violet-400" />
              </div>
              <span className="text-gray-400 text-sm font-medium">Solde de points</span>
            </div>
            <div className="text-4xl font-black text-white mb-1">
              {profile?.points_solde?.toLocaleString('fr-FR') ?? 0}
            </div>
            <div className="text-violet-400 text-sm">points disponibles</div>
          </div>

          {/* Time */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/30 to-[#111] border border-blue-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <span className="text-gray-400 text-sm font-medium">Temps restant</span>
            </div>
            <div className="text-4xl font-black text-white mb-1">
              {secondesToDuration(secondesRestantes)}
            </div>
            <div className="text-blue-400 text-sm">de transformation</div>
          </div>

          {/* Expiration */}
          <div className={`p-6 rounded-2xl border ${isExpired ? 'bg-red-900/10 border-red-500/20' : 'bg-green-900/10 border-green-500/20'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isExpired ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
                <Calendar className={`w-5 h-5 ${isExpired ? 'text-red-400' : 'text-green-400'}`} />
              </div>
              <span className="text-gray-400 text-sm font-medium">Expiration du plan</span>
            </div>
            <div className={`text-lg font-bold mb-1 ${isExpired ? 'text-red-400' : 'text-white'}`}>
              {formatDate(profile?.date_expiration ?? null)}
            </div>
            <div className={`text-sm ${isExpired ? 'text-red-500' : 'text-green-400'}`}>
              {profile?.plan_actuel || 'Aucun plan actif'}
            </div>
          </div>
        </div>

        {/* Alert if no plan */}
        {(!profile?.points_solde || profile.points_solde === 0) && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-8">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-amber-400 font-medium text-sm mb-1">Aucun point disponible</div>
              <div className="text-gray-400 text-sm">Rechargez votre compte pour commencer à utiliser FaceSwap Live.</div>
            </div>
            <Link href="/dashboard/recharge" className="ml-auto shrink-0 px-4 py-2 rounded-lg bg-amber-500 text-black text-sm font-bold hover:bg-amber-400 transition-colors">
              Recharger
            </Link>
          </div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link
            href="/dashboard/recharge"
            className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-500 hover:to-blue-400 transition-all group"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-white" />
              <div>
                <div className="text-white font-bold">Recharger mes points</div>
                <div className="text-white/70 text-xs">Acheter un plan</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#"
            className="flex items-center justify-between p-5 rounded-2xl bg-[#111] border border-[#222] hover:border-violet-500/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <Download className="w-6 h-6 text-violet-400" />
              <div>
                <div className="text-white font-semibold">Télécharger l&apos;app</div>
                <div className="text-gray-500 text-xs">Windows &amp; macOS</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
          </a>

          <Link
            href="/guide"
            className="flex items-center justify-between p-5 rounded-2xl bg-[#111] border border-[#222] hover:border-violet-500/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-400" />
              <div>
                <div className="text-white font-semibold">Guides NDI &amp; OBS</div>
                <div className="text-gray-500 text-xs">Tutoriels d&apos;installation</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Transaction history */}
        <div className="rounded-2xl bg-[#111] border border-[#1e1e1e] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-violet-400" />
              <h2 className="text-white font-semibold">Historique des achats</h2>
            </div>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-16 text-gray-600">
              <CreditCard className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">Aucune transaction pour le moment</p>
              <Link href="/dashboard/recharge" className="text-violet-400 hover:underline text-sm mt-2 inline-block">
                Effectuer un premier achat
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-600 uppercase tracking-wider">
                    <th className="text-left px-6 py-3 bg-[#0d0d0d]">Date</th>
                    <th className="text-left px-6 py-3 bg-[#0d0d0d]">Plan</th>
                    <th className="text-left px-6 py-3 bg-[#0d0d0d]">Montant</th>
                    <th className="text-left px-6 py-3 bg-[#0d0d0d]">Points</th>
                    <th className="text-left px-6 py-3 bg-[#0d0d0d]">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1a1a1a]">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#141414] transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(tx.created_at).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="px-6 py-4 text-sm text-white font-medium uppercase">{tx.plan_id}</td>
                      <td className="px-6 py-4 text-sm text-white">{tx.montant.toLocaleString('fr-FR')} FCFA</td>
                      <td className="px-6 py-4 text-sm text-violet-400 font-medium">+{tx.points_ajoutes.toLocaleString('fr-FR')}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          tx.statut === 'completed' ? 'bg-green-500/15 text-green-400 border border-green-500/20' :
                          tx.statut === 'pending' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' :
                          'bg-red-500/15 text-red-400 border border-red-500/20'
                        }`}>
                          {tx.statut === 'completed' ? 'Complété' : tx.statut === 'pending' ? 'En attente' : 'Échoué'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
