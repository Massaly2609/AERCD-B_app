
import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowRight, Book, Users, Star, Download, Zap, Activity, Leaf, ChevronRight, Globe, Layers, Award, Sparkles, MousePointer2, ChevronDown, Cpu, Calculator, Atom, FlaskConical, Microscope } from 'lucide-react';

const { Link } = ReactRouterDOM;

export const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden bg-slate-50 font-sans selection:bg-amber-200 selection:text-amber-900">
      
      {/* =========================================
          1. HERO SECTION - IMMERSIVE & CINEMATIC
         ========================================= */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
           <img 
            src="https://uadb.edu.sn/images/2022/01/19/gallery.png"
            alt="Campus UADB" 
            className="w-full h-full object-cover scale-105 animate-pulse-slow"
          />
          {/* Sophisticated Gradient Overlay - Optimized for readability and elegance on the new image */}
          <div className="absolute inset-0 bg-slate-900/50 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-slate-900/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
            <div className="animate-fade-in-up space-y-8">
                
                {/* UADB Logo Integration */}
                <div className="flex justify-center mb-6">
                    <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-4 transform hover:scale-105 transition-transform duration-300">
                        <img 
                            src="https://uadb.edu.sn/images/img-logo-uadb/nouveau-logo-uadb.png" 
                            alt="Logo UADB" 
                            className="h-12 w-auto object-contain brightness-0 invert"
                        />
                        <div className="h-8 w-px bg-white/30"></div>
                        <div className="text-left">
                            <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest leading-tight">Université de Tutelle</p>
                            <p className="text-xs text-white font-extrabold tracking-wide">Université Alioune Diop</p>
                        </div>
                    </div>
                </div>

                {/* Main Headline */}
                <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tight drop-shadow-2xl">
                    L'Excellence <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 font-serif italic pr-4">
                        au service de l'avenir
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg md:text-2xl text-slate-100 font-light max-w-2xl mx-auto leading-relaxed opacity-90 text-shadow-sm">
                    Bienvenue sur la plateforme numérique dédiée aux étudiants ressortissants de Diembering à l'Université Alioune Diop de Bambey.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-5 justify-center pt-8">
                    <Link to="/resources" className="group relative px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_20px_60px_-10px_rgba(255,255,255,0.5)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden">
                        <span className="relative z-10">Bibliothèque Numérique</span>
                        <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    
                    <Link to="/amicale" className="group px-8 py-4 bg-white/10 border border-white/30 text-white rounded-full font-bold text-lg backdrop-blur-md hover:bg-white/20 hover:border-white/50 transition-all flex items-center justify-center gap-3 shadow-lg">
                        <Users size={20} className="text-amber-300" />
                        Découvrir l'Amicale
                    </Link>
                </div>
            </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce text-white/70">
            <span className="text-[10px] uppercase tracking-widest font-medium">Explorer</span>
            <ChevronDown size={20} />
        </div>
      </section>


      {/* =========================================
          2. UFR SATIC - HYBRID PRESTIGE (Royal Blue & Gold)
         ========================================= */}
      <section className="py-28 relative bg-white overflow-hidden">
        {/* Royal Background Elements */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-blue-50/60 -skew-x-12 translate-x-32 z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50/60 rounded-full blur-[100px] z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
                
                {/* Left Column: Typography & Content */}
                <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-700 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-200">
                        <Atom size={14} className="animate-spin-slow text-amber-300" /> Sciences Appliquées & TIC
                    </div>

                    <h2 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[0.9]">
                        L'Avant-Garde <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700 font-serif italic relative">
                            Scientifique
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-400 opacity-60" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00025 6.99997C25.7501 9.75646 59.0888 2.39999 71.9443 2.05352C87.9705 1.62158 98.7107 4.19561 113.435 5.56475C128.16 6.93388 147.288 6.00001 197.001 2.00003" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                    </h2>

                    <div className="flex gap-6 items-start">
                         <div className="w-1.5 h-24 bg-gradient-to-b from-amber-500 to-transparent rounded-full mt-2"></div>
                         <p className="text-xl text-slate-700 leading-relaxed font-light">
                             L'UFR SATIC est le fer de lance de l'innovation technologique à l'UADB. 
                             Un environnement d'excellence où <span className="font-semibold text-blue-700">mathématiques</span>, <span className="font-semibold text-blue-700">physique</span>, <span className="font-semibold text-blue-700">chimie</span> et <span className="font-semibold text-blue-700">informatique</span> 
                             convergent pour former les ingénieurs de demain.
                         </p>
                    </div>

                    {/* Organic Floating Cards (SDD Style applied to SATIC) */}
                    <div className="flex flex-wrap gap-4 pt-4">
                        <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-md border border-slate-100 hover:-translate-y-1 transition-transform">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-full"><Calculator size={20} /></div>
                            <span className="font-bold text-slate-700">Maths</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-md border border-slate-100 hover:-translate-y-1 transition-transform">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-full"><Zap size={20} /></div>
                            <span className="font-bold text-slate-700">Physique</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-md border border-slate-100 hover:-translate-y-1 transition-transform">
                            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-full"><FlaskConical size={20} /></div>
                            <span className="font-bold text-slate-700">Chimie</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-md border border-slate-100 hover:-translate-y-1 transition-transform">
                            <div className="p-2 bg-cyan-50 text-cyan-600 rounded-full"><Cpu size={20} /></div>
                            <span className="font-bold text-slate-700">TIC</span>
                        </div>
                    </div>

                    <div className="pt-6">
                        <Link to="/ufr/SATIC" className="inline-flex items-center gap-3 px-8 py-4 bg-blue-700 text-white rounded-full font-bold shadow-xl hover:bg-blue-800 hover:shadow-blue-200 transition-all group">
                            Découvrir le Département <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                        </Link>
                    </div>
                </div>

                {/* Right Column: Director & Visuals (Editorial Prestige Style) */}
                <div className="lg:col-span-6 order-1 lg:order-2 relative">
                    <div className="relative z-20 mx-auto max-w-sm lg:max-w-md">
                        {/* Decorative Frames */}
                        <div className="absolute top-6 -right-6 w-full h-full border-2 border-amber-200 rounded-[2rem] z-0"></div>
                        <div className="absolute -bottom-6 -left-6 w-full h-full bg-blue-50 rounded-[2rem] z-0"></div>
                        
                        {/* Main Image */}
                        <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl aspect-[3/4] group border-4 border-white">
                             <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-transparent to-transparent opacity-40 z-10"></div>
                             <img 
                                src="https://uadb.edu.sn/images/2025/11/04/Capture-decran-2025-02-26-a-11.22.47.jpg" 
                                alt="Pr Issa SAMB, Directeur SATIC" 
                                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105" 
                             />
                             
                             {/* Editorial Name Tag */}
                             <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                                 <div className="bg-white/95 backdrop-blur-sm p-6 rounded-t-2xl border-t-4 border-amber-500 shadow-lg">
                                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Le Directeur</p>
                                     <h3 className="text-2xl font-serif font-bold text-slate-900">Pr. Issa SAMB</h3>
                                     <p className="text-slate-600 text-sm mt-2 italic">"L'innovation est notre ADN."</p>
                                 </div>
                             </div>
                        </div>

                        {/* Floating Lab Image Badge */}
                        <div className="absolute -top-8 -left-12 w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden z-30 hidden md:block animate-float">
                            <img src="https://uadb.edu.sn/images/2025/11/04/sat111.jpg" alt="Labo" className="w-full h-full object-cover" />
                        </div>
                         {/* Floating Tech Image Badge */}
                         <div className="absolute top-20 -right-12 w-24 h-24 rounded-2xl rotate-6 border-4 border-white shadow-xl overflow-hidden z-30 hidden md:block animate-float animation-delay-2000">
                            <img src="https://uadb.edu.sn/images/2025/11/04/sat44.jpg" alt="Tech" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>


      {/* =========================================
          3. UFR ECOMIJ - THE BUSINESS SCHOOL (Premium Editorial)
         ========================================= */}
      <section className="py-32 bg-[#F9F7F2] text-slate-900 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Editorial Layout */}
            <div className="grid md:grid-cols-12 gap-12 items-center mb-20">
                <div className="md:col-span-5 order-2 md:order-1">
                     <div className="relative">
                        {/* Decorative Frame */}
                        <div className="absolute -top-6 -left-6 w-full h-full border-2 border-amber-200 rounded-sm"></div>
                        <div className="relative overflow-hidden rounded-sm shadow-2xl aspect-[4/5]">
                            <img src="https://uadb.edu.sn/images/2025/11/04/dr-ecomij.jpg" alt="Directeur ECOMIJ" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000" />
                        </div>
                        <div className="absolute -bottom-8 -right-8 bg-white p-6 shadow-xl max-w-xs border-t-4 border-amber-600 hidden md:block">
                            <p className="font-serif italic text-slate-600 text-lg">"L'excellence académique au service du développement."</p>
                        </div>
                     </div>
                </div>

                <div className="md:col-span-7 order-1 md:order-2">
                    <span className="text-amber-700 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Économie • Management • Droit</span>
                    <h2 className="text-6xl md:text-8xl font-serif text-slate-900 mb-8 leading-[0.9]">
                        UFR <span className="italic text-amber-600">ECOMIJ</span>
                    </h2>
                    <div className="w-24 h-1 bg-amber-600 mb-8"></div>
                    <p className="text-xl text-slate-600 font-light leading-relaxed mb-10 max-w-2xl">
                        Formez-vous aux métiers de la décision. Une approche pluridisciplinaire rigoureuse alliant expertise technique et vision stratégique pour les leaders de demain.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                        <div className="px-4 py-2 bg-stone-100 text-stone-600 rounded text-sm font-bold uppercase tracking-wide">Finance</div>
                        <div className="px-4 py-2 bg-stone-100 text-stone-600 rounded text-sm font-bold uppercase tracking-wide">Droit des Affaires</div>
                        <div className="px-4 py-2 bg-stone-100 text-stone-600 rounded text-sm font-bold uppercase tracking-wide">Management</div>
                    </div>

                    <div className="mt-12">
                         <Link to="/ufr/ECOMIJ" className="inline-flex items-center gap-3 text-amber-800 font-bold text-lg hover:gap-5 transition-all group">
                             Découvrir les Masters <span className="bg-amber-100 p-2 rounded-full group-hover:bg-amber-200 transition-colors"><ArrowRight size={20} /></span>
                         </Link>
                    </div>
                </div>
            </div>

            {/* Gallery Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group relative overflow-hidden rounded-sm shadow-lg h-64">
                    <img src="https://uadb.edu.sn/images/2025/11/04/eco1.jpg" alt="Amphi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-amber-900/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute bottom-0 left-0 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-900">Amphithéâtre</div>
                </div>
                <div className="group relative overflow-hidden rounded-sm shadow-lg h-64">
                    <img src="https://uadb.edu.sn/images/2025/11/04/eco4.jpg" alt="Cours" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-amber-900/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute bottom-0 left-0 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-900">Pédagogie</div>
                </div>
                <div className="group relative overflow-hidden rounded-sm shadow-lg h-64 bg-slate-900 flex items-center justify-center text-center p-6 cursor-pointer hover:bg-slate-800 transition-colors">
                     <Link to="/ufr/ECOMIJ" className="text-white">
                        <Award size={40} className="mx-auto mb-4 text-amber-400" />
                        <h4 className="text-2xl font-serif italic mb-2">Rejoignez l'élite</h4>
                        <p className="text-sm text-slate-400">Voir les conditions d'admission</p>
                     </Link>
                </div>
            </div>

        </div>
      </section>


      {/* =========================================
          4. UFR SDD - SUSTAINABLE LIFE (Organic & Soft)
         ========================================= */}
      <section className="py-32 bg-emerald-50 relative overflow-hidden">
        {/* Soft Background Shapes */}
        <div className="absolute -top-32 -right-32 w-[800px] h-[800px] bg-green-200/40 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-[100px] mix-blend-multiply pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-6">
                    <Leaf size={14} /> Santé & Environnement
                </div>
                <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
                    Au cœur du <span className="text-emerald-600">Vivant</span>
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed">
                    UFR Santé et Développement Durable. Une approche holistique pour former les professionnels qui prendront soin de nos communautés et de notre planète.
                </p>
            </div>

            {/* Organic Gallery Layout */}
            <div className="relative h-auto md:h-[600px] w-full">
                
                {/* Center Main Image - Circle Mask */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border-[20px] border-white/50 shadow-2xl overflow-hidden z-20 group">
                     <img src="https://uadb.edu.sn/images/2025/11/04/ssd1.jpg" alt="SDD Main" className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" />
                     <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-12">
                         <span className="text-white font-bold text-xl">Santé Communautaire</span>
                     </div>
                </div>

                {/* Mobile View Main Image */}
                <div className="md:hidden w-full h-64 rounded-2xl overflow-hidden mb-6 shadow-lg">
                    <img src="https://uadb.edu.sn/images/2025/11/04/ssd1.jpg" alt="SDD Main" className="w-full h-full object-cover" />
                </div>

                {/* Floating Cards (Desktop) or Stacked (Mobile) */}
                <div className="grid grid-cols-1 md:block gap-6">
                    {/* Card 1 - Top Left */}
                    <div className="md:absolute md:top-10 md:left-20 bg-white p-6 rounded-3xl shadow-xl max-w-xs z-30 hover:-translate-y-2 transition-transform duration-300">
                        <Activity className="text-emerald-500 mb-4" size={32} />
                        <h4 className="font-bold text-xl text-slate-800 mb-2">Médecine</h4>
                        <p className="text-slate-500 text-sm">Formation de médecins généralistes au service des populations locales.</p>
                    </div>

                    {/* Card 2 - Bottom Right */}
                    <div className="md:absolute md:bottom-20 md:right-20 bg-white p-6 rounded-3xl shadow-xl max-w-xs z-30 hover:-translate-y-2 transition-transform duration-300">
                        <Globe className="text-teal-500 mb-4" size={32} />
                        <h4 className="font-bold text-xl text-slate-800 mb-2">Développement Durable</h4>
                        <p className="text-slate-500 text-sm">Gestion des ressources, RSE et agriculture durable.</p>
                    </div>

                    {/* Image Bubble - Top Right */}
                    <div className="md:absolute md:top-0 md:right-32 w-48 h-48 rounded-full border-8 border-white shadow-lg overflow-hidden z-10 hidden md:block">
                        <img src="https://uadb.edu.sn/images/2025/11/04/sdd5.jpg" alt="Detail SDD" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Image Bubble - Bottom Left */}
                    <div className="md:absolute md:bottom-10 md:left-32 w-56 h-56 rounded-[3rem] border-8 border-white shadow-lg overflow-hidden z-10 hidden md:block group">
                         <img src="https://uadb.edu.sn/images/2025/11/04/Capture-decran-2025-11-04-a-10.22.04.png" alt="Directeur SDD" className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-500" />
                         <div className="absolute bottom-0 w-full bg-emerald-900/80 text-white text-center py-2 text-xs font-bold uppercase">Direction</div>
                    </div>
                </div>

                 <div className="flex justify-center mt-12 md:mt-[480px]">
                    <Link to="/ufr/SDD" className="group flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-full font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:shadow-xl transition-all">
                        Explorer l'UFR <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                 </div>
            </div>
        </div>
      </section>


      {/* =========================================
          5. FOOTER CALL TO ACTION (Clean)
         ========================================= */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden text-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
           <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">
             Rejoignez l'excellence.
           </h2>
           <p className="text-xl text-slate-300 mb-10 font-light">
             Accédez à toutes les ressources pédagogiques et restez connecté avec l'Amicale.
           </p>
           
           <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/resources" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                 <MousePointer2 size={20} /> 
                 <span>Accéder à la Bibliothèque</span>
              </Link>
              <button className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-slate-600 hover:bg-slate-800 rounded-full font-bold text-slate-300 transition-colors">
                 <Download size={20} /> 
                 <span>Guide de l'étudiant</span>
              </button>
           </div>
        </div>
      </section>

    </div>
  );
};
