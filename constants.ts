import { UFRData, CourseResource } from './types';
import { BookOpen, Stethoscope, Scale } from 'lucide-react';

export const UFRS: Record<string, UFRData> = {
  SATIC: {
    id: 'SATIC',
    name: 'UFR SATIC',
    fullName: 'Sciences Appliquées et Technologies de l\'Information et de la Communication',
    description: 'Formation d\'excellence en mathématiques, informatique et sciences physiques.',
    color: 'bg-blue-600',
    iconName: 'Cpu',
    departments: [
      { name: 'Mathématiques', code: 'MATH', description: 'Algèbre, Analyse, Géométrie' },
      { name: 'Physique', code: 'PHYS', description: 'Mécanique, Électronique, Thermodynamique' },
      { name: 'Chimie', code: 'CHIM', description: 'Chimie organique et minérale' },
      { name: 'TIC', code: 'TIC', description: 'Informatique et Réseaux' },
    ],
    programs: [
      { name: 'Licence SID', level: 'Licence', description: 'Systèmes Informatiques et Décisionnels' },
      { name: 'Licence Physique Numérique', level: 'Licence', description: '' },
      { name: 'Licence Systèmes & Réseaux', level: 'Licence', description: '' },
      { name: 'Licence Dév Apps', level: 'Licence', description: '' },
      { name: 'Licence Multimédia', level: 'Licence', description: '' },
      { name: 'Master Math-Appli', level: 'Master', description: '' },
      { name: 'Master Data Science', level: 'Master', description: '' },
    ]
  },
  SDD: {
    id: 'SDD',
    name: 'UFR SDD',
    fullName: 'Santé et Développement Durable',
    description: 'Au cœur des enjeux de santé publique et de l\'environnement.',
    color: 'bg-green-600',
    iconName: 'Leaf',
    departments: [
      { name: 'Santé Communautaire', code: 'SANTE', description: '' },
      { name: 'Développement Durable', code: 'DD', description: '' },
      { name: 'Médecine', code: 'MED', description: '' },
    ],
    programs: [
      { name: 'Licence Santé', level: 'Licence', description: '' },
      { name: 'Licence Environnement', level: 'Licence', description: '' },
      { name: 'Licence Nutrition', level: 'Licence', description: '' },
      { name: 'Master Promotion Santé', level: 'Master', description: '' },
      { name: 'Master Agriculture', level: 'Master', description: '' },
    ]
  },
  ECOMIJ: {
    id: 'ECOMIJ',
    name: 'UFR ECOMIJ',
    fullName: 'Économie, Management et Ingénierie Juridique',
    description: 'Former les cadres de demain en gestion et droit.',
    color: 'bg-amber-600',
    iconName: 'Scale',
    departments: [
      { name: 'Économie', code: 'ECO', description: '' },
      { name: 'Management', code: 'MGMT', description: '' },
      { name: 'Ingénierie Juridique', code: 'DROIT', description: '' },
    ],
    programs: [
      { name: 'Licence CCA', level: 'Licence', description: 'Comptabilité Contrôle Audit' },
      { name: 'Licence Finance', level: 'Licence', description: '' },
      { name: 'Master Droit Public', level: 'Master', description: '' },
      { name: 'Master Fiscalité', level: 'Master', description: '' },
    ]
  }
};

export const MOCK_COURSES: CourseResource[] = [
  {
    id: '1',
    title: 'Algèbre Linéaire - Chapitre 1',
    description: 'Les bases des matrices et des espaces vectoriels.',
    type: 'COURS',
    ufr: 'SATIC',
    level: 'L1',
    filiere: 'Licence SID',
    subject: 'Algèbre',
    author: 'Dr. Diop',
    dateAdded: '2023-10-15',
    downloads: 120,
    size: '2.4 MB'
  },
  {
    id: '1-td',
    title: 'Série d\'exercices N°1 - Matrices',
    type: 'TD',
    ufr: 'SATIC',
    level: 'L1',
    filiere: 'Licence SID',
    subject: 'Algèbre',
    author: 'Dr. Diop',
    dateAdded: '2023-10-20',
    downloads: 95,
    size: '0.5 MB'
  },
  {
    id: '2',
    title: 'Cours Thermodynamique',
    type: 'COURS',
    ufr: 'SATIC',
    level: 'L1',
    filiere: 'Licence Physique Numérique',
    subject: 'Thermodynamique',
    author: 'Pr. Ndiaye',
    dateAdded: '2023-11-01',
    downloads: 85,
    size: '3.1 MB'
  },
  {
    id: '2-td',
    title: 'TD Thermodynamique N°2',
    type: 'TD',
    ufr: 'SATIC',
    level: 'L1',
    filiere: 'Licence Physique Numérique',
    subject: 'Thermodynamique',
    author: 'Pr. Ndiaye',
    dateAdded: '2023-11-02',
    downloads: 85,
    size: '1.1 MB'
  },
  {
    id: '2-tp',
    title: 'TP Calorimétrie',
    type: 'TP',
    ufr: 'SATIC',
    level: 'L1',
    filiere: 'Licence Physique Numérique',
    subject: 'Thermodynamique',
    author: 'M. Sow',
    dateAdded: '2023-11-05',
    downloads: 40,
    size: '1.8 MB'
  },
  {
    id: '3',
    title: 'Introduction au Droit Civil',
    type: 'COURS',
    ufr: 'ECOMIJ',
    level: 'L1',
    filiere: 'Master Droit Public',
    subject: 'Droit Civil',
    author: 'Dr. Sarr',
    dateAdded: '2023-10-20',
    downloads: 230,
    size: '4.5 MB'
  },
  {
    id: '4',
    title: 'Épidémiologie de base',
    type: 'COURS',
    ufr: 'SDD',
    level: 'L2',
    filiere: 'Licence Santé',
    subject: 'Épidémiologie',
    author: 'Dr. Fall',
    dateAdded: '2024-01-10',
    downloads: 56,
    size: '3.2 MB'
  },
  {
    id: '5',
    title: 'Examen JAVA 2023',
    type: 'EXAMEN',
    ufr: 'SATIC',
    level: 'L2',
    filiere: 'Licence Dév Apps',
    subject: 'Programmation',
    author: 'M. Diallo',
    dateAdded: '2024-02-15',
    downloads: 310,
    size: '0.8 MB'
  }
];

export const AMICALE_INFO = {
  mission: "L'AERCD-B a pour mission principale de promouvoir la solidarité, l'entraide et l'excellence académique parmi les étudiants ressortissants de Diembering à l'Université Alioune Diop de Bambey.",
  vision: "Faire de chaque étudiant un acteur du développement local et national.",
  president: "M. Bassene",
  founded: "2015"
};