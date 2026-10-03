// Complete list of all routes in your website
// This file is used by vite-plugin-seo-files to generate sitemap.xml

export const routes = [
  // ===== PUBLIC PAGES (High Priority) =====
  { path: "/", priority: 1.0, changefreq: "weekly" },
  { path: "/services", priority: 0.9, changefreq: "weekly" },
  { path: "/about", priority: 0.9, changefreq: "monthly" },
  { path: "/contact", priority: 0.9, changefreq: "monthly" },
  { path: "/pricing", priority: 0.9, changefreq: "weekly" },
  { path: "/portfolio", priority: 0.8, changefreq: "weekly" },
  { path: "/case-studies", priority: 0.8, changefreq: "weekly" },
  { path: "/blog", priority: 0.8, changefreq: "daily" },
  { path: "/careers", priority: 0.7, changefreq: "weekly" },
  { path: "/faq", priority: 0.7, changefreq: "monthly" },

  // ===== SERVICE PAGES (SEO Critical) =====
  { path: "/services/web-development", priority: 0.9, changefreq: "weekly" },
  { path: "/services/mobile-development", priority: 0.9, changefreq: "weekly" },
  { path: "/services/cloud-solutions", priority: 0.9, changefreq: "weekly" },
  { path: "/services/cyber-security", priority: 0.9, changefreq: "weekly" },
  { path: "/services/ai-ml", priority: 0.9, changefreq: "weekly" },
  { path: "/services/data-analytics", priority: 0.8, changefreq: "weekly" },
  { path: "/services/devops", priority: 0.8, changefreq: "weekly" },
  { path: "/services/ui-ux", priority: 0.8, changefreq: "weekly" },

  // ===== TOOLS (Traffic Magnets) =====
  { path: "/quote", priority: 0.7, changefreq: "monthly" },
  { path: "/tools/speed-test", priority: 0.7, changefreq: "monthly" },
  { path: "/tools/seo-analyzer", priority: 0.7, changefreq: "monthly" },

  // ===== KNOWLEDGE BASE =====
  { path: "/docs", priority: 0.6, changefreq: "weekly" },
  { path: "/docs/getting-started", priority: 0.6, changefreq: "weekly" },
  { path: "/docs/api-authentication", priority: 0.6, changefreq: "weekly" },
  { path: "/docs/deploy-first-app", priority: 0.6, changefreq: "weekly" },
];

