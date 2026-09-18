import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Edit3,
  RotateCcw,
  User,
  Building,
  Briefcase,
  Shield,
  ChevronRight
} from 'lucide-react';

export const ProfileCompletionCard = ({ role = 'learner' }) => {
  const {
    openProfileWizard,
    learnerCompletion,
    institutionCompletion,
    employerCompletion,
    governmentCompletion,
    simulateBlankProfile,
    simulateFilledProfile
  } = useApp();

  const completion =
    role === 'learner'
      ? learnerCompletion
      : role === 'institution'
      ? institutionCompletion
      : role === 'employer'
      ? employerCompletion
      : governmentCompletion;

  const { percentage, passedCount, totalCount, missingFields, isComplete } = completion;

  // Determine starting step for "Complete Profile" button: first missing item's step or 1
  const firstMissingStep = missingFields.length > 0 ? missingFields[0].step : 1;

  const roleTitle =
    role === 'learner'
      ? 'Learner Profile'
      : role === 'institution'
      ? 'Institution Profile'
      : role === 'employer'
      ? 'Employer & Recruiter Profile'
      : 'Government Department Profile';

  return (
    <div className="farming-card p-5 sm:p-6 border-2 border-teal-600/20 bg-gradient-to-br from-white via-white to-teal-50/40 relative overflow-hidden shadow-sm">
      {/* Background soft accent badge */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-teal-100/40 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        {/* Left info */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-teal-100/80 text-[#0F4C47] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              {role === 'learner' && <User className="w-3 h-3" />}
              {role === 'institution' && <Building className="w-3 h-3" />}
              {role === 'employer' && <Briefcase className="w-3 h-3" />}
              {role === 'government' && <Shield className="w-3 h-3" />}
              <span>{roleTitle} Status</span>
            </span>

            {isComplete ? (
              <span className="flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified 100% Complete</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                <AlertCircle className="w-3 h-3" />
                <span>{missingFields.length} Items Pending</span>
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {isComplete ? 'Your Profile is Fully Optimized' : 'Complete Your Profile'}
          </h3>
          <p className="text-xs text-slate-600 mt-0.5 max-w-xl leading-relaxed">
            {isComplete
              ? 'Your comprehensive profile enables precise career path matching, longitudinal skill tracking, and personalized course recommendations.'
              : 'Complete key background details to receive tailored course recommendations and priority employer matching.'}
          </p>

          {/* Missing fields list */}
          {!isComplete && missingFields.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                Complete these to reach 100%:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {missingFields.slice(0, 5).map((mf) => (
                  <button
                    key={mf.id}
                    onClick={() => openProfileWizard(role, mf.step)}
                    className="text-[11px] font-semibold bg-white border border-amber-300 text-amber-900 hover:border-[#0F4C47] hover:text-[#0F4C47] px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                    title={`Click to fill Step ${mf.step}: ${mf.label}`}
                  >
                    <span>+ {mf.label}</span>
                    <span className="text-[9px] text-slate-400 font-mono">S{mf.step}</span>
                  </button>
                ))}
                {missingFields.length > 5 && (
                  <span className="text-[11px] text-slate-500 font-medium self-center">
                    +{missingFields.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Metric Gauge & CTAs - Bold, High-Contrast 100% Display */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between gap-3 shrink-0">
          <div className="flex flex-col items-start md:items-end">
            {/* Primary Percentage Display */}
            {isComplete ? (
              <div className="flex items-center gap-2.5 bg-emerald-600 text-white px-4 py-2 rounded-2xl shadow-sm border border-emerald-500">
                <CheckCircle2 className="w-5 h-5 text-emerald-100 shrink-0" />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-white">
                    100%
                  </span>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-100">
                    COMPLETE
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-baseline gap-2 md:justify-end">
                <span className="text-3xl sm:text-4xl font-black tracking-tight text-[#0F4C47]">
                  {percentage}%
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wide text-slate-500">
                  Completed
                </span>
              </div>
            )}

            <div className="w-40 sm:w-48 h-3 bg-slate-200 rounded-full overflow-hidden mt-2 border border-slate-100">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isComplete
                    ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600'
                    : 'bg-gradient-to-r from-teal-500 to-[#0F4C47]'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="text-[10px] font-semibold text-teal-800 mt-1 flex items-center gap-1 md:justify-end">
              <span>{passedCount} of {totalCount} sections verified</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-1">
            {!isComplete ? (
              <button
                type="button"
                onClick={() => openProfileWizard(role, firstMissingStep)}
                className="px-4 py-2 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02]"
              >
                <span>Complete Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => openProfileWizard(role, 1)}
                className="px-4 py-2 rounded-xl bg-teal-50 border border-teal-200 text-[#0F4C47] hover:bg-teal-100 text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}

            {/* Quick Demo Simulator Toggle */}
            <div className="dropdown relative group">
              <button
                type="button"
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors text-xs font-semibold"
                title="Simulation Options (Test 0% vs 100%)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 p-2 hidden group-hover:block z-30 animate-in fade-in">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-2 py-1">
                  Test Onboarding
                </span>
                <button
                  type="button"
                  onClick={() => simulateBlankProfile(role)}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-[#0F4C47] transition-colors"
                >
                  ⚡ Reset to 0% (New User)
                </button>
                <button
                  type="button"
                  onClick={() => simulateFilledProfile(role)}
                  className="w-full text-left px-2 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-teal-50 hover:text-[#0F4C47] transition-colors"
                >
                  ✓ Restore 100% Demo Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
