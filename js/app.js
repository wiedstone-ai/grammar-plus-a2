/**
 * GRAMMAR PLUS A2 - APPLICATION LOGIC & DATABASE ENGINE
 * Sesuai kurikulum Bahasa Inggris Grammar Plus A2 (Sarah Jane Lewis)
 * Database: Google Spreadsheet via Google Apps Script & LocalStorage
 */

// Konfigurasi Standar
const APP_CONFIG = {
  appName: "Grammar Plus A2 - Learning Portal",
  spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg",
  spreadsheetId: "1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg",
  minPassingScore: 75, // KKM 75%
  defaultTeacherPin: "GURU123",
  defaultScriptUrl: "https://script.google.com/macros/s/AKfycbyGvEuuPCNKNwsFHt7qF976ahspzuAIGNKZ2-wSaSc3YjjWjhFAlNHsLx3VmEEpc-Cn/exec"
};

// State Aplikasi
const AppState = {
  currentUser: null,       // { username, nama, tingkat, fase, rombel, presensi, tanggalLahir, role }
  selectedUnit: null,
  selectedExercise: null,
  gasUrl: "",
  isOnline: true,
  students: [],
  scores: []
};

// Helper untuk mengambil seluruh unit secara aman
function getGrammarUnits() {
  if (typeof window !== "undefined" && window.ExercisesStore && typeof window.ExercisesStore.getAllUnits === "function") {
    const su = window.ExercisesStore.getAllUnits();
    if (su && su.length > 0) return su;
  }
  if (typeof ExercisesStore !== "undefined" && typeof ExercisesStore.getAllUnits === "function") {
    const su = ExercisesStore.getAllUnits();
    if (su && su.length > 0) return su;
  }
  if (typeof window !== "undefined" && Array.isArray(window.GRAMMAR_UNITS) && window.GRAMMAR_UNITS.length > 0) {
    return window.GRAMMAR_UNITS;
  }
  if (typeof GRAMMAR_UNITS !== "undefined" && Array.isArray(GRAMMAR_UNITS) && GRAMMAR_UNITS.length > 0) {
    return GRAMMAR_UNITS;
  }
  return [];
}

// ==========================================
// DAFTAR LATIHAN LISTENING & HELPER PERSENTASE / KELULUSAN
// ==========================================
const A2_LISTENING_EXERCISES = new Set([
  'u1_ex4', 'u3_ex5', 'u3_ex9', 'u3_ex10', 'u4_ex5', 'u5_ex4',
  'u6_ex2', 'u6_ex8', 'u7_ex3', 'u7_ex6', 'u7_ex7', 'u9_ex6',
  'u10_ex4', 'u10_ex6', 'u11_ex1', 'u11_ex7', 'u12_ex2', 'u12_ex6',
  'u14_ex8', 'u15_ex5', 'u15_ex6', 'u17_ex4', 'u18_ex4', 'u20_ex6',
  'u21_ex4', 'u22_ex4'
]);

function isListeningExercise(sc) {
  if (!sc) return false;
  if (sc.audioTrack) return true;
  if (sc.exerciseId && A2_LISTENING_EXERCISES.has(String(sc.exerciseId).toLowerCase().trim())) return true;
  return false;
}

/**
 * Normalisasi dan kalkulasi persentase secara presisi (0 - 100)
 * Menangani angka desimal dari Google Sheets (misal 1 untuk 100%, 0.83 untuk 83%),
 * string format ("100%", "83%"), serta fallback rasio skor / totalSoal riil.
 */
function parsePercentage(val, skor, totalSoal) {
  if (skor !== undefined && skor !== null && totalSoal !== undefined && totalSoal !== null) {
    const s = Number(skor);
    const t = Number(totalSoal);
    if (!isNaN(s) && !isNaN(t) && t > 0) {
      return Math.min(100, Math.max(0, Math.round((s / t) * 100)));
    }
  }
  if (val === undefined || val === null || val === "") return 0;
  if (typeof val === "string") {
    const cleanStr = val.trim();
    const hasPercentSign = cleanStr.includes("%");
    const num = parseFloat(cleanStr.replace("%", "").trim());
    if (!isNaN(num)) {
      if (!hasPercentSign && num > 0 && num <= 1) {
        return Math.min(100, Math.round(num * 100));
      }
      return Math.min(100, Math.max(0, Math.round(num)));
    }
    return 0;
  }
  if (typeof val === "number" && !isNaN(val)) {
    if (val > 0 && val <= 1) {
      return Math.min(100, Math.round(val * 100));
    }
    return Math.min(100, Math.max(0, Math.round(val)));
  }
  return 0;
}

function formatPercentage(val, skor, totalSoal) {
  return `${parsePercentage(val, skor, totalSoal)}%`;
}

function isScorePassed(sc) {
  if (!sc) return false;
  if (sc.status) {
    const st = String(sc.status).trim().toUpperCase();
    if (st === "LULUS") return true;
    if (st === "REMIDI" || st === "TIDAK LULUS") return false;
  }
  return parsePercentage(sc.persentase, sc.skor, sc.totalSoal) >= (APP_CONFIG.minPassingScore || 75);
}

function normalizeScoreRecord(sc) {
  if (!sc) return sc;
  const skorNum = parseInt(sc.skor, 10) || 0;
  const totalNum = parseInt(sc.totalSoal, 10) || 0;
  const pct = parsePercentage(sc.persentase, skorNum, totalNum);
  const passed = isScorePassed(sc);

  return Object.assign({}, sc, {
    skor: skorNum,
    totalSoal: totalNum,
    persentase: `${pct}%`,
    status: passed ? "LULUS" : "REMIDI"
  });
}

// ==========================================
// 1. INISIALISASI SAAT HALAMAN DIMUAT
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof ExercisesStore !== "undefined" && typeof ExercisesStore.init === "function") {
    ExercisesStore.init();
  }
  initStorage();
  initNavigation();
  initAuthUI();
  initUnitBrowser();
  initAppendices();
  initSettingsUI();
  
  // Render awal
  checkActiveSession();
  renderUnitGrid();

  // Retry render jika data units masih proses parse di browser
  setTimeout(() => {
    const grid = document.getElementById("unit-grid-container");
    if (grid && (!grid.children || grid.children.length === 0)) {
      renderUnitGrid();
    }
  }, 250);
});

function initStorage() {
  // Load GAS URL dari localStorage atau default
  const savedUrl = localStorage.getItem("grammar_a2_gas_url");
  const knownOldBadUrls = [
    "https://script.google.com/macros/s/AKfycbx0q6Vq4g0zR7z0v4t0u_grammar_placeholder/exec",
    "https://script.google.com/macros/s/AKfycbyF0aeMBvjnKYHWY9bWYesGhMH_hSLT1Da04PbFLFIOzjXFF5pKvezNKTMMKPZpqHRj/exec",
    "https://script.google.com/macros/s/AKfycbwZVZwuorMf9JZI97dnQqnBkpYxwAXBRsM9dcsoIja36O7EIFpV_9u448GqiQ30_jYM/exec"
  ];

  // Jika URL di localStorage kosong, placeholder, atau URL deployment lama yang error:
  // otomatis gunakan defaultScriptUrl yang aktif!
  if (!savedUrl || knownOldBadUrls.includes(savedUrl) || savedUrl.includes("placeholder")) {
    AppState.gasUrl = APP_CONFIG.defaultScriptUrl || "";
    localStorage.setItem("grammar_a2_gas_url", AppState.gasUrl);
  } else {
    AppState.gasUrl = savedUrl;
  }
  
  // Load local students & scores cache
  const savedStudents = localStorage.getItem("grammar_a2_students");
  if (savedStudents) {
    try { AppState.students = JSON.parse(savedStudents); } catch (e) { AppState.students = []; }
  } else {
    // Akun default Guru
    AppState.students = [
      {
        timestamp: new Date().toISOString(),
        username: "GURU",
        password: APP_CONFIG.defaultTeacherPin,
        nama: "GURU BAHASA INGGRIS",
        tingkat: "-",
        fase: "-",
        rombel: "-",
        presensi: "-",
        tanggalLahir: "2000-01-01",
        role: "Guru",
        status: "Aktif",
        synced: true
      }
    ];
    saveStudentsToStorage();
  }

  const savedScores = localStorage.getItem("grammar_a2_scores");
  if (savedScores) {
    try {
      const parsed = JSON.parse(savedScores);
      AppState.scores = Array.isArray(parsed) ? parsed.map(normalizeScoreRecord) : [];
    } catch (e) {
      AppState.scores = [];
    }
  }

  // Jika URL Google Apps Script tersedia, tes koneksi dan sinkronkan data
  if (AppState.gasUrl) {
    testGasConnection();
  }
}

function saveStudentsToStorage() {
  localStorage.setItem("grammar_a2_students", JSON.stringify(AppState.students));
}

function saveScoresToStorage() {
  localStorage.setItem("grammar_a2_scores", JSON.stringify(AppState.scores));
}

// ==========================================
// 2. NAVIGASI TAB UTAMA
// ==========================================
function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-target");
      switchTab(targetId);
    });
  });
}

function switchTab(targetId) {
  // Guard untuk latihan jika belum login
  if (targetId === "section-latihan" && !AppState.currentUser) {
    showToast("Silakan Masuk atau Daftarkan Diri terlebih dahulu untuk mengakses Latihan!", "danger");
    openModal("modal-login");
    return;
  }
  
  // Guard ketat untuk Guru Portal & Database Pengaturan (Siswa TIDAK BOLEH mengakses database)
  if (targetId === "section-guru" || targetId === "section-pengaturan") {
    if (!AppState.currentUser || AppState.currentUser.role !== "Guru") {
      openModal("modal-guru-auth");
      showToast("Akses Terbatas: Hanya Guru yang berhak mengakses portal dan database!", "warning");
      return;
    }
  }

  document.querySelectorAll(".tab-section").forEach(sec => sec.classList.remove("active"));
  document.querySelectorAll(".nav-link").forEach(lnk => lnk.classList.remove("active"));
  
  const targetSection = document.getElementById(targetId);
  const targetLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
  
  if (targetSection) targetSection.classList.add("active");
  if (targetLink) targetLink.classList.add("active");

  // Hook render data
  if (targetId === "section-materi") {
    renderUnitGrid();
  } else if (targetId === "section-latihan") {
    const sel = document.getElementById("exercise-unit-select");
    const currentUnitId = AppState.selectedUnit ? AppState.selectedUnit.id : (sel ? parseInt(sel.value, 10) || 1 : 1);
    loadUnitExercises(currentUnitId, false);
  } else if (targetId === "section-leaderboard") {
    renderLeaderboard();
  } else if (targetId === "section-capaian") {
    renderStudentRecord();
  } else if (targetId === "section-guru") {
    renderTeacherDashboard();
  }
  
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// 3. SISTEM AUTH & PENDAFTARAN SISWA (ATURAN KETAT)
// ==========================================
function initAuthUI() {
  // Tombol di Header
  const btnOpenRegister = document.getElementById("btn-open-register");
  const btnOpenLogin = document.getElementById("btn-open-login");
  const btnLogout = document.getElementById("btn-logout");

  if (btnOpenRegister) btnOpenRegister.addEventListener("click", () => openModal("modal-register"));
  if (btnOpenLogin) btnOpenLogin.addEventListener("click", () => openModal("modal-login"));
  if (btnLogout) btnLogout.addEventListener("click", handleLogout);

  // Form Registrasi Siswa
  const formRegister = document.getElementById("form-register");
  if (formRegister) {
    formRegister.addEventListener("submit", handleStudentRegistration);
  }

  // Form Login
  const formLogin = document.getElementById("form-login");
  if (formLogin) {
    formLogin.addEventListener("submit", handleStudentLogin);
  }

  // Form Auth Guru
  const formGuruAuth = document.getElementById("form-guru-auth");
  if (formGuruAuth) {
    formGuruAuth.addEventListener("submit", handleGuruLogin);
  }

  // Auto-uppercase input nama
  const inputNama = document.getElementById("reg-nama");
  if (inputNama) {
    inputNama.addEventListener("input", (e) => {
      e.target.value = e.target.value.toUpperCase();
    });
  }
}

/**
 * FORMULA PEMBUATAN USERNAME:
 * - 3 huruf depan nama lengkap (huruf kapital)
 * - Tanggal lahir format DDMMYYYY disambung (Hari, Bulan, Tahun)
 * - Contoh: WIED lahir 19 Mei 1979 -> WIE19051979
 * - Jika ada tabrakan (sama), tambahkan akhiran A, B, C, dst.
 */
function generateUsername(nama, tanggalLahir) {
  // Bersihkan nama (hanya huruf)
  const cleanNama = (nama || "").replace(/[^A-Za-z]/g, "").toUpperCase();
  const prefix3 = (cleanNama.length >= 3 ? cleanNama.substring(0, 3) : cleanNama.padEnd(3, "X")).toUpperCase();

  // Parse tanggal lahir: format HTML date picker biasanya 'YYYY-MM-DD'
  let mm = "01", dd = "01", yyyy = "2008";
  if (tanggalLahir.includes("-")) {
    const parts = tanggalLahir.split("-");
    if (parts.length === 3) {
      yyyy = parts[0];
      mm = parts[1].padStart(2, "0");
      dd = parts[2].padStart(2, "0");
    }
  } else if (tanggalLahir.includes("/")) {
    const parts = tanggalLahir.split("/");
    if (parts.length === 3) {
      dd = parts[0].padStart(2, "0");
      mm = parts[1].padStart(2, "0");
      yyyy = parts[2];
    }
  } else {
    // string mentah format DDMMYYYY
    const digits = tanggalLahir.replace(/[^0-9]/g, "");
    if (digits.length >= 8) {
      dd = digits.substring(0, 2);
      mm = digits.substring(2, 4);
      yyyy = digits.substring(4, 8);
    }
  }

  // Gunakan DDMMYYYY sesuai permintaan
  const ddmmyyyy = `${dd}${mm}${yyyy}`;
  const baseUsername = `${prefix3}${ddmmyyyy}`;

  // Ambil semua username yang sudah ada di database lokal
  const existingUsernames = AppState.students.map(s => (s.username || "").toUpperCase().trim());

  let finalUsername = baseUsername;
  if (existingUsernames.includes(finalUsername)) {
    let charCode = 65; // 'A'
    while (existingUsernames.includes(finalUsername)) {
      finalUsername = `${baseUsername}${String.fromCharCode(charCode)}`;
      charCode++;
      if (charCode > 90) break; // Sampai 'Z'
    }
  }

  return finalUsername;
}

function handleStudentRegistration(e) {
  e.preventDefault();

  const tingkat = document.getElementById("reg-tingkat").value.trim().toUpperCase();
  const fase = document.getElementById("reg-fase").value.trim().toUpperCase();
  const rombel = parseInt(document.getElementById("reg-rombel").value.trim(), 10);
  const presensi = parseInt(document.getElementById("reg-presensi").value.trim(), 10);
  const nama = document.getElementById("reg-nama").value.trim().toUpperCase();
  const tanggalLahir = document.getElementById("reg-tgl-lahir").value.trim();

  // Validasi Ketat
  if (!["X", "XI", "XII"].includes(tingkat)) {
    showToast("Pilih Tingkat yang valid: X, XI, atau XII!", "danger");
    return;
  }
  if (!["E", "F"].includes(fase)) {
    showToast("Pilih Fase yang valid: E atau F!", "danger");
    return;
  }
  if (isNaN(rombel) || rombel < 1 || rombel > 12) {
    showToast("Rombel harus berupa angka antara 1 sampai 12!", "danger");
    return;
  }
  if (isNaN(presensi) || presensi < 1 || presensi > 37) {
    showToast("Nomor Presensi harus berupa angka antara 1 sampai 37!", "danger");
    return;
  }
  if (!nama || nama.length < 2) {
    showToast("Nama lengkap harus diisi dengan benar!", "danger");
    return;
  }
  if (!tanggalLahir) {
    showToast("Tanggal lahir wajib diisi (sebagai password)! ", "danger");
    return;
  }

  // Buat Username Sesuai Aturan
  const username = generateUsername(nama, tanggalLahir);
  const password = tanggalLahir; // Tanggal lahir sebagai password

  const newStudent = {
    timestamp: new Date().toLocaleString("id-ID"),
    username: username,
    password: password,
    nama: nama,
    tingkat: tingkat,
    fase: fase,
    rombel: String(rombel),
    presensi: String(presensi),
    tanggalLahir: tanggalLahir,
    role: "Siswa",
    status: "Aktif",
    synced: false
  };

  // Simpan ke Cache Lokal
  AppState.students.push(newStudent);
  saveStudentsToStorage();

  // Kirim ke Google Apps Script (Background Sync)
  syncStudentToGAS(newStudent);

  closeModal("modal-register");
  document.getElementById("form-register").reset();

  // Tampilkan Modal Berhasil & Kartu Akun Murid
  showSuccessCardModal(newStudent);

  // Otomatis Login
  loginUser(newStudent);
}

/**
 * Memeriksa kecocokan password tanggal lahir secara fleksibel
 * Mendukung format: DDMMYYYY, YYYY-MM-DD, DD-MM-YYYY, DD/MM/YYYY, dsb.
 */
function isDatePasswordMatching(inputPassword, storedDate) {
  if (!inputPassword || !storedDate) return false;
  if (String(inputPassword).trim() === String(storedDate).trim()) return true;

  let sDay = "", sMonth = "", sYear = "";
  const sStr = String(storedDate).trim();

  // Dukung tanggal format ISO dari Google Sheet Date object (misal: 1979-05-18T17:00:00.000Z UTC -> 19-05-1979 WIB)
  if (sStr.includes("T")) {
    const d = new Date(sStr);
    if (!isNaN(d.getTime())) {
      const local = new Date(d.getTime() + (7 * 3600 * 1000));
      sYear = String(local.getUTCFullYear());
      sMonth = String(local.getUTCMonth() + 1).padStart(2, "0");
      sDay = String(local.getUTCDate()).padStart(2, "0");
    }
  } else if (sStr.includes("-")) {
    const parts = sStr.split("-");
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        sYear = parts[0]; sMonth = parts[1].padStart(2, "0"); sDay = parts[2].padStart(2, "0");
      } else {
        sDay = parts[0].padStart(2, "0"); sMonth = parts[1].padStart(2, "0"); sYear = parts[2];
      }
    }
  } else if (sStr.includes("/")) {
    const parts = sStr.split("/");
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        sYear = parts[0]; sMonth = parts[1].padStart(2, "0"); sDay = parts[2].padStart(2, "0");
      } else {
        sDay = parts[0].padStart(2, "0"); sMonth = parts[1].padStart(2, "0"); sYear = parts[2];
      }
    }
  } else {
    const d = sStr.replace(/[^0-9]/g, "");
    if (d.length === 8) {
      if (d.startsWith("19") || d.startsWith("20")) {
        sYear = d.substring(0, 4); sMonth = d.substring(4, 6); sDay = d.substring(6, 8);
      } else {
        sDay = d.substring(0, 2); sMonth = d.substring(2, 4); sYear = d.substring(4, 8);
      }
    }
  }

  if (sDay && sMonth && sYear) {
    const validPerms = [
      sDay + sMonth + sYear,
      sYear + sMonth + sDay,
      sMonth + sDay + sYear,
      sDay + "-" + sMonth + "-" + sYear,
      sYear + "-" + sMonth + "-" + sDay,
      sDay + "/" + sMonth + "/" + sYear,
      sYear + "/" + sMonth + "/" + sDay
    ];
    const cleanIn = String(inputPassword).replace(/[^0-9]/g, "");
    for (let i = 0; i < validPerms.length; i++) {
      if (String(inputPassword).trim() === validPerms[i] || cleanIn === validPerms[i].replace(/[^0-9]/g, "")) {
        return true;
      }
    }
  }

  const cleanPass = String(inputPassword).replace(/[^0-9]/g, "");
  const cleanSaved = String(storedDate).replace(/[^0-9]/g, "");
  return cleanPass === cleanSaved;
}

