import json
import re

# Load db
with open('data/exercises_db.json', 'r', encoding='utf-8') as f:
    db = json.load(f)

ex_with_q_imgs = ['u1_ex4', 'u2_ex2', 'u3_ex6', 'u4_ex5', 'u6_ex1', 'u8_ex2', 'u13_ex1', 'u14_ex9']

for u in db['units']:
    for ex in u['exercises']:
        if ex['id'] in ex_with_q_imgs:
            if 'image' in ex:
                print('Removing master image from ' + ex['id'] + ': ' + str(ex['image']))
                del ex['image']

# Save data/exercises_db.json
with open('data/exercises_db.json', 'w', encoding='utf-8') as f:
    json.dump(db, f, indent=2, ensure_ascii=False)

# Update js/data_units.js
with open('js/data_units.js', 'r', encoding='utf-8') as f:
    content = f.read()

new_data_str = json.dumps(db['units'], indent=2, ensure_ascii=False)
new_content = re.sub(
    r'const A2_UNITS_DATA\s*=\s*\[[\s\S]*?\];',
    'const A2_UNITS_DATA = ' + new_data_str + ';',
    content
)

with open('js/data_units.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Updated exercises_db.json and data_units.js!')
