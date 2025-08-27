export interface Book {
  id: string;
  title: string;
  titleKo: string;
  author: string;
  authorKo: string;
  year: string;
  classification: 'Mathematics' | 'Language' | 'Science' | 'Music' | 'Philosophy';
  classificationKo: '수학' | '언어학' | '과학' | '음악' | '철학';
  difficulty: 1 | 2 | 3 | 4 | 5;
  pages: number;
  description: string;
  descriptionKo: string;
  summary: string;
  summaryKo: string;
  whyImportant: string;
  whyImportantKo: string;
  modernRelevance: string;
  modernRelevanceKo: string;
  readingTips: string[];
  readingTipsKo: string[];
  keyQuestions: string[];
  keyQuestionsKo: string[];
  quotes: {
    text: string;
    textKo: string;
    page?: number;
  }[];
  amazonUrl?: string;
  gutenbergUrl?: string;
  imageUrl?: string;
}

export interface ReadingProgress {
  bookId: string;
  status: 'not-started' | 'reading' | 'completed' | 'paused';
  currentPage: number;
  totalPages: number;
  startDate?: Date;
  completedDate?: Date;
  notes: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  favorite: boolean;
  readingTimeMinutes: number;
}

export interface LibraryFilters {
  classification: string[];
  difficulty: number[];
  status: string[];
  searchQuery: string;
}

export interface LibraryStats {
  totalBooks: number;
  completedBooks: number;
  currentlyReading: number;
  totalPages: number;
  pagesRead: number;
  averageRating: number;
  totalReadingTime: number;
  favoriteBooks: number;
}
