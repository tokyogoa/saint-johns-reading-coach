// 개별 도서 카드 컴포넌트
const Book = ({ book, onBookClick }) => {
    const [isBookmarked, setIsBookmarked] = React.useState(false);
    const [readingProgress, setReadingProgress] = React.useState({ status: 'not-started', progress: 0 });

    React.useEffect(() => {
        if (window.booksData) {
            setIsBookmarked(window.booksData.isBookmarked(book.id));
            setReadingProgress(window.booksData.getReadingProgress(book.id));
        }
    }, [book.id]);

    const handleBookmark = (e) => {
        e.stopPropagation();
        if (window.booksData) {
            const newState = window.booksData.toggleBookmark(book.id);
            setIsBookmarked(newState);
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Literature': '#e74c3c',
            'Philosophy': '#3498db',
            'Mathematics': '#2ecc71',
            'Science': '#f39c12',
            'History': '#9b59b6'
        };
        return colors[category] || '#95a5a6';
    };

    const getDifficultyColor = (difficulty) => {
        const colors = {
            '초급': '#2ecc71',
            '중급': '#f39c12',
            '중상급': '#e67e22',
            '고급': '#e74c3c',
            '최고급': '#8e44ad'
        };
        return colors[difficulty] || '#95a5a6';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'not-started': 'far fa-circle',
            'reading': 'fas fa-clock',
            'completed': 'fas fa-check-circle'
        };
        return icons[status] || icons['not-started'];
    };

    const getStatusText = (status) => {
        const texts = {
            'not-started': '읽기 전',
            'reading': '읽는 중',
            'completed': '완료'
        };
        return texts[status] || texts['not-started'];
    };

    return (
        <div className="book-card fade-in" onClick={() => onBookClick(book.id)}>
            <div className="book-header">
                <div className="book-status-container">
                    <span className={`reading-status-mini status-${readingProgress.status}`}>
                        <i className={getStatusIcon(readingProgress.status)}></i>
                        {getStatusText(readingProgress.status)}
                    </span>
                    <button 
                        className={`bookmark-btn-mini ${isBookmarked ? 'bookmarked' : ''}`}
                        onClick={handleBookmark}
                        title={isBookmarked ? '북마크 해제' : '북마크 추가'}
                    >
                        <i className={isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark'}></i>
                    </button>
                </div>
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
            </div>
            
            <div className="book-body">
                <div className="book-meta">
                    <span 
                        className="book-badge badge-year" 
                        style={{ backgroundColor: '#e74c3c' }}
                    >
                        {book.year}
                    </span>
                    <span 
                        className="book-badge badge-category"
                        style={{ backgroundColor: getCategoryColor(book.category) }}
                    >
                        {book.category}
                    </span>
                    <span 
                        className="book-badge badge-difficulty"
                        style={{ backgroundColor: getDifficultyColor(book.difficulty) }}
                    >
                        {book.difficulty}
                    </span>
                </div>
                
                <p className="book-description">
                    {book.description.length > 120 
                        ? book.description.substring(0, 120) + '...' 
                        : book.description
                    }
                </p>
                
                <div className="book-subject">
                    <i className="fas fa-tag"></i>
                    <span>{book.subject}</span>
                </div>

                {readingProgress.status === 'reading' && readingProgress.progress > 0 && (
                    <div className="mini-progress">
                        <div className="mini-progress-bar">
                            <div 
                                className="mini-progress-fill" 
                                style={{ width: `${readingProgress.progress}%` }}
                            ></div>
                        </div>
                        <span className="mini-progress-text">{readingProgress.progress}% 완료</span>
                    </div>
                )}
            </div>
            
            <div className="book-footer">
                <div className="reading-time">
                    <i className="far fa-clock"></i>
                    <span>{book.estimatedReadingTime}</span>
                </div>
                <button className="view-btn">
                    자세히 보기
                    <i className="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    );
};

// 추가 스타일을 위한 CSS (App.css에 추가될 내용)
const additionalStyles = `
.book-status-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.reading-status-mini {
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.75rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.3rem;
}

.reading-status-mini.status-not-started {
    background: rgba(149, 165, 166, 0.2);
    color: #7f8c8d;
}

.reading-status-mini.status-reading {
    background: rgba(241, 196, 15, 0.2);
    color: #f39c12;
}

.reading-status-mini.status-completed {
    background: rgba(39, 174, 96, 0.2);
    color: #27ae60;
}

.bookmark-btn-mini {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0.3rem;
    border-radius: 50%;
}

.bookmark-btn-mini:hover {
    color: #f39c12;
    transform: scale(1.1);
}

.bookmark-btn-mini.bookmarked {
    color: #f39c12;
}

.book-subject {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    color: #7f8c8d;
    font-size: 0.9rem;
}

.book-subject i {
    color: #bdc3c7;
}

.mini-progress {
    margin-top: 1rem;
}

.mini-progress-bar {
    background: #ecf0f1;
    border-radius: 8px;
    height: 6px;
    overflow: hidden;
}

.mini-progress-fill {
    background: linear-gradient(90deg, #3498db, #2980b9);
    height: 100%;
    transition: width 0.3s ease;
    border-radius: 8px;
}

.mini-progress-text {
    font-size: 0.75rem;
    color: #7f8c8d;
    margin-top: 0.3rem;
    display: block;
    text-align: center;
}
`;

// 스타일을 동적으로 추가
if (!document.getElementById('book-additional-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'book-additional-styles';
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
}