function findStudentByCredentials(username, password) {
  const cleanUsername = (username || "").toUpperCase().trim();
  return AppState.students.find(s => {
    const sUser = (s.username || "").toUpperCase().trim();
    let userMatches = sUser === cleanUsername;

    // Cek kemungkinan username versi lama atau regenerasi
    if (!userMatches && s.nama && s.tanggalLahir) {
      const genUser = generateUsername(s.nama, s.tanggalLahir);
      if (genUser === cleanUsername) userMatches = true;
    }

    if (!userMatches) return false;

    // 1. Periksa password dengan verifikasi tanggal lahir fleksibel
    if (isDatePasswordMatching(password, s.password) || isDatePasswordMatching(password, s.tanggalLahir)) {
      return true;
    }

    // 2. Jika input password cocok dengan 8 angka tanggal lahir pada username itu sendiri
    const usernameDateDigits = (s.username || "").replace(/[^0-9]/g, "");
    const inputDigits = String(password).replace(/[^0-9]/g, "");
    if (usernameDateDigits.length >= 8 && inputDigits.length >= 8) {
      if (usernameDateDigits.substring(0, 8) === inputDigits.substring(0, 8)) return true;
    }

    return false;
  });
}

async function handleStudentLogin(e) {
  e.preventDefault();
  const username = document.getElementById("login-username").value.trim().toUpperCase();
  const password = document.getElementById("login-password").value.trim();

  if (!username || !password) {
    showToast("Masukkan Username dan Password (Tanggal Lahir)!", "danger");
    return;
  }

  // Cek jika login Guru
  if (username === "GURU" && (password === APP_CONFIG.defaultTeacherPin || password === "guru123")) {
    const guruUser = {
      username: "GURU",
      nama: "GURU BAHASA INGGRIS",
      role: "Guru"
    };
    loginUser(guruUser);
    closeModal("modal-login");
    showToast("Berhasil masuk sebagai Guru!", "success");
    return;
  }

  // 1. Cek pada data lokal
  let found = findStudentByCredentials(username, password);

  // 2. Jika belum ditemukan lokal dan URL GAS tersedia, sinkronkan dari Google Spreadsheet
  if (!found && AppState.gasUrl) {
    showToast("Memeriksa akun di Google Spreadsheet...", "info");
    try {
      await fetchStudentsFromGAS();
      found = findStudentByCredentials(username, password);
    } catch (err) {
      console.warn("GAS student fetch error during login:", err);
    }
  }

  if (found) {
    loginUser(found);
    closeModal("modal-login");
    document.getElementById("form-login").reset();
    showToast(`Selamat datang kembali, ${found.nama}!`, "success");
  } else {
    showToast("Username atau Tanggal Lahir (Password) tidak cocok! Pastikan tanggal lahir sesuai saat mendaftar.", "danger");
  }
}

function handleGuruLogin(e) {
  e.preventDefault();
  const pin = document.getElementById("guru-pin-input").value.trim();
  if (pin === APP_CONFIG.defaultTeacherPin || pin === "guru123") {
    const guruUser = {
      username: "GURU",
      nama: "GURU BAHASA INGGRIS",
      role: "Guru"
    };
    loginUser(guruUser);
    closeModal("modal-guru-auth");
    document.getElementById("form-guru-auth").reset();
    switchTab("section-guru");
    showToast("Akses Portal Guru Diberikan!", "success");
  } else {
    showToast("PIN / Sandi Guru salah!", "danger");
  }
}

function loginUser(user) {
  AppState.currentUser = user;
  localStorage.setItem("grammar_a2_session", JSON.stringify(user));
  updateUserStatusUI();
}

function handleLogout() {
  AppState.currentUser = null;
  localStorage.removeItem("grammar_a2_session");
  updateUserStatusUI();
  switchTab("section-materi");
  showToast("Anda telah keluar.", "info");
}

function checkActiveSession() {
  const session = localStorage.getItem("grammar_a2_session");
  if (session) {
    try {
      AppState.currentUser = JSON.parse(session);
      // Migrasi otomatis username siswa ke format DDMMYYYY jika sebelumnya terdaftar MMDDYYYY
      if (AppState.currentUser && AppState.currentUser.role === "Siswa" && AppState.currentUser.nama && AppState.currentUser.tanggalLahir) {
        const correctUser = generateUsername(AppState.currentUser.nama, AppState.currentUser.tanggalLahir);
        if (AppState.currentUser.username !== correctUser) {
          const oldUser = AppState.currentUser.username;
          console.log(`Auto-migrating username from ${oldUser} to ${correctUser}`);
          AppState.currentUser.username = correctUser;
          localStorage.setItem("grammar_a2_session", JSON.stringify(AppState.currentUser));

          const sRec = AppState.students.find(s => s.username === oldUser);
          if (sRec) {
            sRec.username = correctUser;
            saveStudentsToStorage();
          }

          if (window.ExercisesStore && typeof window.ExercisesStore.migrateUserProgress === "function") {
            window.ExercisesStore.migrateUserProgress(oldUser, correctUser);
          }
        }
      }
    } catch (e) {
      AppState.currentUser = null;
    }
  }
  updateUserStatusUI();
}

function updateUserStatusUI() {
  const user = AppState.currentUser;
  const statusContainer = document.getElementById("header-auth-status");
  const lockBanners = document.querySelectorAll(".lock-banner");
  const lockedContents = document.querySelectorAll(".locked-content");
  const dbSyncBanner = document.getElementById("db-sync-banner");
  const navSettings = document.querySelector('.nav-link[data-target="section-pengaturan"]');
  const navGuru = document.querySelector('.nav-link[data-target="section-guru"]');

  const isGuru = user && user.role === "Guru";

  // Privasi Siswa: Sembunyikan Database Google Sheet dan Portal Guru dari Siswa
  if (dbSyncBanner) {
    dbSyncBanner.style.display = isGuru ? "block" : "none";
  }
  if (navSettings) {
    navSettings.style.display = isGuru ? "inline-flex" : "none";
  }
  if (navGuru) {
    navGuru.style.display = isGuru ? "inline-flex" : "none";
  }

  if (!statusContainer) return;

  if (user) {
    statusContainer.innerHTML = `
      <div class="user-badge ${isGuru ? 'role-guru' : ''}">
        <span>${isGuru ? '👨‍🏫 Guru' : '🎓 Siswa'}: <strong>${user.nama}</strong> (${user.username})</span>
      </div>
      <button class="btn btn-secondary btn-sm" id="btn-logout" onclick="handleLogout()">Keluar</button>
    `;

    // Buka akses latihan
    lockBanners.forEach(b => b.style.display = "none");
    lockedContents.forEach(c => c.style.display = "block");
  } else {
    statusContainer.innerHTML = `
      <button class="btn btn-secondary btn-sm" onclick="openModal('modal-login')">Masuk</button>
      <button class="btn btn-primary btn-sm" onclick="openModal('modal-register')">Daftar Murid Baru</button>
    `;

    // Kunci akses latihan
    lockBanners.forEach(b => b.style.display = "block");
    lockedContents.forEach(c => c.style.display = "none");
  }
}

function showSuccessCardModal(student) {
  const modalContent = document.getElementById("account-card-body");
  if (modalContent) {
    modalContent.innerHTML = `
      <div style="background-color: #EFF6FF; border: 2px solid #BFDBFE; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem;">
        <h4 style="color: #1E3A8A; margin-bottom: 0.5rem; font-size: 1.1rem;">🎉 Pendaftaran Berhasil!</h4>
        <p style="font-size: 0.85rem; color: #475569; margin-bottom: 1rem;">
          Akun belajar Anda telah aktif. Harap catat dan simpan <strong>Username</strong> dan <strong>Password</strong> Anda dengan baik:
        </p>
        <div style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; padding: 0.85rem; font-family: monospace; font-size: 1rem; margin-bottom: 0.85rem;">
          <div><strong>Username:</strong> <span style="color: #2563EB; font-weight: 800; font-size: 1.15rem;">${student.username}</span></div>
          <div><strong>Password:</strong> <span style="color: #0F172A;">${student.tanggalLahir}</span> (Tanggal Lahir)</div>
        </div>
        <div style="font-size: 0.825rem; color: #64748B;">
          <div><strong>Nama:</strong> ${student.nama}</div>
          <div><strong>Kelas:</strong> Tingkat ${student.tingkat} | Fase ${student.fase} | Rombel ${student.rombel} | Presensi ${student.presensi}</div>
        </div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <button class="btn btn-primary btn-lg" style="width: 100%; font-weight: 700;" onclick="closeModal('modal-account-card'); loadUnitExercises(1); switchTab('section-latihan');">
          🚀 Mulai Kerjakan Latihan Sekarang &rarr;
        </button>
        <button class="btn btn-secondary" style="width: 100%;" onclick="copyUsername('${student.username}')">
          📋 Salin Username Saya
        </button>
      </div>
    `;
    openModal("modal-account-card");
  }
}

function copyUsername(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("Username berhasil disalin ke clipboard!", "success");
  });
}

// ==========================================
// 4. BROWSER MATERI DAN UNIT (24 UNIT LENGKAP)
// ==========================================
function initUnitBrowser() {
  // Event listener search filter unit
  const searchInput = document.getElementById("search-unit-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      renderUnitGrid(e.target.value.toLowerCase());
    });
  }
}

