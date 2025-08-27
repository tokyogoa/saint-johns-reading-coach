import React from 'react';
import { Search, Filter, X } from 'lucide-react';

interface FiltersBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedClassifications: string[];
  onClassificationChange: (classifications: string[]) => void;
  selectedDifficulties: number[];
  onDifficultyChange: (difficulties: number[]) => void;
  selectedStatuses: string[];
  onStatusChange: (statuses: string[]) => void;
  onClearFilters: () => void;
}

const classifications = [
  { value: 'Mathematics', label: '수학', labelEn: 'Mathematics' },
  { value: 'Language', label: '언어학', labelEn: 'Language' },
  { value: 'Science', label: '과학', labelEn: 'Science' },
  { value: 'Music', label: '음악', labelEn: 'Music' },
  { value: 'Philosophy', label: '철학', labelEn: 'Philosophy' }
];

const difficulties = [
  { value: 1, label: '매우 쉬움' },
  { value: 2, label: '쉬움' },
  { value: 3, label: '보통' },
  { value: 4, label: '어려움' },
  { value: 5, label: '매우 어려움' }
];

const statuses = [
  { value: 'not-started', label: '시작 전' },
  { value: 'reading', label: '읽는 중' },
  { value: 'completed', label: '완료' },
  { value: 'paused', label: '일시정지' }
];

export const FiltersBar: React.FC<FiltersBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedClassifications,
  onClassificationChange,
  selectedDifficulties,
  onDifficultyChange,
  selectedStatuses,
  onStatusChange,
  onClearFilters
}) => {
  const hasActiveFilters = searchQuery || 
    selectedClassifications.length > 0 || 
    selectedDifficulties.length > 0 || 
    selectedStatuses.length > 0;

  const toggleClassification = (classification: string) => {
    if (selectedClassifications.includes(classification)) {
      onClassificationChange(selectedClassifications.filter(c => c !== classification));
    } else {
      onClassificationChange([...selectedClassifications, classification]);
    }
  };

  const toggleDifficulty = (difficulty: number) => {
    if (selectedDifficulties.includes(difficulty)) {
      onDifficultyChange(selectedDifficulties.filter(d => d !== difficulty));
    } else {
      onDifficultyChange([...selectedDifficulties, difficulty]);
    }
  };

  const toggleStatus = (status: string) => {
    if (selectedStatuses.includes(status)) {
      onStatusChange(selectedStatuses.filter(s => s !== status));
    } else {
      onStatusChange([...selectedStatuses, status]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">필터</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X className="h-4 w-4" />
            초기화
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="도서명, 저자명으로 검색..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Classifications */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">분야</h4>
          <div className="flex flex-wrap gap-2">
            {classifications.map((classification) => (
              <button
                key={classification.value}
                onClick={() => toggleClassification(classification.value)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedClassifications.includes(classification.value)
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {classification.label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulties */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">난이도</h4>
          <div className="flex flex-wrap gap-2">
            {difficulties.map((difficulty) => (
              <button
                key={difficulty.value}
                onClick={() => toggleDifficulty(difficulty.value)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedDifficulties.includes(difficulty.value)
                    ? 'bg-orange-100 text-orange-800 border border-orange-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {difficulty.label}
              </button>
            ))}
          </div>
        </div>

        {/* Statuses */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">읽기 상태</h4>
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => toggleStatus(status.value)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  selectedStatuses.includes(status.value)
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
