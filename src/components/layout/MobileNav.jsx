import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutGrid,
  CheckCircle,
  TrendingUp,
  BookOpen,
  Briefcase,
  User,
  Building,
  Shield,
  FileSpreadsheet,
  CalendarDays,
  Users,
  Menu,
  X,
  Settings,
  LogOut,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const MobileNav = ({ onOpenAssessment }) => {
  const {
    activeTab,
    setActiveTab,
    currentRole,
    currentUser,
    logoutUser,
    resetDemoData,
    openProfileWizard,
    currentProfileCompletion
  } = useApp();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Role-adaptive mobile navigation tabs
  const learnerTabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutGrid },
    { id: 'assessment', label: 'Assess', icon: CheckCircle, isAction: true },
    { id: 'analytics', label: 'Skill Gap', icon: TrendingUp },
    { id: 'course', label: 'Learning', icon: BookOpen },
    { id: 'employment', label: 'Outcome', icon: Briefcase },
  ];

  const institutionTabs = [
    { id: 'institution', label: 'Batches', icon: Building },
    { id: 'institution-students', label: 'Students', icon: BookOpen },
    { id: 'institution-attendance', label: 'Attendance', icon: CalendarDays },
    { id: 'institution-registry', label: 'Excel Sheet', icon: FileSpreadsheet },
  ];

  const governmentTabs = [
    { id: 'government', label: 'Overview', icon: Shield },
    { id: 'government-private', label: 'Private', icon: Building },
    { id: 'government-tracking', label: 'Tracking', icon: Users },
    { id: 'government-registry', label: 'Excel Reg', icon: FileSpreadsheet },
  ];

  const navItems =
    currentRole === 'learner'
      ? learnerTabs
      : currentRole === 'institution'
      ? institutionTabs
      : governmentTabs;

  return (
    <>
      {/* BOTTOM MOBILE NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-[#E5EFEA] px-2 py-1.5 z-40 flex items-center justify-around shadow-xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.id === 'assessment' && activeTab === 'assessment');

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.isAction && onOpenAssessment) {
                  onOpenAssessment();
                } else if (item.id === 'assessment') {
                  setActiveTab('assessment');
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-[10px] font-semibold transition-all ${
                isActive
                  ? 'text-[#0F4C47] font-black bg-teal-50 scale-105'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-[#0F4C47]' : 'text-slate-400'}`} />
              <span className="truncate max-w-[55px]">{item.label}</span>
            </button>
          );
        })}

        {/* Menu / Drawer Toggle */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl text-[10px] font-semibold transition-all ${
            isDrawerOpen ? 'text-[#0F4C47] font-black bg-teal-50' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Menu className="w-5 h-5 text-slate-400" />
          <span>More</span>
        </button>
      </nav>

      {/* MOBILE DRAWER MODAL */}
      {isDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200">
          <div
            className="bg-white rounded-t-3xl p-6 shadow-2xl border-t border-slate-200 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-250"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser?.name || 'User'}
                  className="w-10 h-10 rounded-full object-cover border border-teal-200 shadow-sm"
                />
                <div>
                  <div className="text-sm font-extrabold text-slate-900 leading-tight">
                    {currentUser?.name || 'User'}
                  </div>
                  <div className="text-xs text-slate-500 capitalize">
                    {currentRole === 'learner'
                      ? 'Learner'
                      : currentRole === 'institution'
                      ? 'Institution Admin'
                      : 'Govt / Private Officer'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Completion Card in Drawer */}
            <div
              onClick={() => {
                setIsDrawerOpen(false);
                openProfileWizard(currentRole);
              }}
              className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-teal-700" />
                <div>
                  <div className="text-xs font-black text-[#0F4C47]">
                    Profile Completion: {currentProfileCompletion.percentage}%
                  </div>
                  <div className="text-[11px] text-teal-800">
                    {currentProfileCompletion.isComplete ? '100% Complete & Synced' : 'Tap to complete full profile'}
                  </div>
                </div>
              </div>
              <span className="text-xs font-bold text-teal-700 bg-white px-2.5 py-1 rounded-xl shadow-xs">
                {currentProfileCompletion.isComplete ? 'View' : 'Complete'}
              </span>
            </div>

            {/* Navigation Options List */}
            <div className="space-y-1 text-xs font-bold text-slate-700">
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  setActiveTab('settings');
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-500" />
                <span>Profile Settings & Security</span>
              </button>

              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  resetDemoData();
                }}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-rose-50 text-rose-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4 text-rose-500" />
                <span>Reset Demo State</span>
              </button>
            </div>

            {/* Sign Out Button */}
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  logoutUser();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
              >
                <LogOut className="w-4 h-4 text-slate-500" />
                <span>Sign Out to Landing Home</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
