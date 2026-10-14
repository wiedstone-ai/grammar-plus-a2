/**
 * GRAMMAR PLUS A2 - PERSISTENT EXERCISES DATABASE STORE
 * Lightweight persistent JSON storage engine using LocalStorage & In-Memory Cache
 */

const ExercisesStore = {
  STORAGE_KEY: "grammar_a2_exercises_v2",
  PROGRESS_KEY: "grammar_a2_progress_v2",
  db: null,

  init() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.db = JSON.parse(stored);
        // Sync window.GRAMMAR_UNITS with persistent DB
        if (this.db && Array.isArray(this.db.units)) {
          window.GRAMMAR_UNITS = this.db.units;
        }
      } else if (window.GRAMMAR_UNITS) {
        this.db = {
          version: "2.0.0",
          updatedAt: new Date().toISOString(),
          units: window.GRAMMAR_UNITS
        };
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.db));
      }
    } catch (e) {
      console.warn("ExercisesStore init warning:", e);
      if (window.GRAMMAR_UNITS) {
        this.db = { version: "2.0.0", units: window.GRAMMAR_UNITS };
      }
    }
  },

  getAllUnits() {
    if (this.db && this.db.units) return this.db.units;
    return window.GRAMMAR_UNITS || [];
  },

  getUnit(unitId) {
    const units = this.getAllUnits();
    return units.find(u => u.id === Number(unitId)) || null;
  },

  getExercises(unitId) {
    const unit = this.getUnit(unitId);
    return unit ? (unit.exercises || []) : [];
  },

  saveProgress(username, exId, score, total, percentage, status) {
    if (!username) return;
    try {
      const existing = JSON.parse(localStorage.getItem(this.PROGRESS_KEY) || "{}");
      if (!existing[username]) existing[username] = {};
      existing[username][exId] = {
        score,
        total,
        percentage,
        status,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(existing));
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  },

  getProgress(username, exId) {
    if (!username) return null;
    try {
      const existing = JSON.parse(localStorage.getItem(this.PROGRESS_KEY) || "{}");
      return (existing[username] && existing[username][exId]) ? existing[username][exId] : null;
    } catch (e) {
      return null;
    }
  },

  getUserCompletedExercises(username) {
    if (!username) return [];
    try {
      const existing = JSON.parse(localStorage.getItem(this.PROGRESS_KEY) || "{}");
      return existing[username] ? Object.keys(existing[username]) : [];
    } catch (e) {
      return [];
    }
  },

  resetToDefault() {
    if (window.GRAMMAR_UNITS) {
      this.db = {
        version: "2.0.0",
        updatedAt: new Date().toISOString(),
        units: window.GRAMMAR_UNITS
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.db));
    }
  }
};

// Auto init when script loads
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    ExercisesStore.init();
  });
}
