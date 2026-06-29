import PortfolioClient from "./PortfolioClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "RiseMate Portfolio | High-Growth Startup Ecosystem Verticals",
  description: "Browse the high-velocity venture projects and startups supported by RiseMate Ventures, including BWorth circular retail systems, Vega Vrudhi managed sales onboarding, RYM deep-tech engineering, and Synchronous AI agent automation.",
  alternates: {
    canonical: "https://risemates.com/portfolio",
  },
  openGraph: {
    title: "Venture Portfolio | RiseMate Ventures",
    description: "Explore the core scaling entities operating across fashion, technology, IoT energy, and brand building.",
    url: "https://risemates.com/portfolio",
    siteName: "RiseMate Ventures",
    images: [
      {
        url: "https://risemates.com/image copy.png",
        width: 1200,
        height: 630,
        alt: "RiseMate Ventures Portfolio Overview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Verticals Portfolio | RiseMate Ventures",
    description: "Overview of RiseMate's active companies, metrics, and execution models.",
    images: ["https://risemates.com/image copy.png"],
  },
};

export default function PortfolioPage() {
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
        "name": "Portfolio",
        "item": "https://risemates.com/portfolio"
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
        <PortfolioClient />
      </main>
      <Footer />
    </>
  );
}
