import { Book } from '../types/book';

export const sjcGreatBooks: Book[] = [
  {
    id: '1',
    title: 'The Iliad',
    titleKo: '일리아드',
    author: 'Homer',
    authorKo: '호메로스',
    year: '8th century BC',
    classification: 'Language',
    classificationKo: '언어학',
    difficulty: 4,
    pages: 704,
    description: 'An ancient Greek epic poem traditionally attributed to Homer, set during the Trojan War.',
    descriptionKo: '트로이 전쟁을 배경으로 한 호메로스의 고대 그리스 서사시입니다.',
    summary: 'The story of Achilles\' rage and the final year of the Trojan War, exploring themes of honor, wrath, and mortality.',
    summaryKo: '아킬레우스의 분노와 트로이 전쟁의 마지막 해를 다루며, 명예, 분노, 필멸성의 주제를 탐구합니다.',
    whyImportant: 'Foundational work of Western literature that established epic poetry traditions and explores timeless human themes.',
    whyImportantKo: '서구 문학의 기초작으로 서사시 전통을 확립했으며 영원한 인간의 주제들을 탐구합니다.',
    modernRelevance: 'Themes of war, leadership, and human nature remain deeply relevant in contemporary discussions of conflict and ethics.',
    modernRelevanceKo: '전쟁, 리더십, 인간 본성의 주제들이 현대의 갈등과 윤리 논의에서 여전히 깊이 관련됩니다.',
    readingTips: [
      'Start with a good translation (Fagles or Lattimore recommended)',
      'Keep track of character relationships',
      'Focus on the themes rather than memorizing details'
    ],
    readingTipsKo: [
      '좋은 번역본으로 시작하세요 (천병희 번역 추천)',
      '인물 관계를 파악하며 읽으세요',
      '세부사항 암기보다는 주제에 집중하세요'
    ],
    keyQuestions: [
      'What does honor mean to different characters?',
      'How does Achilles change throughout the story?',
      'What role do the gods play in human affairs?'
    ],
    keyQuestionsKo: [
      '각 인물에게 명예란 무엇을 의미하는가?',
      '아킬레우스는 이야기 전반에서 어떻게 변화하는가?',
      '신들은 인간사에서 어떤 역할을 하는가?'
    ],
    quotes: [
      {
        text: 'Rage—Goddess, sing the rage of Peleus\' son Achilles',
        textKo: '분노를 노래하소서, 여신이여, 펠레우스의 아들 아킬레우스의 분노를'
      }
    ],
    gutenbergUrl: 'https://www.gutenberg.org/ebooks/6130',
    imageUrl: '/images/iliad.jpg'
  },
  {
    id: '2',
    title: 'The Odyssey',
    titleKo: '오디세이아',
    author: 'Homer',
    authorKo: '호메로스',
    year: '8th century BC',
    classification: 'Language',
    classificationKo: '언어학',
    difficulty: 4,
    pages: 541,
    description: 'Homer\'s epic poem about Odysseus\' ten-year journey home after the Trojan War.',
    descriptionKo: '트로이 전쟁 후 오디세우스의 10년간의 귀향 여정을 그린 호메로스의 서사시입니다.',
    summary: 'The adventures of Odysseus as he struggles to return home, facing mythical creatures and divine intervention.',
    summaryKo: '오디세우스가 신화적 존재들과 신들의 개입에 맞서며 고향으로 돌아가려 애쓰는 모험담입니다.',
    whyImportant: 'Establishes the hero\'s journey narrative structure and explores themes of home, identity, and perseverance.',
    whyImportantKo: '영웅의 여정이라는 서사 구조를 확립했으며 고향, 정체성, 인내의 주제를 탐구합니다.',
    modernRelevance: 'The themes of homecoming and personal growth resonate with modern experiences of displacement and self-discovery.',
    modernRelevanceKo: '귀향과 개인적 성장의 주제가 현대의 소외와 자아발견 경험과 공명합니다.',
    readingTips: [
      'Pay attention to the parallel stories of Odysseus and Telemachus',
      'Notice the role of hospitality (xenia) in Greek culture',
      'Track Odysseus\' character development'
    ],
    readingTipsKo: [
      '오디세우스와 텔레마코스의 평행한 이야기에 주목하세요',
      '그리스 문화에서 환대(xenia)의 역할을 주의깊게 보세요',
      '오디세우스의 인물 발전을 추적해보세요'
    ],
    keyQuestions: [
      'What makes Odysseus a hero?',
      'How does the concept of home evolve in the story?',
      'What is the significance of storytelling in the epic?'
    ],
    keyQuestionsKo: [
      '오디세우스를 영웅으로 만드는 것은 무엇인가?',
      '이야기에서 고향의 개념은 어떻게 발전하는가?',
      '서사시에서 이야기하기의 의미는 무엇인가?'
    ],
    quotes: [
      {
        text: 'Tell me, Muse, of the man of many ways',
        textKo: '무사여, 나에게 말하소서, 많은 길을 아는 그 사나이에 대해'
      }
    ],
    gutenbergUrl: 'https://www.gutenberg.org/ebooks/1727',
    imageUrl: '/images/odyssey.jpg'
  },
  {
    id: '3',
    title: 'Elements',
    titleKo: '기하학 원론',
    author: 'Euclid',
    authorKo: '유클리드',
    year: '300 BC',
    classification: 'Mathematics',
    classificationKo: '수학',
    difficulty: 5,
    pages: 499,
    description: 'A mathematical treatise consisting of 13 books on geometry and number theory.',
    descriptionKo: '기하학과 수론에 관한 13권으로 구성된 수학 논문집입니다.',
    summary: 'Systematic presentation of geometry starting from basic definitions, postulates, and common notions.',
    summaryKo: '기본 정의, 공준, 공통 개념으로부터 시작하는 기하학의 체계적 제시입니다.',
    whyImportant: 'One of the most influential mathematical works ever written, establishing the axiomatic method.',
    whyImportantKo: '공리적 방법을 확립한, 가장 영향력 있는 수학 저작 중 하나입니다.',
    modernRelevance: 'The logical reasoning and proof techniques remain fundamental to mathematics and science.',
    modernRelevanceKo: '논리적 추론과 증명 기법이 수학과 과학의 기초로 여전히 남아있습니다.',
    readingTips: [
      'Work through the proofs with pencil and paper',
      'Draw the geometric figures',
      'Focus on understanding the logical structure'
    ],
    readingTipsKo: [
      '연필과 종이로 증명을 직접 따라해보세요',
      '기하학적 도형을 그려보세요',
      '논리적 구조 이해에 집중하세요'
    ],
    keyQuestions: [
      'What makes Euclid\'s approach to geometry so powerful?',
      'How do the axioms and postulates work together?',
      'What is the significance of proof in mathematics?'
    ],
    keyQuestionsKo: [
      '유클리드의 기하학 접근법을 그토록 강력하게 만드는 것은 무엇인가?',
      '공리와 공준은 어떻게 함께 작동하는가?',
      '수학에서 증명의 의미는 무엇인가?'
    ],
    quotes: [
      {
        text: 'The whole is greater than the part',
        textKo: '전체는 부분보다 크다'
      }
    ],
    gutenbergUrl: 'https://www.gutenberg.org/ebooks/21076',
    imageUrl: '/images/elements.jpg'
  },
  {
    id: '4',
    title: 'Harmonics',
    titleKo: '화성학',
    author: 'Ptolemy',
    authorKo: '프톨레마이오스',
    year: '2nd century AD',
    classification: 'Music',
    classificationKo: '음악',
    difficulty: 4,
    pages: 234,
    description: 'A treatise on music theory exploring the mathematical foundations of harmony.',
    descriptionKo: '화성의 수학적 기초를 탐구하는 음악 이론 논문입니다.',
    summary: 'Examines the relationship between mathematics and music, particularly in harmonic intervals.',
    summaryKo: '수학과 음악, 특히 화성 음정의 관계를 검토합니다.',
    whyImportant: 'Bridges the gap between mathematical and musical understanding in classical education.',
    whyImportantKo: '고전 교육에서 수학적 이해와 음악적 이해 사이의 격차를 메웁니다.',
    modernRelevance: 'Mathematical approaches to music continue to inform composition and music theory.',
    modernRelevanceKo: '음악에 대한 수학적 접근은 계속해서 작곡과 음악 이론에 정보를 제공합니다.',
    readingTips: [
      'Have a basic understanding of musical intervals',
      'Review basic mathematical ratios',
      'Listen to examples of the harmonies discussed'
    ],
    readingTipsKo: [
      '음정에 대한 기본 이해를 갖추세요',
      '기본적인 수학적 비율을 복습하세요',
      '논의된 화성의 예시를 들어보세요'
    ],
    keyQuestions: [
      'How do mathematical ratios create musical harmony?',
      'What is the relationship between cosmos and music?',
      'How does mathematical beauty relate to musical beauty?'
    ],
    keyQuestionsKo: [
      '수학적 비율은 어떻게 음악적 화성을 만드는가?',
      '우주와 음악의 관계는 무엇인가?',
      '수학적 아름다움은 음악적 아름다움과 어떤 관련이 있는가?'
    ],
    quotes: [
      {
        text: 'Music is the arithmetic of sounds',
        textKo: '음악은 소리의 산술이다'
      }
    ],
    imageUrl: '/images/harmonics.jpg'
  },
  {
    id: '5',
    title: 'The Republic',
    titleKo: '국가',
    author: 'Plato',
    authorKo: '플라톤',
    year: '380 BC',
    classification: 'Philosophy',
    classificationKo: '철학',
    difficulty: 4,
    pages: 416,
    description: 'Plato\'s philosophical dialogue about justice and the ideal state.',
    descriptionKo: '정의와 이상 국가에 대한 플라톤의 철학적 대화편입니다.',
    summary: 'Explores the nature of justice through the analogy of the soul and the state.',
    summaryKo: '영혼과 국가의 유추를 통해 정의의 본질을 탐구합니다.',
    whyImportant: 'Foundational work in political philosophy and introduces key concepts like the Theory of Forms.',
    whyImportantKo: '정치 철학의 기초 작품이며 이데아론과 같은 핵심 개념을 소개합니다.',
    modernRelevance: 'Questions about justice, education, and governance remain central to contemporary political thought.',
    modernRelevanceKo: '정의, 교육, 통치에 대한 질문들이 현대 정치 사상의 중심으로 남아있습니다.',
    readingTips: [
      'Pay attention to the dialogue structure',
      'Consider the relationship between individual and state',
      'Think about the Allegory of the Cave'
    ],
    readingTipsKo: [
      '대화 구조에 주의를 기울이세요',
      '개인과 국가의 관계를 고려해보세요',
      '동굴의 비유에 대해 생각해보세요'
    ],
    keyQuestions: [
      'What is justice according to Plato?',
      'How does the ideal state reflect the ideal soul?',
      'What is the meaning of the Allegory of the Cave?'
    ],
    keyQuestionsKo: [
      '플라톤에 따르면 정의란 무엇인가?',
      '이상 국가는 이상적인 영혼을 어떻게 반영하는가?',
      '동굴의 비유의 의미는 무엇인가?'
    ],
    quotes: [
      {
        text: 'The unexamined life is not worth living',
        textKo: '검토되지 않은 삶은 살 가치가 없다'
      }
    ],
    gutenbergUrl: 'https://www.gutenberg.org/ebooks/1497',
    imageUrl: '/images/republic.jpg'
  },
  {
    id: '6',
    title: 'Nicomachean Ethics',
    titleKo: '니코마코스 윤리학',
    author: 'Aristotle',
    authorKo: '아리스토텔레스',
    year: '4th century BC',
    classification: 'Philosophy',
    classificationKo: '철학',
    difficulty: 4,
    pages: 368,
    description: 'Aristotle\'s treatise on ethics and the nature of human flourishing.',
    descriptionKo: '윤리학과 인간의 번영의 본질에 대한 아리스토텔레스의 논문입니다.',
    summary: 'Examines virtue, character, and the path to eudaimonia (human flourishing).',
    summaryKo: '덕, 성격, 그리고 에우다이모니아(인간의 번영)로 가는 길을 검토합니다.',
    whyImportant: 'Foundational work in virtue ethics that continues to influence moral philosophy.',
    whyImportantKo: '도덕 철학에 계속 영향을 미치는 덕윤리학의 기초 작품입니다.',
    modernRelevance: 'Concepts of virtue and character development remain relevant in ethics and psychology.',
    modernRelevanceKo: '덕과 성격 발달의 개념이 윤리학과 심리학에서 여전히 관련됩니다.',
    readingTips: [
      'Focus on the concept of the golden mean',
      'Think about examples of virtues in your own life',
      'Consider the relationship between happiness and virtue'
    ],
    readingTipsKo: [
      '중용의 개념에 집중하세요',
      '자신의 삶에서 덕의 예시를 생각해보세요',
      '행복과 덕의 관계를 고려해보세요'
    ],
    keyQuestions: [
      'What is virtue according to Aristotle?',
      'How does one achieve eudaimonia?',
      'What is the doctrine of the mean?'
    ],
    keyQuestionsKo: [
      '아리스토텔레스에 따르면 덕이란 무엇인가?',
      '어떻게 에우다이모니아를 달성하는가?',
      '중용의 교리란 무엇인가?'
    ],
    quotes: [
      {
        text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
        textKo: '우리는 반복적으로 하는 것이 곧 우리 자신이다. 그러므로 탁월함은 행위가 아니라 습관이다.'
      }
    ],
    gutenbergUrl: 'https://www.gutenberg.org/ebooks/8438',
    imageUrl: '/images/nicomachean-ethics.jpg'
  },
  {
    id: '7',
    title: 'Almagest',
    titleKo: '알마게스트',
    author: 'Ptolemy',
    authorKo: '프톨레마이오스',
    year: '2nd century AD',
    classification: 'Science',
    classificationKo: '과학',
    difficulty: 5,
    pages: 1500,
    description: 'A comprehensive treatise on astronomy and mathematics.',
    descriptionKo: '천문학과 수학에 관한 포괄적인 논문집입니다.',
    summary: 'Presents a geocentric model of the universe with detailed mathematical calculations.',
    summaryKo: '상세한 수학적 계산을 통해 지구 중심의 우주 모델을 제시합니다.',
    whyImportant: 'Dominated astronomical thinking for over 1000 years and demonstrates scientific method.',
    whyImportantKo: '1000년 이상 천문학적 사고를 지배했으며 과학적 방법을 보여줍니다.',
    modernRelevance: 'Shows how scientific theories develop and change, important for understanding scientific method.',
    modernRelevanceKo: '과학 이론이 어떻게 발전하고 변화하는지 보여주며, 과학적 방법 이해에 중요합니다.',
    readingTips: [
      'Focus on the mathematical methods rather than the geocentric model',
      'Appreciate the observational precision for its time',
      'Consider how this work influenced later astronomers'
    ],
    readingTipsKo: [
      '지구 중심 모델보다는 수학적 방법에 집중하세요',
      '그 시대의 관측 정밀도를 인정하세요',
      '이 작품이 후대 천문학자들에게 어떤 영향을 미쳤는지 고려해보세요'
    ],
    keyQuestions: [
      'How did Ptolemy\'s mathematical approach advance astronomy?',
      'What can we learn from a \'wrong\' scientific theory?',
      'How do observations relate to theoretical models?'
    ],
    keyQuestionsKo: [
      '프톨레마이오스의 수학적 접근법은 어떻게 천문학을 발전시켰는가?',
      '\'틀린\' 과학 이론에서 무엇을 배울 수 있는가?',
      '관측은 이론적 모델과 어떻게 관련되는가?'
    ],
    quotes: [
      {
        text: 'The appearances save the phenomena',
        textKo: '현상은 현상을 구원한다'
      }
    ],
    imageUrl: '/images/almagest.jpg'
  },
  {
    id: '8',
    title: 'The Aeneid',
    titleKo: '아이네이스',
    author: 'Virgil',
    authorKo: '베르길리우스',
    year: '29-19 BC',
    classification: 'Language',
    classificationKo: '언어학',
    difficulty: 4,
    pages: 442,
    description: 'Virgil\'s epic poem about Aeneas\' journey to found Rome.',
    descriptionKo: '아이네아스가 로마를 건국하기 위한 여정을 그린 베르길리우스의 서사시입니다.',
    summary: 'Follows Aeneas from the fall of Troy to the founding of Rome, exploring duty and destiny.',
    summaryKo: '트로이의 몰락부터 로마 건국까지 아이네아스를 따라가며 의무와 운명을 탐구합니다.',
    whyImportant: 'Roman national epic that influenced Western literature and concepts of duty and empire.',
    whyImportantKo: '서구 문학과 의무 및 제국 개념에 영향을 미친 로마의 국민 서사시입니다.',
    modernRelevance: 'Themes of migration, nation-building, and personal sacrifice remain relevant today.',
    modernRelevanceKo: '이주, 국가 건설, 개인적 희생의 주제가 오늘날에도 여전히 관련됩니다.',
    readingTips: [
      'Compare with Homer\'s epics',
      'Pay attention to the theme of pietas (duty)',
      'Notice the political undertones'
    ],
    readingTipsKo: [
      '호메로스의 서사시와 비교해보세요',
      '피에타스(의무)의 주제에 주의하세요',
      '정치적 함의를 주목하세요'
    ],
    keyQuestions: [
      'How does Aeneas differ from Homeric heroes?',
      'What is the significance of duty vs. personal desire?',
      'How does Virgil view the founding of Rome?'
    ],
    keyQuestionsKo: [
      '아이네아스는 호메로스의 영웅들과 어떻게 다른가?',
      '의무 대 개인적 욕망의 의미는 무엇인가?',
      '베르길리우스는 로마 건국을 어떻게 보는가?'
    ],
    quotes: [
      {
        text: 'Fortune favors the bold',
        textKo: '운명은 용감한 자를 돕는다'
      }
    ],
    gutenbergUrl: 'https://www.gutenberg.org/ebooks/228',
    imageUrl: '/images/aeneid.jpg'
  },
  {
    id: '9',
    title: 'Confessions',
    titleKo: '고백록',
    author: 'Augustine',
    authorKo: '아우구스티누스',
    year: '397-400 AD',
    classification: 'Philosophy',
    classificationKo: '철학',
    difficulty: 3,
    pages: 416,
    description: 'Augustine\'s autobiographical work exploring faith, memory, and the nature of time.',
    descriptionKo: '신앙, 기억, 시간의 본질을 탐구하는 아우구스티누스의 자서전적 작품입니다.',
    summary: 'Chronicles Augustine\'s spiritual journey and philosophical reflections on God and human nature.',
    summaryKo: '아우구스티누스의 영적 여정과 하나님 및 인간 본성에 대한 철학적 성찰을 기록합니다.',
    whyImportant: 'Pioneering work of autobiography and introspective philosophy that bridges classical and Christian thought.',
    whyImportantKo: '고전 사상과 기독교 사상을 연결하는 자서전과 내성적 철학의 선구적 작품입니다.',
    modernRelevance: 'Questions about identity, memory, and spiritual seeking remain deeply relevant.',
    modernRelevanceKo: '정체성, 기억, 영적 추구에 대한 질문들이 여전히 깊이 관련됩니다.',
    readingTips: [
      'Notice the innovative autobiographical style',
      'Pay attention to the philosophical discussions of time',
      'Consider the integration of personal and philosophical elements'
    ],
    readingTipsKo: [
      '혁신적인 자서전 스타일을 주목하세요',
      '시간에 대한 철학적 논의에 주의하세요',
      '개인적 요소와 철학적 요소의 통합을 고려해보세요'
    ],
    keyQuestions: [
      'How does Augustine understand the nature of time?',
      'What is the relationship between memory and identity?',
      'How does Augustine reconcile reason and faith?'
    ],
    keyQuestionsKo: [
      '아우구스티누스는 시간의 본질을 어떻게 이해하는가?',
      '기억과 정체성의 관계는 무엇인가?',
      '아우구스티누스는 이성과 신앙을 어떻게 조화시키는가?'
    ],
    quotes: [
      {
        text: 'You have made us for yourself, O Lord, and our hearts are restless until they rest in you.',
        textKo: '주님, 당신은 우리를 당신을 위해 만드셨으므로, 우리 마음은 당신 안에서 쉬기까지 불안합니다.'
      }
    ],
    gutenbergUrl: 'https://www.gutenberg.org/ebooks/3296',
    imageUrl: '/images/confessions.jpg'
  },
  {
    id: '10',
    title: 'The Divine Comedy',
    titleKo: '신곡',
    author: 'Dante Alighieri',
    authorKo: '단테 알리기에리',
    year: '1308-1320',
    classification: 'Language',
    classificationKo: '언어학',
    difficulty: 5,
    pages: 798,
    description: 'Dante\'s epic journey through Hell, Purgatory, and Paradise.',
    descriptionKo: '지옥, 연옥, 천국을 통한 단테의 서사적 여정입니다.',
    summary: 'A spiritual allegory of the soul\'s journey to God, rich in medieval theology and philosophy.',
    summaryKo: '중세 신학과 철학이 풍부한, 하나님을 향한 영혼의 여정의 영적 우화입니다.',
    whyImportant: 'Masterpiece of medieval literature that synthesizes classical and Christian traditions.',
    whyImportantKo: '고전 전통과 기독교 전통을 종합한 중세 문학의 걸작입니다.',
    modernRelevance: 'Themes of moral development and spiritual transformation remain powerful today.',
    modernRelevanceKo: '도덕적 발전과 영적 변화의 주제가 오늘날에도 여전히 강력합니다.',
    readingTips: [
      'Read with a good commentary or guide',
      'Pay attention to the symbolic structure',
      'Notice the development of Dante as character'
    ],
    readingTipsKo: [
      '좋은 주석서나 가이드와 함께 읽으세요',
      '상징적 구조에 주의하세요',
      '인물로서 단테의 발전을 주목하세요'
    ],
    keyQuestions: [
      'How does the journey represent spiritual development?',
      'What is the significance of the numerical symbolism?',
      'How does Dante integrate classical and Christian elements?'
    ],
    keyQuestionsKo: [
      '여정은 영적 발전을 어떻게 나타내는가?',
      '수적 상징주의의 의미는 무엇인가?',
      '단테는 고전적 요소와 기독교적 요소를 어떻게 통합하는가?'
    ],
    quotes: [
      {
        text: 'Abandon all hope, ye who enter here',
        textKo: '여기에 들어오는 자, 모든 희망을 버려라'
      }
    ],
    gutenbergUrl: 'https://www.gutenberg.org/ebooks/8800',
    imageUrl: '/images/divine-comedy.jpg'
  },
  {
    id: '11',
    title: 'Principia Mathematica',
    titleKo: '프린키피아 마테마티카',
    author: 'Newton',
    authorKo: '뉴턴',
    year: '1687',
    classification: 'Science',
    classificationKo: '과학',
    difficulty: 5,
    pages: 512,
    description: 'Newton\'s groundbreaking work on physics and mathematics.',
    descriptionKo: '물리학과 수학에 관한 뉴턴의 획기적인 작품입니다.',
    summary: 'Establishes the laws of motion and universal gravitation through mathematical proof.',
    summaryKo: '수학적 증명을 통해 운동 법칙과 만유인력을 확립합니다.',
    whyImportant: 'Revolutionized science and established the mathematical approach to physics.',
    whyImportantKo: '과학을 혁명화했으며 물리학에 대한 수학적 접근법을 확립했습니다.',
    modernRelevance: 'Foundation of classical mechanics, still used in engineering and space travel.',
    modernRelevanceKo: '고전 역학의 기초로서, 공학과 우주 여행에서 여전히 사용됩니다.',
    readingTips: [
      'Focus on understanding the logical structure',
      'Work through some of the geometric proofs',
      'Consider the revolutionary nature of the mathematical approach'
    ],
    readingTipsKo: [
      '논리적 구조 이해에 집중하세요',
      '기하학적 증명 중 일부를 직접 해보세요',
      '수학적 접근법의 혁명적 본질을 고려해보세요'
    ],
    keyQuestions: [
      'How does Newton use mathematics to describe nature?',
      'What is the significance of the three laws of motion?',
      'How does universal gravitation unify celestial and terrestrial mechanics?'
    ],
    keyQuestionsKo: [
      '뉴턴은 자연을 기술하기 위해 수학을 어떻게 사용하는가?',
      '운동의 세 법칙의 의미는 무엇인가?',
      '만유인력은 천체 역학과 지상 역학을 어떻게 통일하는가?'
    ],
    quotes: [
      {
        text: 'If I have seen further it is by standing on the shoulders of Giants',
        textKo: '내가 더 멀리 본 것이 있다면, 그것은 거인들의 어깨 위에 서 있었기 때문이다'
      }
    ],
    gutenbergUrl: 'https://www.gutenberg.org/ebooks/28233',
    imageUrl: '/images/principia.jpg'
  },
  {
    id: '12',
    title: 'Relativity: The Special and General Theory',
    titleKo: '상대성 이론: 특수 및 일반 이론',
    author: 'Einstein',
    authorKo: '아인슈타인',
    year: '1916',
    classification: 'Science',
    classificationKo: '과학',
    difficulty: 4,
    pages: 168,
    description: 'Einstein\'s accessible explanation of his revolutionary theory of relativity.',
    descriptionKo: '아인슈타인의 혁명적인 상대성 이론에 대한 접근 가능한 설명입니다.',
    summary: 'Explains how space and time are relative and interconnected, revolutionizing our understanding of the universe.',
    summaryKo: '공간과 시간이 상대적이고 상호연결되어 있다는 것을 설명하며, 우주에 대한 우리의 이해를 혁명화합니다.',
    whyImportant: 'Fundamentally changed our understanding of space, time, and gravity.',
    whyImportantKo: '공간, 시간, 중력에 대한 우리의 이해를 근본적으로 바꾸었습니다.',
    modernRelevance: 'Essential for GPS technology, particle physics, and cosmology.',
    modernRelevanceKo: 'GPS 기술, 입자 물리학, 우주론에 필수적입니다.',
    readingTips: [
      'Start with the thought experiments',
      'Don\'t worry about the mathematics initially',
      'Focus on understanding the conceptual shifts'
    ],
    readingTipsKo: [
      '사고 실험부터 시작하세요',
      '처음에는 수학에 대해 걱정하지 마세요',
      '개념적 변화를 이해하는 데 집중하세요'
    ],
    keyQuestions: [
      'What does it mean for space and time to be relative?',
      'How does general relativity differ from special relativity?',
      'What are the implications for our understanding of reality?'
    ],
    keyQuestionsKo: [
      '공간과 시간이 상대적이라는 것은 무엇을 의미하는가?',
      '일반 상대성 이론은 특수 상대성 이론과 어떻게 다른가?',
      '현실에 대한 우리의 이해에 어떤 함의가 있는가?'
    ],
    quotes: [
      {
        text: 'Imagination is more important than knowledge',
        textKo: '상상력이 지식보다 중요하다'
      }
    ],
    gutenbergUrl: 'https://www.gutenberg.org/ebooks/30155',
    imageUrl: '/images/relativity.jpg'
  }
];
