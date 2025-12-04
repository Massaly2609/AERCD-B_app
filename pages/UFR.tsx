import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { UFRS } from '../constants';
import { useApp } from '../context/AppContext';
import { Layers, GraduationCap, ChevronRight, User, Quote, Network, Beaker, Calculator, Laptop, Zap, Search, BookOpen, Users, Award, Mail } from 'lucide-react';

export const UFRView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { siteContent } = useApp();
  const ufr = id ? UFRS[id] : null;

  const [activeTab, setActiveTab] = useState('presentation');
  const [staffSearch, setStaffSearch] = useState('');

  // Reset tab when UFR changes
  useEffect(() => {
    setActiveTab('presentation');
    setStaffSearch('');
  }, [id]);

  if (!ufr) {
    return <Navigate to="/" />;
  }

  // Use dynamic content if available, fallback to static
  const description = siteContent.ufrDescriptions[ufr.id] || ufr.description;

  // --- LAYOUT SPÉCIFIQUE SATIC ---
  if (ufr.id === 'SATIC') {
      const filteredStaff = ufr.staff ? ufr.staff.filter(name => name.toLowerCase().includes(staffSearch.toLowerCase())) : [];

      return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* 1. HERO SECTION */}
            <div className="relative bg-blue-900 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-20 bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/90 to-blue-900/50"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-800 border border-blue-700 text-blue-200 text-xs font-bold uppercase tracking-widest mb-4">
                        Sciences & Technologies
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
                        UFR SATIC
                    </h1>
                    <p className="text-lg text-blue-100 max-w-3xl mx-auto font-light leading-relaxed">
                        {ufr.fullName}
                    </p>
                </div>
            </div>

            {/* TAB NAVIGATION */}
            <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex overflow-x-auto no-scrollbar space-x-8">
                        {[
                            { id: 'presentation', label: 'Présentation', icon: BookOpen },
                            { id: 'organisation', label: 'Organisation', icon: Layers },
                            { id: 'formations', label: 'Formations', icon: GraduationCap },
                            { id: 'personnel', label: 'Personnel', icon: Users },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'border-blue-600 text-blue-700'
                                        : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
                                }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[60vh] animate-fade-in">
                
                {/* 1. PRESENTATION TAB */}
                {activeTab === 'presentation' && (
                    <div className="space-y-12">
                        {/* Contexte */}
                        <section className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                             <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <Quote size={20} />
                                </span>
                                Vision & Contexte
                            </h2>
                            {ufr.context && (
                                <div className="prose prose-lg max-w-none text-slate-600 text-justify leading-relaxed whitespace-pre-line font-serif">
                                    {ufr.context}
                                </div>
                            )}
                        </section>

                        {/* Mot du Directeur */}
                        {ufr.directorsWord && (
                            <section className="bg-gradient-to-br from-slate-50 to-blue-50/30 p-8 md:p-12 rounded-2xl border border-slate-200 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Quote size={200} />
                                </div>
                                <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                                    <div className="flex-shrink-0 text-center md:text-left">
                                         <div className="w-32 h-32 rounded-full bg-white border-4 border-blue-200 shadow-md mb-4 flex items-center justify-center overflow-hidden mx-auto md:mx-0">
                                             <User size={64} className="text-slate-300" />
                                        </div>
                                        <h3 className="text-xl font-bold font-serif text-slate-900">{ufr.directorsWord.author}</h3>
                                        <p className="text-blue-600 text-sm font-bold uppercase tracking-wider">{ufr.directorsWord.role}</p>
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Mot de Bienvenue</h3>
                                        <div className="text-slate-700 leading-8 whitespace-pre-line italic font-serif">
                                            {ufr.directorsWord.content}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                )}

                {/* 2. ORGANISATION TAB */}
                {activeTab === 'organisation' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto flex justify-center">
                         <div className="min-w-[800px] flex flex-col items-center gap-8 py-8">
                            {/* Same CSS Organigramme Logic */}
                            <div className="bg-blue-700 text-white p-4 rounded-xl shadow-lg border-2 border-blue-800 text-center w-64 relative z-10">
                                <p className="text-xs uppercase opacity-75 font-bold mb-1">Directeur</p>
                                <p className="font-bold text-lg">Pr. Issa SAMB</p>
                                <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-slate-300"></div>
                            </div>
                            <div className="flex gap-12 relative z-10">
                                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-64 h-8 border-t-2 border-slate-300 rounded-t-xl"></div>
                                 <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 text-center w-60 relative">
                                    <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-slate-300"></div>
                                    <p className="text-xs uppercase text-slate-500 font-bold mb-1">Directeur Adjoint</p>
                                    <p className="font-bold text-slate-800">Dr. Diéry NGOM</p>
                                    <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-slate-300"></div>
                                 </div>
                                 <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 text-center w-60 relative">
                                    <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-slate-300"></div>
                                    <p className="text-xs uppercase text-slate-500 font-bold mb-1">CSA</p>
                                    <p className="font-bold text-slate-800">Mme Suzanne M. NDIONE</p>
                                 </div>
                            </div>
                            <div className="flex gap-8 relative z-10 -ml-72">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-8 border-t-2 border-slate-300 rounded-t-xl"></div>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center w-48 relative">
                                    <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-slate-300"></div>
                                    <p className="text-xs uppercase text-slate-400 font-bold">Service Pédagogique</p>
                                    <p className="font-semibold text-slate-700 text-sm">M. Idrissa NDONG</p>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center w-48 relative">
                                    <div className="absolute -top-8 left-1/2 w-0.5 h-8 bg-slate-300"></div>
                                    <p className="text-xs uppercase text-slate-400 font-bold">Service Finance</p>
                                    <p className="font-semibold text-slate-700 text-sm">M. Grégoire DIONE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. FORMATIONS TAB */}
                {activeTab === 'formations' && (
                    <div className="grid md:grid-cols-2 gap-8">
                         {ufr.departments.map(dept => {
                            const deptPrograms = ufr.programs.filter(p => p.departmentCode === dept.code);
                            const Icon = dept.code === 'MATH' ? Calculator :
                                         dept.code === 'PHYS' ? Zap :
                                         dept.code === 'CHIM' ? Beaker :
                                         dept.code === 'TIC' ? Laptop : Layers;
                            const colorClass = dept.code === 'MATH' ? 'text-indigo-600 bg-indigo-50 border-indigo-100' :
                                               dept.code === 'PHYS' ? 'text-amber-600 bg-amber-50 border-amber-100' :
                                               dept.code === 'CHIM' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' :
                                               'text-blue-600 bg-blue-50 border-blue-100';

                            return (
                                <div key={dept.code} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-lg transition-all group">
                                    <div className={`p-6 border-b border-slate-100 flex items-center gap-4 ${colorClass.split(' ')[1]}`}>
                                        <div className={`p-3 rounded-lg bg-white shadow-sm`}>
                                            <Icon className={colorClass.split(' ')[0]} size={24} />
                                        </div>
                                        <div>
                                            <h3 className={`text-xl font-bold ${colorClass.split(' ')[0]}`}>{dept.name}</h3>
                                            <p className="text-xs uppercase tracking-wide opacity-70 font-bold text-slate-600">Département</p>
                                        </div>
                                    </div>
                                    <div className="p-6 grid gap-6">
                                        {/* Licences */}
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                Licences
                                            </h4>
                                            <ul className="space-y-3">
                                                {deptPrograms.filter(p => p.level === 'Licence').map((prog, idx) => (
                                                    <li key={idx} className="flex gap-3 group/item">
                                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                                                        <div>
                                                            <strong className="block text-slate-700 text-sm group-hover/item:text-blue-600 transition-colors">{prog.name}</strong>
                                                            {prog.description && <span className="text-xs text-slate-400 block leading-tight mt-0.5">{prog.description}</span>}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* Masters */}
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                Masters
                                            </h4>
                                            <ul className="space-y-3">
                                                {deptPrograms.filter(p => p.level === 'Master').map((prog, idx) => (
                                                    <li key={idx} className="flex gap-3 group/item">
                                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-800 flex-shrink-0"></div>
                                                        <div>
                                                            <strong className="block text-slate-700 text-sm group-hover/item:text-blue-600 transition-colors">{prog.name}</strong>
                                                            {prog.description && <span className="text-xs text-slate-400 block leading-tight mt-0.5">{prog.description}</span>}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* 4. PERSONNEL TAB */}
                {activeTab === 'personnel' && (
                    <div>
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto mb-10">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-full leading-5 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-400 sm:text-sm shadow-sm transition-all"
                                    placeholder="Rechercher un enseignant..."
                                    value={staffSearch}
                                    onChange={(e) => setStaffSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Staff Grid */}
                        {filteredStaff.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredStaff.map((name, idx) => {
                                    // Generate consistent gradient based on name length
                                    const gradients = ['from-blue-500 to-indigo-600', 'from-emerald-500 to-teal-600', 'from-orange-500 to-amber-600', 'from-purple-500 to-pink-600'];
                                    const gradient = gradients[name.length % gradients.length];
                                    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

                                    return (
                                        <div key={idx} className="bg-white rounded-xl border border-slate-100 p-6 flex items-center gap-4 hover:shadow-lg hover:border-blue-100 transition-all group">
                                            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform`}>
                                                {initials}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">{name}</h4>
                                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mt-0.5">Enseignant-Chercheur</p>
                                            </div>
                                            {/* Fake contact button on hover */}
                                            <button className="ml-auto p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all opacity-0 group-hover:opacity-100">
                                                <Mail size={18} />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="text-slate-300" size={24} />
                                </div>
                                <h3 className="text-slate-900 font-medium">Aucun enseignant trouvé</h3>
                                <p className="text-slate-500 text-sm mt-1">Essayez une autre orthographe.</p>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
      );
  }

  // --- LAYOUT STANDARD (POUR SDD / ECOMIJ) ---
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className={`${ufr.color} text-white py-20 relative overflow-hidden`}>
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3 opacity-80 text-sm font-bold tracking-wider uppercase">
                <Link to="/" className="hover:underline">Accueil</Link> <ChevronRight size={14} /> <span>UFR</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">{ufr.name}</h1>
              <p className="text-xl md:text-2xl text-white/90 font-light max-w-3xl leading-snug">{ufr.fullName}</p>
            </div>
            <div className="hidden md:block bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/20 text-center min-w-[150px]">
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Départements</p>
              <p className="text-5xl font-extrabold">{ufr.departments.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2 border-slate-100">Présentation</h2>
            <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-line">{description}</p>
        </div>
      </div>

      {/* Structure / Organigramme */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <Layers className="text-slate-400" /> Structure & Départements
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ufr.departments.map((dept) => (
            <div key={dept.code} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className={`w-12 h-12 ${ufr.color} bg-opacity-10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-opacity-20 transition-colors`}>
                <span className={`font-bold text-lg ${ufr.color.replace('bg-', 'text-')}`}>{dept.code.substring(0, 3)}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{dept.name}</h3>
              <p className="text-sm text-slate-500 mb-4 h-10 overflow-hidden">{dept.description || "Département d'enseignement et de recherche."}</p>
              <Link to={`/resources?ufr=${ufr.id}&dept=${dept.name}`} className={`text-sm font-bold ${ufr.color.replace('bg-', 'text-')} hover:underline flex items-center`}>
                Voir les cours <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Formations */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <GraduationCap className="text-slate-400" /> Offre de Formation
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
            {/* Licences */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 font-bold text-blue-900 text-lg">Licences</div>
                <div className="divide-y divide-slate-100">
                    {ufr.programs.filter(p => p.level === 'Licence').map((prog, idx) => (
                        <div key={idx} className="p-4 hover:bg-blue-50 transition-colors flex justify-between items-center group">
                            <div>
                                <h4 className="font-semibold text-slate-800">{prog.name}</h4>
                                {prog.description && <p className="text-xs text-slate-500 mt-0.5">{prog.description}</p>}
                            </div>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

             {/* Masters */}
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-green-50 px-6 py-4 border-b border-green-100 font-bold text-green-900 text-lg">Masters</div>
                <div className="divide-y divide-slate-100">
                    {ufr.programs.filter(p => p.level === 'Master').map((prog, idx) => (
                        <div key={idx} className="p-4 hover:bg-green-50 transition-colors flex justify-between items-center group">
                            <div>
                                <h4 className="font-semibold text-slate-800">{prog.name}</h4>
                                {prog.description && <p className="text-xs text-slate-500 mt-0.5">{prog.description}</p>}
                            </div>
                            <ChevronRight size={16} className="text-slate-300 group-hover:text-green-500 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};