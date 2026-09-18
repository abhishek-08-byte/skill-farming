import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Trophy,
  Award,
  Medal,
  Search,
  Filter,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Database,
  Binary,
  Zap,
  MapPin
} from 'lucide-react';

export const LeaderboardView = () => {
  const {
    currentUser,
    learnersDb,
    setActiveTab,
    recoverySession
  } = useApp();

  const [filterTab, setFilterTab] = useState('active'); // 'active' | 'masked' | 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('All');

  // Build enhanced leaderboard roster from learnersDb + currentUser
  const baseLearners = [
    {
      id: currentUser.id || 'learner-talha',
      name: currentUser.name || 'Talha Jubayer',
      avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      district: currentUser.city || 'Pune',
      institution: currentUser.education?.institution || 'Government College of Engineering, Pune',
      primarySkill: 'DBMS & Backend',
      completedCoursesCount: currentUser.activeCourses?.filter(c => c.progress >= 70).length || 3,
      points: currentUser.leaderboardPoints || 850,
      capabilityScore: currentUser.overallProgress || 75,
      leaderboardStatus: currentUser.leaderboardStatus || 'RECOVERY_IN_PROGRESS',
      isCurrentUser: true
    },
    {
      id: 'lrn-102',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      district: 'Bengaluru',
      institution: 'Government College of Engineering, Bengaluru',
      primarySkill: 'DBMS',
      completedCoursesCount: 4,
      points: 980,
      capabilityScore: 92,
      leaderboardStatus: 'ACTIVE',
      isCurrentUser: false
    },
    {
      id: 'lrn-103',
      name: 'Rohan Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      district: 'Pune',
      institution: 'Apex Technical Institute',
      primarySkill: 'Electrical Works',
      completedCoursesCount: 4,
      points: 920,
      capabilityScore: 90,
      leaderboardStatus: 'ACTIVE',
      isCurrentUser: false
    },
    {
      id: 'lrn-104',
      name: 'Aarav Mehta',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      district: 'Jaipur',
      institution: 'State Institute of Engineering',
      primarySkill: 'DSA',
      completedCoursesCount: 3,
      points: 875,
      capabilityScore: 84,
      leaderboardStatus: 'ACTIVE',
      isCurrentUser: false
    },
    {
      id: 'lrn-105',
      name: 'Ananya Verma',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
      district: 'Lucknow',
      institution: 'Regional Polytech Academy',
      primarySkill: 'Data Science & SQL',
      completedCoursesCount: 2,
      points: 790,
      capabilityScore: 78,
      leaderboardStatus: 'MASKED', // Inactive student
      isCurrentUser: false
    },
    {
      id: 'lrn-106',
      name: 'Vikram Patel',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      district: 'Hassan',
      institution: 'Malnad Technical College',
      primarySkill: 'Electrical Works',
      completedCoursesCount: 3,
      points: 810,
      capabilityScore: 80,
      leaderboardStatus: 'ACTIVE',
      isCurrentUser: false
    },
    {
      id: 'lrn-107',
      name: 'Sneha Kulkarni',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      district: 'Nagpur',
      institution: 'Govt Polytechnic Nagpur',
      primarySkill: 'DSA',
      completedCoursesCount: 2,
      points: 760,
      capabilityScore: 74,
      leaderboardStatus: 'MASKED', // Inactive student
      isCurrentUser: false
    }
  ];

  // Sort by points descending
  const sortedLearners = [...baseLearners].sort((a, b) => b.points - a.points);

  // Assign ranks
  const rankedLearners = sortedLearners.map((learner, idx) => ({
    ...learner,
    rank: idx + 1
  }));

  // Filter based on active filterTab
  const filteredLearners = rankedLearners.filter((l) => {
    // Tab filter
    if (filterTab === 'active' && l.leaderboardStatus !== 'ACTIVE') return false;
    if (filterTab === 'masked' && l.leaderboardStatus === 'ACTIVE') return false;

    // Search query
    if (searchQuery) {
      const matchName = l.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDistrict = l.district.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchName && !matchDistrict) return false;
    }

    // Skill filter
    if (skillFilter !== 'All') {
      if (!l.primarySkill.toLowerCase().includes(skillFilter.toLowerCase())) return false;
    }

    return true;
  });

  const currentUserStanding = rankedLearners.find((l) => l.isCurrentUser);
  const isUserMasked = currentUser.leaderboardStatus !== 'ACTIVE';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24 md:pb-8 animate-in fade-in duration-200">
      {/* HEADER HERO */}
      <div className="farming-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
            <Trophy className="w-4 h-4" />
            <span>Platform Capability Standings</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Student Skill Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Dynamic competitive rankings based on verified course completions, modular assessments, and active learning engagement.
          </p>
        </div>

        {/* Quick Link to Recovery if Masked */}
        {isUserMasked && (
          <button
            onClick={() => setActiveTab('masking')}
            className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 flex items-center gap-3 text-xs font-bold transition-all self-start md:self-auto shadow-xs"
          >
            <Clock className="w-4 h-4 text-amber-600 animate-spin" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-amber-700">Action Required</div>
              <div>Get Back on Track to restore rank →</div>
            </div>
          </button>
        )}
      </div>

      {/* CURRENT USER STANDING CARD */}
      <div
        className={`farming-card p-5 sm:p-6 transition-all ${
          isUserMasked
            ? 'border-amber-300 bg-amber-50/20'
            : 'border-teal-300 bg-gradient-to-br from-white to-[#F0F6F4]'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={currentUser.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-teal-600 shadow-sm"
              />
              <div className="absolute -bottom-1.5 -right-1.5 bg-[#0F4C47] text-white text-[10px] font-black w-6 h-6 rounded-lg flex items-center justify-center shadow-xs">
                #{currentUserStanding?.rank || 4}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                  {currentUser.name || 'Talha Jubayer'}
                </h3>
                <span
                  className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                    !isUserMasked
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                  }`}
                >
                  {!isUserMasked ? 'ACTIVE LEADERBOARD PARTICIPANT' : 'STATUS: INACTIVE / MASKED'}
                </span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                {currentUser.city || 'Pune'}, Maharashtra • {currentUser.education?.degree || 'B.Tech Computer Science'}
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-700 mt-2">
                <span>Total Points: <strong className="text-[#0F4C47]">{currentUser.leaderboardPoints || 850} pts</strong></span>
                <span>•</span>
                <span>Standing: <strong className="text-slate-900">{currentUser.currentRank || 'Top 4%'}</strong></span>
              </div>
            </div>
          </div>

          {/* Masked Alert & Reinstatement CTA */}
          <div className="flex flex-col items-start md:items-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
            {isUserMasked ? (
              <div className="space-y-2">
                <div className="text-xs text-amber-900 font-medium max-w-sm leading-relaxed">
                  Your rank is temporarily hidden from the public active leaderboard due to inactivity. All prior points and courses are preserved.
                </div>
                <button
                  onClick={() => setActiveTab('masking')}
                  className="px-4 py-2 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                  <span>Start "Get Back on Track" Recovery</span>
                </button>
              </div>
            ) : (
              <div className="text-right">
                <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 justify-end">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Active & Verified on Leaderboard</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Keep completing weekly modules to retain ranking.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS & TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Roster Filter Tabs */}
        <div className="flex items-center p-1 bg-slate-200/70 rounded-2xl text-xs font-bold w-full sm:w-auto">
          <button
            onClick={() => setFilterTab('active')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl transition-all ${
              filterTab === 'active'
                ? 'bg-white text-[#0F4C47] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active Roster ({rankedLearners.filter(l => l.leaderboardStatus === 'ACTIVE').length})
          </button>
          <button
            onClick={() => setFilterTab('masked')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl transition-all ${
              filterTab === 'masked'
                ? 'bg-white text-amber-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            In Recovery / Masked ({rankedLearners.filter(l => l.leaderboardStatus !== 'ACTIVE').length})
          </button>
          <button
            onClick={() => setFilterTab('all')}
            className={`flex-1 sm:flex-initial px-4 py-2 rounded-xl transition-all ${
              filterTab === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Registered ({rankedLearners.length})
          </button>
        </div>

        {/* Search & Domain Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-xs text-slate-800 placeholder-slate-400 pl-8 pr-3 py-2 rounded-xl border border-slate-200 outline-none focus:border-[#0F4C47]"
            />
          </div>

          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="bg-white text-xs font-semibold text-slate-700 border border-slate-200 rounded-xl px-2.5 py-2 outline-none cursor-pointer focus:border-[#0F4C47]"
          >
            <option value="All">All Domains</option>
            <option value="DBMS">DBMS / SQL</option>
            <option value="DSA">DSA Logic</option>
            <option value="Electrical">Electrical</option>
          </select>
        </div>
      </div>

      {/* LEADERBOARD TABLE (Tablet & Desktop sm+) */}
      <div className="hidden sm:block farming-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-[#F8FAF9] text-slate-500 uppercase text-[10px] font-bold">
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Location & Institution</th>
                <th className="py-3 px-4">Primary Skill</th>
                <th className="py-3 px-4 text-center">Courses</th>
                <th className="py-3 px-4 text-right">Points</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLearners.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    No learners match the selected filter.
                  </td>
                </tr>
              ) : (
                filteredLearners.map((learner) => {
                  const isActive = learner.leaderboardStatus === 'ACTIVE';

                  return (
                    <tr
                      key={learner.id}
                      className={`transition-colors ${
                        learner.isCurrentUser
                          ? 'bg-teal-50/50 font-semibold'
                          : 'hover:bg-slate-50/70'
                      }`}
                    >
                      {/* Rank Icon / Badge */}
                      <td className="py-3.5 px-4 text-center font-black">
                        {learner.rank === 1 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-amber-100 text-amber-800 shadow-xs text-sm">
                            🥇
                          </span>
                        ) : learner.rank === 2 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-slate-200 text-slate-700 shadow-xs text-sm">
                            🥈
                          </span>
                        ) : learner.rank === 3 ? (
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-amber-50 text-amber-700 shadow-xs text-sm border border-amber-200">
                            🥉
                          </span>
                        ) : (
                          <span className="text-slate-500 text-xs">#{learner.rank}</span>
                        )}
                      </td>

                      {/* Learner Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={learner.avatar}
                            alt={learner.name}
                            className="w-9 h-9 rounded-xl object-cover border border-slate-200 shadow-2xs shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-extrabold text-slate-900 truncate flex items-center gap-1.5">
                              <span>{learner.name}</span>
                              {learner.isCurrentUser && (
                                <span className="text-[10px] bg-[#0F4C47] text-white px-1.5 py-0.2 rounded-md font-bold">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-400 truncate">
                              Capability: {learner.capabilityScore}%
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Location & Institution */}
                      <td className="py-3.5 px-4 text-slate-600">
                        <div className="font-medium text-slate-800 truncate">{learner.district}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                          {learner.institution}
                        </div>
                      </td>

                      {/* Primary Skill */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E2F1ED] text-[#0F4C47] text-[11px] font-bold">
                          {learner.primarySkill}
                        </span>
                      </td>

                      {/* Completed Courses */}
                      <td className="py-3.5 px-4 text-center font-extrabold text-slate-700">
                        {learner.completedCoursesCount}
                      </td>

                      {/* Points */}
                      <td className="py-3.5 px-4 text-right">
                        <span className="font-black text-sm text-[#0F4C47]">
                          {learner.points}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-normal">pts</span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                            <Clock className="w-3 h-3" />
                            <span>In Recovery</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MOBILE RESPONSIVE CARD STACK (Mobile <sm) */}
      <div className="sm:hidden space-y-3">
        {filteredLearners.length === 0 ? (
          <div className="farming-card p-6 text-center text-slate-400 text-xs">
            No learners match the selected filter.
          </div>
        ) : (
          filteredLearners.map((learner) => {
            const isActive = learner.leaderboardStatus === 'ACTIVE';

            return (
              <div
                key={learner.id}
                className={`farming-card p-4 transition-all ${
                  learner.isCurrentUser
                    ? 'border-teal-400 bg-teal-50/40 ring-1 ring-teal-400/50'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Rank Badge */}
                    <div className="w-8 h-8 rounded-xl bg-slate-100 font-black text-xs flex items-center justify-center shrink-0">
                      {learner.rank === 1 ? '🥇' : learner.rank === 2 ? '🥈' : learner.rank === 3 ? '🥉' : `#${learner.rank}`}
                    </div>

                    <img
                      src={learner.avatar}
                      alt={learner.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 shrink-0"
                    />

                    <div className="min-w-0">
                      <div className="font-extrabold text-sm text-slate-900 truncate flex items-center gap-1.5">
                        <span>{learner.name}</span>
                        {learner.isCurrentUser && (
                          <span className="text-[9px] bg-[#0F4C47] text-white px-1.5 py-0.2 rounded-md font-bold">
                            You
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{learner.district}</span>
                        <span>•</span>
                        <span>{learner.primarySkill}</span>
                      </div>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right shrink-0">
                    <div className="text-base font-black text-[#0F4C47]">{learner.points}</div>
                    <div className="text-[9px] text-slate-400 uppercase font-semibold">pts</div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px]">
                    {learner.completedCoursesCount} completed courses
                  </span>

                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Active</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>In Recovery</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
