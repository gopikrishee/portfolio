import { useParams, useNavigate } from "react-router-dom";
import Card from "./Card";

export default function Blog() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: 40, color: "#e2e8f0", maxWidth: 800, margin: "0 auto" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: 20, cursor: "pointer", background: "none", border: "none", color: "#6366f1" }}>← Back to Feed</button>
      <Card>
        <h1>Blog Post {id}</h1>
        <p>This is the detailed view for blog post {id}.</p>
      </Card>
    </div>
  );
}
