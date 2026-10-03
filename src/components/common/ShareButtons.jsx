
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebookF,
  faXTwitter,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faLink,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const ShareButtons = ({
  url = window.location.href,
  title = document.title,
}) => {
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: "Facebook",
      icon: faFacebookF,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "X",
      icon: faXTwitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "LinkedIn",
      icon: faLinkedinIn,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
    },
    {
      name: "WhatsApp",
      icon: faWhatsapp,
      url: `https://wa.me/?text=${encodeURIComponent(
        title + " " + url
      )}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <div className="share-buttons">
      <span className="share-label">Share:</span>

      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
          aria-label={`Share on ${link.name}`}
          title={`Share on ${link.name}`}
        >
          <FontAwesomeIcon icon={link.icon} />
        </a>
      ))}

      <button
        className="share-btn"
        onClick={copyToClipboard}
        aria-label={copied ? "Link copied" : "Copy link"}
        title={copied ? "Link copied" : "Copy link"}
      >
        <FontAwesomeIcon icon={copied ? faCheck : faLink} />
      </button>
    </div>
  );
};

export default ShareButtons;