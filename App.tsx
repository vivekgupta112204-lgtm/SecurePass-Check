import React, { useState, useEffect } from "react";
import PasswordInput from "./components/PasswordInput";
import StrengthDisplay from "./components/StrengthDisplay";
import ActionTips from "./components/ActionTips";
import PrivacyBadge from "./components/PrivacyBadge";
import AdSlot from "./components/AdSlot";
import { analyzePassword } from "./utils/passwordUtils";
import { PasswordAnalysis } from "./types";

const App: React.FC = () => {
  const [password, setPassword] = useState("");
  const [analysis, setAnalysis] = useState<PasswordAnalysis | null>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // Real-time analysis when password changes, if user has started analyzing
  useEffect(() => {
    if (password || hasAnalyzed) {
        setAnalysis(analyzePassword(password));
    }
  }, [password, hasAnalyzed]);

  const handleAnalyze = () => {
    setHasAnalyzed(true);
    setAnalysis(analyzePassword(password));
  };

  return (
    <>
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="index.html" className="flex items-center gap-2 font-bold text-xl text-slate-900 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-700 transition-colors">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
            </div>
            <span>SecurePass Check</span>
          </a>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="index.html" className="text-blue-600">
              Tool
            </a>
            <a href="about.html" className="hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#blog" className="hover:text-blue-600 transition-colors">
              Blog
            </a>
            <a href="contact.html" className="hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      <div className="flex-grow max-w-5xl mx-auto px-4 py-8 w-full">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Password Strength & <br />
            <span className="text-blue-600">Time to Crack</span> Calculator
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Analyze your password security instantly. 100% private, client-side encryption testing.
          </p>
        </header>

        {/* Tool Section */}
        <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>

          <PasswordInput value={password} onChange={setPassword} onEnter={handleAnalyze} />

          <button
            onClick={handleAnalyze}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/30 mb-8 text-lg"
          >
            Analyze Security
          </button>

          {hasAnalyzed && analysis && (
            <div id="results">
              <StrengthDisplay analysis={analysis} />
              <ActionTips tips={analysis.tips} />
            </div>
          )}

          <PrivacyBadge />
        </section>

        {/* Ad Slot */}
        <AdSlot slot="auto" />

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-3 gap-12 mt-16">
          {/* Left Column: Articles & SEO Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Expanded SEO Home Page Content */}
            <article className="prose prose-slate max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                The Definitive Guide to Password Security (2026 Edition)
              </h2>

              <p>
                Welcome to <strong>SecurePass Check</strong>, the web's most privacy-centric password strength analysis tool.
                In a digital world where data breaches are becoming daily news, securing your digital identity is no longer
                optional—it is a necessity.
              </p>

              <h3>Why Do You Need a Password Checker?</h3>
              <p>
                Most users drastically overestimate the strength of their passwords. You might think replacing "E" with "3"
                (e.g., "P3terPan") makes you clever, but modern cracking algorithms anticipate these common substitutions
                instantly. SecurePass Check helps you visualize exactly how vulnerable these patterns are by calculating
                the mathematical entropy of your password string.
              </p>

              <h3>How the "Time to Crack" is Calculated</h3>
              <p>
                Our tool uses a standard cybersecurity formula based on <strong>Information Entropy</strong> and{" "}
                <strong>Brute Force Velocity</strong>.
              </p>
              <ul>
                <li>
                  <strong>Pool Size:</strong> We analyze if you used lowercase (26), uppercase (26), numbers (10), and
                  symbols (33). The larger the pool, the harder it is to guess.
                </li>
                <li>
                  <strong>Length:</strong> This is the exponential multiplier. A 12-character password is exponentially
                  harder to crack than an 8-character one.
                </li>
                <li>
                  <strong>Attack Speed:</strong> We assume a modern hacker using a high-end consumer GPU cluster can
                  attempt approximately <strong>1 billion guesses per second</strong>.
                </li>
              </ul>

              <h3>The Science of Entropy</h3>
              <p>
                Entropy is measured in "bits." It represents the total number of guesses required to crack a password. For
                example, a password with 10 bits of entropy takes only 2<sup>10</sup> (1,024) guesses. A password with 60
                bits takes 2<sup>60</sup> guesses, which is roughly 1.15 quintillion.
              </p>
              <p>
                When you add a symbol to your password, you aren't just adding one character; you are expanding the
                character set (N) used in the formula E = L × log<sub>2</sub>(N). This is why a short password with
                symbols is often weaker than a long password made of simple words.
              </p>

              <h3>History of Password Security</h3>
              <p>
                In the early days of computing, passwords were often limited to 8 characters due to storage constraints.
                The famous UNIX encryption system only considered the first 8 characters of a password. Today, modern
                hashing algorithms like Argon2 and bcrypt allow for much longer passwords (often up to 128 characters or
                more).
              </p>
              <p>
                However, legacy habits remain. Many users still choose 8-character passwords because that was the standard
                for decades. SecurePass Check aims to break these habits by visually demonstrating how quickly 8 characters
                can be broken by modern hardware (often in minutes).
              </p>

              <h3>Who Is This Tool For?</h3>
              <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-blue-800 mb-1">Students</h4>
                  <p className="text-sm text-blue-700">
                    Protect your university portals, social media, and research data from credential stuffing.
                  </p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <h4 className="font-bold text-emerald-800 mb-1">Small Business Owners</h4>
                  <p className="text-sm text-emerald-700">
                    Ensure your employees aren't using "Company123" as their login, risking your entire client database.
                  </p>
                </div>
              </div>

              <h3>Benefits of SecurePass Check</h3>
              <ul>
                <li>
                  <strong>Zero Data Leaks:</strong> Unlike other tools, we do not have a backend server. Your password is
                  processed by your own browser's JavaScript engine.
                </li>
                <li>
                  <strong>Instant Feedback:</strong> See in real-time how adding a single symbol changes the crack time
                  from "2 days" to "300 years".
                </li>
                <li>
                  <strong>Educational:</strong> We don't just say "Weak"; we explain <em>why</em> and give actionable
                  tips.
                </li>
              </ul>
            </article>

            {/* Blog Hub Section */}
            <div id="blog" className="border-t border-slate-200 pt-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Cybersecurity Academy: Latest Articles</h2>
              <div className="grid gap-6">
                {/* Row 1 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <a
                    href="blog-strong-password.html"
                    className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors shadow-sm"
                  >
                    <h3 className="font-bold text-lg text-slate-900 mb-2">How to Create a Strong Password in 2026</h3>
                    <p className="text-sm text-slate-500">
                      The ultimate guide to creating unbreakable credentials using modern entropy rules.
                    </p>
                  </a>
                  <a
                    href="blog-common-mistakes.html"
                    className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors shadow-sm"
                  >
                    <h3 className="font-bold text-lg text-slate-900 mb-2">5 Common Password Mistakes</h3>
                    <p className="text-sm text-slate-500">
                      Are you guilty of these? Learn what habits put your accounts at risk.
                    </p>
                  </a>
                </div>

                {/* Row 2 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <a
                    href="blog-how-hackers-crack.html"
                    className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors shadow-sm"
                  >
                    <h3 className="font-bold text-lg text-slate-900 mb-2">How Hackers Crack Passwords</h3>
                    <p className="text-sm text-slate-500">
                      A deep dive into Brute Force, Dictionary Attacks, and Rainbow Tables.
                    </p>
                  </a>
                  <a
                    href="blog-management-tips.html"
                    className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors shadow-sm"
                  >
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Password Management Tips</h3>
                    <p className="text-sm text-slate-500">
                      Why you need a password manager and how to set up 2FA correctly.
                    </p>
                  </a>
                </div>

                {/* Row 3 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <a
                    href="blog-are-checkers-safe.html"
                    className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors shadow-sm"
                  >
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Are Online Checkers Safe?</h3>
                    <p className="text-sm text-slate-500">
                      How to distinguish between safe client-side tools and phishing traps.
                    </p>
                  </a>
                  <a
                    href="blog-passphrases.html"
                    className="block bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 transition-colors shadow-sm"
                  >
                    <h3 className="font-bold text-lg text-slate-900 mb-2">Passwords vs. Passphrases</h3>
                    <p className="text-sm text-slate-500">
                      Why length beats complexity and how to remember 20-character codes.
                    </p>
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-slate-800">1. Is my password sent to your database?</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Absolutely not. SecurePass Check operates entirely within your browser. No data leaves your device.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">2. How long should a secure password be?</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    In 2026, we recommend a minimum of 12 characters. Ideally, aim for 16+ characters to defeat modern GPU
                    cracking rigs.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">3. Is it safe to use a password manager?</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Yes, it is safer than memorizing passwords. Good managers (like Bitwarden or 1Password) use
                    zero-knowledge encryption.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">4. Can I use this tool offline?</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    Yes! Once the page loads, you can disconnect your internet and the tool will still function perfectly.
                    This is the best way to verify our privacy promise.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">5. What is the difference between a weak and strong password?</h4>
                  <p className="text-sm text-slate-600 mt-1">
                    A weak password relies on common words or patterns (e.g., "password123"). A strong password uses high
                    entropy, meaning it is random and unpredictable (e.g., "Correct-Horse-Battery-Staple").
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="space-y-8">
            <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-2">Privacy Assurance</h3>
              <p className="text-blue-100 text-sm mb-4">
                We believe in privacy by design. Inspect our source code or use this tool offline.
              </p>
              <a
                href="privacy-policy.html"
                className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-50 transition-colors"
              >
                Read Policy
              </a>
            </div>

            <AdSlot slot="auto" format="rectangle" style={{ height: "250px" }} />

            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>
                  <a href="about.html" className="hover:text-blue-600">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="terms.html" className="hover:text-blue-600">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="disclaimer.html" className="hover:text-blue-600">
                    Disclaimer
                  </a>
                </li>
                <li>
                  <a href="contact.html" className="hover:text-blue-600">
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <span className="text-white font-bold text-xl block mb-4">SecurePass Check</span>
            <p className="text-sm max-w-xs">
              Empowering users with simple, effective, and private cybersecurity tools. Built for students, seniors, and
              everyone in between.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="privacy-policy.html" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="terms.html" className="hover:text-white">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="disclaimer.html" className="hover:text-white">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="blog-strong-password.html" className="hover:text-white">
                  Password Guide
                </a>
              </li>
              <li>
                <a href="about.html" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="contact.html" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-xs border-t border-slate-800 pt-8">
          &copy; <span>{new Date().getFullYear()}</span> SecurePass Check. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default App;
