import Card from "../../components/Card";
import SectionLabel from "../../components/SectionLabel";

function SkillBadge({ skill }) {
  return (
    <span style={{
      background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
      color: "#a5b4fc", borderRadius: 6, padding: "3px 10px",
      fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
      fontFamily: "Geist,monospace",
    }}>{skill}</span>
  );
}

export default function SkillsCard({ profile }) {
  return (
    <Card>
      <SectionLabel>Skills</SectionLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {profile.skills.map(s => <SkillBadge key={s} skill={s} />)}
      </div>
    </Card>
  );
}