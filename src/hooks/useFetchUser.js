import { useState, useEffect } from 'react';
import { fetchUser } from '../api/userApi';

/**
 * Custom hook to load user data once on initial render.
 * @returns {{ data: { userId: string, userName: string, email: string, avatarUrl: string, bio: string, designation: string }|null, loading: boolean, error: Error|null }}
 */
export function useFetchUser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      try {
        const result = await fetchUser();
        if (isMounted) {
          setData(Array.isArray(result) ? result[0] : result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
