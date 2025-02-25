import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { fetchShows } from '../utils/api';

// Define the Show interface
interface Show {
  id: string;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: number[];
  updated: string;
}

// Define the AppState interface
interface AppState {
  shows: Show[];
  loading: boolean;
  selectedShow: Show | null;
  setSelectedShow: (show: Show | null) => void;
}

// Create the context
const AppContext = createContext<AppState | undefined>(undefined);

// Define the AppProvider component
interface AppProviderProps {
  children: ReactNode; // Define children as a prop
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  // Fetch shows on component mount
  useEffect(() => {
    const loadShows = async () => {
      try {
        const data: Show[] = await fetchShows();
        setShows(data);
      } catch (error) {
        console.error('Failed to fetch shows:', error);
      } finally {
        setLoading(false);
      }
    };
    loadShows();
  }, []);

  // Provide the context value
  return (
    <AppContext.Provider value={{ shows, loading, selectedShow, setSelectedShow }}>
      {children} {/* Use children here */}
    </AppContext.Provider>
  );
};

// Define the useAppContext hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};