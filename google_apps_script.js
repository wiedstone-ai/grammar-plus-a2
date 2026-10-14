/**
 * GOOGLE APPS SCRIPT - GRAMMAR PLUS A2 DATABASE BACKEND
 * ID Spreadsheet: 1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg
 * 
 * CARA MEMASANG (HANYA 1 MENIT):
 * 1. Buka spreadsheet: https://docs.google.com/spreadsheets/d/1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg
 * 2. Klik menu 'Extensions' (Ekstensi) -> 'Apps Script'.
 * 3. Hapus semua kode default di editor, lalu paste seluruh isi file ini.
 * 4. Klik ikon Save (Disket).
 * 5. Klik tombol biru 'Deploy' (Terapkan) -> 'New deployment' (Penerapan baru).
 * 6. Pada roda gigi 'Select type', pilih 'Web app' (Aplikasi web).
 * 7. Isi:
 *    - Description: Grammar Plus A2 Web API
 *    - Execute as: Me (email Anda)
 *    - Who has access: Anyone (Siapa saja, bahkan anonim - agar murid dari GitHub Pages bisa kirim nilai)
 * 8. Klik 'Deploy'. Salin Web App URL yang berakhiran '/exec'.
 * 9. Tempelkan URL tersebut ke website Anda pada menu 'Pengaturan Database'. Selesai!
 */

const SPREADSHEET_ID = "1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg";

function getSpreadsheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID !== "") {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function doGet(e) {
  const p = e.parameter || {};
  const action = p.action || "ping";
  
  try {
    const ss = getSpreadsheet();
    
    if (action === "ping") {
      return jsonResponse({ status: "success", message: "Google Apps Script Grammar Plus A2 Aktif!", time: new Date() });
    }
    
    if (action === "getStudents") {
      const ws = ss.getSheetByName("Siswa");
      if (!ws) return jsonResponse({ status: "error", message: "Sheet Siswa tidak ditemukan" });
      const data = ws.getDataRange().getValues();
      if (data.length <= 1) return jsonResponse({ status: "success", students: [] });
      
      const headers = data[0];
      const students = [];
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row[1]) { // Ada username
          students.push({
            timestamp: row[0],
            username: row[1],
            nama: row[3],
            tingkat: row[4],
            fase: row[5],
            rombel: row[6],
            presensi: row[7],
            tanggalLahir: row[8],
            role: row[9] || "Siswa",
            status: row[10] || "Aktif"
          });
        }
      }
      return jsonResponse({ status: "success", students: students });
    }
    
    if (action === "getScores") {
      const ws = ss.getSheetByName("Nilai");
      if (!ws) return jsonResponse({ status: "error", message: "Sheet Nilai tidak ditemukan" });
      const data = ws.getDataRange().getValues();
      const scores = [];
      const filterUsername = (p.username || "").toUpperCase().trim();
      
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (!row[1]) continue;
        const u = String(row[1]).toUpperCase().trim();
        if (!filterUsername || u === filterUsername) {
          scores.push({
            timestamp: row[0],
            username: row[1],
            nama: row[2],
            tingkat: row[3],
            fase: row[4],
            rombel: row[5],
            presensi: row[6],
            unitId: row[7],
            unitName: row[8],
            exerciseId: row[9],
            skor: row[10],
            totalSoal: row[11],
            persentase: row[12],
            status: row[13],
            detailJawaban: row[14]
          });
        }
      }
      return jsonResponse({ status: "success", scores: scores });
    }

    return jsonResponse({ status: "error", message: "Action GET tidak dikenali: " + action });
  } catch (err) {
    return jsonResponse({ status: "error", message: err.toString() });
  }
}

