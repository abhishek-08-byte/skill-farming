import React, { useState } from 'react';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Bookmark, 
  BookmarkCheck, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  FileText, 
  Search, 
  Filter, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  ChevronRight, 
  X, 
  Send, 
  Award,
  BookOpen,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const JobMarketplaceView = () => {
  const { 
    jobs, 
    currentUser, 
    applications, 
    toggleSaveJob, 
    applyToJob, 
    chatMessages, 
    sendChatMessage,
    calculateJobMatch,
    openProfileWizard
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'private' | 'govt-tech' | 'govt-nontech' | 'saved' | 'applications'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [candidateNote, setCandidateNote] = useState('');
  const [activeChatJob, setActiveChatJob] = useState(null);
  const [chatInput, setChatInput] = useState('');

  const savedJobIds = currentUser?.savedJobIds || [];

  const userTargetRole = currentUser?.customTargetRole || currentUser?.targetRole || 'Software Developer';
  const isElectricalRole = userTargetRole.toLowerCase().includes('electrical') || userTargetRole.toLowerCase().includes('electrician');

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    // If not electrical role, do NOT show electrical maintenance jobs
    if (!isElectricalRole) {
      const isElecJob = job.title?.toLowerCase().includes('electrical') ||
        job.roleCategory?.toLowerCase().includes('electrical') ||
        (job.requiredSkills && job.requiredSkills.some(s => s.toLowerCase().includes('electrical') || s.toLowerCase().includes('loto')));
      if (isElecJob) return false;
    }

    // Search query match
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      (job.requiredSkills && job.requiredSkills.some(s => s.toLowerCase().includes(query)));

    if (!matchesQuery) return false;

    // Filter tab
    if (activeFilter === 'all') return true;
    if (activeFilter === 'private') return job.type === 'private';
    if (activeFilter === 'govt-tech') return job.type === 'government' && job.subType === 'technical';
    if (activeFilter === 'govt-nontech') return job.type === 'government' && job.subType === 'non_technical';
    if (activeFilter === 'saved') return savedJobIds.includes(job.id);
    return true;
  });

  const myApplications = applications.filter(a => a.candidateId === (currentUser?.id || 'learner-talha'));

  // Get application status for a job
  const getJobApplication = (jobId) => {
    return myApplications.find(a => a.jobId === jobId);
  };

  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleConfirmApply = (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    applyToJob(selectedJob.id, candidateNote);
    setIsApplyModalOpen(false);
    setCandidateNote('');
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeChatJob) return;
    sendChatMessage({
      text: chatInput.trim(),
      recipientId: activeChatJob.company,
      recipientName: activeChatJob.recruiterContact || activeChatJob.company,
      jobId: activeChatJob.id,
      conversationId: `conv-${currentUser.id}-${activeChatJob.id}`
    });
    setChatInput('');
  };

  const conversationMessages = activeChatJob 
    ? chatMessages.filter(m => m.jobId === activeChatJob.id || m.conversationId === `conv-${currentUser.id}-${activeChatJob.id}`)
    : [];

  // Pipeline stages
  const STAGES = ['Under Review', 'Shortlisted', 'Corporate Exam', 'Interview', 'Selected'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-teal-900/40 overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Talent Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Career Opportunities & Public Recruitments
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Discover verified private tech roles and official Government examinations (segregated into Technical & Non-Technical) matched dynamically to your skill competencies and verified training credentials.
          </p>

          {/* Quick Stats Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
            <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/10 flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-teal-400" />
              <span><strong>{jobs.filter(j => j.type === 'private').length}</strong> Active Private Roles</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/10 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span><strong>{jobs.filter(j => j.type === 'government').length}</strong> Official Govt Openings</span>
            </div>
            <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur border border-white/10 flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span><strong>{myApplications.length}</strong> Active Applications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Scrollable Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'all'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            All Openings ({jobs.length})
          </button>
          <button
            onClick={() => setActiveFilter('private')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'private'
                ? 'bg-teal-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Private Tech & Core
          </button>
          <button
            onClick={() => setActiveFilter('govt-tech')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'govt-tech'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Govt (Technical)
          </button>
          <button
            onClick={() => setActiveFilter('govt-nontech')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === 'govt-nontech'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            Govt (Non-Technical)
          </button>
          <button
            onClick={() => setActiveFilter('saved')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeFilter === 'saved'
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({savedJobIds.length})</span>
          </button>
          <button
            onClick={() => setActiveFilter('applications')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
              activeFilter === 'applications'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>My Applications ({myApplications.length})</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search role, skills, company..."
            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* MY APPLICATIONS TRACKER TAB */}
      {/* ========================================================= */}
      {activeFilter === 'applications' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 dark:text-white">
              Application Tracking Pipeline ({myApplications.length})
            </h2>
            <span className="text-xs text-slate-500">Live recruitment pipeline status</span>
          </div>

          {myApplications.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <Briefcase className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200">No applications submitted yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Explore open positions and submit your verified application with one click.
              </p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold hover:bg-teal-500 transition-colors"
              >
                Browse All Openings
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {myApplications.map((app) => {
                const job = jobs.find(j => j.id === app.jobId);
                const currentStageIdx = STAGES.indexOf(app.stage);

                return (
                  <div 
                    key={app.id} 
                    className="p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-700/60">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                            {app.company}
                          </span>
                          <span className="text-xs text-slate-400">• Applied on {app.appliedDate}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                          {app.jobTitle}
                        </h3>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                          Current Stage: {app.stage}
                        </span>
                        {job && (
                          <button
                            onClick={() => setActiveChatJob(job)}
                            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Chat Recruiter</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Stepper Pipeline */}
                    <div className="py-4">
                      <div className="grid grid-cols-5 gap-2 text-center">
                        {STAGES.map((stage, idx) => {
                          const isDone = idx < currentStageIdx;
                          const isCurrent = idx === currentStageIdx;

                          return (
                            <div key={stage} className="flex flex-col items-center">
                              <div 
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                  isDone
                                    ? 'bg-emerald-500 text-white'
                                    : isCurrent
                                    ? 'bg-teal-600 text-white ring-4 ring-teal-100 dark:ring-teal-900/40 animate-pulse'
                                    : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                                }`}
                              >
                                {isDone ? '✓' : idx + 1}
                              </div>
                              <span className={`text-[11px] mt-1.5 font-medium leading-tight ${
                                isCurrent ? 'text-teal-600 dark:text-teal-400 font-bold' : 'text-slate-500'
                              }`}>
                                {stage}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Recruiter Notes & Details */}
                    <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                      {app.examStatus && (
                        <div className="flex items-center space-x-2">
                          <strong className="text-slate-800 dark:text-slate-200">Assessment Status:</strong>
                          <span className="text-teal-600 dark:text-teal-400 font-medium">{app.examStatus}</span>
                        </div>
                      )}
                      {app.interviewDate && (
                        <div className="flex items-center space-x-2">
                          <strong className="text-slate-800 dark:text-slate-200">Scheduled Interview:</strong>
                          <span className="text-amber-600 dark:text-amber-400 font-semibold">{app.interviewDate}</span>
                          {app.interviewLink && (
                            <a
                              href={app.interviewLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-teal-600 underline flex items-center space-x-1"
                            >
                              <span>Join Link</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}
                      {app.recruiterNotes && (
                        <div>
                          <strong className="text-slate-800 dark:text-slate-200">Hiring Notes:</strong> {app.recruiterNotes}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* ========================================================= */
        /* JOBS LIST GRID */
        /* ========================================================= */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Showing <strong>{filteredJobs.length}</strong> opportunities</span>
            <span>Sorted by best skill & location match</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredJobs.map((job) => {
              const isSaved = savedJobIds.includes(job.id);
              const application = getJobApplication(job.id);
              const match = calculateJobMatch(job, currentUser);

              const isGovt = job.type === 'government';
              const isGovtTech = isGovt && job.subType === 'technical';
              const isGovtNonTech = isGovt && job.subType === 'non_technical';

              return (
                <div
                  key={job.id}
                  className="p-5 bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-teal-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Company logo & Badges */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start space-x-3">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                        />
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 mb-1">
                            {isGovtTech ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                                GOVT TECHNICAL
                              </span>
                            ) : isGovtNonTech ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                                GOVT NON-TECHNICAL
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                                PRIVATE TECH & CORE
                              </span>
                            )}
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                              {job.experienceLevel}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                            {job.title}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">{job.company}</p>
                        </div>
                      </div>

                      {/* Transparent Match Score Badge */}
                      <div className="text-right shrink-0">
                        <div className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 text-teal-700 dark:text-teal-300 font-bold text-xs">
                          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                          <span>{match.score}% Match</span>
                        </div>
                      </div>
                    </div>

                    {/* Job Details Meta */}
                    <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center space-x-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 truncate">
                        <DollarSign className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate font-semibold text-slate-800 dark:text-slate-100">{job.salaryRange}</span>
                      </div>
                    </div>

                    {/* Required Skills & Match Breakdown */}
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1.5">
                        {job.requiredSkills.map((skill) => {
                          const isMatched = match.matchedSkills.includes(skill);
                          return (
                            <span
                              key={skill}
                              className={`text-[11px] px-2 py-0.5 rounded-md font-medium flex items-center space-x-1 ${
                                isMatched
                                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60'
                                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              <span>{isMatched ? '✓' : '•'} {skill}</span>
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Government specific: Advt No & Exam Date */}
                    {isGovt && (
                      <div className="mt-3 p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 text-[11px] text-blue-900 dark:text-blue-300 space-y-1">
                        <div className="flex items-center justify-between">
                          <span><strong>Advt:</strong> {job.advtNumber}</span>
                          <span><strong>Exam:</strong> {job.examDate}</span>
                        </div>
                        {job.syllabus && (
                          <p className="line-clamp-1 text-slate-500 dark:text-slate-400">
                            <strong>Syllabus:</strong> {job.syllabus}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions Footer: Save, Details & Apply */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center space-x-1 transition-colors ${
                        isSaved
                          ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 border-amber-300'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save opportunity'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isSaved ? 'Saved' : 'Save'}</span>
                    </button>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        Overview
                      </button>

                      {application ? (
                        <button
                          onClick={() => setActiveFilter('applications')}
                          className="px-3.5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 text-xs font-bold flex items-center space-x-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{application.stage}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenApply(job)}
                          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-md hover:shadow-teal-500/20 transition-all flex items-center space-x-1"
                        >
                          <span>Apply</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* JOB DETAIL OVERVIEW MODAL */}
      {/* ========================================================= */}
      {selectedJob && !isApplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <img
                  src={selectedJob.logo}
                  alt={selectedJob.company}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                    {selectedJob.company}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                    {selectedJob.title}
                  </h2>
                  <p className="text-xs text-slate-500">{selectedJob.location} • {selectedJob.employmentType}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              
              {/* Compensation & Openings Banner */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-center text-xs">
                <div>
                  <div className="text-slate-400">Compensation</div>
                  <div className="font-bold text-slate-800 dark:text-white mt-0.5">{selectedJob.salaryRange}</div>
                </div>
                <div>
                  <div className="text-slate-400">Positions</div>
                  <div className="font-bold text-slate-800 dark:text-white mt-0.5">{selectedJob.openings} Openings</div>
                </div>
                <div>
                  <div className="text-slate-400">Deadline</div>
                  <div className="font-bold text-slate-800 dark:text-white mt-0.5">{selectedJob.applicationDeadline}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Overview</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedJob.description}
                </p>
              </div>

              {/* Responsibilities */}
              {selectedJob.responsibilities && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Key Responsibilities</h4>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 list-disc pl-4">
                    {selectedJob.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Eligibility */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Eligibility Criteria</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                  {selectedJob.eligibility}
                </p>
              </div>

              {/* Government Syllabus */}
              {selectedJob.syllabus && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
                    Official Exam Syllabus & Pattern
                  </h4>
                  <p className="text-xs text-blue-900 dark:text-blue-200 bg-blue-50 dark:bg-blue-950/40 p-3 rounded-xl border border-blue-200 dark:border-blue-900/50">
                    {selectedJob.syllabus}
                  </p>
                </div>
              )}

              {/* Selection Process */}
              {selectedJob.selectionProcess && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Selection Pipeline</h4>
                  <div className="space-y-1.5">
                    {selectedJob.selectionProcess.map((step, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300">
                        <span className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  const targetJob = selectedJob;
                  setSelectedJob(null);
                  setActiveChatJob(targetJob);
                }}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Recruiter</span>
              </button>

              <button
                onClick={() => handleOpenApply(selectedJob)}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2"
              >
                <span>Proceed to Apply</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* APPLY CONFIRMATION MODAL */}
      {/* ========================================================= */}
      {isApplyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-5 bg-gradient-to-r from-teal-800 to-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-teal-300 font-bold">Application Submission</span>
                <h3 className="text-base font-bold text-white">{selectedJob.title}</h3>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="p-1 rounded-lg text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmApply} className="p-6 space-y-4">
              {/* Profile Snapshot Audit */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                  <span>Verified Applicant Snapshot:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{currentUser?.verificationStatus || 'VERIFIED'}</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                  <div><strong>Name:</strong> {currentUser?.name}</div>
                  <div><strong>Email:</strong> {currentUser?.email}</div>
                  <div><strong>Study Centre:</strong> {currentUser?.studyLocation?.institution || 'Government Institute'}</div>
                  <div><strong>Target Wage:</strong> {currentUser?.targetWageFormatted || '₹6.5 LPA'}</div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Candidate Cover Note / Portfolio Highlights (Optional)
                </label>
                <textarea
                  rows={3}
                  value={candidateNote}
                  onChange={(e) => setCandidateNote(e.target.value)}
                  placeholder="Share a brief note about your database architecture projects, coding test readiness, or availability..."
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 text-xs text-teal-800 dark:text-teal-300 flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>
                  Your verified assessment capability scores (DBMS: 70%, DSA: 50%, Electrical: 90%) and DigiLocker credentials will be securely shared with {selectedJob.company}.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2"
                >
                  <span>Confirm & Submit Application</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1-TO-1 RECRUITER CHAT DRAWER */}
      {/* ========================================================= */}
      {activeChatJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
            
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={activeChatJob.logo}
                  alt={activeChatJob.company}
                  className="w-10 h-10 rounded-xl object-cover border border-white/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{activeChatJob.recruiterContact || activeChatJob.company}</h4>
                  <p className="text-[11px] text-teal-300">{activeChatJob.title}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveChatJob(null)}
                className="p-1 rounded-lg text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message thread */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50 dark:bg-slate-950/60">
              {conversationMessages.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <span>Start a direct conversation with the hiring team at {activeChatJob.company}.</span>
                </div>
              ) : (
                conversationMessages.map((msg) => {
                  const isMe = msg.senderRole === 'learner';

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] text-slate-400 mb-0.5 px-1">{msg.senderName}</div>
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                          isMe
                            ? 'bg-teal-600 text-white rounded-br-none shadow-sm'
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700 shadow-xs'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 px-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input bar */}
            <form onSubmit={handleSendChat} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message to recruiter..."
                className="flex-1 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="p-2 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
