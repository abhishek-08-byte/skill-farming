import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProfileCompletionCard } from '../profile/ProfileCompletionCard';
import {
  TrendingUp,
  Award,
  ChevronDown,
  ArrowUpRight,
  Database,
  Binary,
  Zap,
  Palette,
  PlayCircle,
  Clock,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Calendar,
  Layers,
  Briefcase
} from 'lucide-react';

export const LearnerDashboard = ({ onOpenAssessment, onSelectCourse }) => {
  const {
    currentUser,
    setActiveTab,
    updateCourseProgress,
    openCoursePlayer
  } = useApp();

  const [filterDomain, setFilterDomain] = useState('All');
  const [selectedDay, setSelectedDay] = useState('Fri');

  // Attendance calculation
  const attendance = currentUser.attendanceSummary?.overallPercentage || 80;
  const presentSessions = currentUser.attendanceSummary?.presentSessions || 40;
  const totalSessions = currentUser.attendanceSummary?.totalSessions || 50;
  const absentSessions = totalSessions - presentSessions;

  // Donut SVG parameters
  const size = 110;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const presentOffset = circumference - (attendance / 100) * circumference;

  return (
    <div className="space-y-6 pb-16 md:pb-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* TOP ROW: Hero Greeting Banner + Attendance Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Hero Greeting Card - Matches Reference Banner */}
        <div className="lg:col-span-2 farming-hero p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-md">
          {/* Background book / seedling illustration */}
          <div className="absolute -right-6 -bottom-6 sm:right-6 sm:bottom-4 opacity-25 pointer-events-none">
            <svg width="220" height="180" viewBox="0 0 220 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M110 30C85 20 40 20 10 35V160C40 145 85 145 110 160C135 145 180 145 210 160V35C180 20 135 20 110 30Z"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M110 30V160" stroke="white" strokeWidth="6" strokeLinecap="round" />
              <path d="M110 65C85 55 45 55 20 70" stroke="white" strokeWidth="4" strokeLinecap="round" />
              <path d="M110 100C85 90 45 90 20 105" stroke="white" strokeWidth="4" strokeLinecap="round" />
              <path d="M110 65C135 55 175 55 200 70" stroke="white" strokeWidth="4" strokeLinecap="round" />
              <path d="M110 100C135 90 175 90 200 105" stroke="white" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          <div>
            <div className="text-xs font-semibold text-teal-200 tracking-wide mb-1">
              Monday, October 25
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, {currentUser.name?.split(' ')[0] || 'Talha'}
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/90 max-w-md mt-1.5 leading-relaxed">
              {currentUser.quote || 'The beautiful thing about learning is that no one can take it away from you.'}
            </p>
          </div>

          {/* Quick Metrics & Launchers inside Hero */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 relative z-10">
            {/* Overall Progress Badge */}
            <div className="flex items-center gap-3 bg-white/12 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-teal-200">Overall Progress</div>
                <div className="text-lg font-extrabold text-white">{currentUser.overallProgress || 75}%</div>
              </div>
            </div>

            {/* Current Rank Badge */}
            <div className="flex items-center gap-3 bg-white/12 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-teal-200">Current Rank</div>
                <div className="text-lg font-extrabold text-white">{currentUser.currentRank || 'Top 4%'}</div>
              </div>
            </div>

            {/* Take Assessment Primary CTA */}
            <button
              onClick={onOpenAssessment}
              className="ml-auto bg-white text-[#0F4C47] hover:bg-teal-50 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Take Skill Assessment</span>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Attendance Donut Card - Matches Reference Image */}
        <div className="farming-card p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-900">Attendance</h3>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F4C47]"></span>
                <span className="text-slate-600 font-medium">Present</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]"></span>
                <span className="text-slate-600 font-medium">Absent</span>
              </div>
            </div>
          </div>

          {/* Donut Chart Visual */}
          <div className="flex items-center justify-center py-4">
            <div className="relative flex items-center justify-center">
              <svg width={size} height={size} className="transform -rotate-90">
                {/* Background absent track (coral/red) */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#FEE2E2"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Foreground present progress (deep forest teal) */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#0F4C47"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={presentOffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-extrabold text-slate-900">{attendance}%</span>
              </div>
            </div>
          </div>

          {/* Date Selector Indicator */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-slate-900">
              <span>April-25-2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <span className="text-[11px] text-slate-500">{presentSessions}/{totalSessions} sessions</span>
          </div>
        </div>
      </div>

      {/* PROFILE COMPLETION CALLOUT */}
      <ProfileCompletionCard role="learner" />

      {/* MIDDLE ROW: Active Courses Cards - Matches Reference Image (Mathematics, Biology, English Lit, Modern Art) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900">Enrolled Courses & Active Progress</h2>
          <button
            onClick={() => setActiveTab('course')}
            className="text-xs font-semibold text-[#0F4C47] hover:underline"
          >
            View All Courses →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentUser.activeCourses?.map((course) => {
            // Pill color mapping
            const pillStyles = {
              Advanced: 'bg-[#E2F1ED] text-[#0F4C47]',
              Core: 'bg-[#FEF3C7] text-[#92400E]',
              Practical: 'bg-[#E0F2FE] text-[#0369A1]',
              Literature: 'bg-[#DCFCE7] text-[#166534]',
              Creative: 'bg-[#F3E8FF] text-[#6B21A8]'
            }[course.category] || 'bg-slate-100 text-slate-700';

            const barColor = {
              teal: 'bg-[#0F4C47]',
              amber: 'bg-[#D97706]',
              emerald: 'bg-[#059669]',
              purple: 'bg-[#7C3AED]'
            }[course.categoryColor] || 'bg-[#0F4C47]';

            return (
              <div key={course.courseId} className="farming-card p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 border border-slate-100">
                      {course.skill === 'DBMS' && <Database className="w-4 h-4 text-[#0F4C47]" />}
                      {course.skill === 'DSA' && <Binary className="w-4 h-4 text-amber-700]" />}
                      {course.skill === 'Electrical Works' && <Zap className="w-4 h-4 text-emerald-700" />}
                      {course.skill === 'Backend' && <Palette className="w-4 h-4 text-purple-700" />}
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${pillStyles}`}>
                      {course.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1 mt-1" title={course.title}>
                    {course.title.split('&')[0]}
                  </h3>

                  {/* Course Progress */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>Course Progress</span>
                      <span className="font-bold text-slate-800">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Latest Score */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-2.5">
                    <span>Latest Score</span>
                    <span className="font-extrabold text-slate-900">{course.latestScore}</span>
                  </div>
                </div>

                {/* Resume Learning Button */}
                <button
                  onClick={() => {
                    if (openCoursePlayer) openCoursePlayer(course.courseId);
                    else if (onSelectCourse) onSelectCourse(course.courseId);
                  }}
                  className="mt-4 w-full py-2 px-3 rounded-xl border border-[#DCE8E3] hover:border-[#0F4C47] text-[#0F4C47] hover:bg-[#F0F6F4] text-xs font-bold transition-colors text-center"
                >
                  Resume Learning
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM ROW: 3 Columns matching reference UI
          1. Performance Overview Area Chart
          2. Skills & Gaps Breakdown
          3. Upcoming Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Col 1: Performance Overview Area Chart */}
        <div className="farming-card p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-base text-slate-900">Performance overview</h3>
            <div className="relative">
              <select
                value={filterDomain}
                onChange={(e) => setFilterDomain(e.target.value)}
                className="text-xs font-semibold text-slate-700 bg-[#F5F8F7] border border-[#DCE8E3] rounded-lg px-2.5 py-1 outline-none cursor-pointer"
              >
                <option value="All">Reading ⌵</option>
                <option value="DBMS">DBMS / SQL</option>
                <option value="DSA">DSA Logic</option>
                <option value="Electrical">Electrical</option>
              </select>
            </div>
          </div>

          {/* Area Chart with SVG Curves */}
          <div className="relative h-44 w-full mt-2">
            <svg viewBox="0 0 320 140" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0F4C47" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#0F4C47" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="20" y1="20" x2="300" y2="20" stroke="#E2ECE8" strokeDasharray="3 3" />
              <line x1="20" y1="50" x2="300" y2="50" stroke="#E2ECE8" strokeDasharray="3 3" />
              <line x1="20" y1="80" x2="300" y2="80" stroke="#E2ECE8" strokeDasharray="3 3" />
              <line x1="20" y1="110" x2="300" y2="110" stroke="#E2ECE8" strokeDasharray="3 3" />

              {/* Y Axis Labels */}
              <text x="0" y="24" className="text-[9px] fill-slate-400">100%</text>
              <text x="5" y="54" className="text-[9px] fill-slate-400">75%</text>
              <text x="5" y="84" className="text-[9px] fill-slate-400">50%</text>
              <text x="5" y="114" className="text-[9px] fill-slate-400">25%</text>
              <text x="10" y="138" className="text-[9px] fill-slate-400">0%</text>

              {/* Smooth Area Wave */}
              <path
                d="M30 110 C 60 95, 90 35, 130 30 C 160 25, 180 60, 210 50 C 240 40, 270 70, 300 60 L 300 130 L 30 130 Z"
                fill="url(#areaGradient)"
              />

              {/* Wave Stroke */}
              <path
                d="M30 110 C 60 95, 90 35, 130 30 C 160 25, 180 60, 210 50 C 240 40, 270 70, 300 60"
                fill="none"
                stroke="#0F4C47"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Friday Peak Highlight Pin ("70%") */}
              <line x1="210" y1="50" x2="210" y2="130" stroke="#0F4C47" strokeWidth="2" strokeDasharray="2 2" />
              <circle cx="210" cy="50" r="5" fill="#0F4C47" stroke="#FFFFFF" strokeWidth="2" />
            </svg>

            {/* Pin Badge "70%" */}
            <div className="absolute left-[62%] top-[14%] -translate-x-1/2 bg-[#0F4C47] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
              70%
            </div>

            {/* Day Labels Mon-Sun */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-4 mt-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`transition-colors ${selectedDay === day ? 'font-bold text-[#0F4C47]' : 'hover:text-slate-700'}`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: Skills & Gaps Breakdown */}
        <div className="farming-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-slate-900">Skills & Gaps</h3>
              <button
                onClick={() => setActiveTab('analytics')}
                className="text-[11px] font-semibold text-[#0F4C47] hover:underline"
              >
                Detailed Gap Map →
              </button>
            </div>

            {/* Strengths List (Green) */}
            <div className="space-y-2">
              <div className="text-[11px] uppercase font-bold text-teal-700 tracking-wider">Strengths</div>
              {currentUser.skillsBreakdown?.strengths?.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-medium text-slate-800 truncate">{s.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({s.category})</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-16 sm:w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#0F4C47] h-full rounded-full"
                        style={{ width: `${s.percent}%` }}
                      ></div>
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 w-7 text-right">{s.percent}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Weaknesses List (Red/Coral) */}
            <div className="space-y-2 mt-4 pt-3 border-t border-slate-100">
              <div className="text-[11px] uppercase font-bold text-rose-600 tracking-wider">Skill Gaps & Weaknesses</div>
              {currentUser.skillsBreakdown?.weaknesses?.map((w, idx) => (
                <div key={idx} className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-medium text-slate-800 truncate">{w.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({w.category})</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-16 sm:w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-rose-500 h-full rounded-full"
                        style={{ width: `${w.percent}%` }}
                      ></div>
                    </div>
                    <span className="text-[11px] font-bold text-rose-600 w-7 text-right">{w.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('analytics')}
            className="mt-3 w-full py-2 rounded-xl bg-[#E2F1ED] hover:bg-[#D3EAE3] text-[#0F4C47] text-xs font-bold transition-colors text-center"
          >
            Target Career Gap Analysis
          </button>
        </div>

        {/* Col 3: Upcoming Tests - Deep Teal Card Matching Reference */}
        <div className="p-5 rounded-2xl bg-[#093A36] text-white flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-base text-white">Upcoming Test</h3>
              <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded-full text-teal-200">
                4 Scheduled
              </span>
            </div>

            <div className="space-y-2.5">
              {currentUser.upcomingTests?.map((test) => (
                <div
                  key={test.id}
                  onClick={onOpenAssessment}
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-between gap-3 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-teal-200">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-white truncate">{test.title}</h4>
                      <p className="text-[10px] text-teal-200/80 mt-0.5">
                        {test.date} • {test.duration}
                      </p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 hover:bg-white/20">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onOpenAssessment}
            className="mt-4 w-full py-2 px-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-[#093A36] font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Start Practice Assessment</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
