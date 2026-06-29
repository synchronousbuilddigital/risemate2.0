import AchievementsClient from "./AchievementsClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Startup Acceleration Milestones & Impact | RiseMate",
  description: "Explore RiseMate's credibility metrics: ₹150 Cr+ facilitated startup funding, 100+ supported startups, ISO 9001:2015 certified operations, and global incubator associations.",
  alternates: {
    canonical: "https://rissemate.com/achievements"
  }
};

export default function AchievementsPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://rissemate.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Ecosystem Impact",
        "item": "https://rissemate.com/achievements"
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
        <AchievementsClient />
      </main>
      <Footer />
    </>
  );
}
