import LeadershipClient from "./LeadershipClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Executive Leadership | RiseMates Ventures - Our Founders & Partners",
  description: "Meet the executive governance behind RiseMates Ventures. Our leaders Saurabh Jain, Dheeraj Anand, Yograj Rundhanker, and Devam Srivastava scale on-ground operations, circular fashion supply chains, deep-tech architectures, and autonomous AI systems.",
  alternates: {
    canonical: "https://RiseMates.com/leadership",
  },
  openGraph: {
    title: "Executive Leadership | RiseMates Ventures",
    description: "The executive team and founders behind the RiseMates acceleration ecosystem.",
    url: "https://RiseMates.com/leadership",
    siteName: "RiseMates Ventures",
    images: [
      {
        url: "https://RiseMates.com/saurab jain sir .jpeg",
        width: 1200,
        height: 630,
        alt: "RiseMates Ventures Leadership Team",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Executive Leadership | RiseMates Ventures",
    description: "Meet the founders and managing partners of RiseMates's direct operational verticals.",
    images: ["https://RiseMates.com/saurab jain sir .jpeg"],
  },
};

export default function LeadershipPage() {
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
        "name": "Leadership",
        "item": "https://RiseMates.com/leadership"
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
        <LeadershipClient />
      </main>
    </>
  );
}
