export const INITIAL_SKILLS = [
  {
    id: 'dbms',
    name: 'DBMS',
    tagline: 'Database Management Systems & Relational Architectures',
    description: 'Relational database fundamentals, SQL mastery, normalization, ACID transactions, index optimization, and high-concurrency database design.',
    icon: 'Database',
    competencies: [
      'Database Fundamentals',
      'Relational Model & Keys',
      'Applied SQL & Aggregations',
      'Relational Joins',
      '3NF Normalization',
      'ACID & Transactions',
      'B-Tree Indexing & Leftmost Prefix Rule',
      'Concurrency & Isolation Levels',
      'Locking & Scalable Schema Design'
    ],
    relatedRoles: ['Backend Developer', 'Data Analyst', 'Database Developer', 'Software Developer'],
    color: 'teal'
  },
  {
    id: 'dsa',
    name: 'DSA',
    tagline: 'Data Structures & Algorithmic Problem Solving',
    description: 'Linear structures, BSTs, graph traversal algorithms, sliding window techniques, sorting trade-offs, dynamic programming, and LRU cache architecture.',
    icon: 'Binary',
    competencies: [
      'Array Contiguous Addressing',
      'Stack & Queue Primitives',
      'Linked List Manipulation',
      'Binary Search Tree Properties',
      'Graph Cycle Detection (DFS/Kahn)',
      'Sliding Window & Two-Pointers',
      'QuickSort Partition Analysis',
      'LRU Cache Dual-Structure Design',
      'Dynamic Programming State Transitions',
      'Shortest Path Algorithm Limits'
    ],
    relatedRoles: ['Software Developer', 'Backend Developer', 'Embedded Systems Engineer', 'Data Analyst'],
    color: 'emerald'
  },
  {
    id: 'electrical',
    name: 'Electrical Works',
    tagline: 'Industrial Circuits, Safety & Electrical Troubleshooting',
    description: 'Ohm’s law, Lock-Out/Tag-Out (LOTO), MCBs, RCCB earth leakage protection, 3-phase star/delta motors, floating neutral hazards, and harmonic diagnostics.',
    icon: 'Zap',
    competencies: [
      'Lock-Out / Tag-Out (LOTO) Safety',
      'Ohm’s Law & Resistive Calculations',
      'MCB Overcurrent Protection',
      'Series vs Parallel Circuit Behavior',
      'AC RMS Power Factor Calculation',
      '3-Phase Floating Neutral Hazards',
      'RCCB Earth Leakage Current Detection',
      '3-Phase Motor Imbalance Diagnostics',
      'Star-Delta Starter Control Circuits',
      'Triplen Harmonic Analysis in Neutrals'
    ],
    relatedRoles: ['Electrical Technician', 'Electrical Maintenance Technician', 'Embedded / Hardware Specialist'],
    color: 'amber'
  }
];

export const TARGET_CAREERS = [
  {
    id: 'backend-dev',
    title: 'Backend Developer',
    category: 'Software & Cloud',
    description: 'Build robust APIs, database layers, and distributed server architectures.',
    requiredSkills: {
      dbms: { minScore: 7, priority: 'High', label: 'Advanced SQL, Normalization, Query Tuning' },
      dsa: { minScore: 8, priority: 'High', label: 'Graph Algorithms, Hash Maps, Time/Space Optimization' },
      electrical: { minScore: 0, priority: 'Optional', label: 'Not directly required' }
    },
    additionalSkills: ['RESTful APIs', 'System Design', 'Docker & Cloud Services', 'Caching Layers (Redis)'],
    avgSalaryRange: '₹5–7 LPA',
    marketDemand: 'Very High'
  },
  {
    id: 'software-dev',
    title: 'Software Developer',
    category: 'Engineering',
    description: 'Design and deliver production applications with clean architectural patterns.',
    requiredSkills: {
      dbms: { minScore: 6, priority: 'High', label: 'Relational DBs, Joins, Integrity Constraints' },
      dsa: { minScore: 7, priority: 'High', label: 'Core Data Structures, Sorting, Searching' },
      electrical: { minScore: 0, priority: 'Optional', label: 'Not required' }
    },
    additionalSkills: ['Git & CI/CD', 'Object Oriented Design', 'Testing & Debugging'],
    avgSalaryRange: '₹5–7 LPA',
    marketDemand: 'Very High'
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    description: 'Extract business insights from relational data marts and analytical stores.',
    requiredSkills: {
      dbms: { minScore: 8, priority: 'High', label: 'Complex Aggregations, GROUP BY, Window Functions' },
      dsa: { minScore: 5, priority: 'Medium', label: 'Array Manipulations, Filtering' },
      electrical: { minScore: 0, priority: 'Optional', label: 'Not required' }
    },
    additionalSkills: ['Python / Pandas', 'Data Visualization (PowerBI / Tableau)', 'Statistical Modeling'],
    avgSalaryRange: '₹3–5 LPA',
    marketDemand: 'High'
  },
  {
    id: 'database-dev',
    title: 'Database Developer',
    category: 'Data Architecture',
    description: 'Architect scalable transactional schemas, manage indexes, and optimize query latency.',
    requiredSkills: {
      dbms: { minScore: 9, priority: 'High', label: 'Query Optimizer Analysis, Partitioning, Concurrency MVCC' },
      dsa: { minScore: 6, priority: 'Medium', label: 'Tree Indexing Structures, Hashing' },
      electrical: { minScore: 0, priority: 'Optional', label: 'Not required' }
    },
    additionalSkills: ['PostgreSQL Administration', 'Replication & Sharding', 'ETL Pipelines'],
    avgSalaryRange: '₹7–10 LPA',
    marketDemand: 'High'
  },
  {
    id: 'electrical-tech',
    title: 'Electrical Technician',
    category: 'Industrial & Technical',
    description: 'Install, maintain, and inspect industrial electrical wiring and distribution systems.',
    requiredSkills: {
      electrical: { minScore: 7, priority: 'High', label: 'Circuit Safety, MCB/RCCB, Single & 3-Phase Wiring' },
      dbms: { minScore: 0, priority: 'Optional', label: 'Not required' },
      dsa: { minScore: 0, priority: 'Optional', label: 'Not required' }
    },
    additionalSkills: ['Blueprint Reading', 'Multimeter & Megger Testing', 'IS Safety Standards'],
    avgSalaryRange: '₹2–3 LPA',
    marketDemand: 'Very High'
  },
  {
    id: 'electrical-maint-tech',
    title: 'Electrical Maintenance Technician',
    category: 'Industrial & Manufacturing',
    description: 'Troubleshoot industrial motors, star-delta control panels, and automation switchgear.',
    requiredSkills: {
      electrical: { minScore: 8, priority: 'High', label: 'Motor Diagnostics, Overload Relays, Star-Delta Panels' },
      dbms: { minScore: 0, priority: 'Optional', label: 'Not required' },
      dsa: { minScore: 0, priority: 'Optional', label: 'Not required' }
    },
    additionalSkills: ['PLC Inputs/Outputs', 'Preventive Maintenance Logs', 'Power Factor Correction Units'],
    avgSalaryRange: '₹3–5 LPA',
    marketDemand: 'High'
  },
  {
    id: 'embedded-hardware',
    title: 'Embedded / Hardware Specialist',
    category: 'Hardware & IoT',
    description: 'Interface microcontroller firmwares with electrical sensors and power boards.',
    requiredSkills: {
      electrical: { minScore: 7, priority: 'High', label: 'Circuit Laws, DC Regulators, Sensor Wiring' },
      dsa: { minScore: 7, priority: 'High', label: 'Bitwise Logic, Ring Buffers, State Machines' },
      dbms: { minScore: 4, priority: 'Medium', label: 'Time-Series Logging' }
    },
    additionalSkills: ['C/C++ Embedded', 'Oscilloscopes & Logic Analyzers', 'I2C/SPI Protocols'],
    avgSalaryRange: '₹5–7 LPA',
    marketDemand: 'High'
  },
  {
    id: 'general-improvement',
    title: 'General Skill Improvement',
    category: 'Continuous Learning',
    description: 'Upgrade foundational and practical competencies across technology and electrical disciplines.',
    requiredSkills: {
      dbms: { minScore: 6, priority: 'Medium', label: 'Core Database Foundations' },
      dsa: { minScore: 6, priority: 'Medium', label: 'Algorithmic Problem Solving' },
      electrical: { minScore: 6, priority: 'Medium', label: 'Practical Electrical Literacy' }
    },
    additionalSkills: ['Workplace Problem Solving', 'Digital Literacy', 'Professional Communication'],
    avgSalaryRange: '₹3–5 LPA',
    marketDemand: 'Moderate'
  }
];

