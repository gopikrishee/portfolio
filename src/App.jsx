import { useState, useEffect } from "react";

import Card from "./components/Card";
import SectionLabel from "./components/SectionLabel";
import ProjectsCard from "./components/ProjectsCard";
import ContactCard from "./components/ContactCard";
import { ProfileCard, Avatar } from "./components/ProfileCard";
import Navbar from "./components/Navbar";

/* ─── Data ─────────────────────────────────────────────────── */
const PROFILE = {
  name: "Gopi Krish",
  title: "Senior .NET Developer",
  avatar: "GK",
  bio: "Passionate about building enterprise-grade software with clean architecture. I craft robust systems that scale — from WinForms to Kubernetes.",
  location: "Kanyakumari, Tamil Nadu 🇮🇳",
  skills: ["C# / .NET", "WinForms", "ADO.NET", "Kubernetes", "Docker", "SQL Server", "REST APIs", "Azure", "Entity Framework", "CI/CD"],
  experience: [
    { company: "TechCorp Solutions", role: "Senior .NET Developer", years: "2019 – Present" },
    { company: "InfoSystems Pvt Ltd", role: ".NET Developer", years: "2015 – 2019" },
    { company: "CodeBase India", role: "Junior Developer", years: "2013 – 2015" },
  ],
  stats: { posts: 42, followers: "1.2K", following: 318 },
};

const BLOGS = [
  { id: 1, title: "Kubernetes Deployment Strategies for .NET Apps", date: "Mar 18, 2026", tag: "DevOps", preview: "Rolling updates, blue-green deployments, and canary releases — here's how I manage zero-downtime deploys for large-scale enterprise .NET applications running on K8s clusters.", readTime: "8 min read", likes: 94, comments: 12 },
  { id: 2, title: "ADO.NET vs Entity Framework: When to Choose What", date: "Mar 10, 2026", tag: "Backend", preview: "After 10+ years of working with both, here's my honest take on which data access strategy wins in different scenarios — performance benchmarks included.", readTime: "6 min read", likes: 138, comments: 27 },
  { id: 3, title: "Migrating a Legacy WinForms App to .NET 8", date: "Feb 28, 2026", tag: "Migration", preview: "A practical guide from our real-world migration journey. Pitfalls, wins, and everything in between when modernizing a 12-year-old WinForms codebase.", readTime: "10 min read", likes: 211, comments: 44 },
  { id: 4, title: "Clean Architecture in C#: A Practical Guide", date: "Feb 14, 2026", tag: "Architecture", preview: "Forget the theory — here's how I implement Clean Architecture in real production projects. Domain layers, use cases, and dependency injection done right.", readTime: "7 min read", likes: 176, comments: 33 },
  { id: 5, title: "Docker for .NET Developers: Getting Started", date: "Jan 30, 2026", tag: "Docker", preview: "Containers changed how I ship code. This beginner-friendly guide walks through dockerizing your first .NET 8 API with multi-stage builds and best practices.", readTime: "5 min read", likes: 89, comments: 18 },
];


const TAG_COLORS = {
  DevOps:       { bg: "rgba(99,102,241,0.15)",  text: "#818cf8", border: "rgba(99,102,241,0.3)" },
  Backend:      { bg: "rgba(16,185,129,0.12)",  text: "#34d399", border: "rgba(16,185,129,0.3)" },
  Migration:    { bg: "rgba(245,158,11,0.12)",  text: "#fbbf24", border: "rgba(245,158,11,0.3)" },
  Architecture: { bg: "rgba(239,68,68,0.12)",   text: "#f87171", border: "rgba(239,68,68,0.3)" },
  Docker:       { bg: "rgba(6,182,212,0.12)",   text: "#22d3ee", border: "rgba(6,182,212,0.3)" },
};

