import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ProfileCompletionCard } from '../profile/ProfileCompletionCard';
import {
  Shield,
  TrendingUp,
  BarChart3,
  Layers,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle,
  FileText,
  Filter,
  ArrowRight,
  Info,
  Sparkles,
  Building,
  BookOpen,
  Bell,
  Search,
  Calendar,
  Send,
  X,
  Clock,
  Check,
  Award,
  ChevronRight,
  Download,
  FileSpreadsheet,
  Lock,
  Printer,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Eye
} from 'lucide-react';

export const GovernmentPortal = () => {
  const {
    districts,
    providers,
    cohorts,
    courses,
    learnersDb,
    activeTab,
    setActiveTab,
    learnerProfilesRegistry,
    exportRegistryToCSV,
    setLearnerProfilesRegistry
  } = useApp();

  // Dual Dashboard Mode: 'government' | 'private'
  const [portalMode, setPortalMode] = useState('government');

  // Active section tab: 'overview' | 'drilldown' | 'cohorts' | 'tracking' | 'private-sourcing' | 'registry' | 'providers' | 'demographics' | 'insights'
  const [analyticsView, setAnalyticsView] = useState('overview');

  // Synchronize analyticsView & portalMode with sidebar activeTab
  useEffect(() => {
    if (activeTab === 'government-private') {
      setPortalMode('private');
      setAnalyticsView('private-sourcing');
    } else if (activeTab === 'government-tracking' || activeTab === 'government-sourcing') {
      setPortalMode('government');
      setAnalyticsView('tracking');
    } else if (activeTab === 'government-registry') {
      setAnalyticsView('registry');
    } else if (activeTab === 'government-drilldown') {
      setPortalMode('government');
      setAnalyticsView('drilldown');
    } else if (activeTab === 'government-cohorts') {
      setPortalMode('government');
      setAnalyticsView('cohorts');
    } else if (activeTab === 'government') {
      // Keep current
    }
  }, [activeTab]);

  // Modals
  const [selectedDistrictModal, setSelectedDistrictModal] = useState(null);
  const [selectedCohortModal, setSelectedCohortModal] = useState(null);
  const [selectedCandidateForInterview, setSelectedCandidateForInterview] = useState(null);
  const [selectedCandidateForExam, setSelectedCandidateForExam] = useState(null);
  const [generatedAdmitCard, setGeneratedAdmitCard] = useState(null);
  const [selectedCandidateForAudit, setSelectedCandidateForAudit] = useState(null);

  // Cross-dimensional filter states
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedProvider, setSelectedProvider] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedCohort, setSelectedCohort] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');

  // Talent Pool & Recruitment Filter States
  const [talentSkillFilter, setTalentSkillFilter] = useState('All');
  const [talentDistrictFilter, setTalentDistrictFilter] = useState('All');
  const [talentSearch, setTalentSearch] = useState('');
  const [statusToast, setStatusToast] = useState('');

  // Live Job Application Notifications Feed (Simulating arrivals every 10-15 mins)
  const [jobApplications, setJobApplications] = useState([
    {
      id: 'app-1',
      candidateName: 'Priya Sharma',
      district: 'Bengaluru Urban',
      skill: 'Database Systems & SQL',
      appliedRole: 'Junior Database Administrator',
      employer: 'State e-Governance Mission',
      timeAgo: 'Just now'
    },
    {
      id: 'app-2',
      candidateName: 'Kavita Nair',
      district: 'Hassan',
      skill: 'Cloud DevOps & Linux',
      appliedRole: 'Cloud Support Trainee',
      employer: 'Karnataka Digital Economy Mission',
      timeAgo: '6 mins ago'
    },
    {
      id: 'app-3',
      candidateName: 'Deepak Joshi',
      district: 'Mysuru',
      skill: 'Python Backend APIs',
      appliedRole: 'Backend Developer Trainee',
      employer: 'Apex Tech Enterprises',
      timeAgo: '12 mins ago'
    }
  ]);

  // Sourcing Candidate Pool (Unemployed persons with skills certified in portal)
  const [unemployedCandidates, setUnemployedCandidates] = useState([
    {
      id: 'unemp-1',
      name: 'Rohan Sharma',
      district: 'Bengaluru Urban',
      education: 'B.Tech Computer Science (2025)',
      targetIndustry: 'IT & Software Engineering',
      certifiedSkill: 'Database Systems & SQL',
      score: 90,
      status: 'Unemployed (Actively Seeking)',
      experience: 'Fresher / Certified Trainee'
    },
    {
      id: 'unemp-2',
      name: 'Ananya Verma',
      district: 'Hassan',
      education: 'BCA in Computer Applications (2025)',
      targetIndustry: 'FinTech & Banking',
      certifiedSkill: 'Python Backend APIs',
      score: 85,
      status: 'Unemployed (Actively Seeking)',
      experience: 'Fresher / Certified Trainee'
    },
    {
      id: 'unemp-3',
      name: 'Vikram Patel',
      district: 'Mysuru',
      education: 'Diploma in Electrical & Computer Eng (2024)',
      targetIndustry: 'Renewable Energy & EV Tech',
      certifiedSkill: 'Industrial Automation & PLC',
      score: 92,
      status: 'Unemployed (Actively Seeking)',
      experience: '1 year apprenticeship'
    },
    {
      id: 'unemp-4',
      name: 'Sneha Kulkarni',
      district: 'Belagavi',
      education: 'B.Sc Information Science (2025)',
      targetIndustry: 'IT & Software Engineering',
      certifiedSkill: 'Database Systems & SQL',
      score: 88,
      status: 'Unemployed (Actively Seeking)',
      experience: 'Fresher / Certified Trainee'
    },
    {
      id: 'unemp-5',
      name: 'Manoj Hegde',
      district: 'Dharwad',
      education: 'B.E. Electronics (2024)',
      targetIndustry: 'Advanced Manufacturing & Robotics',
      certifiedSkill: 'Cloud DevOps & Linux',
      score: 94,
      status: 'Unemployed (Actively Seeking)',
      experience: 'Fresher / Certified Trainee'
    },
    {
      id: 'unemp-6',
      name: 'Pooja Reddy',
      district: 'Hassan',
      education: 'B.Tech IT (2025)',
      targetIndustry: 'Healthcare & Biotechnology',
      certifiedSkill: 'Python Backend APIs',
      score: 87,
      status: 'Unemployed (Actively Seeking)',
      experience: 'Fresher / Certified Trainee'
    }
  ]);

  // Periodic Job Application Notification Simulator
  useEffect(() => {
    const timer = setInterval(() => {
      const candidates = ['Arun Kumar', 'Meera Rao', 'Siddharth Patil', 'Bhavana Gowda'];
      const districtsList = ['Bengaluru Urban', 'Hassan', 'Mysuru', 'Belagavi'];
      const skillsList = ['Database Systems & SQL', 'Python Backend APIs', 'Cloud DevOps & Linux'];
      const roles = ['Junior Systems Associate', 'Technical Data Assistant', 'Network Support Trainee'];

      const randomName = candidates[Math.floor(Math.random() * candidates.length)];
      const randomDist = districtsList[Math.floor(Math.random() * districtsList.length)];
      const randomSkill = skillsList[Math.floor(Math.random() * skillsList.length)];
      const randomRole = roles[Math.floor(Math.random() * roles.length)];

      const newApp = {
        id: `app-${Date.now()}`,
        candidateName: randomName,
        district: randomDist,
        skill: randomSkill,
        appliedRole: randomRole,
        employer: 'State Technical Mission',
        timeAgo: 'Just now'
      };

      setJobApplications(prev => [newApp, ...prev.slice(0, 7)]);
    }, 120000); // Ticks every 2 minutes for realistic testing

    return () => clearInterval(timer);
  }, []);

  const handleSimulateNewApplication = () => {
    const newApp = {
      id: `app-${Date.now()}`,
      candidateName: 'Sunil Basavaraj',
      district: 'Hassan',
      skill: 'Database Systems & SQL',
      appliedRole: 'Junior Systems Officer',
      employer: 'State e-Governance Cell',
      timeAgo: 'Just now'
    };
    setJobApplications(prev => [newApp, ...prev.slice(0, 7)]);
    setStatusToast('🔔 New job application received from Hassan district!');
    setTimeout(() => setStatusToast(''), 4000);
  };

  // Private Interview dispatch form state
  const [interviewEmployer, setInterviewEmployer] = useState('Tata Consultancy Services (TCS) - Digital Systems');
  const [interviewRole, setInterviewRole] = useState('Junior Database Systems Associate');
  const [interviewDate, setInterviewDate] = useState('2026-09-22');
  const [interviewMode, setInterviewMode] = useState('Virtual Technical Round (MS Teams / Meet)');

  // Private Exam dispatch form state
  const [privateTestingBoard, setPrivateTestingBoard] = useState('TCS iON National Qualifier Testing Service (NQT)');
  const [examName, setExamName] = useState('National Industry Technical Qualifier Examination (NITQE-2026)');
  const [examDate, setExamDate] = useState('2026-09-28');
  const [examReportingTime, setExamReportingTime] = useState('09:00 AM IST');
  const [examCenter, setExamCenter] = useState('TCS iON Digital Zone iDZ, Electronic City Phase 1, Bengaluru');

  // Backend Excel Registry Search & Filter States
  const [registrySearch, setRegistrySearch] = useState('');
  const [registryIndustryFilter, setRegistryIndustryFilter] = useState('All');

  const handleDispatchInterview = (e) => {
    e.preventDefault();
    if (!selectedCandidateForInterview) return;

    const interviewStatus = `Scheduled with ${interviewEmployer} (${interviewDate})`;

    setUnemployedCandidates(prev =>
      prev.map(c =>
        c.id === selectedCandidateForInterview.id
          ? { ...c, status: interviewStatus, privateInterviewStatus: interviewStatus }
          : c
      )
    );

    setLearnerProfilesRegistry(prev =>
      prev.map(p =>
        p.id === selectedCandidateForInterview.id || p.name === selectedCandidateForInterview.name
          ? { ...p, privateInterviewStatus: interviewStatus }
          : p
      )
    );

    setStatusToast(`✓ Corporate technical interview scheduled with ${interviewEmployer} for ${selectedCandidateForInterview.name} on ${interviewDate}!`);
    setSelectedCandidateForInterview(null);
    setTimeout(() => setStatusToast(''), 5000);
  };

  const handleDispatchExam = (e) => {
    e.preventDefault();
    if (!selectedCandidateForExam) return;

    const rollNo = `CARD-2026-PVT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCard = {
      rollNo,
      candidateName: selectedCandidateForExam.name,
      candidateEmail: selectedCandidateForExam.email || 'candidate@domain.com',
      candidatePhone: selectedCandidateForExam.phone || '+91 98451 00000',
      district: selectedCandidateForExam.district,
      education: selectedCandidateForExam.education,
      certifiedSkill: selectedCandidateForExam.certifiedSkill,
      targetIndustry: selectedCandidateForExam.targetIndustry,
      testingBoard: privateTestingBoard,
      examName,
      examDate,
      reportingTime: examReportingTime,
      center: examCenter,
      issueTimestamp: new Date().toLocaleString(),
      gatePassCode: `GP-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    };

    const examStatus = `Exam Card Issued (#${rollNo})`;

    setUnemployedCandidates(prev =>
      prev.map(c =>
        c.id === selectedCandidateForExam.id
          ? { ...c, status: examStatus, privateExamStatus: `Exam Card Issued #${rollNo} by ${privateTestingBoard}` }
          : c
      )
    );

    setLearnerProfilesRegistry(prev =>
      prev.map(p =>
        p.id === selectedCandidateForExam.id || p.name === selectedCandidateForExam.name
          ? { ...p, privateExamStatus: `Exam Card Issued #${rollNo} (${privateTestingBoard})` }
          : p
      )
    );

    setSelectedCandidateForExam(null);
    setGeneratedAdmitCard(newCard);
    setStatusToast(`✓ Official Examination Admit Card #${rollNo} generated by ${privateTestingBoard}!`);
    setTimeout(() => setStatusToast(''), 5000);
  };

  // Combined candidate pool: Static demo candidates + real completed learner profiles from Central Registry
  const allCandidatePool = [
    ...learnerProfilesRegistry.map(reg => ({
      id: reg.id,
      name: reg.name,
      district: reg.city ? `${reg.city} (${reg.state})` : 'Bengaluru Urban',
      education: reg.education,
      targetIndustry: reg.targetIndustry,
      certifiedSkill: reg.skills?.split(',')[0] || 'Database Systems & SQL',
      score: 96,
      status: reg.privateInterviewStatus || 'Available for Corporate Review',
      privateInterviewStatus: reg.privateInterviewStatus || 'Available for Corporate Review',
      privateExamStatus: reg.privateExamStatus || 'Eligible for Private Examination',
      experience: 'Platform Certified Completer',
      email: reg.email,
      phone: reg.phone,
      isRegisteredLearner: true
    })),
    ...unemployedCandidates
  ];

  // Deduplicate candidates by name
  const uniqueCandidateMap = new Map();
  allCandidatePool.forEach(c => {
    if (!uniqueCandidateMap.has(c.name)) {
      uniqueCandidateMap.set(c.name, c);
    }
  });
  const candidatesList = Array.from(uniqueCandidateMap.values());

  // Filtered Candidates
  const filteredCandidates = candidatesList.filter(cand => {
    const matchesSearch =
      cand.name.toLowerCase().includes(talentSearch.toLowerCase()) ||
      cand.education.toLowerCase().includes(talentSearch.toLowerCase()) ||
      cand.certifiedSkill.toLowerCase().includes(talentSearch.toLowerCase());
    const matchesSkill = talentSkillFilter === 'All' || cand.certifiedSkill === talentSkillFilter;
    const matchesDist = talentDistrictFilter === 'All' || cand.district.includes(talentDistrictFilter);
    return matchesSearch && matchesSkill && matchesDist;
  });

  // Normalized calculations for high-level KPIs
  const totalEnrolled = learnersDb.length * 150;
  const totalCompleted = Math.round(totalEnrolled * 0.86);
  const totalEmployed = Math.round(totalCompleted * 0.81);

  // Filtered learners for cross-dimensional drilldown
  const filteredLearners = learnersDb.filter((l) => {
    const matchDist = selectedDistrict === 'All' || l.district === selectedDistrict;
    const matchCourse = selectedCourse === 'All' || l.courseId === selectedCourse;
    const matchCohort = selectedCohort === 'All' || l.cohortId === selectedCohort;
    const matchGender = selectedGender === 'All' || l.gender === selectedGender;
    return matchDist && matchCourse && matchCohort && matchGender;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-6 animate-in fade-in duration-200">
      {/* DUAL DASHBOARD MODE SWITCHER (Government vs Private Dashboard) */}
      <div className="bg-white p-2.5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 p-1 bg-slate-100/80 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              setPortalMode('government');
              if (analyticsView === 'private-sourcing') setAnalyticsView('tracking');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
              portalMode === 'government'
                ? 'bg-[#0F4C47] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>🏛️ Government Oversight & Tracking Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setPortalMode('private');
              setAnalyticsView('private-sourcing');
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all ${
              portalMode === 'private'
                ? 'bg-[#10554F] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>🏢 Private Industry & Testing Board Dashboard</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black shadow-xs">
              Issue Cards & Interviews
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-600 font-bold px-3 flex items-center gap-2 self-center">
          <span className={`w-2.5 h-2.5 rounded-full ${portalMode === 'government' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></span>
          <span>
            {portalMode === 'government'
              ? 'Mode: Government Read-Only Applicant Tracking'
              : 'Mode: Private Corporate Testing & Interview Engine'}
          </span>
        </div>
      </div>

      {/* Header Banner */}
      <div className="farming-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
            {portalMode === 'government' ? <Shield className="w-4 h-4" /> : <Building className="w-4 h-4" />}
            <span>
              {portalMode === 'government'
                ? 'State Government Workforce Surveillance & Audit Matrix'
                : 'Private Industry Corporate Testing Board & Recruitment Engine'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {portalMode === 'government'
              ? 'Government Skill-to-Employment Decision Support System'
              : 'Private Industry Corporate Interview & Examination Card Portal'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {portalMode === 'government'
              ? 'Real-time candidate tracking, district outcomes, and longitudinal compliance auditing. Private testing boards manage interviews and exam cards.'
              : 'Authorized private testing boards (TCS iON, NITA) and employers evaluate learners, schedule technical interviews, and issue official exam admit cards.'}
          </p>
        </div>

        {/* Live Notification Indicator */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSimulateNewApplication}
            className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 text-[#0F4C47] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            title="Simulate a new candidate job application"
          >
            <Bell className="w-3.5 h-3.5 text-teal-700" />
            <span>Simulate New Application</span>
          </button>
        </div>
      </div>

      {/* GOVERNMENT / PRIVATE PROFILE COMPLETION CALLOUT */}
      <ProfileCompletionCard role="government" />

      {/* Toast Notification */}
      {statusToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusToast}</span>
          </div>
          <button onClick={() => setStatusToast('')} className="text-emerald-700 hover:text-emerald-900 text-xs underline">
            Dismiss
          </button>
        </div>
      )}

      {/* OFFICIAL GOVERNMENT REGULATORY POLICY NOTICE (Strict Role Separation Rule) */}
      {portalMode === 'government' ? (
        <div className="p-4 rounded-2xl bg-teal-50/90 border border-teal-200 text-teal-950 text-xs shadow-xs flex items-start gap-3">
          <div className="w-7 h-7 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold uppercase tracking-wider text-[10px] bg-teal-200/80 text-teal-900 px-2 py-0.5 rounded-md">
                Official Regulatory Policy Notice
              </span>
              <span className="text-[11px] text-teal-800 font-bold">
                State Workforce Surveillance Mandate
              </span>
            </div>
            <p className="mt-1 leading-relaxed text-teal-900/90 font-medium">
              Under state employment governance rules, <strong>examination admit cards and corporate interviews can only be generated and dispatched from the Private Industry Dashboard</strong> by accredited corporate testing boards (TCS iON, NITA, etc.). The <strong>Government Dashboard tracks and audits those applicants</strong> without issuing cards or scheduling interviews directly.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 text-xs shadow-xs flex items-start gap-3">
          <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold uppercase tracking-wider text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                Private Industry Testing Authority
              </span>
              <span className="text-[11px] text-amber-900 font-bold">
                Official Exam Card & Interview Dispatcher Active
              </span>
            </div>
            <p className="mt-1 leading-relaxed text-amber-900 font-medium">
              As an accredited private testing authority or corporate employer, you have full authority to <strong>Schedule Corporate Interviews</strong> and <strong>Generate & Issue Official Examination Admit Cards / Hall Tickets</strong> for verified candidates. All dispatched records synchronize in real time to the Central Database and Government Oversight portal.
            </p>
          </div>
        </div>
      )}

      {/* Real-time Job Applications Ticker / Alert Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-900 via-[#0F4C47] to-teal-800 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <Bell className="w-4 h-4 text-teal-200 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold uppercase tracking-wider text-[10px] text-teal-300 bg-black/30 px-2 py-0.5 rounded-md">
                Live Applicant Feed
              </span>
              <span className="text-[11px] text-teal-100 font-semibold">
                Updated every 10–15 mins • {jobApplications.length} Recent Applications
              </span>
            </div>
            <p className="font-medium text-white/90 text-xs mt-0.5">
              Latest: <span className="font-bold">{jobApplications[0]?.candidateName}</span> ({jobApplications[0]?.district}) applied for <span className="underline">{jobApplications[0]?.appliedRole}</span> • Certified in {jobApplications[0]?.skill} ({jobApplications[0]?.timeAgo})
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (portalMode === 'private') {
              setAnalyticsView('private-sourcing');
            } else {
              setAnalyticsView('tracking');
            }
          }}
          className="px-3.5 py-1.5 rounded-xl bg-white text-[#0F4C47] hover:bg-teal-50 text-xs font-black transition-all shrink-0 self-start sm:self-auto shadow-sm"
        >
          {portalMode === 'private' ? 'Open Private Recruitment Portal →' : 'View Applicant Tracking Matrix →'}
        </button>
      </div>

      {/* Analytics Sub-Nav Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {portalMode === 'government' ? (
          [
            { id: 'overview', label: 'Program Overview' },
            { id: 'tracking', label: 'Applicant Tracking & Audit Matrix (Govt Tracking)' },
            { id: 'registry', label: 'Master Profiles Excel Registry (Backend)' },
            { id: 'drilldown', label: 'District Drilldown (Clickable)' },
            { id: 'cohorts', label: 'Cohort Trends (Clickable)' },
            { id: 'providers', label: 'Provider Performance' },
            { id: 'demographics', label: 'Demographic Parity' },
            { id: 'insights', label: 'Evidence-Based Insights' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setAnalyticsView(tab.id);
                if (tab.id === 'drilldown') setActiveTab('government-drilldown');
                else if (tab.id === 'cohorts') setActiveTab('government-cohorts');
                else if (tab.id === 'tracking') setActiveTab('government-tracking');
                else if (tab.id === 'registry') setActiveTab('government-registry');
                else setActiveTab('government');
              }}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                analyticsView === tab.id
                  ? 'bg-[#0F4C47] text-white shadow-sm font-extrabold'
                  : 'bg-white border border-[#E5EFEA] text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))
        ) : (
          [
            { id: 'private-sourcing', label: 'Corporate Recruitment & Exam Card Dispatch (Private Dashboard)' },
            { id: 'registry', label: 'Master Profiles Excel Registry (Backend)' },
            { id: 'tracking', label: 'Application Status Audit' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setAnalyticsView(tab.id);
                if (tab.id === 'private-sourcing') setActiveTab('government-private');
                else if (tab.id === 'registry') setActiveTab('government-registry');
                else if (tab.id === 'tracking') setActiveTab('government-tracking');
              }}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                analyticsView === tab.id
                  ? 'bg-[#10554F] text-white shadow-sm font-extrabold'
                  : 'bg-white border border-[#E5EFEA] text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))
        )}
      </div>

      {/* ======================================================== */}
      {/* VIEW 1: PROGRAM OVERVIEW                                 */}
      {/* ======================================================== */}
      {analyticsView === 'overview' && (
        <div className="space-y-6">
          {/* KPI Normalized Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="farming-card p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Enrolled</div>
              <div className="text-lg font-black text-slate-900 mt-0.5">{totalEnrolled.toLocaleString()}</div>
              <div className="text-[11px] text-slate-500 mt-1">Across 6 districts</div>
            </div>

            <div className="farming-card p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Certified Passed</div>
              <div className="text-lg font-black text-[#0F4C47] mt-0.5">{totalCompleted.toLocaleString()}</div>
              <div className="text-[11px] text-emerald-600 font-bold mt-1">86% Completion</div>
            </div>

            <div className="farming-card p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Employed / Placed</div>
              <div className="text-lg font-black text-teal-700 mt-0.5">{totalEmployed.toLocaleString()}</div>
              <div className="text-[11px] text-teal-800 font-bold mt-1">81% Conversion</div>
            </div>

            <div className="farming-card p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase">6M Retention</div>
              <div className="text-lg font-black text-emerald-700 mt-0.5">78%</div>
              <div className="text-[11px] text-slate-500 mt-1">Verified sustained job</div>
            </div>

            <div className="farming-card p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Active Districts</div>
              <div className="text-lg font-black text-slate-900 mt-0.5">{districts.length}</div>
              <div className="text-[11px] text-teal-700 font-bold mt-1">100% On-Track</div>
            </div>

            <div className="farming-card p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Wage Range</div>
              <div className="text-lg font-black text-slate-900 mt-0.5">₹4.8–7.5L</div>
              <div className="text-[11px] text-slate-500 mt-1">State avg baseline</div>
            </div>
          </div>

          {/* District Outcome Matrix Table (Clickable!) */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  District Outcome Matrix (Click any District to Drill Down)
                </h3>
                <p className="text-xs text-slate-500">
                  Select a district row to open deep-dive metrics, regional centers, and localized employer demand.
                </p>
              </div>
              <span className="text-xs text-teal-800 font-bold bg-[#E2F1ED] px-3 py-1 rounded-xl">
                Clickable Rows
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="py-2.5 font-bold">District / State</th>
                    <th className="py-2.5 font-bold">Enrolled</th>
                    <th className="py-2.5 font-bold">Completed</th>
                    <th className="py-2.5 font-bold">Completion %</th>
                    <th className="py-2.5 font-bold">Employed</th>
                    <th className="py-2.5 font-bold">Conversion %</th>
                    <th className="py-2.5 font-bold">6M Retention</th>
                    <th className="py-2.5 font-bold">Avg Wage</th>
                    <th className="py-2.5 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {districts.map((d) => (
                    <tr
                      key={d.id}
                      onClick={() => setSelectedDistrictModal(d)}
                      className="hover:bg-teal-50/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3 font-bold text-slate-900">
                        <div className="flex items-center gap-1.5 text-[#0F4C47] hover:underline font-extrabold">
                          <MapPin className="w-3.5 h-3.5 text-teal-700" />
                          <span>{d.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal pl-5">{d.state}</div>
                      </td>
                      <td className="py-3 text-slate-700">{d.enrolled.toLocaleString()}</td>
                      <td className="py-3 text-slate-700">{d.completed.toLocaleString()}</td>
                      <td className="py-3 font-bold text-[#0F4C47]">{d.completionRate}%</td>
                      <td className="py-3 text-slate-700">{d.employed.toLocaleString()}</td>
                      <td className="py-3 font-extrabold text-teal-700">{d.employmentConversion}%</td>
                      <td className="py-3 text-slate-700">{d.retentionRate}%</td>
                      <td className="py-3 font-medium text-slate-800">{d.avgWageBand}</td>
                      <td className="py-3 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDistrictModal(d);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-teal-50 text-[#0F4C47] font-bold text-[11px] hover:bg-teal-100 transition-colors"
                        >
                          Deep Dive →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 2: DISTRICT DRILLDOWN (CLICKABLE CARDS & FILTERS)   */}
      {/* ======================================================== */}
      {analyticsView === 'drilldown' && (
        <div className="space-y-5">
          {/* Clickable District Cards Banner */}
          <div className="farming-card p-6">
            <h3 className="font-extrabold text-base text-slate-900 mb-1">
              Select District to Inspect Regional Outcomes
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Click any district card below to load contextual intelligence, localized skill gap indices, and hiring entities:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {districts.map((d) => {
                const isSelected = selectedDistrict === d.name;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDistrict(d.name)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#0F4C47] bg-[#E2F1ED] shadow-sm ring-2 ring-[#0F4C47]/20'
                        : 'border-slate-200 hover:border-teal-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-1 text-xs font-black text-slate-900">
                      <MapPin className="w-3 h-3 text-[#0F4C47]" />
                      <span className="truncate">{d.name}</span>
                    </div>
                    <div className="text-[11px] font-bold text-teal-800 mt-1">
                      {d.employmentConversion}% Placed
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {d.enrolled} Enrolled
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="farming-card p-5">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Multi-Dimensional Cross Filtering
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Filter program outcomes across District → Provider → Course → Cohort → Demographic Group.
            </p>

            {/* Filter controls row */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-600 block mb-1">1. District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-2 bg-[#F5F8F7] border border-slate-200 rounded-xl font-semibold outline-none"
                >
                  <option value="All">All Districts</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">2. Provider</label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full p-2 bg-[#F5F8F7] border border-slate-200 rounded-xl font-semibold outline-none"
                >
                  <option value="All">All Providers</option>
                  {providers.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">3. Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full p-2 bg-[#F5F8F7] border border-slate-200 rounded-xl font-semibold outline-none"
                >
                  <option value="All">All Courses</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title.split('&')[0]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">4. Cohort</label>
                <select
                  value={selectedCohort}
                  onChange={(e) => setSelectedCohort(e.target.value)}
                  className="w-full p-2 bg-[#F5F8F7] border border-slate-200 rounded-xl font-semibold outline-none"
                >
                  <option value="All">All Cohorts</option>
                  {cohorts.map((ch) => (
                    <option key={ch.id} value={ch.id}>{ch.name.split(' ')[0]} 2026</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">5. Gender</label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full p-2 bg-[#F5F8F7] border border-slate-200 rounded-xl font-semibold outline-none"
                >
                  <option value="All">All Genders</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drilldown Outcome Records */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-extrabold text-slate-900">
                Matching Learner Outcomes ({filteredLearners.length} Records)
              </h4>
              <span className="text-xs text-slate-500">
                Active Filter: {selectedDistrict} / {selectedCourse} / {selectedCohort}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="py-2 font-bold">Learner</th>
                    <th className="py-2 font-bold">District</th>
                    <th className="py-2 font-bold">Gender</th>
                    <th className="py-2 font-bold">Target Career</th>
                    <th className="py-2 font-bold">Score</th>
                    <th className="py-2 font-bold">Employment</th>
                    <th className="py-2 font-bold">Wage Range</th>
                    <th className="py-2 font-bold">Relevance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLearners.map((lrn) => (
                    <tr key={lrn.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 font-bold text-slate-900">{lrn.name}</td>
                      <td className="py-2.5 text-slate-600">{lrn.district}</td>
                      <td className="py-2.5 text-slate-600">{lrn.gender || 'Female'}</td>
                      <td className="py-2.5 font-medium text-slate-800">{lrn.targetCareer || 'Specialist'}</td>
                      <td className="py-2.5 font-bold text-[#0F4C47]">{lrn.assessmentScore || 8}/10</td>
                      <td className="py-2.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            lrn.employmentStatus === 'Employed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {lrn.employmentStatus}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-700">{lrn.wageBand || '₹5–7 LPA'}</td>
                      <td className="py-2.5 text-slate-600">{lrn.trainingRelevance || 'Relevant'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW 3: COHORT TRENDS (CLICKABLE CARDS & TIMELINE)      */}
      {/* ======================================================== */}
      {analyticsView === 'cohorts' && (
        <div className="space-y-5">
          <div className="farming-card p-6">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Cohort Longitudinal Trends (Click any Cohort to inspect details)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Tracking outcome improvements and retention metrics across sequential training intakes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {cohorts.map((cohort) => (
                <div
                  key={cohort.id}
                  onClick={() => setSelectedCohortModal(cohort)}
                  className="p-5 rounded-2xl bg-[#F8FAF9] border border-[#E5EFEA] hover:border-teal-400 cursor-pointer transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] uppercase font-bold text-teal-700 tracking-wider">
                      {cohort.period}
                    </div>
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-full">
                      Click to inspect
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 mt-1">{cohort.name}</h4>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Enrolled:</span>
                      <span className="font-bold text-slate-900">{cohort.enrolled.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Completion Rate:</span>
                      <span className="font-bold text-[#0F4C47]">{cohort.completionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Employment Conversion:</span>
                      <span className="font-extrabold text-teal-700">{cohort.employmentConversion}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">6-Month Retention:</span>
                      <span className="font-bold text-emerald-700">{cohort.retentionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-slate-500">Avg Wage Band:</span>
                      <span className="font-extrabold text-slate-900">{cohort.avgWageRange}</span>
                    </div>
                  </div>

                  {cohort.note && (
                    <div className="mt-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 font-medium">
                      ✓ {cohort.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW: PRIVATE INDUSTRY RECRUITMENT & EXAM CARD DISPATCH  */}
      {/* (EXCLUSIVE TO PRIVATE DASHBOARD MODE)                    */}
      {/* ======================================================== */}
      {analyticsView === 'private-sourcing' && (
        <div className="space-y-5">
          <div className="farming-card p-6 border-2 border-teal-600/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 uppercase tracking-wider">
                  🏢 Private Industry Testing Authority & Hiring
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Private Corporate Interview Scheduling & Exam Admit Card Generator
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Screen qualified talent from central registry. Private employers & accredited testing boards can schedule corporate interviews or generate and issue official examination admit cards.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
                  {filteredCandidates.length} Candidates Available
                </span>
              </div>
            </div>

            {/* Filter controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidate name, degree, skill..."
                  value={talentSearch}
                  onChange={(e) => setTalentSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4C47] outline-none"
                />
              </div>

              <div>
                <select
                  value={talentSkillFilter}
                  onChange={(e) => setTalentSkillFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0F4C47] outline-none bg-white"
                >
                  <option value="All">All Certified Skills</option>
                  <option value="Database Systems & SQL">Database Systems & SQL</option>
                  <option value="Python Backend APIs">Python Backend APIs</option>
                  <option value="Cloud DevOps & Linux">Cloud DevOps & Linux</option>
                  <option value="Industrial Automation & PLC">Industrial Automation & PLC</option>
                </select>
              </div>

              <div>
                <select
                  value={talentDistrictFilter}
                  onChange={(e) => setTalentDistrictFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0F4C47] outline-none bg-white"
                >
                  <option value="All">All Districts / Cities</option>
                  <option value="Bengaluru Urban">Bengaluru Urban</option>
                  <option value="Hassan">Hassan</option>
                  <option value="Mysuru">Mysuru</option>
                  <option value="Belagavi">Belagavi</option>
                  <option value="Dharwad">Dharwad</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>
            </div>

            {/* Candidate Cards Grid with Private Action Buttons */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCandidates.map((cand) => (
                <div
                  key={cand.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-teal-500 transition-all shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-slate-900">{cand.name}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-[#0F4C47]">
                            Score: {cand.score}%
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-teal-700" />
                          <span>{cand.district}</span>
                          <span>•</span>
                          <span>{cand.education}</span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                        cand.status.includes('Scheduled') || cand.status.includes('Exam Card')
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}>
                        {cand.status}
                      </span>
                    </div>

                    <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          Verified Skill Learned on Portal:
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700">✓ Assessment Pass</span>
                      </div>
                      <div className="font-extrabold text-[#0F4C47] text-xs">
                        {cand.certifiedSkill}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Target Industry: <span className="font-semibold text-slate-700">{cand.targetIndustry}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Action Buttons EXCLUSIVE TO PRIVATE DASHBOARD */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCandidateForInterview(cand)}
                      className="px-3.5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 hover:scale-[1.02]"
                      title="Schedule a corporate technical interview with an accredited employer"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Schedule Corporate Interview</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedCandidateForExam(cand)}
                      className="px-3.5 py-2 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 hover:scale-[1.02]"
                      title="Generate official examination admit card from private testing board"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-300" />
                      <span>Generate & Issue Exam Card</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW: GOVERNMENT APPLICANT TRACKING & AUDIT MATRIX       */}
      {/* (STRICT OVERSIGHT ONLY - NO INTERVIEW OR EXAM BUTTONS)   */}
      {/* ======================================================== */}
      {analyticsView === 'tracking' && (
        <div className="space-y-5">
          <div className="farming-card p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 uppercase tracking-wider">
                  🛡️ Government Regulatory Oversight Matrix
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Applicant Tracking & Private Testing Board Audit Trail
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  State officials monitor candidate progression, private exam admit cards, and corporate interview milestones. Under state policy, exam cards and interviews are generated exclusively by accredited Private Testing Boards.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200">
                  {filteredCandidates.length} Tracked Applicants
                </span>
              </div>
            </div>

            {/* Tracking Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search candidate name, degree, skill..."
                  value={talentSearch}
                  onChange={(e) => setTalentSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4C47] outline-none"
                />
              </div>

              <div>
                <select
                  value={talentSkillFilter}
                  onChange={(e) => setTalentSkillFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0F4C47] outline-none bg-white"
                >
                  <option value="All">All Certified Skills</option>
                  <option value="Database Systems & SQL">Database Systems & SQL</option>
                  <option value="Python Backend APIs">Python Backend APIs</option>
                  <option value="Cloud DevOps & Linux">Cloud DevOps & Linux</option>
                  <option value="Industrial Automation & PLC">Industrial Automation & PLC</option>
                </select>
              </div>

              <div>
                <select
                  value={talentDistrictFilter}
                  onChange={(e) => setTalentDistrictFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0F4C47] outline-none bg-white"
                >
                  <option value="All">All Districts / Cities</option>
                  <option value="Bengaluru Urban">Bengaluru Urban</option>
                  <option value="Hassan">Hassan</option>
                  <option value="Mysuru">Mysuru</option>
                  <option value="Belagavi">Belagavi</option>
                  <option value="Dharwad">Dharwad</option>
                  <option value="Pune">Pune</option>
                </select>
              </div>
            </div>

            {/* Government Applicant Tracking Table (Strict Read-Only) */}
            <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase text-[10px]">
                    <th className="p-3">Candidate & Location</th>
                    <th className="p-3">Education & Verified Skill</th>
                    <th className="p-3">Target Industry</th>
                    <th className="p-3">Private Interview Status</th>
                    <th className="p-3">Private Exam Admit Card Status</th>
                    <th className="p-3 text-right">Government Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCandidates.map((cand) => (
                    <tr key={cand.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3">
                        <div className="font-extrabold text-slate-900">{cand.name}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-teal-700" />
                          <span>{cand.district}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-slate-800">{cand.education}</div>
                        <div className="text-[11px] text-teal-800 font-bold mt-0.5">
                          ✓ {cand.certifiedSkill} ({cand.score}%)
                        </div>
                      </td>
                      <td className="p-3 text-slate-700 font-semibold">
                        {cand.targetIndustry}
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full inline-block ${
                          cand.privateInterviewStatus?.includes('Scheduled') || cand.status?.includes('Scheduled')
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {cand.privateInterviewStatus || cand.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full inline-block ${
                          cand.privateExamStatus?.includes('Issued') || cand.status?.includes('Exam Card')
                            ? 'bg-teal-100 text-[#0F4C47] border border-teal-300 font-extrabold'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {cand.privateExamStatus || 'Awaiting Private Exam Card'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedCandidateForAudit(cand)}
                          className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F4C47] text-xs font-bold transition-all flex items-center gap-1.5 ml-auto border border-teal-200"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Audit Dossier</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Read-only Governance Footer Note */}
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px] flex items-center justify-between">
              <span className="font-medium">
                🔒 <strong>Government Role Constraint</strong>: Direct exam card generation and interview dispatch buttons are restricted to the Private Dashboard.
              </span>
              <span className="text-teal-800 font-bold">100% Audit Verified</span>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* VIEW: MASTER LEARNER PROFILES BACKEND EXCEL DATABASE     */}
      {/* (SHARED ACROSS GOVERNMENT & PRIVATE PORTALS)              */}
      {/* ======================================================== */}
      {analyticsView === 'registry' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="farming-card p-6 border-2 border-emerald-600/30">
            {/* Header with Excel branding */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#107C41] text-white flex items-center justify-center font-black text-xs shadow-xs">
                    X
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                    Live Central Database • Excel Sync Active
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Sheet: <strong className="text-slate-800 font-mono">Candidate_Profiles_Master_Registry.xlsx</strong>
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Master Candidate Profiles Excel Backend Database
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  Central repository storing completed candidate profiles. When any learner completes their profile, the backend generates and appends their details into this live spreadsheet, synchronized across Institution and Government/Private portals.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
                <button
                  type="button"
                  onClick={() => exportRegistryToCSV(null, 'Government_Private_Master_Profiles_Registry.csv')}
                  className="px-4 py-2.5 rounded-xl bg-[#107C41] hover:bg-[#0D6535] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02]"
                  title="Download complete candidate profiles database as an Excel spreadsheet (.csv file)"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Excel Sheet (.csv)</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-800 uppercase">Profiles Stored</div>
                <div className="text-lg font-black text-emerald-900 mt-0.5">{learnerProfilesRegistry.length} Records</div>
                <div className="text-[11px] text-emerald-700">100% Completed Profiles</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Backend Sync</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">Live & Connected</div>
                <div className="text-[11px] text-teal-700">Real-time writing</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Sync Nodes</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">3 Active Portals</div>
                <div className="text-[11px] text-slate-600">Learner + Inst + Govt/Pvt</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Export Format</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">UTF-8 .CSV / .XLSX</div>
                <div className="text-[11px] text-slate-600">Excel compatible</div>
              </div>
            </div>

            {/* Search & Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="relative sm:col-span-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Excel sheet by Candidate ID, Name, Email, Degree, City..."
                  value={registrySearch}
                  onChange={(e) => setRegistrySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#107C41] outline-none"
                />
              </div>

              <div>
                <select
                  value={registryIndustryFilter}
                  onChange={(e) => setRegistryIndustryFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#107C41] outline-none bg-white"
                >
                  <option value="All">All Target Industries</option>
                  <option value="IT & Software Engineering">IT & Software Engineering</option>
                  <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                  <option value="Renewable Energy & EV Tech">Renewable Energy & EV Tech</option>
                  <option value="Advanced Manufacturing & Robotics">Advanced Manufacturing & Robotics</option>
                </select>
              </div>
            </div>

            {/* SPREADSHEET VIEWER UI */}
            <div className="mt-4 rounded-2xl border border-slate-300 overflow-hidden shadow-xs bg-white">
              {/* Excel Ribbon / Toolbar Header */}
              <div className="bg-[#107C41] text-white px-4 py-2 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-3">
                  <span className="bg-white/20 px-2 py-0.5 rounded text-[11px] font-mono">FILE</span>
                  <span className="text-white/80 hover:text-white cursor-pointer">HOME</span>
                  <span className="text-white/80 hover:text-white cursor-pointer">INSERT</span>
                  <span className="text-white/80 hover:text-white cursor-pointer">DATA</span>
                  <span className="text-white/80 hover:text-white cursor-pointer hidden sm:inline">VIEW</span>
                </div>
                <div className="text-[11px] text-emerald-100 font-mono">
                  Rows: {learnerProfilesRegistry.length} | Columns: 13 (A–M)
                </div>
              </div>

              {/* Table with Excel Column Letters and Row Numbers */}
              <div className="overflow-x-auto max-h-[520px]">
                <table className="w-full text-left text-xs border-collapse font-sans">
                  <thead>
                    {/* Excel Column Headers: A, B, C, D... */}
                    <tr className="bg-slate-100 border-b border-slate-300 text-slate-500 font-mono text-[10px] text-center select-none">
                      <th className="py-1 px-2 border-r border-slate-300 w-10 bg-slate-200">#</th>
                      <th className="py-1 px-3 border-r border-slate-300">A</th>
                      <th className="py-1 px-3 border-r border-slate-300">B</th>
                      <th className="py-1 px-3 border-r border-slate-300">C</th>
                      <th className="py-1 px-3 border-r border-slate-300">D</th>
                      <th className="py-1 px-3 border-r border-slate-300">E</th>
                      <th className="py-1 px-3 border-r border-slate-300">F</th>
                      <th className="py-1 px-3 border-r border-slate-300">G</th>
                      <th className="py-1 px-3 border-r border-slate-300">H</th>
                      <th className="py-1 px-3 border-r border-slate-300">I</th>
                      <th className="py-1 px-3 border-r border-slate-300">J</th>
                      <th className="py-1 px-3 border-r border-slate-300">K</th>
                      <th className="py-1 px-3">L</th>
                    </tr>

                    {/* Named Data Column Headers */}
                    <tr className="bg-slate-50 border-b-2 border-slate-300 text-slate-700 text-[11px] font-black uppercase tracking-wider">
                      <th className="p-2 border-r border-slate-200 text-center text-slate-400 bg-slate-100">Row</th>
                      <th className="p-2.5 border-r border-slate-200">Candidate ID</th>
                      <th className="p-2.5 border-r border-slate-200">Full Name</th>
                      <th className="p-2.5 border-r border-slate-200">Contact (Email / Phone)</th>
                      <th className="p-2.5 border-r border-slate-200">Location (City, State, Country)</th>
                      <th className="p-2.5 border-r border-slate-200">Education Degree & Institution</th>
                      <th className="p-2.5 border-r border-slate-200">Preferred Languages</th>
                      <th className="p-2.5 border-r border-slate-200">Target Industry</th>
                      <th className="p-2.5 border-r border-slate-200">Target Role</th>
                      <th className="p-2.5 border-r border-slate-200">Verified Skills</th>
                      <th className="p-2.5 border-r border-slate-200 text-center">Profile %</th>
                      <th className="p-2.5 border-r border-slate-200">Registry Timestamp</th>
                      <th className="p-2.5">Private Testing Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                    {learnerProfilesRegistry
                      .filter(p => {
                        const searchLower = registrySearch.toLowerCase();
                        const matchesSearch =
                          p.name?.toLowerCase().includes(searchLower) ||
                          p.id?.toLowerCase().includes(searchLower) ||
                          p.email?.toLowerCase().includes(searchLower) ||
                          p.city?.toLowerCase().includes(searchLower) ||
                          p.education?.toLowerCase().includes(searchLower);
                        const matchesIndustry = registryIndustryFilter === 'All' || p.targetIndustry === registryIndustryFilter;
                        return matchesSearch && matchesIndustry;
                      })
                      .map((profile, idx) => (
                        <tr key={profile.id || idx} className="hover:bg-emerald-50/40 transition-colors">
                          <td className="p-2 border-r border-slate-200 text-center font-bold text-slate-400 bg-slate-50">
                            {idx + 1}
                          </td>
                          <td className="p-2.5 border-r border-slate-200 font-bold text-teal-800 whitespace-nowrap">
                            {profile.id}
                          </td>
                          <td className="p-2.5 border-r border-slate-200 font-bold text-slate-900 font-sans whitespace-nowrap">
                            {profile.name}
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-600 font-sans whitespace-nowrap">
                            <div>{profile.email}</div>
                            <div className="text-[10px] text-slate-400">{profile.phone}</div>
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-700 font-sans whitespace-nowrap">
                            {profile.city}, {profile.state} ({profile.country})
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-700 font-sans min-w-[200px]">
                            <div className="font-bold text-slate-900">{profile.education}</div>
                            <div className="text-[10px] text-slate-500">{profile.institution}</div>
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-700 font-sans whitespace-nowrap">
                            {profile.languages || 'English, Hindi'}
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-800 font-sans font-semibold whitespace-nowrap">
                            {profile.targetIndustry}
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-700 font-sans whitespace-nowrap">
                            {profile.targetRole}
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-700 font-sans min-w-[180px]">
                            <span className="bg-teal-50 text-teal-900 px-2 py-0.5 rounded text-[10px] font-bold">
                              {profile.skills}
                            </span>
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-center font-bold">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-black">
                              {profile.completionRate || 100}%
                            </span>
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-500 text-[10px] whitespace-nowrap">
                            {profile.timestamp}
                          </td>
                          <td className="p-2.5 font-sans whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-[#0F4C47] border border-teal-200">
                              {profile.privateInterviewStatus || 'Available for Corporate Review'}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Excel Status Bar at Bottom */}
              <div className="bg-slate-100 border-t border-slate-200 px-4 py-1.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Ready • 100% Synced with Central Registry</span>
                <span>Microsoft Excel Compatible Format (.CSV / .XLSX)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: PROVIDER COMPARISON */}
      {analyticsView === 'providers' && (
        <div className="space-y-5">
          <div className="farming-card p-6">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Provider Comparative Performance Matrix
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Comparing institutions on enrollment, completion, conversion, and longitudinal retention.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {providers.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl bg-white border border-[#E5EFEA] shadow-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {p.type}
                      </span>
                      <h4 className="font-extrabold text-base text-slate-900 mt-1">{p.name}</h4>
                      <div className="text-xs text-slate-500 mt-0.5">{p.location}</div>
                    </div>

                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {p.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center mt-4 pt-3 border-t border-slate-100">
                    <div className="p-2 rounded-xl bg-slate-50">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Completion</div>
                      <div className="text-sm font-black text-slate-900 mt-0.5">{p.overallCompletionRate}%</div>
                    </div>

                    <div className="p-2 rounded-xl bg-teal-50">
                      <div className="text-[10px] text-teal-700 font-bold uppercase">Conversion</div>
                      <div className="text-sm font-black text-[#0F4C47] mt-0.5">{p.employmentConversionRate}%</div>
                    </div>

                    <div className="p-2 rounded-xl bg-emerald-50">
                      <div className="text-[10px] text-emerald-700 font-bold uppercase">6M Retention</div>
                      <div className="text-sm font-black text-emerald-700 mt-0.5">{p.sixMonthRetentionRate}%</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 6: DEMOGRAPHIC PARITY ANALYSIS */}
      {analyticsView === 'demographics' && (
        <div className="space-y-5">
          <div className="farming-card p-6">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Demographic Outcome Parity Analysis
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Evaluating equity across Gender, Urban/Rural, and Education backgrounds.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Gender Dimension (Female vs Male)
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">Female Trainees (48% of cohort)</span>
                      <span className="font-bold text-teal-800">82% Conversion</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0F4C47] h-full rounded-full w-[82%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">Male Trainees (52% of cohort)</span>
                      <span className="font-bold text-teal-800">80% Conversion</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0F4C47] h-full rounded-full w-[80%]"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Geographic Dimension (Rural vs Urban)
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">Rural Districts (41% of cohort)</span>
                      <span className="font-bold text-teal-800">79% Conversion</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0F4C47] h-full rounded-full w-[79%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">Urban Tier-1 Districts (59% of cohort)</span>
                      <span className="font-bold text-teal-800">83% Conversion</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0F4C47] h-full rounded-full w-[83%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 7: EVIDENCE-BASED INSIGHTS */}
      {analyticsView === 'insights' && (
        <div className="space-y-5">
          <div className="farming-card p-6">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Evidence-Based Policy & Curriculum Insights
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Automated algorithmic flags synthesized from longitudinal post-training retention data.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-900">
                      High Impact Model: Industrial Automation & Cloud DevOps
                    </h4>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      Hybrid practical labs achieved 91% completion and 88% employment conversion with 83% 6-month retention.
                    </p>
                    <div className="mt-2 text-[11px] font-bold text-[#0F4C47] bg-white p-2 rounded-lg border border-emerald-200">
                      Supported Human Decision: Replicate state-funded micro-lab infrastructure across Hassan and Belagavi technical institutes.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE DISTRICT DOSSIER MODAL (WHEN DISTRICT ROW CLICKED) */}
      {selectedDistrictModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-teal-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#E2F1ED] text-[#0F4C47] flex items-center justify-center font-black">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {selectedDistrictModal.name} District Dossier
                  </h3>
                  <p className="text-xs text-slate-500">
                    State: {selectedDistrictModal.state} • Regional Skill-to-Job Matrix
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDistrictModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Total Enrolled</span>
                  <div className="text-base font-black text-slate-900">{selectedDistrictModal.enrolled.toLocaleString()}</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Completion Rate</span>
                  <div className="text-base font-black text-[#0F4C47]">{selectedDistrictModal.completionRate}%</div>
                </div>
                <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200">
                  <span className="text-[10px] text-teal-700 font-bold uppercase">Employment Conversion</span>
                  <div className="text-base font-black text-teal-900">{selectedDistrictModal.employmentConversion}%</div>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase">6M Retention</span>
                  <div className="text-base font-black text-emerald-900">{selectedDistrictModal.retentionRate}%</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl border border-slate-200 bg-white">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Average Starting Wage Band</span>
                <span className="text-sm font-extrabold text-slate-800">{selectedDistrictModal.avgWageBand}</span>
              </div>

              <div className="p-3 rounded-2xl bg-[#E2F1ED]/50 border border-teal-200 text-xs text-teal-950 leading-relaxed">
                <strong>Government Action Recommendation:</strong> Priority technical center expansion is verified for high-demand IT, Cloud & Robotics courses with local hiring partner tie-ups.
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  setSelectedDistrict(selectedDistrictModal.name);
                  setSelectedDistrictModal(null);
                  setAnalyticsView('drilldown');
                }}
                className="text-xs font-bold text-[#0F4C47] hover:underline"
              >
                Open in Full Multi-Dimensional Engine →
              </button>

              <button
                type="button"
                onClick={() => setSelectedDistrictModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE COHORT DOSSIER MODAL */}
      {selectedCohortModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-teal-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#E2F1ED] text-[#0F4C47] flex items-center justify-center font-black">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {selectedCohortModal.name} Analysis
                  </h3>
                  <p className="text-xs text-slate-500">
                    Intake Period: {selectedCohortModal.period} • Longitudinal Progress
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCohortModal(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Enrolled Cohort</span>
                  <div className="text-base font-black text-slate-900">{selectedCohortModal.enrolled.toLocaleString()} Trainees</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Completion Rate</span>
                  <div className="text-base font-black text-[#0F4C47]">{selectedCohortModal.completionRate}%</div>
                </div>
                <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200">
                  <span className="text-[10px] text-teal-700 font-bold uppercase">Employment Conversion</span>
                  <div className="text-base font-black text-teal-900">{selectedCohortModal.employmentConversion}%</div>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 font-bold uppercase">6M Retention</span>
                  <div className="text-base font-black text-emerald-900">{selectedCohortModal.retentionRate}%</div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Average Starting Wage Range</span>
                <span className="text-sm font-extrabold text-slate-900">{selectedCohortModal.avgWageRange}</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCohortModal(null)}
                className="px-4 py-2 rounded-xl bg-[#0F4C47] text-white text-xs font-bold"
              >
                Close Analysis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 1: SCHEDULE CORPORATE INTERVIEW (PRIVATE DASHBOARD) */}
      {/* ======================================================== */}
      {selectedCandidateForInterview && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-2xl border border-teal-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Schedule Corporate Technical Interview
                  </h3>
                  <p className="text-xs text-slate-500">
                    Candidate: <strong className="text-teal-900">{selectedCandidateForInterview.name}</strong> ({selectedCandidateForInterview.district})
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedCandidateForInterview(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDispatchInterview} className="space-y-3.5 mt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Private Corporate Employer</label>
                <select
                  value={interviewEmployer}
                  onChange={(e) => setInterviewEmployer(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium bg-white"
                >
                  <option value="Tata Consultancy Services (TCS) - Digital Systems">Tata Consultancy Services (TCS) - Digital Systems</option>
                  <option value="Infosys Technologies - Enterprise Cloud Division">Infosys Technologies - Enterprise Cloud Division</option>
                  <option value="Apex Tech Enterprises - Full Stack Division">Apex Tech Enterprises - Full Stack Division</option>
                  <option value="GreenMobility EV Labs - Embedded Automation">GreenMobility EV Labs - Embedded Automation</option>
                  <option value="Wipro Technologies - Infrastructure Services">Wipro Technologies - Infrastructure Services</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Interview Position / Role</label>
                <input
                  type="text"
                  required
                  value={interviewRole}
                  onChange={(e) => setInterviewRole(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Interview Date</label>
                  <input
                    type="date"
                    required
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Assessment Mode</label>
                  <select
                    value={interviewMode}
                    onChange={(e) => setInterviewMode(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium bg-white"
                  >
                    <option value="Virtual Technical Round (MS Teams)">Virtual Technical Round (MS Teams)</option>
                    <option value="Virtual Technical Round (Google Meet)">Virtual Technical Round (Google Meet)</option>
                    <option value="In-person Corporate Campus Panel">In-person Corporate Campus Panel</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-teal-50 rounded-xl text-teal-900 leading-relaxed border border-teal-100">
                Verified Proficiency: <strong>{selectedCandidateForInterview.certifiedSkill}</strong> (Assessment Score: <strong>{selectedCandidateForInterview.score}%</strong>). Candidate dossier will be sent to the hiring manager.
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedCandidateForInterview(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-black shadow-sm"
                >
                  Confirm & Dispatch Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: GENERATE PRIVATE EXAM ADMIT CARD MODAL          */}
      {/* ======================================================== */}
      {selectedCandidateForExam && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-2xl border border-teal-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Generate & Issue Private Exam Admit Card
                  </h3>
                  <p className="text-xs text-slate-500">
                    Candidate: <strong className="text-teal-900">{selectedCandidateForExam.name}</strong>
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedCandidateForExam(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDispatchExam} className="space-y-3.5 mt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Accredited Private Testing Authority</label>
                <select
                  value={privateTestingBoard}
                  onChange={(e) => setPrivateTestingBoard(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium bg-white"
                >
                  <option value="TCS iON National Qualifier Testing Service (NQT)">TCS iON National Qualifier Testing Service (NQT)</option>
                  <option value="National IT Assessment Council (NITA Private Board)">National IT Assessment Council (NITA Private Board)</option>
                  <option value="Apex Technical Certification Board">Apex Technical Certification Board</option>
                  <option value="GreenMobility Certified EV Systems Board">GreenMobility Certified EV Systems Board</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Examination Title</label>
                <input
                  type="text"
                  required
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Examination Date</label>
                  <input
                    type="date"
                    required
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Candidate Reporting Time</label>
                  <input
                    type="text"
                    required
                    value={examReportingTime}
                    onChange={(e) => setExamReportingTime(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Designated Examination Center</label>
                <input
                  type="text"
                  required
                  value={examCenter}
                  onChange={(e) => setExamCenter(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-950 leading-relaxed border border-emerald-200">
                Admit card generation will assign a unique secure roll number and create the official examination ticket for <strong>{selectedCandidateForExam.name}</strong>.
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedCandidateForExam(null)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white font-black shadow-sm"
                >
                  Generate & Issue Admit Card Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: OFFICIAL GENERATED EXAM ADMIT CARD / HALL TICKET */}
      {/* (DISPLAYED AFTER PRIVATE BOARD ISSUES ADMIT CARD)        */}
      {/* ======================================================== */}
      {generatedAdmitCard && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 z-60 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl border-2 border-emerald-600/40 relative max-h-[92vh] overflow-y-auto">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 print:hidden">
              <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Private Testing Board Official Hall Ticket</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Admit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGeneratedAdmitCard(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ADMIT CARD DOCUMENT BODY */}
            <div className="mt-4 p-6 rounded-2xl border-2 border-slate-900 bg-white font-sans text-xs">
              {/* Admit Card Header */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#107C41] text-white flex items-center justify-center font-black text-xl shadow-xs">
                    🎫
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-black uppercase tracking-tight text-slate-900">
                      {generatedAdmitCard.testingBoard}
                    </h2>
                    <p className="text-[11px] font-bold text-teal-800">
                      OFFICIAL EXAMINATION ADMIT CARD • HALL TICKET 2026
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      Gate Pass: {generatedAdmitCard.gatePassCode}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Admit Card Number</div>
                  <div className="text-base font-mono font-black text-[#0F4C47]">
                    {generatedAdmitCard.rollNo}
                  </div>
                </div>
              </div>

              {/* Candidate Info Grid */}
              <div className="grid grid-cols-3 gap-4 mt-4 pb-4 border-b border-slate-200">
                <div className="col-span-2 space-y-2">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Candidate Name</span>
                    <span className="text-sm font-black text-slate-900">{generatedAdmitCard.candidateName}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Contact Email</span>
                      <span className="font-semibold text-slate-700">{generatedAdmitCard.candidateEmail}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Home District</span>
                      <span className="font-semibold text-slate-700">{generatedAdmitCard.district}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Educational Qualification</span>
                    <span className="font-medium text-slate-800">{generatedAdmitCard.education}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Certified Platform Skill</span>
                    <span className="font-bold text-[#0F4C47]">{generatedAdmitCard.certifiedSkill}</span>
                  </div>
                </div>

                {/* Candidate Photo & Barcode Placeholder */}
                <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="w-20 h-24 rounded-lg bg-teal-100 flex items-center justify-center font-bold text-teal-800 text-xs border border-teal-300">
                    PHOTO AFFIXED
                  </div>
                  <div className="mt-2 font-mono text-[9px] text-slate-600 font-bold">
                    ||||||||||||||||||||||
                  </div>
                  <div className="text-[9px] font-mono text-slate-400">
                    {generatedAdmitCard.rollNo}
                  </div>
                </div>
              </div>

              {/* Examination Schedule Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 p-3.5 rounded-xl bg-teal-50/70 border border-teal-200">
                <div>
                  <span className="text-[10px] text-teal-800 font-bold uppercase block">Examination Title</span>
                  <span className="font-extrabold text-slate-900">{generatedAdmitCard.examName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-teal-800 font-bold uppercase block">Test Date & Reporting</span>
                  <span className="font-black text-slate-900">{generatedAdmitCard.examDate} • {generatedAdmitCard.reportingTime}</span>
                </div>
                <div>
                  <span className="text-[10px] text-teal-800 font-bold uppercase block">Designated Test Center</span>
                  <span className="font-medium text-slate-800 leading-snug">{generatedAdmitCard.center}</span>
                </div>
              </div>

              {/* Instructions & Signatures */}
              <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">Important Instructions for the Candidate:</p>
                <p>1. Candidate must bring a valid Government Photo ID (Aadhaar / Voter ID / Passport) along with this printed Admit Card.</p>
                <p>2. Electronic devices, smartwatches, and unauthorized calculators are strictly prohibited inside the testing hall.</p>
                <p>3. Gates will strictly close 15 minutes prior to the scheduled examination time.</p>
              </div>

              <div className="flex items-center justify-between pt-6 mt-4 border-t-2 border-slate-900">
                <div>
                  <p className="text-[10px] font-mono text-slate-500">Issued on: {generatedAdmitCard.issueTimestamp}</p>
                  <p className="text-[10px] text-slate-500">Security Hash: SHA-256 Verified</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xs">Controller of Examinations</p>
                  <p className="text-[10px] text-teal-800 font-bold">{generatedAdmitCard.testingBoard}</p>
                </div>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setGeneratedAdmitCard(null)}
                className="px-5 py-2.5 rounded-xl bg-[#0F4C47] text-white text-xs font-bold transition-all shadow-sm hover:scale-[1.02]"
              >
                Close & Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: GOVERNMENT APPLICANT AUDIT DOSSIER              */}
      {/* (STRICT READ-ONLY REGULATORY AUDIT FOR OFFICIALS)        */}
      {/* ======================================================== */}
      {selectedCandidateForAudit && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-7 shadow-2xl border border-teal-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    State Government Regulatory Audit Dossier
                  </h3>
                  <p className="text-xs text-slate-500">
                    Candidate: <strong className="text-teal-900">{selectedCandidateForAudit.name}</strong> ({selectedCandidateForAudit.district})
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedCandidateForAudit(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 mt-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Education Degree:</span>
                  <span className="font-bold text-slate-900">{selectedCandidateForAudit.education}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Verified Platform Skill:</span>
                  <span className="font-bold text-[#0F4C47]">✓ {selectedCandidateForAudit.certifiedSkill}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Standardized Assessment Score:</span>
                  <span className="font-bold text-emerald-700">{selectedCandidateForAudit.score}% (Pass)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Industry Sector:</span>
                  <span className="font-semibold text-slate-800">{selectedCandidateForAudit.targetIndustry}</span>
                </div>
              </div>

              {/* Private Industry Tracking Status */}
              <div className="p-3 bg-teal-50/80 rounded-xl border border-teal-200 space-y-1.5">
                <div className="text-[11px] font-black text-teal-900 uppercase">
                  Private Industry Testing & Interview Milestones
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-teal-100">
                  <span className="text-teal-800">Corporate Interview:</span>
                  <span className="font-bold text-slate-900">{selectedCandidateForAudit.privateInterviewStatus || selectedCandidateForAudit.status}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-teal-800">Exam Admit Card:</span>
                  <span className="font-bold text-[#0F4C47]">{selectedCandidateForAudit.privateExamStatus || 'Awaiting Private Testing Board Issuance'}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-100 rounded-xl text-slate-600 text-[11px] leading-relaxed">
                🔒 <strong>Regulatory Compliance Note</strong>: As per government policy, exam cards and interview appointments are issued solely by accredited private corporate boards. State oversight maintains compliance verification and employment retention audit.
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedCandidateForAudit(null)}
                  className="px-5 py-2 rounded-xl bg-teal-800 text-white font-bold"
                >
                  Close Audit Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
