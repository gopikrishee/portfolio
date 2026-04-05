import { useState, useEffect, useCallback } from "react";
import { fetchUserProfile, fetchUserRepos } from "../api/githubApi";

const shapeProfile = (data) => ({
  name: data.name,
  username: data.login,
  avatar: data.avatar_url,
  bio: data.bio,
  location: data.location,
  publicRepos: data.public_repos,
  followers: data.followers,
  following: data.following,
  profileUrl: data.html_url,
});

const shapeRepos = (repos) =>
  repos.map((repo) => ({
    name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    isPrivate: repo.private,
    url: repo.html_url,
    updatedAt: new Date(repo.updated_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  }))
  .sort((a, b) => b.stars - a.stars) // sort by stars descending
  .slice(0, 3);                       // keep only top 3;

const useGitHub = (username) => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUserData = useCallback(async () => {
    if (!username) return;

    setLoading(true);
    setError(null);

    try {
      const [profileData, reposData] = await Promise.all([
        fetchUserProfile(username),
        fetchUserRepos(username),
      ]);

      setProfile(shapeProfile(profileData));
      setRepos(shapeRepos(reposData));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  return { profile, repos, loading, error, refetch: loadUserData };
};

export default useGitHub;