import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Shield,
  TrendingUp,
  BarChart3,
  Layers,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle,
  FileText,
  Filter,
  ArrowRight,
  Info,
  Sparkles,
  Building,
  BookOpen
} from 'lucide-react';

export const GovernmentPortal = () => {
  const {
    districts,
    providers,
    cohorts,
    courses,
    learnersDb
  } = useApp();

  // Active section tab
  const [analyticsView, setAnalyticsView] = useState('overview'); // 'overview' | 'drilldown' | 'providers' | 'cohorts' | 'demographics' | 'insights'

  // Cross-dimensional filter states
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedProvider, setSelectedProvider] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedCohort, setSelectedCohort] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');

  // Normalized calculations for high-level KPIs
  const totalEnrolled = learnersDb.length * 150; // scaled representative count
  const totalCompleted = Math.round(totalEnrolled * 0.86);
  const totalEmployed = Math.round(totalCompleted * 0.81);
  const completionRate = 86;
  const employmentConversion = 81;
  const sixMonthRetention = 78;

  // Filtered learners for cross-dimensional drilldown
  const filteredLearners = learnersDb.filter((l) => {
    const matchDist = selectedDistrict === 'All' || l.district === selectedDistrict;
    const matchCourse = selectedCourse === 'All' || l.courseId === selectedCourse;
    const matchCohort = selectedCohort === 'All' || l.cohortId === selectedCohort;
    const matchGender = selectedGender === 'All' || l.gender === selectedGender;
    return matchDist && matchCourse && matchCohort && matchGender;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="farming-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal-700">
            <Shield className="w-4 h-4" />
            <span>Government Impact Intelligence</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Skill-to-Employment Decision Support System
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitoring longitudinal outcomes, provider performance, cohort trends, and evidence-based policy priorities.
          </p>
        </div>

        {/* Responsible Evidence Rule Badge */}
        <div className="p-3.5 rounded-2xl bg-[#E2F1ED] border border-[#DCE8E3] text-[#0F4C47] max-w-md flex items-start gap-2.5">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <span className="font-bold">Evidence Rule:</span> System highlights outcome patterns and disparities. Root causal factors require contextual human investigation.
          </div>
        </div>
      </div>

      {/* Analytics Sub-Nav Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'overview', label: 'Program Overview' },
          { id: 'drilldown', label: 'Cross-Dimensional Drilldown' },
          { id: 'providers', label: 'Provider Performance' },
          { id: 'cohorts', label: 'Cohort Analysis' },
          { id: 'demographics', label: 'Demographic Parity' },
          { id: 'insights', label: 'Evidence-Based Insights' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAnalyticsView(tab.id)}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              analyticsView === tab.id
                ? 'bg-[#0F4C47] text-white shadow-xs'
                : 'bg-white border border-[#E5EFEA] text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* VIEW 1: PROGRAM OVERVIEW */}
      {analyticsView === 'overview' && (
        <div className="space-y-6">
          {/* KPI Normalized Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="farming-card p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Enrolled</div>
              <div className="text-lg font-black text-slate-900 mt-0.5">{totalEnrolled.toLocaleString()}</div>
              <div className="text-[11px] text-slate-500 mt-1">Across 6 districts</div>
            </div>

            <div className="farming-card p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Completed</div>
              <div className="text-lg font-black text-slate-900 mt-0.5">{totalCompleted.toLocaleString()}</div>
              <div className="text-[11px] text-teal-700 font-semibold mt-1">Verified assessments</div>
            </div>

            <div className="farming-card p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Completion Rate</div>
              <div className="text-lg font-black text-[#0F4C47] mt-0.5">{completionRate}%</div>
              <div className="text-[11px] text-slate-500 mt-1">Completed / Enrolled</div>
            </div>

            <div className="farming-card p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Total Employed</div>
              <div className="text-lg font-black text-slate-900 mt-0.5">{totalEmployed.toLocaleString()}</div>
              <div className="text-[11px] text-slate-500 mt-1">Self-reported outcomes</div>
            </div>

            <div className="farming-card p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Employment Conversion</div>
              <div className="text-lg font-black text-teal-700 mt-0.5">{employmentConversion}%</div>
              <div className="text-[11px] text-slate-500 mt-1">Employed / Completed</div>
            </div>

            <div className="farming-card p-4">
              <div className="text-[10px] font-bold text-slate-400 uppercase">6-Month Retention</div>
              <div className="text-lg font-black text-emerald-700 mt-0.5">{sixMonthRetention}%</div>
              <div className="text-[11px] text-slate-500 mt-1">Retained in role</div>
            </div>
          </div>

          {/* Longitudinal Outcome Funnel Visual */}
          <div className="farming-card p-6">
            <h3 className="font-bold text-base text-slate-900 mb-4">
              Longitudinal Outcome Funnel (Enrolled → Completed → Employed → Retained)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-500">1. ENROLLMENT</div>
                <div className="text-2xl font-black text-slate-900 mt-1">100%</div>
                <div className="text-xs text-slate-500 mt-0.5">{totalEnrolled.toLocaleString()} Trainees</div>
                <div className="w-full bg-slate-200 h-2 rounded-full mt-3">
                  <div className="bg-slate-700 h-full rounded-full w-full"></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
                <div className="text-xs font-bold text-teal-800">2. COMPLETION</div>
                <div className="text-2xl font-black text-[#0F4C47] mt-1">{completionRate}%</div>
                <div className="text-xs text-teal-700 mt-0.5">{totalCompleted.toLocaleString()} Certified</div>
                <div className="w-full bg-teal-200 h-2 rounded-full mt-3">
                  <div className="bg-[#0F4C47] h-full rounded-full" style={{ width: `${completionRate}%` }}></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-800">3. EMPLOYMENT</div>
                <div className="text-2xl font-black text-emerald-700 mt-1">{employmentConversion}%</div>
                <div className="text-xs text-emerald-700 mt-0.5">{totalEmployed.toLocaleString()} Employed</div>
                <div className="w-full bg-emerald-200 h-2 rounded-full mt-3">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${employmentConversion}%` }}></div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
                <div className="text-xs font-bold text-sky-800">4. 6M RETENTION</div>
                <div className="text-2xl font-black text-sky-700 mt-1">{sixMonthRetention}%</div>
                <div className="text-xs text-sky-700 mt-0.5">{Math.round(totalEmployed * 0.78).toLocaleString()} Retained</div>
                <div className="w-full bg-sky-200 h-2 rounded-full mt-3">
                  <div className="bg-sky-600 h-full rounded-full" style={{ width: `${sixMonthRetention}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* District Comparison Table */}
          <div className="farming-card p-6">
            <h3 className="font-bold text-base text-slate-900 mb-3">
              District Outcome Matrix (Normalized Rates)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="py-2.5 font-bold">District / State</th>
                    <th className="py-2.5 font-bold">Enrolled</th>
                    <th className="py-2.5 font-bold">Completed</th>
                    <th className="py-2.5 font-bold">Completion %</th>
                    <th className="py-2.5 font-bold">Employed</th>
                    <th className="py-2.5 font-bold">Conversion %</th>
                    <th className="py-2.5 font-bold">6M Retention</th>
                    <th className="py-2.5 font-bold">Avg Wage Band</th>
                    <th className="py-2.5 font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {districts.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-bold text-slate-900">
                        <div>{d.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{d.state}</div>
                      </td>
                      <td className="py-3 text-slate-700">{d.enrolled.toLocaleString()}</td>
                      <td className="py-3 text-slate-700">{d.completed.toLocaleString()}</td>
                      <td className="py-3 font-bold text-[#0F4C47]">{d.completionRate}%</td>
                      <td className="py-3 text-slate-700">{d.employed.toLocaleString()}</td>
                      <td className="py-3 font-extrabold text-teal-700">{d.employmentConversion}%</td>
                      <td className="py-3 text-slate-700">{d.retentionRate}%</td>
                      <td className="py-3 font-medium text-slate-800">{d.avgWageBand}</td>
                      <td className="py-3 text-[11px]">
                        {d.note ? (
                          <span className="text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                            Disparity Detected
                          </span>
                        ) : (
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                            Nominal
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CROSS-DIMENSIONAL DRILLDOWN (DISTRICT -> PROVIDER -> COURSE -> COHORT -> DEMOGRAPHIC -> OUTCOME) */}
      {analyticsView === 'drilldown' && (
        <div className="space-y-5">
          <div className="farming-card p-5">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Multi-Dimensional Drilldown Engine
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Filter program outcomes across District → Provider → Course → Cohort → Demographic Group.
            </p>

            {/* Filter controls row */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              <div>
                <label className="font-bold text-slate-600 block mb-1">1. District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full p-2 bg-[#F5F8F7] border border-slate-200 rounded-xl font-semibold outline-none"
                >
                  <option value="All">All Districts</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">2. Provider</label>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value)}
                  className="w-full p-2 bg-[#F5F8F7] border border-slate-200 rounded-xl font-semibold outline-none"
                >
                  <option value="All">All Providers</option>
                  {providers.map((p) => (
                    <option key={p.id} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">3. Course</label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full p-2 bg-[#F5F8F7] border border-slate-200 rounded-xl font-semibold outline-none"
                >
                  <option value="All">All Courses</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id}>{c.title.split('&')[0]}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">4. Cohort</label>
                <select
                  value={selectedCohort}
                  onChange={(e) => setSelectedCohort(e.target.value)}
                  className="w-full p-2 bg-[#F5F8F7] border border-slate-200 rounded-xl font-semibold outline-none"
                >
                  <option value="All">All Cohorts</option>
                  {cohorts.map((ch) => (
                    <option key={ch.id} value={ch.id}>{ch.name.split(' ')[0]} 2026</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600 block mb-1">5. Gender</label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full p-2 bg-[#F5F8F7] border border-slate-200 rounded-xl font-semibold outline-none"
                >
                  <option value="All">All Genders</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </div>
            </div>
          </div>

          {/* Drilldown Outcome Records */}
          <div className="farming-card p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-extrabold text-slate-900">
                Matching Learner Outcomes ({filteredLearners.length} Records)
              </h4>
              <span className="text-xs text-slate-500">
                Active Filter: {selectedDistrict} / {selectedCourse} / {selectedCohort}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                    <th className="py-2 font-bold">Learner</th>
                    <th className="py-2 font-bold">District</th>
                    <th className="py-2 font-bold">Gender</th>
                    <th className="py-2 font-bold">Target Career</th>
                    <th className="py-2 font-bold">Score</th>
                    <th className="py-2 font-bold">Employment</th>
                    <th className="py-2 font-bold">Wage Range</th>
                    <th className="py-2 font-bold">Relevance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredLearners.map((lrn) => (
                    <tr key={lrn.id} className="hover:bg-slate-50/50">
                      <td className="py-2.5 font-bold text-slate-900">{lrn.name}</td>
                      <td className="py-2.5 text-slate-600">{lrn.district}</td>
                      <td className="py-2.5 text-slate-600">{lrn.gender || 'Female'}</td>
                      <td className="py-2.5 font-medium text-slate-800">{lrn.targetCareer || 'Specialist'}</td>
                      <td className="py-2.5 font-bold text-[#0F4C47]">{lrn.assessmentScore || 8}/10</td>
                      <td className="py-2.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            lrn.employmentStatus === 'Employed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {lrn.employmentStatus}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-700">{lrn.wageBand || '₹5–7 LPA'}</td>
                      <td className="py-2.5 text-slate-600">{lrn.trainingRelevance || 'Relevant'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: PROVIDER COMPARISON */}
      {analyticsView === 'providers' && (
        <div className="space-y-5">
          <div className="farming-card p-6">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Provider Comparative Performance Matrix
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Comparing institutions on enrollment, completion, conversion, 6-month retention, and student feedback.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {providers.map((p) => (
                <div key={p.id} className="p-5 rounded-2xl bg-white border border-[#E5EFEA] shadow-xs">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {p.type}
                      </span>
                      <h4 className="font-extrabold text-base text-slate-900 mt-1">{p.name}</h4>
                      <div className="text-xs text-slate-500 mt-0.5">{p.location}</div>
                    </div>

                    {/* Status Pill with neutral wording */}
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        p.status === 'Requires Review'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  {/* Provider Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center mt-4 pt-3 border-t border-slate-100">
                    <div className="p-2 rounded-xl bg-slate-50">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Completion</div>
                      <div className="text-sm font-black text-slate-900 mt-0.5">{p.overallCompletionRate}%</div>
                    </div>

                    <div className="p-2 rounded-xl bg-teal-50">
                      <div className="text-[10px] text-teal-700 font-bold uppercase">Conversion</div>
                      <div className="text-sm font-black text-[#0F4C47] mt-0.5">{p.employmentConversionRate}%</div>
                    </div>

                    <div className="p-2 rounded-xl bg-emerald-50">
                      <div className="text-[10px] text-emerald-700 font-bold uppercase">6M Retention</div>
                      <div className="text-sm font-black text-emerald-700 mt-0.5">{p.sixMonthRetentionRate}%</div>
                    </div>
                  </div>

                  {/* Status Note */}
                  {p.statusNote && (
                    <div className="mt-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                      <span className="font-bold">Provider Review Advisory:</span> {p.statusNote}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: COHORT ANALYSIS */}
      {analyticsView === 'cohorts' && (
        <div className="space-y-5">
          <div className="farming-card p-6">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Cohort Longitudinal Trends (January vs April vs July 2026)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Tracking outcome improvements across sequential training cohorts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {cohorts.map((cohort) => (
                <div key={cohort.id} className="p-5 rounded-2xl bg-[#F8FAF9] border border-[#E5EFEA]">
                  <div className="text-[11px] uppercase font-bold text-teal-700 tracking-wider">
                    {cohort.period}
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 mt-1">{cohort.name}</h4>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Enrolled:</span>
                      <span className="font-bold text-slate-900">{cohort.enrolled.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Completion Rate:</span>
                      <span className="font-bold text-[#0F4C47]">{cohort.completionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Employment Conversion:</span>
                      <span className="font-extrabold text-teal-700">{cohort.employmentConversion}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">6-Month Retention:</span>
                      <span className="font-bold text-emerald-700">{cohort.retentionRate}%</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <span className="text-slate-500">Avg Wage Band:</span>
                      <span className="font-extrabold text-slate-900">{cohort.avgWageRange}</span>
                    </div>
                  </div>

                  {cohort.note && (
                    <div className="mt-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 font-medium">
                      ✓ {cohort.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: DEMOGRAPHIC PARITY ANALYSIS */}
      {analyticsView === 'demographics' && (
        <div className="space-y-5">
          <div className="farming-card p-6">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Demographic Outcome Parity Analysis
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Evaluating equity across Gender, Urban/Rural, and Education backgrounds.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Gender Comparison */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Gender Dimension (Female vs Male)
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">Female Trainees (48% of cohort)</span>
                      <span className="font-bold text-teal-800">82% Conversion</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0F4C47] h-full rounded-full w-[82%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">Male Trainees (52% of cohort)</span>
                      <span className="font-bold text-teal-800">80% Conversion</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0F4C47] h-full rounded-full w-[80%]"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900">
                  Strong gender parity demonstrated in technical completion and placement.
                </div>
              </div>

              {/* Urban vs Rural Comparison */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Geographic Dimension (Urban vs Rural)
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">Urban Districts (Pune, Bengaluru)</span>
                      <span className="font-bold text-teal-800">84% Conversion</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#0F4C47] h-full rounded-full w-[84%]"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">Peri-Urban / Rural Districts (Lucknow, Bhopal)</span>
                      <span className="font-bold text-amber-700">62% Conversion</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full w-[62%]"></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                  <span className="font-bold">Advisory:</span> Outcome disparity detected in peri-urban districts. Further investigation into localized employer tie-ups recommended.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 6: EVIDENCE-BASED GOVERNMENT INSIGHTS & DECISION SUPPORT */}
      {analyticsView === 'insights' && (
        <div className="space-y-5">
          <div className="farming-card p-6">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Evidence-Based Program Insights & Policy Decision Support
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Synthesizing longitudinal data into evidence to assist official program improvements.
            </p>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-900">
                      Curriculum Modernization Advisory: Legacy Mainframe Course
                    </h4>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      Course "Legacy Mainframe DB Systems" has high completion (74%) but low employment conversion (38%) and declining training relevance. 
                    </p>
                    <div className="mt-2 text-[11px] font-bold text-[#0F4C47] bg-white p-2 rounded-lg border border-amber-200">
                      Supported Human Decision: Initiate curriculum review to replace mainframe units with modern PostgreSQL and Cloud DB modules.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-emerald-900">
                      High Impact Model: Industrial Electrical Maintenance
                    </h4>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      Offline practical courses by Bharat Vocational Works achieved 91% completion and 88% employment conversion with 83% 6-month retention.
                    </p>
                    <div className="mt-2 text-[11px] font-bold text-[#0F4C47] bg-white p-2 rounded-lg border border-emerald-200">
                      Supported Human Decision: Scale hands-on motor control workshop model to Coimbatore and Bhopal centers.
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-sky-900">
                      District Focus: Lucknow Regional Employment Disparity
                    </h4>
                    <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                      Lucknow district shows 59% employment conversion compared to state average of 81%, despite comparable test completion scores (86%).
                    </p>
                    <div className="mt-2 text-[11px] font-bold text-[#0F4C47] bg-white p-2 rounded-lg border border-sky-200">
                      Supported Human Decision: Deploy targeted regional industry placement taskforce rather than modifying foundational syllabus.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
