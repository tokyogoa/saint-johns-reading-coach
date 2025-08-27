'use client';

import React from 'react';
import { Heart, BookOpen, Clock, Star, ExternalLink } from 'lucide-react';
import { Book, ReadingProgress } from '../types/book';
import { getProgressPercentage, getDifficultyColor, getStatusColor, getStatusText, getClassificationColor } from '../utils/formatters';

interface BookCardProps {
  book: Book;
  progress: ReadingProgress;
  onUpdateProgress: (bookId: string, progress: Partial<ReadingProgress>) => void;
  onToggleFavorite: (bookId: string) => void;
  onCardClick: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  progress,
  onUpdateProgress,
  onToggleFavorite,
  onCardClick
}) => {
  const progressPercentage = getProgressPercentage(progress.currentPage, progress.totalPages);
  
  const handleProgressUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const newPage = parseInt(e.target.value);
    onUpdateProgress(book.id, { currentPage: newPage });
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(book.id);
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < difficulty ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div
      onClick={() => onCardClick(book)}
      className="card card-hover cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
            {book.titleKo}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{book.title}</p>
          <p className="text-sm text-gray-600 mt-1">
            {book.authorKo} ({book.author})
          </p>
        </div>
        <button
          onClick={handleFavoriteClick}
          className={`p-2 rounded-full transition-all duration-200 ${
            progress.favorite
              ? 'text-pink-500 bg-pink-50 hover:bg-pink-100'
              : 'text-gray-400 hover:text-pink-500 hover:bg-pink-50'
          }`}
        >
          <Heart className={`h-5 w-5 ${progress.favorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getClassificationColor(book.classification)}`}>
          {book.classificationKo}
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(book.difficulty)}`}>
          난이도 {book.difficulty}
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(progress.status)}`}>
          {getStatusText(progress.status)}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            진행률
          </span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max={book.pages}
            value={progress.currentPage}
            onChange={handleProgressUpdate}
            className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="text-xs text-gray-500 min-w-0">
            {progress.currentPage}/{book.pages}p
          </span>
        </div>
      </div>

      {/* Difficulty & Rating */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <span>난이도:</span>
          <div className="flex gap-0.5">
            {getDifficultyStars(book.difficulty)}
          </div>
        </div>
        {progress.rating && (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>{progress.rating}</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {book.pages}페이지
          </span>
          <span>{book.year}</span>
        </div>
        {(book.gutenbergUrl || book.amazonUrl) && (
          <div className="flex items-center gap-2">
            {book.gutenbergUrl && (
              <a
                href={book.gutenbergUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                title="무료 읽기"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