function doPost(e) {
  let body = {};
  try {
    if (e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }
  } catch (ex) {
    body = e.parameter || {};
  }
  
  const action = body.action || "";
  const ss = getSpreadsheet();
  
  try {
    // 1. REGISTRASI SISWA
    if (action === "register" || action === "addStudent") {
      const ws = ss.getSheetByName("Siswa") || ss.insertSheet("Siswa");
      const rows = ws.getDataRange().getValues();
      
      // Ambil input
      const tingkat = String(body.tingkat || "").trim().toUpperCase(); // X, XI, XII
      const fase = String(body.fase || "").trim().toUpperCase();       // E, F
      const rombel = String(body.rombel || "").trim();                 // 1 - 12
      const presensi = String(body.presensi || "").trim();             // 1 - 37
      const nama = String(body.nama || "").trim().toUpperCase();       // HURUF KAPITAL
      const tanggalLahir = String(body.tanggalLahir || "").trim();     // YYYY-MM-DD atau MMDDYYYY
      
      if (!nama || !tingkat || !fase || !rombel || !presensi || !tanggalLahir) {
        return jsonResponse({ status: "error", message: "Semua kolom pendaftaran wajib diisi!" });
      }
      
      // Format tanggal lahir untuk username (ddmmyyyy)
      // Contoh input date picker: '2008-05-14' -> dd='14', mm='05', yyyy='2008'
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
        // Asumsi format ddmmyyyy mentah
        dd = tanggalLahir.slice(0, 2);
        mm = tanggalLahir.slice(2, 4);
        yyyy = tanggalLahir.slice(4);
      }
      
      const ddmmyyyy = (dd + mm + yyyy).replace(/[^0-9]/g, "");
      
      // Ambil 3 huruf depan nama (hilangkan spasi atau simbol)
      const cleanName = nama.replace(/[^A-Z]/g, "");
      const prefix3 = (cleanName.length >= 3 ? cleanName.substring(0, 3) : cleanName.padEnd(3, "X")).toUpperCase();
      
      const baseUsername = prefix3 + ddmmyyyy;
      
      // Kumpulkan semua username yang sudah ada untuk memeriksa duplikasi
      const existingUsernames = [];
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][1]) {
          existingUsernames.push(String(rows[i][1]).toUpperCase().trim());
        }
      }
      
      // Cek duplikasi: jika baseUsername sudah ada, beri suffix A, B, C, dst.
      let finalUsername = baseUsername;
      if (existingUsernames.includes(finalUsername)) {
        let suffixCode = 65; // ASCII 'A'
        while (existingUsernames.includes(finalUsername)) {
          finalUsername = baseUsername + String.fromCharCode(suffixCode);
          suffixCode++;
        }
      }
      
      // Password adalah Tanggal Lahir (sesuai spesifikasi)
      const password = tanggalLahir;
      const nowStr = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");
      
      // Simpan ke worksheet Siswa
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
      
      return jsonResponse({
        status: "success",
        message: "Pendaftaran berhasil!",
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
      });
    }
    
    // 2. LOGIN SISWA / GURU
    if (action === "login") {
      const usernameInput = String(body.username || "").trim().toUpperCase();
      const passwordInput = String(body.password || "").trim();
      
      if (!usernameInput || !passwordInput) {
        return jsonResponse({ status: "error", message: "Username dan Password (Tanggal Lahir) wajib diisi!" });
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
        });
      }
      
      const ws = ss.getSheetByName("Siswa");
      if (!ws) return jsonResponse({ status: "error", message: "Database Siswa belum siap." });
      const rows = ws.getDataRange().getValues();
      
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const u = String(row[1] || "").trim().toUpperCase();
        const p = String(row[2] || "").trim();
        const tgl = String(row[8] || "").trim();
        
        // Cek kecocokan username dan password (bisa tanggal lahir atau format mmddyyyy)
        if (u === usernameInput) {
          const cleanPInput = passwordInput.replace(/[^0-9]/g, "");
          const cleanPRow = p.replace(/[^0-9]/g, "");
          const cleanTgl = tgl.replace(/[^0-9]/g, "");
          
          if (p === passwordInput || cleanPInput === cleanPRow || cleanPInput === cleanTgl) {
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
            });
          }
        }
      }
      
      return jsonResponse({ status: "error", message: "Username atau Tanggal Lahir (Password) tidak sesuai!" });
    }
    
    // 3. SUBMIT SKOR LATIHAN
    if (action === "submitScore") {
      const ws = ss.getSheetByName("Nilai") || ss.insertSheet("Nilai");
      const nowStr = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");
      
      ws.appendRow([
        nowStr,
        body.username || "-",
        body.nama || "-",
        body.tingkat || "-",
        body.fase || "-",
        body.rombel || "-",
        body.presensi || "-",
        body.unitId || "-",
        body.unitName || "-",
        body.exerciseId || "-",
        body.skor || 0,
        body.totalSoal || 0,
        body.persentase || "0%",
        body.status || "Selesai",
        JSON.stringify(body.detailJawaban || {})
      ]);
      
      return jsonResponse({ status: "success", message: "Skor berhasil disimpan di Google Sheet!" });
    }
    
    return jsonResponse({ status: "error", message: "Action POST tidak dikenal: " + action });
  } catch (err) {
    return jsonResponse({ status: "error", message: err.toString() });
  }
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
