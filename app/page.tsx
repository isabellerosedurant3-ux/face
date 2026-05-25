'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ChevronDown,
  Check,
  Zap,
  Shield,
  Star,
  Play,
  MessageCircle,
  ArrowRight,
  Monitor,
  Video,
  Users,
  Globe,
} from 'lucide-react';

const AVATARS = [
  { name: 'Léa', img: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
  { name: 'Marcus', img: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
  { name: 'Aisha', img: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
  { name: 'Karim', img: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
  { name: 'Sofia', img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
  { name: 'Dylan', img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
];

const PLATFORMS = [
  { name: 'WhatsApp', color: '#25D366' },
  { name: 'Telegram', color: '#2AABEE' },
  { name: 'Zoom', color: '#2D8CFF' },
  { name: 'TikTok', color: '#FF0050' },
  { name: 'Meet', color: '#00897B' },
  { name: 'Teams', color: '#464EB8' },
  { name: 'Facebook', color: '#1877F2' },
  { name: 'Discord', color: '#5865F2' },
];

const PLANS = [
  {
    id: 'starter',
    nom: 'STARTER',
    duree: '1 JOUR',
    prix: '2 500 FCFA',
    features: ['500 points (4 min 10 sec)', 'Qualité HD 1080p', 'Valable 24 heures'],
    populaire: false,
    badgeColor: 'from-blue-600 to-blue-800',
  },
  {
    id: 'popular',
    nom: 'POPULAR',
    duree: '30 JOURS',
    prix: '9 900 FCFA',
    features: ['6 000 points (50 minutes)', 'Qualité HD 1080p', 'Support prioritaire', 'Valable 1 mois'],
    populaire: true,
    badgeColor: 'from-violet-600 to-blue-600',
  },
  {
    id: 'pro',
    nom: 'PRO',
    duree: '90 JOURS',
    prix: '24 900 FCFA',
    features: ['16 000 points (133 minutes)', 'Qualité 4K Ultra HD', 'Support prioritaire', 'Valable 3 mois'],
    populaire: false,
    badgeColor: 'from-violet-700 to-violet-500',
  },
  {
    id: 'ultimate',
    nom: 'ULTIMATE',
    duree: '365 JOURS',
    prix: '59 900 FCFA',
    features: ['45 000 points (375 minutes)', 'Qualité 4K Ultra HD', 'Support VIP 24/7', 'Avant-premières incluses'],
    populaire: false,
    badgeColor: 'from-amber-500 to-orange-600',
  },
];

const FAQ_ITEMS = [
  {
    q: "Qu'est-ce que FaceSwap Live ?",
    a: "FaceSwap Live est une application de transformation faciale et corporelle en temps réel alimentée par intelligence artificielle. Elle vous permet de changer instantanément votre apparence pendant vos appels vidéo, streams et conférences en ligne.",
  },
  {
    q: "Fonctionne-t-il avec WhatsApp, Zoom et Teams ?",
    a: "Oui ! FaceSwap Live est compatible avec WhatsApp, Zoom, Microsoft Teams, Telegram, TikTok, Google Meet, Facebook Live et Discord. Via le guide NDI ou OBS Virtual Camera.",
  },
  {
    q: "Comment fonctionnent les points ?",
    a: "Chaque seconde de transformation consomme 2 points. Par exemple, avec 500 points vous obtenez 250 secondes (4 min 10 sec) de transformation. Les points sont déduits en temps réel pendant l'utilisation.",
  },
  {
    q: "Mes données sont-elles sécurisées ?",
    a: "Absolument. Nous utilisons un chiffrement de bout en bout et ne stockons jamais vos images ou vidéos. Le traitement s'effectue localement sur votre appareil. Votre vie privée est notre priorité.",
  },
  {
    q: "Comment contacter le support ?",
    a: "Notre équipe est disponible via WhatsApp pour une assistance rapide. Les abonnés Pro et Ultimate bénéficient d'un support prioritaire avec temps de réponse garanti sous 2h.",
  },
];

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [guideTab, setGuideTab] = useState<'ndi' | 'obs'>('ndi');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ndiSteps = [
    { num: 1, title: 'Télécharger NDI Tools', desc: 'Rendez-vous sur ndi.tv et téléchargez NDI Tools gratuitement pour votre système.' },
    { num: 2, title: "Lancer l'app en mode NDI", desc: 'Dans FaceSwap Live, activez le mode sortie NDI dans les paramètres de diffusion.' },
    { num: 3, title: 'Configurer NDI Virtual Input', desc: 'Lancez NDI Virtual Input et sélectionnez votre source FaceSwap Live dans la liste.' },
    { num: 4, title: 'Utiliser dans WhatsApp/Telegram', desc: 'Dans vos paramètres vidéo, sélectionnez "NDI Virtual Input" comme caméra.' },
  ];

  const obsSteps = [
    { num: 1, title: 'Télécharger OBS Studio', desc: 'Téléchargez OBS Studio gratuitement sur obsproject.com pour votre plateforme.' },
    { num: 2, title: 'Installer le plugin Virtual Camera', desc: 'OBS 26+ inclut Virtual Camera nativement. Activez-le dans Outils > Virtual Camera.' },
    { num: 3, title: "Configurer la source dans l'app", desc: 'Dans FaceSwap Live, sélectionnez la sortie vers OBS ou configurez une source de capture.' },
    { num: 4, title: 'Sélectionner OBS Virtual Camera', desc: 'Dans toutes vos applications vidéo, choisissez "OBS Virtual Camera" comme périphérique.' },
  ];

  const guideSteps = guideTab === 'ndi' ? ndiSteps : obsSteps;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-white">FaceSwap</span>
                <span className="gradient-text"> Live</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              {[['Accueil', '/'], ['Comment ça marche', '#comment'], ['Tarifs', '#tarifs'], ['FAQ', '#faq'], ['Guide', '/guide']].map(([label, href]) => (
                <a key={label} href={href} className="text-sm text-gray-400 hover:text-white transition-colors">{label}</a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/auth/connexion" className="text-sm text-gray-300 hover:text-white px-4 py-2 rounded-lg border border-[#333] hover:border-violet-500 transition-all">
                Connexion
              </Link>
              <Link href="/auth/inscription" className="text-sm text-white px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-500 hover:to-blue-400 transition-all font-medium">
                S&apos;inscrire
              </Link>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden flex flex-col gap-1 p-2">
              <span className="w-5 h-0.5 bg-white block"></span>
              <span className="w-5 h-0.5 bg-white block"></span>
              <span className="w-5 h-0.5 bg-white block"></span>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#111] border-t border-[#222] px-4 py-4 space-y-3">
            {[['Tarifs', '#tarifs'], ['FAQ', '#faq'], ['Guide', '/guide']].map(([label, href]) => (
              <a key={label} href={href} className="block text-gray-300 hover:text-white py-2 text-sm">{label}</a>
            ))}
            <div className="flex gap-3 pt-2">
              <Link href="/auth/connexion" className="flex-1 text-center text-sm text-gray-300 px-3 py-2 rounded-lg border border-[#333]">Connexion</Link>
              <Link href="/auth/inscription" className="flex-1 text-center text-sm text-white px-3 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-500">S&apos;inscrire</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-24 left-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-3xl"></div>
          <div className="absolute top-48 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-violet-500/40 mb-8">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse-badge"></span>
            <span className="text-sm font-bold text-violet-400 tracking-widest">AI LIVE</span>
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-badge" style={{ animationDelay: '0.75s' }}></span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
            <span className="text-white">CHANGE DE VISAGE</span>
            <br />
            <span className="text-white">ET TON CORPS </span>
            <span className="shimmer-text">ENTIER</span>
            <br />
            <span className="text-white">EN </span>
            <span className="gradient-text">TEMPS RÉEL</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Transforme instantanément ton apparence pendant tes streams, appels WhatsApp, Telegram, Zoom, Teams et autres plateformes vidéo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="/auth/inscription" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-500 hover:to-blue-400 text-white font-bold text-lg transition-all hover:scale-105">
              Commencer maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#333] hover:border-violet-500 text-white font-semibold text-lg transition-all hover:bg-[#111]">
              <MessageCircle className="w-5 h-5" />
              Nous contacter
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {[
              { icon: <Zap className="w-4 h-4" />, label: 'Temps réel' },
              { icon: <Shield className="w-4 h-4" />, label: 'Sécurisé' },
              { icon: <Star className="w-4 h-4" />, label: 'Haute qualité' },
              { icon: <Check className="w-4 h-4" />, label: 'Sans délai' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-[#1e1e1e] text-sm text-gray-300">
                <span className="text-green-400">{icon}</span>
                {label}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 max-w-xl mx-auto">
            {AVATARS.map((avatar) => (
              <div key={avatar.name} className="flex flex-col items-center gap-2 group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-[#333] group-hover:ring-violet-500 transition-all">
                  <img src={avatar.img} alt={avatar.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-xs text-gray-500 group-hover:text-white transition-colors">{avatar.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In Action */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-3 block">Démonstration</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Regardez transformer <span className="gradient-text">en temps réel</span>
            </h2>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-[#111] border border-[#222] aspect-video mb-10 group cursor-pointer">
            <img
              src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1280"
              alt="Demo FaceSwap Live"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 flex items-center justify-center animate-pulse-glow group-hover:scale-110 transition-transform shadow-2xl shadow-violet-500/30">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 rounded-full px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs text-white font-medium">TEMPS RÉEL</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-5">Compatible avec toutes vos plateformes</p>
            <div className="flex flex-wrap justify-center gap-3">
              {PLATFORMS.map((p) => (
                <div key={p.name} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111] border border-[#222] hover:border-violet-500/40 transition-all">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }}></div>
                  <span className="text-sm font-medium text-gray-300">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="comment" className="py-20 px-4 bg-[#080808]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-3 block">Processus</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Comment ça <span className="gradient-text">marche</span> ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-white" />,
                title: "Inscris-toi",
                desc: "Crée ton compte et accède instantanément à toutes les fonctionnalités de la plateforme.",
              },
              {
                icon: <Monitor className="w-8 h-8 text-white" />,
                title: "Choisis ton apparence",
                desc: "Sélectionne le visage et le corps que tu veux utiliser parmi notre bibliothèque d'avatars.",
              },
              {
                icon: <Video className="w-8 h-8 text-white" />,
                title: "Lance ton stream ou appel",
                desc: "Utilise FaceSwap Live sur toutes tes plateformes préférées en temps réel.",
              },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#111] border border-[#222] hover:border-violet-500/30 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-violet-500/20">
                  {step.icon}
                </div>
                <div className="text-xs font-bold text-violet-400 tracking-widest mb-2">ÉTAPE {i + 1}</div>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-3 block">Abonnements</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Choisissez votre <span className="gradient-text">plan</span>
            </h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-violet-500/30 text-sm text-violet-300 mb-8">
              <Zap className="w-3.5 h-3.5" />
              <span>Règle : <strong>2 points = 1 seconde</strong> de transformation</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 flex flex-col transition-all hover:-translate-y-1 duration-200 ${
                  plan.populaire
                    ? 'bg-gradient-to-b from-violet-900/30 to-[#111] border-2 border-violet-500 shadow-2xl shadow-violet-500/20'
                    : 'bg-[#111] border border-[#222] hover:border-violet-500/40'
                }`}
              >
                {plan.populaire && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 text-xs font-bold text-white whitespace-nowrap shadow-lg">
                      MEILLEUR CHOIX
                    </span>
                  </div>
                )}
                <div className="mb-5">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${plan.badgeColor} text-white text-xs font-bold tracking-wider mb-3`}>
                    <Star className="w-3 h-3" />
                    {plan.nom}
                  </div>
                  <div className="text-gray-500 text-xs mb-2 font-medium">{plan.duree}</div>
                  <div className="text-3xl font-black text-white">{plan.prix}</div>
                </div>
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/auth/inscription?plan=${plan.id}`}
                  className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.populaire
                      ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white hover:from-violet-500 hover:to-blue-400'
                      : 'border border-[#333] text-gray-300 hover:border-violet-500 hover:text-white hover:bg-violet-500/5'
                  }`}
                >
                  Choisir ce plan
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-600 mb-4 uppercase tracking-wider">Moyens de paiement acceptés</p>
            <div className="flex flex-wrap justify-center gap-3 mb-3">
              {['Orange Money', 'MTN MoMo', 'Wave', 'Djamo', 'Carte bancaire'].map((m) => (
                <span key={m} className="px-4 py-2 rounded-lg bg-[#111] border border-[#222] text-sm text-gray-400">{m}</span>
              ))}
            </div>
            <p className="text-xs text-gray-600 flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Paiement sécurisé via <span className="text-violet-400 font-medium">PayDunya</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 bg-[#080808]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-3 block">Questions</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Questions <span className="gradient-text">fréquentes</span>
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className="rounded-xl bg-[#111] border border-[#1e1e1e] overflow-hidden hover:border-violet-500/25 transition-colors">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left gap-4"
                >
                  <span className="font-medium text-white text-sm sm:text-base">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-violet-400 transition-transform shrink-0 ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-5 border-t border-[#1e1e1e]">
                    <p className="text-gray-400 text-sm leading-relaxed pt-4">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guide */}
      <section id="guide-section" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-3 block">Installation</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Guide <span className="gradient-text">d&apos;installation</span>
            </h2>
            <p className="text-gray-400 text-sm">Configurez FaceSwap Live en quelques minutes</p>
          </div>

          <div className="flex justify-center gap-3 mb-10">
            {(['ndi', 'obs'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setGuideTab(t)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  guideTab === t
                    ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white'
                    : 'bg-[#111] border border-[#222] text-gray-400 hover:text-white'
                }`}
              >
                {t === 'ndi' ? 'Guide NDI (recommandé)' : 'Guide OBS Studio'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {guideSteps.map((step) => (
              <div key={step.num} className="p-6 rounded-2xl bg-[#111] border border-[#1e1e1e] hover:border-violet-500/30 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0 group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>
                  <h3 className="font-bold text-white text-sm">{step.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed pl-12">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/guide" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium transition-colors">
              Voir le guide complet détaillé
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#141414] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg">
                  <span className="text-white">FaceSwap</span>
                  <span className="gradient-text"> Live</span>
                </span>
              </Link>
              <p className="text-gray-600 text-sm max-w-xs leading-relaxed">Transformation faciale en temps réel alimentée par intelligence artificielle.</p>
            </div>

            <div className="flex flex-wrap gap-10 text-sm">
              <div>
                <div className="text-gray-300 font-semibold mb-3">Navigation</div>
                <div className="space-y-2 text-gray-500">
                  {[['Accueil', '/'], ['Tarifs', '/#tarifs'], ['Guide', '/guide']].map(([l, h]) => (
                    <Link key={l} href={h} className="block hover:text-white transition-colors">{l}</Link>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-gray-300 font-semibold mb-3">Légal</div>
                <div className="space-y-2 text-gray-500">
                  <Link href="/cgu" className="block hover:text-white transition-colors">CGU</Link>
                  <Link href="/confidentialite" className="block hover:text-white transition-colors">Confidentialité</Link>
                </div>
              </div>
              <div>
                <div className="text-gray-300 font-semibold mb-3">Support</div>
                <div className="space-y-2 text-gray-500">
                  <Link href="/guide" className="block hover:text-white transition-colors">Guide d&apos;installation</Link>
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Contact WhatsApp
                  </a>
                </div>
              </div>
              <div>
                <div className="text-gray-300 font-semibold mb-3">Contact</div>
                <div className="space-y-2 text-gray-500">
                  <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Support WhatsApp
                  </a>
                  <Link href="/cgu" className="block hover:text-white transition-colors">CGU</Link>
                  <Link href="/confidentialite" className="block hover:text-white transition-colors">Politique de confidentialité</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#141414] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-700 text-xs">© {new Date().getFullYear()} FaceSwap Live. Tous droits réservés.</p>
            <div className="flex items-center gap-2 text-gray-700 text-xs">
              <Globe className="w-3.5 h-3.5" />
              Français
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
