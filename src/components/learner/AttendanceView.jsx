import React from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarDays, CheckCircle, Clock, AlertTriangle, ChevronDown } from 'lucide-react';

export const AttendanceView = () => {
  const { currentUser } = useApp();
  const summary = currentUser.attendanceSummary || { overallPercentage: 80, presentSessions: 40, totalSessions: 50 };

  const sessionLogs = [
    { date: '25 Apr 2026', course: 'Advanced SQL & Database Architecture', session: 'Session 32: B-Tree Indexes', status: 'Present', mode: 'Offline' },
    { date: '23 Apr 2026', course: 'Applied Data Structures', session: 'Session 28: Graph Cycle DFS', status: 'Present', mode: 'Online' },
    { date: '21 Apr 2026', course: 'Industrial Electrical Maintenance', session: 'Session 18: Star-Delta Interlocks', status: 'Present', mode: 'Offline' },
    { date: '19 Apr 2026', course: 'Advanced SQL & Database Architecture', session: 'Session 30: MVCC Isolation', status: 'Absent', mode: 'Offline', reason: 'Medical leave' },
    { date: '17 Apr 2026', course: 'Applied Data Structures', session: 'Session 26: Sliding Window Optimization', status: 'Present', mode: 'Online' },
    { date: '15 Apr 2026', course: 'Industrial Electrical Maintenance', session: 'Session 16: Thermal Overload Relays', status: 'Present', mode: 'Offline' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-6 animate-in fade-in duration-200">
      <div className="farming-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
            <CalendarDays className="w-4 h-4" />
            <span>Attendance & Participation Log</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Training Session Attendance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Official attendance records recorded by approved training institutions for course cohorts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs text-slate-500 font-medium">Cumulative Attendance</div>
            <div className="text-2xl font-extrabold text-[#0F4C47]">{summary.overallPercentage}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="farming-card p-4">
          <div className="text-xs font-bold text-slate-400 uppercase">Sessions Attended</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1">{summary.presentSessions} / {summary.totalSessions}</div>
          <div className="text-xs text-emerald-600 font-semibold mt-1">Meets 75% program requirement</div>
        </div>

        <div className="farming-card p-4">
          <div className="text-xs font-bold text-slate-400 uppercase">Absences Recorded</div>
          <div className="text-xl font-extrabold text-rose-600 mt-1">{summary.totalSessions - summary.presentSessions} Sessions</div>
          <div className="text-xs text-slate-500 mt-1">2 excused medical leaves</div>
        </div>

        <div className="farming-card p-4">
          <div className="text-xs font-bold text-slate-400 uppercase">Data Source</div>
          <div className="text-sm font-extrabold text-slate-800 mt-1">Institution-Provided</div>
          <div className="text-xs text-slate-500 mt-1">Verified by Apex Skill Academy</div>
        </div>
      </div>

      {/* Session Log Table */}
      <div className="farming-card p-6">
        <h3 className="font-bold text-base text-slate-900 mb-3">Recent Class Sessions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 font-bold">Date</th>
                <th className="py-2.5 font-bold">Course Title</th>
                <th className="py-2.5 font-bold">Topic / Unit</th>
                <th className="py-2.5 font-bold">Training Mode</th>
                <th className="py-2.5 font-bold text-right">Attendance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sessionLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 font-semibold text-slate-700">{log.date}</td>
                  <td className="py-3 font-bold text-slate-900">{log.course}</td>
                  <td className="py-3 text-slate-600">{log.session}</td>
                  <td className="py-3 text-slate-500">{log.mode}</td>
                  <td className="py-3 text-right">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        log.status === 'Present'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
