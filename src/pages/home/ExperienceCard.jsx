import Card from "../../components/Card";
import SectionLabel from "../../components/SectionLabel";

function ExperienceCard({ experience }) {
  return (
    <Card>
      <SectionLabel>Experience</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {experience.map((exp, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 4, flexShrink: 0, background: exp.current ? "#22c55e" : "rgba(99,102,241,0.35)" }} />
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#e2e8f0" }}>{exp.role}</div>
              <div style={{ fontSize: 11, color: "#9ca3af" }}>{exp.company}</div>
              <div style={{ fontSize: 10.5, color: "#6b7280", marginTop: 1 }}>{exp.active_years}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ExperienceCard;
