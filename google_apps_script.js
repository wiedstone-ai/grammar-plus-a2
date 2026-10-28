/**
 * GOOGLE APPS SCRIPT - GRAMMAR PLUS A2 DATABASE BACKEND
 * ID Spreadsheet: 1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg
 * 
 * CARA MEMASANG (HANYA 1 MENIT):
 * 1. Buka spreadsheet: https://docs.google.com/spreadsheets/d/1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg
 * 2. Klik menu 'Extensions' (Ekstensi) -> 'Apps Script'.
 * 3. Hapus semua kode default di editor, lalu paste seluruh isi file ini.
 * 4. Klik ikon Save (Disket).
 * 5. Klik tombol biru 'Deploy' (Terapkan) -> 'Manage deployments' (Kelola penerapan).
 *    Klik ikon Pensil -> Version: 'New version' -> Deploy.
 *    (Atau jika penerapan pertama: Deploy -> New deployment -> Web app -> Execute as: Me -> Who has access: Anyone -> Deploy).
 * 6. Salin Web App URL yang berakhiran '/exec'.
 * 7. Tempelkan URL tersebut ke website Anda pada menu 'Pengaturan Database' (atau biarkan default). Selesai!
 */

const SPREADSHEET_ID = "1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg";

function getSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID !== "") {
    try {
      return SpreadsheetApp.openById(SPREADSHEET_ID);
    } catch (e) {
      console.warn("openById gagal, mencoba getActiveSpreadsheet:", e);
    }
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Handle GET Requests (ping, getStudents, getScores, register, submitScore)
 * Mendukung query parameters langsung agar tidak pernah terhambat masalah CORS browser.
 */
function doGet(e) {
  const p = (e && e.parameter) ? e.parameter : {};
  const action = p.action || "ping";
  const callback = p.callback || "";
  return handleAction(action, p, callback);
}

/**
 * Handle POST Requests
 */
function doPost(e) {
  let body = {};
  try {
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }
  } catch (ex) {
    body = (e && e.parameter) ? e.parameter : {};
  }
  if (!body || Object.keys(body).length === 0) {
    body = (e && e.parameter) ? e.parameter : {};
  }

  const action = body.action || (e && e.parameter && e.parameter.action) || "";
  const callback = (e && e.parameter && e.parameter.callback) || "";
  return handleAction(action, body, callback);
}

/**
 * Pusat Handler Aksi Database
 */
