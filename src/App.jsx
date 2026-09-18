import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { LearnerDashboard } from './components/learner/LearnerDashboard';
import { AssessmentModal } from './components/learner/AssessmentModal';
import { SkillGapView } from './components/learner/SkillGapView';
import { CourseCatalog } from './components/learner/CourseCatalog';
import { EmploymentFollowup } from './components/learner/EmploymentFollowup';
import { AttendanceView } from './components/learner/AttendanceView';
import { ProfileSettings } from './components/learner/ProfileSettings';
import { InstitutionPortal } from './components/institution/InstitutionPortal';
import { GovernmentPortal } from './components/government/GovernmentPortal';
import { LandingPage } from './components/landing/LandingPage';
import { CompleteProfileWizard } from './components/profile/CompleteProfileWizard';
import { RecoveryView } from './components/learner/RecoveryView';
import { LeaderboardView } from './components/learner/LeaderboardView';
import { JobMarketplaceView } from './components/learner/JobMarketplaceView';
import { EmployerPortal } from './components/employer/EmployerPortal';

const MainLayout = () => {
  const { activeTab, setActiveTab, currentRole } = useApp();
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

  // Synchronize URL hash for /masking and direct link support
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').replace('/', '');
      if (hash === 'masking' || hash === 'recovery') {
        setActiveTab('masking');
      } else if (hash === 'leaderboard') {
        setActiveTab('leaderboard');
      } else if (hash === 'jobs' || hash === 'marketplace') {
        setActiveTab('jobs');
      } else if (hash === 'employer' || hash === 'recruiter') {
        setActiveTab('employer');
      } else if (hash === 'settings' || hash === 'profile') {
        setActiveTab('settings');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setActiveTab]);

  // If user navigates to public landing page
  if (activeTab === 'landing') {
    return (
      <LandingPage
        onGetStarted={() => {
          setActiveTab('dashboard');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F7F5] flex flex-col antialiased">
      {/* Top Header */}
      <Header />

      <div className="flex-1 flex overflow-hidden">
        {/* Left Desktop Sidebar */}
        <Sidebar />

        {/* Main Content Scrollable Area */}
        <main className="flex-1 overflow-y-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-5 pb-24 md:pb-6">
          {/* Settings Tab available across roles */}
          {activeTab === 'settings' && (
            <ProfileSettings />
          )}

          {/* Learner Dashboard and Views */}
          {currentRole === 'learner' && activeTab === 'dashboard' && (
            <LearnerDashboard
              onOpenAssessment={() => setIsAssessmentOpen(true)}
              onSelectCourse={() => setActiveTab('course')}
            />
          )}

          {currentRole === 'learner' && activeTab === 'course' && (
            <CourseCatalog />
          )}

          {currentRole === 'learner' && activeTab === 'analytics' && (
            <SkillGapView
              onEnrollCourse={() => setActiveTab('course')}
              onOpenAssessment={() => setIsAssessmentOpen(true)}
            />
          )}

          {currentRole === 'learner' && activeTab === 'attendance' && (
            <AttendanceView />
          )}

          {currentRole === 'learner' && activeTab === 'employment' && (
            <EmploymentFollowup />
          )}

          {/* Skill Recovery / Get Back on Track dedicated interface */}
          {currentRole === 'learner' && (activeTab === 'masking' || activeTab === 'recovery') && (
            <RecoveryView
              onGoToLeaderboard={() => setActiveTab('leaderboard')}
              onGoToDashboard={() => setActiveTab('dashboard')}
            />
          )}

          {/* Leaderboard View with Active vs Masked rosters */}
          {currentRole === 'learner' && activeTab === 'leaderboard' && (
            <LeaderboardView />
          )}

          {/* Job Marketplace & Application Pipeline Tracker */}
          {(activeTab === 'jobs' || activeTab === 'marketplace') && (
            <JobMarketplaceView />
          )}

          {/* Dedicated Employer & Recruiter Portal */}
          {(currentRole === 'employer' || activeTab === 'employer') && activeTab !== 'settings' && (
            <EmployerPortal />
          )}

          {/* Institution Portal */}
          {currentRole === 'institution' && activeTab !== 'settings' && (
            <InstitutionPortal />
          )}

          {/* Government Portal */}
          {currentRole === 'government' && activeTab !== 'settings' && (
            <GovernmentPortal />
          )}
        </main>
      </div>

      {/* Assessment Engine Modal (Data-driven 10 questions per skill) */}
      <AssessmentModal
        isOpen={isAssessmentOpen || activeTab === 'assessment'}
        onClose={() => {
          setIsAssessmentOpen(false);
          if (activeTab === 'assessment') setActiveTab('dashboard');
        }}
      />

      {/* Role-Specific Multi-Step Complete Profile Wizard Modal */}
      <CompleteProfileWizard />

      {/* Mobile Bottom Navigation (Visible on smartphone viewports) */}
      <MobileNav onOpenAssessment={() => setIsAssessmentOpen(true)} />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
