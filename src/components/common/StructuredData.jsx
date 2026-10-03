import React from "react";
import { Helmet } from "react-helmet-async";

const StructuredData = () => {
  const siteUrl = "https://smlagtech.com";

  // ===== Organization Schema =====
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SMLAG TechSolutions",
    alternateName: "SMLAG",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Leading IT company in India offering web development, mobile apps, cloud solutions, AI/ML, and cyber security services.",
    foundingDate: "2015",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Tech Park, Silicon Valley",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400001",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9876543210",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-9876543211",
        contactType: "sales",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    ],
    sameAs: [
      "https://facebook.com/smlagtech",
      "https://twitter.com/smlagtech",
      "https://linkedin.com/company/smlagtech",
      "https://youtube.com/@smlagtech",
      "https://instagram.com/smlagtech",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
    },
  };

  // ===== Website Schema =====
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SMLAG TechSolutions",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // ===== Local Business Schema =====
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "SMLAG TechSolutions",
    image: `${siteUrl}/images/office.jpg`,
    url: siteUrl,
    telephone: "+91-9876543210",
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Tech Park, Silicon Valley",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.07609,
      longitude: 72.877426,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 19.07609,
        longitude: 72.877426,
      },
      geoRadius: "50000",
    },
  };

  // ===== Service Schema =====
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "IT Services",
    provider: {
      "@type": "Organization",
      name: "SMLAG TechSolutions",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Web Development" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Mobile App Development" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Cloud Solutions" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Cyber Security" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "AI & Machine Learning" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Data Analytics" },
        },
      ],
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
