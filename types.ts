export enum DiveLevel {
  INTEREST = 'INTEREST',
  OPEN_WATER = 'OPEN_WATER',
  ADVANCED = 'ADVANCED',
  RESCUE = 'RESCUE',
  DIVEMASTER = 'DIVEMASTER',
  INSTRUCTOR = 'INSTRUCTOR'
}

export interface RoadmapStep {
  id: string;
  level: DiveLevel;
  title: string;
  description: string;
  image: string;
  topics: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContent {
  title: string;
  introduction: string;
  coreContent: string; // Markdown supported
  safetyTip: string;
  quiz: QuizQuestion[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface DiveLogEntry {
  id: string;
  date: string;
  location: string;
  depth: number; // in meters
  duration: number; // in minutes
  notes: string;
  timestamp: number;
}