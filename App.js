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
    // index.js에서 데이터 로딩을 보장하므로, 컴포넌트가 렌더링될 때 데이터는 이미 준비되어 있습니다.
    const readingPaths = window.booksData.getReadingPaths();

    const getPathBooks = (pathId) => {
        // window.booksData는 항상 존재합니다.
        return window.booksData.getBooksForPath(pathId);
    };

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
