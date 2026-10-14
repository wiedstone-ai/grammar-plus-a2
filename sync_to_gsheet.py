"""
SYNCHRONIZER SPREADSHEET OFFLINE / COMMAND LINE
Grammar Plus A2 - Google Spreadsheet Database Syncer
ID Spreadsheet: 1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg
"""

import os
import sys
import json
import gspread
from google.oauth2.service_account import Credentials

SPREADSHEET_ID = '1R_xCBJWrWJvttCYMzt07mZnOe_DimvH9TJX8MgPezBg'
SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive'
]

def get_client():
    creds_file = os.path.join(os.path.dirname(__file__), 'credentials.json')
    if not os.path.exists(creds_file):
        # Fallback path
        creds_file = r'C:\widio-titip\oracle\dash-arb\credentials.json'
    if not os.path.exists(creds_file):
        print(f"Error: File credentials.json tidak ditemukan di {creds_file}")
        sys.exit(1)
        
    creds = Credentials.from_service_account_file(creds_file, scopes=SCOPES)
    return gspread.authorize(creds)

def view_data():
    client = get_client()
    sh = client.open_by_key(SPREADSHEET_ID)
    print(f"\n=== SPREADSHEET: {sh.title} ===")
    
    # 1. Siswa
    ws_siswa = sh.worksheet("Siswa")
    siswa_records = ws_siswa.get_all_records()
    print(f"\n[DAFTAR SISWA TERDAFTAR] ({len(siswa_records)} Murid):")
    for idx, s in enumerate(siswa_records, 1):
        print(f"  {idx}. {s.get('Username')} | {s.get('Nama Lengkap')} | Kelas {s.get('Tingkat')}-{s.get('Rombel')} (Presensi {s.get('Nomor Presensi')})")
        
    # 2. Nilai
    ws_nilai = sh.worksheet("Nilai")
    nilai_records = ws_nilai.get_all_records()
    print(f"\n[REKAP NILAI LATIHAN] ({len(nilai_records)} Pengerjaan):")
    for idx, n in enumerate(nilai_records[-15:], 1): # 15 terakhir
        print(f"  {idx}. {n.get('Timestamp')} | {n.get('Username')} | Unit {n.get('Unit ID')} ({n.get('Latihan ID')}) | Skor: {n.get('Skor')}/{n.get('Total Soal')} ({n.get('Persentase')}) | Status: {n.get('Status')}")

if __name__ == '__main__':
    print("Memeriksa data di Google Spreadsheet...")
    view_data()
