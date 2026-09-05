import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Bell, CheckCircle, ArrowRight, User, Shield, Building, Award } from 'lucide-react';

export const Header = () => {
  const {
    currentUser,
    currentRole,
    setCurrentRole,
    activeTab,
    setActiveTab,
    notifications
  } = useApp();

  const [showNotifs, setShowNotifs] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white border-b border-[#E5EFEA] px-4 sm:px-6 py-3 sticky top-0 z-30 flex items-center justify-between gap-4">
      {/* Search Bar - matching reference UI */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses, skills, assessments, batches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F5F8F7] hover:bg-[#EDF3F0] focus:bg-white text-sm text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2 rounded-xl border border-transparent focus:border-[#0F4C47] outline-none transition-all"
          />
        </div>
      </div>

      {/* Role Switcher & User Profile Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Role Quick Switcher Pills for Demonstration */}
        <div className="hidden md:flex items-center bg-[#EDF4F1] p-1 rounded-xl border border-[#DCE8E3] text-xs font-medium">
          <button
            onClick={() => setCurrentRole('learner')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentRole === 'learner'
                ? 'bg-[#0F4C47] text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Learner</span>
          </button>
          <button
            onClick={() => setCurrentRole('institution')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentRole === 'institution'
                ? 'bg-[#0F4C47] text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Institution</span>
          </button>
          <button
            onClick={() => setCurrentRole('government')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              currentRole === 'government'
                ? 'bg-[#0F4C47] text-white shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Government</span>
          </button>
        </div>

        {/* View Landing Page Toggle */}
        <button
          onClick={() => setActiveTab('landing')}
          className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
            activeTab === 'landing'
              ? 'bg-[#0F4C47] text-white border-[#0F4C47]'
              : 'border-[#DCE8E3] text-slate-700 hover:bg-[#F0F5F3]'
          }`}
          title="View Public Landing Page"
        >
          Landing
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-[#F0F5F3] transition-colors border border-transparent hover:border-[#DCE8E3]"
            aria-label="Notifications"
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

        {/* User Pill - Matching Reference Screenshot */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
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
                : 'State Mission Director'}
            </div>
            <div className="text-[11px] text-slate-500 leading-tight">
              {currentRole === 'learner'
                ? currentUser.email
                : currentRole === 'institution'
                ? 'director@apextech.org'
                : 'governance@skillmission.gov.in'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
