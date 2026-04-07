export default function Navbar({ scrolled, isMobile }) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: scrolled ? "rgba(13,13,26,0.95)" : "rgba(13,13,26,0.75)",
      backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: isMobile ? "10px 14px" : "12px 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "background 0.3s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#fff", fontFamily: "'Geist',sans-serif" }}>G</div>
      </div>
      {isMobile ? (
        <button style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Hire Me</button>
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {["Hire Me"].map((item, i) => (
            <button key={item} style={{
              background: i === 0 ? "linear-gradient(135deg,#6366f1,#8b5cf6)" : "transparent",
              color: i === 0 ? "#fff" : "#9ca3af", border: "none", borderRadius: 8,
              padding: i === 0 ? "6px 14px" : "6px 10px", fontSize: 12.5, fontWeight: i === 0 ? 700 : 500, cursor: "pointer",
            }}>{item}</button>
          ))}
        </div>
      )}
    </nav>
  );
}
