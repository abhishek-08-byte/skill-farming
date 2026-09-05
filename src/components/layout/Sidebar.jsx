import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutGrid,
  BookOpen,
  TrendingUp,
  CheckCircle,
  CalendarDays,
  Briefcase,
  Settings,
  LogOut,
  Sparkles,
  Building,
  Shield,
  Layers,
  RotateCcw
} from 'lucide-react';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    setCurrentRole,
    resetDemoData
  } = useApp();

  // Navigation items based on current role
  const learnerNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'course', label: 'Course', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'assignments', label: 'Assignments', icon: CheckCircle },
    { id: 'attendance', label: 'Attendance', icon: CalendarDays },
    { id: 'employment', label: 'Employment', icon: Briefcase },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const institutionNav = [
    { id: 'institution', label: 'Batches & Courses', icon: Building },
    { id: 'institution-students', label: 'Student Rosters', icon: BookOpen },
    { id: 'institution-attendance', label: 'Attendance Logs', icon: CalendarDays },
    { id: 'dashboard', label: 'Learner View', icon: LayoutGrid },
  ];

  const governmentNav = [
    { id: 'government', label: 'State Overview', icon: Shield },
    { id: 'government-drilldown', label: 'District Drilldown', icon: Layers },
    { id: 'government-cohorts', label: 'Cohort Trends', icon: TrendingUp },
    { id: 'dashboard', label: 'Learner View', icon: LayoutGrid },
  ];

  const currentNav = currentRole === 'learner'
    ? learnerNav
    : currentRole === 'institution'
    ? institutionNav
    : governmentNav;

  return (
    <aside className="w-64 bg-white border-r border-[#E5EFEA] min-h-screen flex flex-col justify-between p-4 hidden md:flex shrink-0">
      <div>
        {/* Brand Logo & Name - matching reference header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F4C47] to-[#14B8A6] flex items-center justify-center text-white font-black text-lg shadow-sm">
            🌾
          </div>
          <div>
            <div className="font-extrabold text-sm text-[#0F4C47] tracking-tight flex items-center gap-1.5">
              <span>SKILL FARMING</span>
            </div>
            <div className="text-[10px] uppercase font-semibold text-teal-700 tracking-wider">
              Intelligence Platform
            </div>
          </div>
        </div>

        {/* Navigation List - styled as pill buttons matching reference */}
        <nav className="space-y-1.5">
          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'assignments') setActiveTab('assessment');
                  else if (item.id === 'government-drilldown' || item.id === 'government-cohorts') setActiveTab('government');
                  else if (item.id === 'institution-students' || item.id === 'institution-attendance') setActiveTab('institution');
                  else setActiveTab(item.id);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#E2F1ED] text-[#0F4C47] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-[#F3F7F5]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0F4C47]' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Card - matching reference UI lower card */}
      <div className="pt-4 space-y-3">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#10554F] via-[#0F4C47] to-[#0A332F] text-white shadow-md relative overflow-hidden">
          {/* Abstract circles decoration matching image */}
          <div className="absolute top-2 right-2 opacity-20">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="14" stroke="white" strokeWidth="4" />
              <circle cx="36" cy="36" r="14" stroke="white" strokeWidth="4" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-xs flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4 text-teal-200" />
            </div>
            <h4 className="text-sm font-bold leading-snug">Keep Practicing,<br />Keep Improving!</h4>
            <p className="text-[11px] text-teal-100/80 mt-1">Sow foundational skills today, harvest career outcomes tomorrow.</p>
          </div>
        </div>

        {/* Demo Reset / Logout Button */}
        <button
          onClick={resetDemoData}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
          title="Reset local changes back to default demo state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </aside>
  );
};
