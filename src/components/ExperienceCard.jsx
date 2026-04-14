import Card from "./Card";
import SectionLabel from "./SectionLabel";

function ExperienceCard({ experience }) {
  return (
    <Card>
      <SectionLabel>Experience</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {experience.map((exp, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", marginTop: 4, flexShrink: 0, background: i === 0 ? "#6366f1" : "rgba(99,102,241,0.35)" }} />
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: i === 0 ? "#e2e8f0" : "#9ca3af" }}>{exp.role}</div>
              <div style={{ fontSize: 11, color: "#6b7280" }}>{exp.company}</div>
              <div style={{ fontSize: 10.5, color: "#4b5563", marginTop: 1 }}>{exp.years}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ExperienceCard;
