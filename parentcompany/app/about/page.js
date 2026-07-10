import AboutClient from "./AboutClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "About RiseMates Ventures | Sovereign Accelerator & Consulting",
  description: "Learn how RiseMates Ventures accelerates economic development by connecting global institutional expertise with high-growth startup entities across sustainable fashion, technology, energy, and brand scaling hubs.",
  alternates: {
    canonical: "https://RiseMates.com/about",
  },
  openGraph: {
    title: "About RiseMates Ventures | Our Mission & Core Verticals",
    description: "Operating NCR and Jaipur hubs, we bridge the gap between startup execution and institutional-grade investments.",
    url: "https://RiseMates.com/about",
    siteName: "RiseMates Ventures",
    images: [
      {
        url: "https://RiseMates.com/corporate-interior.png",
        width: 1200,
        height: 630,
        alt: "RiseMates Ventures HQ interior",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About RiseMates Ventures | Sovereign Startup Support",
    description: "Bridging the gap between global institutional expertise and high-growth retail, AI, and energy startups.",
    images: ["https://RiseMates.com/corporate-interior.png"],
  },
};

export default function AboutPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://RiseMates.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://RiseMates.com/about"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        <AboutClient />
      </main>
    </>
  );
}
