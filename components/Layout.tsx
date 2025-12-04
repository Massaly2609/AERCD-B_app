import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, Home, GraduationCap, BookOpen, Users, LayoutDashboard, Phone, Mail, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UFRS } from '../constants';

// Logo vectoriel personnalisé AERCD-B
const LogoAERCD = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fond Cercle Blanc */}
    <circle cx="50" cy="50" r="48" fill="white" stroke="#0f172a" strokeWidth="2"/>
    
    {/* Soleil */}
    <circle cx="50" cy="45" r="25" fill="#f59e0b" />
    <path d="M50 15 L50 20 M50 70 L50 75 M20 45 L25 45 M75 45 L80 45 M29 24 L32 27 M71 66 L68 63 M29 66 L32 63 M71 24 L68 27" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
    
    {/* Mer / Eau */}
    <path d="M15 75 C 30 70, 70 70, 85 75 V 85 C 70 90, 30 90, 15 85 Z" fill="#3b82f6" />
    
    {/* Palmiers (Silhouettes) */}
    <path d="M45 75 Q 40 50 30 40 M 30 40 Q 20 45 15 35 M 30 40 Q 25 25 35 20 M 30 40 Q 45 30 50 35" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M55 78 Q 60 50 70 40 M 70 40 Q 80 45 85 35 M 70 40 Q 75 25 65 20 M 70 40 Q 55 30 50 35" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
    
    {/* Troncs */}
    <path d="M45 76 C 45 60, 35 50, 32 40" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
    <path d="M55 79 C 55 60, 65 50, 68 40" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUFRDropdownOpen, setIsUFRDropdownOpen] = useState(false);
  const { user, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    logout();
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path ? 'text-green-700 font-bold bg-green-50' : 'text-slate-600 hover:text-green-600 hover:bg-slate-50';
  const linkClasses = "flex items-center gap-1.5 px-3 py-2 rounded-md transition-all text-sm font-medium";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-t-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
                {/* Logo Vectoriel Intégré */}
                <div className="relative w-14 h-14 group-hover:scale-105 transition-transform duration-300">
                   <LogoAERCD className="w-full h-full drop-shadow-md" />
                </div>

                <div className="flex flex-col ml-1">
                  <span className="font-extrabold text-2xl text-slate-800 tracking-tight leading-none">AERCD-B</span>
                  <span className="text-[10px] text-green-700 font-bold uppercase tracking-widest">Diembering • Bambey</span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/" className={`${isActive('/')} ${linkClasses}`}>
                <Home size={18} /> Accueil
              </Link>
              
              <div className="relative group">
                <button 
                  className={`flex items-center gap-1.5 focus:outline-none ${location.pathname.includes('/ufr') ? 'text-green-700 font-bold bg-green-50' : 'text-slate-600 hover:text-green-600 hover:bg-slate-50'} px-3 py-2 rounded-md transition-all text-sm font-medium`}
                  onMouseEnter={() => setIsUFRDropdownOpen(true)}
                  onMouseLeave={() => setIsUFRDropdownOpen(false)}
                >
                  <GraduationCap size={18} /> UFR <ChevronDown size={14} />
                </button>
                {isUFRDropdownOpen && (
                  <div 
                    className="absolute left-0 w-56 bg-white shadow-xl rounded-xl py-2 border border-slate-100 animate-fade-in z-50 mt-1"
                    onMouseEnter={() => setIsUFRDropdownOpen(true)}
                    onMouseLeave={() => setIsUFRDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Départements</div>
                    {Object.values(UFRS).map(ufr => (
                      <Link 
                        key={ufr.id} 
                        to={`/ufr/${ufr.id}`} 
                        className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700 border-l-4 border-transparent hover:border-green-500 transition-all"
                      >
                        {ufr.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/resources" className={`${isActive('/resources')} ${linkClasses}`}>
                <BookOpen size={18} /> Cours & TD
              </Link>
              <Link to="/amicale" className={`${isActive('/amicale')} ${linkClasses}`}>
                <Users size={18} /> L'Amicale
              </Link>
              
              {user ? (
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-slate-900">{user.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase font-bold tracking-wide">{user.role}</span>
                  </div>
                  {user.role === 'admin' && (
                     <Link to="/admin" className="text-sm bg-slate-800 text-white px-3 py-1.5 rounded-md hover:bg-slate-900 shadow-sm transition-transform hover:-translate-y-0.5 flex items-center gap-2">
                        <LayoutDashboard size={14} /> Admin
                     </Link>
                  )}
                  <button onClick={handleLogout} className="text-slate-400 hover:text-red-600 transition-colors p-1.5 rounded-md hover:bg-red-50" title="Déconnexion">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="ml-4 bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2 rounded-full hover:shadow-lg hover:to-green-800 transition-all flex items-center gap-2 text-sm font-medium transform hover:scale-105">
                  <User size={18} /> Espace Membre
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-green-600 p-2 rounded-md hover:bg-slate-100">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg z-50">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-green-600 hover:bg-green-50">
                <Home size={20} /> Accueil
              </Link>
              
              <div className="space-y-1">
                <div className="px-3 py-2 text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <GraduationCap size={16} /> UFR
                </div>
                {Object.values(UFRS).map(ufr => (
                    <Link 
                        key={ufr.id} 
                        to={`/ufr/${ufr.id}`} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block pl-10 pr-3 py-2.5 rounded-lg text-sm text-slate-600 hover:text-green-600 hover:bg-slate-50 border-l-2 border-transparent hover:border-green-500"
                    >
                        {ufr.name}
                    </Link>
                ))}
              </div>

              <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-green-600 hover:bg-green-50">
                <BookOpen size={20} /> Cours & TD
              </Link>
              <Link to="/amicale" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-slate-700 hover:text-green-600 hover:bg-green-50">
                <Users size={20} /> L'Amicale
              </Link>

              {user ? (
                <div className="mt-4 border-t border-slate-100 pt-4 px-3">
                  <div className="flex items-center gap-3 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold block text-slate-900">{user.name}</span>
                      <span className="text-xs text-slate-500 uppercase">{user.role}</span>
                    </div>
                  </div>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-2.5 rounded-lg mb-3 shadow-sm font-medium">
                        <LayoutDashboard size={18} /> Tableau de bord
                    </Link>
                  )}
                  <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2.5 rounded-lg hover:bg-red-50 font-medium">
                    <LogOut size={18} /> Déconnexion
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center justify-center gap-2 mt-6 bg-green-600 text-white px-4 py-3 rounded-xl font-bold shadow-md active:scale-95 transition-transform">
                    <User size={20} /> Connexion Membre
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-xl font-bold mb-6 flex items-center gap-3">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                    <LogoAERCD className="w-full h-full" />
               </div> 
               AERCD-B
            </h3>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
              "Unis pour apprendre, solidaires pour grandir."<br/>
              L'Amicale vous accompagne tout au long de votre parcours universitaire à l'UADB.
            </p>
            <p className="text-sm flex items-center gap-2 text-slate-400">
                <MapPin size={16} className="text-green-500" /> Maison Sifoca House, Bambey
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6 border-b border-slate-700 pb-2 inline-block">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/resources" className="hover:text-amber-400 transition-colors flex items-center gap-2"><BookOpen size={14}/> Bibliothèque</Link></li>
              <li><Link to="/ufr/SATIC" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> UFR SATIC</Link></li>
              <li><Link to="/ufr/SDD" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> UFR SDD</Link></li>
              <li><Link to="/ufr/ECOMIJ" className="hover:text-amber-400 transition-colors flex items-center gap-2"><ChevronDown size={14} className="-rotate-90"/> UFR ECOMIJ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6 border-b border-slate-700 pb-2 inline-block">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail size={16} className="text-amber-500"/> contact@aercd-b.sn</li>
              <li className="flex items-center gap-2"><Phone size={16} className="text-amber-500"/> +221 77 000 00 00</li>
              <li className="flex items-center gap-2"><MapPin size={16} className="text-amber-500"/> Diembering, Ziguinchor</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-600 flex flex-col md:flex-row justify-between items-center">
          <span>© {new Date().getFullYear()} AERCD-B. Tous droits réservés.</span>
          <span className="mt-2 md:mt-0 italic flex items-center gap-2">
            <GraduationCap size={14} /> L'excellence est ma constance, l'éthique ma vertu.
          </span>
        </div>
      </footer>
    </div>
  );
};