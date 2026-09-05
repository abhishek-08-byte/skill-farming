import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Building,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Award,
  Calendar
} from 'lucide-react';

export const EmploymentFollowup = () => {
  const { currentUser, updateEmploymentOutcome } = useApp();

  const outcome = currentUser.longitudinalOutcome || {
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    verificationStatus: 'Not verified (Future Authorized Ready)',
    employerName: 'InfraCloud Technologies',
    jobRole: 'Junior Backend Engineer',
    wageBand: '₹5–7 LPA',
    trainingRelevance: 'Highly relevant',
    timeline: []
  };

  // State for interactive follow-up form
  const [formStatus, setFormStatus] = useState(outcome.employmentStatus);
  const [unemployedReason, setUnemployedReason] = useState(outcome.unemployedReason || '');
  const [employerName, setEmployerName] = useState(outcome.employerName || '');
  const [jobRole, setJobRole] = useState(outcome.jobRole || '');
  const [wageBand, setWageBand] = useState(outcome.wageBand || '₹5–7 LPA');
  const [trainingRelevance, setTrainingRelevance] = useState(outcome.trainingRelevance || 'Highly relevant');
  const [feedback, setFeedback] = useState(outcome.curriculumFeedback || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveOutcome = (e) => {
    e.preventDefault();
    updateEmploymentOutcome({
      employmentStatus: formStatus,
      unemployedReason: formStatus === 'Unemployed' ? unemployedReason : null,
      employerName: formStatus === 'Employed' ? employerName : '',
      jobRole: formStatus === 'Employed' ? jobRole : '',
      wageBand,
      trainingRelevance,
      curriculumFeedback: feedback
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="farming-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
            <Briefcase className="w-4 h-4" />
            <span>Longitudinal Outcome Tracker</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Career, Employment & Retention Tracking
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Measuring real career progression, wage progression, and training-to-job relevance post-completion.
          </p>
        </div>

        {/* Data Source Transparency Badge */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 max-w-sm flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <span className="font-bold">Data Source Transparency:</span> Current status is <strong className="underline">Self-Reported</strong>. Verified status requires authorized employer / state integration.
          </div>
        </div>
      </div>

      {/* SUMMARY KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Current Status</div>
          <div className="text-base font-extrabold text-slate-900 mt-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span>{outcome.employmentStatus}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Source: <span className="font-semibold text-slate-700">{outcome.verificationSource}</span>
          </div>
        </div>

        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Wage Progression</div>
          <div className="text-base font-extrabold text-[#0F4C47] mt-1">
            {outcome.wageBand}
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">
            ↑ Upgraded from ₹3–5 LPA baseline
          </div>
        </div>

        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">6-Month Retention</div>
          <div className="text-base font-extrabold text-teal-700 mt-1">
            Confirmed Active
          </div>
          <div className="text-xs text-slate-500 mt-1">12-Month review in progress</div>
        </div>

        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Training Relevance</div>
          <div className="text-base font-extrabold text-slate-900 mt-1">
            {outcome.trainingRelevance}
          </div>
          <div className="text-xs text-slate-500 mt-1">Curriculum feedback recorded</div>
        </div>
      </div>

      {/* 2-COLUMNS: Follow-Up Questionnaire + Longitudinal Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Col 1: Interactive Employment Follow-Up Form */}
        <div className="farming-card p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Update Employment Status
              </h3>
              <p className="text-xs text-slate-500">
                Periodic post-training check-in questionnaire
              </p>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E2F1ED] text-[#0F4C47]">
              Step 1 of 1
            </span>
          </div>

          <form onSubmit={handleSaveOutcome} className="space-y-4 text-xs">
            {/* Employment Status Selector */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                What is your current employment status?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Employed', 'Unemployed', 'Self-employed', 'Freelancer', 'Apprenticeship', 'Other'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setFormStatus(status)}
                    className={`p-2 rounded-xl border text-center font-bold transition-all ${
                      formStatus === status
                        ? 'bg-[#0F4C47] text-white border-[#0F4C47] shadow-xs'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* If Unemployed: Ask structured reason */}
            {formStatus === 'Unemployed' && (
              <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                <label className="font-bold text-rose-900 block">
                  Why are you currently not employed?
                </label>
                <div className="space-y-1.5">
                  {[
                    'Could not find suitable job',
                    'Could not meet company requirements',
                    'Transportation problem',
                    'Personal / family reason',
                    'Course was not relevant',
                    'Other'
                  ].map((reason) => (
                    <label key={reason} className="flex items-center gap-2 text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="unemployedReason"
                        checked={unemployedReason === reason}
                        onChange={() => setUnemployedReason(reason)}
                        className="accent-[#0F4C47]"
                      />
                      <span>{reason}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* If Employed: Organization and Role */}
            {formStatus === 'Employed' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Employer / Company Name</label>
                  <input
                    type="text"
                    value={employerName}
                    onChange={(e) => setEmployerName(e.target.value)}
                    placeholder="e.g. InfraCloud Technologies"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Current Job Role</label>
                  <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    placeholder="e.g. Junior Backend Engineer"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                  />
                </div>
              </div>
            )}

            {/* Salary Range Selector */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                Current Annual Wage Range (INR)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Below ₹2 LPA', '₹2–3 LPA', '₹3–5 LPA', '₹5–7 LPA', '₹7–10 LPA', '₹10+ LPA'].map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setWageBand(range)}
                    className={`p-2 rounded-xl border text-center font-bold text-[11px] transition-all ${
                      wageBand === range
                        ? 'bg-[#E2F1ED] text-[#0F4C47] border-[#0F4C47]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Training to Job Relevance */}
            <div>
              <label className="font-bold text-slate-700 block mb-1.5">
                How relevant was your training to your actual workplace tasks?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Highly relevant', 'Relevant', 'Partially relevant', 'Not relevant'].map((rel) => (
                  <button
                    key={rel}
                    type="button"
                    onClick={() => setTrainingRelevance(rel)}
                    className={`p-2 rounded-xl border text-center font-bold text-[11px] transition-all ${
                      trainingRelevance === rel
                        ? 'bg-[#0F4C47] text-white border-[#0F4C47]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {rel}
                  </button>
                ))}
              </div>
            </div>

            {/* Curriculum Feedback */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Curriculum Feedback / What should be improved?
              </label>
              <textarea
                rows={2}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share actionable feedback on practical projects, tools, or industry examples..."
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <span>Submit Outcome Update</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {isSaved && (
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 text-center font-bold">
                ✓ Employment update recorded and added to your career timeline!
              </div>
            )}
          </form>
        </div>

        {/* Col 2: Longitudinal Career Timeline & Future-Ready Architecture */}
        <div className="space-y-5">
          {/* Longitudinal Timeline */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900">
                Longitudinal Career Timeline
              </h3>
              <span className="text-xs text-slate-400">Continuous Tracking</span>
            </div>

            <div className="relative pl-6 space-y-5 border-l-2 border-[#E2ECE8] ml-2">
              {outcome.timeline?.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#0F4C47] ring-4 ring-white"></div>
                  <div>
                    <span className="text-[11px] font-bold text-teal-700">{item.month}</span>
                    <h4 className="text-xs font-extrabold text-slate-900 mt-0.5">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Future-Ready Verification Architecture Card */}
          <div className="farming-card p-5 bg-[#F9FBFB] border-dashed">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Future-Ready Verification Architecture</span>
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Designed to connect with authorized state employment registers and employer verification portals without modifying front-facing schemas.
            </p>

            <div className="mt-3 flex items-center gap-2 text-[10px] font-semibold text-slate-600 overflow-x-auto pb-1">
              <span className="px-2 py-1 bg-white rounded-md border">Employment Record</span>
              <span>→</span>
              <span className="px-2 py-1 bg-white rounded-md border">Auth Verification Request</span>
              <span>→</span>
              <span className="px-2 py-1 bg-white rounded-md border">Employer / Authorized Source</span>
              <span>→</span>
              <span className="px-2 py-1 bg-teal-100 text-teal-800 rounded-md font-bold">Verified Status</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
