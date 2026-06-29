import AboutClient from "./AboutClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "About RiseMate Ventures | Sovereign Accelerator & Consulting",
  description: "Learn how RiseMate Ventures accelerates economic development by connecting global institutional expertise with high-growth startup entities across sustainable fashion, technology, energy, and brand scaling hubs.",
  alternates: {
    canonical: "https://risemates.com/about",
  },
  openGraph: {
    title: "About RiseMate Ventures | Our Mission & Core Verticals",
    description: "Operating NCR and Jaipur hubs, we bridge the gap between startup execution and institutional-grade investments.",
    url: "https://risemates.com/about",
    siteName: "RiseMate Ventures",
    images: [
      {
        url: "https://risemates.com/corporate-interior.png",
        width: 1200,
        height: 630,
        alt: "RiseMate Ventures HQ interior",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About RiseMate Ventures | Sovereign Startup Support",
    description: "Bridging the gap between global institutional expertise and high-growth retail, AI, and energy startups.",
    images: ["https://risemates.com/corporate-interior.png"],
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
        "item": "https://risemates.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "About Us",
        "item": "https://risemates.com/about"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <main>
        <AboutClient />
      </main>
      <Footer />
    </>
  );
}
