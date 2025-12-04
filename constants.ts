import { UFRData, CourseResource } from './types';
import { BookOpen, Stethoscope, Scale } from 'lucide-react';

export const UFRS: Record<string, UFRData> = {
  SATIC: {
    id: 'SATIC',
    name: 'UFR SATIC',
    fullName: 'Sciences Appliquées et Technologies de l\'Information et de la Communication',
    description: 'Formation d\'excellence en mathématiques, informatique et sciences physiques.',
    context: `Aujourd’hui nos universités sont en proie à toutes sortes de difficultés, qui ont pour noms : massification des effectifs, insuffisance de ressources budgétaires et parfois inadéquation entre les programmes de formation et le besoin du marché de l’emploi. Une tendance que le nouveau système LMD tente d’ailleurs de redresser. 

C’est surtout avec un travail assidu, une réflexion continue, une persévérance que nous arriverons à faire avancer les choses dans notre université implantée au Baol, en plein milieu rural. Aujourd'hui, nous devons continuer de nous interroger sur la mission de l’Université et demeurer à l'avant-garde de la réflexion et des réformes nécessaires pour mieux l'accomplir.

C’est par la recherche que les acteurs de l’UADB, à travers des thématiques centrées autour des préoccupations des populations locales, parviendront à trouver les solutions aux problèmes posés. Ainsi nous devons réfléchir, tous ensemble, à la vision d’avenir que nous souhaitons pour l’UFR SATIC, pour une formation de qualité, un encouragement à la recherche, à l’innovation et au partenariat afin que l’excellence soit toujours la constance à l’UADB.

Les sciences sont le socle de toute activité humaine et sans elles, aucun progrès ne saurait prospérer. Les défis actuels d’un monde en perpétuelles mutations, dominé par les technologies numériques et recherches scientifiques ne cessent de nous démontrer l’importance des Sciences. Il est temps de motiver nos élèves qui sont les prochaines générations d’étudiants et d’enseignants à reconsidérer les sciences.

Nous nous réjouissons aujourd’hui des résultats obtenus dans le domaine des sciences grâce aux efforts consentis collégialement par tous les membres de l’UFR. C’est donc une réussite partagée par tous et pour tous. La bonne organisation, le management de qualité, l’unité et la cohésion entre les différents membres de l’UFR, la bonne ambiance de travail sont autant de raisons qui sont à la base de ces succès.`,
    directorsWord: {
      author: "Pr. Issa SAMB",
      role: "Le Directeur",
      content: `L’Unité de Formation et de Recherche (UFR) Sciences Appliquées et Technologies de l'Information et de la Communication (SATIC) est l'une des trois UFR de l’Université Alioune Diop de Bambey (UADB). Elle a été mise en place au cours de la quatrième année d’existence de l’Université de Bambey (UB), précisément le 23 février 2011.

L’UFR SATIC mène ses activités d'enseignement et de recherche sur deux sites : Ngoundiane et Bambey. Elle constitue un ensemble cohérent de formations et de recherche au service de la communauté locale, nationale et internationale. Elle contribue activement à la mission de l'UADB qui est de dispenser des formations de pointe, et parfaitement conformes aux besoins exprimés par le marché.

Chères étudiantes et chers étudiants, pour répondre à vos attentes tout en prenant en compte les mutations en cours, mon équipe et moi nous engageons résolument à faciliter votre intégration, diversifier l'offre documentaire et préparer votre insertion professionnelle.

Choisir l’UFR SATIC, c’est bénéficier d’un enseignement de haut niveau et de qualité, dispensé par des spécialistes dont les publications sont nombreuses et reconnues par les instances habilitées. La communauté des enseignants et des personnels administratifs est ainsi mobilisée pour favoriser la réussite de chacun de nos étudiantes et étudiants.`
    },
    color: 'bg-blue-600',
    iconName: 'Cpu',
    departments: [
      { name: 'Mathématiques', code: 'MATH', description: 'Algèbre, Analyse, Statistique et Informatique Décisionnelle' },
      { name: 'Physique', code: 'PHYS', description: 'Physique Numérique, Physique Chimie, Énergies Renouvelables' },
      { name: 'Chimie', code: 'CHIM', description: 'Chimie Appliquée, Inorganique, Organique' },
      { name: 'TIC', code: 'TIC', description: 'Informatique, Réseaux, Multimédia, Développement Web' },
    ],
    programs: [
      // MATH
      { name: 'Licence Mathématiques', level: 'Licence', departmentCode: 'MATH', description: 'Formation fondamentale en mathématiques.' },
      { name: 'Licence SID', level: 'Licence', departmentCode: 'MATH', description: 'Statistiques et Informatiques Décisionnelles.' },
      { name: 'Master Mathématiques et Applications', level: 'Master', departmentCode: 'MATH', description: 'MMA' },
      { name: 'Master SID', level: 'Master', departmentCode: 'MATH', description: 'Statistique et Informatiques Décisionnelle' },
      
      // PHYS
      { name: 'Licence Physique Numérique', level: 'Licence', departmentCode: 'PHYS', description: '' },
      { name: 'Licence Physique-Chimie (PC)', level: 'Licence', departmentCode: 'PHYS', description: '' },
      { name: 'Master MIER', level: 'Master', departmentCode: 'PHYS', description: 'Master Interuniversitaire en Energies Renouvelables' },
      { name: 'Master Physique Médicale', level: 'Master', departmentCode: 'PHYS', description: '' },

      // CHIM
      { name: 'Licence Chimie Appliquée (CA)', level: 'Licence', departmentCode: 'CHIM', description: 'Processus de fabrication et activités de laboratoire.' },
      { name: 'Master Chimie Inorganique', level: 'Master', departmentCode: 'CHIM', description: '' },
      { name: 'Master Chimie Organique', level: 'Master', departmentCode: 'CHIM', description: '' },
      { name: 'Master Chimie Physique', level: 'Master', departmentCode: 'CHIM', description: '' },

      // TIC
      { name: 'Licence AMRT', level: 'Licence', departmentCode: 'TIC', description: 'Administration et Maintenance des Réseaux Téléinformatiques' },
      { name: 'Licence D2AW', level: 'Licence', departmentCode: 'TIC', description: 'Développement et Administration des Applications Web' },
      { name: 'Licence LPCM', level: 'Licence', departmentCode: 'TIC', description: 'Licence Professionnelle en Création Multimédia' },
      { name: 'Master Systèmes d\'Information', level: 'Master', departmentCode: 'TIC', description: '' },
      { name: 'Master Systèmes et Réseaux', level: 'Master', departmentCode: 'TIC', description: '' },
      { name: 'Master DSGL', level: 'Master', departmentCode: 'TIC', description: 'Data sciences et Génie logiciel' },
    ],
    staff: [
      "Mme Fatoumata BALDE", "Dr Gaoussou CAMARA", "Dr Bernardi DAN", "Dr Abdou Aziz DIAGNE", "Dr Abdoul Salam DIALLO", "Dr Pape Abdoulaye Diaw", 
      "Dr Matabara DIENG", "Pr Biram DIENG", "Dr Abdou Khadre Djily DIME", "Dr Aba DIOP", "Dr Abdou Khadre DIOP", "Dr Abdoul Aziz FALL", 
      "Dr Mactar FAYE", "Dr Ibrahima FAYE", "Pr Ibrahima Faye", "Dr Moussa GAYE", "Dr Amadou Dahirou GUEYE", "Dr ASSANE GUEYE", "Dr Youssou KASSE", 
      "Pr Senghane MBODJI", "Dr Diery NGOM", "Dr Mouhamed Amine NIANG", "Dr Issa SAMB", "Dr Diégane SARR", "Dr Cheikh Tidiane SECK", "Dr Papa Lat Tabara SOW",
      "Dr Mouhamadou Moustapha SOW", "Pr Alassane SY", "Pr Farba Bouyagui TAMBOURA", "Dr Bertrand TCHANCHE", "Dr Ababacar Thiam", "Dr Mouhamadou NGOM",
      "Baboucar DIATTA", "Ahmad Khoureich KA", "Mouhamadou Lamine BA", "Pr Ibrahima FALL", "Ibrahima GAYE", "Birahime DIOUF", "Antoine Blaise KAMA",
      "Serigne Massamba SECK", "Mamadou Salif DIALLO", "Pr Moussa DIENG", "Massamba SECK", "Papa Ibrahima NDIAYE"
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
    filiere: 'Licence D2AW',
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