/* ─── Breakpoint hook ───────────────────────────────────────── */
function useBreakpoint() {
  const get = () => {
    const w = window.innerWidth;
    if (w < 640)  return "mobile";
    if (w < 1024) return "tablet";
    return "desktop";
  };
  const [bp, setBp] = useState(get);
  useEffect(() => {
    const h = () => setBp(get());
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return bp;
}

/* ─── Shared atoms ──────────────────────────────────────────── */
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


function SkillsCard() {
  return (
    <Card>
      <SectionLabel>Skills</SectionLabel>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {PROFILE.skills.map(s => <SkillBadge key={s} skill={s} />)}
      </div>
    </Card>
  );
}

function ExperienceCard() {
  return (
    <Card>
      <SectionLabel>Experience</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {PROFILE.experience.map((exp, i) => (
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

function SocialCard({ row }) {
  return (
    <Card>
      <SectionLabel>🔗 Social</SectionLabel>
      <div style={{ display: "flex", flexDirection: row ? "row" : "column", gap: 8, flexWrap: "wrap" }}>
        {[{ icon: "💼", name: "LinkedIn", handle: "gopikrishee", url: "https://www.linkedin.com/in/gopikrishee/" }, { icon: "🐙", name: "GitHub", handle: "gopikrishee", url:"https://github.com/gopikrishee" }, { icon: "🐦", name: "Twitter/X", handle: "@gopikrishee", url:"https://x.com/gopikrishee" }].map(({ icon, name, handle, url }) => (
          <div onClick={()=>window.open(url,'_blank')} key={name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 10, cursor: "pointer", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)", flex: row ? 1 : "unset" }}>
            <span style={{ fontSize: 16 }}>{icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af" }}>{name}</div>
              <div style={{ fontSize: 10.5, color: "#6366f1" }}>{handle}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function OpenToWork({ status = "open-to-opportunities" }) {
  const statusConfig = {
    "open-to-opportunities": {
      icon: "🟢",
      title: "Open to Opportunities",
      subtitle: "Available for freelance & fulltime",
      textColor: "#34d399",
      borderColor: "rgba(16,185,129,0.25)",
      bgGradient: "linear-gradient(135deg,rgba(16,185,129,0.12),rgba(6,182,212,0.08))"
    },
    "open-to-conversations": {
      icon: "🟡",
      title: "Open to Conversations",
      subtitle: "Exploring options passively",
      textColor: "#fbbf24",
      borderColor: "rgba(251,191,36,0.25)",
      bgGradient: "linear-gradient(135deg,rgba(251,191,36,0.12),rgba(245,158,11,0.08))"
    },
    "not-available": {
      icon: "🔴",
      title: "Not Available",
      subtitle: "Not currently looking",
      textColor: "#f87171",
      borderColor: "rgba(248,113,113,0.25)",
      bgGradient: "linear-gradient(135deg,rgba(248,113,113,0.12),rgba(239,68,68,0.08))"
    }
  };

  const config = statusConfig[status] || statusConfig["open-to-opportunities"];

  return (
    <div style={{ background: config.bgGradient, border: `1px solid ${config.borderColor}`, borderRadius: 16, padding: "12px 16px", textAlign: "center" }}>
      <span style={{ fontSize: 16 }}>{config.icon}</span>
      <div style={{ fontSize: 12, fontWeight: 800, color: config.textColor, letterSpacing: 0.3, marginTop: 2 }}>{config.title}</div>
      <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{config.subtitle}</div>
    </div>
  );
}

/* ─── Blog Card ─────────────────────────────────────────────── */
function BlogCard({ post, index, mobile }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const tag = TAG_COLORS[post.tag] || TAG_COLORS.Backend;
  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#1a1a2e" : "#16162a",
        border: `1px solid ${hovered ? "rgba(99,102,241,0.3)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 16, padding: mobile ? 14 : "20px 22px",
        transition: "all 0.25s", cursor: "pointer",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.5)" : "0 2px 12px rgba(0,0,0,0.3)",
        animation: "fadeSlideIn 0.4s ease forwards",
        animationDelay: `${index * 0.07}s`, opacity: 0,
      }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
        <Avatar size={mobile ? 38 : 46} profile={PROFILE} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: mobile ? 13 : 14, fontWeight: 800, color: "#f1f1f9", fontFamily: "'Geist',sans-serif" }}>{PROFILE.name}</span>
            <span style={{ fontSize: 11, color: "#4b5563" }}>@gopikrsh · {post.date}</span>
          </div>
          <div style={{ fontSize: 10.5, color: "#6b7280" }}>{PROFILE.title}</div>
        </div>
        <span style={{ background: tag.bg, color: tag.text, border: `1px solid ${tag.border}`, borderRadius: 20, padding: "3px 9px", fontSize: 10, fontWeight: 700, flexShrink: 0, whiteSpace: "nowrap" }}>{post.tag}</span>
      </div>
      <h2 style={{ fontSize: mobile ? 14 : 16, fontWeight: 800, color: "#e2e8f0", margin: "0 0 7px", lineHeight: 1.4, fontFamily: "'Geist',sans-serif", letterSpacing: -0.3 }}>{post.title}</h2>
      <p style={{ fontSize: mobile ? 12.5 : 13.5, color: "#9ca3af", lineHeight: 1.65, margin: "0 0 12px" }}>{post.preview}</p>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 14 }}>
          <button onClick={e => { e.stopPropagation(); setLiked(!liked); }} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 5, color: liked ? "#f87171" : "#6b7280", fontSize: 12 }}>
            <span>{liked ? "❤️" : "🤍"}</span>
            <span style={{ fontWeight: 600 }}>{post.likes + (liked ? 1 : 0)}</span>
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 5, color: "#6b7280", fontSize: 12 }}>
            <span>💬</span><span style={{ fontWeight: 600 }}>{post.comments}</span>
          </button>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#6b7280", fontSize: 12 }}>🔁</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!mobile && <span style={{ fontSize: 11, color: "#4b5563" }}>⏱ {post.readTime}</span>}
          <button style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Read More →</button>
        </div>
      </div>
    </article>
  );
}

/* ─── Feed Section ──────────────────────────────────────────── */
function FeedSection({ mobile }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
      <div style={{
        background: "rgba(22,22,42,0.9)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "12px 16px", borderRadius: "16px 16px 0 0",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: mobile ? 50 : 0, zIndex: 9,
      }}>
        <div style={{ display: "flex" }}>
          {["Latest Posts", "Popular"].map((tab, i) => (
            <button key={tab} style={{
              background: i === 0 ? "rgba(99,102,241,0.15)" : "none",
              border: "none", color: i === 0 ? "#818cf8" : "#6b7280",
              fontWeight: i === 0 ? 800 : 500, fontSize: 12.5, cursor: "pointer",
              padding: "6px 12px", borderRadius: 8,
              borderBottom: i === 0 ? "2px solid #6366f1" : "2px solid transparent",
              fontFamily: "'Geist',sans-serif",
            }}>{tab}</button>
          ))}
        </div>
        <span style={{ fontSize: 11, color: "#4b5563" }}>{BLOGS.length} posts</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, background: "rgba(255,255,255,0.015)" }}>
        {BLOGS.map((post, i) => <BlogCard key={post.id} post={post} index={i} mobile={mobile} />)}
      </div>
      <div style={{ padding: 16, textAlign: "center" }}>
        <button style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", color: "#818cf8", borderRadius: 10, padding: "10px 24px", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>
          Load More Posts
        </button>
      </div>
    </div>
  );
}

/* ─── Mobile Bottom Tab Bar ─────────────────────────────────── */
function BottomNav({ active, setActive }) {
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

/* ─── Root ──────────────────────────────────────────────────── */
export default function Portfolio() {
  // Job search status configuration - easily toggleable between: "open-to-opportunities" | "open-to-conversations" | "not-available"
  const jobSearchStatus = "open-to-opportunities";

  const bp = useBreakpoint();
  const [scrolled, setScrolled] = useState(false);
  const [mobileTab, setMobileTab] = useState("feed");
  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { -webkit-text-size-adjust: 100%; }
      body { background: #0d0d1a; overflow-x: hidden; }
      @keyframes fadeSlideIn {
        from { opacity: 0; transform: translateY(14px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #0d0d1a; }
      ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 3px; }
    `;
    document.head.appendChild(style);

    // Ensure proper mobile viewport
    let vp = document.querySelector('meta[name="viewport"]');
    if (!vp) {
      vp = document.createElement("meta");
      vp.name = "viewport";
      document.head.appendChild(vp);
    }
    vp.content = "width=device-width, initial-scale=1, viewport-fit=cover";

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); document.head.removeChild(style); };
  }, []);

  const base = { minHeight: "100vh", background: "#0d0d1a", fontFamily: "'Geist',sans-serif", color: "#e2e8f0" };

  /* ── MOBILE ── */
  if (isMobile) {
    const renderTab = () => {
      if (mobileTab === "profile") return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ProfileCard profile={PROFILE} mobile />
          <SkillsCard />
          <ExperienceCard />
          <OpenToWork status={jobSearchStatus} />
        </div>
      );
      if (mobileTab === "projects") return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ProjectsCard />
          <SocialCard />
        </div>
      );
      if (mobileTab === "contact") return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ContactCard />
          <SocialCard />
        </div>
      );
      return <FeedSection mobile />;
    };
    return (
      <div style={base}>
        <Navbar scrolled={scrolled} isMobile />
        <div style={{ padding: "12px 12px 80px" }}>{renderTab()}</div>
        <BottomNav active={mobileTab} setActive={setMobileTab} />
      </div>
    );
  }

  /* ── TABLET (2-col) ── */
  if (isTablet) {
    return (
      <div style={base}>
        <Navbar scrolled={scrolled} />
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ width: 252, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12, position: "sticky", top: 20, height: "fit-content" }}>
            <ProfileCard profile={PROFILE} />
            <SkillsCard />
            <ExperienceCard />
            <OpenToWork status={jobSearchStatus} />
          </div>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            <FeedSection />
            <ProjectsCard horizontal />
            <ContactCard row />
            <SocialCard row />
          </div>
        </div>
      </div>
    );
  }

  /* ── DESKTOP (3-col) ── */
  return (
    <div style={base}>
      <Navbar scrolled={scrolled} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px", display: "flex", gap: 16, alignItems: "flex-start" }}>
        <aside style={{ width: 260, flexShrink: 0, position: "sticky", top: 20, height: "fit-content", display: "flex", flexDirection: "column", gap: 12 }}>
          <ProfileCard profile={PROFILE} />
          <SkillsCard />
          <ExperienceCard />
        </aside>
        <FeedSection />
        <aside style={{ width: 240, flexShrink: 0, position: "sticky", top: 20, height: "fit-content", display: "flex", flexDirection: "column", gap: 12 }}>
          <OpenToWork status={jobSearchStatus} />
          <ProjectsCard />
          <ContactCard />
          <SocialCard />
        </aside>
      </div>
    </div>
  );
}
