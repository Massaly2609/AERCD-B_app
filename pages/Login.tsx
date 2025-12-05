
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LogIn, AlertCircle, Eye, EyeOff, ArrowLeft, ShieldCheck, Lock, Mail } from 'lucide-react';

const { Link, useNavigate } = ReactRouterDOM;

export const Login: React.FC = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Simulation d'un délai réseau pour l'effet UX
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Identifiants incorrects. Veuillez vérifier votre email et mot de passe.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* SECTION GAUCHE - VISUEL IMMERSIF (Caché sur mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
         {/* Fond animé abstrait */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
         <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-600/20 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
         
         <div className="relative z-10 p-12 text-white max-w-lg">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-8 shadow-xl">
                 <ShieldCheck size={32} className="text-green-400" />
             </div>
             <h1 className="text-5xl font-bold mb-6 leading-tight">Portail <br/><span className="text-green-400">Administration</span></h1>
             <p className="text-slate-300 text-lg leading-relaxed mb-8">
                 Gérez les ressources pédagogiques, communiquez avec les étudiants et administrez la plateforme de l'AERCD-B en toute sécurité.
             </p>
             <div className="flex items-center gap-4 text-sm text-slate-400 font-medium">
                 <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                     Système Sécurisé
                 </div>
                 <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                 <div>Version 2.0</div>
             </div>
         </div>
      </div>

      {/* SECTION DROITE - FORMULAIRE */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 relative">
         
         {/* Bouton Retour */}
         <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-bold">
             <ArrowLeft size={16} /> Retour au site
         </Link>

         <div className="max-w-md w-full space-y-8 animate-fade-in-up">
             <div className="text-center lg:text-left">
                 <h2 className="text-3xl font-extrabold text-slate-900">Connexion</h2>
                 <p className="text-slate-500 mt-2">Entrez vos identifiants pour accéder au tableau de bord.</p>
             </div>

             {/* Message d'erreur */}
             {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-start gap-3 text-sm animate-shake">
                    <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                    <div>
                        <span className="font-bold block">Erreur de connexion</span>
                        {error}
                    </div>
                </div>
             )}

             <form onSubmit={handleLogin} className="space-y-6">
                 
                 {/* Email Input */}
                 <div className="space-y-1.5">
                     <label className="block text-sm font-bold text-slate-700">Adresse Email</label>
                     <div className="relative group">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                             <Mail size={18} className="text-slate-400 group-focus-within:text-green-600 transition-colors" />
                         </div>
                         <input
                             type="email"
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                             required
                             className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm"
                             placeholder="admin@aercd-b.sn"
                         />
                     </div>
                 </div>

                 {/* Password Input */}
                 <div className="space-y-1.5">
                     <label className="block text-sm font-bold text-slate-700">Mot de passe</label>
                     <div className="relative group">
                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                             <Lock size={18} className="text-slate-400 group-focus-within:text-green-600 transition-colors" />
                         </div>
                         <input
                             type={showPassword ? "text" : "password"}
                             value={password}
                             onChange={(e) => setPassword(e.target.value)}
                             required
                             className="block w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm"
                             placeholder="••••••••"
                         />
                         <button
                             type="button"
                             onClick={() => setShowPassword(!showPassword)}
                             className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                         >
                             {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                         </button>
                     </div>
                     <div className="flex justify-end">
                         <a href="#" className="text-xs font-bold text-green-600 hover:text-green-700 hover:underline">Mot de passe oublié ?</a>
                     </div>
                 </div>

                 <button
                     type="submit"
                     disabled={loading}
                     className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-lg text-sm font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
                 >
                     {loading ? (
                         <div className="flex items-center gap-2">
                             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>
                             Connexion en cours...
                         </div>
                     ) : (
                         <div className="flex items-center gap-2">
                             <LogIn size={18} /> Accéder au Dashboard
                         </div>
                     )}
                 </button>
             </form>
             
             <div className="text-center mt-6">
                 <p className="text-xs text-slate-400">
                     En vous connectant, vous acceptez les conditions d'utilisation de la plateforme AERCD-B.
                 </p>
             </div>
         </div>
      </div>
    </div>
  );
};
