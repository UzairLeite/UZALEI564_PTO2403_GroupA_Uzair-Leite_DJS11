import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchShows, fetchShowById } from '../utils/api';

interface Show {
  id: string;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: number[];
  updated: string;
}

interface AppState {
  shows: Show[];
  loading: boolean;
  selectedShow: Show | null;
  setSelectedShow: (show: Show | null) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShow, setSelectedShow] = useState<Show | null>(null);

  useEffect(() => {
    const loadShows = async () => {
      const data = await fetchShows();
      setShows(data);
      setLoading(false);
    };
    loadShows();
  }, []);

  return (
    <AppContext.Provider value={{ shows, loading, selectedShow, setSelectedShow }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};