import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const siteUrl = "https://theunicorntechs.com";

const routes = [
  {
    path: "/advisory/",
    title: "Advisory | UNI",
    description:
      "Executive fiduciary advisory from UNI that pressure-tests AI strategy, technical delivery, and economics with vendor-neutral guidance.",
  },
  {
    path: "/ai-strategy/",
    title: "AI Strategy | UNI",
    description:
      "UNI turns AI strategy into working enterprise systems through disciplined implementation, optimization, cloud architecture, and data hygiene.",
  },
  {
    path: "/outpost/",
    title: "The Outpost | UNI",
    description:
      "The Outpost is UNI's modular edge data center initiative in Lee County for practical AI compute infrastructure and rural opportunity.",
  },
  {
    path: "/blog/",
    title: "Blog | UNI",
    description:
      "A UNI community letter about responsible AI, rural opportunity, and growing local technical talent in Lee County.",
  },
  {
    path: "/contact/",
    title: "Contact | UNI",
    description:
      "Start a conversation with UNI about practical AI, margin bleed, enterprise implementation, or The Outpost.",
  },
];

function escapeAttribute(value) {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function routeHtml(template, route) {
  const canonicalUrl = `${siteUrl}${route.path}`;
  const title = escapeAttribute(route.title);
  const description = escapeAttribute(route.description);

  return template
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`,
    )
    .replace(
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${description}" />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${canonicalUrl}" />`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${title}" />`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${description}" />`,
    );
}

const distDir = path.resolve("dist");
const template = await readFile(path.join(distDir, "index.html"), "utf8");

await Promise.all(
  routes.map(async (route) => {
    const routeDir = path.join(distDir, route.path);
    await mkdir(routeDir, { recursive: true });
    await writeFile(path.join(routeDir, "index.html"), routeHtml(template, route));
  }),
);
