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
    "startups": "Solutions For Startups | RiseMates Ventures",
    "enterprises": "Solutions For Enterprises | RiseMates Ventures",
    "investors": "Solutions For Investors | RiseMates Ventures",
    "government": "Solutions For Government | RiseMates Ventures",
    "india-entry": "India Entry Solutions | RiseMates Ventures",
  };

  return {
    title: titles[slug] || "Solutions | RiseMates Ventures"
  };
}

export default function SolutionPage({ params }) {
  const { slug } = params;

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return <SolutionDetailClient slug={slug} />;
}
