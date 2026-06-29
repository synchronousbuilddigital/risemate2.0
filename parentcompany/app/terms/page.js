import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Terms of Service | RiseMate Ventures",
  description: "Read the terms and conditions governing startup engagement, capital advisory, and operational services under RiseMate Ventures.",
  alternates: {
    canonical: "https://risemates.com/terms",
  },
};

export default function TermsOfService() {
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
        "name": "Terms of Service",
        "item": "https://risemates.com/terms"
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
      <main className="pt-48 pb-24 container-wide">
        <h1 className="text-6xl font-black text-dark mb-12 tracking-tighter">Terms of Service</h1>
        <div className="prose prose-lg text-dark/60 font-secondary max-w-4xl space-y-8">
          <p>Effective Date: June 2026</p>
          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">1. Institutional Engagement</h2>
            <p>By accessing the RiseMates Ventures portal, you agree to engage with our sovereign entities in accordance with institutional best practices.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-dark mb-4">2. Intellectual Capital</h2>
            <p>All architectural designs, digital legacy content, and entity taglines are the intellectual capital of RiseMates Ventures.</p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
