import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { PasswordAnalysis, StrengthLevel } from '../types';
import { getStrengthColor } from '../utils/passwordUtils';
import { ShieldCheck, ShieldAlert, ShieldX, Clock, Info } from 'lucide-react';

interface StrengthDisplayProps {
  analysis: PasswordAnalysis;
}

export const StrengthDisplay: React.FC<StrengthDisplayProps> = ({ analysis }) => {
  const { score, level, attributes, crackTimeDisplay } = analysis;
  const color = getStrengthColor(level);

  const radarData = [
    { subject: 'Length', A: attributes.length, fullMark: 100 },
    { subject: 'Variety', A: attributes.variety, fullMark: 100 },
    { subject: 'Complexity', A: attributes.complexity, fullMark: 100 },
    { subject: 'Uniqueness', A: attributes.uniqueness, fullMark: 100 },
  ];

  const getIcon = () => {
    if (level === StrengthLevel.VERY_WEAK || level === StrengthLevel.WEAK) return <ShieldX className="h-12 w-12 text-red-500" />;
    if (level === StrengthLevel.MEDIUM) return <ShieldAlert className="h-12 w-12 text-yellow-500" />;
    return <ShieldCheck className="h-12 w-12 text-green-500" />;
  };

  const getTimeColorClass = () => {
     if (level === StrengthLevel.VERY_WEAK || level === StrengthLevel.WEAK) return "text-red-600 bg-red-50";
     if (level === StrengthLevel.MEDIUM) return "text-yellow-600 bg-yellow-50";
     return "text-green-600 bg-green-50";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Primary Score Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden min-h-[320px]">
        <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Security Score</h3>
            <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-50 rounded-full">
                    {getIcon()}
                </div>
                <div>
                    <div className="text-4xl font-bold text-slate-800">{score}<span className="text-xl text-slate-400">/100</span></div>
                    <div className="text-lg font-medium" style={{ color }}>{level}</div>
                </div>
            </div>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-4 mb-6 overflow-hidden">
          <div 
            className="h-full transition-width duration-700 ease-out rounded-full"
            style={{ width: `${score}%`, backgroundColor: color }}
          />
        </div>

        {/* Time to Crack Section */}
        <div className="mt-auto pt-4 border-t border-slate-100">
             <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg mt-1 ${getTimeColorClass()}`}>
                    <Clock className="h-5 w-5" />
                </div>
                <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                        Time to Crack <span className="group relative cursor-help"><Info className="h-3 w-3 text-slate-400" />
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center shadow-lg">
                                Estimated time for a computer to brute-force this password.
                            </span>
                        </span>
                    </h4>
                    <p className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">{crackTimeDisplay}</p>
                </div>
             </div>
        </div>
      </div>

      {/* Visual Analysis (Radar) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden min-h-[320px]">
        <h3 className="absolute top-6 left-6 text-sm font-semibold text-slate-500 uppercase tracking-wider z-10">Analysis Map</h3>
        {/* Explicit height wrapper for Recharts to prevent width(-1) errors */}
        <div className="w-full h-[250px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                name="Password Strength"
                dataKey="A"
                stroke={color}
                fill={color}
                fillOpacity={0.4}
                />
            </RadarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};