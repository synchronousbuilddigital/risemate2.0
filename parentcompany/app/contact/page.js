import ContactClient from "./ContactClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Contact RiseMates Ventures | Book Consultation & Apply for Funding",
  description: "Connect with the managing partners of RiseMates Ventures. Submit your strategic startup mandate to request capital advisory, Circular Fashion integration (BWorth), Managed Field force scaling (Vega Vrudhi), or brand AI system setup (Synchronous).",
  alternates: {
    canonical: "https://RiseMates.com/contact",
  },
  openGraph: {
    title: "Contact RiseMates Ventures | Schedule Startup Valuation",
    description: "Submit your deck and schedule a free growth consultation. We evaluate all acceleration mandates within 24 hours.",
    url: "https://RiseMates.com/contact",
    siteName: "RiseMates Ventures",
    images: [
      {
        url: "https://RiseMates.com/beautiful-city-landscape-with-tall-buildings.jpg",
        width: 1200,
        height: 630,
        alt: "Connect with RiseMates Ventures",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Initialize Connection | RiseMates Ventures",
    description: "Contact our team to explore startup acceleration, managed sales operations, or funding options.",
    images: ["https://RiseMates.com/beautiful-city-landscape-with-tall-buildings.jpg"],
  },
};

export default function ContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "RiseMates Ventures",
    "image": "https://RiseMates.com/beautiful-city-landscape-with-tall-buildings.jpg",
    "telephone": "+91-91166-16636",
    "email": "saurabh@vegavruddhi.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "7th Floor, Spaze Plazo, Golf Course Ext. Road Sector – 69",
      "addressLocality": "Gurugram",
      "addressRegion": "Haryana",
      "postalCode": "122018",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/risematesventures/posts/?feedView=all",
      "https://www.instagram.com/RiseMates"
    ]
  };

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
        "name": "Contact Us",
        "item": "https://RiseMates.com/contact"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main>
        <ContactClient />
      </main>
    </>
  );
}
