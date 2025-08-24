const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// 정적 파일 서빙
app.use('/books.json', express.static(path.join(__dirname, 'books.json')));

// 모든 경로에 대해 index.html 반환 (SPA 라우팅)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 에러 핸들링
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: '서버 오류가 발생했습니다.',
        message: err.message 
    });
});

// 404 핸들링
app.use((req, res) => {
    res.status(404).json({ 
        error: '페이지를 찾을 수 없습니다.' 
    });
});

app.listen(PORT, () => {
    console.log(`
    🚀 세인트 존스 독서 코치가 시작되었습니다!
    
    📚 서버 주소: http://localhost:${PORT}
    📖 Great Books Reading Guide
    
    세인트 존스 칼리지의 위대한 고전 도서 목록을 기반으로 한
    개인 맞춤형 독서 코치 웹앱입니다.
    
    주요 기능:
    - 📚 도서 검색 및 필터링
    - 📊 읽기 진행 상황 추적
    - 🎯 개인 맞춤 독서 경로
    - 💡 전문가 읽기 가이드
    - 🔖 북마크 및 메모 기능
    
    즐거운 독서 여행 되세요! 📖✨
    `);
});

module.exports = app;
