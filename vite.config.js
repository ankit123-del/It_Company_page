import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import seoFiles from "vite-plugin-seo-files";

export default defineConfig({
  plugins: [
    react(),
    seoFiles({
      siteUrl: "https://smlagtech.com",
      generateSitemap: true,
      generateRobots: true,
      sitemapOptions: {
        routes: [
          "/",
          "/services",
          "/about",
          "/contact",
          "/pricing",
          "/portfolio",
          "/case-studies",
          "/blog",
          "/careers",
          "/faq",
          "/services/web-development",
          "/services/mobile-development",
          "/services/cloud-solutions",
          "/services/cyber-security",
          "/services/ai-ml",
          "/services/data-analytics",
          "/services/devops",
          "/services/ui-ux",
          "/quote",
          "/tools/speed-test",
          "/tools/seo-analyzer",
          "/docs",
        ],
        changefreq: "weekly",
        priority: 0.8,
      },
      robotsOptions: {
        rules: [
          {
            userAgent: "*",
            allow: "/",
            disallow: [
              "/admin",
              "/api",
              "/portal",
              "/employee",
              "/invoices",
              "/security",
              "/api-keys",
            ],
          },
        ],
        sitemap: "https://smlagtech.com/sitemap.xml",
      },
    }),
  ],
  build: {
    // ===== Performance Optimizations =====
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          helmet: ["react-helmet-async"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
    open: true,
  },
});
