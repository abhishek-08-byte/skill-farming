import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  KeyRound, 
  CheckCircle2, 
  FileText, 
  ExternalLink, 
  X, 
  AlertCircle,
  Building,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DigiLockerModal = ({ isOpen, onClose }) => {
  const { connectDigiLocker, currentUser } = useApp();
  const [step, setStep] = useState(1); // 1: Aadhaar entry, 2: OTP verify, 3: Consent & Documents, 4: Success
  const [aadhaar, setAadhaar] = useState('9876 5432 1098');
  const [otp, setOtp] = useState(['5', '8', '2', '4', '1', '9']);
  const [selectedDocs, setSelectedDocs] = useState(['nsqf', 'aicte']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleOtpChange = (index, val) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (aadhaar.replace(/\s+/g, '').length < 12) {
      setError('Please enter a valid 12-digit Aadhaar / Virtual ID');
      return;
    }
    setError('');
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(2);
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const entered = otp.join('');
    if (entered.length < 6) {
      setError('Please enter the full 6-digit OTP');
      return;
    }
    setError('');
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep(3);
    }, 700);
  };

  const handleGrantConsent = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      connectDigiLocker(aadhaar.replace(/\s+/g, ''), selectedDocs);
      setStep(4);
    }, 800);
  };

  const handleFinish = () => {
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header with DigiLocker Official Identity */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-teal-900 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">Govt of India Official API</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-200 border border-teal-400/30">OAuth2 PKCE</span>
              </div>
              <h2 className="text-lg font-bold text-white leading-tight">DigiLocker Document Gateway</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* Step 1: Aadhaar or Virtual ID */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex items-start space-x-3 text-xs text-blue-800 dark:text-blue-300">
                <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <p>
                  Connect your Government of India DigiLocker account to automatically fetch and verify your educational certificates, NSQF qualifications, and official credentials.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Aadhaar Number / 16-digit Virtual ID
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value)}
                    placeholder="xxxx xxxx xxxx"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-teal-500"
                    maxLength={14}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  An OTP will be sent to your Aadhaar-linked mobile number ending with <strong>•••210</strong>
                </p>
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/50">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center space-x-2"
                >
                  {isVerifying ? (
                    <span>Requesting UIDAI OTP...</span>
                  ) : (
                    <>
                      <span>Send Verification OTP</span>
                      <KeyRound className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 2: Enter OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 mb-2">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Verify Aadhaar OTP</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Enter the 6-digit security code sent by UIDAI to your mobile
                </p>
              </div>

              <div className="flex justify-center gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-10 h-12 text-center text-lg font-bold bg-slate-50 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 rounded-xl focus:border-teal-500 focus:ring-0"
                  />
                ))}
              </div>

              {error && (
                <div className="flex items-center space-x-2 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-lg border border-rose-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Didn't receive OTP?</span>
                <button type="button" className="text-teal-600 dark:text-teal-400 font-semibold hover:underline">
                  Resend in 24s
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-lg"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center space-x-2"
                >
                  {isVerifying ? (
                    <span>Validating with UIDAI...</span>
                  ) : (
                    <>
                      <span>Verify & Access Locker</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Consent & Documents Found */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white">Authorized Credentials Located</h3>
                <p className="text-xs text-slate-500">
                  DigiLocker found 2 issued vocational qualifications for <strong>{currentUser?.name || 'Talha Jubayer'}</strong>.
                </p>
              </div>

              <div className="space-y-2.5">
                <label className="flex items-start space-x-3 p-3 rounded-xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/40 dark:bg-teal-950/20 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes('nsqf')}
                    onChange={(e) => {
                      setSelectedDocs(prev => e.target.checked ? [...prev, 'nsqf'] : prev.filter(x => x !== 'nsqf'));
                    }}
                    className="mt-1 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">NSQF Level 6 National Skill Certificate</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                        VERIFIED ISSUER
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Ministry of Skill Development & Entrepreneurship (MSDE) • Cert #DL-MSDE-2026-88192
                    </p>
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-3 rounded-xl border border-teal-200 dark:border-teal-900/60 bg-teal-50/40 dark:bg-teal-950/20 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedDocs.includes('aicte')}
                    onChange={(e) => {
                      setSelectedDocs(prev => e.target.checked ? [...prev, 'aicte'] : prev.filter(x => x !== 'aicte'));
                    }}
                    className="mt-1 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">AICTE / State Technical Board Verification</span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                        OFFICIAL RECORD
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Government Tool Room & Training Centre (GT&TC) • Roll: 2021-CS-8891
                    </p>
                  </div>
                </label>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                <div className="font-semibold text-slate-800 dark:text-slate-200">Consent Declaration:</div>
                <p>
                  I hereby provide my informed electronic consent to Skill Farming to fetch and digitally verify my educational & vocational credentials from DigiLocker under Information Technology Act 2000.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleGrantConsent}
                  disabled={isVerifying || selectedDocs.length === 0}
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  {isVerifying ? (
                    <span>Syncing with DigiLocker...</span>
                  ) : (
                    <>
                      <span>Grant Consent & Link ({selectedDocs.length})</span>
                      <ShieldCheck className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success & Verified Badge */}
          {step === 4 && (
            <div className="text-center py-4 space-y-4">
              <div className="inline-flex p-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  DigiLocker Integration Verified!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Your identity and educational credentials have been verified with the Government of India DigiLocker repository.
                </p>
              </div>

              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-300 text-xs font-bold font-mono">
                <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>STATUS: VERIFIED (DL-2026-KA-1098)</span>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleFinish}
                  className="w-full py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-md"
                >
                  Return to Profile
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
