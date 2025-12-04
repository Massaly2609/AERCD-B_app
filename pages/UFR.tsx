import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { UFRS } from '../constants';
import { useApp } from '../context/AppContext';
import { Layers, GraduationCap, ChevronRight, User, Quote, Network, Beaker, Calculator, Laptop, Zap, Search, BookOpen, Users, Award, Mail, ChevronUp } from 'lucide-react';

const { useParams, Navigate, Link } = ReactRouterDOM;

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

                {/* 2. ORGANISATION TAB (Organigramme Complet) */}
                {activeTab === 'organisation' && (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
                        <div className="min-w-[1000px] flex flex-col items-center gap-10 py-8 font-sans">
                            
                            {/* NIVEAU 1: CONSEIL UFR */}
                            <div className="bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md font-bold text-xl uppercase tracking-wider border-b-4 border-blue-900">
                                Conseil d'UFR SATIC
                            </div>

                            <div className="flex flex-col items-center w-full relative">
                                <div className="h-8 w-0.5 bg-slate-300"></div>

                                {/* NIVEAU 2: DIRECTEUR + SUPPORTS */}
                                <div className="flex items-start gap-12 relative">
                                    
                                    {/* Assistante (Gauche) */}
                                    <div className="flex flex-col items-center mt-8">
                                        <div className="border border-slate-300 bg-white p-3 rounded-lg shadow-sm w-48 text-center relative">
                                            {/* Connector to Director */}
                                            <div className="absolute top-1/2 -right-12 w-12 h-0.5 bg-slate-300"></div>
                                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Assistante</p>
                                            <p className="text-sm font-bold text-slate-800">Mme Aïssata DIA HAMOUD</p>
                                        </div>
                                    </div>

                                    {/* DIRECTEUR (Centre) */}
                                    <div className="border-2 border-red-500 bg-white p-5 rounded-xl shadow-lg w-64 text-center z-10">
                                        <p className="text-xs font-bold text-red-500 uppercase mb-1">Directeur</p>
                                        <p className="text-lg font-extrabold text-slate-900">Pr Issa SAMB</p>
                                    </div>

                                    {/* Chauffeur (Droite) */}
                                    <div className="flex flex-col items-center mt-8">
                                        <div className="border border-slate-300 bg-white p-3 rounded-lg shadow-sm w-48 text-center relative">
                                             {/* Connector to Director */}
                                             <div className="absolute top-1/2 -left-12 w-12 h-0.5 bg-slate-300"></div>
                                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Chauffeur</p>
                                            <p className="text-sm font-bold text-slate-800">M. Babacar THIAW</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Connector Down */}
                                <div className="h-10 w-0.5 bg-slate-300"></div>
                                <div className="w-[500px] h-0.5 bg-slate-300 relative">
                                     <div className="absolute left-0 top-0 w-0.5 h-6 bg-slate-300"></div>
                                     <div className="absolute right-0 top-0 w-0.5 h-6 bg-slate-300"></div>
                                </div>

                                {/* NIVEAU 3: DIR ADJOINT & CSA */}
                                <div className="flex justify-between w-[580px] mt-6">
                                    {/* DA */}
                                    <div className="border-2 border-red-500 bg-white p-4 rounded-xl shadow-md w-60 text-center relative">
                                        <p className="text-xs font-bold text-red-500 uppercase mb-1">Directeur Adjoint</p>
                                        <p className="text-md font-bold text-slate-900">Dr Diéry NGOM</p>
                                        <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-slate-300"></div>
                                    </div>

                                    {/* CSA */}
                                    <div className="border-2 border-red-500 bg-white p-4 rounded-xl shadow-md w-60 text-center relative">
                                        <p className="text-xs font-bold text-red-500 uppercase mb-1">CSA</p>
                                        <p className="text-md font-bold text-slate-900">Mme Suzanne M. NDIONE</p>
                                        <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-slate-300"></div>
                                    </div>
                                </div>

                                {/* NIVEAU 4: SERVICES */}
                                <div className="mt-8 flex justify-between w-[580px]">
                                     {/* Service Pédagogique */}
                                     <div className="border border-blue-500 bg-white p-3 rounded-lg shadow-sm w-60 text-center relative">
                                        <p className="text-xs font-bold text-blue-600 uppercase mb-1">Chef de Service Pédagogique</p>
                                        <p className="text-sm font-bold text-slate-800">M. Idrissa NDONG</p>
                                        
                                        {/* Sub-tree for Staff Pédago */}
                                        <div className="absolute -bottom-6 left-1/2 w-0.5 h-6 bg-slate-300"></div>
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[110%] h-0.5 bg-slate-300"></div>
                                        <div className="absolute -bottom-10 left-0 w-0.5 h-4 bg-slate-300"></div>
                                        <div className="absolute -bottom-10 right-0 w-0.5 h-4 bg-slate-300"></div>
                                        <div className="absolute -bottom-10 left-1/2 w-0.5 h-4 bg-slate-300"></div>
                                     </div>

                                     {/* Service Finance */}
                                     <div className="border border-blue-500 bg-white p-3 rounded-lg shadow-sm w-60 text-center">
                                        <p className="text-xs font-bold text-blue-600 uppercase mb-1">Chef de Service Finance</p>
                                        <p className="text-sm font-bold text-slate-800">M. Grégoire DIONE</p>
                                     </div>
                                </div>

                                {/* NIVEAU 5: STAFF PÉDAGOGIQUE */}
                                <div className="mt-12 flex justify-start gap-2 w-[580px]">
                                    <div className="border border-slate-300 bg-slate-50 p-2 rounded w-44 text-center">
                                        <p className="text-xs font-bold text-slate-700">Assistants (es) Pédagogiques</p>
                                    </div>
                                    <div className="border border-slate-300 bg-slate-50 p-2 rounded w-44 text-center">
                                         <p className="text-[10px] uppercase text-slate-400">Assistante Pédagogique</p>
                                        <p className="text-xs font-bold text-slate-700">Mme Mame ND GATH SOKHNA</p>
                                    </div>
                                    <div className="border border-slate-300 bg-slate-50 p-2 rounded w-44 text-center">
                                        <p className="text-[10px] uppercase text-slate-400">Assistante Pédagogique</p>
                                        <p className="text-xs font-bold text-slate-700">Mme Aïda DIOP</p>
                                    </div>
                                </div>

                                {/* NIVEAU 6: TECHS LABO */}
                                <div className="mt-6 flex justify-center gap-4 w-full">
                                    <div className="bg-red-50 border border-red-200 p-2 rounded-lg w-40 text-center">
                                        <p className="text-[10px] font-bold text-red-500 uppercase">Tech Labo TIC</p>
                                        <p className="text-xs font-bold text-slate-800">M. Babacar SALL</p>
                                    </div>
                                    <div className="bg-red-50 border border-red-200 p-2 rounded-lg w-40 text-center">
                                        <p className="text-[10px] font-bold text-red-500 uppercase">Tech Labo Physique</p>
                                        <p className="text-xs font-bold text-slate-800">M. Talla KANE</p>
                                    </div>
                                    <div className="bg-red-50 border border-red-200 p-2 rounded-lg w-40 text-center">
                                        <p className="text-[10px] font-bold text-red-500 uppercase">Tech Labo Chimie</p>
                                        <p className="text-xs font-bold text-slate-800">Mme Georgette Rokhy NIAYE</p>
                                    </div>
                                </div>
                                
                                {/* GRAND SEPARATEUR DEPARTEMENTS */}
                                <div className="h-12 w-0.5 bg-red-500 mt-4"></div>
                                <div className="w-[90%] h-1 bg-red-500 relative rounded-full"></div>
                                <div className="w-[90%] flex justify-between relative -mt-1">
                                     <div className="w-0.5 h-8 bg-red-500"></div>
                                     <div className="w-0.5 h-8 bg-red-500"></div>
                                     <div className="w-0.5 h-8 bg-red-500"></div>
                                     <div className="w-0.5 h-8 bg-red-500"></div>
                                </div>

                                {/* NIVEAU 7: DEPARTEMENTS & RESPONSABLES */}
                                <div className="grid grid-cols-4 gap-6 w-full mt-6 items-start">
                                    
                                    {/* DEPARTEMENT TIC */}
                                    <div className="flex flex-col gap-4">
                                        <div className="border-2 border-blue-600 bg-white p-3 rounded-xl shadow-md text-center">
                                            <p className="text-xs font-bold text-blue-600 uppercase">Chef de Dép. TIC</p>
                                            <p className="text-sm font-extrabold text-slate-900">Pr Bachir DEME</p>
                                        </div>
                                        <div className="h-4 w-0.5 bg-red-500 mx-auto"></div>
                                        
                                        <div className="space-y-3">
                                            <div className="border border-blue-200 bg-blue-50 p-2 rounded-lg text-center">
                                                <p className="text-[10px] font-bold text-slate-500">Responsable M.SIR</p>
                                                <p className="text-xs font-bold text-slate-800">Dr Birahim DIOUF</p>
                                            </div>
                                            <div className="border border-slate-200 bg-white p-3 rounded-lg text-center shadow-sm">
                                                <p className="text-[10px] text-slate-400 mb-1">Responsable Licence SRT:</p>
                                                <p className="text-xs font-bold text-slate-800">Pr Abdou Khadre DIOP</p>
                                                <div className="my-1 border-t border-slate-100"></div>
                                                <p className="text-[10px] text-slate-400 mb-1">Responsable Licence D2A:</p>
                                                <p className="text-xs font-bold text-slate-800">Dr Abdourahim GAYE</p>
                                                <div className="my-1 border-t border-slate-100"></div>
                                                <p className="text-[10px] text-slate-400 mb-1">Responsable Licence LPCM:</p>
                                                <p className="text-xs font-bold text-slate-800">Dr Baboucar DIATTA</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DEPARTEMENT MATH */}
                                    <div className="flex flex-col gap-4">
                                        <div className="border-2 border-blue-600 bg-white p-3 rounded-xl shadow-md text-center">
                                            <p className="text-xs font-bold text-blue-600 uppercase">Chef de Dép. MATH</p>
                                            <p className="text-sm font-extrabold text-slate-900">Pr Aba DIOP</p>
                                        </div>
                                        <div className="h-4 w-0.5 bg-red-500 mx-auto"></div>

                                        <div className="grid grid-cols-2 gap-2">
                                             <div className="border border-blue-200 bg-blue-50 p-2 rounded-lg text-center">
                                                <p className="text-[10px] font-bold text-slate-500">Resp. M.SID</p>
                                                <p className="text-xs font-bold text-slate-800">Dr Amine NIANG</p>
                                            </div>
                                            <div className="border border-blue-200 bg-blue-50 p-2 rounded-lg text-center">
                                                <p className="text-[10px] font-bold text-slate-500">Resp. M.MATH</p>
                                                <p className="text-xs font-bold text-slate-800 leading-tight">Pr Abdou Salam DIALLO</p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-2 h-full">
                                            <div className="border border-slate-200 bg-white p-2 rounded-lg text-center shadow-sm flex flex-col justify-center">
                                                <p className="text-[10px] text-slate-400">Resp. Licence SID</p>
                                                <p className="text-xs font-bold text-slate-800 mt-1">Pr Fodé CAMARA</p>
                                            </div>
                                            <div className="border border-slate-200 bg-white p-2 rounded-lg text-center shadow-sm flex flex-col justify-center">
                                                <p className="text-[10px] text-slate-400">Resp. Licence MATH</p>
                                                <p className="text-xs font-bold text-slate-800 mt-1">Dr Bernadette Faye FALL</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DEPARTEMENT PHYSIQUE */}
                                    <div className="flex flex-col gap-4">
                                        <div className="border-2 border-blue-600 bg-white p-3 rounded-xl shadow-md text-center">
                                            <p className="text-xs font-bold text-blue-600 uppercase">Chef de Dép. PHYSIQUE</p>
                                            <p className="text-sm font-extrabold text-slate-900">Pr Alphouseyni NDIAYE</p>
                                        </div>
                                        <div className="h-4 w-0.5 bg-red-500 mx-auto"></div>

                                        <div className="grid grid-cols-2 gap-2">
                                             <div className="border border-blue-200 bg-blue-50 p-2 rounded-lg text-center">
                                                <p className="text-[10px] font-bold text-slate-500">Resp. MIER</p>
                                                <p className="text-xs font-bold text-slate-800">Dr Lat Tabara SOW</p>
                                            </div>
                                            <div className="border border-blue-200 bg-blue-50 p-2 rounded-lg text-center">
                                                <p className="text-[10px] font-bold text-slate-500">Resp. M.PM</p>
                                                <p className="text-xs font-bold text-slate-800">Dr Matabara DIENG</p>
                                            </div>
                                        </div>
                                        
                                        <div className="border border-slate-200 bg-white p-3 rounded-lg text-center shadow-sm h-full flex flex-col justify-center">
                                            <p className="text-[10px] text-slate-400">Responsable Licence PC/PN</p>
                                            <p className="text-sm font-bold text-slate-800 mt-2">Dr Salif DIALLO</p>
                                        </div>
                                    </div>

                                     {/* DEPARTEMENT CHIMIE */}
                                     <div className="flex flex-col gap-4">
                                        <div className="border-2 border-blue-600 bg-white p-3 rounded-xl shadow-md text-center">
                                            <p className="text-xs font-bold text-blue-600 uppercase">Chef de Dép. CHIMIE</p>
                                            <p className="text-sm font-extrabold text-slate-900">Pr Diégane SARR</p>
                                        </div>
                                        <div className="h-4 w-0.5 bg-red-500 mx-auto"></div>

                                        <div className="border border-blue-200 bg-blue-50 p-2 rounded-lg text-center">
                                            <p className="text-[10px] font-bold text-slate-500">Responsable M.CHIMIE</p>
                                            <p className="text-xs font-bold text-slate-800">Pr Abdou Khadre Djily DIME</p>
                                        </div>
                                        
                                        <div className="border border-slate-200 bg-white p-3 rounded-lg text-center shadow-sm h-full flex flex-col justify-center">
                                            <p className="text-[10px] text-slate-400">Responsable Licence CA</p>
                                            <p className="text-sm font-bold text-slate-800 mt-2">Dr Abdou Aziz DIAGNE</p>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {/* 3. FORMATIONS TAB - NEW DESIGN CATALOGUE */}
                {activeTab === 'formations' && (
                    <div className="space-y-12">
                         {ufr.departments.map(dept => {
                            const deptPrograms = ufr.programs.filter(p => p.departmentCode === dept.code);
                            const Icon = dept.code === 'MATH' ? Calculator :
                                         dept.code === 'PHYS' ? Zap :
                                         dept.code === 'CHIM' ? Beaker :
                                         dept.code === 'TIC' ? Laptop : Layers;
                            const colorClass = dept.code === 'MATH' ? 'text-indigo-600 border-indigo-200 bg-indigo-50' :
                                               dept.code === 'PHYS' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                                               dept.code === 'CHIM' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' :
                                               'text-blue-600 border-blue-200 bg-blue-50';

                            return (
                                <div key={dept.code} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                                    {/* Department Header */}
                                    <div className={`px-8 py-6 border-b flex items-center gap-4 ${colorClass}`}>
                                        <div className="p-3 bg-white rounded-xl shadow-sm">
                                            <Icon size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-slate-900">{dept.name}</h3>
                                            <p className="text-sm font-medium opacity-80 uppercase tracking-wide">Département</p>
                                        </div>
                                    </div>

                                    <div className="p-8 grid md:grid-cols-2 gap-12">
                                        {/* Column Licences */}
                                        <div>
                                            <h4 className="flex items-center gap-2 text-lg font-bold text-blue-800 mb-6 pb-2 border-b border-blue-100">
                                                <GraduationCap className="text-blue-600" /> Licences
                                            </h4>
                                            <div className="grid gap-4">
                                                {deptPrograms.filter(p => p.level === 'Licence').map((prog, idx) => (
                                                    <div key={idx} className="group p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all bg-white flex flex-col gap-2">
                                                        <div className="flex justify-between items-start">
                                                            <strong className="text-slate-800 font-bold text-base group-hover:text-blue-700 transition-colors">{prog.name}</strong>
                                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full border border-blue-100">L3</span>
                                                        </div>
                                                        {prog.description && (
                                                            <p className="text-sm text-slate-500 leading-snug">{prog.description}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Column Masters */}
                                        <div>
                                            <h4 className="flex items-center gap-2 text-lg font-bold text-slate-700 mb-6 pb-2 border-b border-slate-200">
                                                <Award className="text-slate-500" /> Masters
                                            </h4>
                                            <div className="grid gap-4">
                                                {deptPrograms.filter(p => p.level === 'Master').map((prog, idx) => (
                                                    <div key={idx} className="group p-4 rounded-xl border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all bg-slate-50/50 flex flex-col gap-2">
                                                        <div className="flex justify-between items-start">
                                                            <strong className="text-slate-800 font-bold text-base group-hover:text-slate-900 transition-colors">{prog.name}</strong>
                                                            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-200 text-slate-600 rounded-full border border-slate-300">M2</span>
                                                        </div>
                                                        {prog.description && (
                                                            <p className="text-sm text-slate-500 leading-snug">{prog.description}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
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