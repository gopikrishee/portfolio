function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: 11, color: "#6b7280", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
      {children}
    </div>
  );
}

export default SectionLabel;