import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Video,
  ListVideo,
  Sparkles,
  ChevronRight,
  RotateCcw,
  Volume2,
  Maximize2
} from 'lucide-react';

export const CourseLearningView = ({ course, onBack }) => {
  const { updateCourseProgress, getEnrollmentProgress, currentUser } = useApp();

  // 2 Functional, high-reliability demonstration video streams
  const playlist = [
    {
      id: 'vid-1',
      lessonNum: 1,
      title: 'Module 1: Relational Data Modeling & Normalization (1NF–3NF)',
      duration: '0:15',
      durationSec: 15,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      description: 'Understanding primary keys, entity relationships, avoiding functional anomalies, and decomposing tables into 3NF forms.'
    },
    {
      id: 'vid-2',
      lessonNum: 2,
      title: 'Module 2: Query Execution Planning, B-Tree Indexes & Joins',
      duration: '0:15',
      durationSec: 15,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      description: 'Optimizing INNER and LEFT JOIN operations, analyzing EXPLAIN query plans, and creating optimal multi-column indexes.'
    }
  ];

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState({}); // { 'vid-1': true }
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(15);
  const [justCompletedToast, setJustCompletedToast] = useState('');

  const videoRef = useRef(null);

  const activeVideo = playlist[activeVideoIndex];

  // Initial progress sync
  useEffect(() => {
    const existingProg = (typeof getEnrollmentProgress === 'function' && course?.id)
      ? getEnrollmentProgress(course.id)
      : (currentUser?.activeCourses?.find(ac => ac.courseId === course?.id)?.progress || 0);

    if (existingProg >= 100) {
      setCompletedVideos({ 'vid-1': true, 'vid-2': true });
    } else if (existingProg >= 50) {
      setCompletedVideos({ 'vid-1': true });
    }
  }, [course?.id, getEnrollmentProgress, currentUser]);

  // Video event handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 15;
      setCurrentTime(cur);
      setDuration(dur);

      // Auto-complete when user reaches > 85% of video
      if (dur > 0 && cur / dur >= 0.85 && !completedVideos[activeVideo.id]) {
        markVideoCompleted(activeVideo.id);
      }
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    markVideoCompleted(activeVideo.id);
  };

  const markVideoCompleted = (videoId) => {
    setCompletedVideos((prev) => {
      const updated = { ...prev, [videoId]: true };
      const completedCount = Object.values(updated).filter(Boolean).length;
      const calculatedProg = Math.round((completedCount / playlist.length) * 100);

      // Sync with global course progress
      updateCourseProgress(course.id, calculatedProg);

      const targetVid = playlist.find(v => v.id === videoId);
      setJustCompletedToast(`Completed "${targetVid?.title?.slice(0, 35)}..."! Course progress updated to ${calculatedProg}%`);
      setTimeout(() => setJustCompletedToast(''), 4500);

      return updated;
    });
  };

  const toggleManualCompletion = (videoId) => {
    setCompletedVideos((prev) => {
      const isDone = Boolean(prev[videoId]);
      const updated = { ...prev, [videoId]: !isDone };
      const completedCount = Object.values(updated).filter(Boolean).length;
      const calculatedProg = Math.round((completedCount / playlist.length) * 100);

      updateCourseProgress(course.id, calculatedProg);

      if (!isDone) {
        setJustCompletedToast(`Marked as completed! Course is now ${calculatedProg}% finished.`);
        setTimeout(() => setJustCompletedToast(''), 3500);
      }
      return updated;
    });
  };

  const completedCount = Object.values(completedVideos).filter(Boolean).length;
  const overallPercentage = Math.round((completedCount / playlist.length) * 100);

  const formatSeconds = (sec) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 md:pb-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Course Header */}
      <div className="farming-card p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 hover:text-teal-950 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Courses</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E2F1ED] text-[#0F4C47]">
              {course.skill || 'Database Engineering'}
            </span>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              Interactive Video Classroom
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {course.title}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Provider: <span className="font-bold text-slate-700">{course.provider || 'Metro Tech Hub'}</span> • Curated Interactive Video Modules
          </p>
        </div>

        {/* Course Completion Progress Summary */}
        <div className="bg-[#F5F8F7] p-4 rounded-2xl border border-[#DCE8E3] min-w-[220px]">
          <div className="flex items-center justify-between text-xs font-black text-[#0F4C47] mb-1.5">
            <span>Course Progress</span>
            <span className="text-base">{overallPercentage}%</span>
          </div>
          <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-500 to-[#0F4C47] h-full rounded-full transition-all duration-500"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5 font-semibold">
            <span>{completedCount} of {playlist.length} Lessons Completed</span>
            {overallPercentage === 100 && <span className="text-emerald-700 font-bold">✓ Certified</span>}
          </div>
        </div>
      </div>

      {/* Completion Toast Notification */}
      {justCompletedToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between shadow-sm animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{justCompletedToast}</span>
          </div>
          <button
            onClick={() => setJustCompletedToast('')}
            className="text-emerald-700 hover:text-emerald-900 text-[11px] underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Classroom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Real HTML5 Video Player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="farming-card p-4 overflow-hidden bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-xl">
            {/* HTML5 Native Video Tag with Active Video Stream */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <video
                ref={videoRef}
                key={activeVideo.videoUrl}
                src={activeVideo.videoUrl}
                controls
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnded}
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video Meta & Controls Bar */}
            <div className="mt-4 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-teal-500/20 text-teal-300 px-2.5 py-0.5 rounded-md font-mono text-[10px] font-bold border border-teal-400/30">
                    LESSON {activeVideo.lessonNum} OF {playlist.length}
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    ⏱ Time: {formatSeconds(currentTime)} / {formatSeconds(duration)}
                  </span>
                </div>
                <h2 className="text-base font-black text-white mt-1">
                  {activeVideo.title}
                </h2>
              </div>

              {/* Completion Action Button */}
              <button
                type="button"
                onClick={() => toggleManualCompletion(activeVideo.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-xs ${
                  completedVideos[activeVideo.id]
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-900'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{completedVideos[activeVideo.id] ? 'Completed ✓' : 'Mark as Completed'}</span>
              </button>
            </div>

            <p className="text-xs text-slate-300 mt-2.5 px-2 leading-relaxed border-t border-slate-800/80 pt-3">
              {activeVideo.description}
            </p>
          </div>

          {/* Quick Learning Tips & Practice Notes */}
          <div className="farming-card p-5">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Real-Time Completion Tracking</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Video completion is automatically recorded when you reach the 85% mark or watch until the end. Alternatively, you can click <span className="font-bold text-teal-800">"Mark as Completed"</span> above. Your progress will be instantly saved to your longitudinal learner transcript.
            </p>
          </div>
        </div>

        {/* Right Col: Course Syllabus & Video Playlist */}
        <div className="space-y-4">
          <div className="farming-card p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ListVideo className="w-4 h-4 text-[#0F4C47]" />
                <h3 className="font-extrabold text-sm text-slate-900">Course Video Playlist</h3>
              </div>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E2F1ED] text-[#0F4C47]">
                {playlist.length} Videos Available
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-2 mb-3">
              Click any module below to switch lessons and stream content:
            </p>

            {/* Video list cards */}
            <div className="space-y-2.5">
              {playlist.map((vid, idx) => {
                const isActive = activeVideoIndex === idx;
                const isDone = Boolean(completedVideos[vid.id]);

                return (
                  <div
                    key={vid.id}
                    onClick={() => {
                      setActiveVideoIndex(idx);
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play().catch(() => {});
                      }
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 text-xs ${
                      isActive
                        ? 'border-[#0F4C47] bg-[#E2F1ED]/40 shadow-xs ring-1 ring-[#0F4C47]/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isDone
                        ? 'bg-emerald-500 text-white'
                        : isActive
                        ? 'bg-[#0F4C47] text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          Video {vid.lessonNum}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{vid.duration}</span>
                        </span>
                      </div>
                      <h4 className={`font-bold text-xs leading-snug mt-0.5 ${
                        isActive ? 'text-[#0F4C47]' : 'text-slate-800'
                      }`}>
                        {vid.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDone
                            ? 'bg-emerald-100 text-emerald-800'
                            : isActive
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          {isDone ? 'Completed' : isActive ? 'Currently Watching' : 'Up Next'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Module CTA */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  const nextIdx = (activeVideoIndex + 1) % playlist.length;
                  setActiveVideoIndex(nextIdx);
                }}
                className="w-full py-2.5 rounded-xl bg-[#0F4C47] hover:bg-[#0A3632] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Switch to Next Module</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
