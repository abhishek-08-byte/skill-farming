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
    employmentRate: 38,
    isFree: true,
    fee: 0
  },
  {
    id: 'course-cloud-sys',
    title: 'Cloud Systems & API Architecture',
    provider: 'Apex Institute of Technology',
    providerId: 'prov-apex',
    skill: 'Backend',
    skillId: 'backend',
    difficulty: 'Intermediate',
    duration: '8 Weeks (64 Hours)',
    trainingMode: 'Online',
    tag: 'Cloud & APIs',
    tagColor: 'purple',
    rating: 4.8,
    marketRelevance: 'High',
    marketRelevanceStatus: 'High',
    description: 'Design resilient microservice APIs, configure Docker container runtimes, implement JWT auth pipelines, and configure Redis caching layers.',
    skillsCovered: ['REST API Design', 'Docker & Containers', 'Redis Caching', 'System Design', 'JWT Security'],
    prerequisites: 'Basic JavaScript/Node.js or Python backend fundamentals.',
    learningOutcomes: [
      'Architect RESTful APIs with input validation and rate limiting',
      'Deploy containerized backend microservices with Docker compose',
      'Integrate Redis caching to reduce database query loads by 70%'
    ],
    gapAddressed: 'Cloud APIs, Dockerization, Distributed Caching',
    recommendationReason: 'Crucial for modern high-throughput backend and cloud engineering positions.',
    modulesCount: 8,
    enrolledCount: 480,
    completionRate: 85,
    employmentRate: 88,
    isFree: true,
    fee: 0
  },
  {
    id: 'course-fullstack-mern',
    title: 'Modern Full-Stack Web Development',
    provider: 'National Skill Academy',
    providerId: 'prov-nsa',
    skill: 'Full Stack',
    skillId: 'fullstack',
    difficulty: 'Intermediate',
    duration: '12 Weeks (96 Hours)',
    trainingMode: 'Online',
    tag: 'Web & UI',
    tagColor: 'teal',
    rating: 4.9,
    marketRelevance: 'High',
    marketRelevanceStatus: 'High',
    description: 'Full stack development with React 19, Node.js, Express, and PostgreSQL/MongoDB. Build accessible responsive SPAs with state management and live API feeds.',
    skillsCovered: ['React.js', 'Node.js', 'DBMS', 'Git & Version Control', 'REST API Design'],
    prerequisites: 'HTML, CSS and JavaScript essentials.',
    learningOutcomes: [
      'Build responsive, mobile-first SPAs using React and modern CSS',
      'Develop authenticated RESTful backend APIs with relational data stores',
      'Deploy full-stack web applications with zero downtime pipelines'
    ],
    gapAddressed: 'Frontend State Management, Full Stack Integration, REST APIs',
    recommendationReason: 'Core qualification for Full Stack Web Developer job roles across private enterprise.',
    modulesCount: 12,
    enrolledCount: 890,
    completionRate: 87,
    employmentRate: 86,
    isFree: true,
    fee: 0
  },
  {
    id: 'course-python-data',
    title: 'Python for Data Engineering & Analytics',
    provider: 'National Skill Academy',
    providerId: 'prov-nsa',
    skill: 'Data Science',
    skillId: 'data-science',
    difficulty: 'Moderate',
    duration: '8 Weeks (64 Hours)',
    trainingMode: 'Online',
    tag: 'Data',
    tagColor: 'amber',
    rating: 4.7,
    marketRelevance: 'High',
    marketRelevanceStatus: 'High',
    description: 'Learn Python for data processing, pandas aggregations, NumPy matrix operations, SQL extraction pipelines, and automated business reporting.',
    skillsCovered: ['Python', 'DBMS', 'Data Structures', 'Statistical Modeling'],
    prerequisites: 'Basic math and logical thinking.',
    learningOutcomes: [
      'Manipulate complex tabular datasets with pandas and NumPy',
      'Write ETL pipelines extracting data from relational databases into analytical warehouses',
      'Generate interactive visual analytics dashboards'
    ],
    gapAddressed: 'Data Wrangling, Analytical Queries, Statistical Computation',
    recommendationReason: 'Prepares learners for Data Analyst and Junior Data Engineer opportunities.',
    modulesCount: 8,
    enrolledCount: 620,
    completionRate: 84,
    employmentRate: 81,
    isFree: true,
    fee: 0
  },
  {
    id: 'course-devops-k8s',
    title: 'DevOps Pipelines & Kubernetes Cloud Architecture',
    provider: 'Apex Institute of Technology',
    providerId: 'prov-apex',
    skill: 'DevOps',
    skillId: 'devops',
    difficulty: 'Advanced',
    duration: '10 Weeks (80 Hours)',
    trainingMode: 'Hybrid',
    tag: 'Cloud & Infra',
    tagColor: 'blue',
    rating: 4.8,
    marketRelevance: 'High',
    marketRelevanceStatus: 'High',
    description: 'CI/CD automation with GitHub Actions, container orchestration with Kubernetes, Linux kernel troubleshooting, and infrastructure as code.',
    skillsCovered: ['Docker & Containers', 'Kubernetes', 'AWS Cloud', 'CI/CD Pipelines', 'Linux Administration'],
    prerequisites: 'Familiarity with Linux command line and Docker basics.',
    learningOutcomes: [
      'Deploy and scale multi-node Kubernetes clusters with rolling updates',
      'Construct automated CI/CD build and test pipelines',
      'Implement cloud monitoring and Prometheus telemetry alerts'
    ],
    gapAddressed: 'Container Orchestration, CI/CD Automation, Cloud Infrastructure',
    recommendationReason: 'Targeted for high-demand Cloud & DevOps Engineer roles.',
    modulesCount: 10,
    enrolledCount: 340,
    completionRate: 89,
    employmentRate: 91,
    isFree: true,
    fee: 0
  },
  {
    id: 'course-iot-embedded',
    title: 'Embedded Systems & IoT Edge Automation',
    provider: 'Bharat Vocational Works',
    providerId: 'prov-bvw',
    skill: 'Embedded & IoT',
    skillId: 'embedded',
    difficulty: 'Intermediate',
    duration: '8 Weeks (64 Hours)',
    trainingMode: 'Offline',
    tag: 'Hardware & IoT',
    tagColor: 'emerald',
    rating: 4.6,
    marketRelevance: 'High',
    marketRelevanceStatus: 'High',
    description: 'Program microcontrollers with Embedded C, interface analog sensors, configure MQTT telemetry over Wi-Fi/BLE, and integrate industrial PLC controllers.',
    skillsCovered: ['Embedded C', 'IoT Sensors', 'Electrical Works', 'PLC Programming'],
    prerequisites: 'Basic electrical circuit knowledge.',
    learningOutcomes: [
      'Write interrupt-driven firmware for ARM Cortex and ESP32 microcontrollers',
      'Transmit industrial sensor data securely using MQTT protocols',
      'Diagnose sensor signal noise and calibrate ADC inputs'
    ],
    gapAddressed: 'Firmware Development, Sensor Interfacing, Edge Computing',
    recommendationReason: 'Ideal for Embedded Systems and Smart Industrial Automation roles.',
    modulesCount: 8,
    enrolledCount: 230,
    completionRate: 83,
    employmentRate: 80,
    isFree: true,
    fee: 0
  }
];

