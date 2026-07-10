import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getBlogBySlug, getRelatedBlogs } from "../../../lib/blogs";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | RiseMates Ventures",
    };
  }

  return {
    title: `${blog.title} | RiseMates Insights`,
    description: blog.description,
    alternates: {
      canonical: `https://RiseMates.com/blog/${slug}`,
    },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://RiseMates.com/blog/${slug}`,
      siteName: "RiseMates Ventures",
      images: [
        {
          url: blog.image,
          width: 800,
          height: 500,
          alt: blog.title,
        },
      ],
      locale: "en_IN",
      type: "article",
      publishedTime: new Date(blog.date).toISOString(),
      authors: [blog.author],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [blog.image],
    },
  };
}

function formatContent(content) {
  if (!content) return '';
  if (/<[a-z][\s\S]*>/i.test(content)) {
    return content;
  }
  return content
    .split(/\n\s*\n/)
    .map(para => `<p>${para.replace(/\n/g, '<br />')}</p>`)
    .join('\n');
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = await getRelatedBlogs(slug);
  const formattedContent = formatContent(blog.content);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": blog.title,
    "description": blog.description,
    "image": blog.image,
    "datePublished": new Date(blog.date).toISOString().split("T")[0],
    "author": {
      "@type": "Person",
      "name": blog.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "RiseMates Ventures",
      "logo": {
        "@type": "ImageObject",
        "url": "https://RiseMates.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://RiseMates.com/blog/${slug}`
    }
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
        "name": "Blog",
        "item": "https://RiseMates.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": `https://RiseMates.com/blog/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="min-h-screen bg-[#FAF9F6] pt-28 pb-20 md:pt-36 md:pb-32">
        <div className="container-wide max-w-4xl">

          {/* Back to Blog */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#002366] hover:text-dark mb-10 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Articles
          </Link>

          {/* Category, Read Time, and Meta details */}
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-white border border-dark/10 text-[10px] font-black uppercase tracking-wider text-[#002366] rounded-md">
              {blog.category}
            </span>
            <span className="text-xs text-dark/45 font-bold uppercase tracking-wider">
              {blog.readTime}
            </span>
            <span className="text-dark/20">•</span>
            <span className="text-xs text-dark/45 font-bold uppercase tracking-wider">
              {blog.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-dark tracking-tighter leading-tight mb-8">
            {blog.title}
          </h1>

          {/* Author info & Share buttons row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-y border-dark/5 py-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#002366] text-white flex items-center justify-center font-black text-lg uppercase shadow-inner">
                {blog.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-black text-dark leading-none">{blog.author}</p>
                <p className="text-[10px] font-bold text-dark/40 uppercase tracking-widest mt-1.5">Managing Partner</p>
              </div>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-dark/40 mr-2">Share Article:</span>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title)} - https://RiseMates.com/blog/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-dark/10 flex items-center justify-center text-dark/50 hover:text-emerald-600 hover:border-emerald-500/20 transition-all shadow-sm"
                title="Share on WhatsApp"
              >
                <span className="material-symbols-outlined text-lg">chat</span>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=https://RiseMates.com/blog/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-dark/10 flex items-center justify-center text-dark/50 hover:text-[#002366] hover:border-[#002366]/20 transition-all shadow-sm"
                title="Share on LinkedIn"
              >
                <span className="material-symbols-outlined text-lg">share</span>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=https://RiseMates.com/blog/${slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-dark/10 flex items-center justify-center text-dark/50 hover:text-dark hover:border-dark/20 transition-all shadow-sm"
                title="Share on X"
              >
                <span className="material-symbols-outlined text-lg">public</span>
              </a>
            </div>
          </div>

          {/* Large Hero Image */}
          <div className="relative aspect-[16/9] w-full rounded-[32px] overflow-hidden mb-12 border border-dark/5 shadow-md">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Main article body */}
          <div
            className="prose prose-lg max-w-none font-secondary text-dark/80 leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />

          {/* Related Articles section */}
          {relatedBlogs.length > 0 && (
            <div className="border-t border-dark/10 pt-16 mt-20">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-[#002366] mb-8">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {relatedBlogs.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group bg-white p-6 rounded-3xl border border-dark/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[8px] font-black uppercase tracking-wider text-[#002366] bg-[#FAF9F6] px-2 py-0.5 rounded border border-dark/5">{related.category}</span>
                        <span className="text-[9px] text-dark/40 font-bold uppercase tracking-wider">{related.readTime}</span>
                      </div>
                      <h4 className="text-lg font-black text-dark tracking-tight leading-snug group-hover:text-[#002366] transition-colors line-clamp-2">
                        {related.title}
                      </h4>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-[#002366] mt-6">
                      Read Article
                      <span className="material-symbols-outlined text-xs group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action box */}
          <div className="bg-[#001233] text-white p-8 md:p-12 rounded-[40px] shadow-xl mt-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-2xl rounded-full" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gold mb-3 block">Consultation Protocol</span>
            <h3 className="text-2xl font-black tracking-tight leading-tight mb-4">Want to Scrutinize Your Scaling Model?</h3>
            <p className="text-white/60 text-sm max-w-md mx-auto mb-8 font-secondary leading-relaxed">
              Book a complimentary 30-minute evaluation with our partners to audit metrics and discuss investor pathways.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="bg-white text-dark px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-gold hover:text-white transition-all shadow-md"
              >
                Book a Free Consultation
              </Link>
              <Link
                href="/contact?type=advisor"
                className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-dark transition-all"
              >
                Talk to Our Experts
              </Link>
            </div>
          </div>

        </div>
      </article>
    </>
  );
}
