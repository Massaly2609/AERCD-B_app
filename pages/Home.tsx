import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ArrowRight, Book, Users, Star, CheckCircle, Download } from 'lucide-react';

const { Link } = ReactRouterDOM;

export const Home: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-700 via-green-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] opacity-20 bg-cover bg-center mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/50 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold tracking-wide mb-6 animate-fade-in">
            BIENVENUE SUR LE PORTAIL DE L'AMICALE
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Excellence, Solidarité, <br/><span className="text-amber-400">Réussite.</span>
          </h1>
          <p className="text-lg md:text-xl text-green-50 max-w-2xl mb-10 font-light">
            La plateforme officielle pour les étudiants de l'UADB ressortissants de Diembering.
            Retrouvez vos cours, orientez-vous et restez connectés.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/resources" className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-full text-green-900 bg-white hover:bg-green-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Accéder aux Cours
            </Link>
            <Link to="/amicale" className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-amber-400 text-base font-bold rounded-full text-white hover:bg-amber-400 hover:text-green-900 transition-all">
              Découvrir l'Amicale
            </Link>
          </div>
        </div>
      </section>

      {/* Orientation Nouveaux Bacheliers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">Nouveau Bachelier ?</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Bienvenue à l'Université Alioune Diop de Bambey ! L'AERCD-B est là pour t'accompagner dans tes premiers pas.
              Découvre les filières, les modalités d'inscription et profite de notre réseau de parrainage.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle className="text-green-500" size={20} /> Guide d'inscription pédagogique
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle className="text-green-500" size={20} /> Présentation des UFR
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle className="text-green-500" size={20} /> Logement et Restauration
              </li>
            </ul>
            <button className="mt-4 text-green-600 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Télécharger le Guide d'Accueil <Download size={18} />
            </button>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
              <Book className="mx-auto text-blue-600 mb-2" size={32} />
              <h3 className="font-bold text-slate-900 text-lg">3 UFR</h3>
              <p className="text-sm text-slate-500">SATIC, SDD, ECOMIJ</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl text-center border border-amber-100">
              <Users className="mx-auto text-amber-600 mb-2" size={32} />
              <h3 className="font-bold text-slate-900 text-lg">+500</h3>
              <p className="text-sm text-slate-500">Membres actifs</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl text-center col-span-2 border border-green-100">
              <Star className="mx-auto text-green-600 mb-2" size={32} />
              <h3 className="font-bold text-slate-900 text-lg">Excellence</h3>
              <p className="text-sm text-slate-500">Taux de réussite élevé grâce à l'entraide</p>
            </div>
          </div>
        </div>
      </section>

      {/* UFR Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 relative inline-block">
            Nos Unités de Formation
            <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-400 rounded-full opacity-70"></span>
          </h2>
          <p className="text-slate-500 mt-4 text-lg">Explorez les départements et les formations disponibles</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Link to="/ufr/SATIC" className="group block bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all border border-slate-200 overflow-hidden transform hover:-translate-y-2">
            <div className="h-40 bg-blue-600 relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-cyan-500"></div>
               <span className="text-5xl font-extrabold text-white/20 absolute -bottom-4 -right-4">SATIC</span>
               <span className="text-4xl font-bold text-white relative z-10">SATIC</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Sciences & Technologies</h3>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2">Mathématiques, Physique, Chimie, TIC, Sciences de l'ingénieur...</p>
              <div className="flex items-center text-blue-600 font-bold text-sm uppercase tracking-wide">
                Découvrir <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
          
          <Link to="/ufr/SDD" className="group block bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all border border-slate-200 overflow-hidden transform hover:-translate-y-2">
            <div className="h-40 bg-green-600 relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-green-700 to-emerald-500"></div>
               <span className="text-5xl font-extrabold text-white/20 absolute -bottom-4 -right-4">SDD</span>
               <span className="text-4xl font-bold text-white relative z-10">SDD</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">Santé & Développement</h3>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2">Santé communautaire, Médecine, Environnement, Agriculture...</p>
              <div className="flex items-center text-green-600 font-bold text-sm uppercase tracking-wide">
                Découvrir <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link to="/ufr/ECOMIJ" className="group block bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all border border-slate-200 overflow-hidden transform hover:-translate-y-2">
            <div className="h-40 bg-amber-600 relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 to-orange-500"></div>
               <span className="text-5xl font-extrabold text-white/20 absolute -bottom-4 -right-4">ECO</span>
               <span className="text-4xl font-bold text-white relative z-10">ECOMIJ</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">Économie & Droit</h3>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2">Management, Juridique, Finance, Fiscalité, Droit public...</p>
              <div className="flex items-center text-amber-600 font-bold text-sm uppercase tracking-wide">
                Découvrir <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};