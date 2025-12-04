import React, { useState, useMemo } from 'react';
import { Search, FileText, Download, Plus, AlertCircle, BookOpen, ClipboardList, Beaker, GraduationCap, FolderOpen, Briefcase } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UFRS } from '../constants';
import { CourseResource } from '../types';

export const Resources: React.FC = () => {
  const { courses, user, incrementDownload } = useApp();

  const [activeUFR, setActiveUFR] = useState<string>('SATIC');
  const [searchTerm, setSearchTerm] = useState('');

  const LEVEL_ORDER = ['L1', 'L2', 'L3', 'M1', 'M2'];
  const LEVEL_LABELS: Record<string, string> = {
    'L1': 'Licence 1', 'L2': 'Licence 2', 'L3': 'Licence 3', 'M1': 'Master 1', 'M2': 'Master 2'
  };

  // 1. Filter courses
  const filteredCourses = useMemo(() => {
    return courses.filter(course => 
      course.ufr === activeUFR && (
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.filiere.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [courses, activeUFR, searchTerm]);

  // 2. Group by Level -> Filiere -> Subject
  const resourcesGrouped = useMemo(() => {
    const grouped: Record<string, Record<string, Record<string, CourseResource[]>>> = {};
    filteredCourses.forEach(course => {
      const { level, filiere, subject } = course;
      if (!grouped[level]) grouped[level] = {};
      if (!grouped[level][filiere]) grouped[level][filiere] = {};
      if (!grouped[level][filiere][subject]) grouped[level][filiere][subject] = [];
      grouped[level][filiere][subject].push(course);
    });
    return grouped;
  }, [filteredCourses]);

  const getTypeColor = (type: string) => {
    switch (type) {
        case 'COURS': return 'text-blue-700 bg-blue-50 border-blue-200';
        case 'TD': return 'text-amber-700 bg-amber-50 border-amber-200';
        case 'TP': return 'text-purple-700 bg-purple-50 border-purple-200';
        case 'EXAMEN': return 'text-red-700 bg-red-50 border-red-200';
        default: return 'text-slate-700 bg-slate-50 border-slate-200';
    }
  };

  const getUFRColor = (ufr: string) => UFRS[ufr]?.color.replace('bg-','border-') || 'border-slate-600';

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header & Tabs */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                        <FolderOpen className="text-slate-400" /> Bibliothèque Numérique
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">Sélectionnez votre UFR pour accéder aux ressources classées.</p>
                </div>
            </div>
            <div className="flex space-x-1 overflow-x-auto no-scrollbar">
                {Object.values(UFRS).map((ufr) => (
                    <button key={ufr.id} onClick={() => setActiveUFR(ufr.id)}
                        className={`px-6 py-3 font-bold text-sm md:text-base whitespace-nowrap rounded-t-lg transition-all border-b-4 ${
                            activeUFR === ufr.id ? `${getUFRColor(ufr.id)} text-slate-900 bg-slate-50` : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                        }`}
                    >{ufr.name}</button>
                ))}
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative mb-10 max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type="text" placeholder={`Rechercher dans ${activeUFR}...`}
                className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-full shadow-sm focus:ring-2 focus:ring-slate-200 focus:border-slate-400 outline-none transition-all text-slate-700 bg-white"
                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        <div className="space-y-16 animate-fade-in">
            {LEVEL_ORDER.map(level => {
                const filieres = resourcesGrouped[level];
                if (!filieres || Object.keys(filieres).length === 0) return null;

                return (
                    <div key={level}>
                        <div className="flex items-center gap-4 mb-6">
                            <h2 className="text-xl font-bold text-slate-800 bg-slate-200 px-4 py-1 rounded-r-full">{LEVEL_LABELS[level]}</h2>
                            <div className="h-px bg-slate-200 flex-grow"></div>
                        </div>

                        <div className="space-y-8">
                            {Object.entries(filieres).map(([filiereName, subjects]) => (
                                <div key={filiereName} className="pl-4 border-l-4" style={{borderColor: UFRS[activeUFR].color.replace('bg','border').replace('-600', '-500')}}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Briefcase size={18} className="text-slate-500" />
                                        <h3 className="text-lg font-bold text-slate-700">{filiereName}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pl-4">
                                        {Object.entries(subjects).map(([subjectName, resources]) => (
                                            <div key={subjectName} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                                                <div className="px-5 py-4 bg-slate-50 border-b border-slate-100">
                                                    <h3 className="font-bold text-slate-800 text-lg">{subjectName}</h3>
                                                </div>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                                                    <div className="p-4">
                                                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-1"><BookOpen size={14} /> Cours</h4>
                                                        {resources.filter(r => r.type === 'COURS').length > 0 ? (
                                                            <ul className="space-y-2">
                                                                {resources.filter(r => r.type === 'COURS').map(c => (
                                                                    <li key={c.id} className="flex items-center justify-between group/item">
                                                                        <span className="text-sm text-slate-700 truncate" title={c.title}>{c.title}</span>
                                                                        <button onClick={() => incrementDownload(c.id)} className="text-slate-400 hover:text-blue-600 p-1" title="Télécharger"><Download size={14} /></button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : <p className="text-xs text-slate-400 italic">Aucun cours.</p>}
                                                    </div>
                                                    <div className="p-4 bg-slate-50/50">
                                                        <h4 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-1"><ClipboardList size={14} /> Travaux</h4>
                                                        {resources.filter(r => r.type !== 'COURS').length > 0 ? (
                                                            <ul className="space-y-2">
                                                                {resources.filter(r => r.type !== 'COURS').map(t => (
                                                                    <li key={t.id} className="flex items-center justify-between group/item">
                                                                        <div className="flex items-center gap-2 overflow-hidden">
                                                                            <span className={`text-[10px] font-bold px-1 rounded ${getTypeColor(t.type)}`}>{t.type}</span>
                                                                            <span className="text-sm text-slate-700 truncate" title={t.title}>{t.title}</span>
                                                                        </div>
                                                                        <button onClick={() => incrementDownload(t.id)} className="text-slate-400 hover:text-green-600 p-1" title="Télécharger"><Download size={14} /></button>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : <p className="text-xs text-slate-400 italic">Aucun TD/TP.</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}

            {filteredCourses.length === 0 && (
                 <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                    <AlertCircle className="text-slate-400 mx-auto" size={32} />
                    <h3 className="text-lg font-bold text-slate-900 mt-4">Aucune ressource trouvée</h3>
                    <p className="text-slate-500 max-w-md mx-auto mt-2">Aucun document ne correspond à vos filtres. Essayez d'élargir votre recherche.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};