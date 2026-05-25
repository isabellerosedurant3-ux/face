import Link from 'next/link';
import { Zap, ArrowLeft, Shield } from 'lucide-react';

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <nav className="bg-[#0a0a0a] border-b border-[#1a1a1a] px-4 sm:px-6 py-4 sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
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
            Retour
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <span className="text-xs font-bold tracking-widest text-violet-400 uppercase mb-3 block">Légal</span>
          <h1 className="text-3xl font-bold text-white mb-2">Politique de Confidentialité</h1>
          <p className="text-gray-500 text-sm">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        {/* Privacy commitment banner */}
        <div className="flex items-start gap-4 p-5 rounded-2xl bg-green-500/8 border border-green-500/20 mb-8">
          <Shield className="w-6 h-6 text-green-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-green-400 mb-1">Notre engagement envers votre vie privée</div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Chez FaceSwap Live, nous prenons la protection de vos données personnelles très au sérieux. Nous ne vendons jamais vos données, ne stockons pas vos images ou vidéos, et le traitement IA s&apos;effectue localement sur votre appareil.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {[
            {
              title: '1. Responsable du traitement',
              content: "FaceSwap Live est responsable du traitement de vos données personnelles. Pour toute question relative à la protection de vos données, vous pouvez nous contacter via notre support WhatsApp ou par email à l'adresse indiquée sur notre site.",
            },
            {
              title: '2. Données collectées',
              content: "Nous collectons uniquement les données strictement nécessaires au fonctionnement du Service : adresse email et informations de compte (lors de l'inscription), données de paiement traitées de manière sécurisée par PayDunya (nous ne stockons jamais les informations de carte bancaire), historique des transactions et solde de points, données d'utilisation anonymisées pour améliorer le Service. Nous ne collectons PAS et ne stockons PAS vos images, vidéos ou données biométriques.",
            },
            {
              title: '3. Traitement IA local',
              content: "La transformation faciale et corporelle s'effectue entièrement en local sur votre appareil. Aucune image de votre visage ni donnée biométrique n'est transmise à nos serveurs. Les algorithmes IA fonctionnent directement sur votre machine pour garantir votre confidentialité maximale.",
            },
            {
              title: '4. Utilisation des données',
              content: "Vos données sont utilisées exclusivement pour : gérer votre compte et authentification, traiter vos paiements et créditer vos points, vous fournir un support technique, améliorer nos services de manière anonymisée, et vous envoyer des communications essentielles liées à votre compte (jamais de spam commercial sans consentement).",
            },
            {
              title: '5. Base légale du traitement',
              content: "Le traitement de vos données repose sur : l'exécution du contrat (gestion de votre compte et du Service), notre intérêt légitime (sécurité du Service, prévention de la fraude), et votre consentement explicite pour les communications marketing optionnelles.",
            },
            {
              title: '6. Partage des données',
              content: "Nous ne vendons jamais vos données personnelles. Nous pouvons partager des données avec des tiers uniquement dans les cas suivants : prestataire de paiement PayDunya (données de transaction uniquement), fournisseur d'authentification Supabase (données de compte sécurisées), obligations légales (sur requête des autorités compétentes). Tous nos partenaires sont liés par des accords stricts de protection des données.",
            },
            {
              title: '7. Conservation des données',
              content: "Vos données de compte sont conservées tant que votre compte est actif. Après suppression du compte, les données sont effacées dans un délai de 30 jours, à l'exception des données de transaction conservées 5 ans pour des obligations légales comptables.",
            },
            {
              title: '8. Vos droits',
              content: "Conformément aux lois applicables, vous disposez des droits suivants sur vos données personnelles : droit d'accès, de rectification, d'effacement (droit à l'oubli), de limitation du traitement, à la portabilité, et d'opposition. Pour exercer ces droits, contactez-nous via notre support. Nous traiterons votre demande dans un délai de 30 jours.",
            },
            {
              title: '9. Sécurité des données',
              content: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement SSL/TLS pour toutes les communications, stockage sécurisé avec chiffrement au repos, accès aux données restreint au personnel autorisé, surveillance continue contre les accès non autorisés, et audits de sécurité réguliers.",
            },
            {
              title: '10. Cookies et technologies similaires',
              content: "Nous utilisons uniquement des cookies techniques essentiels au fonctionnement du Service (gestion de session, préférences). Nous n'utilisons pas de cookies de tracking publicitaire ou d'analyse comportementale sans votre consentement explicite.",
            },
            {
              title: '11. Modifications de la politique',
              content: "Nous pouvons mettre à jour cette politique pour refléter les changements de nos pratiques ou des obligations légales. Nous vous informerons de tout changement significatif par email ou notification dans l'application avec un préavis de 30 jours.",
            },
          ].map((section) => (
            <div key={section.title} className="p-6 rounded-2xl bg-[#111] border border-[#1e1e1e]">
              <h2 className="text-lg font-bold text-white mb-3">{section.title}</h2>
              <p className="text-gray-400 leading-relaxed text-sm">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-xl bg-violet-500/8 border border-violet-500/20 text-center">
          <p className="text-gray-400 text-sm mb-3">Des questions sur notre politique de confidentialité ?</p>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium text-sm transition-colors">
            Contactez notre équipe DPO via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
