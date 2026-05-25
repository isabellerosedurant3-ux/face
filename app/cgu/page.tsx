import Link from 'next/link';
import { Zap, ArrowLeft } from 'lucide-react';

export default function CGUPage() {
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
          <h1 className="text-3xl font-bold text-white mb-2">Conditions Générales d&apos;Utilisation</h1>
          <p className="text-gray-500 text-sm">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          {[
            {
              title: '1. Acceptation des conditions',
              content: "En accédant et en utilisant l'application FaceSwap Live (ci-après \"le Service\"), vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions dans leur intégralité, vous ne devez pas utiliser le Service. Ces conditions peuvent être mises à jour à tout moment ; la poursuite de l'utilisation du Service après modification constitue une acceptation des nouvelles conditions.",
            },
            {
              title: '2. Description du service',
              content: "FaceSwap Live est une application de transformation faciale et corporelle en temps réel utilisant l'intelligence artificielle. Le Service permet aux utilisateurs de modifier leur apparence lors d'appels vidéo, de streams en ligne et d'autres communications vidéo numériques. Le Service fonctionne via un système de points consommés à raison de 2 points par seconde d'utilisation.",
            },
            {
              title: '3. Compte utilisateur',
              content: "Pour accéder au Service, vous devez créer un compte en fournissant des informations exactes et complètes. Vous êtes responsable de la confidentialité de vos identifiants et de toutes les activités effectuées sous votre compte. Vous devez nous informer immédiatement de toute utilisation non autorisée. Nous nous réservons le droit de suspendre ou de supprimer tout compte en cas de violation des présentes conditions.",
            },
            {
              title: '4. Utilisation acceptable',
              content: "Vous vous engagez à utiliser le Service uniquement à des fins légales et conformément aux présentes conditions. Il est strictement interdit d'utiliser le Service pour usurper l'identité d'une personne sans son consentement, créer du contenu trompeur ou frauduleux, diffuser du contenu illégal, pornographique ou haineux, contourner les mesures de sécurité, ou porter atteinte aux droits de tiers.",
            },
            {
              title: '5. Système de points et paiements',
              content: "L'utilisation du Service nécessite l'achat de points. Les points sont non remboursables, non transférables et ont une durée de validité définie par le plan choisi. Les prix sont indiqués en francs CFA (FCFA). Les paiements sont traités de manière sécurisée via PayDunya. En cas d'échec de paiement, aucun point ne sera crédité. Nous nous réservons le droit de modifier les tarifs avec un préavis de 30 jours.",
            },
            {
              title: '6. Propriété intellectuelle',
              content: "L'ensemble des éléments composant le Service (logiciels, algorithmes IA, interfaces, marques, logos) sont la propriété exclusive de FaceSwap Live ou de ses partenaires et sont protégés par les lois applicables en matière de propriété intellectuelle. Toute reproduction, distribution ou utilisation non autorisée est strictement interdite.",
            },
            {
              title: '7. Limitation de responsabilité',
              content: "Le Service est fourni \"en l'état\" sans garantie d'aucune sorte. Nous ne saurions être tenus responsables des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser le Service. Notre responsabilité maximale est limitée au montant des sommes payées au cours des 30 derniers jours.",
            },
            {
              title: '8. Protection des données personnelles',
              content: "La collecte et le traitement de vos données personnelles sont régis par notre Politique de Confidentialité, intégrée aux présentes conditions par référence. Nous nous engageons à ne pas vendre vos données personnelles à des tiers et à les protéger conformément aux lois applicables.",
            },
            {
              title: '9. Résiliation',
              content: "Vous pouvez résilier votre compte à tout moment en contactant notre support. Nous nous réservons le droit de suspendre ou de résilier votre accès au Service sans préavis en cas de violation des présentes conditions. La résiliation n'ouvre pas droit au remboursement des points non utilisés.",
            },
            {
              title: '10. Droit applicable',
              content: "Les présentes conditions sont régies par les lois en vigueur. Tout litige sera soumis à la juridiction compétente. En cas de désaccord, nous vous encourageons à nous contacter d'abord via notre support WhatsApp pour une résolution amiable.",
            },
          ].map((section) => (
            <div key={section.title} className="p-6 rounded-2xl bg-[#111] border border-[#1e1e1e]">
              <h2 className="text-lg font-bold text-white mb-3">{section.title}</h2>
              <p className="text-gray-400 leading-relaxed text-sm">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 p-5 rounded-xl bg-violet-500/8 border border-violet-500/20 text-center">
          <p className="text-gray-400 text-sm mb-3">Des questions sur nos conditions ?</p>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium text-sm transition-colors">
            Contactez notre support via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
