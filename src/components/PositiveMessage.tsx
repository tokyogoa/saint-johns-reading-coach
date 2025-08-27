'use client';

import React from 'react';
import { Lightbulb, TrendingUp, Heart, Sparkles } from 'lucide-react';

const positiveMessages = [
  {
    icon: Lightbulb,
    message: "지식은 가장 아름다운 보석입니다. 오늘도 한 페이지씩 읽어나가세요!",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    icon: TrendingUp,
    message: "매일 조금씩 읽는 것이 큰 변화를 만듭니다. 당신의 성장을 응원합니다!",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    icon: Heart,
    message: "독서는 마음의 양식입니다. 오늘도 좋은 책과 함께하는 시간을 만드세요!",
    color: "text-pink-600",
    bgColor: "bg-pink-50"
  },
  {
    icon: Sparkles,
    message: "위대한 사상가들과의 대화가 당신을 기다립니다. 책을 펼쳐보세요!",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

export const PositiveMessage: React.FC = () => {
  const today = new Date();
  const messageIndex = today.getDate() % positiveMessages.length;
  const message = positiveMessages[messageIndex];
  const Icon = message.icon;

  return (
    <div className={`${message.bgColor} rounded-xl p-6 mb-6 border border-opacity-20`}>
      <div className="flex items-start gap-4">
        <div className={`${message.color} p-3 rounded-full bg-white shadow-sm`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${message.color} mb-2`}>
            오늘의 격려
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
};
