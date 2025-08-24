// 홈페이지 컴포넌트
const HomePage = ({ onNavigate }) => {
    const [stats, setStats] = React.useState(null);
    const [readingPaths, setReadingPaths] = React.useState([]);
    const [recommendedBooks, setRecommendedBooks] = React.useState([]);
    const [recentBooks, setRecentBooks] = React.useState([]);

    React.useEffect(() => {
        loadHomeData();
    }, []);

    const loadHomeData = () => {
        if (!window.booksData) {
            setTimeout(loadHomeData, 100);
            return;
        }

        setStats(window.booksData.getStats());
        setReadingPaths(window.booksData.getReadingPaths());
        setRecommendedBooks(window.booksData.getReadingRecommendations('beginner'));
        
        // 최근 추가된 책들 (예시로 처음 3권)
        const allBooks = window.booksData.getAllBooks();
        setRecentBooks(allBooks.slice(0, 3));
    };

    const handlePathClick = (pathId) => {
        // 독서 경로 상세 페이지로 이동하거나 해당 책들을 필터링
        console.log('Reading path clicked:', pathId);
        // 여기서는 책 목록으로 이동
        onNavigate('books');
    };

    const features = [
        {
            icon: 'fas fa-book-reader',
            title: '개인 맞춤 독서 계획',
            description: '당신의 수준과 관심사에 맞는 개인화된 독서 계획을 제공합니다.'
        },
        {
            icon: 'fas fa-users',
            title: '독서 커뮤니티',
            description: '같은 책을 읽는 사람들과 토론하고 경험을 나눌 수 있습니다.'
        },
        {
            icon: 'fas fa-chart-line',
            title: '진도 추적',
            description: '읽기 진행 상황을 추적하고 목표를 달성해 나가세요.'
        },
        {
            icon: 'fas fa-lightbulb',
            title: '전문가 가이드',
            description: '각 책에 대한 전문가의 읽기 가이드와 팁을 제공합니다.'
        },
        {
            icon: 'fas fa-graduation-cap',
            title: '교육적 가치',
            description: '각 책이 제공하는 교육적 가치와 교양 영역을 명확히 알 수 있습니다.'
        },
        {
            icon: 'fas fa-star',
            title: '큐레이션',
            description: '세인트 존스 칼리지의 엄선된 고전 목록을 기반으로 합니다.'
        }
    ];

    return (
        <div className="container">
            {/* 히어로 섹션 */}
            <div className="hero">
                <h2>세인트 존스와 함께하는 위대한 책 여행</h2>
                <p>
                    서양 문명의 위대한 고전들을 체계적으로 읽어나가며 진정한 교양을 쌓아보세요. 
                    세인트 존스 칼리지의 검증된 커리큘럼을 바탕으로 한 개인 맞춤형 독서 코치가 
                    당신의 지적 여정을 안내합니다.
                </p>
                <div className="cta-buttons">
                    <a href="#" className="cta-btn" onClick={(e) => { e.preventDefault(); onNavigate('books'); }}>
                        <i className="fas fa-book"></i>
                        책 탐색하기
                    </a>
                    <a href="#" className="cta-btn" onClick={(e) => { e.preventDefault(); onNavigate('paths'); }}>
                        <i className="fas fa-route"></i>
                        독서 경로 찾기
                    </a>
                </div>
            </div>

            {/* 통계 섹션 */}
            {stats && (
                <div className="stats-section">
                    <h2>도서관 현황</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon">
                                <i className="fas fa-book"></i>
                            </div>
                            <div className="stat-number">{stats.total}</div>
                            <div className="stat-label">총 도서 수</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <i className="fas fa-layer-group"></i>
                            </div>
                            <div className="stat-number">{Object.keys(stats.byCategory).length}</div>
                            <div className="stat-label">카테고리</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <i className="fas fa-graduation-cap"></i>
                            </div>
                            <div className="stat-number">{Object.keys(stats.byYear).length}</div>
                            <div className="stat-label">학년 과정</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-icon">
                                <i className="fas fa-route"></i>
                            </div>
                            <div className="stat-number">{readingPaths.length}</div>
                            <div className="stat-label">독서 경로</div>
                        </div>
                    </div>
                </div>
            )}

            {/* 피처 섹션 */}
            <div className="features">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className="feature-icon">
                            <i className={feature.icon}></i>
                        </div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* 독서 경로 섹션 */}
            {readingPaths.length > 0 && (
                <div className="reading-paths">
                    <h2>추천 독서 경로</h2>
                    <div className="paths-grid">
                        {readingPaths.map(path => (
                            <div 
                                key={path.id} 
                                className="path-card"
                                onClick={() => handlePathClick(path.id)}
                            >
                                <h3 className="path-title">{path.name}</h3>
                                <p className="path-description">{path.description}</p>
                                <div className="path-duration">
                                    <i className="fas fa-clock"></i>
                                    {path.duration}
                                </div>
                                <div className="path-books">
                                    <p><strong>{path.books.length}권의 책</strong></p>
                                    {window.booksData && path.books.slice(0, 3).map(bookId => {
                                        const book = window.booksData.getBookById(bookId);
                                        return book ? (
                                            <div key={bookId} className="path-book">
                                                • {book.title} - {book.author}
                                            </div>
                                        ) : null;
                                    })}
                                    {path.books.length > 3 && (
                                        <div className="path-book">
                                            • 그 외 {path.books.length - 3}권...
                                        </div>
                                    )}
                                </div>
                                <button className="path-start-btn">
                                    <i className="fas fa-play"></i>
                                    시작하기
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 추천 도서 섹션 */}
            {recommendedBooks.length > 0 && (
                <div className="recommended-section">
                    <h2>초보자를 위한 추천 도서</h2>
                    <div className="recommended-grid">
                        {recommendedBooks.map(book => (
                            <div 
                                key={book.id} 
                                className="recommended-book"
                                onClick={() => onNavigate('book', book.id)}
                            >
                                <div className="book-mini-header">
                                    <h4>{book.title}</h4>
                                    <span className="book-author">{book.author}</span>
                                </div>
                                <p className="book-mini-description">
                                    {book.description.substring(0, 100)}...
                                </p>
                                <div className="book-mini-meta">
                                    <span className="mini-badge">{book.difficulty}</span>
                                    <span className="mini-badge">{book.estimatedReadingTime}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 최근 도서 섹션 */}
            {recentBooks.length > 0 && (
                <div className="recent-section">
                    <h2>최근 추가된 도서</h2>
                    <div className="recent-grid">
                        {recentBooks.map(book => (
                            <div 
                                key={book.id} 
                                className="recent-book"
                                onClick={() => onNavigate('book', book.id)}
                            >
                                <div className="recent-book-content">
                                    <h4>{book.title}</h4>
                                    <p>{book.author}</p>
                                    <span className="recent-category">{book.category}</span>
                                </div>
                                <div className="recent-book-action">
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 시작하기 섹션 */}
            <div className="getting-started">
                <h2>독서 여행을 시작해보세요</h2>
                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3>관심 분야 선택</h3>
                        <p>문학, 철학, 과학, 수학 중 관심 있는 분야를 선택하세요.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3>수준 확인</h3>
                        <p>자신의 독서 경험과 수준에 맞는 책을 찾아보세요.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3>읽기 시작</h3>
                        <p>전문가 가이드와 함께 체계적으로 읽어나가세요.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">4</div>
                        <h3>진도 관리</h3>
                        <p>읽기 진행 상황을 추적하고 목표를 달성해 나가세요.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 홈페이지 전용 스타일
const homeStyles = `
.stats-section {
    margin: 3rem 0;
    text-align: center;
}

.stats-section h2 {
    font-family: 'Montserrat', sans-serif;
    color: #2c3e50;
    margin-bottom: 2rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
}

.stat-card {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.stat-card:hover {
    transform: translateY(-5px);
}

.stat-icon {
    font-size: 2.5rem;
    color: #3498db;
    margin-bottom: 1rem;
}

.stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.stat-label {
    color: #7f8c8d;
    font-weight: 500;
}

.path-card {
    cursor: pointer;
    transition: all 0.3s ease;
}

.path-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.2);
}

.path-start-btn {
    background: #27ae60;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: background 0.3s ease;
    width: 100%;
    justify-content: center;
}

.path-start-btn:hover {
    background: #229954;
}

.recommended-section, .recent-section {
    margin: 3rem 0;
}

.recommended-section h2, .recent-section h2 {
    font-family: 'Montserrat', sans-serif;
    color: #2c3e50;
    margin-bottom: 2rem;
    text-align: center;
}

.recommended-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.recommended-book {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: all 0.3s ease;
}

.recommended-book:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.2);
}

.book-mini-header h4 {
    font-family: 'Montserrat', sans-serif;
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.book-mini-description {
    color: #7f8c8d;
    line-height: 1.6;
    margin: 1rem 0;
}

.book-mini-meta {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.mini-badge {
    background: #ecf0f1;
    color: #2c3e50;
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
}

.recent-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.recent-book {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
}

.recent-book:hover {
    transform: translateX(5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.recent-book-content h4 {
    color: #2c3e50;
    margin-bottom: 0.3rem;
}

.recent-book-content p {
    color: #7f8c8d;
    font-style: italic;
    margin-bottom: 0.5rem;
}

.recent-category {
    background: #3498db;
    color: white;
    padding: 0.2rem 0.6rem;
    border-radius: 10px;
    font-size: 0.75rem;
}

.recent-book-action {
    color: #3498db;
    font-size: 1.2rem;
}

.getting-started {
    margin: 4rem 0;
    text-align: center;
}

.getting-started h2 {
    font-family: 'Montserrat', sans-serif;
    color: #2c3e50;
    margin-bottom: 3rem;
}

.steps-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.step-card {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    position: relative;
    transition: transform 0.3s ease;
}

.step-card:hover {
    transform: translateY(-5px);
}

.step-number {
    background: #3498db;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    margin: 0 auto 1rem auto;
}

.step-card h3 {
    font-family: 'Montserrat', sans-serif;
    color: #2c3e50;
    margin-bottom: 1rem;
}

.step-card p {
    color: #7f8c8d;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .steps-grid {
        grid-template-columns: 1fr;
    }
    
    .recent-book {
        flex-direction: column;
        text-align: center;
        gap: 1rem;
    }
}
`;

// 스타일 추가
if (!document.getElementById('home-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'home-styles';
    styleSheet.textContent = homeStyles;
    document.head.appendChild(styleSheet);
}
