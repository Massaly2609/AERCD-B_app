
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { LogIn, AlertCircle, Eye, EyeOff, ArrowLeft, ShieldCheck, Lock, Mail, Fingerprint, ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 font-sans relative overflow-hidden p-4">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="University Background" 
            className="w-full h-full object-cover opacity-20 filter blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-slate-800/80 mix-blend-multiply"></div>
      </div>

      {/* FLOATING CARD */}
      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in-up">
         
         {/* LEFT SIDE: BRANDING (40%) */}
         <div className="w-full md:w-5/12 bg-slate-900 relative p-10 flex flex-col justify-between text-white overflow-hidden">
             {/* Abstract Decor */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
             
             <div className="relative z-10">
                 <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-8">
                     <ArrowLeft size={14} /> Retour au site
                 </Link>
                 <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 mb-6 shadow-inner">
                     <ShieldCheck size={28} className="text-green-400" />
                 </div>
                 <h1 className="text-3xl font-extrabold mb-2 leading-tight">Espace <br/>Administration</h1>
                 <p className="text-slate-400 text-sm leading-relaxed">
                     Bienvenue sur le portail de gestion sécurisé de l'AERCD-B. Accédez aux outils de pilotage de l'amicale.
                 </p>
             </div>

             <div className="relative z-10 mt-12 md:mt-0">
                 <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                     <div className="flex items-center gap-3 mb-2">
                         <div className="p-1.5 bg-green-500/20 rounded text-green-400">
                             <Fingerprint size={16} />
                         </div>
                         <span className="text-xs font-bold uppercase tracking-wide text-slate-300">Accès Sécurisé</span>
                     </div>
                     <p className="text-[10px] text-slate-500">
                         Toute tentative d'accès non autorisé est enregistrée. Votre adresse IP est surveillée.
                     </p>
                 </div>
             </div>
         </div>

         {/* RIGHT SIDE: FORM (60%) */}
         <div className="w-full md:w-7/12 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
             
             <div className="max-w-sm mx-auto w-full">
                 <div className="text-center mb-10">
                     <h2 className="text-2xl font-bold text-slate-900">Connexion</h2>
                     <p className="text-slate-500 text-sm mt-2">Veuillez saisir vos identifiants administrateur.</p>
                 </div>

                 {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-lg flex items-start gap-3 text-sm mb-6 animate-shake shadow-sm">
                        <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{error}</span>
                    </div>
                 )}

                 <form onSubmit={handleLogin} className="space-y-5">
                     
                     {/* Email Field */}
                     <div className="space-y-1.5">
                         <label className="block text-xs font-bold text-slate-500 uppercase ml-1">Email</label>
                         <div className="relative group">
                             <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                 <Mail size={18} className="text-slate-400 group-focus-within:text-green-600 transition-colors" />
                             </div>
                             <input
                                 type="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 required
                                 className="block w-full pl-10 pr-3 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                 placeholder="admin@aercd-b.sn"
                             />
                         </div>
                     </div>

                     {/* Password Field */}
                     <div className="space-y-1.5">
                         <div className="flex justify-between ml-1">
                            <label className="block text-xs font-bold text-slate-500 uppercase">Mot de passe</label>
                         </div>
                         <div className="relative group">
                             <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                 <Lock size={18} className="text-slate-400 group-focus-within:text-green-600 transition-colors" />
                             </div>
                             <input
                                 type={showPassword ? "text" : "password"}
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 required
                                 className="block w-full pl-10 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-medium placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                 placeholder="••••••••"
                             />
                             <button
                                 type="button"
                                 onClick={() => setShowPassword(!showPassword)}
                                 className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                             >
                                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                             </button>
                         </div>
                         <div className="flex justify-end pt-1">
                             <a href="#" className="text-xs font-bold text-green-600 hover:text-green-700 hover:underline">Mot de passe oublié ?</a>
                         </div>
                     </div>

                     {/* Submit Button */}
                     <button
                         type="submit"
                         disabled={loading}
                         className="w-full flex justify-center items-center gap-2 py-3.5 px-4 mt-4 border border-transparent rounded-xl shadow-lg shadow-green-500/20 text-sm font-bold text-white bg-green-600 hover:bg-green-700 hover:shadow-green-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5"
                     >
                         {loading ? (
                             <>
                                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                 <span>Connexion...</span>
                             </>
                         ) : (
                             <>
                                 <span>Se connecter</span>
                                 <ChevronRight size={18} />
                             </>
                         )}
                     </button>
                 </form>

                 <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                     <p className="text-xs text-slate-400">
                         Problème d'accès ? Contactez le support technique.
                     </p>
                 </div>
             </div>
         </div>
      </div>
      
      {/* Footer simple */}
      <div className="absolute bottom-6 text-center w-full z-10">
          <p className="text-xs text-slate-400 font-medium">© {new Date().getFullYear()} AERCD-B Admin Portal. Tous droits réservés.</p>
      </div>

    </div>
  );
};
