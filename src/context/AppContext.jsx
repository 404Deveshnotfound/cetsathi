import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_PROFILE, INITIAL_PREFERENCE_LIST, MOCK_RECOMMENDATIONS, COLLEGES } from '../data/mockData';
import { calculateDemoRecommendations } from '../utils/ranking';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Navigation View State
  const [currentView, setCurrentView] = useState('landing');
  const [selectedCollegeId, setSelectedCollegeId] = useState('c01');

  // User Profile
  const [profile, setProfile] = useState(SAMPLE_PROFILE);

  // Preference List
  const [preferenceList, setPreferenceList] = useState(INITIAL_PREFERENCE_LIST);

  // Compare Shortlist (max 3 items)
  const [compareList, setCompareList] = useState([
    MOCK_RECOMMENDATIONS[0],
    MOCK_RECOMMENDATIONS[1]
  ]);

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  // URL hash sync for browser back/forward and bookmarking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'landing';
      if (hash.startsWith('colleges/')) {
        const id = hash.replace('colleges/', '');
        setSelectedCollegeId(id);
        setCurrentView('college-detail');
      } else {
        setCurrentView(hash || 'landing');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (view, extraParam = null) => {
    if (view === 'college-detail' && extraParam) {
      setSelectedCollegeId(extraParam);
      window.location.hash = `colleges/${extraParam}`;
      setCurrentView('college-detail');
    } else {
      window.location.hash = view === 'landing' ? '' : view;
      setCurrentView(view);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add / Remove from preference list
  const addToPreferenceList = (item) => {
    const exists = preferenceList.some(
      (p) => p.collegeId === item.collegeId && p.branch === item.branch
    );
    if (exists) {
      showToast(`${item.collegeName} (${item.branch}) is already in your preference list.`);
      return;
    }
    const newItem = {
      id: `pref-${Date.now()}`,
      recId: item.id || `rec-${item.collegeId}-${item.branch}`,
      collegeId: item.collegeId,
      collegeName: item.collegeName || item.name,
      branch: item.branch,
      location: item.location,
      sampleCutoff: item.sampleCutoff,
      indicativeFee: item.indicativeFee,
      fitLabel: item.fitLabel || 'Target',
      autonomy: item.autonomy,
      type: item.type
    };
    setPreferenceList([...preferenceList, newItem]);
    showToast(`Added to preference list: ${newItem.collegeName} (${newItem.branch})`);
  };

  const removeFromPreferenceList = (id) => {
    setPreferenceList(preferenceList.filter((item) => item.id !== id));
    showToast('Removed option from preference list.');
  };

  const movePreferenceItem = (index, direction) => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === preferenceList.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...preferenceList];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setPreferenceList(updated);
  };

  const resetPreferenceList = () => {
    setPreferenceList(INITIAL_PREFERENCE_LIST);
    showToast('Preference list reset to initial demo state.');
  };

  // Compare Shortlist toggle
  const toggleCompare = (item) => {
    const exists = compareList.some(
      (c) => c.collegeId === item.collegeId && c.branch === item.branch
    );
    if (exists) {
      setCompareList(
        compareList.filter(
          (c) => !(c.collegeId === item.collegeId && c.branch === item.branch)
        )
      );
      showToast('Removed from comparison.');
    } else {
      if (compareList.length >= 3) {
        showToast('You can compare up to 3 options at a time.');
        return;
      }
      setCompareList([...compareList, item]);
      showToast(`Added to comparison: ${item.collegeName || item.name} (${item.branch})`);
    }
  };

  const removeFromCompare = (collegeId, branch) => {
    setCompareList(
      compareList.filter(
        (c) => !(c.collegeId === collegeId && c.branch === branch)
      )
    );
    showToast('Removed from comparison.');
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast('Comparison shortlist cleared.');
  };

  // Computed Recommendations based on active profile
  const dynamicRecommendations = calculateDemoRecommendations(profile);

  return (
    <AppContext.Provider
      value={{
        currentView,
        navigate,
        selectedCollegeId,
        setSelectedCollegeId,
        profile,
        setProfile,
        resetProfileToDefault: () => setProfile(SAMPLE_PROFILE),
        preferenceList,
        addToPreferenceList,
        removeFromPreferenceList,
        movePreferenceItem,
        resetPreferenceList,
        compareList,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        recommendations: dynamicRecommendations,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
