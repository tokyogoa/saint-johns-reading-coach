// 도서 데이터를 가져오는 유틸리티 함수들
class BooksData {
    constructor() {
        this.books = [];
        this.categories = [];
        this.years = [];
        this.readingPaths = [];
        this.loadData();
    }

    async loadData() {
        try {
            // 1. 상대 경로로 먼저 시도 (로컬 서버 및 대부분의 배포 환경)
            let response = await fetch('./books.json');

            // 2. 실패 시, GitHub Pages를 위한 절대 경로로 재시도
            if (!response.ok) {
                console.warn("상대 경로 './books.json' 로딩 실패, 절대 경로로 재시도합니다.");
                response = await fetch('/saint-johns-reading-coach/books.json');
            }

            // 3. 두 번의 시도 모두 실패하면 에러를 발생시켜 fallback 로직을 실행
            if (!response.ok) {
                throw new Error(`books.json 로딩 실패. Status: ${response.status}`);
            }

            const data = await response.json();
            this.books = data.books;
            this.categories = data.categories;
            this.years = data.years;
            this.readingPaths = data.readingPaths;
            
            console.log('도서 데이터 로드 완료:', this.books.length, '권');
        } catch (error) {
            console.error('도서 데이터를 불러오는데 실패했습니다:', error);
            console.log('기본 데이터를 사용합니다.');
            this.loadFallbackData();
        }
    }

