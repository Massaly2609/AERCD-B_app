
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, CourseResource, Role, SiteContent, AppNotification } from '../types';
import { MOCK_COURSES, UFRS, AMICALE_INFO } from '../constants';

interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  courses: CourseResource[];
  addCourse: (course: Omit<CourseResource, 'id' | 'dateAdded' | 'downloads' | 'size' | 'author'>) => void;
  updateCourse: (updatedCourse: CourseResource) => void;
  deleteCourse: (id: string) => void;
  incrementDownload: (id: string) => void;
  siteContent: SiteContent;
  updateSiteContent: (content: Partial<SiteContent>) => void;
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, 'id' | 'dateAdded' | 'active'>) => void;
  deleteNotification: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Données initiales pour les notifications
const INITIAL_NOTIFICATIONS: AppNotification[] = [
    { id: '1', type: 'URGENT', label: 'Bourses', text: 'Dernier délai pour le dépôt des dossiers de bourses sociales : 15 Mars 2025.', active: true, dateAdded: '2025-01-01' },
    { id: '2', type: 'INFO', label: 'Inscriptions', text: 'Ouverture des inscriptions pédagogiques pour le second semestre.', active: true, dateAdded: '2025-01-02' },
    { id: '3', type: 'EVENT', label: 'Soutenance', text: 'Soutenances de Master UFR ECOMIJ prévues du 20 au 25 Avril.', active: true, dateAdded: '2025-01-03' },
    { id: '4', type: 'APPEL', label: 'Candidature', text: 'Appel à candidature pour le Master Interuniversitaire en Énergies Renouvelables.', active: true, dateAdded: '2025-01-04' },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<CourseResource[]>(MOCK_COURSES);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  
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

  useEffect(() => {
    const storedUser = localStorage.getItem('aercd_user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (email: string, password: string): boolean => {
    if (email === 'aercd-badmin@gmail.com' && password === 'aercd-b2025') {
      const adminUser: User = {
        id: 'admin01',
        name: 'Administrateur',
        email: 'aercd-badmin@gmail.com',
        role: 'admin',
      };
      setUser(adminUser);
      localStorage.setItem('aercd_user', JSON.stringify(adminUser));
      return true;
    }
    // Add student login logic here if needed
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aercd_user');
  };

  const addCourse = (courseData: Omit<CourseResource, 'id' | 'dateAdded' | 'downloads' | 'size' | 'author'>) => {
    const newCourse: CourseResource = {
      ...courseData,
      id: Math.random().toString(36).substr(2, 9),
      author: user?.name || 'Admin', 
      dateAdded: new Date().toISOString().split('T')[0],
      downloads: 0,
      size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
    };
    setCourses(prev => [newCourse, ...prev]);
  };

  const updateCourse = (updatedCourse: CourseResource) => {
    setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
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

  // Gestion des Notifications
  const addNotification = (notifData: Omit<AppNotification, 'id' | 'dateAdded' | 'active'>) => {
    const newNotif: AppNotification = {
      ...notifData,
      id: Math.random().toString(36).substr(2, 9),
      dateAdded: new Date().toISOString().split('T')[0],
      active: true
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      user, login, logout, 
      courses, addCourse, updateCourse, deleteCourse, incrementDownload,
      siteContent, updateSiteContent,
      notifications, addNotification, deleteNotification
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
