import React from 'react';
import { useApp } from '../../context/AppContext';
import { LayoutGrid, CheckCircle, TrendingUp, BookOpen, Briefcase, User } from 'lucide-react';

export const MobileNav = ({ onOpenAssessment }) => {
  const { activeTab, setActiveTab, currentUser } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5EFEA] px-3 py-2 z-40 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
          activeTab === 'dashboard' ? 'text-[#0F4C47] font-bold' : 'text-slate-500'
        }`}
      >
        <LayoutGrid className="w-5 h-5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => {
          if (onOpenAssessment) onOpenAssessment();
          else setActiveTab('assessment');
        }}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
          activeTab === 'assessment' ? 'text-[#0F4C47] font-bold' : 'text-slate-500'
        }`}
      >
        <CheckCircle className="w-5 h-5 text-[#0F4C47]" />
        <span>Assess</span>
      </button>

      <button
        onClick={() => setActiveTab('analytics')}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
          activeTab === 'analytics' ? 'text-[#0F4C47] font-bold' : 'text-slate-500'
        }`}
      >
        <TrendingUp className="w-5 h-5" />
        <span>Skill Gap</span>
      </button>

      <button
        onClick={() => setActiveTab('course')}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
          activeTab === 'course' ? 'text-[#0F4C47] font-bold' : 'text-slate-500'
        }`}
      >
        <BookOpen className="w-5 h-5" />
        <span>Learning</span>
      </button>

      <button
        onClick={() => setActiveTab('employment')}
        className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
          activeTab === 'employment' ? 'text-[#0F4C47] font-bold' : 'text-slate-500'
        }`}
      >
        <Briefcase className="w-5 h-5" />
        <span>Outcome</span>
      </button>
    </nav>
  );
};