export const COURSES = [
  {
    id: 'course-dbms-adv',
    title: 'Advanced SQL & Database Architecture',
    provider: 'Apex Institute of Technology',
    providerId: 'prov-apex',
    skill: 'DBMS',
    skillId: 'dbms',
    difficulty: 'Advanced',
    duration: '8 Weeks (64 Hours)',
    trainingMode: 'Hybrid',
    tag: 'Advanced',
    tagColor: 'teal',
    rating: 4.8,
    marketRelevance: 'High',
    marketRelevanceStatus: 'High',
    description: 'Master enterprise-scale database engineering. Covers complex indexing execution plans, concurrency control under MVCC, partition strategies, and deadlock mitigation.',
    skillsCovered: ['Execution Plan Analysis', 'Composite B-Tree Indexes', 'Isolation Levels & Deadlocks', 'Distributed Sharding'],
    prerequisites: 'Basic SQL and familiarity with relational tables.',
    learningOutcomes: [
      'Analyze query execution plans to identify table scans and costly sorts',
      'Design composite indexes adhering to the leftmost prefix rule',
      'Resolve lock contention and phantom reads in high-volume transactions',
      'Implement counter-striping patterns for high-concurrency inventory'
    ],
    gapAddressed: 'Query Optimization, Indexing Execution Plans, Concurrency Locks',
    recommendationReason: 'Addresses your assessment gap in Advanced Indexing and Transaction Concurrency.',
    modulesCount: 8,
    enrolledCount: 340,
    completionRate: 88,
    employmentRate: 84
  },
  {
    id: 'course-dsa-applied',
    title: 'Applied Data Structures & Algorithmic Problem Solving',
    provider: 'National Skill Academy',
    providerId: 'prov-nsa',
    skill: 'DSA',
    skillId: 'dsa',
    difficulty: 'Moderate',
    duration: '10 Weeks (80 Hours)',
    trainingMode: 'Online',
    tag: 'Core',
    tagColor: 'amber',
    rating: 4.9,
    marketRelevance: 'High',
    marketRelevanceStatus: 'High',
    description: 'Rigorous algorithmic training bridging theory and real-world implementation. Covers graph cycle detection, sliding window algorithms, BST balanced searches, and LRU cache architectures.',
    skillsCovered: ['Graph DFS / Kahn Algorithm', 'Sliding Window & Pointers', 'Balanced BSTs', 'Dynamic Programming Fundamentals', 'LRU Cache Design'],
    prerequisites: 'Basic knowledge of arrays and loops in any programming language.',
    learningOutcomes: [
      'Detect cycles in directed and undirected graphs in O(V+E) time',
      'Optimize quadratic search loops into linear O(n) sliding windows',
      'Synthesize Doubly Linked Lists with Hash Maps to build O(1) LRU Caches',
      'Distinguish greedy choice limitations from dynamic programming memoization'
    ],
    gapAddressed: 'Graph Algorithms, Two Pointers, LRU Cache Architectures',
    recommendationReason: 'Targeted for your Developing DSA score (5/10) to prepare for Backend Developer roles.',
    modulesCount: 10,
    enrolledCount: 520,
    completionRate: 82,
    employmentRate: 79
  },
  {
    id: 'course-elec-maint',
    title: 'Industrial Electrical Maintenance & Motor Control',
    provider: 'Bharat Vocational Works',
    providerId: 'prov-bvw',
    skill: 'Electrical Works',
    skillId: 'electrical',
    difficulty: 'Advanced',
    duration: '6 Weeks (72 Hours)',
    trainingMode: 'Offline',
    tag: 'Practical',
    tagColor: 'emerald',
    rating: 4.7,
    marketRelevance: 'High',
    marketRelevanceStatus: 'High',
    description: 'Hands-on industrial electrical workshop. Troubleshoot 3-phase induction motors, wire Star-Delta contactor panels, diagnose floating neutral hazards, and eliminate power factor losses.',
    skillsCovered: ['Star-Delta Control Loops', '3-Phase Current Imbalance', 'Floating Neutral Protection', 'RCCB Earth Leakage', 'Harmonic Current Mitigation'],
    prerequisites: 'Basic safety training and fundamental circuit literacy.',
    learningOutcomes: [
      'Wire and troubleshoot industrial Star-Delta motor starters and control interlocks',
      'Diagnose thermal overload tripping and phase current imbalances using clamp multimeters',
      'Identify severed neutral hazards in unbalanced 3-phase star distribution systems',
      'Measure and calculate power factor to size correction capacitor banks'
    ],
    gapAddressed: '3-Phase Motor Troubleshooting, Control Circuits, Harmonic Hazards',
    recommendationReason: 'Builds hands-on industrial proficiency for Electrical Maintenance Technician roles.',
    modulesCount: 6,
    enrolledCount: 290,
    completionRate: 91,
    employmentRate: 88
  },
  {
    id: 'course-dbms-fund',
    title: 'Relational Fundamentals & Query Optimization',
    provider: 'Metro Tech Hub',
    providerId: 'prov-mth',
    skill: 'DBMS',
    skillId: 'dbms',
    difficulty: 'Moderate',
    duration: '6 Weeks (48 Hours)',
    trainingMode: 'Online',
    tag: 'Core',
    tagColor: 'blue',
    rating: 4.6,
    marketRelevance: 'High',
    marketRelevanceStatus: 'High',
    description: 'A comprehensive foundation in relational modeling, 3NF normalization, GROUP BY aggregations, foreign keys, and SQL query efficiency.',
    skillsCovered: ['Relational Integrity', 'Normalization 1NF to 3NF', 'INNER & OUTER Joins', 'Aggregations & HAVING'],
    prerequisites: 'None. Suitable for beginners and developing database learners.',
    learningOutcomes: [
      'Write clean SQL statements utilizing appropriate JOIN varieties',
      'Normalize unstructured data into compliant Third Normal Form (3NF)',
      'Construct aggregation reports using GROUP BY and HAVING clauses'
    ],
    gapAddressed: 'SQL Joins, Normalization, Query Filtering',
    recommendationReason: 'Solidifies database foundations before moving into high-concurrency systems.',
    modulesCount: 6,
    enrolledCount: 410,
    completionRate: 86,
    employmentRate: 74
  },
  {
    id: 'course-elec-safety',
    title: 'Commercial Electrical Safety & Distribution Wiring',
    provider: 'Bharat Vocational Works',
    providerId: 'prov-bvw',
    skill: 'Electrical Works',
    skillId: 'electrical',
    difficulty: 'Core',
    duration: '4 Weeks (40 Hours)',
    trainingMode: 'Offline',
    tag: 'Core',
    tagColor: 'teal',
    rating: 4.9,
    marketRelevance: 'High',
    marketRelevanceStatus: 'High',
    description: 'Rigorous training in electrical safety protocols, Lock-Out/Tag-Out (LOTO), MCB/RCCB sizing, grounding loop verification, and Indian Electricity Rules.',
    skillsCovered: ['LOTO Procedures', 'MCB Overcurrent Curves', 'RCCB 30mA Sensitivity', 'Earth Pit Resistance Testing'],
    prerequisites: 'High school or basic vocational qualification.',
    learningOutcomes: [
      'Execute OSHA and IS compliant Lock-Out / Tag-Out verification steps',
      'Select proper gauge copper/aluminum conductors based on thermal current ratings',
      'Test residual current breakers and earth electrode resistance'
    ],
    gapAddressed: 'Electrical Safety, Grounding, Circuit Protection',
    recommendationReason: 'Essential mandatory safety certification for all commercial electrical technicians.',
    modulesCount: 4,
    enrolledCount: 380,
    completionRate: 95,
    employmentRate: 82
  },
  {
    id: 'course-legacy-db2',
    title: 'Legacy Mainframe DB Systems (COBOL & DB2)',
    provider: 'Metro Tech Hub',
    providerId: 'prov-mth',
    skill: 'DBMS',
    skillId: 'dbms',
    difficulty: 'Core',
    duration: '6 Weeks (48 Hours)',
    trainingMode: 'Online',
    tag: 'Review',
    tagColor: 'amber',
    rating: 3.4,
    marketRelevance: 'Needs Review',
    marketRelevanceStatus: 'Review Recommended',
    reviewNote: 'Course Review Recommended: Declining industry placement rate. Recommend modernizing curriculum toward PostgreSQL/Cloud Databases.',
    description: 'Covers legacy enterprise database systems on mainframe hardware architectures.',
    skillsCovered: ['DB2 SQL Syntax', 'Legacy ISAM indexing', 'Batch flatfile imports'],
    prerequisites: 'Basic procedural programming.',
    learningOutcomes: ['Understand legacy mainframe data structures'],
    gapAddressed: 'Legacy Mainframe Operations',
    recommendationReason: 'Low market demand. Modern PostgreSQL alternative recommended instead.',
    modulesCount: 6,
    enrolledCount: 120,
    completionRate: 74,
    employmentRate: 38
  }
];

