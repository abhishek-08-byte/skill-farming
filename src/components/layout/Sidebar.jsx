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
  Users,
  RotateCcw,
  FileSpreadsheet,
  Trophy
} from 'lucide-react';

export const Sidebar = () => {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    currentUser,
    setCurrentRole,
    resetDemoData,
    logoutUser,
    t
  } = useApp();

  const isUserMasked = currentUser?.leaderboardStatus !== 'ACTIVE';

  // Navigation items based on current role with dynamic translations
  const learnerNav = [
    { id: 'dashboard', label: t('nav_dashboard', 'Dashboard'), icon: LayoutGrid },
    { id: 'course', label: t('nav_courses', 'Course Catalog'), icon: BookOpen },
    { id: 'jobs', label: t('nav_jobs', 'Job Marketplace'), icon: Briefcase, badge: 'Hiring' },
    { id: 'analytics', label: t('nav_analytics', 'Analytics & Gaps'), icon: TrendingUp },
    { id: 'leaderboard', label: t('nav_leaderboard', 'Leaderboard'), icon: Trophy },
    ...(isUserMasked
      ? [{ id: 'masking', label: t('nav_recovery', 'Get Back on Track'), icon: Sparkles, badge: 'Recovery' }]
      : []),
    { id: 'assignments', label: t('nav_assignments', 'Assignments'), icon: CheckCircle },
    { id: 'attendance', label: t('nav_attendance', 'Attendance'), icon: CalendarDays },
    { id: 'employment', label: t('nav_employment', 'Career Outcomes'), icon: TrendingUp },
    { id: 'settings', label: t('nav_settings', 'Settings & Profile'), icon: Settings },
  ];

  const institutionNav = [
    { id: 'institution', label: t('nav_batches', 'Batches & Courses'), icon: Building },
    { id: 'institution-students', label: t('nav_students', 'Student Rosters'), icon: BookOpen },
    { id: 'institution-attendance', label: t('nav_attendance', 'Attendance Logs'), icon: CalendarDays },
    { id: 'institution-registry', label: t('nav_excel_registry', 'Learner Profiles Excel'), icon: FileSpreadsheet },
    { id: 'settings', label: t('nav_settings', 'Institution Profile'), icon: Settings },
  ];

  const employerNav = [
    { id: 'employer', label: t('nav_recruiter_hub', 'Recruiter Hub & ATS'), icon: Briefcase },
    { id: 'settings', label: t('nav_settings', 'Employer Profile'), icon: Settings },
  ];

  const governmentNav = [
    { id: 'government', label: t('nav_govt_overview', 'Statistical Overview'), icon: Shield },
    { id: 'government-drilldown', label: t('nav_govt_drilldown', 'District Drilldown'), icon: Layers },
    { id: 'government-cohorts', label: t('nav_govt_cohorts', 'Cohort & Wage Trends'), icon: TrendingUp },
    { id: 'government-registry', label: t('nav_govt_registry', 'Master Registry Audits'), icon: FileSpreadsheet },
    { id: 'settings', label: t('nav_mission_profile', 'Mission Profile'), icon: Settings },
  ];

  const currentNav = currentRole === 'learner'
    ? learnerNav
    : currentRole === 'institution'
    ? institutionNav
    : currentRole === 'employer'
    ? employerNav
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
              <span>{t('platform_name', 'SKILL FARMING')}</span>
            </div>
            <div className="text-[10px] uppercase font-semibold text-teal-700 tracking-wider">
              {t('maharashtra_gov', 'Government of Maharashtra')}
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
                  else setActiveTab(item.id);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#E2F1ED] text-[#0F4C47] font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-[#F3F7F5]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0F4C47]' : 'text-slate-500'}`} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 animate-pulse">
                    {item.badge}
                  </span>
                )}
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

        {/* Sign Out to Landing */}
        <button
          onClick={logoutUser}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
          title="Sign out and return to Home Landing Page"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out to Home</span>
        </button>

        {/* Demo Reset Button */}
        <button
          onClick={resetDemoData}
          className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
          title="Reset local changes back to default demo state"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </aside>
  );
};
