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
        "title": "Latihan 1: Lengkapi dengan Kata Ganti Posesif (mine, yours, his, hers, ours, theirs)",
        "instruction": "Ketik kata ganti posesif yang tepat pada bagian kosong sesuai subjek/kepemilikan.",
        "type": "fill",
        "questions": [
          {
            "q": "1. It's my house. It's [BLANK].",
            "answer": "mine",
            "hint": "Kepunyaan saya (my -> ...)"
          },
          {
            "q": "2. It's his hat. It's [BLANK].",
            "answer": "his",
            "hint": "Kepunyaan dia laki-laki (his -> ...)"
          },
          {
            "q": "3. It's her T-shirt. It's [BLANK].",
            "answer": "hers",
            "hint": "Kepunyaan dia perempuan (her -> ...)"
          },
          {
            "q": "4. It's their newspaper. It's [BLANK].",
            "answer": "theirs",
            "hint": "Kepunyaan mereka (their -> ...)"
          },
          {
            "q": "5. They're our bikes. They're [BLANK].",
            "answer": "ours",
            "hint": "Kepunyaan kami (our -> ...)"
          },
          {
            "q": "6. They're your pencils. They're [BLANK].",
            "answer": "yours",
            "hint": "Kepunyaan kalian (your -> ...)"
          }
        ]
      },
      {
        "id": "u1_ex2",
        "title": "Latihan 2: Pilihan Ganda Bentuk Posesif yang Tepat",
        "instruction": "Pilihlah bentuk posesif yang benar sesuai kaidah tata bahasa.",
        "type": "choice",
        "questions": [
          {
            "q": "This coat isn't (my / mine), it's too small. It must be (your / yours).",
            "options": [
              "my / your",
              "mine / yours",
              "my / yours",
              "mine / your"
            ],
            "answer": "my / yours",
            "explanation": "Coat adalah kata benda (butuh my), kalimat kedua berdiri sendiri (butuh yours)."
          },
          {
            "q": "Tell Lisa not to forget (her / hers) passport and not to forget (my / mine) either.",
            "options": [
              "her / mine",
              "hers / my",
              "her / my",
              "hers / mine"
            ],
            "answer": "her / mine",
            "explanation": "Passport adalah kata benda (her passport), klausa kedua berdiri sendiri (mine)."
          },
          {
            "q": "I don't have any drink left. Can I have some of (your / yours)?",
            "options": [
              "your",
              "yours"
            ],
            "answer": "yours",
            "explanation": "Berdiri sendiri tanpa kata benda setelahnya sehingga memakai kata ganti posesif 'yours'."
          },
          {
            "q": "This doesn't look like (my / mine) jacket.",
            "options": [
              "my",
              "mine"
            ],
            "answer": "my",
            "explanation": "Diikuti kata benda 'jacket', sehingga membutuhkan kata sifat posesif 'my'."
          },
          {
            "q": "Two of (their / theirs) children go to junior school and (their / theirs) oldest son goes to secondary school.",
            "options": [
              "their / their",
              "theirs / their",
              "theirs / theirs",
              "their / theirs"
            ],
            "answer": "their / their",
            "explanation": "Keduanya diikuti kata benda ('children' dan 'oldest son'), sehingga memakai 'their'."
          },
          {
            "q": "You can take (my / mine) keys if you can't find (your / yours).",
            "options": [
              "my / yours",
              "mine / your",
              "my / your",
              "mine / yours"
            ],
            "answer": "my / yours",
            "explanation": "Keys adalah kata benda (my keys), bagian akhir berdiri sendiri (yours)."
          }
        ]
      },
      {
        "id": "u1_ex3",
        "title": "Latihan 3: Pertanyaan dan Jawaban Kepemilikan (Whose)",
        "instruction": "Pilih jawaban yang paling tepat untuk melengkapi dialog kepemilikan.",
        "type": "choice",
        "questions": [
          {
            "q": "A: [BLANK] red socks are these? B: They are mine.",
            "options": [
              "Whose",
              "Who's",
              "Who",
              "Where"
            ],
            "answer": "Whose",
            "explanation": "'Whose' digunakan untuk menanyakan pemilik benda."
          },
          {
            "q": "A: Whose umbrella is this? B: It's [BLANK]. (our umbrella)",
            "options": [
              "ours",
              "our",
              "us",
              "we"
            ],
            "answer": "ours",
            "explanation": "Kata ganti posesif untuk 'our umbrella' adalah 'ours'."
          },
          {
            "q": "A: [BLANK] is that boy sitting next to Lexi? B: His name is Robert.",
            "options": [
              "Who",
              "Whose",
              "Who's",
              "Whom"
            ],
            "answer": "Who",
            "explanation": "Menanyakan identitas orang menggunakan 'Who'."
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
        "title": "Latihan 1: Pilihan Kolokasi have yang Tepat",
        "instruction": "Pilihlah kolokasi yang paling tepat sesuai konteks kalimat.",
        "type": "choice",
        "questions": [
          {
            "q": "I usually have [BLANK] every morning before I go to school.",
            "options": [
              "a meal",
              "a snack",
              "breakfast"
            ],
            "answer": "breakfast",
            "explanation": "Makan di pagi hari sebelum sekolah adalah 'breakfast'."
          },
          {
            "q": "Sometimes my brother and I have [BLANK] about whose turn it is to play on the computer.",
            "options": [
              "a talk",
              "an argument",
              "a chat"
            ],
            "answer": "an argument",
            "explanation": "Perdebatan tentang giliran komputer menggunakan kolokasi 'an argument'."
          },
          {
            "q": "My family often has [BLANK] to somewhere hot during the summer.",
            "options": [
              "a holiday",
              "a rest",
              "a party"
            ],
            "answer": "a holiday",
            "explanation": "Pergi berlibur saat musim panas adalah 'have a holiday'."
          },
          {
            "q": "I always know when my dog is having [BLANK] because he moves his legs in his sleep.",
            "options": [
              "a swim",
              "a look",
              "a dream"
            ],
            "answer": "a dream",
            "explanation": "Menggerakkan kaki saat tidur menandakan sedang bermimpi ('a dream')."
          },
          {
            "q": "I hope Tom has [BLANK] on the plane. The weather is quite windy today.",
            "options": [
              "a fun time",
              "a good flight",
              "a nice meal"
            ],
            "answer": "a good flight",
            "explanation": "Di dalam pesawat terbang, ungkapan yang tepat adalah 'have a good flight'."
          },
          {
            "q": "Anna and I are having [BLANK] at the new Greek restaurant tonight.",
            "options": [
              "dinner",
              "lunch",
              "breakfast"
            ],
            "answer": "dinner",
            "explanation": "Makan di restoran pada malam hari ('tonight') adalah 'dinner'."
          }
        ]
      },
      {
        "id": "u2_ex2",
        "title": "Latihan 2: can vs could",
        "instruction": "Pilihlah bentuk modal can atau could yang tepat.",
        "type": "choice",
        "questions": [
          {
            "q": "When grandfather was young, he [BLANK] run ten miles without stopping.",
            "options": [
              "can",
              "could",
              "could to",
              "cans"
            ],
            "answer": "could",
            "explanation": "Kemampuan di masa lampau ('When grandfather was young') menggunakan 'could'."
          },
          {
            "q": "[BLANK] you open the door for me, please? My hands are full.",
            "options": [
              "Could",
              "Can to",
              "Did",
              "Do"
            ],
            "answer": "Could",
            "explanation": "'Could' adalah bentuk permintaan sopan yang paling lazim."
          },
          {
            "q": "Look at Sarah! She [BLANK] ride a bicycle with no hands!",
            "options": [
              "can",
              "could",
              "can to",
              "cans"
            ],
            "answer": "can",
            "explanation": "Kemampuan yang sedang dilihat saat ini ('Look at Sarah') menggunakan 'can'."
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
        "title": "Latihan: Melengkapi Ungkapan Ajakan & Respons",
        "instruction": "Pilihlah kata atau frasa yang tepat untuk melengkapi percakapan.",
        "type": "choice",
        "questions": [
          {
            "q": "A: [BLANK] you like to go to the concert with me this weekend? B: I'd love to!",
            "options": [
              "Would",
              "Do",
              "Are",
              "Will"
            ],
            "answer": "Would",
            "explanation": "Ungkapan ajakan sopan: 'Would you like to...'."
          },
          {
            "q": "How about [BLANK] some coffee after class?",
            "options": [
              "drink",
              "drinking",
              "to drink",
              "drank"
            ],
            "answer": "drinking",
            "explanation": "Frasa 'How about' selalu diikuti gerund (V-ing)."
          },
          {
            "q": "A: Let's have a picnic by the lake! B: [BLANK], but I have to finish my homework.",
            "options": [
              "I'd love to",
              "I don't care",
              "No never",
              "I want"
            ],
            "answer": "I'd love to",
            "explanation": "Penolakan sopan biasanya diawali dengan 'I'd love to, but...'."
          },
          {
            "q": "Why don't we [BLANK] to the beach tomorrow?",
            "options": [
              "go",
              "going",
              "to go",
              "went"
            ],
            "answer": "go",
            "explanation": "'Why don't we' diikuti bentuk dasar kata kerja (V1)."
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
