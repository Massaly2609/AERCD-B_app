import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Target, Heart, Phone, Mail, ScrollText, Home, AlertTriangle, Scale, ChevronDown, ChevronUp, Star, Award } from 'lucide-react';

// Composant Helper pour l'Avatar (Image ou Initiales)
const MemberAvatar: React.FC<{ name: string; img?: string | null; size?: 'lg' | 'md' }> = ({ name, img, size = 'md' }) => {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const sizeClasses = size === 'lg' ? 'w-32 h-32 text-3xl' : 'w-20 h-20 text-xl';

  if (img) {
    return (
      <div className={`${sizeClasses} rounded-full overflow-hidden border-4 border-white shadow-md mx-auto`}>
        <img src={img} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  // Génération d'un dégradé aléatoire basé sur le nom pour la variété
  const gradients = [
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-amber-400 to-orange-600',
    'from-purple-400 to-indigo-600',
    'from-teal-400 to-cyan-600'
  ];
  const gradientIndex = name.length % gradients.length;
  const selectedGradient = gradients[gradientIndex];

  return (
    <div className={`${sizeClasses} rounded-full bg-gradient-to-br ${selectedGradient} flex items-center justify-center text-white font-serif font-bold border-4 border-white shadow-md mx-auto`}>
      {initials}
    </div>
  );
};

export const Amicale: React.FC = () => {
  const { siteContent } = useApp();
  const [activeTab, setActiveTab] = useState<'bureau' | 'statuts' | 'reglement'>('bureau');
  
  // États pour les accordéons
  const [expandedStatut, setExpandedStatut] = useState<number | null>(null);
  const [expandedReglement, setExpandedReglement] = useState<number | null>(null);

  const toggleStatut = (index: number) => {
    setExpandedStatut(expandedStatut === index ? null : index);
  };

  const toggleReglement = (index: number) => {
    setExpandedReglement(expandedReglement === index ? null : index);
  };

  // Données fictives pour les contacts (à remplacer par les vrais)
  const bureauMembers = [
    { role: "Président", name: "Bachir E Bodian", email: "presidence@aercd-b.sn", phone: "77 000 00 01", img: null },
    { role: "Vice-président", name: "Amélie", email: "vp@aercd-b.sn", phone: "77 000 00 02", img: null },
    { role: "Secrétaire Général", name: "Bernard", email: "sg@aercd-b.sn", phone: "77 000 00 03", img: null },
    { role: "Trésorier", name: "Isack Diatta", email: "tresorerie@aercd-b.sn", phone: "77 000 00 04", img: null },
    { role: "Secrétaire Général Adjoint", name: "Non spécifié", email: "contact@aercd-b.sn", phone: "-", img: null },
    { role: "Trésorier Adjointe", name: "Elisabeth Fanico Basséne", email: "tresorerie.adj@aercd-b.sn", phone: "-", img: null },
    { role: "Commissaires aux Comptes", name: "Fatou Sylva Mbeye, Chantal Djiboune", email: "cc@aercd-b.sn", phone: "-", img: null },
    { role: "Pdt Commission Sociale", name: "Mohamed Sané", email: "social@aercd-b.sn", phone: "-", img: null },
    { role: "Pdte Commission Féminine", name: "Véronique Gomis", email: "feminine@aercd-b.sn", phone: "-", img: null },
    { role: "Pdt Commission Organisation", name: "Halimatou Diallo, Mariama Barry", email: "org@aercd-b.sn", phone: "-", img: null },
    { role: "Commission Pédagogique", name: "Anna P Ndiaye, Dieynabou Diallo, Fatima Diallo", email: "pedagogie@aercd-b.sn", phone: "-", img: null },
    { role: "Relations Extérieures", name: "Mamadou O Diallo", email: "relex@aercd-b.sn", phone: "-", img: null },
  ];

  const statuts = [
    { title: "Chapitre I – Dispositions générales", content: "Article 1 : Dénomination\nIl est créé une association dénommée Amicale des Etudiants Ressortissants de la Commune de Diembering (AERCD-B), regroupant les étudiants de l'UADB.\n\nArticle 2 : Siège social\nLe siège est établi à Bambey, Maison Sifoca House.\n\nArticle 3 : Objectifs\nPromouvoir la solidarité, défendre les intérêts matériels et pédagogiques." },
    { title: "Chapitre II – Des membres", content: "Article 4 : Catégorie de membres\n- Membres actifs : étudiants inscrits et à jour.\n- Membres honoraires & d'honneur.\n\nArticle 5 : Droits et devoirs\nParticiper aux activités, voter, respecter les statuts, payer sa cotisation." },
    { title: "Chapitre III – Des organes", content: "Article 6 : Organes\nAssemblée Générale, Bureau Exécutif, Commissions Spécialisées.\n\nArticle 7 : L'Assemblée Générale\nOrgane suprême de décision.\n\nArticle 8 : Le Bureau Exécutif\nOrgane de gestion et d'exécution." },
    { title: "Chapitre VI – Discipline et sanctions", content: "Article 16 : Principes\nTout manquement expose à une sanction.\n\nArticle 17 : Sanctions\nAvertissement, Blâme, Suspension, Exclusion définitive." }
  ];

  const reglementArticles = [
    {
      title: "Article 1 : Principes Généraux",
      content: "Chaque membre de la maison s'engage à respecter les valeurs fondamentales de solidarité, de tolérance et de respect mutuel."
    },
    {
      title: "Article 2 : Paiement des Loyers et Cotisations",
      content: "1. Le montant du loyer est fixé par contrat et peut évoluer.\n2. Le loyer reste obligatoire pendant les périodes de vacances.\n3. Date limite de paiement : le 10 de chaque mois.\n4. Les frais communs (eau, électricité, vidange) sont répartis équitablement.\n5. Un registre des paiements est tenu par le trésorier."
    },
    {
      title: "Article 3 : Entretien et Gestion de la Maison",
      content: "1. Propreté : Tâches ménagères réparties par planning. Espaces communs doivent rester propres après usage.\n2. Réparations : Toute dégradation doit être signalée. Frais à charge de l'occupant si ≤ 5 000 FCFA.\n3. Gaspillage : Utilisation abusive sanctionnée (ex: ventilateur 500 FCFA/membre, eau > 15 000 FCFA)."
    },
    {
      title: "Article 4 : Sécurité et Tranquillité",
      content: "1. Responsabilité commune de la sécurité (fermeture portes).\n2. Nuisances sonores interdites après 22h00.\n3. Résolution pacifique des conflits.\n4. Affichage des numéros d'urgence et trousse de secours disponible."
    },
    {
      title: "Article 5 : Gouvernance de la Maison",
      content: "1. Délégué(e) : Élu(e) pour coordonner et représenter les résidents.\n2. Comité de Gestion : Volontaires supervisant les règles et cotisations."
    },
    {
      title: "Article 6 : Vie Collective",
      content: "1. Visites : Autorisées de 08h00 à 23h00. Visiteurs interdits dans les chambres privées.\n2. Respect : Respect absolu des croyances et pratiques religieuses d'autrui."
    },
    {
      title: "Article 7 : Engagement Écologique",
      content: "1. Tri sélectif des déchets (poubelle mbalitt / sceau gnamou mbam).\n2. Sensibilisation à la réduction de consommation d'énergie."
    },
    {
      title: "Article 8 : Sanctions",
      content: "1. Avertissement verbal\n2. Avertissement écrit\n3. Exclusion temporaire\n4. Exclusion définitive"
    },
    {
      title: "Article 9 : Modalités Financières Avancées",
      content: "1. Caisse de Solidarité pour entraide exceptionnelle.\n2. Registre de paiement pour transparence totale."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 font-sans">
      {/* Hero Header */}
      <div className="relative py-24 bg-gradient-to-br from-green-800 to-slate-900 overflow-hidden text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight font-serif">L'Amicale (AERCD-B)</h1>
          <p className="text-xl opacity-90 font-light max-w-2xl mx-auto italic">
            "Unis pour apprendre, solidaires pour grandir."
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 grid md:grid-cols-2 gap-10">
           <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-50 rounded-full text-blue-700">
                    <Target size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 font-serif">Notre Mission</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{siteContent.amicaleMission}</p>
           </div>
           <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-50 rounded-full text-green-700">
                    <Heart size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 font-serif">Notre Vision</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{siteContent.amicaleVision}</p>
           </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-4xl mx-auto px-4 mt-20">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button 
                onClick={() => setActiveTab('bureau')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${activeTab === 'bureau' ? 'bg-green-700 text-white shadow-green-200 ring-2 ring-green-700 ring-offset-2' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
            >
                <Award size={16} /> Bureau Exécutif
            </button>
            <button 
                onClick={() => setActiveTab('statuts')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${activeTab === 'statuts' ? 'bg-blue-700 text-white shadow-blue-200 ring-2 ring-blue-700 ring-offset-2' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
            >
                <Scale size={16} /> Statuts Juridiques
            </button>
            <button 
                onClick={() => setActiveTab('reglement')}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 ${activeTab === 'reglement' ? 'bg-amber-600 text-white shadow-amber-200 ring-2 ring-amber-600 ring-offset-2' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
            >
                <Home size={16} /> Règlement Intérieur
            </button>
        </div>

        {/* Tab Content: Bureau */}
        {activeTab === 'bureau' && (
            <div className="animate-fade-in-up space-y-16">
                
                {/* Président Spotlight - Carte élégante */}
                <div className="flex justify-center">
                     <div className="bg-white rounded-2xl p-8 max-w-lg w-full text-center relative border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.15)] transition-shadow">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400"></div>
                        <div className="mb-6 -mt-16">
                            <MemberAvatar name={bureauMembers[0].name} img={bureauMembers[0].img} size="lg" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 font-serif">{bureauMembers[0].name}</h3>
                        <div className="flex items-center justify-center gap-2 mt-2">
                             <Star size={14} className="text-amber-500 fill-current" />
                             <span className="text-amber-700 font-bold uppercase tracking-widest text-xs">{bureauMembers[0].role}</span>
                             <Star size={14} className="text-amber-500 fill-current" />
                        </div>
                        
                        <div className="mt-8 flex justify-center gap-3">
                            <a href={`tel:${bureauMembers[0].phone}`} className="flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors px-4 py-2 rounded-full bg-slate-50 hover:bg-amber-50 text-sm font-medium">
                                <Phone size={14} /> {bureauMembers[0].phone}
                            </a>
                            <a href={`mailto:${bureauMembers[0].email}`} className="flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors px-4 py-2 rounded-full bg-slate-50 hover:bg-amber-50 text-sm font-medium">
                                <Mail size={14} /> Email
                            </a>
                        </div>
                     </div>
                </div>

                {/* Grid for other members */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bureauMembers.slice(1).map((member, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-6 text-center border border-slate-100 hover:border-green-100 hover:shadow-lg transition-all group">
                            <div className="mb-4 transform group-hover:-translate-y-1 transition-transform duration-300">
                                <MemberAvatar name={member.name} img={member.img} />
                            </div>
                            <h4 className="font-bold text-slate-900 text-lg mb-1 font-serif">{member.name}</h4>
                            <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-4">{member.role}</p>
                            
                            <div className="flex justify-center gap-3 pt-4 border-t border-slate-50">
                                <span className="text-slate-400 hover:text-green-600 transition-colors cursor-pointer" title={member.phone}>
                                    <Phone size={16} />
                                </span>
                                <span className="text-slate-400 hover:text-green-600 transition-colors cursor-pointer" title={member.email}>
                                    <Mail size={16} />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* Tab Content: Statuts */}
        {activeTab === 'statuts' && (
            <div className="max-w-4xl mx-auto animate-fade-in-up">
                 <div className="bg-white shadow-xl rounded-sm border border-slate-200 overflow-hidden relative">
                    {/* Reliure décorative */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                    <div className="absolute top-0 left-1 w-1 h-full bg-blue-800 opacity-20"></div>

                    <div className="p-10 md:p-14">
                        <div className="text-center mb-12 border-b-2 border-slate-100 pb-8">
                            <Scale size={48} className="mx-auto text-blue-800 mb-4 opacity-80" />
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Statuts de l'Amicale</h2>
                            <p className="text-slate-500 mt-2 font-serif italic text-lg">Document Fondamental - Édition 2025</p>
                        </div>
                        
                        <div className="space-y-6">
                            {statuts.map((statut, index) => {
                                const isOpen = expandedStatut === index;
                                return (
                                    <div key={index} className="group">
                                        <button 
                                            onClick={() => toggleStatut(index)}
                                            className="w-full text-left py-4 flex justify-between items-center group-hover:bg-slate-50 px-2 rounded-lg transition-colors"
                                        >
                                            <span className={`font-serif font-bold text-lg md:text-xl ${isOpen ? 'text-blue-700' : 'text-slate-800'}`}>
                                                {statut.title}
                                            </span>
                                            {isOpen ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-slate-300 group-hover:text-slate-500" />}
                                        </button>
                                        
                                        {isOpen && (
                                            <div className="pl-4 md:pl-6 py-6 text-slate-700 leading-8 font-serif text-justify border-l-2 border-blue-200 ml-2 animate-fade-in bg-slate-50/50 rounded-r-lg pr-4">
                                                <div className="whitespace-pre-line">
                                                    {statut.content}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-16 pt-8 border-t border-slate-200 flex justify-between items-end">
                             <div className="text-sm text-slate-400 font-serif italic">Validé par l'Assemblée Générale</div>
                             <div className="w-24 h-24 border-4 border-double border-slate-200 rounded-full flex items-center justify-center text-slate-300 font-serif font-bold rotate-12">
                                 SCEAU OFFICIEL
                             </div>
                        </div>
                    </div>
                 </div>
            </div>
        )}

        {/* Tab Content: Règlement Intérieur */}
        {activeTab === 'reglement' && (
             <div className="max-w-4xl mx-auto animate-fade-in-up">
                <div className="bg-white shadow-xl rounded-sm border border-slate-200 overflow-hidden relative">
                    {/* Reliure décorative */}
                    <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                    <div className="absolute top-0 left-1 w-1 h-full bg-amber-700 opacity-20"></div>

                    <div className="p-10 md:p-14">
                        <div className="text-center mb-12 border-b-2 border-slate-100 pb-8">
                            <Home size={48} className="mx-auto text-amber-700 mb-4 opacity-80" />
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">Règlement Intérieur</h2>
                            <p className="text-slate-500 mt-2 font-serif italic text-lg">Maison Sifoca House</p>
                        </div>

                        <div className="bg-amber-50/50 border-l-4 border-amber-300 p-6 mb-10 text-amber-900 font-serif italic leading-relaxed">
                            "L’objectif premier est de promouvoir la cohésion sociale basée sur un esprit de solidarité et de fraternité au sein de notre maison."
                        </div>

                        <div className="space-y-6">
                            {reglementArticles.map((article, index) => {
                                const isOpen = expandedReglement === index;
                                return (
                                    <div key={index} className="group">
                                        <button 
                                            onClick={() => toggleReglement(index)}
                                            className="w-full text-left py-4 flex justify-between items-center group-hover:bg-slate-50 px-2 rounded-lg transition-colors"
                                        >
                                            <span className={`font-serif font-bold text-lg ${isOpen ? 'text-amber-700' : 'text-slate-800'}`}>
                                                {article.title}
                                            </span>
                                            {isOpen ? <ChevronUp className="text-amber-600" /> : <ChevronDown className="text-slate-300 group-hover:text-slate-500" />}
                                        </button>
                                        
                                        {isOpen && (
                                            <div className="pl-4 md:pl-6 py-6 text-slate-700 leading-8 font-serif text-justify border-l-2 border-amber-200 ml-2 animate-fade-in bg-slate-50/50 rounded-r-lg pr-4">
                                                <div className="whitespace-pre-line">
                                                    {article.content}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex flex-col md:flex-row gap-8 mt-16 pt-8 border-t border-slate-200 items-center justify-between">
                            <div className="flex-1 text-red-600 bg-red-50 p-4 rounded-lg border border-red-100 text-sm font-medium">
                                <div className="flex items-center gap-2 mb-1 font-bold"><AlertTriangle size={16} /> Note Importante</div>
                                Ce règlement est modifiable. Toute violation entraine des sanctions immédiates.
                            </div>
                            <div className="text-center">
                                <div className="font-serif font-bold text-xl text-slate-900 sign-font">Mouhamed SANE</div>
                                <div className="text-xs text-slate-500 uppercase tracking-widest mt-1">Le PCS Général</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};