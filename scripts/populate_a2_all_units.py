# -*- coding: utf-8 -*-
"""
Database Population Script for Grammar Plus A2 (Units 4 to 24)
Builds comprehensive, authentic exercises directly aligned with Sarah Jane Lewis textbook.
"""
import json
import os
import re

# Load base exercises_db.json
db_path = 'data/exercises_db.json'
with open(db_path, 'r', encoding='utf-8') as f:
    db = json.load(f)

units = db['units']

# Complete Transcripts for A2 (Tracks 1 - 27)
A2_AUDIO_TRANSCRIPTS = [
    {
        "track": "TR 2",
        "title": "Unit 1 Ex 4: Possessions & Jobs",
        "content": "Marsha's fifteen and lives in a big city. She's got a bright red moped and uses it everyday to go to school. She also uses it at weekends when she goes out with her friends. Her favourite sports are tennis and volleyball.\n\nNick's a farmer and lives in the country. He gets up at five o'clock in the morning to feed the animals, and then works in the fields. He works hard seven days a week but likes to go out with his wife to the cinema and go dancing at weekends.\n\nCaroline's a history teacher at Hathaway High School. She loves her job and enjoys teaching children. In her free time, she gives students drama lessons. At the moment they're rehearsing for a play called 'Hamlet' by William Shakespeare. It's a difficult play but very interesting.\n\nSam's twenty-five years old and is a policeman. He lives and works in a small town in the UK. The people there are very friendly and his job isn't very stressful. He loves to go to football matches on Sundays and sometimes after work he rides his bike. He loves to travel and always visits places where he can relax. In his spare time he reads lots of books. His favourite are fantasy and adventure stories."
    },
    {
        "track": "TR 3",
        "title": "Unit 3 Ex 5: Invitations & Suggestions",
        "content": "1 Would you like to go to the cinema?\n2 Let's have a picnic. It's a beautiful day.\n3 What would you like to do at the weekend?\n4 How about we go for coffee?\n5 Why don't we go to the beach?\n6 How would you like your steak cooked?"
    },
    {
        "track": "TR 4",
        "title": "Unit 3 Ex 9: Janet & Laura Phone Call",
        "content": "Janet: Hello.\nLaura: Hi, Janet. It's Laura. How are you?\nJanet: Fine, thanks.\nLaura: Are you busy on Tuesday afternoon?\nJanet: Mmm. Well, I usually do my homework. Why?\nLaura: Would you like to come shopping with me?\nJanet: What do you want to buy?\nLaura: I'd like a new winter coat.\nJanet: Where do you want to go?\nLaura: I was thinking of going to the town centre.\nJanet: OK. I'd love to come.\nLaura: Great!\nJanet: What time do you think we'll be back?\nLaura: I'm not sure. Maybe around six.\nJanet: OK. I'll study when I get home then.\nLaura: See you at school tomorrow.\nJanet: Bye."
    },
    {
        "track": "TR 5",
        "title": "Unit 3 Ex 10: Alice & Jason West End Show",
        "content": "Alice: Hello.\nJason: Hi, Alice. It's Jason.\nAlice: Hi, Jason. How are you?\nJason: Fine, thanks. Have you got any plans for Friday?\nAlice: No, I haven't. Why?\nJason: I've got two tickets for that new West End show, Bright Lights. Would you like to come with me?\nAlice: Wow! How did you get the tickets?\nJason: I waited in line for four hours!\nAlice: Where shall we meet?\nJason: Let's meet in front of the art gallery at 3 o'clock.\nAlice: OK. After the show we can get something to eat. Do you like pizza?\nAlice: Yes, I love it. It's my favourite food. I'll see you on Friday.\nJason: Bye!\nAlice: See you!"
    },
    {
        "track": "TR 6",
        "title": "Unit 4 Ex 5: Future Plans with Pictures",
        "content": "1 She's going to cut her hair.\n2 He's going to take the dog for a walk.\n3 They're going to have a lesson.\n4 It's going to rain.\n5 They're going to ride their bikes.\n6 He's going to travel by plane."
    },
    {
        "track": "TR 7",
        "title": "Unit 5 Ex 4: Reflexive Pronouns",
        "content": "1 Tony cut himself with the scissors.\n2 Don't worry about them. They can take care of themselves.\n3 The girl was lucky when she fell off her bike that she didn't badly hurt herself.\n4 Be careful! The oven is on. Don't burn yourself.\n5 William and Jeff climbed to the top of the mountain by themselves.\n6 They accidently left their keys in the car so they couldn't open it. They locked themselves out by mistake.\n7 It's not our fault. We shouldn't blame ourselves.\n8 I'm such a fool! I could kick myself!\n9 The exhibition was great. We really enjoyed ourselves.\n10 I don't want you to pay for me. I'll pay for myself."
    },
    {
        "track": "TR 8",
        "title": "Unit 6 Ex 2: Uses of to get",
        "content": "1 A: We're getting old. B: Oh, don't say that!\n2 A: It's getting busy in this café. B: Let's go outside.\n3 A: I'm getting bored of doing my homework. B: Why don't you take a break?\n4 A: The baby's getting tired. B: Why don't you put him to bed?\n5 A: I'm ready to go out. B: Where are you going?\n6 A: This exercise is getting difficult. B: Why don't you ask for help?\n7 A: It's getting late. B: Let's hurry up.\n8 A: I'm getting his jacket for him. B: Why doesn't he get it himself?\n9 A: We got an email. B: Who is it from?\n10 A: She got a dog for Christmas. B: Who gave it to her?"
    },
    {
        "track": "TR 9",
        "title": "Unit 6 Ex 8: Phrasal Verbs with get",
        "content": "1 I was late for work because I didn't get up in time.\n2 Can we finish this tomorrow? I have to go to the station and get on my train at 8 o'clock.\n3 Maria was really upset. She just got in her car and drove away.\n4 Kim didn't get out of class until 5 o'clock.\n5 How do you get on with your work colleagues?\n6 We won't get to the party on time if you don't hurry up.\n7 This is the last stop. Everyone must get off the bus.\n8 The thieves got off with thousands of pounds and some jewellery.\n9 The teacher asked them to get on with their work.\n10 Sorry. I didn't mean to get you in trouble."
    },
    {
        "track": "TR 10",
        "title": "Unit 7 Ex 3: Polite Requests with could",
        "content": "Conversation 1:\nTerry: Hi, Diane. Why weren't you at school today?\nDiane: I'm sick. I have the flu. Could you tell me if we have any homework for next week?\nTerry: Yes, there's going to be a Maths test on Tuesday and an English test on Thursday.\nDiane: Oh, thanks. Anything else?\nTerry: No. But I hope you get better soon.\nDiane: Thanks!\n\nConversation 2:\nAnne: Hello Jack! You're back early.\nJack: Oh hi, Anne. Yes, I didn't have any lectures this afternoon at university.\nAnne: That's good. Actually, I'm glad I caught you.\nJack: Oh yes, Why's that?\nAnne: Could you do me a favour, please? I have an English class this evening but my car is being fixed in the garage. Could you drive me to class?\nJack: Yes, of course! What time's your class?\nAnne: It's from 7:30 p.m. to 9:30 p.m.\nJack: OK, no problem. What time do you want to leave?\nAnne: Well, I have some coursework to finish this afternoon, so could we leave here at around 7 p.m.?\nJack: Yes, okay. Would you like me to come and pick you up as well?\nAnne: No, that's fine. A few classmates and I are going to get something to eat after the class.\nJack: OK, cool. Well, knock on my room door when you're ready to leave.\nAnne: Great! Thanks, Jack. See you later.\nJack: Bye!"
    },
    {
        "track": "TR 11",
        "title": "Unit 7 Ex 6: Directions in Chicago with could",
        "content": "Ursula: Excuse me, officer, could you help me?\nPoliceman: Yes, Madam. What's the problem?\nUrsula: I think I'm lost. I'm looking for the Central Train Station but I've been walking for thirty minutes and I still haven't found it.\nPoliceman: Well, you're in the right direction. Continue down this street past the traffic light. Turn right on Churchill Road. Go past the post office and Jefferson's Groceries. Turn left on South Street and walk for about 150 yards. You will see the station on your right.\nUrsula: Is it far?\nPoliceman: Oh, not too far. It's about fifteen minutes from here on foot.\nUrsula: Fifteen minutes? Ah, my suitcase is so heavy. Is there a bus that stops there?\nPoliceman: Yes, there is. Bus H stops in front of the train station. The bus stop is on the corner of Park Avenue and 7th Street. You can buy a ticket at the newsstand across the street.\nUrsula: How long will it take by bus?\nPoliceman: Well, there's no traffic at this hour. It'll take about six minutes.\nUrsula: How will I know when to get off?\nPoliceman: You can ask the bus driver but don't worry; the Central Station is very big. You can't miss it!"
    },
    {
        "track": "TR 12",
        "title": "Unit 7 Ex 7: Situational Requests with could",
        "content": "1 You're hot and all the windows on the train are closed.\n2 You're a tourist and you need information on how to get to the train station. How do you ask the policeman for directions?\n3 You see a pair of jeans you like but you don't know if they fit you. What do you ask the shop assistant?\n4 You see an old lady trying to cross the street. What do you ask her?\n5 You forgot your watch and the bus isn't arriving. What do you ask the person next to you at the bus stop?"
    },
    {
        "track": "TR 13",
        "title": "Unit 9 Ex 6: Indefinite Pronouns Story",
        "content": "It was a rainy, grey Saturday afternoon when someone knocked at my door. 'Who's there?' I asked. But no one answered. So I slowly opened the door to see if somebody was waiting. But there wasn't anybody in sight. Suddenly, I heard something make a noise. I looked down and saw a small, fluffy kitten stretching itself while it was looking up at me. 'It must be hungry, poor thing,' I thought. 'Let me get it something to eat.' And I went to the kitchen. When I came back five minutes later, the kitten wasn't there. 'It must be somewhere,' I thought, so I started looking for it. But I couldn't find it anywhere. It ran away."
    },
    {
        "track": "TR 14",
        "title": "Unit 10 Ex 4: Obligations with have to",
        "content": "1 I don't want to miss my plane so I have to catch the 7:10 train.\n2 I didn't do well on my last English test so I have to study more this time.\n3 My mother is away this week so I have to do the housework.\n4 I've used up all the coffee so I have to buy some more at the supermarket.\n5 I'm not very good at Maths so I usually have to ask for help.\n6 I've got a cold so I have to stay in bed for a few days."
    },
    {
        "track": "TR 15",
        "title": "Unit 10 Ex 6: Conversation about Work Obligations",
        "content": "Sam: Hi, Tony. How are you?\nTony: I'm great! I've got a new job.\nSam: That's fantastic! What are you going to be doing?\nTony: I'm a product manager for a company that sells food.\nSam: What do you have to do?\nTony: Well, I have to contact the people who sell us their products and we have to agree on a price. Then these people have to send me their products and I have to send them to the supermarkets.\nSam: That sounds interesting. Is it a difficult job?\nTony: Well, sort of. I have to work long hours. I have to start work at five in the morning!\nSam: Wow! And what does your boss do?\nTony: He has to contact our international clients so he has to travel a lot. He has to travel to Ireland, Scotland and Wales next week.\nSam: Do you have to go with him?\nTony: No, I don't have to but I have to fill in for him in the office. I'm enjoying myself so far and I'm happy I don't have to work in that shop anymore!"
    },
    {
        "track": "TR 16",
        "title": "Unit 11 Ex 1: Advice with should",
        "content": "1 A: I've got the flu. B: You should stay in bed.\n2 A: My feet hurt. B: You should buy new shoes.\n3 A: This jacket is too tight. B: You should buy a new one.\n4 A: I'm always tired in the morning. B: You should go to bed earlier.\n5 A: I'm too fat. B: You should try exercising more.\n6 A: I don't feel like walking. B: You should take a taxi.\n7 A: I don't remember what the teacher said. B: You should pay more attention.\n8 A: I'm hungry. B: You should eat something for breakfast.\n9 A: I'm hot. B: You should open the window.\n10 A: Tomorrow is my mother's birthday. B: You should buy her some flowers."
    },
    {
        "track": "TR 17",
        "title": "Unit 11 Ex 7: Doctor Consultations",
        "content": "Dialogue 1:\nDoctor: Good morning, Miss Smith. How are you?\nMiss Smith: I have a terrible headache that doesn't seem to go away.\nDoctor: When did it start?\nMiss Smith: It started two days ago. Yes, on Tuesday evening.\nDoctor: Are you under a lot of stress lately?\nMiss Smith: Yes. I have a lot of problems with my job.\nDoctor: I think you should take some time off work.\n\nDialogue 2:\nDoctor: Good afternoon, Mr Kane. What's the matter?\nMr Kane: I have really bad pains in my back and legs.\nDoctor: Do you exercise regularly?\nMr Kane: Oh, no! I don't remember the last time I exercised!\nDoctor: It looks like you're a little overweight, too. Am I right?\nMr Kane: Well... Yes, I've put on some extra pounds.\nDoctor: You should go on a diet.\nMr Kane: A diet?\nDoctor: Yes. What do you usually eat?\nMr Kane: I love burgers and pizza. I also like take-away food.\nDoctor: You shouldn't eat that kind of food. You should eat lots of fruit and vegetables.\nMr Kane: Anything else?\nDoctor: You should start exercising twice a week. Come see me again next month.\nMr Kane: OK. Thanks for your advice.\n\nDialogue 3:\nDoctor: Hi, Janet. What's the problem?\nJanet: I can't sleep at night.\nDoctor: Since when?\nJanet: Since about ten days now.\nDoctor: What are you doing differently in your life recently?\nJanet: Well, I moved house about a month ago. And I'm busy trying to organise everything.\nDoctor: By yourself?\nJanet: Yes.\nDoctor: You should get somebody to help you.\nJanet: I guess you're right.\nDoctor: And you shouldn't work until late. You should stop and have dinner and then you should relax.\nJanet: But there are so many things to do.\nDoctor: You shouldn't be anxious. Take your time and you'll get everything done.\nJanet: Thanks Dr Jefferson."
    },
    {
        "track": "TR 18",
        "title": "Unit 12 Ex 2: Present Perfect Travel Experiences",
        "content": "Emily: Have you ever been to the United States, Jessica?\nJessica: Well, I've been to New York and Washington. I spent ten days there, but I've never been to San Francisco or Los Angeles.\nEmily: San Francisco is beautiful! I've stayed in San Diego, too.\nJessica: I've heard it's a very nice city, too.\nEmily: Yes. California is a beautiful place. Have you ever visited Ireland?\nJessica: No, I haven't. Have you?\nEmily: Yes, I have. I went a couple of years ago. It's quite different from California but it's just as beautiful.\nJessica: I guess I'll have to go there too!"
    },
    {
        "track": "TR 19",
        "title": "Unit 12 Ex 6: Present Perfect Sentences",
        "content": "1 Have you heard the news?\n2 Has your father left for work yet?\n3 Have you had dinner yet?\n4 How long have you known him?\n5 How many times have you visited your grandparents this month?\n6 Have you ever seen this programme?\n7 I haven't seen Lucy lately. Has she been sick?\n8 Have they asked their parents yet?\n9 How many times has she seen that film?\n10 What's that nice smell? Have you changed perfumes?"
    },
    {
        "track": "TR 20",
        "title": "Unit 14 Ex 8: Relative Clauses Pronunciation",
        "content": "1 The eggs which I bought yesterday are bad.\n2 The boy who broke the window will be punished.\n3 The hairdresser who cut your hair did a good job.\n4 Is the book which is on the table mine?\n5 This is the shop where I go to buy my clothes.\n6 The boy who is sitting at the desk is my brother."
    },
    {
        "track": "TR 21",
        "title": "Unit 15 Ex 5: Verb + -ing or Infinitive",
        "content": "1 I liked going swimming.\n2 I learnt to speak English when I was a child.\n3 They didn't want to go.\n4 They were allowed to stay late.\n5 When I was fifty I moved to Paris.\n6 I love buying new clothes."
    },
    {
        "track": "TR 22",
        "title": "Unit 15 Ex 6: Weekend Plans & Activities",
        "content": "Andy: Hi, Angela. Would you like to have dinner with me tonight?\nAngela: I'd love to but I have a Russian class.\nAndy: I didn't know you were studying Russian. Is it difficult?\nAngela: Yes, but it's interesting, too.\nAndy: And what are you doing Saturday evening?\nAngela: I don't have any plans. What were you thinking to do?\nAndy: I want to go to the cinema. You know, I love watching films.\nAngela: Me too. What time do you want to meet?\nAndy: I was thinking of going to the eight o'clock show.\nAngela: That's fine with me. Where shall we meet?\nAndy: We can meet at the cinema if you want.\nAngela: Actually, I wanted you to pick me up at home! Can you?\nAndy: I promised to lend my car to my brother Saturday.\nAngela: OK. What time shall we meet?\nAndy: I expect to be ready by half past seven. Is that OK?\nAngela: Seven-thirty is fine. I'll see you then.\nAndy: OK. And have a good time at your Russian lesson!"
    },
    {
        "track": "TR 23",
        "title": "Unit 17 Ex 4: First Conditional Clauses",
        "content": "1 If he has to work late...\n2 If it's a nice day tomorrow...\n3 If you don't eat properly...\n4 I'll wear a sweater...\n5 We'll have a picnic...\n6 If you're finished with that book...\n7 If I make too many mistakes...\n8 What will you do if...\n9 I'll buy her a present...\n10 He'll call her tomorrow..."
    },
    {
        "track": "TR 24",
        "title": "Unit 18 Ex 4: Second Conditional Lottery Plans",
        "content": "Monica: Terry, what would you do if you won the lottery?\nTerry: Well, if I won the lottery I'd like to buy a lot of things.\nMonica: What would you buy?\nTerry: First of all I'd buy a new car. Mine is old and it's always breaking down. Then I'd really love to buy a house in the country.\nMonica: Where would you buy it?\nTerry: I'd really like a house close to where my parents live.\nMonica: Anything else?\nTerry: Of course! I would also donate a lot of money to organisations that help the needy.\nMonica: That's a good idea. If I won a lot of money I would do the same.\nTerry: And there's one more thing I just thought of.\nMonica: What's that?\nTerry: I'd like to go to an exotic place on my next holiday. And I'd invite you too!"
    },
    {
        "track": "TR 25",
        "title": "Unit 20 Ex 6: Past Habits with used to",
        "content": "My town has grown quite a bit since I've been living here. It used to be a quiet town; everyone used to know each other and the people used to be very friendly. Now the town has changed. It's much bigger and noisier. There didn't use to be any air pollution either; now there is. There used to be small market stalls selling food. Now there is a big supermarket. The people are always in a hurry nowadays and they never have time to stop and chat. I miss that; we used to always chat when we met each other. I'm not very happy here anymore. I prefer the way things used to be."
    },
    {
        "track": "TR 26",
        "title": "Unit 21 Ex 4: Expressing Agreement & Disagreement",
        "content": "1 Megan must work harder.\n2 We always ask that question.\n3 They never do any homework in class.\n4 He feels ill.\n5 He's going to the mountains this weekend.\n6 I've been to Japan.\n7 She wasn't here yesterday.\n8 We shouldn't talk so loudly."
    },
    {
        "track": "TR 27",
        "title": "Unit 22 Ex 4: Question Tags",
        "content": "1 A: Louise needs a new mobile phone, doesn't she? B: Yes, she does.\n2 A: Mark can't drive yet, can he? B: No, he can't.\n3 A: Joanne and Michael are going to the music festival on Saturday, aren't they? B: Yes, they are.\n4 A: The post office is next to the bank in town, isn't it? B: Yes, it is.\n5 A: Simon hasn't got any pets, has he? B: No, he hasn't.\n6 A: Your sister couldn't get tickets for the show, could she? B: No, she couldn't."
    }
]

print("Audio transcripts ready:", len(A2_AUDIO_TRANSCRIPTS))
