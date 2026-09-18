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
  INITIAL_NOTIFICATIONS,
  INITIAL_EMPLOYER_PROFILE,
  INITIAL_TRAINING_PROVIDER_PROFILE,
  INITIAL_GOVERNMENT_PROFILE,
  BLANK_PROFILES,
  SKILLS_CATALOG,
  TARGET_ROLES_CATALOG,
  calculateProfileCompletion,
  INITIAL_JOBS,
  INITIAL_JOB_APPLICATIONS,
  INITIAL_CHAT_MESSAGES,
  ROLE_SKILL_COURSE_MAPPING,
  calculateJobMatch
} from '../data/mockData';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../data/translations';
import { SKILL_QUESTIONS, getCapabilityLevel } from '../data/questions';
import { createDefaultRecoverySession } from '../data/recoveryData';
import confetti from 'canvas-confetti';

const AppContext = createContext(null);

const STORAGE_KEY = 'skill_farming_state_v1';

export const AppProvider = ({ children }) => {
  // Multi-Language Localization System ('en' | 'mr' | 'bn')
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('skill_farming_language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('skill_farming_language', currentLanguage);
  }, [currentLanguage]);

  const t = (key, fallback = '') => {
    return TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS['en']?.[key] || fallback || key;
  };

  // Load state from LocalStorage or initialize with defaults
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_user');
    return saved ? JSON.parse(saved) : INITIAL_DEMO_LEARNER;
  });

  // Dedicated Employer / Recruiter profile
  const [recruiterProfile, setRecruiterProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_recruiter_profile');
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYER_PROFILE;
  });

  // Dedicated Institution / Academic Provider profile
  const [institutionProfile, setInstitutionProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_institution_profile');
    return saved ? JSON.parse(saved) : INITIAL_TRAINING_PROVIDER_PROFILE;
  });

  // Dedicated Government profile (Read-only analytics & statistics)
  const [governmentProfile, setGovernmentProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_gov_profile');
    return saved ? JSON.parse(saved) : INITIAL_GOVERNMENT_PROFILE;
  });

  // Job Marketplace & Candidate Application state
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_applications');
    return saved ? JSON.parse(saved) : INITIAL_JOB_APPLICATIONS;
  });

  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_chat_messages');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
  });

  const [isProfileWizardOpen, setIsProfileWizardOpen] = useState(false);
  const [profileWizardRole, setProfileWizardRole] = useState('learner');
  const [profileWizardInitialStep, setProfileWizardInitialStep] = useState(1);

  const [currentRole, setCurrentRole] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_role');
    return saved || 'learner';
  });

  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_tab');
    return saved || 'landing';
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

  const [inactivityThresholdDays, setInactivityThresholdDays] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_inactivity_threshold');
    return saved ? parseInt(saved, 10) : 14;
  });

  const [recoverySession, setRecoverySession] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_recovery_session');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // ignore
      }
    }
    return createDefaultRecoverySession(currentUser?.id || 'learner-talha');
  });

  // Save to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_recruiter_profile', JSON.stringify(recruiterProfile));
  }, [recruiterProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_institution_profile', JSON.stringify(institutionProfile));
  }, [institutionProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_gov_profile', JSON.stringify(governmentProfile));
  }, [governmentProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_chat_messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_inactivity_threshold', inactivityThresholdDays.toString());
  }, [inactivityThresholdDays]);

  useEffect(() => {
    if (recoverySession) {
      localStorage.setItem(STORAGE_KEY + '_recovery_session', JSON.stringify(recoverySession));
    }
  }, [recoverySession]);

  // Central Learner Profiles Master Registry (Synced across Institution & Government/Private Portals)
  const INITIAL_LEARNER_REGISTRY = [
    {
      id: 'REG-2026-001',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@skillfarming.org',
      phone: '+91 98765 43210',
      country: 'India',
      state: 'Karnataka',
      city: 'Bengaluru',
      education: 'B.Tech in Computer Science',
      institution: 'Government College of Engineering, Bengaluru',
      languages: 'English, Hindi, Kannada',
      targetIndustry: 'IT & Software Engineering',
      targetRole: 'Full Stack Engineer',
      skills: 'Database Systems & SQL, Python APIs',
      completionRate: 100,
      timestamp: '2026-09-08 14:32:10',
      privateInterviewStatus: 'Scheduled with Tata Consultancy Services (Sep 18, 2026)',
      privateExamStatus: 'Exam Card Issued #KA-NITA-9412'
    },
    {
      id: 'REG-2026-002',
      name: 'Talha Jubayer',
      email: 'talhajuba@gmail.com',
      phone: '+91 98451 12345',
      country: 'India',
      state: 'Maharashtra',
      city: 'Pune',
      education: 'B.E. in Information Technology',
      institution: 'Government College of Engineering, Pune',
      languages: 'English, Hindi, Marathi',
      targetIndustry: 'IT & Software Engineering',
      targetRole: 'Backend Developer',
      skills: 'Database Systems & SQL, FastAPI, Redis',
      completionRate: 100,
      timestamp: '2026-09-07 11:15:22',
      privateInterviewStatus: 'Shortlisted by Apex Tech Corp',
      privateExamStatus: 'Exam Card Issued #MH-NITA-8109'
    },
    {
      id: 'REG-2026-003',
      name: 'Priya Sharma',
      email: 'priya.s@gmail.com',
      phone: '+91 97412 88901',
      country: 'India',
      state: 'Karnataka',
      city: 'Mysuru',
      education: 'BCA in Cloud Computing',
      institution: 'National Institute of Engineering, Mysuru',
      languages: 'English, Kannada, Hindi',
      targetIndustry: 'Cloud Infrastructure & DevOps',
      targetRole: 'Cloud DevOps Associate',
      skills: 'Docker, Linux, AWS Cloud Architecture',
      completionRate: 100,
      timestamp: '2026-09-06 09:40:55',
      privateInterviewStatus: 'Interview Pending Employer Review',
      privateExamStatus: 'Awaiting Examination Hall Ticket'
    },
    {
      id: 'REG-2026-004',
      name: 'Vikram Patel',
      email: 'vikram.p@gmail.com',
      phone: '+91 98234 56789',
      country: 'India',
      state: 'Karnataka',
      city: 'Hassan',
      education: 'Diploma in Electrical Engineering',
      institution: 'Malnad Technical College',
      languages: 'English, Kannada',
      targetIndustry: 'Renewable Energy & EV Tech',
      targetRole: 'Industrial Automation Specialist',
      skills: 'PLC Programming, SCADA, Circuit Design',
      completionRate: 100,
      timestamp: '2026-09-05 16:20:00',
      privateInterviewStatus: 'Scheduled with GreenMobility EV Labs (Sep 21, 2026)',
      privateExamStatus: 'Exam Card Issued #KA-EV-3310'
    }
  ];

  const [learnerProfilesRegistry, setLearnerProfilesRegistry] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_registry');
    return saved ? JSON.parse(saved) : INITIAL_LEARNER_REGISTRY;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_registry', JSON.stringify(learnerProfilesRegistry));
  }, [learnerProfilesRegistry]);

  const saveLearnerProfileToRegistry = (profileData) => {
    const newEntry = {
      id: `REG-2026-00${learnerProfilesRegistry.length + 1}`,
      name: profileData.name || 'Anonymous Learner',
      email: profileData.email || 'learner@skillfarming.org',
      phone: profileData.phone || '+91 98765 43210',
      country: profileData.country || profileData.educations?.[0]?.country || 'India',
      state: profileData.state || profileData.educations?.[0]?.state || 'Karnataka',
      city: profileData.city || profileData.educations?.[0]?.city || 'Bengaluru',
      education: profileData.educations?.[0]?.degree || profileData.education?.degree || 'B.Tech / Professional Degree',
      institution: profileData.educations?.[0]?.institution || profileData.education?.institution || 'Government Technical Institute',
      languages: profileData.language || (Array.isArray(profileData.preferredLanguages) ? profileData.preferredLanguages.join(', ') : 'English, Hindi'),
      targetIndustry: profileData.careerProfile?.targetIndustry || profileData.targetIndustry || 'IT & Software Engineering',
      targetRole: profileData.careerProfile?.targetRole || profileData.careerGoal || 'Specialist',
      skills: 'Database Systems & SQL, Python Backend, Cloud DevOps',
      completionRate: 100,
      timestamp: new Date().toLocaleString(),
      privateInterviewStatus: 'Ready for Corporate Interview',
      privateExamStatus: 'Eligible for Private Examination'
    };

    setLearnerProfilesRegistry(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const exportRegistryToCSV = (customData = null, filename = 'Candidate_Profiles_Master_Registry.csv') => {
    const dataToExport = customData || learnerProfilesRegistry;
    const headers = [
      'Candidate ID',
      'Full Name',
      'Email Address',
      'Phone Number',
      'Country',
      'State',
      'City',
      'Education Degree',
      'Institution',
      'Languages',
      'Target Industry',
      'Target Role',
      'Verified Skills',
      'Profile Completion %',
      'Registry Timestamp',
      'Private Interview Status',
      'Private Exam Status'
    ];

    const rows = dataToExport.map(p => [
      `"${p.id || ''}"`,
      `"${p.name || ''}"`,
      `"${p.email || ''}"`,
      `"${p.phone || ''}"`,
      `"${p.country || ''}"`,
      `"${p.state || ''}"`,
      `"${p.city || ''}"`,
      `"${p.education || ''}"`,
      `"${p.institution || ''}"`,
      `"${p.languages || ''}"`,
      `"${p.targetIndustry || ''}"`,
      `"${p.targetRole || ''}"`,
      `"${p.skills || ''}"`,
      `"${p.completionRate || 100}%"`,
      `"${p.timestamp || ''}"`,
      `"${p.privateInterviewStatus || 'Awaiting Review'}"`,
      `"${p.privateExamStatus || 'Awaiting Card'}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Switch role helper
  const handleRoleChange = (role) => {
    setCurrentRole(role);
    if (role === 'learner') {
      setActiveTab('dashboard');
    } else if (role === 'institution') {
      setActiveTab('institution');
    } else if (role === 'employer') {
      setActiveTab('employer');
    } else if (role === 'government' || role === 'private') {
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

  // Enroll in course (Always 100% Free with persistent Enrollment ID)
  const enrollInCourse = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    // Check if already enrolled
    const exists = currentUser.activeCourses?.find((c) => c.courseId === courseId);
    if (exists) return;

    const enrollmentId = 'ENR-2026-' + Math.floor(10000 + Math.random() * 90000);

    const newEnrollment = {
      courseId: course.id,
      enrollmentId,
      isFree: true,
      fee: 0,
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

    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.65 } });
    } catch {
      // ignore
    }
  };

  const [activeCoursePlayerId, setActiveCoursePlayerId] = useState(null);

  const openCoursePlayer = (courseId) => {
    setActiveCoursePlayerId(courseId);
    setActiveTab('course');
  };

  // Safe get enrollment progress helper
  const getEnrollmentProgress = (courseId) => {
    return currentUser?.activeCourses?.find((ac) => ac.courseId === courseId)?.progress || 0;
  };

  // Update active course progress
  const updateCourseProgress = (courseId, incrementOrPercent = 1) => {
    setCurrentUser((prev) => {
      const updated = (prev.activeCourses || []).map((ac) => {
        if (ac.courseId === courseId) {
          let nextProg;
          let nextCompleted;
          if (incrementOrPercent > 1) {
            nextProg = Math.min(100, Math.max(0, incrementOrPercent));
            nextCompleted = Math.round((nextProg / 100) * ac.totalModules);
          } else {
            nextCompleted = Math.min(ac.totalModules, ac.completedModules + incrementOrPercent);
            nextProg = Math.round((nextCompleted / ac.totalModules) * 100);
          }
          return {
            ...ac,
            completedModules: nextCompleted,
            progress: nextProg,
            status: nextProg >= 100 ? 'Completed' : 'In Progress'
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

  // Profile wizard handlers
  const openProfileWizard = (role = currentRole, initialStep = 1) => {
    setProfileWizardRole(role);
    setProfileWizardInitialStep(initialStep);
    setIsProfileWizardOpen(true);
  };

  const closeProfileWizard = () => {
    setIsProfileWizardOpen(false);
  };

  const updateUserProfile = (updatedFields) => {
    setCurrentUser((prev) => {
      const next = { ...prev, ...updatedFields };
      if (updatedFields.careerProfile?.targetRole) {
        const targetTitle = updatedFields.careerProfile.targetRole;
        const matchedCareer = TARGET_CAREERS.find(
          (c) => c.title.toLowerCase() === targetTitle.toLowerCase() || c.id === targetTitle
        );
        next.career = {
          ...next.career,
          targetCareerId: matchedCareer ? matchedCareer.id : prev.career?.targetCareerId || 'backend-dev',
          targetCareerTitle: targetTitle
        };
      }
      if (updatedFields.userSkills && updatedFields.userSkills.length > 0) {
        const skillNames = updatedFields.userSkills.map((s) => (s.name || s.id || '').toLowerCase());
        const matchedSkills = INITIAL_SKILLS.filter((sk) =>
          skillNames.some((sn) => sn.includes(sk.id) || sk.name.toLowerCase().includes(sn))
        ).map((sk) => sk.id);
        if (matchedSkills.length > 0) {
          next.selectedSkills = matchedSkills;
        }
      }
      return next;
    });
  };

  const updateInstitutionProfile = (updatedFields) => {
    setInstitutionProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  const updateEmployerProfile = (updatedFields) => {
    setRecruiterProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  const updateGovernmentProfile = (updatedFields) => {
    setGovernmentProfile((prev) => ({ ...prev, ...updatedFields }));
  };

  const switchInstitutionSubType = (subType) => {
    if (subType === 'training_provider') {
      setInstitutionProfile(INITIAL_TRAINING_PROVIDER_PROFILE);
    } else {
      setInstitutionProfile(INITIAL_EMPLOYER_PROFILE);
    }
  };

  const simulateBlankProfile = (role = currentRole) => {
    if (role === 'learner') {
      setCurrentUser(BLANK_PROFILES.learner);
    } else if (role === 'institution') {
      const sub = institutionProfile.subType || 'employer';
      setInstitutionProfile(
        sub === 'training_provider'
          ? BLANK_PROFILES.institution_training_provider
          : BLANK_PROFILES.institution_employer
      );
    } else if (role === 'employer') {
      setRecruiterProfile(BLANK_PROFILES.institution_employer);
    } else if (role === 'government') {
      setGovernmentProfile(BLANK_PROFILES.government);
    }
  };

  const simulateFilledProfile = (role = currentRole) => {
    if (role === 'learner') {
      setCurrentUser(INITIAL_DEMO_LEARNER);
    } else if (role === 'institution') {
      const sub = institutionProfile.subType || 'employer';
      setInstitutionProfile(
        sub === 'training_provider'
          ? INITIAL_TRAINING_PROVIDER_PROFILE
          : INITIAL_EMPLOYER_PROFILE
      );
    } else if (role === 'employer') {
      setRecruiterProfile(INITIAL_EMPLOYER_PROFILE);
    } else if (role === 'government') {
      setGovernmentProfile(INITIAL_GOVERNMENT_PROFILE);
    }
  };

  const learnerCompletion = calculateProfileCompletion('learner', currentUser);
  const institutionCompletion = calculateProfileCompletion('institution', institutionProfile);
  const employerCompletion = calculateProfileCompletion('employer', recruiterProfile);
  const governmentCompletion = calculateProfileCompletion('government', governmentProfile);

  const currentProfileCompletion =
    currentRole === 'learner'
      ? learnerCompletion
      : currentRole === 'institution'
      ? institutionCompletion
      : currentRole === 'employer'
      ? employerCompletion
      : governmentCompletion;

  // Login User with specific role and redirect to role's dashboard
  const loginUser = ({ role = 'learner', email, name }) => {
    setCurrentRole(role);
    if (role === 'learner') {
      if (email || name) {
        setCurrentUser(prev => ({
          ...prev,
          name: name || prev.name,
          email: email || prev.email
        }));
      }
      setActiveTab('dashboard');
    } else if (role === 'institution') {
      if (email || name) {
        setInstitutionProfile(prev => ({
          ...prev,
          orgName: name || prev.orgName,
          contactEmail: email || prev.contactEmail
        }));
      }
      setActiveTab('institution');
    } else if (role === 'employer') {
      if (email || name) {
        setRecruiterProfile(prev => ({
          ...prev,
          name: name || prev.name,
          contactEmail: email || prev.contactEmail
        }));
      }
      setActiveTab('employer');
    } else if (role === 'government') {
      if (email || name) {
        setGovernmentProfile(prev => ({
          ...prev,
          deptName: name || prev.deptName,
          officialEmail: email || prev.officialEmail
        }));
      }
      setActiveTab('government');
    }
  };

  // Sign Up / Register New Account with specific role
  const signupUser = ({
    role = 'learner',
    fullName,
    email,
    avatar,
    orgName,
    department,
    country,
    stateName,
    cityName,
    careerGoal,
    targetRole,
    customTargetRole,
    targetIndustry,
    preferredLanguages
  }) => {
    setCurrentRole(role);
    if (role === 'learner') {
      const chosenRole = customTargetRole?.trim() || targetRole?.trim() || careerGoal?.trim() || 'Software Developer';
      const newUser = {
        id: `learner_${Date.now()}`,
        name: fullName || 'New Learner',
        email: email || 'learner@skillfarming.org',
        avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        isNewUser: true, // Marked as new enrollee: displays fresh dashboard with profile completion and available courses
        headline: `Aspiring ${chosenRole}`,
        country: country || 'India',
        state: stateName || 'Karnataka',
        city: cityName || 'Bengaluru',
        location: cityName && stateName ? `${cityName}, ${stateName}` : (cityName || stateName || 'India'),
        studyLocation: {
          institution: '',
          state: stateName || 'Karnataka',
          district: '',
          city: cityName || 'Bengaluru'
        },
        education: '',
        educations: [],
        targetRole: chosenRole,
        customTargetRole: customTargetRole || '',
        careerProfile: {
          targetRole: chosenRole,
          customTargetRole: customTargetRole || '',
          targetIndustry: targetIndustry || 'Technology & Engineering',
          salaryExpectation: '₹4–6 LPA',
          targetTimeline: 'Within 6 months',
          isCustomRole: Boolean(customTargetRole)
        },
        targetWage: 500000,
        targetWageFormatted: '₹5.0 LPA',
        preferredLanguages: preferredLanguages || ['English', 'Hindi'],
        language: (preferredLanguages || ['English', 'Hindi']).join(', '),
        currentSkills: [],
        userSkills: [],
        skillsBreakdown: { strengths: [], areasToImprove: [] },
        activeCourses: [], // 0 courses initially for new learner
        completedCourses: [],
        overallProgress: 0,
        attendanceRate: 0,
        attendanceSummary: {
          overallPercentage: 0,
          presentSessions: 0,
          totalSessions: 0,
          absentSessions: 0
        },
        currentRank: 'New Enrollee',
        leaderboardStatus: 'ACTIVE', // Clean status - not inactive/recovery
        employmentStatus: 'Looking to Upskill',
        retentionStatus: 'Active',
        savedJobIds: [],
        digiLockerLinked: false
      };
      setCurrentUser(newUser);
      setActiveTab('dashboard');
    } else if (role === 'institution') {
      setInstitutionProfile(prev => ({
        ...prev,
        orgName: orgName || fullName || 'New Institution Partner',
        contactPerson: fullName || prev.contactPerson,
        contactEmail: email || prev.contactEmail,
        campusState: stateName || prev.campusState
      }));
      setActiveTab('institution');
    } else if (role === 'employer') {
      setRecruiterProfile(prev => ({
        ...prev,
        name: orgName || fullName || 'Enterprise Partner',
        contactName: fullName || prev.contactName,
        contactEmail: email || prev.contactEmail,
        hqState: stateName || prev.hqState
      }));
      setActiveTab('employer');
    } else if (role === 'government') {
      setGovernmentProfile(prev => ({
        ...prev,
        deptName: department || orgName || 'State Skill Development Agency',
        nodalOfficerName: fullName || prev.nodalOfficerName,
        officialEmail: email || prev.officialEmail,
        jurisdictionRegion: stateName || prev.jurisdictionRegion
      }));
      setActiveTab('government');
    }
  };

  // Logout / Return to Landing Page
  const logoutUser = () => {
    setActiveTab('landing');
  };

  // Update learner profile
  const updateLearnerProfile = (updates) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Demo helpers to easily test fresh vs active senior learner
  const loadDemoLearner = () => {
    setCurrentUser(INITIAL_DEMO_LEARNER);
    setCurrentRole('learner');
    setActiveTab('dashboard');
  };

  const loadFreshLearner = () => {
    signupUser({
      role: 'learner',
      fullName: 'Aarav Sharma',
      email: 'aarav.sharma@skillfarming.org',
      country: 'India',
      stateName: 'Karnataka',
      cityName: 'Bengaluru',
      targetRole: 'Software Developer'
    });
  };

  // Update recruiter profile
  const updateRecruiterProfile = (updates) => {
    setRecruiterProfile(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Toggle saving a job for learner
  const toggleSaveJob = (jobId) => {
    setCurrentUser(prev => {
      const currentSaved = prev.savedJobIds || [];
      const alreadySaved = currentSaved.includes(jobId);
      const newSaved = alreadySaved
        ? currentSaved.filter(id => id !== jobId)
        : [...currentSaved, jobId];
      return {
        ...prev,
        savedJobIds: newSaved
      };
    });
  };

  // Apply to a job with verified profile snapshot
  const applyToJob = (jobId, candidateNote = '') => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return null;

    const existing = applications.find(a => a.jobId === jobId && a.candidateId === currentUser.id);
    if (existing) return existing;

    const matchData = calculateJobMatch(job, currentUser);

    const newApp = {
      id: 'app-' + Date.now(),
      jobId,
      candidateId: currentUser.id,
      candidateName: currentUser.name,
      candidateEmail: currentUser.email,
      candidatePhone: currentUser.phone,
      candidateLocation: currentUser.location || currentUser.city,
      studyLocation: currentUser.studyLocation ? `${currentUser.studyLocation.institution}, ${currentUser.studyLocation.district}` : 'Government College / Centre',
      targetRole: currentUser.targetRole || 'Full Stack Web Developer',
      targetWage: currentUser.targetWageFormatted || '₹6.5 LPA',
      jobTitle: job.title,
      company: job.company,
      appliedDate: new Date().toISOString().split('T')[0],
      stage: 'Under Review',
      examScore: null,
      examStatus: job.corporateExamRequired ? 'Test Invitation Pending' : 'Not Applicable',
      interviewDate: null,
      interviewLink: null,
      recruiterNotes: candidateNote || 'Direct application via Skill Farming verified talent pool.',
      matchScore: matchData.score
    };

    setApplications(prev => [newApp, ...prev]);

    // Send confirmation notification
    const newNotif = {
      id: 'notif-' + Date.now(),
      title: `Application Submitted: ${job.title}`,
      message: `Your application to ${job.company} has been received and is currently Under Review.`,
      date: 'Just now',
      read: false,
      action: 'VIEW APPLICATIONS',
      type: 'job_application'
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Increment applied count
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, appliedCount: (j.appliedCount || 0) + 1 } : j));

    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    return newApp;
  };

  // Recruiter advances application stage
  const updateApplicationStage = (appId, newStage, details = {}) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const updated = {
          ...app,
          stage: newStage,
          ...details
        };
        if (newStage === 'Selected') {
          try {
            confetti({ particleCount: 110, spread: 80, origin: { y: 0.5 } });
          } catch {
            // ignore
          }
        }
        return updated;
      }
      return app;
    }));

    const app = applications.find(a => a.id === appId);
    if (app) {
      const stageNotif = {
        id: 'notif-' + Date.now(),
        title: `Application Status: ${app.jobTitle}`,
        message: `Your application status with ${app.company} is now: ${newStage}. Check your pipeline tracker.`,
        date: 'Just now',
        read: false,
        action: 'VIEW APPLICATIONS',
        type: 'job_stage_update'
      };
      setNotifications(prev => [stageNotif, ...prev]);
    }
  };

  // Employer posts a new job
  const postNewJob = (jobData) => {
    const newJob = {
      id: 'job-pvt-' + Date.now(),
      type: 'private',
      company: recruiterProfile.name || 'Enterprise Recruiter',
      logo: recruiterProfile.logo || 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&auto=format&fit=crop&q=80',
      postedAt: new Date().toISOString().split('T')[0],
      appliedCount: 0,
      openings: 3,
      ...jobData
    };
    setJobs(prev => [newJob, ...prev]);
    return newJob;
  };

  // 1-to-1 candidate chat message
  const sendChatMessage = ({ text, recipientId, recipientName, jobId, conversationId }) => {
    const isEmployer = currentRole === 'employer';
    const newMsg = {
      id: 'msg-' + Date.now(),
      conversationId: conversationId || `conv-${currentUser.id}-${recipientId}`,
      jobId: jobId || null,
      senderId: isEmployer ? recruiterProfile.id || 'recruiter-anand' : currentUser.id,
      senderName: isEmployer ? recruiterProfile.contactName || recruiterProfile.name : currentUser.name,
      senderRole: currentRole,
      avatar: isEmployer ? recruiterProfile.logo : currentUser.avatar,
      recipientId,
      recipientName,
      text,
      timestamp: new Date().toISOString(),
      read: false
    };
    setChatMessages(prev => [...prev, newMsg]);
    return newMsg;
  };

  // DigiLocker integration
  const connectDigiLocker = (aadhaarNumber = '987654321098', selectedDocs = []) => {
    const docId = 'DL-2026-KA-' + aadhaarNumber.slice(-4);
    setCurrentUser(prev => ({
      ...prev,
      digiLockerLinked: true,
      digiLockerId: docId,
      verificationStatus: 'VERIFIED',
      credentials: [
        ...(prev.credentials || []),
        {
          id: 'cred-dl-' + Date.now(),
          title: 'National Skill Qualification Certificate (NSQF Level 6)',
          issuer: 'Ministry of Skill Development & Entrepreneurship (MSDE) via DigiLocker',
          issueDate: new Date().toISOString().split('T')[0],
          url: `https://digilocker.gov.in/verify/${docId}`
        }
      ]
    }));
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.55 } });
    } catch {
      // ignore
    }
  };

  // Helper to record meaningful activity (without triggering on every trivial click)
  const recordLearningActivity = (activityType = 'general') => {
    const nowIso = new Date().toISOString();
    setCurrentUser(prev => ({
      ...prev,
      lastActiveAt: nowIso
    }));
  };

  // Submit a recovery challenge
  const submitRecoveryAssignment = (challengeId, solutionCode, testResults) => {
    const allPassed = testResults && testResults.length > 0 && testResults.every(t => t.passed);
    const score = allPassed ? 100 : Math.round((testResults?.filter(t => t.passed).length / (testResults?.length || 1)) * 100);

    setRecoverySession(prev => {
      if (!prev) return prev;
      const updatedAssignments = prev.assignments.map(a => {
        if (a.id === challengeId) {
          return {
            ...a,
            status: allPassed ? 'COMPLETED' : 'IN_PROGRESS',
            submittedCode: solutionCode,
            score,
            attempts: (a.attempts || 0) + 1,
            submittedAt: new Date().toISOString(),
            feedback: allPassed
              ? 'All deterministic test cases passed successfully!'
              : 'Some test cases failed. Review test output and requirements.',
            testResults
          };
        }
        return a;
      });

      const completedCount = updatedAssignments.filter(a => a.status === 'COMPLETED').length;
      const progress = Math.round((completedCount / updatedAssignments.length) * 100);
      const isAllDone = completedCount === updatedAssignments.length;

      const nextSession = {
        ...prev,
        assignments: updatedAssignments,
        completedCount,
        progress,
        status: isAllDone ? 'RECOVERED' : prev.status,
        completedAt: isAllDone ? new Date().toISOString() : null
      };

      if (isAllDone) {
        setTimeout(() => {
          completeRecoverySession();
        }, 150);
      }

      return nextSession;
    });

    recordLearningActivity('recovery_assignment_submit');
  };

  // Mark recovery complete and reinstate leaderboard participation
  const completeRecoverySession = () => {
    setCurrentUser(prev => {
      const newPoints = (prev.leaderboardPoints || 850) + 150;
      return {
        ...prev,
        leaderboardStatus: 'ACTIVE',
        leaderboardPoints: newPoints,
        currentRank: 'Top 3%'
      };
    });

    setRecoverySession(prev => prev ? {
      ...prev,
      status: 'RECOVERED',
      progress: 100,
      completedAt: new Date().toISOString()
    } : null);

    // Synchronize to learnersDb
    setLearnersDb(prev => prev.map(l => l.id === currentUser.id ? {
      ...l,
      leaderboardStatus: 'ACTIVE',
      leaderboardPoints: (l.leaderboardPoints || 850) + 150
    } : l));

    // Send congratulatory notification
    const completionNotif = {
      id: 'notif-recovery-' + Date.now(),
      title: '🎉 Recovery Complete! Active On Leaderboard',
      message: 'You successfully completed all required skill recovery challenges. Your leaderboard status has been restored to ACTIVE with +150 bonus points!',
      date: 'Just now',
      read: false,
      action: 'VIEW LEADERBOARD',
      type: 'recovery_done'
    };
    setNotifications(prev => [completionNotif, ...prev]);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }
  };

  // Test simulation helpers
  const simulateInactivity = (daysAgo = 20) => {
    const pastDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString();
    setCurrentUser(prev => ({
      ...prev,
      lastActiveAt: pastDate,
      leaderboardStatus: 'RECOVERY_IN_PROGRESS'
    }));
    const newSession = createDefaultRecoverySession(currentUser?.id || 'learner-talha');
    setRecoverySession(newSession);
  };

  const simulateActiveStatus = () => {
    const nowIso = new Date().toISOString();
    setCurrentUser(prev => ({
      ...prev,
      lastActiveAt: nowIso,
      leaderboardStatus: 'ACTIVE'
    }));
    setRecoverySession(prev => prev ? { ...prev, status: 'RECOVERED', progress: 100 } : null);
  };

  const fastForwardDeadline = (hoursLeft = 2) => {
    setRecoverySession(prev => {
      if (!prev) return prev;
      const newDeadline = new Date(Date.now() + hoursLeft * 60 * 60 * 1000).toISOString();
      return {
        ...prev,
        deadlineAt: newDeadline
      };
    });
  };

  const resetRecoverySession = () => {
    const freshSession = createDefaultRecoverySession(currentUser?.id || 'learner-talha');
    setRecoverySession(freshSession);
  };

  // Reset to default demo data
  const resetDemoData = () => {
    localStorage.clear();
    setCurrentUser(INITIAL_DEMO_LEARNER);
    setRecruiterProfile(INITIAL_EMPLOYER_PROFILE);
    setInstitutionProfile(INITIAL_TRAINING_PROVIDER_PROFILE);
    setGovernmentProfile(INITIAL_GOVERNMENT_PROFILE);
    setJobs(INITIAL_JOBS);
    setApplications(INITIAL_JOB_APPLICATIONS);
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setCurrentRole('learner');
    setActiveTab('landing');
    setCourses(COURSES);
    setBatches(BATCHES);
    setLearnersDb(MOCK_LEARNERS_DATABASE);
    setNotifications(INITIAL_NOTIFICATIONS);
    setInactivityThresholdDays(14);
    setRecoverySession(createDefaultRecoverySession('learner-talha'));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        recruiterProfile,
        setRecruiterProfile,
        updateRecruiterProfile,
        institutionProfile,
        setInstitutionProfile,
        governmentProfile,
        setGovernmentProfile,
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
        activeCoursePlayerId,
        setActiveCoursePlayerId,
        openCoursePlayer,
        getEnrollmentProgress,
        updateEmploymentOutcome,
        learnerProfilesRegistry,
        setLearnerProfilesRegistry,
        saveLearnerProfileToRegistry,
        exportRegistryToCSV,
        createNewBatch,
        updateBatchAttendance,
        resetDemoData,
        loginUser,
        signupUser,
        logoutUser,
        loadDemoLearner,
        loadFreshLearner,
        // Profile & Wizard extensions
        isProfileWizardOpen,
        profileWizardRole,
        profileWizardInitialStep,
        openProfileWizard,
        closeProfileWizard,
        updateUserProfile,
        updateInstitutionProfile,
        updateEmployerProfile,
        updateRecruiterProfile: updateEmployerProfile,
        updateGovernmentProfile,
        switchInstitutionSubType,
        simulateBlankProfile,
        simulateFilledProfile,
        learnerCompletion,
        institutionCompletion,
        employerCompletion,
        governmentCompletion,
        currentProfileCompletion,
        skillsCatalog: SKILLS_CATALOG,
        targetRolesCatalog: TARGET_ROLES_CATALOG,
        // Skill Recovery & Inactivity System
        inactivityThresholdDays,
        setInactivityThresholdDays,
        recoverySession,
        setRecoverySession,
        recordLearningActivity,
        submitRecoveryAssignment,
        completeRecoverySession,
        simulateInactivity,
        simulateActiveStatus,
        fastForwardDeadline,
        resetRecoverySession,
        // Job Marketplace, Applications, Recruiter & DigiLocker
        jobs,
        setJobs,
        applications,
        setApplications,
        chatMessages,
        setChatMessages,
        toggleSaveJob,
        applyToJob,
        updateApplicationStage,
        postNewJob,
        sendChatMessage,
        connectDigiLocker,
        updateLearnerProfile,
        roleSkillCourseMapping: ROLE_SKILL_COURSE_MAPPING,
        calculateJobMatch,
        // Multi-language system
        currentLanguage,
        setCurrentLanguage,
        supportedLanguages: SUPPORTED_LANGUAGES,
        translations: TRANSLATIONS,
        t
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
