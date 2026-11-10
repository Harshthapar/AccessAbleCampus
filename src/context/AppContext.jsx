import React, { createContext, useContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, DEFAULT_SETTINGS, getFromStorage, setToStorage } from '../utils/storage';
import { DEMO_FACILITIES, INITIAL_REPORTS } from '../data/campusData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // 1. Accessibility & App Settings
  const [settings, setSettings] = useState(() => 
    getFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  );

  // 2. Saved Facilities
  const [savedFacilityIds, setSavedFacilityIds] = useState(() => 
    getFromStorage(STORAGE_KEYS.SAVED_FACILITIES, ['fac-1', 'fac-9', 'fac-14'])
  );

  // 3. Reports
  const [reports, setReports] = useState(() => 
    getFromStorage(STORAGE_KEYS.BARRIER_REPORTS, INITIAL_REPORTS)
  );

  // 4. Toast notifications
  const [toasts, setToasts] = useState([]);

  // Toast handler
  const showToast = (message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync settings to localStorage and apply DOM classes for accessibility
  useEffect(() => {
    setToStorage(STORAGE_KEYS.SETTINGS, settings);
    const root = document.documentElement;

    // Apply text size class
    root.classList.remove('text-size-sm', 'text-size-base', 'text-size-lg', 'text-size-xl');
    root.classList.add(`text-size-${settings.textSize || 'base'}`);

    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Theme (light/dark)
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings]);

  // Sync saved facilities
  useEffect(() => {
    setToStorage(STORAGE_KEYS.SAVED_FACILITIES, savedFacilityIds);
  }, [savedFacilityIds]);

  // Sync reports
  useEffect(() => {
    setToStorage(STORAGE_KEYS.BARRIER_REPORTS, reports);
  }, [reports]);

  // Actions
  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleSaveFacility = (facilityId) => {
    setSavedFacilityIds(prev => {
      const exists = prev.includes(facilityId);
      if (exists) {
        showToast('Facility removed from your saved list.', 'info');
        return prev.filter(id => id !== facilityId);
      } else {
        showToast('Facility saved for quick offline reference!', 'success');
        return [...prev, facilityId];
      }
    });
  };

  const addReport = (reportData) => {
    const newReport = {
      id: 'rep-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      reporter: 'Campus Community Member',
      ...reportData
    };
    setReports(prev => [newReport, ...prev]);
    showToast('Accessibility barrier report submitted successfully (stored locally).', 'success');
    return newReport;
  };

  const updateReport = (id, updatedFields) => {
    setReports(prev => prev.map(rep => rep.id === id ? { ...rep, ...updatedFields } : rep));
    showToast('Report updated successfully.', 'success');
  };

  const deleteReport = (id) => {
    setReports(prev => prev.filter(rep => rep.id !== id));
    showToast('Report deleted.', 'info');
  };

  const resetAllData = () => {
    setSettings(DEFAULT_SETTINGS);
    setSavedFacilityIds(['fac-1', 'fac-9', 'fac-14']);
    setReports(INITIAL_REPORTS);
    setToStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    setToStorage(STORAGE_KEYS.SAVED_FACILITIES, ['fac-1', 'fac-9', 'fac-14']);
    setToStorage(STORAGE_KEYS.BARRIER_REPORTS, INITIAL_REPORTS);
    showToast('Demo data and accessibility settings have been restored to default.', 'success');
  };

  const clearSavedFacilities = () => {
    setSavedFacilityIds([]);
    setToStorage(STORAGE_KEYS.SAVED_FACILITIES, []);
    showToast('Saved facilities list cleared.', 'info');
  };

  return (
    <AppContext.Provider value={{
      settings,
      updateSettings,
      facilities: DEMO_FACILITIES,
      savedFacilityIds,
      toggleSaveFacility,
      reports,
      addReport,
      updateReport,
      deleteReport,
      resetAllData,
      clearSavedFacilities,
      toasts,
      showToast,
      removeToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

