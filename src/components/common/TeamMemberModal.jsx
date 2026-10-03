import React, { useEffect } from "react";
import { FaTimes, FaLinkedinIn, FaTwitter, FaEnvelope } from "react-icons/fa";

const TeamMemberModal = ({ member, isOpen, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="team-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <FaTimes />
        </button>

        <div className="team-modal-header">
          <div className="team-modal-avatar">{member.emoji}</div>
          <h2>{member.name}</h2>
          <p className="team-modal-role">{member.role}</p>
        </div>

        <div className="team-modal-body">
          <div className="team-modal-section">
            <h4>About</h4>
            <p>{member.bio}</p>
          </div>

          {member.experience && (
            <div className="team-modal-section">
              <h4>Experience</h4>
              <p>{member.experience}</p>
            </div>
          )}

          {member.skills && (
            <div className="team-modal-section">
              <h4>Skills</h4>
              <div className="team-modal-skills">
                {member.skills.map((skill, i) => (
                  <span key={i} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {member.social && (
            <div className="team-modal-section">
              <h4>Connect</h4>

              <div className="team-modal-social">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    className="social-link"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn />
                  </a>
                )}

                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    className="social-link"
                    aria-label="Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter />
                  </a>
                )}

                {member.social.email && (
                  <a
                    href={`mailto:${member.social.email}`}
                    className="social-link"
                    aria-label="Email"
                  >
                    <FaEnvelope />
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberModal;
