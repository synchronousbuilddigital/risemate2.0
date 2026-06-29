import BlogClient from "./BlogClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getAllBlogs } from "../../lib/blogs";

export const metadata = {
  title: "RiseMate Blog | Startup Acceleration, Funding & Growth Insights",
  description: "Stay ahead with professional guides on startup venture capital rounds, sustainable commerce, managed sales force systems, and tech advisory written by our managing partners.",
  alternates: {
    canonical: "https://risemates.com/blog",
  },
  openGraph: {
    title: "RiseMate Ventures Blog | Growth Strategies & Industry Insights",
    description: "Expert startup growth advisory on raising capital, building networks, and executing sales frameworks.",
    url: "https://risemates.com/blog",
    siteName: "RiseMate Ventures",
    images: [
      {
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "RiseMate Blog Hub",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RiseMate Blog | Startup & Investment Tips",
    description: "Insights and strategies on startup capital, sales growth, and sustainability.",
    images: ["https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop"],
  },
};

export default function BlogPage() {
  const blogs = getAllBlogs();

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
        "name": "Blog",
        "item": "https://risemates.com/blog"
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
        <BlogClient initialBlogs={blogs} />
      </main>
      <Footer />
    </>
  );
}
