import React, { useState, useRef } from "react";

const FileUpload = ({ onFilesChange, maxFiles = 5, maxSize = 10 }) => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles);
    const validFiles = fileArray.filter((file) => {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`${file.name} is too large. Max size: ${maxSize}MB`);
        return false;
      }
      return true;
    });

    const updated = [...files, ...validFiles].slice(0, maxFiles);
    setFiles(updated);
    if (onFilesChange) onFilesChange(updated);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeFile = (index) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (onFilesChange) onFilesChange(updated);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return "🖼️";
    if (type.includes("pdf")) return "📄";
    if (type.includes("word") || type.includes("document")) return "📝";
    if (type.includes("sheet") || type.includes("excel")) return "📊";
    if (type.includes("zip") || type.includes("rar")) return "🗜️";
    return "📎";
  };

  return (
    <div className="file-upload">
      <div
        className={`file-dropzone ${isDragging ? "dragging" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: "none" }}
        />
        <div className="file-dropzone-icon">📁</div>
        <p className="file-dropzone-text">
          <strong>Click to upload</strong> or drag and drop
        </p>
        <p className="file-dropzone-hint">
          Max {maxFiles} files, up to {maxSize}MB each
        </p>
      </div>

      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, i) => (
            <div key={i} className="file-item">
              <span className="file-icon">{getFileIcon(file.type)}</span>
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-size">{formatSize(file.size)}</span>
              </div>
              <button
                type="button"
                className="file-remove"
                onClick={() => removeFile(i)}
                aria-label="Remove file"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
