import React, { useState } from 'react'

interface AudioPlayerProps {
  src: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div>
      <audio src={src} controls onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
      {isPlaying && <p>Now Playing...</p>}
    </div>
  );
};

export default AudioPlayer;