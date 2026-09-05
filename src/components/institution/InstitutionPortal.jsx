import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
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
  ArrowRight
} from 'lucide-react';

export const InstitutionPortal = () => {
  const {
    batches,
    courses,
    createNewBatch,
    updateBatchAttendance
  } = useApp();

  const [showCreateBatchModal, setShowCreateBatchModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(batches[0] || null);

  // Form state for creating batch
  const [newBatchName, setNewBatchName] = useState('');
  const [newBatchCourseId, setNewBatchCourseId] = useState(courses[0]?.id || '');
  const [newBatchCohort, setNewBatchCohort] = useState('cohort-2026-04');
  const [newBatchStudents, setNewBatchStudents] = useState('30');
  const [newBatchSessions, setNewBatchSessions] = useState('32');

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
  };

  // Mock students for the selected batch
  const batchStudents = [
    { id: 'std-1', name: 'Talha Jubayer', email: 'talhajuba@gmail.com', attendance: 88, progress: 85, status: 'Active' },
    { id: 'std-2', name: 'Priya Sharma', email: 'priya.s@gmail.com', attendance: 92, progress: 90, status: 'Active' },
    { id: 'std-3', name: 'Rohan Deshmukh', email: 'rohan.d@gmail.com', attendance: 95, progress: 95, status: 'Completed' },
    { id: 'std-4', name: 'Ananya Verma', email: 'ananya.v@gmail.com', attendance: 82, progress: 75, status: 'Active' },
    { id: 'std-5', name: 'Vikram Patel', email: 'vikram.p@gmail.com', attendance: 80, progress: 80, status: 'Active' },
    { id: 'std-6', name: 'Kavita Nair', email: 'kavita.n@gmail.com', attendance: 96, progress: 100, status: 'Completed' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="farming-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
            <Building className="w-4 h-4" />
            <span>Institution Portal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Apex Skill Academy • Training & Batch Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage course cohorts, student enrollment rosters, session attendance, and completion verification.
          </p>
        </div>

        <button
          onClick={() => setShowCreateBatchModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Batch</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Total Students</div>
          <div className="text-xl font-black text-slate-900 mt-1">340</div>
          <div className="text-xs text-slate-500 mt-1">Across 3 active batches</div>
        </div>

        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Active Batches</div>
          <div className="text-xl font-black text-[#0F4C47] mt-1">{batches.length}</div>
          <div className="text-xs text-slate-500 mt-1">Cohorts 2026-01 & 2026-04</div>
        </div>

        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Average Attendance</div>
          <div className="text-xl font-black text-teal-700 mt-1">88%</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Exceeds 75% benchmark</div>
        </div>

        <div className="farming-card p-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Completion Rate</div>
          <div className="text-xl font-black text-slate-900 mt-1">87%</div>
          <div className="text-xs text-slate-500 mt-1">Standardized assessment pass</div>
        </div>
      </div>

      {/* Batches Table & Student Roster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Batches List (1 Col) */}
        <div className="farming-card p-5">
          <h3 className="font-bold text-base text-slate-900 mb-3">All Batches</h3>
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
                    Selected Batch
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
                  onClick={() => updateBatchAttendance(selectedBatch.id, 1)}
                  className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-xs shrink-0 flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Record Today's Attendance</span>
                </button>
              </div>

              {/* Student Roster Table */}
              <div className="mt-4">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                  Enrolled Students ({batchStudents.length})
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                        <th className="py-2 font-bold">Student Name</th>
                        <th className="py-2 font-bold">Attendance</th>
                        <th className="py-2 font-bold">Progress</th>
                        <th className="py-2 font-bold">Status</th>
                        <th className="py-2 font-bold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {batchStudents.map((std) => (
                        <tr key={std.id} className="hover:bg-slate-50/50">
                          <td className="py-2.5 font-bold text-slate-900">
                            <div>{std.name}</div>
                            <div className="text-[10px] text-slate-400 font-normal">{std.email}</div>
                          </td>
                          <td className="py-2.5 font-semibold text-slate-700">
                            {std.attendance}%
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
                            <button className="text-[11px] font-bold text-[#0F4C47] hover:underline">
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
