import React, { useState } from "react";
import {
  FaVideo,
  FaPlay,
  FaTimes,
  FaUserTie,
  FaUser,
  FaLaptopCode,
} from "react-icons/fa";

const VideoTestimonials = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  const videos = [
    {
      id: 1,
      client: "Rajesh Kumar",
      company: "TechCorp India",
      role: "CEO",
      thumbnail: <FaVideo />,
      duration: "2:45",
      text: "Best decision we made for our business",
      avatar: <FaUserTie />,
    },
    {
      id: 2,
      client: "Priya Sharma",
      company: "StartupHub",
      role: "Founder",
      thumbnail: <FaVideo />,
      duration: "3:20",
      text: "Exceeded all our expectations",
      avatar: <FaUser />,
    },
    {
      id: 3,
      client: "Amit Patel",
      company: "CloudNine",
      role: "CTO",
      thumbnail: <FaLaptopCode />,
      duration: "2:10",
      text: "Amazing technical expertise",
      avatar: <FaLaptopCode />,
    },
  ];

  return (
    <div className="video-testimonials">
      <div className="video-testimonials-grid">
        {videos.map((video) => (
          <div
            key={video.id}
            className="video-testimonial-card"
            onClick={() => setActiveVideo(video)}
          >
            <div className="video-thumbnail">
              <span className="video-thumbnail-icon">{video.thumbnail}</span>

              <button
                className="video-play-btn"
                type="button"
                aria-label={`Play testimonial from ${video.client}`}
              >
                <FaPlay />
              </button>

              <span className="video-duration">{video.duration}</span>
            </div>

            <div className="video-info">
              <p className="video-quote">"{video.text}"</p>

              <div className="video-author">
                <span className="video-author-avatar">{video.avatar}</span>

                <div>
                  <strong>{video.client}</strong>

                  <span>
                    {video.role}, {video.company}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeVideo && (
        <div
          className="video-modal-overlay"
          onClick={() => setActiveVideo(null)}
        >
          <div className="video-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="video-modal-close"
              onClick={() => setActiveVideo(null)}
              type="button"
              aria-label="Close video"
            >
              <FaTimes />
            </button>

            <div className="video-player">
              <div className="video-placeholder">
                <span className="video-placeholder-icon">
                  <FaVideo />
                </span>

                <p>Video Player</p>

                <p className="video-placeholder-note">
                  {activeVideo.client} - {activeVideo.company}
                </p>
              </div>
            </div>

            <div className="video-modal-info">
              <h3>{activeVideo.client}</h3>

              <p>
                {activeVideo.role}, {activeVideo.company}
              </p>

              <p className="video-modal-quote">"{activeVideo.text}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTestimonials;
