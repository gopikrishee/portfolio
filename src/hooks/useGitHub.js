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

const FALLBACK_REPOS = [
  {
    name: "portfolio",
    description: "Personal developer portfolio and blog built with React, Vite, and Tailwind CSS.",
    language: "JavaScript",
    stars: 12,
    forks: 3,
    isPrivate: false,
    url: "https://github.com/gopikrishee/portfolio",
    updatedAt: "Mar 2026",
  },
  {
    name: "dotnet-microservices",
    description: "Event-driven microservices architecture using .NET 8, RabbitMQ, and Clean Architecture.",
    language: "C#",
    stars: 28,
    forks: 7,
    isPrivate: false,
    url: "https://github.com/gopikrishee",
    updatedAt: "Feb 2026",
  },
  {
    name: "k8s-deployment-templates",
    description: "Kubernetes manifests and Helm charts for enterprise .NET application deployment.",
    language: "YAML",
    stars: 19,
    forks: 4,
    isPrivate: false,
    url: "https://github.com/gopikrishee",
    updatedAt: "Jan 2026",
  }
];

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
      console.warn("GitHub API error, using fallback repo list:", err.message);
      setRepos(FALLBACK_REPOS);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    let ignore = false;
    async function fetchData() {
      if (!username) return;
      try {
        const [profileData, reposData] = await Promise.all([
          fetchUserProfile(username),
          fetchUserRepos(username),
        ]);
        if (!ignore) {
          setProfile(shapeProfile(profileData));
          setRepos(shapeRepos(reposData));
        }
      } catch (err) {
        if (!ignore) {
          console.warn("GitHub API error, using fallback repo list:", err.message);
          setRepos(FALLBACK_REPOS);
        }
      }
    }
    fetchData();
    return () => {
      ignore = true;
    };
  }, [username]);

  return { profile, repos, loading, error, refetch: loadUserData };
};

export default useGitHub;