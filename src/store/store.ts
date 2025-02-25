import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchShows, fetchShowById } from '../utils/api';

// Define the Show interface

interface Episode {
  id: string;
  title: string;
  seasonId: string;
}

interface Show {
  id: string;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: number[];
  updated: string;
  episodes?: Episode[]; // Add episodes as an optional property
}
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

// Create the context with a default value of undefined
const AppContext = createContext<AppState | undefined>(undefined);

// Define the AppProvider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  // Fetch shows on component mount
  useEffect(() => {
    const loadShows = async () => {
      try {
        const data = await fetchShows();
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
      {children}
    </AppContext.Provider>
  );
};

// Define the useAppContext hook
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};