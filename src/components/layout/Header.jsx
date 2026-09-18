import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, CheckCircle, ArrowRight, User, Shield, Building, Award, LogOut, Briefcase } from 'lucide-react';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

export const Header = () => {
  const {
    currentUser,
    currentRole,
    setCurrentRole,
    activeTab,
    setActiveTab,
    notifications,
    currentProfileCompletion,
    openProfileWizard,
    logoutUser,
    t
  } = useApp();

  const [showNotifs, setShowNotifs] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white border-b border-[#E5EFEA] px-3 sm:px-6 py-2.5 sm:py-3 sticky top-0 z-30 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Mobile Brand (visible when sidebar is hidden) */}
        <div className="flex items-center gap-2 md:hidden shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0F4C47] to-[#14B8A6] flex items-center justify-center text-white font-black text-sm shadow-xs">
            🌾
          </div>
          <span className="font-black text-xs text-[#0F4C47] tracking-tight">SKILL FARMING</span>
        </div>

        {/* Desktop Search Bar */}
        <div className="hidden sm:block flex-1 max-w-xl">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('search_placeholder', 'Search courses, skills, districts, assessments...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F5F8F7] hover:bg-[#EDF3F0] focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2 rounded-xl border border-transparent focus:border-[#0F4C47] outline-none transition-all"
            />
          </div>
        </div>

        {/* Mobile Search Toggle Icon */}
        <div className="sm:hidden ml-auto">
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Controls: Language Switcher, Role Badge & Sign Out */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Universal Language Switcher */}
          <LanguageSwitcher />

          {/* Active Role Indicator Badge */}
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-[#0F4C47] text-xs font-extrabold shadow-xs shrink-0">
            {currentRole === 'learner' && <User className="w-3.5 h-3.5 text-teal-600" />}
            {currentRole === 'institution' && <Building className="w-3.5 h-3.5 text-teal-600" />}
            {currentRole === 'employer' && <Briefcase className="w-3.5 h-3.5 text-teal-600" />}
            {currentRole === 'government' && <Shield className="w-3.5 h-3.5 text-teal-600" />}
            <span className="capitalize hidden sm:inline">
              {currentRole === 'learner' 
                ? t('learner_portal', 'Learner Portal') 
                : currentRole === 'institution' 
                ? t('institution_portal', 'Institution Portal') 
                : currentRole === 'employer'
                ? t('employer_portal', 'Employer Portal')
                : t('government_portal', 'Government Analytics (Maharashtra)')}
            </span>
            <span className="capitalize sm:hidden text-[10px] font-black">
              {currentRole === 'learner' ? 'Learner' : currentRole === 'institution' ? 'Institution' : currentRole === 'employer' ? 'Employer' : 'Govt MH'}
            </span>
          </div>

          {/* Sign Out / Exit to Home */}
          <button
            onClick={logoutUser}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50/70 transition-all text-xs font-semibold"
            title={t('sign_out', 'Sign Out')}
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">{t('sign_out', 'Sign Out')}</span>
          </button>

          {/* Notification Bell with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifs(!showNotifs)}
              className="relative p-2 rounded-xl text-slate-600 hover:bg-[#F0F5F3] transition-colors border border-transparent hover:border-[#DCE8E3]"
              aria-label={t('notifications', 'Notifications')}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#14B8A6] rounded-full ring-2 ring-white"></span>
              )}
            </button>

          {/* Notifications Dropdown */}
          {showNotifs && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#E5EFEA] p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-900">Notifications</span>
                  <span className="text-[11px] bg-[#E2F1ED] text-[#0F4C47] px-2 py-0.5 rounded-full font-medium">
                    {notifications.length} Total
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifs(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2 mt-3 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-xl bg-[#F8FAF9] hover:bg-[#F0F5F3] transition-colors border border-[#E5EFEA]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-slate-900">{n.title}</h4>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.date}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{n.message}</p>
                    {n.action && (
                      <button
                        onClick={() => {
                          setShowNotifs(false);
                          if (n.action === 'VIEW SKILL GAP') setActiveTab('analytics');
                          else if (n.action === 'VIEW UPDATE' || n.action === 'EXPLORE COURSE') setActiveTab('course');
                          else if (n.action === 'UPDATE STATUS') setActiveTab('employment');
                        }}
                        className="mt-2 text-[11px] font-medium text-[#0F4C47] hover:underline flex items-center gap-1"
                      >
                        {n.action} <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Completion Indicator Pill - 100% Clearly Visible & Spacious */}
        <button
          onClick={() => openProfileWizard(currentRole)}
          className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-xl border transition-all text-xs font-bold shrink-0 ${
            currentProfileCompletion.isComplete
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100 shadow-xs ring-1 ring-emerald-300/60'
              : 'bg-[#F5F8F7] border-[#DCE8E3] hover:border-[#0F4C47] text-slate-700 hover:bg-teal-50/60'
          }`}
          title={`Click to complete or edit ${currentRole} profile`}
        >
          <div
            className={`min-w-[36px] sm:min-w-[44px] px-1.5 sm:px-2.5 py-0.5 rounded-lg text-xs font-black text-center shadow-xs transition-colors ${
              currentProfileCompletion.isComplete
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0F4C47] text-white'
            }`}
          >
            {currentProfileCompletion.percentage}%
          </div>
          <span
            className={`hidden md:inline text-xs font-extrabold ${
              currentProfileCompletion.isComplete ? 'text-emerald-800' : 'text-[#0F4C47]'
            }`}
          >
            {currentProfileCompletion.isComplete ? '100% Complete' : 'Complete Profile'}
          </span>
        </button>

        {/* User Pill - Clicking opens Profile Settings */}
        <button
          onClick={() => setActiveTab('settings')}
          className="flex items-center gap-2.5 pl-2 border-l border-slate-200 hover:opacity-80 transition-opacity text-left"
          title="Go to Profile Settings"
        >
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-teal-200 shadow-sm"
          />
          <div className="hidden lg:block text-left">
            <div className="text-xs font-bold text-slate-900 leading-tight">
              {currentRole === 'learner'
                ? currentUser.name
                : currentRole === 'institution'
                ? 'Apex Academy Admin'
                : currentRole === 'employer'
                ? 'Anand Kulkarni (InfraCloud)'
                : 'Dr. Rajeshwari Patil, IAS'}
            </div>
            <div className="text-[11px] text-slate-500 leading-tight">
              {currentRole === 'learner'
                ? currentUser.email
                : currentRole === 'institution'
                ? 'director@apextech.org'
                : currentRole === 'employer'
                ? 'talent@infracloud.io'
                : 'governance@skillmission.gov.in'}
            </div>
          </div>
        </button>
      </div>
    </div>

      {/* Expandable Mobile Search Field */}
      {showMobileSearch && (
        <div className="sm:hidden w-full pt-1 pb-1 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, skills, assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F5F8F7] focus:bg-white text-xs text-slate-800 placeholder-slate-400 pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};
