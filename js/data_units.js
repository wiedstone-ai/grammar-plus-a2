// Data Lengkap Buku Tata Bahasa Inggris Grammar Plus A2 (Sarah Jane Lewis)
// Disusun secara sistematis untuk GitHub Pages & Portal Pembelajaran

const GRAMMAR_UNITS = [
  {
    "id": 1,
    "title": "Kata Sifat dan Kata Ganti Posesif; Whose",
    "english_title": "Possessive Adjectives & Pronouns; Whose",
    "category": "Pronouns & Determiners",
    "grammar": {
      "summary": "Kata sifat posesif (Possessive Adjectives) digunakan sebelum kata benda untuk menyatakan kepemilikan. Sedangkan kata ganti posesif (Possessive Pronouns) berdiri sendiri menggantikan kata benda tersebut.",
      "tables": [
        {
          "title": "Tabel Kata Sifat & Kata Ganti Posesif",
          "headers": [
            "Subjek",
            "Kata Sifat Posesif (Adjective)",
            "Kata Ganti Posesif (Pronoun)",
            "Contoh"
          ],
          "rows": [
            [
              "I",
              "my",
              "mine",
              "This is my moped. It's mine."
            ],
            [
              "You",
              "your",
              "yours",
              "That's your book. It's yours."
            ],
            [
              "He",
              "his",
              "his",
              "This is his camera. It's his."
            ],
            [
              "She",
              "her",
              "hers",
              "That's her phone. It's hers."
            ],
            [
              "It",
              "its",
              "-",
              "The cat ate its food."
            ],
            [
              "We",
              "our",
              "ours",
              "These are our seats. They're ours."
            ],
            [
              "You (plural)",
              "your",
              "yours",
              "Are these your pencils? Are they yours?"
            ],
            [
              "They",
              "their",
              "theirs",
              "Those are their coats. They're theirs."
            ]
          ]
        }
      ],
      "rules": [
        "Kata sifat posesif SELALU diletakkan sebelum kata benda: 'This is my sister\\'s tablet.'",
        "Kata ganti posesif berdiri sendiri dan TIDAK diikuti kata benda: 'That\\'s her mobile. = It\\'s hers.'",
        "Gunakan 'whose' untuk menanyakan kepemilikan: 'Whose bag is this? It\\'s mine.'",
        "Ingat! Jangan tertukar antara 'whose' (milik siapa) dengan 'who\\'s' (= who is atau who has)."
      ]
    },
    "exercises": [
      {
        "id": "u1_ex1",
        "unitId": 1,
        "page": 3,
        "title": "Latihan 1: Lengkapi dengan Kata Ganti Posesif (mine, yours, his, hers, ours, theirs)",
        "instruction": "Ketik kata ganti posesif yang tepat pada bagian yang kosong sesuai kepemilikan.",
        "type": "fill",
        "questions": [
          {
            "q": "1. It's my house. It's [BLANK].",
            "answer": "mine",
            "alternateAnswers": [
              "mine."
            ],
            "hint": "my -> mine",
            "explanation": "Kata sifat 'my' berubah menjadi 'mine' saat berdiri sendiri tanpa kata benda."
          },
          {
            "q": "2. It's his hat. It's [BLANK].",
            "answer": "his",
            "alternateAnswers": [
              "his."
            ],
            "hint": "his -> his",
            "explanation": "Bentuk kata sifat dan kata ganti posesif untuk he adalah 'his'."
          },
          {
            "q": "3. It's her T-shirt. It's [BLANK].",
            "answer": "hers",
            "alternateAnswers": [
              "hers."
            ],
            "hint": "her -> hers",
            "explanation": "Kata sifat 'her' menjadi 'hers' saat berdiri sendiri."
          },
          {
            "q": "4. It's their newspaper. It's [BLANK].",
            "answer": "theirs",
            "alternateAnswers": [
              "theirs."
            ],
            "hint": "their -> theirs",
            "explanation": "Kata sifat 'their' menjadi 'theirs'."
          },
          {
            "q": "5. They're our bikes. They're [BLANK].",
            "answer": "ours",
            "alternateAnswers": [
              "ours."
            ],
            "hint": "our -> ours",
            "explanation": "Kata sifat 'our' menjadi 'ours'."
          },
          {
            "q": "6. They're your pencils. They're [BLANK].",
            "answer": "yours",
            "alternateAnswers": [
              "yours."
            ],
            "hint": "your -> yours",
            "explanation": "Kata sifat 'your' menjadi 'yours'."
          }
        ]
      },
      {
        "id": "u1_ex2",
        "unitId": 1,
        "page": 3,
        "title": "Latihan 2: Garis Bawahi Bentuk Posesif yang Tepat",
        "instruction": "Pilihlah bentuk kata sifat atau kata ganti posesif yang benar sesuai konteks kalimat.",
        "type": "choice",
        "questions": [
          {
            "q": "1. This coat isn't [BLANK], it's too small. It must be [BLANK2].",
            "options": [
              "my / your",
              "my / yours",
              "mine / your",
              "mine / yours"
            ],
            "answer": "mine / yours",
            "hint": "Keduanya berdiri sendiri tanpa kata benda.",
            "explanation": "Gunakan kata ganti posesif 'mine' dan 'yours' karena tidak diikuti kata benda."
          },
          {
            "q": "2. Tell Lisa not to forget [BLANK] passport and not to forget [BLANK2] either.",
            "options": [
              "her / my",
              "her / mine",
              "hers / my",
              "hers / mine"
            ],
            "answer": "her / mine",
            "hint": "Passport adalah kata benda, di akhir berdiri sendiri.",
            "explanation": "'her' mendampingi kata benda 'passport', sedangkan 'mine' menggantikan 'my passport'."
          },
          {
            "q": "3. I don't have any drink left. Can I have some of [BLANK]?",
            "options": [
              "your",
              "yours"
            ],
            "answer": "yours",
            "hint": "Berdiri sendiri di akhir kalimat tanya.",
            "explanation": "Gunakan 'yours' karena bermakna 'your drink' tanpa mengulang kata 'drink'."
          },
          {
            "q": "4. This doesn't look like [BLANK] jacket.",
            "options": [
              "my",
              "mine"
            ],
            "answer": "my",
            "hint": "Diikuti kata benda 'jacket'.",
            "explanation": "Sebelum kata benda 'jacket', kita wajib menggunakan kata sifat posesif 'my'."
          },
          {
            "q": "5. Two of [BLANK] children go to junior school and [BLANK2] oldest son goes to secondary school.",
            "options": [
              "their / their",
              "theirs / their",
              "their / theirs",
              "theirs / theirs"
            ],
            "answer": "their / their",
            "hint": "Keduanya diikuti kata benda: 'children' dan 'oldest son'.",
            "explanation": "Keduanya membutuhkan kata sifat posesif 'their'."
          },
          {
            "q": "6. You can take [BLANK] keys if you can't find [BLANK2].",
            "options": [
              "my / your",
              "my / yours",
              "mine / your",
              "mine / yours"
            ],
            "answer": "my / yours",
            "hint": "Pertama ada kata 'keys', kedua berdiri sendiri.",
            "explanation": "Gunakan 'my keys' (adjective) dan 'yours' (pronoun)."
          }
        ]
      },
      {
        "id": "u1_ex3",
        "unitId": 1,
        "page": 3,
        "title": "Latihan 3: Lengkapi dengan Kata Sifat Posesif (my, your, his, her, its, our, their)",
        "instruction": "Ketik kata sifat posesif yang tepat untuk melengkapi kalimat sebelum kata benda.",
        "type": "fill",
        "questions": [
          {
            "q": "1. Why don't you ask Sam to lend us [BLANK] car?",
            "answer": "his",
            "hint": "Sam adalah laki-laki tunggal",
            "explanation": "Sam (laki-laki) menggunakan possessive adjective 'his'."
          },
          {
            "q": "2. The children washed [BLANK] hands and walked into the kitchen.",
            "answer": "their",
            "hint": "The children adalah jamak",
            "explanation": "The children adalah subjek jamak (they), kata sifat posesifnya adalah 'their'."
          },
          {
            "q": "3. My sister goes on [BLANK] favourite social network website every day.",
            "answer": "her",
            "hint": "My sister adalah perempuan",
            "explanation": "My sister (she) menggunakan 'her'."
          },
          {
            "q": "4. Put [BLANK] jumper on. The weather is quite chilly today.",
            "answer": "your",
            "hint": "Berbicara kepada orang kedua (kamu)",
            "explanation": "Bentuk perintah kepada orang kedua memakai 'your jumper'."
          },
          {
            "q": "5. My parents and older brother came to [BLANK] graduation.",
            "answer": "my",
            "alternateAnswers": [
              "our"
            ],
            "hint": "Wisuda saya",
            "explanation": "Gunakan 'my' untuk menyatakan wisuda milik penutur."
          },
          {
            "q": "6. Tom and Nancy just returned back from [BLANK] holiday.",
            "answer": "their",
            "hint": "Tom and Nancy jamak",
            "explanation": "Subjek jamak orang ketiga memakai 'their'."
          },
          {
            "q": "7. Amy fell and twisted [BLANK] ankle.",
            "answer": "her",
            "hint": "Amy adalah perempuan",
            "explanation": "Amy (perempuan) menggunakan 'her ankle'."
          },
          {
            "q": "8. Jenny and [BLANK] boyfriend came to the cinema with us.",
            "answer": "her",
            "hint": "Pacar Jenny",
            "explanation": "Jenny adalah perempuan, pacarnya disebut 'her boyfriend'."
          },
          {
            "q": "9. Sam has got a new puppy. [BLANK] name is Spot.",
            "answer": "its",
            "alternateAnswers": [
              "Its",
              "his",
              "His"
            ],
            "hint": "Anak anjing (hewan)",
            "explanation": "Gunakan 'its' (tanpa petik atas) untuk hewan."
          },
          {
            "q": "10. Andrew needs new glasses because [BLANK] old ones are broken.",
            "answer": "his",
            "hint": "Andrew adalah laki-laki",
            "explanation": "Andrew (he) memakai 'his old ones'."
          },
          {
            "q": "11. A: What's the name of the boy who is sitting next to Lexi? B: [BLANK] name is Robert.",
            "answer": "his",
            "alternateAnswers": [
              "His"
            ],
            "hint": "Nama anak laki-laki itu",
            "explanation": "The boy adalah laki-laki, maka gunakan 'his name'."
          },
          {
            "q": "12. [BLANK] car is old, but we still like it.",
            "answer": "our",
            "alternateAnswers": [
              "Our"
            ],
            "hint": "Lihat kata 'we' berikutnya",
            "explanation": "Karena menyatakan 'we still like it', maka mobil itu adalah milik kami ('Our car')."
          }
        ]
      },
      {
        "id": "u1_ex4",
        "unitId": 1,
        "page": 4,
        "title": "Latihan 4: Milik Siapakah Barang-Barang Ini? (Naskah Audio TR 2)",
        "instruction": "Tuliskan pemilik barang sesuai rekaman audio TR 2: Marsha's, Nick's, Caroline's, atau Sam's.",
        "type": "fill",
        "audioTrack": "TR 2",
        "questions": [
          {
            "q": "1. a book on Shakespeare's plays &rarr; [BLANK]",
            "answer": "Caroline's",
            "hint": "Guru sejarah yang melatih drama Hamlet",
            "explanation": "Caroline melatih pementasan drama 'Hamlet' karya Shakespeare."
          },
          {
            "q": "2. a rucksack &rarr; [BLANK]",
            "answer": "Caroline's",
            "alternateAnswers": [
              "Marsha's"
            ],
            "hint": "Tas punggung",
            "explanation": "Rucksack digunakan oleh Caroline / Marsha."
          },
          {
            "q": "3. a bike &rarr; [BLANK]",
            "answer": "Sam's",
            "hint": "Polisi yang suka bersepeda pulang kerja",
            "explanation": "Sam 'sometimes after work he rides his bike.'"
          },
          {
            "q": "4. cows &rarr; [BLANK]",
            "answer": "Nick's",
            "hint": "Petani yang memelihara hewan",
            "explanation": "Nick adalah petani yang memberi makan hewan ternaknya."
          },
          {
            "q": "5. a moped &rarr; [BLANK]",
            "answer": "Marsha's",
            "hint": "Gadis 15 tahun dengan moped merah",
            "explanation": "Marsha memiliki 'bright red moped'."
          },
          {
            "q": "6. a tennis racket &rarr; [BLANK]",
            "answer": "Marsha's",
            "hint": "Olahraga favorit tenis dan bola voli",
            "explanation": "Olahraga favorit Marsha adalah tenis dan bola voli."
          },
          {
            "q": "7. the latest J.K. Rowling novel &rarr; [BLANK]",
            "answer": "Sam's",
            "hint": "Suka membaca buku fantasi dan petualangan",
            "explanation": "Sam membaca banyak cerita petualangan dan fantasi di waktu luang."
          },
          {
            "q": "8. tickets for the cinema &rarr; [BLANK]",
            "answer": "Nick's",
            "hint": "Suka pergi ke bioskop bersama istrinya",
            "explanation": "Nick pergi ke bioskop bersama istrinya di akhir pekan."
          },
          {
            "q": "9. a football &rarr; [BLANK]",
            "answer": "Sam's",
            "hint": "Suka menonton pertandingan sepak bola",
            "explanation": "Sam menonton pertandingan sepak bola pada hari Minggu."
          },
          {
            "q": "10. a volleyball &rarr; [BLANK]",
            "answer": "Marsha's",
            "hint": "Olahraga favorit Marsha",
            "explanation": "Marsha menyukai voli."
          }
        ]
      },
      {
        "id": "u1_ex5",
        "unitId": 1,
        "page": 4,
        "title": "Latihan 5: Tulis Ulang Kalimat dengan Kata Ganti Posesif",
        "instruction": "Ubah kalimat menggunakan possessive pronoun. (Contoh: This is our car &rarr; This car is ours).",
        "type": "fill",
        "questions": [
          {
            "q": "1. This is our car. &rarr; [BLANK]",
            "answer": "This car is ours.",
            "alternateAnswers": [
              "This car is ours"
            ],
            "hint": "This car is ...",
            "explanation": "'our car' diubah menjadi 'This car is ours'."
          },
          {
            "q": "2. Those are their books. &rarr; [BLANK]",
            "answer": "Those books are theirs.",
            "alternateAnswers": [
              "Those books are theirs"
            ],
            "hint": "Those books are ...",
            "explanation": "'their books' menjadi 'Those books are theirs'."
          },
          {
            "q": "3. Isn't that your DVD? &rarr; [BLANK]",
            "answer": "Isn't that DVD yours?",
            "alternateAnswers": [
              "Isn't that DVD yours"
            ],
            "hint": "Isn't that DVD ...?",
            "explanation": "'your DVD' diubah menjadi 'Isn't that DVD yours?'."
          },
          {
            "q": "4. Aren't these your trainers? &rarr; [BLANK]",
            "answer": "Aren't these trainers yours?",
            "alternateAnswers": [
              "Aren't these trainers yours"
            ],
            "hint": "Aren't these trainers ...?",
            "explanation": "'your trainers' menjadi 'Aren't these trainers yours?'."
          },
          {
            "q": "5. That is her dress. &rarr; [BLANK]",
            "answer": "That dress is hers.",
            "alternateAnswers": [
              "That dress is hers"
            ],
            "hint": "That dress is ...",
            "explanation": "'her dress' menjadi 'That dress is hers'."
          },
          {
            "q": "6. Are these their sandwiches? &rarr; [BLANK]",
            "answer": "Are these sandwiches theirs?",
            "alternateAnswers": [
              "Are these sandwiches theirs"
            ],
            "hint": "Are these sandwiches ...?",
            "explanation": "'their sandwiches' menjadi 'Are these sandwiches theirs?'."
          },
          {
            "q": "7. Is that his dog? &rarr; [BLANK]",
            "answer": "Is that dog his?",
            "alternateAnswers": [
              "Is that dog his"
            ],
            "hint": "Is that dog ...?",
            "explanation": "'his dog' menjadi 'Is that dog his?'."
          },
          {
            "q": "8. These are her sunglasses. &rarr; [BLANK]",
            "answer": "These sunglasses are hers.",
            "alternateAnswers": [
              "These sunglasses are hers"
            ],
            "hint": "These sunglasses are ...",
            "explanation": "'her sunglasses' menjadi 'These sunglasses are hers'."
          },
          {
            "q": "9. This is my new smartphone. &rarr; [BLANK]",
            "answer": "This new smartphone is mine.",
            "alternateAnswers": [
              "This new smartphone is mine"
            ],
            "hint": "This new smartphone is ...",
            "explanation": "'my new smartphone' menjadi 'This new smartphone is mine'."
          },
          {
            "q": "10. Is this your necklace? &rarr; [BLANK]",
            "answer": "Is this necklace yours?",
            "alternateAnswers": [
              "Is this necklace yours"
            ],
            "hint": "Is this necklace ...?",
            "explanation": "'your necklace' menjadi 'Is this necklace yours?'."
          },
          {
            "q": "11. Are these our exercise books? &rarr; [BLANK]",
            "answer": "Are these exercise books ours?",
            "alternateAnswers": [
              "Are these exercise books ours"
            ],
            "hint": "Are these exercise books ...?",
            "explanation": "'our exercise books' menjadi 'Are these exercise books ours?'."
          },
          {
            "q": "12. These are my notes from the lesson. &rarr; [BLANK]",
            "answer": "These notes from the lesson are mine.",
            "alternateAnswers": [
              "These notes from the lesson are mine"
            ],
            "hint": "These notes from the lesson are ...",
            "explanation": "'my notes from the lesson' diubah menjadi 'These notes from the lesson are mine'."
          }
        ]
      },
      {
        "id": "u1_ex6",
        "unitId": 1,
        "page": 4,
        "title": "Latihan 6: Lengkapi Percakapan dengan Kata Ganti Posesif",
        "instruction": "Ketik kata ganti posesif (mine, yours, his, hers, ours, theirs) yang tepat pada percakapan.",
        "type": "fill",
        "questions": [
          {
            "q": "1. A: Is this my pencil? B: No, this is my pencil. [BLANK] is on the desk.",
            "answer": "Yours",
            "alternateAnswers": [
              "yours"
            ],
            "hint": "Pensil milikmu ada di meja.",
            "explanation": "B menyatakan bahwa pensil lawan bicara ('Yours') ada di meja."
          },
          {
            "q": "2. A: Is that their car? B: No, [BLANK] is black.",
            "answer": "theirs",
            "alternateAnswers": [
              "Theirs"
            ],
            "hint": "Mobil milik mereka berwarna hitam.",
            "explanation": "Gunakan 'theirs' menggantikan 'their car'."
          },
          {
            "q": "3. That's her house and the motorbike over there is [BLANK], too.",
            "answer": "hers",
            "hint": "Sepeda motor itu milik dia perempuan juga.",
            "explanation": "Gunakan 'hers' menggantikan 'her motorbike'."
          },
          {
            "q": "4. A: Is that your notebook? B: Yes, it's [BLANK].",
            "answer": "mine",
            "hint": "Ya, itu milik saya.",
            "explanation": "Jawaban dari 'your notebook' adalah 'it's mine'."
          },
          {
            "q": "5. A: Is this his scarf? B: No, [BLANK] is brown.",
            "answer": "his",
            "hint": "Milik dia laki-laki berwarna cokelat.",
            "explanation": "Gunakan 'his' menggantikan 'his scarf'."
          },
          {
            "q": "6. Paul, this is my plate and that's [BLANK].",
            "answer": "yours",
            "hint": "Itu adalah piring milikmu.",
            "explanation": "Berbicara ke Paul, piringnya adalah 'yours'."
          },
          {
            "q": "7. A: Is that her new skirt? B: Yes, it's [BLANK].",
            "answer": "hers",
            "hint": "Ya, itu milik dia perempuan.",
            "explanation": "Gunakan 'hers' untuk menggantikan 'her new skirt'."
          },
          {
            "q": "8. A: Is this their cat? B: Yes, it's [BLANK].",
            "answer": "theirs",
            "hint": "Ya, itu kucing milik mereka.",
            "explanation": "Gunakan 'theirs' menggantikan 'their cat'."
          },
          {
            "q": "9. A: Are these your socks, Sally? B: No, they aren't [BLANK].",
            "answer": "mine",
            "hint": "Bukan milik saya.",
            "explanation": "Sally menyatakan bahwa kaus kaki tersebut bukan miliknya ('mine')."
          },
          {
            "q": "10. This isn't our camcorder; [BLANK] is very old.",
            "answer": "ours",
            "hint": "Milik kami sangat tua.",
            "explanation": "Gunakan 'ours' menggantikan 'our camcorder'."
          }
        ]
      },
      {
        "id": "u1_ex7",
        "unitId": 1,
        "page": 5,
        "title": "Latihan 7: Lengkapi Kalimat dengan Kata Sifat Posesif",
        "instruction": "Lengkapi kalimat dengan kata sifat posesif (my, your, his, her, its, our, their) yang tepat.",
        "type": "fill",
        "questions": [
          {
            "q": "1. Hello! My name is Simon and this is [BLANK] sister.",
            "answer": "my",
            "hint": "Saudari perempuan saya.",
            "explanation": "Simon memperkenalkan saudarinya: 'my sister'."
          },
          {
            "q": "2. That's Mrs Clark. [BLANK] first name is Linda.",
            "answer": "her",
            "alternateAnswers": [
              "Her"
            ],
            "hint": "Mrs Clark adalah perempuan.",
            "explanation": "Mrs Clark adalah perempuan, nama depannya adalah 'Her first name'."
          },
          {
            "q": "3. That girl is very nice and [BLANK] brother is nice too.",
            "answer": "her",
            "hint": "Saudara laki-laki gadis itu.",
            "explanation": "That girl (perempuan) menggunakan 'her brother'."
          },
          {
            "q": "4. We're Nicole and Mark and this is [BLANK] friend John.",
            "answer": "our",
            "hint": "Teman kami.",
            "explanation": "Nicole and Mark (kami/we) menggunakan 'our friend'."
          },
          {
            "q": "5. They're French, but [BLANK] father is German.",
            "answer": "their",
            "hint": "Ayah mereka.",
            "explanation": "Subjek 'they' memiliki ayah: 'their father'."
          },
          {
            "q": "6. Look at that car. One of [BLANK] tyres is flat.",
            "answer": "its",
            "hint": "Ban mobil tersebut.",
            "explanation": "Car adalah benda mati tunggal (it), bannya adalah 'its tyres'."
          },
          {
            "q": "7. I'm on a school trip with [BLANK] science class and teacher.",
            "answer": "my",
            "hint": "Kelas IPA saya.",
            "explanation": "Subjek 'I' menggunakan 'my science class'."
          },
          {
            "q": "8. Poor Mary! [BLANK] mother is ill in hospital.",
            "answer": "her",
            "alternateAnswers": [
              "Her"
            ],
            "hint": "Ibu Mary.",
            "explanation": "Mary adalah perempuan, jadi ibunya adalah 'Her mother'."
          },
          {
            "q": "9. There's Paul over there. He is with [BLANK] uncle.",
            "answer": "his",
            "hint": "Paman Paul.",
            "explanation": "Paul (he) bersama pamannya: 'his uncle'."
          },
          {
            "q": "10. Look at that house! [BLANK] windows are all broken.",
            "answer": "its",
            "alternateAnswers": [
              "Its"
            ],
            "hint": "Jendela rumah itu.",
            "explanation": "House adalah benda mati tunggal (it), jendelanya adalah 'its windows'."
          }
        ]
      },
      {
        "id": "u1_ex8",
        "unitId": 1,
        "page": 5,
        "title": "Latihan 8: Pertanyaan dan Jawaban Kepemilikan (Whose)",
        "instruction": "Pilihlah pasangan pertanyaan dan jawaban kepemilikan yang tepat sesuai kata kunci.",
        "type": "choice",
        "questions": [
          {
            "q": "1. Whose / these red socks / be? (I)",
            "options": [
              "A: Whose red socks are these? B: They are mine.",
              "A: Whose red socks is this? B: It is my.",
              "A: Who's red socks are these? B: They are me."
            ],
            "answer": "A: Whose red socks are these? B: They are mine.",
            "hint": "Socks adalah jamak (are these) dan kepemilikan orang pertama (mine).",
            "explanation": "Gunakan 'Whose red socks are these?' dan jawaban kata ganti posesif 'They are mine'."
          },
          {
            "q": "2. Whose / this book / be? (you)",
            "options": [
              "A: Whose book is this? B: It is yours.",
              "A: Whose book are these? B: They are yours.",
              "A: Who's book is this? B: It is your."
            ],
            "answer": "A: Whose book is this? B: It is yours.",
            "hint": "Book adalah tunggal (is this) dan kepemilikan orang kedua (yours).",
            "explanation": "'Whose book is this?' dijawab dengan 'It is yours'."
          },
          {
            "q": "3. Whose / this medicine / be? (they)",
            "options": [
              "A: Whose medicine is this? B: It is theirs.",
              "A: Whose medicine are these? B: They are their.",
              "A: Who's medicine is this? B: It is them."
            ],
            "answer": "A: Whose medicine is this? B: It is theirs.",
            "hint": "Medicine adalah uncountable/tunggal (is this) dan kepemilikan mereka (theirs).",
            "explanation": "'Whose medicine is this?' dijawab dengan 'It is theirs'."
          },
          {
            "q": "4. Whose / this MP3 player / be? (she)",
            "options": [
              "A: Whose MP3 player is this? B: It is hers.",
              "A: Whose MP3 player are these? B: It is her.",
              "A: Who's MP3 player is this? B: They are hers."
            ],
            "answer": "A: Whose MP3 player is this? B: It is hers.",
            "hint": "MP3 player tunggal, kepunyaan dia perempuan (hers).",
            "explanation": "'Whose MP3 player is this?' dijawab dengan 'It is hers'."
          },
          {
            "q": "5. Whose / this umbrella / be? (we)",
            "options": [
              "A: Whose umbrella is this? B: It is ours.",
              "A: Whose umbrella are these? B: It is our.",
              "A: Who's umbrella is this? B: They are ours."
            ],
            "answer": "A: Whose umbrella is this? B: It is ours.",
            "hint": "Umbrella tunggal, kepemilikan kami (ours).",
            "explanation": "'Whose umbrella is this?' dijawab dengan 'It is ours'."
          },
          {
            "q": "6. Whose / that digital camera / be? (I)",
            "options": [
              "A: Whose digital camera is that? B: It is mine.",
              "A: Whose digital camera are those? B: They are my.",
              "A: Who's digital camera is that? B: It is me."
            ],
            "answer": "A: Whose digital camera is that? B: It is mine.",
            "hint": "That digital camera tunggal, kepemilikan saya (mine).",
            "explanation": "'Whose digital camera is that?' dijawab dengan 'It is mine'."
          },
          {
            "q": "7. Whose / these jeans / be? (he)",
            "options": [
              "A: Whose jeans are these? B: They are his.",
              "A: Whose jeans is this? B: It is his.",
              "A: Who's jeans are these? B: They are him."
            ],
            "answer": "A: Whose jeans are these? B: They are his.",
            "hint": "Jeans selalu berbentuk jamak (are these), kepemilikan dia laki-laki (his).",
            "explanation": "Jeans selalu jamak, dijawab dengan 'They are his'."
          },
          {
            "q": "8. Whose / these parents / be? (your)",
            "options": [
              "A: Whose parents are these? B: They are ours.",
              "A: Whose parents is this? B: It is ours.",
              "A: Who's parents are these? B: They are your."
            ],
            "answer": "A: Whose parents are these? B: They are ours.",
            "hint": "Parents jamak, dijawab kepemilikan kami (ours).",
            "explanation": "'Whose parents are these?' dijawab dengan 'They are ours'."
          }
        ]
      },
      {
        "id": "u1_ex9",
        "unitId": 1,
        "page": 5,
        "title": "Latihan 9: Evaluasi Gabungan Kata Sifat & Kata Ganti Posesif",
        "instruction": "Pilihlah bentuk kata sifat atau kata ganti posesif yang tepat untuk melengkapi kalimat.",
        "type": "choice",
        "questions": [
          {
            "q": "1. Gary invited [BLANK] girlfriend out for dinner with us last night. She's a lovely girl.",
            "options": [
              "his",
              "him",
              "her",
              "he"
            ],
            "answer": "his",
            "hint": "Pacar Gary (laki-laki)",
            "explanation": "Gary adalah laki-laki, jadi pacarnya adalah 'his girlfriend'."
          },
          {
            "q": "2. The thief grabbed [BLANK] purse and ran away.",
            "options": [
              "her",
              "hers",
              "she",
              "his"
            ],
            "answer": "her",
            "hint": "Tas wanita korban pencurian",
            "explanation": "Purse (tas wanita) membutuhkan kata sifat posesif 'her purse'."
          },
          {
            "q": "3. I need a pen to sign [BLANK] name on this paper.",
            "options": [
              "my",
              "mine",
              "me",
              "I"
            ],
            "answer": "my",
            "hint": "Nama saya sendiri (I)",
            "explanation": "Subjek 'I' menandatangani 'my name'."
          },
          {
            "q": "4. A: Is this the magazine you bought yesterday? B: No, it's not [BLANK] magazine. [BLANK2] is over there on the table.",
            "options": [
              "my / Mine",
              "mine / My",
              "my / My",
              "mine / Mine"
            ],
            "answer": "my / Mine",
            "hint": "Pertama ada kata benda 'magazine', kedua berdiri sendiri.",
            "explanation": "Gunakan 'my magazine' lalu 'Mine is over there'."
          },
          {
            "q": "5. [BLANK] cake is delicious, Isabel.",
            "options": [
              "Your",
              "Yours",
              "You",
              "Her"
            ],
            "answer": "Your",
            "hint": "Kue buatanmu, Isabel.",
            "explanation": "Berbicara kepada Isabel: 'Your cake is delicious'."
          },
          {
            "q": "6. A: Is this your laptop, Mary? B: No, it's not [BLANK]. It's Sarah's. [BLANK2] is black and this is red, so it must be [BLANK3].",
            "options": [
              "mine / Mine / hers",
              "my / My / her",
              "mine / My / hers",
              "my / Mine / her"
            ],
            "answer": "mine / Mine / hers",
            "hint": "Ketiganya berdiri sendiri tanpa diikuti kata benda laptop.",
            "explanation": "Bukan milik saya (mine). Milik saya (Mine) hitam, jadi laptop ini milik Sarah (hers)."
          },
          {
            "q": "7. We always wash [BLANK] hands before meals.",
            "options": [
              "our",
              "ours",
              "we",
              "us"
            ],
            "answer": "our",
            "hint": "Tangan kami/kita (we).",
            "explanation": "Subjek 'we' mencuci 'our hands'."
          },
          {
            "q": "8. Can you lend me [BLANK] calculator, please?",
            "options": [
              "your",
              "yours",
              "you",
              "mine"
            ],
            "answer": "your",
            "hint": "Kalkulator milikmu.",
            "explanation": "Meminta pinjaman kalkulator milik lawan bicara: 'your calculator'."
          },
          {
            "q": "9. Peter, this is [BLANK] friend Alan.",
            "options": [
              "my",
              "mine",
              "me",
              "I"
            ],
            "answer": "my",
            "hint": "Teman saya.",
            "explanation": "Memperkenalkan teman penutur: 'my friend Alan'."
          },
          {
            "q": "10. A: Whose car is that? B: That's [BLANK]. John likes sports cars.",
            "options": [
              "his",
              "him",
              "he",
              "hers"
            ],
            "answer": "his",
            "hint": "Kepunyaan John (laki-laki).",
            "explanation": "John adalah laki-laki, jadi mobil itu adalah 'his'."
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "title": "Penggunaan have, can, dan could",
    "english_title": "Usage of have, can, and could",
    "category": "Verbs & Modals",
    "grammar": {
      "summary": "Kata kerja 'have' sering digunakan dalam kolokasi kegiatan sehari-hari. 'Can' digunakan untuk menyatakan kemampuan, meminta izin, atau kemungkinan di masa sekarang. 'Could' digunakan untuk kemampuan di masa lampau dan permintaan yang lebih sopan.",
      "tables": [
        {
          "title": "Kolokasi Umum Menggunakan have",
          "headers": [
            "Ungkapan",
            "Arti / Makna",
            "Contoh Kalimat"
          ],
          "rows": [
            [
              "have breakfast / lunch / dinner",
              "Makan pagi / siang / malam",
              "I have breakfast at 7 a.m."
            ],
            [
              "have a snack / a meal",
              "Makan cemilan / hidangan",
              "Let's have a snack."
            ],
            [
              "have a shower / bath",
              "Mandi shower / berendam",
              "She has a warm shower."
            ],
            [
              "have a rest / holiday",
              "Istirahat / liburan",
              "We had a wonderful holiday."
            ],
            [
              "have a chat / an argument",
              "Mengobrol / bertengkar",
              "They're having a quick chat."
            ],
            [
              "have a dream",
              "Bermimpi",
              "I had a strange dream last night."
            ]
          ]
        },
        {
          "title": "Penggunaan can dan could",
          "headers": [
            "Modal",
            "Fungsi",
            "Contoh"
          ],
          "rows": [
            [
              "can",
              "Kemampuan saat ini (ability)",
              "I can play the piano."
            ],
            [
              "can",
              "Meminta izin / tawaran (permission/offer)",
              "Can I borrow this book?"
            ],
            [
              "can",
              "Kemungkinan (possibility)",
              "You can buy sun cream here."
            ],
            [
              "could",
              "Kemampuan masa lalu (past ability)",
              "He could swim when he was 8."
            ],
            [
              "could",
              "Permintaan lebih sopan (polite request)",
              "Could you pass the salt, please?"
            ]
          ]
        }
      ],
      "rules": [
        "Jangan tertukar antara 'have' (kegiatan) dengan 'have got' (kepemilikan fisik). Bentuk negatif 'have' menggunakan don't/doesn't/didn't: 'She doesn't have a shower in the morning.'",
        "'can' dan 'could' TIDAK pernah berubah bentuk (tidak ada 'cans' atau 'coulds').",
        "'can' dan 'could' langsung diikuti oleh kata kerja dasar (infinitive without to): 'I can sing.' (BUKAN 'I can to sing')."
      ]
    },
    "exercises": [
      {
        "id": "u2_ex1",
        "unitId": 2,
        "page": 6,
        "title": "Latihan 1: Pilihan Kolokasi have yang Tepat (Hal 6)",
        "instruction": "Pilihlah jawaban a, b, atau c yang membentuk kolokasi yang benar dengan have.",
        "type": "choice",
        "questions": [
          {
            "q": "1. I usually have [BLANK] every morning before I go to school.",
            "options": [
              "a meal",
              "a snack",
              "breakfast"
            ],
            "answer": "breakfast",
            "hint": "Makan pagi sebelum berangkat sekolah",
            "explanation": "Sarapan di pagi hari adalah 'have breakfast'."
          },
          {
            "q": "2. Sometimes my brother and I have [BLANK] about whose turn it is to play on the computer.",
            "options": [
              "a talk",
              "an argument",
              "a chat"
            ],
            "answer": "an argument",
            "hint": "Pertengkaran atau perdebatan",
            "explanation": "Bertengkar mengenai giliran komputer adalah 'have an argument'."
          },
          {
            "q": "3. My family often has [BLANK] to somewhere hot during the summer.",
            "options": [
              "a holiday",
              "a rest",
              "a party"
            ],
            "answer": "a holiday",
            "hint": "Liburan ke tempat hangat saat musim panas",
            "explanation": "Berlibur adalah 'have a holiday'."
          },
          {
            "q": "4. I always know when my dog is having [BLANK] because he moves his legs in his sleep.",
            "options": [
              "a swim",
              "a look",
              "a dream"
            ],
            "answer": "a dream",
            "hint": "Bermimpi saat tidur",
            "explanation": "Bermimpi saat tidur adalah 'have a dream'."
          },
          {
            "q": "5. I hope Tom has [BLANK] on the plane. The weather is quite windy today.",
            "options": [
              "a fun time",
              "a good flight",
              "a nice meal"
            ],
            "answer": "a good flight",
            "hint": "Penerbangan di dalam pesawat",
            "explanation": "Penerbangan yang menyenangkan dan lancar adalah 'have a good flight'."
          },
          {
            "q": "6. Anna and I are having [BLANK] at the new Greek restaurant tonight.",
            "options": [
              "dinner",
              "lunch",
              "breakfast"
            ],
            "answer": "dinner",
            "hint": "Makan malam (tonight)",
            "explanation": "Makan di restoran pada malam hari adalah 'have dinner'."
          }
        ]
      },
      {
        "id": "u2_ex2",
        "unitId": 2,
        "page": 7,
        "title": "Latihan 2: Ungkapan have Berdasarkan Aktivitas (Hal 7)",
        "instruction": "Pilihlah ungkapan have yang tepat sesuai deskripsi kegiatan (a party, a holiday, a chat, an argument, breakfast, a meal, a bath, a dream).",
        "type": "choice",
        "questions": [
          {
            "q": "1. Menikmati makanan lezat di meja makan bersama keluarga &rarr; [BLANK]",
            "options": [
              "have a meal",
              "have a bath",
              "have a dream",
              "have a party"
            ],
            "answer": "have a meal",
            "hint": "Makan hidangan",
            "explanation": "Makan bersama di meja makan adalah 'have a meal'."
          },
          {
            "q": "2. Bayi yang sedang mandi air hangat di bak mandi &rarr; [BLANK]",
            "options": [
              "have a bath",
              "have a holiday",
              "have a chat",
              "have a meal"
            ],
            "answer": "have a bath",
            "hint": "Mandi di bak",
            "explanation": "Mandi berendam di bak mandi adalah 'have a bath'."
          },
          {
            "q": "3. Tidur lelap dan mengalami mimpi indah &rarr; [BLANK]",
            "options": [
              "have a dream",
              "have breakfast",
              "have an argument",
              "have a party"
            ],
            "answer": "have a dream",
            "hint": "Bermimpi",
            "explanation": "Bermimpi adalah 'have a dream'."
          },
          {
            "q": "4. Merayakan pesta bersama teman-teman dengan musik &rarr; [BLANK]",
            "options": [
              "have a party",
              "have a holiday",
              "have a meal",
              "have a chat"
            ],
            "answer": "have a party",
            "hint": "Pesta",
            "explanation": "Mengadakan pesta adalah 'have a party'."
          },
          {
            "q": "5. Bersantai di kursi pantai di bawah payung matahari &rarr; [BLANK]",
            "options": [
              "have a holiday",
              "have an argument",
              "have breakfast",
              "have a bath"
            ],
            "answer": "have a holiday",
            "hint": "Liburan di pantai",
            "explanation": "Berlibur adalah 'have a holiday'."
          },
          {
            "q": "6. Menyantap telur mata sapi, sereal, dan kopi di pagi hari &rarr; [BLANK]",
            "options": [
              "have breakfast",
              "have a dream",
              "have a meal",
              "have a chat"
            ],
            "answer": "have breakfast",
            "hint": "Sarapan pagi",
            "explanation": "Sarapan di pagi hari adalah 'have breakfast'."
          },
          {
            "q": "7. Dua orang pria berjas sedang berdebat sengit &rarr; [BLANK]",
            "options": [
              "have an argument",
              "have a chat",
              "have a party",
              "have a holiday"
            ],
            "answer": "have an argument",
            "hint": "Berdebat / bertengkar",
            "explanation": "Berdebat sengit adalah 'have an argument'."
          },
          {
            "q": "8. Dua orang wanita mengobrol santai sambil berjalan &rarr; [BLANK]",
            "options": [
              "have a chat",
              "have an argument",
              "have a meal",
              "have a dream"
            ],
            "answer": "have a chat",
            "hint": "Mengobrol santai",
            "explanation": "Mengobrol santai adalah 'have a chat'."
          }
        ]
      },
      {
        "id": "u2_ex3",
        "unitId": 2,
        "page": 7,
        "title": "Latihan 3: Lengkapi Kalimat dengan Ungkapan have (Hal 7)",
        "instruction": "Ketik bentuk have yang tepat (have a bath, have a nice meal, have a party, have a good flight, have a chat, have a look, have a good time, have a swim, have a rest, have a snack).",
        "type": "fill",
        "questions": [
          {
            "q": "1. I [BLANK] every day before work. I like to be clean.",
            "answer": "have a bath",
            "hint": "Mandi sebelum bekerja",
            "explanation": "Gunakan 'have a bath'."
          },
          {
            "q": "2. Did you [BLANK] at the Italian restaurant yesterday?",
            "answer": "have a nice meal",
            "alternateAnswers": [
              "have a meal"
            ],
            "hint": "Makan enak di restoran Italia",
            "explanation": "Gunakan 'have a nice meal'."
          },
          {
            "q": "3. Jenny [BLANK] every year for her birthday. They are always great!",
            "answer": "has a party",
            "hint": "Jenny (subjek tunggal ketiga) mengadakan pesta",
            "explanation": "Jenny (she) menggunakan 'has a party'."
          },
          {
            "q": "4. (At the airport) Hi John, did you [BLANK]?",
            "answer": "have a good flight",
            "hint": "Penerbangan yang menyenangkan",
            "explanation": "Menanyakan penerbangan di bandara: 'have a good flight'."
          },
          {
            "q": "5. Every time I meet Anne in the street we [BLANK].",
            "answer": "have a chat",
            "hint": "Mengobrol santai",
            "explanation": "Mengobrol saat berpapasan: 'have a chat'."
          },
          {
            "q": "6. Can I [BLANK] at the newspaper, please?",
            "answer": "have a look",
            "hint": "Melihat / membaca sekilas",
            "explanation": "'have a look at the newspaper' bermakna melihat koran sebentar."
          },
          {
            "q": "7. Did you [BLANK] in Spain?",
            "answer": "have a good time",
            "hint": "Bersenang-senang / menikmati waktu",
            "explanation": "Bersenang-senang saat liburan: 'have a good time'."
          },
          {
            "q": "8. Sam likes going to the swimming pool. He [BLANK] twice a week.",
            "answer": "has a swim",
            "hint": "Sam berenang dua kali seminggu",
            "explanation": "Sam (he) menggunakan 'has a swim'."
          },
          {
            "q": "9. Pam worked really hard yesterday. Did she [BLANK] when she came back home?",
            "answer": "have a rest",
            "hint": "Beristirahat setelah pulang",
            "explanation": "Setelah bekerja keras: 'have a rest'."
          },
          {
            "q": "10. [BLANK], if you are hungry.",
            "answer": "Have a snack",
            "alternateAnswers": [
              "have a snack"
            ],
            "hint": "Makan camilan jika lapar",
            "explanation": "Kalimat perintah: 'Have a snack, if you are hungry'."
          }
        ]
      },
      {
        "id": "u2_ex5",
        "unitId": 2,
        "page": 8,
        "title": "Latihan 5: Buat Pertanyaan dan Jawaban dengan can (Hal 8)",
        "instruction": "Pilihlah pasangan pertanyaan dan jawaban permintaan izin (can) yang tepat.",
        "type": "choice",
        "questions": [
          {
            "q": "1. have a snack",
            "options": [
              "A: Can I have a snack? B: Yes, you can.",
              "A: Could I having a snack? B: Yes, you can.",
              "A: Can I have a snack? B: No, you don't."
            ],
            "answer": "A: Can I have a snack? B: Yes, you can.",
            "hint": "Meminta camilan",
            "explanation": "Permintaan izin: 'Can I have a snack?' dijawab 'Yes, you can'."
          },
          {
            "q": "2. have another piece of cake",
            "options": [
              "A: Can I have another piece of cake? B: Yes, you can.",
              "A: Can I having another cake? B: Yes, I can.",
              "A: Can you have another piece of cake? B: Yes, you could."
            ],
            "answer": "A: Can I have another piece of cake? B: Yes, you can.",
            "hint": "Meminta sepotong kue lagi",
            "explanation": "'Can I have another piece of cake?' dijawab 'Yes, you can'."
          },
          {
            "q": "3. come tomorrow",
            "options": [
              "A: Can you come tomorrow? B: Yes, I can.",
              "A: Could you came tomorrow? B: Yes, I can.",
              "A: Can you coming tomorrow? B: No, I can."
            ],
            "answer": "A: Can you come tomorrow? B: Yes, I can.",
            "hint": "Bisa datang besok",
            "explanation": "'Can you come tomorrow?' dijawab 'Yes, I can.'"
          },
          {
            "q": "4. use your mobile",
            "options": [
              "A: Can I use your mobile? B: Yes, of course you can.",
              "A: Could I using your mobile? B: Yes, I do.",
              "A: Can I used your mobile? B: No, you couldn't."
            ],
            "answer": "A: Can I use your mobile? B: Yes, of course you can.",
            "hint": "Meminjam HP",
            "explanation": "Meminta izin memakai ponsel: 'Can I use your mobile?'."
          },
          {
            "q": "5. go away this weekend with my friends",
            "options": [
              "A: Can I go away this weekend with my friends? B: Yes, you can.",
              "A: Can you go away with friends? B: Yes, I could.",
              "A: Could I went away this weekend? B: No, you don't."
            ],
            "answer": "A: Can I go away this weekend with my friends? B: Yes, you can.",
            "hint": "Pergi akhir pekan bersama teman",
            "explanation": "'Can I go away this weekend with my friends?' dijawab 'Yes, you can.'"
          },
          {
            "q": "6. walk to school with you",
            "options": [
              "A: Can I walk to school with you? B: Yes, of course.",
              "A: Could I walked to school with you? B: Yes, I walk.",
              "A: Can I walking to school with you? B: Yes, you can."
            ],
            "answer": "A: Can I walk to school with you? B: Yes, of course.",
            "hint": "Berjalan ke sekolah bersamamu",
            "explanation": "'Can I walk to school with you?' dijawab 'Yes, of course.'"
          }
        ]
      },
      {
        "id": "u2_ex6",
        "unitId": 2,
        "page": 8,
        "title": "Latihan 6: Lengkapi dengan can atau can't (Hal 8)",
        "instruction": "Ketik can atau can't sesuai makna dan konteks kalimat.",
        "type": "fill",
        "questions": [
          {
            "q": "1. I'm sorry, I [BLANK] speak Chinese!",
            "answer": "can't",
            "alternateAnswers": [
              "cannot"
            ],
            "hint": "Maaf, saya tidak bisa berbicara bahasa Mandarin.",
            "explanation": "Permintaan maaf mengindikasikan ketidakmampuan: 'can't'."
          },
          {
            "q": "2. I [BLANK] understand a word of what he is saying.",
            "answer": "can't",
            "alternateAnswers": [
              "cannot"
            ],
            "hint": "Saya tidak bisa paham satu kata pun.",
            "explanation": "'can't understand a word' bermakna sama sekali tidak paham."
          },
          {
            "q": "3. I [BLANK] play the guitar, but I can't play the piano very well.",
            "answer": "can",
            "hint": "Saya bisa main gitar, TETAPI tidak bisa main piano.",
            "explanation": "Kata hubung kontras 'but' mengindikasikan bagian pertama bermakna positif: 'can'."
          },
          {
            "q": "4. [BLANK] you tell me the time, please?",
            "answer": "Can",
            "alternateAnswers": [
              "can"
            ],
            "hint": "Bisakah kamu memberi tahu saya jam berapa sekarang?",
            "explanation": "Permintaan sopan: 'Can you tell me the time, please?'."
          },
          {
            "q": "5. [BLANK] you help me with my heavy suitcase, please?",
            "answer": "Can",
            "alternateAnswers": [
              "can"
            ],
            "hint": "Bisakah kamu membantu saya membawakan koper berat ini?",
            "explanation": "Permintaan bantuan: 'Can you help me...?'."
          },
          {
            "q": "6. Why [BLANK] you come to the café with us?",
            "answer": "can't",
            "hint": "Kenapa kamu tidak bisa ikut ke kafe bersama kami?",
            "explanation": "Pertanyaan alasan tidak ikut: 'Why can't you come...?'."
          }
        ]
      },
      {
        "id": "u2_ex7",
        "unitId": 2,
        "page": 8,
        "title": "Latihan 7: Pilihan Tepat can vs could (Hal 8)",
        "instruction": "Pilihlah bentuk modal yang tepat antara masa kini (can/can't) atau masa lalu (could/couldn't).",
        "type": "choice",
        "questions": [
          {
            "q": "1. Look Mum! I [BLANK] play the guitar.",
            "options": [
              "can",
              "could"
            ],
            "answer": "can",
            "hint": "Masa kini (Look Mum!)",
            "explanation": "Tindakan yang sedang ditunjukkan saat ini memakai 'can'."
          },
          {
            "q": "2. He looked all over the house, but he [BLANK] find his watch.",
            "options": [
              "can't",
              "couldn't"
            ],
            "answer": "couldn't",
            "hint": "Perhatikan kata kerja 'looked' (lampau)",
            "explanation": "Karena kalimat berbentuk past tense ('looked'), maka gunakan 'couldn't'."
          },
          {
            "q": "3. [BLANK] you speak French when you were in primary school?",
            "options": [
              "Can",
              "Could"
            ],
            "answer": "Could",
            "hint": "Perhatikan klausa 'when you were in primary school' (masa lalu)",
            "explanation": "Kemampuan di masa lalu ('when you were') menuntut penggunaan 'Could'."
          },
          {
            "q": "4. Megan [BLANK] go out when she finishes her homework.",
            "options": [
              "can",
              "could"
            ],
            "answer": "can",
            "hint": "Izin di masa sekarang / mendatang",
            "explanation": "Megan diperbolehkan pergi saat menyelesaikan PR: 'can go out'."
          },
          {
            "q": "5. The T-shirt was wet so the boy [BLANK] wear it.",
            "options": [
              "can't",
              "couldn't"
            ],
            "answer": "couldn't",
            "hint": "Perhatikan kata kerja 'was' (lampau)",
            "explanation": "Bentuk lampau 'was wet' berpasangan dengan 'couldn't'."
          },
          {
            "q": "6. My father [BLANK] drive when he was 16.",
            "options": [
              "can",
              "could"
            ],
            "answer": "could",
            "hint": "Perhatikan 'when he was 16'",
            "explanation": "Kemampuan masa lalu saat berusia 16 tahun memakai 'could'."
          }
        ]
      },
      {
        "id": "u2_ex8",
        "unitId": 2,
        "page": 8,
        "title": "Latihan 8: Lengkapi dengan can, can't, could, atau couldn't",
        "instruction": "Ketik can, can't, could, atau couldn't sesuai konteks tenses kalimat.",
        "type": "fill",
        "questions": [
          {
            "q": "1. We [BLANK] hire a car and take a tour of the city. What do you think?",
            "answer": "can",
            "hint": "Usulan masa kini",
            "explanation": "Memberi usulan masa kini: 'We can hire a car...'."
          },
          {
            "q": "2. They [BLANK] get on the bus. They haven't got tickets.",
            "answer": "can't",
            "alternateAnswers": [
              "cannot"
            ],
            "hint": "Masa kini: mereka tidak punya tiket sekarang",
            "explanation": "Tidak punya tiket saat ini: 'can't get on the bus'."
          },
          {
            "q": "3. You [BLANK] borrow my computer. I don't need it at the moment.",
            "answer": "can",
            "hint": "Izin masa kini",
            "explanation": "Memberikan izin saat ini: 'You can borrow my computer'."
          },
          {
            "q": "4. [BLANK] you ride a bike when you were five?",
            "answer": "Could",
            "alternateAnswers": [
              "could"
            ],
            "hint": "Masa lalu (when you were five)",
            "explanation": "Kemampuan di masa kecil (when you were five) memakai 'Could'."
          },
          {
            "q": "5. The car park was full and I [BLANK] find a parking space.",
            "answer": "couldn't",
            "hint": "Masa lalu (was full)",
            "explanation": "Bentuk lampau (was full) memakai 'couldn't'."
          },
          {
            "q": "6. We don't have any Internet connection, so I [BLANK] check my emails.",
            "answer": "can't",
            "alternateAnswers": [
              "cannot"
            ],
            "hint": "Masa kini (don't have)",
            "explanation": "Kondisi masa kini (don't have) memakai 'can't'."
          }
        ]
      },
      {
        "id": "u2_ex11",
        "unitId": 2,
        "page": 9,
        "title": "Latihan 11: Respons Situasi dengan can atau can't (Hal 9)",
        "instruction": "Pilihlah ungkapan usulan (can) atau ketidakmungkinan (can't) yang tepat sesuai situasi.",
        "type": "choice",
        "questions": [
          {
            "q": "1. It's a sunny day. (go out for a walk)",
            "options": [
              "We can go out for a walk.",
              "We can't go out for a walk.",
              "Can we went for a walk?"
            ],
            "answer": "We can go out for a walk.",
            "hint": "Cuaca cerah, mari jalan-jalan",
            "explanation": "Cuaca cerah memungkinkan kita jalan-jalan: 'We can go out for a walk.'"
          },
          {
            "q": "2. There's a public transport strike. (go to work by car)",
            "options": [
              "We can go to work by car.",
              "We can't go to work by car.",
              "Can we went by car?"
            ],
            "answer": "We can go to work by car.",
            "hint": "Angkutan umum mogok, alternatifnya naik mobil",
            "explanation": "Sebagai solusi alternatif: 'We can go to work by car.'"
          },
          {
            "q": "3. Tina is very ill today. (come to work)",
            "options": [
              "She can't come to work.",
              "She can come to work.",
              "Can she comes to work?"
            ],
            "answer": "She can't come to work.",
            "hint": "Sakit parah, tidak bisa masuk kerja",
            "explanation": "Sakit parah mengakibatkan tidak bisa bekerja: 'She can't come to work.'"
          },
          {
            "q": "4. This place is very noisy. (you / speak louder)",
            "options": [
              "Can you speak louder?",
              "Can't you spoke louder?",
              "You can speak louder."
            ],
            "answer": "Can you speak louder?",
            "hint": "Tempat bising, tolong bicara lebih keras",
            "explanation": "Meminta lawan bicara bersuara lebih keras: 'Can you speak louder?'."
          },
          {
            "q": "5. Mr Wilkins is very busy at the moment. (see you now)",
            "options": [
              "He can't see you now.",
              "He can see you now.",
              "Can he saw you now?"
            ],
            "answer": "He can't see you now.",
            "hint": "Sedang sangat sibuk, tidak bisa menemui",
            "explanation": "Sangat sibuk saat ini: 'He can't see you now.'"
          },
          {
            "q": "6. My car broke down. (you / give me a ride)",
            "options": [
              "Can you give me a ride?",
              "Can I give you a ride?",
              "You can give me a ride."
            ],
            "answer": "Can you give me a ride?",
            "hint": "Mobil mogok, minta tumpangan",
            "explanation": "Meminta bantuan tumpangan: 'Can you give me a ride?'."
          },
          {
            "q": "7. I left my umbrella in the taxi. (borrow yours)",
            "options": [
              "Can I borrow yours?",
              "Can you borrow mine?",
              "I can't borrow yours."
            ],
            "answer": "Can I borrow yours?",
            "hint": "Payung tertinggal, bolehkah meminjam payungmu",
            "explanation": "Meminjam payung teman: 'Can I borrow yours?'."
          },
          {
            "q": "8. The girl over there is crying. (help her)",
            "options": [
              "Can we help her?",
              "She can't help us.",
              "We can't help her."
            ],
            "answer": "Can we help her?",
            "hint": "Anak gadis itu menangis, bisakah kita menolongnya",
            "explanation": "Menawarkan bantuan: 'Can we help her?'."
          },
          {
            "q": "9. I have no money. (lend me some)",
            "options": [
              "Can you lend me some?",
              "Can I lend you some?",
              "You can't lend me some."
            ],
            "answer": "Can you lend me some?",
            "hint": "Tidak punya uang, bisakah meminjamkan saya sedikit",
            "explanation": "Meminta pinjaman uang: 'Can you lend me some?'."
          },
          {
            "q": "10. The roads are very icy from the snow. (use our bike today)",
            "options": [
              "We can't use our bike today.",
              "We can use our bike today.",
              "Can we used our bike today?"
            ],
            "answer": "We can't use our bike today.",
            "hint": "Jalanan licin tertutup es, tidak bisa naik sepeda",
            "explanation": "Jalanan licin bersalju berbahaya: 'We can't use our bike today.'"
          }
        ]
      },
      {
        "id": "u2_ex12",
        "unitId": 2,
        "page": 9,
        "title": "Latihan 12: Pemahaman Bacaan Teks 'ABOUT ME: Graham' (Hal 9)",
        "instruction": "Pilihlah jawaban yang paling tepat berdasarkan teks profil Graham pada halaman 9.",
        "type": "choice",
        "questions": [
          {
            "q": "1. When does Graham have breakfast everyday?",
            "options": [
              "At 6:45 a.m.",
              "At 6:30 a.m.",
              "At 8:00 a.m."
            ],
            "answer": "At 6:45 a.m.",
            "hint": "Cari jam sarapan pada paragraf pertama.",
            "explanation": "Teks menyatakan: 'I usually get up and feed the dog, and then have breakfast at 6:45.'"
          },
          {
            "q": "2. What does Graham do after breakfast?",
            "options": [
              "He has a shower, gets dressed and leaves for school.",
              "He plays the guitar and rides his horse.",
              "He feeds the dog and swims."
            ],
            "answer": "He has a shower, gets dressed and leaves for school.",
            "hint": "Aktivitas setelah sarapan.",
            "explanation": "Teks: 'I have a shower at around 7:30 a.m and then I get dressed and leave for school at about 8:00 a.m.'"
          },
          {
            "q": "3. What hobbies and sport does he say he can do?",
            "options": [
              "He can play the guitar, ride a horse, and play football.",
              "He can scuba dive, play piano, and play tennis.",
              "He can play chess and sing."
            ],
            "answer": "He can play the guitar, ride a horse, and play football.",
            "hint": "Keahlian musik dan olahraga yang ia sebutkan.",
            "explanation": "Teks: 'I can play the guitar and I can also ride a horse too. I can play football really well.'"
          },
          {
            "q": "4. What couldn't he do when he was a child?",
            "options": [
              "He couldn't swim very well.",
              "He couldn't ride a horse.",
              "He couldn't play football."
            ],
            "answer": "He couldn't swim very well.",
            "hint": "Ketidakmampuan di masa kecil.",
            "explanation": "Teks: 'When I was younger, I couldn't swim very well, but now I'm an excellent swimmer.'"
          },
          {
            "q": "5. Where do Graham and his family usually have a holiday?",
            "options": [
              "In a country where they can scuba dive.",
              "In a big city with shopping malls.",
              "In the mountains for skiing."
            ],
            "answer": "In a country where they can scuba dive.",
            "hint": "Tempat liburan keluarga tahunan.",
            "explanation": "Teks: 'Every year we usually have a two-week family holiday in a country where we can scuba dive.'"
          },
          {
            "q": "6. What does he say about his holiday in Australia?",
            "options": [
              "They went to The Great Barrier Reef and it was amazing.",
              "They didn't like the weather.",
              "He got sick and couldn't swim."
            ],
            "answer": "They went to The Great Barrier Reef and it was amazing.",
            "hint": "Kesan liburan di Australia.",
            "explanation": "Teks: 'Last year, we went to The Great Barrier Reef in Australia. We had a really good time. It was amazing!'"
          }
        ]
      }
    ]
  },
  {
    "id": 3,
    "title": "Mengajak, Menerima, Menolak (Invitations & Suggestions)",
    "english_title": "Making, Accepting, and Refusing Invitations",
    "category": "Communication Skills",
    "grammar": {
      "summary": "Pola kalimat untuk mengajak seseorang melakukan kegiatan bersama, serta cara merespons ajakan tersebut dengan menerima atau menolak secara sopan.",
      "tables": [
        {
          "title": "Ungkapan Mengajak, Menerima, dan Menolak",
          "headers": [
            "Mengajak (Inviting/Suggesting)",
            "Menerima (Accepting)",
            "Menolak (Polite Refusing)"
          ],
          "rows": [
            [
              "Would you like to + Verb?",
              "Yes, I'd love to! / That sounds great!",
              "I'm sorry, I can't. I have to study."
            ],
            [
              "Let's + Verb",
              "Good idea! / Let's do that!",
              "I'd rather not. I'm really tired."
            ],
            [
              "How about + Verb-ing?",
              "Sure, why not? / Great!",
              "I'm afraid I'm busy then."
            ],
            [
              "Why don't we + Verb?",
              "That would be wonderful!",
              "Thanks for asking, but I have other plans."
            ]
          ]
        }
      ],
      "rules": [
        "'Would you like to' dan 'Why don't we' selalu diikuti kata kerja dasar (infinitive): 'Would you like to go to the cinema?'",
        "'How about' dan 'What about' SELALU diikuti oleh bentuk kata kerja -ing atau kata benda: 'How about having pizza?'",
        "Saat menolak ajakan dalam bahasa Inggris, biasakan selalu diawali permohonan maaf dan alasan yang masuk akal agar tetap sopan."
      ]
    },
    "exercises": [
      {
        "id": "u3_ex1",
        "unitId": 3,
        "page": 10,
        "title": "Latihan 1: Rangkai Kata Menjadi Kalimat Ajakan (Hal 10)",
        "instruction": "Pilihlah susunan kalimat ajakan yang benar dan gramatikal dari kata-kata acak.",
        "type": "choice",
        "questions": [
          {
            "q": "1. the / go / to / tonight / theatre / let's / !",
            "options": [
              "Let's go to the theatre tonight!",
              "Tonight let's the theatre go to!",
              "Let's to go theatre tonight!"
            ],
            "answer": "Let's go to the theatre tonight!",
            "hint": "Let's + verb 1...",
            "explanation": "Rumus: Let's + infinitif tanpa to ('go') + to the theatre tonight!"
          },
          {
            "q": "2. about / for / how / at / out / going / the weekend / a meal / ?",
            "options": [
              "How about going out for a meal at the weekend?",
              "How about at the weekend going out for meal?",
              "How going out for about a meal at weekend?"
            ],
            "answer": "How about going out for a meal at the weekend?",
            "hint": "How about + V-ing...",
            "explanation": "Rumus: How about + verb-ing ('going') + out for a meal at the weekend?"
          },
          {
            "q": "3. swimming / you / to / go / would / this afternoon / like / ?",
            "options": [
              "Would you like to go swimming this afternoon?",
              "Would like you to go swimming this afternoon?",
              "You would like to go swimming this afternoon?"
            ],
            "answer": "Would you like to go swimming this afternoon?",
            "hint": "Would you like to + verb...",
            "explanation": "Rumus: Would you like to go swimming this afternoon?"
          },
          {
            "q": "4. listen / we / some / to / don't / why / music / ?",
            "options": [
              "Why don't we listen to some music?",
              "Why we don't listen to some music?",
              "Why don't listen we some music to?"
            ],
            "answer": "Why don't we listen to some music?",
            "hint": "Why don't we + verb...",
            "explanation": "Rumus ajakan: Why don't we listen to some music?"
          },
          {
            "q": "5. holidays / you / like / to / what / over / the / would / summer / do / ?",
            "options": [
              "What would you like to do over the summer holidays?",
              "What you would like to do over the summer holidays?",
              "Would you like what to do over summer holidays?"
            ],
            "answer": "What would you like to do over the summer holidays?",
            "hint": "What would you like to do...",
            "explanation": "Rumus pertanyaan: What would you like to do over the summer holidays?"
          },
          {
            "q": "6. this evening / we / a / pizza / shall / for / order / dinner / ?",
            "options": [
              "Shall we order a pizza for dinner this evening?",
              "Shall we a pizza order for dinner this evening?",
              "We shall order a pizza for dinner this evening?"
            ],
            "answer": "Shall we order a pizza for dinner this evening?",
            "hint": "Shall we + verb...",
            "explanation": "Rumus usulan sopan: Shall we order a pizza for dinner this evening?"
          }
        ]
      },
      {
        "id": "u3_ex4",
        "unitId": 3,
        "page": 11,
        "title": "Latihan 4: Mengajak dan Menolak dengan Alasan (Hal 11)",
        "instruction": "Pilihlah pasangan ungkapan ajakan dan respons penolakan yang santun disertai alasan.",
        "type": "choice",
        "questions": [
          {
            "q": "1. rent a DVD tonight / am going out with my parents",
            "options": [
              "A: Let's rent a DVD tonight. B: Sorry, I can't. I'm going out with my parents tonight.",
              "A: Shall we rent DVD? B: No, I don't want.",
              "A: Let's renting a DVD. B: I can't rent."
            ],
            "answer": "A: Let's rent a DVD tonight. B: Sorry, I can't. I'm going out with my parents tonight.",
            "hint": "Let's rent... / Sorry, I can't...",
            "explanation": "Ajakan 'Let's rent a DVD tonight' ditolak dengan sopan: 'Sorry, I can't. I'm going out with my parents tonight.'"
          },
          {
            "q": "2. come with us to the mountains this weekend / must study for exams",
            "options": [
              "A: Would you like to come with us to the mountains this weekend? B: Sorry, I can't. I must study for exams.",
              "A: You come to mountains? B: No, study exams.",
              "A: Shall you coming to mountains? B: I must study."
            ],
            "answer": "A: Would you like to come with us to the mountains this weekend? B: Sorry, I can't. I must study for exams.",
            "hint": "Would you like to come... / Sorry, I can't...",
            "explanation": "Ajakan santun: 'Would you like to come with us...?' dijawab alasan ujian."
          },
          {
            "q": "3. play tennis on Sunday morning / go to church",
            "options": [
              "A: Shall we play tennis on Sunday morning? B: Sorry, I can't. I have to go to church.",
              "A: Let's playing tennis Sunday. B: No church.",
              "A: Why we don't play tennis? B: I go to church."
            ],
            "answer": "A: Shall we play tennis on Sunday morning? B: Sorry, I can't. I have to go to church.",
            "hint": "Shall we play... / I have to go to church",
            "explanation": "'Shall we play tennis on Sunday morning?' ditolak dengan alasan ke gereja."
          },
          {
            "q": "4. come to my house after school / must go to the dentist's",
            "options": [
              "A: Why don't you come to my house after school? B: Sorry, I can't. I must go to the dentist's.",
              "A: Why you don't come home? B: Dentist.",
              "A: Let's coming to my house. B: No dentist."
            ],
            "answer": "A: Why don't you come to my house after school? B: Sorry, I can't. I must go to the dentist's.",
            "hint": "Why don't you come... / dentist's",
            "explanation": "'Why don't you come to my house after school?' ditolak karena harus ke dokter gigi."
          },
          {
            "q": "5. go to the music festival / haven't got any tickets",
            "options": [
              "A: How about going to the music festival? B: I'd love to, but I haven't got any tickets.",
              "A: How about go to music festival? B: No ticket.",
              "A: Shall we going to festival? B: I don't ticket."
            ],
            "answer": "A: How about going to the music festival? B: I'd love to, but I haven't got any tickets.",
            "hint": "How about going... / haven't got any tickets",
            "explanation": "'How about going to the music festival?' ditolak karena tidak punya tiket."
          },
          {
            "q": "6. call him now / must do the cleaning up now",
            "options": [
              "A: Shall we call him now? B: Not now, I must do the cleaning up now.",
              "A: Let's calling him now. B: No cleaning.",
              "A: Why don't we to call him? B: I clean."
            ],
            "answer": "A: Shall we call him now? B: Not now, I must do the cleaning up now.",
            "hint": "Shall we call... / cleaning up",
            "explanation": "'Shall we call him now?' ditanggapi karena harus bersih-bersih."
          }
        ]
      },
      {
        "id": "u3_ex5",
        "unitId": 3,
        "page": 11,
        "title": "Latihan 5: Dengarkan Rekaman TR 3 dan Pilih Respons Tepat (Hal 11)",
        "instruction": "Pilihlah respons yang tepat untuk setiap usulan atau pertanyaan pada rekaman audio TR 3.",
        "type": "choice",
        "audioTrack": "TR 3",
        "questions": [
          {
            "q": "1. Would you like to go to the cinema?",
            "options": [
              "a. Yes, I like cinemas.",
              "b. No, I'd rather go bowling."
            ],
            "answer": "b. No, I'd rather go bowling.",
            "hint": "Penolakan dengan alternatif I'd rather...",
            "explanation": "Respons penolakan sopan dengan preferensi alternatif memakai 'I'd rather'."
          },
          {
            "q": "2. Let's have a picnic. It's a beautiful day.",
            "options": [
              "a. That's a great idea!",
              "b. Yes, if you want."
            ],
            "answer": "a. That's a great idea!",
            "hint": "Menerima ajakan dengan antusias",
            "explanation": "Menerima ajakan piknik: 'That's a great idea!'."
          },
          {
            "q": "3. What would you like to do at the weekend?",
            "options": [
              "a. Let's go swimming.",
              "b. Yes, I'm free at the weekend."
            ],
            "answer": "a. Let's go swimming.",
            "hint": "Memberi ide aktivitas",
            "explanation": "Menjawab pertanyaan rencana akhir pekan dengan mengusulkan: 'Let's go swimming.'"
          },
          {
            "q": "4. How about we go for coffee?",
            "options": [
              "a. Yes, OK.",
              "b. Yes, it's very nice."
            ],
            "answer": "a. Yes, OK.",
            "hint": "Menyetujui ajakan minum kopi",
            "explanation": "Persetujuan santai: 'Yes, OK.'"
          },
          {
            "q": "5. Why don't we go to the beach?",
            "options": [
              "a. I don't know. Why don't we?",
              "b. That sounds like a good idea."
            ],
            "answer": "b. That sounds like a good idea.",
            "hint": "Terdengar ide yang bagus",
            "explanation": "Menerima usulan ke pantai: 'That sounds like a good idea.'"
          },
          {
            "q": "6. How would you like your steak cooked?",
            "options": [
              "a. I like cooking steak.",
              "b. I'd like it well done, please."
            ],
            "answer": "b. I'd like it well done, please.",
            "hint": "Tingkat kematangan steak",
            "explanation": "Menjawab tingkat kematangan daging: 'I'd like it well done, please.'"
          }
        ]
      },
      {
        "id": "u3_ex6",
        "unitId": 3,
        "page": 12,
        "title": "Latihan 6: Buat Kalimat dengan like atau would like (Hal 12)",
        "instruction": "Pilihlah kalimat yang tepat antara menyatakan kesukaan umum (like) atau keinginan spesifik (would like).",
        "type": "choice",
        "questions": [
          {
            "q": "1. Jane has all the Coldplay albums.",
            "options": [
              "She likes Coldplay.",
              "She would like Coldplay."
            ],
            "answer": "She likes Coldplay.",
            "hint": "Kesukaan umum (hobi/favorit)",
            "explanation": "Memiliki semua album membuktikan ia suka (likes) band tersebut."
          },
          {
            "q": "2. Peter has more than twenty cookbooks.",
            "options": [
              "He likes cooking.",
              "He would like cooking."
            ],
            "answer": "He likes cooking.",
            "hint": "Hobi memasak secara umum",
            "explanation": "Punya lebih dari 20 buku resep menunjukkan ia suka memasak ('likes cooking')."
          },
          {
            "q": "3. My car is ten years old!",
            "options": [
              "I would like a new car.",
              "I like a new car."
            ],
            "answer": "I would like a new car.",
            "hint": "Keinginan memiliki mobil baru",
            "explanation": "Mobilnya sudah 10 tahun, jadi ia menginginkan mobil baru ('would like a new car')."
          },
          {
            "q": "4. Cathy thinks her house is very small.",
            "options": [
              "She would like a bigger house.",
              "She likes a bigger house."
            ],
            "answer": "She would like a bigger house.",
            "hint": "Keinginan rumah yang lebih besar",
            "explanation": "Rumahnya sempit, ia ingin rumah yang lebih besar ('would like a bigger house')."
          },
          {
            "q": "5. My children have four cats, three dogs, and a bird.",
            "options": [
              "They like animals.",
              "They would like animals."
            ],
            "answer": "They like animals.",
            "hint": "Penyayang binatang secara umum",
            "explanation": "Punya banyak hewan peliharaan menunjukkan mereka suka hewan ('like animals')."
          },
          {
            "q": "6. There's a good film on TV tonight.",
            "options": [
              "I would like to watch it.",
              "I like to watch it."
            ],
            "answer": "I would like to watch it.",
            "hint": "Keinginan menonton film malam ini",
            "explanation": "Keinginan spesifik malam ini memakai 'would like to watch it'."
          },
          {
            "q": "7. Simon buys a lot of music from the Internet.",
            "options": [
              "He likes music.",
              "He would like music."
            ],
            "answer": "He likes music.",
            "hint": "Kesukaan terhadap musik",
            "explanation": "Membeli banyak musik menunjukkan ia suka musik ('likes music')."
          },
          {
            "q": "8. I don't want to go out tonight.",
            "options": [
              "I would like to stay at home.",
              "I like to stay at home."
            ],
            "answer": "I would like to stay at home.",
            "hint": "Keinginan berada di rumah malam ini",
            "explanation": "Pilihan spesifik malam ini memakai 'would like to stay at home'."
          },
          {
            "q": "9. Tom and Lisa always have a winter holiday.",
            "options": [
              "They like skiing.",
              "They would like skiing."
            ],
            "answer": "They like skiing.",
            "hint": "Kebiasaan liburan musim dingin",
            "explanation": "Kebiasaan rutin liburan musim dingin: 'They like skiing'."
          },
          {
            "q": "10. Lucy wants to try Japanese food at the new restaurant in town.",
            "options": [
              "She would like to eat sushi.",
              "She likes to eat sushi."
            ],
            "answer": "She would like to eat sushi.",
            "hint": "Keinginan mencoba makanan Jepang",
            "explanation": "Keinginan mencoba makanan baru: 'She would like to eat sushi'."
          }
        ]
      },
      {
        "id": "u3_ex7",
        "unitId": 3,
        "page": 12,
        "title": "Latihan 7: Ajak Teman dengan would you like to... Menerima Ajakan (Hal 12)",
        "instruction": "Pilihlah pasangan ajakan dan penerimaan ajakan yang tepat.",
        "type": "choice",
        "questions": [
          {
            "q": "1. watch a sci-fi film",
            "options": [
              "A: Would you like to watch a sci-fi film? B: Yes, I'd love to.",
              "A: Do you like watch sci-fi film? B: Yes, I like.",
              "A: Would you like watching a film? B: No, I don't."
            ],
            "answer": "A: Would you like to watch a sci-fi film? B: Yes, I'd love to.",
            "hint": "Would you like to watch... / Yes, I'd love to.",
            "explanation": "Ajakan sopan memakai 'Would you like to watch...?' dan diterima dengan 'Yes, I'd love to.'"
          },
          {
            "q": "2. order a takeaway",
            "options": [
              "A: Would you like to order a takeaway? B: Yes, that sounds great.",
              "A: Do you like ordering takeaway? B: Yes, I order.",
              "A: Would you liking a takeaway? B: Yes, I do."
            ],
            "answer": "A: Would you like to order a takeaway? B: Yes, that sounds great.",
            "hint": "Would you like to order... / Yes, that sounds great.",
            "explanation": "'Would you like to order a takeaway?' dijawab 'Yes, that sounds great.'"
          },
          {
            "q": "3. listen to music",
            "options": [
              "A: Would you like to listen to music? B: Yes, I'd love to.",
              "A: Do you listen to music? B: Yes, I listen.",
              "A: Would you like listening music? B: Yes, I would."
            ],
            "answer": "A: Would you like to listen to music? B: Yes, I'd love to.",
            "hint": "Would you like to listen... / Yes, I'd love to.",
            "explanation": "'Would you like to listen to music?' dijawab 'Yes, I'd love to.'"
          },
          {
            "q": "4. go shopping with me next Saturday",
            "options": [
              "A: Would you like to go shopping with me next Saturday? B: Yes, I'd love to.",
              "A: Do you like go shopping next Saturday? B: Yes, I like.",
              "A: Shall you go shopping with me? B: Yes, I do."
            ],
            "answer": "A: Would you like to go shopping with me next Saturday? B: Yes, I'd love to.",
            "hint": "Would you like to go shopping... / Yes, I'd love to.",
            "explanation": "'Would you like to go shopping with me next Saturday?' diterima dengan antusias."
          },
          {
            "q": "5. try my new car",
            "options": [
              "A: Would you like to try my new car? B: Yes, please.",
              "A: Do you like trying my car? B: Yes, I try.",
              "A: Would you to try my car? B: Yes, I like."
            ],
            "answer": "A: Would you like to try my new car? B: Yes, please.",
            "hint": "Would you like to try... / Yes, please.",
            "explanation": "'Would you like to try my new car?' dijawab sopan 'Yes, please.'"
          },
          {
            "q": "6. go ice skating this afternoon",
            "options": [
              "A: Would you like to go ice skating this afternoon? B: Yes, that would be wonderful.",
              "A: Do you like go ice skating? B: Yes, I do.",
              "A: Would you like going ice skating? B: Yes, wonderful."
            ],
            "answer": "A: Would you like to go ice skating this afternoon? B: Yes, that would be wonderful.",
            "hint": "Would you like to go ice skating... / that would be wonderful.",
            "explanation": "'Would you like to go ice skating this afternoon?' diterima dengan 'Yes, that would be wonderful.'"
          }
        ]
      },
      {
        "id": "u3_ex8",
        "unitId": 3,
        "page": 12,
        "title": "Latihan 8: Menolak & Memberi Alternatif dengan I'd rather (Hal 12)",
        "instruction": "Pilihlah pasangan kalimat yang menolak ajakan dan memberikan usulan alternatif menggunakan I'd rather.",
        "type": "choice",
        "questions": [
          {
            "q": "1. go to the cinema on Saturday afternoon / go to the cinema Saturday night",
            "options": [
              "A: Would you like to go to the cinema on Saturday afternoon? B: I'd rather go on Saturday night.",
              "A: Do you go to cinema Saturday? B: I prefer Saturday.",
              "A: Shall we going Saturday afternoon? B: No Saturday."
            ],
            "answer": "A: Would you like to go to the cinema on Saturday afternoon? B: I'd rather go on Saturday night.",
            "hint": "I'd rather + verb 1...",
            "explanation": "Menolak dan memberi alternatif: 'I'd rather go on Saturday night.'"
          },
          {
            "q": "2. have a seat / stand up",
            "options": [
              "A: Would you like to have a seat? B: I'd rather stand up.",
              "A: Do you like sitting? B: I stand.",
              "A: Would you like to sit? B: No, sitting."
            ],
            "answer": "A: Would you like to have a seat? B: I'd rather stand up.",
            "hint": "I'd rather stand up.",
            "explanation": "Menolak duduk dan memilih berdiri: 'I'd rather stand up.'"
          },
          {
            "q": "3. go skiing this weekend / go to the beach",
            "options": [
              "A: Would you like to go skiing this weekend? B: I'd rather go to the beach.",
              "A: Do you go skiing? B: Beach is better.",
              "A: Let's skiing. B: I don't skiing."
            ],
            "answer": "A: Would you like to go skiing this weekend? B: I'd rather go to the beach.",
            "hint": "I'd rather go to the beach.",
            "explanation": "Memilih ke pantai daripada main ski: 'I'd rather go to the beach.'"
          },
          {
            "q": "4. travel by train / travel by bus",
            "options": [
              "A: Would you like to travel by train? B: I'd rather travel by bus.",
              "A: Do you like travel train? B: Bus please.",
              "A: Shall we to travel by train? B: Rather bus."
            ],
            "answer": "A: Would you like to travel by train? B: I'd rather travel by bus.",
            "hint": "I'd rather travel by bus.",
            "explanation": "Memilih naik bus: 'I'd rather travel by bus.'"
          },
          {
            "q": "5. have something to eat / have something to drink",
            "options": [
              "A: Would you like to have something to eat? B: I'd rather have something to drink.",
              "A: Do you like eating? B: I drink.",
              "A: Shall you eating? B: Rather drink."
            ],
            "answer": "A: Would you like to have something to eat? B: I'd rather have something to drink.",
            "hint": "I'd rather have something to drink.",
            "explanation": "Memilih minum daripada makan: 'I'd rather have something to drink.'"
          },
          {
            "q": "6. go for a walk / go for a bike ride",
            "options": [
              "A: Would you like to go for a walk? B: I'd rather go for a bike ride.",
              "A: Do you walk? B: I bike.",
              "A: Let's walking. B: Rather biking."
            ],
            "answer": "A: Would you like to go for a walk? B: I'd rather go for a bike ride.",
            "hint": "I'd rather go for a bike ride.",
            "explanation": "Memilih bersepeda daripada jalan kaki: 'I'd rather go for a bike ride.'"
          }
        ]
      },
      {
        "id": "u3_ex9",
        "unitId": 3,
        "page": 13,
        "title": "Latihan 9: Lengkapi Percakapan Janet & Laura (TR 4)",
        "instruction": "Pilihlah kalimat yang tepat untuk melengkapi bagian dialog Janet sesuai rekaman TR 4.",
        "type": "choice",
        "audioTrack": "TR 4",
        "questions": [
          {
            "q": "1. Laura: Hi, Janet. It's Laura. How are you? &rarr; Janet (1): [BLANK]",
            "options": [
              "Hello.",
              "Bye.",
              "Great!"
            ],
            "answer": "Hello.",
            "hint": "Menjawab telepon pertama kali.",
            "explanation": "Janet menyapa di awal telepon: 'Hello.'"
          },
          {
            "q": "2. Laura: How are you? &rarr; Janet (2): [BLANK]",
            "options": [
              "Fine, thanks.",
              "What time do you think we'll be back?",
              "OK. I'd love to come."
            ],
            "answer": "Fine, thanks.",
            "hint": "Kabar baik.",
            "explanation": "Menjawab kabar: 'Fine, thanks.'"
          },
          {
            "q": "3. Laura: Are you busy on Tuesday afternoon? &rarr; Janet (3): [BLANK]",
            "options": [
              "Mmm. Well, I usually do my homework. Why?",
              "Bye.",
              "Where do you want to go?"
            ],
            "answer": "Mmm. Well, I usually do my homework. Why?",
            "hint": "Biasanya mengerjakan PR.",
            "explanation": "Janet menjelaskan jadwalnya: 'Mmm. Well, I usually do my homework. Why?'"
          },
          {
            "q": "4. Laura: Would you like to come shopping with me? &rarr; Janet (4): [BLANK]",
            "options": [
              "OK. I'd love to come.",
              "Fine, thanks.",
              "Hello."
            ],
            "answer": "OK. I'd love to come.",
            "hint": "Menerima ajakan belanja.",
            "explanation": "Menerima ajakan belanja Laura: 'OK. I'd love to come.'"
          },
          {
            "q": "5. Laura: I'd like a new winter coat. &rarr; Janet (5): [BLANK]",
            "options": [
              "What do you want to buy?",
              "Where do you want to go?",
              "Bye."
            ],
            "answer": "What do you want to buy?",
            "hint": "Menanyakan barang yang mau dibeli.",
            "explanation": "Sebelum Laura menyebut coat, Janet bertanya: 'What do you want to buy?'"
          },
          {
            "q": "6. Laura: I was thinking of going to the town centre. &rarr; Janet (6): [BLANK]",
            "options": [
              "Where do you want to go?",
              "Hello.",
              "Fine, thanks."
            ],
            "answer": "Where do you want to go?",
            "hint": "Menanyakan tujuan tempat.",
            "explanation": "Janet menanyakan tempat tujuan: 'Where do you want to go?'"
          },
          {
            "q": "7. Laura: I'm not sure. Maybe around six. &rarr; Janet (7): [BLANK]",
            "options": [
              "What time do you think we'll be back?",
              "Bye.",
              "OK. I'd love to come."
            ],
            "answer": "What time do you think we'll be back?",
            "hint": "Menanyakan jam pulang.",
            "explanation": "Laura menjawab jam 6 karena Janet bertanya: 'What time do you think we'll be back?'"
          },
          {
            "q": "8. Laura: See you at school tomorrow. &rarr; Janet (8): [BLANK]",
            "options": [
              "OK. I'll study when I get home then.",
              "What do you want to buy?",
              "Hello."
            ],
            "answer": "OK. I'll study when I get home then.",
            "hint": "Belajar setelah pulang.",
            "explanation": "Janet menyanggupi waktu belajar: 'OK. I'll study when I get home then.'"
          },
          {
            "q": "9. Laura: Bye. &rarr; Janet (9): [BLANK]",
            "options": [
              "Bye.",
              "Hello.",
              "Fine, thanks."
            ],
            "answer": "Bye.",
            "hint": "Salam perpisahan di akhir telepon.",
            "explanation": "Menutup telepon: 'Bye.'"
          }
        ]
      },
      {
        "id": "u3_ex10",
        "unitId": 3,
        "page": 13,
        "title": "Latihan 10: Lengkapi Percakapan Alice & Jason (TR 5)",
        "instruction": "Pilihlah frasa yang tepat untuk melengkapi bagian kosong percakapan Alice & Jason.",
        "type": "choice",
        "audioTrack": "TR 5",
        "questions": [
          {
            "q": "1. Alice: Hi, Jason. (1) [BLANK]?",
            "options": [
              "How are you",
              "Where",
              "Fine"
            ],
            "answer": "How are you",
            "hint": "Menanyakan kabar.",
            "explanation": "Alice menanyakan kabar Jason: 'How are you?'."
          },
          {
            "q": "2. Jason: (2) [BLANK], thanks.",
            "options": [
              "Fine",
              "pizza",
              "good idea"
            ],
            "answer": "Fine",
            "hint": "Baik-baik saja.",
            "explanation": "Jason menjawab kabar: 'Fine, thanks.'"
          },
          {
            "q": "3. Jason: (3) [BLANK] for Friday?",
            "options": [
              "Have you got any plans",
              "Would you like",
              "Let's meet"
            ],
            "answer": "Have you got any plans",
            "hint": "Apakah punya rencana hari Jumat?",
            "explanation": "Menanyakan rencana hari Jumat: 'Have you got any plans for Friday?'."
          },
          {
            "q": "4. Jason: I (4) [BLANK] two tickets for that new West End show, Bright Lights.",
            "options": [
              "'ve got",
              "art gallery",
              "four hours"
            ],
            "answer": "'ve got",
            "hint": "Saya punya dua tiket.",
            "explanation": "Jason memiliki 2 tiket: 'I've got two tickets...'"
          },
          {
            "q": "5. Jason: (5) [BLANK] to come with me?",
            "options": [
              "Would you like",
              "How are you",
              "Where"
            ],
            "answer": "Would you like",
            "hint": "Maukah kamu ikut bersamaku?",
            "explanation": "Mengajak Alice: 'Would you like to come with me?'."
          },
          {
            "q": "6. Jason: I waited in line for (6) [BLANK]!",
            "options": [
              "four hours",
              "pizza",
              "Friday"
            ],
            "answer": "four hours",
            "hint": "Mengantre selama 4 jam.",
            "explanation": "Jason mengantre tiket: 'for four hours!'."
          },
          {
            "q": "7. Alice: (7) [BLANK] shall we meet?",
            "options": [
              "Where",
              "Fine",
              "'ve got"
            ],
            "answer": "Where",
            "hint": "Di mana kita akan bertemu?",
            "explanation": "Menanyakan lokasi bertemu: 'Where shall we meet?'."
          },
          {
            "q": "8. Jason: (8) [BLANK] in front of the art gallery at 3 o'clock.",
            "options": [
              "Let's meet",
              "Would you like",
              "Have you got any plans"
            ],
            "answer": "Let's meet",
            "hint": "Mari kita bertemu di depan galeri seni.",
            "explanation": "Menentukan pertemuan: 'Let's meet in front of...'"
          },
          {
            "q": "9. Jason: in front of the (9) [BLANK] at 3 o'clock.",
            "options": [
              "art gallery",
              "pizza",
              "four hours"
            ],
            "answer": "art gallery",
            "hint": "Galeri seni.",
            "explanation": "Lokasi pertemuan: 'the art gallery'."
          },
          {
            "q": "10. Jason: That's a (10) [BLANK]! Do you like pizza?",
            "options": [
              "good idea",
              "Fine",
              "Where"
            ],
            "answer": "good idea",
            "hint": "Ide yang bagus!",
            "explanation": "Jason menyetujui ajakan makan: 'That's a good idea!'."
          },
          {
            "q": "11. Alice: Yes, I love it. It's my favourite food. (Menjawab tawaran makan (11) [BLANK])",
            "options": [
              "pizza",
              "art gallery",
              "four hours"
            ],
            "answer": "pizza",
            "hint": "Makanan favorit Alice.",
            "explanation": "Alice sangat menyukai pizza."
          },
          {
            "q": "12. Jason: See you on (12) [BLANK]!",
            "options": [
              "Friday",
              "pizza",
              "good idea"
            ],
            "answer": "Friday",
            "hint": "Hari pertunjukan.",
            "explanation": "Janji bertemu di hari Jumat: 'See you on Friday!'."
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "Bentuk Masa Depan: be going to",
    "english_title": "Future Form: be going to",
    "category": "Tenses & Future",
    "grammar": {
      "summary": "Struktur 'be going to' digunakan untuk menyatakan rencana/niat yang telah diputuskan sebelum berbicara, serta untuk ramalan masa depan berdasarkan bukti nyata saat ini.",
      "tables": [
        {
          "title": "Rumus be going to",
          "headers": [
            "Bentuk",
            "Pola Kalimat",
            "Contoh"
          ],
          "rows": [
            [
              "Positif (+)",
              "Subject + am/is/are + going to + V1",
              "She is going to cut her hair tomorrow."
            ],
            [
              "Negatif (-)",
              "Subject + am/is/are + not + going to + V1",
              "We are not going to travel by plane."
            ],
            [
              "Tanya (?)",
              "Am/Is/Are + Subject + going to + V1?",
              "Are you going to visit your grandparents?"
            ]
          ]
        }
      ],
      "rules": [
        "Gunakan 'be going to' untuk rencana yang SUDAH diniatkan sebelumnya: 'I am going to buy a new laptop next month.'",
        "Gunakan 'be going to' untuk prediksi dengan bukti yang terlihat jelas di depan mata: 'Look at those dark clouds! It is going to rain.'",
        "Jangan lupa menyertakan to be (am/is/are) sebelum 'going to'."
      ]
    },
    "exercises": [
      {
        "id": "u4_ex1",
        "title": "Latihan: Melengkapi Kalimat be going to",
        "instruction": "Pilihlah bentuk be going to yang benar sesuai subjek dan konteks.",
        "type": "choice",
        "questions": [
          {
            "q": "Look at the sky! It is very dark. It [BLANK] rain.",
            "options": [
              "is going to",
              "are going to",
              "am going to",
              "will going to"
            ],
            "answer": "is going to",
            "explanation": "Subjek 'It' menggunakan to be 'is', dan merupakan prediksi berdasarkan bukti awan gelap."
          },
          {
            "q": "They [BLANK] a new lesson next Monday.",
            "options": [
              "are going to have",
              "is going to have",
              "going to have",
              "are going to having"
            ],
            "answer": "are going to have",
            "explanation": "Subjek 'They' berpasangan dengan to be 'are' + going to + V1 ('have')."
          },
          {
            "q": "Hannah [BLANK] the letter before she goes to work.",
            "options": [
              "is going to post",
              "are going to post",
              "post",
              "going to post"
            ],
            "answer": "is going to post",
            "explanation": "Subjek tunggal 'Hannah' menggunakan 'is going to post'."
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "title": "Kata Ganti Refleksif (Reflexive Pronouns)",
    "english_title": "Reflexive Pronouns",
    "category": "Pronouns & Determiners",
    "grammar": {
      "summary": "Kata ganti refleksif digunakan ketika subjek dan objek kalimat adalah orang/hal yang sama, atau untuk memberi penekanan bahwa perbuatan dilakukan sendiri (by myself = alone).",
      "tables": [
        {
          "title": "Daftar Kata Ganti Refleksif",
          "headers": [
            "Subjek",
            "Reflexive Pronoun (Tunggal)",
            "Reflexive Pronoun (Jamak)"
          ],
          "rows": [
            [
              "I",
              "myself",
              "-"
            ],
            [
              "You",
              "yourself",
              "yourselves"
            ],
            [
              "He",
              "himself",
              "-"
            ],
            [
              "She",
              "herself",
              "-"
            ],
            [
              "It",
              "itself",
              "-"
            ],
            [
              "We",
              "-",
              "ourselves"
            ],
            [
              "They",
              "-",
              "themselves"
            ]
          ]
        }
      ],
      "rules": [
        "Gunakan kata ganti refleksif saat subjek melakukan aksi terhadap dirinya sendiri: 'Tony cut himself with the scissors.'",
        "Kata kerja yang sering berpasangan: hurt, enjoy, introduce, teach, look at.",
        "'by + reflexive pronoun' bermakna sendiri tanpa bantuan: 'She cooked the dinner by herself.'"
      ]
    },
    "exercises": [
      {
        "id": "u5_ex1",
        "title": "Latihan: Kata Ganti Refleksif",
        "instruction": "Pilihlah kata ganti refleksif yang benar.",
        "type": "choice",
        "questions": [
          {
            "q": "Tony cut [BLANK] with the scissors while cutting paper.",
            "options": [
              "himself",
              "herself",
              "itself",
              "myself"
            ],
            "answer": "himself",
            "explanation": "Tony adalah laki-laki tunggal (he) -> himself."
          },
          {
            "q": "The girl fell off her bike, but she didn't hurt [BLANK].",
            "options": [
              "herself",
              "himself",
              "yourself",
              "themselves"
            ],
            "answer": "herself",
            "explanation": "The girl adalah perempuan tunggal (she) -> herself."
          },
          {
            "q": "William and Jeff climbed to the top of the mountain by [BLANK].",
            "options": [
              "themselves",
              "ourselves",
              "yourselves",
              "himself"
            ],
            "answer": "themselves",
            "explanation": "William and Jeff adalah mereka (they) -> themselves."
          },
          {
            "q": "It's not our fault. We shouldn't blame [BLANK].",
            "options": [
              "ourselves",
              "themselves",
              "myself",
              "yourself"
            ],
            "answer": "ourselves",
            "explanation": "Subjek 'We' menggunakan 'ourselves'."
          }
        ]
      }
    ]
  },
  {
    "id": 6,
    "title": "Penggunaan to get",
    "english_title": "Usage of to get",
    "category": "Verbs & Collocations",
    "grammar": {
      "summary": "Kata kerja 'get' adalah salah satu kata kerja paling fleksibel dalam bahasa Inggris dengan berbagai makna: berubah keadaan (become), menerima/memperoleh (receive/obtain), dan tiba/sampai (arrive).",
      "tables": [
        {
          "title": "Tiga Makna Utama 'to get'",
          "headers": [
            "Makna",
            "Penjelasan",
            "Contoh"
          ],
          "rows": [
            [
              "Become (Berubah)",
              "get + adjective",
              "get tired, get dark, get old, get angry, get cold"
            ],
            [
              "Receive / Obtain (Menerima)",
              "get + noun",
              "get an email, get a present, get a job, get tickets"
            ],
            [
              "Arrive (Tiba/Sampai)",
              "get + to + place",
              "get home, get to school, get to the station"
            ]
          ]
        }
      ],
      "rules": [
        "Bentuk lampau dari 'get' adalah 'got', bentuk ketiga (past participle) adalah 'got' (UK) atau 'gotten' (US).",
        "Frasa 'get home' TIDAK memakai 'to' (BUKAN get to home).",
        "Phrasal verb umum: get up (bangun tidur), get on/off (naik/turun kendaraan umum), get out of (keluar)."
      ]
    },
    "exercises": [
      {
        "id": "u6_ex1",
        "title": "Latihan: Makna dan Penggunaan to get",
        "instruction": "Pilih jawaban yang benar untuk melengkapi kalimat dengan kata get/got.",
        "type": "choice",
        "questions": [
          {
            "q": "Put on your jacket. It's [BLANK] cold outside.",
            "options": [
              "getting",
              "having",
              "taking",
              "making"
            ],
            "answer": "getting",
            "explanation": "'getting cold' bermakna sedang menjadi dingin (become)."
          },
          {
            "q": "Did you [BLANK] the email I sent you this morning?",
            "options": [
              "get",
              "gets",
              "got",
              "getting"
            ],
            "answer": "get",
            "explanation": "Did + subject + V1 ('get') bermakna menerima (receive)."
          },
          {
            "q": "What time do you usually [BLANK] home after school?",
            "options": [
              "get",
              "get to",
              "got",
              "getting to"
            ],
            "answer": "get",
            "explanation": "Kata 'home' langsung diawali 'get' tanpa preposisi 'to'."
          }
        ]
      }
    ]
  },
  {
    "id": 7,
    "title": "could (Kemampuan Masa Lalu & Kesopanan)",
    "english_title": "could: Past Ability, Polite Requests, Possibility",
    "category": "Verbs & Modals",
    "grammar": {
      "summary": "'Could' digunakan untuk menyatakan kemampuan umum di masa lampau, meminta bantuan dengan santun, atau menyatakan kemungkinan.",
      "tables": [
        {
          "title": "Fungsi could",
          "headers": [
            "Fungsi",
            "Pola",
            "Contoh"
          ],
          "rows": [
            [
              "Past Ability",
              "Subject + could + V1",
              "I could swim when I was six."
            ],
            [
              "Polite Request",
              "Could you + V1...?",
              "Could you help me with this box?"
            ],
            [
              "Asking Permission",
              "Could I + V1...?",
              "Could I use your phone, please?"
            ],
            [
              "Possibility",
              "Subject + could + V1",
              "It could be very hot tomorrow."
            ]
          ]
        }
      ],
      "rules": [
        "Bentuk negatif dari could adalah couldn't (could not).",
        "Selalu diikuti kata kerja bentuk pertama tanpa 'to'."
      ]
    },
    "exercises": [
      {
        "id": "u7_ex1",
        "title": "Latihan: could dan couldn't",
        "instruction": "Pilihlah bentuk yang tepat.",
        "type": "choice",
        "questions": [
          {
            "q": "Excuse me, officer, [BLANK] you tell me where the Central Station is?",
            "options": [
              "could",
              "should",
              "must",
              "can to"
            ],
            "answer": "could",
            "explanation": "Bentuk permintaan bantuan sopan di tempat umum."
          },
          {
            "q": "I'm sorry I [BLANK] come to your party yesterday because I was sick.",
            "options": [
              "couldn't",
              "can't",
              "shouldn't",
              "mustn't"
            ],
            "answer": "couldn't",
            "explanation": "Ketidakmampuan di waktu lampau ('yesterday')."
          }
        ]
      }
    ]
  },
  {
    "id": 8,
    "title": "some, any, no, every",
    "english_title": "Quantifiers: some, any, no, every",
    "category": "Quantifiers & Determiners",
    "grammar": {
      "summary": "Kata penentu jumlah (quantifiers) yang digunakan bersama kata benda dapat dihitung (countable) maupun tidak dapat dihitung (uncountable).",
      "tables": [
        {
          "title": "Aturan some, any, no, every",
          "headers": [
            "Kata",
            "Jenis Kalimat",
            "Contoh"
          ],
          "rows": [
            [
              "some",
              "Kalimat Positif (+), Tawaran/Permintaan Sopan",
              "I have some apples. Would you like some tea?"
            ],
            [
              "any",
              "Kalimat Negatif (-), Kalimat Tanya umum (?)",
              "I don't have any money. Do you have any pens?"
            ],
            [
              "no",
              "Bermakna negatif tapi dengan kata kerja positif (+)",
              "There are no chairs in the room."
            ],
            [
              "every",
              "Diikuti kata benda tunggal (singular countable)",
              "Every student has a dictionary."
            ]
          ]
        }
      ],
      "rules": [
        "Jangan gunakan 'no' bersama kalimat yang sudah ada 'not' (Double negative salah: BUKAN 'I don't have no time').",
        "'Every' selalu diikuti kata benda tunggal: 'every student', bukan 'every students'."
      ]
    },
    "exercises": [
      {
        "id": "u8_ex1",
        "title": "Latihan: some vs any vs no",
        "instruction": "Pilihlah kata yang tepat untuk melengkapi kalimat.",
        "type": "choice",
        "questions": [
          {
            "q": "There isn't [BLANK] milk left in the fridge.",
            "options": [
              "any",
              "some",
              "no",
              "every"
            ],
            "answer": "any",
            "explanation": "Kalimat negatif ('isn't') menggunakan 'any'."
          },
          {
            "q": "Would you like [BLANK] orange juice?",
            "options": [
              "some",
              "any",
              "no",
              "every"
            ],
            "answer": "some",
            "explanation": "Tawaran sopan (polite offer) menggunakan 'some'."
          },
          {
            "q": "There is [BLANK] sugar in my coffee. It's completely bitter!",
            "options": [
              "no",
              "any",
              "every",
              "some"
            ],
            "answer": "no",
            "explanation": "Kata kerja positif 'is' + 'no' bermakna sama sekali tidak ada."
          }
        ]
      }
    ]
  },
  {
    "id": 9,
    "title": "Bentuk Majemuk dari some, any, no, every",
    "english_title": "Compound Words of some, any, no, every",
    "category": "Pronouns & Determiners",
    "grammar": {
      "summary": "Penggabungan kata some, any, no, every dengan -one/-body (orang), -thing (benda), dan -where (tempat).",
      "tables": [
        {
          "title": "Tabel Kata Majemuk Indefinite",
          "headers": [
            "Awalan",
            "Orang (-one / -body)",
            "Benda (-thing)",
            "Tempat (-where)"
          ],
          "rows": [
            [
              "some-",
              "someone / somebody",
              "something",
              "somewhere"
            ],
            [
              "any-",
              "anyone / anybody",
              "anything",
              "anywhere"
            ],
            [
              "no-",
              "no one / nobody",
              "nothing",
              "nowhere"
            ],
            [
              "every-",
              "everyone / everybody",
              "everything",
              "everywhere"
            ]
          ]
        }
      ],
      "rules": [
        "Kata majemuk ini SELALU diperlakukan sebagai subjek tunggal (singular verb): 'Everybody is ready' (BUKAN 'are').",
        "Gunakan no- untuk kalimat positif bermakna negatif: 'Nobody called me today.'",
        "Gunakan any- untuk kalimat tanya atau kalimat negatif: 'Did anyone see my keys?'"
      ]
    },
    "exercises": [
      {
        "id": "u9_ex1",
        "title": "Latihan: Kata Majemuk Indefinite",
        "instruction": "Pilihlah bentuk kata majemuk yang tepat.",
        "type": "choice",
        "questions": [
          {
            "q": "Listen! I can hear [BLANK] knocking at the front door.",
            "options": [
              "someone",
              "anyone",
              "anything",
              "nowhere"
            ],
            "answer": "someone",
            "explanation": "Seseorang (positif) mengetuk pintu."
          },
          {
            "q": "I'm so hungry, but there is [BLANK] to eat in the kitchen.",
            "options": [
              "nothing",
              "anything",
              "something",
              "everything"
            ],
            "answer": "nothing",
            "explanation": "Menyatakan tidak ada apa-apa pada kalimat positif."
          },
          {
            "q": "Has [BLANK] seen my glasses? I can't find them [BLANK].",
            "options": [
              "anyone / anywhere",
              "someone / nowhere",
              "no one / somewhere",
              "everyone / everywhere"
            ],
            "answer": "anyone / anywhere",
            "explanation": "Pertanyaan memakai 'anyone', dan kalimat negatif 'can't find' memakai 'anywhere'."
          }
        ]
      }
    ]
  },
  {
    "id": 10,
    "title": "have to / don't have to",
    "english_title": "Obligation & Lack of Obligation",
    "category": "Verbs & Modals",
    "grammar": {
      "summary": "'have to' menyatakan kewajiban/keharusan dari pihak luar (aturan, hukum, jadwal). 'don't have to' menyatakan tidak adanya keharusan (tidak wajib/bebas).",
      "tables": [
        {
          "title": "Pola have to",
          "headers": [
            "Bentuk",
            "I / You / We / They",
            "He / She / It"
          ],
          "rows": [
            [
              "Positif (Keharusan)",
              "have to + V1",
              "has to + V1"
            ],
            [
              "Negatif (Tidak Harus)",
              "don't have to + V1",
              "doesn't have to + V1"
            ],
            [
              "Tanya (Apakah harus?)",
              "Do ... have to + V1?",
              "Does ... have to + V1?"
            ]
          ]
        }
      ],
      "rules": [
        "'don't have to' BUKAN berarti larangan (prohibition), melainkan 'kamu tidak perlu/bebas memilih'.",
        "Untuk larangan mutlak, gunakan 'mustn't' atau 'cannot'.",
        "Bentuk lampau dari have to / has to adalah 'had to': 'I had to go to the doctor yesterday.'"
      ]
    },
    "exercises": [
      {
        "id": "u10_ex1",
        "title": "Latihan: have to vs don't have to",
        "instruction": "Pilihlah bentuk yang sesuai dengan konteks aturan.",
        "type": "choice",
        "questions": [
          {
            "q": "Tomorrow is Sunday! We [BLANK] go to school.",
            "options": [
              "don't have to",
              "have to",
              "has to",
              "doesn't have to"
            ],
            "answer": "don't have to",
            "explanation": "Hari Minggu tidak ada kewajiban masuk sekolah ('don't have to')."
          },
          {
            "q": "Mark has poor eyesight. He [BLANK] wear glasses when reading.",
            "options": [
              "has to",
              "have to",
              "doesn't have to",
              "don't have to"
            ],
            "answer": "has to",
            "explanation": "Mark (he) membutuhkan 'has to' karena adanya kebutuhan medis."
          }
        ]
      }
    ]
  },
  {
    "id": 11,
    "title": "should, shall, ought to atau shouldn't",
    "english_title": "Giving Advice & Suggestions",
    "category": "Verbs & Modals",
    "grammar": {
      "summary": "'should' dan 'ought to' digunakan untuk memberikan saran atau anjuran. 'shouldn't' digunakan untuk menyarankan agar tidak melakukan sesuatu. 'shall' digunakan untuk menawarkan bantuan atau mengajak.",
      "tables": [
        {
          "title": "Ringkasan Modal Saran",
          "headers": [
            "Modal",
            "Makna",
            "Contoh"
          ],
          "rows": [
            [
              "should / ought to",
              "Sebaiknya / seharusnya (saran baik)",
              "You should see a dentist."
            ],
            [
              "shouldn't",
              "Sebaiknya jangan (bukan ide baik)",
              "You shouldn't eat too much candy."
            ],
            [
              "shall I / shall we",
              "Bagaimana kalau saya / kita...?",
              "Shall I carry that bag for you?"
            ]
          ]
        }
      ],
      "rules": [
        "'should' dan 'shouldn't' langsung diikuti V1 tanpa to.",
        "'ought to' selalu menggunakan 'to' sebelum kata kerja: 'You ought to apologize.'",
        "'shall' dalam bahasa Inggris modern paling umum dipakai dalam kalimat tanya dengan subjek 'I' atau 'we'."
      ]
    },
    "exercises": [
      {
        "id": "u11_ex1",
        "title": "Latihan: Memberi Saran (Advice)",
        "instruction": "Pilihlah modal yang tepat untuk memberikan anjuran.",
        "type": "choice",
        "questions": [
          {
            "q": "You look very pale. You [BLANK] go home and rest.",
            "options": [
              "should",
              "shouldn't",
              "shall",
              "ought"
            ],
            "answer": "should",
            "explanation": "Saran positif untuk orang yang sakit/pucat."
          },
          {
            "q": "It's cold in here. [BLANK] I close the window?",
            "options": [
              "Shall",
              "Shouldn't",
              "Ought",
              "Must"
            ],
            "answer": "Shall",
            "explanation": "Menawarkan tindakan bantuan dengan subjek 'I' menggunakan 'Shall I...'."
          }
        ]
      }
    ]
  },
  {
    "id": 12,
    "title": "Present perfect",
    "english_title": "Present Perfect Simple",
    "category": "Tenses & Aspect",
    "grammar": {
      "summary": "Present Perfect (have/has + Past Participle V3) menghubungkan masa lalu dengan masa sekarang. Digunakan untuk pengalaman hidup (ever/never), peristiwa baru saja terjadi (just/already/yet), serta perubahan/hasil yang dirasakan sekarang.",
      "tables": [
        {
          "title": "Rumus Present Perfect",
          "headers": [
            "Bentuk",
            "I / You / We / They",
            "He / She / It"
          ],
          "rows": [
            [
              "Positif (+)",
              "have + V3 (e.g. have visited)",
              "has + V3 (e.g. has visited)"
            ],
            [
              "Negatif (-)",
              "haven't + V3",
              "hasn't + V3"
            ],
            [
              "Tanya (?)",
              "Have + Subject + V3?",
              "Has + Subject + V3?"
            ]
          ]
        },
        {
          "title": "Perbedaan been to vs gone to",
          "headers": [
            "Frasa",
            "Arti",
            "Kondisi Orang Tersebut Saat Ini"
          ],
          "rows": [
            [
              "have been to",
              "Pernah ke sana dan sudah kembali pulang",
              "Sekarang sudah ada di sini."
            ],
            [
              "have gone to",
              "Pergi ke sana dan belum pulang",
              "Sekarang masih berada di tempat tujuan."
            ]
          ]
        }
      ],
      "rules": [
        "Gunakan 'ever' dalam kalimat tanya: 'Have you ever been to Bali?'",
        "Gunakan 'never' untuk kalimat positif bermakna belum pernah: 'I have never eaten sushi.'",
        "'yet' digunakan di akhir kalimat negatif dan kalimat tanya: 'I haven't finished yet.'"
      ]
    },
    "exercises": [
      {
        "id": "u12_ex1",
        "title": "Latihan: been to vs gone to & Keterangan Waktu",
        "instruction": "Pilihlah jawaban yang paling tepat.",
        "type": "choice",
        "questions": [
          {
            "q": "Where is Sarah? - She is not here. She has [BLANK] to the supermarket.",
            "options": [
              "gone",
              "been",
              "go",
              "went"
            ],
            "answer": "gone",
            "explanation": "Karena Sarah belum kembali dan tidak ada di sini, gunakan 'gone'."
          },
          {
            "q": "Have you [BLANK] visited the United States?",
            "options": [
              "ever",
              "never",
              "yet",
              "already"
            ],
            "answer": "ever",
            "explanation": "Menanyakan pengalaman hidup dalam kalimat tanya menggunakan 'ever'."
          },
          {
            "q": "I haven't received your message [BLANK].",
            "options": [
              "yet",
              "already",
              "just",
              "ever"
            ],
            "answer": "yet",
            "explanation": "Kalimat negatif di akhir kalimat menggunakan 'yet'."
          }
        ]
      }
    ]
  },
  {
    "id": 13,
    "title": "Present perfect continuous",
    "english_title": "Present Perfect Continuous",
    "category": "Tenses & Aspect",
    "grammar": {
      "summary": "Digunakan untuk menyatakan kegiatan yang telah dimulai di masa lalu dan masih terus berlangsung hingga saat ini, atau baru saja berhenti dengan bukti yang jelas saat ini.",
      "tables": [
        {
          "title": "Rumus Present Perfect Continuous",
          "headers": [
            "Bentuk",
            "Rumus",
            "Contoh"
          ],
          "rows": [
            [
              "Positif",
              "Subject + have/has been + V-ing",
              "It has been raining for two hours."
            ],
            [
              "Negatif",
              "Subject + have/has not been + V-ing",
              "I haven't been sleeping well lately."
            ],
            [
              "Tanya",
              "How long + have/has + Subject + been + V-ing?",
              "How long have you been studying English?"
            ]
          ]
        },
        {
          "title": "Perbedaan for vs since",
          "headers": [
            "Kata Depan",
            "Fungsi",
            "Contoh"
          ],
          "rows": [
            [
              "for",
              "Menunjukkan durasi / rentang waktu",
              "for two hours, for three days, for ten years"
            ],
            [
              "since",
              "Menunjukkan titik awal waktu dimulai",
              "since 8 a.m., since Monday, since 2015, since yesterday"
            ]
          ]
        }
      ],
      "rules": [
        "Pertanyaan mengenai durasi kegiatan menggunakan 'How long have you been...?'",
        "Kata kerja statis (state verbs seperti know, like, believe) umumnya menggunakan Present Perfect Simple, bukan Continuous."
      ]
    },
    "exercises": [
      {
        "id": "u13_ex1",
        "title": "Latihan: for vs since & Struktur Tense",
        "instruction": "Pilihlah jawaban yang tepat.",
        "type": "choice",
        "questions": [
          {
            "q": "I have been waiting for the bus [BLANK] half an hour.",
            "options": [
              "for",
              "since",
              "during",
              "from"
            ],
            "answer": "for",
            "explanation": "'half an hour' adalah durasi waktu, sehingga menggunakan 'for'."
          },
          {
            "q": "She has been living in this city [BLANK] 2018.",
            "options": [
              "since",
              "for",
              "in",
              "by"
            ],
            "answer": "since",
            "explanation": "'2018' adalah titik awal waktu, sehingga menggunakan 'since'."
          }
        ]
      }
    ]
  },
  {
    "id": 14,
    "title": "Klausa penghubung (Relative Clauses)",
    "english_title": "Relative Clauses: who, which, that, where, whose",
    "category": "Sentence Structure",
    "grammar": {
      "summary": "Klausa penghubung memberikan informasi tambahan tentang orang, benda, kepemilikan, atau tempat tanpa harus membuat kalimat baru.",
      "tables": [
        {
          "title": "Kata Ganti Relatif (Relative Pronouns)",
          "headers": [
            "Kata Relatif",
            "Digunakan Untuk",
            "Contoh Kalimat"
          ],
          "rows": [
            [
              "who",
              "Orang (People)",
              "The girl who won the race is my sister."
            ],
            [
              "which",
              "Benda / Hewan (Things/Animals)",
              "The book which is on the table is mine."
            ],
            [
              "that",
              "Orang atau Benda (Informal/Defining)",
              "The laptop that I bought is fast."
            ],
            [
              "where",
              "Tempat (Places)",
              "This is the restaurant where we had dinner."
            ],
            [
              "whose",
              "Kepemilikan (Possession)",
              "I met a boy whose father is an astronaut."
            ]
          ]
        }
      ],
      "rules": [
        "'who' menggantikan he/she/they.",
        "'whose' menggantikan his/her/their untuk kepemilikan.",
        "'where' menggantikan there / at that place."
      ]
    },
    "exercises": [
      {
        "id": "u14_ex1",
        "title": "Latihan: Mengisi Kata Relatif",
        "instruction": "Pilihlah kata relatif yang tepat.",
        "type": "choice",
        "questions": [
          {
            "q": "The teacher [BLANK] teaches us English is very kind.",
            "options": [
              "who",
              "which",
              "where",
              "whose"
            ],
            "answer": "who",
            "explanation": "Merujuk pada orang ('The teacher') sehingga menggunakan 'who'."
          },
          {
            "q": "This is the town [BLANK] William Shakespeare was born.",
            "options": [
              "where",
              "which",
              "who",
              "whose"
            ],
            "answer": "where",
            "explanation": "Merujuk pada tempat ('the town') sehingga menggunakan 'where'."
          }
        ]
      }
    ]
  },
  {
    "id": 15,
    "title": "Kata kerja + infinitif; kata kerja + ing",
    "english_title": "Verbs followed by Infinitive or -ing (Gerund)",
    "category": "Verb Patterns",
    "grammar": {
      "summary": "Ketika dua kata kerja berdampingan, kata kerja kedua bisa berbentuk to-infinitive (to do) atau gerund (-ing) tergantung kata kerja utamanya.",
      "tables": [
        {
          "title": "Daftar Kata Kerja dan Polanya",
          "headers": [
            "Pola",
            "Kata Kerja Umum",
            "Contoh Kalimat"
          ],
          "rows": [
            [
              "Verb + to-infinitive",
              "want, hope, decide, plan, promise, learn, offer",
              "I decided to study abroad."
            ],
            [
              "Verb + -ing (Gerund)",
              "enjoy, mind, avoid, finish, practice, imagine",
              "She enjoys playing the guitar."
            ],
            [
              "Preposition + -ing",
              "good at, interested in, keen on, tired of",
              "He is good at swimming."
            ]
          ]
        }
      ],
      "rules": [
        "Setelah kata depan (preposisi: at, in, of, about, etc.), kata kerja SELALU berakhiran -ing.",
        "Beberapa kata kerja seperti like, love, hate dapat diikuti keduanya dengan makna serupa."
      ]
    },
    "exercises": [
      {
        "id": "u15_ex1",
        "title": "Latihan: Infinitive vs Gerund",
        "instruction": "Pilihlah bentuk kata kerja yang benar.",
        "type": "choice",
        "questions": [
          {
            "q": "We decided [BLANK] to the beach because of the sunny weather.",
            "options": [
              "to go",
              "going",
              "go",
              "went"
            ],
            "answer": "to go",
            "explanation": "Kata kerja 'decide' diikuti oleh to-infinitive."
          },
          {
            "q": "I really enjoy [BLANK] fantasy and adventure stories.",
            "options": [
              "reading",
              "to read",
              "read",
              "reads"
            ],
            "answer": "reading",
            "explanation": "Kata kerja 'enjoy' selalu diikuti bentuk gerund (-ing)."
          }
        ]
      }
    ]
  },
  {
    "id": 16,
    "title": "will - Future simple",
    "english_title": "will: Future Simple",
    "category": "Tenses & Future",
    "grammar": {
      "summary": "'will' digunakan untuk keputusan spontan saat berbicara, prediksi masa depan menurut opini, janji, tawaran, dan penolakan (won't).",
      "tables": [
        {
          "title": "Pola Kalimat will",
          "headers": [
            "Bentuk",
            "Pola",
            "Contoh"
          ],
          "rows": [
            [
              "Positif",
              "Subject + will ('ll) + V1",
              "I'll have a glass of water, please."
            ],
            [
              "Negatif",
              "Subject + will not (won't) + V1",
              "Don't worry, I won't tell anyone."
            ],
            [
              "Tanya",
              "Will + Subject + V1?",
              "Will robots replace teachers in the future?"
            ]
          ]
        }
      ],
      "rules": [
        "will = keputusan saat itu juga (spontan). be going to = rencana yang sudah dibuat sebelumnya.",
        "Sering dipadukan dengan 'I think...', 'I hope...', 'Maybe...'."
      ]
    },
    "exercises": [
      {
        "id": "u16_ex1",
        "title": "Latihan: will vs won't",
        "instruction": "Pilihlah jawaban yang tepat.",
        "type": "choice",
        "questions": [
          {
            "q": "The phone is ringing. - OK, I [BLANK] answer it!",
            "options": [
              "'ll",
              "going to",
              "am answering",
              "was"
            ],
            "answer": "'ll",
            "explanation": "Keputusan spontan saat telepon berdering menggunakan 'will' ('ll)."
          },
          {
            "q": "I promise I [BLANK] be late again.",
            "options": [
              "won't",
              "will",
              "am not",
              "don't"
            ],
            "answer": "won't",
            "explanation": "Janji untuk tidak terlambat menggunakan 'won't'."
          }
        ]
      }
    ]
  },
  {
    "id": 17,
    "title": "Bentuk kondisional pertama (First Conditional)",
    "english_title": "First Conditional: Real Possibilities",
    "category": "Conditionals",
    "grammar": {
      "summary": "First Conditional digunakan untuk situasi nyata yang mungkin terjadi di masa depan jika suatu syarat terpenuhi.",
      "tables": [
        {
          "title": "Rumus First Conditional",
          "headers": [
            "Klausa Syarat (If-Clause)",
            "Klausa Hasil (Main Clause)",
            "Contoh"
          ],
          "rows": [
            [
              "If + Simple Present (V1)",
              "will / won't + V1",
              "If it rains tomorrow, we will stay at home."
            ],
            [
              "will / won't + V1",
              "if + Simple Present (V1)",
              "We will stay at home if it rains tomorrow."
            ]
          ]
        }
      ],
      "rules": [
        "JANGAN gunakan 'will' di dalam klausa 'If': BUKAN 'If it will rain', melainkan 'If it rains'.",
        "Bila If-clause di depan, gunakan tanda koma (,). Bila di belakang, tidak perlu koma."
      ]
    },
    "exercises": [
      {
        "id": "u17_ex1",
        "title": "Latihan: First Conditional",
        "instruction": "Pilihlah bentuk kata kerja yang tepat.",
        "type": "choice",
        "questions": [
          {
            "q": "If you study hard, you [BLANK] the exam.",
            "options": [
              "will pass",
              "pass",
              "passed",
              "would pass"
            ],
            "answer": "will pass",
            "explanation": "If + Simple Present, klausa hasil menggunakan will + V1."
          },
          {
            "q": "If it [BLANK] tomorrow, we won't go camping.",
            "options": [
              "rains",
              "will rain",
              "rained",
              "is raining"
            ],
            "answer": "rains",
            "explanation": "Klausa 'If' menggunakan Simple Present (it rains)."
          }
        ]
      }
    ]
  },
  {
    "id": 18,
    "title": "Bentuk kondisional kedua (Second Conditional)",
    "english_title": "Second Conditional: Hypothetical Situations",
    "category": "Conditionals",
    "grammar": {
      "summary": "Second Conditional digunakan untuk mengandaikan situasi yang berlawanan dengan kenyataan saat ini (khayalan/imajiner), atau situasi yang sangat kecil kemungkinannya terjadi.",
      "tables": [
        {
          "title": "Rumus Second Conditional",
          "headers": [
            "Klausa Syarat (If-Clause)",
            "Klausa Hasil (Main Clause)",
            "Contoh"
          ],
          "rows": [
            [
              "If + Simple Past (V2 / were)",
              "would / wouldn't + V1",
              "If I had a million dollars, I would buy an island."
            ],
            [
              "would + V1",
              "if + Simple Past (V2)",
              "I would travel the world if I were rich."
            ]
          ]
        }
      ],
      "rules": [
        "Dalam bahasa Inggris formal, 'were' digunakan untuk semua subjek (termasuk I, he, she, it): 'If I were you, I would study harder.' (ungkapan memberi saran).",
        "Kenyataannya sekarang adalah sebaliknya: 'If I had time' berarti 'I don't have time now'."
      ]
    },
    "exercises": [
      {
        "id": "u18_ex1",
        "title": "Latihan: Second Conditional",
        "instruction": "Pilihlah bentuk yang tepat.",
        "type": "choice",
        "questions": [
          {
            "q": "If I [BLANK] you, I would apologize to the teacher.",
            "options": [
              "were",
              "was to",
              "am",
              "will be"
            ],
            "answer": "were",
            "explanation": "Ungkapan pengandaian memberi nasihat: 'If I were you...'."
          },
          {
            "q": "What would you do if you [BLANK] a ghost?",
            "options": [
              "saw",
              "see",
              "will see",
              "would see"
            ],
            "answer": "saw",
            "explanation": "Second conditional if-clause menggunakan Simple Past (V2 'saw')."
          }
        ]
      }
    ]
  },
  {
    "id": 19,
    "title": "Kalimat tidak langsung (Reported Speech)",
    "english_title": "Reported Speech",
    "category": "Reported Speech",
    "grammar": {
      "summary": "Kalimat tidak langsung digunakan untuk menceritakan kembali ucapan orang lain. Terjadi perubahan tenses (mundur satu tingkat ke masa lampau), kata ganti orang, dan penanda waktu.",
      "tables": [
        {
          "title": "Perubahan Tense (Tense Backshift)",
          "headers": [
            "Kalimat Langsung (Direct)",
            "Kalimat Tidak Langsung (Reported)"
          ],
          "rows": [
            [
              "Present Simple (am/is/are, V1)",
              "Past Simple (was/were, V2)"
            ],
            [
              "Present Continuous (am/is/are + V-ing)",
              "Past Continuous (was/were + V-ing)"
            ],
            [
              "will + V1",
              "would + V1"
            ],
            [
              "can + V1",
              "could + V1"
            ]
          ]
        },
        {
          "title": "Perbedaan say vs tell",
          "headers": [
            "Kata Kerja",
            "Aturan Penggunaan",
            "Contoh"
          ],
          "rows": [
            [
              "say",
              "Tidak langsung diikuti orang (objek)",
              "He said (that) he was tired."
            ],
            [
              "tell",
              "Wajib langsung diikuti orang (objek)",
              "He told ME (that) he was tired."
            ]
          ]
        }
      ],
      "rules": [
        "Perubahan penanda waktu: now -> then, today -> that day, tomorrow -> the next day, yesterday -> the day before.",
        "Perubahan kata tunjuk: this -> that, these -> those, here -> there."
      ]
    },
    "exercises": [
      {
        "id": "u19_ex1",
        "title": "Latihan: Reported Speech & say vs tell",
        "instruction": "Pilihlah bentuk kalimat tidak langsung yang benar.",
        "type": "choice",
        "questions": [
          {
            "q": "Tom said, 'I am very tired.' -> Tom said that he [BLANK] very tired.",
            "options": [
              "was",
              "is",
              "were",
              "had been"
            ],
            "answer": "was",
            "explanation": "Present simple 'am' berubah menjadi past simple 'was'."
          },
          {
            "q": "Linda [BLANK] me that she couldn't come to the meeting.",
            "options": [
              "told",
              "said",
              "spoke",
              "asked"
            ],
            "answer": "told",
            "explanation": "Diikuti langsung objek orang ('me') sehingga menggunakan 'told'."
          }
        ]
      }
    ]
  },
  {
    "id": 20,
    "title": "used to (Kebiasaan Masa Lalu)",
    "english_title": "used to: Past Habits & States",
    "category": "Verbs & Modals",
    "grammar": {
      "summary": "'used to' digunakan untuk menyatakan kebiasaan atau keadaan di masa lalu yang sekarang sudah tidak dilakukan atau tidak benar lagi.",
      "tables": [
        {
          "title": "Rumus used to",
          "headers": [
            "Bentuk",
            "Pola Kalimat",
            "Contoh"
          ],
          "rows": [
            [
              "Positif (+)",
              "Subject + used to + V1",
              "I used to live in a small village."
            ],
            [
              "Negatif (-)",
              "Subject + didn't use to + V1",
              "He didn't use to like vegetables."
            ],
            [
              "Tanya (?)",
              "Did + Subject + use to + V1?",
              "Did you use to play basketball?"
            ]
          ]
        }
      ],
      "rules": [
        "Pada kalimat negatif dan tanya, gunakan 'use to' (tanpa akhiran -d) karena sudah ada kata bantu 'did/didn't'.",
        "'used to' HANYA ada dalam bentuk lampau. Untuk kebiasaan masa sekarang, gunakan Simple Present tense biasa dengan adverb of frequency (usually, always)."
      ]
    },
    "exercises": [
      {
        "id": "u20_ex1",
        "title": "Latihan: used to",
        "instruction": "Pilihlah bentuk yang benar.",
        "type": "choice",
        "questions": [
          {
            "q": "My father [BLANK] smoke, but he quit five years ago.",
            "options": [
              "used to",
              "use to",
              "is used to",
              "uses to"
            ],
            "answer": "used to",
            "explanation": "Kebiasaan di masa lalu yang sudah berhenti menggunakan 'used to'."
          },
          {
            "q": "Did you [BLANK] have long hair when you were a child?",
            "options": [
              "use to",
              "used to",
              "using to",
              "uses to"
            ],
            "answer": "use to",
            "explanation": "Setelah kata bantu 'Did', kata kerja kembali ke bentuk dasar: 'use to'."
          }
        ]
      }
    ]
  },
  {
    "id": 21,
    "title": "Persetujuan dan ketidaksetujuan (Agreement & Disagreement)",
    "english_title": "Agreeing and Disagreeing",
    "category": "Communication Skills",
    "grammar": {
      "summary": "Cara mengekspresikan persetujuan (So do I / Neither do I) atau ketidaksetujuan secara wajar dalam percakapan sehari-hari.",
      "tables": [
        {
          "title": "Rumus So dan Neither",
          "headers": [
            "Pernyataan Awal",
            "Menyetujui (Agree)",
            "Menolak/Beda (Disagree)"
          ],
          "rows": [
            [
              "Positif: 'I love Italian food.'",
              "So do I. / Me too.",
              "I don't."
            ],
            [
              "Positif: 'I am hungry.'",
              "So am I.",
              "I'm not."
            ],
            [
              "Negatif: 'I don't like horror movies.'",
              "Neither do I. / Me neither.",
              "I do!"
            ],
            [
              "Negatif: 'I haven't seen that film.'",
              "Neither have I.",
              "I have."
            ]
          ]
        }
      ],
      "rules": [
        "Gunakan 'So + auxiliary + subject' untuk menyetujui pernyataan positif.",
        "Gunakan 'Neither + auxiliary + subject' untuk menyetujui pernyataan negatif.",
        "Auxiliary (kata bantu) harus cocok dengan tenses kalimat pertama (do/does, am/is/are, can, have, did)."
      ]
    },
    "exercises": [
      {
        "id": "u21_ex1",
        "title": "Latihan: So do I vs Neither do I",
        "instruction": "Pilihlah respons persetujuan yang tepat.",
        "type": "choice",
        "questions": [
          {
            "q": "A: 'I can't swim very well.' -> B: '[BLANK]'",
            "options": [
              "Neither can I.",
              "So can I.",
              "Neither do I.",
              "So do I."
            ],
            "answer": "Neither can I.",
            "explanation": "Pernyataan negatif dengan modal 'can' -> 'Neither can I'."
          },
          {
            "q": "A: 'I bought a new smartphone yesterday.' -> B: '[BLANK]'",
            "options": [
              "So did I.",
              "So do I.",
              "Neither did I.",
              "So was I."
            ],
            "answer": "So did I.",
            "explanation": "Pernyataan positif Past Simple ('bought') -> 'So did I'."
          }
        ]
      }
    ]
  },
  {
    "id": 22,
    "title": "Pertanyaan dan jawaban singkat (Question Tags)",
    "english_title": "Question Tags & Short Answers",
    "category": "Questions & Answers",
    "grammar": {
      "summary": "Question tag adalah pertanyaan pendek di ujung kalimat yang dipakai untuk meminta konfirmasi atau persetujuan lawan bicara.",
      "tables": [
        {
          "title": "Pola Question Tag",
          "headers": [
            "Pernyataan",
            "Question Tag",
            "Contoh Kalimat"
          ],
          "rows": [
            [
              "Kalimat Positif (+)",
              "Tag Negatif (-)",
              "You are a student, aren't you?"
            ],
            [
              "Kalimat Negatif (-)",
              "Tag Positif (+)",
              "You don't smoke, do you?"
            ],
            [
              "Modal can (+)",
              "Tag can't (-)",
              "She can speak Spanish, can't she?"
            ],
            [
              "Past Simple (+)",
              "Tag didn't (-)",
              "Tom arrived late, didn't he?"
            ]
          ]
        }
      ],
      "rules": [
        "Kasus khusus: 'I am right, aren't I?'",
        "Kalimat ajakan: 'Let's go, shall we?'",
        "Perintah: 'Open the window, will you?'"
      ]
    },
    "exercises": [
      {
        "id": "u22_ex1",
        "title": "Latihan: Melengkapi Question Tag",
        "instruction": "Pilihlah question tag yang benar.",
        "type": "choice",
        "questions": [
          {
            "q": "Louise needs a new mobile phone, [BLANK]?",
            "options": [
              "doesn't she",
              "does she",
              "isn't she",
              "don't she"
            ],
            "answer": "doesn't she",
            "explanation": "Kalimat positif Present Simple ('needs') dengan subjek perempuan -> 'doesn't she?'."
          },
          {
            "q": "Mark can't drive yet, [BLANK]?",
            "options": [
              "can he",
              "can't he",
              "does he",
              "is he"
            ],
            "answer": "can he",
            "explanation": "Kalimat negatif 'can't' -> tag positif 'can he?'."
          }
        ]
      }
    ]
  },
  {
    "id": 23,
    "title": "Bentuk pasif (Passive Voice)",
    "english_title": "Passive Voice: Present and Past Passive",
    "category": "Voice & Passive",
    "grammar": {
      "summary": "Kalimat pasif digunakan ketika fokus perhatian tertuju pada objek/tindakan, bukan pada siapa yang melakukan tindakan tersebut.",
      "tables": [
        {
          "title": "Rumus Kalimat Pasif",
          "headers": [
            "Tense",
            "Pola Pasif",
            "Contoh Kalimat"
          ],
          "rows": [
            [
              "Present Simple",
              "am / is / are + V3 (Past Participle)",
              "Millions of emails are sent every day."
            ],
            [
              "Past Simple",
              "was / were + V3 (Past Participle)",
              "The Mona Lisa was painted by Leonardo da Vinci."
            ]
          ]
        }
      ],
      "rules": [
        "Pelaku tindakan (agent) diperkenalkan dengan kata depan 'by': 'written by Sarah Jane Lewis'.",
        "Jika pelaku tidak diketahui, tidak penting, atau sudah jelas, 'by ...' tidak perlu disebutkan."
      ]
    },
    "exercises": [
      {
        "id": "u23_ex1",
        "title": "Latihan: Passive Voice",
        "instruction": "Pilihlah bentuk pasif yang tepat.",
        "type": "choice",
        "questions": [
          {
            "q": "English [BLANK] all over the world.",
            "options": [
              "is spoken",
              "is speak",
              "was speaking",
              "speaks"
            ],
            "answer": "is spoken",
            "explanation": "Fakta umum Present Passive: is + V3 ('spoken')."
          },
          {
            "q": "These houses [BLANK] fifty years ago.",
            "options": [
              "were built",
              "was built",
              "are built",
              "built"
            ],
            "answer": "were built",
            "explanation": "Subjek jamak 'These houses' + waktu lampau 'ago' -> 'were built'."
          }
        ]
      }
    ]
  },
  {
    "id": 24,
    "title": "Kata kerja indrawi (Sense Verbs)",
    "english_title": "Sense Verbs: look, sound, smell, taste, feel",
    "category": "Verbs & Adjectives",
    "grammar": {
      "summary": "Kata kerja indrawi (verbs of perception) menggambarkan apa yang dilihat, didengar, dibaui, dirasakan lidah, atau dirasakan tubuh.",
      "tables": [
        {
          "title": "Pola Sense Verbs",
          "headers": [
            "Pola",
            "Makna",
            "Contoh"
          ],
          "rows": [
            [
              "Verb + Adjective",
              "Kualitas/kesan langsung",
              "You look tired. This soup smells delicious."
            ],
            [
              "Verb + like + Noun",
              "Menyerupai / mirip seperti",
              "It sounds like thunder. It tastes like strawberry."
            ]
          ]
        }
      ],
      "rules": [
        "Sense verbs diikuti KATA SIFAT (adjective), BUKAN kata keterangan (adverb): 'You look happy' (BUKAN 'happily').",
        "Gunakan 'like' jika setelahnya adalah kata benda: 'That sounds like a good idea.'"
      ]
    },
    "exercises": [
      {
        "id": "u24_ex1",
        "title": "Latihan: Sense Verbs",
        "instruction": "Pilihlah kata yang tepat untuk melengkapi kalimat indrawi.",
        "type": "choice",
        "questions": [
          {
            "q": "Dinner is ready! It smells [BLANK].",
            "options": [
              "delicious",
              "deliciously",
              "like delicious",
              "a delicious"
            ],
            "answer": "delicious",
            "explanation": "Kata kerja indrawi 'smell' langsung diikuti kata sifat 'delicious'."
          },
          {
            "q": "Listen to that music. It sounds [BLANK] a violin.",
            "options": [
              "like",
              "as",
              "such",
              "same"
            ],
            "answer": "like",
            "explanation": "Diikuti kata benda ('a violin') sehingga membutuhkan 'like'."
          }
        ]
      }
    ]
  }
];

const LATIHAN_MATERI = {
  "title": "Latihan Materi (Review Exam A2)",
  "description": "Ujian evaluasi komprehensif menguji pemahaman seluruh tata bahasa dari Unit 1 hingga Unit 24.",
  "questions": [
    {
      "id": "rev_1",
      "q": "This isn't my jacket. It must be [BLANK].",
      "options": [
        "yours",
        "your",
        "you",
        "yourself"
      ],
      "answer": "yours",
      "unit_ref": 1
    },
    {
      "id": "rev_2",
      "q": "I'm going to the grocery store because we don't have [BLANK] eggs.",
      "options": [
        "any",
        "some",
        "no",
        "every"
      ],
      "answer": "any",
      "unit_ref": 8
    },
    {
      "id": "rev_3",
      "q": "Have you [BLANK] seen an elephant in real life?",
      "options": [
        "ever",
        "never",
        "yet",
        "already"
      ],
      "answer": "ever",
      "unit_ref": 12
    },
    {
      "id": "rev_4",
      "q": "If it rains tomorrow, we [BLANK] the match.",
      "options": [
        "will cancel",
        "canceled",
        "would cancel",
        "cancel"
      ],
      "answer": "will cancel",
      "unit_ref": 17
    },
    {
      "id": "rev_5",
      "q": "If I were rich, I [BLANK] around the world.",
      "options": [
        "would travel",
        "will travel",
        "traveled",
        "travel"
      ],
      "answer": "would travel",
      "unit_ref": 18
    },
    {
      "id": "rev_6",
      "q": "This car [BLANK] by my uncle last year.",
      "options": [
        "was repaired",
        "is repaired",
        "were repaired",
        "repaired"
      ],
      "answer": "was repaired",
      "unit_ref": 23
    },
    {
      "id": "rev_7",
      "q": "She [BLANK] live in Paris, but now she lives in London.",
      "options": [
        "used to",
        "use to",
        "is used to",
        "uses to"
      ],
      "answer": "used to",
      "unit_ref": 20
    },
    {
      "id": "rev_8",
      "q": "He's very friendly, [BLANK]?",
      "options": [
        "isn't he",
        "is he",
        "doesn't he",
        "does he"
      ],
      "answer": "isn't he",
      "unit_ref": 22
    }
  ]
};

const LAMPIRAN_A = [
  {
    "base": "be",
    "past_simple": "was / were",
    "past_participle": "been",
    "meaning": "menjadi / ada"
  },
  {
    "base": "become",
    "past_simple": "became",
    "past_participle": "become",
    "meaning": "menjadi"
  },
  {
    "base": "begin",
    "past_simple": "began",
    "past_participle": "begun",
    "meaning": "mulai"
  },
  {
    "base": "break",
    "past_simple": "broke",
    "past_participle": "broken",
    "meaning": "mematahkan / memecahkan"
  },
  {
    "base": "bring",
    "past_simple": "brought",
    "past_participle": "brought",
    "meaning": "membawa"
  },
  {
    "base": "build",
    "past_simple": "built",
    "past_participle": "built",
    "meaning": "membangun"
  },
  {
    "base": "buy",
    "past_simple": "bought",
    "past_participle": "bought",
    "meaning": "membeli"
  },
  {
    "base": "catch",
    "past_simple": "caught",
    "past_participle": "caught",
    "meaning": "menangkap"
  },
  {
    "base": "choose",
    "past_simple": "chose",
    "past_participle": "chosen",
    "meaning": "memilih"
  },
  {
    "base": "come",
    "past_simple": "came",
    "past_participle": "come",
    "meaning": "datang"
  },
  {
    "base": "do",
    "past_simple": "did",
    "past_participle": "done",
    "meaning": "melakukan"
  },
  {
    "base": "drink",
    "past_simple": "drank",
    "past_participle": "drunk",
    "meaning": "minum"
  },
  {
    "base": "drive",
    "past_simple": "drove",
    "past_participle": "driven",
    "meaning": "mengemudi"
  },
  {
    "base": "eat",
    "past_simple": "ate",
    "past_participle": "eaten",
    "meaning": "makan"
  },
  {
    "base": "fall",
    "past_simple": "fell",
    "past_participle": "fallen",
    "meaning": "jatuh"
  },
  {
    "base": "feel",
    "past_simple": "felt",
    "past_participle": "felt",
    "meaning": "merasakan"
  },
  {
    "base": "find",
    "past_simple": "found",
    "past_participle": "found",
    "meaning": "menemukan"
  },
  {
    "base": "fly",
    "past_simple": "flew",
    "past_participle": "flown",
    "meaning": "terbang"
  },
  {
    "base": "forget",
    "past_simple": "forgot",
    "past_participle": "forgotten",
    "meaning": "lupa"
  },
  {
    "base": "get",
    "past_simple": "got",
    "past_participle": "got / gotten",
    "meaning": "mendapatkan / menjadi"
  },
  {
    "base": "give",
    "past_simple": "gave",
    "past_participle": "given",
    "meaning": "memberi"
  },
  {
    "base": "go",
    "past_simple": "went",
    "past_participle": "been / gone",
    "meaning": "pergi"
  },
  {
    "base": "have",
    "past_simple": "had",
    "past_participle": "had",
    "meaning": "memiliki / melakukan"
  },
  {
    "base": "know",
    "past_simple": "knew",
    "past_participle": "known",
    "meaning": "mengetahui"
  },
  {
    "base": "leave",
    "past_simple": "left",
    "past_participle": "left",
    "meaning": "meninggalkan / berangkat"
  },
  {
    "base": "make",
    "past_simple": "made",
    "past_participle": "made",
    "meaning": "membuat"
  },
  {
    "base": "read",
    "past_simple": "read (/red/)",
    "past_participle": "read (/red/)",
    "meaning": "membaca"
  },
  {
    "base": "run",
    "past_simple": "ran",
    "past_participle": "run",
    "meaning": "berlari"
  },
  {
    "base": "see",
    "past_simple": "saw",
    "past_participle": "seen",
    "meaning": "melihat"
  },
  {
    "base": "speak",
    "past_simple": "spoke",
    "past_participle": "spoken",
    "meaning": "berbicara"
  },
  {
    "base": "take",
    "past_simple": "took",
    "past_participle": "taken",
    "meaning": "mengambil"
  },
  {
    "base": "teach",
    "past_simple": "taught",
    "past_participle": "taught",
    "meaning": "mengajar"
  },
  {
    "base": "tell",
    "past_simple": "told",
    "past_participle": "told",
    "meaning": "menceritakan / memberi tahu"
  },
  {
    "base": "think",
    "past_simple": "thought",
    "past_participle": "thought",
    "meaning": "berpikir"
  },
  {
    "base": "write",
    "past_simple": "wrote",
    "past_participle": "written",
    "meaning": "menulis"
  }
];

const LAMPIRAN_B = {
  "phonetics": [
    {
      "type": "Konsonan",
      "symbol": "/p/",
      "example": "pen"
    },
    {
      "type": "Konsonan",
      "symbol": "/b/",
      "example": "board"
    },
    {
      "type": "Konsonan",
      "symbol": "/t/",
      "example": "table"
    },
    {
      "type": "Konsonan",
      "symbol": "/d/",
      "example": "day"
    },
    {
      "type": "Konsonan",
      "symbol": "/k/",
      "example": "cap"
    },
    {
      "type": "Konsonan",
      "symbol": "/g/",
      "example": "go"
    },
    {
      "type": "Konsonan",
      "symbol": "/θ/",
      "example": "think"
    },
    {
      "type": "Konsonan",
      "symbol": "/ð/",
      "example": "mother"
    },
    {
      "type": "Konsonan",
      "symbol": "/ʃ/",
      "example": "she"
    },
    {
      "type": "Konsonan",
      "symbol": "/tʃ/",
      "example": "cheese"
    },
    {
      "type": "Konsonan",
      "symbol": "/dʒ/",
      "example": "joy"
    },
    {
      "type": "Vokal",
      "symbol": "/i:/",
      "example": "eat"
    },
    {
      "type": "Vokal",
      "symbol": "/ɪ/",
      "example": "it"
    },
    {
      "type": "Vokal",
      "symbol": "/e/",
      "example": "bed"
    },
    {
      "type": "Vokal",
      "symbol": "/æ/",
      "example": "has"
    },
    {
      "type": "Vokal",
      "symbol": "/ɑ:/",
      "example": "start"
    },
    {
      "type": "Diftong",
      "symbol": "/eɪ/",
      "example": "day"
    },
    {
      "type": "Diftong",
      "symbol": "/aɪ/",
      "example": "five"
    },
    {
      "type": "Diftong",
      "symbol": "/aʊ/",
      "example": "sound"
    }
  ],
  "punctuation": [
    {
      "mark": "Capital Letter (A)",
      "indo": "HURUF KAPITAL",
      "use": "Awal kalimat, nama orang, hari, bulan, bahasa"
    },
    {
      "mark": "Full stop (.)",
      "indo": "Titik",
      "use": "Akhir kalimat berita"
    },
    {
      "mark": "Comma (,)",
      "indo": "Koma",
      "use": "Jeda klausa, pemisah daftar rincian"
    },
    {
      "mark": "Apostrophe (')",
      "indo": "Tanda petik atas",
      "use": "Kepemilikan ('s) atau singkatan (don't)"
    },
    {
      "mark": "Question mark (?)",
      "indo": "Tanda tanya",
      "use": "Akhir kalimat tanya"
    },
    {
      "mark": "Exclamation mark (!)",
      "indo": "Tanda seru",
      "use": "Perintah, keheranan, seruan emosi"
    }
  ]
};

const AUDIO_TRANSCRIPTS = [
  {
    "track": "TR 2 (Unit 1)",
    "content": "Marsha's fifteen and lives in a big city. She's got a bright red moped and uses it everyday to go to school. She also uses it at weekends when she goes out with her friends. Her favourite sports are tennis and volleyball.\n\nNick's a farmer and lives in the country. He gets up at five o'clock in the morning to feed the animals, and then works in the fields. He works hard seven days a week but likes to go out with his wife to the cinema and go dancing at weekends.\n\nCaroline's a history teacher at Hathaway High School. She loves her job and enjoys teaching children. In her free time, she gives students drama lessons. At the moment they're rehearsing for a play called 'Hamlet' by William Shakespeare.\n\nSam's twenty-five years old and is a policeman. He lives and works in a small town in the UK. The people there are very friendly and his job isn't very stressful. He loves to go to football matches on Sundays and sometimes after work he rides his bike."
  },
  {
    "track": "TR 5 (Unit 3)",
    "content": "Alice: Hello.\nJason: Hi, Alice. It's Jason.\nAlice: Hi, Jason. How are you?\nJason: Fine, thanks. Have you got any plans for Friday?\nAlice: No, I haven't. Why?\nJason: I've got two tickets for that new West End show, Bright Lights. Would you like to come with me?\nAlice: Wow! How did you get the tickets?\nJason: I waited in line for four hours!\nAlice: Where shall we meet?\nJason: Let's meet in front of the art gallery at 3 o'clock.\nAlice: OK. After the show we can get something to eat. Do you like pizza?\nJason: That's a good idea! See you on Friday!"
  },
  {
    "track": "TR 10 (Unit 7)",
    "content": "Terry: Hi, Diane. Why weren't you at school today?\nDiane: I'm sick. I have the flu. Could you tell me if we have any homework for next week?\nTerry: Yes, there's going to be a Maths test on Tuesday and an English test on Thursday.\nDiane: Thanks! Could you do me a favour, please? Could you take some notes for me?\nTerry: Yes, of course! Get better soon!"
  }
];
