/**
 * Reusable localStorage utility functions with validation and error resilience
 */

export const STORAGE_KEYS = {
  SAVED_FACILITIES: 'accessable_saved_facilities',
  BARRIER_REPORTS: 'accessable_barrier_reports',
  SETTINGS: 'accessable_settings',
};

export const DEFAULT_SETTINGS = {
  theme: 'light', // 'light' | 'dark'
  textSize: 'base', // 'sm' | 'base' | 'lg' | 'xl'
  highContrast: false,
  reducedMotion: false,
  preferredRouting: {
    avoidStairs: true,
    preferRamps: true,
    preferElevators: true,
    preferAccessibleEntrances: true,
    minimizeDistance: false
  }
};

export const getFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return defaultValue;
  }
};

export const setToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing key "${key}" to localStorage:`, error);
    return false;
  }
};

export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing key "${key}" from localStorage:`, error);
    return false;
  }
};

