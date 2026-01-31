import { PasswordAnalysis } from "../types";

export const formatTime = (seconds: number): string => {
  if (seconds < 1e-6) return "Instantly";
  if (seconds < 1) return "Less than a second";
  if (seconds < 60) return Math.round(seconds) + " seconds";
  const minutes = seconds / 60;
  if (minutes < 60) return Math.round(minutes) + " minutes";
  const hours = minutes / 60;
  if (hours < 24) return Math.round(hours) + " hours";
  const days = hours / 24;
  if (days < 30) return Math.round(days) + " days";
  const months = days / 30;
  if (months < 12) return Math.round(months) + " months";
  const years = days / 365;
  if (years < 1000) return Math.round(years) + " years";
  if (years < 1000000) return Math.round(years / 1000) + "k years";
  if (years < 1000000000) return Math.round(years / 1000000) + "m years";
  return "Billions of years";
};

export const analyzePassword = (password: string): PasswordAnalysis => {
  if (!password) {
    return {
      score: 0,
      level: "Very Weak",
      color: "bg-red-500",
      width: "5%",
      crackTimeDisplay: "0 seconds",
      tips: [],
    };
  }

  let pool = 0;
  if (/[a-z]/.test(password)) pool += 26;
  if (/[A-Z]/.test(password)) pool += 26;
  if (/[0-9]/.test(password)) pool += 10;
  if (/[^A-Za-z0-9]/.test(password)) pool += 33;
  if (pool === 0) pool = 10;

  const combinations = Math.pow(pool, password.length);
  const guessesPerSecond = 1000000000;
  const seconds = combinations / guessesPerSecond;

  let score = 0;
  if (password.length > 8) score += 20;
  if (password.length > 12) score += 20;
  if (pool >= 52) score += 20;
  if (pool >= 62) score += 20;
  if (pool >= 70) score += 20;
  if (/(.)\1{2,}/.test(password)) score -= 20;

  let level = "Very Weak";
  let color = "bg-red-500";
  let width = "10%";

  if (score >= 90) {
    level = "Very Strong";
    color = "bg-green-600";
    width = "100%";
  } else if (score >= 70) {
    level = "Strong";
    color = "bg-lime-500";
    width = "75%";
  } else if (score >= 50) {
    level = "Medium";
    color = "bg-yellow-400";
    width = "50%";
  } else if (score >= 30) {
    level = "Weak";
    color = "bg-orange-500";
    width = "25%";
  }

  const tips: string[] = [];
  if (password.length < 12) tips.push("Add more characters (aim for 12+).");
  if (!/[A-Z]/.test(password)) tips.push("Use uppercase letters.");
  if (!/[0-9]/.test(password)) tips.push("Include numbers.");
  if (!/[^A-Za-z0-9]/.test(password)) tips.push("Add special symbols.");

  return {
    score,
    level,
    color,
    width,
    crackTimeDisplay: formatTime(seconds),
    tips,
  };
};
