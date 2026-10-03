import React, { useState, useMemo } from "react";
import {
  FaFileAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaPen,
  FaLaptopCode,
  FaCloud,
  FaRobot,
  FaLock,
  FaMobileAlt,
  FaBullhorn,
} from "react-icons/fa";

// ============================================================
// Optional props — pass real data when backend is ready:
//   <BlogManager posts={posts} onSave={handleSave} onDelete={handleDelete} />
// Falls back to local state if props are empty.
// ============================================================
const BlogManager = ({ posts: externalPosts, onSave, onDelete }) => {
  const [localPosts, setLocalPosts] = useState([
    {
      id: 1,
      title: "10 Web Development Trends in 2025",
      category: "Web Development",
      author: "John Smith",
      status: "published",
      views: 2450,
      date: "2024-10-15",
      readTime: "5 min",
      icon: "code",
    },
    {
      id: 2,
      title: "Cloud Migration Guide for Businesses",
      category: "Cloud",
      author: "Sarah Johnson",
      status: "published",
      views: 1890,
      date: "2024-10-12",
      readTime: "8 min",
      icon: "cloud",
    },
    {
      id: 3,
      title: "AI in Business: Practical Applications",
      category: "AI/ML",
      author: "Michael Brown",
      status: "draft",
      views: 0,
      date: "—",
      readTime: "6 min",
      icon: "ai",
    },
    {
      id: 4,
      title: "Cybersecurity Best Practices 2025",
      category: "Security",
      author: "Emily Davis",
      status: "published",
      views: 3200,
      date: "2024-10-08",
      readTime: "7 min",
      icon: "security",
    },
    {
      id: 5,
      title: "Building Scalable Mobile Apps",
      category: "Mobile",
      author: "David Wilson",
      status: "scheduled",
      views: 0,
      date: "2024-10-25",
      readTime: "5 min",
      icon: "mobile",
    },
  ]);

  const posts =
    externalPosts && externalPosts.length > 0 ? externalPosts : localPosts;
  const setPosts = externalPosts ? () => {} : setLocalPosts;

  const [showEditor, setShowEditor] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({
    title: "",
    category: "Web Development",
    content: "",
    status: "draft",
    icon: "code",
    tags: "",
    metaDescription: "",
  });

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const categories = [
    "Web Development",
    "Mobile",
    "Cloud",
    "AI/ML",
    "Security",
    "DevOps",
    "Design",
  ];

  // Map icon key -> Font Awesome component
  const iconMap = {
    code: <FaLaptopCode />,
    cloud: <FaCloud />,
    ai: <FaRobot />,
    security: <FaLock />,
    mobile: <FaMobileAlt />,
    general: <FaBullhorn />,
  };

  const handleSubmit = () => {
    if (!form.title || !form.content) {
      showToast("Title and content required", "error");
      return;
    }

    if (editing) {
      const updated = posts.map((p) =>
        p.id === editing.id ? { ...p, ...form, date: p.date } : p,
      );
      setPosts(updated);
      onSave?.(updated.find((p) => p.id === editing.id));
      showToast("Post updated");
    } else {
      const newPost = {
        id: Date.now(),
        title: form.title,
        category: form.category,
        author: "Admin User",
        status: form.status,
        views: 0,
        date: new Date().toISOString().split("T")[0],
        readTime: Math.ceil(form.content.split(" ").length / 200) + " min",
        icon: form.icon,
      };
      setPosts([newPost, ...posts]);
      onSave?.(newPost);
      showToast("Post created");
    }
    setShowEditor(false);
    setEditing(null);
    setForm({
      title: "",
      category: "Web Development",
      content: "",
      status: "draft",
      icon: "code",
      tags: "",
      metaDescription: "",
    });
  };

  const handleEdit = (post) => {
    setEditing(post);
    setForm({
      ...post,
      content: "Post content here...",
      tags: "",
      metaDescription: "",
    });
    setShowEditor(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this post?")) return;
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    onDelete?.(id);
    showToast("Post deleted", "info");
  };

  const filtered = useMemo(
    () => (filter === "all" ? posts : posts.filter((p) => p.status === filter)),
    [filter, posts],
  );

  const totalViews = posts.reduce((s, p) => s + (p.views || 0), 0);

  return (
    <div className="admin-dashboard">
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>
            {toast.type === "success" ? <FaCheckCircle /> : <FaTimes />}
          </span>
          {toast.message}
        </div>
      )}

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaFileAlt />
            </span>
          </div>
          <div className="admin-stat-value">{posts.length}</div>
          <div className="admin-stat-label">Total Posts</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span
              className="admin-stat-icon"
              style={{ color: "var(--success)" }}
            >
              <FaCheckCircle />
            </span>
          </div>
          <div className="admin-stat-value">
            {posts.filter((p) => p.status === "published").length}
          </div>
          <div className="admin-stat-label">Published</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span
              className="admin-stat-icon"
              style={{ color: "var(--warning)" }}
            >
              <FaPen />
            </span>
          </div>
          <div className="admin-stat-value">
            {posts.filter((p) => p.status === "draft").length}
          </div>
          <div className="admin-stat-label">Drafts</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">
              <FaEye />
            </span>
          </div>
          <div className="admin-stat-value">{totalViews.toLocaleString()}</div>
          <div className="admin-stat-label">Total Views</div>
        </div>
      </div>

      {/* Filters + list */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3>
            <FaFileAlt style={{ marginRight: "0.4rem" }} /> All Posts
          </h3>
          <div className="admin-header-filters">
            <div className="filter-buttons">
              {["all", "published", "draft", "scheduled"].map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => {
                setEditing(null);
                setShowEditor(true);
              }}
            >
              <FaPlus /> New Post
            </button>
          </div>
        </div>

        <div className="blog-admin-grid">
          {filtered.map((post) => (
            <div key={post.id} className="blog-admin-card">
              <div className="blog-admin-image">
                {iconMap[post.icon] || <FaFileAlt />}
              </div>
              <div className="blog-admin-content">
                <span className="blog-category">{post.category}</span>
                <h4>{post.title}</h4>
                <div className="blog-admin-meta">
                  <span>
                    <FaUser /> {post.author}
                  </span>
                  <span>
                    <FaClock /> {post.readTime}
                  </span>
                  <span>
                    <FaEye /> {post.views}
                  </span>
                </div>
                <div className="blog-admin-footer">
                  <span
                    className={`badge badge-${
                      post.status === "published"
                        ? "green"
                        : post.status === "draft"
                          ? "gray"
                          : "yellow"
                    }`}
                  >
                    {post.status}
                  </span>
                  <div className="admin-actions">
                    <button
                      className="icon-btn-sm"
                      onClick={() => handleEdit(post)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="icon-btn-sm"
                      onClick={() => handleDelete(post.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div
              style={{
                padding: "3rem",
                textAlign: "center",
                color: "var(--gray-500)",
                gridColumn: "1 / -1",
              }}
            >
              No posts found
            </div>
          )}
        </div>
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <div className="modal-overlay" onClick={() => setShowEditor(false)}>
          <div
            className="modal-content"
            style={{ maxWidth: "800px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                {editing ? <FaEdit /> : <FaPen />}
                {editing ? "Edit Post" : "New Post"}
              </h2>
              <button
                onClick={() => setShowEditor(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.25rem",
                  cursor: "pointer",
                  color: "var(--gray-500)",
                }}
              >
                <FaTimes />
              </button>
            </div>
            <div className="admin-form">
              <div className="form-group">
                <label>Post Title *</label>
                <input
                  type="text"
                  className="input-field"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Enter post title..."
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="input-field"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    className="input-field"
                    value={form.status}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.value })
                    }
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Cover Icon</label>
                  <select
                    className="input-field"
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  >
                    <option value="code">Code / Web</option>
                    <option value="cloud">Cloud</option>
                    <option value="ai">AI / ML</option>
                    <option value="security">Security</option>
                    <option value="mobile">Mobile</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tags (comma-separated)</label>
                  <input
                    type="text"
                    className="input-field"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="react, node, seo"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Post Content *</label>
                <textarea
                  className="input-field"
                  rows="10"
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  placeholder="Write your post content here..."
                />
              </div>
              <div className="form-group">
                <label>Meta Description (SEO)</label>
                <textarea
                  className="input-field"
                  rows="2"
                  value={form.metaDescription}
                  onChange={(e) =>
                    setForm({ ...form, metaDescription: e.target.value })
                  }
                  maxLength="160"
                  placeholder="160-character summary for search engines"
                />
              </div>
              <div className="form-actions">
                <button
                  className="btn btn-outline"
                  onClick={() => setShowEditor(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                  {editing ? "Update Post" : "Publish Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogManager;
