export enum AppStep {
  INPUT = 'INPUT',
  OUTLINE = 'OUTLINE',
  GENERATING = 'GENERATING',
  FINISHED = 'FINISHED'
}

export enum SectionStatus {
  PENDING = 'PENDING',
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface Section {
  id: string;
  title: string;
  description: string; // The "sketch" or prompt for this specific section
  content: string; // The generated LaTeX
  status: SectionStatus;
}

export type PaperLength = 'Short Letter (2-4 pages)' | 'Standard Article (8-12 pages)' | 'Extended Report (20-30 pages)' | 'Dissertation/Book (40+ pages)';

export interface PaperConfig {
  title: string;
  tone: 'Formal Academic' | 'Casual/Blog' | 'Technical Report';
  template: 'Standard Article' | 'IEEE' | 'ACM' | 'Minimalist';
  targetLength: PaperLength;
  rawSketch: string;
}

export interface GlobalState {
  step: AppStep;
  config: PaperConfig;
  sections: Section[];
  isGeneratingOutline: boolean;
}