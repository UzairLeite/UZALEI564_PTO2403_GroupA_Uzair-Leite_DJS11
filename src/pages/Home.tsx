import React from 'react';
import { useAppContext } from '../store/store';
import ShowCard from '../components/ShowCard';

const Home: React.FC = () => {
  const { shows, loading, setSelectedShow } = useAppContext();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} onClick={() => setSelectedShow(show)} />
      ))}
    </div>
  );
};

export default Home;