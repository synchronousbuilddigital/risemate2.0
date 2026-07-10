import LeadershipClient from "../leadership/LeadershipClient";

export const metadata = {
  title: "Our Team | RiseMates Ventures - Founders & Partners",
  description: "Meet the executive team and founders behind the RiseMates acceleration ecosystem. Saurabh Jain, Dheeraj Anand, Yograj Rundhanker, and Devam Srivastava.",
  alternates: {
    canonical: "https://RiseMates.com/team",
  },
  openGraph: {
    title: "Our Team | RiseMates Ventures",
    description: "The executive team and founders behind the RiseMates acceleration ecosystem.",
    url: "https://RiseMates.com/team",
    siteName: "RiseMates Ventures",
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
        "item": "https://RiseMates.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Team",
        "item": "https://RiseMates.com/team"
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
