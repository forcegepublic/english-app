// 上海牛津版 7年级英语语法题库（80+道）
const GRAMMAR_DATA = [
  // ===== be动词 =====
  { id: 1, sentence: "I ___ a student at No.1 Middle School.", blank: "am", options: ["am","is","are","be"], tip: "be动词：I→am，he/she/it→is，you/we/they→are", explanation: "主语是 I，be动词用 am" },
  { id: 2, sentence: "My parents ___ both teachers.", blank: "are", options: ["is","am","are","be"], tip: "parents 是复数，be动词用 are", explanation: "parents 是复数名词，所以用 are" },
  { id: 3, sentence: "Shanghai ___ a beautiful city.", blank: "is", options: ["am","is","are","were"], tip: "Shanghai 是第三人称单数，be动词用 is", explanation: "Shanghai 是单数名词，用 is" },
  { id: 4, sentence: "My best friend and I ___ in the same class.", blank: "are", options: ["is","am","are","was"], tip: "A and B 作主语，be动词用 are", explanation: "两个人用 and 连接，是复数，用 are" },
  { id: 5, sentence: "The weather in Shanghai ___ very hot in summer.", blank: "is", options: ["am","is","are","be"], tip: "The weather 是单数，用 is", explanation: "The weather 是第三人称单数，用 is" },

  // ===== 一般现在时 =====
  { id: 6, sentence: "She ___ to school by subway every day.", blank: "goes", options: ["go","goes","going","went"], tip: "第三人称单数一般现在时，动词加 -s/-es", explanation: "She 是第三人称单数，go → goes" },
  { id: 7, sentence: "My father ___ football on weekends.", blank: "watches", options: ["watch","watches","watching","watched"], tip: "watch 以 -ch 结尾，第三人称单数加 -es", explanation: "My father 是第三人称单数，watch → watches" },
  { id: 8, sentence: "We ___ English every morning.", blank: "read", options: ["read","reads","reading","readed"], tip: "We 是复数，一般现在时动词用原形", explanation: "We 是复数，动词用原形 read" },
  { id: 9, sentence: "Tom ___ not like vegetables.", blank: "does", options: ["do","does","is","has"], tip: "第三人称单数否定句：does not + 动词原形", explanation: "Tom 是第三人称单数，否定用 does not" },
  { id: 10, sentence: "___ your sister study at this school?", blank: "Does", options: ["Do","Does","Is","Are"], tip: "第三人称单数疑问句：Does + 主语 + 动词原形？", explanation: "your sister 是第三人称单数，疑问句用 Does" },
  { id: 11, sentence: "The sun ___ in the east every day.", blank: "rises", options: ["rise","rises","rising","rose"], tip: "客观事实用一般现在时，第三人称单数加 -s", explanation: "The sun 是单数，rise → rises" },
  { id: 12, sentence: "My mother ___ breakfast for us every morning.", blank: "makes", options: ["make","makes","making","made"], tip: "My mother 是第三人称单数，make → makes", explanation: "第三人称单数，make 加 -s → makes" },
  { id: 13, sentence: "The students ___ their teacher very much.", blank: "respect", options: ["respect","respects","respecting","respected"], tip: "The students 是复数，动词用原形", explanation: "students 是复数，动词用原形 respect" },
  { id: 14, sentence: "He ___ his teeth twice a day.", blank: "brushes", options: ["brush","brushes","brushing","brushed"], tip: "brush 以 -sh 结尾，第三人称单数加 -es", explanation: "He 是第三人称单数，brush → brushes" },

  // ===== 现在进行时 =====
  { id: 15, sentence: "Look! The children ___ in the playground.", blank: "are playing", options: ["play","plays","are playing","played"], tip: "Look! 提示正在发生，用现在进行时：be + doing", explanation: "Look! 是现在进行时标志词，children 是复数，用 are playing" },
  { id: 16, sentence: "Be quiet! The baby ___.", blank: "is sleeping", options: ["sleep","sleeps","is sleeping","slept"], tip: "Be quiet! 暗示此刻正在发生，用现在进行时", explanation: "此刻婴儿正在睡觉，用 is sleeping" },
  { id: 17, sentence: "I ___ my homework now. I can't go out.", blank: "am doing", options: ["do","does","am doing","did"], tip: "now 是现在进行时的标志词", explanation: "now 表示此刻，用现在进行时 am doing" },
  { id: 18, sentence: "Listen! Someone ___ outside the door.", blank: "is knocking", options: ["knock","knocks","is knocking","knocked"], tip: "Listen! 提示正在发生，用现在进行时", explanation: "Listen! 是现在进行时标志词，用 is knocking" },
  { id: 19, sentence: "They ___ a football match at the moment.", blank: "are watching", options: ["watch","watches","are watching","watched"], tip: "at the moment 表示此刻，用现在进行时", explanation: "at the moment 是现在进行时标志词，they 用 are watching" },
  { id: 20, sentence: "My parents ___ dinner in the kitchen now.", blank: "are cooking", options: ["cook","cooks","are cooking","cooked"], tip: "now 提示现在进行时，my parents 是复数", explanation: "now + 复数主语，用 are cooking" },

  // ===== 一般过去时 =====
  { id: 21, sentence: "We ___ a school trip to the museum last Friday.", blank: "had", options: ["have","has","had","having"], tip: "last Friday 是过去时间，用一般过去时", explanation: "last Friday 表示过去，have 的过去式是 had" },
  { id: 22, sentence: "She ___ very happy at the party yesterday.", blank: "was", options: ["is","are","was","were"], tip: "yesterday 是过去时间，she 用 was", explanation: "She 是第三人称单数，过去式用 was" },
  { id: 23, sentence: "They ___ not at home last night.", blank: "were", options: ["is","are","was","were"], tip: "They 的 be动词过去式用 were", explanation: "They 是复数，be动词过去式用 were" },
  { id: 24, sentence: "___ you visit the Science Museum last week?", blank: "Did", options: ["Do","Does","Did","Were"], tip: "一般过去时疑问句：Did + 主语 + 动词原形？", explanation: "last week 是过去时间，疑问句用 Did" },
  { id: 25, sentence: "I ___ my keys this morning and couldn't find them.", blank: "lost", options: ["lose","loses","lost","losing"], tip: "this morning 表示今天早上（已过去），lose 的过去式是 lost", explanation: "lose 的过去式是 lost（不规则变化）" },
  { id: 26, sentence: "He ___ a book about animals last night.", blank: "read", options: ["read","reads","readed","reading"], tip: "last night 是过去时间，read 的过去式还是 read（发音不同）", explanation: "read 的过去式是 read（发音变为 /red/），不规则变化" },
  { id: 27, sentence: "We ___ to the Great Wall during the holiday.", blank: "went", options: ["go","goes","went","gone"], tip: "during the holiday 是过去时间，go 的过去式是 went", explanation: "go 的过去式是 went（不规则变化）" },
  { id: 28, sentence: "She ___ her homework before dinner yesterday.", blank: "finished", options: ["finish","finishes","finished","finishing"], tip: "yesterday 是过去时间，finish 的过去式加 -ed", explanation: "yesterday 表示过去，finish → finished" },

  // ===== 冠词 =====
  { id: 29, sentence: "I have ___ umbrella. ___ umbrella is blue.", blank: "an / The", options: ["a / The","an / The","an / A","a / A"], tip: "umbrella 以元音音素开头用 an；第二次提到用 the", explanation: "umbrella 以元音 /ʌ/ 开头，第一次用 an；再次提到用 the" },
  { id: 30, sentence: "She plays ___ piano very well.", blank: "the", options: ["a","an","the","/"], tip: "演奏乐器前加定冠词 the", explanation: "演奏乐器是固定搭配，前面加 the" },
  { id: 31, sentence: "He is ___ honest boy.", blank: "an", options: ["a","an","the","/"], tip: "honest 发音以元音 /ɒ/ 开头，用 an", explanation: "honest 的发音是 /ɒnɪst/，以元音音素开头，用 an" },
  { id: 32, sentence: "___ sun rises in the east.", blank: "The", options: ["A","An","The","/"], tip: "独一无二的事物前用 the", explanation: "太阳是独一无二的，前面用定冠词 the" },
  { id: 33, sentence: "I want to be ___ engineer when I grow up.", blank: "an", options: ["a","an","the","/"], tip: "engineer 以元音音素 /e/ 开头，用 an", explanation: "engineer 以元音音素开头，用 an" },
  { id: 34, sentence: "We have ___ PE lesson on Monday and Wednesday.", blank: "a", options: ["a","an","the","/"], tip: "PE lesson 以辅音音素 /p/ 开头，用 a", explanation: "PE 发音是 /piː/，以辅音音素开头，用 a" },
  { id: 35, sentence: "My father is ___ doctor.", blank: "a", options: ["a","an","the","/"], tip: "doctor 以辅音音素 /d/ 开头，用 a", explanation: "doctor 以辅音音素开头，用 a" },

  // ===== 介词 =====
  { id: 36, sentence: "The school starts ___ half past seven ___ the morning.", blank: "at / in", options: ["in / in","at / in","on / at","at / at"], tip: "具体时刻用 at；上午/下午/晚上用 in", explanation: "at half past seven（具体时刻），in the morning（时间段）" },
  { id: 37, sentence: "My birthday is ___ 1st October.", blank: "on", options: ["in","on","at","of"], tip: "具体日期前用 on", explanation: "1st October 是具体日期，介词用 on" },
  { id: 38, sentence: "The post office is ___ the bank and the supermarket.", blank: "between", options: ["among","between","beside","behind"], tip: "两者之间用 between，三者及以上用 among", explanation: "两个地点之间，用 between" },
  { id: 39, sentence: "I was born ___ 2012.", blank: "in", options: ["in","on","at","of"], tip: "年份前用介词 in", explanation: "年份前用 in，如 in 2012" },
  { id: 40, sentence: "The library is ___ the second floor.", blank: "on", options: ["in","on","at","to"], tip: "在某楼层用 on", explanation: "在某楼层用介词 on，如 on the second floor" },
  { id: 41, sentence: "She arrived ___ the airport two hours ago.", blank: "at", options: ["in","on","at","to"], tip: "到达小地点（机场、车站）用 arrive at", explanation: "arrive at 用于小地点，arrive in 用于大地点（城市、国家）" },
  { id: 42, sentence: "We go to school ___ Monday ___ Friday.", blank: "from / to", options: ["from / to","from / on","on / to","at / to"], tip: "from...to... 表示从...到...", explanation: "from Monday to Friday 表示从周一到周五" },
  { id: 43, sentence: "The book is ___ the desk.", blank: "on", options: ["in","on","under","beside"], tip: "on 表示在...上面（接触表面）", explanation: "书放在桌子上面，用介词 on" },

  // ===== 情态动词 =====
  { id: 44, sentence: "You ___ eat more vegetables. They are good for you.", blank: "should", options: ["can","should","must","would"], tip: "should 表示建议，语气较温和", explanation: "建议对方多吃蔬菜，用 should（应该）" },
  { id: 45, sentence: "___ I use your dictionary, please?", blank: "Can", options: ["Can","Must","Should","Will"], tip: "Can I...? 是礼貌请求的常用句型", explanation: "请求允许用 Can I...?" },
  { id: 46, sentence: "You ___ not run in the corridor.", blank: "must", options: ["can","should","must","will"], tip: "must not 表示禁止，语气强烈", explanation: "must not（mustn't）表示禁止做某事" },
  { id: 47, sentence: "She ___ speak three languages. She is very talented.", blank: "can", options: ["can","must","should","will"], tip: "can 表示能力", explanation: "can 表示有能力做某事" },
  { id: 48, sentence: "You ___ be quiet in the library.", blank: "must", options: ["can","should","must","may"], tip: "must 表示必须，规定要求", explanation: "图书馆规定必须安静，用 must" },
  { id: 49, sentence: "___ I sit here? — Sure, go ahead.", blank: "May", options: ["May","Must","Should","Can"], tip: "May I...? 是更正式的请求许可表达", explanation: "May I...? 比 Can I...? 更正式，表示请求许可" },

  // ===== 比较级/最高级 =====
  { id: 50, sentence: "Shanghai is ___ than Beijing in summer.", blank: "hotter", options: ["hot","hotter","hottest","more hot"], tip: "单音节形容词比较级：双写末尾辅音 + er", explanation: "hot 是单音节词，末尾是辅音，比较级双写 t 加 er → hotter" },
  { id: 51, sentence: "This is ___ film I have ever seen.", blank: "the most interesting", options: ["more interesting","most interesting","the most interesting","the more interesting"], tip: "最高级前加 the，多音节形容词用 the most + 形容词", explanation: "interesting 是多音节词，最高级用 the most interesting" },
  { id: 52, sentence: "My English is ___ than my maths.", blank: "better", options: ["good","well","better","best"], tip: "good 的比较级是 better（不规则变化）", explanation: "good → better → best，不规则比较级" },
  { id: 53, sentence: "This bag is ___ than that one.", blank: "heavier", options: ["heavy","heavier","heaviest","more heavy"], tip: "以辅音+y结尾的形容词，变y为i加er", explanation: "heavy → heavier（变 y 为 i，加 er）" },
  { id: 54, sentence: "He is the ___ student in our class.", blank: "tallest", options: ["tall","taller","tallest","most tall"], tip: "最高级：单音节形容词加 -est", explanation: "tall → tallest（单音节，加 -est）" },
  { id: 55, sentence: "This problem is ___ than I thought.", blank: "more difficult", options: ["difficult","more difficult","most difficult","difficulter"], tip: "多音节形容词比较级用 more + 形容词", explanation: "difficult 是多音节词，比较级用 more difficult" },
  { id: 56, sentence: "The weather today is ___ than yesterday.", blank: "worse", options: ["bad","badly","worse","worst"], tip: "bad 的比较级是 worse（不规则变化）", explanation: "bad → worse → worst，不规则比较级" },

  // ===== there be =====
  { id: 57, sentence: "There ___ a library and two labs in our school.", blank: "is", options: ["is","are","has","have"], tip: "There be 就近原则：be动词与最近的名词一致", explanation: "a library 是单数，离 be 动词最近，所以用 is" },
  { id: 58, sentence: "There ___ many students in the playground now.", blank: "are", options: ["is","are","was","has"], tip: "many students 是复数，There be 用 are", explanation: "many students 是复数，所以用 are" },
  { id: 59, sentence: "There ___ a football match yesterday afternoon.", blank: "was", options: ["is","are","was","were"], tip: "yesterday 是过去时间，a football match 是单数，用 was", explanation: "过去时间 + 单数名词，用 was" },
  { id: 60, sentence: "Is there ___ milk in the fridge?", blank: "any", options: ["some","any","a","an"], tip: "疑问句和否定句中用 any，肯定句用 some", explanation: "疑问句中用 any，肯定句中用 some" },

  // ===== 频率副词 =====
  { id: 61, sentence: "I ___ brush my teeth before going to bed.", blank: "always", options: ["always","never","sometimes","seldom"], tip: "频率副词放在 be动词后、实义动词前", explanation: "always（总是）放在实义动词 brush 前面" },
  { id: 62, sentence: "She is ___ late for school. Her teacher is angry.", blank: "always", options: ["never","always","sometimes","usually"], tip: "根据语境：老师生气，说明她总是迟到", explanation: "老师生气说明她总是（always）迟到" },
  { id: 63, sentence: "He ___ eats fast food. He prefers healthy food.", blank: "seldom", options: ["always","usually","seldom","often"], tip: "根据语境：他更喜欢健康食品，所以很少吃快餐", explanation: "seldom 表示很少，符合语境" },

  // ===== 疑问词 =====
  { id: 64, sentence: "___ does it take to get to school by bus?", blank: "How long", options: ["How far","How long","How much","How many"], tip: "How long 询问时间长度，How far 询问距离", explanation: "询问花多长时间用 How long" },
  { id: 65, sentence: "___ is the weather like in Shanghai in summer?", blank: "What", options: ["How","What","Which","Where"], tip: "What is ... like? 询问某事物的特征/情况", explanation: "What is the weather like? 是询问天气情况的固定句型" },
  { id: 66, sentence: "___ students are there in your class?", blank: "How many", options: ["How much","How many","How long","How often"], tip: "How many 询问可数名词的数量", explanation: "students 是可数名词，用 How many 询问数量" },
  { id: 67, sentence: "___ do you go to the library? — Twice a week.", blank: "How often", options: ["How long","How far","How often","How much"], tip: "How often 询问频率，回答用 once/twice/three times...", explanation: "回答是 Twice a week（每周两次），所以问频率用 How often" },
  { id: 68, sentence: "___ is it from your home to school?", blank: "How far", options: ["How long","How far","How much","How many"], tip: "How far 询问距离", explanation: "询问距离用 How far" },

  // ===== 现在完成时 =====
  { id: 69, sentence: "I ___ never been to Beijing.", blank: "have", options: ["am","have","has","had"], tip: "现在完成时：have/has + 过去分词，I 用 have", explanation: "I 是第一人称，现在完成时用 have + been" },
  { id: 70, sentence: "She ___ already finished her homework.", blank: "has", options: ["have","has","had","is"], tip: "She 是第三人称单数，现在完成时用 has", explanation: "She 是第三人称单数，现在完成时用 has + finished" },
  { id: 71, sentence: "Have you ___ eaten dumplings before?", blank: "ever", options: ["ever","never","already","yet"], tip: "Have you ever...? 询问是否有过某种经历", explanation: "Have you ever...? 是询问经历的固定句型" },
  { id: 72, sentence: "I haven't seen that film ___.", blank: "yet", options: ["already","ever","yet","just"], tip: "yet 用于现在完成时的否定句，表示'还没有'", explanation: "否定句中用 yet 表示'还没有'" },
  { id: 73, sentence: "He has ___ left. You just missed him.", blank: "just", options: ["yet","ever","just","already"], tip: "just 表示'刚刚'，用于现在完成时", explanation: "just 表示刚刚发生，用于现在完成时" },

  // ===== 将来时 =====
  { id: 74, sentence: "We ___ have a school trip next week.", blank: "will", options: ["will","would","are","have"], tip: "will + 动词原形 表示将来", explanation: "next week 是将来时间，用 will + have" },
  { id: 75, sentence: "Look at the dark clouds. It ___ rain soon.", blank: "is going to", options: ["will","is going to","is","was going to"], tip: "根据眼前迹象预测用 be going to", explanation: "看到乌云（眼前迹象），预测即将下雨，用 is going to" },
  { id: 76, sentence: "I ___ visit my grandparents this Sunday.", blank: "am going to", options: ["will","am going to","go","went"], tip: "已计划好的事情用 be going to", explanation: "已经计划好的事情用 be going to" },

  // ===== 动名词/不定式 =====
  { id: 77, sentence: "I enjoy ___ English songs.", blank: "singing", options: ["sing","sings","singing","to sing"], tip: "enjoy 后接动名词（-ing形式）", explanation: "enjoy 是固定接动名词的动词，enjoy doing sth." },
  { id: 78, sentence: "She wants ___ a doctor in the future.", blank: "to be", options: ["be","being","to be","been"], tip: "want 后接不定式（to + 动词原形）", explanation: "want to do sth. 是固定搭配" },
  { id: 79, sentence: "We should stop ___ so much plastic.", blank: "using", options: ["use","uses","to use","using"], tip: "stop doing sth. 停止做某事（stop to do 是停下来去做）", explanation: "stop doing sth. 表示停止正在做的事" },
  { id: 80, sentence: "He is good at ___ maths problems.", blank: "solving", options: ["solve","solves","to solve","solving"], tip: "be good at 后接动名词（-ing形式）", explanation: "be good at 是固定搭配，后接动名词" },

  // ===== 被动语态（7年级下册引入） =====
  { id: 81, sentence: "English ___ spoken in many countries.", blank: "is", options: ["is","are","was","be"], tip: "被动语态：be + 过去分词，English 是单数", explanation: "English 是单数，被动语态用 is + spoken" },
  { id: 82, sentence: "The windows ___ cleaned every week.", blank: "are", options: ["is","are","was","were"], tip: "The windows 是复数，被动语态用 are", explanation: "windows 是复数，被动语态用 are + cleaned" },

  // ===== 综合练习 =====
  { id: 83, sentence: "Neither Tom nor his friends ___ interested in the game.", blank: "are", options: ["is","are","was","am"], tip: "neither...nor... 就近原则，his friends 是复数，用 are", explanation: "就近原则：his friends 是复数，be动词用 are" },
  { id: 84, sentence: "It ___ two hours to walk to the park.", blank: "takes", options: ["spends","takes","costs","pays"], tip: "It takes sb. some time to do sth. 是固定句型", explanation: "It takes + 时间 是固定句型，表示花费时间" },
  { id: 85, sentence: "The more you practise, ___ your English will be.", blank: "the better", options: ["better","the better","the best","best"], tip: "the more...the more/better... 越...越...", explanation: "the more...the better... 是固定句型，表示越...越..." },
];
