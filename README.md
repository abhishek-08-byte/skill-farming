# 🌾 SKILL FARMING
### Skill-to-Employment Intelligence Platform
> *"Find your skill gaps. Learn what you need. Track where it takes you."*

---

## 📌 Problem Overview
Traditional skill platforms stop at course completion or certificate generation. **SKILL FARMING** is a complete, responsive, longitudinal intelligence system connecting:
$$\text{Learner Profile} \rightarrow \text{Assessment} \rightarrow \text{Capability Level} \rightarrow \text{Skill Gap} \rightarrow \text{Training} \rightarrow \text{Batches \& Attendance} \rightarrow \text{Employment} \rightarrow \text{Retention} \rightarrow \text{Government Decision Support}$$

---

## 🚀 Key Features

### 1. Learner Experience
- **Three Initial Primary Skills**:
  - **DBMS**: Relational models, SQL joins, aggregations, 3NF normalization, ACID transactions, B-Tree index optimization, and concurrency locks.
  - **DSA**: Contiguous array indexing, stack LIFO, singly linked lists, BST traversals, graph cycle detection, sliding window, and LRU Cache dual architectures.
  - **Electrical Works**: LOTO safety protocols, Ohm’s Law, MCB/RCCB earth leakage, 3-phase floating neutral hazards, and star-delta motor troubleshooting.
- **10-Question Data-Driven Assessment Engine**: 10 standardized questions per skill, with progressive difficulty (1–3 Easy, 4–7 Moderate, 8–10 Very Tough/Logical).
- **Capability Band Evaluation**:
  - `0–3`: Foundation Needed
  - `4–6`: Developing
  - `7–8`: Proficient
  - `9–10`: Advanced
- **Skill Gap & Career Readiness Matrix**: Compares current capability against target career requirements (Backend Developer, Data Analyst, Database Developer, Software Developer, Electrical Technician, Electrical Maintenance Technician, Embedded Systems, General Upskilling).
- **Personalized Recommendations**: Prioritizes actual skill gaps with explicit *"Why this course is recommended"* rationale.
- **Longitudinal Employment & Retention Follow-Up**: Tracks status (*Employed*, *Unemployed* with structured reasons, *Self-Employed*, *Freelancer*, *Apprenticeship*), salary ranges (<₹2 LPA to ₹10+ LPA), 2m/6m/12m retention, and training-job relevance.
- **Data Trust Rule**: Transparently distinguishes **Self-Reported** outcomes from **Verified** outcomes, with future-ready authorized verification architecture.

### 2. Training Institution Portal
- **Batch Management**: Create batches, assign courses, and roster enrolled students.
- **Attendance Tracking**: Record session attendance for offline cohorts and online modules.
- **Progress Tracking**: Monitor student completion status and readiness.

### 3. Government & Program Analytics Portal
- **Normalized Program KPIs**:
  - $\text{Completion Rate} = \frac{\text{Completed}}{\text{Enrolled}}$
  - $\text{Employment Conversion} = \frac{\text{Employed}}{\text{Completed}}$
  - 6-Month Retention Rate and Average Wage Band Progression.
- **Longitudinal Outcome Funnel**: Enrollment $\rightarrow$ Completion $\rightarrow$ Employment $\rightarrow$ Retention.
- **Cross-Dimensional Drill-Down**: District $\rightarrow$ Provider $\rightarrow$ Course $\rightarrow$ Cohort $\rightarrow$ Demographic Group $\rightarrow$ Outcome.
- **Provider Performance Comparison**: Neutral classification (*"Requires Review"*).
- **Cohort Analysis**: Sequential trends (January 2026 vs April 2026 vs July 2026).
- **Demographic & District Parity**: Evidence-based disparity detection (*"Outcome disparity detected. Further investigation may be required."*).
- **Evidence-Based Insights & Decision Support**: Actionable guidance for curriculum modernization, scaling high-impact models, and regional placement taskforces.

---

## 🎨 UI/UX Design System
- **Theme**: Deep Forest Teal (`#0F4C47`), Dark Accents (`#093A36`), Soft Sage (`#F3F7F5`), and modern rounded card styling.
- **Dashboard Components**:
  - Hero Greeting Banner with 75% Overall Progress ring and Top 4% rank.
  - Circular Attendance Donut Chart (80% present/absent gauge).
  - Performance Overview Area Chart with smooth spline wave.
  - Skills & Gaps Breakdown Widget (Strengths & Weaknesses).
  - Active Courses Grid with "Resume Learning" buttons.
  - Upcoming Test Card with direct launch arrows.
- **Mobile-First Responsive**: Tailored smartphone layout with thumb-friendly bottom navigation bar (`Home`, `Assess`, `Skill Gap`, `Learning`, `Outcome`).

---

## 🛠️ Tech Stack
- **Framework**: React 18 + Vite 8
- **Styling**: Tailwind CSS v4 + Custom Design Tokens
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti & SVG Curves
- **State Management**: Reactive LocalStorage Persistence with realistic mock database (20+ learners, 6 courses, 4 providers, 6 districts, 3 cohorts).

---

## ⚡ Getting Started Locally

```bash
# Clone the repository
git clone <YOUR_REPO_URL>
cd ps2

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 📜 License
Developed for the Smart India Hackathon (SIH) prototype. All rights reserved.

