
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { UFRS } from '../constants';
import { useApp } from '../context/AppContext';
import { Layers, GraduationCap, ChevronRight, User, Quote, Network, Beaker, Calculator, Laptop, Zap, Search, BookOpen, Users, Award, Mail, ChevronUp, Scale, Briefcase, TrendingUp, DollarSign, Stethoscope, Leaf, HeartPulse } from 'lucide-react';

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

  // --- LAYOUT PREMIUM (SATIC, ECOMIJ, SDD) ---
  if (ufr.id === 'SATIC' || ufr.id === 'ECOMIJ' || ufr.id === 'SDD') {
      const filteredStaff = ufr.staff ? ufr.staff.filter(name => name.toLowerCase().includes(staffSearch.toLowerCase())) : [];
      const isSatic = ufr.id === 'SATIC';
      const isEcomij = ufr.id === 'ECOMIJ';
      const isSDD = ufr.id === 'SDD';
      
      // Configuration des couleurs et icones selon l'UFR
      let theme;
      if (isSatic) {
          theme = {
              bgHero: "bg-blue-900",
              bgGradient: "from-blue-950 via-blue-900/90 to-blue-900/50",
              textBadge: "text-blue-200",
              borderBadge: "border-blue-700",
              bgBadge: "bg-blue-800",
              textLight: "text-blue-100",
              accentColor: "text-blue-600",
              borderColor: "border-blue-600",
              bgLight: "bg-blue-50",
              textDark: "text-blue-800",
              gradientStaff: ['from-blue-500 to-indigo-600', 'from-cyan-500 to-blue-600'],
              bgImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
              tagline: 'Sciences & Technologies'
          };
      } else if (isEcomij) {
          theme = {
              bgHero: "bg-amber-900",
              bgGradient: "from-amber-950 via-amber-900/90 to-amber-900/50",
              textBadge: "text-amber-200",
              borderBadge: "border-amber-700",
              bgBadge: "bg-amber-800",
              textLight: "text-amber-100",
              accentColor: "text-amber-600",
              borderColor: "border-amber-600",
              bgLight: "bg-amber-50",
              textDark: "text-amber-800",
              gradientStaff: ['from-amber-500 to-orange-600', 'from-orange-500 to-red-600'],
              bgImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
              tagline: 'Économie & Droit'
          };
      } else {
           // SDD THEME
           theme = {
              bgHero: "bg-emerald-900",
              bgGradient: "from-emerald-950 via-emerald-900/90 to-emerald-900/50",
              textBadge: "text-emerald-200",
              borderBadge: "border-emerald-700",
              bgBadge: "bg-emerald-800",
              textLight: "text-emerald-100",
              accentColor: "text-emerald-600",
              borderColor: "border-emerald-600",
              bgLight: "bg-emerald-50",
              textDark: "text-emerald-800",
              gradientStaff: ['from-emerald-500 to-green-600', 'from-green-500 to-teal-600'],
              bgImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
              tagline: 'Santé & Développement Durable'
           };
      }

      return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* 1. HERO SECTION */}
            <div className={`relative ${theme.bgHero} text-white py-20 overflow-hidden`}>
                <div 
                    className="absolute inset-0 opacity-20 bg-cover bg-center transition-all duration-1000"
                    style={{ backgroundImage: `url('${theme.bgImage}')` }}
                ></div>
                <div className={`absolute inset-0 bg-gradient-to-t ${theme.bgGradient}`}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className={`inline-block py-1 px-3 rounded-full ${theme.bgBadge} border ${theme.borderBadge} ${theme.textBadge} text-xs font-bold uppercase tracking-widest mb-4`}>
                        {theme.tagline}
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
                        {ufr.name}
                    </h1>
                    <p className={`text-lg ${theme.textLight} max-w-3xl mx-auto font-light leading-relaxed`}>
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
                                        ? `${theme.borderColor} ${theme.textDark}`
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
                                <span className={`w-10 h-10 rounded-lg ${theme.bgLight} ${theme.accentColor} flex items-center justify-center`}>
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
                            <section className={`bg-gradient-to-br from-slate-50 to-slate-100 p-8 md:p-12 rounded-2xl border border-slate-200 relative overflow-hidden`}>
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <Quote size={200} />
                                </div>
                                <div className="flex flex-col md:flex-row gap-10 items-start relative z-10">
                                    <div className="flex-shrink-0 text-center md:text-left">
                                         <div className={`w-32 h-32 rounded-full bg-white border-4 border-slate-200 shadow-md mb-4 flex items-center justify-center overflow-hidden mx-auto md:mx-0`}>
                                             <User size={64} className="text-slate-300" />
                                        </div>
                                        <h3 className="text-xl font-bold font-serif text-slate-900">{ufr.directorsWord.author}</h3>
                                        <p className={`${theme.accentColor} text-sm font-bold uppercase tracking-wider`}>{ufr.directorsWord.role}</p>
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
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
                        <div className="min-w-[1000px] flex flex-col items-center gap-10 py-8 font-sans">
                            
                            {/* ORGANIGRAMME SATIC */}
                            {isSatic && (
                                <>
                                    <div className="bg-blue-700 text-white px-8 py-3 rounded-lg shadow-md font-bold text-xl uppercase tracking-wider border-b-4 border-blue-900">
                                        Conseil d'UFR SATIC
                                    </div>
                                    {/* ... Code existant organigramme SATIC ... */}
                                    <div className="flex flex-col items-center w-full relative">
                                        <div className="h-8 w-0.5 bg-slate-300"></div>
                                        <div className="flex items-start gap-12 relative">
                                            <div className="flex flex-col items-center mt-8">
                                                <div className="border border-slate-300 bg-white p-3 rounded-lg shadow-sm w-48 text-center relative">
                                                    <div className="absolute top-1/2 -right-12 w-12 h-0.5 bg-slate-300"></div>
                                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Assistante</p>
                                                    <p className="text-sm font-bold text-slate-800">Mme Aïssata DIA HAMOUD</p>
                                                </div>
                                            </div>
                                            <div className="border-2 border-red-500 bg-white p-5 rounded-xl shadow-lg w-64 text-center z-10">
                                                <p className="text-xs font-bold text-red-500 uppercase mb-1">Directeur</p>
                                                <p className="text-lg font-extrabold text-slate-900">Pr Issa SAMB</p>
                                            </div>
                                            <div className="flex flex-col items-center mt-8">
                                                <div className="border border-slate-300 bg-white p-3 rounded-lg shadow-sm w-48 text-center relative">
                                                     <div className="absolute top-1/2 -left-12 w-12 h-0.5 bg-slate-300"></div>
                                                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Chauffeur</p>
                                                    <p className="text-sm font-bold text-slate-800">M. Babacar THIAW</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-10 w-0.5 bg-slate-300"></div>
                                        <div className="w-[500px] h-0.5 bg-slate-300 relative">
                                             <div className="absolute left-0 top-0 w-0.5 h-6 bg-slate-300"></div>
                                             <div className="absolute right-0 top-0 w-0.5 h-6 bg-slate-300"></div>
                                        </div>
                                        <div className="flex justify-between w-[580px] mt-6">
                                            <div className="border-2 border-red-500 bg-white p-4 rounded-xl shadow-md w-60 text-center relative">
                                                <p className="text-xs font-bold text-red-500 uppercase mb-1">Directeur Adjoint</p>
                                                <p className="text-md font-bold text-slate-900">Dr Diéry NGOM</p>
                                                <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-slate-300"></div>
                                            </div>
                                            <div className="border-2 border-red-500 bg-white p-4 rounded-xl shadow-md w-60 text-center relative">
                                                <p className="text-xs font-bold text-red-500 uppercase mb-1">CSA</p>
                                                <p className="text-md font-bold text-slate-900">Mme Suzanne M. NDIONE</p>
                                                <div className="absolute -bottom-8 left-1/2 w-0.5 h-8 bg-slate-300"></div>
                                            </div>
                                        </div>
                                        <div className="mt-8 flex justify-between w-[580px]">
                                             <div className="border border-blue-500 bg-white p-3 rounded-lg shadow-sm w-60 text-center relative">
                                                <p className="text-xs font-bold text-blue-600 uppercase mb-1">Chef de Service Pédagogique</p>
                                                <p className="text-sm font-bold text-slate-800">M. Idrissa NDONG</p>
                                                <div className="absolute -bottom-6 left-1/2 w-0.5 h-6 bg-slate-300"></div>
                                                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[110%] h-0.5 bg-slate-300"></div>
                                                <div className="absolute -bottom-10 left-0 w-0.5 h-4 bg-slate-300"></div>
                                                <div className="absolute -bottom-10 right-0 w-0.5 h-4 bg-slate-300"></div>
                                                <div className="absolute -bottom-10 left-1/2 w-0.5 h-4 bg-slate-300"></div>
                                             </div>
                                             <div className="border border-blue-500 bg-white p-3 rounded-lg shadow-sm w-60 text-center">
                                                <p className="text-xs font-bold text-blue-600 uppercase mb-1">Chef de Service Finance</p>
                                                <p className="text-sm font-bold text-slate-800">M. Grégoire DIONE</p>
                                             </div>
                                        </div>
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
                                        <div className="h-12 w-0.5 bg-red-500 mt-4"></div>
                                        <div className="w-[90%] h-1 bg-red-500 relative rounded-full"></div>
                                        <div className="w-[90%] flex justify-between relative -mt-1">
                                             <div className="w-0.5 h-8 bg-red-500"></div>
                                             <div className="w-0.5 h-8 bg-red-500"></div>
                                             <div className="w-0.5 h-8 bg-red-500"></div>
                                             <div className="w-0.5 h-8 bg-red-500"></div>
                                        </div>
                                        <div className="grid grid-cols-4 gap-6 w-full mt-6 items-start">
                                            {ufr.departments.map(dept => (
                                                 <div key={dept.code} className="border-2 border-blue-600 bg-white p-3 rounded-xl shadow-md text-center">
                                                    <p className="text-xs font-bold text-blue-600 uppercase">Chef de Dép. {dept.name}</p>
                                                    <p className="text-sm font-extrabold text-slate-900 mt-1">
                                                        {dept.code === 'TIC' ? 'Pr Bachir DEME' : 
                                                         dept.code === 'MATH' ? 'Pr Aba DIOP' : 
                                                         dept.code === 'PHYS' ? 'Pr Alphouseyni NDIAYE' : 'Pr Diégane SARR'}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* ORGANIGRAMME ECOMIJ */}
                            {isEcomij && (
                                <div className="flex flex-col items-center w-full relative">
                                    {/* NIVEAU 1 : DIRECTEUR */}
                                    <div className="bg-amber-600 text-white p-6 rounded-xl shadow-lg w-80 text-center z-10 border-b-4 border-amber-800">
                                        <p className="text-sm font-bold text-amber-100 uppercase mb-2">Directeur</p>
                                        <p className="text-xl font-extrabold">Serigne Ahmadou GAYE</p>
                                    </div>

                                    {/* LIGNE VERTICALE CENTRALE */}
                                    <div className="h-48 w-1 bg-amber-700"></div>

                                    {/* STAFF ADMINISTRATIF (Connectés à la ligne centrale) */}
                                    <div className="absolute top-28 flex flex-col gap-6 items-start left-1/2 ml-1">
                                        {/* Assistante */}
                                        <div className="flex items-center">
                                            <div className="w-8 h-0.5 bg-amber-700"></div>
                                            <div className="bg-white border border-amber-300 p-2 rounded shadow-sm w-48 ml-0">
                                                <p className="text-xs font-bold text-amber-700">Assistante de direction</p>
                                            </div>
                                        </div>
                                        {/* Resp Pédago */}
                                        <div className="flex items-center">
                                            <div className="w-8 h-0.5 bg-amber-700"></div>
                                            <div className="bg-white border border-amber-300 p-2 rounded shadow-sm w-48 ml-0">
                                                <p className="text-xs font-bold text-amber-700">Responsable pédagogique</p>
                                            </div>
                                        </div>
                                        {/* Asst Pédago */}
                                        <div className="flex items-center">
                                            <div className="w-8 h-0.5 bg-amber-700"></div>
                                            <div className="bg-white border border-amber-300 p-2 rounded shadow-sm w-48 ml-0">
                                                <p className="text-xs font-bold text-amber-700">Assistant pédagogique</p>
                                            </div>
                                        </div>
                                         {/* Resp Finances */}
                                         <div className="flex items-center">
                                            <div className="w-8 h-0.5 bg-amber-700"></div>
                                            <div className="bg-white border border-amber-300 p-2 rounded shadow-sm w-48 ml-0">
                                                <p className="text-xs font-bold text-amber-700">Responsable des finances</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* BARRE HORIZONTALE DEPARTEMENTS */}
                                    <div className="w-[80%] h-1 bg-amber-700 relative">
                                        <div className="absolute left-0 top-0 w-1 h-8 bg-amber-700"></div>
                                        <div className="absolute left-1/2 top-0 w-1 h-8 bg-amber-700"></div>
                                        <div className="absolute right-0 top-0 w-1 h-8 bg-amber-700"></div>
                                    </div>

                                    {/* NIVEAU 2 : DEPARTEMENTS */}
                                    <div className="flex justify-between w-[85%] mt-8">
                                        <div className="flex flex-col items-center w-1/3">
                                            <div className="bg-amber-600 text-white p-3 rounded-lg shadow w-48 text-center">
                                                <p className="text-xs font-bold">Chef Département</p>
                                                <p className="text-sm font-extrabold">Management</p>
                                            </div>
                                            {/* Masters liés */}
                                            <div className="h-6 w-0.5 bg-amber-700"></div>
                                            <div className="w-full h-0.5 bg-amber-700 relative">
                                                <div className="absolute left-0 top-0 w-0.5 h-4 bg-amber-700"></div>
                                                <div className="absolute right-0 top-0 w-0.5 h-4 bg-amber-700"></div>
                                            </div>
                                            <div className="flex gap-2 mt-4">
                                                <div className="bg-white border border-amber-200 p-2 rounded text-center w-24">
                                                    <p className="text-[10px] text-slate-500">Master</p>
                                                    <p className="text-xs font-bold text-slate-800">CCA</p>
                                                </div>
                                                <div className="bg-white border border-amber-200 p-2 rounded text-center w-24">
                                                    <p className="text-[10px] text-slate-500">Master</p>
                                                    <p className="text-xs font-bold text-slate-800">FEIF</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center w-1/3">
                                            <div className="bg-amber-600 text-white p-3 rounded-lg shadow w-48 text-center">
                                                <p className="text-xs font-bold">Chef Département</p>
                                                <p className="text-sm font-extrabold">Economie</p>
                                            </div>
                                            <div className="h-6 w-0.5 bg-amber-700"></div>
                                            <div className="bg-white border border-amber-200 p-2 rounded text-center w-40">
                                                <p className="text-[10px] text-slate-500">Responsable Master</p>
                                                <p className="text-xs font-bold text-slate-800">Eco. Appliquée</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center w-1/3">
                                            <div className="bg-amber-600 text-white p-3 rounded-lg shadow w-48 text-center">
                                                <p className="text-xs font-bold">Chef Département</p>
                                                <p className="text-sm font-extrabold">Ingénierie Juridique</p>
                                            </div>
                                            <div className="h-6 w-0.5 bg-amber-700"></div>
                                            <div className="bg-white border border-amber-200 p-2 rounded text-center w-40">
                                                <p className="text-[10px] text-slate-500">Responsable Master</p>
                                                <p className="text-xs font-bold text-slate-800">IDT / Foncier</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ORGANIGRAMME SDD (New Structure) */}
                            {isSDD && (
                                <div className="flex flex-col items-center w-full relative">
                                    {/* 1. DIRECTEUR */}
                                    <div className="bg-emerald-600 text-white p-6 rounded-xl shadow-lg w-72 text-center z-10 border-b-4 border-emerald-800 mb-8">
                                        <p className="text-sm font-bold text-emerald-100 uppercase mb-2">Directeur</p>
                                        <p className="text-lg font-extrabold">Dr Abdoulaye FAYE</p>
                                    </div>

                                    {/* Central Vertical Spine */}
                                    <div className="h-96 w-1 bg-amber-800 absolute top-20"></div>

                                    {/* 2. SERVICES (Left and Right Branches) */}
                                    <div className="w-[800px] h-[300px] relative mt-4">
                                        {/* Left Branch (Logistique, Biblio, Placement) */}
                                        <div className="absolute left-0 w-1/2 flex flex-col items-end pr-8 gap-8">
                                            <div className="flex items-center w-full justify-end">
                                                <div className="bg-emerald-700 text-white p-3 rounded w-56 text-center shadow">Logistique</div>
                                                <div className="w-24 h-1 bg-amber-800"></div>
                                            </div>
                                            <div className="flex items-center w-full justify-end">
                                                <div className="bg-emerald-700 text-white p-3 rounded w-56 text-center shadow">Bibliothécaire</div>
                                                <div className="w-24 h-1 bg-amber-800"></div>
                                            </div>
                                            <div className="flex items-center w-full justify-end">
                                                <div className="bg-emerald-700 text-white p-3 rounded w-56 text-center shadow">Svc. Placement Étudiants</div>
                                                <div className="w-24 h-1 bg-amber-800"></div>
                                            </div>
                                        </div>

                                        {/* Right Branch (Pédagogique, Finance) */}
                                        <div className="absolute right-0 w-1/2 flex flex-col items-start pl-8 gap-8">
                                            <div className="flex items-center w-full">
                                                 <div className="w-24 h-1 bg-amber-800"></div>
                                                 <div className="bg-emerald-600 text-white p-3 rounded w-56 text-center shadow">Responsable Pédagogique</div>
                                            </div>
                                            <div className="flex items-center w-full">
                                                 <div className="w-24 h-1 bg-amber-800"></div>
                                                 <div className="bg-emerald-600 text-white p-3 rounded w-56 text-center shadow">Assistante Pédagogique</div>
                                            </div>
                                            <div className="flex items-center w-full">
                                                 <div className="w-24 h-1 bg-amber-800"></div>
                                                 <div className="bg-emerald-600 text-white p-3 rounded w-56 text-center shadow">Assistante Pédagogique</div>
                                            </div>
                                            <div className="flex items-center w-full">
                                                 <div className="w-24 h-1 bg-amber-800"></div>
                                                 <div className="bg-emerald-600 text-white p-3 rounded w-56 text-center shadow">Service des Finances</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. DEPARTMENTS BAR */}
                                    <div className="w-[800px] h-1 bg-amber-800 mt-8 relative">
                                        <div className="absolute left-0 w-1 h-8 bg-amber-800"></div>
                                        <div className="absolute left-1/2 w-1 h-8 bg-amber-800"></div>
                                        <div className="absolute right-0 w-1 h-8 bg-amber-800"></div>
                                    </div>

                                    {/* 4. DEPARTMENTS NODES */}
                                    <div className="flex justify-between w-[850px] mt-8">
                                        {/* Santé Com */}
                                        <div className="flex flex-col items-center">
                                            <div className="bg-emerald-500 text-white p-4 rounded-lg shadow-md w-56 text-center font-bold">
                                                Chef Département<br/>Santé Communautaire
                                            </div>
                                        </div>
                                        
                                        {/* Dev Durable */}
                                        <div className="flex flex-col items-center relative">
                                            <div className="bg-emerald-500 text-white p-4 rounded-lg shadow-md w-56 text-center font-bold z-10">
                                                Chef Département<br/>Développement Durable
                                            </div>
                                            {/* Link to Masters */}
                                            <div className="h-10 w-1 bg-amber-800"></div>
                                            <div className="bg-blue-600 text-white px-6 py-2 rounded text-sm font-bold shadow-sm">
                                                Responsable des Masters
                                            </div>
                                            <div className="h-8 w-1 bg-amber-800"></div>
                                            {/* Masters Tree */}
                                            <div className="w-[600px] h-1 bg-amber-800 relative">
                                                <div className="absolute left-0 h-6 w-1 bg-amber-800"></div>
                                                <div className="absolute left-1/3 h-6 w-1 bg-amber-800"></div>
                                                <div className="absolute right-1/3 h-6 w-1 bg-amber-800"></div>
                                                <div className="absolute right-0 h-6 w-1 bg-amber-800"></div>
                                            </div>
                                            <div className="flex justify-between w-[640px] mt-6">
                                                <div className="bg-blue-500 text-white p-2 rounded w-32 text-center text-xs font-bold">Promotion Santé</div>
                                                <div className="bg-blue-500 text-white p-2 rounded w-32 text-center text-xs font-bold">Nutrition</div>
                                                <div className="bg-blue-500 text-white p-2 rounded w-32 text-center text-xs font-bold">Suivi-Evaluation</div>
                                                <div className="bg-blue-500 text-white p-2 rounded w-32 text-center text-xs font-bold">Santé Com.</div>
                                            </div>
                                        </div>

                                        {/* Médecine */}
                                        <div className="flex flex-col items-center">
                                            <div className="bg-emerald-500 text-white p-4 rounded-lg shadow-md w-56 text-center font-bold">
                                                Chef Département<br/>Médecine
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                )}

                {/* 3. FORMATIONS TAB - NEW DESIGN CATALOGUE */}
                {activeTab === 'formations' && (
                    <div className="space-y-12">
                         {ufr.departments.map(dept => {
                            const deptPrograms = ufr.programs.filter(p => p.departmentCode === dept.code);
                            
                            // Icons mapping based on codes
                            const Icon = dept.code === 'MATH' ? Calculator :
                                         dept.code === 'PHYS' ? Zap :
                                         dept.code === 'CHIM' ? Beaker :
                                         dept.code === 'TIC' ? Laptop : 
                                         dept.code === 'ECO' ? TrendingUp :
                                         dept.code === 'MGMT' ? Briefcase :
                                         dept.code === 'DROIT' ? Scale : 
                                         dept.code === 'SANTE' ? HeartPulse :
                                         dept.code === 'DD' ? Leaf :
                                         dept.code === 'MED' ? Stethoscope : Layers;
                            
                            // Colors mapping
                            let colorClass = '';
                            if (isSatic) {
                                colorClass = dept.code === 'MATH' ? 'text-indigo-600 border-indigo-200 bg-indigo-50' :
                                               dept.code === 'PHYS' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                                               dept.code === 'CHIM' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' :
                                               'text-blue-600 border-blue-200 bg-blue-50';
                            } else if (isEcomij) {
                                colorClass = dept.code === 'ECO' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' :
                                             dept.code === 'MGMT' ? 'text-amber-600 border-amber-200 bg-amber-50' :
                                             'text-red-600 border-red-200 bg-red-50'; // DROIT
                            } else {
                                // SDD Colors
                                colorClass = dept.code === 'SANTE' ? 'text-pink-600 border-pink-200 bg-pink-50' :
                                             dept.code === 'DD' ? 'text-green-600 border-green-200 bg-green-50' :
                                             'text-cyan-600 border-cyan-200 bg-cyan-50'; // MED
                            }

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
                                            <h4 className={`flex items-center gap-2 text-lg font-bold mb-6 pb-2 border-b ${isSatic ? 'text-blue-800 border-blue-100' : isEcomij ? 'text-amber-800 border-amber-100' : 'text-emerald-800 border-emerald-100'}`}>
                                                <GraduationCap className={isSatic ? "text-blue-600" : isEcomij ? "text-amber-600" : "text-emerald-600"} /> Licences
                                            </h4>
                                            <div className="grid gap-4">
                                                {deptPrograms.filter(p => p.level === 'Licence').map((prog, idx) => (
                                                    <div key={idx} className={`group p-4 rounded-xl border border-slate-200 transition-all bg-white flex flex-col gap-2 hover:shadow-md ${isSatic ? 'hover:border-blue-400' : isEcomij ? 'hover:border-amber-400' : 'hover:border-emerald-400'}`}>
                                                        <div className="flex justify-between items-start">
                                                            <strong className={`text-slate-800 font-bold text-base transition-colors ${isSatic ? 'group-hover:text-blue-700' : isEcomij ? 'group-hover:text-amber-700' : 'group-hover:text-emerald-700'}`}>{prog.name}</strong>
                                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isSatic ? 'bg-blue-50 text-blue-600 border-blue-100' : isEcomij ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>L3</span>
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
                                    <Search className={`h-5 w-5 text-slate-400 group-focus-within:${isSatic ? 'text-blue-500' : isEcomij ? 'text-amber-500' : 'text-emerald-500'} transition-colors`} />
                                </div>
                                <input
                                    type="text"
                                    className={`block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-full leading-5 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 ${isSatic ? 'focus:ring-blue-100 focus:border-blue-400' : isEcomij ? 'focus:ring-amber-100 focus:border-amber-400' : 'focus:ring-emerald-100 focus:border-emerald-400'} sm:text-sm shadow-sm transition-all`}
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
                                    const gradient = theme.gradientStaff[name.length % theme.gradientStaff.length];
                                    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

                                    return (
                                        <div key={idx} className={`bg-white rounded-xl border border-slate-100 p-6 flex items-center gap-4 hover:shadow-lg ${isSatic ? 'hover:border-blue-100' : isEcomij ? 'hover:border-amber-100' : 'hover:border-emerald-100'} transition-all group`}>
                                            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform`}>
                                                {initials}
                                            </div>
                                            <div>
                                                <h4 className={`font-bold text-slate-800 text-sm ${isSatic ? 'group-hover:text-blue-700' : isEcomij ? 'group-hover:text-amber-700' : 'group-hover:text-emerald-700'} transition-colors`}>{name}</h4>
                                                <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mt-0.5">Enseignant-Chercheur</p>
                                            </div>
                                            <button className={`ml-auto p-2 text-slate-300 ${isSatic ? 'hover:text-blue-600 hover:bg-blue-50' : isEcomij ? 'hover:text-amber-600 hover:bg-amber-50' : 'hover:text-emerald-600 hover:bg-emerald-50'} rounded-full transition-all opacity-0 group-hover:opacity-100`}>
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

  return null; // Fallback should not be reached with current logic
};
