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
  UserPlus,
  Code,
  Server,
  Wrench
} from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

export const LandingPage = ({ onGetStarted }) => {
  const { setCurrentRole, setActiveTab, t } = useApp();

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
      <header className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#0F4C47] to-[#14B8A6] flex items-center justify-center text-white text-lg font-black shadow-sm">
            🌾
          </div>
          <div>
            <div className="font-black text-lg text-[#0F4C47] tracking-tight">
              {t('platform_name', 'SKILL FARMING')}
            </div>
            <div className="text-[10px] uppercase font-bold text-teal-700 tracking-wider">
              {t('maharashtra_gov', 'Government of Maharashtra')} • MSSDS
            </div>
          </div>
        </div>

        {/* Language Switcher & Auth Buttons in Header */}
        <div className="flex items-center gap-2.5">
          <LanguageSwitcher />

          <button
            onClick={() => openAuth('login', 'learner')}
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-[#0F4C47] hover:bg-[#E2F1ED] transition-all flex items-center gap-1.5"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t('login_btn', 'Log In')}</span>
          </button>
          <button
            onClick={() => openAuth('register', 'learner')}
            className="px-4 py-2 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 hover:scale-[1.02]"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>{t('register_btn', 'Register')}</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-[#0F4C47] text-xs font-bold mb-4 shadow-2xs">
          <span>🏛️</span>
          <span>{t('landing_badge', 'Government of Maharashtra • Department of Skills & Innovation')}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
          {t('landing_hero_h1', 'Bridging Talent with Opportunity Across Maharashtra')}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-5 leading-relaxed font-medium">
          {t('landing_hero_p', 'A unified intelligence platform connecting learners, educational institutions, private employers, and the Maharashtra State Skill Development Society (MSSDS).')}
        </p>

        {/* Primary & Secondary CTAs with Login and Create Account */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            onClick={() => openAuth('register', 'learner')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-sm font-black transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02]"
          >
            <span>{t('landing_cta_get_started', 'Get Started Now')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => openAuth('login', 'learner')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white border border-[#DCE8E3] hover:bg-slate-50 text-slate-800 text-sm font-bold transition-all shadow-xs flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4 text-[#0F4C47]" />
            <span>{t('landing_cta_explore', 'Explore Portals')}</span>
          </button>
        </div>

        {/* Role Quick Selector Cards - 4 Portals */}
        <div className="mt-12 p-5 rounded-3xl bg-white border border-[#E5EFEA] shadow-sm max-w-4xl mx-auto">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 text-left sm:text-center">
            {t('landing_cta_explore', 'Select Your Portal')}:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <button
              onClick={() => openAuth('login', 'learner')}
              className="p-3 rounded-2xl border border-teal-200 bg-teal-50/50 hover:bg-teal-100/70 text-xs font-bold text-[#0F4C47] transition-all flex flex-col items-center gap-1.5 text-center group cursor-pointer shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-[#0F4C47] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <UserCheck className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900">{t('learner_portal', 'Learner Portal')}</span>
              <span className="text-[10px] text-teal-700 font-medium">Skill Assessment & Jobs</span>
            </button>
            <button
              onClick={() => openAuth('login', 'institution')}
              className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all flex flex-col items-center gap-1.5 text-center group cursor-pointer shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <Building className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900">{t('institution_portal', 'Institution Portal')}</span>
              <span className="text-[10px] text-slate-500 font-medium">Batches & Attendance</span>
            </button>
            <button
              onClick={() => openAuth('login', 'employer')}
              className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-700 transition-all flex flex-col items-center gap-1.5 text-center group cursor-pointer shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-[#0F4C47] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900">{t('employer_portal', 'Employer Portal')}</span>
              <span className="text-[10px] text-teal-700 font-medium">Hiring & Verified Talent</span>
            </button>
            <button
              onClick={() => openAuth('login', 'government')}
              className="p-3 rounded-2xl border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/70 text-xs font-bold text-emerald-900 transition-all flex flex-col items-center gap-1.5 text-center group cursor-pointer shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-slate-900">{t('government_portal', 'Government Analytics (Maharashtra)')}</span>
              <span className="text-[10px] text-emerald-700 font-bold">Maharashtra 36 Districts</span>
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic Role-Based Pathways Showcase (Replaces static 3 cards) */}
      <section className="max-w-7xl mx-auto px-6 py-14 border-t border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Role-Tailored Evaluation & Learning Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Targeted Career Pathways & Domain Assessments
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            No generic tests. When you choose your career destination, the platform delivers customized domain assessments, intelligent gap diagnostics, and targeted micro-curricula.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pathway 1: Software & Web */}
          <div className="farming-card p-6 border-t-4 border-t-teal-600 hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0F4C47] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform border border-teal-100 shadow-2xs">
                <Code className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded w-fit mb-2">
                Software & Full Stack
              </div>
              <h3 className="font-black text-lg text-slate-900">Software Engineering</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Modern full-stack architectures, REST APIs, state management, asynchronous execution, and data structures.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5 text-teal-800 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Web Architectures & DSA</span>
                </div>
                <div className="text-slate-500 text-[10px]">Tailored 10-Question Capability Matrix</div>
              </div>
            </div>
            <button
              onClick={() => openAuth('register', 'learner')}
              className="mt-5 w-full py-2 px-3 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F4C47] text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Explore Pathway</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pathway 2: Data Science & AI */}
          <div className="farming-card p-6 border-t-4 border-t-blue-600 hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform border border-blue-100 shadow-2xs">
                <Database className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded w-fit mb-2">
                Data & Analytics
              </div>
              <h3 className="font-black text-lg text-slate-900">Data Analytics & AI</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Relational query tuning, 3NF normalization, window functions, pandas transformations, and predictive pipelines.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5 text-blue-800 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>SQL, Schema Design & Analytics</span>
                </div>
                <div className="text-slate-500 text-[10px]">Data-Driven Capability Classification</div>
              </div>
            </div>
            <button
              onClick={() => openAuth('register', 'learner')}
              className="mt-5 w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Explore Pathway</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pathway 3: Cloud & DevOps */}
          <div className="farming-card p-6 border-t-4 border-t-purple-600 hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform border border-purple-100 shadow-2xs">
                <Server className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded w-fit mb-2">
                Cloud & Infra
              </div>
              <h3 className="font-black text-lg text-slate-900">Cloud & DevOps</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Docker containers, CI/CD automated deployment pipelines, reverse proxies, and resilient cloud architectures.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5 text-purple-800 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Docker, CI/CD & Systems</span>
                </div>
                <div className="text-slate-500 text-[10px]">Cloud Scale Infrastructure Evaluation</div>
              </div>
            </div>
            <button
              onClick={() => openAuth('register', 'learner')}
              className="mt-5 w-full py-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Explore Pathway</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pathway 4: Core Technical & Industrial */}
          <div className="farming-card p-6 border-t-4 border-t-amber-600 hover:shadow-lg transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform border border-amber-100 shadow-2xs">
                <Wrench className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded w-fit mb-2">
                Technical Trades
              </div>
              <h3 className="font-black text-lg text-slate-900">Core Engineering</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Industrial motor control, Star-Delta wiring, LOTO safety standards, and commercial power diagnostics.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600 font-medium">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Active Only For Electrical Roles</span>
                </div>
                <div className="text-slate-500 text-[10px]">Strict Safety & Circuit Diagnostic Band</div>
              </div>
            </div>
            <button
              onClick={() => openAuth('register', 'learner')}
              className="mt-5 w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Explore Pathway</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
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