function renderUnitGrid(filterKeyword = "") {
  const container = document.getElementById("unit-grid-container");
  if (!container) return;

  const allUnits = getGrammarUnits();
  if (!allUnits || allUnits.length === 0) {
    setTimeout(() => {
      const retryUnits = getGrammarUnits();
      if (retryUnits && retryUnits.length > 0) {
        renderUnitGrid(filterKeyword);
      }
    }, 200);
    return;
  }

  const filtered = allUnits.filter(u => {
    const combined = `${u.id} ${u.title} ${u.english_title} ${u.category}`.toLowerCase();
    return combined.includes(filterKeyword);
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #64748B;">Materi tidak ditemukan.</div>`;
    return;
  }

  container.innerHTML = filtered.map(u => `
    <div class="unit-card" onclick="openUnitDetail(${u.id})">
      <div>
        <div class="unit-card-top">
          <span class="unit-number-tag">Unit ${u.id}</span>
          <span class="badge badge-primary">${u.category}</span>
        </div>
        <h3>${u.title}</h3>
        <p><em>${u.english_title}</em></p>
      </div>
      <div class="unit-card-footer">
        <span>📖 ${u.exercises ? u.exercises.length : 0} Latihan</span>
        <span style="color: #2563EB; font-weight: 700;">Pelajari & Kerjakan &rarr;</span>
      </div>
    </div>
  `).join("");
}

function openUnitDetail(unitId) {
  const units = getGrammarUnits();
  const unit = units.find(u => u.id === Number(unitId));
  if (!unit) return;

  AppState.selectedUnit = unit;

  // Render konten detail materi
  const container = document.getElementById("unit-detail-content");
  if (!container) return;

  let tablesHtml = "";
  if (unit.grammar.tables && unit.grammar.tables.length > 0) {
    tablesHtml = unit.grammar.tables.map(tbl => `
      <div style="margin: 1.25rem 0;">
        <h5 style="font-weight: 700; color: #1E293B; margin-bottom: 0.5rem;">${tbl.title}</h5>
        <div class="grammar-table-wrapper">
          <table class="table-grammar">
            <thead>
              <tr>${tbl.headers.map(h => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${tbl.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `).join("");
  }

  let rulesHtml = "";
  if (unit.grammar.rules && unit.grammar.rules.length > 0) {
    rulesHtml = `
      <div class="note-box">
        <strong>Aturan Penting & Tips Tata Bahasa:</strong>
        <ul class="rules-list" style="margin-top: 0.5rem;">
          ${unit.grammar.rules.map(r => `<li>${r}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="unit-detail-header">
      <div>
        <span class="unit-tag-big">UNIT ${unit.id}</span>
        <h2 style="font-size: 1.4rem; font-weight: 800; color: #0F172A; margin: 0.35rem 0;">${unit.title}</h2>
        <p style="color: #64748B; font-size: 0.95rem;"><em>${unit.english_title}</em></p>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="closeUnitDetail()">&larr; Kembali ke Daftar Unit</button>
    </div>

    <div class="grammar-box">
      <h4>Ringkasan Materi & Teori</h4>
      <p style="font-size: 0.95rem; color: #334155; line-height: 1.6;">${unit.grammar.summary}</p>
      ${tablesHtml}
      ${rulesHtml}
    </div>

    <!-- Tombol Mulai Latihan -->
    <div style="margin-top: 1.5rem; text-align: center;">
      <button class="btn btn-primary btn-lg" onclick="loadUnitExercises(${unit.id})">
        📝 Buka dan Kerjakan Latihan Unit ${unit.id}
      </button>
    </div>
  `;

  document.getElementById("unit-grid-container").style.display = "none";
  document.getElementById("search-unit-input").style.display = "none";
  container.style.display = "block";
  window.scrollTo({ top: 100, behavior: "smooth" });
}

function closeUnitDetail() {
  document.getElementById("unit-grid-container").style.display = "grid";
  document.getElementById("search-unit-input").style.display = "block";
  document.getElementById("unit-detail-content").style.display = "none";
}

// ==========================================
// 5. ENGINE LATIHAN INTERAKTIF & PENILAIAN
// ==========================================
function loadUnitExercises(unitId, shouldSwitchTab = true) {
  const units = getGrammarUnits();
  let unit = units.find(u => u.id === Number(unitId));
  if (!unit && units.length > 0) {
    unit = units[0];
  }
  if (!unit) {
    setTimeout(() => {
      const retryUnits = getGrammarUnits();
      if (retryUnits && retryUnits.length > 0) {
        loadUnitExercises(unitId, shouldSwitchTab);
      }
    }, 200);
    return;
  }

  AppState.selectedUnit = unit;

  // Cek apakah siswa sudah login
  if (!AppState.currentUser) {
    showToast("Latihan hanya dapat diakses oleh siswa yang telah mendaftarkan diri!", "danger");
    openModal("modal-login");
    return;
  }

  if (shouldSwitchTab) {
    switchTab("section-latihan");
  }

  const selector = document.getElementById("exercise-unit-select");
  if (selector && selector.value !== String(unit.id)) {
    selector.value = String(unit.id);
  }

  renderExerciseForUnit(unit);
}

function renderExerciseForUnit(unit) {
  const container = document.getElementById("exercise-render-area");
  if (!container) return;

  if (!unit.exercises || unit.exercises.length === 0) {
    container.innerHTML = `<div class="card"><p>Tidak ada latihan khusus pada unit ini.</p></div>`;
    return;
  }

  AppState.selectedUnit = unit;

  // Cek progress siswa untuk menampilkan checklist jika sudah selesai
  const completedIds = (window.ExercisesStore && AppState.currentUser)
    ? window.ExercisesStore.getUserCompletedExercises(AppState.currentUser.username)
    : [];

  container.innerHTML = `
    <div class="card" style="border-top: 4px solid #2563EB;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <span class="badge badge-primary">Unit ${unit.id}</span>
          <h2 style="font-size: 1.3rem; font-weight: 800; color: #0F172A; margin-top: 0.25rem;">${unit.title}</h2>
          <span style="font-size: 0.825rem; color: #64748B;">Materi & Latihan Resmi Buku Grammar Plus A2 (${unit.exercises.length} Latihan)</span>
        </div>
      </div>

      <div class="exercise-tabs" style="display: flex; gap: 0.4rem; border-bottom: 1px solid #CBD5E1; padding-bottom: 0.6rem; margin-bottom: 1.25rem; overflow-x: auto; flex-wrap: wrap;">
        ${unit.exercises.map((ex, idx) => {
          const isDone = completedIds.includes(ex.id);
          const tabLabel = ex.title.split(":")[0];
          return `
            <button class="btn btn-secondary btn-sm ex-tab-btn ${idx === 0 ? 'btn-primary' : ''}" 
                    onclick="selectExerciseTab('${ex.id}', ${unit.id})" 
                    id="tab-btn-${ex.id}"
                    style="margin-bottom: 0.25rem;">
              ${isDone ? '✓ ' : ''}${tabLabel} ${ex.page ? `(Hal ${ex.page})` : ''}
            </button>
          `;
        }).join("")}
      </div>

      <div id="active-exercise-container">
        <!-- Konten Latihan Aktif -->
      </div>
    </div>
  `;

  // Render latihan pertama secara default
  renderSingleExercise(unit.exercises[0], unit);
}

function selectExerciseTab(exId, unitId) {
  const units = getGrammarUnits();
  const unit = units.find(u => u.id === Number(unitId)) || AppState.selectedUnit;
  if (!unit) return;
  const ex = unit.exercises ? unit.exercises.find(e => e.id === exId) : null;
  if (!ex) return;

  document.querySelectorAll(".ex-tab-btn").forEach(b => {
    b.classList.remove("btn-primary");
    b.classList.add("btn-secondary");
  });
  const activeBtn = document.getElementById(`tab-btn-${exId}`);
  if (activeBtn) {
    activeBtn.classList.remove("btn-secondary");
    activeBtn.classList.add("btn-primary");
  }

  renderSingleExercise(ex, unit);
}

// PETA ID GOOGLE DRIVE AUDIO CLOUD STREAMING (GRAMMAR PLUS A2)
const A2_AUDIO_DRIVE_MAP = {
  1: "1LqGvKwGxW3Re9SSTtskAAtsQ30xhRuXJ",
  2: "1lTpmIO1vxizOujcdSLEHrHYyqJ37stg3",
  3: "1vT-ZICs2qCdYejEa564v1WapX1dQYWhv",
  4: "1igpCT6D7BN9_svC9mYqte2rk6a9ykY0p",
  5: "1xP5LfRO0WLolAdjsamNAKERdoS_wK4fz",
  6: "1h3xvZraXJxek34-QHSW55t8vs6-g2OtL",
  7: "1X5XcnuvqJ_Ty3KjcNYuw4owAp26iuLA9",
  8: "1w08ZQdYTXUOXSbr2s9Je9eZc8zdTOr0c",
  9: "133JNBZNDvNqL5DjtoXdinAddhipp381I",
  10: "1mjOD6CnmlMPYfHG73IinPwCgQ9g47JZJ",
  11: "1ktf9fZyXL9RL-56haihOOKcWiXtM7f7U",
  12: "1NEUaZwD_rcrqghh4w9VkrDLMT3CY8MoR",
  13: "15-YSUUD9_6vA6HJTpclsDWkY0iRi44MP",
  14: "1_u6F_eZag6FcITw-_t8DXkCTPT9bxLPd",
  15: "1x08NQfsagyQ6CdhSGo6WMwMtVZUg6QCm",
  16: "10jOo3PW4U5EHRgldHcfaJQhRa0ZkSsxv",
  17: "1AewVAATnl7oPl1hiyzepFPjFquEYrx6I",
  18: "1qpzDcaTM-f8nzMCqIEBr2EV3kKwBZOpI",
  19: "16Iv5ZCGyGw2txkX_byG0o2sMEbXFLhE5",
  20: "1XU3zZiDPLrwQCtl1EhSE3-PqoSGmy37q",
  21: "1yZcxEFu7osSc7qqcIhlDhLVSgFY02gU0",
  22: "1XnKnSxkcaQvURhuPV6DevKXHLypygJBd",
  23: "1lawzP6dy97XmHiBc4a0B6cKDmuIwH7DB",
  24: "1z7GosF0SDq_39j5Q4NnKfrY8zQ4Xb-pa",
  25: "1suSq8Z9k2dyGt79myGfF9qlJBvdmWTkt",
  26: "1bkqUph-fxEX1DT2AUnPV1gNhKXW6QSwE",
  27: "1Fzb8ghfOguElnibML1coXrkdLJy2HCXE"
};

function getA2AudioStreamUrl(trackStr) {
  if (!trackStr) return "";
  const m = String(trackStr).match(/(\d+)/);
  if (!m) return "";
  const num = parseInt(m[1], 10);
  const fid = A2_AUDIO_DRIVE_MAP[num];
  if (!fid) return "";
  return `https://docs.google.com/uc?export=download&id=${fid}`;
}

function getAudioPlayerHtml(trackStr, customId) {
  if (!trackStr) return "";
  const m = String(trackStr).match(/(\d+)/);
  const num = m ? parseInt(m[1], 10) : 0;
  const fid = num ? A2_AUDIO_DRIVE_MAP[num] : "";
  const streamUrl = fid ? `https://docs.google.com/uc?export=download&id=${fid}` : "";
  const previewUrl = fid ? `https://drive.google.com/file/d/${fid}/preview` : "";
  const viewUrl = fid ? `https://drive.google.com/file/d/${fid}/view?usp=sharing` : "";
  const playerId = customId || ("audio-" + (num || "trk") + "-" + Math.random().toString(36).substring(2, 6));

  return `
    <div style="display: flex; flex-direction: column; gap: 0.5rem; width: 100%; max-width: 580px;">
      <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
        <audio controls preload="none" style="flex: 1; min-width: 250px; height: 38px; border-radius: 6px;" id="${playerId}">
          ${num ? `<source src="audio/tr${num}.mp3" type="audio/mpeg">` : ''}
          ${num ? `<source src="audio/${num}_a2.mp3" type="audio/mpeg">` : ''}
          ${streamUrl ? `<source src="${streamUrl}" type="audio/mpeg">` : ''}
          Browser Anda tidak mendukung elemen audio.
        </audio>
        ${fid ? `
          <button type="button" class="btn btn-secondary btn-sm" onclick="toggleDriveAudioPreview('${playerId}-iframe')" style="font-size: 0.775rem; padding: 0.35rem 0.65rem;" title="Buka pemutar cadangan resmi Google Drive (bebas blokir)">
            ▶️ Player GDrive
          </button>
          <a href="${viewUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-sm" style="font-size: 0.775rem; padding: 0.35rem 0.65rem; text-decoration: none;" title="Buka di Google Drive">
            ↗️ Buka Drive
          </a>
        ` : ''}
      </div>
      ${fid ? `
        <div id="${playerId}-iframe" style="display: none; border: 1px solid #CBD5E1; border-radius: 6px; overflow: hidden; background: #000; margin-top: 0.25rem;">
          <iframe src="${previewUrl}" width="100%" height="90" style="border: none; display: block;" allow="autoplay"></iframe>
        </div>
      ` : ''}
    </div>
  `;
}

function toggleDriveAudioPreview(iframeBoxId) {
  const el = document.getElementById(iframeBoxId);
  if (el) {
    el.style.display = el.style.display === "none" ? "block" : "none";
  }
}

function renderSingleExercise(exercise, unit) {
  const container = document.getElementById("active-exercise-container");
  if (!container) return;

  AppState.selectedExercise = exercise;
  AppState.selectedUnit = unit;

  let audioHtml = "";
  if (exercise.audioTrack || exercise.audioUrl) {
    const transcript = (window.AUDIO_TRANSCRIPTS || []).find(t => exercise.audioTrack && t.track.toLowerCase().includes(exercise.audioTrack.toLowerCase()));
    const safeTrackId = (exercise.audioTrack || "audio").replace(/[^a-zA-Z0-9]/g, "");
    const playerHtml = getAudioPlayerHtml(exercise.audioTrack, "player-" + safeTrackId);
    audioHtml = `
      <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 1rem 1.15rem; margin-bottom: 1.25rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.65rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.25rem;">🎧</span>
            <span style="font-weight: 700; color: #166534; font-size: 0.925rem;">Latihan Listening: ${escapeHtml(exercise.audioTrack || "Audio Track")}</span>
            <span style="font-size: 0.725rem; color: #15803D; background: #DCFCE7; padding: 0.15rem 0.45rem; border-radius: 4px; font-weight: 600;">Audio Lokal + GDrive Fallback</span>
          </div>
          ${transcript ? `
            <button type="button" class="btn btn-secondary btn-sm" onclick="toggleAudioTranscript('${safeTrackId}')" style="font-size: 0.8rem;">
              📜 Lihat / Sembunyikan Naskah Audio
            </button>
          ` : ''}
        </div>
        ${playerHtml}
      </div>
      ${transcript ? `
        <div id="transcript-box-${safeTrackId}" style="display: none; background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 8px; padding: 1rem; margin-bottom: 1.25rem; font-size: 0.85rem; color: #334155; line-height: 1.6;">
          <strong>Naskah Rekaman (${transcript.track}):</strong>
          <pre style="white-space: pre-wrap; font-family: inherit; margin-top: 0.5rem; font-size: 0.825rem; color: #1E293B;">${transcript.content}</pre>
        </div>
      ` : ''}
    `;
  }

  let questionsHtml = "";
  if (exercise.type === "fill") {
    questionsHtml = exercise.questions.map((q, idx) => `
      <div class="question-item" id="q-box-${idx}">
        <div class="question-text">${q.q.replace('[BLANK]', `<input type="text" class="fill-input" id="input-q-${idx}" placeholder="Ketik jawaban..." autocomplete="off">`).replace('[BLANK2]', `<input type="text" class="fill-input" id="input-q-${idx}-b" placeholder="Lanjutan..." autocomplete="off">`).replace('[BLANK3]', `<input type="text" class="fill-input" id="input-q-${idx}-c" placeholder="Lanjutan..." autocomplete="off">`)}</div>
        ${q.hint ? `<div style="font-size: 0.775rem; color: #64748B; margin-top: 0.25rem;">💡 Petunjuk: ${q.hint}</div>` : ''}
        <div class="feedback-box" id="feedback-q-${idx}"></div>
      </div>
    `).join("");
  } else {
    // Choice / Pilihan Ganda
    questionsHtml = exercise.questions.map((q, idx) => `
      <div class="question-item" id="q-box-${idx}">
        <div class="question-text">${idx + 1}. ${q.q.replace('[BLANK]', '_______')}</div>
        <div class="options-group">
          ${q.options.map(opt => `
            <button type="button" class="btn-option" onclick="selectOption(${idx}, '${escapeHtml(opt)}')">
              <span>${opt}</span>
            </button>
          `).join("")}
        </div>
        <input type="hidden" id="answer-q-${idx}" value="">
        ${q.hint ? `<div style="font-size: 0.775rem; color: #64748B; margin-top: 0.25rem;">💡 Petunjuk: ${q.hint}</div>` : ''}
        <div class="feedback-box" id="feedback-q-${idx}"></div>
      </div>
    `).join("");
  }

  container.innerHTML = `
    <div class="exercise-header">
      <h3 style="font-size: 1.1rem; font-weight: 700; color: #1E293B;">${exercise.title}</h3>
      <span class="badge badge-primary">${exercise.questions.length} Butir Soal</span>
    </div>
    <p class="exercise-instruction">${exercise.instruction}</p>
    ${audioHtml}

    ${exercise.image ? `
      <div style="margin: 1.25rem 0; text-align: center;">
        <img src="${escapeHtml(exercise.image)}" alt="${escapeHtml(exercise.title)}" style="max-width: 100%; max-height: 380px; border-radius: 8px; border: 1px solid #CBD5E1; box-shadow: 0 2px 6px rgba(0,0,0,0.08);">
      </div>
    ` : ''}

    <form id="exercise-form" onsubmit="submitExerciseGrade(event)">
      ${questionsHtml}

      <div style="margin-top: 1.5rem; display: flex; gap: 0.75rem;">
        <button type="submit" class="btn btn-success btn-lg" style="flex: 1;">
          ✅ Periksa Jawaban & Simpan Nilai
        </button>
        <button type="button" class="btn btn-secondary" onclick="resetCurrentExercise()">
          🔄 Ulangi Latihan
        </button>
      </div>
    </form>

    <div class="score-result-card" id="score-result-box">
      <!-- Hasil Penilaian Muncul Di Sini -->
    </div>
  `;
}

function toggleAudioTranscript(safeTrackId) {
  const box = document.getElementById(`transcript-box-${safeTrackId}`);
  if (box) {
    box.style.display = box.style.display === "none" ? "block" : "none";
  }
}

function selectOption(qIdx, optionValue) {
  const hiddenInput = document.getElementById(`answer-q-${qIdx}`);
  if (hiddenInput) hiddenInput.value = optionValue;

  const box = document.getElementById(`q-box-${qIdx}`);
  if (box) {
    box.querySelectorAll(".btn-option").forEach(btn => {
      btn.classList.remove("selected");
      if (btn.innerText.trim() === optionValue.trim()) {
        btn.classList.add("selected");
      }
    });
  }
}

function submitExerciseGrade(e) {
  e.preventDefault();
  const exercise = AppState.selectedExercise;
  const unit = AppState.selectedUnit;
  if (!exercise || !unit) return;

  if (!AppState.currentUser) {
    showToast("Anda harus login untuk menyimpan nilai latihan!", "danger");
    return;
  }

  let correctCount = 0;
  const total = exercise.questions.length;
  const details = [];

  exercise.questions.forEach((q, idx) => {
    let userAnswer = "";
    if (exercise.type === "fill") {
      const inp = document.getElementById(`input-q-${idx}`);
      const inpB = document.getElementById(`input-q-${idx}-b`);
      const inpC = document.getElementById(`input-q-${idx}-c`);
      if (inpC && inpC.value.trim()) {
        userAnswer = `${inp ? inp.value.trim() : ''}, ${inpB ? inpB.value.trim() : ''}, ${inpC.value.trim()}`;
      } else if (inpB && inpB.value.trim()) {
        userAnswer = `${inp ? inp.value.trim() : ''}, ${inpB.value.trim()}`;
      } else {
        userAnswer = inp ? inp.value.trim() : "";
      }
    } else {
      const hidden = document.getElementById(`answer-q-${idx}`);
      userAnswer = hidden ? hidden.value.trim() : "";
    }

    const expected = (q.answer || "").trim();
    let isCorrect = isAnswerMatching(userAnswer, expected);

    if (!isCorrect && q.alternateAnswers && Array.isArray(q.alternateAnswers)) {
      for (const alt of q.alternateAnswers) {
        if (isAnswerMatching(userAnswer, alt)) {
          isCorrect = true;
          break;
        }
      }
    }

    if (isCorrect) correctCount++;

    details.push({
      question: q.q,
      userAnswer: userAnswer,
      expectedAnswer: expected,
      isCorrect: isCorrect
    });

    // Beri Feedback UI
    const feedbackBox = document.getElementById(`feedback-q-${idx}`);
    if (feedbackBox) {
      feedbackBox.classList.remove("correct", "wrong");
      feedbackBox.classList.add("show", isCorrect ? "correct" : "wrong");
      if (isCorrect) {
        feedbackBox.innerHTML = `<strong>Benar!</strong> ${q.explanation ? q.explanation : ''}`;
      } else {
        feedbackBox.innerHTML = `<strong>Kurang Tepat.</strong> Jawaban benar: <u>${expected}</u>. ${q.explanation ? q.explanation : ''}`;
      }
    }
  });

  const percentage = Math.round((correctCount / total) * 100);
  const isPassed = percentage >= APP_CONFIG.minPassingScore;

  // Hitung XP yang diperoleh dari latihan ini
  let gainedXP = (correctCount * 10) + (isPassed ? 50 : 0) + (percentage === 100 ? 100 : 0);
  if (exercise.audioTrack || exercise.audioUrl) gainedXP += 40;

  // Tampilkan Kartu Nilai
  const resultCard = document.getElementById("score-result-box");
  if (resultCard) {
    resultCard.classList.add("show");
    resultCard.innerHTML = `
      <div style="font-size: 0.95rem; font-weight: 700; color: ${isPassed ? '#15803D' : '#B91C1C'}; text-transform: uppercase;">
        ${isPassed ? '🎉 Selamat! Anda Lulus KKM' : '⚠️ Nilai Belum Mencapai KKM (Minimal 75%)'}
      </div>
      <div class="score-big-number">${percentage}%</div>
      <p style="color: #475569; font-size: 0.95rem;">
        Anda menjawab <strong>${correctCount}</strong> dari <strong>${total}</strong> soal dengan benar.
      </p>
      <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
        <span class="badge ${isPassed ? 'badge-success' : 'badge-danger'}" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
          Status: ${isPassed ? 'TUNTAS / LULUS' : 'REMIDI / PERLU PERBAIKAN'}
        </span>
        <span class="badge badge-primary" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
          ⚡ +${gainedXP} XP Diperoleh
        </span>
      </div>

      <!-- Motivasi Leaderboard -->
      <div style="background: #FEF3C7; border: 1px solid #FDE68A; border-radius: 8px; padding: 0.75rem 1rem; margin-top: 1rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem; text-align: left;">
        <div>
          <strong style="color: #92400E; font-size: 0.875rem;">🏆 Papan Juara Diperbarui!</strong>
          <div style="color: #B45309; font-size: 0.8rem;">XP kamu bertambah +${gainedXP}. Cek posisimu sekarang!</div>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" onclick="switchTab('section-leaderboard')" style="font-size: 0.8rem; padding: 0.35rem 0.75rem;">
          Lihat Peringkat Saya &rarr;
        </button>
      </div>

      <p style="font-size: 0.775rem; color: #64748B; margin-top: 0.75rem;">
        Nilai Anda telah otomatis dicatat di Google Spreadsheet & Rekaman Capaian.
      </p>
    `;
  }

  // Simpan progress persistent di ExercisesStore
  if (window.ExercisesStore && AppState.currentUser) {
    ExercisesStore.saveProgress(
      AppState.currentUser.username,
      exercise.id,
      correctCount,
      total,
      `${percentage}%`,
      isPassed ? "LULUS" : "REMIDI"
    );
  }

  // Simpan ke Rekaman Nilai
  const scoreRecord = normalizeScoreRecord({
    timestamp: new Date().toLocaleString("id-ID"),
    username: AppState.currentUser.username,
    nama: AppState.currentUser.nama,
    tingkat: AppState.currentUser.tingkat || "-",
    fase: AppState.currentUser.fase || "-",
    rombel: AppState.currentUser.rombel || "-",
    presensi: AppState.currentUser.presensi || "-",
    unitId: unit.id,
    unitName: unit.title,
    exerciseId: exercise.id,
    skor: correctCount,
    totalSoal: total,
    persentase: `${percentage}%`,
    status: isPassed ? "LULUS" : "REMIDI",
    detailJawaban: details,
    synced: false
  });

  // Cek apakah murid sudah memiliki riwayat untuk latihan ini (agar saat perbaikan nilai / remidi, nilai diperbarui tanpa duplikasi)
  const existingIdx = AppState.scores.findIndex(
    s => s.username && s.username.toUpperCase() === scoreRecord.username.toUpperCase() && s.exerciseId === scoreRecord.exerciseId
  );
  if (existingIdx !== -1) {
    AppState.scores[existingIdx] = scoreRecord;
  } else {
    AppState.scores.unshift(scoreRecord);
  }
  saveScoresToStorage();

  // Sinkronkan ke Google Sheet
  syncScoreToGAS(scoreRecord);
  showToast(`Nilai tersimpan: ${percentage}% &bull; +${gainedXP} XP diperoleh! 🏆`, "success");
}

function isAnswerMatching(user, expected) {
  if (!user || !expected) return false;
  const normalize = (str) => {
    return String(str)
      .toLowerCase()
      .trim()
      .replace(/[’‘`]/g, "'")
      .replace(/["“”]/g, '"')
      .replace(/[.,!?;:]+$/g, "")
      .replace(/^['"]|['"]$/g, "")
      .replace(/\s+/g, " ")
      .replace(/cannot/g, "can't")
      .trim();
  };

  const uNorm = normalize(user);
  const eNorm = normalize(expected);

  if (uNorm === eNorm) return true;

  const uClean = uNorm.replace(/[^a-z0-9]/g, "");
  const eClean = eNorm.replace(/[^a-z0-9]/g, "");
  return uClean.length > 0 && uClean === eClean;
}

function resetCurrentExercise() {
  const ex = AppState.selectedExercise;
  const unit = AppState.selectedUnit;
  if (ex && unit) {
    renderSingleExercise(ex, unit);
  }
}

// ==========================================
// 6. HALAMAN REKAMAN CAPAIAN SISWA & DOWNLOAD PDF
// ==========================================
function renderStudentRecord() {
  const container = document.getElementById("student-record-container");
  if (!container) return;

  const user = AppState.currentUser;
  if (!user || user.role === "Guru") {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 2rem;">
        <h3>Portal Capaian Siswa</h3>
        <p style="color: #64748B;">Halaman ini khusus untuk siswa yang terdaftar guna melihat riwayat nilai dan mengunduh Rapor Capaian PDF.</p>
        <button class="btn btn-primary" style="margin-top: 1rem;" onclick="openModal('modal-login')">Masuk Sebagai Siswa</button>
      </div>
    `;
    return;
  }

  // Filter nilai siswa aktif
  const myScores = AppState.scores.filter(s => (s.username || "").toUpperCase() === (user.username || "").toUpperCase());
  const totalLatihan = myScores.length;
  const avgPercentage = totalLatihan > 0
    ? Math.round(myScores.reduce((acc, cur) => acc + parsePercentage(cur.persentase, cur.skor, cur.totalSoal), 0) / totalLatihan)
    : 0;
  const totalLulus = myScores.filter(s => isScorePassed(s)).length;

  container.innerHTML = `
    <!-- Header Resmi Saat Cetak PDF -->
    <div class="print-header-official">
      <h2>REKAMAN CAPAIAN PEMBELAJARAN SISWA</h2>
      <h3>TATA BAHASA INGGRIS GRAMMAR PLUS A2</h3>
      <p>Kurikulum Cambridge A2 / CEFR & Kurikulum Merdeka Fase ${user.fase || 'E/F'}</p>
    </div>

    <!-- Identitas Siswa -->
    <div class="card" style="border-left: 5px solid #2563EB;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: gap;">
        <div>
          <span class="badge badge-primary">ID SISWA: ${user.username}</span>
          <h2 style="font-size: 1.4rem; font-weight: 800; color: #0F172A; margin: 0.35rem 0;">${user.nama}</h2>
          <div style="font-size: 0.9rem; color: #475569; display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.5rem; margin-top: 0.5rem;">
            <div><strong>Tingkat:</strong> Kelas ${user.tingkat}</div>
            <div><strong>Fase:</strong> ${user.fase}</div>
            <div><strong>Rombel:</strong> Nomor ${user.rombel}</div>
            <div><strong>No. Presensi:</strong> ${user.presensi}</div>
            <div><strong>Tgl. Lahir:</strong> ${user.tanggalLahir}</div>
          </div>
        </div>
        <div class="no-print" style="margin-top: 0.5rem;">
          <button class="btn btn-primary" onclick="downloadStudentRecordPDF()">
            🖨️ Cetak / Unduh Capaian (PDF)
          </button>
        </div>
      </div>
    </div>

    <!-- Ringkasan Statistik -->
    <div class="form-row" style="margin-bottom: 1.5rem;">
      <div class="card" style="margin-bottom: 0; text-align: center;">
        <div style="font-size: 0.8rem; color: #64748B; font-weight: 600;">LATIHAN SELESAI</div>
        <div style="font-size: 2rem; font-weight: 800; color: #2563EB;">${totalLatihan}</div>
      </div>
      <div class="card" style="margin-bottom: 0; text-align: center;">
        <div style="font-size: 0.8rem; color: #64748B; font-weight: 600;">RATA-RATA NILAI</div>
        <div style="font-size: 2rem; font-weight: 800; color: ${avgPercentage >= 75 ? '#16A34A' : '#D97706'};">${avgPercentage}%</div>
      </div>
      <div class="card" style="margin-bottom: 0; text-align: center;">
        <div style="font-size: 0.8rem; color: #64748B; font-weight: 600;">LATIHAN LULUS KKM</div>
        <div style="font-size: 2rem; font-weight: 800; color: #16A34A;">${totalLulus}</div>
      </div>
    </div>

    <!-- Tabel Rincian Nilai -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">📋 Riwayat Nilai & Pengerjaan Soal</h3>
        <span class="form-help">Batas KKM Kelulusan: 75%</span>
      </div>

      ${totalLatihan === 0 ? `
        <p style="text-align: center; color: #64748B; padding: 2rem;">Belum ada latihan yang dikerjakan. Buka tab <strong>Daftar Materi</strong> untuk mulai belajar!</p>
      ` : `
        <div class="table-responsive">
          <table class="table-custom">
            <thead>
              <tr>
                <th>Waktu</th>
                <th>Unit</th>
                <th>Latihan</th>
                <th>Skor</th>
                <th>Persentase</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${myScores.map(sc => `
                <tr>
                  <td>${sc.timestamp}</td>
                  <td><strong>Unit ${sc.unitId}</strong> - ${sc.unitName}</td>
                  <td>${sc.exerciseId}</td>
                  <td>${sc.skor} / ${sc.totalSoal}</td>
                  <td><strong>${formatPercentage(sc.persentase, sc.skor, sc.totalSoal)}</strong></td>
                  <td>
                    <span class="badge ${isScorePassed(sc) ? 'badge-success' : 'badge-danger'}">
                      ${isScorePassed(sc) ? 'LULUS' : 'REMIDI'}
                    </span>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
}

function downloadStudentRecordPDF() {
  window.print();
}

// ==========================================
// 7. PORTAL GURU, REKAP SISWA & EXPORT EXCEL
// ==========================================
function renderTeacherDashboard() {
  const container = document.getElementById("teacher-dashboard-container");
  if (!container) return;

  const totalSiswa = AppState.students.filter(s => s.role === "Siswa").length;
  const totalSubmissions = AppState.scores.length;

  container.innerHTML = `
    <div class="card" style="border-top: 4px solid #F59E0B;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="badge" style="background-color: #FEF3C7; color: #B45309; border: 1px solid #FDE68A;">PORTAL KHUSUS GURU</span>
          <h2 style="font-size: 1.4rem; font-weight: 800; color: #0F172A; margin-top: 0.25rem;">Panel Rekapitulasi & Manajemen Kelas</h2>
          <p style="color: #64748B; font-size: 0.875rem;">Pantau seluruh perkembangan belajar murid, daftarkan murid, dan unduh rekapan ke Excel.</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-primary btn-sm" onclick="openModal('modal-add-student-guru')">
            ➕ Daftarkan Murid Baru
          </button>
          <button class="btn btn-success btn-sm" onclick="exportGradesToExcel()">
            📊 Unduh Rekaman Hasil Latihan (Excel)
          </button>
        </div>
      </div>
    </div>

    <!-- Ringkasan Guru -->
    <div class="form-row" style="margin-bottom: 1.5rem;">
      <div class="card" style="margin-bottom: 0; text-align: center;">
        <div style="font-size: 0.8rem; color: #64748B; font-weight: 600;">TOTAL MURID TERDAFTAR</div>
        <div style="font-size: 2rem; font-weight: 800; color: #2563EB;">${totalSiswa}</div>
      </div>
      <div class="card" style="margin-bottom: 0; text-align: center;">
        <div style="font-size: 0.8rem; color: #64748B; font-weight: 600;">TOTAL LATIHAN DIKERJAKAN</div>
        <div style="font-size: 2rem; font-weight: 800; color: #16A34A;">${totalSubmissions}</div>
      </div>
    </div>

    <!-- Tabel 1: Seluruh Murid Terdaftar -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">👥 Daftar Murid Terdaftar (${totalSiswa} Murid)</h3>
        <span class="form-help">Username dihasilkan otomatis sesuai formula 3 huruf + DDMMYYYY</span>
      </div>

      <div class="table-responsive">
        <table class="table-custom">
          <thead>
            <tr>
              <th>No</th>
              <th>Username</th>
              <th>Nama Lengkap</th>
              <th>Tingkat</th>
              <th>Fase</th>
              <th>Rombel</th>
              <th>Presensi</th>
              <th>Password (Tgl Lahir)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${AppState.students.filter(s => s.role === "Siswa").map((s, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td><strong style="color: #2563EB;">${s.username}</strong></td>
                <td>${s.nama}</td>
                <td>${s.tingkat}</td>
                <td>${s.fase}</td>
                <td>Rombel ${s.rombel}</td>
                <td>${s.presensi}</td>
                <td><code>${s.tanggalLahir}</code></td>
                <td><span class="badge badge-success">${s.status || 'Aktif'}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tabel 2: Rekapitulasi Hasil Latihan Siswa -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">📝 Rekap Nilai & Jawaban Latihan Siswa</h3>
        <button class="btn btn-secondary btn-sm" onclick="exportGradesToExcel()">Unduh File .XLSX</button>
      </div>

      <div class="table-responsive">
        <table class="table-custom">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>Username</th>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Unit</th>
              <th>Latihan</th>
              <th>Skor</th>
              <th>Persen</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${AppState.scores.map(sc => `
              <tr>
                <td>${sc.timestamp}</td>
                <td><strong>${sc.username}</strong></td>
                <td>${sc.nama}</td>
                <td>${sc.tingkat}-${sc.rombel} (${sc.presensi})</td>
                <td>Unit ${sc.unitId}</td>
                <td>${sc.exerciseId}</td>
                <td>${sc.skor}/${sc.totalSoal}</td>
                <td><strong>${formatPercentage(sc.persentase, sc.skor, sc.totalSoal)}</strong></td>
                <td><span class="badge ${isScorePassed(sc) ? 'badge-success' : 'badge-danger'}">${isScorePassed(sc) ? 'LULUS' : 'REMIDI'}</span></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/**
 * EXPORT DATA REKAMAN NILAI SISWA KE EXCEL (.XLSX)
 * Menggunakan SheetJS library
 */
function exportGradesToExcel() {
  if (typeof XLSX === "undefined") {
    showToast("Library SheetJS sedang dimuat, silakan coba 2 detik lagi.", "warning");
    return;
  }

  // Siapkan Data Sheet 1: Rekapitulasi Nilai Siswa
  const scoresData = AppState.scores.map((sc, idx) => ({
    "No": idx + 1,
    "Waktu": sc.timestamp,
    "Username": sc.username,
    "Nama Lengkap": sc.nama,
    "Tingkat": sc.tingkat,
    "Fase": sc.fase,
    "Rombel": sc.rombel,
    "No Presensi": sc.presensi,
    "Unit ID": sc.unitId,
    "Nama Unit": sc.unitName,
    "Kode Latihan": sc.exerciseId,
    "Skor": sc.skor,
    "Total Soal": sc.totalSoal,
    "Persentase": formatPercentage(sc.persentase, sc.skor, sc.totalSoal),
    "Status Kelulusan": isScorePassed(sc) ? "LULUS" : "REMIDI"
  }));

  // Siapkan Data Sheet 2: Daftar Siswa
  const studentsData = AppState.students.filter(s => s.role === "Siswa").map((s, idx) => ({
    "No": idx + 1,
    "Tanggal Daftar": s.timestamp,
    "Username": s.username,
    "Nama Lengkap": s.nama,
    "Tingkat": s.tingkat,
    "Fase": s.fase,
    "Rombel": s.rombel,
    "Nomor Presensi": s.presensi,
    "Tanggal Lahir": s.tanggalLahir,
    "Status": s.status || "Aktif"
  }));

  // Buat Workbook
  const wb = XLSX.utils.book_new();
  const wsScores = XLSX.utils.json_to_sheet(scoresData);
  const wsStudents = XLSX.utils.json_to_sheet(studentsData);

  XLSX.utils.book_append_sheet(wb, wsScores, "Rekap_Nilai");
  XLSX.utils.book_append_sheet(wb, wsStudents, "Daftar_Siswa");

  // Unduh File
  const filename = `Rekap_Nilai_Grammar_A2_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(wb, filename);
  showToast(`File Excel ${filename} berhasil diunduh!`, "success");
}

// ==========================================
// 7B. LEADERBOARD & SISTEM GAMIFIKASI SISWA
// ==========================================
const LeaderboardFilter = {
  rombel: "ALL",
  sort: "xp", // "xp", "completed", "score"
  search: ""
};

const SEED_MOTIVATIONAL_STUDENTS = [
  { username: "ADI12052008", nama: "ADITYA PRATAMA", tingkat: "X", fase: "E", rombel: "1", presensi: "1", role: "Siswa" },
  { username: "SIT23082008", nama: "SITI NURHALIZA", tingkat: "X", fase: "E", rombel: "2", presensi: "5", role: "Siswa" },
  { username: "MUH04012008", nama: "MUHAMMAD RIZKY", tingkat: "X", fase: "E", rombel: "1", presensi: "14", role: "Siswa" },
  { username: "DEW19092008", nama: "DEWI LESTARI", tingkat: "X", fase: "E", rombel: "3", presensi: "8", role: "Siswa" },
  { username: "BAM15032008", nama: "BAMBANG PAMUNGKAS", tingkat: "X", fase: "E", rombel: "2", presensi: "3", role: "Siswa" }
];

const SEED_MOTIVATIONAL_SCORES = [
  { username: "ADI12052008", unitId: 1, exerciseId: "u1_ex1", skor: 8, totalSoal: 8, persentase: "100%", status: "LULUS" },
  { username: "ADI12052008", unitId: 1, exerciseId: "u1_ex2", skor: 7, totalSoal: 8, persentase: "88%", status: "LULUS" },
  { username: "ADI12052008", unitId: 2, exerciseId: "u2_ex1", skor: 6, totalSoal: 6, persentase: "100%", status: "LULUS" },
  { username: "ADI12052008", unitId: 3, exerciseId: "u3_ex1", skor: 8, totalSoal: 8, persentase: "100%", status: "LULUS" },
  { username: "ADI12052008", unitId: 4, exerciseId: "u4_ex1", skor: 7, totalSoal: 8, persentase: "88%", status: "LULUS" },
  { username: "ADI12052008", unitId: 4, exerciseId: "u4_ex5", skor: 6, totalSoal: 6, persentase: "100%", status: "LULUS" },
  { username: "ADI12052008", unitId: 5, exerciseId: "u5_ex1", skor: 10, totalSoal: 10, persentase: "100%", status: "LULUS" },
  { username: "ADI12052008", unitId: 6, exerciseId: "u6_ex2", skor: 9, totalSoal: 10, persentase: "90%", status: "LULUS" },
  { username: "ADI12052008", unitId: 7, exerciseId: "u7_ex3", skor: 8, totalSoal: 8, persentase: "100%", status: "LULUS" },
  { username: "ADI12052008", unitId: 8, exerciseId: "u8_ex1", skor: 9, totalSoal: 10, persentase: "90%", status: "LULUS" },
  { username: "ADI12052008", unitId: 9, exerciseId: "u9_ex6", skor: 8, totalSoal: 8, persentase: "100%", status: "LULUS" },
  { username: "ADI12052008", unitId: 10, exerciseId: "u10_ex4", skor: 6, totalSoal: 6, persentase: "100%", status: "LULUS" },

  { username: "SIT23082008", unitId: 1, exerciseId: "u1_ex1", skor: 8, totalSoal: 8, persentase: "100%", status: "LULUS" },
  { username: "SIT23082008", unitId: 2, exerciseId: "u2_ex1", skor: 6, totalSoal: 6, persentase: "100%", status: "LULUS" },
  { username: "SIT23082008", unitId: 3, exerciseId: "u3_ex1", skor: 7, totalSoal: 8, persentase: "88%", status: "LULUS" },
  { username: "SIT23082008", unitId: 4, exerciseId: "u4_ex5", skor: 6, totalSoal: 6, persentase: "100%", status: "LULUS" },
  { username: "SIT23082008", unitId: 5, exerciseId: "u5_ex4", skor: 9, totalSoal: 10, persentase: "90%", status: "LULUS" },
  { username: "SIT23082008", unitId: 6, exerciseId: "u6_ex2", skor: 9, totalSoal: 10, persentase: "90%", status: "LULUS" },
  { username: "SIT23082008", unitId: 7, exerciseId: "u7_ex6", skor: 7, totalSoal: 8, persentase: "88%", status: "LULUS" },
  { username: "SIT23082008", unitId: 9, exerciseId: "u9_ex6", skor: 8, totalSoal: 8, persentase: "100%", status: "LULUS" },
  { username: "SIT23082008", unitId: 10, exerciseId: "u10_ex6", skor: 6, totalSoal: 6, persentase: "100%", status: "LULUS" },

  { username: "MUH04012008", unitId: 1, exerciseId: "u1_ex1", skor: 7, totalSoal: 8, persentase: "88%", status: "LULUS" },
  { username: "MUH04012008", unitId: 2, exerciseId: "u2_ex1", skor: 5, totalSoal: 6, persentase: "83%", status: "LULUS" },
  { username: "MUH04012008", unitId: 4, exerciseId: "u4_ex1", skor: 8, totalSoal: 8, persentase: "100%", status: "LULUS" },
  { username: "MUH04012008", unitId: 6, exerciseId: "u6_ex1", skor: 7, totalSoal: 8, persentase: "88%", status: "LULUS" },
  { username: "MUH04012008", unitId: 7, exerciseId: "u7_ex1", skor: 7, totalSoal: 8, persentase: "88%", status: "LULUS" },
  { username: "MUH04012008", unitId: 8, exerciseId: "u8_ex1", skor: 8, totalSoal: 10, persentase: "80%", status: "LULUS" },
  { username: "MUH04012008", unitId: 10, exerciseId: "u10_ex1", skor: 7, totalSoal: 8, persentase: "88%", status: "LULUS" },

  { username: "DEW19092008", unitId: 1, exerciseId: "u1_ex1", skor: 8, totalSoal: 8, persentase: "100%", status: "LULUS" },
  { username: "DEW19092008", unitId: 3, exerciseId: "u3_ex1", skor: 6, totalSoal: 8, persentase: "75%", status: "LULUS" },
  { username: "DEW19092008", unitId: 5, exerciseId: "u5_ex1", skor: 8, totalSoal: 10, persentase: "80%", status: "LULUS" },
  { username: "DEW19092008", unitId: 7, exerciseId: "u7_ex3", skor: 7, totalSoal: 8, persentase: "88%", status: "LULUS" },
  { username: "DEW19092008", unitId: 10, exerciseId: "u10_ex4", skor: 5, totalSoal: 6, persentase: "83%", status: "LULUS" },

  { username: "BAM15032008", unitId: 1, exerciseId: "u1_ex1", skor: 6, totalSoal: 8, persentase: "75%", status: "LULUS" },
  { username: "BAM15032008", unitId: 4, exerciseId: "u4_ex1", skor: 7, totalSoal: 8, persentase: "88%", status: "LULUS" },
  { username: "BAM15032008", unitId: 6, exerciseId: "u6_ex2", skor: 8, totalSoal: 10, persentase: "80%", status: "LULUS" }
];

function getLeaderboardStudentsData() {
  const realStudents = (AppState.students || []).filter(s => s.role !== "Guru");
  const allUsernames = new Set(realStudents.map(s => (s.username || "").toUpperCase()));
  
  let studentsPool = [...realStudents];
  if (studentsPool.length < 5) {
    SEED_MOTIVATIONAL_STUDENTS.forEach(seed => {
      if (!allUsernames.has(seed.username.toUpperCase())) {
        studentsPool.push(seed);
        allUsernames.add(seed.username.toUpperCase());
      }
    });
  }

  const realScores = AppState.scores || [];
  const combinedScores = [...realScores];
  SEED_MOTIVATIONAL_SCORES.forEach(sc => {
    if (!realScores.some(rs => (rs.username || "").toUpperCase() === sc.username.toUpperCase() && rs.exerciseId === sc.exerciseId)) {
      combinedScores.push(normalizeScoreRecord(sc));
    }
  });

  return studentsPool.map(st => {
    const stUser = (st.username || "").toUpperCase();
    const stScores = combinedScores.filter(sc => (sc.username || "").toUpperCase() === stUser);
    
    const completedCount = stScores.length;
    const passedCount = stScores.filter(sc => isScorePassed(sc)).length;
    const perfectCount = stScores.filter(sc => parsePercentage(sc.persentase, sc.skor, sc.totalSoal) === 100).length;
    
    let totalCorrectSoal = 0;
    let sumPercentage = 0;
    let listeningCount = 0;
    const unitsSet = new Set();

    stScores.forEach(sc => {
      totalCorrectSoal += (parseInt(sc.skor, 10) || 0);
      const pct = parsePercentage(sc.persentase, sc.skor, sc.totalSoal);
      sumPercentage += pct;
      if (sc.unitId) unitsSet.add(sc.unitId);
      if (isListeningExercise(sc)) {
        listeningCount++;
      }
    });

    const avgPercentage = completedCount > 0 ? Math.round(sumPercentage / completedCount) : 0;

    // Perhitungan XP Gamifikasi
    let totalXP = (totalCorrectSoal * 10) + (passedCount * 50) + (perfectCount * 100) + (listeningCount * 40);
    if (completedCount >= 5) totalXP += 150;
    if (completedCount >= 10) totalXP += 300;
    if (completedCount >= 20) totalXP += 600;

    // Gelar Gramatika
    let titleInfo = { title: "Grammar Novice", badgeClass: "title-novice", icon: "🌱", minXP: 0, nextXP: 200, nextTitle: "Rising Scholar" };
    if (totalXP >= 3000) {
      titleInfo = { title: "Grammar Grandmaster", badgeClass: "title-grandmaster", icon: "👑", minXP: 3000, nextXP: null, nextTitle: "" };
    } else if (totalXP >= 2000) {
      titleInfo = { title: "Grammar Legend", badgeClass: "title-legend", icon: "🌟", minXP: 2000, nextXP: 3000, nextTitle: "Grammar Grandmaster" };
    } else if (totalXP >= 1200) {
      titleInfo = { title: "Grammar Master", badgeClass: "title-master", icon: "💎", minXP: 1200, nextXP: 2000, nextTitle: "Grammar Legend" };
    } else if (totalXP >= 600) {
      titleInfo = { title: "Grammar Expert", badgeClass: "title-expert", icon: "🏆", minXP: 600, nextXP: 1200, nextTitle: "Grammar Master" };
    } else if (totalXP >= 200) {
      titleInfo = { title: "Rising Scholar", badgeClass: "title-scholar", icon: "🚀", minXP: 200, nextXP: 600, nextTitle: "Grammar Expert" };
    }

    // Lencana Prestasi
    const badges = [];
    if (perfectCount > 0) badges.push({ icon: "🎯", label: "Sharp Shooter", desc: "Berhasil meraih nilai sempurna 100%!" });
    if (listeningCount > 0) badges.push({ icon: "🎧", label: "Golden Ear", desc: "Menuntaskan latihan listening audio!" });
    if (completedCount >= 5) badges.push({ icon: "⚡", label: "High Achiever", desc: "Menyelesaikan 5 latihan atau lebih!" });
    if (avgPercentage >= 85 && completedCount >= 3) badges.push({ icon: "🛡️", label: "Master of Accuracy", desc: "Menjaga akurasi nilai rata-rata ≥ 85%!" });
    if (completedCount >= 10) badges.push({ icon: "📚", label: "Grammar Titan", desc: "Menyelesaikan 10 latihan atau lebih!" });
    if (unitsSet.size >= 5) badges.push({ icon: "🗺️", label: "Unit Explorer", desc: "Menjelajahi dan menuntaskan latihan di 5 unit berbeda!" });

    return {
      username: st.username,
      nama: st.nama,
      tingkat: st.tingkat || "-",
      fase: st.fase || "-",
      rombel: st.rombel || "-",
      presensi: st.presensi || "-",
      completedCount: completedCount,
      passedCount: passedCount,
      perfectCount: perfectCount,
      listeningCount: listeningCount,
      totalCorrectSoal: totalCorrectSoal,
      avgPercentage: avgPercentage,
      totalXP: totalXP,
      titleInfo: titleInfo,
      badges: badges,
      unitsCompletedCount: unitsSet.size,
      scoresList: stScores.map(normalizeScoreRecord)
    };
  });
}

function setLeaderboardRombel(rombel) {
  LeaderboardFilter.rombel = rombel;
  renderLeaderboard();
}

function setLeaderboardSort(sortType) {
  LeaderboardFilter.sort = sortType;
  renderLeaderboard();
}

function setLeaderboardSearch(query) {
  LeaderboardFilter.search = query;
  renderLeaderboard();
}

function renderLeaderboard() {
  const container = document.getElementById("leaderboard-container");
  if (!container) return;

  const allData = getLeaderboardStudentsData();

  // Filter rombel
  let filtered = allData;
  if (LeaderboardFilter.rombel !== "ALL") {
    filtered = filtered.filter(item => String(item.rombel) === String(LeaderboardFilter.rombel));
  }

  // Filter pencarian
  if (LeaderboardFilter.search.trim()) {
    const q = LeaderboardFilter.search.trim().toLowerCase();
    filtered = filtered.filter(item => 
      (item.nama && item.nama.toLowerCase().includes(q)) || 
      (item.username && item.username.toLowerCase().includes(q))
    );
  }

  // Pengurutan
  if (LeaderboardFilter.sort === "completed") {
    filtered.sort((a, b) => b.completedCount - a.completedCount || b.totalXP - a.totalXP);
  } else if (LeaderboardFilter.sort === "score") {
    filtered.sort((a, b) => b.avgPercentage - a.avgPercentage || b.totalXP - a.totalXP);
  } else {
    filtered.sort((a, b) => b.totalXP - a.totalXP || b.completedCount - a.completedCount);
  }

  filtered.forEach((item, idx) => {
    item.rank = idx + 1;
  });

  const currentUsername = AppState.currentUser ? (AppState.currentUser.username || "").toUpperCase() : "";
  const myData = currentUsername ? allData.find(item => (item.username || "").toUpperCase() === currentUsername) : null;
  const myRankInFiltered = myData ? (filtered.findIndex(item => (item.username || "").toUpperCase() === currentUsername) + 1) : 0;

  // Statistik Kelas
  const totalStudents = allData.length;
  const totalCompletedAll = allData.reduce((acc, c) => acc + c.completedCount, 0);
  const totalXPAll = allData.reduce((acc, c) => acc + c.totalXP, 0);
  const avgClassScore = allData.length > 0 ? Math.round(allData.reduce((acc, c) => acc + c.avgPercentage, 0) / allData.length) : 0;

  // Top 3 Podium
  const top1 = filtered[0] || null;
  const top2 = filtered[1] || null;
  const top3 = filtered[2] || null;

  // Rombel list untuk filter
  const rombelSet = new Set();
  allData.forEach(d => { if (d.rombel && d.rombel !== "-") rombelSet.add(d.rombel); });
  const rombelList = Array.from(rombelSet).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

  function getAvatarInitials(name) {
    if (!name) return "??";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
  }

  container.innerHTML = `
    <!-- Hero Banner Leaderboard -->
    <div class="leaderboard-hero">
      <div class="leaderboard-hero-title">
        <span>🏆</span> Papan Juara &amp; Prestasi Grammar Plus A2
      </div>
      <p class="leaderboard-hero-subtitle">
        Kumpulkan XP dari setiap latihan yang kamu kerjakan, raih lencana kehormatan (*Badges*), dan buktikan kemampuan tata bahasa Inggrismu di posisi puncak kelas!
      </p>
      <div class="leaderboard-stats-row">
        <div class="leaderboard-stat-item">
          <span class="leaderboard-stat-num">${totalStudents}</span>
          <span class="leaderboard-stat-label">Siswa Berkompetisi</span>
        </div>
        <div class="leaderboard-stat-item">
          <span class="leaderboard-stat-num">${totalCompletedAll}</span>
          <span class="leaderboard-stat-label">Latihan Diselesaikan</span>
        </div>
        <div class="leaderboard-stat-item">
          <span class="leaderboard-stat-num">${totalXPAll.toLocaleString("id-ID")} XP</span>
          <span class="leaderboard-stat-label">Total XP Kelas</span>
        </div>
        <div class="leaderboard-stat-item">
          <span class="leaderboard-stat-num">${avgClassScore}%</span>
          <span class="leaderboard-stat-label">Rata-rata Akurasi</span>
        </div>
      </div>
    </div>

    <!-- Banner Status & Posisi Siswa Aktif -->
    ${myData ? `
      <div class="my-rank-banner">
        <div class="my-rank-info">
          <div class="my-rank-badge">
            #${myRankInFiltered > 0 ? myRankInFiltered : '-'}
          </div>
          <div>
            <div style="font-size: 0.8rem; color: #64748B; font-weight: 600;">STATUS KAMU SAAT INI</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: #0F172A;">
              ${escapeHtml(myData.nama)} <span class="title-badge ${myData.titleInfo.badgeClass}">${myData.titleInfo.icon} ${myData.titleInfo.title}</span>
            </div>
            <div style="font-size: 0.825rem; color: #475569; margin-top: 0.15rem;">
              Total XP: <strong style="color: #2563EB;">${myData.totalXP} XP</strong> &bull; Latihan Selesai: <strong>${myData.completedCount}</strong> &bull; Rata-rata: <strong>${myData.avgPercentage}%</strong>
            </div>
          </div>
        </div>

        <div class="my-rank-progress-wrap">
          ${myData.titleInfo.nextXP ? `
            <div style="display: flex; justify-content: space-between; font-size: 0.775rem; color: #475569; font-weight: 600;">
              <span>Target Gelar: ${myData.titleInfo.nextTitle}</span>
              <span>${myData.totalXP} / ${myData.titleInfo.nextXP} XP</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${Math.min(100, Math.round(((myData.totalXP - myData.titleInfo.minXP) / (myData.titleInfo.nextXP - myData.titleInfo.minXP)) * 100))}%;"></div>
            </div>
            <div style="font-size: 0.725rem; color: #16A34A; margin-top: 0.25rem;">
              ⚡ Butuh <strong>${Math.max(0, myData.titleInfo.nextXP - myData.totalXP)} XP</strong> lagi untuk naik level!
            </div>
          ` : `
            <div style="font-size: 0.8rem; color: #9333EA; font-weight: 700;">
              🎉 Selamat! Kamu telah mencapai gelar tertinggi: Grammar Grandmaster!
            </div>
          `}
        </div>

        <div>
          <button class="btn btn-primary btn-sm" onclick="switchTab('section-latihan')" style="font-size: 0.85rem; padding: 0.55rem 1rem;">
            ⚡ Kerjakan Latihan Sekarang
          </button>
        </div>
      </div>
    ` : `
      <div class="card" style="background: #EFF6FF; border: 1px solid #BFDBFE; margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <h4 style="color: #1E40AF; font-weight: 800; font-size: 1.05rem; margin-bottom: 0.25rem;">
            👋 Ingin Nama &amp; Peringkatmu Tampil di Sini?
          </h4>
          <p style="color: #3B82F6; font-size: 0.875rem; margin: 0;">
            Masuk dengan akun siswa atau daftarkan dirimu untuk mulai mengumpulkan XP dan memperebutkan mahkota juara!
          </p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-primary btn-sm" onclick="openModal('modal-login')">Masuk Sekarang</button>
          <button class="btn btn-secondary btn-sm" onclick="openModal('modal-register')">Daftar Akun</button>
        </div>
      </div>
    `}

    <!-- Podium 3 Besar Juara -->
    ${filtered.length >= 3 ? `
      <div style="margin-bottom: 0.75rem; display: flex; align-items: center; justify-content: space-between;">
        <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; display: flex; align-items: center; gap: 0.5rem;">
          <span>🌟</span> Podium 3 Besar Juara Kelas
        </h3>
        <span style="font-size: 0.8rem; color: #64748B;">Berdasarkan perolehan Total XP</span>
      </div>

      <div class="podium-grid">
        <!-- Juara 2 (Perak - Kiri) -->
        <div class="podium-card rank-2">
          <div class="podium-avatar">${getAvatarInitials(top2.nama)}</div>
          <div class="podium-rank-badge">🥈 Peringkat 2</div>
          <div class="podium-name">${escapeHtml(top2.nama)}</div>
          <div class="podium-meta">Kelas ${top2.tingkat}-${top2.rombel} &bull; No. ${top2.presensi}</div>
          <div class="podium-xp">${top2.totalXP.toLocaleString("id-ID")} XP</div>
          <div><span class="title-badge ${top2.titleInfo.badgeClass}">${top2.titleInfo.icon} ${top2.titleInfo.title}</span></div>
          <div style="font-size: 0.775rem; color: #475569; margin-top: 0.4rem;">
            ${top2.completedCount} Latihan &bull; Akurasi ${top2.avgPercentage}%
          </div>
          <div class="podium-badges-row">
            ${top2.badges.map(b => `<span class="honor-badge" title="${b.label}: ${b.desc}">${b.icon}</span>`).join("")}
          </div>
          <button class="btn btn-secondary btn-sm" onclick="openStudentDetailModal('${escapeHtml(top2.username)}')" style="margin-top: 0.75rem; font-size: 0.75rem; padding: 0.25rem 0.65rem;">
            Lihat Prestasi
          </button>
        </div>

        <!-- Juara 1 (Emas - Tengah) -->
        <div class="podium-card rank-1">
          <div class="podium-crown">👑</div>
          <div class="podium-avatar">${getAvatarInitials(top1.nama)}</div>
          <div class="podium-rank-badge">🥇 Peringkat 1 (Champion)</div>
          <div class="podium-name" style="font-size: 1.2rem; color: #B45309;">${escapeHtml(top1.nama)}</div>
          <div class="podium-meta">Kelas ${top1.tingkat}-${top1.rombel} &bull; No. ${top1.presensi}</div>
          <div class="podium-xp" style="font-size: 1.6rem; color: #D97706;">${top1.totalXP.toLocaleString("id-ID")} XP</div>
          <div><span class="title-badge ${top1.titleInfo.badgeClass}">${top1.titleInfo.icon} ${top1.titleInfo.title}</span></div>
          <div style="font-size: 0.8rem; color: #78350F; margin-top: 0.4rem; font-weight: 600;">
            ${top1.completedCount} Latihan Dituntaskan &bull; Akurasi ${top1.avgPercentage}%
          </div>
          <div class="podium-badges-row">
            ${top1.badges.map(b => `<span class="honor-badge" title="${b.label}: ${b.desc}">${b.icon}</span>`).join("")}
          </div>
          <button class="btn btn-primary btn-sm" onclick="openStudentDetailModal('${escapeHtml(top1.username)}')" style="margin-top: 0.75rem; font-size: 0.775rem; padding: 0.35rem 0.85rem;">
            Lihat Prestasi
          </button>
        </div>

        <!-- Juara 3 (Perunggu - Kanan) -->
        <div class="podium-card rank-3">
          <div class="podium-avatar">${getAvatarInitials(top3.nama)}</div>
          <div class="podium-rank-badge">🥉 Peringkat 3</div>
          <div class="podium-name">${escapeHtml(top3.nama)}</div>
          <div class="podium-meta">Kelas ${top3.tingkat}-${top3.rombel} &bull; No. ${top3.presensi}</div>
          <div class="podium-xp">${top3.totalXP.toLocaleString("id-ID")} XP</div>
          <div><span class="title-badge ${top3.titleInfo.badgeClass}">${top3.titleInfo.icon} ${top3.titleInfo.title}</span></div>
          <div style="font-size: 0.775rem; color: #475569; margin-top: 0.4rem;">
            ${top3.completedCount} Latihan &bull; Akurasi ${top3.avgPercentage}%
          </div>
          <div class="podium-badges-row">
            ${top3.badges.map(b => `<span class="honor-badge" title="${b.label}: ${b.desc}">${b.icon}</span>`).join("")}
          </div>
          <button class="btn btn-secondary btn-sm" onclick="openStudentDetailModal('${escapeHtml(top3.username)}')" style="margin-top: 0.75rem; font-size: 0.75rem; padding: 0.25rem 0.65rem;">
            Lihat Prestasi
          </button>
        </div>
      </div>
    ` : ''}

    <!-- Toolbar Kontrol & Filter -->
    <div class="leaderboard-controls-card">
      <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
        <div>
          <label style="font-size: 0.75rem; font-weight: 700; color: #64748B; display: block; margin-bottom: 0.2rem;">FILTER ROMBEL:</label>
          <select class="form-control" style="font-size: 0.85rem; padding: 0.35rem 0.65rem; min-width: 150px;" onchange="setLeaderboardRombel(this.value)">
            <option value="ALL" ${LeaderboardFilter.rombel === "ALL" ? 'selected' : ''}>Semua Rombel</option>
            ${rombelList.map(r => `<option value="${r}" ${LeaderboardFilter.rombel === String(r) ? 'selected' : ''}>Rombel ${r}</option>`).join("")}
          </select>
        </div>

        <div>
          <label style="font-size: 0.75rem; font-weight: 700; color: #64748B; display: block; margin-bottom: 0.2rem;">URUTKAN:</label>
          <select class="form-control" style="font-size: 0.85rem; padding: 0.35rem 0.65rem; min-width: 190px;" onchange="setLeaderboardSort(this.value)">
            <option value="xp" ${LeaderboardFilter.sort === "xp" ? 'selected' : ''}>🔥 Total XP Terbanyak</option>
            <option value="completed" ${LeaderboardFilter.sort === "completed" ? 'selected' : ''}>📝 Latihan Terbanyak</option>
            <option value="score" ${LeaderboardFilter.sort === "score" ? 'selected' : ''}>🎯 Rata-rata Nilai Tertinggi</option>
          </select>
        </div>
      </div>

      <div style="display: flex; gap: 0.5rem; align-items: flex-end; flex-wrap: wrap;">
        <div>
          <label style="font-size: 0.75rem; font-weight: 700; color: #64748B; display: block; margin-bottom: 0.2rem;">CARI SISWA:</label>
          <input type="text" class="form-control" placeholder="Ketik nama siswa..." value="${escapeHtml(LeaderboardFilter.search)}" style="font-size: 0.85rem; padding: 0.35rem 0.65rem; width: 180px;" oninput="setLeaderboardSearch(this.value)">
        </div>
        <button class="btn btn-secondary btn-sm" onclick="renderLeaderboard()" title="Muat ulang peringkat" style="padding: 0.4rem 0.75rem; font-size: 0.85rem;">
          🔄 Perbarui
        </button>
      </div>
    </div>

    <!-- Tabel Peringkat Lengkap -->
    <div class="card">
      <div class="card-header" style="margin-bottom: 0.75rem;">
        <h3 class="card-title">📋 Klasemen Peringkat Siswa</h3>
        <span class="form-help">Menampilkan ${filtered.length} siswa</span>
      </div>

      <div class="table-responsive">
        <table class="table-custom leaderboard-table">
          <thead>
            <tr>
              <th style="width: 60px; text-align: center;">Rank</th>
              <th>Siswa</th>
              <th>Kelas / Presensi</th>
              <th>Gelar Gramatika</th>
              <th style="text-align: center;">Latihan Selesai</th>
              <th style="text-align: center;">Akurasi Nilai</th>
              <th>Lencana</th>
              <th style="text-align: right;">Total XP</th>
              <th style="text-align: center;">Aksi</th>
            </tr>
          </thead>
          <tbody>
            ${filtered.length === 0 ? `
              <tr>
                <td colspan="9" style="text-align: center; color: #64748B; padding: 2rem;">
                  Tidak ada siswa yang sesuai dengan filter pencarian.
                </td>
              </tr>
            ` : filtered.map(item => {
              const isMe = currentUsername && (item.username || "").toUpperCase() === currentUsername;
              let rankPillClass = "rank-num-pill";
              let rankContent = `${item.rank}`;
              if (item.rank === 1) { rankPillClass += " r1"; rankContent = "🥇 1"; }
              else if (item.rank === 2) { rankPillClass += " r2"; rankContent = "🥈 2"; }
              else if (item.rank === 3) { rankPillClass += " r3"; rankContent = "🥉 3"; }

              return `
                <tr class="${isMe ? 'highlight-me' : ''}">
                  <td style="text-align: center;">
                    <span class="${rankPillClass}">${rankContent}</span>
                  </td>
                  <td>
                    <div style="font-weight: 700; color: #0F172A;">
                      ${escapeHtml(item.nama)} ${isMe ? '<span class="badge badge-primary" style="font-size: 0.65rem; margin-left: 0.35rem;">KAMU</span>' : ''}
                    </div>
                    <div style="font-size: 0.75rem; color: #64748B;">${escapeHtml(item.username)}</div>
                  </td>
                  <td>
                    ${item.tingkat}-${item.rombel} <span style="color: #64748B;">(No. ${item.presensi})</span>
                  </td>
                  <td>
                    <span class="title-badge ${item.titleInfo.badgeClass}">
                      ${item.titleInfo.icon} ${item.titleInfo.title}
                    </span>
                  </td>
                  <td style="text-align: center;">
                    <strong>${item.completedCount}</strong> <span style="font-size: 0.75rem; color: #64748B;">soal</span>
                  </td>
                  <td style="text-align: center;">
                    <div style="font-weight: 700; color: ${item.avgPercentage >= 75 ? '#16A34A' : '#D97706'};">
                      ${item.avgPercentage}%
                    </div>
                    <div style="font-size: 0.7rem; color: #64748B;">${item.passedCount} lulus</div>
                  </td>
                  <td>
                    <div style="display: flex; gap: 0.2rem; flex-wrap: wrap;">
                      ${item.badges.length > 0 ? item.badges.map(b => `<span class="honor-badge" title="${b.label}: ${b.desc}">${b.icon}</span>`).join("") : '<span style="color: #94A3B8; font-size: 0.75rem;">-</span>'}
                    </div>
                  </td>
                  <td style="text-align: right;">
                    <strong style="color: #2563EB; font-size: 1.05rem;">${item.totalXP.toLocaleString("id-ID")}</strong>
                    <span style="font-size: 0.75rem; color: #64748B;">XP</span>
                  </td>
                  <td style="text-align: center;">
                    <button class="btn btn-secondary btn-sm" onclick="openStudentDetailModal('${escapeHtml(item.username)}')" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;">
                      Detail
                    </button>
                  </td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function openStudentDetailModal(username) {
  const allData = getLeaderboardStudentsData();
  const student = allData.find(s => (s.username || "").toUpperCase() === String(username).toUpperCase());
  if (!student) return;

  const modalBody = document.getElementById("modal-student-detail-body");
  if (!modalBody) return;

  modalBody.innerHTML = `
    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem; border-bottom: 1px solid #E2E8F0; padding-bottom: 1rem;">
      <div style="width: 58px; height: 58px; border-radius: 9999px; background: linear-gradient(135deg, #2563EB, #1D4ED8); color: #FFF; display: flex; align-items: center; justify-content: center; font-size: 1.35rem; font-weight: 800;">
        ${student.nama.substring(0, 2).toUpperCase()}
      </div>
      <div>
        <h4 style="font-size: 1.2rem; font-weight: 800; color: #0F172A; margin: 0;">${escapeHtml(student.nama)}</h4>
        <div style="font-size: 0.825rem; color: #64748B; margin-top: 0.2rem;">
          Kelas ${student.tingkat}-${student.rombel} &bull; No. Presensi ${student.presensi} &bull; ID: ${escapeHtml(student.username)}
        </div>
        <div style="margin-top: 0.4rem;">
          <span class="title-badge ${student.titleInfo.badgeClass}">${student.titleInfo.icon} ${student.titleInfo.title}</span>
        </div>
      </div>
    </div>

    <!-- Statistik Inti -->
    <div class="form-row" style="margin-bottom: 1.25rem;">
      <div class="card" style="margin-bottom: 0; padding: 0.75rem; text-align: center; background: #F8FAFC;">
        <div style="font-size: 0.75rem; color: #64748B; font-weight: 600;">TOTAL XP</div>
        <div style="font-size: 1.35rem; font-weight: 800; color: #2563EB;">${student.totalXP.toLocaleString("id-ID")}</div>
      </div>
      <div class="card" style="margin-bottom: 0; padding: 0.75rem; text-align: center; background: #F8FAFC;">
        <div style="font-size: 0.75rem; color: #64748B; font-weight: 600;">LATIHAN SELESAI</div>
        <div style="font-size: 1.35rem; font-weight: 800; color: #0F172A;">${student.completedCount}</div>
      </div>
      <div class="card" style="margin-bottom: 0; padding: 0.75rem; text-align: center; background: #F8FAFC;">
        <div style="font-size: 0.75rem; color: #64748B; font-weight: 600;">RATA-RATA NILAI</div>
        <div style="font-size: 1.35rem; font-weight: 800; color: ${student.avgPercentage >= 75 ? '#16A34A' : '#D97706'};">${student.avgPercentage}%</div>
      </div>
      <div class="card" style="margin-bottom: 0; padding: 0.75rem; text-align: center; background: #F8FAFC;">
        <div style="font-size: 0.75rem; color: #64748B; font-weight: 600;">LULUS KKM</div>
        <div style="font-size: 1.35rem; font-weight: 800; color: #16A34A;">${student.passedCount}</div>
      </div>
    </div>

    <!-- Lencana Kehormatan Unlocked -->
    <div style="margin-bottom: 1.25rem;">
      <h5 style="font-weight: 700; color: #1E293B; margin-bottom: 0.5rem; font-size: 0.95rem;">
        🎖️ Lencana Kehormatan yang Diraih (${student.badges.length})
      </h5>
      ${student.badges.length === 0 ? `
        <p style="font-size: 0.85rem; color: #64748B;">Belum ada lencana yang terbuka. Terus kerjakan latihan untuk membuka lencana baru!</p>
      ` : `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.5rem;">
          ${student.badges.map(b => `
            <div style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px; padding: 0.5rem 0.75rem; display: flex; align-items: center; gap: 0.65rem;">
              <span style="font-size: 1.4rem;">${b.icon}</span>
              <div>
                <div style="font-weight: 700; font-size: 0.825rem; color: #0F172A;">${b.label}</div>
                <div style="font-size: 0.725rem; color: #64748B;">${b.desc}</div>
              </div>
            </div>
          `).join("")}
        </div>
      `}
    </div>

    <!-- Riwayat Pengerjaan Singkat -->
    <div>
      <h5 style="font-weight: 700; color: #1E293B; margin-bottom: 0.5rem; font-size: 0.95rem;">
        📝 Latihan yang Telah Diselesaikan
      </h5>
      ${student.scoresList.length === 0 ? `
        <p style="font-size: 0.85rem; color: #64748B;">Belum ada riwayat pengerjaan.</p>
      ` : `
        <div style="max-height: 200px; overflow-y: auto; border: 1px solid #E2E8F0; border-radius: 6px;">
          <table class="table-custom" style="margin: 0; font-size: 0.8rem;">
            <thead>
              <tr>
                <th>Unit</th>
                <th>Kode Latihan</th>
                <th>Skor</th>
                <th>Nilai</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${student.scoresList.map(sc => `
                <tr>
                  <td>Unit ${sc.unitId || '-'}</td>
                  <td>${sc.exerciseId || '-'}</td>
                  <td>${sc.skor}/${sc.totalSoal}</td>
                  <td><strong>${formatPercentage(sc.persentase, sc.skor, sc.totalSoal)}</strong></td>
                  <td><span class="badge ${isScorePassed(sc) ? 'badge-success' : 'badge-danger'}">${isScorePassed(sc) ? 'LULUS' : 'REMIDI'}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `}
    </div>

    <div style="margin-top: 1.25rem; text-align: right;">
      <button type="button" class="btn btn-secondary" onclick="closeModal('modal-student-detail')">Tutup</button>
    </div>
  `;

  openModal("modal-student-detail");
}

// ==========================================
// 8. LAMPIRAN (IRREGULAR VERBS, FONETIK, AUDIO)
// ==========================================
function initAppendices() {
  renderLampiranA();
  renderLampiranB();
  renderAudioTranscripts();
}

function renderLampiranA() {
  const container = document.getElementById("lampiran-a-container");
  if (!container || !window.LAMPIRAN_A) return;

  container.innerHTML = `
    <div class="grammar-table-wrapper">
      <table class="table-grammar">
        <thead>
          <tr>
            <th>Bentuk Dasar (Infinitive)</th>
            <th>Past Simple (V2)</th>
            <th>Past Participle (V3)</th>
            <th>Arti / Makna</th>
          </tr>
        </thead>
        <tbody>
          ${window.LAMPIRAN_A.map(v => `
            <tr>
              <td><strong>${v.base}</strong></td>
              <td>${v.past_simple}</td>
              <td>${v.past_participle}</td>
              <td style="color: #64748B;">${v.meaning}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderLampiranB() {
  const container = document.getElementById("lampiran-b-container");
  if (!container || !window.LAMPIRAN_B) return;

  container.innerHTML = `
    <div class="form-row">
      <div>
        <h4 style="font-weight: 700; margin-bottom: 0.5rem;">Alfabet Fonetis (IPA)</h4>
        <div class="grammar-table-wrapper">
          <table class="table-grammar">
            <thead>
              <tr><th>Jenis</th><th>Simbol</th><th>Contoh Kata</th></tr>
            </thead>
            <tbody>
              ${window.LAMPIRAN_B.phonetics.map(p => `
                <tr>
                  <td><span class="badge badge-primary">${p.type}</span></td>
                  <td><strong>${p.symbol}</strong></td>
                  <td>${p.example}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h4 style="font-weight: 700; margin-bottom: 0.5rem;">Tanda Baca Bahasa Inggris</h4>
        <div class="grammar-table-wrapper">
          <table class="table-grammar">
            <thead>
              <tr><th>Tanda Baca</th><th>Istilah Indonesia</th><th>Penggunaan</th></tr>
            </thead>
            <tbody>
              ${window.LAMPIRAN_B.punctuation.map(pc => `
                <tr>
                  <td><strong>${pc.mark}</strong></td>
                  <td>${pc.indo}</td>
                  <td style="font-size: 0.8rem; color: #475569;">${pc.use}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderAudioTranscripts() {
  const container = document.getElementById("audio-transcripts-container");
  if (!container || !window.AUDIO_TRANSCRIPTS) return;

  container.innerHTML = window.AUDIO_TRANSCRIPTS.map((tr, idx) => {
    const playerHtml = getAudioPlayerHtml(tr.track, "tr-appendix-" + idx);
    return `
      <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1.15rem; margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 0.85rem;">
          <h5 style="color: #2563EB; font-weight: 700; margin: 0; font-size: 1rem;">${escapeHtml(tr.track)}</h5>
          <div style="flex: 1; min-width: 280px; max-width: 600px;">
            ${playerHtml}
          </div>
        </div>
        <pre style="white-space: pre-wrap; font-family: inherit; font-size: 0.85rem; color: #334155; line-height: 1.6; margin: 0; background: #FFFFFF; padding: 0.75rem; border-radius: 6px; border: 1px solid #F1F5F9;">${escapeHtml(tr.content)}</pre>
      </div>
    `;
  }).join("");
}

// ==========================================
// 9. GOOGLE SPREADSHEET SYNC ENGINE
// ==========================================
function initSettingsUI() {
  const gasInput = document.getElementById("settings-gas-url");
  if (gasInput && AppState.gasUrl) {
    gasInput.value = AppState.gasUrl;
  }
}

function saveGasUrl() {
  const input = document.getElementById("settings-gas-url");
  if (!input) return;
  const url = input.value.trim();
  AppState.gasUrl = url;
  localStorage.setItem("grammar_a2_gas_url", url);
  showToast("URL Google Apps Script berhasil disimpan!", "success");
  testGasConnection();
}


function fetchGAS(action) {
  return new Promise((resolve, reject) => {
    if (!AppState.gasUrl) {
      return reject(new Error("URL Google Apps Script belum dikonfigurasi"));
    }

    const callbackName = "gas_cb_a2_" + Math.random().toString(36).substring(2, 10) + "_" + Date.now();
    const timeout = setTimeout(() => {
      cleanup();
      const sep = AppState.gasUrl.includes("?") ? "&" : "?";
      fetch(`${AppState.gasUrl}${sep}action=${encodeURIComponent(action)}`)
        .then(r => r.json())
        .then(resolve)
        .catch(() => reject(new Error("Koneksi ke Google Apps Script timeout / gagal")));
    }, 15000);

    function cleanup() {
      clearTimeout(timeout);
      delete window[callbackName];
      const script = document.getElementById(callbackName);
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    }

    window[callbackName] = function(data) {
      cleanup();
      resolve(data);
    };

    // Gunakan JSONP via script tag untuk mengatasi limitasi CORS cross-device di browser
    const script = document.createElement("script");
    script.id = callbackName;
    const sep = AppState.gasUrl.includes("?") ? "&" : "?";
    script.src = `${AppState.gasUrl}${sep}action=${encodeURIComponent(action)}&callback=${callbackName}&_t=${Date.now()}`;
    script.onerror = function() {
      cleanup();
      fetch(`${AppState.gasUrl}${sep}action=${encodeURIComponent(action)}`)
        .then(res => res.json())
        .then(resolve)
        .catch(reject);
    };
    document.head.appendChild(script);
  });
}

function testGasConnection() {
  const statusElem = document.getElementById("sync-status-text");
  const dot = document.getElementById("sync-status-dot");
  if (!AppState.gasUrl) {
    if (statusElem) statusElem.innerText = "Mode Lokal (Belum Terhubung GAS)";
    if (dot) dot.className = "dot-indicator";
    return;
  }

  if (statusElem) statusElem.innerText = "Menghubungkan ke Google Sheet...";
  if (dot) dot.className = "dot-indicator syncing";

  fetchGAS("ping")
    .then(data => {
      if (data && data.status === "success") {
        if (statusElem) statusElem.innerText = "Google Sheet Terhubung";
        if (dot) dot.className = "dot-indicator online";
        syncAllLocalDataToGAS();
        fetchStudentsFromGAS();
        fetchScoresFromGAS();
      } else {
        throw new Error((data && data.message) || "Gagal menghubungkan");
      }
    })
    .catch(err => {
      console.warn("GAS Ping failed:", err);
      if (statusElem) statusElem.innerText = "Koneksi Offline / Lokal";
      if (dot) dot.className = "dot-indicator";
    });
}

function syncAllLocalDataToGAS() {
  if (!AppState.gasUrl) return;

  // Sinkronkan murid yang belum tersinkron
  const pendingStudents = (AppState.students || []).filter(s => s.role !== "Guru" && s.synced === false);
  if (pendingStudents.length > 0) {
    console.log(`Menyinkronkan ${pendingStudents.length} siswa tertunda ke Google Sheet...`);
    pendingStudents.forEach(st => syncStudentToGAS(st));
  }

  // Sinkronkan skor latihan yang belum tersinkron
  const pendingScores = (AppState.scores || []).filter(sc => sc.synced === false);
  if (pendingScores.length > 0) {
    console.log(`Menyinkronkan ${pendingScores.length} skor tertunda ke Google Sheet...`);
    pendingScores.forEach(sc => syncScoreToGAS(sc));
  }
}

async function fetchStudentsFromGAS() {
  if (!AppState.gasUrl) return;
  try {
    const data = await fetchGAS("getStudents");
    if (data && data.status === "success" && Array.isArray(data.students)) {
      let updated = false;
      data.students.forEach(remoteStudent => {
        const idx = AppState.students.findIndex(s => (s.username || "").toUpperCase() === (remoteStudent.username || "").toUpperCase());
        if (idx >= 0) {
          AppState.students[idx] = Object.assign({}, AppState.students[idx], remoteStudent, { synced: true });
        } else {
          AppState.students.push(Object.assign({}, remoteStudent, { synced: true }));
          updated = true;
        }
      });
      if (updated) {
        saveStudentsToStorage();
      }
    }
  } catch (err) {
    console.log("Could not fetch remote students from GAS:", err);
  }
}

async function fetchScoresFromGAS() {
  if (!AppState.gasUrl) return;
  try {
    const data = await fetchGAS("getScores");
    if (data && data.status === "success" && Array.isArray(data.scores)) {
      const map = new Map();
      AppState.scores.forEach(s => {
        if (s && s.username && s.exerciseId) {
          const norm = normalizeScoreRecord(s);
          const key = `${norm.username.toUpperCase()}___${norm.exerciseId}`;
          map.set(key, norm);
        }
      });
      data.scores.forEach(sc => {
        if (!sc || !sc.username || !sc.exerciseId) return;
        const norm = normalizeScoreRecord(sc);
        const key = `${norm.username.toUpperCase()}___${norm.exerciseId}`;
        const existing = map.get(key);
        // Pertahankan skor terbaik jika ada
        if (!existing || norm.skor >= (Number(existing.skor) || 0)) {
          map.set(key, Object.assign({}, norm, { synced: true }));
        }
      });
      AppState.scores = Array.from(map.values());
      saveScoresToStorage();

      // Render ulang jika pengguna sedang membuka tab Leaderboard, Capaian Siswa, atau Guru
      const activeTab = document.querySelector(".section-pane.active");
      if (activeTab) {
        if (activeTab.id === "section-leaderboard") {
          renderLeaderboard();
        } else if (activeTab.id === "section-capaian") {
          renderStudentDashboard();
        } else if (activeTab.id === "section-guru") {
          renderTeacherDashboard();
        }
      }
    }
  } catch (err) {
    console.log("Could not fetch remote scores from GAS:", err);
  }
}

async function syncStudentToGAS(student) {
  if (!AppState.gasUrl) {
    student.synced = false;
    saveStudentsToStorage();
    return;
  }

  const payload = {
    action: "register",
    username: student.username,
    tingkat: student.tingkat,
    fase: student.fase,
    rombel: student.rombel,
    presensi: student.presensi,
    nama: student.nama,
    tanggalLahir: student.tanggalLahir
  };

  try {
    // Jalur 1: POST dengan text/plain (menghindari CORS preflight)
    await fetch(AppState.gasUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    student.synced = true;
    saveStudentsToStorage();
    showToast(`Data murid ${student.nama} berhasil dicatat di Google Sheet!`, "success");
  } catch (err) {
    console.warn("POST sync student failed, trying no-cors fallback...", err);
    try {
      // Jalur 2: Fallback POST mode no-cors (Google Script tetap menerima & memproses)
      await fetch(AppState.gasUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      student.synced = true;
      saveStudentsToStorage();
      showToast(`Data murid ${student.nama} terkirim ke Google Sheet!`, "success");
    } catch (e2) {
      console.warn("no-cors failed, trying GET fallback...", e2);
      try {
        // Jalur 3: Fallback GET query parameters
        const queryParams = new URLSearchParams(payload).toString();
        await fetch(`${AppState.gasUrl}?${queryParams}`, { method: "GET", mode: "no-cors" });
        student.synced = true;
        saveStudentsToStorage();
        showToast(`Data murid ${student.nama} terkirim ke Google Sheet!`, "success");
      } catch (e3) {
        console.error("Gagal sinkronisasi siswa ke Google Sheet:", e3);
        student.synced = false;
        saveStudentsToStorage();
        showToast("Koneksi Google Sheet lambat. Data tersimpan di lokal dan akan disinkronkan otomatis.", "warning");
      }
    }
  }
}

async function syncScoreToGAS(score) {
  if (!AppState.gasUrl) {
    score.synced = false;
    saveScoresToStorage();
    return;
  }

  const payload = {
    action: "submitScore",
    username: score.username,
    nama: score.nama,
    tingkat: score.tingkat,
    fase: score.fase,
    rombel: score.rombel,
    presensi: score.presensi,
    unitId: score.unitId,
    unitName: score.unitName,
    exerciseId: score.exerciseId,
    skor: score.skor,
    totalSoal: score.totalSoal,
    persentase: score.persentase,
    status: score.status,
    detailJawaban: typeof score.detailJawaban === "object" ? JSON.stringify(score.detailJawaban) : (score.detailJawaban || "{}")
  };

  try {
    // Jalur 1: POST dengan text/plain
    await fetch(AppState.gasUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload)
    });
    score.synced = true;
    saveScoresToStorage();
    showToast("Nilai berhasil dicatat di Google Spreadsheet!", "success");
  } catch (err) {
    console.warn("POST score sync failed, trying no-cors fallback...", err);
    try {
      // Jalur 2: Fallback POST mode no-cors
      await fetch(AppState.gasUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      score.synced = true;
      saveScoresToStorage();
      showToast("Nilai berhasil dikirim ke Google Spreadsheet!", "success");
    } catch (e2) {
      console.warn("no-cors failed, trying GET fallback...", e2);
      try {
        // Jalur 3: Fallback GET query parameters
        const queryParams = new URLSearchParams(payload).toString();
        await fetch(`${AppState.gasUrl}?${queryParams}`, { method: "GET", mode: "no-cors" });
        score.synced = true;
        saveScoresToStorage();
        showToast("Nilai berhasil dikirim ke Google Spreadsheet!", "success");
      } catch (e3) {
        console.error("Gagal sinkronisasi skor ke Google Sheet:", e3);
        score.synced = false;
        saveScoresToStorage();
        showToast("Nilai tersimpan di perangkat lokal. Akan otomatis dicatat saat terhubung.", "warning");
      }
    }
  }
}


// ==========================================
// 10. UTILITIES & MODAL HELPERS
// ==========================================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("show");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove("show");
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerText = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}
