import React from 'react';
import { Lightbulb, CheckCircle2, AlertTriangle } from 'lucide-react';
import { PasswordAnalysis } from '../types';

interface ActionTipsProps {
  analysis: PasswordAnalysis;
}

export const ActionTips: React.FC<ActionTipsProps> = ({ analysis }) => {
  const { feedback, level } = analysis;

  if (!analysis.score && analysis.feedback.length === 0) {
      return (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mt-6">
            <div className="flex items-start gap-4">
                <Lightbulb className="h-6 w-6 text-blue-500 shrink-0 mt-1" />
                <div>
                    <h3 className="font-semibold text-blue-900 mb-1">Pro Tip</h3>
                    <p className="text-blue-800/80">
                        A strong password uses a mix of letters, numbers, and symbols. Try using a memorable sentence or passphrase like "Coffee-Makes-Me-Fast-99!".
                    </p>
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        {feedback.length > 0 ? 'Recommendations' : 'Good Job!'}
      </h3>
      
      <div className="grid gap-3">
        {feedback.length === 0 ? (
           <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-lg text-green-800">
             <CheckCircle2 className="h-5 w-5 text-green-600" />
             <span className="font-medium">Your password looks great! No immediate issues found.</span>
           </div>
        ) : (
            feedback.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-100 rounded-lg text-orange-900 animate-fadeIn">
                    <AlertTriangle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                </div>
            ))
        )}
      </div>
    </div>
  );
};