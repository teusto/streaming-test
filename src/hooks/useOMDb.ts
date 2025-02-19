import { useEffect, useState, useCallback } from "react";
import debounce from 'lodash.debounce';

export const useOMDb = (imdbId: string) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${imdbId}&apikey=${import.meta.env.VITE_OMDB_KEY}`
      );
      const json = await res.json();
      setData(json);
    };

    if (imdbId) fetchData();
  }, [imdbId]);

  return data;
};

export const useOMDbPosters = (imdbIds: string[]) => {
  const [posters, setPosters] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Debounced fetch function
  const fetchPosters = useCallback(
    debounce(async (ids: string[]) => {
      setLoading(true);
      setError(null);

      try {
        const requests = ids.map(async (imdbId) => {
          const response = await fetch(
            `https://www.omdbapi.com/?i=${imdbId}&apikey=${import.meta.env.VITE_OMDB_KEY}`
          );
          const data = await response.json();
          return { imdbId, poster: data.Poster };
        });

        const results = await Promise.all(requests);
        const posterMap = results.reduce((acc, { imdbId, poster }) => {
          acc[imdbId] = poster;
          return acc;
        }, {} as Record<string, string>);

        setPosters(posterMap);
      } catch (err) {
        setError('Failed to fetch posters');
      } finally {
        setLoading(false);
      }
    }, 500), // 500ms debounce delay
    [] // Dependency array for useCallback
  );

  useEffect(() => {
    if (imdbIds.length > 0) {
      fetchPosters(imdbIds);
    }
  }, [imdbIds, fetchPosters]);

  return { posters, loading, error };
};