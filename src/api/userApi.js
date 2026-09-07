const BASE_URL = 'https://portfolio-backend-lac-three.vercel.app';

/**
 * Fetches user information from the API.
 * @returns {Promise<Object>} The user object.
 */
export async function fetchUser() {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }
  return response.json();
}
