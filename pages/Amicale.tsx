import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Target, Heart, FileText, ChevronDown, ChevronUp, User } from 'lucide-react';

export const Amicale: React.FC = () => {
  const { siteContent } = useApp();
  const [activeTab, setActiveTab] = useState<'bureau' | 'statuts'>('bureau');
  const [openStatut, setOpenStatut] = useState<number | null>(null);

  const toggleStatut = (index: number) => {
    setOpenStatut(openStatut === index ? null : index);
  };

  const bureauMembers = [
    { role: "Président", name: "Bachir E Bodian", img: "https://ui-avatars.com/api/?name=Bachir+Bodian&background=16a34a&color=fff" },
    { role: "Vice-président", name: "Amélie", img: "https://ui-avatars.com/api/?name=Amelie&background=f59e0b&color=fff" },
    { role: "Secrétaire Général", name: "Bernard", img: "https://ui-avatars.com/api/?name=Bernard&background=random" },
    { role: "Secrétaire Général Adjoint", name: "Non spécifié", img: null },
    { role: "Trésorier", name: "Isack Diatta", img: "https://ui-avatars.com/api/?name=Isack+Diatta&background=random" },
    { role: "Trésorier Adjointe", name: "Elisabeth Fanico Basséne", img: null },
    { role: "Commissaires aux Comptes", name: "Fatou Sylva Mbeye, Chantal Djiboune", img: null },
    { role: "Pdt Commission Sociale", name: "Mohamed Sané", img: null },
    { role: "Pdte Commission Féminine", name: "Véronique Gomis", img: null },
    { role: "Pdt Commission Organisation", name: "Halimatou Diallo, Mariama Barry", img: null },
    { role: "Commission Pédagogique", name: "Anna P Ndiaye, Dieynabou Diallo, Fatima Diallo", img: null },
    { role: "Relations Extérieures", name: "Mamadou O Diallo", img: null },
  ];

  const statuts = [
    { title: "Chapitre I – Dispositions générales", content: "Article 1 : Dénomination\nIl est créé une association dénommée Amicale des Etudiants Ressortissants de la Commune de Diembering (AERCD-B), regroupant les étudiants de l'UADB. Elle est apolitique, non confessionnelle et à but non lucratif.\n\nArticle 2 : Siège social\nLe siège est établi à Bambey, Maison Sifoca House.\n\nArticle 3 : Objectifs\nPromouvoir la solidarité, défendre les intérêts matériels et pédagogiques, assurer la communication avec l'administration." },
    { title: "Chapitre II – Des membres", content: "Article 4 : Catégorie de membres\n- Membres actifs : étudiants inscrits et à jour.\n- Membres honoraires : anciens étudiants.\n- Membres d'honneur.\n\nArticle 5 : Droits et devoirs\nChaque membre a le droit de participer aux activités, voter, être informé. Il a le devoir de respecter les statuts, payer sa cotisation et posséder sa carte de membre." },
    { title: "Chapitre III – Des organes", content: "Article 6 : Organes de l'Amicale\nLes organes sont : L'Assemblée Générale, Le Bureau Exécutif, Les Commissions Spécialisées.\n\nArticle 7 : L'Assemblée Générale\nOrgane suprême, se réunit au moins une fois par semestre.\n\nArticle 8 : Le Bureau Exécutif\nOrgane de gestion et d'exécution." },
    { title: "Chapitre VI – Discipline et sanctions", content: "Article 16 : Principes\nTout manquement expose à une sanction.\n\nArticle 17 : Sanctions\nAvertissement, Blâme, Suspension, Exclusion définitive.\n\nArticle 18 : Motifs\nRetard, manque d'engagement, propos irrespectueux, détournement de fonds, violence." }
  ];

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Header */}
      <div className="relative py-24 bg-gradient-to-r from-green-700 to-blue-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-20 bg-cover bg-center"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">L'Amicale (AERCD-B)</h1>
          <p className="text-xl opacity-90 font-light max-w-2xl mx-auto">
            "Unis pour apprendre, solidaires pour grandir."
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 grid md:grid-cols-2 gap-10">
           <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                    <Target size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Notre Mission</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{siteContent.amicaleMission}</p>
           </div>
           <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-lg text-green-600">
                    <Heart size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Notre Vision</h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">{siteContent.amicaleVision}</p>
           </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4 mt-16">
        <div className="flex justify-center mb-10 border-b border-slate-200">
            <button 
                onClick={() => setActiveTab('bureau')}
                className={`pb-4 px-6 text-lg font-bold transition-colors relative ${activeTab === 'bureau' ? 'text-green-700' : 'text-slate-400 hover:text-slate-600'}`}
            >
                Bureau Exécutif
                {activeTab === 'bureau' && <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600 rounded-t-full"></div>}
            </button>
            <button 
                onClick={() => setActiveTab('statuts')}
                className={`pb-4 px-6 text-lg font-bold transition-colors relative ${activeTab === 'statuts' ? 'text-blue-700' : 'text-slate-400 hover:text-slate-600'}`}
            >
                Statuts Juridiques
                {activeTab === 'statuts' && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>}
            </button>
        </div>

        {activeTab === 'bureau' && (
            <div className="animate-fade-in-up">
                <h2 className="text-2xl font-bold text-center mb-12 text-slate-900">Les Membres du Bureau</h2>
                
                {/* President Highlight */}
                <div className="flex justify-center mb-12">
                     <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-amber-500 text-center max-w-sm w-full transform hover:scale-105 transition-transform duration-300">
                        <div className="w-32 h-32 bg-slate-200 rounded-full mx-auto mb-6 overflow-hidden ring-4 ring-amber-100">
                             <img src={bureauMembers[0].img || ""} alt={bureauMembers[0].name} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">{bureauMembers[0].name}</h3>
                        <p className="text-amber-600 font-bold uppercase tracking-wide mt-2">{bureauMembers[0].role}</p>
                     </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bureauMembers.slice(1).map((member, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden text-slate-400">
                                {member.img ? <img src={member.img} alt={member.name} className="w-full h-full object-cover" /> : <User size={32} />}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">{member.name}</h4>
                                <p className="text-xs font-semibold text-green-600 uppercase mt-1">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {activeTab === 'statuts' && (
            <div className="max-w-3xl mx-auto animate-fade-in-up">
                <div className="bg-blue-50 p-6 rounded-xl mb-8 flex items-start gap-4">
                    <FileText className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-blue-900">Status de l'Amicale</h3>
                        <p className="text-blue-700 text-sm mt-1">
                            Document régissant le fonctionnement de l'AERCD-B. Approuvé par l'Assemblée Générale.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    {statuts.map((statut, index) => (
                        <div key={index} className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                            <button 
                                onClick={() => toggleStatut(index)}
                                className="w-full flex justify-between items-center p-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                            >
                                <span className="font-bold text-slate-800">{statut.title}</span>
                                {openStatut === index ? <ChevronUp className="text-slate-500" /> : <ChevronDown className="text-slate-500" />}
                            </button>
                            {openStatut === index && (
                                <div className="p-6 text-slate-600 whitespace-pre-line leading-relaxed border-t border-slate-200 bg-white">
                                    {statut.content}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};