    loadFallbackData() {
        console.log('기본 데이터를 로드합니다...');
        // 데이터 로딩 실패시 기본 데이터
        this.books = [
            {
                id: 1,
                title: "일리아드",
                author: "호메로스",
                year: "Freshman",
                category: "Literature",
                subject: "Poetry & Epic",
                description: "고대 그리스의 영웅서사시로, 트로이 전쟁을 배경으로 아킬레스의 분노와 영웅적 삶을 그린 작품입니다. 서양 문학의 출발점이자 영웅주의와 명예에 대한 근본적 질문을 제기합니다.",
                educationalValue: "서양 문학의 출발점이자 영웅주의, 명예, 운명에 대한 근본적 질문을 제기하는 작품입니다.",
                readingTips: "고대 그리스 신화에 대한 기본 지식을 갖춘 후 읽으면 더욱 깊이 이해할 수 있습니다.",
                difficulty: "중급",
                estimatedReadingTime: "2-3주",
                tags: ["epic", "mythology", "heroism", "ancient-greece"]
            },
            {
                id: 2,
                title: "오디세이아",
                author: "호메로스",
                year: "Freshman",
                category: "Literature",
                subject: "Poetry & Epic",
                description: "오디세우스의 10년간의 모험담을 통해 인간의 지혜와 끈기, 그리움을 그린 고전입니다. 모험과 성장, 가족에 대한 사랑의 이야기입니다.",
                educationalValue: "모험과 성장, 가족에 대한 사랑, 지혜의 중요성을 배울 수 있는 작품입니다.",
                readingTips: "일리아드를 먼저 읽고 나서 읽으면 등장인물들의 배경을 더 잘 이해할 수 있습니다.",
                difficulty: "중급",
                estimatedReadingTime: "2-3주",
                tags: ["adventure", "wisdom", "homecoming", "ancient-greece"]
            },
            {
                id: 3,
                title: "국가론",
                author: "플라톤",
                year: "Freshman",
                category: "Philosophy",
                subject: "Political Philosophy",
                description: "이상국가론을 통해 정의, 교육, 철학에 대한 플라톤의 사상을 체계적으로 제시한 작품입니다. 서양 철학의 기초가 되는 이데아론을 담고 있습니다.",
                educationalValue: "서양 철학의 기초가 되는 이데아론과 정치철학의 출발점을 학습할 수 있습니다.",
                readingTips: "대화체로 쓰여진 작품이므로 소크라테스의 문답법을 이해하며 읽어보세요.",
                difficulty: "고급",
                estimatedReadingTime: "3-4주",
                tags: ["philosophy", "politics", "education", "justice"]
            },
            {
                id: 4,
                title: "니코마코스 윤리학",
                author: "아리스토텔레스",
                year: "Sophomore",
                category: "Philosophy",
                subject: "Ethics",
                description: "덕윤리학의 체계를 확립한 아리스토텔레스의 대표적 윤리학 저작입니다. 서양 윤리학의 기초를 다진 불멸의 고전입니다.",
                educationalValue: "서양 윤리학의 기초와 덕성, 행복에 대한 체계적 사고를 기를 수 있습니다.",
                readingTips: "플라톤의 철학을 먼저 이해한 후, 아리스토텔레스만의 독창적 사상을 파악해보세요.",
                difficulty: "고급",
                estimatedReadingTime: "3-4주",
                tags: ["ethics", "virtue", "happiness", "philosophy"]
            },
            {
                id: 5,
                title: "유클리드 기하학 원론",
                author: "유클리드",
                year: "Freshman",
                category: "Mathematics",
                subject: "Geometry",
                description: "기하학의 체계적 기초를 마련한 유클리드의 불멸의 수학서입니다. 논리적 사고와 증명의 방법론을 배울 수 있습니다.",
                educationalValue: "논리적 사고와 증명의 방법론, 수학적 사고의 기초를 배울 수 있습니다.",
                readingTips: "각 정리를 차근차근 따라가며 증명 과정을 이해하는 것이 중요합니다.",
                difficulty: "중상급",
                estimatedReadingTime: "4-6주",
                tags: ["mathematics", "geometry", "logic", "proof"]
            },
            {
                id: 6,
                title: "햄릿",
                author: "셰익스피어",
                year: "Junior",
                category: "Literature",
                subject: "Drama",
                description: "복수와 광기, 실존적 고뇌를 그린 셰익스피어의 최고 걸작 중 하나입니다. 인간 심리의 복잡성을 탁월하게 그려낸 작품입니다.",
                educationalValue: "인간 심리의 복잡성과 실존적 문제에 대한 깊은 통찰을 제공합니다.",
                readingTips: "르네상스 시대의 사회적 배경과 복수극의 전통을 이해하고 읽어보세요.",
                difficulty: "중상급",
                estimatedReadingTime: "2주",
                tags: ["drama", "psychology", "existentialism", "renaissance"]
            }
        ];
        
        this.categories = [
            { name: "Literature", description: "문학 작품들", color: "#e74c3c" },
            { name: "Philosophy", description: "철학 저작들", color: "#3498db" },
            { name: "Mathematics", description: "수학 관련 저작", color: "#2ecc71" },
            { name: "Science", description: "과학 저작들", color: "#f39c12" },
            { name: "History", description: "역사 관련 저작", color: "#9b59b6" }
        ];
        
        this.years = [
            { name: "Freshman", description: "1학년 과정", order: 1 },
            { name: "Sophomore", description: "2학년 과정", order: 2 },
            { name: "Junior", description: "3학년 과정", order: 3 },
            { name: "Senior", description: "4학년 과정", order: 4 }
        ];
        
        this.readingPaths = [
            {
                id: "classical",
                name: "고전 기초 코스",
                description: "서양 고전의 기초를 다지는 코스",
                books: [1, 2, 3, 5],
                duration: "3개월"
            },
            {
                id: "philosophy",
                name: "철학 탐구 코스", 
                description: "철학적 사고력을 기르는 코스",
                books: [3, 4],
                duration: "2개월"
            }
        ];
        
        console.log('기본 데이터 로드 완료:', this.books.length, '권');
    }

    getAllBooks() {
        return this.books;
    }

    getBookById(id) {
        return this.books.find(book => book.id === parseInt(id));
    }

    getBooksByCategory(category) {
        if (!category || category === 'all') return this.books;
        return this.books.filter(book => book.category === category);
    }

    getBooksByYear(year) {
        if (!year || year === 'all') return this.books;
        return this.books.filter(book => book.year === year);
    }

    getBooksByDifficulty(difficulty) {
        if (!difficulty || difficulty === 'all') return this.books;
        return this.books.filter(book => book.difficulty === difficulty);
    }

