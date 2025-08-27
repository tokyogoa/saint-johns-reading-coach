import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Book, ReadingProgress, LibraryFilters, LibraryStats } from '../types/book';
import { sjcGreatBooks } from '../data/sjcGreatBooks';

interface LibraryState {
  books: Book[];
  readingProgress: Record<string, ReadingProgress>;
  filters: LibraryFilters;
  
  // Actions
  updateReadingProgress: (bookId: string, progress: Partial<ReadingProgress>) => void;
  setFilter: (filterType: keyof LibraryFilters, value: any) => void;
  clearFilters: () => void;
  toggleFavorite: (bookId: string) => void;
  
  // Computed
  getFilteredBooks: () => Book[];
  getStats: () => LibraryStats;
  getBookProgress: (bookId: string) => ReadingProgress;
  getRecommendedBook: () => Book | null;
}

const defaultFilters: LibraryFilters = {
  classification: [],
  difficulty: [],
  status: [],
  searchQuery: ''
};

const createDefaultProgress = (book: Book): ReadingProgress => ({
  bookId: book.id,
  status: 'not-started',
  currentPage: 0,
  totalPages: book.pages,
  notes: '',
  favorite: false,
  readingTimeMinutes: 0
});

export const useLibrary = create<LibraryState>()(
  persist(
    (set, get) => ({
      books: sjcGreatBooks,
      readingProgress: {},
      filters: defaultFilters,

      updateReadingProgress: (bookId, progressUpdate) => {
        set((state) => {
          const currentProgress = state.readingProgress[bookId] || 
            createDefaultProgress(state.books.find(b => b.id === bookId)!);
          
          const updatedProgress = { ...currentProgress, ...progressUpdate };
          
          // Auto-update status based on current page
          if (progressUpdate.currentPage !== undefined) {
            if (progressUpdate.currentPage === 0) {
              updatedProgress.status = 'not-started';
            } else if (progressUpdate.currentPage >= updatedProgress.totalPages) {
              updatedProgress.status = 'completed';
              updatedProgress.completedDate = new Date();
            } else if (updatedProgress.status === 'not-started') {
              updatedProgress.status = 'reading';
              updatedProgress.startDate = new Date();
            }
          }

          return {
            readingProgress: {
              ...state.readingProgress,
              [bookId]: updatedProgress
            }
          };
        });
      },

      setFilter: (filterType, value) => {
        set((state) => ({
          filters: {
            ...state.filters,
            [filterType]: value
          }
        }));
      },

      clearFilters: () => {
        set(() => ({
          filters: defaultFilters
        }));
      },

      toggleFavorite: (bookId) => {
        const currentProgress = get().readingProgress[bookId] || 
          createDefaultProgress(get().books.find(b => b.id === bookId)!);
        
        get().updateReadingProgress(bookId, {
          favorite: !currentProgress.favorite
        });
      },

      getFilteredBooks: () => {
        const { books, filters, readingProgress } = get();
        
        return books.filter(book => {
          const progress = readingProgress[book.id] || createDefaultProgress(book);
          
          // Search query filter
          if (filters.searchQuery && !book.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
              !book.titleKo.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
              !book.author.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
              !book.authorKo.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
            return false;
          }
          
          // Classification filter
          if (filters.classification.length > 0 && !filters.classification.includes(book.classification)) {
            return false;
          }
          
          // Difficulty filter
          if (filters.difficulty.length > 0 && !filters.difficulty.includes(book.difficulty)) {
            return false;
          }
          
          // Status filter
          if (filters.status.length > 0 && !filters.status.includes(progress.status)) {
            return false;
          }
          
          return true;
        });
      },

      getStats: () => {
        const { books, readingProgress } = get();
        
        const stats = books.reduce((acc, book) => {
          const progress = readingProgress[book.id] || createDefaultProgress(book);
          
          acc.totalBooks++;
          acc.totalPages += book.pages;
          acc.pagesRead += progress.currentPage;
          acc.totalReadingTime += progress.readingTimeMinutes;
          
          if (progress.status === 'completed') {
            acc.completedBooks++;
            if (progress.rating) {
              acc.ratings.push(progress.rating);
            }
          } else if (progress.status === 'reading') {
            acc.currentlyReading++;
          }
          
          if (progress.favorite) {
            acc.favoriteBooks++;
          }
          
          return acc;
        }, {
          totalBooks: 0,
          completedBooks: 0,
          currentlyReading: 0,
          totalPages: 0,
          pagesRead: 0,
          totalReadingTime: 0,
          favoriteBooks: 0,
          ratings: [] as number[]
        });

        return {
          ...stats,
          averageRating: stats.ratings.length > 0 
            ? stats.ratings.reduce((a, b) => a + b, 0) / stats.ratings.length 
            : 0
        };
      },

      getBookProgress: (bookId) => {
        const { books, readingProgress } = get();
        return readingProgress[bookId] || 
          createDefaultProgress(books.find(b => b.id === bookId)!);
      },

      getRecommendedBook: () => {
        const { books, readingProgress } = get();
        
        // Find books not yet started
        const notStarted = books.filter(book => {
          const progress = readingProgress[book.id];
          return !progress || progress.status === 'not-started';
        });
        
        if (notStarted.length === 0) return null;
        
        // Simple recommendation: lowest difficulty book not yet started
        return notStarted.reduce((easiest, book) => 
          book.difficulty < easiest.difficulty ? book : easiest
        );
      }
    }),
    {
      name: 'sjc-reading-library',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        readingProgress: state.readingProgress,
        filters: state.filters
      })
    }
  )
);
