import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "../ProfileCard";

const TAG_COLORS = {
  DevOps:       { bg: "rgba(99,102,241,0.15)",  text: "#818cf8", border: "rgba(99,102,241,0.3)" },
  Backend:      { bg: "rgba(16,185,129,0.12)",  text: "#34d399", border: "rgba(16,185,129,0.3)" },
  Migration:    { bg: "rgba(245,158,11,0.12)",  text: "#fbbf24", border: "rgba(245,158,11,0.3)" },
  Architecture: { bg: "rgba(239,68,68,0.12)",   text: "#f87171", border: "rgba(239,68,68,0.3)" },
  Docker:       { bg: "rgba(6,182,212,0.12)",   text: "#22d3ee", border: "rgba(6,182,212,0.3)" },
};

export function BlogCard({ post, index, mobile, profile }) {
  const [liked, setLiked] = useState(false);
  
  // Use first tag for styling or default to Backend
  const primaryTag = post.tags?.[0] || "Backend";
  const tagStyle = TAG_COLORS[primaryTag] || TAG_COLORS.Backend;
  const dateStr = post.publishedAt?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || "N/A";

  return (
    <article
      style={{
        background: "#16162a",
        border: `1px solid rgba(255,255,255,0.06)`,
        borderRadius: 16, padding: mobile ? 14 : "20px 22px",
        transition: "all 0.25s", cursor: "pointer",
        boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
        animation: "fadeSlideIn 0.4s ease forwards",
        animationDelay: `${index * 0.07}s`, opacity: 0,
      }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
        <Avatar size={mobile ? 38 : 46} profile={profile} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: mobile ? 10 : 12, fontWeight: 600, color: "#f1f1f9", fontFamily: "'Geist',sans-serif" }}>{post.author || profile.userName}</span>
            <span style={{ fontSize: 11, color: "#4b5563" }}>{dateStr}</span>
          </div>
          <div style={{ fontSize: 10.5, color: "#6b7280" }}>{profile.title}</div>
        </div>
        <span style={{ background: tagStyle.bg, color: tagStyle.text, border: `1px solid ${tagStyle.border}`, borderRadius: 20, padding: "3px 9px", fontSize: 10, fontWeight: 700, flexShrink: 0, whiteSpace: "nowrap" }}>{primaryTag}</span>
      </div>
      <h2 style={{ fontSize: mobile ? 14 : 16, fontWeight: 800, color: "#e2e8f0", margin: "0 0 7px", lineHeight: 1.4, fontFamily: "'Geist',sans-serif", letterSpacing: -0.3 }}>{post.title}</h2>
      <p style={{ fontSize: mobile ? 12.5 : 13.5, color: "#9ca3af", lineHeight: 1.65, margin: "0 0 12px" }}>{post.excerpt}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 14 }}>
          <button onClick={e => { e.stopPropagation(); setLiked(!liked); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 5, color: liked ? "#f87171" : "#6b7280", fontSize: 12 }}>
            <span>{liked ? "❤️" : "🤍"}</span>
          </button>
          <span style={{ fontSize: 12, color: "#6b7280" }}>👁 {post.viewCount}</span>
        </div>
        <Link to={`/blog/${post.slug || post.id}`} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", textDecoration: "none", borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Read More →</Link>
      </div>
    </article>
  );
}
