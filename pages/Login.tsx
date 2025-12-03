import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GraduationCap } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const handleLogin = (role: 'admin' | 'student') => {
    login(role);
    navigate(role === 'admin' ? '/admin' : '/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl border border-slate-100 p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
          <GraduationCap className="text-blue-600" size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Espace Membre</h1>
        <p className="text-slate-500 mb-8">Connectez-vous pour accéder à vos services</p>

        <div className="space-y-4">
          <button 
            onClick={() => handleLogin('student')}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
          >
            Connexion Étudiant (Simulation)
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Ou</span>
            </div>
          </div>

          <button 
            onClick={() => handleLogin('admin')}
            className="w-full py-3 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg transition-colors"
          >
            Accès Administration (Simulation)
          </button>
        </div>
        
        <p className="mt-6 text-xs text-slate-400">
          Ceci est une démo. Aucun mot de passe n'est requis pour cette simulation.
        </p>
      </div>
    </div>
  );
};
