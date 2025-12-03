import React, { useState, useMemo } from 'react';
import { Search, Filter, FileText, Download, Plus, AlertCircle, BookOpen, ClipboardList, Beaker, GraduationCap, ChevronDown, ChevronRight, Briefcase } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UFRS } from '../constants';
import { useLocation } from 'react-router-dom';
import { CourseResource } from '../types';

export const Resources: React.FC = () => {
  const { courses, user, addCourse, incrementDownload } = useApp();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUFR, setSelectedUFR] = useState<string>(queryParams.get('ufr') || 'All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  // Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    type: 'COURS',
    ufr: 'SATIC',
    department: '',
    level: 'L1',
    subject: '',
    author: ''
  });

  // 1. Filter raw courses first
  const filteredRawCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            course.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesUFR = selectedUFR === 'All' || course.ufr === selectedUFR;
      const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
      
      return matchesSearch && matchesUFR && matchesLevel;
    });
  }, [courses, searchTerm, selectedUFR, selectedLevel]);

  // 2. Group by UFR -> then by Subject + Level
  const groupedResources = useMemo(() => {
    const groups: Record<string, Record<string, CourseResource[]>> = {};

    filteredRawCourses.forEach(course => {
      if (!groups[course.ufr]) {
        groups[course.ufr] = {};
      }
      // Create a unique key for Subject+Level (e.g., "Mathématiques-L1")
      // We normalize the subject name to group easier
      const subjectKey = `${course.subject}||${course.level}`; 
      
      if (!groups[course.ufr][subjectKey]) {
        groups[course.ufr][subjectKey] = [];
      }
      groups[course.ufr][subjectKey].push(course);
    });

    return groups;
  }, [filteredRawCourses]);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (user?.role !== 'admin') return;

    addCourse({
      id: Math.random().toString(36).substr(2, 9),
      ...newCourse,
      author: user.name, 
      dateAdded: new Date().toISOString().split('T')[0],
      downloads: 0,
      size: '1.5 MB', // Mock size
      type: newCourse.type as any
    });
    setIsUploadModalOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
        case 'COURS': return <BookOpen size={18} />;
        case 'TD': return <ClipboardList size={18} />;
        case 'TP': return <Beaker size={18} />;
        case 'EXAMEN': return <GraduationCap size={18} />;
        default: return <FileText size={18} />;
    }
  };

  const getTypeColor = (type: string) => {
      switch (type) {
          case 'COURS': return 'text-blue-600 bg-blue-50 border-blue-100';
          case 'TD': return 'text-amber-600 bg-amber-50 border-amber-100';
          case 'TP': return 'text-purple-600 bg-purple-50 border-purple-100';
          case 'EXAMEN': return 'text-red-600 bg-red-50 border-red-100';
          default: return 'text-slate-600 bg-slate-50 border-slate-200';
      }
  };

  const getUFRColor = (ufr: string) => {
      switch (ufr) {
          case 'SATIC': return 'border-blue-500 text-blue-700';
          case 'SDD': return 'border-green-500 text-green-700';
          case 'ECOMIJ': return 'border-amber-500 text-amber-700';
          default: return 'border-slate-500 text-slate-700';
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 border-b border-slate-200 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Espace Pédagogique</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Bibliothèque Numérique</h1>
            <p className="text-slate-500 mt-2 text-lg">Centralisation des ressources pédagogiques par UFR et Matière.</p>
          </div>
          
          {user?.role === 'admin' && (
            <button 
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-slate-900 text-white px-6 py-3 rounded-lg hover:bg-slate-800 flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
            >
              <Plus size={18} /> Ajouter une ressource
            </button>
          )}
        </div>

        {/* Professional Filters */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 mb-10 sticky top-24 z-30">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une matière, un cours..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-slate-700 placeholder-slate-400 bg-slate-50 focus:bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="md:col-span-3 relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Filter size={18} className="text-slate-400"/>
               </div>
               <select 
                 className="w-full pl-10 pr-8 py-3 border border-slate-200 rounded-lg focus:ring-green-500 outline-none bg-white appearance-none cursor-pointer hover:border-slate-300 font-medium text-slate-700"
                 value={selectedUFR}
                 onChange={(e) => setSelectedUFR(e.target.value)}
               >
                 <option value="All">Toutes les UFR</option>
                 {Object.keys(UFRS).map(u => <option key={u} value={u}>{u}</option>)}
               </select>
               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>

            <div className="md:col-span-3 relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <GraduationCap size={18} className="text-slate-400"/>
               </div>
               <select 
                 className="w-full pl-10 pr-8 py-3 border border-slate-200 rounded-lg focus:ring-green-500 outline-none bg-white appearance-none cursor-pointer hover:border-slate-300 font-medium text-slate-700"
                 value={selectedLevel}
                 onChange={(e) => setSelectedLevel(e.target.value)}
               >
                 <option value="All">Tous les niveaux</option>
                 <option value="L1">Licence 1</option>
                 <option value="L2">Licence 2</option>
                 <option value="L3">Licence 3</option>
                 <option value="M1">Master 1</option>
                 <option value="M2">Master 2</option>
               </select>
               <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>

        {/* Content Area - Grouped Display */}
        <div className="space-y-12">
          {Object.keys(groupedResources).length > 0 ? (
            Object.entries(groupedResources).map(([ufrName, subjects]) => (
              <div key={ufrName} className="animate-fade-in">
                {/* UFR Section Header */}
                <div className={`flex items-center gap-4 mb-6 pb-2 border-b-2 ${getUFRColor(ufrName).split(' ')[0]}`}>
                    <h2 className={`text-2xl font-bold ${getUFRColor(ufrName).split(' ')[1]}`}>{UFRS[ufrName]?.name || ufrName}</h2>
                    <span className="text-slate-400 text-sm font-normal hidden sm:block">| {UFRS[ufrName]?.fullName}</span>
                </div>

                <div className="grid gap-8">
                    {Object.entries(subjects).map(([subjectKey, resources]) => {
                        const [subjectName, levelName] = subjectKey.split('||');
                        
                        // Separate Cours from others (TD, TP, Exams)
                        const coursMagistraux = resources.filter(r => r.type === 'COURS');
                        const supplements = resources.filter(r => r.type !== 'COURS');

                        return (
                            <div key={subjectKey} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
                                {/* Subject Header */}
                                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-1 bg-slate-800 rounded-full"></div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">{subjectName}</h3>
                                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">{levelName} • {resources[0].department}</p>
                                        </div>
                                    </div>
                                    <div className="text-xs font-medium text-slate-400 bg-white px-2 py-1 rounded border border-slate-200">
                                        {resources.length} document{resources.length > 1 ? 's' : ''}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                                    {/* Left Column: Cours Magistraux */}
                                    <div className="p-6">
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <BookOpen size={16} /> Cours Magistraux
                                        </h4>
                                        {coursMagistraux.length > 0 ? (
                                            <div className="space-y-3">
                                                {coursMagistraux.map(course => (
                                                    <div key={course.id} className="flex items-start gap-3 p-3 rounded-lg border border-blue-100 bg-blue-50/50 hover:bg-blue-50 transition-colors group">
                                                        <div className="mt-1 text-blue-600 bg-white p-2 rounded shadow-sm">
                                                            <BookOpen size={20} />
                                                        </div>
                                                        <div className="flex-grow">
                                                            <h5 className="font-semibold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">{course.title}</h5>
                                                            <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                                                                <span className="flex items-center gap-1"><Briefcase size={10} /> {course.author}</span>
                                                                <span>• {course.size}</span>
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={() => incrementDownload(course.id)}
                                                            className="text-slate-400 hover:text-blue-600 p-2 hover:bg-white rounded-full transition-all"
                                                            title="Télécharger"
                                                        >
                                                            <Download size={18} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-6 px-4 bg-slate-50 rounded border border-dashed border-slate-200">
                                                <p className="text-sm text-slate-400 italic">Aucun support de cours disponible.</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right Column: TD / TP / Exams */}
                                    <div className="p-6 bg-slate-50/30">
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <ClipboardList size={16} /> Exercices & Pratique
                                        </h4>
                                        {supplements.length > 0 ? (
                                            <div className="grid grid-cols-1 gap-3">
                                                {supplements.map(res => (
                                                    <div key={res.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-300 shadow-sm transition-all group">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-1.5 rounded ${getTypeColor(res.type)}`}>
                                                                {getTypeIcon(res.type)}
                                                            </div>
                                                            <div>
                                                                <p className="font-medium text-slate-700 text-sm group-hover:text-slate-900">{res.title}</p>
                                                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getTypeColor(res.type)}`}>
                                                                    {res.type}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button 
                                                            onClick={() => incrementDownload(res.id)}
                                                            className="text-slate-400 hover:text-green-600 p-1.5 transition-colors"
                                                        >
                                                            <Download size={16} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-slate-400 italic">Aucun TD ou TP associé pour le moment.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
              </div>
            ))
          ) : (
             <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
               <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                   <AlertCircle className="text-slate-400" size={32} />
               </div>
               <h3 className="text-lg font-bold text-slate-900">Aucune ressource trouvée</h3>
               <p className="text-slate-500 max-w-md mx-auto mt-2">Essayez de modifier vos filtres ou effectuez une nouvelle recherche.</p>
               {user?.role === 'admin' && (
                   <button onClick={() => setIsUploadModalOpen(true)} className="mt-6 text-green-600 font-bold hover:underline">
                       Ajouter le premier document
                   </button>
               )}
             </div>
          )}
        </div>
      </div>

      {/* Upload Modal - Only for Admins */}
      {isUploadModalOpen && user?.role === 'admin' && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-0 animate-fade-in-up overflow-hidden">
            <div className="bg-slate-900 p-5 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Plus className="text-green-400" /> Ajouter une ressource
                </h2>
                <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">Fermer</button>
            </div>
            
            <form onSubmit={handleUpload} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Titre du document</label>
                <input required type="text" className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none transition-shadow" placeholder="Ex: Algèbre Chap 1 - Les Matrices" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Type de fichier</label>
                  <select className="w-full border border-slate-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-green-500 outline-none" value={newCourse.type} onChange={e => setNewCourse({...newCourse, type: e.target.value})}>
                    <option value="COURS">Cours Magistral</option>
                    <option value="TD">Travaux Dirigés (TD)</option>
                    <option value="TP">Travaux Pratiques (TP)</option>
                    <option value="EXAMEN">Examen / Partiel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Niveau</label>
                  <select className="w-full border border-slate-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-green-500 outline-none" value={newCourse.level} onChange={e => setNewCourse({...newCourse, level: e.target.value})}>
                    <option value="L1">Licence 1</option>
                    <option value="L2">Licence 2</option>
                    <option value="L3">Licence 3</option>
                    <option value="M1">Master 1</option>
                    <option value="M2">Master 2</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">UFR</label>
                  <select className="w-full border border-slate-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-green-500 outline-none" value={newCourse.ufr} onChange={e => setNewCourse({...newCourse, ufr: e.target.value})}>
                    {Object.keys(UFRS).map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-1.5">Matière / Module</label>
                   <input required type="text" className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none" placeholder="Ex: Mathématiques" value={newCourse.subject} onChange={e => setNewCourse({...newCourse, subject: e.target.value})} />
                   <p className="text-xs text-slate-500 mt-1">Important pour le regroupement.</p>
                </div>
              </div>

              <div className="pt-2">
                 <label className="block text-sm font-bold text-slate-700 mb-2">Fichier (PDF, DOCX...)</label>
                 <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    <DownloadCloud className="mx-auto text-slate-400 mb-2" />
                    <span className="text-sm text-slate-500 font-medium">Cliquez pour upload ou glissez le fichier</span>
                 </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsUploadModalOpen(false)} className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-bold transition-colors">Annuler</button>
                <button type="submit" className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold shadow-lg shadow-green-200 transition-all transform hover:-translate-y-0.5">Publier la ressource</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for upload icon in modal
const DownloadCloud = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></svg>
);
