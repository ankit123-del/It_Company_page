import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaLaptopCode,
  FaCloud,
  FaRobot,
  FaLock,
  FaMobileAlt,
  FaSyncAlt,
  FaNewspaper,
  FaUser,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

const Blog = () => {
  const [category, setCategory] = useState("all");

  const posts = [
    {
      id: 1,
      title: "10 Web Development Trends to Watch in 2024",
      excerpt:
        "Discover the latest trends shaping the future of web development...",
      category: "Web Development",
      author: "John Smith",
      date: "2024-10-15",
      readTime: "5 min read",
      image: <FaLaptopCode />,
    },
    {
      id: 2,
      title: "The Complete Guide to Cloud Migration",
      excerpt:
        "Everything you need to know about migrating your infrastructure to the cloud...",
      category: "Cloud",
      author: "Sarah Johnson",
      date: "2024-10-12",
      readTime: "8 min read",
      image: <FaCloud />,
    },
    {
      id: 3,
      title: "AI in Business: Practical Applications",
      excerpt:
        "How businesses are leveraging AI to gain competitive advantage...",
      category: "AI/ML",
      author: "Michael Brown",
      date: "2024-10-10",
      readTime: "6 min read",
      image: <FaRobot />,
    },
    {
      id: 4,
      title: "Cybersecurity Best Practices for 2024",
      excerpt:
        "Protect your business with these essential security practices...",
      category: "Security",
      author: "Emily Davis",
      date: "2024-10-08",
      readTime: "7 min read",
      image: <FaLock />,
    },
    {
      id: 5,
      title: "Building Scalable Mobile Apps",
      excerpt: "Best practices for building mobile applications that scale...",
      category: "Mobile",
      author: "David Wilson",
      date: "2024-10-05",
      readTime: "5 min read",
      image: <FaMobileAlt />,
    },
    {
      id: 6,
      title: "DevOps Culture: A Complete Guide",
      excerpt:
        "How to build a successful DevOps culture in your organization...",
      category: "DevOps",
      author: "Lisa Anderson",
      date: "2024-10-01",
      readTime: "10 min read",
      image: <FaSyncAlt />,
    },
  ];

  const categories = [
    "all",
    "Web Development",
    "Cloud",
    "AI/ML",
    "Security",
    "Mobile",
    "DevOps",
  ];

  const filteredPosts =
    category === "all" ? posts : posts.filter((p) => p.category === category);

  return (
    <div className="blog-page">
      <div className="page-hero">
        <div className="container">
          <h1 className="page-title">Blog & Insights</h1>
          <p className="page-subtitle">
            Latest articles, tutorials, and industry insights
          </p>
        </div>
      </div>

      <div className="container">
        {/* Featured Post */}
        <div className="featured-post">
          <div className="featured-image">
            <FaNewspaper />
          </div>
          <div className="featured-content">
            <span className="post-category">Featured</span>
            <h2>The Future of Web Development: What to Expect in 2025</h2>
            <p>
              Explore the emerging technologies and trends that will shape web
              development in the coming year...
            </p>
            <div className="post-meta">
              <span>
                <FaUser /> John Smith
              </span>
              <span>
                <FaCalendarAlt /> Oct 20, 2024
              </span>
              <span>
                <FaClock /> 10 min read
              </span>
            </div>
            <Link to="/blog/future-web-development" className="btn btn-primary">
              Read Article →
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div className="blog-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${category === cat ? "active" : ""}`}
              onClick={() => setCategory(cat)}
            >
              {cat === "all" ? "All Posts" : cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="blog-grid">
          {filteredPosts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="blog-image">{post.image}</div>
              <div className="blog-content">
                <span className="blog-category">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-meta">
                  <span>
                    <FaUser /> {post.author}
                  </span>
                  <span>
                    <FaClock /> {post.readTime}
                  </span>
                </div>
                <Link to={`/blog/${post.id}`} className="blog-read-more">
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter */}
        <div className="newsletter-box">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Get the latest articles and insights delivered to your inbox.</p>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="btn btn-primary">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Blog;
