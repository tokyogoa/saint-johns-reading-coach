'use client';

import React, { useState } from 'react';
import { X, Star, BookOpen, Clock, Heart, ExternalLink, Quote, Lightbulb, MessageCircle } from 'lucide-react';
import { Book, ReadingProgress } from '../types/book';
import { getProgressPercentage, getDifficultyColor, getStatusColor, getStatusText, getClassificationColor } from '../utils/formatters';

interface BookDetailDialogProps {
  book: Book | null;
  progress: ReadingProgress | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProgress: (bookId: string, progress: Partial<ReadingProgress>) => void;
  onToggleFavorite: (bookId: string) => void;
}

export const BookDetailDialog: React.FC<BookDetailDialogProps> = ({
  book,
  progress,
  isOpen,
  onClose,
  onUpdateProgress,
  onToggleFavorite
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'notes'>('overview');
  const [notes, setNotes] = useState(progress?.notes || '');
  const [rating, setRating] = useState(progress?.rating || 0);

  if (!isOpen || !book || !progress) return null;

  const progressPercentage = getProgressPercentage(progress.currentPage, progress.totalPages);

  const handleProgressUpdate = (field: keyof ReadingProgress, value: any) => {
    onUpdateProgress(book.id, { [field]: value });
  };

  const handleNotesUpdate = () => {
    handleProgressUpdate('notes', notes);
  };

  const handleRatingUpdate = (newRating: number) => {
    setRating(newRating);
    handleProgressUpdate('rating', newRating);
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < difficulty ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getRatingStars = (currentRating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        onClick={() => handleRatingUpdate(i + 1)}
        className={`h-6 w-6 transition-colors ${
          i < currentRating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-400'
        }`}
      >
        <Star className="h-full w-full" />
      </button>
    ));
  };

  const tabs = [
    { id: 'overview', label: '개요', icon: BookOpen },
    { id: 'progress', label: '진행상황', icon: Clock },
    { id: 'notes', label: '노트', icon: MessageCircle }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold mb-2">{book.titleKo}</h2>
              <p className="text-primary-100 mb-1">{book.title}</p>
              <p className="text-primary-200">
                {book.authorKo} ({book.author}) · {book.year}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <button
                onClick={() => onToggleFavorite(book.id)}
                className={`p-2 rounded-full transition-all duration-200 ${
                  progress.favorite
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'hover:bg-white hover:bg-opacity-20'
                }`}
              >
                <Heart className={`h-6 w-6 ${progress.favorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-primary-100 mb-2">
              <span>읽기 진행률</span>
              <span>{progressPercentage}% ({progress.currentPage}/{book.pages}p)</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getClassificationColor(book.classification)}`}>
                  {book.classificationKo}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getDifficultyColor(book.difficulty)}`}>
                  난이도 {book.difficulty}/5
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(progress.status)}`}>
                  {getStatusText(progress.status)}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  책 소개
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">{book.descriptionKo}</p>
                <p className="text-gray-600 leading-relaxed">{book.summaryKo}</p>
              </div>

              {/* Why Important */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  왜 중요한가?
                </h3>
                <p className="text-gray-700 leading-relaxed">{book.whyImportantKo}</p>
              </div>

              {/* Modern Relevance */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  현대적 의미
                </h3>
                <p className="text-gray-700 leading-relaxed">{book.modernRelevanceKo}</p>
              </div>

              {/* Reading Tips */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">읽기 팁</h3>
                <ul className="space-y-2">
                  {book.readingTipsKo.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-primary-500 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Questions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">핵심 질문</h3>
                <ul className="space-y-2">
                  {book.keyQuestionsKo.map((question, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <span className="text-secondary-500 mt-1">?</span>
                      {question}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quotes */}
              {book.quotes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Quote className="h-5 w-5" />
                    명언
                  </h3>
                  <div className="space-y-3">
                    {book.quotes.map((quote, index) => (
                      <blockquote key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary-500">
                        <p className="text-gray-700 italic mb-2">"{quote.textKo}"</p>
                        <p className="text-sm text-gray-500">"{quote.text}"</p>
                      </blockquote>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              {(book.gutenbergUrl || book.amazonUrl) && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">링크</h3>
                  <div className="flex gap-4">
                    {book.gutenbergUrl && (
                      <a
                        href={book.gutenbergUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                        무료 읽기 (Project Gutenberg)
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="space-y-6">
              {/* Current Progress */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">현재 진행상황</h3>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      현재 페이지
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={book.pages}
                      value={progress.currentPage}
                      onChange={(e) => handleProgressUpdate('currentPage', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      상태
                    </label>
                    <select
                      value={progress.status}
                      onChange={(e) => handleProgressUpdate('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="not-started">시작 전</option>
                      <option value="reading">읽는 중</option>
                      <option value="paused">일시정지</option>
                      <option value="completed">완료</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">평점</h3>
                <div className="flex items-center gap-2">
                  {getRatingStars(rating)}
                  <span className="ml-2 text-gray-600">
                    {rating > 0 ? `${rating}/5` : '평점 없음'}
                  </span>
                </div>
              </div>

              {/* Reading Time */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">읽기 시간</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    총 읽기 시간 (분)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={progress.readingTimeMinutes}
                    onChange={(e) => handleProgressUpdate('readingTimeMinutes', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">읽기 노트</h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={handleNotesUpdate}
                  placeholder="이 책에 대한 생각, 인상 깊은 구절, 질문 등을 자유롭게 기록해보세요..."
                  className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  노트는 자동으로 저장됩니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
