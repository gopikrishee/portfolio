import Card from "../../components/Card";
import SectionLabel from "../../components/SectionLabel";

import useGitHub from "../../hooks/useGitHub";

function ProjectsCard({ horizontal }) {
  const { repos, loading, error, refetch } = useGitHub("gopikrishee");

  if (loading)
    return (
      <Card>
        <SectionLabel>📦 Recent Projects</SectionLabel>
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
        </div>
      </Card>
    );
  if (error)
    return (
      <Card>
        <SectionLabel>📦 Recent Projects</SectionLabel>
        <div className="flex flex-col justify-center items-center py-10 gap-2">
          <div className="text-red-400 text-3xl">⚠️</div>
          <p className="text-sm text-gray-400 text-center">Failed to load projects. Please come back after an hour</p>
          <button
            onClick={refetch}
            className="flex items-center justify-center p-2 rounded-full hover:opacity-90 transition-all text-white text-lg"
          >
            ⟳
          </button>
        </div>
      </Card>
    );

  return (
    <Card>
      <SectionLabel>📦 Recent Projects</SectionLabel>
      <div
        style={{
          display: "flex",
          flexDirection: horizontal ? "row" : "column",
          gap: 10,
          overflowX: horizontal ? "auto" : "unset",
          paddingBottom: horizontal ? 4 : 0,
        }}
      >
        {repos.map((p, i) => (
          <div
            key={i}
            onClick={() => window.open(p.url, "_blank")}
            style={{
              background: "rgba(99,102,241,0.06)",
              border: "1px solid rgba(99,102,241,0.12)",
              borderRadius: 10,
              padding: "10px 12px",
              cursor: "pointer",
              flexShrink: horizontal ? 0 : "unset",
              minWidth: horizontal ? 170 : "unset",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99,102,241,0.15)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(99,102,241,0.06)";
              e.currentTarget.style.borderColor = "rgba(99,102,241,0.12)";
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#a5b4fc",
                marginBottom: 3,
                fontFamily: "'Geist',monospace",
              }}
            >
              {p.name}
            </div>
            <div style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.4 }}>
              {p.description}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 6,
              }}
            >
              <span style={{ fontSize: 10.5, color: "#4b5563" }}>
                ⭐ {p.stars}
              </span>
              {p.language && (
                <span
                  style={{
                    fontSize: 9.5,
                    background: "rgba(6,182,212,0.12)",
                    color: "#22d3ee",
                    border: "1px solid rgba(6,182,212,0.2)",
                    borderRadius: 4,
                    padding: "1px 6px",
                    fontFamily: "'Geist',monospace",
                  }}
                >
                  {p.language}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ProjectsCard;
