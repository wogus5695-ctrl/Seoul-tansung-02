import { parseAndValidateK, getActiveRegions, generateDynamicUrl } from '../src/data/regionResolver.js';
import { serviceKeywords } from '../src/data/serviceKeywords.js';
import { getSeoMetadata } from '../src/data/seoTemplates.js';
import fs from 'fs';
import path from 'path';

// Vercel / Netlify Serverless Function handler for Neo Coat SEO injection & 301 redirects
export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const kParam = url.searchParams.get('k')?.trim() || '';
  const pathname = url.pathname;

  // 1. Check for invalid or unknown paths (404 Page)
  const validPaths = ['/', '/sitemap-seoul', '/privacy-policy', '/terms'];
  if (!validPaths.includes(pathname)) {
    let htmlPath = path.join(process.cwd(), 'dist', 'index.html');
    if (!fs.existsSync(htmlPath)) htmlPath = path.join(process.cwd(), 'index.html');
    let html = fs.readFileSync(htmlPath, 'utf-8');

    const meta = getSeoMetadata({ isNotFound: true, path: pathname });
    html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
    html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${meta.description}" />`);
    html = html.replace('</head>', `<meta name="robots" content="noindex,nofollow" />\n<link rel="canonical" href="${meta.canonical}" />\n</head>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(404).send(html);
  }

  // Read template index.html
  let htmlPath = path.join(process.cwd(), 'dist', 'index.html');
  if (!fs.existsSync(htmlPath)) htmlPath = path.join(process.cwd(), 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf-8');

  // 2. /sitemap-seoul (Directory Hub)
  if (pathname === '/sitemap-seoul') {
    const meta = getSeoMetadata({ path: '/sitemap-seoul' });
    html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
    html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${meta.description}" />`);
    html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${meta.ogTitle}" />`);
    html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${meta.ogDescription}" />`);
    html = html.replace('</head>', `<link rel="canonical" href="${meta.canonical}" />\n<meta property="og:url" content="${meta.ogUrl}" />\n<meta property="og:image" content="${meta.ogImage}" />\n</head>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  }

  // 3. /privacy-policy or /terms
  if (pathname === '/privacy-policy' || pathname === '/terms') {
    const meta = getSeoMetadata({ path: pathname });
    html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
    html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${meta.description}" />`);
    html = html.replace('</head>', `<link rel="canonical" href="${meta.canonical}" />\n<meta property="og:url" content="${meta.ogUrl}" />\n</head>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  }

  // 4. Dynamic landing pages with ?k=
  if (kParam) {
    const usePreview = url.searchParams.get('preview') === 'true';
    const parseResult = parseAndValidateK(kParam, usePreview);

    if (parseResult.isValid) {
      const meta = getSeoMetadata({ parsedKeyword: parseResult });

      html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
      html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${meta.description}" />`);
      html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${meta.ogTitle}" />`);
      html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${meta.ogDescription}" />`);

      let headTags = `<link rel="canonical" href="${meta.canonical}" />\n<meta property="og:url" content="${meta.ogUrl}" />\n<meta property="og:image" content="${meta.ogImage}" />\n`;
      if (meta.faqJsonLd) {
        headTags += `<script type="application/ld+json">\n${JSON.stringify(meta.faqJsonLd, null, 2)}\n</script>\n`;
      }
      html = html.replace('</head>', `${headTags}</head>`);

      // Pre-rendered H1 for bots
      let botContent = `<div style="display:none;" id="seo-pre-rendered">`;
      botContent += `<h1>${meta.h1}</h1>`;
      botContent += `<p>${meta.description}</p>`;
      botContent += `</div>`;
      html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${botContent}`);

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    } else {
      // Invalid kParam -> Soft 404 / Invalid k handling
      const meta = getSeoMetadata({ isNotFound: true, path: '/' });
      html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
      html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${meta.description}" />`);
      html = html.replace('</head>', `<meta name="robots" content="noindex,nofollow" />\n<link rel="canonical" href="${meta.canonical}" />\n</head>`);

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(404).send(html);
    }
  }

  // 5. Root Main Page /
  const meta = getSeoMetadata({ path: '/' });
  html = html.replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`);
  html = html.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${meta.description}" />`);
  html = html.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${meta.ogTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${meta.ogDescription}" />`);

  let headTags = `<link rel="canonical" href="${meta.canonical}" />\n<meta property="og:url" content="${meta.ogUrl}" />\n<meta property="og:image" content="${meta.ogImage}" />\n`;
  if (meta.faqJsonLd) {
    headTags += `<script type="application/ld+json">\n${JSON.stringify(meta.faqJsonLd, null, 2)}\n</script>\n`;
  }
  html = html.replace('</head>', `${headTags}</head>`);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(html);
}
