import React, { useState, useMemo, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Trash2, Edit, Plus, X, Save, UploadCloud, FileText, ChevronDown, Filter, PieChart, BarChart2, Download, Star, LayoutDashboard } from 'lucide-react';
import * as Recharts from 'recharts';
import { CourseResource, UFRData } from '../types';
import { UFRS } from '../constants';

const { Navigate } = ReactRouterDOM;
const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } = Recharts;

const LEVEL_ORDER = ['L1', 'L2', 'L3', 'M1', 'M2'];

// Course Form Modal Component
const CourseFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    courseToEdit: CourseResource | null;
}> = ({ isOpen, onClose, courseToEdit }) => {
    const { addCourse, updateCourse } = useApp();
    const [formData, setFormData] = useState<Omit<CourseResource, 'id' | 'dateAdded' | 'downloads' | 'size' | 'author'>>({
        title: '',
        description: '',
        type: 'COURS',
        ufr: 'SATIC',
        level: 'L1',
        filiere: '',
        subject: ''
    });
    const [availableFilieres, setAvailableFilieres] = useState<string[]>([]);

    useEffect(() => {
        if (courseToEdit) {
            const { id, dateAdded, downloads, size, author, ...editableData } = courseToEdit;
            setFormData(editableData);
        } else {
            // Reset form for new entry
            setFormData({
                title: '', description: '', type: 'COURS', ufr: 'SATIC', level: 'L1', filiere: '', subject: ''
            });
        }
    }, [courseToEdit, isOpen]);
    
    useEffect(() => {
        const ufrData = UFRS[formData.ufr];
        if (ufrData) {
            const filieresForLevel = ufrData.programs
                .filter(p => formData.level.startsWith('L') ? p.level === 'Licence' : p.level === 'Master')
                .map(p => p.name);
            setAvailableFilieres(filieresForLevel);
            if (!filieresForLevel.includes(formData.filiere)) {
                setFormData(prev => ({ ...prev, filiere: filieresForLevel[0] || '' }));
            }
        }
    }, [formData.ufr, formData.level]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (courseToEdit) {
            updateCourse({ ...courseToEdit, ...formData });
        } else {
            addCourse(formData);
        }
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-0 overflow-hidden">
                <div className="p-5 flex justify-between items-center bg-slate-50 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">
                        {courseToEdit ? 'Modifier le document' : 'Ajouter un document'}
                    </h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800 p-1 rounded-full"><X size={20} /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Titre</label>
                        <input name="title" value={formData.title} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg p-2.5" />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Description (optionnel)</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={2} className="w-full border border-slate-300 rounded-lg p-2.5" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">UFR</label>
                            <select name="ufr" value={formData.ufr} onChange={handleChange} className="w-full border bg-white border-slate-300 rounded-lg p-2.5">
                                {Object.keys(UFRS).map(ufrId => <option key={ufrId} value={ufrId}>{UFRS[ufrId].name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Niveau</label>
                            <select name="level" value={formData.level} onChange={handleChange} className="w-full border bg-white border-slate-300 rounded-lg p-2.5">
                                {LEVEL_ORDER.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Filière</label>
                            <select name="filiere" value={formData.filiere} onChange={handleChange} required className="w-full border bg-white border-slate-300 rounded-lg p-2.5">
                                <option value="" disabled>-- Sélectionner --</option>
                                {availableFilieres.map(f => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Matière</label>
                            <input name="subject" value={formData.subject} onChange={handleChange} required placeholder="Ex: Algèbre" className="w-full border border-slate-300 rounded-lg p-2.5" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Type de document</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="w-full border bg-white border-slate-300 rounded-lg p-2.5">
                            <option value="COURS">Cours (CM)</option><option value="TD">Travaux Dirigés (TD)</option><option value="TP">Travaux Pratiques (TP)</option><option value="EXAMEN">Examen</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Fichier</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                            <UploadCloud className="mx-auto text-slate-400 mb-2" />
                            <span className="text-sm text-slate-600 font-medium">Glissez & déposez ou cliquez pour choisir</span>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 mt-6">
                        <button type="button" onClick={onClose} className="px-5 py-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg font-bold">Annuler</button>
                        <button type="submit" className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold shadow-md flex items-center gap-2"><Save size={16} /> Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Stat Card Component
const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: string | number, detail: string, color: string }> = ({ icon, title, value, detail, color }) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-bold text-slate-500">{title}</p>
            <p className="text-2xl font-extrabold text-slate-900">{value}</p>
            <p className="text-xs text-slate-400 mt-1 truncate">{detail}</p>
        </div>
    </div>
);


export const Admin: React.FC = () => {
    const { user, courses, deleteCourse } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<CourseResource | null>(null);
    const [filterUFR, setFilterUFR] = useState('all');
    const [activeTab, setActiveTab] = useState<'dashboard' | 'content'>('dashboard');

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

    const filteredCourses = useMemo(() => {
        if (filterUFR === 'all') return courses;
        return courses.filter(c => c.ufr === filterUFR);
    }, [courses, filterUFR]);
    
    // Stats Calculations
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

    // FIX: Explicitly cast the result of Object.entries to fix a type inference issue.
    // This resolves errors where properties on sorted items were not found because their type was inferred as 'unknown'.
    const mostActiveUFR = Object.keys(ufrStats).length > 0 ? (Object.entries(ufrStats) as [string, { docs: number; downloads: number }][]).sort((a, b) => b[1].docs - a[1].docs)[0] : null;
    const mostPopularDoc = courses.length > 0 ? [...courses].sort((a, b) => b.downloads - a.downloads)[0] : null;

    const chartData = Object.keys(UFRS).map(ufrId => ({
        name: ufrId,
        Documents: ufrStats[ufrId]?.docs || 0,
        Téléchargements: ufrStats[ufrId]?.downloads || 0
    }));
    
    const UFR_COLORS: Record<string, string> = { SATIC: '#2563eb', SDD: '#16a34a', ECOMIJ: '#d97706' };

    return (
        <div className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                
                <h1 className="text-3xl font-bold text-slate-900">Tableau de Bord</h1>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-2 flex gap-2">
                    <button onClick={() => setActiveTab('dashboard')} className={`flex-1 px-4 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-colors ${activeTab === 'dashboard' ? 'bg-green-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}>
                        <LayoutDashboard size={16} /> Dashboard
                    </button>
                    <button onClick={() => setActiveTab('content')} className={`flex-1 px-4 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-colors ${activeTab === 'content' ? 'bg-green-600 text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}>
                        <BarChart2 size={16} /> Gestion des Documents
                    </button>
                </div>

                {/* Dashboard View */}
                {activeTab === 'dashboard' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard icon={<FileText className="text-blue-600" />} title="Documents Totaux" value={totalDocs} detail="Toutes UFR confondues" color="bg-blue-100" />
                            <StatCard icon={<Download className="text-green-600" />} title="Téléchargements" value={totalDownloads} detail="Sur tous les documents" color="bg-green-100" />
                            <StatCard icon={<PieChart className="text-amber-600" />} title="UFR le plus Actif" value={mostActiveUFR ? mostActiveUFR[0] : 'N/A'} detail={`${mostActiveUFR ? mostActiveUFR[1].docs : 0} documents`} color="bg-amber-100" />
                            <StatCard icon={<Star className="text-purple-600" />} title="Document Populaire" value={mostPopularDoc ? `${mostPopularDoc.downloads} dl` : 'N/A'} detail={mostPopularDoc ? mostPopularDoc.title : 'Aucun document'} color="bg-purple-100" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-4">Répartition des Ressources par UFR</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                                        <YAxis stroke="#64748b" fontSize={12} />
                                        <Tooltip wrapperClassName="!bg-white !border !border-slate-200 !rounded-lg !shadow-lg" />
                                        <Bar dataKey="Documents" name="Documents">
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={UFR_COLORS[entry.name]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-4">Téléchargements par UFR</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                                        <YAxis stroke="#64748b" fontSize={12} />
                                        <Tooltip wrapperClassName="!bg-white !border !border-slate-200 !rounded-lg !shadow-lg" />
                                        <Bar dataKey="Téléchargements" name="Téléchargements">
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-dl-${index}`} fill={UFR_COLORS[entry.name]} fillOpacity={0.7} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Management View */}
                {activeTab === 'content' && (
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm animate-fade-in">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800">Gestion des Ressources Pédagogiques</h2>
                                <p className="text-sm text-slate-500 mt-1">Ajoutez, modifiez ou supprimez les documents de la bibliothèque.</p>
                            </div>
                            <button onClick={handleAdd} className="w-full sm:w-auto bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 font-bold shadow-md flex items-center gap-2 justify-center">
                                <Plus size={18} /> Ajouter un document
                            </button>
                        </div>

                        <div className="flex items-center gap-2 mb-4 p-2 bg-slate-50 rounded-lg border border-slate-200 max-w-min">
                           <Filter size={16} className="text-slate-500"/>
                           <select value={filterUFR} onChange={e => setFilterUFR(e.target.value)} className="bg-transparent font-bold text-slate-700 text-sm outline-none">
                               <option value="all">Tous les UFR</option>
                               {Object.keys(UFRS).map(id => <option key={id} value={id}>{UFRS[id].name}</option>)}
                           </select>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-600">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold">Titre / Matière</th>
                                        <th className="px-4 py-3 font-semibold">UFR / Filière</th>
                                        <th className="px-4 py-3 font-semibold">Niveau</th>
                                        <th className="px-4 py-3 font-semibold">Type</th>
                                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {filteredCourses.map(course => (
                                        <tr key={course.id} className="hover:bg-slate-50">
                                            <td className="px-4 py-3">
                                                <p className="font-bold text-slate-800">{course.title}</p>
                                                <p className="text-xs text-slate-500">{course.subject}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="font-bold text-slate-800">{course.ufr}</p>
                                                <p className="text-xs text-slate-500">{course.filiere}</p>
                                            </td>
                                            <td className="px-4 py-3 text-slate-600">{course.level}</td>
                                            <td className="px-4 py-3">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                                    course.type === 'COURS' ? 'bg-blue-100 text-blue-800' :
                                                    course.type === 'TD' ? 'bg-amber-100 text-amber-800' :
                                                    'bg-purple-100 text-purple-800'
                                                }`}>{course.type}</span>
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="inline-flex gap-2">
                                                    <button onClick={() => handleEdit(course)} className="text-slate-500 hover:text-blue-600 p-2 rounded-md hover:bg-blue-50" title="Modifier">
                                                        <Edit size={16} />
                                                    </button>
                                                    <button onClick={() => deleteCourse(course.id)} className="text-slate-500 hover:text-red-600 p-2 rounded-md hover:bg-red-50" title="Supprimer">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                         {filteredCourses.length === 0 && (
                            <div className="text-center py-10">
                                <FileText size={40} className="mx-auto text-slate-300 mb-4"/>
                                <p className="font-bold text-slate-700">Aucun document trouvé</p>
                                <p className="text-sm text-slate-500">Essayez de changer le filtre ou d'ajouter un nouveau document.</p>
                            </div>
                        )}
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