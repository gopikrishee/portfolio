function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "#16162a", border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 16, padding: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      ...style,
    }}>{children}</div>
  );
}

export default Card;