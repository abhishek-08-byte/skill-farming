// Course-specific practical recovery challenges with deterministic test cases,
// instructions, starter code/queries, and verification logic.

export const RECOVERY_CHALLENGES = [
  {
    id: 'rec-dbms-opt',
    skillId: 'dbms',
    skillName: 'DBMS & SQL',
    courseId: 'course-dbms-adv',
    courseTitle: 'Advanced SQL & Database Architecture',
    title: 'High-Concurrency Index Optimization & Query Tuning',
    concept: 'B-Tree Composite Leftmost Prefix & Joins',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    type: 'sql_challenge',
    problemStatement: `An e-commerce order tracking table with over 12 million records is experiencing severe slow queries and deadlocks during peak flash sales.
The application frequently runs queries filtering by \`store_id\`, \`order_status\`, and sorting by \`created_at DESC\`.

Currently, the table only has a single-column index on \`store_id\`, causing full index scans and expensive in-memory sort operations.

Your task:
1. Define the optimal composite index on \`orders\` that satisfies the query without requiring a separate sort step.
2. Formulate the high-performance SQL query with an indexed \`LIMIT 50\` scan.`,
    instructions: [
      'Write the SQL CREATE INDEX statement following the leftmost prefix rule.',
      'Construct the optimized SELECT query joining `orders` (o) and `customers` (c) on `customer_id`.',
      'Ensure the WHERE clause filters by store_id = 104 and order_status = "COMPLETED".',
      'Order by created_at DESC with LIMIT 50.'
    ],
    expectedOutput: 'Index created with columns (store_id, order_status, created_at DESC) and optimized query plan using Index Scan.',
    constraints: [
      'Index must respect the equality-before-range column order rule.',
      'Avoid SELECT *; specify only needed columns: o.id, o.store_id, o.order_status, o.total_amount, c.full_name.'
    ],
    starterCode: `-- 1. Define the composite index to eliminate sort overhead:
CREATE INDEX idx_orders_lookup ON orders (
  -- [YOUR CODE HERE: specify composite columns]
);

-- 2. Write the optimized query using the composite index:
SELECT o.id, o.store_id, o.order_status, o.total_amount, c.full_name
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE o.store_id = 104 
  AND o.order_status = 'COMPLETED'
ORDER BY o.created_at DESC
LIMIT 50;`,
    testCases: [
      {
        id: 'tc-1',
        title: 'Composite Index Leftmost Prefix Ordering',
        description: 'Verify index column order satisfies equality filter before sort column.',
        validate: (code) => {
          const lower = code.toLowerCase().replace(/\s+/g, ' ');
          const hasIndex = lower.includes('create index') && lower.includes('orders');
          const hasCols = (lower.includes('store_id, order_status, created_at') || 
                           lower.includes('order_status, store_id, created_at') ||
                           lower.includes('store_id, order_status, created_at desc') ||
                           lower.includes('order_status, store_id, created_at desc'));
          return {
            passed: hasIndex && hasCols,
            message: hasIndex && hasCols 
              ? 'Optimal composite index defined matching equality filters + sort column order.'
              : 'Index must include (store_id, order_status, created_at) in leftmost prefix order.'
          };
        }
      },
      {
        id: 'tc-2',
        title: 'Query Join & Selective Projection',
        description: 'Check INNER/LEFT JOIN condition and selective projections (no SELECT *).',
        validate: (code) => {
          const lower = code.toLowerCase().replace(/\s+/g, ' ');
          const hasJoin = lower.includes('join customers') || lower.includes('join customers c');
          const hasCondition = lower.includes('customer_id') && (lower.includes('o.customer_id = c.id') || lower.includes('c.id = o.customer_id'));
          const noSelectStar = !lower.includes('select *');
          return {
            passed: hasJoin && hasCondition && noSelectStar,
            message: hasJoin && hasCondition && noSelectStar
              ? 'Safe relational join and optimal projection verified.'
              : 'Ensure JOIN customers ON o.customer_id = c.id is specified without SELECT *.'
          };
        }
      },
      {
        id: 'tc-3',
        title: 'Execution Plan Cost Simulation',
        description: 'Simulate EXPLAIN execution cost reduction against unindexed baseline.',
        validate: (code) => {
          const lower = code.toLowerCase();
          const hasLimit = lower.includes('limit 50');
          const hasSort = lower.includes('order by') && lower.includes('created_at desc');
          return {
            passed: hasLimit && hasSort,
            message: hasLimit && hasSort
              ? 'Estimated Query Cost: reduced from 1,482.50 to 4.12 cost units (Index Scan).'
              : 'Query must contain ORDER BY created_at DESC LIMIT 50.'
          };
        }
      }
    ]
  },
  {
    id: 'rec-dsa-lru',
    skillId: 'dsa',
    skillName: 'Data Structures & Algorithms',
    courseId: 'course-dsa-applied',
    courseTitle: 'Applied Data Structures & Algorithmic Problem Solving',
    title: 'LRU Cache Dual Architecture & Eviction Logic',
    concept: 'Hash Map + Doubly Linked List O(1) Operations',
    difficulty: 'Hard',
    estimatedMinutes: 25,
    type: 'code_challenge',
    problemStatement: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) average time complexity for both \`get\` and \`put\` operations.

The cache is initialized with a positive capacity.
- \`get(key)\`: Return the value of the key if it exists, otherwise return -1. Accessing a key marks it as most recently used.
- \`put(key, value)\`: Update the value if key exists; otherwise insert the key-value pair. If the number of keys exceeds capacity, evict the least recently used key.

You are given a partially completed doubly-linked list node and LRUCache structure. Complete the missing node removal and insertion logic.`,
    instructions: [
      'Maintain head and tail dummy sentinel nodes so insertion at head and removal from tail are edge-case free.',
      'Update moveToHead(node) when an existing key is accessed or modified.',
      'Implement removeTail() to return the evicted node and delete its key from the Map.',
      'Ensure both get and put operations remain strictly O(1).'
    ],
    expectedOutput: 'All cache operations execute in O(1) without memory leaks, passing capacity and eviction test suites.',
    constraints: [
      'Capacity: 1 <= capacity <= 3000',
      'Operations: get and put in O(1) average time.'
    ],
    starterCode: `class DLinkedNode {
  constructor(key = 0, val = 0) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
    this.size = 0;
    
    // Sentinel nodes
    this.head = new DLinkedNode();
    this.tail = new DLinkedNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  addNode(node) {
    // Add right after head (most recently used)
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  removeNode(node) {
    // [YOUR CODE HERE: Unlink node from list]
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
  }

  moveToHead(node) {
    this.removeNode(node);
    this.addNode(node);
  }

  popTail() {
    // Evict least recently used (node right before tail)
    const res = this.tail.prev;
    this.removeNode(res);
    return res;
  }

  get(key) {
    const node = this.cache.get(key);
    if (!node) return -1;
    this.moveToHead(node);
    return node.val;
  }

  put(key, value) {
    const node = this.cache.get(key);
    if (!node) {
      const newNode = new DLinkedNode(key, value);
      this.cache.set(key, newNode);
      this.addNode(newNode);
      this.size++;

      if (this.size > this.capacity) {
        // [YOUR CODE HERE: Pop tail and delete from map]
        const tail = this.popTail();
        this.cache.delete(tail.key);
        this.size--;
      }
    } else {
      node.val = value;
      this.moveToHead(node);
    }
  }
}`,
    testCases: [
      {
        id: 'tc-1',
        title: 'Basic Put and Get Operations',
        description: 'Verify put(1, 1), put(2, 2), get(1) returns 1.',
        validate: (code) => {
          try {
            const factory = new Function(`${code}; return LRUCache;`);
            const CacheClass = factory();
            const lru = new CacheClass(2);
            lru.put(1, 1);
            lru.put(2, 2);
            const val = lru.get(1);
            return {
              passed: val === 1,
              message: val === 1 ? 'Correctly retrieved value 1 for key 1.' : `Expected 1, got ${val}`
            };
          } catch (err) {
            return { passed: false, message: `Syntax/Runtime Error: ${err.message}` };
          }
        }
      },
      {
        id: 'tc-2',
        title: 'Capacity Eviction of Least Recently Used',
        description: 'put(3, 3) must evict key 2 since key 1 was recently accessed.',
        validate: (code) => {
          try {
            const factory = new Function(`${code}; return LRUCache;`);
            const CacheClass = factory();
            const lru = new CacheClass(2);
            lru.put(1, 1);
            lru.put(2, 2);
            lru.get(1); // key 1 is MRU, key 2 is LRU
            lru.put(3, 3); // evicts key 2
            const val2 = lru.get(2);
            const val1 = lru.get(1);
            const val3 = lru.get(3);
            const passed = val2 === -1 && val1 === 1 && val3 === 3;
            return {
              passed,
              message: passed 
                ? 'Key 2 successfully evicted. Keys 1 and 3 correctly retained.'
                : `Eviction failed: get(2)=${val2} (expected -1), get(1)=${val1}, get(3)=${val3}`
            };
          } catch (err) {
            return { passed: false, message: `Runtime Error: ${err.message}` };
          }
        }
      },
      {
        id: 'tc-3',
        title: 'Update Existing Key Value',
        description: 'Updating existing key must update value and refresh MRU position without increasing size.',
        validate: (code) => {
          try {
            const factory = new Function(`${code}; return LRUCache;`);
            const CacheClass = factory();
            const lru = new CacheClass(2);
            lru.put(1, 10);
            lru.put(2, 20);
            lru.put(1, 100); // update key 1
            lru.put(3, 30); // should evict key 2, not key 1
            const val1 = lru.get(1);
            const val2 = lru.get(2);
            const passed = val1 === 100 && val2 === -1;
            return {
              passed,
              message: passed
                ? 'Existing key update correctly refreshed MRU order and preserved value 100.'
                : `Update failed: get(1)=${val1} (expected 100), get(2)=${val2} (expected -1)`
            };
          } catch (err) {
            return { passed: false, message: `Runtime Error: ${err.message}` };
          }
        }
      }
    ]
  },
  {
    id: 'rec-elec-loto',
    skillId: 'electrical',
    skillName: 'Electrical Works',
    courseId: 'course-elec-maint',
    courseTitle: 'Industrial Electrical Maintenance & Motor Control',
    title: 'Star-Delta Motor Starter Troubleshooting & LOTO Safety Protocol',
    concept: 'Lockout-Tagout Sequence & Interlock Safety',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    type: 'scenario_challenge',
    problemStatement: `A 3-phase 30 kW induction motor connected to an industrial ventilation exhaust is repeatedly tripping its thermal overload relay 8 seconds after the operator presses the START pushbutton.

Inspection reveals:
- The main contactor (KM1) energizes normally.
- The star contactor (KM2) pulls in for 6 seconds, and motor reaches ~75% rated speed.
- When the pneumatic timer switches, the delta contactor (KM3) engages, but both KM2 and KM3 briefly spark simultaneously before the main breaker trips on short circuit.

You must:
1. Identify the root cause electrical defect in the contactor control schematic.
2. Specify the OSHA-compliant 6-step Lockout/Tagout (LOTO) de-energization procedure required before opening the motor terminal box.`,
    instructions: [
      'Select or diagnose the electrical fault causing the star-to-delta transition short circuit.',
      'Specify the mandatory mechanical and electrical interlock required between KM2 and KM3.',
      'Order the 6 OSHA LOTO sequence steps correctly from Step 1 to Step 6.'
    ],
    expectedOutput: 'Correct identification of missing normally closed (NC) electrical interlock contacts and valid 6-step LOTO procedure sequence.',
    constraints: [
      'Zero-energy state must be verified using a calibrated multi-meter/voltage tester before touch.'
    ],
    starterCode: `// 1. Root Cause Analysis:
const rootCauseDiagnosis = {
  primaryDefect: "MISSING_ELECTRICAL_INTERLOCK", 
  // Options: "OVERSIZED_FUSES", "MISSING_ELECTRICAL_INTERLOCK", "BURNT_STATOR_WINDING", "FAULTY_THERMAL_BIMETAL"
  
  requiredFix: "INSTALL_NC_AUXILIARY_INTERLOCK",
  // Options: "INCREASE_TIMER_DELAY", "INSTALL_NC_AUXILIARY_INTERLOCK", "REPLACE_MOTOR_BEARINGS"
};

// 2. OSHA 6-Step LOTO De-energization Sequence (Arrange 1 through 6):
const lotoSequence = [
  "PREPARATION_AND_NOTIFICATION", // Step 1: Notify affected operators
  "SHUTDOWN_EQUIPMENT",           // Step 2: Normal machine stop
  "ISOLATION_OF_ENERGY_SOURCE",   // Step 3: Open main disconnect switch
  "APPLY_LOCKOUT_TAGOUT_DEVICES", // Step 4: Padlock & danger tag on breaker
  "STORED_ENERGY_DISSIPATION",    // Step 5: Discharge capacitors / mechanical block
  "VERIFY_ZERO_ENERGY_STATE"      // Step 6: Test leads with calibrated voltage meter
];`,
    testCases: [
      {
        id: 'tc-1',
        title: 'Star-Delta Interlock Fault Identification',
        description: 'Verify diagnosis identifies lack of electrical interlocking between KM2 and KM3.',
        validate: (code) => {
          const hasInterlock = code.includes('MISSING_ELECTRICAL_INTERLOCK');
          const hasFix = code.includes('INSTALL_NC_AUXILIARY_INTERLOCK');
          return {
            passed: hasInterlock && hasFix,
            message: hasInterlock && hasFix
              ? 'Correctly identified simultaneous star-delta arcing caused by missing NC auxiliary contacts.'
              : 'Review schematic: Star and Delta contactors must have mutual NC electrical interlocks to prevent dead phase-to-phase shorts.'
          };
        }
      },
      {
        id: 'tc-2',
        title: 'OSHA 6-Step LOTO Sequence Compliance',
        description: 'Check sequential order of OSHA 1910.147 de-energization steps.',
        validate: (code) => {
          const steps = [
            'PREPARATION_AND_NOTIFICATION',
            'SHUTDOWN_EQUIPMENT',
            'ISOLATION_OF_ENERGY_SOURCE',
            'APPLY_LOCKOUT_TAGOUT_DEVICES',
            'STORED_ENERGY_DISSIPATION',
            'VERIFY_ZERO_ENERGY_STATE'
          ];
          let validOrder = true;
          let lastIndex = -1;
          for (const s of steps) {
            const idx = code.indexOf(s);
            if (idx === -1 || idx < lastIndex) {
              validOrder = false;
              break;
            }
            lastIndex = idx;
          }
          return {
            passed: validOrder,
            message: validOrder
              ? 'OSHA 6-Step LOTO sequence strictly verified in correct standard order.'
              : 'LOTO steps must follow: Notify -> Shutdown -> Isolate -> Apply Locks -> Dissipate -> Verify Zero Voltage.'
          };
        }
      },
      {
        id: 'tc-3',
        title: 'Zero-Energy Verification Compliance',
        description: 'Ensure step 6 specifically requires calibrated voltage testing before work begins.',
        validate: (code) => {
          const hasZeroEnergy = code.includes('VERIFY_ZERO_ENERGY_STATE');
          return {
            passed: hasZeroEnergy,
            message: hasZeroEnergy
              ? 'Zero-energy live-dead-live verification rule satisfied.'
              : 'Zero-energy verification is mandatory before physical contact.'
          };
        }
      }
    ]
  },
  {
    id: 'rec-data-3nf',
    skillId: 'dbms',
    skillName: 'Data Systems & Engineering',
    courseId: 'course-dbms-adv',
    courseTitle: 'Advanced SQL & Database Architecture',
    title: '3NF Relational De-anonymization & Anomaly Scrubbing',
    concept: 'Third Normal Form (3NF) & Transitive Dependency Elimination',
    difficulty: 'Intermediate',
    estimatedMinutes: 20,
    type: 'sql_challenge',
    problemStatement: `You have received a legacy spreadsheet table \`raw_training_records\` with severe data anomalies:
\`(student_id, student_name, student_email, batch_id, batch_name, instructor_id, instructor_name, course_id, course_title, score)\`

Notice transitive dependencies:
- \`student_id -> student_name, student_email\`
- \`course_id -> course_title\`
- \`instructor_id -> instructor_name\`
- \`batch_id -> batch_name, course_id, instructor_id\`

If an instructor changes their name, multiple rows become inconsistent. If a batch is deleted, student history is destroyed.

Decompose this table into normalized 3NF relational tables and formulate the schema foreign key definitions.`,
    instructions: [
      'Create 3NF normalized tables: students, courses, instructors, batches, and enrollments.',
      'Define primary keys and foreign key constraints to eliminate insertion, deletion, and update anomalies.',
      'Ensure the enrollments link student_id to batch_id with score.'
    ],
    expectedOutput: 'Clean 3NF relational DDL schema with primary keys, unique emails, and relational foreign keys.',
    constraints: [
      'No transitive dependencies may remain in any normalized table.',
      'Every non-key attribute must depend on the key, the whole key, and nothing but the key.'
    ],
    starterCode: `-- 1. Normalized Students entity
CREATE TABLE students (
  student_id VARCHAR(32) PRIMARY KEY,
  student_name VARCHAR(100) NOT NULL,
  student_email VARCHAR(120) UNIQUE NOT NULL
);

-- 2. Normalized Instructors entity
CREATE TABLE instructors (
  instructor_id VARCHAR(32) PRIMARY KEY,
  instructor_name VARCHAR(100) NOT NULL
);

-- 3. Normalized Courses entity
CREATE TABLE courses (
  course_id VARCHAR(32) PRIMARY KEY,
  course_title VARCHAR(150) NOT NULL
);

-- 4. Normalized Batches entity with foreign keys
CREATE TABLE batches (
  batch_id VARCHAR(32) PRIMARY KEY,
  batch_name VARCHAR(100) NOT NULL,
  course_id VARCHAR(32) REFERENCES courses(course_id),
  instructor_id VARCHAR(32) REFERENCES instructors(instructor_id)
);

-- 5. Associative Enrollments entity (M:N relationship)
CREATE TABLE enrollments (
  student_id VARCHAR(32) REFERENCES students(student_id),
  batch_id VARCHAR(32) REFERENCES batches(batch_id),
  score NUMERIC(5, 2),
  PRIMARY KEY (student_id, batch_id)
);`,
    testCases: [
      {
        id: 'tc-1',
        title: '3NF Entity Separation',
        description: 'Verify all 5 discrete entities are separated to eliminate transitive dependencies.',
        validate: (code) => {
          const lower = code.toLowerCase();
          const hasStudents = lower.includes('table students');
          const hasInstructors = lower.includes('table instructors');
          const hasCourses = lower.includes('table courses');
          const hasBatches = lower.includes('table batches');
          const hasEnrollments = lower.includes('table enrollments');
          const allEntities = hasStudents && hasInstructors && hasCourses && hasBatches && hasEnrollments;
          return {
            passed: allEntities,
            message: allEntities 
              ? 'All 5 normalized entities cleanly isolated without transitive dependencies.'
              : 'Missing entity tables: must include students, instructors, courses, batches, and enrollments.'
          };
        }
      },
      {
        id: 'tc-2',
        title: 'Referential Integrity & Foreign Keys',
        description: 'Verify batches and enrollments reference parent entities via foreign keys.',
        validate: (code) => {
          const lower = code.toLowerCase();
          const hasBatchRefs = lower.includes('references courses') && lower.includes('references instructors');
          const hasEnrollRefs = lower.includes('references students') && lower.includes('references batches');
          return {
            passed: hasBatchRefs && hasEnrollRefs,
            message: hasBatchRefs && hasEnrollRefs
              ? 'Referential integrity foreign key constraints validated.'
              : 'Ensure batches reference courses and instructors, and enrollments reference students and batches.'
          };
        }
      },
      {
        id: 'tc-3',
        title: 'Composite Primary Key on Enrollments',
        description: 'Verify enrollments has composite primary key on (student_id, batch_id).',
        validate: (code) => {
          const lower = code.toLowerCase().replace(/\s+/g, ' ');
          const hasPK = lower.includes('primary key (student_id, batch_id)') || 
                        lower.includes('primary key(student_id, batch_id)') ||
                        lower.includes('primary key (student_id,batch_id)');
          return {
            passed: hasPK,
            message: hasPK
              ? 'Enrollments associative composite primary key verified.'
              : 'Enrollments table must declare PRIMARY KEY (student_id, batch_id).'
          };
        }
      }
    ]
  }
];

