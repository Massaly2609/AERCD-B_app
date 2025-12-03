import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Trash2, Users, FileText, DownloadCloud, Edit, Save, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { UFRS } from '../constants';

export const Admin: React.FC = () => {
  const { user, courses, deleteCourse, siteContent, updateSiteContent } = useApp();
  const [editingContent, setEditingContent] = useState<string | null>(null);
  
  // Local state for form inputs
  const [formData, setFormData] = useState(siteContent);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  // Calculate stats
  const totalDownloads = courses.reduce((acc, curr) => acc + curr.downloads, 0);
  const coursesByUFR = [
    { name: 'SATIC', count: courses.filter(c => c.ufr === 'SATIC').length },
    { name: 'SDD', count: courses.filter(c => c.ufr === 'SDD').length },
    { name: 'ECOMIJ', count: courses.filter(c => c.ufr === 'ECOMIJ').length },
  ];

  const handleSaveContent = () => {
    updateSiteContent(formData);
    setEditingContent(null);
    alert("Contenu mis à jour avec succès !");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-900">Administration AERCD-B</h1>
            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Mode Admin</span>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border-l-4 border-blue-500 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><FileText size={24} /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Documents</p>
                <p className="text-2xl font-bold text-slate-900">{courses.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-full"><DownloadCloud size={24} /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Téléchargements</p>
                <p className="text-2xl font-bold text-slate-900">{totalDownloads}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl border-l-4 border-amber-500 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-full"><Users size={24} /></div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Membres Actifs</p>
                <p className="text-2xl font-bold text-slate-900">42</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Chart */}
           <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-lg mb-6">Répartition par UFR</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={coursesByUFR}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* CMS Quick Actions */}
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Edit size={20} className="text-amber-500" /> Édition du Contenu
              </h3>
              <p className="text-slate-500 text-sm mb-4">Modifiez les textes affichés sur le site web sans toucher au code.</p>
              
              <div className="space-y-3 mt-auto">
                <button 
                    onClick={() => setEditingContent('amicale')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition-colors border border-slate-200"
                >
                  Page Amicale <Edit size={16} />
                </button>
                <button 
                    onClick={() => setEditingContent('ufr')}
                    className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-700 font-medium transition-colors border border-slate-200"
                >
                  Descriptions UFR <Edit size={16} />
                </button>
              </div>
           </div>
        </div>

        {/* CMS Modals / Editors */}
        {editingContent === 'amicale' && (
             <div className="bg-white p-6 rounded-xl border-2 border-amber-400 shadow-lg animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl">Éditer: Page Amicale</h3>
                    <div className="flex gap-2">
                        <button onClick={() => setEditingContent(null)} className="text-slate-500 hover:text-red-500"><X /></button>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Mission</label>
                        <textarea 
                            className="w-full border p-2 rounded" 
                            rows={3}
                            value={formData.amicaleMission}
                            onChange={(e) => setFormData({...formData, amicaleMission: e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Vision</label>
                        <textarea 
                            className="w-full border p-2 rounded" 
                            rows={3}
                            value={formData.amicaleVision}
                            onChange={(e) => setFormData({...formData, amicaleVision: e.target.value})}
                        />
                    </div>
                    <button onClick={handleSaveContent} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
                        <Save size={18} /> Enregistrer
                    </button>
                </div>
             </div>
        )}

        {editingContent === 'ufr' && (
             <div className="bg-white p-6 rounded-xl border-2 border-amber-400 shadow-lg animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl">Éditer: Descriptions UFR</h3>
                    <button onClick={() => setEditingContent(null)} className="text-slate-500 hover:text-red-500"><X /></button>
                </div>
                <div className="space-y-4">
                    {Object.keys(UFRS).map(ufrId => (
                        <div key={ufrId}>
                            <label className="block text-sm font-bold mb-1">Description {ufrId}</label>
                            <textarea 
                                className="w-full border p-2 rounded" 
                                rows={3}
                                value={formData.ufrDescriptions[ufrId] || ""}
                                onChange={(e) => setFormData({
                                    ...formData, 
                                    ufrDescriptions: {
                                        ...formData.ufrDescriptions,
                                        [ufrId]: e.target.value
                                    }
                                })}
                            />
                        </div>
                    ))}
                    <button onClick={handleSaveContent} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
                        <Save size={18} /> Enregistrer
                    </button>
                </div>
             </div>
        )}


        {/* Content Management */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h3 className="font-bold text-lg text-slate-800">Derniers documents ajoutés</h3>
            <span className="text-xs text-slate-500">Seuls les admins peuvent supprimer</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3 font-semibold">Titre</th>
                  <th className="px-6 py-3 font-semibold">UFR</th>
                  <th className="px-6 py-3 font-semibold">Niveau</th>
                  <th className="px-6 py-3 font-semibold">Auteur</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map(course => (
                  <tr key={course.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">{course.title}</td>
                    <td className="px-6 py-4 text-slate-500"><span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold">{course.ufr}</span></td>
                    <td className="px-6 py-4 text-slate-500">{course.level}</td>
                    <td className="px-6 py-4 text-slate-500">{course.author}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => deleteCourse(course.id)}
                        className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};