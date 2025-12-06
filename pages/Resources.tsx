
import React, { useState, useMemo } from 'react';
import { Search, FileText, Download, FolderOpen, BookOpen, Filter, Layers, GraduationCap, X, ChevronRight, PenTool, FileQuestion, Sparkles, Clock, HardDrive, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UFRS } from '../constants';
import { CourseResource } from '../types';

export const Resources: React.FC = () => {
  const { courses, incrementDownload, loading } = useApp();

  const [activeUFR, setActiveUFR] = useState<string>('SATIC');
  const [activeLevel, setActiveLevel] = useState<string>('L1');
  const [selectedType, setSelectedType] = useState<'ALL' | 'COURS' | 'TD' | 'TP' | 'EXAMEN'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const LEVEL_ORDER = ['L1', 'L2', 'L3', 'M1', 'M2'];
  
  // --- STATS CALCUL ---
  const totalFiles = courses.length;
  const totalDownloads = courses.reduce((acc, curr) => acc + curr.downloads, 0);
  const recentFiles = courses.filter(c => {
      const date = new Date(c.dateAdded.split('/').reverse().join('-')); // Assuming DD/MM/YYYY
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      return diffDays <= 30;
  }).length;

  // --- FILTERING LOGIC ---
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchUFR = course.ufr === activeUFR;
      const matchLevel = searchTerm ? true : course.level === activeLevel; // Ignore level if searching
      const matchType = selectedType === 'ALL' || course.type === selectedType;
      
      const searchLower = searchTerm.toLowerCase();
      const matchSearch = !searchTerm || 
        course.title.toLowerCase().includes(searchLower) || 
        course.subject.toLowerCase().includes(searchLower) ||
        course.filiere.toLowerCase().includes(searchLower);
      
      return matchUFR && matchLevel && matchType && matchSearch;
    });
  }, [courses, activeUFR, activeLevel, selectedType, searchTerm]);

  // Group by Filiere -> Subject
  const groupedContent = useMemo(() => {
    const grouped: Record<string, Record<string, CourseResource[]>> = {};
    
    filteredCourses.forEach(course => {
      if (!grouped[course.filiere]) grouped[course.filiere] = {};
      if (!grouped[course.filiere][course.subject]) grouped[course.filiere][course.subject] = [];
      grouped[course.filiere][course.subject].push(course);
    });
    return grouped;
  }, [filteredCourses]);

  // --- HELPERS ---
  const currentUFRData = UFRS[activeUFR];

  const handleDownload = (resource: CourseResource) => {
      incrementDownload(resource.id);
      if (resource.fileUrl) {
          window.open(resource.fileUrl, '_blank');
      } else {
          alert("Fichier non disponible pour le moment.");
      }
  };

  const getTypeColor = (type: string) => {
      switch(type) {
          case 'COURS': return 'text-blue-600 bg-blue-50 border-blue-100';
          case 'TD': return 'text-amber-600 bg-amber-50 border-amber-100';
          case 'TP': return 'text-purple-600 bg-purple-50 border-purple-100';
          case 'EXAMEN': return 'text-red-600 bg-red-50 border-red-100';
          default: return 'text-slate-600 bg-slate-50 border-slate-100';
      }
  };

  const getTypeIcon = (type: string) => {
      switch(type) {
          case 'COURS': return <BookOpen size={16} />;
          case 'TD': return <PenTool size={16} />;
          case 'TP': return <Layers size={16} />;
          case 'EXAMEN': return <FileQuestion size={16} />;
          default: return <FileText size={16} />;
      }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      
      {/* 1. HERO HEADER WITH STATS */}
      <div className="bg-slate-900 pt-24 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          {/* Abstract Background */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-500/10 rounded-full blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

          <div className="max-w-7xl mx-auto relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-8">
                  <div>
                      <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-xs mb-2">
                          <Sparkles size={14} /> Centre de Ressources
                      </div>
                      <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                          Bibliothèque <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Numérique</span>
                      </h1>
                  </div>
                  
                  {/* Quick Stats Pills */}
                  <div className="flex gap-4">
                      <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3">
                          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300"><FileText size={18}/></div>
                          <div>
                              <p className="text-2xl font-bold text-white leading-none">{totalFiles}</p>
                              <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Documents</p>
                          </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3">
                          <div className="p-2 bg-green-500/20 rounded-lg text-green-300"><Download size={18}/></div>
                          <div>
                              <p className="text-2xl font-bold text-white leading-none">{totalDownloads}</p>
                              <p className="text-[10px] text-slate-400 font-medium uppercase mt-1">Téléchargements</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* 2. FLOATING CONTROL BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-2 md:p-3 flex flex-col gap-4">
              
              {/* Top Row: Search & UFR Selection */}
              <div className="flex flex-col md:flex-row gap-4 p-2">
                  {/* Search Input */}
                  <div className="relative flex-grow group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                      </div>
                      <input
                          type="text"
                          className="block w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl leading-5 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700"
                          placeholder="Rechercher par titre, matière, prof..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                  </div>

                  {/* UFR Selector (Pills) */}
                  <div className="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto no-scrollbar">
                      {Object.values(UFRS).map((ufr) => (
                          <button
                              key={ufr.id}
                              onClick={() => setActiveUFR(ufr.id)}
                              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                                  activeUFR === ufr.id
                                      ? 'bg-white text-slate-900 shadow-md shadow-slate-200 ring-1 ring-black/5'
                                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                              }`}
                          >
                              <span className={`w-2 h-2 rounded-full ${ufr.color}`}></span>
                              {ufr.name}
                          </button>
                      ))}
                  </div>
              </div>

              <div className="h-px bg-slate-100 mx-4"></div>

              {/* Bottom Row: Level & Type Filters */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 px-4 pb-2">
                  
                  {/* Level Segmented Control */}
                  <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide mr-2">Niveau:</span>
                      {LEVEL_ORDER.map((level) => (
                          <button
                              key={level}
                              onClick={() => setActiveLevel(level)}
                              className={`w-10 h-10 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                                  activeLevel === level
                                      ? `bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-110`
                                      : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800'
                              }`}
                          >
                              {level}
                          </button>
                      ))}
                  </div>

                  {/* Type Filters */}
                  <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                      {(['ALL', 'COURS', 'TD', 'TP', 'EXAMEN'] as const).map((type) => (
                          <button
                              key={type}
                              onClick={() => setSelectedType(type)}
                              className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all whitespace-nowrap flex items-center gap-2 ${
                                  selectedType === type
                                      ? `${getTypeColor(type)} shadow-sm`
                                      : 'bg-white text-slate-500 border-transparent hover:bg-slate-50'
                              }`}
                          >
                              {type !== 'ALL' && getTypeIcon(type)}
                              {type === 'ALL' ? 'Tous les types' : type}
                          </button>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      {/* 3. CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-slate-500 font-medium animate-pulse">Chargement de la bibliothèque...</p>
              </div>
          ) : Object.keys(groupedContent).length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
                  <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search size={40} className="text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Aucun document trouvé</h3>
                  <p className="text-slate-500 mt-2 max-w-md mx-auto">
                      Il semble qu'il n'y ait pas de ressources correspondant à vos critères pour le moment. Essayez de changer de niveau ou de filtre.
                  </p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedType('ALL'); }}
                    className="mt-8 px-6 py-3 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors"
                  >
                      Réinitialiser les filtres
                  </button>
              </div>
          ) : (
              <div className="space-y-12">
                  {Object.entries(groupedContent).map(([filiereName, subjects]) => (
                      <div key={filiereName} className="animate-fade-in">
                          {/* Section Header (Filiere) */}
                          <div className="flex items-center gap-4 mb-6">
                              <div className={`p-3 rounded-xl ${currentUFRData.color.replace('bg-', 'bg-opacity-10 text-')}`}>
                                  <GraduationCap size={24} />
                              </div>
                              <div>
                                  <h2 className="text-xl font-bold text-slate-800">{filiereName}</h2>
                                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{activeLevel} • {Object.keys(subjects).length} Matières</p>
                              </div>
                              <div className="h-px bg-slate-200 flex-grow ml-4"></div>
                          </div>

                          {/* Masonry Grid for Subjects */}
                          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                              {Object.entries(subjects).map(([subjectName, resources]) => (
                                  <div key={subjectName} className="bg-white rounded-2xl p-1 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                      <div className="bg-slate-50/50 rounded-xl p-5 border-b border-slate-100 flex justify-between items-center">
                                          <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                              <FolderOpen size={18} className="text-slate-400" />
                                              {subjectName}
                                          </h3>
                                          <span className="bg-white px-2 py-1 rounded text-[10px] font-bold text-slate-500 border border-slate-200 shadow-sm">
                                              {resources.length} fichiers
                                          </span>
                                      </div>
                                      
                                      <div className="p-2 space-y-2">
                                          {resources.map(res => (
                                              <div key={res.id} className="group relative bg-white border border-slate-100 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-default flex items-start gap-4">
                                                  {/* Icon Box */}
                                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${getTypeColor(res.type)} bg-opacity-10 border transition-transform group-hover:scale-105`}>
                                                      {getTypeIcon(res.type)}
                                                  </div>

                                                  {/* Content */}
                                                  <div className="flex-grow min-w-0">
                                                      <div className="flex justify-between items-start">
                                                          <h4 className="font-bold text-slate-800 text-sm truncate pr-2 group-hover:text-blue-700 transition-colors" title={res.title}>
                                                              {res.title}
                                                          </h4>
                                                          <span className={`flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded border ${getTypeColor(res.type)} bg-opacity-10`}>
                                                              {res.type}
                                                          </span>
                                                      </div>
                                                      
                                                      <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-medium">
                                                          <span className="flex items-center gap-1 hover:text-slate-600"><Clock size={12}/> {res.dateAdded}</span>
                                                          <span className="flex items-center gap-1 hover:text-slate-600"><HardDrive size={12}/> {res.size}</span>
                                                          <span className="flex items-center gap-1 hover:text-slate-600 truncate max-w-[100px]"><FolderOpen size={12}/> {res.author}</span>
                                                      </div>
                                                  </div>

                                                  {/* Action Button */}
                                                  <button 
                                                      onClick={(e) => { e.stopPropagation(); handleDownload(res); }}
                                                      className="absolute right-4 bottom-4 md:static md:w-10 md:h-10 md:bg-white md:border md:border-slate-200 md:text-slate-400 md:hover:bg-blue-600 md:hover:border-blue-600 md:hover:text-white rounded-xl flex items-center justify-center transition-all shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100"
                                                      title="Télécharger"
                                                  >
                                                      <Download size={18} />
                                                  </button>
                                              </div>
                                          ))}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </div>
                  ))}
              </div>
          )}
      </div>
    </div>
  );
};
