import { BlogPost } from '../model';

const BASE_URL = 'https://portfolio-backend-lac-three.vercel.app';

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

/**
 * Creates a new blog post via POST /blogs.
 * @param {Object} blogData
 * @param {string} blogData.title
 * @param {string} blogData.subtitle
 * @param {string[]} blogData.tags
 * @param {string[]} blogData.textcontents
 * @param {string[]} blogData.blockquote
 * @param {string[]} blogData.codesnippet
 * @param {Array<{type: string, content: string, order: number}>} blogData.contentBlocks
 * @returns {Promise<Object>}
 */
export async function createBlog(blogData) {
  const response = await fetch(`${BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogData),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.message || `Failed to create blog (${response.status})`);
  }

  return response.json();
}