export const PROVIDERS = [
  {
    id: 'prov-apex',
    name: 'Apex Institute of Technology',
    type: 'Approved Training Institution',
    location: 'Pune & Bengaluru',
    established: 2018,
    activeBatches: 6,
    totalTrained: 1840,
    overallCompletionRate: 87,
    employmentConversionRate: 82,
    sixMonthRetentionRate: 78,
    status: 'High Performer',
    rating: 4.8
  },
  {
    id: 'prov-nsa',
    name: 'National Skill Academy',
    type: 'Government-Affiliated Organization',
    location: 'Bengaluru & Coimbatore',
    established: 2016,
    activeBatches: 8,
    totalTrained: 2650,
    overallCompletionRate: 83,
    employmentConversionRate: 79,
    sixMonthRetentionRate: 75,
    status: 'Standard',
    rating: 4.7
  },
  {
    id: 'prov-bvw',
    name: 'Bharat Vocational Works',
    type: 'Vocational Training NGO',
    location: 'Pune, Jaipur & Bhopal',
    established: 2019,
    activeBatches: 7,
    totalTrained: 1420,
    overallCompletionRate: 92,
    employmentConversionRate: 86,
    sixMonthRetentionRate: 83,
    status: 'High Performer',
    rating: 4.9
  },
  {
    id: 'prov-mth',
    name: 'Metro Tech Hub',
    type: 'Private Training Provider',
    location: 'Lucknow & Jaipur',
    established: 2021,
    activeBatches: 4,
    totalTrained: 950,
    overallCompletionRate: 89,
    employmentConversionRate: 58,
    sixMonthRetentionRate: 52,
    status: 'Requires Review',
    statusNote: 'High course completion but lower employment conversion. Curriculum alignment review recommended.',
    rating: 3.9
  }
];

export const DISTRICTS = [
  {
    id: 'dist-pune',
    name: 'Pune',
    state: 'Maharashtra',
    enrolled: 1850,
    completed: 1610,
    completionRate: 87,
    employed: 1336,
    employmentConversion: 83,
    retentionRate: 79,
    avgWageBand: '₹5–7 LPA',
    topSector: 'IT & Electrical Maintenance'
  },
  {
    id: 'dist-blr',
    name: 'Bengaluru',
    state: 'Karnataka',
    enrolled: 2420,
    completed: 2057,
    completionRate: 85,
    employed: 1748,
    employmentConversion: 85,
    retentionRate: 82,
    avgWageBand: '₹5–7 LPA',
    topSector: 'Software & Backend'
  },
  {
    id: 'dist-cbe',
    name: 'Coimbatore',
    state: 'Tamil Nadu',
    enrolled: 1140,
    completed: 1003,
    completionRate: 88,
    employed: 782,
    employmentConversion: 78,
    retentionRate: 74,
    avgWageBand: '₹3–5 LPA',
    topSector: 'Industrial Electrical & Automation'
  },
  {
    id: 'dist-jpr',
    name: 'Jaipur',
    state: 'Rajasthan',
    enrolled: 980,
    completed: 823,
    completionRate: 84,
    employed: 576,
    employmentConversion: 70,
    retentionRate: 67,
    avgWageBand: '₹3–5 LPA',
    topSector: 'Electrical Technician & IT'
  },
  {
    id: 'dist-lko',
    name: 'Lucknow',
    state: 'Uttar Pradesh',
    enrolled: 1210,
    completed: 1040,
    completionRate: 86,
    employed: 613,
    employmentConversion: 59,
    retentionRate: 54,
    avgWageBand: '₹2–3 LPA',
    topSector: 'General Technical',
    note: 'Outcome disparity detected. Requires investigation into local hiring partnerships.'
  },
  {
    id: 'dist-bho',
    name: 'Bhopal',
    state: 'Madhya Pradesh',
    enrolled: 890,
    completed: 774,
    completionRate: 87,
    employed: 565,
    employmentConversion: 73,
    retentionRate: 70,
    avgWageBand: '₹3–5 LPA',
    topSector: 'Vocational Electrical & DBMS'
  }
];

export const COHORTS = [
  {
    id: 'cohort-2026-01',
    name: 'January 2026 Cohort',
    period: 'Jan – Mar 2026',
    enrolled: 1200,
    completed: 1020,
    completionRate: 85,
    employed: 765,
    employmentConversion: 75,
    sixMonthRetained: 612,
    retentionRate: 80,
    avgWageRange: '₹3–5 LPA'
  },
  {
    id: 'cohort-2026-04',
    name: 'April 2026 Cohort',
    period: 'Apr – Jun 2026',
    enrolled: 1450,
    completed: 1276,
    completionRate: 88,
    employed: 1046,
    employmentConversion: 82,
    sixMonthRetained: 889,
    retentionRate: 85,
    avgWageRange: '₹5–7 LPA',
    note: 'Outcomes improved significantly (+7% conversion) following curriculum modernization.'
  },
  {
    id: 'cohort-2026-07',
    name: 'July 2026 Cohort',
    period: 'Jul – Sep 2026',
    enrolled: 1600,
    completed: 1424,
    completionRate: 89,
    employed: 1210,
    employmentConversion: 85,
    sixMonthRetained: 1052,
    retentionRate: 87,
    avgWageRange: '₹5–7 LPA'
  }
];

export const BATCHES = [
  {
    id: 'batch-dsa-2026-01',
    name: 'DSA-2026-01',
    courseId: 'course-dsa-applied',
    courseName: 'Applied Data Structures & Algorithmic Problem Solving',
    providerId: 'prov-nsa',
    providerName: 'National Skill Academy',
    cohortId: 'cohort-2026-04',
    startDate: '2026-04-10',
    endDate: '2026-06-20',
    status: 'In Progress',
    totalStudents: 32,
    completedStudents: 0,
    avgAttendance: 84,
    totalSessions: 40,
    completedSessions: 28
  },
  {
    id: 'batch-dbms-2026-02',
    name: 'DBMS-2026-02',
    courseId: 'course-dbms-adv',
    courseName: 'Advanced SQL & Database Architecture',
    providerId: 'prov-apex',
    providerName: 'Apex Institute of Technology',
    cohortId: 'cohort-2026-04',
    startDate: '2026-04-15',
    endDate: '2026-06-15',
    status: 'Completed',
    totalStudents: 28,
    completedStudents: 25,
    avgAttendance: 88,
    totalSessions: 32,
    completedSessions: 32
  },
  {
    id: 'batch-elec-2026-01',
    name: 'ELEC-2026-01',
    courseId: 'course-elec-maint',
    courseName: 'Industrial Electrical Maintenance & Motor Control',
    providerId: 'prov-bvw',
    providerName: 'Bharat Vocational Works',
    cohortId: 'cohort-2026-04',
    startDate: '2026-04-05',
    endDate: '2026-05-20',
    status: 'Completed',
    totalStudents: 26,
    completedStudents: 24,
    avgAttendance: 92,
    totalSessions: 36,
    completedSessions: 36
  }
];

