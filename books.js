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
            // 상대 경로로 JSON 파일 로드 시도
            const response = await fetch('./books.json');
            if (!response.ok) {
                throw new Error('Failed to fetch books.json');
            }
            const data = await response.json();
            
            this.books = data.books;
            this.categories = data.categories;
            this.years = data.years;
            this.readingPaths = data.readingPaths;
        } catch (error) {
            console.error('도서 데이터를 불러오는데 실패했습니다:', error);
            console.log('기본 데이터를 사용합니다.');
            this.loadFallbackData();
        }
    }

    loadFallbackData() {
        // 데이터 로딩 실패시 기본 데이터
        this.books = [
            {
                id: 1,
                title: "일리아드",
                author: "호메로스",
                year: "Freshman",
                category: "Literature",
                subject: "Poetry & Epic",
                description: "고대 그리스의 영웅서사시로, 트로이 전쟁을 배경으로 아킬레스의 분노와 영웅적 삶을 그린 작품입니다.",
                educationalValue: "서양 문학의 출발점이자 영웅주의, 명예, 운명에 대한 근본적 질문을 제기하는 작품입니다.",
                readingTips: "고대 그리스 신화에 대한 기본 지식을 갖춘 후 읽으면 더욱 깊이 이해할 수 있습니다.",
                difficulty: "중급",
                estimatedReadingTime: "2-3주",
                tags: ["epic", "mythology", "heroism", "ancient-greece"]
            }
        ];
        
        this.categories = [
            { name: "Literature", description: "문학 작품들", color: "#e74c3c" },
            { name: "Philosophy", description: "철학 저작들", color: "#3498db" },
            { name: "Mathematics", description: "수학 관련 저작", color: "#2ecc71" },
            { name: "Science", description: "과학 저작들", color: "#f39c12" }
        ];
        
        this.years = [
            { name: "Freshman", description: "1학년 과정", order: 1 },
            { name: "Sophomore", description: "2학년 과정", order: 2 },
            { name: "Junior", description: "3학년 과정", order: 3 },
            { name: "Senior", description: "4학년 과정", order: 4 }
        ];
        
        this.readingPaths = [];
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
