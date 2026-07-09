import HomeClient from "./HomeClient";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Rise Mate Ventures | Connecting Global Opportunities with Scalable Execution",
  description: "Rise Mate Ventures is a Global Business Growth & Venture Ecosystem that helps startups, enterprises, banks, fintech companies, and investors unlock new growth opportunities across international markets.",
  alternates: {
    canonical: "https://RiseMatess.com",
  },
  openGraph: {
    title: "Rise Mate Ventures | Global Business Growth & Venture Ecosystem",
    description: "By integrating strategy, funding access, AI-powered technology, business partnerships, market expansion, and execution capabilities, we help organizations scale faster with lower execution risk.",
    url: "https://RiseMatess.com",
    siteName: "Rise Mate Ventures",
    images: [
      {
        url: "https://RiseMatess.com/beautiful-city-landscape-with-tall-buildings.jpg",
        width: 1200,
        height: 630,
        alt: "Rise Mate Ventures - Global Business Growth & Venture Ecosystem",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rise Mate Ventures | Connecting Global Opportunities with Scalable Execution",
    description: "Unlock new growth opportunities across international markets by integrating strategy, funding access, AI-powered technology, and ground execution.",
    images: ["https://RiseMatess.com/beautiful-city-landscape-with-tall-buildings.jpg"],
  },
};

export default function Home() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Who can apply for RiseMates funding or support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Startups from Seed to Growth stages seeking strategic capital, execution capability, sustainable commerce architecture, or tech engineering can apply. We look for passionate founders focusing on circular economy, FinTech, clean tech, or automation."
        }
      },
      {
        "@type": "Question",
        "name": "How does the funding facilitation process work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We evaluate your startup’s execution roadmap, financials, and core technology. If aligned, we facilitate direct capital investments from our fund and match you with our partner network of institutional and angel investors, while providing actual operational support."
        }
      },
      {
        "@type": "Question",
        "name": "Which industries do you support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our core competence spans Sustainable Retail & Circular Economy, Managed Sales & Field Force Execution, Clean Energy & IoT Engineering, and Brand Systems & Autonomous AI. However, any high-growth startup can benefit from our advisory."
        }
      },
      {
        "@type": "Question",
        "name": "Is mentorship included in your programs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, mentorship is a key pillar of the RiseMates ecosystem. Selected founders work directly with Saurabh Jain, Dheeraj Anand, Yograj Rundhanker, and Devam Srivastava to scale sales operations, brand identity, and tech development."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the entire process take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An initial review of your pitch deck or consultation mandate takes 48 hours. If selected for advisory or investment review, the complete program scoping, verification, and funding facilitation takes 4 to 6 weeks."
        }
      },
      {
        "@type": "Question",
        "name": "What documents are required to apply for capital?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Initially, only a comprehensive Pitch Deck and a brief overview of your business model. As we progress, we require standard corporate governance documents, product architecture plans, and financial reports."
        }
      },
      {
        "@type": "Question",
        "name": "How much funding can a startup receive?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Through our direct channels and partner network, we facilitate funding ranging from ₹1 Cr (Seed/Pre-Series A) up to ₹50 Cr+ (Growth rounds), tailored specifically to capital efficiency and scale needs."
        }
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RiseMates Ventures",
    "alternateName": "RiseMatess",
    "url": "https://RiseMatess.com",
    "logo": "https://RiseMatess.com/logo.png",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-91166-16636",
        "contactType": "sales",
        "email": "saurabh@vegavruddhi.com",
        "areaServed": "IN"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-88266-68050",
        "contactType": "customer support",
        "email": "info@bworth.co.in",
        "areaServed": "IN"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/risematesventures/posts/?feedView=all",
      "https://www.instagram.com/RiseMatess"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HomeClient />
    </>
  );
}
