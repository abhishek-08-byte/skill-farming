import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SKILL_QUESTIONS, getCapabilityLevel } from '../../data/questions';
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Award,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShieldAlert,
  Database,
  Binary,
  Zap,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AssessmentModal = ({ isOpen, onClose }) => {
  const {
    currentUser,
    submitAssessmentResult,
    setActiveTab
  } = useApp();

  const selectedSkills = currentUser.selectedSkills || ['dbms', 'dsa', 'electrical'];
  const [activeSkillId, setActiveSkillId] = useState(selectedSkills[0] || 'dbms');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  // Store answers per skill: { [skillId]: { [questionIdx]: selectedOptionIndex } }
  const [userAnswers, setUserAnswers] = useState({
    dbms: {},
    dsa: {},
    electrical: {}
  });

  // Track completed submissions: { [skillId]: resultObject }
  const [submittedResults, setSubmittedResults] = useState(null);

  if (!isOpen) return null;

  const currentQuestions = SKILL_QUESTIONS[activeSkillId] || [];
  const currentQuestion = currentQuestions[currentQuestionIdx];
  const totalQuestions = currentQuestions.length;

  const handleSelectOption = (optIdx) => {
    setUserAnswers((prev) => ({
      ...prev,
      [activeSkillId]: {
        ...prev[activeSkillId],
        [currentQuestionIdx]: optIdx
      }
    }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  const handleFinishSkill = () => {
    const answers = userAnswers[activeSkillId] || {};
    let score = 0;
    currentQuestions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        score += 1;
      }
    });

    submitAssessmentResult(activeSkillId, answers, score);

    const { level } = getCapabilityLevel(score);
    const resultObj = {
      skillId: activeSkillId,
      score,
      total: totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      capabilityLevel: level,
      completedAt: new Date().toISOString().split('T')[0]
    };

    setSubmittedResults(resultObj);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const skillAnswerCount = (sId) => {
    return Object.keys(userAnswers[sId] || {}).length;
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-[#E2ECE8] flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#F8FAF9]">
          <div>
            <div className="text-[11px] uppercase font-bold text-teal-700 tracking-wider">
              10-Question Data-Driven Assessment
            </div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Capability Evaluation Engine
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Skill Selector Tabs with Individual Progress Bars */}
        <div className="px-6 pt-3 pb-2 bg-white border-b border-slate-100">
          <div className="text-xs font-semibold text-slate-500 mb-2">
            Selected Skills ({selectedSkills.length} Total • 10 Questions Per Skill):
          </div>
          <div className="grid grid-cols-3 gap-2">
            {selectedSkills.map((sId) => {
              const count = skillAnswerCount(sId);
              const isActive = activeSkillId === sId;
              const skillLabel = sId === 'dbms' ? 'DBMS' : sId === 'dsa' ? 'DSA' : 'Electrical';

              return (
                <button
                  key={sId}
                  onClick={() => {
                    setActiveSkillId(sId);
                    setCurrentQuestionIdx(0);
                    setSubmittedResults(null);
                  }}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isActive
                      ? 'border-[#0F4C47] bg-[#E2F1ED]/50 ring-2 ring-[#0F4C47]/20 shadow-xs'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className={isActive ? 'text-[#0F4C47]' : 'text-slate-800'}>
                      {skillLabel}
                    </span>
                    <span className="text-[10px] text-slate-500">{count}/10</span>
                  </div>
                  {/* Progress bar per skill */}
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isActive ? 'bg-[#0F4C47]' : 'bg-slate-400'
                      }`}
                      style={{ width: `${(count / 10) * 100}%` }}
                    ></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {submittedResults ? (
            /* SCORECARD / CAPABILITY RESULT VIEW */
            <div className="space-y-6 text-center py-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-teal-100 text-[#0F4C47] flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
                  Assessment Completed
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {activeSkillId.toUpperCase()} Capability Score
                </h3>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-4xl font-extrabold text-[#0F4C47]">
                    {submittedResults.score}
                  </span>
                  <span className="text-xl text-slate-400 font-semibold">/ 10</span>
                  <span className="ml-2 text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
                    {submittedResults.percentage}%
                  </span>
                </div>
              </div>

              {/* Capability Level Badge */}
              <div className="max-w-sm mx-auto p-3.5 rounded-2xl bg-[#F0F7F5] border border-[#DCE8E3] text-center">
                <div className="text-[11px] uppercase font-bold text-slate-500">
                  Current Capability Classification
                </div>
                <div className="text-lg font-black text-[#0F4C47] mt-0.5">
                  {submittedResults.capabilityLevel}
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {submittedResults.capabilityLevel === 'FOUNDATION NEEDED' && 'Foundational training recommended to build core conceptual competencies.'}
                  {submittedResults.capabilityLevel === 'DEVELOPING' && 'Solid baseline capability. Ready for applied problem solving.'}
                  {submittedResults.capabilityLevel === 'PROFICIENT' && 'Strong conceptual and applied reasoning demonstrated.'}
                  {submittedResults.capabilityLevel === 'ADVANCED' && 'Excellent diagnostic and complex scenario problem solving.'}
                </div>
              </div>

              {/* Data Trust Notice - Mandated by User Prompt */}
              <div className="max-w-md mx-auto p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-left flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-bold">Assessment-Based Capability:</span> This evaluation reflects current capability demonstrated on 10 standardized progressive questions. It is not an official government certificate or permanent verification.
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setSubmittedResults(null);
                    setCurrentQuestionIdx(0);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Assessment</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    setActiveTab('analytics');
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#0F4C47] text-white hover:bg-[#0A3632] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>View Target Career Gap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : currentQuestion ? (
            /* QUESTION INTERFACE */
            <div className="space-y-5">
              {/* Question Metadata Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800">
                    Question {currentQuestion.questionNumber} of {totalQuestions}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Competency: <strong className="text-slate-700">{currentQuestion.competency}</strong>
                  </span>
                </div>

                {/* Progressive Difficulty Pill */}
                <span
                  className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    currentQuestion.difficulty === 'Easy'
                      ? 'bg-emerald-100 text-emerald-800'
                      : currentQuestion.difficulty === 'Moderate'
                      ? 'bg-sky-100 text-sky-800'
                      : 'bg-rose-100 text-rose-800 animate-pulse'
                  }`}
                >
                  {currentQuestion.difficulty}
                </span>
              </div>

              {/* Question Prompt */}
              <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-[#E5EFEA]">
                <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                  {currentQuestion.question}
                </p>
              </div>

              {/* 4 Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[activeSkillId]?.[currentQuestionIdx] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-[#0F4C47] bg-[#E2F1ED] text-[#0F4C47] font-semibold shadow-xs ring-2 ring-[#0F4C47]/20'
                          : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold ${
                          isSelected
                            ? 'border-[#0F4C47] bg-[#0F4C47] text-white'
                            : 'border-slate-300 bg-white text-slate-500'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </div>
                      <span className="leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-500">No questions available.</div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!submittedResults && (
          <div className="px-6 py-4 bg-[#F8FAF9] border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIdx === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>PREVIOUS</span>
            </button>

            <div className="text-xs text-slate-500 font-medium">
              {skillAnswerCount(activeSkillId)} of {totalQuestions} Answered
            </div>

            {currentQuestionIdx < totalQuestions - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinishSkill}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-sm"
              >
                <CheckCircle className="w-4 h-4" />
                <span>SUBMIT ASSESSMENT</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
