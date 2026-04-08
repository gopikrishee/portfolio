import { useState } from "react";
import Card from "./Card";

function Avatar({ size = 76, profile }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#06b6d4 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.37, fontWeight: 800, color: "#fff", letterSpacing: -1,
      boxShadow: "0 0 0 3px #1e1e2e,0 0 0 5px rgba(99,102,241,0.4)",
      flexShrink: 0,
    }}>{profile.avatar}</div>
  );
}

function ProfileCard({ profile, mobile }) {
  const [rh, setRh] = useState(false);
  const [ph, setPh] = useState(false);
  return (
    <Card style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ height: mobile ? 56 : 70, background: "linear-gradient(135deg,#1e1e3f 0%,#2d1b4e 40%,#0f2a3f 100%)", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.4, backgroundImage: "repeating-linear-gradient(45deg,rgba(99,102,241,0.1) 0px,rgba(99,102,241,0.1) 1px,transparent 1px,transparent 10px)" }} />
      </div>
      <div style={{ padding: "0 18px 18px" }}>
        <div style={{ marginTop: mobile ? -30 : -38, marginBottom: 10, display: "flex", alignItems: "flex-end", justifyContent: mobile ? "space-between" : "flex-start" }}>
          <Avatar size={mobile ? 60 : 76} profile={profile} />
          {mobile && (
            <div style={{ display: "flex", gap: 6, paddingBottom: 4 }}>
              {["💼", "🐙", "🐦"].map(ic => (
                <button key={ic} style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 8, width: 32, height: 32, fontSize: 14, cursor: "pointer" }}>{ic}</button>
              ))}
            </div>
          )}
        </div>
        <div style={{ fontSize: mobile ? 16 : 18, fontWeight: 800, color: "#f1f1f9", letterSpacing: -0.5, fontFamily: "'Geist',sans-serif" }}>{profile.name}</div>
        <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 700, letterSpacing: 0.5, marginTop: 1 }}>{profile.title}</div>
        <p style={{ fontSize: 12.5, color: "#9ca3af", lineHeight: 1.6, margin: "10px 0" }}>{profile.bio}</p>
        <div style={{ fontSize: 11.5, color: "#6b7280", marginBottom: 12, display: "flex", alignItems: "center", gap: 4 }}>
          <span>📍</span> {profile.location}
        </div>
        <div style={{ display: "flex", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "10px 0", marginBottom: 14 }}>
          {[["Posts", profile.stats.posts], ["Followers", profile.stats.followers], ["Following", profile.stats.following]].map(([l, v]) => (
            <div key={l} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#e2e8f0", fontFamily: "'Geist',sans-serif" }}>{v}</div>
              <div style={{ fontSize: 10, color: "#6b7280", letterSpacing: 0.5 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, flexDirection: mobile ? "row" : "column" }}>
          <button onMouseEnter={() => setRh(true)} onMouseLeave={() => setRh(false)} style={{
            flex: mobile ? 1 : "unset",
            background: rh ? "linear-gradient(135deg,#5254cc,#7c3aed)" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
            color: "#fff", border: "none", borderRadius: 10, padding: "9px 0", fontSize: 12.5, fontWeight: 700,
            cursor: "pointer", width: mobile ? undefined : "100%", transition: "all 0.2s",
            boxShadow: rh ? "0 6px 20px rgba(99,102,241,0.4)" : "0 2px 8px rgba(99,102,241,0.2)",
          }}>📄 Download Resume</button>
          <button onMouseEnter={() => setPh(true)} onMouseLeave={() => setPh(false)} style={{
            flex: mobile ? 1 : "unset",
            background: "transparent", color: ph ? "#a5b4fc" : "#818cf8",
            border: `1px solid ${ph ? "#818cf8" : "rgba(99,102,241,0.35)"}`, borderRadius: 10,
            padding: "9px 0", fontSize: 12.5, fontWeight: 700, cursor: "pointer",
            width: mobile ? undefined : "100%", transition: "all 0.2s",
          }}>🔗 View Full Profile</button>
        </div>
      </div>
    </Card>
  );
}

export { Avatar, ProfileCard };