// Initial demo user: Talha Jubayer (matches user's reference UI layout!)
export const INITIAL_DEMO_LEARNER = {
  id: 'learner-talha',
  name: 'Talha Jubayer',
  headline: 'Aspiring Backend Architect & Relational Systems Enthusiast',
  bio: 'Final-year Computer Engineering student dedicated to high-concurrency relational architectures, index optimizations, and microservices.',
  email: 'talhajuba@gmail.com',
  phone: '+91 98765 43210',
  dob: '2003-08-15',
  gender: 'Male',
  language: 'English, Hindi, Marathi',
  location: 'Pune, Maharashtra',
  country: 'India',
  state: 'Maharashtra',
  city: 'Pune',
  willingToRelocate: true,
  preferredWorkMode: 'Hybrid',
  role: 'learner',
  overallProgress: 75,
  currentRank: 'Top 4%',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  quote: 'The beautiful thing about learning is that no one can take it away from you.',
  education: {
    qualification: 'Bachelor of Technology',
    degree: 'B.Tech in Computer Engineering',
    institution: 'Government College of Engineering, Pune',
    yearOfPassing: '2025'
  },
  educations: [
    {
      id: 'edu-1',
      degree: 'B.Tech in Computer Engineering',
      fieldOfStudy: 'Computer Science & Systems Engineering',
      institution: 'Government College of Engineering, Pune',
      yearOfCompletion: '2025',
      grade: '8.8 CGPA'
    },
    {
      id: 'edu-2',
      degree: 'Higher Secondary Certificate (HSC)',
      fieldOfStudy: 'Science (PCM & Electronics)',
      institution: 'Fergusson Junior College, Pune',
      yearOfCompletion: '2021',
      grade: '92.4%'
    }
  ],
  career: {
    status: 'Upskilling & Seeking Backend Roles',
    targetCareerId: 'backend-dev',
    targetCareerTitle: 'Backend Developer'
  },
  careerProfile: {
    status: 'Student / Seeking Roles',
    targetRole: 'Backend Developer',
    targetIndustry: 'Software & Financial Technology',
    salaryExpectation: '₹6–9 LPA',
    targetTimeline: 'Immediate (Within 3 months)'
  },
  selectedSkills: ['dbms', 'dsa', 'electrical'],
  userSkills: [
    { id: 'dbms', name: 'DBMS', proficiency: 'Advanced' },
    { id: 'dsa', name: 'DSA', proficiency: 'Intermediate' },
    { id: 'electrical', name: 'Electrical Works', proficiency: 'Advanced' },
    { id: 'postgresql', name: 'PostgreSQL & Query Optimization', proficiency: 'Intermediate' },
    { id: 'system-design', name: 'Distributed Systems & Microservices', proficiency: 'Beginner' }
  ],
  skillsToLearn: ['Docker & Kubernetes', 'System Design & Distributed Caching', 'Redis Architecture'],
  credentials: [
    {
      id: 'cred-1',
      title: 'AWS Certified Cloud Practitioner (CLF-C02)',
      issuer: 'Amazon Web Services',
      issueDate: '2025-11-10',
      url: 'https://aws.amazon.com/verification/cred-talha-1092'
    },
    {
      id: 'cred-2',
      title: 'PostgreSQL 15 High-Performance Tuning',
      issuer: 'Postgres Professional Academy',
      issueDate: '2026-02-14',
      url: 'https://postgrespro.com/cert/talha-pg15'
    }
  ],
  portfolioLinks: {
    portfolio: 'https://talhajubayer.dev',
    github: 'https://github.com/talha-juba',
    linkedin: 'https://linkedin.com/in/talhajubayer'
  },
  learningPreferences: {
    preferredFormat: 'Interactive & Project-based',
    hoursPerWeek: 15,
    schedule: 'Weekdays & Evenings',
    mentorshipInterest: true
  },
  assessmentResults: {
    dbms: {
      score: 7,
      total: 10,
      percentage: 70,
      capabilityLevel: 'PROFICIENT',
      completedAt: '2026-04-18',
      strongAreas: ['Relational Model', 'Primary/Foreign Keys', 'Basic & Filtered Queries', '3NF Normalization'],
      weakAreas: ['B-Tree Leftmost Prefix Indexing', 'Concurrency & Deadlock Resolution', 'Counter-Striping Design'],
      skillGaps: ['Query Optimization under scale', 'Transaction MVCC isolation tuning']
    },
    dsa: {
      score: 5,
      total: 10,
      percentage: 50,
      capabilityLevel: 'DEVELOPING',
      completedAt: '2026-04-20',
      strongAreas: ['Array Access O(1)', 'Stack LIFO Operation', 'Head Insertion in Linked List'],
      weakAreas: ['Graph Cycle Detection', 'LRU Cache Dual Structures', 'Dynamic Programming State Transitions'],
      skillGaps: ['Graph Algorithms', 'Dynamic Programming & Memoization', 'LRU Cache Synthesis']
    },
    electrical: {
      score: 9,
      total: 10,
      percentage: 90,
      capabilityLevel: 'ADVANCED',
      completedAt: '2026-04-22',
      strongAreas: ['LOTO Safety Protocols', 'Ohm’s Law Computations', 'MCB Protection', '3-Phase Floating Neutral Hazards', 'Star-Delta Control Interlocks'],
      weakAreas: ['Triplen Harmonic neutral current summation'],
      skillGaps: ['High-frequency power quality harmonics']
    }
  },
  activeCourses: [
    {
      courseId: 'course-dbms-adv',
      title: 'Advanced SQL & Database Architecture',
      category: 'Advanced',
      skill: 'DBMS',
      categoryColor: 'teal',
      progress: 85,
      latestScore: '94/100',
      totalModules: 8,
      completedModules: 7,
      enrolledAt: '2026-04-25',
      attendance: 88,
      status: 'In Progress'
    },
    {
      courseId: 'course-dsa-applied',
      title: 'Applied Data Structures & Algorithmic Problem Solving',
      category: 'Core',
      skill: 'DSA',
      categoryColor: 'amber',
      progress: 65,
      latestScore: '88/100',
      totalModules: 10,
      completedModules: 6,
      enrolledAt: '2026-04-28',
      attendance: 84,
      status: 'In Progress'
    },
    {
      courseId: 'course-elec-maint',
      title: 'Industrial Electrical Maintenance & Motor Control',
      category: 'Literature / Practical',
      skill: 'Electrical Works',
      categoryColor: 'emerald',
      progress: 45,
      latestScore: '91/100',
      totalModules: 6,
      completedModules: 3,
      enrolledAt: '2026-05-02',
      attendance: 92,
      status: 'In Progress'
    },
    {
      courseId: 'course-cloud-sys',
      title: 'Cloud Systems & API Architecture',
      category: 'Creative',
      skill: 'Backend',
      categoryColor: 'purple',
      progress: 85,
      latestScore: '98/100',
      totalModules: 8,
      completedModules: 7,
      enrolledAt: '2026-04-15',
      attendance: 90,
      status: 'In Progress'
    }
  ],
  attendanceSummary: {
    overallPercentage: 80,
    presentSessions: 40,
    totalSessions: 50,
    lastUpdated: 'April-25-2026'
  },
  skillsBreakdown: {
    strengths: [
      { name: 'Comprehension / Querying', category: 'DBMS', percent: 78 },
      { name: 'Relational Algebra', category: 'DBMS', percent: 85 },
      { name: 'Linear Structures', category: 'DSA', percent: 70 },
      { name: 'Circuit Safety & LOTO', category: 'Electrical', percent: 94 }
    ],
    weaknesses: [
      { name: 'Graph Algorithms', category: 'DSA', percent: 35 },
      { name: 'Query Optimization Plans', category: 'DBMS', percent: 42 },
      { name: 'Dynamic Programming', category: 'DSA', percent: 30 },
      { name: 'Harmonics Diagnostics', category: 'Electrical', percent: 48 }
    ]
  },
  upcomingTests: [
    { id: 'test-1', title: 'Reading Mock Test: SQL Query Plans', date: '25 May 2026', duration: '45 Minutes', skill: 'DBMS' },
    { id: 'test-2', title: 'Writing Practice Test: Graph DFS & BFS', date: '27 May 2026', duration: '40 Minutes', skill: 'DSA' },
    { id: 'test-3', title: 'Language Test: 3-Phase Troubleshooting', date: '29 May 2026', duration: '30 Minutes', skill: 'Electrical' },
    { id: 'test-4', title: 'Comprehensive Skill Readiness Mock', date: '31 May 2026', duration: '45 Minutes', skill: 'All' }
  ],
  longitudinalOutcome: {
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    verificationStatus: 'Not verified (Future Authorized Ready)',
    employerName: 'InfraCloud Technologies',
    jobRole: 'Junior Backend Engineer',
    wageBand: '₹5–7 LPA',
    initialWageBand: '₹3–5 LPA',
    wageProgressionNoted: true,
    reportedDate: '2026-06-01',
    retentionMilestones: {
      twoMonths: { status: 'Employed', verified: false, date: '2026-08-01' },
      sixMonths: { status: 'Employed', verified: false, date: '2026-12-01' },
      twelveMonths: { status: 'Pending Review', verified: false, date: '2027-06-01' }
    },
    trainingRelevance: 'Highly relevant',
    curriculumFeedback: 'Course modules on SQL Indexing and Graph Traversals directly mirrored real backend production tasks.',
    timeline: [
      { month: 'January 2026', title: 'Target Career Selected', desc: 'Registered for Backend Developer pathway & selected DBMS + DSA + Electrical skills.' },
      { month: 'February 2026', title: 'Skill Assessment Completed', desc: 'Identified gaps in B-Tree Indexing and Graph Algorithms. Received personalized course recommendations.' },
      { month: 'April 2026', title: 'Training Milestone: 75% Complete', desc: 'Completed 6/8 modules in Advanced SQL and 6/10 modules in Applied DSA.' },
      { month: 'June 2026', title: 'Employment Reported', desc: 'Joined InfraCloud Technologies as Junior Backend Engineer (₹5–7 LPA range).' },
      { month: 'August 2026', title: '2-Month Retention Confirmed', desc: 'Active in role; reported training as Highly Relevant to daily database optimizations.' }
    ]
  }
};

