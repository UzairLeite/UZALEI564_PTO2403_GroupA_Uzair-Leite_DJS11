import React from 'react';
import { useAppContext } from './store/store';

const App: React.FC = () => {
  const { shows, loading, selectedShow, setSelectedShow } = useAppContext();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Podcast Shows</h1>
      <ul>
        {shows.map((show) => (
          <li key={show.id} onClick={() => setSelectedShow(show)}>
            {show.title}
          </li>
        ))}
      </ul>
      {selectedShow && (
        <div>
          <h2>{selectedShow.title}</h2>
          <p>{selectedShow.description}</p>
        </div>
      )}
    </div>
  );
};

export default App;