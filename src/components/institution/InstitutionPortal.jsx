import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ProfileCompletionCard } from '../profile/ProfileCompletionCard';
import {
  Building,
  Users,
  Calendar,
  CheckCircle,
  Plus,
  BookOpen,
  Award,
  Layers,
  ChevronRight,
  TrendingUp,
  Clock,
  ArrowRight,
  Printer,
  FileText,
  Search,
  Filter,
  Check,
  X,
  UserCheck,
  UserX,
  AlertCircle,
  Download,
  FileSpreadsheet,
  Database,
  Sparkles
} from 'lucide-react';

export const InstitutionPortal = () => {
  const {
    batches,
    courses,
    activeTab,
    setActiveTab,
    createNewBatch,
    updateBatchAttendance,
    learnerProfilesRegistry,
    exportRegistryToCSV
  } = useApp();

  // Sub-view: 'batches' | 'students' | 'attendance' | 'registry'
  const [currentView, setCurrentView] = useState('batches');

  useEffect(() => {
    if (activeTab === 'institution-students') {
      setCurrentView('students');
    } else if (activeTab === 'institution-attendance') {
      setCurrentView('attendance');
    } else if (activeTab === 'institution-registry') {
      setCurrentView('registry');
    } else if (activeTab === 'institution') {
      setCurrentView('batches');
    }
  }, [activeTab]);

  const [showCreateBatchModal, setShowCreateBatchModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(batches[0] || null);
  const [selectedStudentDetail, setSelectedStudentDetail] = useState(null);

  // Search and Filter States for Student Rosters
  const [rosterSearch, setRosterSearch] = useState('');
  const [rosterBatchFilter, setRosterBatchFilter] = useState('All');
  const [rosterStatusFilter, setRosterStatusFilter] = useState('All');

  // Search and Filter States for Backend Excel Registry
  const [registrySearch, setRegistrySearch] = useState('');
  const [registryIndustryFilter, setRegistryIndustryFilter] = useState('All');

  // Attendance Marking Modal States
  const [markingDate, setMarkingDate] = useState('2026-09-09');
  const [markingTopic, setMarkingTopic] = useState('Session: Relational 3NF & SQL Query Optimization');
  const [studentAttendanceStatus, setStudentAttendanceStatus] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  // Form state for creating batch
  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchCourseId, setNewBatchCourseId] = useState(courses[0]?.id || '');
  const [newBatchCohort, setNewBatchCohort] = useState('cohort-2026-04');
  const [newBatchStudents, setNewBatchStudents] = useState('30');
  const [newBatchSessions, setNewBatchSessions] = useState('32');

  // Interactive Students Roster Data
  const [allStudents, setAllStudents] = useState([
    { id: 'std-1', rollNo: 'SF-2026-001', name: 'Talha Jubayer', email: 'talhajuba@gmail.com', batchId: 'batch-1', batchName: 'B1: Database Systems', attendance: 92, progress: 85, status: 'Active', grade: 'A', certified: false },
    { id: 'std-2', rollNo: 'SF-2026-002', name: 'Priya Sharma', email: 'priya.s@gmail.com', batchId: 'batch-1', batchName: 'B1: Database Systems', attendance: 95, progress: 90, status: 'Active', grade: 'A+', certified: false },
    { id: 'std-3', rollNo: 'SF-2026-003', name: 'Rohan Deshmukh', email: 'rohan.d@gmail.com', batchId: 'batch-1', batchName: 'B1: Database Systems', attendance: 98, progress: 100, status: 'Completed', grade: 'O (Outstanding)', certified: true },
    { id: 'std-4', rollNo: 'SF-2026-004', name: 'Ananya Verma', email: 'ananya.v@gmail.com', batchId: 'batch-2', batchName: 'B2: Python Backend', attendance: 84, progress: 75, status: 'Active', grade: 'B+', certified: false },
    { id: 'std-5', rollNo: 'SF-2026-005', name: 'Vikram Patel', email: 'vikram.p@gmail.com', batchId: 'batch-2', batchName: 'B2: Python Backend', attendance: 80, progress: 80, status: 'Active', grade: 'B', certified: false },
    { id: 'std-6', rollNo: 'SF-2026-006', name: 'Kavita Nair', email: 'kavita.n@gmail.com', batchId: 'batch-3', batchName: 'B3: Cloud DevOps', attendance: 96, progress: 100, status: 'Completed', grade: 'A+', certified: true },
    { id: 'std-7', rollNo: 'SF-2026-007', name: 'Deepak Joshi', email: 'deepak.j@gmail.com', batchId: 'batch-3', batchName: 'B3: Cloud DevOps', attendance: 89, progress: 88, status: 'Active', grade: 'A', certified: false },
    { id: 'std-8', rollNo: 'SF-2026-008', name: 'Sneha Kulkarni', email: 'sneha.k@gmail.com', batchId: 'batch-1', batchName: 'B1: Database Systems', attendance: 91, progress: 82, status: 'Active', grade: 'A', certified: false }
  ]);

  // Interactive Attendance Log History Data
  const [attendanceLogs, setAttendanceLogs] = useState([
    { id: 'log-1', date: '2026-09-08', batchId: 'batch-1', batchName: 'B1: Database Systems', sessionNum: 14, topic: 'Relational 3NF & Schema Normalization', present: 28, absent: 2, total: 30, rate: 93, instructor: 'Dr. R. Verma' },
    { id: 'log-2', date: '2026-09-07', batchId: 'batch-1', batchName: 'B1: Database Systems', sessionNum: 13, topic: 'Aggregate Functions & GROUP BY Queries', present: 27, absent: 3, total: 30, rate: 90, instructor: 'Dr. R. Verma' },
    { id: 'log-3', date: '2026-09-06', batchId: 'batch-2', batchName: 'B2: Python Backend', sessionNum: 18, topic: 'FastAPI Routing & Dependency Injection', present: 24, absent: 1, total: 25, rate: 96, instructor: 'Prof. Ananya Sen' },
    { id: 'log-4', date: '2026-09-05', batchId: 'batch-3', batchName: 'B3: Cloud DevOps', sessionNum: 9, topic: 'Docker Containerization & Kubernetes Pods', present: 22, absent: 3, total: 25, rate: 88, instructor: 'Er. Sandeep Rao' },
    { id: 'log-5', date: '2026-09-04', batchId: 'batch-1', batchName: 'B1: Database Systems', sessionNum: 12, topic: 'Subqueries and Common Table Expressions (CTEs)', present: 29, absent: 1, total: 30, rate: 97, instructor: 'Dr. R. Verma' }
  ]);

  // Initialize attendance check state for selected batch
  const openRecordAttendance = (batch) => {
    const targetBatch = batch || selectedBatch || batches[0];
    setSelectedBatch(targetBatch);
    const studentsInBatch = allStudents.filter(s => s.batchId === targetBatch.id);
    const initialStatus = {};
    studentsInBatch.forEach(s => {
      initialStatus[s.id] = true; // Default present
    });
    setStudentAttendanceStatus(initialStatus);
    setShowAttendanceModal(true);
  };

  const handleSaveAttendance = (e) => {
    e.preventDefault();
    if (!selectedBatch) return;

    const studentsInBatch = allStudents.filter(s => s.batchId === selectedBatch.id);
    let presentCount = 0;
    studentsInBatch.forEach(s => {
      if (studentAttendanceStatus[s.id]) presentCount++;
    });
    const absentCount = studentsInBatch.length - presentCount;
    const rate = Math.round((presentCount / (studentsInBatch.length || 1)) * 100);

    const newLog = {
      id: `log-${Date.now()}`,
      date: markingDate,
      batchId: selectedBatch.id,
      batchName: selectedBatch.name,
      sessionNum: (selectedBatch.completedSessions || 14) + 1,
      topic: markingTopic,
      present: presentCount,
      absent: absentCount,
      total: studentsInBatch.length,
      rate: rate,
      instructor: 'Dr. Rajesh Verma'
    };

    setAttendanceLogs(prev => [newLog, ...prev]);
    updateBatchAttendance(selectedBatch.id, 1);
    setShowAttendanceModal(false);

    setToastMessage(`✓ Attendance recorded successfully for ${selectedBatch.name} on ${markingDate} (${rate}% attendance rate).`);
    setTimeout(() => setToastMessage(''), 4500);
  };

  const handleCreateBatch = (e) => {
    e.preventDefault();
    if (!newBatchName.trim()) return;
    createNewBatch({
      name: newBatchName,
      courseId: newBatchCourseId,
      cohortId: newBatchCohort,
      totalStudents: newBatchStudents,
      totalSessions: newBatchSessions
    });
    setNewBatchName('');
    setShowCreateBatchModal(false);
    setToastMessage(`✓ Batch "${newBatchName}" created successfully!`);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Filtered Students for Student Roster view
  const filteredStudents = allStudents.filter((std) => {
    const matchesSearch =
      std.name.toLowerCase().includes(rosterSearch.toLowerCase()) ||
      std.email.toLowerCase().includes(rosterSearch.toLowerCase()) ||
      std.rollNo.toLowerCase().includes(rosterSearch.toLowerCase());
    const matchesBatch = rosterBatchFilter === 'All' || std.batchId === rosterBatchFilter;
    const matchesStatus = rosterStatusFilter === 'All' || std.status === rosterStatusFilter;
    return matchesSearch && matchesBatch && matchesStatus;
  });

  // PDF / Hardcopy Report Generation
  const printReport = (reportType) => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-6 animate-in fade-in duration-200">
      {/* Header with Navigation Sub-Pills */}
      <div className="farming-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
            <Building className="w-4 h-4" />
            <span>Institution Management Hub</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Apex Skill Academy • Academic & Attendance Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage course cohorts, student enrollment rosters, biometric session logs, and verified hardcopy reports.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => openRecordAttendance(selectedBatch)}
            className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm hover:scale-[1.02]"
          >
            <Calendar className="w-4 h-4" />
            <span>Record Today's Attendance</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCreateBatchModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Batch</span>
          </button>
        </div>
      </div>

      {/* INSTITUTION PROFILE COMPLETION CALLOUT */}
      <ProfileCompletionCard role="institution" />

      {/* Toast notification */}
      {toastMessage && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-xs animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage('')} className="text-emerald-700 hover:text-emerald-900 text-xs underline">
            Dismiss
          </button>
        </div>
      )}

      {/* 3 Clickable Primary Sub-Tabs: Batches & Courses, Student Rosters, Attendance Logs */}
      <div className="flex items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-x-auto">
        <button
          type="button"
          onClick={() => {
            setCurrentView('batches');
            setActiveTab('institution');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
            currentView === 'batches'
              ? 'bg-[#0F4C47] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Batches & Courses</span>
          <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-white/20">
            {batches.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentView('students');
            setActiveTab('institution-students');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
            currentView === 'students'
              ? 'bg-[#0F4C47] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Student Rosters</span>
          <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-white/20">
            {allStudents.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentView('attendance');
            setActiveTab('institution-attendance');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
            currentView === 'attendance'
              ? 'bg-[#0F4C47] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Attendance Logs</span>
          <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-white/20">
            {attendanceLogs.length} Logs
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentView('registry');
            setActiveTab('institution-registry');
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
            currentView === 'registry'
              ? 'bg-[#107C41] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Learner Profiles Excel Sheet</span>
          <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-black">
            {learnerProfilesRegistry.length} Synced
          </span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Total Students</div>
          <div className="text-xl font-black text-slate-900 mt-1">{allStudents.length} Enrolled</div>
          <div className="text-xs text-slate-500 mt-1">Across 3 active training cohorts</div>
        </div>

        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Active Batches</div>
          <div className="text-xl font-black text-[#0F4C47] mt-1">{batches.length} Active</div>
          <div className="text-xs text-slate-500 mt-1">Cohorts 2026-01 & 2026-04</div>
        </div>

        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Average Attendance</div>
          <div className="text-xl font-black text-teal-700 mt-1">91.4%</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Exceeds 75% regulatory benchmark</div>
        </div>

        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Assessment Clearance</div>
          <div className="text-xl font-black text-slate-900 mt-1">87.5% Pass</div>
          <div className="text-xs text-slate-500 mt-1">Standardized pass rate</div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SUBVIEW 1: BATCHES & COURSES                             */}
      {/* ======================================================== */}
      {currentView === 'batches' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Batches List (1 Col) */}
          <div className="farming-card p-5">
            <h3 className="font-bold text-base text-slate-900 mb-3">All Training Batches</h3>
            <div className="space-y-2.5">
              {batches.map((batch) => {
                const isSelected = selectedBatch?.id === batch.id;
                return (
                  <div
                    key={batch.id}
                    onClick={() => setSelectedBatch(batch)}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#0F4C47] bg-[#E2F1ED]/50 ring-2 ring-[#0F4C47]/10'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 mb-1">
                      <span>{batch.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {batch.status}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 truncate font-medium">
                      {batch.courseName}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-2 border-t border-slate-100">
                      <span>{batch.totalStudents} Students</span>
                      <span className="font-bold text-[#0F4C47]">
                        Att: {batch.avgAttendance}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Batch Details & Students Roster (2 Cols) */}
          <div className="lg:col-span-2 space-y-5">
            {selectedBatch && (
              <div className="farming-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E2F1ED] text-[#0F4C47]">
                      Active Selected Batch
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                      {selectedBatch.name} • {selectedBatch.courseName}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Dates: {selectedBatch.startDate} to {selectedBatch.endDate} • Completed Sessions: {selectedBatch.completedSessions}/{selectedBatch.totalSessions}
                    </div>
                  </div>

                  {/* Mark Attendance Action */}
                  <button
                    type="button"
                    onClick={() => openRecordAttendance(selectedBatch)}
                    className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all shadow-xs shrink-0 flex items-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Record Today's Attendance</span>
                  </button>
                </div>

                {/* Student Roster Table for Selected Batch */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Enrolled Students ({allStudents.filter(s => s.batchId === selectedBatch.id).length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setCurrentView('students');
                        setActiveTab('institution-students');
                      }}
                      className="text-xs font-bold text-teal-800 hover:underline flex items-center gap-1"
                    >
                      <span>Open Full Roster View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                          <th className="py-2 font-bold">Roll / Student</th>
                          <th className="py-2 font-bold">Attendance</th>
                          <th className="py-2 font-bold">Progress</th>
                          <th className="py-2 font-bold">Status</th>
                          <th className="py-2 font-bold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {allStudents
                          .filter(s => s.batchId === selectedBatch.id)
                          .map((std) => (
                            <tr key={std.id} className="hover:bg-slate-50/50">
                              <td className="py-2.5 font-bold text-slate-900">
                                <div>{std.name}</div>
                                <div className="text-[10px] text-slate-400 font-normal">{std.rollNo} • {std.email}</div>
                              </td>
                              <td className="py-2.5 font-semibold text-slate-700">
                                <span className={`px-2 py-0.5 rounded-full font-bold ${
                                  std.attendance >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'
                                }`}>
                                  {std.attendance}%
                                </span>
                              </td>
                              <td className="py-2.5">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                    <div
                                      className="bg-[#0F4C47] h-full rounded-full"
                                      style={{ width: `${std.progress}%` }}
                                    ></div>
                                  </div>
                                  <span className="font-bold text-slate-700">{std.progress}%</span>
                                </div>
                              </td>
                              <td className="py-2.5">
                                <span
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    std.status === 'Completed'
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : 'bg-teal-50 text-teal-800'
                                  }`}
                                >
                                  {std.status}
                                </span>
                              </td>
                              <td className="py-2.5 text-right">
                                <button
                                  type="button"
                                  onClick={() => setSelectedStudentDetail(std)}
                                  className="text-[11px] font-bold text-[#0F4C47] hover:underline"
                                >
                                  View Record
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBVIEW 2: STUDENT ROSTERS (CLICKABLE + PDF EXPORT)      */}
      {/* ======================================================== */}
      {currentView === 'students' && (
        <div className="space-y-4">
          <div className="farming-card p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Comprehensive Student Enrollment Rosters
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Full student census across technical batches with verified attendance metrics and certification readiness.
                </p>
              </div>

              {/* PDF REPORT & PRINT HARDCOPY BUTTON */}
              <button
                type="button"
                onClick={() => printReport('roster')}
                className="px-4 py-2.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs shrink-0 hover:scale-[1.02]"
                title="Generate printable PDF report for student roster records"
              >
                <Printer className="w-4 h-4" />
                <span>Generate PDF Report / Print Hardcopy</span>
              </button>
            </div>

            {/* Filters and Search Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by student name, roll no, or email..."
                  value={rosterSearch}
                  onChange={(e) => setRosterSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#0F4C47] outline-none"
                />
              </div>

              <div>
                <select
                  value={rosterBatchFilter}
                  onChange={(e) => setRosterBatchFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0F4C47] outline-none bg-white"
                >
                  <option value="All">All Batches</option>
                  {batches.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={rosterStatusFilter}
                  onChange={(e) => setRosterStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#0F4C47] outline-none bg-white"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Full Roster Table */}
            <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                    <th className="p-3 font-bold">Roll Number</th>
                    <th className="p-3 font-bold">Student Name</th>
                    <th className="p-3 font-bold">Assigned Batch</th>
                    <th className="p-3 font-bold">Attendance</th>
                    <th className="p-3 font-bold">Progress</th>
                    <th className="p-3 font-bold">Academic Grade</th>
                    <th className="p-3 font-bold">Status</th>
                    <th className="p-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-700">
                        {std.rollNo}
                      </td>
                      <td className="p-3 font-bold text-slate-900">
                        <div>{std.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{std.email}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-700">
                        {std.batchName}
                      </td>
                      <td className="p-3 font-bold">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] ${
                          std.attendance >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'
                        }`}>
                          {std.attendance}%
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-[#0F4C47] h-full rounded-full"
                              style={{ width: `${std.progress}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-700">{std.progress}%</span>
                        </div>
                      </td>
                      <td className="p-3 font-bold text-teal-900">
                        {std.grade}
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          std.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-teal-50 text-teal-800'
                        }`}>
                          {std.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedStudentDetail(std)}
                          className="px-3 py-1 rounded-xl bg-teal-50 hover:bg-teal-100 text-[#0F4C47] text-[11px] font-bold transition-colors"
                        >
                          View Dossier
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Printable Official Roster Sheet Footer (Displayed when printing) */}
            <div className="hidden print:block mt-8 pt-6 border-t-2 border-slate-900 text-xs">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="font-bold">Authorized Signatory: _______________________</p>
                  <p className="text-[10px] text-slate-500">Dr. Rajesh Verma • Director of Academics</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Official Seal & Verification Stamp</p>
                  <p className="text-[10px] text-slate-500">Apex Skill Academy • Affiliated Institution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBVIEW 3: ATTENDANCE LOGS (CLICKABLE + PDF EXPORT)      */}
      {/* ======================================================== */}
      {currentView === 'attendance' && (
        <div className="space-y-4">
          <div className="farming-card p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Institutional Daily Attendance Registers
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Longitudinal timestamped session logs verifying candidate seat occupancy and regulatory training compliance.
                </p>
              </div>

              {/* PDF REPORT & PRINT HARDCOPY BUTTON */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openRecordAttendance(selectedBatch)}
                  className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs shrink-0"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Record Today's Attendance</span>
                </button>

                <button
                  type="button"
                  onClick={() => printReport('attendance')}
                  className="px-4 py-2.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs shrink-0 hover:scale-[1.02]"
                  title="Generate printable PDF report for daily attendance records"
                >
                  <Printer className="w-4 h-4" />
                  <span>Generate PDF Report / Print Hardcopy</span>
                </button>
              </div>
            </div>

            {/* Attendance Logs Table */}
            <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                    <th className="p-3 font-bold">Session Date</th>
                    <th className="p-3 font-bold">Batch & Cohort</th>
                    <th className="p-3 font-bold">Session #</th>
                    <th className="p-3 font-bold">Curriculum Topic Covered</th>
                    <th className="p-3 font-bold">Present / Total</th>
                    <th className="p-3 font-bold">Attendance Rate</th>
                    <th className="p-3 font-bold">Verified By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {attendanceLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-800">
                        {log.date}
                      </td>
                      <td className="p-3 font-bold text-[#0F4C47]">
                        {log.batchName}
                      </td>
                      <td className="p-3 font-mono text-slate-600 font-bold">
                        Lecture {log.sessionNum}
                      </td>
                      <td className="p-3 text-slate-800 font-medium">
                        {log.topic}
                      </td>
                      <td className="p-3 font-bold text-slate-700">
                        {log.present} / {log.total} Students
                      </td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          log.rate >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {log.rate}% Rate
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 font-medium">
                        {log.instructor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Printable Official Attendance Register Footer */}
            <div className="hidden print:block mt-8 pt-6 border-t-2 border-slate-900 text-xs">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="font-bold">Academic Dean Signature: _______________________</p>
                  <p className="text-[10px] text-slate-500">Official Daily Attendance Compliance Verification</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Certified Institutional Register</p>
                  <p className="text-[10px] text-slate-500">Apex Skill Academy • Report generated {new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUBVIEW 4: MASTER LEARNER PROFILES EXCEL REGISTRY (BACKEND) */}
      {/* ======================================================== */}
      {currentView === 'registry' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="farming-card p-6 border-2 border-emerald-600/30">
            {/* Header with Excel branding */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#107C41] text-white flex items-center justify-center font-black text-xs shadow-xs">
                    X
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                    Live Backend Excel Sync Active
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Sheet: <strong className="text-slate-800 font-mono">Learner_Registry_Master.xlsx</strong>
                  </span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  Learner Profiles Master Backend Excel Registry
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  Every time a learner completes their profile, all their educational details, languages, target industry, and verified skills are automatically written and saved to this live central Excel sheet, synchronized directly across Institution and Government/Private Portals.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
                <button
                  type="button"
                  onClick={() => exportRegistryToCSV(null, 'Institution_Learner_Profiles_Registry.csv')}
                  className="px-4 py-2.5 rounded-xl bg-[#107C41] hover:bg-[#0D6535] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 hover:scale-[1.02]"
                  title="Export live backend database to Microsoft Excel CSV"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Excel Sheet (.csv)</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <div className="text-[10px] font-bold text-emerald-800 uppercase">Profiles Stored</div>
                <div className="text-lg font-black text-emerald-900 mt-0.5">{learnerProfilesRegistry.length} Records</div>
                <div className="text-[11px] text-emerald-700">100% Complete</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Database Status</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">Online & Synced</div>
                <div className="text-[11px] text-teal-700">Real-time sync</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Portals Connected</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">3 Active Nodes</div>
                <div className="text-[11px] text-slate-600">Learner + Inst + Govt/Pvt</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-500 uppercase">Format</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">UTF-8 .CSV / .XLSX</div>
                <div className="text-[11px] text-slate-600">Excel compatible</div>
              </div>
            </div>

            {/* Search & Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <div className="relative sm:col-span-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Excel sheet by Candidate ID, Name, Email, Degree, City..."
                  value={registrySearch}
                  onChange={(e) => setRegistrySearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:border-[#107C41] outline-none"
                />
              </div>

              <div>
                <select
                  value={registryIndustryFilter}
                  onChange={(e) => setRegistryIndustryFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:border-[#107C41] outline-none bg-white"
                >
                  <option value="All">All Target Industries</option>
                  <option value="IT & Software Engineering">IT & Software Engineering</option>
                  <option value="Cloud Infrastructure & DevOps">Cloud Infrastructure & DevOps</option>
                  <option value="Renewable Energy & EV Tech">Renewable Energy & EV Tech</option>
                  <option value="Advanced Manufacturing & Robotics">Advanced Manufacturing & Robotics</option>
                </select>
              </div>
            </div>

            {/* SPREADSHEET VIEWER UI */}
            <div className="mt-4 rounded-2xl border border-slate-300 overflow-hidden shadow-xs bg-white">
              {/* Excel Ribbon / Toolbar Header */}
              <div className="bg-[#107C41] text-white px-4 py-2 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-3">
                  <span className="bg-white/20 px-2 py-0.5 rounded text-[11px] font-mono">FILE</span>
                  <span className="text-white/80 hover:text-white cursor-pointer">HOME</span>
                  <span className="text-white/80 hover:text-white cursor-pointer">INSERT</span>
                  <span className="text-white/80 hover:text-white cursor-pointer">DATA</span>
                  <span className="text-white/80 hover:text-white cursor-pointer hidden sm:inline">VIEW</span>
                </div>
                <div className="text-[11px] text-emerald-100 font-mono">
                  Rows: {learnerProfilesRegistry.length} | Columns: 13 (A–M)
                </div>
              </div>

              {/* Table with Excel Column Letters and Row Numbers */}
              <div className="overflow-x-auto max-h-[520px]">
                <table className="w-full text-left text-xs border-collapse font-sans">
                  <thead>
                    {/* Excel Column Headers: A, B, C, D... */}
                    <tr className="bg-slate-100 border-b border-slate-300 text-slate-500 font-mono text-[10px] text-center select-none">
                      <th className="py-1 px-2 border-r border-slate-300 w-10 bg-slate-200">#</th>
                      <th className="py-1 px-3 border-r border-slate-300">A</th>
                      <th className="py-1 px-3 border-r border-slate-300">B</th>
                      <th className="py-1 px-3 border-r border-slate-300">C</th>
                      <th className="py-1 px-3 border-r border-slate-300">D</th>
                      <th className="py-1 px-3 border-r border-slate-300">E</th>
                      <th className="py-1 px-3 border-r border-slate-300">F</th>
                      <th className="py-1 px-3 border-r border-slate-300">G</th>
                      <th className="py-1 px-3 border-r border-slate-300">H</th>
                      <th className="py-1 px-3 border-r border-slate-300">I</th>
                      <th className="py-1 px-3 border-r border-slate-300">J</th>
                      <th className="py-1 px-3 border-r border-slate-300">K</th>
                      <th className="py-1 px-3">L</th>
                    </tr>

                    {/* Named Data Column Headers */}
                    <tr className="bg-slate-50 border-b-2 border-slate-300 text-slate-700 text-[11px] font-black uppercase tracking-wider">
                      <th className="p-2 border-r border-slate-200 text-center text-slate-400 bg-slate-100">Row</th>
                      <th className="p-2.5 border-r border-slate-200">Candidate ID</th>
                      <th className="p-2.5 border-r border-slate-200">Full Name</th>
                      <th className="p-2.5 border-r border-slate-200">Contact (Email / Phone)</th>
                      <th className="p-2.5 border-r border-slate-200">Location (City, State, Country)</th>
                      <th className="p-2.5 border-r border-slate-200">Education Degree & Institution</th>
                      <th className="p-2.5 border-r border-slate-200">Preferred Languages</th>
                      <th className="p-2.5 border-r border-slate-200">Target Industry</th>
                      <th className="p-2.5 border-r border-slate-200">Target Role</th>
                      <th className="p-2.5 border-r border-slate-200">Verified Skills</th>
                      <th className="p-2.5 border-r border-slate-200 text-center">Profile %</th>
                      <th className="p-2.5 border-r border-slate-200">Registry Timestamp</th>
                      <th className="p-2.5">Private Testing Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
                    {learnerProfilesRegistry
                      .filter(p => {
                        const searchLower = registrySearch.toLowerCase();
                        const matchesSearch =
                          p.name?.toLowerCase().includes(searchLower) ||
                          p.id?.toLowerCase().includes(searchLower) ||
                          p.email?.toLowerCase().includes(searchLower) ||
                          p.city?.toLowerCase().includes(searchLower) ||
                          p.education?.toLowerCase().includes(searchLower);
                        const matchesIndustry = registryIndustryFilter === 'All' || p.targetIndustry === registryIndustryFilter;
                        return matchesSearch && matchesIndustry;
                      })
                      .map((profile, idx) => (
                        <tr key={profile.id || idx} className="hover:bg-emerald-50/40 transition-colors">
                          <td className="p-2 border-r border-slate-200 text-center font-bold text-slate-400 bg-slate-50">
                            {idx + 1}
                          </td>
                          <td className="p-2.5 border-r border-slate-200 font-bold text-teal-800 whitespace-nowrap">
                            {profile.id}
                          </td>
                          <td className="p-2.5 border-r border-slate-200 font-bold text-slate-900 font-sans whitespace-nowrap">
                            {profile.name}
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-600 font-sans whitespace-nowrap">
                            <div>{profile.email}</div>
                            <div className="text-[10px] text-slate-400">{profile.phone}</div>
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-700 font-sans whitespace-nowrap">
                            {profile.city}, {profile.state} ({profile.country})
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-700 font-sans min-w-[200px]">
                            <div className="font-bold text-slate-900">{profile.education}</div>
                            <div className="text-[10px] text-slate-500">{profile.institution}</div>
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-700 font-sans whitespace-nowrap">
                            {profile.languages || 'English, Hindi'}
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-800 font-sans font-semibold whitespace-nowrap">
                            {profile.targetIndustry}
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-700 font-sans whitespace-nowrap">
                            {profile.targetRole}
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-700 font-sans min-w-[180px]">
                            <span className="bg-teal-50 text-teal-900 px-2 py-0.5 rounded text-[10px] font-bold">
                              {profile.skills}
                            </span>
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-center font-bold">
                            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[10px] font-black">
                              {profile.completionRate || 100}%
                            </span>
                          </td>
                          <td className="p-2.5 border-r border-slate-200 text-slate-500 text-[10px] whitespace-nowrap">
                            {profile.timestamp}
                          </td>
                          <td className="p-2.5 font-sans whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-[#0F4C47] border border-teal-200">
                              {profile.privateInterviewStatus || 'Available for Corporate Review'}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Excel Status Bar at Bottom */}
              <div className="bg-slate-100 border-t border-slate-200 px-4 py-1.5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Ready • 100% Synced with Central Registry</span>
                <span>Microsoft Excel Compatible Format (.CSV / .XLSX)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RECORD TODAY'S ATTENDANCE MODAL */}
      {showAttendanceModal && selectedBatch && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 shadow-2xl border border-teal-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-black">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Record Today's Attendance
                  </h3>
                  <p className="text-xs text-slate-500">
                    Batch: <span className="font-bold text-[#0F4C47]">{selectedBatch.name}</span> • {selectedBatch.courseName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAttendanceModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAttendance} className="space-y-4 mt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Session Date</label>
                  <input
                    type="date"
                    required
                    value={markingDate}
                    onChange={(e) => setMarkingDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Session Topic / Curriculum Module</label>
                  <input
                    type="text"
                    required
                    value={markingTopic}
                    onChange={(e) => setMarkingTopic(e.target.value)}
                    placeholder="e.g. Module 4: Relational Indexing and Joins"
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none font-medium"
                  />
                </div>
              </div>

              {/* Quick toggle all */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                  Student Roll Call ({allStudents.filter(s => s.batchId === selectedBatch.id).length} Students)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const updated = {};
                      allStudents.filter(s => s.batchId === selectedBatch.id).forEach(s => {
                        updated[s.id] = true;
                      });
                      setStudentAttendanceStatus(updated);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 transition-colors"
                  >
                    Mark All Present
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = {};
                      allStudents.filter(s => s.batchId === selectedBatch.id).forEach(s => {
                        updated[s.id] = false;
                      });
                      setStudentAttendanceStatus(updated);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-bold hover:bg-rose-100 transition-colors"
                  >
                    Mark All Absent
                  </button>
                </div>
              </div>

              {/* Student Checklist Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden max-h-60 overflow-y-auto divide-y divide-slate-100">
                {allStudents
                  .filter(s => s.batchId === selectedBatch.id)
                  .map((std) => {
                    const isPresent = Boolean(studentAttendanceStatus[std.id]);
                    return (
                      <div
                        key={std.id}
                        className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
                      >
                        <div>
                          <div className="font-bold text-slate-900">{std.name}</div>
                          <div className="text-[10px] text-slate-400">{std.rollNo} • Current avg: {std.attendance}%</div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setStudentAttendanceStatus(prev => ({
                              ...prev,
                              [std.id]: !isPresent
                            }));
                          }}
                          className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                            isPresent
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {isPresent ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Present</span>
                            </>
                          ) : (
                            <>
                              <X className="w-3.5 h-3.5" />
                              <span>Absent</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAttendanceModal(false)}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white font-black shadow-md flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Submit & Save Attendance Log</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STUDENT DETAIL DOSSIER MODAL */}
      {selectedStudentDetail && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-teal-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#E2F1ED] text-[#0F4C47] flex items-center justify-center font-black">
                  🧑‍🎓
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    Student Record & Dossier
                  </h3>
                  <p className="text-xs text-slate-500">
                    Roll: <span className="font-mono font-bold text-teal-800">{selectedStudentDetail.rollNo}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStudentDetail(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <div className="font-extrabold text-sm text-slate-900">{selectedStudentDetail.name}</div>
                <div className="text-slate-500">{selectedStudentDetail.email}</div>
                <div className="text-teal-800 font-bold mt-1">Batch: {selectedStudentDetail.batchName}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Attendance Record</span>
                  <span className="text-lg font-black text-emerald-700">{selectedStudentDetail.attendance}%</span>
                </div>
                <div className="p-3 rounded-2xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Curriculum Progress</span>
                  <span className="text-lg font-black text-[#0F4C47]">{selectedStudentDetail.progress}%</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Assessment Grade</span>
                  <span className="font-black text-slate-900">{selectedStudentDetail.grade}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                  selectedStudentDetail.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'
                }`}>
                  {selectedStudentDetail.status}
                </span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedStudentDetail(null)}
                className="px-5 py-2 rounded-xl bg-[#0F4C47] text-white font-bold"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Batch Modal */}
      {showCreateBatchModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-[#E2ECE8]">
            <h3 className="text-base font-extrabold text-slate-900 mb-1">
              Create New Training Batch
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Configure course assignment and cohort schedule.
            </p>

            <form onSubmit={handleCreateBatch} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Batch Identifier</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DSA-2026-B3"
                  value={newBatchName}
                  onChange={(e) => setNewBatchName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Assigned Course</label>
                <select
                  value={newBatchCourseId}
                  onChange={(e) => setNewBatchCourseId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none bg-white font-semibold"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.skill})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Max Students</label>
                  <input
                    type="number"
                    value={newBatchStudents}
                    onChange={(e) => setNewBatchStudents(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Total Sessions</label>
                  <input
                    type="number"
                    value={newBatchSessions}
                    onChange={(e) => setNewBatchSessions(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-[#0F4C47] outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateBatchModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold shadow-sm"
                >
                  Create Batch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
