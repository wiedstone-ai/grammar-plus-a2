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
  defaultScriptUrl: "https://script.google.com/macros/s/AKfycbx0q6Vq4g0zR7z0v4t0u_grammar_placeholder/exec"
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
  AppState.gasUrl = localStorage.getItem("grammar_a2_gas_url") || (
    APP_CONFIG.defaultScriptUrl && !APP_CONFIG.defaultScriptUrl.includes("placeholder")
      ? APP_CONFIG.defaultScriptUrl
      : ""
  );
  
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
        status: "Aktif"
      }
    ];
    saveStudentsToStorage();
  }

  const savedScores = localStorage.getItem("grammar_a2_scores");
  if (savedScores) {
    try { AppState.scores = JSON.parse(savedScores); } catch (e) { AppState.scores = []; }
  }

  // Jika URL Google Apps Script tersedia, sinkronkan data siswa terbaru
  if (AppState.gasUrl) {
    fetchStudentsFromGAS();
    fetchScoresFromGAS();
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
    status: "Aktif"
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
  if (sStr.includes("-")) {
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

    // Periksa password dengan verifikasi tanggal lahir fleksibel
    return isDatePasswordMatching(password, s.password) || isDatePasswordMatching(password, s.tanggalLahir);
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

function renderSingleExercise(exercise, unit) {
  const container = document.getElementById("active-exercise-container");
  if (!container) return;

  AppState.selectedExercise = exercise;
  AppState.selectedUnit = unit;

  let audioHtml = "";
  if (exercise.audioTrack) {
    const transcript = (window.AUDIO_TRANSCRIPTS || []).find(t => t.track.toLowerCase().includes(exercise.audioTrack.toLowerCase()));
    const safeTrackId = exercise.audioTrack.replace(/[^a-zA-Z0-9]/g, "");
    audioHtml = `
      <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 8px; padding: 0.85rem 1rem; margin-bottom: 1.25rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="font-size: 1.25rem;">🎧</span>
          <span style="font-weight: 700; color: #1E3A8A; font-size: 0.9rem;">Latihan Listening: ${exercise.audioTrack}</span>
        </div>
        ${transcript ? `
          <button type="button" class="btn btn-secondary btn-sm" onclick="toggleAudioTranscript('${safeTrackId}')">
            📜 Lihat / Sembunyikan Naskah Audio
          </button>
        ` : ''}
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
      <div style="margin-top: 1rem;">
        <span class="badge ${isPassed ? 'badge-success' : 'badge-danger'}" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
          Status: ${isPassed ? 'TUNTAS / LULUS' : 'REMIDI / PERLU PERBAIKAN'}
        </span>
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
  const scoreRecord = {
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
    detailJawaban: details
  };

  AppState.scores.unshift(scoreRecord);
  saveScoresToStorage();

  // Sinkronkan ke Google Sheet
  syncScoreToGAS(scoreRecord);
  showToast(`Nilai tersimpan: ${percentage}% (${correctCount}/${total})`, "success");
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
  const myScores = AppState.scores.filter(s => s.username === user.username);
  const totalLatihan = myScores.length;
  const avgPercentage = totalLatihan > 0
    ? Math.round(myScores.reduce((acc, cur) => acc + parseInt(cur.persentase, 10), 0) / totalLatihan)
    : 0;
  const totalLulus = myScores.filter(s => s.status === "LULUS").length;

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
                  <td><strong>${sc.persentase}</strong></td>
                  <td>
                    <span class="badge ${sc.status === 'LULUS' ? 'badge-success' : 'badge-danger'}">
                      ${sc.status}
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
                <td><strong>${sc.persentase}</strong></td>
                <td><span class="badge ${sc.status === 'LULUS' ? 'badge-success' : 'badge-danger'}">${sc.status}</span></td>
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
    "Persentase": sc.persentase,
    "Status Kelulusan": sc.status
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

  container.innerHTML = window.AUDIO_TRANSCRIPTS.map(tr => `
    <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 1.15rem; margin-bottom: 1rem;">
      <h5 style="color: #2563EB; font-weight: 700; margin-bottom: 0.5rem;">${tr.track}</h5>
      <pre style="white-space: pre-wrap; font-family: inherit; font-size: 0.85rem; color: #334155; line-height: 1.6;">${tr.content}</pre>
    </div>
  `).join("");
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

  fetch(`${AppState.gasUrl}?action=ping`, { method: "GET" })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        if (statusElem) statusElem.innerText = "Google Sheet Terhubung";
        if (dot) dot.className = "dot-indicator online";
        showToast("Koneksi Google Spreadsheet Aktif!", "success");
      } else {
        throw new Error(data.message);
      }
    })
    .catch(err => {
      if (statusElem) statusElem.innerText = "Koneksi Offline / Lokal";
      if (dot) dot.className = "dot-indicator";
    });
}

async function fetchStudentsFromGAS() {
  if (!AppState.gasUrl) return;
  try {
    const res = await fetch(`${AppState.gasUrl}?action=getStudents`);
    const data = await res.json();
    if (data && data.status === "success" && Array.isArray(data.students)) {
      let updated = false;
      data.students.forEach(remoteStudent => {
        const idx = AppState.students.findIndex(s => (s.username || "").toUpperCase() === (remoteStudent.username || "").toUpperCase());
        if (idx >= 0) {
          AppState.students[idx] = Object.assign({}, AppState.students[idx], remoteStudent);
        } else {
          AppState.students.push(remoteStudent);
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
    const res = await fetch(`${AppState.gasUrl}?action=getScores`);
    const data = await res.json();
    if (data && data.status === "success" && Array.isArray(data.scores)) {
      AppState.scores = data.scores;
      saveScoresToStorage();
    }
  } catch (err) {
    console.log("Could not fetch remote scores from GAS:", err);
  }
}

function syncStudentToGAS(student) {
  if (!AppState.gasUrl) return;

  fetch(AppState.gasUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      action: "register",
      tingkat: student.tingkat,
      fase: student.fase,
      rombel: student.rombel,
      presensi: student.presensi,
      nama: student.nama,
      tanggalLahir: student.tanggalLahir
    })
  }).catch(e => console.log("Background sync error student:", e));
}

function syncScoreToGAS(score) {
  if (!AppState.gasUrl) return;

  fetch(AppState.gasUrl, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
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
      detailJawaban: score.detailJawaban
    })
  }).catch(e => console.log("Background sync error score:", e));
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
