export default function BottomNav({ active, setActive }) {
  const tabs = [
    { id: "feed",     icon: "🏠", label: "Feed" },
    { id: "profile",  icon: "👤", label: "Profile" },
    { id: "projects", icon: "📦", label: "Projects" },
    { id: "contact",  icon: "📬", label: "Contact" },
  ];
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
      background: "rgba(13,13,26,0.97)", backdropFilter: "blur(16px)",
      borderTop: "1px solid rgba(255,255,255,0.07)",
      display: "flex", alignItems: "stretch",
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setActive(t.id)} style={{
          flex: 1, background: "none", border: "none", cursor: "pointer",
          padding: "10px 0 8px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
          color: active === t.id ? "#818cf8" : "#4b5563", transition: "color 0.2s",
        }}>
          <span style={{ fontSize: 19 }}>{t.icon}</span>
          <span style={{ fontSize: 9.5, fontWeight: active === t.id ? 700 : 500 }}>{t.label}</span>
          {active === t.id && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#6366f1" }} />}
        </button>
      ))}
    </nav>
  );
}