// Initial Institution Profiles
export const INITIAL_EMPLOYER_PROFILE = {
  subType: 'employer',
  name: 'InfraCloud Technologies',
  orgType: 'Enterprise',
  industry: 'Cloud Infrastructure & Distributed Software',
  website: 'https://infracloud.io',
  size: '250–500 Employees',
  logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=150&auto=format&fit=crop&q=80',
  about: 'Leading cloud-native consulting firm and software powerhouse building Kubernetes-first, high-throughput architectures.',
  hqCountry: 'India',
  hqState: 'Maharashtra',
  hqCity: 'Pune',
  operatingModel: 'Hybrid',
  branches: 'Pune, Bengaluru, Hyderabad, San Jose',
  contactName: 'Anand Kulkarni',
  contactTitle: 'Director of Talent Acquisition',
  contactEmail: 'talent@infracloud.io',
  contactPhone: '+91 98230 45678',
  contactLinkedIn: 'https://linkedin.com/in/anand-kulkarni-hr',
  hiringRoles: ['Backend Developer', 'DevOps & SRE Specialist', 'Cloud Systems Architect', 'Database Engineer'],
  keySkillsInDemand: ['DBMS & SQL Optimization', 'DSA & Algorithmic Design', 'Docker & Kubernetes', 'Golang / Node.js'],
  experienceLevels: ['Entry-level (0-2 yrs)', 'Mid-level (2-5 yrs)'],
  hiringVolume: '50+ hires/year',
  preferredLocations: 'Pune, Bengaluru, Remote Pan-India',
  regNumber: 'CIN: U72200PN2017PTC172890',
  gstin: '27AABCU9603R1ZM',
  verificationDocUrl: 'https://infracloud.io/gov-verification/cin-roc-cert.pdf',
  accreditation: 'NASSCOM Platinum Member • ISO 27001 Certified',
  acceptedTerms: true
};

export const INITIAL_TRAINING_PROVIDER_PROFILE = {
  subType: 'training_provider',
  name: 'Apex Skill Academy',
  providerType: 'EdTech & Vocational Institute',
  establishedYear: '2018',
  website: 'https://apexskillacademy.edu.in',
  logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=150&auto=format&fit=crop&q=80',
  about: 'Premier vocational and technical skilling institute accredited by NSDC & NCVET, transforming graduates into industry-ready engineers.',
  accreditationBody: 'NSDC & NCVET Accredited Grade-A Center',
  campusCountry: 'India',
  campusState: 'Maharashtra',
  campusCity: 'Pune',
  deliveryMode: 'Blended',
  reach: 'National (14 States)',
  adminEmail: 'director@apextech.org',
  adminPhone: '+91 20 2567 8900',
  contactPerson: 'Dr. Suresh Patil',
  contactPersonTitle: 'Academic Director & Dean',
  supportEmail: 'support@apexskillacademy.edu.in',
  domains: ['Computer Science & IT', 'Industrial Electrical & Automation', 'Data Architecture & Analytics'],
  targetAudience: 'Fresh Graduates, ITI & Diploma Students, Career Switchers',
  certificationsOffered: true,
  affiliations: 'National Skill Development Corporation (NSDC), AWS Academy, IEEE Pune Section',
  coursesOffered: [
    {
      id: 'course-p-1',
      title: 'Advanced SQL & High-Throughput Database Architecture',
      domain: 'Database Engineering',
      duration: '8 Weeks (64 Hours)',
      mode: 'Blended (Cohort-based)',
      level: 'Intermediate to Advanced',
      skillsTaught: 'PostgreSQL, 3NF Normalization, Index Optimization, ACID Concurrency',
      fee: '₹14,999 (Govt Subsidy: 100% Covered for eligible youth)'
    },
    {
      id: 'course-p-2',
      title: 'Industrial Electrical Systems, Safety & Motor Diagnostics',
      domain: 'Vocational Engineering',
      duration: '6 Weeks (48 Hours)',
      mode: 'Offline Lab Practicum',
      level: 'Intermediate',
      skillsTaught: 'LOTO Safety, Star-Delta Starters, Harmonic Diagnostics, MCB/RCCB',
      fee: '₹9,999 (Free via PMKVY 4.0)'
    },
    {
      id: 'course-p-3',
      title: 'Applied Algorithmic Problem Solving & Data Structures',
      domain: 'Software Engineering',
      duration: '10 Weeks (80 Hours)',
      mode: 'Online Live & Mentored',
      level: 'Beginner to Advanced',
      skillsTaught: 'Graph DFS/BFS, Dynamic Programming, LRU Caches, Complexity Analysis',
      fee: '₹18,500'
    }
  ],
  licenseId: 'NSDC-VTP-MH-2018-0914',
  verificationDocUrl: 'https://apexskillacademy.edu.in/docs/ncvet-affiliation-cert.pdf',
  facultySummary: '24 Industry Practitioners with 8+ years median tenure from top engineering multinationals.',
  acceptedTerms: true
};

