'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Eye, EyeOff, Zap, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Suspense } from 'react';

function InscriptionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    setLoading(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        setError('Cet email est déjà utilisé. Connectez-vous.');
      } else {
        setError(signUpError.message);
      }
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push(plan ? `/dashboard/recharge?plan=${plan}` : '/dashboard');
      }, 1500);
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  const handleApple = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
  };

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Compte créé !</h2>
        <p className="text-gray-400 text-sm">Redirection en cours...</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3 mb-6">
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-[#333] text-white hover:border-violet-500/50 hover:bg-[#1a1a1a] transition-all text-sm font-medium"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuer avec Google
        </button>

        <button
          onClick={handleApple}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-black border border-[#333] text-white hover:border-violet-500/50 transition-all text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.38.07 2.35.75 3.17.8.96-.14 1.89-.84 3.03-.9 1.36-.08 2.62.52 3.44 1.44-3.08 1.95-2.34 6.1.71 7.26-.54 1.52-1.26 3.04-2.35 4.28zM12 7.3c-.13-2.62 2.12-4.87 4.77-5C17.17 5.22 14.85 7.98 12 7.3z"/>
          </svg>
          Continuer avec Apple
        </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#222]"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#111] px-3 text-gray-500">ou avec votre email</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-400 mb-2">Adresse email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="vous@exemple.com"
            className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#333] text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors text-sm"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Mot de passe</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Minimum 8 caractères"
              className="w-full px-4 py-3 pr-12 rounded-xl bg-[#1a1a1a] border border-[#333] text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors text-sm"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Confirmer le mot de passe</label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-xl bg-[#1a1a1a] border border-[#333] text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-colors text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-500 hover:to-blue-400 text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? 'Création du compte...' : 'Créer mon compte'}
        </button>

        <p className="text-xs text-gray-600 text-center">
          En créant un compte, vous acceptez nos{' '}
          <Link href="/cgu" className="text-violet-400 hover:underline">CGU</Link>{' '}
          et notre{' '}
          <Link href="/confidentialite" className="text-violet-400 hover:underline">politique de confidentialité</Link>.
        </p>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Déjà un compte ?{' '}
        <Link href="/auth/connexion" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
          Se connecter
        </Link>
      </p>
    </>
  );
}

export default function InscriptionPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">
              <span className="text-white">FaceSwap</span>
              <span className="gradient-text"> Live</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Créer un compte</h1>
          <p className="text-gray-400 text-sm">Rejoignez des milliers d&apos;utilisateurs</p>
        </div>

        <div className="card-dark rounded-2xl p-8">
          <Suspense fallback={<div className="text-gray-400 text-center py-4">Chargement...</div>}>
            <InscriptionForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
