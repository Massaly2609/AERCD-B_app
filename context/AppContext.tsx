
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, CourseResource, SiteContent, AppNotification } from '../types';
import { UFRS, AMICALE_INFO, MOCK_COURSES } from '../constants';
import { supabase } from '../supabaseClient';

interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  courses: CourseResource[];
  addCourse: (course: Omit<CourseResource, 'id' | 'dateAdded' | 'downloads' | 'size' | 'author' | 'fileUrl'>, file: File | null) => Promise<void>;
  updateCourse: (updatedCourse: CourseResource) => Promise<void>;
  deleteCourse: (id: string, fileUrl?: string) => Promise<void>;
  incrementDownload: (id: string) => Promise<void>;
  siteContent: SiteContent;
  updateSiteContent: (content: Partial<SiteContent>) => void;
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, 'id' | 'dateAdded' | 'active'>, file: File | null) => Promise<void>;
  deleteNotification: (id: string, docUrl?: string) => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [courses, setCourses] = useState<CourseResource[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  
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

  // Charger les données depuis Supabase au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem('aercd_user');
    if (storedUser) setUser(JSON.parse(storedUser));
    
    const loadData = async () => {
        await fetchCourses();
        await fetchNotifications();
        setLoading(false);
    };
    loadData();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (data && data.length > 0) {
        // Map Supabase columns to our Type
        const mappedCourses: CourseResource[] = data.map((d: any) => ({
          ...d,
          dateAdded: new Date(d.created_at).toLocaleDateString(),
          fileUrl: d.file_url 
        }));
        setCourses(mappedCourses);
      } else {
        // Si la DB est vide ou table inexistante, on garde les mocks pour la démo si nécessaire
        // Pour un site en prod, on laisserait vide. Ici on fallback pour éviter l'écran blanc si pas de setup DB.
        console.log("Aucune donnée Supabase ou table vide. Utilisation des données locales.");
        setCourses(MOCK_COURSES);
      }
    } catch (error) {
      console.error("Erreur critique Supabase (Cours):", JSON.stringify(error, null, 2));
      // Fallback sur les données mockées en cas d'erreur (ex: table manquante)
      setCourses(MOCK_COURSES);
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
          // Si la table n'existe pas encore, on ignore silencieusement
          console.warn("Table notifications inaccessible ou vide.");
          return;
      }

      if (data) {
         const mappedNotifs: AppNotification[] = data.map((d: any) => ({
             ...d,
             documentUrl: d.document_url,
             dateAdded: new Date(d.created_at).toLocaleDateString()
         }));
         setNotifications(mappedNotifs);
      }
    } catch (error) {
      console.error("Erreur chargement notifs:", JSON.stringify(error, null, 2));
    }
  };

  // --- AUTH ---
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
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aercd_user');
  };

  // --- COURSES ---
  const addCourse = async (courseData: Omit<CourseResource, 'id' | 'dateAdded' | 'downloads' | 'size' | 'author' | 'fileUrl'>, file: File | null) => {
    try {
        let fileUrl = '';
        let fileSize = '0 MB';

        // 1. Upload File
        if (file) {
            fileSize = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            
            // Vérifier si le bucket existe ou créer l'objet directement
            const { error: uploadError } = await supabase.storage
                .from('course-materials')
                .upload(fileName, file);

            if (uploadError) {
                console.error("Erreur Upload Storage:", uploadError);
                throw uploadError;
            }

            // Get Public URL
            const { data: publicUrlData } = supabase.storage
                .from('course-materials')
                .getPublicUrl(fileName);
            
            fileUrl = publicUrlData.publicUrl;
        }

        // 2. Insert Record
        const { data, error } = await supabase
            .from('courses')
            .insert([{
                title: courseData.title,
                description: courseData.description,
                type: courseData.type,
                ufr: courseData.ufr,
                level: courseData.level,
                filiere: courseData.filiere,
                subject: courseData.subject,
                author: user?.name || 'Admin',
                size: fileSize,
                file_url: fileUrl
            }])
            .select();

        if (error) throw error;
        
        // Refresh local state
        await fetchCourses();

    } catch (error) {
        console.error("Erreur ajout cours:", JSON.stringify(error, null, 2));
        alert("Erreur lors de l'ajout. Vérifiez que les tables Supabase sont créées.");
    }
  };

  const updateCourse = async (updatedCourse: CourseResource) => {
    try {
        const { error } = await supabase
            .from('courses')
            .update({
                title: updatedCourse.title,
                description: updatedCourse.description,
                type: updatedCourse.type,
                ufr: updatedCourse.ufr,
                level: updatedCourse.level,
                filiere: updatedCourse.filiere,
                subject: updatedCourse.subject
            })
            .eq('id', updatedCourse.id);

        if (error) throw error;
        await fetchCourses();
    } catch (error) {
        console.error("Erreur update:", error);
    }
  };

  const deleteCourse = async (id: string, fileUrl?: string) => {
    try {
        // 1. Delete file from storage if exists
        if (fileUrl) {
            const fileName = fileUrl.split('/').pop();
            if (fileName) {
                await supabase.storage.from('course-materials').remove([fileName]);
            }
        }

        // 2. Delete record
        const { error } = await supabase.from('courses').delete().eq('id', id);
        if (error) throw error;

        await fetchCourses();
    } catch (error) {
        console.error("Erreur suppression:", error);
    }
  };

  const incrementDownload = async (id: string) => {
    try {
        // On update uniquement si c'est un vrai ID UUID (pas un mock ID '1', '2'...)
        if (id.length < 10) return; 

        const current = courses.find(c => c.id === id);
        if (!current) return;

        await supabase
            .from('courses')
            .update({ downloads: current.downloads + 1 })
            .eq('id', id);
        
        setCourses(prev => prev.map(c => c.id === id ? { ...c, downloads: c.downloads + 1 } : c));
    } catch (error) {
        console.error("Erreur download count:", error);
    }
  };

  const updateSiteContent = (content: Partial<SiteContent>) => {
    setSiteContent(prev => ({ ...prev, ...content }));
  };

  // --- NOTIFICATIONS ---
  const addNotification = async (notifData: Omit<AppNotification, 'id' | 'dateAdded' | 'active'>, file: File | null) => {
    try {
        let documentUrl = '';

        if (file) {
            const fileExt = file.name.split('.').pop();
            const fileName = `notif_${Math.random().toString(36).substring(2)}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('notification-documents')
                .upload(fileName, file);
            
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('notification-documents').getPublicUrl(fileName);
            documentUrl = data.publicUrl;
        }

        const { error } = await supabase.from('notifications').insert([{
            type: notifData.type,
            label: notifData.label,
            text: notifData.text,
            document_url: documentUrl,
            active: true
        }]);

        if (error) throw error;
        await fetchNotifications();

    } catch (error) {
        console.error("Erreur ajout notification:", error);
        alert("Erreur ajout notification. Vérifiez la table 'notifications'.");
    }
  };

  const deleteNotification = async (id: string, docUrl?: string) => {
    try {
        if (docUrl) {
            const fileName = docUrl.split('/').pop();
            if (fileName) await supabase.storage.from('notification-documents').remove([fileName]);
        }
        await supabase.from('notifications').delete().eq('id', id);
        await fetchNotifications();
    } catch (error) {
         console.error("Erreur suppression notif:", error);
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, login, logout, 
      courses, addCourse, updateCourse, deleteCourse, incrementDownload,
      siteContent, updateSiteContent,
      notifications, addNotification, deleteNotification,
      loading
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
