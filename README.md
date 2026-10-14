# GRAMMAR PLUS A2 - WEB LEARNING PORTAL & EXERCISE SYSTEM
**Berdasarkan Buku:** *Grammar Plus A2 - Panduan dan Latihan Tata Bahasa Inggris* (Sarah Jane Lewis, Kesaint Blanc Publishing)  
**Database Spreadsheet:** [https://docs.google.com/spreadsheets/d/1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg](https://docs.google.com/spreadsheets/d/1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg)  
**Desain:** Strict Light Background (Putih Bersih Kontras Tinggi, Elegan, Modern).

---

## 🌟 Fitur Utama Sistem

1. **Sistematika Pembelajaran Lengkap (24 Unit)**:
   - Disusun persis sesuai urutan pembelajaran buku dari Unit 1 sampai Unit 24:
     - Unit 1: Kata sifat dan kata ganti posesif; *whose*
     - Unit 2: Penggunaan *have, can*, dan *could*
     - Unit 3: Mengajak, menerima, menolak (*invitations*)
     - Unit 4: Bentuk masa depan: *be going to*
     - Unit 5: Kata ganti refleksif (*reflexive pronouns*)
     - Unit 6: Penggunaan *to get*
     - Unit 7: *could* (kemampuan & kesopanan)
     - Unit 8: *some, any, no, every*
     - Unit 9: Bentuk majemuk (*compound words*)
     - Unit 10: *have to / don't have to*
     - Unit 11: *should, shall, ought to* atau *shouldn't*
     - Unit 12: *Present perfect simple*
     - Unit 13: *Present perfect continuous*
     - Unit 14: Klausa penghubung (*relative clauses*)
     - Unit 15: Kata kerja + infinitif; kata kerja + *ing*
     - Unit 16: *will - Future simple*
     - Unit 17: Bentuk kondisional pertama (*First Conditional*)
     - Unit 18: Bentuk kondisional kedua (*Second Conditional*)
     - Unit 19: Kalimat tidak langsung (*Reported speech*)
     - Unit 20: *used to*
     - Unit 21: Persetujuan dan ketidaksetujuan (*So do I / Neither do I*)
     - Unit 22: Pertanyaan dan jawaban singkat (*Question tags*)
     - Unit 23: Bentuk pasif (*Passive voice*)
     - Unit 24: Kata kerja indrawi (*Sense verbs*)
   - **Latihan Materi (Review Exam)** untuk evaluasi menyeluruh.
   - **Lampiran A**: Kamus interaktif *Irregular Verbs* (Bentuk Dasar, V2, V3).
   - **Lampiran B**: Alfabet Fonetis (*IPA*) dan Tanda Baca Bahasa Inggris.
   - **Naskah Rekaman Audio**: Transkrip lengkap TR 1 sampai TR 27.

2. **Aturan Baku Registrasi Siswa**:
   - Kolom isian wajib:
     - **Tingkat**: Pilihan `X`, `XI`, atau `XII`
     - **Fase**: Pilihan `E` atau `F` (Kurikulum Merdeka)
     - **Rombel**: Isian singkat angka `1` sampai `12`
     - **Nomor Presensi**: Isian singkat angka `1` sampai `37`
     - **Nama Lengkap**: Otomatis dikonversi ke huruf kapital
     - **Tanggal Lahir**: Digunakan sebagai kata sandi login
   - **Formula Pembuatan Username**:
     - 3 huruf depan nama lengkap disambung format tanggal lahir `MMDDYYYY`.
     - *Contoh*: Siswa bernama `ANDI PRATAMA` lahir tanggal `14 Oktober 2008` akan memperoleh username `AND10142008`.
     - *Penanganan Duplikasi*: Jika ada nama dan tanggal lahir yang sama, sistem otomatis menambahkan akhiran huruf alfabet `A`, `B`, `C`, dan seterusnya (misal: `AND10142008A`).

3. **Akses Latihan Terproteksi**:
   - Latihan dan evaluasi hanya dapat diakses oleh murid yang telah mendaftar sendiri atau didaftarkan oleh guru.
   - Pengerjaan soal interaktif dilengkapi evaluasi seketika (instant feedback), pembahasan, dan batas KKM kelulusan 75%.

4. **Rekaman Capaian Siswa & Cetak PDF**:
   - Siswa memiliki halaman pribadi untuk melihat ringkasan statistik (jumlah latihan, rata-rata skor, status kelulusan).
   - Tombol **"Cetak / Unduh Capaian (PDF)"** menghasilkan format rapor resmi A4 siap cetak atau disimpan sebagai PDF.

5. **Portal Guru & Ekspor Excel**:
   - Akses aman guru (PIN default: `GURU123`).
   - Guru dapat melihat tabel seluruh murid terdaftar.
   - Guru dapat mendaftarkan murid secara langsung.
   - Guru dapat memantau seluruh nilai latihan kelas.
   - Tombol **"Unduh Rekaman Hasil Latihan (Excel)"** mengekspor seluruh rekapan nilai dan murid ke file `.xlsx` menggunakan engine SheetJS.

---

## 🚀 Panduan Mengunggah ke GitHub & Mengaktifkan GitHub Pages

Aplikasi ini 100% menggunakan arsitektur web modern statis (HTML, CSS murni, dan JS vanilla) tanpa dependensi runtime server yang rumit, sehingga **sangat cepat dan sempurna untuk GitHub Pages**.

### Langkah 1: Buat Repositori Baru di GitHub
1. Buka akun GitHub Anda di [https://github.com](https://github.com)
2. Klik tombol **New** (Repository baru).
3. Beri nama repositori, misalnya: `grammar-plus-a2`.
4. Pilih **Public**.
5. Jangan centang "Initialize this repository with a README" (karena Anda sudah memiliki file lengkap).
6. Klik **Create repository**.

### Langkah 2: Unggah File (Lewat Web atau Git CLI)
**Cara A: Ekstrak File ZIP dan Push Lewat Git CLI:**
```bash
# Buka folder hasil ekstrak di terminal / powershell
cd grammar-plus-a2-web

# Inisialisasi git
git init
git add .
git commit -m "Inisialisasi Web Grammar Plus A2"
git branch -M main

# Hubungkan ke repository GitHub Anda (ganti username Anda)
git remote add origin https://github.com/USERNAME-ANDA/grammar-plus-a2.git
git push -u origin main
```

**Cara B: Upload Langsung via Browser GitHub:**
1. Di halaman repositori GitHub yang baru dibuat, klik link **uploading an existing file**.
2. Drag and drop seluruh file dan folder dari folder `grammar-plus-a2-web` (`index.html`, folder `css`, folder `js`, dll).
3. Klik **Commit changes**.

### Langkah 3: Mengaktifkan GitHub Pages
1. Di repositori GitHub Anda, klik tab **Settings** (Pengaturan di kanan atas).
2. Di bilah menu sebelah kiri, klik menu **Pages**.
3. Di bagian **Build and deployment**:
   - Source: pilih **Deploy from a branch**
   - Branch: pilih **main** dan folder **/ (root)**.
4. Klik tombol **Save**.
5. Tunggu 1–2 menit, GitHub Pages akan memberikan tautan website live Anda:
   `https://USERNAME-ANDA.github.io/grammar-plus-a2/`
6. Website siap digunakan oleh seluruh siswa Anda!

---

## 📊 Panduan Menghubungkan Google Spreadsheet (1 Menit Deploy)

Database Google Spreadsheet telah disiapkan di URL:  
`https://docs.google.com/spreadsheets/d/1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg`  
dengan sheet: `Siswa`, `Nilai`, dan `Pengaturan`.

Agar website di GitHub Pages dapat menulis dan membaca data langsung ke spreadsheet tersebut secara real-time:

1. Buka spreadsheet: [https://docs.google.com/spreadsheets/d/1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg](https://docs.google.com/spreadsheets/d/1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg)
2. Di menu atas Google Sheet, klik **Extensions (Ekstensi)** &rarr; **Apps Script**.
3. Hapus kode bawaan yang ada di editor, lalu buka file `google_apps_script.js` pada folder proyek ini, salin seluruh isinya, dan tempelkan (*paste*) ke editor Apps Script.
4. Klik ikon **Save** (Disket).
5. Klik tombol biru **Deploy (Terapkan)** di kanan atas &rarr; pilih **New deployment (Penerapan baru)**.
6. Klik ikon roda gigi di samping *Select type* &rarr; pilih **Web app (Aplikasi web)**.
7. Isi form:
   - *Description*: `Grammar Plus A2 API`
   - *Execute as*: `Me (email Google Anda)`
   - *Who has access*: **Anyone (Siapa saja)** *(Wajib dipilih Anyone agar browser murid dari GitHub Pages diizinkan mengirim nilai)*.
8. Klik **Deploy** dan berikan izin akses (*Authorize access*).
9. Salin tautan **Web App URL** yang berakhiran `/exec`.
10. Buka website Anda di browser, masuk ke tab **Database Google Sheet**, tempelkan URL tersebut ke kolom isian, lalu klik **Simpan Konfigurasi**. Selesai!

---

## 🛠️ Pengujian & Sinkronisasi Lokal (Python CLI)

Untuk memeriksa isi data spreadsheet langsung dari komputer tanpa membuka browser:
```powershell
python sync_to_gsheet.py
```
Skrip ini akan menampilkan daftar siswa terdaftar dan rekapitulasi nilai latihan terbaru secara instan menggunakan kredensial service account.
