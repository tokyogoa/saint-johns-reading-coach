'use client';

import React, { useState } from 'react';
import { useLibrary } from '../store/useLibrary';
import { Book } from '../types/book';
import { FiltersBar } from '../components/FiltersBar';
import { StatsBar } from '../components/StatsBar';
import { BookList } from '../components/BookList';
import { BookDetailDialog } from '../components/BookDetailDialog';
import { NextPick } from '../components/NextPick';
import { PositiveMessage } from '../components/PositiveMessage';
import { BookOpen, Sparkles } from 'lucide-react';

export default function HomePage() {
  const {
    filters,
    getFilteredBooks,
    getStats,
    getBookProgress,
    getRecommendedBook,
    updateReadingProgress,
    setFilter,
    clearFilters,
    toggleFavorite
  } = useLibrary();

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredBooks = getFilteredBooks();
  const stats = getStats();
  const recommendedBook = getRecommendedBook();

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient">
                  세인트 존스 읽기 코치
                </h1>
                <p className="text-gray-600 mt-1">
                  위대한 고전과 함께하는 지적 여정
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-full">
              <Sparkles className="h-5 w-5 text-primary-500" />
              <span className="text-sm font-medium text-gray-700">
                {stats.totalBooks}권의 고전 명작
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Positive Message */}
            <PositiveMessage />

            {/* Stats */}
            <StatsBar
              totalBooks={stats.totalBooks}
              completedBooks={stats.completedBooks}
              currentlyReading={stats.currentlyReading}
              favoriteBooks={stats.favoriteBooks}
              totalReadingTime={stats.totalReadingTime}
              averageRating={stats.averageRating}
            />

            {/* Filters */}
            <FiltersBar
              searchQuery={filters.searchQuery}
              onSearchChange={(query) => setFilter('searchQuery', query)}
              selectedClassifications={filters.classification}
              onClassificationChange={(classifications) => setFilter('classification', classifications)}
              selectedDifficulties={filters.difficulty}
              onDifficultyChange={(difficulties) => setFilter('difficulty', difficulties)}
              selectedStatuses={filters.status}
              onStatusChange={(statuses) => setFilter('status', statuses)}
              onClearFilters={clearFilters}
            />

            {/* Book List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  도서 목록
                </h2>
                <span className="text-sm text-gray-500">
                  {filteredBooks.length}권의 도서
                </span>
              </div>
              <BookList
                books={filteredBooks}
                getBookProgress={getBookProgress}
                onUpdateProgress={updateReadingProgress}
                onToggleFavorite={toggleFavorite}
                onBookClick={handleBookClick}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <NextPick
              recommendedBook={recommendedBook}
              onBookClick={handleBookClick}
            />
          </div>
        </div>
      </main>

      {/* Book Detail Dialog */}
      <BookDetailDialog
        book={selectedBook}
        progress={selectedBook ? getBookProgress(selectedBook.id) : null}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onUpdateProgress={updateReadingProgress}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
