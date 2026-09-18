import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProfileCompletionCard } from '../profile/ProfileCompletionCard';
import { DigiLockerModal } from '../profile/DigiLockerModal';
import {
  User,
  Building,
  Shield,
  Edit3,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  Clock,
  ExternalLink,
  Sparkles,
  Phone,
  Mail,
  Globe,
  FileText,
  Camera,
  ShieldCheck,
  DollarSign
} from 'lucide-react';

export const ProfileSettings = () => {
  const {
    currentUser,
    currentRole,
    institutionProfile,
    recruiterProfile,
    governmentProfile,
    openProfileWizard,
    updateLearnerProfile
  } = useApp();

  const [isDigiLockerOpen, setIsDigiLockerOpen] = useState(false);

  const activeProfileTab = currentRole;

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      updateLearnerProfile({ avatar: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 md:pb-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="farming-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
            <User className="w-4 h-4" />
            <span>Profile & Account Hub</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Complete & Edit Your Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your credentials, academic degrees, study location, target wage, and verified certifications.
          </p>
        </div>

        {/* Current Active Role Badge (Strict Role Separation) */}
        <div className="flex items-center gap-2 bg-[#E2F1ED] px-4 py-2 rounded-2xl border border-[#DCE8E3] text-xs font-bold text-[#0F4C47] self-start md:self-auto shadow-xs">
          {currentRole === 'learner' && <User className="w-4 h-4" />}
          {currentRole === 'institution' && <Building className="w-4 h-4" />}
          {currentRole === 'employer' && <Briefcase className="w-4 h-4" />}
          {currentRole === 'government' && <Shield className="w-4 h-4" />}
          <span>
            {currentRole === 'learner' 
              ? 'Learner Profile Dashboard' 
              : currentRole === 'institution' 
              ? 'Institution Administration Profile' 
              : currentRole === 'employer'
              ? 'Corporate Recruiter Profile'
              : 'State Government Mission Profile'}
          </span>
        </div>
      </div>

      {/* DYNAMIC PROFILE COMPLETION GAUGE CARD */}
      <ProfileCompletionCard role={activeProfileTab} />

      {/* ======================================================== */}
      {/* 1. LEARNER PROFILE VIEW & SECTION-BY-SECTION EDIT        */}
      {/* ======================================================== */}
      {activeProfileTab === 'learner' && (
        <div className="space-y-5">
          {/* Section 1: Basic Information & Photo Upload */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F4C47] flex items-center justify-center font-bold text-xs border border-teal-200">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Basic Personal Information</h3>
                  <p className="text-[11px] text-slate-500">Identity, live avatar photo, and verified contact channels</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openProfileWizard('learner', 1)}
                className="px-3 py-1.5 rounded-xl border border-teal-200 text-[#0F4C47] hover:bg-teal-50 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Section</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
              <div className="flex items-center gap-3.5 sm:col-span-3 pb-2 border-b border-slate-100">
                <div className="relative group">
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={currentUser.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-600 shadow-sm"
                  />
                  <label 
                    htmlFor="avatar-upload"
                    className="absolute inset-0 bg-black/60 rounded-2xl flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-white text-[10px] font-bold"
                  >
                    <Camera className="w-4 h-4 mb-0.5" />
                    <span>Upload</span>
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-extrabold text-sm text-slate-900">{currentUser.name || 'Talha Jubayer'}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {currentUser.verificationStatus || 'VERIFIED'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{currentUser.headline || 'Aspiring Backend Architect'}</p>
                  <label htmlFor="avatar-upload" className="text-[11px] text-teal-600 hover:underline cursor-pointer font-semibold block mt-1">
                    Click to change profile picture
                  </label>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Email Address</span>
                <span className="font-semibold text-slate-800">{currentUser.email || 'talhajuba@gmail.com'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Phone Number</span>
                <span className="font-semibold text-slate-800">{currentUser.phone || '+91 98765 43210'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Gender & Language</span>
                <span className="font-semibold text-slate-800">{currentUser.gender || 'Male'} • {currentUser.language || 'English, Hindi, Marathi'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Study / Training Location & Residence */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F4C47] flex items-center justify-center font-bold text-xs border border-teal-200">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Study / Training Location & Work Mode</h3>
                  <p className="text-[11px] text-slate-500">Official training centre, college location, and operating mode</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openProfileWizard('learner', 2)}
                className="px-3 py-1.5 rounded-xl border border-teal-200 text-[#0F4C47] hover:bg-teal-50 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Section</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Residential Address</span>
                <span className="font-semibold text-slate-800">{currentUser.city || 'Pune'}, {currentUser.state || 'Maharashtra'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Preferred Work Mode</span>
                <span className="font-semibold text-slate-800">{currentUser.preferredWorkMode || 'Hybrid'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Willing to Relocate</span>
                <span className="font-semibold text-slate-800">{currentUser.willingToRelocate ? 'Yes, Open to Relocation' : 'Local Only'}</span>
              </div>

              {/* Mandatory Formal Study / Training Location */}
              <div className="sm:col-span-3 mt-1 p-3.5 bg-teal-50/70 rounded-xl border border-teal-200">
                <div className="flex items-center space-x-2 text-[#0F4C47] font-bold text-xs mb-1.5">
                  <GraduationCap className="w-4 h-4 text-teal-600" />
                  <span>Mandatory Formal Study / Training Location (Not Residential Address)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Training Institution / College</span>
                    <span className="font-bold text-slate-800">
                      {currentUser.studyLocation?.institution || 'Government Tool Room & Training Centre (GT&TC)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Study District & State</span>
                    <span className="font-bold text-slate-800">
                      {currentUser.studyLocation?.district || 'Bengaluru Urban'}, {currentUser.studyLocation?.state || 'Karnataka'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Campus City</span>
                    <span className="font-bold text-slate-800">
                      {currentUser.studyLocation?.city || 'Bengaluru'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Education Background */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F4C47] flex items-center justify-center font-bold text-xs border border-teal-200">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Academic & Educational Background</h3>
                  <p className="text-[11px] text-slate-500">Degrees, diplomas, universities, and graduation milestones</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openProfileWizard('learner', 3)}
                className="px-3 py-1.5 rounded-xl border border-teal-200 text-[#0F4C47] hover:bg-teal-50 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Section</span>
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {(currentUser.educations && currentUser.educations.length > 0 ? currentUser.educations : [
                {
                  degree: currentUser.education?.degree || 'B.Tech in Computer Engineering',
                  institution: currentUser.education?.institution || 'Government College of Engineering',
                  yearOfCompletion: currentUser.education?.yearOfPassing || '2025',
                  grade: '8.8 CGPA'
                }
              ]).map((edu, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-[#0F4C47]" />
                    <div>
                      <h4 className="font-bold text-slate-900">{edu.degree}</h4>
                      <p className="text-[11px] text-slate-500">
                        {edu.institution} • Class of {edu.yearOfCompletion}
                      </p>
                    </div>
                  </div>
                  {edu.grade && (
                    <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg font-bold text-teal-800">
                      {edu.grade}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Target Career, Custom Role & Wage */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F4C47] flex items-center justify-center font-bold text-xs border border-teal-200">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Career Trajectory & Wage Targets</h3>
                  <p className="text-[11px] text-slate-500">Target role (customizable), industry sector, and annual wage target</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openProfileWizard('learner', 4)}
                className="px-3 py-1.5 rounded-xl border border-teal-200 text-[#0F4C47] hover:bg-teal-50 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Section</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 text-xs">
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Target Job Role</span>
                <span className="font-black text-sm text-[#0F4C47]">
                  {currentUser.targetRole || currentUser.careerProfile?.targetRole || 'Full Stack Web Developer'}
                </span>
                {currentUser.customTargetRole && (
                  <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">
                    (Custom: {currentUser.customTargetRole})
                  </span>
                )}
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Target Annual Wage</span>
                <span className="font-black text-sm text-slate-900">
                  ₹{Number(currentUser.targetWage || 650000).toLocaleString('en-IN')} / year ({currentUser.targetWageFormatted || '₹6.5 LPA'})
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Target Industry</span>
                <span className="font-bold text-slate-800">
                  {currentUser.careerProfile?.targetIndustry || 'IT & Software Engineering'}
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Timeline</span>
                <span className="font-bold text-slate-800">{currentUser.careerProfile?.targetTimeline || 'Immediate (Within 3 months)'}</span>
              </div>
            </div>
          </div>

          {/* Section 5: Skills & Proficiency */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F4C47] flex items-center justify-center font-bold text-xs border border-teal-200">
                  5
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Core Technical Skills</h3>
                  <p className="text-[11px] text-slate-500">Verified and self-rated competency proficiency</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openProfileWizard('learner', 5)}
                className="px-3 py-1.5 rounded-xl border border-teal-200 text-[#0F4C47] hover:bg-teal-50 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Section</span>
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(currentUser.userSkills || [
                { name: 'DBMS', proficiency: 'Advanced' },
                { name: 'DSA', proficiency: 'Intermediate' },
                { name: 'Electrical Works', proficiency: 'Advanced' }
              ]).map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-teal-200 p-2.5 rounded-xl flex items-center gap-2 shadow-2xs"
                >
                  <span className="font-extrabold text-xs text-slate-900">{s.name}</span>
                  <span className="text-[10px] uppercase font-bold bg-teal-100 text-[#0F4C47] px-2 py-0.5 rounded-md">
                    {s.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Certifications & Free Courses with Enrollment ID */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F4C47] flex items-center justify-center font-bold text-xs border border-teal-200">
                  6
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Enrolled Courses & Unique Enrollment IDs</h3>
                  <p className="text-[11px] text-slate-500">Free tuition programs with persistent verification credentials</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openProfileWizard('learner', 6)}
                className="px-3 py-1.5 rounded-xl border border-teal-200 text-[#0F4C47] hover:bg-teal-50 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Section</span>
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {(currentUser.activeCourses || []).map((course, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-teal-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900">{course.title}</span>
                      <p className="text-[10px] text-slate-500">
                        Skill: {course.skill} • Progress: {course.progress}% • Attendance: {course.attendance || 100}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      100% FREE TUITION
                    </span>
                    <span className="font-mono text-[11px] font-bold text-[#0F4C47] bg-white border border-teal-200 px-2 py-0.5 rounded-md">
                      ID: {course.enrollmentId || `ENR-2026-${8800 + idx}`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: DigiLocker Integration & Government Verification */}
          <div className="farming-card p-6 border-2 border-teal-500/30 bg-gradient-to-br from-teal-50/20 to-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-xs border border-blue-200 shrink-0">
                  7
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-sm text-slate-900">DigiLocker Verification Gateway</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {currentUser.verificationStatus || 'VERIFIED'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">Official Government of India credential synchronization under IT Act 2000</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDigiLockerOpen(true)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{currentUser.digiLockerLinked ? 'Re-Verify Locker' : 'Connect DigiLocker'}</span>
              </button>
            </div>

            <div className="mt-4 p-3.5 bg-white rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Aadhaar-Linked Repository: {currentUser.digiLockerId || 'DL-2026-KA-99481'}</span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  NSQF Level 6 National Skill Certificate & GT&TC State Board marks records authenticated.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-bold">
                  ✓ VERIFIED CREDENTIALS
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. INSTITUTION PROFILE VIEW & EDIT                       */}
      {/* ======================================================== */}
      {activeProfileTab === 'institution' && (
        <div className="space-y-5">
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">{institutionProfile.name}</h3>
                <p className="text-xs text-slate-500">
                  Vocational Training Institution • {institutionProfile.providerType || 'EdTech & Technical Institute'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openProfileWizard('institution', 1)}
                className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F4C47] text-xs font-bold transition-all flex items-center gap-1.5 border border-teal-200"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Institution Details</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Campus Location</span>
                <span className="font-semibold text-slate-800">{institutionProfile.campusCity || 'Pune'}, {institutionProfile.campusState || 'Maharashtra'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Accreditation Body</span>
                <span className="font-semibold text-slate-800">{institutionProfile.accreditationBody || 'NSDC & NCVET Grade-A'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Contact Email</span>
                <span className="font-semibold text-slate-800">{institutionProfile.adminEmail || 'director@apextech.org'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. EMPLOYER PROFILE VIEW & EDIT                          */}
      {/* ======================================================== */}
      {activeProfileTab === 'employer' && (
        <div className="space-y-5">
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">{recruiterProfile.name || 'InfraCloud Technologies'}</h3>
                <p className="text-xs text-slate-500">
                  {recruiterProfile.industry || 'Cloud Infrastructure & Distributed Software'} • {recruiterProfile.orgType || 'Enterprise'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openProfileWizard('employer', 1)}
                className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F4C47] text-xs font-bold transition-all flex items-center gap-1.5 border border-teal-200"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Recruiter Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Talent Contact</span>
                <span className="font-semibold text-slate-800">{recruiterProfile.contactName || 'Anand Kulkarni'} ({recruiterProfile.contactEmail})</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Registration / CIN</span>
                <span className="font-semibold text-slate-800">{recruiterProfile.regNumber || 'CIN: U72200PN2017PTC172890'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">HQ Location</span>
                <span className="font-semibold text-slate-800">{recruiterProfile.hqCity || 'Pune'}, {recruiterProfile.hqState || 'Maharashtra'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. GOVERNMENT PROFILE VIEW & EDIT                        */}
      {/* ======================================================== */}
      {activeProfileTab === 'government' && (
        <div className="space-y-5">
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">{governmentProfile?.deptName || 'Department of Skill Development & Entrepreneurship'}</h3>
                <p className="text-xs text-slate-500">
                  {governmentProfile?.ministry || 'Ministry of Skill Development & Livelihood'} • {governmentProfile?.govLevel || 'State'} Tier
                </p>
              </div>
              <button
                type="button"
                onClick={() => openProfileWizard('government', 1)}
                className="px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F4C47] text-xs font-bold transition-all flex items-center gap-1.5 border border-teal-200"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Government Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-xs">
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Nodal Officer</span>
                <span className="font-semibold text-slate-800">{governmentProfile?.nodalOfficerName || 'Dr. Rajeshwari Patil, IAS'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Designation / Rank</span>
                <span className="font-semibold text-slate-800">{governmentProfile?.nodalOfficerRank || 'Mission Director & Principal Secretary'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Official Email</span>
                <span className="font-semibold text-slate-800">{governmentProfile?.officialEmail || 'mission.director@skillmission.gov.in'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Jurisdiction Region</span>
                <span className="font-semibold text-slate-800">{governmentProfile?.jurisdictionRegion || 'Statewide (36 Districts)'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Target Beneficiaries</span>
                <span className="font-black text-[#0F4C47]">{governmentProfile?.targetAnnualBeneficiaries || '2,50,000 Candidates'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Target Employment Rate</span>
                <span className="font-semibold text-emerald-700">{governmentProfile?.targetEmploymentRate || '78% in 90 Days'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DigiLocker Modal */}
      <DigiLockerModal isOpen={isDigiLockerOpen} onClose={() => setIsDigiLockerOpen(false)} />
    </div>
  );
};

export default ProfileSettings;
