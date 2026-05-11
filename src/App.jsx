import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Card from "./components/Card";
import SectionLabel from "./components/SectionLabel";
import ProjectsCard from "./pages/home/ProjectsCard";
import ContactCard from "./pages/home/ContactCard";
import { ProfileCard, Avatar } from "./pages/home/ProfileCard";
import ExperienceCard from "./pages/home/ExperienceCard";
import SkillsCard from "./pages/home/SkillsCard";
import Navbar from "./layout/Navbar";
import { useFetchPortfolioData } from "./hooks/useFetchPortfolioData";

import { BLOGS, TAG_COLORS } from "./constants/data";

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
      title: (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          Powered by <img src="/google-gemini-icon.svg" alt="Gemini" style={{ height: 16 }} /> & <img src="/claude-ai-icon.svg" alt="Claude" style={{ height: 16 }} />
        </div>
      ),
      subtitle: "LLM-orchestrated Portfolio",
      textColor: "#f472b6",
      borderColor: "rgba(244,114,182,0.25)",
      bgGradient: "linear-gradient(135deg,rgba(244,114,182,0.12),rgba(192,38,211,0.08))"
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
      <div style={{ fontSize: 12, fontWeight: 800, color: config.textColor, letterSpacing: 0.3, marginTop: 2 }}>{config.title}</div>
      <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{config.subtitle}</div>
    </div>
  );
}

import { FeedSection } from "./pages/home/feeds/FeedSection";
import BottomNav from "./layout/BottomNav";

/* ─── Root ──────────────────────────────────────────────────── */
export default function Portfolio() {
  const { user: userData, blogs, loading, error } = useFetchPortfolioData();
  const bp = useBreakpoint();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileTab, setMobileTab] = useState("feed");

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

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0d0d1a" }}>
      <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-indigo-500"></div>
    </div>
  );
  if (error || !userData) return <div style={{ color: "#fff", padding: 20 }}>Error loading profile.</div>;

  const PROFILE = {
    userName: userData.userName,
    title: userData.title,
    avatar: userData.userName.split(' ').map(n => n[0]).join(''),
    bio: userData.bio,
    location: userData.location,
    skills: userData.skills,
    experience: userData.experience,
    isAdmin: userData.isAdmin,
    stats: { posts: userData.totalBlogs, followers: "1.2K", following: 318 },
  };

  const jobSearchStatus = "open-to-opportunities";
  const isMobile  = bp === "mobile";
  const isTablet  = bp === "tablet";

  const handleHeroClick = () => {
    if (isMobile) setMobileTab("profile");
    else window.location.href = "/";
  };

  const base = { minHeight: "100vh", background: "#0d0d1a", fontFamily: "'Geist',sans-serif", color: "#e2e8f0" };

  /* ── MOBILE ── */
  if (isMobile) {
    const renderTab = () => {
      if (mobileTab === "profile") return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ProfileCard profile={PROFILE} mobile />
          <SkillsCard profile={PROFILE} />
          <ExperienceCard experience={PROFILE.experience} />
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
          <ContactCard email={userData.email} />
          <SocialCard />
        </div>
      );
      return <FeedSection mobile profile={PROFILE} blogs={blogs} />;
    };
    return (
      <div style={base}>
        <Navbar scrolled={scrolled} isMobile onHeroClick={handleHeroClick} />
        <div style={{ padding: "12px 12px 80px" }}>{renderTab()}</div>
        <BottomNav active={mobileTab} setActive={setMobileTab} />
      </div>
    );
  }

  /* ── TABLET (2-col) ── */
  if (isTablet) {
    return (
      <div style={base}>
        <Navbar scrolled={scrolled} onHeroClick={handleHeroClick} />
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div style={{ width: 252, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12, position: "sticky", top: 20, height: "fit-content" }}>
            <ProfileCard profile={PROFILE} />
            <SkillsCard profile={PROFILE} />
            <ExperienceCard experience={PROFILE.experience} />
            <OpenToWork status={jobSearchStatus} />
          </div>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            <FeedSection profile={PROFILE} blogs={blogs} />
            <ProjectsCard horizontal />
            <ContactCard email={userData.email} row />
            <SocialCard row />
          </div>
        </div>
      </div>
    );
  }

  /* ── DESKTOP (3-col) ── */
  return (
    <div style={base}>
      <Navbar scrolled={scrolled} onHeroClick={handleHeroClick} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px", display: "flex", gap: 16, alignItems: "flex-start" }}>
        <aside style={{ width: 260, flexShrink: 0, position: "sticky", top: 20, height: "fit-content", display: "flex", flexDirection: "column", gap: 12 }}>
          <ProfileCard profile={PROFILE} />
          <SkillsCard profile={PROFILE} />
          <ExperienceCard experience={PROFILE.experience} />
        </aside>
        <FeedSection profile={PROFILE} blogs={blogs} />
        <aside style={{ width: 240, flexShrink: 0, position: "sticky", top: 20, height: "fit-content", display: "flex", flexDirection: "column", gap: 12 }}>
          <OpenToWork status={jobSearchStatus} />
          <ProjectsCard />
          <ContactCard email={userData.email} />
          <SocialCard />
        </aside>
      </div>
    </div>
  );
}
