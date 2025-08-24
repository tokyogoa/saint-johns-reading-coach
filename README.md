# 세인트 존스 독서 코치 📚

[![Deploy to GitHub Pages](https://github.com/USERNAME/REPOSITORY/actions/workflows/deploy.yml/badge.svg)](https://github.com/USERNAME/REPOSITORY/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

세인트 존스 칼리지의 위대한 고전 도서 목록을 기반으로 한 개인 맞춤형 독서 코치 웹앱입니다.

## 🎯 라이브 데모

- **GitHub Pages**: `https://USERNAME.github.io/REPOSITORY`
- **개발 서버**: `http://localhost:3000`

## 🌟 주요 기능

- 📚 **체계적인 도서 관리**: 검색, 필터링, 정렬 기능
- 📊 **개인 진도 추적**: 읽기 상태 및 진행률 관리
- 🎯 **맞춤형 독서 경로**: 단계별 독서 계획 제공
- 💡 **전문가 가이드**: 각 책에 대한 읽기 팁과 배경 지식
- 🔖 **북마크 시스템**: 관심 도서 저장 및 관리
- 📱 **반응형 디자인**: 모든 기기에서 완벽한 사용자 경험
- 🎨 **아름다운 UI**: 모던하고 직관적인 인터페이스

## 🚀 빠른 시작

### 1. GitHub에서 포크하기
```bash
# 저장소 클론
git clone https://github.com/USERNAME/saint-johns-reading-coach.git
cd saint-johns-reading-coach

# 의존성 설치
npm install

# 개발 서버 시작
npm start
```

### 2. 즉시 배포하기
- **GitHub Pages**: 저장소 Settings → Pages → Deploy from branch 선택
- **Netlify**: [netlify.com](https://netlify.com)에서 GitHub 연동
- **Vercel**: [vercel.com](https://vercel.com)에서 GitHub 연동

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
