import { useState, useEffect } from 'react';
import { fetchUser } from '../api/userApi';
import { fetchBlogs } from '../api/blogApi';

/**
 * Custom hook to load initial portfolio data (user + blogs) on mount.
 */
export function useFetchPortfolioData() {
  const [data, setData] = useState({ user: null, blogs: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      try {
        setLoading(true);
        const [user, blogs] = await Promise.all([fetchUser(), fetchBlogs()]);
        if (isMounted) {
          setData({ 
            user: Array.isArray(user) ? user[0] : user, 
            blogs 
          });
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

  return { ...data, loading, error };
}
