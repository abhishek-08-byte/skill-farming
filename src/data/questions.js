export const SKILL_QUESTIONS = {
  dbms: [
    {
      id: 'dbms-1',
      skillId: 'dbms',
      skillName: 'DBMS',
      questionNumber: 1,
      difficulty: 'Easy',
      competency: 'Database Fundamentals',
      question: 'What is the primary characteristic of a Primary Key in a relational database table?',
      options: [
        'It must contain unique values and cannot contain NULL values.',
        'It can have duplicate values as long as they refer to distinct records.',
        'It automatically encrypts the entire row data.',
        'It can accept multiple NULL values if no other duplicate is present.'
      ],
      correctAnswer: 0,
      explanation: 'A Primary Key uniquely identifies each record in a table and cannot contain NULL values according to relational integrity rules.'
    },
    {
      id: 'dbms-2',
      skillId: 'dbms',
      skillName: 'DBMS',
      questionNumber: 2,
      difficulty: 'Easy',
      competency: 'Relational Model',
      question: 'Which SQL clause is strictly used to filter rows returned by a query based on a specific predicate?',
      options: [
        'ORDER BY',
        'GROUP BY',
        'WHERE',
        'HAVING without aggregate'
      ],
      correctAnswer: 2,
      explanation: 'The WHERE clause specifies search conditions to filter rows before any groupings are applied.'
    },
    {
      id: 'dbms-3',
      skillId: 'dbms',
      skillName: 'DBMS',
      questionNumber: 3,
      difficulty: 'Easy',
      competency: 'Data Integrity',
      question: 'What is the primary role of a Foreign Key constraint in relational schemas?',
      options: [
        'To enforce referential integrity between columns of two related tables.',
        'To speed up arithmetic operations in SQL functions.',
        'To ensure all columns in the child table are alphanumeric.',
        'To prevent creating indexes on the referenced parent table.'
      ],
      correctAnswer: 0,
      explanation: 'A Foreign Key prevents actions that would destroy links between tables and prevents invalid data from being inserted into the foreign key column.'
    },
    {
      id: 'dbms-4',
      skillId: 'dbms',
      skillName: 'DBMS',
      questionNumber: 4,
      difficulty: 'Moderate',
      competency: 'Applied SQL Queries',
      question: 'In a query that groups employee records by department_id, which clause must be used to filter only departments that have an average salary greater than ₹50,000?',
      options: [
        'WHERE AVG(salary) > 50000',
        'HAVING AVG(salary) > 50000',
        'QUALIFY salary > 50000',
        'FILTER BY AVG(salary) > 50000'
      ],
      correctAnswer: 1,
      explanation: 'The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions like AVG().'
    },
    {
      id: 'dbms-5',
      skillId: 'dbms',
      skillName: 'DBMS',
      questionNumber: 5,
      difficulty: 'Moderate',
      competency: 'Relational Joins',
      question: 'Given an Orders table (1,000 rows) and a Customers table (800 rows), which join type guarantees that every single customer will appear in the result set, even if they have placed zero orders?',
      options: [
        'INNER JOIN Customers ON Orders.customer_id = Customers.id',
        'RIGHT JOIN Orders ON Customers.id = Orders.customer_id',
        'LEFT JOIN Orders ON Customers.id = Orders.customer_id (with Customers in FROM)',
        'CROSS JOIN Orders, Customers'
      ],
      correctAnswer: 2,
      explanation: 'A LEFT OUTER JOIN returns all rows from the left table (Customers) and matched rows from the right table (Orders), filling unmatched attributes with NULL.'
    },
    {
      id: 'dbms-6',
      skillId: 'dbms',
      skillName: 'DBMS',
      questionNumber: 6,
      difficulty: 'Moderate',
      competency: 'Normalization',
      question: 'A relation R(A, B, C, D) is in 2NF. What additional criterion is required for R to be in Third Normal Form (3NF)?',
      options: [
        'Every non-prime attribute must be non-transitively dependent on the primary key.',
        'All multi-valued dependencies must be isolated into independent binary relations.',
        'Every determinant must be a candidate key.',
        'The relation must contain no composite primary keys.'
      ],
      correctAnswer: 0,
      explanation: 'A relation is in 3NF if it is in 2NF and no non-prime attribute is transitively dependent on the primary key (i.e. X -> Y where Y is non-prime implies X is a superkey).'
    },
    {
      id: 'dbms-7',
      skillId: 'dbms',
      skillName: 'DBMS',
      questionNumber: 7,
      difficulty: 'Moderate',
      competency: 'Transactions & ACID',
      question: 'During an online money transfer between Account A and Account B, the debit succeeds but a network timeout occurs before crediting Account B. Which ACID property ensures Account A does not lose funds permanently?',
      options: [
        'Durability',
        'Atomicity',
        'Isolation',
        'Scalability'
      ],
      correctAnswer: 1,
      explanation: 'Atomicity ensures that all statements within a transaction block either succeed completely or are completely rolled back if any failure occurs.'
    },
    {
      id: 'dbms-8',
      skillId: 'dbms',
      skillName: 'DBMS',
      questionNumber: 8,
      difficulty: 'Very Tough',
      competency: 'Query Optimization & Indexing',
      question: 'A table contains 10,000,000 rows. A composite B-Tree index exists on (status, created_at, user_id). Why does the query `SELECT * FROM orders WHERE created_at >= NOW() - INTERVAL 1 DAY AND user_id = 42;` trigger a Full Table Scan instead of using the composite index effectively?',
      options: [
        'Because the B-Tree index ordering requires the leading column (`status`) to be constrained (Leftmost Prefix Rule).',
        'Because B-Trees do not support timestamp comparisons greater than 24 hours.',
        'Because `SELECT *` disables all index utilization in relational engines.',
        'Because user_id has lower cardinality than created_at.'
      ],
      correctAnswer: 0,
      explanation: 'The Leftmost Prefix Rule dictates that composite B-Tree indexes can only be traversed if the leading prefix columns (here `status`) are present in the search predicate.'
    },
    {
      id: 'dbms-9',
      skillId: 'dbms',
      skillName: 'DBMS',
      questionNumber: 9,
      difficulty: 'Very Tough',
      competency: 'Concurrency & Isolation Levels',
      question: 'Transaction T1 executes `SELECT SUM(balance) FROM accounts;` twice under REPEATABLE READ isolation. Between the two reads, Transaction T2 executes `INSERT INTO accounts (id, balance) VALUES (999, 5000);` and commits. What phenomenon occurs if the second read produces a different sum, and how is it resolved?',
      options: [
        'Dirty Read; resolved by setting isolation level to READ UNCOMMITTED.',
        'Phantom Read; resolved by upgrading isolation level to SERIALIZABLE with range locks/predicate locks.',
        'Non-Repeatable Read; resolved by adding foreign key cascades.',
        'Write Skew; resolved by disabling multi-version concurrency control (MVCC).'
      ],
      correctAnswer: 1,
      explanation: 'A Phantom Read occurs when newly inserted or deleted rows satisfy a range query between two reads. In SQL-92, REPEATABLE READ prevents non-repeatable reads on existing rows, but SERIALIZABLE is required to prevent phantom reads.'
    },
    {
      id: 'dbms-10',
      skillId: 'dbms',
      skillName: 'DBMS',
      questionNumber: 10,
      difficulty: 'Very Tough',
      competency: 'Architectural Database Design',
      question: 'An e-commerce order checkout system experiences severe row lock contention on the `inventory_counts` table during flash sales. Which architectural database strategy best alleviates this lock bottleneck while preserving stock accuracy?',
      options: [
        'Drop foreign key constraints and allow inventory to drop below zero.',
        'Partition inventory records into discrete buckets (counter-striping) and decrement random available buckets concurrently, with asynchronous reconciliation.',
        'Wrap all queries in autocommit=false without releasing write locks until daily settlement.',
        'Replace PostgreSQL with an in-memory single-threaded SQLite instance.'
      ],
      correctAnswer: 1,
      explanation: 'Counter striping / distributed bucket reservation splits a single hot row into multiple parallel bucket records, converting a serialized bottleneck into parallel concurrent row locks.'
    }
  ],

  dsa: [
    {
      id: 'dsa-1',
      skillId: 'dsa',
      skillName: 'DSA',
      questionNumber: 1,
      difficulty: 'Easy',
      competency: 'Arrays & Complexity',
      question: 'What is the average time complexity of accessing an arbitrary element at index i in a contiguous memory array?',
      options: [
        'O(1)',
        'O(log n)',
        'O(n)',
        'O(n log n)'
      ],
      correctAnswer: 0,
      explanation: 'Arrays store elements in contiguous memory blocks, allowing direct calculation of memory addresses using BaseAddress + i * ElementSize in O(1) time.'
    },
    {
      id: 'dsa-2',
      skillId: 'dsa',
      skillName: 'DSA',
      questionNumber: 2,
      difficulty: 'Easy',
      competency: 'Linear Data Structures',
      question: 'Which fundamental principle governs the addition and removal of elements in a standard Stack data structure?',
      options: [
        'FIFO (First-In, First-Out)',
        'LIFO (Last-In, First-Out)',
        'Priority-driven eviction',
        'Random-Access Removal'
      ],
      correctAnswer: 1,
      explanation: 'A stack operates strictly on the LIFO principle: the element inserted most recently is the first to be popped.'
    },
    {
      id: 'dsa-3',
      skillId: 'dsa',
      skillName: 'DSA',
      questionNumber: 3,
      difficulty: 'Easy',
      competency: 'Linked Structures',
      question: 'Why is inserting an element at the beginning (head) of a singly linked list O(1), whereas inserting at the beginning of a dynamic array is O(n)?',
      options: [
        'The array requires shifting all n existing elements one position to the right.',
        'Linked lists store data in CPU cache lines whereas arrays do not.',
        'Array pointers cannot be updated without recompiling the program.',
        'Linked list nodes do not require pointer updates.'
      ],
      correctAnswer: 0,
      explanation: 'Inserting at index 0 of an array requires shifting every existing item to the right (O(n)), whereas in a linked list we only re-point new_node.next = head (O(1)).'
    },
    {
      id: 'dsa-4',
      skillId: 'dsa',
      skillName: 'DSA',
      questionNumber: 4,
      difficulty: 'Moderate',
      competency: 'Trees & Search Properties',
      question: 'When performing an In-order traversal (Left -> Node -> Right) on a valid Binary Search Tree (BST), what property does the resulting sequence of node values exhibit?',
      options: [
        'The values are sorted in strictly non-decreasing order.',
        'The values appear in reverse chronological insertion order.',
        'The values represent breadth-first layer levels.',
        'The root node always appears as the first element.'
      ],
      correctAnswer: 0,
      explanation: 'By definition of a BST, every left descendant is <= root and every right descendant is >= root. In-order traversal visits left subtree, root, then right, yielding sorted values.'
    },
    {
      id: 'dsa-5',
      skillId: 'dsa',
      skillName: 'DSA',
      questionNumber: 5,
      difficulty: 'Moderate',
      competency: 'Graph Algorithms',
      question: 'Which algorithm or technique can detect whether a directed graph contains a cycle in O(V + E) time?',
      options: [
        'Depth-First Search (DFS) tracking the recursion call stack (ancestor set) or Kahn\'s Algorithm (indegree tracking).',
        'Prim\'s Minimum Spanning Tree Algorithm.',
        'Binary Search on edge weights.',
        'Kruskal\'s Algorithm with Disjoint Set Union without rank.'
      ],
      correctAnswer: 0,
      explanation: 'Detecting back-edges in directed DFS using state markers (unvisited, visiting, visited) or topological sorting via Kahn\'s algorithm detects cycles in O(V + E).'
    },
    {
      id: 'dsa-6',
      skillId: 'dsa',
      skillName: 'DSA',
      questionNumber: 6,
      difficulty: 'Moderate',
      competency: 'Two Pointers & Sliding Window',
      question: 'Given an array of positive integers, you need to find the minimal length of a contiguous subarray of which the sum is >= target. What is the optimal time complexity achievable using a sliding window (two pointers)?',
      options: [
        'O(n^2)',
        'O(n)',
        'O(n log n)',
        'O(2^n)'
      ],
      correctAnswer: 1,
      explanation: 'Using two pointers (left and right), each pointer moves forward at most n times across the array, yielding an optimal O(n) linear scan with O(1) space.'
    },
    {
      id: 'dsa-7',
      skillId: 'dsa',
      skillName: 'DSA',
      questionNumber: 7,
      difficulty: 'Moderate',
      competency: 'Sorting & Algorithmic Analysis',
      question: 'Under what input condition does standard QuickSort (using the first element as the pivot without randomization) degrade to its worst-case time complexity of O(n^2)?',
      options: [
        'When the input array is already sorted or reverse sorted.',
        'When all array elements are distinct and randomly distributed.',
        'When the array size is a power of 2.',
        'When the array elements are all negative numbers.'
      ],
      correctAnswer: 0,
      explanation: 'If the array is already sorted and the first element is chosen as pivot, partitions are completely unbalanced (1 element vs n-1 elements), resulting in n recursion levels and O(n^2) runtime.'
    },
    {
      id: 'dsa-8',
      skillId: 'dsa',
      skillName: 'DSA',
      questionNumber: 8,
      difficulty: 'Very Tough',
      competency: 'Advanced Data Structure Design',
      question: 'You must design a Least Recently Used (LRU) Cache supporting `get(key)` and `put(key, value)` both strictly in O(1) average time complexity. Which combined data structure must be utilized?',
      options: [
        'A Hash Map paired with a Doubly Linked List.',
        'A Min-Heap priority queue combined with a Binary Search Tree.',
        'A Trie paired with a Circular Array.',
        'A Single Linked List sorted by timestamp.'
      ],
      correctAnswer: 0,
      explanation: 'The Hash Map provides O(1) key lookup to the node. The Doubly Linked List allows removing and relocating any node to the head/tail in O(1) without shifting elements.'
    },
    {
      id: 'dsa-9',
      skillId: 'dsa',
      skillName: 'DSA',
      questionNumber: 9,
      difficulty: 'Very Tough',
      competency: 'Dynamic Programming & State Optimization',
      question: 'In the 0/1 Knapsack problem with weights W and values V for N items and capacity C, what is the exact reason greedy choice (sorting by value-to-weight ratio) fails, and why is dynamic programming necessary?',
      options: [
        'Because greedy cannot take fractional items, leaving suboptimal remaining capacity that could have accommodated a higher total discrete value combination.',
        'Because greedy algorithms cannot process integer values.',
        'Because sorting by value-to-weight takes O(2^N) time.',
        'Because the 0/1 Knapsack problem violates the optimal substructure property.'
      ],
      correctAnswer: 0,
      explanation: 'Because items cannot be divided, choosing an item with high density might prevent picking two items whose combined value exceeds the single item. DP evaluates discrete state transitions DP[i][w] to find the exact global maximum.'
    },
    {
      id: 'dsa-10',
      skillId: 'dsa',
      skillName: 'DSA',
      questionNumber: 10,
      difficulty: 'Very Tough',
      competency: 'Shortest Path & Negative Weights',
      question: 'Why does Dijkstra\'s algorithm fail to guarantee the correct shortest path on graphs containing negative edge weights, whereas the Bellman-Ford algorithm succeeds?',
      options: [
        'Dijkstra greedily marks a vertex as finalized and never re-relaxes its distance, missing paths where later negative edges reduce total cost; Bellman-Ford relaxes all edges |V|-1 times.',
        'Dijkstra\'s algorithm requires adjacency matrices and cannot process negative weights.',
        'Bellman-Ford runs in O(log V) time, allowing it to bypass negative cycles.',
        'Negative edges cause an infinite recursion call stack inside Fibonacci Heaps.'
      ],
      correctAnswer: 0,
      explanation: 'Dijkstra assumes that adding an edge to a path can never decrease its total length. Negative edges violate this greedy non-decreasing assumption. Bellman-Ford methodically relaxes all |E| edges across |V|-1 passes, accurately propagating negative weights.'
    }
  ],

  electrical: [
    {
      id: 'elec-1',
      skillId: 'electrical',
      skillName: 'Electrical Works',
      questionNumber: 1,
      difficulty: 'Easy',
      competency: 'Electrical Safety',
      question: 'What is the mandatory first safety protocol before performing maintenance or inspection on an industrial electrical distribution board?',
      options: [
        'Lock-Out / Tag-Out (LOTO) and verifying zero voltage using an approved calibrated multimeter/tester.',
        'Wearing insulated cotton gloves and standing on damp cardboard.',
        'Switching on all downline appliances to drain residual load.',
        'Sprinkling water on circuit breakers to reduce spark temperatures.'
      ],
      correctAnswer: 0,
      explanation: 'Lock-Out Tag-Out (LOTO) physically isolates electrical energy sources and tests for the verified absence of voltage before any physical contact occurs.'
    },
    {
      id: 'elec-2',
      skillId: 'electrical',
      skillName: 'Electrical Works',
      questionNumber: 2,
      difficulty: 'Easy',
      competency: 'Fundamental Laws',
      question: 'According to Ohm\'s Law (V = I * R), if a 230V resistive heating element has an internal resistance of 46 Ohms, what electric current flows through the circuit?',
      options: [
        '5 Amperes',
        '10 Amperes',
        '2.5 Amperes',
        '0.2 Amperes'
      ],
      correctAnswer: 0,
      explanation: 'I = V / R. Therefore, 230V / 46 Ohms = 5 Amperes.'
    },
    {
      id: 'elec-3',
      skillId: 'electrical',
      skillName: 'Electrical Works',
      questionNumber: 3,
      difficulty: 'Easy',
      competency: 'Protection Devices',
      question: 'What is the primary function of a standard Miniature Circuit Breaker (MCB) in domestic and commercial electrical distribution boards?',
      options: [
        'To protect wiring from overcurrent caused by circuit overload or short circuits.',
        'To step up voltage during low-supply periods.',
        'To convert Alternating Current (AC) to Direct Current (DC).',
        'To measure total monthly power consumption in Kilowatt-Hours.'
      ],
      correctAnswer: 0,
      explanation: 'An MCB automatically switches off electrical circuits during an overload or short circuit condition to prevent wire insulation damage and electrical fires.'
    },
    {
      id: 'elec-4',
      skillId: 'electrical',
      skillName: 'Electrical Works',
      questionNumber: 4,
      difficulty: 'Moderate',
      competency: 'Parallel vs Series Circuits',
      question: 'Two identical 100W, 230V incandescent light bulbs are mistakenly wired in series across a 230V AC supply. How will the bulbs illuminate compared to standard parallel wiring?',
      options: [
        'Both bulbs will glow significantly dimmer, each operating at approximately 25W power output.',
        'Both bulbs will immediately burn out due to excessive voltage.',
        'One bulb will glow twice as bright while the other remains completely dark.',
        'Both bulbs will illuminate with their regular 100W rated brightness.'
      ],
      correctAnswer: 0,
      explanation: 'In series, total resistance doubles (2R), reducing current to I/2. The voltage across each bulb is 115V (V/2). Power P = V^2 / R drops to 1/4 of rated wattage (approx. 25W each).'
    },
    {
      id: 'elec-5',
      skillId: 'electrical',
      skillName: 'Electrical Works',
      questionNumber: 5,
      difficulty: 'Moderate',
      competency: 'AC Power & Power Factor',
      question: 'An industrial single-phase induction motor consumes 2,300 Watts of active power at 230V RMS with a measured current of 12.5 Amperes. What is the power factor (PF) of the motor?',
      options: [
        '0.80',
        '1.00',
        '0.65',
        '0.50'
      ],
      correctAnswer: 0,
      explanation: 'Apparent Power S = V * I = 230 * 12.5 = 2,875 VA. Power Factor = Active Power (P) / Apparent Power (S) = 2,300 / 2,875 = 0.80 lagging.'
    },
    {
      id: 'elec-6',
      skillId: 'electrical',
      skillName: 'Electrical Works',
      questionNumber: 6,
      difficulty: 'Moderate',
      competency: '3-Phase Systems & Neutral Faults',
      question: 'In a 3-phase 4-wire Star (Y) distribution system feeding unbalanced single-phase domestic loads, what dangerous condition occurs if the main Neutral conductor becomes completely severed (floating neutral)?',
      options: [
        'Phase-to-neutral voltages become severely unbalanced, causing overvoltage up to line voltage (400V) on lightly loaded phases and damaging appliances.',
        'All three phase voltages immediately drop to zero across the entire network.',
        'The frequency of the system doubles from 50Hz to 100Hz.',
        'Current is automatically routed into the earth conductor without any voltage fluctuation.'
      ],
      correctAnswer: 0,
      explanation: 'A severed or floating neutral shifts the neutral voltage point toward the phase with the lowest impedance (heaviest load), subjecting lighter loaded phases to destructive overvoltages approaching 400V.'
    },
    {
      id: 'elec-7',
      skillId: 'electrical',
      skillName: 'Electrical Works',
      questionNumber: 7,
      difficulty: 'Moderate',
      competency: 'Grounding & Residual Protection',
      question: 'What triggers a Residual Current Circuit Breaker (RCCB / RCD) to trip and disconnect an electrical installation?',
      options: [
        'An imbalance between the current flowing through Phase and returning through Neutral, indicating earth leakage.',
        'A gradual ambient temperature rise above 40 degrees Celsius.',
        'High harmonic distortion produced by variable frequency drives.',
        'A symmetric balanced 3-phase overload.'
      ],
      correctAnswer: 0,
      explanation: 'An RCCB uses a core balance current transformer to detect when Phase current does not equal Neutral return current (typically 30mA threshold), indicating current leaking to ground or human contact.'
    },
    {
      id: 'elec-8',
      skillId: 'electrical',
      skillName: 'Electrical Works',
      questionNumber: 8,
      difficulty: 'Very Tough',
      competency: 'Industrial Motor Troubleshooting',
      question: 'A 3-phase 15kW delta-connected induction motor trips its bimetallic thermal overload relay intermittently after running smoothly for 25 minutes. Clamp meter readings show Phase R: 28A, Phase Y: 29A, Phase B: 41A under nominal load. What is the root cause?',
      options: [
        'Phase B is experiencing a severe current imbalance due to high contact resistance, loose terminal lug, or partial winding inter-turn short in phase B.',
        'The incoming utility supply frequency has increased to 60Hz.',
        'The motor direction of rotation is reversed.',
        'The motor requires a larger diameter cooling fan.'
      ],
      correctAnswer: 0,
      explanation: 'A significant current imbalance (Phase B drawing 41A vs 28-29A) causes localized stator overheating and overload tripping, typically caused by loose connections, supply voltage unbalance, or internal winding degradation.'
    },
    {
      id: 'elec-9',
      skillId: 'electrical',
      skillName: 'Electrical Works',
      questionNumber: 9,
      difficulty: 'Very Tough',
      competency: 'Motor Control Circuit Diagnostics',
      question: 'In an industrial Star-Delta starter control panel, when the START push button is pressed, the main and star contactors pull in, but after the 10-second timer elapses, the entire starter immediately drops out instead of transitioning to delta. Which fault is most probable?',
      options: [
        'The normally closed (NC) electrical interlock auxiliary contact on the star contactor is failed open or the delta contactor coil is open-circuited.',
        'The main 3-phase circuit breaker is rated too high.',
        'The thermal overload relay was reset in automatic mode instead of manual mode.',
        'The start push button is wired in parallel with the stop button.'
      ],
      correctAnswer: 0,
      explanation: 'When transitioning from star to delta, the timer de-energizes the star contactor and energizes the delta contactor through the star contactor\'s NC interlock contact. If that NC contact or delta coil is broken, the circuit breaks and the hold-in loop collapses.'
    },
    {
      id: 'elec-10',
      skillId: 'electrical',
      skillName: 'Electrical Works',
      questionNumber: 10,
      difficulty: 'Very Tough',
      competency: 'Harmonics & Power Quality',
      question: 'A modern commercial facility with extensive LED lighting, computers, and variable speed drives reports overheated neutral busbars and transformers despite the phase conductors operating well below their rated current capacity. What electrical phenomenon explains this?',
      options: [
        'Triplen harmonics (3rd, 9th, 15th) produced by non-linear loads are zero-sequence and additively accumulate in the neutral conductor instead of cancelling out.',
        'Capacitive reactive power is forcing current to flow backward into the utility grid.',
        'The neutral conductor is acting as an antenna picking up radio frequency broadcasts.',
        'The facility grounding rod has excessively low soil resistivity.'
      ],
      correctAnswer: 0,
      explanation: 'In 3-phase systems, triplen harmonics (especially the 3rd harmonic, 150Hz) are in phase with each other. In the neutral wire, they do not cancel out like fundamental frequencies; they add together arithmetically, causing neutral currents up to 1.73 times phase currents.'
    }
  ]
};

export const getCapabilityLevel = (score) => {
  if (score <= 3) return { level: 'FOUNDATION NEEDED', color: 'text-amber-700 bg-amber-50 border-amber-200', range: '0–3' };
  if (score <= 6) return { level: 'DEVELOPING', color: 'text-sky-700 bg-sky-50 border-sky-200', range: '4–6' };
  if (score <= 8) return { level: 'PROFICIENT', color: 'text-teal-700 bg-teal-50 border-teal-200', range: '7–8' };
  return { level: 'ADVANCED', color: 'text-emerald-700 bg-emerald-50 border-emerald-200', range: '9–10' };
};