export const INITIAL_GOVERNMENT_PROFILE = {
  deptName: 'Directorate of Vocational Education & Skill Development',
  ministry: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
  govLevel: 'State / Provincial',
  website: 'https://skillmission.gov.in',
  sealLogo: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=150&auto=format&fit=crop&q=80',
  mission: 'Catalyzing industry-aligned vocational training, standardized psychometric skill assessments, and long-term career retention across western corridor districts.',
  jurisdictionRegion: 'Western Region - Maharashtra State',
  coveredDistricts: 'Pune, Nagpur, Nashik, Aurangabad, Solapur, Kolhapur, Amravati',
  hqCountry: 'India',
  hqState: 'Maharashtra',
  hqCity: 'Mumbai',
  hqPincode: '400032',
  nodalOfficerName: 'Dr. Rameshwar V. Shinde, IAS',
  nodalOfficerRank: 'Principal Secretary & State Mission Director',
  officialEmail: 'governance@skillmission.gov.in',
  officialPhone: '+91 22 2202 5411',
  serviceId: 'IAS-MH-2009-8812',
  sponsoredSchemes: [
    {
      id: 'scheme-1',
      name: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0) State Wing',
      targetDemographic: 'Rural and Semi-Urban Youth (18-35 yrs)',
      focusArea: 'Industry 4.0 & Advanced Technical Skilling',
      budget: '₹145 Crores',
      activeBatches: '120 Batches across 24 Districts',
      targetBeneficiaries: '35,000 Candidates / FY'
    },
    {
      id: 'scheme-2',
      name: 'Chief Minister Youth Skill Enhancement & Wage Subsidy Initiative',
      targetDemographic: 'Fresh Engineering & ITI Graduates',
      focusArea: 'Apprenticeship & Direct Employer Onboarding',
      budget: '₹85 Crores',
      activeBatches: '84 Batches',
      targetBeneficiaries: '20,000 Candidates / FY'
    },
    {
      id: 'scheme-3',
      name: 'Digital India FutureSkills Prime Regional Center',
      targetDemographic: 'Women in Tech & Backward Classes',
      focusArea: 'Data Engineering, DBMS & Cloud Literacy',
      budget: '₹50 Crores',
      activeBatches: '45 Batches',
      targetBeneficiaries: '12,500 Candidates / FY'
    }
  ],
  prioritySectors: 'IT & Software, Industrial Automation & Electrical, Solar Tech, Precision Manufacturing',
  targetAnnualBeneficiaries: '67,500 Youth',
  partnerInstitutionTypes: 'NSDC Certified Training Centers, ITIs, Govt Polytechnic Colleges, Industry Skill Hubs',
  targetEmploymentRate: '85% Placement with 75%+ 6-Month Wage Retention',
  authorizedDeclaration: true,
  govOrderDocUrl: 'https://skillmission.gov.in/gazette/GR-2026-SKILL-MSDE-412.pdf'
};

// Blank profiles for clean onboarding simulation
export const BLANK_PROFILES = {
  learner: {
    id: 'learner-new',
    name: '',
    headline: '',
    bio: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    language: '',
    location: '',
    country: 'India',
    state: '',
    city: '',
    willingToRelocate: false,
    preferredWorkMode: '',
    role: 'learner',
    overallProgress: 0,
    currentRank: 'Unranked',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    quote: 'Every expert was once a beginner. Start your journey today.',
    education: { qualification: '', degree: '', institution: '', yearOfPassing: '' },
    educations: [],
    career: { status: '', targetCareerId: '', targetCareerTitle: '' },
    careerProfile: { status: '', targetRole: '', targetIndustry: '', salaryExpectation: '', targetTimeline: '' },
    selectedSkills: [],
    userSkills: [],
    skillsToLearn: [],
    credentials: [],
    portfolioLinks: { portfolio: '', github: '', linkedin: '' },
    learningPreferences: { preferredFormat: '', hoursPerWeek: 0, schedule: '', mentorshipInterest: false }
  },
  institution_employer: {
    subType: 'employer',
    name: '',
    orgType: '',
    industry: '',
    website: '',
    size: '',
    logo: '',
    about: '',
    hqCountry: 'India',
    hqState: '',
    hqCity: '',
    operatingModel: '',
    branches: '',
    contactName: '',
    contactTitle: '',
    contactEmail: '',
    contactPhone: '',
    contactLinkedIn: '',
    hiringRoles: [],
    keySkillsInDemand: [],
    experienceLevels: [],
    hiringVolume: '',
    preferredLocations: '',
    regNumber: '',
    gstin: '',
    verificationDocUrl: '',
    accreditation: '',
    acceptedTerms: false
  },
  institution_training_provider: {
    subType: 'training_provider',
    name: '',
    providerType: '',
    establishedYear: '',
    website: '',
    logo: '',
    about: '',
    accreditationBody: '',
    campusCountry: 'India',
    campusState: '',
    campusCity: '',
    deliveryMode: '',
    reach: '',
    adminEmail: '',
    adminPhone: '',
    contactPerson: '',
    contactPersonTitle: '',
    supportEmail: '',
    domains: [],
    targetAudience: '',
    certificationsOffered: false,
    affiliations: '',
    coursesOffered: [],
    licenseId: '',
    verificationDocUrl: '',
    facultySummary: '',
    acceptedTerms: false
  },
  government: {
    deptName: '',
    ministry: '',
    govLevel: '',
    website: '',
    sealLogo: '',
    mission: '',
    jurisdictionRegion: '',
    coveredDistricts: '',
    hqCountry: 'India',
    hqState: '',
    hqCity: '',
    hqPincode: '',
    nodalOfficerName: '',
    nodalOfficerRank: '',
    officialEmail: '',
    officialPhone: '',
    serviceId: '',
    sponsoredSchemes: [],
    prioritySectors: '',
    targetAnnualBeneficiaries: '',
    partnerInstitutionTypes: '',
    targetEmploymentRate: '',
    authorizedDeclaration: false,
    govOrderDocUrl: ''
  }
};

export const SKILLS_CATALOG = [
  'DBMS',
  'DSA',
  'Electrical Works',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Python',
  'JavaScript',
  'TypeScript',
  'React.js',
  'Node.js',
  'System Design',
  'Docker & Containers',
  'Kubernetes',
  'AWS Cloud',
  'Linux Administration',
  'Git & Version Control',
  'Industrial Motor Control',
  'Star-Delta Wiring',
  'LOTO Safety',
  'PLC Programming',
  'Data Structures',
  'Graph Algorithms',
  'Dynamic Programming',
  'Redis Caching',
  'Kafka Event Streaming',
  'REST API Design',
  'GraphQL',
  'CI/CD Pipelines',
  'Embedded C',
  'IoT Sensors'
];

export const TARGET_ROLES_CATALOG = [
  'Backend Developer',
  'Software Developer',
  'Data Analyst',
  'Database Developer',
  'DevOps Engineer',
  'Cloud Systems Architect',
  'Electrical Maintenance Technician',
  'Electrical Technician',
  'Embedded / Hardware Specialist',
  'Full Stack Engineer',
  'Site Reliability Engineer',
  'Automation Specialist'
];

