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
  Briefcase,
  Trophy,
  AlertTriangle,
  ShieldCheck,
  MapPin,
  Building,
  GraduationCap,
  Bookmark,
  DollarSign,
  Lock,
  Code
} from 'lucide-react';

export const LearnerDashboard = ({ onOpenAssessment, onSelectCourse }) => {
  const {
    currentUser,
    learnerCompletion,
    setActiveTab,
    updateCourseProgress,
    openCoursePlayer,
    recoverySession,
    jobs,
    savedJobIds,
    toggleSaveJob,
    applyToJob,
    courses,
    enrollInCourse,
    openProfileWizard,
    loadDemoLearner,
    loadFreshLearner
  } = useApp();

  const userTargetRole = currentUser?.customTargetRole || currentUser?.targetRole || 'Software Developer';
  const isElectricalRole = userTargetRole.toLowerCase().includes('electrical') || userTargetRole.toLowerCase().includes('electrician');
  const isProfileLocked = (learnerCompletion?.percentage || 0) < 100;

  // Filter courses available for user: If not electrical role, do NOT show electrical courses
  const filteredAvailableCourses = (courses || []).filter((c) => {
    if (!isElectricalRole && (c.skillId === 'electrical' || c.skill === 'Electrical Works')) {
      return false;
    }
    return true;
  });

  const isNewLearner = Boolean(currentUser?.isNewUser) || 
    ((!currentUser?.activeCourses || currentUser.activeCourses.length === 0) && (!currentUser?.attendanceSummary || currentUser.attendanceSummary?.totalSessions === 0));

  const isUserMasked = currentUser?.leaderboardStatus !== 'ACTIVE';

  const [filterDomain, setFilterDomain] = useState('All');
  const [selectedDay, setSelectedDay] = useState('Fri');
  const [showAttendanceHistoryModal, setShowAttendanceHistoryModal] = useState(false);

  // Attendance calculation for active learners
  const attendance = currentUser.attendanceSummary?.overallPercentage ?? 80;
  const presentSessions = currentUser.attendanceSummary?.presentSessions ?? 40;
  const totalSessions = currentUser.attendanceSummary?.totalSessions ?? 50;
  const absentSessions = totalSessions - presentSessions;

  // Donut SVG parameters
  const size = 110;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const presentOffset = circumference - (attendance / 100) * circumference;

  // -------------------------------------------------------------
  // FRESH DASHBOARD FOR NEW ENROLLED LEARNERS:
  // Shows ONLY Profile Completion and Available Courses
  // No fake 80% attendance or inactive recovery challenges!
  // -------------------------------------------------------------
  if (isNewLearner) {
    return (
      <div className="space-y-6 pb-16 md:pb-6 max-w-7xl mx-auto animate-in fade-in duration-200">
        {/* Top Header Controls / Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F4C47] flex items-center justify-center font-bold text-xs border border-teal-200">
              🌱
            </div>
            <div>
              <span className="text-xs font-black text-slate-800">Fresh Enrollee Dashboard</span>
              <p className="text-[11px] text-slate-500">
                You are enrolled as a new learner. Complete your profile and enroll in courses to begin tracking your live learning progress.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-[11px] font-semibold text-slate-500">Demo Toggle:</span>
            <button
              onClick={loadDemoLearner}
              className="px-2.5 py-1 rounded-lg border border-slate-200 hover:border-teal-600 text-[11px] font-bold text-slate-700 hover:text-[#0F4C47] transition-colors cursor-pointer bg-slate-50"
              title="Preview sample senior learner dashboard (Rohan Sharma)"
            >
              View Senior Student Demo →
            </button>
          </div>
        </div>

        {/* 1. FRESH LEARNER HERO GREETING BANNER */}
        <div className="farming-hero p-6 sm:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between shadow-md">
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
            </svg>
          </div>

          <div>
            <div className="text-xs font-semibold text-teal-200 tracking-wide mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Account Activated • Enrolled Today</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome, {currentUser.name?.split(' ')[0] || 'Learner'}!
            </h1>
            <p className="text-xs sm:text-sm text-teal-100/90 max-w-xl mt-1.5 leading-relaxed">
              Your learning journey begins here. Complete your learner profile to unlock personalized course recommendations, and enroll in your first course from the catalog below.
            </p>
          </div>

          {/* Quick Info Badges */}
          <div className="mt-6 flex flex-wrap items-center gap-3 relative z-10">
            <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-white text-xs">
              <span className="font-bold text-teal-200">Target Role:</span>
              <span className="font-black text-white">{currentUser.customTargetRole || currentUser.targetRole || 'Software Developer'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-white text-xs">
              <span className="font-bold text-teal-200">Current Location:</span>
              <span className="font-black text-white">{currentUser.city || currentUser.state || 'India'}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20 text-white text-xs">
              <span className="font-bold text-teal-200">Active Courses:</span>
              <span className="font-bold text-white">0 Enrolled</span>
            </div>

            <button
              onClick={() => openProfileWizard('learner', 1)}
              className="ml-auto bg-white text-[#0F4C47] hover:bg-teal-50 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 hover:scale-[1.02] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>Complete Profile Now →</span>
            </button>
          </div>
        </div>

        {/* 2. PROFILE COMPLETION CALLOUT */}
        <ProfileCompletionCard role="learner" />

        {/* 3. AVAILABLE COURSES SECTION (For New Learner to Enroll) */}
        <div className="farming-card p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
                <BookOpen className="w-4 h-4" />
                <span>Course Catalog for New Learners</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                Available Courses for Enrollment
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Choose from foundational and industry-aligned courses. Enroll for 100% free to start building job-ready skills.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">{filteredAvailableCourses?.length || 0} Courses Available</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredAvailableCourses?.map((course) => {
              const isEnrolled = currentUser.activeCourses?.some((c) => c.courseId === course.id);
              return (
                <div
                  key={course.id}
                  className="farming-card p-4 border border-slate-200 hover:border-[#0F4C47] flex flex-col justify-between transition-all hover:shadow-md group bg-white"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-50 text-[#0F4C47] border border-teal-200">
                        {course.tag || course.skill || 'Foundation'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        {course.duration || '40 Hours'}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 leading-snug group-hover:text-[#0F4C47] transition-colors line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                      {course.description || 'Comprehensive industry-aligned curriculum designed for hands-on mastery.'}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                      <span className="flex items-center gap-1 font-semibold">
                        <Clock className="w-3 h-3 text-teal-600" />
                        <span>{course.modulesCount || 8} Modules</span>
                      </span>
                      <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        100% Free
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    {isEnrolled ? (
                      <button
                        onClick={() => {
                          if (openCoursePlayer) openCoursePlayer(course.id);
                          else if (onSelectCourse) onSelectCourse(course.id);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-teal-50 border border-teal-300 text-[#0F4C47] font-extrabold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer hover:bg-teal-100"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                        <span>Enrolled • Start Learning</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => enrollInCourse(course.id)}
                        className="w-full py-2 px-3 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs hover:scale-[1.01] cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Enroll Now (Free)</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // ACTIVE / SENIOR LEARNER DASHBOARD (Full Analytics & Attendance)
  // -------------------------------------------------------------
  return (
    <div className="space-y-6 pb-16 md:pb-6 max-w-7xl mx-auto animate-in fade-in duration-200">
      {/* Top Demo Toggle Bar for active learner */}
      <div className="flex items-center justify-between bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-500">
        <span className="font-semibold text-slate-700">Senior Student Demo View (Active Student)</span>
        <button
          onClick={loadFreshLearner}
          className="text-xs font-bold text-teal-700 hover:underline cursor-pointer"
        >
          Switch to Fresh Enrollee View →
        </button>
      </div>
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

            {/* Current Rank Badge - Clicking opens Leaderboard or Recovery */}
            <button
              onClick={() => {
                if (isUserMasked) setActiveTab('masking');
                else setActiveTab('leaderboard');
              }}
              className="flex items-center gap-3 bg-white/12 hover:bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 transition-all text-left cursor-pointer hover:scale-[1.02]"
              title={isUserMasked ? 'Click to Get Back on Track and restore rank' : 'Click to view student leaderboard'}
            >
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
                {isUserMasked ? <Trophy className="w-4 h-4 text-amber-300" /> : <Award className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-[10px] uppercase font-semibold text-teal-200">
                  {isUserMasked ? 'Rank (Masked)' : 'Current Rank'}
                </div>
                <div className="text-lg font-extrabold text-white flex items-center gap-1.5">
                  <span>{isUserMasked ? 'Inactive' : currentUser.currentRank || 'Top 4%'}</span>
                  {isUserMasked && (
                    <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded-md">
                      Recover →
                    </span>
                  )}
                </div>
              </div>
            </button>

            {/* Take Assessment Primary CTA with Lock awareness */}
            <button
              onClick={onOpenAssessment}
              className={`ml-auto px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer ${
                isProfileLocked
                  ? 'bg-amber-100/90 text-amber-950 border border-amber-300 hover:bg-amber-200'
                  : 'bg-white text-[#0F4C47] hover:bg-teal-50 hover:scale-[1.02]'
              }`}
              title={isProfileLocked ? 'Profile must be 100% complete to unlock skill assessment' : 'Take standardized capability evaluation'}
            >
              {isProfileLocked ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-800" />
                  <span>Assessment Locked ({learnerCompletion?.percentage || 0}%)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>Take Skill Assessment</span>
                </>
              )}
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

          {/* Date Selector Indicator - Clickable Modal Trigger */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setShowAttendanceHistoryModal(true)}
              className="flex items-center gap-2 text-xs font-semibold text-slate-700 hover:text-[#0F4C47] transition-colors cursor-pointer group"
              title="Click to view detailed session log & punch records"
            >
              <Calendar className="w-3.5 h-3.5 text-teal-600 group-hover:scale-110 transition-transform" />
              <span>April-25-2026</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
            </button>
            <span className="text-[11px] text-slate-500 font-semibold">{presentSessions}/{totalSessions} sessions</span>
          </div>
        </div>
      </div>

      {/* GET BACK ON TRACK CALLOUT CARD (Visible when learner is inactive/masked) */}
      {isUserMasked && (
        <div className="farming-card p-5 sm:p-6 bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-[#0F4C47]/10 border-2 border-amber-300 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-sm shrink-0">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md">
                  Recovery Challenges Waiting
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  Leaderboard Status: Currently Inactive
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                GET BACK ON TRACK
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                You have recovery challenges waiting for you. Complete them to return to the active leaderboard.
              </p>
              <div className="flex items-center gap-3 text-xs font-bold text-[#0F4C47] mt-2">
                <span>{recoverySession?.completedCount || 0} / {recoverySession?.totalRequired || 4} completed</span>
                <span>•</span>
                <span className="text-amber-800">
                  {recoverySession?.deadlineAt
                    ? `${Math.max(0, Math.ceil((new Date(recoverySession.deadlineAt) - new Date()) / (1000 * 60 * 60 * 24)))} days remaining`
                    : '14 days remaining'}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('masking')}
            className="px-5 py-2.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white font-extrabold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 self-start sm:self-auto hover:scale-[1.02] shrink-0"
          >
            <span>Continue Recovery →</span>
          </button>
        </div>
      )}

      {/* PROFILE COMPLETION CALLOUT */}
      <ProfileCompletionCard role="learner" />

      {/* TARGET CAREER & STUDY LOCATION ROADMAP CARD */}
      <div className="farming-card p-5 sm:p-6 bg-white border border-teal-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0F4C47] border border-teal-200 flex items-center justify-center text-xl shrink-0 shadow-xs">
            🎯
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-black tracking-wider bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md border border-teal-200">
                Target Career Destination
              </span>
              {currentUser.digiLockerLinked ? (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  DigiLocker Verified ({currentUser.digiLockerId || 'DL-2026-KA-99481'})
                </span>
              ) : (
                <button
                  onClick={() => setActiveTab('settings')}
                  className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 hover:bg-amber-100 transition-colors"
                >
                  ⚡ Connect DigiLocker Identity
                </button>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-tight">
              {currentUser.customTargetRole || currentUser.targetRole || 'Full Stack Web Developer'}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1.5 font-medium">
              <span className="flex items-center gap-1 text-slate-700">
                <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                <strong>Study / Training:</strong> {currentUser.studyLocation?.institution || 'Government Technical Training Centre'}, {currentUser.studyLocation?.city || 'Pune'}
              </span>
              <span className="flex items-center gap-1 text-slate-700">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <strong>Wage Target:</strong> ₹{((currentUser.targetWage || 650000) / 100000).toFixed(1)} LPA
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => setActiveTab('jobs')}
            className="px-4 py-2.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Discover Matched Jobs</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all"
            title="Edit target role and location in settings"
          >
            Edit Goal
          </button>
        </div>
      </div>

      {/* RECOMMENDED CAREER OPPORTUNITIES (PRIVATE & GOVT) */}
      <div className="farming-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Direct Hiring Pipeline</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Recommended Career Opportunities
            </h3>
            <p className="text-xs text-slate-500">
              Verified corporate openings and official government posts matching your certified skill profile.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('jobs')}
            className="text-xs font-bold text-[#0F4C47] hover:underline flex items-center gap-1"
          >
            <span>Explore All Openings ({jobs?.length || 5})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobs?.slice(0, 3).map((job) => {
            const isSaved = savedJobIds?.includes(job.id);
            return (
              <div
                key={job.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-[#0F4C47] bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      job.type === 'GOVT' 
                        ? 'bg-amber-100 text-amber-900 border border-amber-200'
                        : 'bg-teal-50 text-[#0F4C47] border border-teal-200'
                    }`}>
                      {job.type === 'GOVT' ? '🏛️ Official Govt Post' : '🏢 Private Tech & Core'}
                    </span>
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isSaved ? 'text-amber-600 bg-amber-50' : 'text-slate-400 hover:text-slate-700'
                      }`}
                      title={isSaved ? 'Saved to bookmarks' : 'Save job'}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 leading-snug line-clamp-1">{job.title}</h4>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{job.company} • {job.location}</div>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#0F4C47]">{job.wage}</span>
                    <span className="font-bold text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {job.matchScore || 90}% Match
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('jobs')}
                    className="flex-1 py-1.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold text-center transition-colors"
                  >
                    View & Apply
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MIDDLE ROW: Active Courses Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900">Enrolled Courses & Active Progress</h2>
          <button
            onClick={() => setActiveTab('course')}
            className="text-xs font-semibold text-[#0F4C47] hover:underline cursor-pointer"
          >
            View All Courses →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(currentUser.activeCourses || [])
            .filter((course) => {
              if (!isElectricalRole && (course.skill === 'Electrical Works' || course.skillId === 'electrical')) {
                return false;
              }
              return true;
            })
            .map((course) => {
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
              <div key={course.courseId} className="farming-card p-4 flex flex-col justify-between hover:border-teal-300 transition-all">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 border border-slate-100">
                      {course.skill === 'DBMS' && <Database className="w-4 h-4 text-[#0F4C47]" />}
                      {course.skill === 'DSA' && <Binary className="w-4 h-4 text-amber-700" />}
                      {course.skill === 'Electrical Works' && <Zap className="w-4 h-4 text-emerald-700" />}
                      {course.skill === 'Backend' && <Palette className="w-4 h-4 text-purple-700" />}
                      {course.skill === 'Web Development' && <Code className="w-4 h-4 text-teal-700" />}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${pillStyles}`}>
                        {course.category}
                      </span>
                      <span className="font-mono text-[9px] text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 font-bold">
                        {course.enrollmentId || 'ENR-2026-08112'}
                      </span>
                    </div>
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
                  className="mt-4 w-full py-2 px-3 rounded-xl border border-[#DCE8E3] hover:border-[#0F4C47] text-[#0F4C47] hover:bg-[#F0F6F4] text-xs font-bold transition-colors text-center cursor-pointer"
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
                <option value="All">All Domains ⌵</option>
                <option value="Software">Software Engineering</option>
                <option value="DBMS">DBMS / SQL</option>
                <option value="DSA">DSA Logic</option>
                {isElectricalRole && <option value="Electrical">Electrical Works</option>}
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
            className="mt-4 w-full py-2 px-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-[#093A36] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Practice Assessment</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ATTENDANCE RECORD MODAL (TRIGGERED BY DATE SELECTOR) */}
      {showAttendanceHistoryModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-700" />
                <h3 className="font-extrabold text-base text-slate-900">
                  Biometric Attendance & Session Logs
                </h3>
              </div>
              <button
                onClick={() => setShowAttendanceHistoryModal(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="flex items-center justify-between bg-teal-50/70 p-4 rounded-2xl border border-teal-100">
                <div>
                  <div className="text-[10px] uppercase font-black text-teal-700">Official Record</div>
                  <div className="text-xl font-black text-[#0F4C47]">{attendance}% Logged Present</div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    {presentSessions} Present • {totalSessions - presentSessions} Absent of {totalSessions} scheduled lectures
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white text-[#0F4C47] flex items-center justify-center font-black text-sm border border-teal-200 shadow-2xs">
                  {presentSessions}/{totalSessions}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-700 mb-2">Recent Session Audit:</div>
                <div className="space-y-2">
                  {[
                    { date: 'Today, 18 Sep 2026', time: '09:30 AM', status: 'Present', mode: 'Biometric Verified', ok: true },
                    { date: 'Yesterday, 17 Sep 2026', time: '09:28 AM', status: 'Present', mode: 'RFID Reader #4', ok: true },
                    { date: '16 Sep 2026', time: '09:35 AM', status: 'Present', mode: 'Biometric Verified', ok: true },
                    { date: '15 Sep 2026', time: '—', status: 'Absent', mode: 'Excused Leave (Medical)', ok: false },
                    { date: '14 Sep 2026', time: '09:25 AM', status: 'Present', mode: 'Biometric Verified', ok: true }
                  ].map((rec, rIdx) => (
                    <div key={rIdx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50 text-xs">
                      <div>
                        <div className="font-bold text-slate-800">{rec.date}</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">{rec.time} • {rec.mode}</div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        rec.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {rec.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
              <button
                onClick={() => setShowAttendanceHistoryModal(false)}
                className="px-5 py-2 rounded-xl bg-[#0F4C47] text-white text-xs font-bold hover:bg-[#0A3632] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
