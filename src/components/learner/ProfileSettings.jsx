import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Settings, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProfileSettings = () => {
  const { currentUser, setCurrentUser, careers, skills } = useApp();

  const [name, setName] = useState(currentUser.name || 'Talha Jubayer');
  const [email, setEmail] = useState(currentUser.email || 'talhajuba@gmail.com');
  const [phone, setPhone] = useState(currentUser.phone || '+91 98765 43210');
  const [location, setLocation] = useState(currentUser.location || 'Pune, Maharashtra');

  const [qualification, setQualification] = useState(currentUser.education?.qualification || 'Bachelor of Technology');
  const [degree, setDegree] = useState(currentUser.education?.degree || 'B.Tech in Computer Engineering');
  const [institution, setInstitution] = useState(currentUser.education?.institution || 'Government College of Engineering');

  const [selectedSkills, setSelectedSkills] = useState(currentUser.selectedSkills || ['dbms', 'dsa', 'electrical']);
  const [targetRole, setTargetRole] = useState(currentUser.career?.targetCareerId || 'backend-dev');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleSkill = (sId) => {
    if (selectedSkills.includes(sId)) {
      if (selectedSkills.length > 1) {
        setSelectedSkills(selectedSkills.filter((s) => s !== sId));
      }
    } else {
      setSelectedSkills([...selectedSkills, sId]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const careerObj = careers.find((c) => c.id === targetRole);
    setCurrentUser((prev) => ({
      ...prev,
      name,
      email,
      phone,
      location,
      education: {
        ...prev.education,
        qualification,
        degree,
        institution
      },
      selectedSkills,
      career: {
        ...prev.career,
        targetCareerId: targetRole,
        targetCareerTitle: careerObj?.title || 'Backend Developer'
      }
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 md:pb-6 animate-in fade-in duration-200">
      <div className="farming-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
            <User className="w-4 h-4" />
            <span>Learner Profile & Onboarding</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Profile & Target Career Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Update your education background, selected core skills, and employment target role.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt={name}
            className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-600 shadow-sm"
          />
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details */}
        <div className="farming-card p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
            1. Personal Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Location / District</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Education Details */}
        <div className="farming-card p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
            2. Education Background
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Highest Qualification</label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Degree / Specialization</label>
              <input
                type="text"
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Institution</label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Selected Skills - Mandated 3 Skills */}
        <div className="farming-card p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                3. Primary Skill Focus
              </h3>
              <p className="text-xs text-slate-500">
                Choose which skills you currently practice or want to improve (10 questions per skill).
              </p>
            </div>
            <span className="text-xs font-bold text-[#0F4C47]">
              {selectedSkills.length * 10} Total Assessment Questions
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {skills.map((sk) => {
              const isChecked = selectedSkills.includes(sk.id);
              return (
                <div
                  key={sk.id}
                  onClick={() => toggleSkill(sk.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isChecked
                      ? 'border-[#0F4C47] bg-[#E2F1ED]/60 ring-2 ring-[#0F4C47]/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-base text-slate-900">{sk.name}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="accent-[#0F4C47] w-4 h-4 cursor-pointer"
                    />
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{sk.tagline}</p>
                  <div className="mt-3 text-[10px] font-bold text-teal-800">
                    10-Question Standardized Bank
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Target Career Selection */}
        <div className="farming-card p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
            4. Target Career Role
          </h3>
          <div className="text-xs">
            <label className="font-bold text-slate-700 block mb-2">
              Select your targeted career trajectory:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {careers.map((career) => (
                <div
                  key={career.id}
                  onClick={() => setTargetRole(career.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    targetRole === career.id
                      ? 'border-[#0F4C47] bg-[#E2F1ED]/50 ring-2 ring-[#0F4C47]/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>{career.title}</span>
                    <span className="text-teal-700">{career.avgSalaryRange}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{career.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3">
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-700">
              ✓ Profile settings saved successfully!
            </span>
          )}
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
          >
            <span>Save Profile Settings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
