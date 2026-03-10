
export enum AppStep {
  INPUT = 'INPUT',
  OUTLINE = 'OUTLINE',
  GENERATING = 'GENERATING',
  FINISHED = 'FINISHED'
}

export enum Status {
  PENDING = 'PENDING',
  GENERATING = 'GENERATING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface Section {
  id: string;
  title: string;
  description: string;
  content: string;
  status: Status;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  status: Status;
}

export interface Journey {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  status: Status;
}

export interface CurriculumConfig {
  title: string;
  targetAudience: string; // e.g., "Top Olympiad level"
  tone: string;
  discipline: string;
  rhetoricalMode: string;
  rawVision: string;
}

export interface ProjectState {
  config: CurriculumConfig;
  journeys: Journey[];
  currentStep: AppStep;
  lastUpdated: number;
}
