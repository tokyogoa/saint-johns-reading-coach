export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}분`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}시간`;
  }
  
  return `${hours}시간 ${remainingMinutes}분`;
};

export const getReadingTimeEstimate = (pages: number, wpm: number = 250): number => {
  // Assuming about 300 words per page for classic texts
  const wordsPerPage = 300;
  const totalWords = pages * wordsPerPage;
  return Math.ceil(totalWords / wpm);
};

export const getProgressPercentage = (currentPage: number, totalPages: number): number => {
  if (totalPages === 0) return 0;
  return Math.round((currentPage / totalPages) * 100);
};

export const getDifficultyColor = (difficulty: number): string => {
  switch (difficulty) {
    case 1: return 'bg-green-100 text-green-800';
    case 2: return 'bg-blue-100 text-blue-800';
    case 3: return 'bg-yellow-100 text-yellow-800';
    case 4: return 'bg-orange-100 text-orange-800';
    case 5: return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'not-started': return 'bg-gray-100 text-gray-800';
    case 'reading': return 'bg-blue-100 text-blue-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'paused': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'not-started': return '시작 전';
    case 'reading': return '읽는 중';
    case 'completed': return '완료';
    case 'paused': return '일시정지';
    default: return '상태 없음';
  }
};

export const getClassificationColor = (classification: string): string => {
  switch (classification) {
    case 'Mathematics': return 'bg-purple-100 text-purple-800';
    case 'Language': return 'bg-pink-100 text-pink-800';
    case 'Science': return 'bg-cyan-100 text-cyan-800';
    case 'Music': return 'bg-indigo-100 text-indigo-800';
    case 'Philosophy': return 'bg-amber-100 text-amber-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
