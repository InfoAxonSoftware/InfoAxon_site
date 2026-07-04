import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { defaultSolutions, defaultProjects, defaultCompanyInfo } from '../data/defaultData';

const DataContext = createContext();

const STORAGE_KEYS = {
  solutions: 'infoaxon_solutions',
  projects: 'infoaxon_projects',
  company: 'infoaxon_company',
};

const DATA_VERSION = 'v2'; // bump this to reset localStorage to new defaults
const VERSION_KEY = 'infoaxon_data_version';

// Reset localStorage if data version has changed
if (localStorage.getItem(VERSION_KEY) !== DATA_VERSION) {
  Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  localStorage.setItem(VERSION_KEY, DATA_VERSION);
}

function loadFromStorage(key, defaultValue) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
}

export function DataProvider({ children }) {
  const [solutions, setSolutions] = useState(() =>
    loadFromStorage(STORAGE_KEYS.solutions, defaultSolutions)
  );
  const [projects, setProjects] = useState(() =>
    loadFromStorage(STORAGE_KEYS.projects, defaultProjects)
  );
  const [companyInfo, setCompanyInfo] = useState(() =>
    loadFromStorage(STORAGE_KEYS.company, defaultCompanyInfo)
  );

  // Track whether we're syncing from storage to avoid re-saving
  const isSyncing = useRef(false);

  // Save to localStorage when state changes (skip if syncing from storage)
  useEffect(() => {
    if (!isSyncing.current) {
      saveToStorage(STORAGE_KEYS.solutions, solutions);
    }
  }, [solutions]);

  useEffect(() => {
    if (!isSyncing.current) {
      saveToStorage(STORAGE_KEYS.projects, projects);
    }
  }, [projects]);

  useEffect(() => {
    if (!isSyncing.current) {
      saveToStorage(STORAGE_KEYS.company, companyInfo);
    }
  }, [companyInfo]);

  // Sync state from localStorage (used by cross-tab and visibility listeners)
  const syncFromStorage = useCallback(() => {
    isSyncing.current = true;
    setSolutions(loadFromStorage(STORAGE_KEYS.solutions, defaultSolutions));
    setProjects(loadFromStorage(STORAGE_KEYS.projects, defaultProjects));
    setCompanyInfo(loadFromStorage(STORAGE_KEYS.company, defaultCompanyInfo));
    // Reset flag after React processes the state updates
    setTimeout(() => { isSyncing.current = false; }, 0);
  }, []);

  // Cross-tab sync: listen for localStorage changes from other tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (
        e.key === STORAGE_KEYS.solutions ||
        e.key === STORAGE_KEYS.projects ||
        e.key === STORAGE_KEYS.company
      ) {
        syncFromStorage();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [syncFromStorage]);

  // Re-sync when tab becomes visible (catches any missed storage events)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        syncFromStorage();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [syncFromStorage]);

  // Solutions CRUD
  const addSolution = (solution) => {
    const newSolution = { ...solution, id: solution.id || Date.now().toString() };
    setSolutions((prev) => [...prev, newSolution]);
    return newSolution;
  };

  const updateSolution = (id, updates) => {
    setSolutions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteSolution = (id) => {
    setSolutions((prev) => prev.filter((s) => s.id !== id));
  };

  // Projects CRUD
  const addProject = (project) => {
    const newProject = { ...project, id: project.id || Date.now().toString() };
    setProjects((prev) => [...prev, newProject]);
    return newProject;
  };

  const updateProject = (id, updates) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // Company info update
  const updateCompanyInfo = (updates) => {
    setCompanyInfo((prev) => ({ ...prev, ...updates }));
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setSolutions(defaultSolutions);
    setProjects(defaultProjects);
    setCompanyInfo(defaultCompanyInfo);
  };

  return (
    <DataContext.Provider
      value={{
        solutions,
        projects,
        companyInfo,
        addSolution,
        updateSolution,
        deleteSolution,
        addProject,
        updateProject,
        deleteProject,
        updateCompanyInfo,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
