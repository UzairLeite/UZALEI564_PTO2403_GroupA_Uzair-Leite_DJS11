import React, { useEffect, useState } from 'react'
import { useAppContext } from '../store/store'
import { getFavorites, removeFavorite } from '../utils/storage'
import ShowCard from '../components/ShowCard'
import AudioPlayer from '../components/AudioPlayer'

interface FavoriteEpisode {
  id: string;
  showId: string;
  seasonId: string;
  title: string;
  showTitle: string;
  seasonTitle: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const { shows } = useAppContext();

  useEffect(() => {
    const loadFavorites = async () => {
      const favoriteIds = await getFavorites();
      const favoriteEpisodes: FavoriteEpisode[] = [];

      for (const episodeId of favoriteIds) {
        const show = shows.find((s) => s.episodes?.some((e) => e.id === episodeId));
        if (show) {
          const episode = show.episodes?.find((e) => e.id === episodeId);
          if (episode) {
            favoriteEpisodes.push({
              id: episodeId,
              showId: show.id,
              seasonId: episode.seasonId,
              title: episode.title,
              showTitle: show.title,
              seasonTitle: `Season ${episode.seasonId}`,
            });
          }
        }
      }

      setFavorites(favoriteEpisodes);
      setLoading(false);
    };

    loadFavorites();
  }, [shows]);

  const handleRemoveFavorite = async (episodeId: string) => {
    await removeFavorite(episodeId);
    setFavorites((prev) => prev.filter((fav) => fav.id !== episodeId));
  };

  if (loading) return <div>Loading favorites...</div>;

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet. Add some episodes to your favorites!</p>
      ) : (
        <div>
          {favorites.map((fav) => (
            <div key={fav.id}>
              <ShowCard
                show={{
                  id: fav.showId,
                  title: fav.showTitle,
                  image: '', // Add an image URL if available
                  genres: [], // Add genres if available
                  seasons: parseInt(fav.seasonId, 10), // Convert seasonId to number
                  updated: new Date().toISOString(), // Add a placeholder updated date
                }}
                onClick={() => {}} // Add an onClick handler if needed
              />
              <p>Episode: {fav.title}</p>
              <p>Season: {fav.seasonTitle}</p>
              <AudioPlayer src="placeholder-audio.mp3" />
              <button onClick={() => handleRemoveFavorite(fav.id)}>Remove from Favorites</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;