/**
 * GRAMMAR PLUS A2 - STANDALONE UNIT RUNNER
 * Super lightweight (<10KB), ultra fast, zero lag.
 * Handles exercises, audio playback (local + GDrive), instant scoring,
 * answer revision, and seamless localStorage & Google Sheets sync.
 */

// State Unit Runner
const UnitRunnerState = {
  unit: null,
  activeExIndex: 0,
  userAnswers: {},
  scores: [],
  currentUser: null,
  gasUrl: ""
};

// Google Drive Audio Map for A2 Listening
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

// Helper: Escape HTML
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Inisialisasi Unit Runner
function initUnitRunner(unitData, transcriptsData) {
  UnitRunnerState.unit = unitData;
  window.AUDIO_TRANSCRIPTS = transcriptsData || [];

  // Muat user dari localStorage
  loadUserData();

  // Muat scores dari localStorage
  try {
    const rawScores = localStorage.getItem("grammar_a2_scores");
    UnitRunnerState.scores = rawScores ? JSON.parse(rawScores) : [];
  } catch (e) {
    UnitRunnerState.scores = [];
  }

  // Muat GAS URL
  UnitRunnerState.gasUrl = localStorage.getItem("grammar_a2_gas_url") || "https://script.google.com/macros/s/AKfycbyGvEuuPCNKNwsFHt7qF976ahspzuAIGNKZ2-wSaSc3YjjWjhFAlNHsLx3VmEEpc-Cn/exec";

  // Periksa hash di URL (misal #ex=3)
  const hash = window.location.hash;
  if (hash && hash.startsWith("#ex=")) {
    const exNum = parseInt(hash.replace("#ex=", ""), 10);
    if (!isNaN(exNum) && exNum >= 1 && exNum <= UnitRunnerState.unit.exercises.length) {
      UnitRunnerState.activeExIndex = exNum - 1;
    }
  }

  // Render komponen utama
  renderUnitHeader();
  renderExerciseTabs();
  renderActiveExercise();
}

// Muat atau minta data siswa
function loadUserData() {
  try {
    const raw = localStorage.getItem("grammar_a2_user_v3") || localStorage.getItem("grammar_a2_user");
    if (raw) {
      UnitRunnerState.currentUser = JSON.parse(raw);
    }
  } catch (e) {
    UnitRunnerState.currentUser = null;
  }

  if (!UnitRunnerState.currentUser) {
    UnitRunnerState.currentUser = {
      username: "SISWA-" + Math.floor(1000 + Math.random() * 9000),
      nama: "Siswa A2",
      rombel: "Umum",
      role: "siswa"
    };
  }
}

// Perbarui nama siswa
function updateStudentIdentity() {
  const newName = prompt("Masukkan Nama Lengkap Anda:", UnitRunnerState.currentUser.nama || "");
  if (newName && newName.trim()) {
    const newClass = prompt("Masukkan Kelas / Rombel (misal: 8A):", UnitRunnerState.currentUser.rombel || "8A");
    UnitRunnerState.currentUser.nama = newName.trim();
    UnitRunnerState.currentUser.rombel = (newClass || "Umum").trim();
    UnitRunnerState.currentUser.username = (UnitRunnerState.currentUser.nama.replace(/\s+/g, "_").toLowerCase() + "_" + UnitRunnerState.currentUser.rombel).toUpperCase();
    
    try {
      localStorage.setItem("grammar_a2_user_v3", JSON.stringify(UnitRunnerState.currentUser));
    } catch (e) {}

    renderUnitHeader();
    showUnitToast("Profil siswa diperbarui! Nilai akan disimpan atas nama " + UnitRunnerState.currentUser.nama, "success");
  }
}

// Render Header Unit
function renderUnitHeader() {
  const userBadgeEl = document.getElementById("student-identity-badge");
  if (userBadgeEl && UnitRunnerState.currentUser) {
    userBadgeEl.innerHTML = `
      <button type="button" onclick="updateStudentIdentity()" class="btn-user-pill" title="Klik untuk mengubah nama/kelas">
        <span class="user-avatar-circle">👤</span>
        <span class="user-name-text"><strong>${escapeHtml(UnitRunnerState.currentUser.nama)}</strong> (${escapeHtml(UnitRunnerState.currentUser.rombel)})</span>
        <span class="edit-pen">✏️</span>
      </button>
    `;
  }
}

