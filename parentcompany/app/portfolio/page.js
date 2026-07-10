import PortfolioClient from "./PortfolioClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "RiseMates Portfolio | High-Growth Startup Ecosystem Verticals",
  description: "Browse the high-velocity venture projects and startups supported by RiseMates Ventures, including BWorth circular retail systems, Vega Vrudhi managed sales onboarding, RYM deep-tech engineering, and Synchronous AI agent automation.",
  alternates: {
    canonical: "https://RiseMates.com/portfolio",
  },
  openGraph: {
    title: "Venture Portfolio | RiseMates Ventures",
    description: "Explore the core scaling entities operating across fashion, technology, IoT energy, and brand building.",
    url: "https://RiseMates.com/portfolio",
    siteName: "RiseMates Ventures",
    images: [
      {
        url: "https://RiseMates.com/image copy.png",
        width: 1200,
        height: 630,
        alt: "RiseMates Ventures Portfolio Overview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Verticals Portfolio | RiseMates Ventures",
    description: "Overview of RiseMates's active companies, metrics, and execution models.",
    images: ["https://RiseMates.com/image copy.png"],
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
        "item": "https://RiseMates.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Portfolio",
        "item": "https://RiseMates.com/portfolio"
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
        <PortfolioClient />
      </main>
    </>
  );
}
