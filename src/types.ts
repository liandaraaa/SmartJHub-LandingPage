export interface AnalysisResult {
  grade: string;
  confidence: string;
  volume: string;
  colorDescription: string;
  points: string;
  equivalentRupiah: string;
  soapFormula: string;
}

export interface SummaryResult {
  hook: string;
  highlights: string[];
  callToAction: string;
}
