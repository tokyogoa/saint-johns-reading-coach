'use client';

import React from 'react';
import { Book } from '../types/book';
import { BookOpen, ArrowRight, Star } from 'lucide-react';

interface NextPickProps {
  recommendedBook: Book | null;
  onBookClick: (book: Book) => void;
}

export const NextPick: React.FC<NextPickProps> = ({ recommendedBook, onBookClick }) => {
  if (!recommendedBook) {
    return (
      <div className="card text-center">
        <div className="text-gray-400 mb-4">
          <BookOpen className="mx-auto h-12 w-12" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          모든 책을 시작하셨네요!
        </h3>
        <p className="text-gray-600">
          진행 중인 책들을 완료해보세요.
        </p>
      </div>
    );
  }

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
    <div className="card card-hover cursor-pointer bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
          <BookOpen className="h-4 w-4" />
          다음 추천 도서
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {recommendedBook.titleKo}
        </h3>
        <p className="text-gray-600 mb-1">{recommendedBook.title}</p>
        <p className="text-sm text-gray-500">
          {recommendedBook.authorKo} ({recommendedBook.author})
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">분야:</span>
          <span className="font-medium text-gray-900">{recommendedBook.classificationKo}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">난이도:</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {getDifficultyStars(recommendedBook.difficulty)}
            </div>
            <span className="text-xs text-gray-500 ml-1">({recommendedBook.difficulty}/5)</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">페이지:</span>
          <span className="font-medium text-gray-900">{recommendedBook.pages}p</span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-700 leading-relaxed">
          {recommendedBook.descriptionKo}
        </p>
      </div>

      <button
        onClick={() => onBookClick(recommendedBook)}
        className="w-full btn-primary flex items-center justify-center gap-2"
      >
        자세히 보기
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
};
