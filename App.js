// 메인 앱 컴포넌트
const App = () => {
    const [currentPage, setCurrentPage] = React.useState('home');
    const [selectedBookId, setSelectedBookId] = React.useState(null);

    React.useEffect(() => {
        // URL 해시를 통한 라우팅
        const handleHashChange = () => {
            const hash = window.location.hash.slice(1);
            if (hash.startsWith('book/')) {
                const bookId = hash.split('/')[1];
                setSelectedBookId(bookId);
                setCurrentPage('book-detail');
            } else if (hash === 'books') {
                setCurrentPage('books');
            } else if (hash === 'paths') {
                setCurrentPage('paths');
            } else {
                setCurrentPage('home');
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        handleHashChange(); // 초기 로드시 실행

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const handleNavigation = (page, bookId = null) => {
        if (page === 'book' && bookId) {
            window.location.hash = `book/${bookId}`;
        } else if (page === 'books') {
            window.location.hash = 'books';
        } else if (page === 'paths') {
            window.location.hash = 'paths';
        } else {
            window.location.hash = '';
        }
    };

    const handleBookClick = (bookId) => {
        handleNavigation('book', bookId);
    };

    const handleBackToList = () => {
        handleNavigation('books');
    };

    const handleBackToHome = () => {
        handleNavigation('home');
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'books':
                return <BookList onBookClick={handleBookClick} />;
            case 'book-detail':
                return <BookDetailPage bookId={selectedBookId} onBack={handleBackToList} />;
            case 'paths':
                return <ReadingPathsPage onNavigate={handleNavigation} />;
            case 'home':
            default:
                return <HomePage onNavigate={handleNavigation} />;
        }
    };

    return (
        <div className="app">
            {/* 헤더 */}
            <header className="header">
                <div className="header-content">
                    <h1>세인트 존스 독서 코치</h1>
                    <p className="subtitle">Great Books Reading Guide</p>
                </div>
            </header>

            {/* 네비게이션 */}
            <nav className="nav">
                <div className="nav-content">
                    <button 
                        className={`nav-btn ${currentPage === 'home' ? 'active' : ''}`}
                        onClick={() => handleNavigation('home')}
                    >
                        <i className="fas fa-home"></i>
                        홈
                    </button>
                    <button 
                        className={`nav-btn ${currentPage === 'books' ? 'active' : ''}`}
                        onClick={() => handleNavigation('books')}
                    >
                        <i className="fas fa-book"></i>
                        도서 목록
                    </button>
                    <button 
                        className={`nav-btn ${currentPage === 'paths' ? 'active' : ''}`}
                        onClick={() => handleNavigation('paths')}
                    >
                        <i className="fas fa-route"></i>
                        독서 경로
                    </button>
                    <button 
                        className="nav-btn"
                        onClick={() => showBookmarks()}
                    >
                        <i className="fas fa-bookmark"></i>
                        북마크
                    </button>
                    <button 
                        className="nav-btn"
                        onClick={() => showProgress()}
                    >
                        <i className="fas fa-chart-line"></i>
                        내 진도
                    </button>
                </div>
            </nav>

            {/* 메인 컨텐츠 */}
            <main>
                {renderPage()}
            </main>

            {/* 푸터 */}
            <footer className="footer">
                <p>© 2025 세인트 존스 독서 코치. Saint John's College Great Books 커리큘럼을 기반으로 제작되었습니다.</p>
                <p>
                    <a href="https://www.sjc.edu/academic-programs/undergraduate/great-books-reading-list" target="_blank" rel="noopener noreferrer">
                        원본 도서 목록 보기
                    </a>
                </p>
            </footer>
        </div>
    );
};

// 독서 경로 페이지 컴포넌트
const ReadingPathsPage = ({ onNavigate }) => {
    const [readingPaths, setReadingPaths] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        loadReadingPaths();
    }, []);

    const loadReadingPaths = () => {
        if (!window.booksData) {
            setTimeout(loadReadingPaths, 100);
            return;
        }

        setReadingPaths(window.booksData.getReadingPaths());
        setLoading(false);
    };

    const getPathBooks = (pathId) => {
        if (!window.booksData) return [];
        return window.booksData.getBooksForPath(pathId);
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading">
                    <i className="fas fa-spinner"></i>
                    <p>독서 경로를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="page-header">
                <h1>독서 경로</h1>
                <p>체계적인 독서 계획을 통해 효과적으로 고전을 읽어나가세요.</p>
            </div>

            <div className="paths-container">
                {readingPaths.map(path => {
                    const pathBooks = getPathBooks(path.id);
                    return (
                        <div key={path.id} className="path-detail-card">
                            <div className="path-header">
                                <h2>{path.name}</h2>
                                <span className="path-duration">
                                    <i className="fas fa-clock"></i>
                                    {path.duration}
                                </span>
                            </div>
                            
                            <p className="path-description">{path.description}</p>
                            
                            <div className="path-books-list">
                                <h3>포함된 도서 ({pathBooks.length}권)</h3>
                                <div className="path-books-grid">
                                    {pathBooks.map((book, index) => (
                                        <div 
                                            key={book.id} 
                                            className="path-book-item"
                                            onClick={() => onNavigate('book', book.id)}
                                        >
                                            <div className="book-order">{index + 1}</div>
                                            <div className="book-info">
                                                <h4>{book.title}</h4>
                                                <p>{book.author}</p>
                                                <span className="book-category">{book.category}</span>
                                            </div>
                                            <div className="book-arrow">
                                                <i className="fas fa-chevron-right"></i>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="path-actions">
                                <button className="start-path-btn">
                                    <i className="fas fa-play"></i>
                                    이 경로 시작하기
                                </button>
                                <button className="path-info-btn">
                                    <i className="fas fa-info-circle"></i>
                                    상세 정보
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {readingPaths.length === 0 && (
                <div className="empty-state">
                    <i className="fas fa-route"></i>
                    <h3>독서 경로가 없습니다</h3>
                    <p>독서 경로를 준비 중입니다.</p>
                </div>
            )}
        </div>
    );
};

// 북마크 표시 함수
const showBookmarks = () => {
    if (!window.booksData) return;
    
    const bookmarks = window.booksData.getBookmarks();
    if (bookmarks.length === 0) {
        alert('북마크된 책이 없습니다.');
        return;
    }
    
    const bookmarkList = bookmarks.map(bookId => {
        const book = window.booksData.getBookById(bookId);
        return book ? `• ${book.title} - ${book.author}` : '';
    }).filter(Boolean).join('\n');
    
    alert(`북마크된 책들:\n\n${bookmarkList}`);
};

// 진도 표시 함수
const showProgress = () => {
    if (!window.booksData) return;
    
    const books = window.booksData.getAllBooks();
    const progressList = books.map(book => {
        const progress = window.booksData.getReadingProgress(book.id);
        if (progress.status !== 'not-started') {
            const statusText = {
                'reading': '읽는 중',
                'completed': '완료'
            }[progress.status] || progress.status;
            
            return `• ${book.title}: ${statusText} (${progress.progress}%)`;
        }
        return null;
    }).filter(Boolean);
    
    if (progressList.length === 0) {
        alert('읽기 진행 중인 책이 없습니다.');
        return;
    }
    
    alert(`읽기 진행 상황:\n\n${progressList.join('\n')}`);
};

// 독서 경로 페이지 스타일
const pathStyles = `
.page-header {
    text-align: center;
    margin: 2rem 0 3rem 0;
}

.page-header h1 {
    font-family: 'Montserrat', sans-serif;
    color: #2c3e50;
    margin-bottom: 1rem;
}

.page-header p {
    color: #7f8c8d;
    font-size: 1.1rem;
}

.paths-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.path-detail-card {
    background: white;
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.path-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
}

.path-header h2 {
    font-family: 'Montserrat', sans-serif;
    color: #2c3e50;
}

.path-duration {
    background: #3498db;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.path-books-list {
    margin: 2rem 0;
}

.path-books-list h3 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    font-family: 'Montserrat', sans-serif;
}

.path-books-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.path-book-item {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.path-book-item:hover {
    background: #e9ecef;
    transform: translateX(5px);
}

.book-order {
    background: #3498db;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
}

.book-info {
    flex: 1;
}

.book-info h4 {
    color: #2c3e50;
    margin-bottom: 0.3rem;
}

.book-info p {
    color: #7f8c8d;
    font-style: italic;
    margin-bottom: 0.5rem;
}

.book-category {
    background: #e74c3c;
    color: white;
    padding: 0.2rem 0.6rem;
    border-radius: 10px;
    font-size: 0.8rem;
}

.book-arrow {
    color: #bdc3c7;
    font-size: 1.2rem;
}

.path-actions {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.start-path-btn {
    background: linear-gradient(135deg, #27ae60, #229954);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    flex: 1;
    justify-content: center;
    min-width: 200px;
}

.start-path-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
}

.path-info-btn {
    background: #ecf0f1;
    color: #2c3e50;
    border: none;
    padding: 1rem 2rem;
    border-radius: 30px;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.path-info-btn:hover {
    background: #bdc3c7;
}

@media (max-width: 768px) {
    .path-detail-card {
        padding: 2rem 1.5rem;
    }
    
    .path-header {
        flex-direction: column;
        text-align: center;
    }
    
    .path-book-item {
        flex-direction: column;
        text-align: center;
    }
    
    .path-actions {
        flex-direction: column;
    }
    
    .start-path-btn,
    .path-info-btn {
        width: 100%;
    }
}
`;

// 스타일 추가
if (!document.getElementById('path-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'path-styles';
    styleSheet.textContent = pathStyles;
    document.head.appendChild(styleSheet);
}