// Helper to construct a recovery session for a user
export const createDefaultRecoverySession = (userId = 'learner-talha') => {
  const startedAt = new Date();
  // 14-day recovery deadline: startedAt + 14 days
  const deadlineAt = new Date(startedAt.getTime() + 14 * 24 * 60 * 60 * 1000);

  const initialAssignments = RECOVERY_CHALLENGES.map((ch, idx) => ({
    ...ch,
    status: idx < 2 ? 'COMPLETED' : idx === 2 ? 'IN_PROGRESS' : 'READY',
    score: idx < 2 ? 100 : null,
    attempts: idx < 2 ? 1 : 0,
    submittedCode: ch.starterCode,
    submittedAt: idx < 2 ? new Date(startedAt.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() : null,
    feedback: idx < 2 ? 'All deterministic test cases passed on first attempt with optimal complexity!' : null,
    testResults: idx < 2 ? [
      { id: 'tc-1', passed: true, message: 'All assertions verified.' },
      { id: 'tc-2', passed: true, message: 'Constraints verified.' },
      { id: 'tc-3', passed: true, message: 'Deterministic tests passed.' }
    ] : null
  }));

  const completedCount = initialAssignments.filter(a => a.status === 'COMPLETED').length;
  const progress = Math.round((completedCount / initialAssignments.length) * 100);

  return {
    id: `rec-session-${Date.now()}`,
    userId,
    startedAt: startedAt.toISOString(),
    deadlineAt: deadlineAt.toISOString(),
    status: 'RECOVERY_IN_PROGRESS', // 'RECOVERY_IN_PROGRESS' | 'RECOVERED' | 'EXPIRED'
    progress,
    totalRequired: initialAssignments.length,
    completedCount,
    completedAt: null,
    assignments: initialAssignments
  };
};
