import { useState, useEffect } from 'react';
import { fetchUser } from '../api/userApi';
import { fetchBlogs } from '../api/blogApi';
import { DEFAULT_USER, BLOGS } from '../constants/data';
import { BlogPost } from '../model';

/**
 * Custom hook to load initial portfolio data (user + blogs) on mount with robust fallback.
 */
export function useFetchPortfolioData() {
  const [data, setData] = useState({ user: null, blogs: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function loadData() {
      try {
        setLoading(true);
        const [userRes, blogsRes] = await Promise.allSettled([fetchUser(), fetchBlogs()]);
        
        const user = userRes.status === 'fulfilled' && userRes.value 
          ? (Array.isArray(userRes.value) ? userRes.value[0] : userRes.value) 
          : DEFAULT_USER;
          
        const blogs = blogsRes.status === 'fulfilled' && Array.isArray(blogsRes.value) && blogsRes.value.length > 0
          ? blogsRes.value
          : BlogPost.fromJSONArray(BLOGS.map(b => ({
              id: b.id,
              userId: 1,
              userName: user?.userName || "Gopi Krishnan S",
              title: b.title,
              slug: `blog-${b.id}`,
              excerpt: b.preview,
              tags: [b.tag.toLowerCase()],
              viewCount: b.likes * 12,
              publishedAt: new Date(b.date),
              author: user?.userName || "Gopi Krishnan S"
            })));

        if (isMounted) {
          setData({ user, blogs });
        }
      } catch {
        if (isMounted) {
          setData({
            user: DEFAULT_USER,
            blogs: BlogPost.fromJSONArray(BLOGS.map(b => ({
              id: b.id,
              userId: 1,
              userName: "Gopi Krishnan S",
              title: b.title,
              slug: `blog-${b.id}`,
              excerpt: b.preview,
              tags: [b.tag.toLowerCase()],
              viewCount: b.likes * 12,
              publishedAt: new Date(b.date),
              author: "Gopi Krishnan S"
            })))
          });
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

  return { ...data, loading, error: null };
}
