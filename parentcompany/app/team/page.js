import LeadershipClient from "../leadership/LeadershipClient";

export const metadata = {
  title: "Our Team | RiseMate Ventures - Founders & Partners",
  description: "Meet the executive team and founders behind the RiseMate acceleration ecosystem. Saurabh Jain, Dheeraj Anand, Yograj Rundhanker, and Devam Srivastava.",
  alternates: {
    canonical: "https://risemates.com/team",
  },
  openGraph: {
    title: "Our Team | RiseMate Ventures",
    description: "The executive team and founders behind the RiseMate acceleration ecosystem.",
    url: "https://risemates.com/team",
    siteName: "RiseMate Ventures",
    locale: "en_IN",
    type: "website",
  }
};

export default function TeamPage() {
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
        "name": "Team",
        "item": "https://risemates.com/team"
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
