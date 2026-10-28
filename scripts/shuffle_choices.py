# -*- coding: utf-8 -*-
"""
Deterministic shuffling of multiple choice options across all exercises in exercises_db.json
and synchronization into js/data_units.js.
"""
import json
import random
import re

def shuffle_choices():
    with open("data/exercises_db.json", "r", encoding="utf-8") as f:
        db = json.load(f)

    rng = random.Random(2026)
    total_shuffled = 0
    pos_stats = {}

    for u in db.get("units", []):
        for ex in u.get("exercises", []):
            for q in ex.get("questions", []):
                opts = q.get("options")
                ans = q.get("answer", "")
                if opts and len(opts) > 1:
                    shuffled = list(opts)
                    rng.shuffle(shuffled)
                    
                    # Ensure answer still exists
                    ans_lower = ans.strip().lower()
                    matched_idx = -1
                    for i, o in enumerate(shuffled):
                        if o.strip().lower() == ans_lower:
                            matched_idx = i
                            break
                    
                    if matched_idx == -1:
                        print(f"WARNING: Answer '{ans}' not found in options for Unit {u['id']}, Question: {q.get('q')}")
                        continue
                    
                    q["options"] = shuffled
                    total_shuffled += 1
                    pos_stats[matched_idx] = pos_stats.get(matched_idx, 0) + 1

    print(f"Total multiple-choice questions shuffled: {total_shuffled}")
    print("New answer position distribution:", pos_stats)

    with open("data/exercises_db.json", "w", encoding="utf-8") as f:
        json.dump(db, f, ensure_ascii=False, indent=2)

    print("Saved updated data/exercises_db.json")

    # Now update js/data_units.js
    with open("js/data_units.js", "r", encoding="utf-8") as f:
        content = f.read()

    # Extract LAMPIRAN_A, LAMPIRAN_B, AUDIO_TRANSCRIPTS from data_units.js if needed
    # Or replace the GRAMMAR_UNITS / A2_UNITS_DATA array with db['units']
    units_json = json.dumps(db["units"], ensure_ascii=False, indent=2)

    # Replace GRAMMAR_UNITS = [...];
    pattern = r'(const GRAMMAR_UNITS\s*=\s*)(\[[\s\S]*?\])(;\s*\n\s*(?:\/\*\*|const|window))'
    match = re.search(pattern, content)
    if match:
        content = content[:match.start(2)] + units_json + content[match.end(2):]
        print("Updated GRAMMAR_UNITS in js/data_units.js")
    else:
        print("Could not match GRAMMAR_UNITS with regex, checking alternative pattern...")
        pattern2 = r'(const GRAMMAR_UNITS\s*=\s*)(\[[\s\S]*?\]);'
        m2 = re.search(pattern2, content)
        if m2:
            content = content[:m2.start(2)] + units_json + content[m2.end(2):]
            print("Updated GRAMMAR_UNITS with pattern 2")

    with open("js/data_units.js", "w", encoding="utf-8") as f:
        f.write(content)

    print("js/data_units.js updated successfully.")

if __name__ == "__main__":
    shuffle_choices()
