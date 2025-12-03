import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UFRS } from '../constants';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUFRDropdownOpen, setIsUFRDropdownOpen] = useState(false);
  const { user, logout } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-green-700 font-bold' : 'text-slate-600 hover:text-green-600';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-t-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
                {/* Logo Placeholder - Remplacez src par votre fichier logo réel */}
                <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg group-hover:scale-105 transition-transform overflow-hidden">
                   {/* Fallback visual if no image */}
                   <Sun className="text-white w-8 h-8 absolute" />
                   <div className="absolute bottom-0 w-full h-1/3 bg-blue-600"></div>
                   <div className="absolute bottom-0 right-0 w-1/2 h-2/3 bg-green-600 rounded-tl-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-2xl text-slate-800 tracking-tight leading-none">AERCD-B</span>
                  <span className="text-[10px] text-green-700 font-bold uppercase tracking-widest">Diembering • Bambey</span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className={isActive('/')}>Accueil</Link>
              
              <div className="relative group">
                <button 
                  className={`flex items-center gap-1 focus:outline-none ${location.pathname.includes('/ufr') ? 'text-green-700 font-bold' : 'text-slate-600 hover:text-green-600'}`}
                  onMouseEnter={() => setIsUFRDropdownOpen(true)}
                  onMouseLeave={() => setIsUFRDropdownOpen(false)}
                >
                  UFR <ChevronDown size={16} />
                </button>
                {isUFRDropdownOpen && (
                  <div 
                    className="absolute left-0 w-48 bg-white shadow-xl rounded-b-lg py-2 border-t-2 border-green-500 animate-fade-in"
                    onMouseEnter={() => setIsUFRDropdownOpen(true)}
                    onMouseLeave={() => setIsUFRDropdownOpen(false)}
                  >
                    {Object.values(UFRS).map(ufr => (
                      <Link 
                        key={ufr.id} 
                        to={`/ufr/${ufr.id}`} 
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-green-50 hover:text-green-700 border-l-2 border-transparent hover:border-green-500"
                      >
                        {ufr.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/resources" className={isActive('/resources')}>Cours & TD</Link>
              <Link to="/amicale" className={isActive('/amicale')}>L'Amicale</Link>
              
              {user ? (
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-slate-900">{user.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase font-bold tracking-wide">{user.role}</span>
                  </div>
                  {user.role === 'admin' && (
                     <Link to="/admin" className="text-sm bg-slate-800 text-white px-3 py-1.5 rounded hover:bg-slate-900 shadow-sm transition-transform hover:-translate-y-0.5">Admin</Link>
                  )}
                  <button onClick={logout} className="text-slate-400 hover:text-red-600 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-gradient-to-r from-green-600 to-green-700 text-white px-5 py-2.5 rounded-full hover:shadow-lg hover:to-green-800 transition-all flex items-center gap-2 text-sm font-medium">
                  <User size={18} /> Espace Membre
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-green-600 p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg z-50">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-green-600 hover:bg-green-50">Accueil</Link>
              <div className="px-3 py-2 text-base font-bold text-slate-900 bg-slate-50 rounded-md">UFR</div>
               {Object.values(UFRS).map(ufr => (
                  <Link 
                    key={ufr.id} 
                    to={`/ufr/${ufr.id}`} 
                    className="block pl-6 pr-3 py-2 rounded-md text-sm text-slate-600 hover:text-green-600 border-l-2 border-slate-200 hover:border-green-500 ml-3"
                  >
                    {ufr.name}
                  </Link>
                ))}
              <Link to="/resources" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-green-600 hover:bg-green-50">Cours & TD</Link>
              <Link to="/amicale" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-green-600 hover:bg-green-50">L'Amicale</Link>
              {user ? (
                <div className="mt-4 border-t border-slate-100 pt-4 px-3">
                  <div className="flex items-center gap-3 mb-4 bg-slate-50 p-3 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-bold block text-slate-900">{user.name}</span>
                      <span className="text-xs text-slate-500 uppercase">{user.role}</span>
                    </div>
                  </div>
                  {user.role === 'admin' && (
                    <Link to="/admin" className="block w-full text-center bg-slate-800 text-white py-2 rounded mb-2">Accès Admin</Link>
                  )}
                  <button onClick={logout} className="w-full text-center border border-red-200 text-red-600 py-2 rounded hover:bg-red-50">Déconnexion</button>
                </div>
              ) : (
                <Link to="/login" className="block w-full text-center mt-4 bg-green-600 text-white px-4 py-3 rounded-lg font-bold shadow-md">Connexion</Link>
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
               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-orange-600"></div> AERCD-B
            </h3>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
              "Unis pour apprendre, solidaires pour grandir."<br/>
              L'Amicale vous accompagne tout au long de votre parcours universitaire à l'UADB.
            </p>
            <p className="text-sm flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> Maison Sifoca House, Bambey</p>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6 border-b border-slate-700 pb-2 inline-block">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/resources" className="hover:text-amber-400 transition-colors">Bibliothèque</Link></li>
              <li><Link to="/ufr/SATIC" className="hover:text-amber-400 transition-colors">UFR SATIC</Link></li>
              <li><Link to="/ufr/SDD" className="hover:text-amber-400 transition-colors">UFR SDD</Link></li>
              <li><Link to="/ufr/ECOMIJ" className="hover:text-amber-400 transition-colors">UFR ECOMIJ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6 border-b border-slate-700 pb-2 inline-block">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>contact@aercd-b.sn</li>
              <li>+221 77 000 00 00</li>
              <li>Diembering, Ziguinchor</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-600 flex flex-col md:flex-row justify-between items-center">
          <span>© {new Date().getFullYear()} AERCD-B. Tous droits réservés.</span>
          <span className="mt-2 md:mt-0 italic">L'excellence est ma constance, l'éthique ma vertu.</span>
        </div>
      </footer>
    </div>
  );
};