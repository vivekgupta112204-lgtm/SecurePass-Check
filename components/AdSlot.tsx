import React from 'react';

interface AdSlotProps {
  label?: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ label = "Advertisement", className = "" }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center my-6 ${className}`} aria-hidden="true">
      <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-2">{label}</span>
      
      {/* 
         AdSense Code Container
         Replace the inner div with your <ins> tag from Google AdSense.
         Example:
         <ins className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="XXXXXXXXXX"
              data-ad-format="auto"
              data-full-width-responsive="true"></ins>
      */}
      <div className="w-full h-24 md:h-32 bg-slate-100 border border-slate-200 border-dashed rounded-lg flex items-center justify-center">
         <span className="text-slate-400 text-sm font-medium">Google AdSense Space</span>
      </div>
    </div>
  );
};