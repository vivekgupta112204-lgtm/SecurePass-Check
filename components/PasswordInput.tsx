import React, { useState } from 'react';
import { Eye, EyeOff, Lock, RefreshCw } from 'lucide-react';

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const generateRandom = () => {
     const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
     let pass = "";
     for(let i=0; i<16; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
     }
     onChange(pass);
  };

  return (
    <div className="w-full relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Lock className={`h-6 w-6 transition-colors duration-300 ${value ? 'text-blue-600' : 'text-slate-400'}`} />
      </div>
      
      <input
        type={isVisible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type a password to check..."
        className="w-full pl-12 pr-24 py-4 text-xl md:text-2xl font-medium text-slate-800 bg-white border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 shadow-sm"
        autoComplete="off"
        data-lpignore="true" // Hint to LastPass etc to ignore
      />

      <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-2">
         {value.length === 0 && (
            <button
                onClick={generateRandom}
                className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                title="Generate Random Password"
                aria-label="Generate Random Password"
            >
                <RefreshCw className="h-5 w-5" />
            </button>
         )}
        <button
          onClick={toggleVisibility}
          className="p-2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 rounded-lg"
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
};