export const ROLE_SKILL_COURSE_MAPPING = {
  'Backend Developer': {
    domain: 'Software & Cloud',
    requiredSkills: ['DBMS', 'DSA', 'REST API Design', 'System Design'],
    recommendedCourseIds: ['course-dbms-adv', 'course-dsa-applied', 'course-cloud-sys'],
    avgSalary: '₹6–10 LPA',
    marketDemand: 'Very High'
  },
  'Full Stack Web Developer': {
    domain: 'Full Stack & Web Architecture',
    requiredSkills: ['React.js', 'Node.js', 'DBMS', 'REST API Design', 'Git & Version Control'],
    recommendedCourseIds: ['course-fullstack-mern', 'course-dbms-adv', 'course-dsa-applied'],
    avgSalary: '₹5.5–9 LPA',
    marketDemand: 'Very High'
  },
  'Cloud & DevOps Engineer': {
    domain: 'Cloud & Infrastructure',
    requiredSkills: ['Docker & Containers', 'Kubernetes', 'AWS Cloud', 'CI/CD Pipelines', 'Linux Administration'],
    recommendedCourseIds: ['course-devops-k8s', 'course-cloud-sys'],
    avgSalary: '₹7–12 LPA',
    marketDemand: 'High'
  },
  'Data Analyst / ML Specialist': {
    domain: 'Data Science & Machine Learning',
    requiredSkills: ['Python', 'DBMS', 'Data Structures', 'Statistical Modeling'],
    recommendedCourseIds: ['course-python-data', 'course-dbms-adv'],
    avgSalary: '₹5–8 LPA',
    marketDemand: 'High'
  },
  'Embedded Systems / IoT Engineer': {
    domain: 'Hardware & Embedded',
    requiredSkills: ['Embedded C', 'IoT Sensors', 'Electrical Works', 'PLC Programming'],
    recommendedCourseIds: ['course-iot-embedded', 'course-elec-maint'],
    avgSalary: '₹4.5–7.5 LPA',
    marketDemand: 'High'
  },
  'Electrical Maintenance Technician': {
    domain: 'Industrial Automation & Power',
    requiredSkills: ['Electrical Works', 'Star-Delta Wiring', 'LOTO Safety', 'Industrial Motor Control'],
    recommendedCourseIds: ['course-elec-maint', 'course-elec-safety'],
    avgSalary: '₹3.5–5.5 LPA',
    marketDemand: 'High'
  },
  'Other': {
    domain: 'Custom Career Pathway',
    requiredSkills: ['DBMS', 'DSA', 'Git & Version Control'],
    recommendedCourseIds: ['course-fullstack-mern', 'course-dbms-fund'],
    avgSalary: 'Market Competitive',
    marketDemand: 'Flexible'
  }
};

export const PROVIDERS = [
  {
    id: 'prov-apex',
    name: 'Maharashtra State Skill Development Society (MSSDS Center)',
    type: 'State Directorate Training Hub',
    location: 'Pune & Mumbai',
    established: 2018,
    activeBatches: 8,
    totalTrained: 3240,
    overallCompletionRate: 88,
    employmentConversionRate: 84,
    sixMonthRetentionRate: 81,
    status: 'High Performer',
    rating: 4.9
  },
  {
    id: 'prov-nsa',
    name: 'Government Polytechnic Skill Center (GPP)',
    type: 'Government-Affiliated Polytechnic',
    location: 'Pune & Nashik',
    established: 2016,
    activeBatches: 6,
    totalTrained: 2650,
    overallCompletionRate: 85,
    employmentConversionRate: 80,
    sixMonthRetentionRate: 77,
    status: 'High Performer',
    rating: 4.8
  },
  {
    id: 'prov-bvw',
    name: 'COEP & VNIT Vocational Innovation Center',
    type: 'State Technical University Hub',
    location: 'Pune & Nagpur',
    established: 2019,
    activeBatches: 7,
    totalTrained: 1980,
    overallCompletionRate: 91,
    employmentConversionRate: 87,
    sixMonthRetentionRate: 84,
    status: 'High Performer',
    rating: 4.9
  },
  {
    id: 'prov-mth',
    name: 'Western Maharashtra Vocational Hub',
    type: 'District Vocational Center',
    location: 'Chhatrapati Sambhajinagar & Solapur',
    established: 2021,
    activeBatches: 5,
    totalTrained: 1450,
    overallCompletionRate: 86,
    employmentConversionRate: 78,
    sixMonthRetentionRate: 74,
    status: 'Standard',
    statusNote: 'Active recruitment partnerships with local MIDC industrial clusters.',
    rating: 4.6
  }
];

