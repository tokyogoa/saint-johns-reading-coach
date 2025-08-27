'use client';

import React from 'react';
import { Book, ReadingProgress } from '../types/book';
import { BookCard } from './BookCard';

interface BookListProps {
  books: Book[];
  getBookProgress: (bookId: string) => ReadingProgress;
  onUpdateProgress: (bookId: string, progress: Partial<ReadingProgress>) => void;
  onToggleFavorite: (bookId: string) => void;
  onBookClick: (book: Book) => void;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  getBookProgress,
  onUpdateProgress,
  onToggleFavorite,
  onBookClick
}) => {
  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
        <p className="text-gray-600">다른 검색어나 필터를 시도해보세요.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          progress={getBookProgress(book.id)}
          onUpdateProgress={onUpdateProgress}
          onToggleFavorite={onToggleFavorite}
          onCardClick={onBookClick}
        />
      ))}
    </div>
  );
};
