export type Role = 'admin' | 'student' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  ufr?: string;
}

export type ResourceType = 'COURS' | 'TD' | 'TP' | 'EXAMEN';

export interface CourseResource {
  id: string;
  title: string;
  type: ResourceType;
  ufr: string; // e.g., 'SATIC'
  department: string; // e.g., 'TIC'
  level: string; // e.g., 'L1', 'M2'
  subject: string;
  author: string;
  dateAdded: string;
  downloads: number;
  size: string;
}

export interface Department {
  name: string;
  code: string;
  description: string;
}

export interface Program {
  name: string;
  level: 'Licence' | 'Master';
  description: string;
}

export interface UFRData {
  id: string;
  name: string;
  fullName: string;
  description: string;
  departments: Department[];
  programs: Program[];
  color: string;
  iconName: string;
}

export interface SiteContent {
  homeWelcome: string;
  amicaleMission: string;
  amicaleVision: string;
  ufrDescriptions: Record<string, string>;
}