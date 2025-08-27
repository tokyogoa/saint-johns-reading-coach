'use client';

import React from 'react';
import { BookOpen, TrendingUp, Heart, Clock } from 'lucide-react';

interface StatsBarProps {
  totalBooks: number;
  completedBooks: number;
  currentlyReading: number;
  favoriteBooks: number;
  totalReadingTime: number;
  averageRating: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  totalBooks,
  completedBooks,
  currentlyReading,
  favoriteBooks,
  totalReadingTime,
  averageRating
}) => {
  const completionRate = totalBooks > 0 ? Math.round((completedBooks / totalBooks) * 100) : 0;
  
  const formatReadingTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}분`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) return `${hours}시간`;
    return `${hours}시간 ${remainingMinutes}분`;
  };

  const stats = [
    {
      label: '완독률',
      value: `${completionRate}%`,
      subtext: `${completedBooks}/${totalBooks}권`,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-100'
    },
    {
      label: '읽는 중',
      value: `${currentlyReading}권`,
      subtext: '진행중인 도서',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-100'
    },
    {
      label: '즐겨찾기',
      value: `${favoriteBooks}권`,
      subtext: '특별한 도서',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      iconBg: 'bg-pink-100'
    },
    {
      label: '읽기 시간',
      value: formatReadingTime(totalReadingTime),
      subtext: averageRating > 0 ? `평점 ${averageRating.toFixed(1)}점` : '평점 없음',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className={`${stat.bgColor} rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`${stat.iconBg} p-2 rounded-lg`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
            <div className="space-y-1">
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
              <div className="text-xs text-gray-500">
                {stat.subtext}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
