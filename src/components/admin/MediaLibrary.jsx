import React, { useState } from "react";
import {
  FaUpload,
  FaTrash,
  FaCopy,
  FaFile,
  FaImage,
  FaFilePdf,
  FaFileVideo,
  FaSearch,
  FaDownload,
} from "react-icons/fa";

const MediaLibrary = () => {
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "hero-image.jpg",
      type: "image",
      size: "245 KB",
      date: "2024-10-15",
      url: "#",
    },
    {
      id: 2,
      name: "logo.png",
      type: "image",
      size: "45 KB",
      date: "2024-10-14",
      url: "#",
    },
    {
      id: 3,
      name: "proposal.pdf",
      type: "pdf",
      size: "1.2 MB",
      date: "2024-10-13",
      url: "#",
    },
    {
      id: 4,
      name: "demo-video.mp4",
      type: "video",
      size: "15.4 MB",
      date: "2024-10-12",
      url: "#",
    },
    {
      id: 5,
      name: "contract.docx",
      type: "file",
      size: "89 KB",
      date: "2024-10-10",
      url: "#",
    },
    {
      id: 6,
      name: "team-photo.jpg",
      type: "image",
      size: "512 KB",
      date: "2024-10-08",
      url: "#",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [dragging, setDragging] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const getFileIcon = (type) => {
    const icons = {
      image: <FaImage />,
      pdf: <FaFilePdf />,
      video: <FaFileVideo />,
      file: <FaFile />,
    };
    return icons[type] || <FaFile />;
  };

  const getFileColor = (type) => {
    const colors = {
      image: "#10b981",
      pdf: "#ef4444",
      video: "#8b5cf6",
      file: "#64748b",
    };
    return colors[type] || "#64748b";
  };

  const getFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const uploadedFiles = Array.from(e.dataTransfer.files);

    uploadedFiles.forEach((file) => {
      let type = "file";
      if (file.type.startsWith("image/")) type = "image";
      else if (file.type.includes("pdf")) type = "pdf";
      else if (file.type.startsWith("video/")) type = "video";

      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        type,
        size: getFileSize(file.size),
        date: new Date().toISOString().split("T")[0],
        url: URL.createObjectURL(file),
      };

      setFiles((prev) => [newFile, ...prev]);
    });

    showToast(`${uploadedFiles.length} file(s) uploaded!`);
  };

  const handleFileInput = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    uploadedFiles.forEach((file) => {
      let type = "file";
      if (file.type.startsWith("image/")) type = "image";
      else if (file.type.includes("pdf")) type = "pdf";
      else if (file.type.startsWith("video/")) type = "video";

      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        type,
        size: getFileSize(file.size),
        date: new Date().toISOString().split("T")[0],
        url: URL.createObjectURL(file),
      };

      setFiles((prev) => [newFile, ...prev]);
    });
    showToast(`${uploadedFiles.length} file(s) uploaded!`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this file?")) {
      setFiles(files.filter((f) => f.id !== id));
      showToast("File deleted", "info");
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    showToast("URL copied to clipboard!");
  };

  const filteredFiles = files.filter((f) => {
    const matchesFilter = filter === "all" || f.type === filter;
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="admin-dashboard">
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          <span>{toast.type === "success" ? "✅" : "ℹ️"}</span>
          {toast.message}
        </div>
      )}

      {/* Stats */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon">📁</span>
          </div>
          <div className="admin-stat-value">{files.length}</div>
          <div className="admin-stat-label">Total Files</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#10b981" }}>
              <FaImage />
            </span>
          </div>
          <div className="admin-stat-value">
            {files.filter((f) => f.type === "image").length}
          </div>
          <div className="admin-stat-label">Images</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#ef4444" }}>
              <FaFilePdf />
            </span>
          </div>
          <div className="admin-stat-value">
            {files.filter((f) => f.type === "pdf").length}
          </div>
          <div className="admin-stat-label">Documents</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-header">
            <span className="admin-stat-icon" style={{ color: "#8b5cf6" }}>
              <FaFileVideo />
            </span>
          </div>
          <div className="admin-stat-value">
            {files.filter((f) => f.type === "video").length}
          </div>
          <div className="admin-stat-label">Videos</div>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        className={`media-dropzone ${dragging ? "dragging" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById("media-upload").click()}
      >
        <div className="media-dropzone-icon">
          <FaUpload />
        </div>
        <p>
          <strong>Drop files here</strong> or click to upload
        </p>
        <p className="media-dropzone-hint">
          Max file size: 10MB • Supports images, PDFs, videos
        </p>
        <input
          id="media-upload"
          type="file"
          multiple
          onChange={handleFileInput}
          style={{ display: "none" }}
        />
      </div>

      {/* Filters */}
      <div className="media-toolbar">
        <div className="media-filters">
          {[
            { id: "all", label: "All" },
            { id: "image", label: "Images" },
            { id: "pdf", label: "PDFs" },
            { id: "video", label: "Videos" },
            { id: "file", label: "Files" },
          ].map((f) => (
            <button
              key={f.id}
              className={`filter-btn ${filter === f.id ? "active" : ""}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="search-input-wrapper">
          <FaSearch />
          <input
            type="text"
            placeholder="Search files..."
            className="input-field input-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Files Grid */}
      <div className="media-grid">
        {filteredFiles.map((file) => (
          <div key={file.id} className="media-card">
            <div
              className="media-preview"
              style={{
                background: getFileColor(file.type) + "20",
                color: getFileColor(file.type),
              }}
            >
              {getFileIcon(file.type)}
            </div>
            <div className="media-info">
              <p className="media-name" title={file.name}>
                {file.name}
              </p>
              <p className="media-meta">
                {file.size} • {file.date}
              </p>
            </div>
            <div className="media-actions">
              <button
                className="icon-btn-sm"
                onClick={() => handleCopy(file.url)}
                title="Copy URL"
              >
                <FaCopy />
              </button>
              <button
                className="icon-btn-sm"
                onClick={() => handleDelete(file.id)}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        {filteredFiles.length === 0 && (
          <div
            className="empty-state"
            style={{
              gridColumn: "1 / -1",
              padding: "3rem",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📁</div>
            <h3>No files found</h3>
            <p>Upload files to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
