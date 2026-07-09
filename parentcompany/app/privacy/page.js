import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Privacy Policy | RiseMate Ventures",
  description: "Learn how RiseMate Ventures collects, protects, and governs corporate data in our startup incubation and acceleration programs.",
  alternates: {
    canonical: "https://risemates.com/privacy",
  },
};

export default function PrivacyPolicy() {
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
        "name": "Privacy Policy",
        "item": "https://risemates.com/privacy"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="pt-48 pb-24 container-wide">
        <h1 className="text-6xl font-black text-dark mb-12 tracking-tighter">Privacy Policy</h1>
        <div className="prose prose-lg text-dark/60 font-secondary max-w-4xl space-y-8">
          <p>Last updated: June 2026</p>
          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">1. Data Collection</h2>
            <p>RiseMates Ventures operates a Sovereign Digital Legacy Registry. We collect institutional identifiers necessary for strategic induction and capital synchronization.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">2. Industrial Security</h2>
            <p>All data is secured via 256-bit industrial encryption protocols as specified in the Content Manifesto 2026.</p>
          </section>
        </div>
      </main>
    </>
  );
}
