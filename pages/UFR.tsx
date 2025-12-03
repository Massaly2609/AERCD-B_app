import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { UFRS } from '../constants';
import { useApp } from '../context/AppContext';
import { Layers, GraduationCap, ChevronRight } from 'lucide-react';

export const UFRView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { siteContent } = useApp();
  const ufr = id ? UFRS[id] : null;

  if (!ufr) {
    return <Navigate to="/" />;
  }

  // Use dynamic content if available, fallback to static
  const description = siteContent.ufrDescriptions[ufr.id] || ufr.description;

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