// Render Tabs Latihan
function renderExerciseTabs() {
  const container = document.getElementById("exercise-tabs-container");
  if (!container || !UnitRunnerState.unit) return;

  const exercises = UnitRunnerState.unit.exercises || [];
  const myUsername = UnitRunnerState.currentUser ? UnitRunnerState.currentUser.username.toUpperCase() : "";

  container.innerHTML = exercises.map((ex, idx) => {
    // Cek apakah lulus
    const isCompleted = UnitRunnerState.scores.some(s => 
      s.exerciseId === ex.id && 
      (!myUsername || (s.username && s.username.toUpperCase() === myUsername)) &&
      parseInt(s.persentase || s.score || 0, 10) >= 75
    );

    const activeClass = idx === UnitRunnerState.activeExIndex ? "active" : "";
    const checkmark = isCompleted ? "✓ " : "";
    const label = `${checkmark}Latihan ${idx + 1}`;

    return `
      <button type="button" class="tab-ex-btn ${activeClass}" id="tab-btn-${ex.id}" onclick="switchExerciseTab(${idx})">
        ${label}
      </button>
    `;
  }).join("");
}

// Ganti Tab Latihan
function switchExerciseTab(index) {
  if (index < 0 || index >= UnitRunnerState.unit.exercises.length) return;
  UnitRunnerState.activeExIndex = index;
  UnitRunnerState.userAnswers = {};
  
  // Update URL hash
  window.location.hash = `#ex=${index + 1}`;

  renderExerciseTabs();
  renderActiveExercise();
  
  // Scroll halus ke exercise card
  const exCard = document.getElementById("exercise-card");
  if (exCard) {
    exCard.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// Render Latihan yang Sedang Aktif
function renderActiveExercise() {
  const container = document.getElementById("exercise-content-area");
  if (!container || !UnitRunnerState.unit) return;

  const exercise = UnitRunnerState.unit.exercises[UnitRunnerState.activeExIndex];
  if (!exercise) return;

  // Audio HTML jika ada
  let audioHtml = "";
  if (exercise.audioTrack) {
    audioHtml = renderAudioPlayer(exercise.audioTrack);
  }

  // Pertanyaan
  let questionsHtml = "";
  if (exercise.type === "fill") {
    questionsHtml = exercise.questions.map((q, idx) => {
      // Fix visual relative path if needed
      let imgPath = q.image;
      if (imgPath && !imgPath.startsWith("http") && !imgPath.startsWith("../")) {
        imgPath = "../" + imgPath;
      }

      const inputA = `<input type="text" class="fill-input" id="input-q-${idx}" placeholder="Ketik jawaban..." autocomplete="off" oninput="onUnitRunnerInputChange(${idx})">`;
      const inputB = `<input type="text" class="fill-input" id="input-q-${idx}-b" placeholder="Lanjutan..." autocomplete="off" oninput="onUnitRunnerInputChange(${idx})">`;
      const inputC = `<input type="text" class="fill-input" id="input-q-${idx}-c" placeholder="Lanjutan..." autocomplete="off" oninput="onUnitRunnerInputChange(${idx})">`;
      
      const qText = q.q
        .replace("[BLANK]", inputA)
        .replace("[BLANK2]", inputB)
        .replace("[BLANK3]", inputC);

      return `
        <div class="question-item" id="q-box-${idx}">
          <div class="question-row">
            ${imgPath ? `
              <div class="question-thumb-box">
                <a href="${escapeHtml(imgPath)}" target="_blank" rel="noopener noreferrer" title="Klik perbesar gambar">
                  <img src="${escapeHtml(imgPath)}" alt="Ilustrasi Soal ${idx + 1}" class="question-thumb-img">
                </a>
              </div>
            ` : ''}
            <div class="question-body">
              <div class="question-text">${qText}</div>
              ${q.hint ? `<div class="question-hint">💡 <span>Petunjuk: ${escapeHtml(q.hint)}</span></div>` : ''}
              <div class="feedback-box" id="feedback-q-${idx}"></div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  } else if (exercise.type === "choice") {
    questionsHtml = exercise.questions.map((q, idx) => {
      let imgPath = q.image;
      if (imgPath && !imgPath.startsWith("http") && !imgPath.startsWith("../")) {
        imgPath = "../" + imgPath;
      }

      return `
        <div class="question-item" id="q-box-${idx}">
          <div class="question-row">
            ${imgPath ? `
              <div class="question-thumb-box">
                <a href="${escapeHtml(imgPath)}" target="_blank" rel="noopener noreferrer" title="Klik perbesar gambar">
                  <img src="${escapeHtml(imgPath)}" alt="Ilustrasi Soal ${idx + 1}" class="question-thumb-img">
                </a>
              </div>
            ` : ''}
            <div class="question-body">
              <div class="question-text">${(/^\s*\d+[\.\)]\s*/.test(q.q)) ? escapeHtml(q.q).replace(/&amp;rarr;/g, '&rarr;').replace('[BLANK]', '_______') : `${idx + 1}. ${escapeHtml(q.q).replace(/&amp;rarr;/g, '&rarr;').replace('[BLANK]', '_______')}`}</div>
              <div class="choice-options-grid" id="options-q-${idx}">
                ${q.options.map((opt, optIdx) => `
                  <button type="button" class="choice-btn" id="choice-btn-${idx}-${optIdx}" onclick="selectChoiceOption(${idx}, ${optIdx})">
                    <span class="choice-radio"></span>
                    <span class="choice-label">${escapeHtml(opt)}</span>
                  </button>
                `).join("")}
              </div>
              ${q.hint ? `<div class="question-hint">💡 <span>Petunjuk: ${escapeHtml(q.hint)}</span></div>` : ''}
              <div class="feedback-box" id="feedback-q-${idx}"></div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // Visual Guide Illustration Card
  let exImgHtml = "";
  if (exercise.image) {
    let exImgPath = exercise.image;
    if (exImgPath && !exImgPath.startsWith("http") && !exImgPath.startsWith("../")) {
      exImgPath = "../" + exImgPath;
    }
    exImgHtml = `
      <div class="exercise-illustration-card">
        <div class="exercise-illustration-header">
          <div class="exercise-illustration-title">
            <span class="illustration-icon">🎨</span>
            <span>Panduan Visual Materi &bull; Amati Gambar Sebelum Menjawab</span>
          </div>
          <button type="button" class="btn-zoom-preview" onclick="openExerciseLightbox('${escapeHtml(exImgPath)}', '${escapeHtml(exercise.title)}')">
            <span>🔍</span> Perbesar Gambar
          </button>
        </div>
        <div class="exercise-illustration-body">
          <img src="${escapeHtml(exImgPath)}" alt="${escapeHtml(exercise.title)}" class="exercise-main-img" onclick="openExerciseLightbox('${escapeHtml(exImgPath)}', '${escapeHtml(exercise.title)}')">
        </div>
        <div class="exercise-illustration-footer">
          <span>💡</span> Klik gambar untuk memperbesar resolusi penuh &bull; Amati nomor/panel gambar untuk menjawab soal di bawah
        </div>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="exercise-header">
      <div class="exercise-meta-top">
        <span class="badge badge-primary">Latihan ${UnitRunnerState.activeExIndex + 1} dari ${UnitRunnerState.unit.exercises.length}</span>
        <span class="badge ${exercise.type === 'choice' ? 'badge-success' : 'badge-warning'}">Tipe: ${exercise.type === 'choice' ? 'Pilihan Ganda' : 'Isian Singkat'}</span>
        ${exercise.audioTrack ? `<span class="badge badge-info">🎧 Listening (${exercise.audioTrack})</span>` : ''}
      </div>
      <h2 class="exercise-title">${escapeHtml(exercise.title)}</h2>
      <p class="exercise-instruction">${escapeHtml(exercise.instruction)}</p>
    </div>

    ${audioHtml}
    ${exImgHtml}

    <div class="questions-list">
      ${questionsHtml}
    </div>

    <div class="exercise-actions-bar">
      <button type="button" class="btn btn-primary btn-submit-action" id="btn-submit-exercise" onclick="submitCurrentExercise()">
        <span>✅</span> Kumpulkan Jawaban
      </button>
      <button type="button" class="btn btn-secondary" onclick="resetCurrentExercise()">
        <span>🔄</span> Reset Isian
      </button>
    </div>

    <div id="score-result-box" class="score-result-box" style="display: none;"></div>
  `;
}

// Render Audio Player
function renderAudioPlayer(trackStr) {
  if (!trackStr) return "";
  const m = String(trackStr).match(/(\d+)/);
  const num = m ? parseInt(m[1], 10) : 0;
  const fid = num ? A2_AUDIO_DRIVE_MAP[num] : "";
  const streamUrl = fid ? `https://docs.google.com/uc?export=download&id=${fid}` : "";
  const previewUrl = fid ? `https://drive.google.com/file/d/${fid}/preview` : "";
  const viewUrl = fid ? `https://drive.google.com/file/d/${fid}/view?usp=sharing` : "";
  const playerId = "audio-" + (num || "trk") + "-" + Math.random().toString(36).substring(2, 6);

  // Cari transcript
  const transcript = (window.AUDIO_TRANSCRIPTS || []).find(t => t.track && t.track.toLowerCase().includes(trackStr.toLowerCase()));

  return `
    <div class="audio-player-card">
      <div class="audio-player-header">
        <div class="audio-title">
          <span>🎧</span> <strong>Audio Listening: ${escapeHtml(trackStr)}</strong>
        </div>
        <div class="audio-extra-buttons">
          ${transcript ? `
            <button type="button" class="btn btn-sm btn-secondary" onclick="toggleTranscriptBox('${playerId}-tr')">
              📜 Naskah Teks
            </button>
          ` : ''}
          ${fid ? `
            <button type="button" class="btn btn-sm btn-secondary" onclick="toggleDrivePreview('${playerId}-iframe')">
              ▶️ GDrive Player
            </button>
            <a href="${viewUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary">
              ↗️ Buka Drive
            </a>
          ` : ''}
        </div>
      </div>

      <audio controls preload="none" class="main-audio-element" id="${playerId}">
        ${num ? `<source src="../audio/tr${num}.mp3" type="audio/mpeg">` : ''}
        ${num ? `<source src="../audio/${num}_a2.mp3" type="audio/mpeg">` : ''}
        ${streamUrl ? `<source src="${streamUrl}" type="audio/mpeg">` : ''}
        Browser tidak mendukung pemutar audio.
      </audio>

      ${fid ? `
        <div id="${playerId}-iframe" class="drive-iframe-wrapper" style="display: none;">
          <iframe src="${previewUrl}" width="100%" height="90" style="border: none; display: block;" allow="autoplay"></iframe>
        </div>
      ` : ''}

      ${transcript ? `
        <div id="${playerId}-tr" class="transcript-box" style="display: none;">
          <strong>Naskah Rekaman (${escapeHtml(transcript.track)}):</strong>
          <pre>${escapeHtml(transcript.content)}</pre>
        </div>
      ` : ''}
    </div>
  `;
}

// Toggle drive preview
function toggleDrivePreview(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = el.style.display === "none" ? "block" : "none";
}

// Toggle transcript box
function toggleTranscriptBox(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = el.style.display === "none" ? "block" : "none";
}

// Clear wrong feedback saat murid mengetik jawaban
function onUnitRunnerInputChange(qIdx) {
  const fb = document.getElementById(`feedback-q-${qIdx}`);
  if (fb) {
    fb.innerHTML = "";
    fb.className = "feedback-box";
  }
  const qBox = document.getElementById(`q-box-${qIdx}`);
  if (qBox) {
    qBox.classList.remove("question-wrong-highlight");
  }
}

// Pilih opsi pilihan ganda
function selectChoiceOption(qIdx, optIdx) {
  const exercise = UnitRunnerState.unit.exercises[UnitRunnerState.activeExIndex];
  if (!exercise || !exercise.questions[qIdx]) return;

  const q = exercise.questions[qIdx];
  const selectedText = q.options[optIdx];
  UnitRunnerState.userAnswers[qIdx] = selectedText;

  // Update visual tombol opsi
  const optsContainer = document.getElementById(`options-q-${qIdx}`);
  if (optsContainer) {
    const buttons = optsContainer.querySelectorAll(".choice-btn");
    buttons.forEach((btn, idx) => {
      if (idx === optIdx) {
        btn.classList.add("selected");
      } else {
        btn.classList.remove("selected");
      }
    });
  }

  // Bersihkan feedback salah sebelumnya
  onUnitRunnerInputChange(qIdx);
}

// Normalisasi jawaban untuk akurasi tinggi
function normalizeAnswerString(str) {
  if (str === null || str === undefined) return "";
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
}

function isAnswerCorrect(user, expected) {
  if (!user || !expected) return false;
  const u = normalizeAnswerString(user);
  const e = normalizeAnswerString(expected);

  if (u === e) return true;

  // Alphanumeric clean match (ignores differences in separators like " / " vs ", " or punctuation)
  const uClean = u.replace(/[^a-z0-9]/g, "");
  const eClean = e.replace(/[^a-z0-9]/g, "");
  if (uClean.length > 0 && uClean === eClean) return true;

  // Handle slash options misal "she's / she is"
  if (expected.includes("/")) {
    const parts = expected.split("/").map(p => normalizeAnswerString(p));
    if (parts.includes(u)) return true;
    for (const part of parts) {
      const pClean = part.replace(/[^a-z0-9]/g, "");
      if (pClean.length > 0 && pClean === uClean) return true;
    }
  }

  // Handle tanda kurung opsional misal "can (not)"
  if (expected.includes("(") && expected.includes(")")) {
    const withoutParens = normalizeAnswerString(expected.replace(/\(.*?\)/g, "").replace(/\s+/g, " "));
    const fullWithParens = normalizeAnswerString(expected.replace(/[()]/g, ""));
    if (u === withoutParens || u === fullWithParens) return true;
    const wClean = withoutParens.replace(/[^a-z0-9]/g, "");
    const fClean = fullWithParens.replace(/[^a-z0-9]/g, "");
    if (uClean.length > 0 && (uClean === wClean || uClean === fClean)) return true;
  }

  return false;
}

// Kumpulkan dan periksa jawaban
function submitCurrentExercise() {
  const exercise = UnitRunnerState.unit.exercises[UnitRunnerState.activeExIndex];
  if (!exercise) return;

  let correctCount = 0;
  const total = exercise.questions.length;
  const details = [];
  let firstWrongIdx = -1;

  exercise.questions.forEach((q, idx) => {
    let userAns = "";

    if (exercise.type === "fill") {
      const inputA = document.getElementById(`input-q-${idx}`);
      const inputB = document.getElementById(`input-q-${idx}-b`);
      const inputC = document.getElementById(`input-q-${idx}-c`);

      if (inputA) userAns = inputA.value.trim();
      if (inputB && inputB.value.trim()) userAns += " / " + inputB.value.trim();
      if (inputC && inputC.value.trim()) userAns += " / " + inputC.value.trim();
    } else {
      userAns = UnitRunnerState.userAnswers[idx] || "";
    }

    const expected = (q.answer !== undefined ? q.answer : (q.a || "")).trim();
    const alternates = Array.isArray(q.alternateAnswers) ? q.alternateAnswers : 
                       (Array.isArray(q.acceptableAnswers) ? q.acceptableAnswers : []);

    // Periksa kebenaran
    let isCorrect = isAnswerCorrect(userAns, expected);
    if (!isCorrect && alternates.length > 0) {
      isCorrect = alternates.some(ans => isAnswerCorrect(userAns, ans));
    }

    const fbBox = document.getElementById(`feedback-q-${idx}`);
    const qBox = document.getElementById(`q-box-${idx}`);

    if (isCorrect) {
      correctCount++;
      if (fbBox) {
        fbBox.className = "feedback-box feedback-correct";
        fbBox.innerHTML = `<span>✓</span> <strong>Benar!</strong> Jawaban Anda tepat.${q.explanation ? ` <span style="font-weight: normal; color: #166534; font-size: 0.85rem;">&bull; ${escapeHtml(q.explanation)}</span>` : ''}`;
      }
      if (qBox) qBox.classList.remove("question-wrong-highlight");
    } else {
      if (firstWrongIdx === -1) firstWrongIdx = idx;
      if (fbBox) {
        fbBox.className = "feedback-box feedback-wrong";
        fbBox.innerHTML = `<span>✗</span> <strong>Belum Tepat.</strong> Jawaban Anda: <em>"${escapeHtml(userAns || "(kosong)")}"</em> &bull; Kunci: <strong>"${escapeHtml(expected)}"</strong>${q.explanation ? `<div style="font-size: 0.825rem; color: #991B1B; margin-top: 0.35rem; font-weight: normal;">Penjelasan: ${escapeHtml(q.explanation)}</div>` : ''}`;
      }
      if (qBox) qBox.classList.add("question-wrong-highlight");
    }

    details.push({
      soal: q.q,
      jawabanSiswa: userAns,
      kunci: expected,
      benar: isCorrect
    });
  });

  const percentage = Math.round((correctCount / total) * 100);
  const isPassed = percentage >= 75;

  // Render Score Result Box
  const resultBox = document.getElementById("score-result-box");
  if (resultBox) {
    resultBox.style.display = "block";
    resultBox.className = `score-result-box ${isPassed ? 'result-passed' : 'result-failed'}`;
    resultBox.innerHTML = `
      <div class="result-score-number">${percentage}%</div>
      <div class="result-score-title">${isPassed ? '🎉 Hebat! Anda LULUS Latihan Ini' : '⚠️ Nilai Belum Mencapai KKM (75%)'}</div>
      <div class="result-score-sub">Benar ${correctCount} dari ${total} soal &bull; Status: <strong>${isPassed ? 'LULUS' : 'REMIDI'}</strong> ${isPassed ? '&bull; 🏆 +50 XP Diperoleh!' : ''}</div>
      
      <div class="result-actions-flex">
        ${!isPassed && firstWrongIdx !== -1 ? `
          <button type="button" class="btn btn-warning" onclick="focusWrongQuestion(${firstWrongIdx})">
            <span>✏️</span> Perbaiki Jawaban yang Salah
          </button>
        ` : ''}
        <button type="button" class="btn btn-secondary" onclick="resetCurrentExercise()">
          <span>🔄</span> Ulangi Latihan
        </button>
        ${isPassed && UnitRunnerState.activeExIndex < UnitRunnerState.unit.exercises.length - 1 ? `
          <button type="button" class="btn btn-primary" onclick="switchExerciseTab(${UnitRunnerState.activeExIndex + 1})">
            <span>➡️</span> Lanjut ke Latihan Berikutnya
          </button>
        ` : ''}
      </div>
    `;

    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  // Simpan / Perbarui nilai ke localStorage
  saveExerciseScore(percentage, isPassed, correctCount, total, details);
}

// Fokus ke soal yang masih salah untuk diperbaiki
function focusWrongQuestion(idx) {
  const qBox = document.getElementById(`q-box-${idx}`);
  if (qBox) {
    qBox.scrollIntoView({ behavior: "smooth", block: "center" });
    const input = qBox.querySelector("input.fill-input");
    if (input) {
      input.focus();
      input.select();
    }
  }
}

// Simpan atau perbarui score ke localStorage
function saveExerciseScore(percentage, isPassed, correctCount, total, details) {
  const exercise = UnitRunnerState.unit.exercises[UnitRunnerState.activeExIndex];
  if (!exercise || !UnitRunnerState.currentUser) return;

  const scoreRecord = {
    id: "sc_" + Date.now(),
    timestamp: new Date().toISOString(),
    username: UnitRunnerState.currentUser.username,
    nama: UnitRunnerState.currentUser.nama,
    rombel: UnitRunnerState.currentUser.rombel,
    unitId: UnitRunnerState.unit.id,
    unitTitle: UnitRunnerState.unit.title,
    exerciseId: exercise.id,
    exerciseTitle: exercise.title,
    score: percentage,
    benar: correctCount,
    totalSoal: total,
    persentase: `${percentage}%`,
    status: isPassed ? "LULUS" : "REMIDI",
    detailJawaban: details,
    synced: false
  };

  // Muat skor terbaru dari storage
  let allScores = [];
  try {
    const raw = localStorage.getItem("grammar_a2_scores");
    allScores = raw ? JSON.parse(raw) : [];
  } catch (e) {
    allScores = [];
  }

  // Cek apakah sudah ada rekor sebelumnya untuk murid dan latihan ini
  const myUser = UnitRunnerState.currentUser.username.toUpperCase();
  const existingIdx = allScores.findIndex(s => 
    s.username && s.username.toUpperCase() === myUser && s.exerciseId === exercise.id
  );

  if (existingIdx !== -1) {
    allScores[existingIdx] = scoreRecord;
  } else {
    allScores.unshift(scoreRecord);
  }

  UnitRunnerState.scores = allScores;

  try {
    localStorage.setItem("grammar_a2_scores", JSON.stringify(allScores));
    
    // Perbarui progress v3
    if (isPassed) {
      const rawProg = localStorage.getItem("grammar_a2_progress_v3");
      const prog = rawProg ? JSON.parse(rawProg) : {};
      prog[exercise.id] = true;
      localStorage.setItem("grammar_a2_progress_v3", JSON.stringify(prog));
    }
  } catch (e) {
    console.error("Gagal simpan skor ke localStorage:", e);
  }

  // Perbarui tab button
  renderExerciseTabs();

  // Sinkronkan ke GAS jika ada
  syncScoreToGAS(scoreRecord);

  showUnitToast(`Nilai berhasil disimpan: ${percentage}%! 🏆`, "success");
}

// Kirim nilai ke Google Apps Script Spreadsheet
function syncScoreToGAS(record) {
  if (!UnitRunnerState.gasUrl) return;
  try {
    fetch(UnitRunnerState.gasUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "saveScore", score: record })
    }).catch(err => console.log("GAS Sync background:", err));
  } catch (e) {}
}

// Reset latihan
function resetCurrentExercise() {
  UnitRunnerState.userAnswers = {};
  renderActiveExercise();
  const rb = document.getElementById("score-result-box");
  if (rb) rb.style.display = "none";
  showUnitToast("Isian latihan telah direset. Silakan coba kembali!", "info");
}

// Toast Notification
function showUnitToast(message, type = "info") {
  let toastContainer = document.getElementById("unit-toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "unit-toast-container";
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span>${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
      <span>${escapeHtml(message)}</span>
    </div>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Lightbox Modal for High-Resolution Guide Images
function openExerciseLightbox(src, title) {
  let modal = document.getElementById("exercise-image-lightbox");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "exercise-image-lightbox";
    modal.className = "image-lightbox-modal";
    modal.innerHTML = `
      <div class="image-lightbox-dialog" onclick="event.stopPropagation()">
        <button type="button" class="image-lightbox-close" onclick="closeExerciseLightbox()" title="Tutup (Esc)">&times;</button>
        <img src="" alt="Preview" class="image-lightbox-img" id="lightbox-modal-img">
        <div class="image-lightbox-bar">
          <span id="lightbox-modal-title">Panduan Visual</span>
          <span style="font-size: 0.75rem; opacity: 0.85;">💡 Klik latar belakang atau tekan Esc untuk menutup</span>
        </div>
      </div>
    `;
    modal.addEventListener("click", closeExerciseLightbox);
    document.body.appendChild(modal);
  }
  const imgEl = document.getElementById("lightbox-modal-img");
  const titleEl = document.getElementById("lightbox-modal-title");
  if (imgEl) imgEl.src = src;
  if (titleEl) titleEl.textContent = title || "Panduan Visual";

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeExerciseLightbox() {
  const modal = document.getElementById("exercise-image-lightbox");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeExerciseLightbox();
  }
});

