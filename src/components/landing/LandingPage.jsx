import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Database,
  Binary,
  Zap,
  Briefcase,
  TrendingUp,
  Award,
  Layers,
  ChevronRight,
  Shield,
  Building,
  UserCheck,
  LogIn,
  UserPlus
} from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';

export const LandingPage = ({ onGetStarted }) => {
  const { setCurrentRole, setActiveTab } = useApp();

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [authRole, setAuthRole] = useState('learner');

  const openAuth = (tab = 'login', role = 'learner') => {
    setAuthTab(tab);
    setAuthRole(role);
    setIsAuthOpen(true);
  };

  const steps = [
    { num: '01', title: 'Profile', desc: 'Define your education & target career destination' },
    { num: '02', title: 'Assess', desc: 'Take 10 standardized progressive questions per skill' },
    { num: '03', title: 'Find Gap', desc: 'See exact capability deficits versus target job requirements' },
    { num: '04', title: 'Get Recommended', desc: 'Receive targeted training courses that solve your gaps' },
    { num: '05', title: 'Train & Attend', desc: 'Participate in verified batch modules and hands-on sessions' },
    { num: '06', title: 'Track Outcome', desc: 'Report employment, wage progression & training relevance' },
    { num: '07', title: 'Retain & Advance', desc: 'Monitor longitudinal career retention at 2, 6, and 12 months' },
    { num: '08', title: 'Evidence Loop', desc: 'Provide verified evidence for continuous program improvement' },
  ];

  return (
    <div className="min-h-screen bg-[#F3F7F5] text-slate-800 animate-in fade-in duration-200">
      {/* Top Simple Nav */}
      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0F4C47] to-[#14B8A6] flex items-center justify-center text-white text-lg font-black shadow-sm">
            🌾
          </div>
          <div>
            <div className="font-black text-lg text-[#0F4C47] tracking-tight">SKILL FARMING</div>
            <div className="text-[10px] uppercase font-bold text-teal-700 tracking-wider">
              Skill-to-Employment Intelligence
            </div>
          </div>
        </div>

        {/* Auth Buttons in Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => openAuth('login', 'learner')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#0F4C47] hover:bg-[#E2F1ED] transition-all flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Log In</span>
          </button>
          <button
            onClick={() => openAuth('register', 'learner')}
            className="px-4 py-2 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 hover:scale-[1.02]"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Create Account</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-12 pb-16 text-center">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          Find your skill gaps.<br />
          <span className="text-[#0F4C47]">Learn what you need.</span><br />
          Track where it takes you.
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed font-medium">
          A continuous longitudinal platform connecting learner capability, 10-question standardized assessments, skill gap mapping, targeted upskilling, and post-training employment retention evidence.
        </p>

        {/* Primary & Secondary CTAs with Login and Create Account */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            onClick={() => openAuth('register', 'learner')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-sm font-black transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <span>CREATE FREE ACCOUNT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => openAuth('login', 'learner')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white border border-[#DCE8E3] hover:bg-slate-50 text-slate-800 text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4 text-[#0F4C47]" />
            <span>LOG IN TO PORTAL</span>
          </button>
        </div>

        {/* Role Quick Selector Cards */}
        <div className="mt-12 p-5 rounded-3xl bg-white border border-[#E5EFEA] shadow-sm max-w-2xl mx-auto">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-left sm:text-center">
            Log In or Register by Role Perspective:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <button
              onClick={() => openAuth('login', 'learner')}
              className="p-3 rounded-2xl border border-teal-200 bg-teal-50/50 hover:bg-teal-100/70 text-xs font-bold text-[#0F4C47] transition-all flex flex-col items-center gap-1.5 text-center group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#0F4C47] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <UserCheck className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900">Learner Portal</span>
              <span className="text-[10px] text-teal-700 font-medium">Assessment & Upskilling</span>
            </button>
            <button
              onClick={() => openAuth('login', 'institution')}
              className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all flex flex-col items-center gap-1.5 text-center group"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Building className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900">Institution Portal</span>
              <span className="text-[10px] text-slate-500 font-medium">Batches & Attendance</span>
            </button>
            <button
              onClick={() => openAuth('login', 'government')}
              className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all flex flex-col items-center gap-1.5 text-center group"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900">Government Portal</span>
              <span className="text-[10px] text-slate-500 font-medium">Districts & Retention</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Initial Skills Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-200">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700">Three Initial Foundation Skills</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Standardized 10-Question Capability Banks
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Progressively graded from Easy (1–3), Moderate (4–7), to Tough Logical Scenarios (8–10).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="farming-card p-6 border-t-4 border-t-teal-600">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#0F4C47] flex items-center justify-center mb-3">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="font-black text-lg text-slate-900">1. DBMS</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Database fundamentals, primary/foreign keys, joins, normalization (3NF), ACID transactions, B-Tree index optimization, and concurrency locks.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-[#0F4C47]">
              10 Progressive Questions • Evaluated Band
            </div>
          </div>

          <div className="farming-card p-6 border-t-4 border-t-amber-500">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <Binary className="w-5 h-5" />
            </div>
            <h3 className="font-black text-lg text-slate-900">2. DSA</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Array contiguous memory, stack LIFO, singly linked lists, BST traversals, graph cycle detection, sliding window, and LRU Cache dual architectures.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-amber-700">
              10 Progressive Questions • Evaluated Band
            </div>
          </div>

          <div className="farming-card p-6 border-t-4 border-t-emerald-600">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-black text-lg text-slate-900">3. Electrical Works</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Lock-Out/Tag-Out safety, Ohm’s Law calculations, MCB/RCCB earth leakage, 3-phase floating neutral hazards, and industrial star-delta motor control.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-bold text-emerald-700">
              10 Progressive Questions • Evaluated Band
            </div>
          </div>
        </div>
      </section>

      {/* Visual Longitudinal Pipeline (How it works) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 py-16 border-t border-slate-200">
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-teal-700">Continuous Longitudinal Flow</div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            The Complete Evidence Loop
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            From initial assessment to retention and policy decision support.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((st) => (
            <div key={st.num} className="farming-card p-5 relative overflow-hidden flex flex-col justify-between">
              <div>
                <span className="text-2xl font-black text-teal-200/90">{st.num}</span>
                <h3 className="font-black text-base text-slate-900 mt-1">{st.title}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{st.desc}</p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-[#0F4C47]">
                <span>Pipeline Stage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Launch CTA */}
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => openAuth('register', 'learner')}
            className="px-8 py-3.5 rounded-2xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-sm font-black transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => openAuth('login', 'learner')}
            className="px-8 py-3.5 rounded-2xl bg-white border border-[#DCE8E3] hover:bg-slate-50 text-slate-800 text-sm font-bold transition-all shadow-xs inline-flex items-center gap-2"
          >
            <LogIn className="w-4 h-4 text-[#0F4C47]" />
            <span>Log In to Portal</span>
          </button>
        </div>
      </section>

      {/* Auth Modal with Login & Create Account Tabs */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialTab={authTab}
        initialRole={authRole}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-6 text-center text-xs text-slate-500">
        <div className="font-bold text-slate-800">SKILL FARMING • Skill-to-Employment Intelligence Platform</div>
        <p className="text-slate-400 mt-1">
          Designed for Smart India Hackathon. Connecting learner capabilities, assessments, personalized training, and longitudinal outcomes.
        </p>
      </footer>
    </div>
  );
};
