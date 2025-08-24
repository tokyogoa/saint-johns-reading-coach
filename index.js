// 앱 진입점
const { createRoot } = ReactDOM;

// DOM이 로드된 후 앱 시작
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('root');
    if (!container) {
        console.error('Root 컨테이너를 찾을 수 없습니다!');
        return;
    }

    try {
        // Babel Standalone이 비동기적으로 스크립트를 처리하므로,
        // books.js에서 window.booksData가 설정될 때까지 기다린 후 앱을 렌더링합니다.
        const startApp = () => {
            // window.booksData 객체가 생성되고, 비동기 데이터 로딩이 완료되었는지 확인합니다.
            if (window.booksData && window.booksData.books.length > 0) {
                console.log('Books 데이터 초기화 완료, React 앱을 렌더링합니다.');
                const root = createRoot(container);
                root.render(React.createElement(App));
            } else {
                // books.js가 아직 로드되지 않았거나 데이터 로딩이 진행 중이면, 잠시 후 다시 시도합니다.
                console.log('Books 데이터 대기 중...');
                setTimeout(startApp, 100);
            }
        };

        console.log('앱 초기화를 시작합니다...');
        startApp();
    } catch (error) {
        console.error('앱 렌더링 중 오류 발생:', error);
        // 오류 시 기본 메시지 표시
        container.innerHTML = `
            <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif;">
                <h1>세인트 존스 독서 코치</h1>
                <p>앱을 로드하는 중 문제가 발생했습니다.</p>
                <p>브라우저를 새로고침해 주세요.</p>
                <button onclick="location.reload()" style="padding: 1rem 2rem; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    새로고침
                </button>
            </div>
        `;
    }
    
    // 서비스 워커 등록 (나중에 오프라인 기능을 위해)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
    
    // 전역 이벤트 리스너
    setupGlobalEventListeners();
});

// 전역 이벤트 리스너 설정
function setupGlobalEventListeners() {
    // 키보드 단축키
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + / : 검색창 포커스
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // ESC : 검색 초기화
        if (e.key === 'Escape') {
            const searchInput = document.querySelector('.search-input');
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
        }
    });
    
    // 스크롤 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // 새로 추가되는 요소들에 대한 옵저버 설정
    const observeNewElements = () => {
        const elements = document.querySelectorAll('.book-card, .feature-card, .path-card');
        elements.forEach(el => {
            if (!el.classList.contains('observed')) {
                el.classList.add('observed');
                observer.observe(el);
            }
        });
    };
    
    // 주기적으로 새 요소 확인
    setInterval(observeNewElements, 1000);
    observeNewElements();
    
    // 로딩 상태 관리
    let loadingTimeout;
    window.showLoading = (message = '로딩 중...') => {
        clearTimeout(loadingTimeout);
        
        const existingLoader = document.querySelector('.global-loader');
        if (existingLoader) {
            existingLoader.remove();
        }
        
        const loader = document.createElement('div');
        loader.className = 'global-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <i class="fas fa-spinner fa-spin"></i>
                <p>${message}</p>
            </div>
        `;
        document.body.appendChild(loader);
        
        // 10초 후 자동 제거
        loadingTimeout = setTimeout(() => {
            if (loader.parentNode) {
                loader.remove();
            }
        }, 10000);
    };
    
    window.hideLoading = () => {
        clearTimeout(loadingTimeout);
        const loader = document.querySelector('.global-loader');
        if (loader) {
            loader.remove();
        }
    };
    
    // 토스트 알림 기능
    window.showToast = (message, type = 'info', duration = 3000) => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = {
            'success': 'fas fa-check-circle',
            'error': 'fas fa-exclamation-circle',
            'warning': 'fas fa-exclamation-triangle',
            'info': 'fas fa-info-circle'
        }[type] || 'fas fa-info-circle';
        
        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
            <button class="toast-close">×</button>
        `;
        
        // 토스트 컨테이너가 없으면 생성
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        
        container.appendChild(toast);
        
        // 닫기 버튼 이벤트
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });
        
        // 자동 제거
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, duration);
    };
    
    // 읽기 세션 추적
    let readingSessionStart = null;
    let readingBookId = null;
    
    window.startReadingSession = (bookId) => {
        readingSessionStart = Date.now();
        readingBookId = bookId;
        
        // 세션 데이터 저장
        localStorage.setItem('current_reading_session', JSON.stringify({
            bookId,
            startTime: readingSessionStart
        }));
    };
    
    window.endReadingSession = () => {
        if (readingSessionStart && readingBookId) {
            const sessionDuration = Date.now() - readingSessionStart;
            const minutes = Math.round(sessionDuration / 60000);
            
            if (minutes > 0) {
                // 읽기 시간 기록
                const existingTime = localStorage.getItem(`reading_time_${readingBookId}`) || '0';
                const totalMinutes = parseInt(existingTime) + minutes;
                localStorage.setItem(`reading_time_${readingBookId}`, totalMinutes.toString());
                
                showToast(`${minutes}분간 읽으셨습니다. 수고하셨어요!`, 'success');
            }
            
            // 세션 초기화
            readingSessionStart = null;
            readingBookId = null;
            localStorage.removeItem('current_reading_session');
        }
    };
    
    // 페이지 떠날 때 읽기 세션 종료
    window.addEventListener('beforeunload', () => {
        endReadingSession();
    });
    
    // 저장된 읽기 세션 복원
    const savedSession = localStorage.getItem('current_reading_session');
    if (savedSession) {
        try {
            const session = JSON.parse(savedSession);
            readingSessionStart = session.startTime;
            readingBookId = session.bookId;
        } catch (e) {
            localStorage.removeItem('current_reading_session');
        }
    }
}

