import SolutionDetailClient from "./SolutionDetailClient";
import { notFound } from "next/navigation";

// Define the valid slugs
const validSlugs = ["startups", "enterprises", "investors", "government", "india-entry"];

export function generateStaticParams() {
  return validSlugs.map((slug) => ({
    slug,
  }));
}

export function generateMetadata({ params }) {
  const { slug } = params;
  
  const titles = {
    "startups": "Solutions For Startups | Rise Mate Ventures",
    "enterprises": "Solutions For Enterprises | Rise Mate Ventures",
    "investors": "Solutions For Investors | Rise Mate Ventures",
    "government": "Solutions For Government | Rise Mate Ventures",
    "india-entry": "India Entry Solutions | Rise Mate Ventures",
  };

  return {
    title: titles[slug] || "Solutions | Rise Mate Ventures"
  };
}

export default function SolutionPage({ params }) {
  const { slug } = params;
  
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return <SolutionDetailClient slug={slug} />;
}
