import React from "react";
import { PasswordAnalysis } from "../types";

interface StrengthDisplayProps {
  analysis: PasswordAnalysis;
}

const StrengthDisplay: React.FC<StrengthDisplayProps> = ({ analysis }) => {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <div className="flex justify-between items-end mb-3">
          <span className="text-sm font-bold text-slate-500 uppercase">Complexity Score</span>
          <span className="text-2xl font-bold text-slate-800">{analysis.level}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ease-out ${analysis.color}`}
            style={{ width: analysis.width }}
          ></div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center gap-6">
        <div className="p-4 bg-blue-50 rounded-full text-blue-600">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <div className="text-center md:text-left">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
            Time to Crack (Brute Force)
          </h4>
          <p className="text-4xl font-black text-slate-800">{analysis.crackTimeDisplay}</p>
        </div>
      </div>
    </div>
  );
};

export default StrengthDisplay;
