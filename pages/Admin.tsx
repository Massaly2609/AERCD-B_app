
import React, { useState, useMemo, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Trash2, Edit, Plus, X, Save, UploadCloud, FileText, ChevronDown, Filter, PieChart, BarChart2, Download, Star, LayoutDashboard, Megaphone, Bell, Link as LinkIcon, Loader2, Search, MoreHorizontal, ArrowUpRight, ArrowDownRight, Users, Activity, Calendar, Clock, FileType, CheckCircle2 } from 'lucide-react';
import * as Recharts from 'recharts';
import { CourseResource, UFRData, AppNotification } from '../types';
import { UFRS } from '../constants';

const { Navigate } = ReactRouterDOM;
// Destructuring Recharts
const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, PieChart: RePieChart, Pie } = Recharts;

const LEVEL_ORDER = ['L1', 'L2', 'L3', 'M1', 'M2'];

// --- COMPONENTS ---

const PremiumStatCard: React.FC<{ 
    title: string; 
    value: string | number; 
    trend: string; 
    trendUp: boolean;
    icon: React.ReactNode; 
    colorTheme: 'blue' | 'green' | 'amber' | 'purple';
}> = ({ title, value, trend, trendUp, icon, colorTheme }) => {
    const themes = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100', ring: 'ring-blue-500/10' },
        green: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', ring: 'ring-emerald-500/10' },
        amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100', ring: 'ring-amber-500/10' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-100', ring: 'ring-purple-500/10' },
    };
    const t = themes[colorTheme];

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] transition-all duration-300 group relative overflow-hidden">
            <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500 ${t.text}`}>
                {icon}
            </div>
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-xl ${t.bg} ${t.text} ring-1 ${t.ring} shadow-sm`}>
                    {icon}
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${trendUp ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {trend}
                </div>
            </div>
            <div className="space-y-1 relative z-10">
                <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</h4>
                <div className="text-3xl font-black text-slate-900 tracking-tight">{value}</div>
            </div>
        </div>
    );
};

