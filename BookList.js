// 도서 목록 컴포넌트
const BookList = ({ onBookClick }) => {
    // index.js에서 데이터 로딩을 보장하므로, 컴포넌트가 렌더링될 때 데이터는 이미 준비되어 있습니다.
    const allBooks = React.useMemo(() => window.booksData.getAllBooks(), []);
    const categories = React.useMemo(() => window.booksData.getCategories(), []);
    const years = React.useMemo(() => window.booksData.getYears(), []);

    const [filteredBooks, setFilteredBooks] = React.useState(allBooks);
    const [filters, setFilters] = React.useState({
        search: '',
        category: 'all',
        year: 'all',
        difficulty: 'all'
    });
    const [sortBy, setSortBy] = React.useState('title');
    const [sortOrder, setSortOrder] = React.useState('asc');

    React.useEffect(() => {
        const filtered = window.booksData.filterBooks(filters);
        const sorted = sortBooks(filtered, sortBy, sortOrder);
        setFilteredBooks(sorted);
    }, [filters, sortBy, sortOrder]);

    const sortBooks = (booksList, sortBy, order) => {
        return [...booksList].sort((a, b) => {
            let valueA, valueB;
            
            switch (sortBy) {
                case 'title':
                    valueA = a.title.toLowerCase();
                    valueB = b.title.toLowerCase();
                    break;
                case 'author':
                    valueA = a.author.toLowerCase();
                    valueB = b.author.toLowerCase();
                    break;
                case 'year':
                    const yearOrder = { 'Freshman': 1, 'Sophomore': 2, 'Junior': 3, 'Senior': 4 };
                    valueA = yearOrder[a.year] || 0;
                    valueB = yearOrder[b.year] || 0;
                    break;
                case 'difficulty':
                    const difficultyOrder = { '초급': 1, '중급': 2, '중상급': 3, '고급': 4, '최고급': 5 };
                    valueA = difficultyOrder[a.difficulty] || 0;
                    valueB = difficultyOrder[b.difficulty] || 0;
                    break;
                default:
                    valueA = a.title.toLowerCase();
                    valueB = b.title.toLowerCase();
            }
            
            if (valueA < valueB) return order === 'asc' ? -1 : 1;
            if (valueA > valueB) return order === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(newSortBy);
            setSortOrder('asc');
        }
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            category: 'all',
            year: 'all',
            difficulty: 'all'
        });
        setSortBy('title');
        setSortOrder('asc');
    };

    const getFilterSummary = () => {
        const activeFilters = [];
        if (filters.search) activeFilters.push(`검색: "${filters.search}"`);
        if (filters.category !== 'all') activeFilters.push(`카테고리: ${filters.category}`);
        if (filters.year !== 'all') activeFilters.push(`학년: ${filters.year}`);
        if (filters.difficulty !== 'all') activeFilters.push(`난이도: ${filters.difficulty}`);
        
        return activeFilters.length > 0 ? activeFilters.join(', ') : '모든 책';
    };

    return (
        <div className="container">
            {/* 검색 및 필터 섹션 */}
            <div className="search-filters">
                <div className="search-header">
                    <h2>
                        <i className="fas fa-search"></i>
                        도서 검색 및 필터
                    </h2>
                    <button className="clear-filters-btn" onClick={clearFilters}>
                        <i className="fas fa-times"></i>
                        필터 초기화
                    </button>
                </div>
                
                {/* 검색창 */}
                <div className="search-row">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="제목, 저자, 내용으로 검색..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                    />
                </div>
                
                {/* 필터 옵션 */}
                <div className="search-row">
                    <select
                        className="filter-select"
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                    >
                        <option value="all">모든 카테고리</option>
                        {categories.map(category => (
                            <option key={category.name} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    
                    <select
                        className="filter-select"
                        value={filters.year}
                        onChange={(e) => handleFilterChange('year', e.target.value)}
                    >
                        <option value="all">모든 학년</option>
                        {years.map(year => (
                            <option key={year.name} value={year.name}>
                                {year.name} ({year.description})
                            </option>
                        ))}
                    </select>
                    
                    <select
                        className="filter-select"
                        value={filters.difficulty}
                        onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                    >
                        <option value="all">모든 난이도</option>
                        <option value="초급">초급</option>
                        <option value="중급">중급</option>
                        <option value="중상급">중상급</option>
                        <option value="고급">고급</option>
                        <option value="최고급">최고급</option>
                    </select>
                </div>
                
                {/* 정렬 옵션 */}
                <div className="sort-options">
                    <span className="sort-label">정렬:</span>
                    <div className="sort-buttons">
                        {[
                            { key: 'title', label: '제목', icon: 'fas fa-font' },
                            { key: 'author', label: '저자', icon: 'fas fa-user' },
                            { key: 'year', label: '학년', icon: 'fas fa-graduation-cap' },
                            { key: 'difficulty', label: '난이도', icon: 'fas fa-chart-line' }
                        ].map(sort => (
                            <button
                                key={sort.key}
                                className={`sort-btn ${sortBy === sort.key ? 'active' : ''}`}
                                onClick={() => handleSortChange(sort.key)}
                            >
                                <i className={sort.icon}></i>
                                {sort.label}
                                {sortBy === sort.key && (
                                    <i className={`fas fa-chevron-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* 필터 요약 */}
                <div className="filter-summary">
                    <span className="summary-text">
                        <i className="fas fa-filter"></i>
                        {getFilterSummary()} ({filteredBooks.length}권)
                    </span>
                </div>
            </div>

            {/* 도서 목록 */}
            {filteredBooks.length === 0 ? (
                <div className="empty-state">
                    <i className="fas fa-search"></i>
                    <h3>검색 결과가 없습니다</h3>
                    <p>다른 검색어나 필터를 시도해보세요.</p>
                    <button className="cta-btn" onClick={clearFilters}>
                        모든 책 보기
                    </button>
                </div>
            ) : (
                <div className="books-grid">
                    {filteredBooks.map(book => (
                        <Book 
                            key={book.id} 
                            book={book} 
                            onBookClick={onBookClick}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// 추가 스타일
const listStyles = `
.search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.search-header h2 {
    font-family: 'Montserrat', sans-serif;
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.clear-filters-btn {
    background: #e74c3c;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: background 0.3s ease;
}

.clear-filters-btn:hover {
    background: #c0392b;
}

.sort-options {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
    flex-wrap: wrap;
}

.sort-label {
    font-weight: 600;
    color: #2c3e50;
}

.sort-buttons {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.sort-btn {
    background: #ecf0f1;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    transition: all 0.3s ease;
}

.sort-btn:hover {
    background: #bdc3c7;
}

.sort-btn.active {
    background: #3498db;
    color: white;
}

.filter-summary {
    margin-top: 1rem;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 10px;
    border-left: 4px solid #3498db;
}

.summary-text {
    color: #2c3e50;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

@media (max-width: 768px) {
    .search-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .sort-options {
        flex-direction: column;
        align-items: flex-start;
    }
    
    .sort-buttons {
        width: 100%;
        justify-content: center;
    }
}
`;

// 스타일 추가
if (!document.getElementById('booklist-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'booklist-styles';
    styleSheet.textContent = listStyles;
    document.head.appendChild(styleSheet);
}
