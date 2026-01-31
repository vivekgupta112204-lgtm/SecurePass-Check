import React from 'react';
import { ShieldCheck, WifiOff } from 'lucide-react';

export const PrivacyBadge: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 mt-12 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
            <ShieldCheck className="h-8 w-8 text-green-400" />
            100% Private & Secure
          </h2>
          <p className="text-slate-300 max-w-xl">
            This tool runs entirely in your browser. Your password is never sent to any server, 
            so it never leaves your device. You can even disconnect the internet and it will still work.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-full border border-slate-700">
            <WifiOff className="h-5 w-5 text-slate-400" />
            <span className="text-sm font-medium text-slate-300">Works Offline</span>
        </div>
      </div>
    </div>
  );
};