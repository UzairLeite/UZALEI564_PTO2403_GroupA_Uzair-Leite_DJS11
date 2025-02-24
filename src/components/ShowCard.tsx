import React from 'react';
import { GENRES } from '../Constants';

interface ShowCardProps {
  show: {
    id: string;
    title: string;
    image: string;
    genres: number[];
    seasons: number;
    updated: string;
  };
  onClick: () => void;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, onClick }) => {
  return (
    <div onClick={onClick}>
      <img src={show.image} alt={show.title} />
      <h2>{show.title}</h2>
      <p>Genres: {show.genres.map((id) => GENRES[id]).join(', ')}</p>
      <p>Seasons: {show.seasons}</p>
      <p>Last Updated: {new Date(show.updated).toLocaleDateString()}</p>
    </div>
  );
};

export default ShowCard;