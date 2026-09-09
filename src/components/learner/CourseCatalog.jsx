import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CourseLearningView } from './CourseLearningView';
import {
  Search,
  Filter,
  BookOpen,
  CheckCircle,
  Clock,
  MapPin,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Database,
  Binary,
  Zap,
  PlayCircle,
  Award,
  Layers,
  Video
} from 'lucide-react';

export const CourseCatalog = () => {
  const {
    courses,
    currentUser,
    enrollInCourse,
    updateCourseProgress,
    activeCoursePlayerId,
    setActiveCoursePlayerId
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('All');
  const [modeFilter, setModeFilter] = useState('All');
  const [selectedCourseDetail, setSelectedCourseDetail] = useState(null);
  const [activeLearningCourse, setActiveLearningCourse] = useState(null);

  // Filter courses
  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = skillFilter === 'All' || c.skillId === skillFilter.toLowerCase() || c.skill === skillFilter;
    const matchesMode = modeFilter === 'All' || c.trainingMode === modeFilter;
    return matchesSearch && matchesSkill && matchesMode;
  });

  const isEnrolled = (courseId) => {
    return currentUser.activeCourses?.some((ac) => ac.courseId === courseId);
  };

  const getEnrollmentProgress = (courseId) => {
    return currentUser.activeCourses?.find((ac) => ac.courseId === courseId)?.progress || 0;
  };

  const activeCourseToRender =
    activeLearningCourse ||
    (activeCoursePlayerId ? (courses.find(c => c.id === activeCoursePlayerId) || courses[0]) : null);

  if (activeCourseToRender) {
    return (
      <CourseLearningView
        course={activeCourseToRender}
        onBack={() => {
          setActiveLearningCourse(null);
          if (setActiveCoursePlayerId) setActiveCoursePlayerId(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-6 animate-in fade-in duration-200">
      {/* Header & Catalog Hero */}
      <div className="farming-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
            <BookOpen className="w-4 h-4" />
            <span>Curriculum & Batch Discovery</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Training Course Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Evidence-aligned vocational and technical courses addressing verified skill gaps.
          </p>
        </div>

        {/* Lifelong Learning Update Banner */}
        <div className="p-3 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 max-w-sm flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <span className="font-bold">Lifelong Learning:</span> New PostgreSQL 16 & Partitioning module released for Relational Fundamentals graduates.
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="farming-card p-4 flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[220px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by course title, keyword, or provider..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F5F8F7] rounded-xl border border-transparent focus:border-[#0F4C47] outline-none"
          />
        </div>

        {/* Skill Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium">Skill:</span>
          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="bg-[#F5F8F7] border border-[#DCE8E3] rounded-xl px-2.5 py-1.5 font-semibold text-slate-800 outline-none cursor-pointer"
          >
            <option value="All">All 3 Skills</option>
            <option value="DBMS">DBMS</option>
            <option value="DSA">DSA</option>
            <option value="Electrical Works">Electrical Works</option>
          </select>
        </div>

        {/* Mode Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium">Mode:</span>
          <select
            value={modeFilter}
            onChange={(e) => setModeFilter(e.target.value)}
            className="bg-[#F5F8F7] border border-[#DCE8E3] rounded-xl px-2.5 py-1.5 font-semibold text-slate-800 outline-none cursor-pointer"
          >
            <option value="All">All Modes</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((course) => {
          const enrolled = isEnrolled(course.id);
          const prog = getEnrollmentProgress(course.id);

          return (
            <div
              key={course.id}
              className="farming-card p-5 flex flex-col justify-between hover:border-[#0F4C47] transition-all"
            >
              <div>
                {/* Badges & Mode Row */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E2F1ED] text-[#0F4C47]">
                      {course.skill}
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {course.trainingMode}
                    </span>
                  </div>

                  {/* Market Relevance Tag */}
                  {course.marketRelevance === 'Needs Review' ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-700" />
                      Review Recommended
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      High Market Relevance
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                  {course.title}
                </h3>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  Provider: <strong className="text-slate-800">{course.provider}</strong>
                </div>

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>

                {/* Skills Covered Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {course.skillsCovered?.slice(0, 3).map((sk, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                    >
                      {sk}
                    </span>
                  ))}
                  {course.skillsCovered?.length > 3 && (
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded text-slate-400">
                      +{course.skillsCovered.length - 3} more
                    </span>
                  )}
                </div>

                {/* Enrolled Progress Bar */}
                {enrolled && (
                  <div className="mt-4 p-2.5 rounded-xl bg-[#E2F1ED]/50 border border-[#DCE8E3]">
                    <div className="flex items-center justify-between text-xs font-bold text-[#0F4C47] mb-1">
                      <span>Course Progress</span>
                      <span>{prog}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#0F4C47] h-full rounded-full transition-all duration-500"
                        style={{ width: `${prog}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCourseDetail(course)}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 underline"
                >
                  View Details
                </button>

                {enrolled ? (
                  <button
                    onClick={() => setActiveLearningCourse(course)}
                    className="px-4 py-2 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs hover:scale-[1.02]"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>CONTINUE LEARNING</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      enrollInCourse(course.id);
                      setActiveLearningCourse(course);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs hover:scale-[1.02]"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>ENROLL NOW</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Course Detail Modal */}
      {selectedCourseDetail && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-[#E2ECE8] flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E2F1ED] text-[#0F4C47]">
                    {selectedCourseDetail.skill} • {selectedCourseDetail.trainingMode}
                  </span>
                  <h2 className="text-xl font-black text-slate-900 mt-2">
                    {selectedCourseDetail.title}
                  </h2>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">
                    Provided by {selectedCourseDetail.provider} • Duration: {selectedCourseDetail.duration}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCourseDetail(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              {/* Description */}
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Course Overview</h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  {selectedCourseDetail.description}
                </p>
              </div>

              {/* Why Recommended & Skill Gap Addressed */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#F0F7F5] border border-[#DCE8E3]">
                <div className="text-xs font-bold text-[#0F4C47] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>Skill Gap Addressed</span>
                </div>
                <p className="text-xs text-slate-800 font-medium mt-1">
                  {selectedCourseDetail.gapAddressed}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedCourseDetail.recommendationReason}
                </p>
              </div>

              {/* Learning Outcomes */}
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Learning Outcomes
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedCourseDetail.learningOutcomes?.map((out, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prerequisites */}
              <div className="mt-4 text-xs text-slate-500">
                <strong>Prerequisites:</strong> {selectedCourseDetail.prerequisites}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedCourseDetail(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>

              {isEnrolled(selectedCourseDetail.id) ? (
                <button
                  onClick={() => {
                    const c = selectedCourseDetail;
                    setSelectedCourseDetail(null);
                    setActiveLearningCourse(c);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0F4C47] text-white text-xs font-bold hover:bg-[#0A3632] shadow-sm flex items-center gap-1.5"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>CONTINUE LEARNING</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    const c = selectedCourseDetail;
                    enrollInCourse(c.id);
                    setSelectedCourseDetail(null);
                    setActiveLearningCourse(c);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0F4C47] text-white text-xs font-bold hover:bg-[#0A3632] shadow-sm flex items-center gap-1.5"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>ENROLL & ENTER CLASSROOM</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
