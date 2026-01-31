export enum StrengthLevel {
  VERY_WEAK = 'Very Weak',
  WEAK = 'Weak',
  MEDIUM = 'Medium',
  STRONG = 'Strong',
  VERY_STRONG = 'Very Strong',
}

export interface PasswordAnalysis {
  score: number; // 0 to 100
  level: StrengthLevel;
  feedback: string[];
  attributes: {
    length: number;
    variety: number;
    complexity: number;
    uniqueness: number;
  };
  isCommon: boolean;
  crackTimeDisplay: string;
}

export interface RadarDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}