// 전역 CSS 스타일 추가
const globalStyles = `
.global-loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.loader-content {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    color: #2c3e50;
}

.loader-content i {
    font-size: 2rem;
    color: #3498db;
    margin-bottom: 1rem;
}

.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9998;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.toast {
    background: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    gap: 0.8rem;
    min-width: 300px;
    animation: slideInRight 0.3s ease;
    border-left: 4px solid;
}

.toast-success { border-left-color: #27ae60; }
.toast-error { border-left-color: #e74c3c; }
.toast-warning { border-left-color: #f39c12; }
.toast-info { border-left-color: #3498db; }

.toast-success i { color: #27ae60; }
.toast-error i { color: #e74c3c; }
.toast-warning i { color: #f39c12; }
.toast-info i { color: #3498db; }

.toast-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #bdc3c7;
    margin-left: auto;
}

.toast-close:hover {
    color: #7f8c8d;
}

@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* 반응형 토스트 */
@media (max-width: 768px) {
    .toast-container {
        left: 20px;
        right: 20px;
    }
    
    .toast {
        min-width: auto;
        width: 100%;
    }
}

/* 포커스 스타일 향상 */
.search-input:focus,
.filter-select:focus,
button:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
}

/* 스크롤바 스타일링 */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #bdc3c7;
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #95a5a6;
}

/* 선택 스타일 */
::selection {
    background: #3498db;
    color: white;
}

/* 고대비 모드 지원 */
@media (prefers-contrast: high) {
    .book-card,
    .feature-card,
    .path-card {
        border: 2px solid #2c3e50;
    }
    
    .nav-btn {
        border: 2px solid currentColor;
    }
}

/* 다크 모드 기본 지원 */
@media (prefers-color-scheme: dark) {
    /* 다크 모드 스타일은 나중에 추가 가능 */
}

/* 인쇄 스타일 */
@media print {
    .nav,
    .footer,
    .cta-buttons,
    .action-buttons {
        display: none;
    }
    
    .container {
        max-width: 100%;
        padding: 0;
    }
    
    .book-card,
    .feature-card {
        box-shadow: none;
        border: 1px solid #ddd;
    }
}

/* 감소된 모션 설정 */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;

// 전역 스타일 추가
if (!document.getElementById('global-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'global-styles';
    styleSheet.textContent = globalStyles;
    document.head.appendChild(styleSheet);
}
