import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProfileCompletionCard } from '../profile/ProfileCompletionCard';
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
  FileText
} from 'lucide-react';

export const ProfileSettings = () => {
  const {
    currentUser,
    currentRole,
    institutionProfile,
    governmentProfile,
    openProfileWizard
  } = useApp();

  const activeProfileTab = currentRole;

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
            Manage your credentials, academic degrees, skill proficiencies, and career pathways.
          </p>
        </div>

        {/* Current Active Role Badge (Strict Role Separation) */}
        <div className="flex items-center gap-2 bg-[#E2F1ED] px-4 py-2 rounded-2xl border border-[#DCE8E3] text-xs font-bold text-[#0F4C47] self-start md:self-auto shadow-xs">
          {currentRole === 'learner' && <User className="w-4 h-4" />}
          {currentRole === 'institution' && <Building className="w-4 h-4" />}
          {currentRole === 'government' && <Shield className="w-4 h-4" />}
          <span>{currentRole === 'learner' ? 'Learner Profile Dashboard' : currentRole === 'institution' ? 'Institution Administration Profile' : 'State Government Mission Profile'}</span>
        </div>
      </div>

      {/* DYNAMIC PROFILE COMPLETION GAUGE CARD */}
      <ProfileCompletionCard role={activeProfileTab} />

      {/* ======================================================== */}
      {/* 1. LEARNER PROFILE VIEW & SECTION-BY-SECTION EDIT        */}
      {/* ======================================================== */}
      {activeProfileTab === 'learner' && (
        <div className="space-y-5">
          {/* Section 1: Basic Information */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F4C47] flex items-center justify-center font-bold text-xs border border-teal-200">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Basic Personal Information</h3>
                  <p className="text-[11px] text-slate-500">Identity, avatar, and contact channels</p>
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
              <div className="flex items-center gap-3 sm:col-span-3 pb-2 border-b border-slate-100">
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-600 shadow-sm"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">{currentUser.name || 'Talha Jubayer'}</h4>
                  <p className="text-xs text-slate-500">{currentUser.headline || 'Aspiring Backend Architect'}</p>
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
                <span className="font-semibold text-slate-800">{currentUser.gender || 'Male'} • {currentUser.language || 'English, Hindi'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Location & Work Mode */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F4C47] flex items-center justify-center font-bold text-xs border border-teal-200">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Location & Relocation Preferences</h3>
                  <p className="text-[11px] text-slate-500">Geographic availability and preferred operating modes</p>
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
                <span className="font-bold text-slate-500 block text-[11px]">Current Location</span>
                <span className="font-semibold text-slate-800">{currentUser.city || currentUser.location || 'Pune'}, {currentUser.state || 'Maharashtra'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Preferred Work Mode</span>
                <span className="font-semibold text-slate-800">{currentUser.preferredWorkMode || 'Hybrid'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Willing to Relocate</span>
                <span className="font-semibold text-slate-800">{currentUser.willingToRelocate ? 'Yes, Open to Relocation' : 'Local Only'}</span>
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
                        {edu.institution} • {edu.city ? `${edu.city}, ${edu.state}, ${edu.country}` : 'Bengaluru, Karnataka, India'} • Class of {edu.yearOfCompletion}
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

          {/* Section 4: Target Career & Role */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F4C47] flex items-center justify-center font-bold text-xs border border-teal-200">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Career Trajectory & Target Role</h3>
                  <p className="text-[11px] text-slate-500">Employment aspirations, industry sectors, and wage targets</p>
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
                  {currentUser.careerProfile?.targetRole || currentUser.career?.targetCareerTitle || 'Backend Developer'}
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Target Industry</span>
                <span className="font-bold text-slate-800">
                  {currentUser.careerProfile?.targetIndustry || 'IT & Software Engineering'}
                </span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Target Salary Band</span>
                <span className="font-bold text-slate-800">{currentUser.careerProfile?.salaryExpectation || '₹6–9 LPA'}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Timeline</span>
                <span className="font-bold text-slate-800">{currentUser.careerProfile?.targetTimeline || 'Immediate'}</span>
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

          {/* Section 6: Certifications & Portfolio */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-[#0F4C47] flex items-center justify-center font-bold text-xs border border-teal-200">
                  6
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Certifications & Portfolio</h3>
                  <p className="text-[11px] text-slate-500">Verified credentials, GitHub, and portfolio URLs</p>
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
              {(currentUser.credentials || []).map((cred, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-amber-600" />
                    <div>
                      <span className="font-bold text-slate-900">{cred.title}</span>
                      <p className="text-[10px] text-slate-500">{cred.issuer} • Issued {cred.issueDate}</p>
                    </div>
                  </div>
                  {cred.url && (
                    <a
                      href={cred.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#0F4C47] font-semibold text-[11px] flex items-center gap-1 hover:underline"
                    >
                      Verify <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
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
                  {institutionProfile.subType === 'employer' ? 'Corporate Employer Portal' : 'Vocational Training Provider'} • {institutionProfile.industry || institutionProfile.providerType}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openProfileWizard('institution', 1)}
                className="px-4 py-2 rounded-xl bg-[#0F4C47] text-white text-xs font-bold hover:bg-[#0A3632] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Institution Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-xs">
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Entity Type</span>
                <span className="font-semibold text-slate-800">{institutionProfile.orgType || institutionProfile.providerType}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Headquarters / Campus</span>
                <span className="font-semibold text-slate-800">{institutionProfile.hqCity || institutionProfile.campusCity}, India</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Primary Contact</span>
                <span className="font-semibold text-slate-800">{institutionProfile.contactName || institutionProfile.contactPerson}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Official Email</span>
                <span className="font-semibold text-slate-800">{institutionProfile.contactEmail || institutionProfile.adminEmail}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Registration / License</span>
                <span className="font-semibold text-slate-800 font-mono text-[11px]">{institutionProfile.regNumber || institutionProfile.licenseId}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Accreditation</span>
                <span className="font-semibold text-emerald-700">{institutionProfile.accreditation || institutionProfile.accreditationBody}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. GOVERNMENT PROFILE VIEW & EDIT                        */}
      {/* ======================================================== */}
      {activeProfileTab === 'government' && (
        <div className="space-y-5">
          <div className="farming-card p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">{governmentProfile.deptName}</h3>
                <p className="text-xs text-slate-500">
                  {governmentProfile.ministry} • {governmentProfile.govLevel} Tier
                </p>
              </div>
              <button
                type="button"
                onClick={() => openProfileWizard('government', 1)}
                className="px-4 py-2 rounded-xl bg-[#0F4C47] text-white text-xs font-bold hover:bg-[#0A3632] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Government Profile</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-xs">
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Nodal Officer</span>
                <span className="font-semibold text-slate-800">{governmentProfile.nodalOfficerName}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Designation / Rank</span>
                <span className="font-semibold text-slate-800">{governmentProfile.nodalOfficerRank}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Official Email</span>
                <span className="font-semibold text-slate-800">{governmentProfile.officialEmail}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Jurisdiction Region</span>
                <span className="font-semibold text-slate-800">{governmentProfile.jurisdictionRegion}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Target Annual Beneficiaries</span>
                <span className="font-black text-[#0F4C47]">{governmentProfile.targetAnnualBeneficiaries}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block text-[11px]">Employment Target</span>
                <span className="font-semibold text-emerald-700">{governmentProfile.targetEmploymentRate}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
