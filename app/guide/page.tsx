'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, ArrowLeft, Download, Monitor, Video, ChevronRight, ExternalLink } from 'lucide-react';

const NDI_STEPS = [
  {
    num: 1,
    title: 'Télécharger NDI Tools',
    desc: 'Rendez-vous sur ndi.tv et téléchargez NDI Tools gratuitement. Disponible pour Windows et macOS. C\'est un ensemble d\'outils gratuits développés par Newtek/Vizrt.',
    tip: 'NDI est la méthode recommandée pour WhatsApp et Telegram car elle offre la meilleure latence.',
  },
  {
    num: 2,
    title: "Lancer l'app en mode NDI",
    desc: 'Ouvrez FaceSwap Live et accédez aux paramètres de diffusion. Activez le mode "Sortie NDI". Votre flux transformé sera visible comme source NDI sur votre réseau local.',
    tip: 'Assurez-vous que FaceSwap Live est en cours d\'exécution avant de passer à l\'étape suivante.',
  },
  {
    num: 3,
    title: 'Configurer NDI Virtual Input',
    desc: 'Dans NDI Tools, lancez "NDI Virtual Input". Une fenêtre s\'ouvre avec la liste des sources NDI disponibles. Sélectionnez votre source FaceSwap Live dans la liste.',
    tip: 'NDI Virtual Input crée une caméra virtuelle sur votre système qui peut être utilisée par toutes les applications.',
  },
  {
    num: 4,
    title: 'Utiliser dans WhatsApp/Telegram',
    desc: 'Dans les paramètres vidéo de WhatsApp Desktop, Telegram Desktop ou toute autre application, sélectionnez "NDI Virtual Input" comme périphérique caméra. Votre visage transformé apparaît en temps réel.',
    tip: 'Cette méthode fonctionne avec toutes les applications de bureau qui permettent de sélectionner une caméra.',
  },
];

const OBS_STEPS = [
  {
    num: 1,
    title: 'Télécharger OBS Studio',
    desc: 'Rendez-vous sur obsproject.com et téléchargez OBS Studio gratuitement. C\'est le logiciel de streaming et d\'enregistrement vidéo le plus populaire, utilisé par des millions de créateurs.',
    tip: 'OBS Studio est gratuit, open-source et disponible pour Windows, macOS et Linux.',
  },
  {
    num: 2,
    title: 'Installer le plugin Virtual Camera',
    desc: 'OBS Studio 26 et versions ultérieures incluent Virtual Camera nativement. Allez dans Outils > Démarrer la caméra virtuelle. Pour les versions antérieures, installez le plugin obs-virtualcam.',
    tip: 'Si vous utilisez une version récente d\'OBS, le plugin est déjà installé — inutile de le télécharger séparément.',
  },
  {
    num: 3,
    title: "Configurer la source dans l'app",
    desc: 'Dans FaceSwap Live, sélectionnez "OBS Capture" comme mode de sortie. Configurez une source de capture de fenêtre pour la fenêtre FaceSwap Live dans OBS, ou utilisez le mode de sortie direct vers OBS.',
    tip: 'Vous pouvez aussi ajouter des effets supplémentaires dans OBS par-dessus votre transformation FaceSwap.',
  },
  {
    num: 4,
    title: 'Sélectionner OBS Virtual Camera',
    desc: 'Dans les paramètres vidéo de Zoom, Teams, Skype, Twitch Studio ou toute autre application, choisissez "OBS Virtual Camera" comme périphérique caméra. Votre apparence transformée est diffusée.',
    tip: 'OBS Virtual Camera est particulièrement utile pour Zoom et Teams qui sont des applications web/bureau.',
  },
];

export default function GuidePage() {
  const [tab, setTab] = useState<'ndi' | 'obs'>('ndi');
  const steps = tab === 'ndi' ? NDI_STEPS : OBS_STEPS;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Nav */}
      <nav className="bg-[#0a0a0a] border-b border-[#1a1a1a] px-4 sm:px-6 py-4 sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-base">
              <span className="text-white">FaceSwap</span>
              <span className="gradient-text"> Live</span>
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:block">Retour à l&apos;accueil</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-3 block">Documentation</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Guide <span className="gradient-text">d&apos;installation</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Deux méthodes pour utiliser FaceSwap Live sur vos plateformes préférées. Suivez les étapes ci-dessous selon votre cas d&apos;usage.
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-[#111] border border-[#1e1e1e]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white">Guide NDI</div>
                <div className="text-xs text-violet-400">Recommandé</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Idéal pour WhatsApp Desktop, Telegram Desktop. Offre la meilleure latence et la qualité la plus élevée.
            </p>
            <div className="flex flex-wrap gap-2">
              {['WhatsApp', 'Telegram', 'Faible latence'].map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">{tag}</span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#111] border border-[#1e1e1e]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white">Guide OBS Studio</div>
                <div className="text-xs text-blue-400">Universel</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Compatible avec Zoom, Teams, TikTok Live, Twitch. Fonctionne avec pratiquement toutes les applications vidéo.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Zoom', 'Teams', 'TikTok', 'Twitch'].map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setTab('ndi')}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
              tab === 'ndi'
                ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-lg shadow-violet-500/20'
                : 'bg-[#111] border border-[#222] text-gray-400 hover:text-white'
            }`}
          >
            Guide NDI <span className={`text-xs ml-1 ${tab === 'ndi' ? 'opacity-80' : 'opacity-50'}`}>(recommandé)</span>
          </button>
          <button
            onClick={() => setTab('obs')}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
              tab === 'obs'
                ? 'bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-lg shadow-violet-500/20'
                : 'bg-[#111] border border-[#222] text-gray-400 hover:text-white'
            }`}
          >
            Guide OBS Studio
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-12">
          {steps.map((step, i) => (
            <div key={step.num} className="p-6 rounded-2xl bg-[#111] border border-[#1e1e1e] hover:border-violet-500/25 transition-colors">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center text-white font-black text-lg shrink-0">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-white text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">{step.desc}</p>
                  {step.tip && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-violet-500/8 border border-violet-500/20">
                      <ChevronRight className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                      <p className="text-violet-300 text-sm">{step.tip}</p>
                    </div>
                  )}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="ml-6 mt-4 w-0.5 h-4 bg-gradient-to-b from-violet-500/50 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Download links */}
        <div className="rounded-2xl bg-[#111] border border-[#1e1e1e] p-6 mb-8">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <Download className="w-5 h-5 text-violet-400" />
            Téléchargements nécessaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { name: 'FaceSwap Live', desc: 'Application principale', color: 'from-violet-600 to-blue-500' },
              { name: 'NDI Tools', desc: 'Pour méthode NDI', color: 'from-blue-600 to-blue-800' },
              { name: 'OBS Studio', desc: 'Pour méthode OBS', color: 'from-gray-600 to-gray-800' },
            ].map((dl) => (
              <div key={dl.name} className="flex items-center justify-between p-4 rounded-xl bg-[#0d0d0d] border border-[#1a1a1a] hover:border-violet-500/30 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${dl.color} flex items-center justify-center`}>
                    <Download className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{dl.name}</div>
                    <div className="text-gray-600 text-xs">{dl.desc}</div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-violet-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">Prêt à commencer ?</p>
          <Link
            href="/auth/inscription"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 hover:from-violet-500 hover:to-blue-400 text-white font-bold transition-all hover:scale-105"
          >
            Créer mon compte gratuitement
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
