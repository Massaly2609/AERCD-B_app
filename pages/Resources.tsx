
import React, { useState, useMemo } from 'react';
import { Search, FileText, Download, FolderOpen, BookOpen, Filter, Layers, GraduationCap, X, ChevronRight, PenTool, FileQuestion } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UFRS } from '../constants';
import { CourseResource } from '../types';

export const Resources: React.FC = () => {
  const { courses, incrementDownload, loading } = useApp(); // Used loading state if available

  const [activeUFR, setActiveUFR] = useState<string>('SATIC');
  const [activeLevel, setActiveLevel] = useState<string>('L1');
  const [selectedType, setSelectedType] = useState<'ALL' | 'COURS' | 'TD' | 'TP' | 'EXAMEN'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const LEVEL_ORDER = ['L1', 'L2', 'L3', 'M1', 'M2'];
  const LEVEL_LABELS: Record<string, string> = {
    'L1': 'Licence 1', 'L2': 'Licence 2', 'L3': 'Licence 3', 'M1': 'Master 1', 'M2': 'Master 2'
  };

  // --- LOGIC ---

  // 1. Base Filter (UFR + Type + Search)
  const baseFilteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchUFR = course.ufr === activeUFR;
      const matchType = selectedType === 'ALL' || course.type === selectedType;
      const searchLower = searchTerm.toLowerCase();
      const matchSearch = !searchTerm || 
        course.title.toLowerCase().includes(searchLower) || 
        course.subject.toLowerCase().includes(searchLower) ||
        course.filiere.toLowerCase().includes(searchLower);
      
      return matchUFR && matchType && matchSearch;
    });
  }, [courses, activeUFR, selectedType, searchTerm]);

  // 2. Grouping Logic
  const groupedCourses = useMemo(() => {
    const grouped: Record<string, Record<string, Record<string, CourseResource[]>>> = {};
    
    baseFilteredCourses.forEach(course => {
      if (!searchTerm && course.level !== activeLevel) return;

      const lvl = course.level;
      if (!grouped[lvl]) grouped[lvl] = {};
      if (!grouped[lvl][course.filiere]) grouped[lvl][course.filiere] = {};
      if (!grouped[lvl][course.filiere][course.subject]) grouped[lvl][course.filiere][course.subject] = [];
      grouped[lvl][course.filiere][course.subject].push(course);
    });
    return grouped;
  }, [baseFilteredCourses, activeLevel, searchTerm]);

  // --- HELPERS ---

  const getTypeIcon = (type: string) => {
      switch(type) {
          case 'COURS': return <BookOpen size={14} className="text-blue-500"/>;
          case 'TD': return <PenTool size={14} className="text-amber-500"/>;
          case 'TP': return <Layers size={14} className="text-purple-500"/>;
          case 'EXAMEN': return <FileQuestion size={14} className="text-red-500"/>;
          default: return <FileText size={14} className="text-slate-400"/>;
      }
  };

  const getTypeStyle = (type: string) => {
    switch(type) {
        case 'COURS': return 'bg-blue-50 text-blue-700 border-blue-100';
        case 'TD': return 'bg-amber-50 text-amber-700 border-amber-100';
        case 'TP': return 'bg-purple-50 text-purple-700 border-purple-100';
        case 'EXAMEN': return 'bg-red-50 text-red-700 border-red-100';
        default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  const currentUFRData = UFRS[activeUFR];

  const handleDownload = (resource: CourseResource) => {
      incrementDownload(resource.id);
      if (resource.fileUrl) {
          window.open(resource.fileUrl, '_blank');
      } else {
          alert("Fichier non disponible pour le moment.");
      }
  };

  // --- RENDER ---

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans">
      
      {/* 1. Header Section (Sticky) */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Top Row: Title & Search */}
            <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className={`p-3 rounded-xl ${currentUFRData.color.replace('bg-', 'bg-opacity-10 text-')}`}>
                        <FolderOpen size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Bibliothèque Numérique</h1>
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Ressources Pédagogiques</p>
                    </div>
                </div>

                <div className="w-full md:w-96 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                    <input 
                        type="text" 
                        placeholder={`Rechercher un cours, une matière...`}
                        className="w-full pl-11 pr-4 py-3 bg-slate-100 border-transparent focus:bg-white border focus:border-blue-500 rounded-xl focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm font-medium"
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1">
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            {/* Middle Row: UFR Tabs */}
            <div className="flex overflow-x-auto no-scrollbar space-x-6 border-b border-slate-100">
                {Object.values(UFRS).map((ufr) => {
                    const isActive = activeUFR === ufr.id;
                    return (
                        <button 
                            key={ufr.id} 
                            onClick={() => { setActiveUFR(ufr.id); setSearchTerm(''); }}
                            className={`pb-4 px-2 text-sm font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                                isActive 
                                ? `border-${ufr.color.replace('bg-', '').replace('-600', '-500')} text-slate-900` 
                                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                            }`}
                        >
                           {ufr.name}
                           {isActive && <span className={`w-1.5 h-1.5 rounded-full ${ufr.color}`}></span>}
                        </button>
                    );
                })}
            </div>

            {/* Bottom Row: Controls (Level & Type) */}
            {!searchTerm ? (
                <div className="py-4 flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in">
                    {/* Level Selector */}
                    <div className="flex p-1 bg-slate-100 rounded-lg w-full md:w-auto overflow-x-auto">
                        {LEVEL_ORDER.map((level) => (
                            <button
                                key={level}
                                onClick={() => setActiveLevel(level)}
                                className={`px-4 py-1.5 rounded-md text-sm font-bold transition-all whitespace-nowrap flex-1 md:flex-none ${
                                    activeLevel === level 
                                    ? 'bg-white text-slate-800 shadow-sm ring-1 ring-black/5' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>

                    {/* Type Filter */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <Filter size={14} className="text-slate-400 mr-1 flex-shrink-0" />
                        {(['ALL', 'COURS', 'TD', 'TP', 'EXAMEN'] as const).map((type) => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors whitespace-nowrap ${
                                    selectedType === type
                                    ? 'bg-slate-800 text-white border-slate-800'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                }`}
                            >
                                {type === 'ALL' ? 'Tout' : type}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="py-4 text-sm text-slate-500 animate-fade-in flex items-center gap-2">
                    <Search size={14} />
                    Résultats de recherche pour <span className="font-bold text-slate-900">"{searchTerm}"</span> dans {activeUFR}
                </div>
            )}
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[500px]">
        
        {loading && (
             <div className="flex justify-center py-20">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
             </div>
        )}

        {!loading && Object.keys(groupedCourses).length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <FolderOpen size={32} className="text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Aucune ressource trouvée</h3>
                <p className="text-slate-500 mt-2 max-w-sm">
                    {searchTerm 
                        ? "Essayez d'autres mots-clés ou vérifiez l'orthographe." 
                        : `Il n'y a pas encore de documents pour le niveau ${activeLevel} de l'${activeUFR}.`}
                </p>
                {searchTerm && (
                    <button onClick={() => setSearchTerm('')} className="mt-6 text-blue-600 font-bold hover:underline">
                        Effacer la recherche
                    </button>
                )}
            </div>
        )}

        {/* Results List */}
        {!loading && (
        <div className="space-y-10">
            {LEVEL_ORDER.map(level => {
                const filieres = groupedCourses[level];
                if (!filieres) return null;

                return (
                    <div key={level} className="animate-fade-in">
                        {searchTerm && (
                            <div className="flex items-center gap-4 mb-6">
                                <span className="bg-slate-900 text-white px-3 py-1 rounded-md text-sm font-bold tracking-wide">
                                    {LEVEL_LABELS[level]}
                                </span>
                                <div className="h-px bg-slate-200 flex-grow"></div>
                            </div>
                        )}

                        <div className="space-y-8">
                            {Object.entries(filieres).map(([filiereName, subjects]) => (
                                <div key={filiereName}>
                                    {/* Filiere Header */}
                                    <div className="flex items-center gap-2 mb-4 ml-1">
                                        <GraduationCap size={18} className="text-slate-400" />
                                        <h3 className="text-lg font-bold text-slate-700">{filiereName}</h3>
                                    </div>

                                    {/* Grid of Subjects */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {Object.entries(subjects).map(([subjectName, resources]) => (
                                            <div key={subjectName} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden flex flex-col">
                                                {/* Card Header */}
                                                <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                                                    <h4 className="font-bold text-slate-800 text-base line-clamp-1" title={subjectName}>
                                                        {subjectName}
                                                    </h4>
                                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-white border border-slate-200 rounded-full text-slate-500">
                                                        {resources.length}
                                                    </span>
                                                </div>

                                                {/* Card Body - List of resources */}
                                                <div className="p-2 flex-grow">
                                                    <ul className="space-y-1">
                                                        {resources.map(res => (
                                                            <li key={res.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 group/item transition-colors">
                                                                <div className="flex items-center gap-3 overflow-hidden">
                                                                    <div className={`p-1.5 rounded-md flex-shrink-0 ${getTypeStyle(res.type)}`}>
                                                                        {getTypeIcon(res.type)}
                                                                    </div>
                                                                    <div className="flex flex-col overflow-hidden">
                                                                        <span className="text-sm font-medium text-slate-700 truncate group-hover/item:text-blue-700 transition-colors" title={res.title}>
                                                                            {res.title}
                                                                        </span>
                                                                        <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                                                            {res.dateAdded} • {res.size}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <button 
                                                                    onClick={() => handleDownload(res)} 
                                                                    className="text-slate-300 hover:text-green-600 p-2 rounded-full hover:bg-green-50 transition-all opacity-0 group-hover/item:opacity-100 focus:opacity-100"
                                                                    title="Télécharger"
                                                                >
                                                                    <Download size={16} />
                                                                </button>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Card Footer */}
                                                <div className="bg-slate-50/50 p-2 border-t border-slate-100 text-center">
                                                    <button className="text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors flex items-center justify-center w-full gap-1 py-1">
                                                        Tout voir <ChevronRight size={12} />
                                                    </button>
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
        </div>
        )}
      </div>

    </div>
  );
};
