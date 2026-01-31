import React, { useState, useEffect } from 'react';
import { PasswordInput } from './components/PasswordInput';
import { StrengthDisplay } from './components/StrengthDisplay';
import { ActionTips } from './components/ActionTips';
import { PrivacyBadge } from './components/PrivacyBadge';
import { AdSlot } from './components/AdSlot';
import { analyzePassword } from './utils/passwordUtils';
import { PasswordAnalysis } from './types';
import { Shield, Info, Clock, Lightbulb, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState<PasswordAnalysis>(analyzePassword(''));

  // Debounce analysis slightly for performance on slow devices, though logic is fast.
  useEffect(() => {
    const result = analyzePassword(password);
    setAnalysis(result);
  }, [password]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">SecurePass Check</h1>
          </div>
          <nav className="hidden sm:block">
            <ul className="flex gap-6 text-sm font-medium text-slate-600">
              <li className="hover:text-blue-600 cursor-pointer">About</li>
              <li className="hover:text-blue-600 cursor-pointer">Privacy</li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Zone 1: Top Banner (High Visibility, Low Risk) */}
      <div className="max-w-4xl mx-auto px-4">
        <AdSlot label="Sponsored" />
      </div>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Check Your Password <br className="hidden md:block" />
            <span className="text-blue-600">Strength Instantly</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-6">
            Find out how strong your password is, how long it would take to crack, and how to make it safer.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm"><Shield className="h-4 w-4 text-green-500" /> No signup</span>
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm"><Shield className="h-4 w-4 text-green-500" /> No storage</span>
            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm"><Shield className="h-4 w-4 text-green-500" /> No tracking</span>
          </div>
        </div>

        {/* Main Interaction Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-white max-w-3xl mx-auto relative z-10">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">
              Enter Password
            </label>
            <PasswordInput value={password} onChange={setPassword} />
          </div>

          <div className={`transition-all duration-500 ease-in-out ${password ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4'}`}>
             <StrengthDisplay analysis={analysis} />
             <ActionTips analysis={analysis} />
          </div>
        </div>

        {/* Zone 2: After Tool (Recommended - Safe Zone) */}
        <div className="max-w-3xl mx-auto mt-8">
            <AdSlot label="Advertisement" />
        </div>

        {/* Privacy Assurance */}
        <div className="max-w-3xl mx-auto">
          <PrivacyBadge />
        </div>

        {/* Educational Content */}
        <div className="space-y-12 mt-16 border-t border-slate-200 pt-16">
          
          {/* Section 1: Features & Explanation */}
          <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                 <Info className="h-6 w-6" />
               </div>
               <h3 className="font-bold text-xl text-slate-900 mb-3">What Does This Tool Do?</h3>
               <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                 Our Password Strength & Safety Checker analyzes your password locally and tells you:
               </p>
               <ul className="space-y-3 text-slate-700 text-sm font-medium">
                 <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500"/>Password strength level</li>
                 <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500"/>Estimated time to crack</li>
                 <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-blue-500"/>Common password risks</li>
               </ul>
             </div>

             <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm">
               <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
                 <Clock className="h-6 w-6" />
               </div>
               <h3 className="font-bold text-xl text-slate-900 mb-3">What Is “Time to Crack”?</h3>
               <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                 It's an estimate of how long a hacker might need to guess your password using automated brute-force attacks (trying billions of combinations per second).
               </p>
               <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 font-mono space-y-2 border border-slate-100">
                 <div className="flex justify-between items-center"><span>123456</span> <span className="text-red-500 font-bold text-xs bg-red-100 px-2 py-1 rounded">seconds ❌</span></div>
                 <div className="flex justify-between items-center"><span>P@9x!Q2Lm#7</span> <span className="text-green-600 font-bold text-xs bg-green-100 px-2 py-1 rounded">billions of years 🔐</span></div>
               </div>
             </div>
          </div>

          {/* Zone 3: In-Content (Between Features and Importance) */}
          <AdSlot label="Advertisement" />

          {/* Section 2: Importance */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 text-center md:text-left relative overflow-hidden">
             {/* Decorative blob */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20 -mr-16 -mt-16 pointer-events-none"></div>
             
             <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                   <h3 className="text-2xl md:text-3xl font-bold mb-4">Why Password Security Matters</h3>
                   <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                     Cyber attacks are increasing worldwide. Weak passwords are the #1 cause of hacked accounts.
                     One leaked password can expose your email, banking, and personal data.
                   </p>
                </div>
                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                   <h4 className="font-bold text-lg mb-4 text-blue-200">A strong password protects:</h4>
                   <ul className="grid grid-cols-2 gap-4 text-slate-200">
                      <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-green-400" /> Email</li>
                      <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-green-400" /> Social Media</li>
                      <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-green-400" /> Banking</li>
                      <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-green-400" /> Personal Data</li>
                   </ul>
                </div>
             </div>
          </div>

          {/* Section 3: Tips & FAQ */}
          <div className="grid md:grid-cols-12 gap-8">
             {/* Tips */}
             <div className="md:col-span-7 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-xl text-slate-900 mb-6 flex items-center gap-2">
                   <Lightbulb className="h-6 w-6 text-yellow-500" />
                   How to Create a Strong Password
                </h3>
                <div className="space-y-4">
                   {[
                     "Use 12+ characters",
                     "Mix uppercase, lowercase, numbers & symbols",
                     "Avoid names, birthdays & common words",
                     "Never reuse passwords",
                     "Use a password manager if possible"
                   ].map((tip, i) => (
                     <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg text-slate-700 transition-colors hover:bg-slate-100">
                       <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                       <span className="font-medium text-sm">{tip}</span>
                     </div>
                   ))}
                </div>
             </div>
             
             {/* FAQ */}
             <div className="md:col-span-5 space-y-4">
                <h3 className="font-bold text-xl text-slate-900 mb-2 px-2">FAQ</h3>
                {[
                  { q: "Is this password checker safe?", a: "Yes. Everything runs locally in your browser. Nothing is stored or sent." },
                  { q: "Can hackers see my password?", a: "No. Your password never leaves your device." },
                  { q: "Is this tool free?", a: "Yes, completely free." }
                ].map((item, i) => (
                   <div key={i} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-slate-800 text-sm mb-2">{item.q}</h4>
                      <p className="text-slate-600 text-sm">{item.a}</p>
                   </div>
                ))}
             </div>
          </div>
        </div>
      </main>
      
      <footer className="text-center text-slate-500 text-sm mt-12 pb-12 border-t border-slate-200 pt-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
            <div className="mb-6 bg-blue-50 inline-block px-4 py-2 rounded-full border border-blue-100">
                 <p className="flex items-center gap-2 text-blue-800 font-medium">
                    <Shield className="h-4 w-4" />
                    We never store or send your password. Ads are shown only to support this free tool.
                 </p>
            </div>
            <p>&copy; {new Date().getFullYear()} SecurePass Check. Built with privacy in mind.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;