export const DISTRICTS = [
  {
    id: 'dist-pune',
    name: 'Pune',
    division: 'Pune Division',
    state: 'Maharashtra',
    enrolled: 4850,
    completed: 4210,
    completionRate: 87,
    employed: 3578,
    employmentConversion: 85,
    retentionRate: 82,
    avgWageBand: '₹5–8 LPA',
    topSector: 'IT, Software Engineering & Automobile'
  },
  {
    id: 'dist-mumbai-sub',
    name: 'Mumbai Suburban',
    division: 'Konkan Division',
    state: 'Maharashtra',
    enrolled: 5420,
    completed: 4650,
    completionRate: 86,
    employed: 4045,
    employmentConversion: 87,
    retentionRate: 84,
    avgWageBand: '₹6–9 LPA',
    topSector: 'FinTech, Cloud Systems & Logistics'
  },
  {
    id: 'dist-mumbai-city',
    name: 'Mumbai City',
    division: 'Konkan Division',
    state: 'Maharashtra',
    enrolled: 3950,
    completed: 3435,
    completionRate: 87,
    employed: 2988,
    employmentConversion: 87,
    retentionRate: 85,
    avgWageBand: '₹6–10 LPA',
    topSector: 'Financial Services, Data & Media'
  },
  {
    id: 'dist-nagpur',
    name: 'Nagpur',
    division: 'Vidarbha Division',
    state: 'Maharashtra',
    enrolled: 3120,
    completed: 2680,
    completionRate: 86,
    employed: 2224,
    employmentConversion: 83,
    retentionRate: 80,
    avgWageBand: '₹4–7 LPA',
    topSector: 'MIHAN SEZ, Logistics & Aerospace Tech'
  },
  {
    id: 'dist-nashik',
    name: 'Nashik',
    division: 'Nashik Division',
    state: 'Maharashtra',
    enrolled: 2650,
    completed: 2305,
    completionRate: 87,
    employed: 1867,
    employmentConversion: 81,
    retentionRate: 78,
    avgWageBand: '₹4–6 LPA',
    topSector: 'Automotive, Electrical & Agri-Tech'
  },
  {
    id: 'dist-csn',
    name: 'Chhatrapati Sambhajinagar',
    division: 'Marathwada Division',
    state: 'Maharashtra',
    enrolled: 2240,
    completed: 1926,
    completionRate: 86,
    employed: 1540,
    employmentConversion: 80,
    retentionRate: 76,
    avgWageBand: '₹3.5–6 LPA',
    topSector: 'Auto Components, Pharma & Industrial Automation'
  },
  {
    id: 'dist-thane',
    name: 'Thane',
    division: 'Konkan Division',
    state: 'Maharashtra',
    enrolled: 3480,
    completed: 3027,
    completionRate: 87,
    employed: 2542,
    employmentConversion: 84,
    retentionRate: 81,
    avgWageBand: '₹4.5–7.5 LPA',
    topSector: 'Industrial Electronics, IT & Specialty Chemicals'
  },
  {
    id: 'dist-kolhapur',
    name: 'Kolhapur',
    division: 'Pune Division',
    state: 'Maharashtra',
    enrolled: 1890,
    completed: 1663,
    completionRate: 88,
    employed: 1330,
    employmentConversion: 80,
    retentionRate: 77,
    avgWageBand: '₹3.5–5.5 LPA',
    topSector: 'Foundry, Precision Engineering & Sugar Tech'
  },
  {
    id: 'dist-solapur',
    name: 'Solapur',
    division: 'Pune Division',
    state: 'Maharashtra',
    enrolled: 1720,
    completed: 1479,
    completionRate: 86,
    employed: 1124,
    employmentConversion: 76,
    retentionRate: 72,
    avgWageBand: '₹3–5 LPA',
    topSector: 'Textiles, Solar Power & Precision Machinery'
  },
  {
    id: 'dist-amravati',
    name: 'Amravati',
    division: 'Vidarbha Division',
    state: 'Maharashtra',
    enrolled: 1540,
    completed: 1324,
    completionRate: 86,
    employed: 993,
    employmentConversion: 75,
    retentionRate: 71,
    avgWageBand: '₹3–4.8 LPA',
    topSector: 'Textile Hub, Renewable Energy & Hardware'
  },
  {
    id: 'dist-nanded',
    name: 'Nanded',
    division: 'Marathwada Division',
    state: 'Maharashtra',
    enrolled: 1380,
    completed: 1173,
    completionRate: 85,
    employed: 868,
    employmentConversion: 74,
    retentionRate: 69,
    avgWageBand: '₹2.8–4.5 LPA',
    topSector: 'Agri-Processing, IT Services & Infrastructure'
  },
  {
    id: 'dist-satara',
    name: 'Satara',
    division: 'Pune Division',
    state: 'Maharashtra',
    enrolled: 1260,
    completed: 1096,
    completionRate: 87,
    employed: 865,
    employmentConversion: 79,
    retentionRate: 75,
    avgWageBand: '₹3–5 LPA',
    topSector: 'Automotive Forging & Food Processing'
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
  lastActiveAt: '2026-04-28T09:30:00.000Z',
  leaderboardStatus: 'RECOVERY_IN_PROGRESS',
  leaderboardPoints: 850,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  quote: 'The beautiful thing about learning is that no one can take it away from you.',
  // Formal Study / Training Location (Mandatory: labeled as Study/Training Location, not residential)
  studyLocation: {
    institution: 'Government College of Engineering, Pune (COEP)',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Pune'
  },
  targetRole: 'Full Stack Web Developer',
  customTargetRole: '',
  targetWage: 650000,
  targetWageFormatted: '₹6.5 LPA',
  verificationStatus: 'VERIFIED',
  digiLockerLinked: true,
  digiLockerId: 'DL-2026-MH-99481',
  savedJobIds: ['job-pvt-01', 'job-gov-01'],
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
      enrollmentId: 'ENR-2026-08821',
      isFree: true,
      fee: 0,
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
      enrollmentId: 'ENR-2026-09413',
      isFree: true,
      fee: 0,
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
      enrollmentId: 'ENR-2026-10245',
      isFree: true,
      fee: 0,
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
      enrollmentId: 'ENR-2026-11890',
      isFree: true,
      fee: 0,
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
  id: 'recruiter-anand',
  role: 'employer',
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
  deptName: 'Department of Skills, Employment, Entrepreneurship & Innovation (कौशल्य, रोजगार, उद्योजकता आणि नाविन्यता विभाग)',
  ministry: 'Government of Maharashtra (महाराष्ट्र शासन) • MSSDS & Mahaswayam',
  govLevel: 'State Government of Maharashtra',
  website: 'https://mahaswayam.gov.in',
  sealLogo: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=150&auto=format&fit=crop&q=80',
  mission: 'Catalyzing industry-aligned vocational training, standardized psychometric skill assessments, and long-term career retention across all 36 districts of Maharashtra under MSSDS and Mahaswayam.',
  jurisdictionRegion: 'State of Maharashtra (All 6 Administrative Divisions: Konkan, Pune, Nashik, Chhatrapati Sambhajinagar, Amravati, Nagpur)',
  coveredDistricts: 'Pune, Mumbai Suburban, Mumbai City, Nagpur, Nashik, Chhatrapati Sambhajinagar, Thane, Kolhapur, Solapur, Amravati, Nanded, Satara, Jalgaon, Chandrapur (All 36 Districts)',
  hqCountry: 'India',
  hqState: 'Maharashtra',
  hqCity: 'Mantralaya, Mumbai',
  hqPincode: '400032',
  nodalOfficerName: 'Dr. Rameshwar V. Shinde, IAS',
  nodalOfficerRank: 'Principal Secretary & Commissioner, Skills, Employment & Innovation, Govt. of Maharashtra',
  officialEmail: 'commissioner.skill@maharashtra.gov.in',
  officialPhone: '+91 22 2202 5411',
  serviceId: 'IAS-MH-2009-8812',
  sponsoredSchemes: [
    {
      id: 'scheme-1',
      name: 'Pramod Mahajan Kaushalya Vikas Abhiyan (PMKVA) - Maharashtra',
      targetDemographic: 'Maharashtra Youth across 36 Districts (18-35 yrs)',
      focusArea: 'Industry 4.0, Electrical, IT, Agro-Tech & Advanced Manufacturing',
      budget: '₹245 Crores',
      activeBatches: '180 Batches across 36 Districts',
      targetBeneficiaries: '50,000 Candidates / FY'
    },
    {
      id: 'scheme-2',
      name: 'Mukhyamantri Yuva Karya Prashikshan Yojana (CM Youth Apprenticeship)',
      targetDemographic: 'Fresh Engineering, ITI & Polytechnic Graduates of Maharashtra',
      focusArea: 'Industrial Apprenticeship & Direct Corporate Onboarding',
      budget: '₹180 Crores',
      activeBatches: '140 Batches across MIDC Zones',
      targetBeneficiaries: '40,000 Candidates / FY'
    },
    {
      id: 'scheme-3',
      name: 'Maharashtra State Innovation & Startup Mission (MSINS) Skilling Cell',
      targetDemographic: 'Aspiring Developers, Women in Tech & Backward Classes',
      focusArea: 'Software Development, AI/ML, Cloud Systems & Robotics',
      budget: '₹95 Crores',
      activeBatches: '65 Batches',
      targetBeneficiaries: '20,000 Candidates / FY'
    }
  ],
  prioritySectors: 'IT & Software, Automotive (MIDC Pune/Nashik/Chhatrapati Sambhajinagar), Industrial Electrical, Logistics (MIHAN Nagpur), Precision Engineering (Kolhapur)',
  targetAnnualBeneficiaries: '1,10,000 Youth',
  partnerInstitutionTypes: 'Government Polytechnic Colleges, Government ITIs, COEP, VJTI, VNIT, Industry Skill Hubs',
  targetEmploymentRate: '86% Placement with 80%+ 6-Month Wage Retention',
  authorizedDeclaration: true,
  govOrderDocUrl: 'https://maharashtra.gov.in/gazette/GR-2026-MAHA-SKILL-412.pdf'
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
  'Automation Specialist',
  'Other'
];

export const calculateProfileCompletion = (role, data = {}) => {
  if (role === 'learner') {
    const checks = [
      { id: 'name', label: 'Full Name', step: 1, pass: Boolean(data.name?.trim()) },
      { id: 'email', label: 'Email Address', step: 1, pass: Boolean(data.email?.trim()) },
      { id: 'phone', label: 'Phone Number', step: 1, pass: Boolean(data.phone?.trim()) },
      { id: 'headline', label: 'Professional Headline', step: 1, pass: Boolean(data.headline?.trim()) },
      { id: 'location', label: 'City & State', step: 2, pass: Boolean(data.city?.trim() || data.location?.trim()) },
      { id: 'studyLocation', label: 'Study / Training Location', step: 2, pass: Boolean((data.studyLocation && data.studyLocation.institution?.trim()) || data.education?.institution?.trim()) },
      { id: 'workMode', label: 'Preferred Work Mode', step: 2, pass: Boolean(data.preferredWorkMode) },
      { id: 'education', label: 'Education Degree & College', step: 3, pass: Boolean((data.educations && data.educations.length > 0 && data.educations[0].degree?.trim()) || data.education?.degree?.trim()) },
      { id: 'careerRole', label: 'Target Career Role', step: 4, pass: Boolean(data.targetRole?.trim() || data.career?.targetCareerId || data.careerProfile?.targetRole) },
      { id: 'targetWage', label: 'Target Annual Wage', step: 4, pass: Boolean(data.targetWage || data.careerProfile?.salaryExpectation) },
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

  if (role === 'employer' || (role === 'institution' && data.subType === 'employer')) {
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
  }

  if (role === 'institution') {
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
    district: 'Mumbai Suburban',
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
    district: 'Nashik',
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
    district: 'Chhatrapati Sambhajinagar',
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
    district: 'Thane',
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
    district: 'Nagpur',
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
    district: 'Mumbai City',
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
    district: 'Nashik',
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
    district: 'Kolhapur',
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
    district: 'Solapur',
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
    district: 'Mumbai Suburban',
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
    district: 'Amravati',
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
    district: 'Thane',
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
    district: 'Nanded',
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
    district: 'Mumbai Suburban',
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
    district: 'Satara',
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

// ==========================================
// JOB MARKETPLACE & EMPLOYER PORTAL DATA
// ==========================================

export const INITIAL_JOBS = [
  // --- PRIVATE TECH & CORE INDUSTRY ---
  {
    id: 'job-pvt-01',
    type: 'private',
    category: 'Software & Cloud',
    title: 'Junior Backend Engineer',
    company: 'InfraCloud Technologies',
    logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&auto=format&fit=crop&q=80',
    location: 'Bengaluru, Karnataka (Hybrid)',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    employmentType: 'Full-time',
    salaryRange: '₹6.5 – ₹8.5 LPA',
    minSalary: 650000,
    maxSalary: 850000,
    experienceLevel: 'Entry-level (0-2 yrs)',
    postedAt: '2026-04-26',
    applicationDeadline: '2026-05-30',
    requiredSkills: ['DBMS', 'DSA', 'REST API Design', 'PostgreSQL'],
    description: 'Join our cloud infrastructure backend team to design high-throughput microservices, optimize database connection pools, and manage distributed transaction integrity.',
    responsibilities: [
      'Implement REST and gRPC service endpoints handling 5,000+ RPS.',
      'Write optimized relational database schemas and indexed SQL queries adhering to leftmost prefix guidelines.',
      'Collaborate with DevOps teams on containerized Docker deployments and automated test suites.'
    ],
    eligibility: 'B.Tech / B.E. in CS/IT/ECE or equivalent vocational certification with hands-on relational schema design.',
    selectionProcess: [
      'Resume / Skill Screening',
      'Automated Skill Assessment (DBMS & DSA)',
      'Technical Architecture Interview',
      'Culture & Offer Discussion'
    ],
    openings: 8,
    appliedCount: 42,
    recruiterContact: 'Anand Kulkarni (Director of Talent Acquisition)',
    corporateExamRequired: true,
    examTitle: 'Backend Architecture & SQL Concurrency Benchmark'
  },
  {
    id: 'job-pvt-02',
    type: 'private',
    category: 'Software & Cloud',
    title: 'Full Stack Web Developer',
    company: 'Nexlify Systems Pvt Ltd',
    logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=120&auto=format&fit=crop&q=80',
    location: 'Pune, Maharashtra (On-site)',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Pune',
    employmentType: 'Full-time',
    salaryRange: '₹5.5 – ₹7.5 LPA',
    minSalary: 550000,
    maxSalary: 750000,
    experienceLevel: 'Fresher / 0-1 yr',
    postedAt: '2026-04-28',
    applicationDeadline: '2026-06-15',
    requiredSkills: ['React.js', 'Node.js', 'DBMS', 'Git & Version Control'],
    description: 'We are seeking passionate Full Stack Developers to engineer reactive dashboards, real-time telemetry interfaces, and robust server APIs.',
    responsibilities: [
      'Develop modern client components with React and state synchronization.',
      'Construct scalable Node.js microservices with relational database connectors.',
      'Ensure 100% test coverage for mission-critical customer workflows.'
    ],
    eligibility: 'Degree/Diploma in Engineering or Computer Applications. Solid portfolio demonstrating full-stack projects.',
    selectionProcess: ['Portfolio Review', 'Take-home Full-Stack Test', 'Technical Interview', 'HR Discussion'],
    openings: 5,
    appliedCount: 68,
    recruiterContact: 'Neha Deshmukh (Head of People Ops)',
    corporateExamRequired: true,
    examTitle: 'Full-Stack Rapid Implementation Test'
  },
  {
    id: 'job-pvt-03',
    type: 'private',
    category: 'Hardware & Industrial',
    title: 'Electrical Systems Maintenance Engineer',
    company: 'Thermax Industrial Solutions',
    logo: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&auto=format&fit=crop&q=80',
    location: 'Pune, Maharashtra (Plant Site)',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Pune',
    employmentType: 'Full-time',
    salaryRange: '₹4.2 – ₹6.0 LPA',
    minSalary: 420000,
    maxSalary: 600000,
    experienceLevel: 'Entry to Mid-level (1-3 yrs)',
    postedAt: '2026-04-25',
    applicationDeadline: '2026-05-25',
    requiredSkills: ['Electrical Works', 'Star-Delta Wiring', 'LOTO Safety', 'Industrial Motor Control'],
    description: 'Oversee plant electrical distribution grids, execute preventive maintenance on 3-phase induction drives, and manage power factor correction banks.',
    responsibilities: [
      'Maintain continuous uptime of 415V 3-phase plant motor control centers.',
      'Execute OSHA Lock-Out / Tag-Out safety drills across production lines.',
      'Eliminate harmonic power distortions and balance phase loads.'
    ],
    eligibility: 'Diploma / Degree in Electrical Engineering / ITI Electrician with verified safety certifications.',
    selectionProcess: ['Technical Screening', 'Practical Panel Wiring Test', 'Plant Safety Interview'],
    openings: 4,
    appliedCount: 19,
    recruiterContact: 'Suresh Patil (Plant HR Manager)',
    corporateExamRequired: true,
    examTitle: 'Industrial Circuitry & Protection Practical Exam'
  },
  {
    id: 'job-pvt-04',
    type: 'private',
    category: 'Software & Cloud',
    title: 'Cloud DevOps & Site Reliability Engineer',
    company: 'Apex Cloud Systems',
    logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80',
    location: 'Bengaluru, Karnataka (Remote Pan-India)',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    employmentType: 'Full-time',
    salaryRange: '₹7.5 – ₹11.0 LPA',
    minSalary: 750000,
    maxSalary: 1100000,
    experienceLevel: '1-3 yrs',
    postedAt: '2026-04-27',
    applicationDeadline: '2026-06-20',
    requiredSkills: ['Docker & Containers', 'Kubernetes', 'AWS Cloud', 'CI/CD Pipelines'],
    description: 'Automate multi-cluster Kubernetes deployments, monitor system latency, configure cloud security VPCs, and build developer self-service automation.',
    responsibilities: [
      'Maintain Kubernetes clusters in production across multi-region VPCs.',
      'Author robust CI/CD deployment pipelines using GitHub Actions.',
      'Monitor production SLIs/SLOs and implement automated self-healing triggers.'
    ],
    eligibility: 'B.Tech/BCA/B.Sc CS with practical experience in Linux administration and container management.',
    selectionProcess: ['System Admin Test', 'Live Container Troubleshooting Simulation', 'Leadership Review'],
    openings: 3,
    appliedCount: 34,
    recruiterContact: 'Anand Kulkarni',
    corporateExamRequired: true,
    examTitle: 'Kubernetes Cluster Architecture & Troubleshooting'
  },

  // --- GOVERNMENT TECHNICAL RECRUITMENTS (OFFICIAL) ---
  {
    id: 'job-gov-01',
    type: 'government',
    subType: 'technical',
    category: 'Govt Technical & Research',
    title: 'Scientific Assistant / Technical Officer (Data & Systems)',
    company: 'National Informatics Centre (NIC) / MeitY',
    department: 'Ministry of Electronics and Information Technology, Govt. of India',
    logo: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=120&auto=format&fit=crop&q=80',
    location: 'New Delhi / Regional Data Centres Pan-India',
    state: 'National',
    district: 'Pan-India',
    employmentType: 'Central Govt (Permanent Pay Level 7)',
    salaryRange: '₹44,900 – ₹1,42,400 / month (Approx ₹7.2 LPA)',
    minSalary: 720000,
    maxSalary: 1420000,
    experienceLevel: 'Fresher Eligible (Ages 18-30)',
    postedAt: '2026-04-20',
    applicationDeadline: '2026-06-10',
    advtNumber: 'NIC/TECH/2026/04-A',
    requiredSkills: ['DBMS', 'DSA', 'PostgreSQL', 'Linux Administration'],
    description: 'Official Central Government technical recruitment for digital public infrastructure maintenance, citizen service database management, and high-security state data centres.',
    eligibility: 'B.E./B.Tech/MCA/M.Sc in Computer Science/IT/Electronics or NIELIT \'B\' Level with minimum 60% aggregate.',
    syllabus: 'Part A: Computer Architecture, Algorithms & Data Structures, RDBMS, SQL, Operating Systems, Networking. Part B: General Aptitude & Reasoning.',
    selectionProcess: [
      'National Computer-Based Screening Examination (CBT)',
      'Technical Skill Test & Verification',
      'Official Gazette Merit List Publication'
    ],
    openings: 45,
    appliedCount: 3820,
    examDate: '2026-07-15',
    admitCardRelease: '2026-07-01',
    officialPortalUrl: 'https://www.nic.in/recruitment',
    corporateExamRequired: false
  },
  {
    id: 'job-gov-02',
    type: 'government',
    subType: 'technical',
    category: 'Govt Technical & Research',
    title: 'Junior Engineer (Electrical & Signal Telecommunication)',
    company: 'Indian Railways (RRB Centralized Employment Notice)',
    department: 'Ministry of Railways, Govt. of India',
    logo: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=120&auto=format&fit=crop&q=80',
    location: 'Western & Central Railway Zones (Mumbai, Pune, Nagpur)',
    state: 'Maharashtra',
    district: 'Pune',
    employmentType: 'Central Govt (Pay Level 6)',
    salaryRange: '₹35,400 – ₹1,12,400 / month (Approx ₹5.8 LPA)',
    minSalary: 580000,
    maxSalary: 1120000,
    experienceLevel: 'Fresher / 0-2 yrs',
    postedAt: '2026-04-15',
    applicationDeadline: '2026-05-31',
    advtNumber: 'CEN-02/2026/RRB-JE',
    requiredSkills: ['Electrical Works', 'Star-Delta Wiring', 'LOTO Safety', 'Industrial Motor Control'],
    description: 'Technical maintenance of railway overhead traction power (25 kV AC), sub-station transformers, relay interlocking panels, and train speed signal telemetry.',
    eligibility: 'Three years Diploma in Electrical / Electronics Engineering or Bachelor of Engineering from a recognized AICTE institute.',
    syllabus: 'CBT-1: Mathematics, General Intelligence, General Awareness, General Science. CBT-2: Core Electrical Circuitry, Transformers, Switchgear, Safety Systems.',
    selectionProcess: [
      'CBT Stage 1 (Screening)',
      'CBT Stage 2 (Technical Domain)',
      'Document Verification & Medical Fitness Test'
    ],
    openings: 120,
    appliedCount: 5410,
    examDate: '2026-08-04',
    admitCardRelease: '2026-07-22',
    officialPortalUrl: 'https://rrbcdg.gov.in',
    corporateExamRequired: false
  },

  // --- GOVERNMENT NON-TECHNICAL RECRUITMENTS (OFFICIAL) ---
  {
    id: 'job-gov-03',
    type: 'government',
    subType: 'non_technical',
    category: 'Govt Administrative & Operations',
    title: 'Assistant Section Officer (Central Secretariat)',
    company: 'Staff Selection Commission (SSC CGL)',
    department: 'Department of Personnel and Training (DoPT), Govt. of India',
    logo: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=120&auto=format&fit=crop&q=80',
    location: 'New Delhi (Central Ministries)',
    state: 'Delhi',
    district: 'New Delhi',
    employmentType: 'Central Govt Group B (Non-Gazetted)',
    salaryRange: '₹44,900 – ₹1,42,400 / month (Pay Level 7)',
    minSalary: 720000,
    maxSalary: 1420000,
    experienceLevel: 'Bachelor Degree in Any Stream',
    postedAt: '2026-04-10',
    applicationDeadline: '2026-05-28',
    advtNumber: 'SSC-CGL/2026/NOTICE-01',
    requiredSkills: ['Data Structures', 'Statistical Modeling', 'Git & Version Control'],
    description: 'Administrative policy formulation support, inter-departmental note drafting, parliamentary question briefing files, and official e-Office docket workflows.',
    eligibility: 'Bachelor\'s degree from any recognized University in Arts, Science, Commerce or Engineering. Age: 20-30 years.',
    syllabus: 'Tier-1: General Intelligence, General Awareness, Quantitative Aptitude, English Comprehension. Tier-2: Mathematical Abilities, Reasoning, English, Computer Knowledge.',
    selectionProcess: [
      'Tier-1 Computer Based Examination',
      'Tier-2 Advanced Examination & Typing Test',
      'Document Verification & Ministry Allocation'
    ],
    openings: 850,
    appliedCount: 14200,
    examDate: '2026-09-12',
    admitCardRelease: '2026-09-01',
    officialPortalUrl: 'https://ssc.gov.in',
    corporateExamRequired: false
  },
  {
    id: 'job-gov-04',
    type: 'government',
    subType: 'non_technical',
    category: 'Govt Administrative & Operations',
    title: 'Inspector of Posts / Postal Operations Executive',
    company: 'Department of Posts, India Post',
    department: 'Ministry of Communications, Govt. of India',
    logo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=120&auto=format&fit=crop&q=80',
    location: 'Maharashtra Postal Circle (Pune & Rural Divisions)',
    state: 'Maharashtra',
    district: 'Pune',
    employmentType: 'Central Govt (Pay Level 7)',
    salaryRange: '₹44,900 – ₹1,42,400 / month',
    minSalary: 700000,
    maxSalary: 1400000,
    experienceLevel: 'Graduate in Any Discipline',
    postedAt: '2026-04-18',
    applicationDeadline: '2026-06-05',
    advtNumber: 'DOP/MAH/2026-RECRUIT',
    requiredSkills: ['DBMS', 'Git & Version Control'],
    description: 'Supervise Sub-Post Offices, inspect postal financial operations, promote India Post Payments Bank (IPPB) rural inclusion, and oversee citizen parcel deliveries.',
    eligibility: 'Bachelor\'s degree from a recognized Indian University. Proficiency in Marathi and English.',
    syllabus: 'Paper I: Postal Acts & Rules, Financial Handbook. Paper II: Constitution of India, General Knowledge, Reasoning.',
    selectionProcess: [
      'State Postal Competitive Exam',
      'Document Verification & Medical Checkup'
    ],
    openings: 32,
    appliedCount: 1950,
    examDate: '2026-08-20',
    admitCardRelease: '2026-08-05',
    officialPortalUrl: 'https://indiapost.gov.in',
    corporateExamRequired: false
  }
];

export const INITIAL_JOB_APPLICATIONS = [
  {
    id: 'app-001',
    jobId: 'job-pvt-01',
    candidateId: 'learner-talha',
    candidateName: 'Talha Jubayer',
    candidateEmail: 'talhajuba@gmail.com',
    candidatePhone: '+91 98765 43210',
    candidateLocation: 'Pune, Maharashtra',
    studyLocation: 'Government Tool Room & Training Centre (GT&TC), Bengaluru Urban',
    targetRole: 'Full Stack Web Developer',
    targetWage: '₹6.5 – ₹8.5 LPA',
    jobTitle: 'Junior Backend Engineer',
    company: 'InfraCloud Technologies',
    appliedDate: '2026-04-29',
    stage: 'Corporate Exam', // 'Under Review' | 'Shortlisted' | 'Corporate Exam' | 'Interview' | 'Selected'
    examScore: 92,
    examStatus: 'Completed (Score: 92/100)',
    interviewDate: '2026-05-08 14:00 IST',
    interviewLink: 'https://meet.infracloud.io/interview-talha-backend',
    recruiterNotes: 'Exceptional relational index scores and solid graph algorithm foundation. Recommended for round 2 architecture review.',
    matchScore: 94
  },
  {
    id: 'app-002',
    jobId: 'job-gov-01',
    candidateId: 'learner-talha',
    candidateName: 'Talha Jubayer',
    candidateEmail: 'talhajuba@gmail.com',
    candidatePhone: '+91 98765 43210',
    candidateLocation: 'Pune, Maharashtra',
    studyLocation: 'Government Tool Room & Training Centre (GT&TC), Bengaluru Urban',
    targetRole: 'Full Stack Web Developer',
    targetWage: '₹7.2 LPA (Pay Level 7)',
    jobTitle: 'Scientific Assistant / Technical Officer (Data & Systems)',
    company: 'National Informatics Centre (NIC) / MeitY',
    appliedDate: '2026-04-22',
    stage: 'Shortlisted',
    examScore: null,
    examStatus: 'Admit Card Generated (Exam: 15 July 2026)',
    interviewDate: null,
    interviewLink: null,
    recruiterNotes: 'Application verified by MeitY examination cell. Roll No: NIC-2026-MAH-8841.',
    matchScore: 88
  }
];

export const INITIAL_CHAT_MESSAGES = [
  {
    id: 'msg-1',
    conversationId: 'conv-infracloud-talha',
    jobId: 'job-pvt-01',
    senderId: 'recruiter-anand',
    senderName: 'Anand Kulkarni (InfraCloud)',
    senderRole: 'employer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    recipientId: 'learner-talha',
    text: 'Hello Talha! We reviewed your profile and verified DBMS credentials on Skill Farming. Your score in composite index optimization is outstanding.',
    timestamp: '2026-04-29T10:15:00Z',
    read: true
  },
  {
    id: 'msg-2',
    conversationId: 'conv-infracloud-talha',
    jobId: 'job-pvt-01',
    senderId: 'learner-talha',
    senderName: 'Talha Jubayer',
    senderRole: 'learner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    recipientId: 'recruiter-anand',
    text: 'Thank you Mr. Kulkarni! I have completed the hands-on modules in relational database isolation and look forward to discussing the role.',
    timestamp: '2026-04-29T10:18:00Z',
    read: true
  },
  {
    id: 'msg-3',
    conversationId: 'conv-infracloud-talha',
    jobId: 'job-pvt-01',
    senderId: 'recruiter-anand',
    senderName: 'Anand Kulkarni (InfraCloud)',
    senderRole: 'employer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    recipientId: 'learner-talha',
    text: 'Great. You scored 92/100 on the Corporate SQL benchmark. Our hiring team has scheduled a technical interview for May 8th at 2:00 PM IST.',
    timestamp: '2026-04-29T11:05:00Z',
    read: true
  }
];

export const calculateJobMatch = (job, learner) => {
  if (!job || !learner) return { score: 70, matchedSkills: [], missingSkills: [] };
  const learnerSkills = [
    ...(learner.selectedSkills || []),
    ...(learner.userSkills ? learner.userSkills.map(s => (typeof s === 'string' ? s : s.name || s.id)) : []),
    ...(learner.activeCourses ? learner.activeCourses.map(c => c.skill) : [])
  ].map(s => String(s).toLowerCase().trim());

  const required = job.requiredSkills || [];
  if (required.length === 0) return { score: 85, matchedSkills: [], missingSkills: [] };

  const matchedSkills = [];
  const missingSkills = [];

  required.forEach(skill => {
    const sLower = skill.toLowerCase();
    const isMatched = learnerSkills.some(ls => ls.includes(sLower) || sLower.includes(ls));
    if (isMatched) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const skillMatchPercent = Math.round((matchedSkills.length / required.length) * 70); // up to 70%
  let score = 20 + skillMatchPercent; // baseline 20% for education/profile verification

  // Location proximity bonus
  if (learner.studyLocation && job.district && learner.studyLocation.district && learner.studyLocation.district.toLowerCase().includes(job.district.toLowerCase())) {
    score += 10;
  } else if (learner.state && job.state && learner.state.toLowerCase() === job.state.toLowerCase()) {
    score += 5;
  }

  score = Math.min(98, Math.max(35, score));
  return { score, matchedSkills, missingSkills };
};

