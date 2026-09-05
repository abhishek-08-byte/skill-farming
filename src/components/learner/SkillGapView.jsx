import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Target,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  ArrowRight,
  Briefcase,
  Sparkles,
  Layers,
  Award,
  Filter
} from 'lucide-react';

export const SkillGapView = ({ onEnrollCourse, onOpenAssessment }) => {
  const {
    currentUser,
    careers,
    courses,
    setTargetCareer,
    setActiveTab
  } = useApp();

  const currentCareerId = currentUser.career?.targetCareerId || 'backend-dev';
  const currentCareer = careers.find((c) => c.id === currentCareerId) || careers[0];

  // Assessment results of user
  const dbmsScore = currentUser.assessmentResults?.dbms?.score || 7;
  const dsaScore = currentUser.assessmentResults?.dsa?.score || 5;
  const elecScore = currentUser.assessmentResults?.electrical?.score || 9;

  const currentScores = {
    dbms: dbmsScore,
    dsa: dsaScore,
    electrical: elecScore
  };

  // Compare requirements
  const evaluatedGaps = [];
  const strongAreas = [];
  const developingAreas = [];

  Object.entries(currentCareer.requiredSkills || {}).forEach(([sId, req]) => {
    if (req.minScore === 0) return; // not required
    const currentVal = currentScores[sId] || 0;
    const isMet = currentVal >= req.minScore;
    const diff = req.minScore - currentVal;

    const skillName = sId === 'dbms' ? 'DBMS' : sId === 'dsa' ? 'DSA' : 'Electrical Works';

    if (isMet) {
      strongAreas.push({
        id: sId,
        name: skillName,
        current: currentVal,
        required: req.minScore,
        label: req.label
      });
    } else if (diff <= 3) {
      developingAreas.push({
        id: sId,
        name: skillName,
        current: currentVal,
        required: req.minScore,
        gap: diff,
        label: req.label
      });
    } else {
      evaluatedGaps.push({
        id: sId,
        name: skillName,
        current: currentVal,
        required: req.minScore,
        gap: diff,
        label: req.label
      });
    }
  });

  // Additional career requirements (e.g. APIs, System Design)
  currentCareer.additionalSkills?.forEach((addSkill) => {
    evaluatedGaps.push({
      id: 'add-' + addSkill,
      name: addSkill,
      current: 0,
      required: 7,
      gap: 7,
      label: 'Career Specialized Requirement'
    });
  });

  // Generate Personalized Recommendations based on evaluated gaps
  const recommendedCourses = courses.filter((c) => {
    if (currentCareerId === 'backend-dev') {
      return c.id === 'course-dsa-applied' || c.id === 'course-dbms-adv';
    } else if (currentCareerId === 'electrical-tech' || currentCareerId === 'electrical-maint-tech') {
      return c.id === 'course-elec-maint' || c.id === 'course-elec-safety';
    } else if (currentCareerId === 'data-analyst' || currentCareerId === 'database-dev') {
      return c.id === 'course-dbms-adv' || c.id === 'course-dbms-fund';
    }
    return c.marketRelevance === 'High';
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-6 animate-in fade-in duration-200">
      {/* Header & Target Career Selector */}
      <div className="farming-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
            <Target className="w-4 h-4" />
            <span>Longitudinal Alignment</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Skill Gap & Career Readiness Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Comparing your <strong>Current Capability</strong> against target requirements for <strong>{currentCareer.title}</strong>.
          </p>
        </div>

        {/* Career Selection Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-xs font-bold text-slate-600">Target Role:</label>
          <select
            value={currentCareerId}
            onChange={(e) => setTargetCareer(e.target.value)}
            className="text-xs font-bold text-slate-800 bg-[#F5F8F7] border border-[#DCE8E3] rounded-xl px-3.5 py-2.5 outline-none focus:border-[#0F4C47] shadow-xs cursor-pointer"
          >
            {careers.map((career) => (
              <option key={career.id} value={career.id}>
                {career.title} ({career.avgSalaryRange})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Target Career Snapshot Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Target Role</div>
          <div className="text-sm font-extrabold text-slate-900 mt-0.5">{currentCareer.title}</div>
          <div className="text-xs text-slate-500 mt-1">{currentCareer.category}</div>
        </div>

        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Market Demand</div>
          <div className="text-sm font-extrabold text-[#0F4C47] mt-0.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>{currentCareer.marketDemand}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">High hiring velocity</div>
        </div>

        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Target Wage Band</div>
          <div className="text-sm font-extrabold text-slate-900 mt-0.5">{currentCareer.avgSalaryRange}</div>
          <div className="text-xs text-slate-500 mt-1">Average market range</div>
        </div>

        <div className="farming-card p-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase">Action</div>
            <div className="text-xs font-bold text-slate-800 mt-0.5">Re-Assess Skills</div>
          </div>
          <button
            onClick={onOpenAssessment}
            className="px-3 py-1.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all shadow-xs"
          >
            Take Test
          </button>
        </div>
      </div>

      {/* 3-COLUMN CAPABILITY COMPARISON
          1. Stronger Areas
          2. Developing Areas
          3. Skill Gaps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Col 1: Stronger Areas */}
        <div className="farming-card p-5 border-l-4 border-l-emerald-600">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
              Stronger Areas
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Meets or exceeds target career minimum thresholds.
          </p>

          <div className="space-y-3">
            {strongAreas.length === 0 ? (
              <div className="text-xs text-slate-400 py-3 text-center">No skills meeting target yet.</div>
            ) : (
              strongAreas.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>{item.name}</span>
                    <span className="text-emerald-700">
                      {item.current}/10 (Req: {item.required})
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-800 mt-1">{item.label}</div>
                  <div className="w-full bg-emerald-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${(item.current / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Col 2: Developing Areas */}
        <div className="farming-card p-5 border-l-4 border-l-amber-500">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
              Developing Areas
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Baseline exists; targeted problem solving needed to reach target requirement.
          </p>

          <div className="space-y-3">
            {developingAreas.length === 0 ? (
              <div className="text-xs text-slate-400 py-3 text-center">No developing skills recorded.</div>
            ) : (
              developingAreas.map((item) => (
                <div key={item.id} className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/60">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                    <span>{item.name}</span>
                    <span className="text-amber-700">
                      {item.current}/10 (Gap: -{item.gap})
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-800 mt-1">{item.label}</div>
                  <div className="w-full bg-amber-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full"
                      style={{ width: `${(item.current / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Col 3: Skill Gaps */}
        <div className="farming-card p-5 border-l-4 border-l-rose-500">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-rose-500" />
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
              Priority Skill Gaps
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Critical competencies required for career transition and hiring qualification.
          </p>

          <div className="space-y-3">
            {evaluatedGaps.slice(0, 4).map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-rose-50/60 border border-rose-200/60">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>{item.name}</span>
                  <span className="text-rose-600 text-[11px]">Priority Gap</span>
                </div>
                <div className="text-[11px] text-slate-600 mt-1">{item.label}</div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-rose-700 font-semibold">
                  <span>Recommended: Structured Module Training</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI-ASSISTED PERSONALIZED RECOMMENDATIONS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-100 flex items-center justify-center text-[#0F4C47]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Personalized Training Recommendations
              </h2>
              <p className="text-xs text-slate-500">
                Prioritizing actual skill gaps identified in your assessments.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('course')}
            className="text-xs font-bold text-[#0F4C47] hover:underline"
          >
            Explore Full Catalogue →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedCourses.map((course, idx) => (
            <div
              key={course.id}
              className="farming-card p-5 flex flex-col justify-between hover:border-[#0F4C47] transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E2F1ED] text-[#0F4C47]">
                    Priority #{idx + 1} Recommendation
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">
                    {course.duration}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mt-2">
                  {course.title}
                </h3>
                <div className="text-xs text-teal-800 font-semibold mt-0.5">
                  Provided by {course.provider} • Mode: {course.trainingMode}
                </div>

                {/* Recommendation Reason Box */}
                <div className="mt-3 p-3 rounded-xl bg-[#F4F9F7] border border-[#DCE8E3] text-xs">
                  <div className="font-bold text-[#0F4C47] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>Why this course is recommended:</span>
                  </div>
                  <p className="text-slate-700 mt-1 leading-relaxed">
                    {course.recommendationReason}
                  </p>
                </div>

                {/* Skills Covered */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {course.skillsCovered?.map((sk, skIdx) => (
                    <span
                      key={skIdx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">
                  {course.modulesCount || 8} Comprehensive Modules
                </span>
                <button
                  onClick={() => {
                    if (onEnrollCourse) onEnrollCourse(course.id);
                    setActiveTab('course');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>Enroll in Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