    searchBooks(query) {
        if (!query) return this.books;
        
        const searchTerm = query.toLowerCase();
        return this.books.filter(book => 
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.description.toLowerCase().includes(searchTerm) ||
            book.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    filterBooks(filters) {
        let filteredBooks = this.books;

        if (filters.search) {
            filteredBooks = this.searchBooks(filters.search);
        }

        if (filters.category && filters.category !== 'all') {
            filteredBooks = filteredBooks.filter(book => book.category === filters.category);
        }

        if (filters.year && filters.year !== 'all') {
            filteredBooks = filteredBooks.filter(book => book.year === filters.year);
        }

        if (filters.difficulty && filters.difficulty !== 'all') {
            filteredBooks = filteredBooks.filter(book => book.difficulty === filters.difficulty);
        }

        return filteredBooks;
    }

    getCategories() {
        return this.categories;
    }

    getYears() {
        return this.years.sort((a, b) => a.order - b.order);
    }

    getReadingPaths() {
        return this.readingPaths;
    }

    getReadingPath(pathId) {
        return this.readingPaths.find(path => path.id === pathId);
    }

    getBooksForPath(pathId) {
        const path = this.getReadingPath(pathId);
        if (!path) return [];
        
        return path.books.map(bookId => this.getBookById(bookId)).filter(Boolean);
    }

    getRelatedBooks(bookId, limit = 3) {
        const book = this.getBookById(bookId);
        if (!book) return [];

        // 같은 카테고리나 연도의 책들을 찾아서 추천
        const related = this.books.filter(b => 
            b.id !== bookId && 
            (b.category === book.category || b.year === book.year)
        );

        return related.slice(0, limit);
    }

    getDifficultyLevels() {
        return ['초급', '중급', '중상급', '고급', '최고급'];
    }

    getReadingRecommendations(userLevel = 'beginner') {
        const levelMap = {
            'beginner': ['초급', '중급'],
            'intermediate': ['중급', '중상급'],
            'advanced': ['중상급', '고급', '최고급']
        };

        const allowedDifficulties = levelMap[userLevel] || levelMap['beginner'];
        
        return this.books
            .filter(book => allowedDifficulties.includes(book.difficulty))
            .sort(() => Math.random() - 0.5)
            .slice(0, 5);
    }

    getProgressiveReadingPlan() {
        // 학년순으로 정렬된 독서 계획
        const sortedYears = this.getYears();
        const plan = {};

        sortedYears.forEach(year => {
            plan[year.name] = this.getBooksByYear(year.name);
        });

        return plan;
    }

    // 로컬 스토리지를 이용한 독서 진행 상황 관리
    getReadingProgress(bookId) {
        const progress = localStorage.getItem(`book_progress_${bookId}`);
        return progress ? JSON.parse(progress) : { status: 'not-started', progress: 0 };
    }

    setReadingProgress(bookId, status, progress = 0) {
        const data = { status, progress, updatedAt: new Date().toISOString() };
        localStorage.setItem(`book_progress_${bookId}`, JSON.stringify(data));
    }

    getBookmarks() {
        const bookmarks = localStorage.getItem('bookmarked_books');
        return bookmarks ? JSON.parse(bookmarks) : [];
    }

    toggleBookmark(bookId) {
        const bookmarks = this.getBookmarks();
        const index = bookmarks.indexOf(bookId);
        
        if (index > -1) {
            bookmarks.splice(index, 1);
        } else {
            bookmarks.push(bookId);
        }
        
        localStorage.setItem('bookmarked_books', JSON.stringify(bookmarks));
        return bookmarks.includes(bookId);
    }

    isBookmarked(bookId) {
        return this.getBookmarks().includes(bookId);
    }

    // 통계 정보
    getStats() {
        const total = this.books.length;
        const byCategory = {};
        const byYear = {};
        const byDifficulty = {};

        this.books.forEach(book => {
            byCategory[book.category] = (byCategory[book.category] || 0) + 1;
            byYear[book.year] = (byYear[book.year] || 0) + 1;
            byDifficulty[book.difficulty] = (byDifficulty[book.difficulty] || 0) + 1;
        });

        return {
            total,
            byCategory,
            byYear,
            byDifficulty
        };
    }
}

// 전역 인스턴스 생성
window.booksData = new BooksData();
