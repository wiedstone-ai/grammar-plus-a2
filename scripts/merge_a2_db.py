# -*- coding: utf-8 -*-
import json
import os
import sys

sys.path.append(os.path.dirname(__file__))
import units_data_part1 as p1
import units_data_part2 as p2
import units_data_part3 as p3
import populate_a2_all_units as pop

with open('data/exercises_db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

unit_map = {
    4: p1.U4_EXERCISES,
    5: p1.U5_EXERCISES,
    6: p1.U6_EXERCISES,
    7: p1.U7_EXERCISES,
    8: p1.U8_EXERCISES,
    9: p1.U9_EXERCISES,
    10: p1.U10_EXERCISES,
    11: p2.U11_EXERCISES,
    12: p2.U12_EXERCISES,
    13: p2.U13_EXERCISES,
    14: p2.U14_EXERCISES,
    15: p2.U15_EXERCISES,
    16: p2.U16_EXERCISES,
    17: p2.U17_EXERCISES,
    18: p3.U18_EXERCISES,
    19: p3.U19_EXERCISES,
    20: p3.U20_EXERCISES,
    21: p3.U21_EXERCISES,
    22: p3.U22_EXERCISES,
    23: p3.U23_EXERCISES,
    24: p3.U24_EXERCISES
}

for u in db['units']:
    uid = u['id']
    if uid in unit_map:
        u['exercises'] = unit_map[uid]

total_exercises = sum(len(u.get('exercises', [])) for u in db['units'])
print(f"New total exercises in A2: {total_exercises}")

# Write to data/exercises_db.json
db['version'] = '5.0.0'
with open('data/exercises_db.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2, ensure_ascii=False)
print("Saved data/exercises_db.json successfully!")

# Read data_units.js and replace GRAMMAR_UNITS
with open('js/data_units.js', 'r', encoding='utf-8') as f:
    content = f.read()

idx_start = content.find('const GRAMMAR_UNITS = ') + len('const GRAMMAR_UNITS = ')
idx_end = content.find(';\n\nconst LATIHAN_MATERI')
if idx_end == -1:
    idx_end = content.find(';\nconst LATIHAN_MATERI')

new_json = json.dumps(db['units'], indent=2, ensure_ascii=False)
new_content = content[:idx_start] + new_json + content[idx_end:]

# Update AUDIO_TRANSCRIPTS at bottom of data_units.js
transcripts_json = json.dumps(pop.A2_AUDIO_TRANSCRIPTS, indent=2, ensure_ascii=False)
t_start = new_content.find('const AUDIO_TRANSCRIPTS = [')
t_end = new_content.find('if (typeof window !== "undefined") {', t_start)
if t_start != -1 and t_end != -1:
    new_content = new_content[:t_start] + f"const AUDIO_TRANSCRIPTS = {transcripts_json};\n\n" + new_content[t_end:]

with open('js/data_units.js', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Updated js/data_units.js successfully!")
