import React from 'react';
import { useApp } from './context/AppContext';
import AppShell from './components/AppShell';

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import PreferencesPage from './pages/PreferencesPage';
import RecommendationsPage from './pages/RecommendationsPage';
import ExploreCollegesPage from './pages/ExploreCollegesPage';
import CollegeDetailPage from './pages/CollegeDetailPage';
import ComparePage from './pages/ComparePage';
import PreferenceListPage from './pages/PreferenceListPage';
import CapUpdatesPage from './pages/CapUpdatesPage';
import MethodologyPage from './pages/MethodologyPage';

export default function App() {
  const { currentView } = useApp();

  const renderCurrentPage = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardPage />;
      case 'preferences':
        return <PreferencesPage />;
      case 'recommendations':
        return <RecommendationsPage />;
      case 'colleges':
        return <ExploreCollegesPage />;
      case 'college-detail':
        return <CollegeDetailPage />;
      case 'compare':
        return <ComparePage />;
      case 'preference-list':
        return <PreferenceListPage />;
      case 'cap-updates':
        return <CapUpdatesPage />;
      case 'methodology':
      case 'about-methodology':
        return <MethodologyPage />;
      case 'landing':
      default:
        return <LandingPage />;
    }
  };

  return (
    <AppShell>
      {renderCurrentPage()}
    </AppShell>
  );
}
