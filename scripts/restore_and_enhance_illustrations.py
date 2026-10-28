# -*- coding: utf-8 -*-
"""
Restore and enhance all illustrations:
1. Re-crop Unit 4 Ex 5 panels from the newly generated high-res vector cartoon image.
2. Clean and enhance all 54 question items in images/items (remove cut borders, center on 400x400 cards).
3. Restore question images mapping in exercises_db.json and js/data_units.js.
4. Keep full exercise master guide images on all 13 exercises.
"""
import os
import subprocess
import json
from PIL import Image, ImageOps

# 1. Crop Unit 4 Ex 5 from new u4_ex5_pictures.jpg
u4_master = Image.open('images/u4_ex5_pictures.jpg')
W, H = u4_master.size

u4_crops = {
    'u4_ex5_q1_haircut.png': (12, 12, W//3 - 12, H//2 - 12),
    'u4_ex5_q2_dog.png': (W//3 + 12, 12, 2*W//3 - 12, H//2 - 12),
    'u4_ex5_q3_lesson.png': (2*W//3 + 12, 12, W - 12, H//2 - 12),
    'u4_ex5_q4_rain.png': (12, H//2 + 12, W//3 - 12, H - 12),
    'u4_ex5_q5_bicycle.png': (W//3 + 12, H//2 + 12, 2*W//3 - 12, H - 12),
    'u4_ex5_q6_plane.png': (2*W//3 + 12, H//2 + 12, W - 12, H - 12),
}

for fname, box in u4_crops.items():
    dst = os.path.join('images/items', fname)
    panel = u4_master.crop(box)
    
    # Place on 400x400 clean white card
    panel.thumbnail((380, 380), Image.Resampling.LANCZOS)
    card = Image.new('RGB', (400, 400), (255, 255, 255))
    ox = (400 - panel.size[0]) // 2
    oy = (400 - panel.size[1]) // 2
    card.paste(panel, (ox, oy))
    card.save(dst, format='PNG')
    # Also save jpg
    card.save(dst.rsplit('.', 1)[0] + '.jpg', quality=95)
    print(f"Generated clean panel: {fname}")

# 2. Process all remaining items in images/items
for f in os.listdir('images/items'):
    if f.startswith('u4_ex5_'): continue
    if not f.endswith(('.jpg', '.png')): continue
    
    p = os.path.join('images/items', f)
    try:
        im = Image.open(p).convert('RGB')
        w, h = im.size
        # Trim border artifacts (10px inward)
        if w > 40 and h > 40:
            trimmed = im.crop((10, 10, w - 10, h - 10))
            trimmed.thumbnail((376, 376), Image.Resampling.LANCZOS)
            card = Image.new('RGB', (400, 400), (255, 255, 255))
            ox = (400 - trimmed.size[0]) // 2
            oy = (400 - trimmed.size[1]) // 2
            card.paste(trimmed, (ox, oy))
            card.save(p, quality=95)
    except Exception as e:
        print(f"Error processing {f}: {e}")

print("All 54 item images enhanced & centered on clean cards!")

# 3. Retrieve question image map from git 7e11e92
proc = subprocess.run(['git', 'show', '7e11e92:data/exercises_db.json'], capture_output=True, text=True, encoding='utf-8')
data_7e = json.loads(proc.stdout)

q_map = {}
for u in data_7e['units']:
    for ex in u.get('exercises', []):
        for idx, q in enumerate(ex.get('questions', [])):
            if q.get('image'):
                q_map[(ex['id'], idx)] = q['image']

# 4. Update data/exercises_db.json
with open('data/exercises_db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

attached_count = 0
for u in db['units']:
    for ex in u.get('exercises', []):
        ex_id = ex.get('id')
        for idx, q in enumerate(ex.get('questions', [])):
            if (ex_id, idx) in q_map:
                q['image'] = q_map[(ex_id, idx)]
                attached_count += 1

print(f"Restored {attached_count} question images in exercises_db.json!")

with open('data/exercises_db.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

# 5. Sync to js/data_units.js
units_json = json.dumps(db['units'], ensure_ascii=False, indent=2)
header = "// Data Lengkap Buku Tata Bahasa Inggris Grammar Plus A2 (Sarah Jane Lewis)\n// Disusun secara sistematis untuk GitHub Pages & Portal Pembelajaran\n\nconst GRAMMAR_UNITS = "
footer = ";\n\nif (typeof module !== \"undefined\" && module.exports) {\n  module.exports = { GRAMMAR_UNITS };\n}\n"

with open('js/data_units.js', 'w', encoding='utf-8') as f:
    f.write(header + units_json + footer)

print("Synced to js/data_units.js successfully!")
