import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Save,
  Plus,
  Trash2,
  Edit3,
  Award,
  Building,
  Shield,
  User,
  Briefcase,
  GraduationCap,
  MapPin,
  Check,
  FileSpreadsheet,
  Download,
  Database,
  CheckCircle
} from 'lucide-react';

export const CompleteProfileWizard = () => {
  const { isProfileWizardOpen } = useApp();
  if (!isProfileWizardOpen) return null;
  return <CompleteProfileWizardModal />;
};

const CompleteProfileWizardModal = () => {
  const {
    closeProfileWizard,
    profileWizardRole,
    profileWizardInitialStep,
    currentUser,
    updateUserProfile,
    institutionProfile,
    updateInstitutionProfile,
    switchInstitutionSubType,
    governmentProfile,
    updateGovernmentProfile,
    skillsCatalog,
    targetRolesCatalog,
    setActiveTab,
    saveLearnerProfileToRegistry,
    exportRegistryToCSV,
    learnerProfilesRegistry
  } = useApp();

  // Wizard active role: 'learner' | 'institution' | 'government'
  const role = profileWizardRole || 'learner';
  // Institution sub-type: 'employer' | 'training_provider'
  const [instSubType, setInstSubType] = useState(institutionProfile.subType || 'employer');

  // Step state
  const [currentStep, setCurrentStep] = useState(profileWizardInitialStep || 1);
  const [isCompletedModalOpen, setIsCompletedModalOpen] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Local draft states
  const [learnerDraft, setLearnerDraft] = useState({ ...currentUser });
  const [institutionDraft, setInstitutionDraft] = useState({ ...institutionProfile });
  const [govDraft, setGovDraft] = useState({ ...governmentProfile });

  // Determine total steps based on role
  let totalSteps = 8;
  if (role === 'institution') {
    totalSteps = instSubType === 'employer' ? 6 : 7;
  } else if (role === 'government') {
    totalSteps = 6;
  }

  // Calculate visual progress percentage
  const progressPercent = Math.round((currentStep / totalSteps) * 100);


  // Step Definitions
  const learnerSteps = [
    { num: 1, title: 'Basic Information', desc: 'Identity, contacts & bio', optional: false },
    { num: 2, title: 'Location & Relocation', desc: 'Geography & work mode', optional: false },
    { num: 3, title: 'Education Background', desc: 'Degrees & institutions', optional: false },
    { num: 4, title: 'Career & Target Role', desc: 'Aspirations & wage goals', optional: false },
    { num: 5, title: 'Skills & Proficiency', desc: 'Core competency assessment', optional: false },
    { num: 6, title: 'Certifications & Portfolio', desc: 'Credentials & public links', optional: true },
    { num: 7, title: 'Learning Preferences', desc: 'Hours, format & schedule', optional: false },
    { num: 8, title: 'Review & Complete', desc: 'Final audit & submission', optional: false }
  ];

  const employerSteps = [
    { num: 1, title: 'Organization Info', desc: 'Entity details & sector', optional: false },
    { num: 2, title: 'Location & Operations', desc: 'HQ & work environment', optional: false },
    { num: 3, title: 'Point of Contact', desc: 'Talent & nodal officer', optional: false },
    { num: 4, title: 'Hiring Requirements', desc: 'Roles, skills & volume', optional: false },
    { num: 5, title: 'Accreditation & Terms', desc: 'Registration & verification', optional: false },
    { num: 6, title: 'Review & Confirmation', desc: 'Final audit & verification', optional: false }
  ];

  const providerSteps = [
    { num: 1, title: 'Provider Information', desc: 'Institution type & vision', optional: false },
    { num: 2, title: 'Location & Reach', desc: 'Campus & geographic span', optional: false },
    { num: 3, title: 'Contact Information', desc: 'Admin & student helpdesk', optional: false },
    { num: 4, title: 'Course Specializations', desc: 'Domains & certifications', optional: false },
    { num: 5, title: 'Programs Offered', desc: 'Curricula & module catalog', optional: false },
    { num: 6, title: 'Quality & Verification', desc: 'License, affiliation & faculty', optional: false },
    { num: 7, title: 'Review & Submit', desc: 'Final audit & activation', optional: false }
  ];

  const governmentSteps = [
    { num: 1, title: 'Department Information', desc: 'Agency, ministry & tier', optional: false },
    { num: 2, title: 'Jurisdiction & Coverage', desc: 'State districts & HQ', optional: false },
    { num: 3, title: 'Nodal Officer Contact', desc: 'Official authority credentials', optional: false },
    { num: 4, title: 'Sponsored Schemes', desc: 'Active flagship initiatives', optional: false },
    { num: 5, title: 'Skill & Placement Focus', desc: 'Sectors & retention targets', optional: false },
    { num: 6, title: 'Review & Declaration', desc: 'Official gazette sign-off', optional: false }
  ];

  const currentStepsList =
    role === 'learner'
      ? learnerSteps
      : role === 'institution'
      ? instSubType === 'employer'
        ? employerSteps
        : providerSteps
      : governmentSteps;

  const currentStepMeta = currentStepsList[currentStep - 1] || { title: '', optional: false };

  // Validation function per step
  const validateCurrentStep = () => {
    setValidationError('');
    if (role === 'learner') {
      if (currentStep === 1) {
        if (!learnerDraft.name?.trim()) return 'Please enter your Full Name.';
        if (!learnerDraft.email?.trim()) return 'Please provide your Email Address.';
        if (!learnerDraft.phone?.trim()) return 'Please provide your Phone Number.';
      } else if (currentStep === 2) {
        if (!learnerDraft.city?.trim() && !learnerDraft.location?.trim()) return 'Please specify your City / Location.';
        if (!learnerDraft.state?.trim()) return 'Please specify your State.';
      } else if (currentStep === 3) {
        const hasEdu = learnerDraft.educations && learnerDraft.educations.length > 0;
        if (!hasEdu && !learnerDraft.education?.degree) {
          return 'Please add at least one Education degree or qualification.';
        }
      } else if (currentStep === 4) {
        const target = learnerDraft.careerProfile?.targetRole || learnerDraft.career?.targetCareerId;
        if (!target) return 'Please specify or select your Target Job Role.';
      } else if (currentStep === 5) {
        const skillsCount = learnerDraft.userSkills?.length || learnerDraft.selectedSkills?.length || 0;
        if (skillsCount < 1) return 'Please add or select at least 1 core skill with proficiency.';
      } else if (currentStep === 7) {
        if (!learnerDraft.learningPreferences?.preferredFormat) {
          return 'Please select your preferred learning format.';
        }
      }
    } else if (role === 'institution') {
      if (instSubType === 'employer') {
        if (currentStep === 1) {
          if (!institutionDraft.name?.trim()) return 'Please enter the Organization Name.';
          if (!institutionDraft.industry?.trim()) return 'Please specify the Industry Sector.';
        } else if (currentStep === 2) {
          if (!institutionDraft.hqCity?.trim()) return 'Please enter the Headquarters City.';
        } else if (currentStep === 3) {
          if (!institutionDraft.contactName?.trim()) return 'Please provide the Primary Contact Name.';
          if (!institutionDraft.contactEmail?.trim()) return 'Please provide an Official Contact Email.';
        } else if (currentStep === 4) {
          if (!institutionDraft.hiringRoles || institutionDraft.hiringRoles.length === 0) {
            return 'Please list at least one primary role you are hiring for.';
          }
        } else if (currentStep === 5) {
          if (!institutionDraft.regNumber?.trim()) return 'Please specify your Business Registration / CIN / GST number.';
          if (!institutionDraft.acceptedTerms) return 'You must accept the platform verification terms.';
        }
      } else {
        // Training provider
        if (currentStep === 1) {
          if (!institutionDraft.name?.trim()) return 'Please enter the Institution Name.';
          if (!institutionDraft.website?.trim()) return 'Please provide the official website URL.';
        } else if (currentStep === 2) {
          if (!institutionDraft.campusCity?.trim()) return 'Please enter the Campus City.';
        } else if (currentStep === 3) {
          if (!institutionDraft.adminEmail?.trim()) return 'Please provide the Admin Email.';
          if (!institutionDraft.contactPerson?.trim()) return 'Please provide Academic Director / Contact Person name.';
        } else if (currentStep === 5) {
          if (!institutionDraft.coursesOffered || institutionDraft.coursesOffered.length === 0) {
            return 'Please add at least one Course / Program offered.';
          }
        } else if (currentStep === 6) {
          if (!institutionDraft.licenseId?.trim()) return 'Please provide your Accreditation / License ID.';
          if (!institutionDraft.acceptedTerms) return 'You must accept the quality verification terms.';
        }
      }
    } else if (role === 'government') {
      if (currentStep === 1) {
        if (!govDraft.deptName?.trim()) return 'Please enter Department / Agency Name.';
        if (!govDraft.ministry?.trim()) return 'Please enter Parent Ministry.';
      } else if (currentStep === 2) {
        if (!govDraft.jurisdictionRegion?.trim()) return 'Please enter the Jurisdiction Region.';
        if (!govDraft.hqCity?.trim()) return 'Please enter Head Office City.';
      } else if (currentStep === 3) {
        if (!govDraft.nodalOfficerName?.trim()) return 'Please provide the Nodal Officer Name.';
        if (!govDraft.officialEmail?.trim()) return 'Please provide an official @gov.in email address.';
      } else if (currentStep === 4) {
        if (!govDraft.sponsoredSchemes || govDraft.sponsoredSchemes.length === 0) {
          return 'Please list at least one sponsored skill program or scheme.';
        }
      } else if (currentStep === 5) {
        if (!govDraft.prioritySectors?.trim()) return 'Please specify Priority Sectors for skill development.';
      } else if (currentStep === 6) {
        if (!govDraft.authorizedDeclaration) return 'The Nodal Officer must confirm the authorized declaration.';
      }
    }
    return null;
  };

  // Handlers
  const handleSaveAndContinue = () => {
    const err = validateCurrentStep();
    if (err) {
      setValidationError(err);
      return;
    }
    setValidationError('');

    // Persist current draft
    if (role === 'learner') {
      updateUserProfile(learnerDraft);
    } else if (role === 'institution') {
      updateInstitutionProfile(institutionDraft);
    } else if (role === 'government') {
      updateGovernmentProfile(govDraft);
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinalSubmit();
    }
  };

  const handleSkip = () => {
    setValidationError('');
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setValidationError('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAndExit = () => {
    if (role === 'learner') {
      updateUserProfile(learnerDraft);
    } else if (role === 'institution') {
      updateInstitutionProfile(institutionDraft);
    } else if (role === 'government') {
      updateGovernmentProfile(govDraft);
    }
    closeProfileWizard();
  };

  const [syncedRegistryEntry, setSyncedRegistryEntry] = useState(null);

  const handleFinalSubmit = () => {
    if (role === 'learner') {
      updateUserProfile(learnerDraft);
      const entry = saveLearnerProfileToRegistry(learnerDraft);
      setSyncedRegistryEntry(entry);
    } else if (role === 'institution') {
      updateInstitutionProfile(institutionDraft);
    } else if (role === 'government') {
      updateGovernmentProfile(govDraft);
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 90,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 90,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 350);
    } catch {
      // Confetti fallback
    }

    setIsCompletedModalOpen(true);
  };

  const jumpToStep = (stepNumber) => {
    setCurrentStep(stepNumber);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden my-auto">
        {/* MODAL HEADER */}
        <div className="bg-gradient-to-r from-[#072F2C] via-[#0F4C47] to-[#135A54] text-white p-5 sm:p-6 relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-teal-200 flex items-center gap-1.5">
                  {role === 'learner' && <User className="w-3 h-3 text-teal-300" />}
                  {role === 'institution' && <Building className="w-3 h-3 text-teal-300" />}
                  {role === 'government' && <Shield className="w-3 h-3 text-teal-300" />}
                  <span>
                    {role === 'learner'
                      ? 'Learner Profile'
                      : role === 'institution'
                      ? `Institution (${instSubType === 'employer' ? 'Employer' : 'Course Provider'})`
                      : 'Government Agency'}
                  </span>
                </span>
                <span className="text-teal-200 text-xs font-mono font-bold">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {currentStepMeta.title}
              </h2>
              <p className="text-xs sm:text-sm text-teal-100/80 mt-0.5">
                {currentStepMeta.desc}
              </p>
            </div>

            <button
              onClick={handleSaveAndExit}
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-xl transition-colors"
              title="Save & Exit"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar & Text Gauge */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5 text-teal-100">
              <span className="text-xs font-semibold text-teal-100 flex items-center gap-2">
                <span className="bg-white/15 px-2.5 py-0.5 rounded-lg font-black text-[11px]">Step {currentStep} of {totalSteps}</span>
                <span className="text-teal-300">•</span>
                <span className="hidden sm:inline text-teal-100/90 font-bold">{currentStepMeta?.title}</span>
              </span>
              <span
                className={`px-3 py-1 rounded-lg font-black text-xs transition-colors ${
                  progressPercent === 100
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-white/20 text-white'
                }`}
              >
                {progressPercent === 100 ? '✓ 100% Profile Complete' : `${progressPercent}% Profile Progress`}
              </span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-200 transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* ROLE SUBTYPE SELECTOR (For Institution: Employer vs Provider) */}
        {role === 'institution' && currentStep === 1 && (
          <div className="bg-teal-50/70 border-b border-teal-100 px-6 py-3 flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-teal-900">
              Select Institution Category:
            </span>
            <div className="inline-flex rounded-xl bg-white p-1 border border-teal-200 text-xs font-medium">
              <button
                type="button"
                onClick={() => {
                  setInstSubType('employer');
                  switchInstitutionSubType('employer');
                  setInstitutionDraft(prev => ({ ...prev, subType: 'employer' }));
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  instSubType === 'employer'
                    ? 'bg-[#0F4C47] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Employer (Hiring Entity)
              </button>
              <button
                type="button"
                onClick={() => {
                  setInstSubType('training_provider');
                  switchInstitutionSubType('training_provider');
                  setInstitutionDraft(prev => ({ ...prev, subType: 'training_provider' }));
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  instSubType === 'training_provider'
                    ? 'bg-[#0F4C47] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Course / Training Provider
              </button>
            </div>
          </div>
        )}

        {/* STEP CONTENT SCROLLABLE BODY */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-800 space-y-6">
          {/* Validation Error Banner */}
          {validationError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>{validationError}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* USER (LEARNER) STEPS (1 - 8)                            */}
          {/* ======================================================== */}
          {role === 'learner' && (
            <>
              {/* STEP 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2 flex items-center gap-4 p-3.5 rounded-2xl bg-[#F5F8F7] border border-slate-200">
                      <img
                        src={learnerDraft.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                        alt="Avatar Preview"
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0F4C47] shadow-sm shrink-0"
                      />
                      <div className="flex-1">
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Profile Avatar URL
                        </label>
                        <input
                          type="text"
                          value={learnerDraft.avatar || ''}
                          onChange={(e) => setLearnerDraft({ ...learnerDraft, avatar: e.target.value })}
                          placeholder="https://..."
                          className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-semibold text-slate-500">Quick avatars:</span>
                          {[
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
                            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
                          ].map((av, idx) => (
                            <img
                              key={idx}
                              src={av}
                              alt="Pick"
                              onClick={() => setLearnerDraft({ ...learnerDraft, avatar: av })}
                              className="w-6 h-6 rounded-full object-cover cursor-pointer hover:scale-110 border border-slate-300 transition-transform"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={learnerDraft.name || ''}
                        onChange={(e) => setLearnerDraft({ ...learnerDraft, name: e.target.value })}
                        placeholder="e.g. Talha Jubayer"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={learnerDraft.email || ''}
                        onChange={(e) => setLearnerDraft({ ...learnerDraft, email: e.target.value })}
                        placeholder="talhajuba@gmail.com"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={learnerDraft.phone || ''}
                        onChange={(e) => setLearnerDraft({ ...learnerDraft, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={learnerDraft.dob || '2003-08-15'}
                        onChange={(e) => setLearnerDraft({ ...learnerDraft, dob: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Gender
                      </label>
                      <select
                        value={learnerDraft.gender || 'Male'}
                        onChange={(e) => setLearnerDraft({ ...learnerDraft, gender: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 block mb-1 flex items-center justify-between">
                        <span>Preferred Languages (Select one or more)</span>
                        <span className="text-[11px] text-teal-700 font-semibold">Multiple allowed</span>
                      </label>
                      <div className="flex flex-wrap gap-1.5 pt-1 mb-2">
                        {['English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Marathi', 'Bengali', 'Gujarati', 'Malayalam'].map((lang) => {
                          const currentLangs = (learnerDraft.language || 'English, Hindi')
                            .split(',')
                            .map(s => s.trim())
                            .filter(Boolean);
                          const isSelected = currentLangs.includes(lang);
                          return (
                            <button
                              key={lang}
                              type="button"
                              onClick={() => {
                                let newLangs;
                                if (isSelected) {
                                  if (currentLangs.length === 1) return;
                                  newLangs = currentLangs.filter(l => l !== lang);
                                } else {
                                  newLangs = [...currentLangs, lang];
                                }
                                setLearnerDraft({ ...learnerDraft, language: newLangs.join(', ') });
                              }}
                              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                                isSelected
                                  ? 'bg-[#0F4C47] text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                              <span>{lang}</span>
                            </button>
                          );
                        })}
                      </div>
                      <input
                        type="text"
                        value={learnerDraft.language || 'English, Hindi'}
                        onChange={(e) => setLearnerDraft({ ...learnerDraft, language: e.target.value })}
                        placeholder="e.g. English, Hindi, Marathi"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Professional Headline
                      </label>
                      <input
                        type="text"
                        value={learnerDraft.headline || ''}
                        onChange={(e) => setLearnerDraft({ ...learnerDraft, headline: e.target.value })}
                        placeholder="e.g. Aspiring Backend Architect & Relational Systems Enthusiast"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Short Bio / About You
                      </label>
                      <textarea
                        rows={3}
                        value={learnerDraft.bio || ''}
                        onChange={(e) => setLearnerDraft({ ...learnerDraft, bio: e.target.value })}
                        placeholder="Share a brief overview of your academic focus and technical passions..."
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Location & Relocation */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        value={learnerDraft.country || 'India'}
                        onChange={(e) => setLearnerDraft({ ...learnerDraft, country: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        State <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={learnerDraft.state || 'Maharashtra'}
                        onChange={(e) => setLearnerDraft({ ...learnerDraft, state: e.target.value })}
                        placeholder="e.g. Maharashtra"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        City / District <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={learnerDraft.city || learnerDraft.location || 'Pune'}
                        onChange={(e) =>
                          setLearnerDraft({
                            ...learnerDraft,
                            city: e.target.value,
                            location: `${e.target.value}, ${learnerDraft.state || 'Maharashtra'}`
                          })
                        }
                        placeholder="e.g. Pune"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Preferred Work Mode <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={learnerDraft.preferredWorkMode || 'Hybrid'}
                        onChange={(e) => setLearnerDraft({ ...learnerDraft, preferredWorkMode: e.target.value })}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      >
                        <option value="Hybrid">Hybrid (On-site + Remote)</option>
                        <option value="Remote">Remote Only</option>
                        <option value="On-site">On-site (Office based)</option>
                        <option value="Any">Any / Open to all</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 p-4 rounded-2xl bg-teal-50/60 border border-teal-100 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-teal-950">Willing to Relocate for Job Opportunities?</h4>
                        <p className="text-[11px] text-teal-800">
                          Enables state and pan-India employer matching for high-demand roles.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(learnerDraft.willingToRelocate)}
                          onChange={(e) => setLearnerDraft({ ...learnerDraft, willingToRelocate: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F4C47]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Education & Academic Background */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">Educational Qualifications</h3>
                      <p className="text-[11px] text-slate-500">
                        Add one or more degrees, diplomas, or vocational certificates.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const nextId = `edu-${(learnerDraft.educations?.length || 0) + 1}`;
                        const newEdu = {
                          id: nextId,
                          degree: '',
                          fieldOfStudy: '',
                          institution: '',
                          yearOfCompletion: '2025',
                          grade: ''
                        };
                        setLearnerDraft({
                          ...learnerDraft,
                          educations: [...(learnerDraft.educations || []), newEdu]
                        });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#0F4C47] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#0A3632] transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Another Degree</span>
                    </button>
                  </div>

                  {(!learnerDraft.educations || learnerDraft.educations.length === 0) ? (
                    <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                      <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs text-slate-600 font-semibold">No degrees added yet.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setLearnerDraft({
                            ...learnerDraft,
                            educations: [
                              {
                                id: 'edu-1',
                                degree: learnerDraft.education?.degree || 'B.Tech in Computer Engineering',
                                fieldOfStudy: 'Computer Science',
                                institution: learnerDraft.education?.institution || 'Government College of Engineering',
                                yearOfCompletion: learnerDraft.education?.yearOfPassing || '2025',
                                grade: '8.8 CGPA'
                              }
                            ]
                          });
                        }}
                        className="mt-3 text-xs text-[#0F4C47] font-bold underline"
                      >
                        Add primary qualification
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {learnerDraft.educations.map((edu, index) => (
                        <div
                          key={edu.id || index}
                          className="p-4 rounded-2xl border border-slate-200 bg-white relative space-y-3 shadow-xs"
                        >
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                              Degree #{index + 1}
                            </span>
                            {learnerDraft.educations.length > 1 && (
                              <button
                                type="button"
                                onClick={() => {
                                  setLearnerDraft({
                                    ...learnerDraft,
                                    educations: learnerDraft.educations.filter((_, i) => i !== index)
                                  });
                                }}
                                className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1 font-semibold"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Remove</span>
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                                Degree / Certificate Name *
                              </label>
                              <input
                                type="text"
                                value={edu.degree || ''}
                                onChange={(e) => {
                                  const updated = [...learnerDraft.educations];
                                  updated[index].degree = e.target.value;
                                  setLearnerDraft({ ...learnerDraft, educations: updated });
                                }}
                                placeholder="e.g. B.Tech in Computer Engineering"
                                className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                                Field of Study / Branch *
                              </label>
                              <input
                                type="text"
                                value={edu.fieldOfStudy || ''}
                                onChange={(e) => {
                                  const updated = [...learnerDraft.educations];
                                  updated[index].fieldOfStudy = e.target.value;
                                  setLearnerDraft({ ...learnerDraft, educations: updated });
                                }}
                                placeholder="e.g. Computer Science, Electrical Engineering"
                                className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                              />
                            </div>

                            <div>
                              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                                Institution / College / University *
                              </label>
                              <input
                                type="text"
                                value={edu.institution || ''}
                                onChange={(e) => {
                                  const updated = [...learnerDraft.educations];
                                  updated[index].institution = e.target.value;
                                  setLearnerDraft({ ...learnerDraft, educations: updated });
                                }}
                                placeholder="e.g. Government College of Engineering, Pune"
                                className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <div>
                                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                                  Country
                                </label>
                                <input
                                  type="text"
                                  value={edu.country || 'India'}
                                  onChange={(e) => {
                                    const updated = [...learnerDraft.educations];
                                    updated[index].country = e.target.value;
                                    setLearnerDraft({ ...learnerDraft, educations: updated });
                                  }}
                                  placeholder="Country"
                                  className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                                  State
                                </label>
                                <input
                                  type="text"
                                  value={edu.state || 'Karnataka'}
                                  onChange={(e) => {
                                    const updated = [...learnerDraft.educations];
                                    updated[index].state = e.target.value;
                                    setLearnerDraft({ ...learnerDraft, educations: updated });
                                  }}
                                  placeholder="State"
                                  className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                                />
                              </div>
                              <div>
                                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                                  City
                                </label>
                                <input
                                  type="text"
                                  value={edu.city || 'Bengaluru'}
                                  onChange={(e) => {
                                    const updated = [...learnerDraft.educations];
                                    updated[index].city = e.target.value;
                                    setLearnerDraft({ ...learnerDraft, educations: updated });
                                  }}
                                  placeholder="City"
                                  className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                                  Year of Completion *
                                </label>
                                <input
                                  type="text"
                                  value={edu.yearOfCompletion || ''}
                                  onChange={(e) => {
                                    const updated = [...learnerDraft.educations];
                                    updated[index].yearOfCompletion = e.target.value;
                                    setLearnerDraft({ ...learnerDraft, educations: updated });
                                  }}
                                  placeholder="2025"
                                  className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                                />
                              </div>

                              <div>
                                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                                  Grade / CGPA
                                </label>
                                <input
                                  type="text"
                                  value={edu.grade || ''}
                                  onChange={(e) => {
                                    const updated = [...learnerDraft.educations];
                                    updated[index].grade = e.target.value;
                                    setLearnerDraft({ ...learnerDraft, educations: updated });
                                  }}
                                  placeholder="e.g. 8.8 CGPA"
                                  className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 4: Career & Target Role */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Current Status <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={learnerDraft.careerProfile?.status || 'Student / Seeking Roles'}
                        onChange={(e) =>
                          setLearnerDraft({
                            ...learnerDraft,
                            careerProfile: {
                              ...(learnerDraft.careerProfile || {}),
                              status: e.target.value
                            }
                          })
                        }
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      >
                        <option value="Student / Seeking Roles">Student / Final Year</option>
                        <option value="Employed / Seeking Growth">Employed / Seeking Growth</option>
                        <option value="Job Seeker (Active)">Active Job Seeker</option>
                        <option value="Career Switcher">Career Switcher</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Target Industry
                      </label>
                      <input
                        type="text"
                        value={learnerDraft.careerProfile?.targetIndustry || 'Software & Financial Technology'}
                        onChange={(e) =>
                          setLearnerDraft({
                            ...learnerDraft,
                            careerProfile: {
                              ...(learnerDraft.careerProfile || {}),
                              targetIndustry: e.target.value
                            }
                          })
                        }
                        placeholder="e.g. Software, Cloud & Financial Tech"
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      />
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {['IT & Software', 'Robotics & Manufacturing', 'Renewable Energy', 'FinTech & Banking', 'Healthcare', 'Supply Chain'].map((ind) => (
                          <button
                            key={ind}
                            type="button"
                            onClick={() =>
                              setLearnerDraft({
                                ...learnerDraft,
                                careerProfile: {
                                  ...(learnerDraft.careerProfile || {}),
                                  targetIndustry: ind
                                }
                              })
                            }
                            className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-[#0F4C47] transition-colors"
                          >
                            {ind}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Target Job Role <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                        {targetRolesCatalog.map((roleTitle) => {
                          const isSelected =
                            (learnerDraft.careerProfile?.targetRole === roleTitle) ||
                            (learnerDraft.career?.targetCareerTitle === roleTitle);
                          return (
                            <button
                              key={roleTitle}
                              type="button"
                              onClick={() => {
                                setLearnerDraft({
                                  ...learnerDraft,
                                  careerProfile: {
                                    ...(learnerDraft.careerProfile || {}),
                                    targetRole: roleTitle
                                  }
                                });
                              }}
                              className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                                isSelected
                                  ? 'border-[#0F4C47] bg-teal-50 text-[#0F4C47] ring-2 ring-[#0F4C47]/20'
                                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{roleTitle}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-[#0F4C47]" />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Expected Salary Band
                      </label>
                      <select
                        value={learnerDraft.careerProfile?.salaryExpectation || '₹6–9 LPA'}
                        onChange={(e) =>
                          setLearnerDraft({
                            ...learnerDraft,
                            careerProfile: {
                              ...(learnerDraft.careerProfile || {}),
                              salaryExpectation: e.target.value
                            }
                          })
                        }
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      >
                        <option value="₹2–3 LPA">₹2–3 LPA</option>
                        <option value="₹3–5 LPA">₹3–5 LPA</option>
                        <option value="₹5–7 LPA">₹5–7 LPA</option>
                        <option value="₹6–9 LPA">₹6–9 LPA</option>
                        <option value="₹10+ LPA">₹10+ LPA</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Target Timeline <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={learnerDraft.careerProfile?.targetTimeline || 'Immediate (Within 3 months)'}
                        onChange={(e) =>
                          setLearnerDraft({
                            ...learnerDraft,
                            careerProfile: {
                              ...(learnerDraft.careerProfile || {}),
                              targetTimeline: e.target.value
                            }
                          })
                        }
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      >
                        <option value="Immediate (Within 3 months)">Immediate (Within 3 months)</option>
                        <option value="3 to 6 months">3 to 6 months</option>
                        <option value="6 to 12 months">6 to 12 months</option>
                        <option value="Exploring Options">Exploring Options</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Skills & Proficiency */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 mb-1">
                      Current Skills & Verified Proficiency Level <span className="text-rose-500">*</span>
                    </h3>
                    <p className="text-[11px] text-slate-500 mb-3">
                      Select your primary technical skills and assign self-rated proficiency levels.
                    </p>

                    {/* Quick Add Pills from Catalog */}
                    <div className="mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                        Quick Add from Standardized Bank:
                      </span>
                      <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                        {skillsCatalog.map((skillName) => {
                          const isAdded = (learnerDraft.userSkills || []).some(
                            (s) => s.name?.toLowerCase() === skillName.toLowerCase()
                          );
                          return (
                            <button
                              key={skillName}
                              type="button"
                              disabled={isAdded}
                              onClick={() => {
                                const newSkill = {
                                  id: skillName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                                  name: skillName,
                                  proficiency: 'Intermediate'
                                };
                                setLearnerDraft({
                                  ...learnerDraft,
                                  userSkills: [...(learnerDraft.userSkills || []), newSkill]
                                });
                              }}
                              className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                                isAdded
                                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold opacity-60 cursor-not-allowed'
                                  : 'bg-white border-slate-200 text-slate-700 hover:border-[#0F4C47] hover:text-[#0F4C47]'
                              }`}
                            >
                              + {skillName}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Added Skills List with Proficiency dropdown */}
                    <div className="space-y-2">
                      {(learnerDraft.userSkills || []).map((skill, index) => (
                        <div
                          key={skill.id || index}
                          className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 shadow-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-teal-600"></span>
                            <span className="text-xs font-bold text-slate-900">{skill.name}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <select
                              value={skill.proficiency || 'Intermediate'}
                              onChange={(e) => {
                                const updated = [...learnerDraft.userSkills];
                                updated[index].proficiency = e.target.value;
                                setLearnerDraft({ ...learnerDraft, userSkills: updated });
                              }}
                              className="text-xs py-1 px-2.5 rounded-lg border border-slate-200 bg-slate-50 font-semibold text-slate-700 outline-none focus:border-[#0F4C47]"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => {
                                setLearnerDraft({
                                  ...learnerDraft,
                                  userSkills: learnerDraft.userSkills.filter((_, i) => i !== index)
                                });
                              }}
                              className="text-slate-400 hover:text-rose-600 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills to Learn */}
                  <div className="pt-3 border-t border-slate-100">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Skills You Want to Learn / Improve
                    </label>
                    <input
                      type="text"
                      value={(learnerDraft.skillsToLearn || []).join(', ')}
                      onChange={(e) =>
                        setLearnerDraft({
                          ...learnerDraft,
                          skillsToLearn: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        })
                      }
                      placeholder="e.g. Docker & Kubernetes, Redis Caching, System Design (comma separated)"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 6: Certifications & Portfolio (Optional) */}
              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-800">Certifications & Credentials</h3>
                      <p className="text-[11px] text-slate-500">
                        Add verified certifications to bolster hiring confidence.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newCred = {
                          id: `cred-${Date.now()}`,
                          title: '',
                          issuer: '',
                          issueDate: '2026-01-01',
                          url: ''
                        };
                        setLearnerDraft({
                          ...learnerDraft,
                          credentials: [...(learnerDraft.credentials || []), newCred]
                        });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-teal-50 text-[#0F4C47] text-xs font-bold flex items-center gap-1.5 hover:bg-teal-100 border border-teal-200 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Certificate</span>
                    </button>
                  </div>

                  {(!learnerDraft.credentials || learnerDraft.credentials.length === 0) ? (
                    <div className="p-4 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                      <p className="text-xs text-slate-500">No certifications added yet. (Optional)</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {learnerDraft.credentials.map((cred, index) => (
                        <div key={cred.id || index} className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-teal-800">Certificate #{index + 1}</span>
                            <button
                              type="button"
                              onClick={() => {
                                setLearnerDraft({
                                  ...learnerDraft,
                                  credentials: learnerDraft.credentials.filter((_, i) => i !== index)
                                });
                              }}
                              className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remove</span>
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={cred.title || ''}
                              onChange={(e) => {
                                const updated = [...learnerDraft.credentials];
                                updated[index].title = e.target.value;
                                setLearnerDraft({ ...learnerDraft, credentials: updated });
                              }}
                              placeholder="Certificate Title (e.g. AWS Certified Cloud)"
                              className="text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                            />
                            <input
                              type="text"
                              value={cred.issuer || ''}
                              onChange={(e) => {
                                const updated = [...learnerDraft.credentials];
                                updated[index].issuer = e.target.value;
                                setLearnerDraft({ ...learnerDraft, credentials: updated });
                              }}
                              placeholder="Issuing Organization (e.g. Amazon Web Services)"
                              className="text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                            />
                            <input
                              type="date"
                              value={cred.issueDate || '2026-01-01'}
                              onChange={(e) => {
                                const updated = [...learnerDraft.credentials];
                                updated[index].issueDate = e.target.value;
                                setLearnerDraft({ ...learnerDraft, credentials: updated });
                              }}
                              className="text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                            />
                            <input
                              type="url"
                              value={cred.url || ''}
                              onChange={(e) => {
                                const updated = [...learnerDraft.credentials];
                                updated[index].url = e.target.value;
                                setLearnerDraft({ ...learnerDraft, credentials: updated });
                              }}
                              placeholder="Verification URL / Badge link"
                              className="text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Portfolio & Public Links */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800">Portfolio & Online Presence</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">Portfolio Site</label>
                        <input
                          type="url"
                          value={learnerDraft.portfolioLinks?.portfolio || ''}
                          onChange={(e) =>
                            setLearnerDraft({
                              ...learnerDraft,
                              portfolioLinks: {
                                ...(learnerDraft.portfolioLinks || {}),
                                portfolio: e.target.value
                              }
                            })
                          }
                          placeholder="https://myportfolio.dev"
                          className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">GitHub Profile</label>
                        <input
                          type="url"
                          value={learnerDraft.portfolioLinks?.github || ''}
                          onChange={(e) =>
                            setLearnerDraft({
                              ...learnerDraft,
                              portfolioLinks: {
                                ...(learnerDraft.portfolioLinks || {}),
                                github: e.target.value
                              }
                            })
                          }
                          placeholder="https://github.com/username"
                          className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-600 block mb-1">LinkedIn Profile</label>
                        <input
                          type="url"
                          value={learnerDraft.portfolioLinks?.linkedin || ''}
                          onChange={(e) =>
                            setLearnerDraft({
                              ...learnerDraft,
                              portfolioLinks: {
                                ...(learnerDraft.portfolioLinks || {}),
                                linkedin: e.target.value
                              }
                            })
                          }
                          placeholder="https://linkedin.com/in/username"
                          className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: Learning Preferences */}
              {currentStep === 7 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-slate-700 block mb-2">
                        Preferred Learning Format <span className="text-rose-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          { id: 'Interactive & Project-based', title: 'Interactive & Project-based', desc: 'Hands-on coding sandboxes & lab assignments' },
                          { id: 'Video Lectures & Walkthroughs', title: 'Video Lectures & Walkthroughs', desc: 'Step-by-step video tutorials and masterclasses' },
                          { id: 'Cohort & Live Sessions', title: 'Cohort & Live Sessions', desc: 'Scheduled instructor cohorts with peer discussions' },
                          { id: 'Reading & Standard Documentation', title: 'Reading & Standard Documentation', desc: 'In-depth manuals, specs & case studies' }
                        ].map((fmt) => {
                          const isSel = learnerDraft.learningPreferences?.preferredFormat === fmt.id;
                          return (
                            <div
                              key={fmt.id}
                              onClick={() =>
                                setLearnerDraft({
                                  ...learnerDraft,
                                  learningPreferences: {
                                    ...(learnerDraft.learningPreferences || {}),
                                    preferredFormat: fmt.id
                                  }
                                })
                              }
                              className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                                isSel
                                  ? 'border-[#0F4C47] bg-teal-50/70 ring-2 ring-[#0F4C47]/20 text-[#0F4C47]'
                                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                              }`}
                            >
                              <div className="flex items-center justify-between text-xs font-bold">
                                <span>{fmt.title}</span>
                                {isSel && <Check className="w-3.5 h-3.5 text-[#0F4C47]" />}
                              </div>
                              <p className="text-[11px] text-slate-500 mt-1">{fmt.desc}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Hours per Week Available for Upskilling <span className="text-rose-500">*</span>
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="range"
                          min="5"
                          max="40"
                          step="5"
                          value={learnerDraft.learningPreferences?.hoursPerWeek || 15}
                          onChange={(e) =>
                            setLearnerDraft({
                              ...learnerDraft,
                              learningPreferences: {
                                ...(learnerDraft.learningPreferences || {}),
                                hoursPerWeek: parseInt(e.target.value, 10)
                              }
                            })
                          }
                          className="w-full accent-[#0F4C47]"
                        />
                        <span className="w-16 text-center text-xs font-bold py-1 px-2 rounded-lg bg-teal-100 text-teal-900">
                          {learnerDraft.learningPreferences?.hoursPerWeek || 15} hrs/wk
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Preferred Study Schedule
                      </label>
                      <select
                        value={learnerDraft.learningPreferences?.schedule || 'Weekdays & Evenings'}
                        onChange={(e) =>
                          setLearnerDraft({
                            ...learnerDraft,
                            learningPreferences: {
                              ...(learnerDraft.learningPreferences || {}),
                              schedule: e.target.value
                            }
                          })
                        }
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                      >
                        <option value="Weekdays & Evenings">Weekdays & Evenings</option>
                        <option value="Weekends Only">Weekends Intensive</option>
                        <option value="Early Mornings">Early Mornings</option>
                        <option value="Flexible / Self-Paced">Flexible / Self-Paced</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 p-3.5 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-center justify-between gap-4">
                      <div>
                        <h4 className="text-xs font-bold text-teal-950">Interested in 1-on-1 Industry Mentorship?</h4>
                        <p className="text-[11px] text-teal-800">
                          Connect with senior engineers from top firms for resume and code audits.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={Boolean(learnerDraft.learningPreferences?.mentorshipInterest)}
                        onChange={(e) =>
                          setLearnerDraft({
                            ...learnerDraft,
                            learningPreferences: {
                              ...(learnerDraft.learningPreferences || {}),
                              mentorshipInterest: e.target.checked
                            }
                          })
                        }
                        className="w-4 h-4 accent-[#0F4C47] rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 8: Profile Review & Submission */}
              {currentStep === 8 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-emerald-950">All Steps Completed!</h3>
                      <p className="text-[11px] text-emerald-800">
                        Review your profile information below. Click any &ldquo;Edit&rdquo; button to amend a specific step.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* Basic Info Box */}
                    <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-teal-700" /> Basic Info
                        </span>
                        <button
                          type="button"
                          onClick={() => jumpToStep(1)}
                          className="text-[#0F4C47] hover:underline font-bold text-[11px] flex items-center gap-0.5"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                      </div>
                      <div className="space-y-1 text-slate-600 text-[11px]">
                        <p><span className="font-semibold text-slate-800">Name:</span> {learnerDraft.name}</p>
                        <p><span className="font-semibold text-slate-800">Email:</span> {learnerDraft.email}</p>
                        <p><span className="font-semibold text-slate-800">Phone:</span> {learnerDraft.phone}</p>
                        <p><span className="font-semibold text-slate-800">Headline:</span> {learnerDraft.headline || 'Not specified'}</p>
                      </div>
                    </div>

                    {/* Location Box */}
                    <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-teal-700" /> Location & Mode
                        </span>
                        <button
                          type="button"
                          onClick={() => jumpToStep(2)}
                          className="text-[#0F4C47] hover:underline font-bold text-[11px] flex items-center gap-0.5"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                      </div>
                      <div className="space-y-1 text-slate-600 text-[11px]">
                        <p><span className="font-semibold text-slate-800">City / State:</span> {learnerDraft.city || learnerDraft.location}, {learnerDraft.state}</p>
                        <p><span className="font-semibold text-slate-800">Work Mode:</span> {learnerDraft.preferredWorkMode}</p>
                        <p><span className="font-semibold text-slate-800">Relocate:</span> {learnerDraft.willingToRelocate ? 'Yes, Open' : 'No'}</p>
                      </div>
                    </div>

                    {/* Education Box */}
                    <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-teal-700" /> Education
                        </span>
                        <button
                          type="button"
                          onClick={() => jumpToStep(3)}
                          className="text-[#0F4C47] hover:underline font-bold text-[11px] flex items-center gap-0.5"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                      </div>
                      <div className="space-y-1 text-slate-600 text-[11px]">
                        {(learnerDraft.educations || []).map((e, idx) => (
                          <div key={idx} className="border-b border-slate-50 pb-1">
                            <span className="font-semibold text-slate-800">{e.degree}</span> ({e.yearOfCompletion}) • {e.institution}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Career Target Box */}
                    <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-teal-700" /> Career Goal
                        </span>
                        <button
                          type="button"
                          onClick={() => jumpToStep(4)}
                          className="text-[#0F4C47] hover:underline font-bold text-[11px] flex items-center gap-0.5"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                      </div>
                      <div className="space-y-1 text-slate-600 text-[11px]">
                        <p><span className="font-semibold text-slate-800">Target Role:</span> {learnerDraft.careerProfile?.targetRole || learnerDraft.career?.targetCareerTitle}</p>
                        <p><span className="font-semibold text-slate-800">Salary Goal:</span> {learnerDraft.careerProfile?.salaryExpectation}</p>
                        <p><span className="font-semibold text-slate-800">Timeline:</span> {learnerDraft.careerProfile?.targetTimeline}</p>
                      </div>
                    </div>

                    {/* Skills Box */}
                    <div className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2 md:col-span-2">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                        <span className="font-bold text-slate-900 flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-teal-700" /> Core Skills ({learnerDraft.userSkills?.length || 0})
                        </span>
                        <button
                          type="button"
                          onClick={() => jumpToStep(5)}
                          className="text-[#0F4C47] hover:underline font-bold text-[11px] flex items-center gap-0.5"
                        >
                          <Edit3 className="w-3 h-3" /> Edit
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(learnerDraft.userSkills || []).map((s, idx) => (
                          <span
                            key={idx}
                            className="bg-teal-50 border border-teal-200 text-teal-900 px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1"
                          >
                            <span>{s.name}</span>
                            <span className="text-[9px] bg-teal-200/80 px-1.5 py-0.2 rounded-full uppercase font-bold text-teal-950">
                              {s.proficiency}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ======================================================== */}
          {/* INSTITUTION STEPS: Employer & Training Provider          */}
          {/* ======================================================== */}
          {role === 'institution' && (
            <>
              {instSubType === 'employer' ? (
                /* EMPLOYER WIZARD */
                <>
                  {currentStep === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Organization / Company Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={institutionDraft.name || ''}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, name: e.target.value })}
                          placeholder="e.g. InfraCloud Technologies"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Organization Type <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={institutionDraft.orgType || 'Enterprise'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, orgType: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        >
                          <option value="Enterprise">Enterprise (500+ employees)</option>
                          <option value="Startup">High-Growth Startup</option>
                          <option value="SME">Small / Medium Enterprise (SME)</option>
                          <option value="NGO">Non-Profit / NGO</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Industry Sector <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={institutionDraft.industry || ''}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, industry: e.target.value })}
                          placeholder="e.g. Cloud Infrastructure & DevOps Solutions"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Official Website URL <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="url"
                          value={institutionDraft.website || ''}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, website: e.target.value })}
                          placeholder="https://company.com"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          About the Company / Overview
                        </label>
                        <textarea
                          rows={3}
                          value={institutionDraft.about || ''}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, about: e.target.value })}
                          placeholder="Describe what your engineering and business teams specialize in..."
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Headquarters Country</label>
                        <input
                          type="text"
                          value={institutionDraft.hqCountry || 'India'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, hqCountry: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">HQ State *</label>
                        <input
                          type="text"
                          value={institutionDraft.hqState || 'Maharashtra'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, hqState: e.target.value })}
                          placeholder="e.g. Maharashtra"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">HQ City *</label>
                        <input
                          type="text"
                          value={institutionDraft.hqCity || 'Pune'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, hqCity: e.target.value })}
                          placeholder="e.g. Pune"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Operating Work Model *</label>
                        <select
                          value={institutionDraft.operatingModel || 'Hybrid'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, operatingModel: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        >
                          <option value="Hybrid">Hybrid Model</option>
                          <option value="Remote Pan-India">Remote Pan-India</option>
                          <option value="On-site">Strictly On-site / Office</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-700 block mb-1">Branch Locations / Office Hubs</label>
                        <input
                          type="text"
                          value={institutionDraft.branches || 'Pune, Bengaluru, Hyderabad'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, branches: e.target.value })}
                          placeholder="e.g. Pune, Bengaluru, Hyderabad"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Primary Contact Person *</label>
                        <input
                          type="text"
                          value={institutionDraft.contactName || ''}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, contactName: e.target.value })}
                          placeholder="e.g. Anand Kulkarni"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Official Designation *</label>
                        <input
                          type="text"
                          value={institutionDraft.contactTitle || ''}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, contactTitle: e.target.value })}
                          placeholder="e.g. Director of Talent Acquisition"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Official Talent / HR Email *</label>
                        <input
                          type="email"
                          value={institutionDraft.contactEmail || ''}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, contactEmail: e.target.value })}
                          placeholder="talent@infracloud.io"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Direct Contact Phone *</label>
                        <input
                          type="tel"
                          value={institutionDraft.contactPhone || ''}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, contactPhone: e.target.value })}
                          placeholder="+91 98230 45678"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Primary Roles You Are Hiring For * (comma separated)
                        </label>
                        <input
                          type="text"
                          value={(institutionDraft.hiringRoles || []).join(', ')}
                          onChange={(e) =>
                            setInstitutionDraft({
                              ...institutionDraft,
                              hiringRoles: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                            })
                          }
                          placeholder="e.g. Backend Developer, DevOps & SRE Specialist, Cloud Systems Architect"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Key In-Demand Skills * (comma separated)
                        </label>
                        <input
                          type="text"
                          value={(institutionDraft.keySkillsInDemand || []).join(', ')}
                          onChange={(e) =>
                            setInstitutionDraft({
                              ...institutionDraft,
                              keySkillsInDemand: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                            })
                          }
                          placeholder="e.g. DBMS & SQL Optimization, DSA & Algorithmic Design, Docker, Golang"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">Annual Hiring Volume</label>
                          <select
                            value={institutionDraft.hiringVolume || '50+ hires/year'}
                            onChange={(e) => setInstitutionDraft({ ...institutionDraft, hiringVolume: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                          >
                            <option value="1-10 hires/year">1 - 10 hires / year</option>
                            <option value="11-50 hires/year">11 - 50 hires / year</option>
                            <option value="50+ hires/year">50+ hires / year (High Volume)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">Target Locations</label>
                          <input
                            type="text"
                            value={institutionDraft.preferredLocations || 'Pune, Bengaluru, Remote'}
                            onChange={(e) => setInstitutionDraft({ ...institutionDraft, preferredLocations: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Business Registration / CIN / GST *
                          </label>
                          <input
                            type="text"
                            value={institutionDraft.regNumber || ''}
                            onChange={(e) => setInstitutionDraft({ ...institutionDraft, regNumber: e.target.value })}
                            placeholder="CIN: U72200PN2017PTC172890"
                            className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">GSTIN</label>
                          <input
                            type="text"
                            value={institutionDraft.gstin || '27AABCU9603R1ZM'}
                            onChange={(e) => setInstitutionDraft({ ...institutionDraft, gstin: e.target.value })}
                            className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Accreditation / Memberships</label>
                        <input
                          type="text"
                          value={institutionDraft.accreditation || 'NASSCOM Platinum Member • ISO 27001 Certified'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, accreditation: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="empTerms"
                          checked={Boolean(institutionDraft.acceptedTerms)}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, acceptedTerms: e.target.checked })}
                          className="mt-1 w-4 h-4 accent-[#0F4C47] rounded cursor-pointer"
                        />
                        <label htmlFor="empTerms" className="text-xs text-slate-700 cursor-pointer">
                          <span className="font-bold text-slate-900 block mb-0.5">Verification & Authorized Employer Declaration *</span>
                          I certify that I am an authorized talent officer of this registered entity. All candidate data will be handled in accordance with privacy laws.
                        </label>
                      </div>
                    </div>
                  )}

                  {currentStep === 6 && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                        <div>
                          <h3 className="text-xs font-bold text-emerald-950">Employer Profile Ready for Final Submission</h3>
                          <p className="text-[11px] text-emerald-800">Review the corporate onboarding details below.</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                          <h4 className="font-bold text-slate-900 pb-1 border-b border-slate-100 mb-2">Entity</h4>
                          <p className="text-[11px] text-slate-600"><span className="font-semibold text-slate-800">Name:</span> {institutionDraft.name}</p>
                          <p className="text-[11px] text-slate-600"><span className="font-semibold text-slate-800">Industry:</span> {institutionDraft.industry}</p>
                          <p className="text-[11px] text-slate-600"><span className="font-semibold text-slate-800">HQ:</span> {institutionDraft.hqCity}, {institutionDraft.hqState}</p>
                        </div>
                        <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                          <h4 className="font-bold text-slate-900 pb-1 border-b border-slate-100 mb-2">Contact</h4>
                          <p className="text-[11px] text-slate-600"><span className="font-semibold text-slate-800">Officer:</span> {institutionDraft.contactName} ({institutionDraft.contactTitle})</p>
                          <p className="text-[11px] text-slate-600"><span className="font-semibold text-slate-800">Email:</span> {institutionDraft.contactEmail}</p>
                          <p className="text-[11px] text-slate-600"><span className="font-semibold text-slate-800">CIN:</span> {institutionDraft.regNumber}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* TRAINING PROVIDER WIZARD (7 Steps) */
                <>
                  {currentStep === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Institution Name *</label>
                        <input
                          type="text"
                          value={institutionDraft.name || ''}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, name: e.target.value })}
                          placeholder="e.g. Apex Skill Academy"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Institution Type *</label>
                        <select
                          value={institutionDraft.providerType || 'EdTech & Vocational Institute'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, providerType: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        >
                          <option value="EdTech & Vocational Institute">EdTech & Vocational Institute</option>
                          <option value="University / College">University / College</option>
                          <option value="Govt Skill Development Center">Govt Skill Development Center</option>
                          <option value="Technical Boot Camp">Technical Boot Camp</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Accreditation Body *</label>
                        <input
                          type="text"
                          value={institutionDraft.accreditationBody || 'NSDC & NCVET Accredited Grade-A'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, accreditationBody: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Official Website URL *</label>
                        <input
                          type="url"
                          value={institutionDraft.website || ''}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, website: e.target.value })}
                          placeholder="https://apexskillacademy.edu.in"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Campus City *</label>
                        <input
                          type="text"
                          value={institutionDraft.campusCity || 'Pune'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, campusCity: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Delivery Mode *</label>
                        <select
                          value={institutionDraft.deliveryMode || 'Blended'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, deliveryMode: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        >
                          <option value="Blended">Blended (Online + Lab Practicum)</option>
                          <option value="Online Live">100% Online Live</option>
                          <option value="Offline Classroom">Offline Classroom</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-xs font-bold text-slate-700 block mb-1">Geographic Reach *</label>
                        <input
                          type="text"
                          value={institutionDraft.reach || 'National (14 States)'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, reach: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Academic Director / Dean *</label>
                        <input
                          type="text"
                          value={institutionDraft.contactPerson || ''}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, contactPerson: e.target.value })}
                          placeholder="Dr. Suresh Patil"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Admin Email *</label>
                        <input
                          type="email"
                          value={institutionDraft.adminEmail || ''}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, adminEmail: e.target.value })}
                          placeholder="director@apextech.org"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Course Domains Offered *</label>
                        <input
                          type="text"
                          value={(institutionDraft.domains || []).join(', ')}
                          onChange={(e) =>
                            setInstitutionDraft({
                              ...institutionDraft,
                              domains: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                            })
                          }
                          placeholder="Computer Science, Industrial Electrical, Data Analytics"
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Partner Affiliations</label>
                        <input
                          type="text"
                          value={institutionDraft.affiliations || 'NSDC, AWS Academy, IEEE Pune Section'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, affiliations: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 5 && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-800">Programs & Courses Catalog *</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newCourse = {
                              id: `cp-${Date.now()}`,
                              title: 'New Specialized Technical Course',
                              domain: 'Software Engineering',
                              duration: '8 Weeks',
                              mode: 'Blended',
                              level: 'Intermediate',
                              skillsTaught: 'Core Skills',
                              fee: 'Free / Sponsored'
                            };
                            setInstitutionDraft({
                              ...institutionDraft,
                              coursesOffered: [...(institutionDraft.coursesOffered || []), newCourse]
                            });
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#0F4C47] text-white text-xs font-bold flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Course</span>
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {(institutionDraft.coursesOffered || []).map((crs, idx) => (
                          <div key={crs.id || idx} className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                            <div className="flex items-center justify-between">
                              <input
                                type="text"
                                value={crs.title || ''}
                                onChange={(e) => {
                                  const updated = [...institutionDraft.coursesOffered];
                                  updated[idx].title = e.target.value;
                                  setInstitutionDraft({ ...institutionDraft, coursesOffered: updated });
                                }}
                                className="font-bold text-xs text-slate-900 border-b border-transparent focus:border-[#0F4C47] outline-none w-2/3"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setInstitutionDraft({
                                    ...institutionDraft,
                                    coursesOffered: institutionDraft.coursesOffered.filter((_, i) => i !== idx)
                                  });
                                }}
                                className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                              <input
                                type="text"
                                value={crs.domain || ''}
                                onChange={(e) => {
                                  const updated = [...institutionDraft.coursesOffered];
                                  updated[idx].domain = e.target.value;
                                  setInstitutionDraft({ ...institutionDraft, coursesOffered: updated });
                                }}
                                placeholder="Domain"
                                className="text-[11px] p-1.5 rounded-lg border border-slate-200"
                              />
                              <input
                                type="text"
                                value={crs.duration || ''}
                                onChange={(e) => {
                                  const updated = [...institutionDraft.coursesOffered];
                                  updated[idx].duration = e.target.value;
                                  setInstitutionDraft({ ...institutionDraft, coursesOffered: updated });
                                }}
                                placeholder="Duration"
                                className="text-[11px] p-1.5 rounded-lg border border-slate-200"
                              />
                              <input
                                type="text"
                                value={crs.skillsTaught || ''}
                                onChange={(e) => {
                                  const updated = [...institutionDraft.coursesOffered];
                                  updated[idx].skillsTaught = e.target.value;
                                  setInstitutionDraft({ ...institutionDraft, coursesOffered: updated });
                                }}
                                placeholder="Skills taught"
                                className="text-[11px] p-1.5 rounded-lg border border-slate-200 sm:col-span-2"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 6 && (
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Accreditation / License ID *
                        </label>
                        <input
                          type="text"
                          value={institutionDraft.licenseId || 'NSDC-VTP-MH-2018-0914'}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, licenseId: e.target.value })}
                          className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                        />
                      </div>
                      <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="provTerms"
                          checked={Boolean(institutionDraft.acceptedTerms)}
                          onChange={(e) => setInstitutionDraft({ ...institutionDraft, acceptedTerms: e.target.checked })}
                          className="mt-1 w-4 h-4 accent-[#0F4C47] rounded cursor-pointer"
                        />
                        <label htmlFor="provTerms" className="text-xs text-slate-700 cursor-pointer">
                          <span className="font-bold text-slate-900 block mb-0.5">Quality Assurance & Curriculum Compliance *</span>
                          I certify that all courses adhere to national vocational qualifications framework (NVQF) competencies.
                        </label>
                      </div>
                    </div>
                  )}

                  {currentStep === 7 && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                        <div>
                          <h3 className="text-xs font-bold text-emerald-950">Training Provider Profile Complete</h3>
                          <p className="text-[11px] text-emerald-800">
                            {institutionDraft.name} • {institutionDraft.coursesOffered?.length || 0} Listed Courses
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* ======================================================== */}
          {/* GOVERNMENT STEPS (1 - 6)                                 */}
          {/* ======================================================== */}
          {role === 'government' && (
            <>
              {currentStep === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Department / Agency Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={govDraft.deptName || ''}
                      onChange={(e) => setGovDraft({ ...govDraft, deptName: e.target.value })}
                      placeholder="e.g. Directorate of Vocational Education"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Parent Ministry <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={govDraft.ministry || ''}
                      onChange={(e) => setGovDraft({ ...govDraft, ministry: e.target.value })}
                      placeholder="Ministry of Skill Development & Entrepreneurship"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Government Tier / Level <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={govDraft.govLevel || 'State / Provincial'}
                      onChange={(e) => setGovDraft({ ...govDraft, govLevel: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    >
                      <option value="State / Provincial">State / Provincial Mission</option>
                      <option value="Central / Federal">Central / Federal Ministry</option>
                      <option value="Local / Municipal">District / Municipal Corporation</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Official Portal URL</label>
                    <input
                      type="url"
                      value={govDraft.website || 'https://skillmission.gov.in'}
                      onChange={(e) => setGovDraft({ ...govDraft, website: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mission & Objective</label>
                    <textarea
                      rows={2}
                      value={govDraft.mission || ''}
                      onChange={(e) => setGovDraft({ ...govDraft, mission: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Jurisdiction Region *</label>
                    <input
                      type="text"
                      value={govDraft.jurisdictionRegion || 'Western Region - Maharashtra State'}
                      onChange={(e) => setGovDraft({ ...govDraft, jurisdictionRegion: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Head Office City *</label>
                    <input
                      type="text"
                      value={govDraft.hqCity || 'Mumbai'}
                      onChange={(e) => setGovDraft({ ...govDraft, hqCity: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">Covered Districts</label>
                    <input
                      type="text"
                      value={govDraft.coveredDistricts || 'Pune, Nagpur, Nashik, Aurangabad, Solapur'}
                      onChange={(e) => setGovDraft({ ...govDraft, coveredDistricts: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Nodal Officer Name *</label>
                    <input
                      type="text"
                      value={govDraft.nodalOfficerName || ''}
                      onChange={(e) => setGovDraft({ ...govDraft, nodalOfficerName: e.target.value })}
                      placeholder="Dr. Rameshwar V. Shinde, IAS"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Officer Rank / Title *</label>
                    <input
                      type="text"
                      value={govDraft.nodalOfficerRank || 'Principal Secretary'}
                      onChange={(e) => setGovDraft({ ...govDraft, nodalOfficerRank: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Official Email (@gov.in) *</label>
                    <input
                      type="email"
                      value={govDraft.officialEmail || ''}
                      onChange={(e) => setGovDraft({ ...govDraft, officialEmail: e.target.value })}
                      placeholder="governance@skillmission.gov.in"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Service / ID Number *</label>
                    <input
                      type="text"
                      value={govDraft.serviceId || 'IAS-MH-2009-8812'}
                      onChange={(e) => setGovDraft({ ...govDraft, serviceId: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-800">Flagship Schemes & Initiatives *</h4>
                    <button
                      type="button"
                      onClick={() => {
                        const newScheme = {
                          id: `sc-${Date.now()}`,
                          name: 'State Skill Development Scheme',
                          targetDemographic: 'Rural & Semi-Urban Youth',
                          focusArea: 'Technical Skilling',
                          budget: '₹50 Crores',
                          targetBeneficiaries: '10,000 Youth'
                        };
                        setGovDraft({
                          ...govDraft,
                          sponsoredSchemes: [...(govDraft.sponsoredSchemes || []), newScheme]
                        });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#0F4C47] text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Scheme</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {(govDraft.sponsoredSchemes || []).map((sc, idx) => (
                      <div key={sc.id || idx} className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={sc.name || ''}
                            onChange={(e) => {
                              const updated = [...govDraft.sponsoredSchemes];
                              updated[idx].name = e.target.value;
                              setGovDraft({ ...govDraft, sponsoredSchemes: updated });
                            }}
                            className="font-bold text-xs text-slate-900 border-b border-transparent focus:border-[#0F4C47] outline-none w-3/4"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setGovDraft({
                                ...govDraft,
                                sponsoredSchemes: govDraft.sponsoredSchemes.filter((_, i) => i !== idx)
                              });
                            }}
                            className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <input
                            type="text"
                            value={sc.targetDemographic || ''}
                            onChange={(e) => {
                              const updated = [...govDraft.sponsoredSchemes];
                              updated[idx].targetDemographic = e.target.value;
                              setGovDraft({ ...govDraft, sponsoredSchemes: updated });
                            }}
                            placeholder="Target Demographic"
                            className="text-[11px] p-1.5 rounded-lg border border-slate-200"
                          />
                          <input
                            type="text"
                            value={sc.budget || ''}
                            onChange={(e) => {
                              const updated = [...govDraft.sponsoredSchemes];
                              updated[idx].budget = e.target.value;
                              setGovDraft({ ...govDraft, sponsoredSchemes: updated });
                            }}
                            placeholder="Budget"
                            className="text-[11px] p-1.5 rounded-lg border border-slate-200"
                          />
                          <input
                            type="text"
                            value={sc.targetBeneficiaries || ''}
                            onChange={(e) => {
                              const updated = [...govDraft.sponsoredSchemes];
                              updated[idx].targetBeneficiaries = e.target.value;
                              setGovDraft({ ...govDraft, sponsoredSchemes: updated });
                            }}
                            placeholder="Target Beneficiaries"
                            className="text-[11px] p-1.5 rounded-lg border border-slate-200"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Priority Sectors for Skill Development *
                    </label>
                    <input
                      type="text"
                      value={govDraft.prioritySectors || 'IT & Software, Industrial Automation & Electrical, Solar'}
                      onChange={(e) => setGovDraft({ ...govDraft, prioritySectors: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Target Annual Beneficiaries *</label>
                    <input
                      type="text"
                      value={govDraft.targetAnnualBeneficiaries || '67,500 Youth'}
                      onChange={(e) => setGovDraft({ ...govDraft, targetAnnualBeneficiaries: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Target Employment & Retention Goal *</label>
                    <input
                      type="text"
                      value={govDraft.targetEmploymentRate || '85% Placement with 75%+ 6-Month Retention'}
                      onChange={(e) => setGovDraft({ ...govDraft, targetEmploymentRate: e.target.value })}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                    />
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-100 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="govDecl"
                      checked={Boolean(govDraft.authorizedDeclaration)}
                      onChange={(e) => setGovDraft({ ...govDraft, authorizedDeclaration: e.target.checked })}
                      className="mt-1 w-4 h-4 accent-[#0F4C47] rounded cursor-pointer"
                    />
                    <label htmlFor="govDecl" className="text-xs text-slate-700 cursor-pointer">
                      <span className="font-bold text-slate-900 block mb-0.5">Authorized Officer Signature & Declaration *</span>
                      I, {govDraft.nodalOfficerName || 'the Nodal Officer'}, hereby declare and verify the authorized status of this government skill monitoring mission under state/federal rules.
                    </label>
                  </div>
                  <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                    <h4 className="font-bold text-xs text-slate-900 mb-2">Summary Review</h4>
                    <p className="text-[11px] text-slate-600"><span className="font-semibold text-slate-800">Agency:</span> {govDraft.deptName}</p>
                    <p className="text-[11px] text-slate-600"><span className="font-semibold text-slate-800">Jurisdiction:</span> {govDraft.jurisdictionRegion}</p>
                    <p className="text-[11px] text-slate-600"><span className="font-semibold text-slate-800">Officer:</span> {govDraft.nodalOfficerName} ({govDraft.officialEmail})</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* MODAL FOOTER CONTROLS */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:px-6 flex items-center justify-between gap-3">
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed text-slate-400'
                : 'text-slate-700 hover:bg-slate-200/70'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          {/* Right Action Group */}
          <div className="flex items-center gap-2">
            {/* Skip for now (only on optional steps) */}
            {currentStepMeta.optional && currentStep < totalSteps && (
              <button
                type="button"
                onClick={handleSkip}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors"
              >
                Skip for now
              </button>
            )}

            {/* Save & Exit Draft */}
            <button
              type="button"
              onClick={handleSaveAndExit}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors hidden sm:flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-slate-500" />
              <span>Save & Exit</span>
            </button>

            {/* Save & Continue / Complete Profile Button */}
            <button
              type="button"
              onClick={handleSaveAndContinue}
              className="px-5 py-2.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02]"
            >
              <span>{currentStep === totalSteps ? 'Submit & Complete Profile' : 'Save & Continue'}</span>
              {currentStep === totalSteps ? (
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* CONFETTI SUCCESS MODAL WITH BACKEND EXCEL REGISTRY GENERATION */}
      {isCompletedModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-6 sm:p-7 text-center shadow-2xl border border-teal-200 relative max-h-[92vh] overflow-y-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0F4C47] to-teal-500 text-white mx-auto flex items-center justify-center shadow-lg mb-3">
              <Sparkles className="w-8 h-8 animate-bounce" />
            </div>

            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>100% Profile Complete • Backend Stored</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2.5">
              Profile Verified & Synced to Database!
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 max-w-lg mx-auto leading-relaxed">
              Your profile has been written and saved into the central backend registry. It is now instantly accessible on the <strong className="text-teal-900">Institution Portal</strong> and <strong className="text-teal-900">Government/Private Dashboard</strong> for candidate tracking and hiring.
            </p>

            {/* LIVE BACKEND EXCEL SHEET PREVIEW CARD */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#107C41] text-white flex items-center justify-center text-xs font-black shadow-xs">
                    X
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900">
                      Candidate_Profiles_Master_Registry.xlsx
                    </span>
                    <span className="text-[10px] text-slate-400 block font-normal">
                      Sheet: <span className="font-mono text-teal-800 font-bold">Learner_Registry_2026</span> • Status: <span className="text-emerald-700 font-bold">SAVED & SYNCED</span>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => exportRegistryToCSV()}
                  className="px-3 py-1.5 rounded-xl bg-[#107C41] hover:bg-[#0D6535] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 hover:scale-[1.02] self-start sm:self-auto"
                  title="Download complete registry as an Excel spreadsheet file (.csv format)"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Excel Sheet (.csv)</span>
                </button>
              </div>

              {/* Excel Table row preview */}
              <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-left text-[11px]">
                  <thead>
                    <tr className="bg-[#107C41]/10 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="p-2 font-mono">Candidate ID</th>
                      <th className="p-2">Name</th>
                      <th className="p-2">Email</th>
                      <th className="p-2">Location</th>
                      <th className="p-2">Education / Institution</th>
                      <th className="p-2">Target Industry</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                    <tr className="bg-emerald-50/50">
                      <td className="p-2 font-mono font-bold text-teal-800">
                        {syncedRegistryEntry?.id || 'REG-2026-005'}
                      </td>
                      <td className="p-2 font-bold text-slate-900">
                        {syncedRegistryEntry?.name || learnerDraft.name || 'Rohan Sharma'}
                      </td>
                      <td className="p-2 text-slate-500 font-mono text-[10px]">
                        {syncedRegistryEntry?.email || learnerDraft.email || 'rohan.sharma@skillfarming.org'}
                      </td>
                      <td className="p-2">
                        {syncedRegistryEntry?.city || learnerDraft.city || 'Bengaluru'}, {syncedRegistryEntry?.state || learnerDraft.state || 'Karnataka'}
                      </td>
                      <td className="p-2">
                        <div>{syncedRegistryEntry?.education || learnerDraft.educations?.[0]?.degree || 'B.Tech CS'}</div>
                        <div className="text-[10px] text-slate-400">{syncedRegistryEntry?.institution || 'Govt Engineering College'}</div>
                      </td>
                      <td className="p-2 text-teal-900 font-semibold">
                        {syncedRegistryEntry?.targetIndustry || learnerDraft.careerProfile?.targetIndustry || 'IT & Software'}
                      </td>
                      <td className="p-2">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          Synced ✓
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between">
                <span>Total records in central registry: <strong className="text-slate-800">{learnerProfilesRegistry.length + 1} profiles</strong></span>
                <span className="text-teal-800 font-semibold">Ready for Institution & Government audit</span>
              </div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsCompletedModalOpen(false);
                  closeProfileWizard();
                  if (role === 'learner') setActiveTab('dashboard');
                  else if (role === 'institution') setActiveTab('institution');
                  else if (role === 'government') setActiveTab('government');
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors"
              >
                Go to Dashboard
              </button>

              {role === 'learner' && (
                <button
                  type="button"
                  onClick={() => {
                    setIsCompletedModalOpen(false);
                    closeProfileWizard();
                    setActiveTab('assessment');
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Award className="w-4 h-4 text-teal-300" />
                  <span>Take Skill Assessment Now</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
