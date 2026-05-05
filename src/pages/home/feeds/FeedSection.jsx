import { useState } from "react";
import { TAG_COLORS } from "../../../constants/data";
import { BlogCard } from "./BlogCard";

export function FeedSection({ mobile, profile, blogs }) {
  const [filter, setFilter] = useState("Latest Posts");

  const filteredBlogs = filter === "Popular" ? blogs.filter(b => b.viewCount > 100) : blogs;
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
      <div style={{
        background: "rgba(22,22,42,0.9)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "12px 16px", borderRadius: "16px 16px 0 0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: mobile ? 50 : 0, zIndex: 9,
      }}>
        <div style={{ display: "flex" }}>
          {["Latest Posts", "Popular"].map((tab) => (
            <button key={tab} onClick={() => setFilter(tab)} style={{
              background: filter === tab ? "rgba(99,102,241,0.15)" : "none",
              border: "none", color: filter === tab ? "#818cf8" : "#6b7280",
              fontWeight: filter === tab ? 800 : 500, fontSize: 12.5, cursor: "pointer",
              padding: "6px 12px", borderRadius: 8,
              borderBottom: filter === tab ? "2px solid #6366f1" : "2px solid transparent",
              fontFamily: "'Geist',sans-serif",
            }}>{tab}</button>
          ))}
        </div>
        <span style={{ fontSize: 11, color: "#4b5563" }}>{filteredBlogs.length} posts</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, background: "rgba(255,255,255,0.015)" }}>
        {filteredBlogs.map((post, i) => <BlogCard key={post.id} post={post} index={i} mobile={mobile} profile={profile} />)}
      </div>
      <div style={{ padding: 16, textAlign: "center" }}>
        <button onClick={() => window.location.href = 'https://blog.gopikrishee.in'} style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "#818cf8", borderRadius: 10, padding: "10px 24px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>
          Load More Posts
        </button>
      </div>
    </div>
  );
}
