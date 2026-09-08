import { useState, useRef } from "react";
import Navbar from "../../layout/Navbar";
import { createBlog } from "../../api/blogApi";

const BLOCK_TYPES = [
  { type: "content", label: "Text Content", icon: "✏️", desc: "Paragraph text" },
  { type: "blockquote", label: "Blockquote", icon: "❝", desc: "Highlighted quote" },
  { type: "code", label: "Code Snippet", icon: "{ }", desc: "Code block" },
];

let blockCounter = 0;
const makeBlock = (type) => ({ id: ++blockCounter, type, value: "" });

export default function BlogAdminDashboard() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [blocks, setBlocks] = useState([makeBlock("content")]);
  const [openMenuIdx, setOpenMenuIdx] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [isPublishing, setIsPublishing] = useState(false);
  const [focusedBlock, setFocusedBlock] = useState(null);
  const menuRef = useRef();

  const showNotification = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3500);
  };

  const handleTagKey = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const t = tagInput.trim().replace(/^#/, "");
      if (t && !tags.includes(t)) setTags([...tags, t]);
      setTagInput("");
    }
    if (e.key === "Backspace" && !tagInput && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (idx) => setTags(tags.filter((_, i) => i !== idx));

  const addBlock = (afterIdx, type) => {
    const newBlock = makeBlock(type);
    const next = [...blocks];
    next.splice(afterIdx + 1, 0, newBlock);
    setBlocks(next);
    setOpenMenuIdx(null);
    setTimeout(() => setFocusedBlock(newBlock.id), 50);
  };

  const updateBlock = (id, value) =>
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, value } : b)));

  const removeBlock = (id) => {
    if (blocks.length === 1) return;
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const handlePublish = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      showNotification("Please enter a blog title before publishing.", "error");
      return;
    }

    // Capture any pending tag still typed in the input
    let finalTags = [...tags];
    if (tagInput.trim()) {
      const pendingTag = tagInput.trim().replace(/^#/, "");
      if (pendingTag && !finalTags.includes(pendingTag)) {
        finalTags.push(pendingTag);
        setTags(finalTags);
        setTagInput("");
      }
    }

    const textcontents = [];
    const blockquote = [];
    const codesnippet = [];
    const contentBlocks = [];

    blocks.forEach((block) => {
      const content = block.value;
      if (!content || !content.trim()) return;

      let apiType = "text";
      if (block.type === "blockquote") {
        apiType = "blockquote";
        blockquote.push(content);
      } else if (block.type === "code" || block.type === "codesnippet") {
        apiType = "codesnippet";
        codesnippet.push(content);
      } else {
        apiType = "text";
        textcontents.push(content);
      }

      contentBlocks.push({
        type: apiType,
        content,
        order: contentBlocks.length,
      });
    });

    if (contentBlocks.length === 0) {
      showNotification("Please add at least one content block before publishing.", "error");
      return;
    }

    const payload = {
      title: trimmedTitle,
      subtitle: subtitle.trim(),
      tags: finalTags,
      textcontents,
      blockquote,
      codesnippet,
      contentBlocks,
    };

    setIsPublishing(true);
    try {
      await createBlog(payload);
      showNotification("✓ Blog published successfully!", "success");
      setTitle("");
      setSubtitle("");
      setTags([]);
      setTagInput("");
      setBlocks([makeBlock("content")]);
    } catch (err) {
      showNotification(err.message || "Failed to publish blog. Please try again.", "error");
    } finally {
      setIsPublishing(false);
    }
  };


  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const blockTypeInfo = (type) => BLOCK_TYPES.find((b) => b.type === type);

  return (
    <div className="blog-admin-root">
      <Navbar scrolled={false} isMobile={false} onHeroClick={() => window.location.href = '/'} />

      {/* Main content */}
      <div className="blog-admin-container">

        {/* Static header card */}
        <div className="blog-admin-card">
          <div className="blog-admin-field-label">
            <span>📝</span> Title
          </div>
          <textarea
            className="blog-admin-input"
            style={{ minHeight: 40 }}
            placeholder="What's happening?"
            value={title}
            onChange={(e) => { setTitle(e.target.value); autoResize(e); }}
            rows={1}
            spellCheck
          />
          <hr className="blog-admin-divider" />

          <div className="blog-admin-field-label">
            <span>💬</span> Subtitle
          </div>
          <textarea
            className="blog-admin-subtitle-input"
            style={{ minHeight: 36 }}
            placeholder="Add a brief description..."
            value={subtitle}
            onChange={(e) => { setSubtitle(e.target.value); autoResize(e); }}
            rows={1}
            spellCheck
          />
          <hr className="blog-admin-divider" />

          <div className="blog-admin-field-label">
            <span>🏷️</span> Tags
          </div>
          <div className="blog-admin-tag-container">
            {tags.map((tag, i) => (
              <span key={i} className="blog-admin-tag">
                #{tag}
                <button className="blog-admin-tag-remove" onClick={() => removeTag(i)} title="Remove tag">×</button>
              </span>
            ))}
            <input
              className="blog-admin-tag-input"
              placeholder="Add tag & press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKey}
            />
          </div>
        </div>

        {/* Dynamic blocks */}
        <div style={{ position: "relative" }}>
          {blocks.map((block, idx) => (
            <div key={block.id}>
              <div
                className={`blog-admin-content-block ${focusedBlock === block.id ? "focused" : ""}`}
                onFocus={() => setFocusedBlock(block.id)}
                onBlur={() => setFocusedBlock(null)}
              >
                <div className="blog-admin-block-header">
                  <span className="blog-admin-block-type">
                    <span>{blockTypeInfo(block.type)?.icon}</span>
                    {blockTypeInfo(block.type)?.label}
                  </span>
                  <button
                    className="blog-admin-block-remove-btn"
                    onClick={() => removeBlock(block.id)}
                    title="Remove block"
                  >
                    ✕
                  </button>
                </div>

                {block.type === "content" && (
                  <textarea
                    className="blog-admin-textarea"
                    placeholder="Start writing your content..."
                    value={block.value}
                    onChange={(e) => { updateBlock(block.id, e.target.value); autoResize(e); }}
                    autoFocus={focusedBlock === block.id}
                    spellCheck
                  />
                )}
                {block.type === "blockquote" && (
                  <textarea
                    className="blog-admin-blockquote-textarea"
                    placeholder="Add a powerful quote here..."
                    value={block.value}
                    onChange={(e) => { updateBlock(block.id, e.target.value); autoResize(e); }}
                    autoFocus={focusedBlock === block.id}
                  />
                )}
                {block.type === "code" && (
                  <textarea
                    className="blog-admin-code-textarea"
                    placeholder="// Paste your code here..."
                    value={block.value}
                    onChange={(e) => { updateBlock(block.id, e.target.value); autoResize(e); }}
                    autoFocus={focusedBlock === block.id}
                    spellCheck={false}
                  />
                )}
              </div>

              {/* Add block row */}
              <div className="blog-admin-add-block-row" style={{ zIndex: openMenuIdx === idx ? 60 : 1 }}>
                <div className="blog-admin-add-line" />
                <button
                  className="blog-admin-add-btn"
                  onClick={() => setOpenMenuIdx(openMenuIdx === idx ? null : idx)}
                  title="Add block"
                >
                  {openMenuIdx === idx ? "×" : "+"}
                </button>
                <div className="blog-admin-add-line" />

                {openMenuIdx === idx && (
                  <div className="blog-admin-add-menu" ref={menuRef}>
                    {BLOCK_TYPES.map((bt) => (
                      <button
                        key={bt.type}
                        className="blog-admin-add-menu-item"
                        onClick={() => addBlock(idx, bt.type)}
                      >
                        <span className="blog-admin-add-menu-icon">{bt.icon}</span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>{bt.label}</div>
                          <div style={{ fontSize: 12, color: "var(--twitter-muted)", marginTop: 1 }}>{bt.desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="blog-admin-bottom-bar">
        <button
          className="blog-admin-btn blog-admin-btn-secondary"
          onClick={() => setShowPreview(true)}
          disabled={isPublishing}
        >
          Preview
        </button>
        <button
          className="blog-admin-btn blog-admin-btn-primary"
          onClick={handlePublish}
          disabled={isPublishing}
          style={{
            opacity: isPublishing ? 0.7 : 1,
            cursor: isPublishing ? "not-allowed" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {isPublishing ? (
            <>
              <svg
                className="animate-spin"
                style={{ width: 16, height: 16 }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" />
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeLinecap="round" />
              </svg>
              <span>Publishing...</span>
            </>
          ) : (
            "Publish"
          )}
        </button>
      </div>

      {/* Preview modal */}
      {showPreview && (
        <div className="blog-admin-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowPreview(false); }}>
          <div className="blog-admin-modal">
            <div className="blog-admin-modal-header">
              <span className="blog-admin-modal-title">Preview</span>
              <button
                className="blog-admin-modal-close"
                onClick={() => setShowPreview(false)}
              >
                ✕
              </button>
            </div>
            <div className="blog-admin-preview-body">
              {title && <div className="blog-admin-preview-title">{title}</div>}
              {subtitle && <div className="blog-admin-preview-subtitle">{subtitle}</div>}
              {tags.length > 0 && (
                <div className="blog-admin-preview-tag-row">
                  {tags.map((tag, i) => (
                    <span key={i} className="blog-admin-preview-tag">#{tag}</span>
                  ))}
                </div>
              )}
              {blocks.map((block) => (
                <div key={block.id}>
                  {block.type === "content" && block.value && (
                    <p className="blog-admin-preview-content">{block.value}</p>
                  )}
                  {block.type === "blockquote" && block.value && (
                    <blockquote className="blog-admin-preview-blockquote">{block.value}</blockquote>
                  )}
                  {block.type === "code" && block.value && (
                    <pre className="blog-admin-preview-code">{block.value}</pre>
                  )}
                </div>
              ))}
              {!title && !subtitle && blocks.every((b) => !b.value) && (
                <div style={{ color: "var(--twitter-muted)", textAlign: "center", padding: "40px 0", fontSize: 15 }}>
                  Nothing to preview yet. Start writing!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast.show && (
        <div
          className="blog-admin-save-toast"
          style={{
            background: toast.type === "error" ? "#dc2626" : "#1D9BF0",
            boxShadow: toast.type === "error" ? "0 4px 24px rgba(220, 38, 38, 0.4)" : "0 4px 24px rgba(29, 155, 240, 0.4)",
          }}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
