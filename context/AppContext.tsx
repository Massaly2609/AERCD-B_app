import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, CourseResource, Role, SiteContent } from '../types';
import { MOCK_COURSES, UFRS, AMICALE_INFO } from '../constants';

interface AppContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
  courses: CourseResource[];
  addCourse: (course: CourseResource) => void;
  deleteCourse: (id: string) => void;
  incrementDownload: (id: string) => void;
  siteContent: SiteContent;
  updateSiteContent: (content: Partial<SiteContent>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<CourseResource[]>(MOCK_COURSES);
  
  // State for editable content (CMS simulation)
  const [siteContent, setSiteContent] = useState<SiteContent>({
    homeWelcome: "La plateforme officielle pour les étudiants de l'UADB ressortissants de Diembering.",
    amicaleMission: AMICALE_INFO.mission,
    amicaleVision: AMICALE_INFO.vision,
    ufrDescriptions: {
      SATIC: UFRS.SATIC.description,
      SDD: UFRS.SDD.description,
      ECOMIJ: UFRS.ECOMIJ.description
    }
  });

  // Load from local storage on mount (persistence simulation)
  useEffect(() => {
    const storedUser = localStorage.getItem('aercd_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (role: Role) => {
    const mockUser: User = {
      id: 'u1',
      name: role === 'admin' ? 'Administrateur' : 'Étudiant Bambey',
      email: role === 'admin' ? 'admin@uadb.edu.sn' : 'student@uadb.edu.sn',
      role: role,
      ufr: 'SATIC'
    };
    setUser(mockUser);
    localStorage.setItem('aercd_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aercd_user');
  };

  const addCourse = (course: CourseResource) => {
    setCourses(prev => [course, ...prev]);
  };

  const deleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const incrementDownload = (id: string) => {
    setCourses(prev => prev.map(c => 
      c.id === id ? { ...c, downloads: c.downloads + 1 } : c
    ));
  };

  const updateSiteContent = (content: Partial<SiteContent>) => {
    setSiteContent(prev => ({ ...prev, ...content }));
  };

  return (
    <AppContext.Provider value={{ 
      user, login, logout, 
      courses, addCourse, deleteCourse, incrementDownload,
      siteContent, updateSiteContent
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};