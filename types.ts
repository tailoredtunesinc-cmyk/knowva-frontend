export interface NavItem {
  label: string;
  href: string;
}

export interface AnalysisMetrics {
  sentimentScore: number;
  intentClarity: number;
  conversionProbability: number;
  keyTopics: string[];
  suggestedAction: string;
}

export enum AnalysisState {
  IDLE = 'IDLE',
  RECORDING = 'RECORDING',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR'
}

export interface DemoResponse {
  analysis: string; // The raw text summary
  metrics: AnalysisMetrics;
}