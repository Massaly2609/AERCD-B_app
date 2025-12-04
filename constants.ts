
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
      { name: 'Licence Physique Numérique', level: 'Licence', departmentCode: 'PHYS', description: 'Modélisation et simulation numérique' },
      { name: 'Licence Physique-Chimie (PC)', level: 'Licence', departmentCode: 'PHYS', description: 'Sciences physiques fondamentales' },
      { name: 'Master MIER', level: 'Master', departmentCode: 'PHYS', description: 'Master Interuniversitaire en Energies Renouvelables' },
      { name: 'Master Physique Médicale', level: 'Master', departmentCode: 'PHYS', description: 'Imagerie et radiothérapie' },

      // CHIM
      { name: 'Licence Chimie Appliquée (CA)', level: 'Licence', departmentCode: 'CHIM', description: 'Processus de fabrication et activités de laboratoire.' },
      { name: 'Master Chimie Inorganique', level: 'Master', departmentCode: 'CHIM', description: 'Matériaux et catalyse' },
      { name: 'Master Chimie Organique', level: 'Master', departmentCode: 'CHIM', description: 'Synthèse et pharmacochimie' },
      { name: 'Master Chimie Physique', level: 'Master', departmentCode: 'CHIM', description: 'Thermodynamique et cinétique' },

      // TIC
      { name: 'Licence SRT', level: 'Licence', departmentCode: 'TIC', description: 'Systèmes Réseaux et Télécommunications' },
      { name: 'Licence D2A', level: 'Licence', departmentCode: 'TIC', description: 'Développement et Administration d\'Applications' },
      { name: 'Licence LPCM', level: 'Licence', departmentCode: 'TIC', description: 'Licence Professionnelle en Création Multimédia' },
      { name: 'Master Systèmes d\'Information', level: 'Master', departmentCode: 'TIC', description: 'Gouvernance et audit SI' },
      { name: 'Master Systèmes et Réseaux', level: 'Master', departmentCode: 'TIC', description: 'Infrastructures et sécurité' },
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
    context: `Au Sénégal et dans la sous-région, l’Université de Bambey est la seule à développer une formation de niveau Licence ou Master professionnel en Santé Communautaire. L’UFR est animée par une équipe pluridisciplinaire constituée de médecins, de sociologues, de spécialistes de la communication, de pharmaciens, d’informaticiens, dans une dynamique interdisciplinaire. La filière est le socle de l’UFR Santé et Développement Durable (SDD).

Les étudiants de Santé Communautaire reçoivent une formation de base en sciences fondamentales et biomédicales, mais aussi en sciences humaines, sociales et environnementales, en soins infirmiers. Ils apprennent alors à connaître les pathologies les plus fréquentes dans les communautés de base : santé de la reproduction, santé mère-enfant, maladies transmissibles et non transmissibles, hygiène, assainissement, alimentation, nutrition, etc.

Les 2ème et 3ème année sont utilisées par les enseignants pour installer en eux un ensemble de compétences dans les domaines variées du diagnostic et de la participation communautaire, des stratégies d’intervention, de la planification et du management des structures, programmes et projets de santé, de la pharmacie communautaire et de toutes les techniques de communication leur permettant de faire basculer les communautés ciblées vers la prise en charge de leur bien-être.

Dès sa création, l’Institution a affiché sa volonté et l’ambition de former des étudiants éduqués aux valeurs universitaires et citoyennes authentiques, engagés à servir le pays. C’est la raison pour laquelle l’offre de formation s’est voulue de qualité et utile à la société.

A cette étape de son évolution, les résultats enregistrés présagent de bonnes perspectives, car aujourd’hui, l’on peut se réjouir que les étudiants, encore en formation, aient pu réaliser plusieurs actions d’intérêt général.`,
    directorsWord: {
        author: "Dr Abdoulaye FAYE",
        role: "Directeur de l'UFR SDD",
        content: `L’Unité de Formation et de Recherche Santé et Développement Durable (UFR SDD), dont le contenu de la formation est destiné aux bacheliers toutes séries confondues, vient répondre à un besoin du système éducatif sénégalais.

L’UFR/SDD, pour le moment, est composée de trois départements : Santé communautaire (niveau Licence et Master), développement durable (niveau Licence) et Médecine. Les enseignements se déroulent sur deux sites : Bambey et Diourbel.

L’objectif de la formation en santé communautaire est de mettre sur le marché du travail des professionnels capables, par une démarche participative, d’identifier un problème de santé prioritaire dans une communauté, d’y apporter des solutions idoines et d’évaluer les interventions réalisées.

Ainsi les formations déroulées au sien de l’UFR SDD sont toutes professionnalisantes et sont en adéquation avec la politique de l’Etat de faire de l’enseignement supérieur et de la recherche un levier du développement socio-économique et culturel de notre pays.

En somme l’UFR SDD est originale et innovante puisqu’elle place le bien être de l’homme au cœur de ses préoccupations actuelles et futures.`
    },
    color: 'bg-green-600',
    iconName: 'Leaf',
    departments: [
      { name: 'Santé Communautaire', code: 'SANTE', description: 'Diagnostic et interventions communautaires.' },
      { name: 'Développement Durable', code: 'DD', description: 'Enjeux économiques, sociaux et environnementaux.' },
      { name: 'Médecine', code: 'MED', description: 'Formation de médecins pour la région de Diourbel et au-delà.' },
    ],
    programs: [
      // SANTE
      { name: 'Licence Santé Communautaire', level: 'Licence', departmentCode: 'SANTE', description: 'Formation de base en sciences biomédicales et sociales.' },
      { name: 'Master Nutrition', level: 'Master', departmentCode: 'SANTE', description: 'Spécialisation en nutrition.' },
      { name: 'Master Promotion de la Santé', level: 'Master', departmentCode: 'SANTE', description: 'Stratégies de promotion de la santé.' },
      { name: 'Master Suivi-évaluation', level: 'Master', departmentCode: 'SANTE', description: 'Évaluation de projets de santé.' },
      { name: 'Master Santé Communautaire', level: 'Master', departmentCode: 'SANTE', description: 'Approfondissement en santé publique.' },

      // DD
      { name: 'Licence Agriculture et Développement Durable', level: 'Licence', departmentCode: 'DD', description: 'Agriculture durable.' },
      { name: 'Licence Environnement', level: 'Licence', departmentCode: 'DD', description: 'Gestion de l\'environnement.' },
      { name: 'Licence RSE / Santé', level: 'Licence', departmentCode: 'DD', description: 'Responsabilité Sociétale des Entreprises.' },

      // MED
      { name: 'Doctorat en Médecine', level: 'Licence', departmentCode: 'MED', description: 'Formation de médecins généralistes.' },
    ],
    staff: [
        "Dr Abdoulaye FAYE",
        "Dr Papa Gallo SOW",
        "Dr Fatou Ndiaye Oumar SY",
        "Dr Anta AGNE-DJIGO",
        "Dr Coura KANE",
        "Dr Aladji Madior Diop"
    ]
  },
  ECOMIJ: {
    id: 'ECOMIJ',
    name: 'UFR ECOMIJ',
    fullName: 'Économie, Management et Ingénierie Juridique',
    description: 'Former les cadres de demain en gestion et droit.',
    context: `L’UFR est tournée essentiellement vers l’entreprise et le développement. Elle est animée par des enseignants-chercheurs (économistes, gestionnaires, mathématiciens et juristes) et fait appel à des professionnels de l’Informatique, de la Communication, de l’agro-business, du management de la qualité, de la fiscalité, etc.
    
    La formation est axée sur les outils de gestion, les techniques quantitatives, l’analyse économique, l’environnement juridique entre autres. En 2010 l’UFR a formé 31 diplômés répartis en 2 licences (Management de projets et Management des organisations). Pour l’année 2011, deux licences professionnelles sont offertes (Analyse économique et Finance Comptabilité) et un Master en Finance Comptabilité.
    
    L’UFR offre des formations essentiellement professionnelles dans les domaines de l’économie, de la gestion et du droit. Les stages et les mémoires sont des points forts de la formation. Les séjours en entreprises dans les administrations publiques ou les ONG, mais aussi la rencontre de divers professionnels et spécialistes aident nos diplômés à s’insérer plus facilement dans le marché de l’emploi.`,
    directorsWord: {
        author: "Serigne Ahmadou GAYE",
        role: "Directeur de l’UFR Ecomij",
        content: `Depuis son ouverture en 2009, l’UFR Ecomij s’est orientée résolument vers la formation adaptée aux besoins socioéconomiques et à l’innovation, devenue aujourd’hui, une exigence de l’Etat dans les politiques publiques.
        
        C’est une institution avec un système culturel, une symbolique et un imaginaire qui modulent les comportements des acteurs qui la composent dans la quête d’un idéal reposant sur l’excellence et la vertu. C’est dans ce sillage, qu’elle offre des formations diversifiées et centrées sur des secteurs porteurs dans ses trois départements de Management, d’Economie et d’Ingénierie juridique.
        
        La singularité de nos enseignements est marquée par la dimension pratique qui donne à l’étudiant des aptitudes certaines en vue de la facilitation de son insertion dans le tissu professionnel. A côté de ces missions d’enseignement et de formation, l’UFR veille à la qualité et à l’innovation.
        
        L’UFR Ecomij dispose en outre, des équipes de recherches dynamiques dont les missions principales sont la stimulation de la recherche à travers des thématiques intéressantes, l’encadrement des doctorants et des jeunes chercheurs et l’animation scientifique.`
    },
    color: 'bg-amber-600',
    iconName: 'Scale',
    departments: [
      { name: 'Économie', code: 'ECO', description: 'Analyse économique, gestion de projets, finance.' },
      { name: 'Management', code: 'MGMT', description: 'Organisations publiques, privées et audit.' },
      { name: 'Ingénierie Juridique', code: 'DROIT', description: 'Droit privé, public, cyber-sécurité et foncier.' },
    ],
    programs: [
      // ECO
      { name: 'Licence Economie Appliquée', level: 'Licence', departmentCode: 'ECO', description: 'Analyse et prévisions économiques.' },
      { name: 'Licence Finance Comptabilité', level: 'Licence', departmentCode: 'ECO', description: 'Gestion financière et comptable.' },
      { name: 'Master Economie et Gouvernance des Territoires', level: 'Master', departmentCode: 'ECO', description: 'Développement local.' },
      { name: 'Master Economie du Développement', level: 'Master', departmentCode: 'ECO', description: 'Politiques de développement.' },
      { name: 'Master Monnaie Banque Finance', level: 'Master', departmentCode: 'ECO', description: 'Secteur bancaire et financier.' },
      
      // MGMT
      { name: 'Licence Management Responsable des Organisations', level: 'Licence', departmentCode: 'MGMT', description: 'Gestion d\'organisations diverses.' },
      { name: 'Master Finance d’Entreprise et Ingénierie Financière', level: 'Master', departmentCode: 'MGMT', description: 'FEIF' },
      { name: 'Master Comptabilité Contrôle Audit', level: 'Master', departmentCode: 'MGMT', description: 'CCA' },
      { name: 'Master Management des Organisations Territoriales', level: 'Master', departmentCode: 'MGMT', description: 'MOT' },

      // DROIT
      { name: 'Licence Administration Publique', level: 'Licence', departmentCode: 'DROIT', description: 'Cadres des institutions publiques.' },
      { name: 'Licence Juriste d’Affaires', level: 'Licence', departmentCode: 'DROIT', description: 'Juristes d\'entreprises et banques.' },
      { name: 'Licence Commerce Electronique et Cyber-sécurité', level: 'Licence', departmentCode: 'DROIT', description: 'Droit du numérique.' },
      { name: 'Licence Management Juridique Environnemental et Foncier', level: 'Licence', departmentCode: 'DROIT', description: 'Environnement et foncier.' },
      { name: 'Master Droit des Administrations Publiques, du Foncier et de l’Environnement', level: 'Master', departmentCode: 'DROIT', description: 'DAPFE' },
      { name: 'Master Droit des Affaires, Fiscal et Cyber-droit', level: 'Master', departmentCode: 'DROIT', description: 'DAFCD' },
      { name: 'Master Fiscalité', level: 'Master', departmentCode: 'DROIT', description: 'Expertise fiscale.' },
    ],
    staff: [
        "Dr Angélique NGAHA BAH",
        "Dr Joseph Gniaka KAMA",
        "Dr Madické Mbodj NDIAYE",
        "Dr Omar SENE"
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
    filiere: 'Licence D2A',
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
