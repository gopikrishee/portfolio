import Card from "../../components/Card";
import SectionLabel from "../../components/SectionLabel";

function ContactCard({ row, email }) {
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handleWebsiteClick = () => {
    window.open("https://gopikrishee.in", "_blank");
  };

  return (
    <Card>
      <SectionLabel>📬 Contact</SectionLabel>
      <div style={{ display: "flex", flexDirection: row ? "row" : "column", flexWrap: "wrap", gap: row ? 16 : 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13 }}>✉️</span>
          <span
            onClick={handleEmailClick}
            style={{
              fontSize: 11.5,
              color: "#818cf8",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#a5b4fc")}
            onMouseLeave={(e) => (e.target.style.color = "#818cf8")}
          >
            {email}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13 }}>🌐</span>
          <span
            onClick={handleWebsiteClick}
            style={{
              fontSize: 11.5,
              color: "#818cf8",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#a5b4fc")}
            onMouseLeave={(e) => (e.target.style.color = "#818cf8")}
          >
            www.gopikrishee.in
          </span>
        </div>
      </div>
    </Card>
  );
}

export default ContactCard;