export const calculateProfileCompletion = (role, data = {}) => {
  if (role === 'learner') {
    const checks = [
      { id: 'name', label: 'Full Name', step: 1, pass: Boolean(data.name?.trim()) },
      { id: 'email', label: 'Email Address', step: 1, pass: Boolean(data.email?.trim()) },
      { id: 'phone', label: 'Phone Number', step: 1, pass: Boolean(data.phone?.trim()) },
      { id: 'headline', label: 'Professional Headline', step: 1, pass: Boolean(data.headline?.trim()) },
      { id: 'location', label: 'City & State', step: 2, pass: Boolean(data.city?.trim() || data.location?.trim()) },
      { id: 'workMode', label: 'Preferred Work Mode', step: 2, pass: Boolean(data.preferredWorkMode) },
      { id: 'education', label: 'Education Degree & College', step: 3, pass: Boolean((data.educations && data.educations.length > 0 && data.educations[0].degree?.trim()) || data.education?.degree?.trim()) },
      { id: 'careerRole', label: 'Target Career Role', step: 4, pass: Boolean(data.career?.targetCareerId || data.careerProfile?.targetRole) },
      { id: 'targetTimeline', label: 'Career Timeline', step: 4, pass: Boolean(data.careerProfile?.targetTimeline) },
      { id: 'skills', label: 'Skills & Proficiency (At least 2)', step: 5, pass: Boolean((data.userSkills && data.userSkills.length >= 2) || (data.selectedSkills && data.selectedSkills.length >= 2)) },
      { id: 'skillsToLearn', label: 'Skills to Learn', step: 5, pass: Boolean(data.skillsToLearn && data.skillsToLearn.length > 0) },
      { id: 'credentials', label: 'Certifications & Portfolio', step: 6, pass: Boolean((data.credentials && data.credentials.length > 0) || data.portfolioLinks?.portfolio || data.portfolioLinks?.github || data.portfolioLinks?.linkedin) },
      { id: 'learningPrefs', label: 'Learning Preferences & Hours', step: 7, pass: Boolean(data.learningPreferences?.preferredFormat && data.learningPreferences?.hoursPerWeek) },
    ];
    const passedCount = checks.filter((c) => c.pass).length;
    const percentage = Math.round((passedCount / checks.length) * 100);
    const missingFields = checks.filter((c) => !c.pass);
    return { percentage, passedCount, totalCount: checks.length, missingFields, isComplete: percentage === 100 };
  }

  if (role === 'institution') {
    const subType = data.subType || 'employer';
    if (subType === 'employer') {
      const checks = [
        { id: 'name', label: 'Organization Name', step: 1, pass: Boolean(data.name?.trim()) },
        { id: 'industry', label: 'Industry Sector', step: 1, pass: Boolean(data.industry?.trim()) },
        { id: 'website', label: 'Official Website', step: 1, pass: Boolean(data.website?.trim()) },
        { id: 'orgType', label: 'Organization Type', step: 1, pass: Boolean(data.orgType) },
        { id: 'about', label: 'Company Overview', step: 1, pass: Boolean(data.about?.trim()) },
        { id: 'hqCity', label: 'Headquarters Location', step: 2, pass: Boolean(data.hqCity?.trim()) },
        { id: 'contactName', label: 'Primary Contact Person', step: 3, pass: Boolean(data.contactName?.trim()) },
        { id: 'contactEmail', label: 'Official Talent Email', step: 3, pass: Boolean(data.contactEmail?.trim()) },
        { id: 'hiringRoles', label: 'Primary Roles Hiring For', step: 4, pass: Boolean(data.hiringRoles && data.hiringRoles.length > 0) },
        { id: 'keySkills', label: 'Key In-Demand Skills', step: 4, pass: Boolean(data.keySkillsInDemand && data.keySkillsInDemand.length > 0) },
        { id: 'regNumber', label: 'Business Reg / CIN / GST', step: 5, pass: Boolean(data.regNumber?.trim()) },
        { id: 'acceptedTerms', label: 'Verification & Terms', step: 5, pass: Boolean(data.acceptedTerms) },
      ];
      const passedCount = checks.filter((c) => c.pass).length;
      const percentage = Math.round((passedCount / checks.length) * 100);
      const missingFields = checks.filter((c) => !c.pass);
      return { percentage, passedCount, totalCount: checks.length, missingFields, isComplete: percentage === 100 };
    } else {
      const checks = [
        { id: 'name', label: 'Institution Name', step: 1, pass: Boolean(data.name?.trim()) },
        { id: 'providerType', label: 'Institution Type', step: 1, pass: Boolean(data.providerType) },
        { id: 'website', label: 'Official Website', step: 1, pass: Boolean(data.website?.trim()) },
        { id: 'accreditationBody', label: 'Accreditation Body', step: 1, pass: Boolean(data.accreditationBody?.trim()) },
        { id: 'campusCity', label: 'Campus / HQ City', step: 2, pass: Boolean(data.campusCity?.trim()) },
        { id: 'reach', label: 'Geographic Reach', step: 2, pass: Boolean(data.reach) },
        { id: 'adminEmail', label: 'Admin Contact Email', step: 3, pass: Boolean(data.adminEmail?.trim()) },
        { id: 'contactPerson', label: 'Academic Director / Dean', step: 3, pass: Boolean(data.contactPerson?.trim()) },
        { id: 'domains', label: 'Course Domains & Specializations', step: 4, pass: Boolean(data.domains && data.domains.length > 0) },
        { id: 'coursesOffered', label: 'Programs / Courses Offered', step: 5, pass: Boolean(data.coursesOffered && data.coursesOffered.length > 0) },
        { id: 'licenseId', label: 'Accreditation / License ID', step: 6, pass: Boolean(data.licenseId?.trim()) },
        { id: 'acceptedTerms', label: 'Quality Verification & Terms', step: 6, pass: Boolean(data.acceptedTerms) },
      ];
      const passedCount = checks.filter((c) => c.pass).length;
      const percentage = Math.round((passedCount / checks.length) * 100);
      const missingFields = checks.filter((c) => !c.pass);
      return { percentage, passedCount, totalCount: checks.length, missingFields, isComplete: percentage === 100 };
    }
  }

  if (role === 'government') {
    const checks = [
      { id: 'deptName', label: 'Department / Agency Name', step: 1, pass: Boolean(data.deptName?.trim()) },
      { id: 'ministry', label: 'Parent Ministry / Directorate', step: 1, pass: Boolean(data.ministry?.trim()) },
      { id: 'govLevel', label: 'Government Tier / Level', step: 1, pass: Boolean(data.govLevel) },
      { id: 'jurisdictionRegion', label: 'Jurisdiction Region', step: 2, pass: Boolean(data.jurisdictionRegion?.trim()) },
      { id: 'hqCity', label: 'Head Office City', step: 2, pass: Boolean(data.hqCity?.trim()) },
      { id: 'nodalOfficerName', label: 'Nodal Officer Name', step: 3, pass: Boolean(data.nodalOfficerName?.trim()) },
      { id: 'officialEmail', label: 'Official Govt Email (@gov.in)', step: 3, pass: Boolean(data.officialEmail?.trim()) },
      { id: 'serviceId', label: 'Service ID / Officer Rank', step: 3, pass: Boolean(data.serviceId?.trim()) },
      { id: 'sponsoredSchemes', label: 'Sponsored Schemes & Programs', step: 4, pass: Boolean(data.sponsoredSchemes && data.sponsoredSchemes.length > 0) },
      { id: 'prioritySectors', label: 'Priority Sectors for Skilling', step: 5, pass: Boolean(data.prioritySectors?.trim()) },
      { id: 'targetEmploymentRate', label: 'Target Employment & Retention Goal', step: 5, pass: Boolean(data.targetEmploymentRate?.trim()) },
      { id: 'authorizedDeclaration', label: 'Authorized Officer Declaration', step: 6, pass: Boolean(data.authorizedDeclaration) },
    ];
    const passedCount = checks.filter((c) => c.pass).length;
    const percentage = Math.round((passedCount / checks.length) * 100);
    const missingFields = checks.filter((c) => !c.pass);
    return { percentage, passedCount, totalCount: checks.length, missingFields, isComplete: percentage === 100 };
  }

  return { percentage: 100, passedCount: 1, totalCount: 1, missingFields: [], isComplete: true };
};