function handleAction(action, body, callback) {
  try {
    const ss = getSpreadsheet();
    if (!ss) {
      return jsonResponse({ status: "error", message: "Spreadsheet tidak dapat diakses" }, callback);
    }

    // 0. PING CEK KONEKSI
    if (action === "ping") {
      return jsonResponse({
        status: "success",
        message: "Google Apps Script Grammar Plus A2 Aktif!",
        time: new Date().toISOString()
      }, callback);
    }

    // 1. GET STUDENTS
    if (action === "getStudents") {
      const ws = ss.getSheetByName("Siswa");
      if (!ws) return jsonResponse({ status: "error", message: "Sheet Siswa tidak ditemukan" }, callback);
      const data = ws.getDataRange().getValues();
      if (data.length <= 1) return jsonResponse({ status: "success", students: [] }, callback);

      const students = [];
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row[1]) {
          students.push({
            timestamp: row[0],
            username: String(row[1]).trim(),
            password: String(row[2]).trim(),
            nama: String(row[3]).trim(),
            tingkat: String(row[4]).trim(),
            fase: String(row[5]).trim(),
            rombel: String(row[6]).trim(),
            presensi: String(row[7]).trim(),
            tanggalLahir: String(row[8]).trim(),
            role: row[9] || "Siswa",
            status: row[10] || "Aktif"
          });
        }
      }
      return jsonResponse({ status: "success", students: students }, callback);
    }

    // 2. GET SCORES
    // 2. GET SCORES (Mengambil nilai mutakhir per murid & latihan)
    if (action === "getScores") {
      const ws = ss.getSheetByName("Nilai");
      if (!ws) return jsonResponse({ status: "error", message: "Sheet Nilai tidak ditemukan" }, callback);
      const data = ws.getDataRange().getValues();
      const filterUsername = String(body.username || "").toUpperCase().trim();
      const scoresMap = {};

      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (!row[1]) continue;
        const u = String(row[1]).toUpperCase().trim();
        const exId = String(row[9] || "").trim();
        if (!filterUsername || u === filterUsername) {
          const key = u + "___" + exId;
          const skorNum = Number(row[10]) || 0;
          const totalNum = Number(row[11]) || 0;
          let pctStr = "0%";

          // 1. Prioritaskan kalkulasi persentase dari skor & totalSoal
          if (totalNum > 0) {
            pctStr = Math.round((skorNum / totalNum) * 100) + "%";
          } else {
            // 2. Normalisasi format persentase jika sel berupa angka desimal Sheets (0 - 1)
            const rawPct = row[12];
            if (typeof rawPct === "number") {
              pctStr = (rawPct > 0 && rawPct <= 1 ? Math.round(rawPct * 100) : Math.round(rawPct)) + "%";
            } else if (rawPct !== undefined && rawPct !== null && rawPct !== "") {
              const num = parseFloat(String(rawPct).replace("%", "").trim());
              if (!isNaN(num)) {
                pctStr = (!String(rawPct).includes("%") && num > 0 && num <= 1 ? Math.round(num * 100) : Math.round(num)) + "%";
              }
            }
          }

          const rawStatus = String(row[13] || "").trim().toUpperCase();
          const isPassed = rawStatus === "LULUS" || parseInt(pctStr, 10) >= 75;

          const existing = scoresMap[key];
          // Simpan nilai atau pertahankan nilai terbaik jika ada pengulangan
          if (!existing || skorNum >= (Number(existing.skor) || 0)) {
            scoresMap[key] = {
              timestamp: row[0],
              username: row[1],
              nama: row[2],
              tingkat: row[3],
              fase: row[4],
              rombel: row[5],
              presensi: row[6],
              unitId: row[7],
              unitName: row[8],
              exerciseId: exId,
              skor: skorNum,
              totalSoal: totalNum,
              persentase: pctStr,
              status: isPassed ? "LULUS" : "REMIDI",
              detailJawaban: row[14]
            };
          }
        }
      }
      return jsonResponse({ status: "success", scores: Object.values(scoresMap) }, callback);
    }

    // 3. REGISTRASI / TAMBAH SISWA
    if (action === "register" || action === "addStudent") {
      const ws = ss.getSheetByName("Siswa") || ss.insertSheet("Siswa");
      const rows = ws.getDataRange().getValues();

      // Ambil input
      const tingkat = String(body.tingkat || "").trim().toUpperCase();
      const fase = String(body.fase || "").trim().toUpperCase();
      const rombel = String(body.rombel || "").trim();
      const presensi = String(body.presensi || "").trim();
      const nama = String(body.nama || "").trim().toUpperCase();
      const tanggalLahir = String(body.tanggalLahir || "").trim();

      if (!nama || !tingkat || !fase || !rombel || !presensi || !tanggalLahir) {
        return jsonResponse({ status: "error", message: "Semua kolom pendaftaran wajib diisi!" }, callback);
      }

      // Gunakan username dari frontend jika ada
      let finalUsername = String(body.username || "").trim().toUpperCase();

      if (!finalUsername) {
        // Fallback jika tidak dikirim dari frontend
        let mm = "", dd = "", yyyy = "";
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
          dd = tanggalLahir.slice(0, 2);
          mm = tanggalLahir.slice(2, 4);
          yyyy = tanggalLahir.slice(4);
        }
        const ddmmyyyy = (dd + mm + yyyy).replace(/[^0-9]/g, "");
        const cleanName = nama.replace(/[^A-Z]/g, "");
        const prefix3 = (cleanName.length >= 3 ? cleanName.substring(0, 3) : cleanName.padEnd(3, "X")).toUpperCase();
        finalUsername = prefix3 + ddmmyyyy;
      }

      // Cek apakah siswa sudah terdaftar sebelumnya (update baris alih-alih duplikat)
      let existingRowIndex = -1;
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][1] && String(rows[i][1]).toUpperCase().trim() === finalUsername) {
          existingRowIndex = i + 1; // 1-indexed untuk SpreadsheetApp
          break;
        }
      }

      const password = tanggalLahir;
      const nowStr = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");

      if (existingRowIndex > 0) {
        // Update baris siswa yang sudah ada
        ws.getRange(existingRowIndex, 1, 1, 11).setValues([[
          nowStr,
          finalUsername,
          password,
          nama,
          tingkat,
          fase,
          rombel,
          presensi,
          tanggalLahir,
          "Siswa",
          "Aktif"
        ]]);
      } else {
        // Tambahkan baris baru
        ws.appendRow([
          nowStr,
          finalUsername,
          password,
          nama,
          tingkat,
          fase,
          rombel,
          presensi,
          tanggalLahir,
          "Siswa",
          "Aktif"
        ]);
      }

      return jsonResponse({
        status: "success",
        message: "Pendaftaran berhasil dicatat di Google Spreadsheet!",
        username: finalUsername,
        student: {
          username: finalUsername,
          nama: nama,
          tingkat: tingkat,
          fase: fase,
          rombel: rombel,
          presensi: presensi,
          tanggalLahir: tanggalLahir,
          role: "Siswa"
        }
      }, callback);
    }

    // 4. LOGIN
    if (action === "login") {
      const usernameInput = String(body.username || "").trim().toUpperCase();
      const passwordInput = String(body.password || "").trim();

      if (!usernameInput || !passwordInput) {
        return jsonResponse({ status: "error", message: "Username dan Password (Tanggal Lahir) wajib diisi!" }, callback);
      }

      // Cek akun Guru Khusus
      if (usernameInput === "GURU" && (passwordInput === "GURU123" || passwordInput === "guru123")) {
        return jsonResponse({
          status: "success",
          role: "Guru",
          student: {
            username: "GURU",
            nama: "GURU BAHASA INGGRIS",
            role: "Guru"
          }
        }, callback);
      }

      const ws = ss.getSheetByName("Siswa");
      if (!ws) return jsonResponse({ status: "error", message: "Database Siswa belum siap." }, callback);
      const rows = ws.getDataRange().getValues();

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const u = String(row[1] || "").trim().toUpperCase();
        const p = String(row[2] || "").trim();
        const tgl = String(row[8] || "").trim();

        if (u === usernameInput) {
          if (isDatePasswordMatching(passwordInput, p) || isDatePasswordMatching(passwordInput, tgl)) {
            return jsonResponse({
              status: "success",
              role: row[9] || "Siswa",
              student: {
                username: row[1],
                nama: row[3],
                tingkat: row[4],
                fase: row[5],
                rombel: row[6],
                presensi: row[7],
                tanggalLahir: row[8],
                role: row[9] || "Siswa"
              }
            }, callback);
          }
        }
      }

      return jsonResponse({ status: "error", message: "Username atau Tanggal Lahir (Password) tidak sesuai!" }, callback);
    }

    // 5. SUBMIT SKOR
    // 5. SUBMIT SKOR (UPDATE JIKA SUDAH PERNAH MENGERJAKAN / REMIDI)
    if (action === "submitScore") {
      const ws = ss.getSheetByName("Nilai") || ss.insertSheet("Nilai");
      const nowStr = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");

      const username = String(body.username || "-").trim();
      const nama = String(body.nama || "-").trim();
      const tingkat = String(body.tingkat || "-").trim();
      const fase = String(body.fase || "-").trim();
      const rombel = String(body.rombel || "-").trim();
      const presensi = String(body.presensi || "-").trim();
      const unitId = String(body.unitId || "-").trim();
      const unitName = String(body.unitName || "-").trim();
      const exerciseId = String(body.exerciseId || "-").trim();
      const skor = body.skor !== undefined ? Number(body.skor) : 0;
      const totalSoal = body.totalSoal !== undefined ? Number(body.totalSoal) : 0;
      let persentase = String(body.persentase || "").trim();
      if (totalSoal > 0) {
        persentase = Math.round((skor / totalSoal) * 100) + "%";
      } else if (!persentase.endsWith("%")) {
        const num = parseFloat(persentase);
        persentase = (!isNaN(num) ? (num > 0 && num <= 1 ? Math.round(num * 100) : Math.round(num)) : 0) + "%";
      }
      const rawStatus = String(body.status || "").trim().toUpperCase();
      const status = (rawStatus === "LULUS" || parseInt(persentase, 10) >= 75) ? "LULUS" : "REMIDI";

      let detailStr = body.detailJawaban;
      if (typeof detailStr === "object") {
        try { detailStr = JSON.stringify(detailStr); } catch (e) { detailStr = "{}"; }
      }

      // Cari apakah baris murid untuk latihan ini sudah ada
      const data = ws.getDataRange().getValues();
      let existingRow = -1;
      for (let i = 1; i < data.length; i++) {
        const rowUser = String(data[i][1] || "").trim().toUpperCase();
        const rowEx = String(data[i][9] || "").trim();
        if (rowUser === username.toUpperCase() && rowEx === exerciseId) {
          existingRow = i + 1; // 1-indexed untuk Spreadsheet
          break;
        }
      }

      if (existingRow > 0) {
        // Perbarui baris yang ada (perbaikan nilai tanpa duplikasi)
        ws.getRange(existingRow, 1, 1, 15).setValues([[
          nowStr, username, nama, tingkat, fase, rombel, presensi,
          unitId, unitName, exerciseId, skor, totalSoal, persentase, status, String(detailStr || "{}")
        ]]);
      } else {
        // Tambahkan baris baru jika pertama kali mengerjakan
        ws.appendRow([
          nowStr, username, nama, tingkat, fase, rombel, presensi,
          unitId, unitName, exerciseId, skor, totalSoal, persentase, status, String(detailStr || "{}")
        ]);
      }

      return jsonResponse({
        status: "success",
        message: existingRow > 0 ? "Nilai berhasil diperbarui di Google Sheet!" : "Skor berhasil disimpan di Google Sheet!"
      }, callback);
    }

    return jsonResponse({ status: "error", message: "Action tidak dikenal: " + action }, callback);
  } catch (err) {
    return jsonResponse({ status: "error", message: err.toString() }, callback);
  }
}

/**
 * Respon JSON / JSONP
 */
function jsonResponse(data, callback) {
  const jsonStr = JSON.stringify(data);
  if (callback && String(callback).trim().length > 0) {
    return ContentService.createTextOutput(String(callback).trim() + "(" + jsonStr + ")")
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(jsonStr)
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Validasi password tanggal lahir fleksibel (mendukung DDMMYYYY, YYYY-MM-DD, dsb.)
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
  return cleanPass.length > 0 && cleanPass === cleanSaved;
}