// SEO metadata for each page
export const pageMeta = {
  "/": {
    title:
      "SMLAG TechSolutions | #1 IT Company in India | Web & Mobile Development",
    description:
      "Leading IT company in India offering web development, mobile apps, cloud solutions, AI/ML, and cyber security. 500+ projects delivered. Get a free quote today!",
    keywords:
      "IT company India, web development, mobile app development, cloud solutions, software company Mumbai, best IT services",
    ogImage: "/images/og-home.jpg",
  },
  "/services": {
    title:
      "IT Services | Web, Mobile, Cloud & AI Solutions | SMLAG TechSolutions",
    description:
      "Explore our comprehensive IT services - web development, mobile apps, cloud solutions, cyber security, AI/ML, and data analytics. Serving businesses worldwide.",
    keywords:
      "IT services, software development services, custom software, enterprise solutions",
    ogImage: "/images/og-services.jpg",
  },
  "/about": {
    title: "About Us | 10+ Years of IT Excellence | SMLAG TechSolutions",
    description:
      "Learn about SMLAG TechSolutions - a leading IT company with 10+ years experience, 500+ projects, and 50+ experts. Trusted by businesses worldwide.",
    keywords:
      "about SMLAG, IT company profile, tech company India, software company story",
    ogImage: "/images/og-about.jpg",
  },
  "/contact": {
    title: "Contact Us | Get Free IT Consultation | SMLAG TechSolutions",
    description:
      "Get in touch with SMLAG TechSolutions for free consultation. Call +91 9876543210 or email info@smlagtech.com. Response within 24 hours.",
    keywords:
      "contact IT company, software consultation, hire developers India",
    ogImage: "/images/og-contact.jpg",
  },
  "/pricing": {
    title: "IT Services Pricing | Affordable Web Development Plans | SMLAG",
    description:
      "Transparent IT services pricing starting ₹25,000. Web development, mobile apps, cloud solutions. No hidden fees. Get your custom quote today!",
    keywords:
      "IT services pricing, web development cost, mobile app cost India",
    ogImage: "/images/og-pricing.jpg",
  },
  "/portfolio": {
    title: "Portfolio | 500+ Successful IT Projects | SMLAG TechSolutions",
    description:
      "Browse our portfolio of 500+ successful IT projects - e-commerce platforms, mobile apps, cloud migrations, and enterprise software solutions.",
    keywords: "IT portfolio, software projects, web development portfolio",
    ogImage: "/images/og-portfolio.jpg",
  },
  "/case-studies": {
    title: "Case Studies | Real Client Success Stories | SMLAG TechSolutions",
    description:
      "Read detailed case studies of our successful IT projects. See how we helped businesses achieve 300% growth with custom software solutions.",
    keywords: "IT case studies, software success stories, client testimonials",
    ogImage: "/images/og-case-studies.jpg",
  },
  "/blog": {
    title: "Tech Blog | IT Insights & Trends | SMLAG TechSolutions",
    description:
      "Read latest articles on web development, AI, cloud computing, and cyber security. Expert insights from SMLAG TechSolutions team.",
    keywords: "tech blog, IT insights, web development blog, AI articles India",
    ogImage: "/images/og-blog.jpg",
  },
  "/careers": {
    title: "Careers | Join Our IT Team | SMLAG TechSolutions Jobs",
    description:
      "Explore IT career opportunities at SMLAG TechSolutions. We are hiring developers, designers, and engineers. Competitive salary and benefits.",
    keywords: "IT jobs India, software developer jobs, tech careers Mumbai",
    ogImage: "/images/og-careers.jpg",
  },
  "/faq": {
    title: "FAQ | Common IT Services Questions | SMLAG TechSolutions",
    description:
      "Find answers to common questions about our IT services, pricing, project timeline, and support. Still have questions? Contact us.",
    keywords:
      "IT services FAQ, software development questions, tech company FAQ",
    ogImage: "/images/og-faq.jpg",
  },
  "/quote": {
    title: "AI Quote Generator | Get Instant IT Project Estimate | SMLAG",
    description:
      "Get an instant quote for your IT project with our AI-powered calculator. Estimate web development, mobile app, and software costs in 2 minutes.",
    keywords:
      "IT project quote, software cost calculator, web development estimate",
    ogImage: "/images/og-quote.jpg",
  },
  "/tools/speed-test": {
    title: "Free Website Speed Tester | Test Performance | SMLAG",
    description:
      "Test your website speed for free. Get detailed performance report with optimization suggestions. Improve loading time and SEO ranking.",
    keywords:
      "website speed test, page speed checker, website performance tool",
    ogImage: "/images/og-speed.jpg",
  },
  "/tools/seo-analyzer": {
    title: "Free SEO Analyzer | Check Website SEO Score | SMLAG",
    description:
      "Analyze your website SEO for free. Get detailed report on meta tags, keywords, page speed, and optimization suggestions.",
    keywords: "SEO analyzer, website SEO checker, free SEO tool India",
    ogImage: "/images/og-seo.jpg",
  },
  "/docs": {
    title: "Knowledge Base | Documentation & Guides | SMLAG TechSolutions",
    description:
      "Browse our knowledge base for API documentation, tutorials, and guides. Everything you need to work with SMLAG TechSolutions.",
    keywords: "knowledge base, API documentation, technical guides",
    ogImage: "/images/og-docs.jpg",
  },
};
