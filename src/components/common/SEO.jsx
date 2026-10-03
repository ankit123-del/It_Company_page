import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title,
  description,
  keywords,
  image = "/images/og-default.jpg",
  url = "",
  type = "website",
  author = "SMLAG TechSolutions",
  publishedTime,
  modifiedTime,
  article = false,
  noindex = false,
}) => {
  const siteName = "SMLAG TechSolutions";
  const siteUrl = "https://smlagtech.com"; // Change to your domain
  const fullUrl = `${siteUrl}${url}`;
  const fullImage = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const fullTitle = title ? `${title}` : `${siteName} | #1 IT Company in India`;

  return (
    <Helmet>
      {/* ===== Basic Meta ===== */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* ===== Robots ===== */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

      {/* ===== Open Graph (Facebook, LinkedIn) ===== */}
      <meta property="og:type" content={article ? "article" : type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />

      {/* ===== Article Meta ===== */}
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}

      {/* ===== Twitter Card ===== */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@smlagtech" />
      <meta name="twitter:creator" content="@smlagtech" />

      {/* ===== Additional SEO ===== */}
      <meta name="theme-color" content="#4f46e5" />
      <meta name="format-detection" content="telephone=+919876543210" />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Mumbai" />
      <meta name="geo.position" content="19.076090;72.877426" />
      <meta name="ICBM" content="19.076090, 72.877426" />

      {/* ===== Language ===== */}
      <meta httpEquiv="content-language" content="en-IN" />
      <link rel="alternate" hrefLang="en-in" href={fullUrl} />
      <link rel="alternate" hrefLang="x-default" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;
