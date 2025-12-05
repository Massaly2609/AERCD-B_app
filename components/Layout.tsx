
import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, Home, GraduationCap, BookOpen, Users, LayoutDashboard, Phone, Mail, MapPin, Bell, ChevronLeft, ChevronRight, Info, Calendar, Megaphone, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UFRS } from '../constants';

const { Link, useLocation, useNavigate } = ReactRouterDOM;

// --- COMPOSANT NOTIFICATION FLASH (TICKER) ---
const NotificationBar = () => {
    const { notifications } = useApp();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    // Filter only active notifications if you implement an archive system later
    const activeNotifications = notifications;

    useEffect(() => {
        if (activeNotifications.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % activeNotifications.length);
        }, 6000); // Change every 6 seconds
        return () => clearInterval(interval);
    }, [activeNotifications.length]);

    const next = () => setCurrentIndex((prev) => (prev + 1) % activeNotifications.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + activeNotifications.length) % activeNotifications.length);

    // If no notifications or manually closed, hide bar
    if (!isVisible || activeNotifications.length === 0) return null;

    const currentNotif = activeNotifications[currentIndex];

    const getTypeColor = (type: string) => {
        switch(type) {
            case 'URGENT': return 'bg-red-600 text-white';
            case 'INFO': return 'bg-blue-600 text-white';
            case 'EVENT': return 'bg-amber-600 text-white';
            default: return 'bg-slate-600 text-white';
        }
    };

    return (
        <div className="bg-slate-900 text-white text-sm relative z-[60]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between">
                
                {/* Left: Label */}
                <div className="flex items-center gap-4 overflow-hidden flex-grow">
                    <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-xs whitespace-nowrap">
                        <Megaphone size={14} /> Flash Info
                    </div>
                    <div className="h-4 w-px bg-slate-700"></div>
                    
                    {/* Ticker Content */}
                    <div className="flex items-center gap-3 animate-fade-in flex-grow min-w-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${getTypeColor(currentNotif.type)}`}>
                            {currentNotif.label}
                        </span>
                        
                        {currentNotif.documentUrl ? (
                            <a 
                                href={currentNotif.documentUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="truncate text-slate-300 font-medium hover:text-white hover:underline flex items-center gap-2 cursor-pointer transition-colors"
                                title="Cliquez pour télécharger ou voir le document joint"
                            >
                                {currentNotif.text}
                                <span className="inline-flex items-center gap-1 bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-amber-300">
                                    <Download size={10} /> PDF
                                </span>
                            </a>
                        ) : (
                            <span className="truncate text-slate-300 font-medium">
                                {currentNotif.text}
                            </span>
                        )}
                    </div>
                </div>

                {/* Right: Controls */}
                <div className="flex items-center gap-4 pl-4 border-l border-slate-700 ml-4 flex-shrink-0">
                    <div className="flex items-center gap-1">
                        <button onClick={prev} className="p-1 hover:text-amber-400 transition-colors"><ChevronLeft size={14}/></button>
                        <button onClick={next} className="p-1 hover:text-amber-400 transition-colors"><ChevronRight size={14}/></button>
                    </div>
                    <button onClick={() => setIsVisible(false)} className="text-slate-500 hover:text-white transition-colors">
                        <X size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};


// Logo vectoriel personnalisé AERCD-B
const LogoAERCD = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="white" stroke="#0f172a" strokeWidth="2"/>
    <circle cx="50" cy="45" r="25" fill="#f59e0b" />
    <path d="M50 15 L50 20 M50 70 L50 75 M20 45 L25 45 M75 45 L80 45 M29 24 L32 27 M71 66 L68 63 M29 66 L32 63 M71 24 L68 27" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
    <path d="M15 75 C 30 70, 70 70, 85 75 V 85 C 70 90, 30 90, 15 85 Z" fill="#3b82f6" />
    <path d="M45 75 Q 40 50 30 40 M 30 40 Q 20 45 15 35 M 30 40 Q 25 25 35 20 M 30 40 Q 45 30 50 35" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M55 78 Q 60 50 70 40 M 70 40 Q 80 45 85 35 M 70 40 Q 75 25 65 20 M 70 40 Q 55 30 50 35" stroke="#15803d" strokeWidth="3" fill="none" strokeLinecap="round" />
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

  // Improved Nav Link with Hover Underline Animation
  const NavLink = ({ to, label, icon: Icon, active }: { to: string, label: string, icon: any, active: boolean }) => (
    <Link to={to} className="relative group py-2 flex items-center gap-1.5 text-sm font-semibold tracking-tight text-slate-600 hover:text-slate-900 transition-colors">
        <Icon size={16} className={`${active ? 'text-green-600' : 'text-slate-400 group-hover:text-green-600 transition-colors'}`} />
        <span>{label}</span>
        <span className={`absolute bottom-0 left-0 h-0.5 bg-green-600 transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      
      {/* 1. NOTIFICATION SYSTEM */}
      <NotificationBar />

      {/* 2. MAIN NAVIGATION */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo Area */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative w-12 h-12 transition-transform duration-300 group-hover:rotate-6">
                   <LogoAERCD className="w-full h-full drop-shadow-sm" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-xl text-slate-800 tracking-tighter leading-none group-hover:text-green-700 transition-colors">AERCD-B</span>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest group-hover:text-amber-500 transition-colors">Portail Étudiant</span>
                </div>
              </Link>
            </div>

            {/* Desktop Menu - Centered & Clean */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/" label="Accueil" icon={Home} active={location.pathname === '/'} />
              
              <div className="relative group h-full flex items-center">
                <button 
                  className={`flex items-center gap-1.5 text-sm font-semibold tracking-tight ${location.pathname.includes('/ufr') ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'} focus:outline-none transition-colors`}
                  onMouseEnter={() => setIsUFRDropdownOpen(true)}
                  onMouseLeave={() => setIsUFRDropdownOpen(false)}
                >
                  <GraduationCap size={16} className={`${location.pathname.includes('/ufr') ? 'text-green-600' : 'text-slate-400 group-hover:text-green-600'}`} />
                  UFR <ChevronDown size={14} className="mt-0.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </button>
                
                {/* Mega Menu Dropdown */}
                {isUFRDropdownOpen && (
                  <div 
                    className="absolute top-full -left-10 w-64 bg-white shadow-xl rounded-xl border border-slate-100 p-2 animate-fade-in z-50 transform origin-top-left"
                    onMouseEnter={() => setIsUFRDropdownOpen(true)}
                    onMouseLeave={() => setIsUFRDropdownOpen(false)}
                  >
                    <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">
                        Départements Académiques
                    </div>
                    {Object.values(UFRS).map(ufr => (
                      <Link 
                        key={ufr.id} 
                        to={`/ufr/${ufr.id}`} 
                        className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-50 group/item transition-all"
                      >
                        <div className={`p-2 rounded-md bg-opacity-10 ${ufr.color.replace('bg-', 'text-').replace('-600', '-600')} ${ufr.color}`}>
                            <GraduationCap size={16} />
                        </div>
                        <div>
                            <span className="block text-sm font-bold text-slate-800 group-hover/item:text-green-700">{ufr.name}</span>
                            <span className="block text-[10px] text-slate-400 font-medium">Voir les formations</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <NavLink to="/resources" label="Bibliothèque" icon={BookOpen} active={location.pathname === '/resources'} />
              <NavLink to="/amicale" label="L'Amicale" icon={Users} active={location.pathname === '/amicale'} />
            </div>

            {/* Right Side - Auth Button */}
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
                  <div className="text-right hidden lg:block">
                    <span className="block text-sm font-bold text-slate-900 leading-none">{user.name}</span>
                    <span className="text-[10px] font-bold text-green-600 uppercase tracking-wide">{user.role}</span>
                  </div>
                  <div className="flex gap-2">
                     {user.role === 'admin' && (
                        <Link to="/admin" className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-all" title="Administration">
                            <LayoutDashboard size={20} />
                        </Link>
                     )}
                     <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all" title="Déconnexion">
                        <LogOut size={20} />
                     </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="group flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm font-medium">
                  <User size={16} className="text-amber-400" />
                  <span>Espace Membre</span>
                </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-xl absolute w-full z-40 animate-fade-in">
            <div className="p-4 space-y-1">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-50">
                <Home size={20} className="text-slate-400" /> Accueil
              </Link>
              
              <div className="py-2">
                <div className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">UFR</div>
                {Object.values(UFRS).map(ufr => (
                    <Link 
                        key={ufr.id} 
                        to={`/ufr/${ufr.id}`} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-50 pl-8 border-l-2 border-transparent hover:border-green-500"
                    >
                       <span className={`w-2 h-2 rounded-full ${ufr.color}`}></span> {ufr.name}
                    </Link>
                ))}
              </div>

              <Link to="/resources" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-50">
                <BookOpen size={20} className="text-slate-400" /> Bibliothèque
              </Link>
              <Link to="/amicale" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-700 hover:bg-slate-50">
                <Users size={20} className="text-slate-400" /> L'Amicale
              </Link>

              <div className="pt-4 mt-4 border-t border-slate-100">
                {user ? (
                   <>
                     <div className="flex items-center gap-3 px-4 mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-slate-900">{user.name}</p>
                            <p className="text-xs text-slate-500 uppercase">{user.role}</p>
                        </div>
                     </div>
                     {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 bg-slate-100 rounded-xl font-medium text-slate-900 mb-2">
                             <LayoutDashboard size={20} /> Tableau de bord
                        </Link>
                     )}
                     <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50">
                        <LogOut size={20} /> Déconnexion
                     </button>
                   </>
                ) : (
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 bg-slate-900 text-white w-full py-3 rounded-xl font-bold shadow-lg">
                        <User size={20} className="text-amber-400" /> Connexion Membre
                    </Link>
                )}
              </div>
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
