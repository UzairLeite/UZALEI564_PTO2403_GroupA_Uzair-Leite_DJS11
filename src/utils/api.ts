import { API_BASE_URL } from '../Constants';

export const fetchShows = async () => {
  const response = await fetch(`${API_BASE_URL}`);
  return response.json();
};

export const fetchShowById = async (id: string) => {
  const response = await fetch(`${API_BASE_URL}/id/${id}`);
  return response.json();
};

export const fetchGenreById = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/genre/${id}`);
  return response.json();
};