export default function sitemap() {
  const baseUrl = "https://RiseMates.com"; // Change to active production domain if different
  const routes = [
    "",
    "/about",
    "/portfolio",
    "/leadership",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/contact" ? 0.9 : 0.8,
  }));
}
