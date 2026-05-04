import { BlogPost } from '../model';

const BASE_URL = 'https://apigopikrishee.runasp.net';

/**
 * Fetches the list of blogs.
 * @returns {Promise<BlogPost[]>}
 */
export async function fetchBlogs() {
  const response = await fetch(`${BASE_URL}/blogslist/?pageNumber=1&pageSize=5`);
  if (!response.ok) {
    throw new Error('Failed to fetch blogs');
  }
  const data = await response.json();
  return BlogPost.fromJSONArray(data);
}
