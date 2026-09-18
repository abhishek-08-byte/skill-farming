import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  RotateCcw,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Play,
  Check,
  X,
  Code2,
  Database,
  Binary,
  Zap,
  Award,
  ChevronRight,
  ShieldAlert,
  Flame,
  FileCode,
  Terminal,
  RefreshCw,
  Sliders,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RecoveryView = ({ onGoToLeaderboard, onGoToDashboard }) => {
  const {
    currentUser,
    recoverySession,
    submitRecoveryAssignment,
    completeRecoverySession,
    simulateInactivity,
    simulateActiveStatus,
    fastForwardDeadline,
    resetRecoverySession,
    setActiveTab,
    inactivityThresholdDays,
    setInactivityThresholdDays
  } = useApp();

  const [activeChallengeId, setActiveChallengeId] = useState(null);
  const [editorCode, setEditorCode] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [showTesterToolbar, setShowTesterToolbar] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  // Calculate live 14-day countdown
  useEffect(() => {
    const updateCountdown = () => {
      if (!recoverySession?.deadlineAt) return;
      const deadline = new Date(recoverySession.deadlineAt).getTime();
      const now = new Date().getTime();
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining({ days, hours, minutes, seconds, isExpired: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [recoverySession?.deadlineAt]);

  const userTargetRole = currentUser?.customTargetRole || currentUser?.targetRole || 'Software Developer';
  const isElectricalRole = userTargetRole.toLowerCase().includes('electrical') || userTargetRole.toLowerCase().includes('electrician');

  const rawAssignments = recoverySession?.assignments || [];
  // Strictly filter out electrical challenges for software/data/cloud users
  const assignments = rawAssignments.filter((a) => {
    if (!isElectricalRole && (a.skillId === 'electrical' || a.id === 'rec-elec-loto')) {
      return false;
    }
    return true;
  });

  const completedCount = assignments.filter(a => a.status === 'COMPLETED').length;
  const totalRequired = assignments.length || 3;
  const progressPercent = Math.round((completedCount / (totalRequired || 1)) * 100);
  const isAllCompleted = completedCount >= totalRequired;

  const currentChallenge = assignments.find((a) => a.id === activeChallengeId);

  // When opening a challenge
  const handleOpenChallenge = (challenge) => {
    setActiveChallengeId(challenge.id);
    setEditorCode(challenge.submittedCode || challenge.starterCode);
    setTestResults(challenge.testResults || null);
  };

  // Run deterministic tests
  const handleRunTests = () => {
    if (!currentChallenge) return;
    setIsRunningTests(true);

    setTimeout(() => {
      const results = currentChallenge.testCases.map((tc) => {
        try {
          const res = tc.validate(editorCode);
          return {
            id: tc.id,
            title: tc.title,
            passed: res.passed,
            message: res.message
          };
        } catch (err) {
          return {
            id: tc.id,
            title: tc.title,
            passed: false,
            message: `Evaluation Error: ${err.message}`
          };
        }
      });

      setTestResults(results);
      setIsRunningTests(false);

      const allPassed = results.every((r) => r.passed);
      if (allPassed) {
        try {
          confetti({
            particleCount: 50,
            spread: 50,
            origin: { y: 0.6 }
          });
        } catch (e) {
          // ignore
        }
      }
    }, 450);
  };

  // Submit challenge solution
  const handleSubmitChallenge = () => {
    if (!currentChallenge) return;
    let resultsToSave = testResults;

    if (!resultsToSave) {
      resultsToSave = currentChallenge.testCases.map((tc) => {
        const res = tc.validate(editorCode);
        return {
          id: tc.id,
          title: tc.title,
          passed: res.passed,
          message: res.message
        };
      });
      setTestResults(resultsToSave);
    }

    submitRecoveryAssignment(currentChallenge.id, editorCode, resultsToSave);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-24 md:pb-8 animate-in fade-in duration-200">
      {/* DEVELOPER SIMULATION TOOLBAR (For seamless evaluation & testing) */}
      <div className="farming-card p-3 sm:p-4 bg-teal-950/5 border-teal-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#0F4C47]" />
            <span className="text-xs font-bold text-slate-800">
              Recovery Evaluation Toolbar:
            </span>
            <span className="text-[11px] text-slate-500 hidden lg:inline">
              Simulate inactivity states, test deadline counters, and verify leaderboard reintegration.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => simulateInactivity(21)}
              className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[11px] transition-colors flex items-center gap-1"
              title="Sets last active to 21 days ago, triggering Masked status"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Simulate 21d Inactive</span>
            </button>

            <button
              onClick={() => fastForwardDeadline(2)}
              className="px-2.5 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-[11px] transition-colors flex items-center gap-1"
              title="Sets deadline to 2 hours from now to test urgent timer countdown"
            >
              <Clock className="w-3 h-3" />
              <span>Fast-Forward (2h Left)</span>
            </button>

            <button
              onClick={simulateActiveStatus}
              className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-[11px] transition-colors flex items-center gap-1"
              title="Simulates an active user who has recovered"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Simulate Active</span>
            </button>

            <button
              onClick={resetRecoverySession}
              className="px-2 py-1 rounded-lg text-slate-600 hover:bg-slate-200/70 font-semibold text-[11px] transition-colors flex items-center gap-1"
              title="Reset recovery challenges to initial state"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* RECOVERY HEADER & HERO BANNER */}
      <div className="farming-hero p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-lg">
        {/* Subtle decorative background waves */}
        <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none transform translate-x-12 translate-y-8">
          <svg width="340" height="240" viewBox="0 0 340 240" fill="none">
            <path
              d="M0 120 C 60 40, 140 180, 220 80 C 270 20, 310 140, 360 90 L 360 240 L 0 240 Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-teal-200 text-xs font-bold mb-3 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              <span>Skill Recovery Mode</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              Get Back on Track
            </h1>
            <p className="text-sm sm:text-base text-teal-100/95 mt-2 leading-relaxed">
              Refresh your skills and complete your recovery challenges to return to the active leaderboard.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-teal-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Completed courses preserved</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Previous points intact ({currentUser.leaderboardPoints || 850} pts)</span>
              </span>
            </div>
          </div>

          {/* 14-DAY LIVE COUNTDOWN CARD */}
          <div className="farming-card bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-white min-w-[280px] sm:min-w-[320px] shadow-md">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/15">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-200">
                <Clock className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>14-Day Recovery Window</span>
              </div>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                Live Window
              </span>
            </div>

            {/* Countdown Digits */}
            <div className="grid grid-cols-4 gap-2 text-center mt-3.5">
              <div className="bg-black/25 rounded-xl p-2 border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-white">
                  {timeRemaining.days}
                </div>
                <div className="text-[10px] uppercase font-semibold text-teal-200 mt-0.5">
                  Days
                </div>
              </div>
              <div className="bg-black/25 rounded-xl p-2 border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-white">
                  {timeRemaining.hours}
                </div>
                <div className="text-[10px] uppercase font-semibold text-teal-200 mt-0.5">
                  Hours
                </div>
              </div>
              <div className="bg-black/25 rounded-xl p-2 border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-white">
                  {timeRemaining.minutes}
                </div>
                <div className="text-[10px] uppercase font-semibold text-teal-200 mt-0.5">
                  Mins
                </div>
              </div>
              <div className="bg-black/25 rounded-xl p-2 border border-white/10">
                <div className="text-xl sm:text-2xl font-black text-amber-300">
                  {timeRemaining.seconds}
                </div>
                <div className="text-[10px] uppercase font-semibold text-teal-200 mt-0.5">
                  Secs
                </div>
              </div>
            </div>

            <div className="text-center text-[11px] text-teal-100/80 mt-3">
              {timeRemaining.isExpired ? (
                <span className="text-rose-300 font-bold">
                  Window expired. You may still complete challenges to recover!
                </span>
              ) : (
                <span>
                  {timeRemaining.days} days and {timeRemaining.hours} hours remaining to retain recovery streak
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* OVERALL RECOVERY PROGRESS & LEADERBOARD STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Recovery Progress Bar & Stats */}
        <div className="lg:col-span-2 farming-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Recovery Progress
                </h3>
                <p className="text-xs text-slate-500">
                  Complete all {totalRequired} adaptive challenges to reinstate active leaderboard rank.
                </p>
              </div>
              <span className="text-lg font-black text-[#0F4C47] self-start sm:self-auto">
                {progressPercent}%
              </span>
            </div>

            {/* Custom Segmented Progress Bar */}
            <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200/70">
              <div
                className="bg-gradient-to-r from-[#0F4C47] to-[#14B8A6] h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mt-3">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-700" />
                <span>
                  <strong className="text-slate-900">{completedCount}</strong> of{' '}
                  <strong className="text-slate-900">{totalRequired}</strong> challenges completed
                </span>
              </div>
              <span className="text-slate-500">
                {totalRequired - completedCount} challenges remaining
              </span>
            </div>
          </div>

          {/* Quick Guidance Alert */}
          <div className="mt-5 p-3.5 rounded-2xl bg-[#E2F1ED]/60 border border-[#CDE5DC] flex items-start gap-3 text-xs text-teal-900">
            <Sparkles className="w-4 h-4 text-[#0F4C47] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Adaptive Challenge Mapping:</span> These tasks evaluate key competencies from your completed courses in <strong>DBMS</strong>, <strong>DSA</strong>, and <strong>Electrical Maintenance</strong>.
            </div>
          </div>
        </div>

        {/* Right 1 Col: Leaderboard Status Card */}
        <div className="farming-card p-6 flex flex-col justify-between border-teal-200 bg-gradient-to-br from-white to-[#F5F8F7]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-slate-900">Leaderboard Status</h3>
              <span
                className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                  currentUser.leaderboardStatus === 'ACTIVE'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800 animate-pulse'
                }`}
              >
                {currentUser.leaderboardStatus === 'ACTIVE' ? 'ACTIVE' : 'CURRENTLY INACTIVE'}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Saved Standing:</span>
                <span className="font-extrabold text-slate-900">Top 4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Preserved Points:</span>
                <span className="font-extrabold text-[#0F4C47]">{currentUser.leaderboardPoints || 850} pts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Recovery Bonus:</span>
                <span className="font-bold text-emerald-600">+150 pts upon completion</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
              {currentUser.leaderboardStatus === 'ACTIVE' ? (
                <span className="text-emerald-700 font-semibold">
                  ✓ Your recovery is complete! You are now active on the public leaderboard.
                </span>
              ) : (
                'You are temporarily hidden from the active roster. Finish your recovery challenges to reinstate your position immediately.'
              )}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className="mt-4 w-full py-2.5 px-3 rounded-xl border border-[#0F4C47] text-[#0F4C47] hover:bg-[#0F4C47] hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <span>View Public Leaderboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* RECOVERY CHALLENGES LIST / GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Your Recovery Challenges
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Practical problem solving, debugging, and verification tasks based on your prior learning.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignments.map((challenge, idx) => {
            const isCompleted = challenge.status === 'COMPLETED';
            const isInProgress = challenge.status === 'IN_PROGRESS';

            return (
              <div
                key={challenge.id}
                className={`farming-card p-5 flex flex-col justify-between transition-all ${
                  isCompleted
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'hover:border-[#0F4C47]'
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-8 h-8 rounded-xl bg-[#E2F1ED] flex items-center justify-center text-[#0F4C47]">
                        {challenge.skillId === 'dbms' && <Database className="w-4 h-4" />}
                        {challenge.skillId === 'dsa' && <Binary className="w-4 h-4" />}
                        {challenge.skillId === 'electrical' && <Zap className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-bold text-[#0F4C47] px-2.5 py-0.5 rounded-full bg-[#E2F1ED]">
                        {challenge.skillName}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 px-2 py-0.5 rounded-full bg-slate-100">
                        {challenge.difficulty}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <div>
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          <Check className="w-3 h-3" />
                          <span>Completed</span>
                        </span>
                      ) : isInProgress ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          <span>In Progress</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          Ready to Start
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Concept */}
                  <h3 className="font-extrabold text-base text-slate-900 mt-1 leading-snug">
                    {challenge.title}
                  </h3>
                  <div className="text-xs text-teal-800 font-semibold mt-1">
                    Concept: {challenge.concept}
                  </div>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {challenge.problemStatement}
                  </p>

                  {/* Course Context */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-3 pt-3 border-t border-slate-100">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span className="truncate">{challenge.courseTitle}</span>
                  </div>
                </div>

                {/* Bottom Action & Score */}
                <div className="mt-4 pt-3 flex items-center justify-between gap-3">
                  <div className="text-xs">
                    {isCompleted ? (
                      <span className="font-extrabold text-emerald-700">
                        Score: {challenge.score}/100 • 1st Attempt
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">
                        ~{challenge.estimatedMinutes || 20} mins • Deterministic checks
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleOpenChallenge(challenge)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isCompleted
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : isInProgress
                        ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                        : 'bg-[#0F4C47] hover:bg-[#0A3632] text-white shadow-xs'
                    }`}
                  >
                    <span>
                      {isCompleted ? 'Review Solution' : isInProgress ? 'Continue' : 'Start Challenge'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHALLENGE SOLVER MODAL */}
      {currentChallenge && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200 overflow-y-auto">
          <div
            className="bg-white rounded-3xl w-full max-w-5xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#F8FAF9] border-b border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E2F1ED] text-[#0F4C47] flex items-center justify-center">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#0F4C47] bg-[#E2F1ED] px-2 py-0.5 rounded-full">
                      {currentChallenge.skillName}
                    </span>
                    <span className="text-xs font-medium text-slate-500">
                      {currentChallenge.courseTitle}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                    {currentChallenge.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setActiveChallengeId(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                title="Close Solver"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Split Pane Problem & Interactive Code Editor */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
              {/* Left Column (5 cols): Problem Statement & Instructions */}
              <div className="lg:col-span-5 p-5 sm:p-6 overflow-y-auto space-y-4 bg-white text-xs">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 mb-1.5">
                    Problem Statement
                  </h4>
                  <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                    {currentChallenge.problemStatement}
                  </p>
                </div>

                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 mb-1.5">
                    Instructions
                  </h4>
                  <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                    {currentChallenge.instructions?.map((inst, i) => (
                      <li key={i} className="leading-relaxed">
                        {inst}
                      </li>
                    ))}
                  </ul>
                </div>

                {currentChallenge.constraints && (
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 mb-1.5">
                      Constraints & Guidelines
                    </h4>
                    <ul className="space-y-1 list-disc pl-4 text-slate-600">
                      {currentChallenge.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900">
                  <span className="font-bold">Deterministic Evaluation:</span> Code is validated against automated test assertions and runtime performance checks upon clicking "Run Test Cases".
                </div>
              </div>

              {/* Right Column (7 cols): Interactive Code Editor & Test Results */}
              <div className="lg:col-span-7 flex flex-col bg-[#111827] text-white">
                {/* Editor Bar */}
                <div className="px-4 py-2.5 bg-[#0B0F17] border-b border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-teal-400" />
                    <span className="font-mono font-bold text-gray-300">
                      solution_{currentChallenge.skillId}.{currentChallenge.type === 'sql_challenge' ? 'sql' : 'js'}
                    </span>
                  </div>
                  <button
                    onClick={() => setEditorCode(currentChallenge.starterCode)}
                    className="hover:text-white flex items-center gap-1 transition-colors text-[11px]"
                    title="Reset to starter code"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Code</span>
                  </button>
                </div>

                {/* Code Textarea */}
                <div className="flex-1 min-h-[260px] p-3 sm:p-4">
                  <textarea
                    value={editorCode}
                    onChange={(e) => setEditorCode(e.target.value)}
                    spellCheck={false}
                    className="w-full h-full min-h-[240px] bg-transparent text-teal-300 font-mono text-xs sm:text-sm resize-none outline-none leading-relaxed"
                    placeholder="Type or paste your solution here..."
                  />
                </div>

                {/* Test Cases Output Drawer */}
                {testResults && (
                  <div className="p-4 bg-[#0B0F17] border-t border-gray-800 space-y-2 max-h-56 overflow-y-auto">
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-gray-300">Deterministic Test Suite:</span>
                      <span
                        className={
                          testResults.every((t) => t.passed)
                            ? 'text-emerald-400'
                            : 'text-rose-400'
                        }
                      >
                        {testResults.filter((t) => t.passed).length} / {testResults.length} Passed
                      </span>
                    </div>

                    {testResults.map((tc, idx) => (
                      <div
                        key={tc.id || idx}
                        className={`p-2.5 rounded-xl text-xs flex items-start gap-2.5 border ${
                          tc.passed
                            ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-200'
                            : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                        }`}
                      >
                        {tc.passed ? (
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0">
                          <div className="font-bold">{tc.title}</div>
                          <div className="text-[11px] opacity-90 mt-0.5">{tc.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Solver Action Footer */}
                <div className="p-4 bg-[#0B0F17] border-t border-gray-800 flex items-center justify-between gap-3">
                  <button
                    onClick={handleRunTests}
                    disabled={isRunningTests}
                    className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs transition-colors flex items-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 text-teal-400" />
                    <span>{isRunningTests ? 'Running Checks...' : 'Run Test Cases'}</span>
                  </button>

                  <button
                    onClick={handleSubmitChallenge}
                    className="px-5 py-2 rounded-xl bg-[#0F4C47] hover:bg-teal-600 text-white font-bold text-xs transition-all shadow-md flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Solution</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CELEBRATION MODAL ON RECOVERY COMPLETION */}
      {isAllCompleted && currentUser.leaderboardStatus === 'ACTIVE' && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in zoom-in-95 duration-200">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shadow-sm shrink-0">
              🏆
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Skill Recovery Complete! You're Back on the Active Leaderboard
              </h3>
              <p className="text-xs sm:text-sm text-teal-100 mt-1">
                All {totalRequired} recovery challenges successfully demonstrated. Your active ranking has been recalculated to <strong>Top 3%</strong> with <strong>+150 recovery points</strong>.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('leaderboard')}
            className="px-5 py-2.5 rounded-xl bg-white text-emerald-900 font-extrabold text-xs sm:text-sm shadow-md hover:bg-emerald-50 transition-all shrink-0 flex items-center gap-2"
          >
            <span>View Reinstated Rank</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
