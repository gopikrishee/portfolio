/**
 * Fetches user information from the API.
 * @returns {Promise<Object>} The user object.
 */
export async function fetchUser() {
  const response = await fetch('https://apigopikrishee.runasp.net/users');
  if (!response.ok) {
    throw new Error(`Error fetching user: ${response.statusText}`);
  }
  return response.json();
}
