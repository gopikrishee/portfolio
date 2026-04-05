const BASE_URL = "https://api.github.com";

const HEADERS = {
  "Accept": "application/vnd.github.v3+json",
};

export const fetchUserProfile = async (username) => {
  const res = await fetch(`${BASE_URL}/users/${username}`, { headers: HEADERS });
  if (!res.ok) throw new Error(`User not found: ${username}`);
  return res.json();
};

export const fetchUserRepos = async (username) => {
  const res = await fetch(
    `${BASE_URL}/users/${username}/repos?per_page=100&sort=updated`,
    { headers: HEADERS }
  );
  if (!res.ok) throw new Error(`Repos not found for: ${username}`);
  return res.json();
};