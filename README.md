# 세인트 존스 독서 코치 📚

세인트 존스 칼리지의 위대한 고전 도서 목록을 기반으로 한 개인 맞춤형 독서 코치 웹앱입니다.

## 🌟 주요 기능

- 📚 체계적인 도서 검색 및 필터링
- 📊 개인 읽기 진행 상황 추적
- 🎯 맞춤형 독서 경로 제공
- 💡 전문가 읽기 가이드
- 🔖 북마크 및 메모 기능
- 📱 완전한 반응형 디자인

## 🚀 배포 방법

### 1. Netlify Drop 사용
1. [Netlify Drop](https://app.netlify.com/drop) 방문
2. 프로젝트 폴더 전체를 드래그 앤 드롭
3. 자동 배포 완료!

### 2. GitHub Pages 사용
1. GitHub 저장소 생성
2. 모든 파일 업로드
3. Settings > Pages에서 배포 설정

### 3. 로컬 실행
```bash
# Python 서버 사용
python3 -m http.server 8000

# 또는 Node.js 서버 사용
npm install
npm start
```

## 📁 파일 구조

```
📦 Saint Jones Reading List
├── 📄 index.html          # 메인 HTML 파일
├── 🎨 App.css            # 메인 스타일시트
├── 🎨 BookDetailPage.css # 상세 페이지 스타일
├── ⚛️ App.js             # 메인 React 컴포넌트
├── ⚛️ HomePage.js        # 홈페이지 컴포넌트
├── ⚛️ BookList.js        # 도서 목록 컴포넌트
├── ⚛️ Book.js            # 개별 도서 컴포넌트
├── ⚛️ BookDetailPage.js  # 도서 상세 컴포넌트
├── ⚛️ books.js           # 데이터 관리 유틸리티
├── ⚛️ index.js           # 앱 진입점
├── 📊 books.json         # 도서 데이터
├── 🖥️ server.js          # Express 서버 (선택적)
└── 📦 package.json       # 프로젝트 설정
```

## 💻 기술 스택

- **Frontend**: React 18 (CDN), 바닐라 JavaScript
- **스타일링**: 순수 CSS3 (Grid, Flexbox, 애니메이션)
- **데이터**: JSON 기반 도서 데이터베이스
- **저장소**: LocalStorage (진도, 북마크)
- **아이콘**: Font Awesome 6
- **폰트**: Google Fonts (Crimson Text, Montserrat)

## 🎯 사용 가이드

1. **홈페이지**: 전체 개요 및 추천 독서 경로
2. **도서 목록**: 검색, 필터링, 정렬로 원하는 책 찾기
3. **도서 상세**: 읽기 가이드, 진도 추적, 북마크
4. **독서 경로**: 체계적인 단계별 읽기 계획

## 📚 세인트 존스 칼리지 소개

세인트 존스 칼리지는 1937년부터 "Great Books" 커리큘럼을 운영하고 있는 미국의 명문 리버럴 아츠 칼리지입니다. 모든 학생들이 서양 문명의 위대한 고전들을 체계적으로 읽어나가며 진정한 교양을 쌓는 것을 목표로 합니다.

## 🔗 참고 링크

- [세인트 존스 칼리지 공식 사이트](https://www.sjc.edu)
- [원본 도서 목록](https://www.sjc.edu/academic-programs/undergraduate/great-books-reading-list)

---

*"The unexamined life is not worth living." - Socrates*

즐거운 독서 여행을 시작하세요! 📖✨
