import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Portfolio from "./App";
import Blog from "./pages/home/Blog";
import BlogAdminDashboard from "./pages/creator/BlogAdminDashboard";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/creator" element={<BlogAdminDashboard />} />
      </Routes>
    </Router>
  );
}