// 20+ realistic learner records across cohorts, districts, and outcome trajectories for analytics
export const MOCK_LEARNERS_DATABASE = [
  INITIAL_DEMO_LEARNER,
  {
    id: 'lrn-102',
    name: 'Priya Sharma',
    district: 'Bengaluru',
    cohortId: 'cohort-2026-01',
    gender: 'Female',
    education: 'B.E. Computer Science',
    targetCareer: 'Backend Developer',
    courseId: 'course-dbms-adv',
    courseCompleted: true,
    assessmentScore: 8,
    attendance: 92,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹7–10 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Highly relevant'
  },
  {
    id: 'lrn-103',
    name: 'Rohan Deshmukh',
    district: 'Pune',
    cohortId: 'cohort-2026-01',
    gender: 'Male',
    education: 'Diploma in Electrical Engineering',
    targetCareer: 'Electrical Maintenance Technician',
    courseId: 'course-elec-maint',
    courseCompleted: true,
    assessmentScore: 9,
    attendance: 94,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹3–5 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Highly relevant'
  },
  {
    id: 'lrn-104',
    name: 'Ananya Verma',
    district: 'Lucknow',
    cohortId: 'cohort-2026-01',
    gender: 'Female',
    education: 'B.Sc Information Technology',
    targetCareer: 'Data Analyst',
    courseId: 'course-dbms-fund',
    courseCompleted: true,
    assessmentScore: 6,
    attendance: 86,
    employmentStatus: 'Unemployed',
    unemployedReason: 'Could not find suitable job in local district',
    verificationSource: 'Self-reported',
    wageBand: 'Below ₹2 LPA',
    retention6m: 'Unemployed',
    trainingRelevance: 'Partially relevant',
    feedback: 'Need more live industry projects and local placement drives.'
  },
  {
    id: 'lrn-105',
    name: 'Vikram Patel',
    district: 'Jaipur',
    cohortId: 'cohort-2026-01',
    gender: 'Male',
    education: 'Diploma Electrical',
    targetCareer: 'Electrical Technician',
    courseId: 'course-elec-safety',
    courseCompleted: true,
    assessmentScore: 7,
    attendance: 88,
    employmentStatus: 'Self-employed',
    verificationSource: 'Self-reported',
    wageBand: '₹3–5 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Relevant'
  },
  {
    id: 'lrn-106',
    name: 'Kavita Nair',
    district: 'Coimbatore',
    cohortId: 'cohort-2026-04',
    gender: 'Female',
    education: 'B.Tech Electrical & Electronics',
    targetCareer: 'Electrical Maintenance Technician',
    courseId: 'course-elec-maint',
    courseCompleted: true,
    assessmentScore: 9,
    attendance: 96,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹5–7 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Highly relevant'
  },
  {
    id: 'lrn-107',
    name: 'Arjun Sen',
    district: 'Bhopal',
    cohortId: 'cohort-2026-04',
    gender: 'Male',
    education: 'BCA',
    targetCareer: 'Software Developer',
    courseId: 'course-dsa-applied',
    courseCompleted: true,
    assessmentScore: 7,
    attendance: 82,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹3–5 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Relevant'
  },
  {
    id: 'lrn-108',
    name: 'Meera Iyer',
    district: 'Bengaluru',
    cohortId: 'cohort-2026-04',
    gender: 'Female',
    education: 'M.Sc Computer Science',
    targetCareer: 'Database Developer',
    courseId: 'course-dbms-adv',
    courseCompleted: true,
    assessmentScore: 9,
    attendance: 90,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹7–10 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Highly relevant'
  },
  {
    id: 'lrn-109',
    name: 'Siddharth Rao',
    district: 'Pune',
    cohortId: 'cohort-2026-04',
    gender: 'Male',
    education: 'B.E. Mechanical (Upskilling to Electrical)',
    targetCareer: 'Embedded / Hardware Specialist',
    courseId: 'course-elec-maint',
    courseCompleted: true,
    assessmentScore: 8,
    attendance: 90,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹5–7 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Highly relevant'
  },
  {
    id: 'lrn-110',
    name: 'Farhan Ali',
    district: 'Lucknow',
    cohortId: 'cohort-2026-04',
    gender: 'Male',
    education: 'Diploma in IT',
    targetCareer: 'Backend Developer',
    courseId: 'course-dsa-applied',
    courseCompleted: false,
    assessmentScore: 4,
    attendance: 62,
    employmentStatus: 'Unemployed',
    unemployedReason: 'Course was not relevant to entry technician requirements',
    verificationSource: 'Self-reported',
    wageBand: 'Below ₹2 LPA',
    retention6m: 'Unemployed',
    trainingRelevance: 'Not relevant'
  },
  {
    id: 'lrn-111',
    name: 'Divya Joshi',
    district: 'Pune',
    cohortId: 'cohort-2026-04',
    gender: 'Female',
    education: 'B.Tech IT',
    targetCareer: 'Backend Developer',
    courseId: 'course-dbms-adv',
    courseCompleted: true,
    assessmentScore: 8,
    attendance: 91,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹5–7 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Highly relevant'
  },
  {
    id: 'lrn-112',
    name: 'Karan Mehra',
    district: 'Jaipur',
    cohortId: 'cohort-2026-01',
    gender: 'Male',
    education: 'ITI Electrician',
    targetCareer: 'Electrical Technician',
    courseId: 'course-elec-safety',
    courseCompleted: true,
    assessmentScore: 7,
    attendance: 95,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹2–3 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Relevant'
  },
  {
    id: 'lrn-113',
    name: 'Sneha Kulkarni',
    district: 'Pune',
    cohortId: 'cohort-2026-04',
    gender: 'Female',
    education: 'B.E. Computer Technology',
    targetCareer: 'Software Developer',
    courseId: 'course-dsa-applied',
    courseCompleted: true,
    assessmentScore: 8,
    attendance: 87,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹5–7 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Highly relevant'
  },
  {
    id: 'lrn-114',
    name: 'Rajesh Kumar',
    district: 'Bhopal',
    cohortId: 'cohort-2026-01',
    gender: 'Male',
    education: 'Diploma Electrical',
    targetCareer: 'Electrical Maintenance Technician',
    courseId: 'course-elec-maint',
    courseCompleted: true,
    assessmentScore: 8,
    attendance: 89,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹3–5 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Highly relevant'
  },
  {
    id: 'lrn-115',
    name: 'Nandini Das',
    district: 'Bengaluru',
    cohortId: 'cohort-2026-04',
    gender: 'Female',
    education: 'B.Tech Information Science',
    targetCareer: 'Backend Developer',
    courseId: 'course-dbms-adv',
    courseCompleted: true,
    assessmentScore: 9,
    attendance: 93,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹7–10 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Highly relevant'
  },
  {
    id: 'lrn-116',
    name: 'Akash Gupta',
    district: 'Lucknow',
    cohortId: 'cohort-2026-01',
    gender: 'Male',
    education: 'B.Sc Computer Science',
    targetCareer: 'Data Analyst',
    courseId: 'course-legacy-db2',
    courseCompleted: true,
    assessmentScore: 5,
    attendance: 78,
    employmentStatus: 'Unemployed',
    unemployedReason: 'Could not meet company requirements (Legacy tech gap)',
    verificationSource: 'Self-reported',
    wageBand: 'Below ₹2 LPA',
    retention6m: 'Unemployed',
    trainingRelevance: 'Not relevant',
    feedback: 'Legacy DB2 course had few job openings; had to self-learn PostgreSQL.'
  },
  {
    id: 'lrn-117',
    name: 'Swati Pillai',
    district: 'Coimbatore',
    cohortId: 'cohort-2026-04',
    gender: 'Female',
    education: 'B.E. Electronics & Instrumentation',
    targetCareer: 'Embedded / Hardware Specialist',
    courseId: 'course-elec-maint',
    courseCompleted: true,
    assessmentScore: 9,
    attendance: 94,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹5–7 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Highly relevant'
  },
  {
    id: 'lrn-118',
    name: 'Gaurav Yadav',
    district: 'Jaipur',
    cohortId: 'cohort-2026-04',
    gender: 'Male',
    education: 'ITI Electrician',
    targetCareer: 'Electrical Technician',
    courseId: 'course-elec-safety',
    courseCompleted: true,
    assessmentScore: 7,
    attendance: 91,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹2–3 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Relevant'
  },
  {
    id: 'lrn-119',
    name: 'Pooja Reddy',
    district: 'Bengaluru',
    cohortId: 'cohort-2026-01',
    gender: 'Female',
    education: 'B.Tech CSE',
    targetCareer: 'Software Developer',
    courseId: 'course-dsa-applied',
    courseCompleted: true,
    assessmentScore: 8,
    attendance: 88,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹5–7 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Highly relevant'
  },
  {
    id: 'lrn-120',
    name: 'Naveen Choudhary',
    district: 'Bhopal',
    cohortId: 'cohort-2026-04',
    gender: 'Male',
    education: 'Diploma Electrical',
    targetCareer: 'Electrical Maintenance Technician',
    courseId: 'course-elec-maint',
    courseCompleted: true,
    assessmentScore: 8,
    attendance: 90,
    employmentStatus: 'Employed',
    verificationSource: 'Self-reported',
    wageBand: '₹3–5 LPA',
    retention6m: 'Employed',
    trainingRelevance: 'Highly relevant'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    title: 'New Course Content Update',
    message: 'You completed Relational Fundamentals earlier. New industry-relevant PostgreSQL 16 & Partitioning content is now available.',
    date: 'Today, 10:30 AM',
    read: false,
    action: 'VIEW UPDATE',
    type: 'curriculum_update'
  },
  {
    id: 'notif-2',
    title: 'Longitudinal Follow-up Ready',
    message: 'Your 2-month career retention check-in is due. Share your current employment update in 2 clicks.',
    date: 'Yesterday',
    read: false,
    action: 'UPDATE STATUS',
    type: 'followup'
  },
  {
    id: 'notif-3',
    title: 'Personalized Recommendation',
    message: 'Based on your DSA assessment gap in Graph Algorithms, we recommend "Applied Data Structures".',
    date: '3 days ago',
    read: true,
    action: 'EXPLORE COURSE',
    type: 'recommendation'
  }
];
