import React from 'react';
import { useAppContext } from '../store/store';
import AudioPlayer from '../components/AudioPlayer';

const ShowDetails: React.FC = () => {
  const { selectedShow } = useAppContext();

  if (!selectedShow) return <div>No show selected</div>;

  return (
    <div>
      <h1>{selectedShow.title}</h1>
      <img src={selectedShow.image} alt={selectedShow.title} />
      <p>{selectedShow.description}</p>
      <p>Seasons: {selectedShow.seasons}</p>
      <p>Last Updated: {new Date(selectedShow.updated).toLocaleDateString()}</p>
      <AudioPlayer src="placeholder-audio.mp3" />
    </div>
  );
};

export default ShowDetails;