// Course Form Modal Component
const CourseFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    courseToEdit: CourseResource | null;
}> = ({ isOpen, onClose, courseToEdit }) => {
    const { addCourse, updateCourse } = useApp();
    const [formData, setFormData] = useState<Omit<CourseResource, 'id' | 'dateAdded' | 'downloads' | 'size' | 'author' | 'fileUrl'>>({
        title: '',
        description: '',
        type: 'COURS',
        ufr: 'SATIC',
        level: 'L1',
        filiere: '',
        subject: ''
    });
    const [availableFilieres, setAvailableFilieres] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (courseToEdit) {
            const { id, dateAdded, downloads, size, author, fileUrl, ...editableData } = courseToEdit;
            setFormData(editableData);
            setSelectedFile(null); // Reset file on edit mode open
        } else {
            setFormData({
                title: '', description: '', type: 'COURS', ufr: 'SATIC', level: 'L1', filiere: '', subject: ''
            });
            setSelectedFile(null);
        }
    }, [courseToEdit, isOpen]);
    
    useEffect(() => {
        const ufrData = UFRS[formData.ufr];
        if (ufrData) {
            const filieresForLevel = ufrData.programs
                .filter(p => formData.level.startsWith('L') ? p.level === 'Licence' : p.level === 'Master')
                .map(p => p.name);
            setAvailableFilieres(filieresForLevel);
            // Reset filiere if not in new list, unless it's the initial load of edit form
            if (!filieresForLevel.includes(formData.filiere) && !courseToEdit) {
                setFormData(prev => ({ ...prev, filiere: filieresForLevel[0] || '' }));
            }
        }
    }, [formData.ufr, formData.level]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (courseToEdit) {
                await updateCourse({ ...courseToEdit, ...formData });
            } else {
                await addCourse(formData, selectedFile);
            }
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-[60] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden transform transition-all scale-100 border border-white/20">
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            {courseToEdit ? <Edit size={20} /> : <Plus size={20} />}
                        </div>
                        <div>
                            <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">
                                {courseToEdit ? 'Éditer la ressource' : 'Ajouter un document'}
                            </h2>
                            <p className="text-xs text-slate-500 font-medium">Base de connaissances universitaire</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"><X size={20} /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Titre du document</label>
                            <input name="title" value={formData.title} onChange={handleChange} required placeholder="Ex: Algèbre Linéaire - Chapitre 1" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
                        </div>
                        
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">UFR</label>
                            <div className="relative">
                                <select name="ufr" value={formData.ufr} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium appearance-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
                                    {Object.keys(UFRS).map(ufrId => <option key={ufrId} value={ufrId}>{UFRS[ufrId].name}</option>)}
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Niveau</label>
                            <div className="relative">
                                <select name="level" value={formData.level} onChange={handleChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium appearance-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
                                    {LEVEL_ORDER.map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Filière</label>
                            <div className="relative">
                                <select name="filiere" value={formData.filiere} onChange={handleChange} required className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium appearance-none focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all">
                                    <option value="" disabled>-- Sélectionner --</option>
                                    {availableFilieres.map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Matière</label>
                            <input name="subject" value={formData.subject} onChange={handleChange} required placeholder="Ex: Mathématiques" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Type de document</label>
                             <div className="flex gap-3">
                                {['COURS', 'TD', 'TP', 'EXAMEN'].map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData(prev => ({...prev, type: type as any}))}
                                        className={`flex-1 py-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-center gap-2 ${
                                            formData.type === type 
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20' 
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        {formData.type === type && <CheckCircle2 size={14} />}
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                         <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Fichier joint</label>
                            {!courseToEdit ? (
                                <div className="relative group">
                                    <input 
                                        type="file" 
                                        id="course-file" 
                                        onChange={handleFileChange}
                                        className="hidden" 
                                        required
                                    />
                                    <label htmlFor="course-file" className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer block ${selectedFile ? 'border-green-500 bg-green-50/50' : 'border-slate-300 hover:border-blue-500 hover:bg-blue-50/50'}`}>
                                        <div className={`w-14 h-14 rounded-full shadow-sm flex items-center justify-center mx-auto mb-3 transition-colors ${selectedFile ? 'bg-green-100 text-green-600' : 'bg-white text-blue-600'}`}>
                                            {selectedFile ? <CheckCircle2 size={28} /> : <UploadCloud size={28} />}
                                        </div>
                                        <p className="text-sm font-bold text-slate-800">
                                            {selectedFile ? selectedFile.name : "Glissez-déposez ou cliquez pour uploader"}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1 font-medium">{selectedFile ? "Fichier prêt à l'envoi" : "PDF, Word, PPT acceptés (Max 10MB)"}</p>
                                    </label>
                                </div>
                            ) : (
                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
                                    <FileText className="text-amber-600" size={20} />
                                    <span className="text-sm text-amber-800 font-medium">Le fichier ne peut pas être modifié en mode édition.</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-6 border-t border-slate-100">
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="px-6 py-3.5 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-bold text-sm transition-colors">Annuler</button>
                        <button type="submit" disabled={isSubmitting} className="px-8 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-xl shadow-blue-600/20 flex items-center gap-2 transition-all transform hover:-translate-y-0.5">
                            {isSubmitting ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} />} 
                            {isSubmitting ? 'Enregistrement...' : courseToEdit ? 'Sauvegarder' : 'Publier le document'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Notification Form Component (Social Media Style)
const NotificationForm: React.FC = () => {
    const { addNotification } = useApp();
    const [label, setLabel] = useState('');
    const [text, setText] = useState('');
    const [type, setType] = useState<'URGENT' | 'INFO' | 'EVENT' | 'APPEL'>('INFO');
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addNotification({ label, text, type }, file);
            setLabel('');
            setText('');
            setFile(null);
            const fileInput = document.getElementById('notif-file') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8 group hover:border-blue-200 transition-colors">
            <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200">
                    <Megaphone size={14} />
                </div>
                <h3 className="font-bold text-slate-800 text-sm">Nouvelle Communication</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
                <div className="flex gap-4 mb-4">
                    <div className="flex-shrink-0 pt-2">
                        <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-xs ring-4 ring-slate-100">
                            ADM
                        </div>
                    </div>
                    <div className="flex-grow space-y-4">
                         <div className="flex gap-3">
                            <select value={type} onChange={(e) => setType(e.target.value as any)} className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer hover:bg-slate-100 transition-colors">
                                <option value="INFO">ℹ️ Info</option>
                                <option value="URGENT">🚨 Urgent</option>
                                <option value="EVENT">📅 Événement</option>
                                <option value="APPEL">📢 Appel</option>
                            </select>
                            <input value={label} onChange={(e) => setLabel(e.target.value)} required placeholder="Titre de l'annonce..." className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-bold placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all" />
                        </div>
                        <textarea 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            required 
                            rows={3}
                            placeholder="Écrivez votre message ici..." 
                            className="w-full bg-transparent border-0 border-b-2 border-slate-100 px-0 py-2 text-slate-700 text-base placeholder-slate-300 focus:ring-0 focus:border-blue-500 resize-none transition-all" 
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-2 pl-14">
                         <input 
                            id="notif-file"
                            type="file" 
                            accept="application/pdf"
                            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                            className="hidden"
                        />
                        <label htmlFor="notif-file" className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all ${file ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-slate-50 text-slate-500 border border-slate-200 hover:bg-slate-100'}`}>
                            {file ? <CheckCircle2 size={14} /> : <LinkIcon size={14} />}
                            {file ? file.name : "Joindre un PDF"}
                        </label>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center gap-2 disabled:opacity-50 transform hover:-translate-y-0.5">
                        {isSubmitting ? <Loader2 className="animate-spin" size={16}/> : <>Publier <ArrowUpRight size={16}/></>}
                    </button>
                </div>
            </form>
        </div>
    );
}

// --- MAIN ADMIN PAGE ---

export const Admin: React.FC = () => {
    const { user, courses, deleteCourse, notifications, deleteNotification } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<CourseResource | null>(null);
    const [filterUFR, setFilterUFR] = useState('all');
    const [activeTab, setActiveTab] = useState<'dashboard' | 'content' | 'comms'>('dashboard');

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" />;
    }

    const handleEdit = (course: CourseResource) => {
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingCourse(null);
        setIsModalOpen(true);
    };

    const handleDeleteCourse = async (id: string, fileUrl?: string) => {
        if (confirm("Confirmer la suppression définitive ?")) {
            await deleteCourse(id, fileUrl);
        }
    };
    
    const handleDeleteNotif = async (id: string, docUrl?: string) => {
        if (confirm("Retirer cette annonce ?")) {
            await deleteNotification(id, docUrl);
        }
    };

    const filteredCourses = useMemo(() => {
        if (filterUFR === 'all') return courses;
        return courses.filter(c => c.ufr === filterUFR);
    }, [courses, filterUFR]);
    
    // --- Stats Logic ---
    const totalDocs = courses.length;
    const totalDownloads = courses.reduce((sum, c) => sum + c.downloads, 0);

    const ufrStats = useMemo(() => {
        const stats: Record<string, { docs: number, downloads: number }> = {};
        for (const ufrId of Object.keys(UFRS)) {
            stats[ufrId] = { docs: 0, downloads: 0 };
        }
        courses.forEach(c => {
            if (stats[c.ufr]) {
                stats[c.ufr].docs += 1;
                stats[c.ufr].downloads += c.downloads;
            }
        });
        return stats;
    }, [courses]);

    // Data for Area Chart
    const chartData = Object.keys(UFRS).map(ufrId => ({
        name: ufrId,
        Documents: ufrStats[ufrId]?.docs || 0,
        Téléchargements: ufrStats[ufrId]?.downloads || 0
    }));

    const pieData = [
        { name: 'Cours', value: courses.filter(c => c.type === 'COURS').length },
        { name: 'TD', value: courses.filter(c => c.type === 'TD').length },
        { name: 'TP', value: courses.filter(c => c.type === 'TP').length },
        { name: 'Examens', value: courses.filter(c => c.type === 'EXAMEN').length },
    ].filter(d => d.value > 0);
    
    const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-20">
            {/* Top Navigation Bar */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm backdrop-blur-md bg-white/90">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center py-4 gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                                <LayoutDashboard size={20} />
                            </div>
                            <div>
                                <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Console Admin</h1>
                                <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Système opérationnel
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            {[
                                { id: 'dashboard', label: 'Vue d\'ensemble', icon: Activity },
                                { id: 'content', label: 'Ressources', icon: FileText },
                                { id: 'comms', label: 'Comms', icon: Megaphone }
                            ].map((tab) => (
                                <button 
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                                        activeTab === tab.id 
                                        ? 'bg-white text-slate-900 shadow-sm ring-1 ring-black/5' 
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                                    }`}
                                >
                                    <tab.icon size={14} />
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
                
                {/* --- DASHBOARD VIEW --- */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-8">
                        {/* Welcome Banner */}
                        <div className="flex justify-between items-end mb-2">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">Bonjour, {user.name} 👋</h2>
                                <p className="text-slate-500 text-sm mt-1">Voici ce qui se passe sur votre portail aujourd'hui.</p>
                            </div>
                            <div className="text-right hidden sm:block">
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Date du jour</div>
                                <div className="text-sm font-bold text-slate-900 flex items-center gap-2 justify-end">
                                    <Calendar size={14} /> {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        {/* KPI Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <PremiumStatCard 
                                title="Documents Totaux" 
                                value={totalDocs} 
                                icon={<FileText size={20}/>} 
                                colorTheme="blue"
                                trend="+12%"
                                trendUp={true}
                            />
                            <PremiumStatCard 
                                title="Téléchargements" 
                                value={totalDownloads} 
                                icon={<Download size={20}/>} 
                                colorTheme="green"
                                trend="+8.5%"
                                trendUp={true}
                            />
                            <PremiumStatCard 
                                title="Membres Actifs" 
                                value="1,240" 
                                icon={<Users size={20}/>} 
                                colorTheme="amber"
                                trend="Stable"
                                trendUp={true}
                            />
                            <PremiumStatCard 
                                title="Taux d'Engagement" 
                                value="64%" 
                                icon={<Activity size={20}/>} 
                                colorTheme="purple"
                                trend="-1.2%"
                                trendUp={false}
                            />
                        </div>

                        {/* Advanced Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Activity Chart */}
                            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                                <div className="flex justify-between items-center mb-8 relative z-10">
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg">Activité & Engagement</h3>
                                        <p className="text-xs text-slate-400 mt-1">Documents vs Téléchargements par UFR</p>
                                    </div>
                                    <div className="bg-slate-50 p-1 rounded-lg flex text-xs font-bold">
                                        <button className="px-3 py-1 bg-white shadow-sm rounded-md text-slate-800">Semaine</button>
                                        <button className="px-3 py-1 text-slate-400 hover:text-slate-600">Mois</button>
                                    </div>
                                </div>
                                <div className="h-[300px] w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={chartData}>
                                            <defs>
                                                <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                                </linearGradient>
                                                <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 600}} dy={10} />
                                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                                            <Tooltip 
                                                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)', backgroundColor: 'white'}}
                                                cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4'}}
                                            />
                                            <Area type="monotone" dataKey="Documents" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorDocs)" />
                                            <Area type="monotone" dataKey="Téléchargements" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorDown)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            
                            {/* Distribution Donut */}
                            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
                                <h3 className="font-bold text-slate-800 text-lg mb-6">Typologie</h3>
                                <div className="flex-grow flex items-center justify-center relative">
                                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                        <span className="text-3xl font-black text-slate-800">{totalDocs}</span>
                                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wide">Fichiers</span>
                                    </div>
                                    <ResponsiveContainer width="100%" height={220}>
                                        <RePieChart>
                                            <Pie
                                                data={pieData}
                                                innerRadius={70}
                                                outerRadius={90}
                                                paddingAngle={6}
                                                dataKey="value"
                                                cornerRadius={6}
                                            >
                                                {pieData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </RePieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className="space-y-3 mt-4">
                                    {pieData.map((entry, index) => (
                                        <div key={index} className="flex justify-between items-center text-xs font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                                                <span className="text-slate-600">{entry.name}</span>
                                            </div>
                                            <span className="text-slate-900 font-bold">{entry.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- CONTENT VIEW --- */}
                {activeTab === 'content' && (
                    <div className="animate-fade-in space-y-6">
                        {/* Control Bar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm pl-4">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="relative group w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                                    <input 
                                        placeholder="Rechercher un document..." 
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 border rounded-xl text-sm font-medium focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                                    />
                                </div>
                                <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                                <select 
                                    value={filterUFR} 
                                    onChange={e => setFilterUFR(e.target.value)} 
                                    className="bg-transparent text-slate-600 text-sm font-bold outline-none cursor-pointer hover:text-blue-600 transition-colors"
                                >
                                    <option value="all">Tous les UFR</option>
                                    {Object.keys(UFRS).map(id => <option key={id} value={id}>{UFRS[id].name}</option>)}
                                </select>
                            </div>
                            <button onClick={handleAdd} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 transition-all transform hover:-translate-y-0.5">
                                <Plus size={18} /> <span>Nouveau Document</span>
                            </button>
                        </div>

                        {/* Data Grid */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                                            <th className="px-6 py-5">Fichier & Matière</th>
                                            <th className="px-6 py-5">Filière / UFR</th>
                                            <th className="px-6 py-5">Niveau</th>
                                            <th className="px-6 py-5">Type</th>
                                            <th className="px-6 py-5">Stats</th>
                                            <th className="px-6 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {filteredCourses.map(course => (
                                            <tr key={course.id} className="hover:bg-blue-50/20 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-2.5 rounded-xl border ${
                                                            course.type === 'COURS' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                                                            course.type === 'TD' ? 'bg-amber-50 border-amber-100 text-amber-600' :
                                                            'bg-purple-50 border-purple-100 text-purple-600'
                                                        }`}>
                                                            <FileType size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-800 text-sm mb-0.5">{course.title}</p>
                                                            <p className="text-xs text-slate-500 font-medium">{course.subject}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-slate-700">{course.filiere}</span>
                                                        <span className="text-[10px] font-bold uppercase tracking-wide text-slate-400 mt-1">{course.ufr}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                                                        {course.level}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                                                        course.type === 'COURS' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                        course.type === 'TD' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                        'bg-purple-50 text-purple-700 border-purple-100'
                                                    }`}>
                                                        {course.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                                        <Download size={14} /> {course.downloads}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        {course.fileUrl && (
                                                            <a href={course.fileUrl} target="_blank" className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Voir">
                                                                <LinkIcon size={16} />
                                                            </a>
                                                        )}
                                                        <button onClick={() => handleEdit(course)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Modifier">
                                                            <Edit size={16} />
                                                        </button>
                                                        <button onClick={() => handleDeleteCourse(course.id, course.fileUrl)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Supprimer">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- COMMS VIEW --- */}
                {activeTab === 'comms' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                        <div className="lg:col-span-1">
                             <div className="sticky top-24">
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Megaphone size={20} className="text-blue-600" /> Nouvelle annonce
                                </h3>
                                <NotificationForm />
                             </div>
                        </div>
                        <div className="lg:col-span-2 space-y-6">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center justify-between">
                                <span>Fil d'actualité</span>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">{notifications.length} actifs</span>
                            </h3>
                            {notifications.length > 0 ? (
                                <div className="space-y-4">
                                    {notifications.map(notif => (
                                        <div key={notif.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
                                            <div className="flex justify-between items-start">
                                                <div className="flex gap-5">
                                                    <div className={`w-12 h-12 flex-shrink-0 rounded-2xl flex items-center justify-center text-xl shadow-inner ${
                                                        notif.type === 'URGENT' ? 'bg-red-50 text-red-600' :
                                                        notif.type === 'INFO' ? 'bg-blue-50 text-blue-600' :
                                                        'bg-amber-50 text-amber-600'
                                                    }`}>
                                                        {notif.type === 'URGENT' ? '🚨' : notif.type === 'INFO' ? 'ℹ️' : '📅'}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="font-extrabold text-slate-900 text-lg">{notif.label}</span>
                                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                                                notif.type === 'URGENT' ? 'bg-red-50 text-red-700 border-red-100' :
                                                                'bg-slate-50 text-slate-600 border-slate-100'
                                                            }`}>{notif.type}</span>
                                                        </div>
                                                        <p className="text-slate-600 text-sm leading-relaxed mb-4 max-w-xl">{notif.text}</p>
                                                        
                                                        <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                                                            <span className="flex items-center gap-1"><Clock size={12}/> {notif.dateAdded}</span>
                                                            {notif.documentUrl && (
                                                                <a href={notif.documentUrl} target="_blank" className="flex items-center gap-1 text-blue-600 hover:underline">
                                                                    <LinkIcon size={12} /> Pièce jointe disponible
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => handleDeleteNotif(notif.id, notif.documentUrl)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center text-slate-400 flex flex-col items-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                        <Bell size={24} className="text-slate-300" />
                                    </div>
                                    <p className="font-medium">Aucune communication active.</p>
                                    <p className="text-xs mt-1">Utilisez le formulaire pour diffuser une info.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
            
            <CourseFormModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                courseToEdit={editingCourse}
            />
        </div>
    );
};
