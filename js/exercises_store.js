/**
 * GRAMMAR PLUS A2 - PERSISTENT EXERCISES DATABASE STORE
 * Lightweight persistent JSON storage engine using LocalStorage & In-Memory Cache
 */

const ExercisesStore = {
  STORAGE_KEY: "grammar_a2_exercises_v5.2",
  PROGRESS_KEY: "grammar_a2_progress_v3",
  db: null,

  _cleanupOldStorage() {
    try {
      const oldKeys = [
        "grammar_a2_exercises_v1", "grammar_a2_exercises_v2", "grammar_a2_exercises_v3.0",
        "grammar_a2_exercises_v4.0", "grammar_a2_exercises_v5.0", "grammar_a2_exercises_v5.1",
        "grammar_a2_exercises_v5.2", "grammar_a2_exercises_v5.3"
      ];
      oldKeys.forEach(k => {
        try { localStorage.removeItem(k); } catch (e) {}
        try { if (window && window.localStorage) window.localStorage.removeItem(k); } catch (e) {}
      });
    } catch (e) {}
  },

  _getStorage(key) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        return window.localStorage.getItem(key);
      }
      if (typeof localStorage !== "undefined") {
        return localStorage.getItem(key);
      }
    } catch (e) {
      return null;
    }
    return null;
  },

  _setStorage(key, value) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(key, value);
        return true;
      }
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, value);
        return true;
      }
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
      return false;
    }
    return false;
  },

  init() {
    try {
      this._cleanupOldStorage();

      const sourceUnits = (typeof GRAMMAR_UNITS !== "undefined" && Array.isArray(GRAMMAR_UNITS))
        ? GRAMMAR_UNITS
        : ((typeof window !== "undefined" && Array.isArray(window.GRAMMAR_UNITS)) ? window.GRAMMAR_UNITS : []);

      this.db = {
        version: "5.3.0",
        updatedAt: new Date().toISOString(),
        units: sourceUnits
      };
      if (typeof window !== "undefined") {
        window.GRAMMAR_UNITS = sourceUnits;
      }
    } catch (e) {
      console.warn("ExercisesStore init warning:", e);
      const fallback = (typeof GRAMMAR_UNITS !== "undefined" && Array.isArray(GRAMMAR_UNITS))
        ? GRAMMAR_UNITS
        : ((typeof window !== "undefined" && Array.isArray(window.GRAMMAR_UNITS)) ? window.GRAMMAR_UNITS : []);
      this.db = { version: "5.3.0", units: fallback };
      if (typeof window !== "undefined") window.GRAMMAR_UNITS = fallback;
    }
  },

  getAllUnits() {
    if (this.db && Array.isArray(this.db.units) && this.db.units.length > 0) {
      return this.db.units;
    }
    if (typeof GRAMMAR_UNITS !== "undefined" && Array.isArray(GRAMMAR_UNITS) && GRAMMAR_UNITS.length > 0) {
      return GRAMMAR_UNITS;
    }
    if (typeof window !== "undefined" && Array.isArray(window.GRAMMAR_UNITS) && window.GRAMMAR_UNITS.length > 0) {
      return window.GRAMMAR_UNITS;
    }
    if (typeof A2_UNITS_DATA !== "undefined" && Array.isArray(A2_UNITS_DATA) && A2_UNITS_DATA.length > 0) {
      return A2_UNITS_DATA;
    }
    if (typeof window !== "undefined" && Array.isArray(window.A2_UNITS_DATA) && window.A2_UNITS_DATA.length > 0) {
      return window.A2_UNITS_DATA;
    }
    return [];
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
      const raw = this._getStorage(this.PROGRESS_KEY);
      const existing = JSON.parse(raw || "{}");
      if (!existing[username]) existing[username] = {};
      existing[username][exId] = {
        score,
        total,
        percentage,
        status,
        timestamp: new Date().toISOString()
      };
      this._setStorage(this.PROGRESS_KEY, JSON.stringify(existing));
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  },

  getProgress(username, exId) {
    if (!username) return null;
    try {
      const raw = this._getStorage(this.PROGRESS_KEY);
      const existing = JSON.parse(raw || "{}");
      return (existing[username] && existing[username][exId]) ? existing[username][exId] : null;
    } catch (e) {
      return null;
    }
  },

  getUserCompletedExercises(username) {
    if (!username) return [];
    try {
      const raw = this._getStorage(this.PROGRESS_KEY);
      const existing = JSON.parse(raw || "{}");
      return existing[username] ? Object.keys(existing[username]) : [];
    } catch (e) {
      return [];
    }
  },

  migrateUserProgress(oldUsername, newUsername) {
    if (!oldUsername || !newUsername || oldUsername === newUsername) return;
    try {
      const raw = this._getStorage(this.PROGRESS_KEY);
      const existing = JSON.parse(raw || "{}");
      if (existing[oldUsername]) {
        existing[newUsername] = Object.assign({}, existing[oldUsername], existing[newUsername] || {});
        delete existing[oldUsername];
        this._setStorage(this.PROGRESS_KEY, JSON.stringify(existing));
      }
    } catch (e) {
      console.warn("Could not migrate progress:", e);
    }
  },

  resetToDefault() {
    const sourceUnits = (typeof GRAMMAR_UNITS !== "undefined" && Array.isArray(GRAMMAR_UNITS))
      ? GRAMMAR_UNITS
      : ((typeof window !== "undefined" && Array.isArray(window.GRAMMAR_UNITS)) ? window.GRAMMAR_UNITS : []);
    this.db = {
      version: "5.0.0",
      updatedAt: new Date().toISOString(),
      units: sourceUnits
    };
    if (typeof window !== "undefined") window.GRAMMAR_UNITS = sourceUnits;
    this._setStorage(this.STORAGE_KEY, JSON.stringify(this.db));
  }
};

// Ensure window & global availability
if (typeof window !== "undefined") {
  window.ExercisesStore = ExercisesStore;
}
if (typeof global !== "undefined") {
  global.ExercisesStore = ExercisesStore;
}

// Immediate init if DOM ready or when DOM loads
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      ExercisesStore.init();
    });
  } else {
    ExercisesStore.init();
  }
}
