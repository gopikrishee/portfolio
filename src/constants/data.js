export const BLOGS = [
  { id: 1, title: "Kubernetes Deployment Strategies for .NET Apps", date: "Mar 18, 2026", tag: "DevOps", preview: "Rolling updates, blue-green deployments, and canary releases — here's how I manage zero-downtime deploys for large-scale enterprise .NET applications running on K8s clusters.", readTime: "8 min read", likes: 94, comments: 12 },
  { id: 2, title: "ADO.NET vs Entity Framework: When to Choose What", date: "Mar 10, 2026", tag: "Backend", preview: "After 10+ years of working with both, here's my honest take on which data access strategy wins in different scenarios — performance benchmarks included.", readTime: "6 min read", likes: 138, comments: 27 },
  { id: 3, title: "Migrating a Legacy WinForms App to .NET 8", date: "Feb 28, 2026", tag: "Migration", preview: "A practical guide from our real-world migration journey. Pitfalls, wins, and everything in between when modernizing a 12-year-old WinForms codebase.", readTime: "10 min read", likes: 211, comments: 44 },
  { id: 4, title: "Clean Architecture in C#: A Practical Guide", date: "Feb 14, 2026", tag: "Architecture", preview: "Forget the theory — here's how I implement Clean Architecture in real production projects. Domain layers, use cases, and dependency injection done right.", readTime: "7 min read", likes: 176, comments: 33 },
  { id: 5, title: "Docker for .NET Developers: Getting Started", date: "Jan 30, 2026", tag: "Docker", preview: "Containers changed how I ship code. This beginner-friendly guide walks through dockerizing your first .NET 8 API with multi-stage builds and best practices.", readTime: "5 min read", likes: 89, comments: 18 },
];

export const TAG_COLORS = {
  DevOps:       { bg: "rgba(99,102,241,0.15)",  text: "#818cf8", border: "rgba(99,102,241,0.3)" },
  Backend:      { bg: "rgba(16,185,129,0.12)",  text: "#34d399", border: "rgba(16,185,129,0.3)" },
  Migration:    { bg: "rgba(245,158,11,0.12)",  text: "#fbbf24", border: "rgba(245,158,11,0.3)" },
  Architecture: { bg: "rgba(239,68,68,0.12)",   text: "#f87171", border: "rgba(239,68,68,0.3)" },
  Docker:       { bg: "rgba(6,182,212,0.12)",   text: "#22d3ee", border: "rgba(6,182,212,0.3)" },
};
