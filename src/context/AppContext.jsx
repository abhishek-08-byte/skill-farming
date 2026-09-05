import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_SKILLS,
  TARGET_CAREERS,
  COURSES,
  PROVIDERS,
  DISTRICTS,
  COHORTS,
  BATCHES,
  INITIAL_DEMO_LEARNER,
  MOCK_LEARNERS_DATABASE,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';
import { SKILL_QUESTIONS, getCapabilityLevel } from '../data/questions';

const AppContext = createContext(null);

const STORAGE_KEY = 'skill_farming_state_v1';

export const AppProvider = ({ children }) => {
  // Load state from LocalStorage or initialize with defaults
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_user');
    return saved ? JSON.parse(saved) : INITIAL_DEMO_LEARNER;
  });

  const [currentRole, setCurrentRole] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_role');
    return saved || 'learner';
  });

  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_tab');
    return saved || 'dashboard';
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_courses');
    return saved ? JSON.parse(saved) : COURSES;
  });

  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_batches');
    return saved ? JSON.parse(saved) : BATCHES;
  });

  const [learnersDb, setLearnersDb] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_learners');
    return saved ? JSON.parse(saved) : MOCK_LEARNERS_DATABASE;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Save to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_learners', JSON.stringify(learnersDb));
  }, [learnersDb]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_notifs', JSON.stringify(notifications));
  }, [notifications]);

  // Switch role helper
  const handleRoleChange = (role) => {
    setCurrentRole(role);
    if (role === 'learner') {
      setActiveTab('dashboard');
    } else if (role === 'institution') {
      setActiveTab('institution');
    } else if (role === 'government') {
      setActiveTab('government');
    }
  };

  // Submit assessment result
  const submitAssessmentResult = (skillId, answers, score) => {
    const questions = SKILL_QUESTIONS[skillId] || [];
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    const { level } = getCapabilityLevel(score);

    // Calculate strong and weak areas from competencies
    const strong = [];
    const weak = [];
    questions.forEach((q, idx) => {
      const isCorrect = answers[idx] === q.correctAnswer;
      if (isCorrect) {
        if (!strong.includes(q.competency)) strong.push(q.competency);
      } else {
        if (!weak.includes(q.competency)) weak.push(q.competency);
      }
    });

    const newResult = {
      score,
      total,
      percentage,
      capabilityLevel: level,
      completedAt: new Date().toISOString().split('T')[0],
      strongAreas: strong.slice(0, 4),
      weakAreas: weak.slice(0, 4),
      skillGaps: weak.slice(0, 3)
    };

    setCurrentUser((prev) => {
      const updatedAssessments = {
        ...prev.assessmentResults,
        [skillId]: newResult
      };

      // Recalculate overall progress
      const scores = Object.values(updatedAssessments).map((a) => a.score);
      const avgScore = scores.reduce((a, b) => a + b, 0) / (scores.length || 1);
      const overallProg = Math.min(95, Math.round(avgScore * 10));

      return {
        ...prev,
        assessmentResults: updatedAssessments,
        overallProgress: overallProg
      };
    });

    // Add notification
    const skillName = INITIAL_SKILLS.find((s) => s.id === skillId)?.name || skillId.toUpperCase();
    const newNotif = {
      id: 'notif-' + Date.now(),
      title: `${skillName} Assessment Evaluated`,
      message: `Your current capability is evaluated at ${score}/10 (${level}). Skill gap analysis updated.`,
      date: 'Just now',
      read: false,
      action: 'VIEW SKILL GAP',
      type: 'assessment_done'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Update target career
  const setTargetCareer = (careerId) => {
    const career = TARGET_CAREERS.find((c) => c.id === careerId);
    if (!career) return;
    setCurrentUser((prev) => ({
      ...prev,
      career: {
        ...prev.career,
        targetCareerId: career.id,
        targetCareerTitle: career.title
      }
    }));
  };

  // Select skills known / to improve
  const setSelectedSkills = (skillIds) => {
    setCurrentUser((prev) => ({
      ...prev,
      selectedSkills: skillIds
    }));
  };

  // Enroll in course
  const enrollInCourse = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    // Check if already enrolled
    const exists = currentUser.activeCourses?.find((c) => c.courseId === courseId);
    if (exists) return;

    const newEnrollment = {
      courseId: course.id,
      title: course.title,
      category: course.tag || 'Core',
      skill: course.skill,
      categoryColor: course.tagColor || 'teal',
      progress: 5,
      latestScore: 'Pending',
      totalModules: course.modulesCount || 8,
      completedModules: 0,
      enrolledAt: new Date().toISOString().split('T')[0],
      attendance: 100,
      status: 'In Progress'
    };

    setCurrentUser((prev) => ({
      ...prev,
      activeCourses: [newEnrollment, ...(prev.activeCourses || [])]
    }));
  };

  // Update active course progress
  const updateCourseProgress = (courseId, incrementModules = 1) => {
    setCurrentUser((prev) => {
      const updated = (prev.activeCourses || []).map((ac) => {
        if (ac.courseId === courseId) {
          const nextCompleted = Math.min(ac.totalModules, ac.completedModules + incrementModules);
          const nextProg = Math.round((nextCompleted / ac.totalModules) * 100);
          return {
            ...ac,
            completedModules: nextCompleted,
            progress: nextProg,
            status: nextCompleted === ac.totalModules ? 'Completed' : 'In Progress'
          };
        }
        return ac;
      });
      return { ...prev, activeCourses: updated };
    });
  };

  // Update employment outcome follow-up
  const updateEmploymentOutcome = (data) => {
    const newTimelineItem = {
      month: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      title: `Employment Status Updated: ${data.employmentStatus}`,
      desc: data.employmentStatus === 'Employed'
        ? `Role: ${data.jobRole || 'Specialist'} at ${data.employerName || 'Organization'} (${data.wageBand}). Relevance: ${data.trainingRelevance}.`
        : `Reported status: ${data.employmentStatus}. Note: ${data.unemployedReason || 'Status update logged.'}`
    };

    setCurrentUser((prev) => ({
      ...prev,
      longitudinalOutcome: {
        ...prev.longitudinalOutcome,
        ...data,
        reportedDate: new Date().toISOString().split('T')[0],
        timeline: [newTimelineItem, ...(prev.longitudinalOutcome?.timeline || [])]
      }
    }));

    // Synchronize to learnersDb
    setLearnersDb((prev) =>
      prev.map((l) =>
        l.id === currentUser.id
          ? {
              ...l,
              employmentStatus: data.employmentStatus,
              wageBand: data.wageBand || l.wageBand,
              trainingRelevance: data.trainingRelevance || l.trainingRelevance,
              unemployedReason: data.unemployedReason || null
            }
          : l
      )
    );
  };

  // Create Batch (for Institution portal)
  const createNewBatch = (batchData) => {
    const newBatch = {
      id: 'batch-' + Date.now(),
      name: batchData.name,
      courseId: batchData.courseId,
      courseName: courses.find((c) => c.id === batchData.courseId)?.title || 'Course',
      providerId: 'prov-apex',
      providerName: 'Apex Institute of Technology',
      cohortId: batchData.cohortId || 'cohort-2026-04',
      startDate: batchData.startDate || '2026-05-01',
      endDate: batchData.endDate || '2026-07-01',
      status: 'In Progress',
      totalStudents: parseInt(batchData.totalStudents, 10) || 25,
      completedStudents: 0,
      avgAttendance: 85,
      totalSessions: parseInt(batchData.totalSessions, 10) || 30,
      completedSessions: 5
    };
    setBatches((prev) => [newBatch, ...prev]);
  };

  // Mark student attendance
  const updateBatchAttendance = (batchId, deltaAttendance) => {
    setBatches((prev) =>
      prev.map((b) =>
        b.id === batchId
          ? {
              ...b,
              avgAttendance: Math.min(100, Math.max(0, b.avgAttendance + deltaAttendance)),
              completedSessions: Math.min(b.totalSessions, b.completedSessions + 1)
            }
          : b
      )
    );
  };

  // Reset to default demo data
  const resetDemoData = () => {
    localStorage.clear();
    setCurrentUser(INITIAL_DEMO_LEARNER);
    setCurrentRole('learner');
    setActiveTab('dashboard');
    setCourses(COURSES);
    setBatches(BATCHES);
    setLearnersDb(MOCK_LEARNERS_DATABASE);
    setNotifications(INITIAL_NOTIFICATIONS);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        currentRole,
        setCurrentRole: handleRoleChange,
        activeTab,
        setActiveTab,
        skills: INITIAL_SKILLS,
        careers: TARGET_CAREERS,
        courses,
        providers: PROVIDERS,
        districts: DISTRICTS,
        cohorts: COHORTS,
        batches,
        learnersDb,
        notifications,
        submitAssessmentResult,
        setTargetCareer,
        setSelectedSkills,
        enrollInCourse,
        updateCourseProgress,
        updateEmploymentOutcome,
        createNewBatch,
        updateBatchAttendance,
        resetDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
