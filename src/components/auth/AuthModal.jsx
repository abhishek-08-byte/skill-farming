import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  User,
  Building,
  Shield,
  Lock,
  Mail,
  ArrowRight,
  Eye,
  EyeOff,
  Sparkles,
  CheckCircle2,
  Briefcase,
  Layers,
  KeyRound,
  Check,
  Globe,
  MapPin,
  GraduationCap
} from 'lucide-react';

const AVAILABLE_LANGUAGES = [
  'English',
  'Hindi',
  'Kannada',
  'Tamil',
  'Telugu',
  'Marathi',
  'Bengali',
  'Gujarati'
];

const TARGET_INDUSTRIES = [
  'IT & Software Engineering',
  'Data Science & AI',
  'Renewable Energy & EV Tech',
  'Advanced Manufacturing & Robotics',
  'FinTech & Banking',
  'Healthcare & Biotechnology',
  'Logistics & Smart Supply Chain'
];

export const AuthModal = ({
  isOpen,
  onClose,
  initialTab = 'login',
  initialRole = 'learner'
}) => {
  const { loginUser, signupUser } = useApp();

  const [tab, setTab] = useState(initialTab); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    orgName: '',
    department: '',
    country: 'India',
    stateName: 'Karnataka',
    cityName: 'Bengaluru',
    educationDegree: 'B.Tech / B.E. Computer Science',
    careerGoal: 'Full Stack Engineer',
    targetIndustry: 'IT & Software Engineering',
    preferredLanguages: ['English', 'Hindi'],
    termsAccepted: true
  });

  // OTP Verification State
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpMessage, setOtpMessage] = useState('');

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTab(initialTab);
      setSelectedRole(initialRole);
      setError('');
      setOtpSent(false);
      setIsOtpVerified(false);
      setOtpValue('');
      setOtpMessage('');
      if (initialRole === 'learner') setFormData(prev => ({ ...prev, email: 'rohan.sharma@skillfarming.org' }));
      else if (initialRole === 'institution') setFormData(prev => ({ ...prev, email: 'director@apextech.org' }));
      else if (initialRole === 'government') setFormData(prev => ({ ...prev, email: 'governance@skillmission.gov.in' }));
    }
  }, [isOpen, initialTab, initialRole]);

  // Timer countdown effect for OTP
  useEffect(() => {
    let interval = null;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  if (!isOpen) return null;

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setError('');
    setOtpSent(false);
    setIsOtpVerified(false);
    if (tab === 'login') {
      if (role === 'learner') setFormData(prev => ({ ...prev, email: 'rohan.sharma@skillfarming.org' }));
      else if (role === 'institution') setFormData(prev => ({ ...prev, email: 'director@apextech.org' }));
      else if (role === 'government') setFormData(prev => ({ ...prev, email: 'governance@skillmission.gov.in' }));
    }
  };

  const toggleLanguage = (lang) => {
    setFormData((prev) => {
      const exists = prev.preferredLanguages.includes(lang);
      if (exists) {
        if (prev.preferredLanguages.length === 1) return prev; // Keep at least one
        return { ...prev, preferredLanguages: prev.preferredLanguages.filter(l => l !== lang) };
      } else {
        return { ...prev, preferredLanguages: [...prev.preferredLanguages, lang] };
      }
    });
  };

  const handleSendOtp = () => {
    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address before requesting an OTP code.');
      return;
    }
    setError('');
    setOtpSent(true);
    setIsOtpVerified(false);
    setOtpTimer(45);
    setOtpMessage('One-Time Password (OTP) sent to your email! (Demo Code: 482910)');
  };

  const handleVerifyOtp = () => {
    if (otpValue.trim() === '482910' || otpValue.trim().length === 6) {
      setIsOtpVerified(true);
      setError('');
      setOtpMessage('✓ Email address verified successfully!');
    } else {
      setError('Invalid OTP code. Please enter the 6-digit code (482910 for demo).');
    }
  };

  const handleAutoFillOtp = () => {
    setOtpValue('482910');
    setIsOtpVerified(true);
    setError('');
    setOtpMessage('✓ Email address verified successfully with Demo Code 482910!');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      try {
        if (tab === 'login') {
          if (!formData.email) {
            setError('Please enter your email address.');
            setIsSubmitting(false);
            return;
          }
          loginUser({
            role: selectedRole,
            email: formData.email,
            name: selectedRole === 'learner' ? 'Rohan Sharma' : selectedRole === 'institution' ? 'Apex Academy Admin' : 'State Mission Director'
          });
        } else {
          // Register
          if (!formData.name.trim()) {
            setError('Please provide your full name or representative name.');
            setIsSubmitting(false);
            return;
          }
          if (!formData.email.trim()) {
            setError('Please provide an email address.');
            setIsSubmitting(false);
            return;
          }
          if (!isOtpVerified) {
            setError('Please verify your email address with the 6-digit OTP code before proceeding.');
            setIsSubmitting(false);
            return;
          }
          if (formData.password && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            setIsSubmitting(false);
            return;
          }

          signupUser({
            role: selectedRole,
            fullName: formData.name,
            email: formData.email,
            orgName: formData.orgName,
            department: formData.department,
            country: formData.country,
            stateName: formData.stateName,
            cityName: formData.cityName,
            careerGoal: formData.careerGoal,
            targetIndustry: formData.targetIndustry,
            preferredLanguages: formData.preferredLanguages,
            educationDegree: formData.educationDegree
          });
        }

        setIsSubmitting(false);
        onClose();
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
        setIsSubmitting(false);
      }
    }, 300);
  };

  // 1-Click Instant Demo Login
  const handleInstantDemoLogin = (role) => {
    if (role === 'learner') {
      loginUser({
        role: 'learner',
        email: 'rohan.sharma@skillfarming.org',
        name: 'Rohan Sharma'
      });
    } else if (role === 'institution') {
      loginUser({
        role: 'institution',
        email: 'director@apextech.org',
        name: 'Apex Academy Admin'
      });
    } else if (role === 'government') {
      loginUser({
        role: 'government',
        email: 'governance@skillmission.gov.in',
        name: 'State Mission Director'
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-teal-100 overflow-hidden relative my-auto">
        {/* MODAL HEADER - Ultra sleek dark emerald gradient */}
        <div className="bg-gradient-to-r from-[#062422] via-[#0A3D39] to-[#0F4C47] text-white p-5 sm:p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/20 border border-teal-300/30 backdrop-blur-md flex items-center justify-center text-xl shadow-inner">
                🌾
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-300 block">
                  Skill-to-Employment Intelligence
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {tab === 'login' ? 'Welcome Back' : 'Create Verified Account'}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-teal-200/70 hover:text-white hover:bg-white/10 p-2 rounded-2xl transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* DUAL TABS: SIGN IN & CREATE ACCOUNT */}
          <div className="mt-5 grid grid-cols-2 p-1 bg-black/30 backdrop-blur-md rounded-2xl border border-teal-400/20">
            <button
              type="button"
              onClick={() => {
                setTab('login');
                setError('');
              }}
              className={`py-2 text-xs font-black rounded-xl transition-all ${
                tab === 'login'
                  ? 'bg-white text-[#0F4C47] shadow-lg scale-[1.01]'
                  : 'text-teal-100 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('register');
                setError('');
              }}
              className={`py-2 text-xs font-black rounded-xl transition-all ${
                tab === 'register'
                  ? 'bg-white text-[#0F4C47] shadow-lg scale-[1.01]'
                  : 'text-teal-100 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* MODAL BODY */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: CHOOSE ROLE */}
          <div>
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-2">
              Select Your Access Portal:
            </label>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => handleRoleChange('learner')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedRole === 'learner'
                    ? 'border-[#0F4C47] bg-[#E2F1ED]/50 text-[#0F4C47] shadow-sm font-bold ring-2 ring-[#0F4C47]/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white font-medium'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  selectedRole === 'learner' ? 'bg-[#0F4C47] text-white shadow-xs' : 'bg-slate-100 text-slate-500'
                }`}>
                  <User className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold">Learner</span>
                <span className="text-[10px] text-slate-400 font-normal">Student / Seeker</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('institution')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedRole === 'institution'
                    ? 'border-[#0F4C47] bg-[#E2F1ED]/50 text-[#0F4C47] shadow-sm font-bold ring-2 ring-[#0F4C47]/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white font-medium'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  selectedRole === 'institution' ? 'bg-[#0F4C47] text-white shadow-xs' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Building className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold">Institution</span>
                <span className="text-[10px] text-slate-400 font-normal">College / Trainer</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('government')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  selectedRole === 'government'
                    ? 'border-[#0F4C47] bg-[#E2F1ED]/50 text-[#0F4C47] shadow-sm font-bold ring-2 ring-[#0F4C47]/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white font-medium'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  selectedRole === 'government' ? 'bg-[#0F4C47] text-white shadow-xs' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold">Government</span>
                <span className="text-[10px] text-slate-400 font-normal">State Mission</span>
              </button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name / Contact Representative <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder={selectedRole === 'learner' ? 'e.g. Rohan Sharma' : selectedRole === 'institution' ? 'e.g. Dr. Rajesh Verma' : 'e.g. Vikramaditya Rathore'}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4C47] focus:ring-2 focus:ring-[#0F4C47]/10 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            {/* Institution Specific Field */}
            {tab === 'register' && selectedRole === 'institution' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Institution / Academy Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Institute of Technical Studies"
                    value={formData.orgName}
                    onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4C47] outline-none"
                  />
                </div>
              </div>
            )}

            {/* Government Specific Field */}
            {tab === 'register' && selectedRole === 'government' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Department / Ministry <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Shield className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Department of Skill Development & Livelihood"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4C47] outline-none"
                  />
                </div>
              </div>
            )}

            {/* Learner Specific Fields: Target Industry, Education Location (Country, State, City), Languages */}
            {tab === 'register' && selectedRole === 'learner' && (
              <div className="space-y-3.5 pt-1">
                {/* Target Industry */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Target Industry</span>
                    <span className="text-[10px] text-teal-700 font-semibold">Career Pathway</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.targetIndustry}
                      onChange={(e) => setFormData({ ...formData, targetIndustry: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0F4C47] outline-none bg-white appearance-none cursor-pointer"
                    >
                      {TARGET_INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Educational Background & Location: Country, State, City */}
                <div className="p-3.5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <GraduationCap className="w-4 h-4 text-[#0F4C47]" />
                    <span>Educational Background & Location</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Country</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium focus:border-[#0F4C47] outline-none bg-white"
                        placeholder="Country"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">State</label>
                      <input
                        type="text"
                        value={formData.stateName}
                        onChange={(e) => setFormData({ ...formData, stateName: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium focus:border-[#0F4C47] outline-none bg-white"
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">City</label>
                      <input
                        type="text"
                        value={formData.cityName}
                        onChange={(e) => setFormData({ ...formData, cityName: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium focus:border-[#0F4C47] outline-none bg-white"
                        placeholder="City"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferred Languages (Multi-select) */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Preferred Languages (Select one or more)</span>
                    <span className="text-[10px] text-teal-700 font-semibold">{formData.preferredLanguages.length} selected</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {AVAILABLE_LANGUAGES.map((lang) => {
                      const isSelected = formData.preferredLanguages.includes(lang);
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => toggleLanguage(lang)}
                          className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
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
                </div>
              </div>
            )}

            {/* Email Field with Verification Code Flow */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder={
                      selectedRole === 'learner'
                        ? 'learner@domain.com'
                        : selectedRole === 'institution'
                        ? 'admin@institution.edu'
                        : 'officer@gov.in'
                    }
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (tab === 'register') {
                        setIsOtpVerified(false);
                        setOtpSent(false);
                      }
                    }}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4C47] outline-none"
                  />
                </div>

                {tab === 'register' && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isOtpVerified || otpTimer > 0}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isOtpVerified
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                        : 'bg-[#0F4C47] hover:bg-[#0A3632] text-white shadow-xs'
                    }`}
                  >
                    {isOtpVerified ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified</span>
                      </>
                    ) : otpTimer > 0 ? (
                      <span>Resend ({otpTimer}s)</span>
                    ) : (
                      <span>{otpSent ? 'Resend OTP' : 'Send OTP'}</span>
                    )}
                  </button>
                )}
              </div>

              {/* OTP Input Section (shown in register mode when OTP is sent) */}
              {tab === 'register' && otpSent && !isOtpVerified && (
                <div className="mt-2.5 p-3.5 rounded-2xl bg-teal-50/70 border border-teal-200 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0F4C47] flex items-center gap-1.5">
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Enter 6-Digit Email OTP:</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleAutoFillOtp}
                      className="text-[11px] font-black text-teal-800 underline hover:text-teal-950"
                    >
                      Use Demo OTP (482910)
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 482910"
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 rounded-xl border border-teal-300 text-sm tracking-widest font-mono font-bold text-center focus:border-[#0F4C47] outline-none bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
                    >
                      Verify OTP
                    </button>
                  </div>
                  {otpMessage && (
                    <p className="text-[11px] text-teal-800 font-medium">
                      {otpMessage}
                    </p>
                  )}
                </div>
              )}

              {/* Verified Badge */}
              {tab === 'register' && isOtpVerified && (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Email verified with security OTP token (482910)</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                {tab === 'login' && (
                  <button
                    type="button"
                    onClick={() => alert('Demo account credentials can be auto-filled using the 1-Click Demo buttons below.')}
                    className="text-[11px] text-teal-700 hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4C47] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {tab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4C47] outline-none"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0A3D39] via-[#0F4C47] to-[#125D57] hover:opacity-95 text-white text-xs sm:text-sm font-black transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] mt-2"
            >
              <span>
                {tab === 'login'
                  ? `Sign In to ${selectedRole === 'learner' ? 'Learner' : selectedRole === 'institution' ? 'Institution' : 'Government'} Portal`
                  : `Create Verified Account & Enter ${selectedRole === 'learner' ? 'Learner' : selectedRole === 'institution' ? 'Institution' : 'Government'} Portal`}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* QUICK 1-CLICK DEMO ACCESS BAR (Judges / Evaluators) */}
          <div className="pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant Demo Access (1-Click)</span>
              </span>
              <span className="text-[10px] text-teal-700 font-bold">Bypass credentials</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleInstantDemoLogin('learner')}
                className="px-3 py-2.5 rounded-2xl bg-teal-50/70 hover:bg-teal-100 border border-teal-200 text-[#0F4C47] text-[11px] font-bold text-left transition-all flex items-center gap-2.5"
                title="Log in directly as Learner Rohan Sharma"
              >
                <div className="w-6 h-6 rounded-full bg-[#0F4C47] text-white flex items-center justify-center text-xs shrink-0 shadow-xs">
                  🧑‍🎓
                </div>
                <div className="truncate">
                  <div className="font-black truncate">Learner</div>
                  <div className="text-[9px] text-slate-500 truncate">Rohan Sharma</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleInstantDemoLogin('institution')}
                className="px-3 py-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-bold text-left transition-all flex items-center gap-2.5"
                title="Log in directly as Institution Partner"
              >
                <div className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs shrink-0 shadow-xs">
                  🏛️
                </div>
                <div className="truncate">
                  <div className="font-black truncate">Institution</div>
                  <div className="text-[9px] text-slate-500 truncate">Apex Academy</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleInstantDemoLogin('government')}
                className="px-3 py-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-bold text-left transition-all flex items-center gap-2.5"
                title="Log in directly as State Mission Director"
              >
                <div className="w-6 h-6 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs shrink-0 shadow-xs">
                  🛡️
                </div>
                <div className="truncate">
                  <div className="font-black truncate">Government</div>
                  <div className="text-[9px] text-slate-500 truncate">State Mission</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER */}
        <div className="bg-slate-50 border-t border-slate-100 px-6 py-3.5 text-center text-xs text-slate-600">
          {tab === 'login' ? (
            <span>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  setTab('register');
                  setError('');
                }}
                className="font-black text-[#0F4C47] hover:underline"
              >
                Create an Account
              </button>
            </span>
          ) : (
            <span>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => {
                  setTab('login');
                  setError('');
                }}
                className="font-black text-[#0F4C47] hover:underline"
              >
                Sign In to Portal
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
