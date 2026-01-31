import { StrengthLevel, PasswordAnalysis } from '../types';

const COMMON_PASSWORDS = new Set([
  '123456', 'password', '12345678', 'qwerty', '123456789', '12345', '111111', '123123', 'admin', 'welcome',
  'google', 'unknown', 'password123', 'letmeout', 'dragon', 'baseball', 'football', 'sunshine', 'princess'
]);

const calculateCrackTime = (password: string, isCommon: boolean): string => {
    if (!password) return "0 seconds";
    if (isCommon) return "Instantly";

    // 1. Determine Pool Size
    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^A-Za-z0-9]/.test(password)) poolSize += 33;

    // Default to a small pool if nothing matched (unlikely)
    if (poolSize === 0) poolSize = 26; 

    // 2. Calculate Combinations: Pool^Length
    const combinations = Math.pow(poolSize, password.length);

    // 3. Assume Guesses Per Second (10 Billion / sec - Fast GPU Offline Attack)
    const guessesPerSecond = 10_000_000_000; 

    const seconds = combinations / guessesPerSecond;

    // 4. Format Time
    if (seconds < 1) return "Instantly";
    if (seconds < 60) return "Few seconds";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months`;
    if (seconds < 3153600000) return `${Math.floor(seconds / 31536000)} years`;
    if (seconds < 315360000000) return "Centuries";
    
    return "Millions of years";
};

export const analyzePassword = (password: string): PasswordAnalysis => {
  if (!password) {
    return {
      score: 0,
      level: StrengthLevel.VERY_WEAK,
      feedback: [],
      attributes: { length: 0, variety: 0, complexity: 0, uniqueness: 0 },
      isCommon: false,
      crackTimeDisplay: '0 seconds'
    };
  }

  let score = 0;
  const feedback: string[] = [];
  
  // 1. Length Check
  const length = password.length;
  let lengthScore = 0;
  if (length >= 8) lengthScore += 20;
  if (length >= 12) lengthScore += 30; // bonus
  if (length >= 16) lengthScore += 10; // extra bonus
  if (length < 8) feedback.push("Too short. Aim for at least 12 characters.");

  // 2. Variety Check (Character Sets)
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  let varietyCount = 0;
  if (hasLower) varietyCount++;
  if (hasUpper) varietyCount++;
  if (hasNumber) varietyCount++;
  if (hasSpecial) varietyCount++;

  const varietyScore = varietyCount * 25; // Max 100, scaled down later

  if (!hasUpper) feedback.push("Add uppercase letters.");
  if (!hasLower) feedback.push("Add lowercase letters.");
  if (!hasNumber) feedback.push("Add numbers.");
  if (!hasSpecial) feedback.push("Add special characters (e.g., !, @, #).");

  // 3. Complexity/Uniqueness (Repetition & Sequences)
  let complexityScore = 100;
  
  // Check for repeated characters (e.g., 'aaa')
  if (/(.)\1{2,}/.test(password)) {
    complexityScore -= 30;
    feedback.push("Avoid repeating characters like 'aaa'.");
  }

  // Check for sequential numbers (weak heuristic)
  if (/(012|123|234|345|456|567|678|789)/.test(password)) {
    complexityScore -= 30;
    feedback.push("Avoid number sequences like '123'.");
  }
  
  // Common password check
  const isCommon = COMMON_PASSWORDS.has(password.toLowerCase());
  if (isCommon) {
    return {
        score: 5,
        level: StrengthLevel.VERY_WEAK,
        feedback: ["This is a very common password. Change it immediately."],
        attributes: { length: 10, variety: 10, complexity: 0, uniqueness: 0 },
        isCommon: true,
        crackTimeDisplay: "Instantly"
    };
  }

  // Calculate Final Score
  // Weighted: Length (40%), Variety (40%), Complexity (20%)
  score = (Math.min(lengthScore, 60) * 0.5) + (varietyScore * 0.3) + (Math.max(complexityScore, 0) * 0.2);

  // Bonus for length + variety combo
  if (length > 12 && varietyCount >= 3) score += 10;

  // Cap at 100
  score = Math.min(100, Math.round(score));

  // Determine Level
  let level = StrengthLevel.VERY_WEAK;
  if (score >= 90) level = StrengthLevel.VERY_STRONG;
  else if (score >= 70) level = StrengthLevel.STRONG;
  else if (score >= 50) level = StrengthLevel.MEDIUM;
  else if (score >= 25) level = StrengthLevel.WEAK;

  const crackTimeDisplay = calculateCrackTime(password, isCommon);

  return {
    score,
    level,
    feedback,
    attributes: {
      length: Math.min(100, (length / 16) * 100),
      variety: varietyScore,
      complexity: complexityScore,
      uniqueness: isCommon ? 0 : 90 // simplified for local check
    },
    isCommon,
    crackTimeDisplay
  };
};

export const getStrengthColor = (level: StrengthLevel): string => {
  switch (level) {
    case StrengthLevel.VERY_WEAK: return '#ef4444'; // red-500
    case StrengthLevel.WEAK: return '#f97316'; // orange-500
    case StrengthLevel.MEDIUM: return '#eab308'; // yellow-500
    case StrengthLevel.STRONG: return '#84cc16'; // lime-500
    case StrengthLevel.VERY_STRONG: return '#22c55e'; // green-500
    default: return '#cbd5e1'; // slate-300
  }
};