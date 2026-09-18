import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  MessageSquare, 
  Search, 
  Plus, 
  Filter, 
  ArrowRight, 
  Award, 
  ShieldCheck, 
  Clock, 
  ExternalLink, 
  TrendingUp, 
  X, 
  Send,
  Sparkles,
  MapPin,
  ChevronRight,
  GraduationCap,
  Eye
} from 'lucide-react';
import { ProfileCompletionCard } from '../profile/ProfileCompletionCard';
import { useApp } from '../../context/AppContext';

export const EmployerPortal = () => {
  const { 
    recruiterProfile, 
    jobs, 
    applications, 
    updateApplicationStage, 
    postNewJob, 
    learnersDb, 
    chatMessages, 
    sendChatMessage, 
    calculateJobMatch,
    currentUser,
    openProfileWizard,
    employerCompletion
  } = useApp();

  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('pipeline'); // 'pipeline' | 'discovery' | 'jobs' | 'messages'
  const [pipelineFilter, setPipelineFilter] = useState('All'); // 'All' | 'Under Review' | 'Shortlisted' | 'Corporate Exam' | 'Interview' | 'Selected'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Post new job modal
  const BLANK_JOB_FORM = {
    title: '',
    category: 'Software & Cloud',
    location: '',
    state: '',
    district: '',
    employmentType: 'Full-time',
    salaryRange: '',
    minSalary: 0,
    maxSalary: 0,
    experienceLevel: '',
    applicationDeadline: '',
    requiredSkills: '',
    description: '',
    eligibility: '',
    corporateExamRequired: true,
    examTitle: 'Technical Competency & SQL Benchmark'
  };
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [newJobForm, setNewJobForm] = useState({ ...BLANK_JOB_FORM });

  // Candidate Profile Inspector Modal
  const [inspectingCandidate, setInspectingCandidate] = useState(null);

  // Chat Drawer
  const [chatCandidate, setChatCandidate] = useState(null);
  const [chatInput, setChatInput] = useState('');

  // Interview Schedule Modal
  const [scheduleModalApp, setScheduleModalApp] = useState(null);
  const [interviewForm, setInterviewForm] = useState({
    date: '2026-05-12 14:30 IST',
    link: 'https://meet.infracloud.io/interview-session'
  });

  // Filtered applications
  const filteredApplications = applications.filter(app => {
    const matchesStage = pipelineFilter === 'All' || app.stage === pipelineFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery = !query || 
      app.candidateName.toLowerCase().includes(query) ||
      app.jobTitle.toLowerCase().includes(query) ||
      (app.targetRole && app.targetRole.toLowerCase().includes(query));
    return matchesStage && matchesQuery;
  });

  const handlePostJob = (e) => {
    e.preventDefault();
    if (!newJobForm.title.trim()) return;
    const skillsArray = newJobForm.requiredSkills.split(',').map(s => s.trim()).filter(Boolean);
    postNewJob({
      ...newJobForm,
      category: newJobForm.category || 'Software & Cloud',
      state: newJobForm.state || 'Maharashtra',
      district: newJobForm.district || 'Pune',
      employmentType: newJobForm.employmentType || 'Full-time',
      requiredSkills: skillsArray,
      examTitle: newJobForm.corporateExamRequired ? (newJobForm.examTitle || 'Technical Competency Benchmark') : ''
    });
    setIsPostModalOpen(false);
    setNewJobForm({ ...BLANK_JOB_FORM });
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !chatCandidate) return;
    sendChatMessage({
      text: chatInput.trim(),
      recipientId: chatCandidate.candidateId || chatCandidate.id,
      recipientName: chatCandidate.candidateName || chatCandidate.name,
      jobId: chatCandidate.jobId || null,
      conversationId: `conv-${chatCandidate.candidateId || chatCandidate.id}-${recruiterProfile.id || 'recruiter-anand'}`
    });
    setChatInput('');
  };

  const handleConfirmSchedule = (e) => {
    e.preventDefault();
    if (!scheduleModalApp) return;
    updateApplicationStage(scheduleModalApp.id, 'Interview', {
      interviewDate: interviewForm.date,
      interviewLink: interviewForm.link,
      recruiterNotes: `Technical Round 1 scheduled for ${interviewForm.date}. Link sent to candidate.`
    });
    setScheduleModalApp(null);
  };

  const activeMessages = chatCandidate 
    ? chatMessages.filter(m => 
        m.recipientId === (chatCandidate.candidateId || chatCandidate.id) || 
        m.senderId === (chatCandidate.candidateId || chatCandidate.id)
      )
    : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Recruiter Header Hero */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-4">
            <img
              src={recruiterProfile.logo || 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80'}
              alt={recruiterProfile.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md"
            />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  {recruiterProfile.orgType || 'Enterprise'} Recruitment Portal
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  VERIFIED EMPLOYER
                </span>
              </div>
              <h1 className="text-2xl font-extrabold text-white mt-1">
                {recruiterProfile.name || 'InfraCloud Technologies'}
              </h1>
              <p className="text-xs text-slate-300 mt-0.5">
                Talent Acquisition Lead: <strong>{recruiterProfile.contactName || 'Anand Kulkarni'}</strong> ({recruiterProfile.contactEmail})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => { setNewJobForm({ ...BLANK_JOB_FORM }); setIsPostModalOpen(true); }}
              className="px-4 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Post New Opening</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur">
            <div className="text-slate-400 font-medium">Active Openings</div>
            <div className="text-xl font-bold text-white mt-1">{jobs.filter(j => j.type === 'private').length} Roles</div>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur">
            <div className="text-slate-400 font-medium">Total Applicants</div>
            <div className="text-xl font-bold text-teal-300 mt-1">{applications.length} Candidates</div>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur">
            <div className="text-slate-400 font-medium">Interviews Active</div>
            <div className="text-xl font-bold text-amber-300 mt-1">
              {applications.filter(a => a.stage === 'Interview').length} Scheduled
            </div>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 backdrop-blur">
            <div className="text-slate-400 font-medium">Selected / Offers</div>
            <div className="text-xl font-bold text-emerald-300 mt-1">
              {applications.filter(a => a.stage === 'Selected').length} Hired
            </div>
          </div>
        </div>
      </div>

      {/* Profile Completion Card & Details Breakdown */}
      <div className="space-y-3">
        <ProfileCompletionCard role="employer" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
            <span>100% verified employer profiles receive priority listing and the verified recruiter badge across student discovery feeds.</span>
          </div>
          <button
            type="button"
            onClick={() => setShowProfileDetails(!showProfileDetails)}
            className="text-xs font-bold text-[#0F4C47] hover:text-[#0A3632] hover:underline flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Eye className="w-3.5 h-3.5 text-teal-700" />
            <span>{showProfileDetails ? 'Hide Completion Details' : 'View Profile Completion Details & Requirements'}</span>
          </button>
        </div>

        {/* Detailed Employer Profile Completion Breakdown */}
        {showProfileDetails && (
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-teal-600/30 shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 font-extrabold text-[10px] uppercase tracking-wider">
                    Employer Verification Standards
                  </span>
                  <span className="text-xs font-bold text-slate-600">
                    {employerCompletion?.passedCount || 0} of {employerCompletion?.totalCount || 12} Requirements Passed ({employerCompletion?.percentage || 0}%)
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                  Employer & Recruiter Profile Completion Checklist
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  The employer profile is evaluated across 6 critical operational categories. All 12 parameters must pass verification for 100% completion status.
                </p>
              </div>

              <button
                type="button"
                onClick={() => openProfileWizard('employer', 1)}
                className="px-4 py-2 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Award className="w-3.5 h-3.5 text-teal-300" />
                <span>Launch Profile Wizard</span>
              </button>
            </div>

            {/* 6 Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Category 1: Entity Information */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase text-teal-900 dark:text-teal-400">Step 1 • Entity Information</span>
                  <button 
                    onClick={() => openProfileWizard('employer', 1)}
                    className="text-[11px] text-[#0F4C47] font-bold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Organization Name:</span>
                    <span className={`font-bold ${recruiterProfile.name ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {recruiterProfile.name ? `✓ ${recruiterProfile.name}` : '✗ Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Industry Sector:</span>
                    <span className={`font-bold ${recruiterProfile.industry ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {recruiterProfile.industry ? `✓ ${recruiterProfile.industry.slice(0, 18)}...` : '✗ Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Official Website:</span>
                    <span className={`font-bold ${recruiterProfile.website ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {recruiterProfile.website ? '✓ Configured' : '✗ Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Organization Type:</span>
                    <span className={`font-bold ${recruiterProfile.orgType ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {recruiterProfile.orgType ? `✓ ${recruiterProfile.orgType}` : '✗ Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Company Overview:</span>
                    <span className={`font-bold ${recruiterProfile.about ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {recruiterProfile.about ? '✓ Provided' : '✗ Missing'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category 2: Location & Operations */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase text-teal-900 dark:text-teal-400">Step 2 • Location & Ops</span>
                  <button 
                    onClick={() => openProfileWizard('employer', 2)}
                    className="text-[11px] text-[#0F4C47] font-bold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Headquarters City:</span>
                    <span className={`font-bold ${recruiterProfile.hqCity ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {recruiterProfile.hqCity ? `✓ ${recruiterProfile.hqCity}` : '✗ Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">State & Country:</span>
                    <span className="font-bold text-slate-800">
                      {recruiterProfile.hqState || 'Maharashtra'}, {recruiterProfile.hqCountry || 'India'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Work Model:</span>
                    <span className="font-bold text-slate-800">
                      {recruiterProfile.operatingModel || 'Hybrid'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Branch Hubs:</span>
                    <span className="font-bold text-slate-800 truncate max-w-[130px]">
                      {recruiterProfile.branches || 'Pune, Bengaluru'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category 3: Point of Contact */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase text-teal-900 dark:text-teal-400">Step 3 • Point of Contact</span>
                  <button 
                    onClick={() => openProfileWizard('employer', 3)}
                    className="text-[11px] text-[#0F4C47] font-bold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Primary Contact:</span>
                    <span className={`font-bold ${recruiterProfile.contactName ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {recruiterProfile.contactName ? `✓ ${recruiterProfile.contactName}` : '✗ Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Official Designation:</span>
                    <span className="font-bold text-slate-800 truncate max-w-[130px]">
                      {recruiterProfile.contactTitle || 'Talent Acquisition Lead'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Talent Email:</span>
                    <span className={`font-bold truncate max-w-[130px] ${recruiterProfile.contactEmail ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {recruiterProfile.contactEmail ? `✓ ${recruiterProfile.contactEmail}` : '✗ Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Contact Phone:</span>
                    <span className="font-bold text-slate-800">
                      {recruiterProfile.contactPhone || '+91 98230 45678'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category 4: Hiring Requirements */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase text-teal-900 dark:text-teal-400">Step 4 • Hiring Needs</span>
                  <button 
                    onClick={() => openProfileWizard('employer', 4)}
                    className="text-[11px] text-[#0F4C47] font-bold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Primary Roles:</span>
                    <span className={`font-bold ${recruiterProfile.hiringRoles?.length > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {recruiterProfile.hiringRoles?.length > 0 ? `✓ ${recruiterProfile.hiringRoles.length} Roles Specified` : '✗ Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">In-Demand Skills:</span>
                    <span className={`font-bold ${recruiterProfile.keySkillsInDemand?.length > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {recruiterProfile.keySkillsInDemand?.length > 0 ? `✓ ${recruiterProfile.keySkillsInDemand.length} Skills Listed` : '✗ Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Annual Volume:</span>
                    <span className="font-bold text-slate-800">
                      {recruiterProfile.hiringVolume || '50+ hires/year'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Target Locations:</span>
                    <span className="font-bold text-slate-800 truncate max-w-[130px]">
                      {recruiterProfile.preferredLocations || 'Pune, Bengaluru'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category 5: Accreditation & Terms */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase text-teal-900 dark:text-teal-400">Step 5 • Legal & Terms</span>
                  <button 
                    onClick={() => openProfileWizard('employer', 5)}
                    className="text-[11px] text-[#0F4C47] font-bold hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">CIN / Registration:</span>
                    <span className={`font-bold truncate max-w-[130px] ${recruiterProfile.regNumber ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {recruiterProfile.regNumber ? `✓ ${recruiterProfile.regNumber}` : '✗ Missing'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">GSTIN:</span>
                    <span className="font-bold text-slate-800">
                      {recruiterProfile.gstin || '27AABCU9603R1ZM'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Accreditation:</span>
                    <span className="font-bold text-slate-800 truncate max-w-[130px]">
                      {recruiterProfile.accreditation || 'NASSCOM Platinum'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Authorized Terms:</span>
                    <span className={`font-bold ${recruiterProfile.acceptedTerms ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {recruiterProfile.acceptedTerms ? '✓ Accepted' : '✗ Required'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category 6: Review & Confirmation */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase text-teal-900 dark:text-teal-400">Step 6 • Review & Sync</span>
                  <button 
                    onClick={() => openProfileWizard('employer', 6)}
                    className="text-[11px] text-[#0F4C47] font-bold hover:underline"
                  >
                    Audit
                  </button>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Database Sync:</span>
                    <span className="font-bold text-emerald-700">✓ Real-time</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Verified Recruiter Tag:</span>
                    <span className={`font-bold ${employerCompletion?.isComplete ? 'text-emerald-700' : 'text-amber-600'}`}>
                      {employerCompletion?.isComplete ? '✓ Active' : 'Pending 100%'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">ATS Match Algorithm:</span>
                    <span className="font-bold text-emerald-700">✓ Enabled</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Candidate Outreach:</span>
                    <span className="font-bold text-emerald-700">✓ Unlimited</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'pipeline'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Applicant Pipeline ({applications.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('discovery')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'discovery'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Talent Pool Discovery</span>
          </button>
          <button
            onClick={() => setActiveTab('jobs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'jobs'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Manage Job Postings ({jobs.filter(j => j.type === 'private').length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates, skills..."
            className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. APPLICANT PIPELINE VIEW */}
      {/* ========================================================= */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          {/* Stage Filter Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs">
            {['All', 'Under Review', 'Shortlisted', 'Corporate Exam', 'Interview', 'Selected'].map((stage) => (
              <button
                key={stage}
                onClick={() => setPipelineFilter(stage)}
                className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  pipelineFilter === stage
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                }`}
              >
                {stage} ({stage === 'All' ? applications.length : applications.filter(a => a.stage === stage).length})
              </button>
            ))}
          </div>

          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">No applicants in this stage</h4>
              <p className="text-xs text-slate-500 mt-0.5">Candidates who apply will appear here with transparent verified skills.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {filteredApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {app.candidateName}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-bold text-xs border border-teal-200 dark:border-teal-800">
                        {app.matchScore || 90}% Match
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-medium">
                        Stage: <strong>{app.stage}</strong>
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
                      <div>
                        <strong>Applying for:</strong> {app.jobTitle} • <strong>Applied:</strong> {app.appliedDate}
                      </div>
                      <div>
                        <strong>Study Location:</strong> {app.studyLocation} • <strong>Target Wage:</strong> {app.targetWage}
                      </div>
                      {app.examScore && (
                        <div className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          ✓ Corporate Assessment Score: {app.examScore}/100
                        </div>
                      )}
                      {app.interviewDate && (
                        <div className="text-amber-600 dark:text-amber-400 font-semibold">
                          📅 Scheduled Interview: {app.interviewDate}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stage Action Controls */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      onClick={() => setInspectingCandidate(app)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center space-x-1"
                      title="Inspect Candidate Profile & Credentials"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() => setChatCandidate(app)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center space-x-1"
                      title="Open 1-to-1 Candidate Chat"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat</span>
                    </button>

                    {/* Stage Advancement dropdown/buttons */}
                    {app.stage === 'Under Review' && (
                      <button
                        onClick={() => updateApplicationStage(app.id, 'Shortlisted', {
                          recruiterNotes: 'Shortlisted based on strong relational DB assessment score.'
                        })}
                        className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold"
                      >
                        Shortlist
                      </button>
                    )}

                    {app.stage === 'Shortlisted' && (
                      <button
                        onClick={() => updateApplicationStage(app.id, 'Corporate Exam', {
                          examStatus: 'Corporate Benchmark Invitation Sent (DBMS & System Concurrency)',
                          recruiterNotes: 'Invited to take the 60-minute SQL Concurrency exam.'
                        })}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                      >
                        Invite to Exam
                      </button>
                    )}

                    {app.stage === 'Corporate Exam' && (
                      <button
                        onClick={() => {
                          setScheduleModalApp(app);
                        }}
                        className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold"
                      >
                        Schedule Interview
                      </button>
                    )}

                    {app.stage === 'Interview' && (
                      <button
                        onClick={() => updateApplicationStage(app.id, 'Selected', {
                          recruiterNotes: 'Candidate cleared technical interview rounds. Formal employment offer issued.'
                        })}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                      >
                        Select & Make Offer
                      </button>
                    )}

                    {app.stage === 'Selected' && (
                      <span className="px-3 py-1.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-bold border border-emerald-300">
                        ✓ Selected Candidate
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. TALENT DISCOVERY VIEW */}
      {/* ========================================================= */}
      {activeTab === 'discovery' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-white">
                Pre-Assessed & Verified Talent Pool ({learnersDb.length})
              </h2>
              <p className="text-xs text-slate-500">Discover learners with verifiable assessment scores and training credentials.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learnersDb.slice(0, 10).map((learner) => (
              <div
                key={learner.id}
                className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={learner.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                        alt={learner.name}
                        className="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">{learner.name}</h4>
                        <p className="text-xs text-slate-500">{learner.district} • {learner.education}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-200">
                      Score: {learner.assessmentScore}/10
                    </span>
                  </div>

                  <div className="mt-3 text-xs space-y-1 text-slate-600 dark:text-slate-300">
                    <div><strong>Target Role:</strong> {learner.targetCareer || 'Software Developer'}</div>
                    <div><strong>Attendance Rate:</strong> {learner.attendance}% across modules</div>
                    <div><strong>Training Relevance:</strong> {learner.trainingRelevance || 'Highly relevant'}</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Status: {learner.employmentStatus}</span>
                  <button
                    onClick={() => {
                      setChatCandidate({
                        candidateId: learner.id,
                        candidateName: learner.name
                      });
                    }}
                    className="px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Reach Out</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. MANAGE JOB POSTINGS VIEW */}
      {/* ========================================================= */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800 dark:text-white">Active Recruiter Openings</h2>
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="px-3.5 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl flex items-center space-x-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Post Opening</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.filter(j => j.type === 'private').map((job) => (
              <div
                key={job.id}
                className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider">{job.category}</span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{job.title}</h3>
                      <p className="text-xs text-slate-500">{job.location}</p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                      {job.appliedCount || 0} Applied
                    </span>
                  </div>

                  <div className="mt-3 text-xs space-y-1 text-slate-600 dark:text-slate-300">
                    <div><strong>Compensation:</strong> {job.salaryRange}</div>
                    <div><strong>Deadline:</strong> {job.applicationDeadline}</div>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {job.requiredSkills.map(s => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {job.corporateExamRequired ? '✓ Automated Corporate Test Active' : 'Direct Review'}
                  </span>
                  <button
                    onClick={() => {
                      setActiveTab('pipeline');
                      setSearchQuery(job.title);
                    }}
                    className="text-teal-600 font-bold hover:underline"
                  >
                    View Applicants →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* POST NEW OPENING MODAL */}
      {/* ========================================================= */}
      {isPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
            
            <div className="p-5 bg-gradient-to-r from-teal-800 to-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-teal-300 font-bold">New Role Publication</span>
                <h3 className="text-base font-bold text-white">Create Enterprise Opportunity</h3>
              </div>
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="p-1 rounded-lg text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostJob} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">

              {/* Job Title */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Job Title <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newJobForm.title}
                  onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                  placeholder="e.g. Junior Backend Engineer / Cloud Systems Architect"
                  className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none font-medium placeholder:text-slate-400"
                />
              </div>

              {/* Category + Employment Type */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Job Category</label>
                  <select
                    value={newJobForm.category}
                    onChange={(e) => setNewJobForm({ ...newJobForm, category: e.target.value })}
                    className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                  >
                    <option value="Software & Cloud">Software & Cloud</option>
                    <option value="Data & AI">Data & AI / ML</option>
                    <option value="Electrical & Electronics">Electrical & Electronics</option>
                    <option value="Civil & Infrastructure">Civil & Infrastructure</option>
                    <option value="Manufacturing">Manufacturing & Production</option>
                    <option value="Healthcare">Healthcare & Medical</option>
                    <option value="Finance & Banking">Finance & Banking</option>
                    <option value="Marketing & Design">Marketing & Design</option>
                    <option value="Government & PSU">Government & PSU</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Employment Type</label>
                  <select
                    value={newJobForm.employmentType}
                    onChange={(e) => setNewJobForm({ ...newJobForm, employmentType: e.target.value })}
                    className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract / Freelance</option>
                    <option value="Apprenticeship">Apprenticeship</option>
                    <option value="Government Scheme">Government Scheme</option>
                  </select>
                </div>
              </div>

              {/* Salary + Experience */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Salary Range <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={newJobForm.salaryRange}
                    onChange={(e) => setNewJobForm({ ...newJobForm, salaryRange: e.target.value })}
                    placeholder="e.g. ₹6.0 – ₹8.5 LPA"
                    className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Experience Level <span className="text-rose-500">*</span></label>
                  <select
                    required
                    value={newJobForm.experienceLevel}
                    onChange={(e) => setNewJobForm({ ...newJobForm, experienceLevel: e.target.value })}
                    className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                  >
                    <option value="">-- Select Level --</option>
                    <option value="Fresher (0 yrs)">Fresher (0 yrs)</option>
                    <option value="Entry-level (0-2 yrs)">Entry-level (0-2 yrs)</option>
                    <option value="Mid-level (2-5 yrs)">Mid-level (2-5 yrs)</option>
                    <option value="Senior (5-8 yrs)">Senior (5-8 yrs)</option>
                    <option value="Lead / Principal (8+ yrs)">Lead / Principal (8+ yrs)</option>
                    <option value="Any">Any Experience</option>
                  </select>
                </div>
              </div>

              {/* Location + Work Mode */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Location <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={newJobForm.location}
                    onChange={(e) => setNewJobForm({ ...newJobForm, location: e.target.value })}
                    placeholder="e.g. Pune, Maharashtra"
                    className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Work Mode</label>
                  <select
                    value={newJobForm.workMode || 'Hybrid'}
                    onChange={(e) => setNewJobForm({ ...newJobForm, workMode: e.target.value })}
                    className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site / Office</option>
                    <option value="Remote">Remote (Pan-India)</option>
                    <option value="Field Work">Field Work</option>
                  </select>
                </div>
              </div>

              {/* Required Skills */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Required Skills <span className="text-rose-500">*</span> <span className="font-normal text-slate-400">(comma separated)</span></label>
                <input
                  type="text"
                  required
                  value={newJobForm.requiredSkills}
                  onChange={(e) => setNewJobForm({ ...newJobForm, requiredSkills: e.target.value })}
                  placeholder="e.g. DBMS, DSA, REST API, Python, PostgreSQL"
                  className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium placeholder:text-slate-400"
                />
              </div>

              {/* Eligibility */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Eligibility Criteria</label>
                <input
                  type="text"
                  value={newJobForm.eligibility}
                  onChange={(e) => setNewJobForm({ ...newJobForm, eligibility: e.target.value })}
                  placeholder="e.g. B.Tech / MCA or equivalent with skill credentials"
                  className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium placeholder:text-slate-400"
                />
              </div>

              {/* Role Description */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Role Description</label>
                <textarea
                  rows={3}
                  value={newJobForm.description}
                  onChange={(e) => setNewJobForm({ ...newJobForm, description: e.target.value })}
                  placeholder="Describe the role responsibilities, tech stack, team structure and growth opportunities..."
                  className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium placeholder:text-slate-400 resize-none"
                />
              </div>

              {/* Corporate Benchmark Toggle */}
              <div className="p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900 rounded-xl flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-teal-900 dark:text-teal-200">Require Automated Corporate Benchmark</div>
                  <div className="text-[11px] text-teal-700 dark:text-teal-400 mt-0.5">Shortlisted candidates will take the SQL & Algorithm simulation before interview</div>
                </div>
                <input
                  type="checkbox"
                  checked={newJobForm.corporateExamRequired}
                  onChange={(e) => setNewJobForm({ ...newJobForm, corporateExamRequired: e.target.checked })}
                  className="w-5 h-5 text-teal-600 rounded focus:ring-teal-500 accent-teal-600 cursor-pointer shrink-0"
                />
              </div>

              {/* Application Deadline */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Application Deadline</label>
                <input
                  type="date"
                  value={newJobForm.applicationDeadline}
                  onChange={(e) => setNewJobForm({ ...newJobForm, applicationDeadline: e.target.value })}
                  className="w-full p-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none font-medium"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end space-x-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => { setIsPostModalOpen(false); setNewJobForm({ ...BLANK_JOB_FORM }); }}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newJobForm.title.trim()}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md transition-all flex items-center space-x-1.5"
                >
                  <span>Publish Opening</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CANDIDATE PROFILE INSPECTOR MODAL */}
      {/* ========================================================= */}
      {inspectingCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6">
            
            <div className="p-5 bg-gradient-to-r from-slate-900 to-teal-950 text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">Verified Candidate Dossier</span>
                <h3 className="text-base font-bold text-white">{inspectingCandidate.candidateName}</h3>
              </div>
              <button
                onClick={() => setInspectingCandidate(null)}
                className="p-1 rounded-lg text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs text-slate-700 dark:text-slate-300">
              
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <div>
                    <strong className="text-emerald-900 dark:text-emerald-200">DigiLocker & Institutional Verification</strong>
                    <div className="text-[11px] text-emerald-700 dark:text-emerald-400">Authentic credentials verified via MSDE & AICTE</div>
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-emerald-600 text-white font-bold text-[10px]">VERIFIED</span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <div><strong>Email:</strong> {inspectingCandidate.candidateEmail}</div>
                <div><strong>Phone:</strong> {inspectingCandidate.candidatePhone}</div>
                <div><strong>Study Location:</strong> {inspectingCandidate.studyLocation}</div>
                <div><strong>Target Wage:</strong> {inspectingCandidate.targetWage}</div>
              </div>

              {inspectingCandidate.recruiterNotes && (
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">Candidate Cover Note</h4>
                  <p className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                    {inspectingCandidate.recruiterNotes}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1.5">Assessment Capability Breakdown</h4>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <span>DBMS & Relational Query Optimization:</span>
                    <strong className="text-teal-600 dark:text-teal-400">70% (Proficient)</strong>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <span>Data Structures & Algorithmic Problem Solving:</span>
                    <strong className="text-amber-600 dark:text-amber-400">50% (Developing)</strong>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <span>Electrical Works & Circuit Safety:</span>
                    <strong className="text-emerald-600 dark:text-emerald-400">90% (Advanced)</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    const target = inspectingCandidate;
                    setInspectingCandidate(null);
                    setChatCandidate(target);
                  }}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl flex items-center space-x-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Open 1-to-1 Chat</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCHEDULE INTERVIEW MODAL */}
      {/* ========================================================= */}
      {scheduleModalApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            
            <div className="p-5 bg-gradient-to-r from-amber-700 to-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">Interview Dispatch</span>
                <h3 className="text-base font-bold text-white">Schedule Technical Round</h3>
              </div>
              <button
                onClick={() => setScheduleModalApp(null)}
                className="p-1 rounded-lg text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmSchedule} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Candidate</label>
                <input
                  type="text"
                  disabled
                  value={`${scheduleModalApp.candidateName} (${scheduleModalApp.jobTitle})`}
                  className="w-full p-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Interview Date & Time *</label>
                <input
                  type="text"
                  required
                  value={interviewForm.date}
                  onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })}
                  placeholder="e.g. 2026-05-12 14:30 IST"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Meeting Link *</label>
                <input
                  type="text"
                  required
                  value={interviewForm.link}
                  onChange={(e) => setInterviewForm({ ...interviewForm, link: e.target.value })}
                  placeholder="https://meet.infracloud.io/interview-session"
                  className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setScheduleModalApp(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-sm"
                >
                  Send Interview Invite
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1-TO-1 CANDIDATE CHAT DRAWER */}
      {/* ========================================================= */}
      {chatCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
            
            {/* Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{chatCandidate.candidateName || chatCandidate.name}</h4>
                <p className="text-[11px] text-teal-300">{chatCandidate.jobTitle || 'Verified Candidate'}</p>
              </div>
              <button
                onClick={() => setChatCandidate(null)}
                className="p-1 rounded-lg text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50 dark:bg-slate-950/60">
              {activeMessages.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <span>Initiate recruitment messaging with this verified candidate.</span>
                </div>
              ) : (
                activeMessages.map((msg) => {
                  const isRecruiter = msg.senderRole === 'employer';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isRecruiter ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] text-slate-400 mb-0.5 px-1">{msg.senderName}</div>
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                          isRecruiter
                            ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
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
                placeholder="Type message to candidate..."
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
