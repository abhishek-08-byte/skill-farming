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

const MainLayout = () => {
  const { activeTab, setActiveTab, currentRole } = useApp();
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

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
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-5">
          {activeTab === 'dashboard' && (
            <LearnerDashboard
              onOpenAssessment={() => setIsAssessmentOpen(true)}
              onSelectCourse={() => setActiveTab('course')}
            />
          )}

          {activeTab === 'course' && (
            <CourseCatalog />
          )}

          {activeTab === 'analytics' && (
            <SkillGapView
              onEnrollCourse={() => setActiveTab('course')}
              onOpenAssessment={() => setIsAssessmentOpen(true)}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceView />
          )}

          {activeTab === 'employment' && (
            <EmploymentFollowup />
          )}

          {activeTab === 'settings' && (
            <ProfileSettings />
          )}

          {activeTab === 'institution' && (
            <InstitutionPortal />
          )}

          {activeTab === 'government' && (
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
