// 도서 상세 페이지 컴포넌트
const BookDetailPage = ({ bookId, onBack }) => {
    const [book, setBook] = React.useState(null);
    const [relatedBooks, setRelatedBooks] = React.useState([]);
    const [readingProgress, setReadingProgress] = React.useState({ status: 'not-started', progress: 0 });
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        loadBookData();
    }, [bookId]);

    const loadBookData = () => {
        if (!window.booksData) {
            setTimeout(loadBookData, 100);
            return;
        }

        const bookData = window.booksData.getBookById(parseInt(bookId));
        if (bookData) {
            setBook(bookData);
            setRelatedBooks(window.booksData.getRelatedBooks(parseInt(bookId)));
            setReadingProgress(window.booksData.getReadingProgress(parseInt(bookId)));
            setIsBookmarked(window.booksData.isBookmarked(parseInt(bookId)));
        }
        setLoading(false);
    };

    const handleBookmark = () => {
        if (window.booksData && book) {
            const newState = window.booksData.toggleBookmark(book.id);
            setIsBookmarked(newState);
        }
    };

    const handleReadingStatus = (status) => {
        if (window.booksData && book) {
            const progress = status === 'completed' ? 100 : (status === 'reading' ? readingProgress.progress : 0);
            window.booksData.setReadingProgress(book.id, status, progress);
            setReadingProgress({ status, progress });
        }
    };

    const handleProgressUpdate = (progress) => {
        if (window.booksData && book) {
            const status = progress === 100 ? 'completed' : (progress > 0 ? 'reading' : 'not-started');
            window.booksData.setReadingProgress(book.id, status, progress);
            setReadingProgress({ status, progress });
        }
    };

    const getReadingTips = (book) => {
        const tips = [
            {
                icon: 'fas fa-lightbulb',
                title: '읽기 전 준비',
                content: book.readingTips || '이 작품을 읽기 전에 배경 지식을 쌓아보세요.'
            },
            {
                icon: 'fas fa-clock',
                title: '예상 독서 시간',
                content: `이 책은 평균적으로 ${book.estimatedReadingTime} 정도의 시간이 소요됩니다. 하루 30분씩 꾸준히 읽는 것을 추천합니다.`
            },
            {
                icon: 'fas fa-users',
                title: '토론 포인트',
                content: '이 작품의 핵심 주제들에 대해 다른 사람들과 토론해보세요. 더 깊은 이해를 얻을 수 있습니다.'
            },
            {
                icon: 'fas fa-notes-medical',
                title: '독서 노트',
                content: '읽으면서 중요한 구절이나 생각을 기록해보세요. 나중에 다시 읽을 때 큰 도움이 됩니다.'
            }
        ];
        return tips;
    };

    const getStatusText = (status) => {
        const texts = {
            'not-started': '아직 읽지 않음',
            'reading': '읽는 중',
            'completed': '읽기 완료'
        };
        return texts[status] || texts['not-started'];
    };

    const getStatusColor = (status) => {
        const colors = {
            'not-started': '#95a5a6',
            'reading': '#f39c12',
            'completed': '#27ae60'
        };
        return colors[status] || colors['not-started'];
    };

    if (loading) {
        return (
            <div className="container">
                <div className="loading">
                    <i className="fas fa-spinner"></i>
                    <p>도서 정보를 불러오는 중...</p>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <div className="container">
                <div className="error">
                    <i className="fas fa-exclamation-triangle"></i>
                    <p>요청하신 도서를 찾을 수 없습니다.</p>
                    <button className="cta-btn" onClick={onBack}>
                        목록으로 돌아가기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <a href="#" className="back-btn" onClick={(e) => { e.preventDefault(); onBack(); }}>
                <i className="fas fa-arrow-left"></i>
                목록으로 돌아가기
            </a>

            <div className="book-detail">
                <div className="book-detail-header">
                    <div 
                        className="reading-status"
                        style={{ backgroundColor: getStatusColor(readingProgress.status) }}
                    >
                        {getStatusText(readingProgress.status)}
                    </div>
                    
                    <button 
                        className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                        onClick={handleBookmark}
                    >
                        <i className={isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'}></i>
                    </button>

                    <h1 className="book-detail-title">{book.title}</h1>
                    <p className="book-detail-author">by {book.author}</p>
                    
                    <div className="book-detail-meta">
                        <span className="detail-badge">{book.year}</span>
                        <span className="detail-badge">{book.category}</span>
                        <span className="detail-badge">{book.difficulty}</span>
                    </div>
                </div>

                <div className="book-detail-content">
                    {/* 진행 상황 섹션 */}
                    <div className="progress-section">
                        <h3>
                            <i className="fas fa-chart-line"></i>
                            읽기 진행 상황
                        </h3>
                        <div className="progress-controls">
                            <div className="status-buttons">
                                <button 
                                    className={`status-btn ${readingProgress.status === 'not-started' ? 'active' : ''}`}
                                    onClick={() => handleReadingStatus('not-started')}
                                >
                                    <i className="far fa-circle"></i>
                                    읽기 전
                                </button>
                                <button 
                                    className={`status-btn ${readingProgress.status === 'reading' ? 'active' : ''}`}
                                    onClick={() => handleReadingStatus('reading')}
                                >
                                    <i className="fas fa-clock"></i>
                                    읽는 중
                                </button>
                                <button 
                                    className={`status-btn ${readingProgress.status === 'completed' ? 'active' : ''}`}
                                    onClick={() => handleReadingStatus('completed')}
                                >
                                    <i className="fas fa-check-circle"></i>
                                    완료
                                </button>
                            </div>
                            
                            {readingProgress.status === 'reading' && (
                                <div className="progress-input">
                                    <label>진행률: {readingProgress.progress}%</label>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        value={readingProgress.progress}
                                        onChange={(e) => handleProgressUpdate(parseInt(e.target.value))}
                                        className="progress-slider"
                                    />
                                </div>
                            )}
                        </div>
                        
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${readingProgress.progress}%` }}
                            ></div>
                        </div>
                        <p className="progress-text">{readingProgress.progress}% 완료</p>
                    </div>

                    {/* 도서 소개 */}
                    <div className="detail-section">
                        <h3>
                            <i className="fas fa-book-open"></i>
                            도서 소개
                        </h3>
                        <p>{book.description}</p>
                    </div>

                    {/* 교육적 가치 */}
                    <div className="detail-section">
                        <h3>
                            <i className="fas fa-graduation-cap"></i>
                            교육적 가치
                        </h3>
                        <p>{book.educationalValue}</p>
                    </div>

                    {/* 읽기 정보 */}
                    <div className="reading-info">
                        <h3>
                            <i className="fas fa-info-circle"></i>
                            읽기 정보
                        </h3>
                        <div className="reading-info-grid">
                            <div className="info-item">
                                <i className="fas fa-layer-group"></i>
                                <div className="info-label">주제 분야</div>
                                <div className="info-value">{book.subject}</div>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-signal"></i>
                                <div className="info-label">난이도</div>
                                <div className="info-value">{book.difficulty}</div>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-clock"></i>
                                <div className="info-label">예상 독서 시간</div>
                                <div className="info-value">{book.estimatedReadingTime}</div>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-university"></i>
                                <div className="info-label">추천 학년</div>
                                <div className="info-value">{book.year}</div>
                            </div>
                        </div>
                    </div>

                    {/* 읽기 코칭 */}
                    <div className="coaching-section">
                        <h3>
                            <i className="fas fa-user-graduate"></i>
                            읽기 코칭 가이드
                        </h3>
                        <div className="coaching-tips">
                            {getReadingTips(book).map((tip, index) => (
                                <div key={index} className="tip-item">
                                    <div className="tip-icon">
                                        <i className={tip.icon}></i>
                                    </div>
                                    <div className="tip-content">
                                        <div className="tip-title">{tip.title}</div>
                                        <div className="tip-text">{tip.content}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 태그 */}
                    {book.tags && book.tags.length > 0 && (
                        <div className="detail-section">
                            <h3>
                                <i className="fas fa-tags"></i>
                                관련 태그
                            </h3>
                            <div className="tags-container">
                                {book.tags.map((tag, index) => (
                                    <span key={index} className="tag">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 액션 버튼들 */}
                    <div className="action-buttons">
                        <button className="action-btn btn-primary">
                            <i className="fas fa-play"></i>
                            읽기 시작하기
                        </button>
                        <button className="action-btn btn-secondary">
                            <i className="fas fa-users"></i>
                            독서 그룹 찾기
                        </button>
                        <button className="action-btn btn-success">
                            <i className="fas fa-share"></i>
                            친구에게 추천
                        </button>
                    </div>

                    {/* 관련 도서 */}
                    {relatedBooks.length > 0 && (
                        <div className="related-books">
                            <h3>관련 추천 도서</h3>
                            <div className="related-grid">
                                {relatedBooks.map(relatedBook => (
                                    <div 
                                        key={relatedBook.id} 
                                        className="related-book"
                                        onClick={() => window.location.hash = `book/${relatedBook.id}`}
                                    >
                                        <div className="related-book-title">{relatedBook.title}</div>
                                        <div className="related-book-author">{relatedBook.author}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 추가 스타일
const detailStyles = `
.progress-controls {
    margin: 1rem 0;
}

.status-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.status-btn {
    background: #ecf0f1;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.status-btn:hover {
    background: #bdc3c7;
}

.status-btn.active {
    background: #3498db;
    color: white;
}

.progress-input {
    margin: 1rem 0;
}

.progress-input label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #2c3e50;
}

.progress-slider {
    width: 100%;
    height: 8px;
    border-radius: 5px;
    background: #ecf0f1;
    outline: none;
    cursor: pointer;
}

.progress-slider::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3498db;
    cursor: pointer;
}

.progress-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #3498db;
    cursor: pointer;
    border: none;
}

@media (max-width: 768px) {
    .status-buttons {
        justify-content: center;
    }
    
    .status-btn {
        flex: 1;
        min-width: 120px;
        justify-content: center;
    }
}
`;

// 스타일 추가
if (!document.getElementById('bookdetail-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'bookdetail-styles';
    styleSheet.textContent = detailStyles;
    document.head.appendChild(styleSheet);
}
