# -*- coding: utf-8 -*-
"""
Generate 24 lightweight standalone HTML pages for each unit in units/unit_X.html
"""
import os
import json
import html

def build_unit_pages():
    os.makedirs("units", exist_ok=True)
    
    with open("data/exercises_db.json", "r", encoding="utf-8") as f:
        db = json.load(f)
    
    units = db.get("units", [])
    transcripts = db.get("audio_transcripts", [])
    
    total_units = len(units)
    print(f"Generating {total_units} unit pages...")
    
    for idx, u in enumerate(units):
        uid = u["id"]
        prev_uid = uid - 1 if uid > 1 else None
        next_uid = uid + 1 if uid < total_units else None
        
        # Collect relevant transcripts for this unit
        tracks_in_unit = {ex["audioTrack"].strip().lower() for ex in u.get("exercises", []) if ex.get("audioTrack")}
        
        rel_transcripts = []
        for t in transcripts:
            t_track = t.get("track", "").strip().lower()
            for tr in tracks_in_unit:
                if t_track == tr or t_track.startswith(tr + " ") or t_track.startswith(tr + ":"):
                    rel_transcripts.append(t)
                    break
        
        # Build Grammar HTML
        grammar = u.get("grammar", {})
        summary_text = grammar.get("summary", "")
        tables = grammar.get("tables", [])
        rules = grammar.get("rules", [])
        
        tables_html = ""
        for tbl in tables:
            tbl_title = html.escape(tbl.get("title", ""))
            headers = tbl.get("headers", [])
            rows = tbl.get("rows", [])
            
            headers_th = "".join(f"<th>{html.escape(h)}</th>" for h in headers)
            rows_tr = ""
            for r in rows:
                tds = "".join(f"<td>{html.escape(cell)}</td>" for cell in r)
                rows_tr += f"<tr>{tds}</tr>"
                
            tables_html += f"""
              <div style="margin: 0.85rem 0;">
                <div style="font-weight: 700; color: #1E3A8A; margin-bottom: 0.35rem;">{tbl_title}</div>
                <table class="table-grammar">
                  <thead><tr>{headers_th}</tr></thead>
                  <tbody>{rows_tr}</tbody>
                </table>
              </div>
            """
            
        rules_html = ""
        if rules:
            lis = "".join(f"<li style='margin-bottom: 0.35rem;'>{html.escape(r)}</li>" for r in rules)
            rules_html = f"<div style='margin-top: 0.85rem;'><strong>Aturan &amp; Catatan Penting:</strong><ul style='padding-left: 1.25rem; margin-top: 0.35rem;'>{lis}</ul></div>"

        # Prepare JSON safely
        unit_json_str = json.dumps(u, ensure_ascii=False)
        transcripts_json_str = json.dumps(rel_transcripts, ensure_ascii=False)
        
        u_title = html.escape(u.get("title", ""))
        u_eng_title = html.escape(u.get("english_title", ""))
        u_category = html.escape(u.get("category", "TENSES"))
        
        prev_btn_html = f'<a href="unit_{prev_uid}.html" class="btn-pager">◀ Unit {prev_uid}</a>' if prev_uid else '<span class="btn-pager disabled">◀ Awal</span>'
        next_btn_html = f'<a href="unit_{next_uid}.html" class="btn-pager">Unit {next_uid} ▶</a>' if next_uid else '<span class="btn-pager disabled">Akhir ▶</span>'

        template = """<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unit __UID__: __U_TITLE__ - Grammar Plus A2</title>
  <meta name="description" content="Latihan mandiri super cepat dan ringan untuk Unit __UID__: __U_ENG_TITLE__.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body style="background-color: #F8FAFC;">

  <div class="unit-page-container">
    <!-- Top Navigation Bar -->
    <header class="unit-top-navbar">
      <div class="unit-brand-left">
        <a href="../index.html" class="btn-back-home" title="Kembali ke portal utama semua unit">
          <span>←</span> Beranda Utama
        </a>
      </div>
      <div class="unit-pager-nav">
        __PREV_BTN__
        <span style="font-weight: 700; font-size: 0.85rem; color: #1E3A8A; padding: 0 0.35rem;">Unit __UID__ / 24</span>
        __NEXT_BTN__
      </div>
      <div id="student-identity-badge"></div>
    </header>

    <!-- Unit Hero Header -->
    <section class="unit-hero-card">
      <div class="unit-hero-meta">
        <span class="unit-tag-pill">UNIT __UID__</span>
        <span class="badge badge-primary" style="font-size: 0.72rem; text-transform: uppercase;">__U_CAT__</span>
        <span class="badge badge-secondary" style="font-size: 0.72rem;">📖 __NUM_EX__ Latihan</span>
      </div>
      <h1 class="unit-hero-title">__U_TITLE__</h1>
      <div class="unit-hero-subtitle">__U_ENG_TITLE__</div>

      <!-- Collapsible Grammar Summary -->
      <div class="grammar-collapsible">
        <div class="grammar-toggle-header" onclick="toggleUnitGrammar(this)">
          <span>📖 Ringkasan Rumus &amp; Materi Tata Bahasa</span>
          <span class="grammar-toggle-arrow">▼</span>
        </div>
        <div class="grammar-body-content" id="unit-grammar-body" style="display: none;">
          <p style="margin-bottom: 0.75rem;">__SUMMARY__</p>
          __TABLES__
          __RULES__
        </div>
      </div>
    </section>

    <!-- Exercise Tabs Bar -->
    <div class="exercise-tabs-bar" id="exercise-tabs-container"></div>

    <!-- Active Exercise Card Area -->
    <main class="exercise-card" id="exercise-card">
      <div id="exercise-content-area"></div>
    </main>
  </div>

  <script>
    function toggleUnitGrammar(headerEl) {
      const body = document.getElementById("unit-grammar-body");
      const arrow = headerEl.querySelector(".grammar-toggle-arrow");
      if (body) {
        const isHidden = body.style.display === "none";
        body.style.display = isHidden ? "block" : "none";
        if (arrow) arrow.textContent = isHidden ? "▲" : "▼";
      }
    }
  </script>
  <script src="../js/unit_runner.js"></script>
  <script>
    const UNIT_DATA = __UNIT_JSON__;
    const UNIT_TRANSCRIPTS = __TRANSCRIPTS_JSON__;
    document.addEventListener("DOMContentLoaded", function() {
      initUnitRunner(UNIT_DATA, UNIT_TRANSCRIPTS);
    });
  </script>
</body>
</html>"""

        page_content = template \
            .replace("__UID__", str(uid)) \
            .replace("__U_TITLE__", u_title) \
            .replace("__U_ENG_TITLE__", u_eng_title) \
            .replace("__U_CAT__", u_category) \
            .replace("__NUM_EX__", str(len(u.get("exercises", [])))) \
            .replace("__PREV_BTN__", prev_btn_html) \
            .replace("__NEXT_BTN__", next_btn_html) \
            .replace("__SUMMARY__", html.escape(summary_text)) \
            .replace("__TABLES__", tables_html) \
            .replace("__RULES__", rules_html) \
            .replace("__UNIT_JSON__", unit_json_str) \
            .replace("__TRANSCRIPTS_JSON__", transcripts_json_str)

        target_path = os.path.join("units", f"unit_{uid}.html")
        with open(target_path, "w", encoding="utf-8") as out_f:
            out_f.write(page_content)
            
    print(f"Successfully generated all {total_units} unit pages in 'units/'!")

if __name__ == "__main__":
    build_unit_pages()
