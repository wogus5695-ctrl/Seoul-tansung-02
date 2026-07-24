import { parseAndValidateK, getActiveRegions, generateDynamicUrl } from '../src/data/regionResolver.js';
import { serviceKeywords } from '../src/data/serviceKeywords.js';
import { getSeoMetadata } from '../src/data/seoTemplates.js';
import { getFaqItems } from '../src/data/faqData.js';
import fs from 'fs';
import path from 'path';

function injectSeoHead(html, meta) {
  // Clean up existing dynamic/default og, twitter, description, title, and canonical tags to prevent duplicates
  html = html.replace(/<link rel="canonical".*?>\s*/gi, '');
  html = html.replace(/<meta property="og:.*?".*?>\s*/gi, '');
  html = html.replace(/<meta name="twitter:.*?".*?>\s*/gi, '');
  html = html.replace(/<meta name="description".*?>\s*/gi, '');
  html = html.replace(/<title>.*?<\/title>\s*/gi, '');

  const ogImage = meta.ogImage || 'https://www.neocoat.co.kr/images/seo/neocoat-search-thumbnail.jpg';
  const ogWidth = meta.ogImageWidth || 1200;
  const ogHeight = meta.ogImageHeight || 1200;
  const ogType = meta.ogImageType || 'image/jpeg';
  const ogAlt = meta.ogImageAlt || '탄성코트와 줄눈 전문 시공 네오코트';

  let headTags = `<title>${meta.title}</title>\n`;
  headTags += `<meta name="description" content="${meta.description}" />\n`;
  headTags += `<link rel="canonical" href="${meta.canonical}" />\n`;
  headTags += `<meta property="og:title" content="${meta.ogTitle || meta.title}" />\n`;
  headTags += `<meta property="og:description" content="${meta.ogDescription || meta.description}" />\n`;
  headTags += `<meta property="og:url" content="${meta.ogUrl || meta.canonical}" />\n`;
  headTags += `<meta property="og:image" content="${ogImage}" />\n`;
  headTags += `<meta property="og:image:secure_url" content="${ogImage}" />\n`;
  headTags += `<meta property="og:image:width" content="${ogWidth}" />\n`;
  headTags += `<meta property="og:image:height" content="${ogHeight}" />\n`;
  headTags += `<meta property="og:image:type" content="${ogType}" />\n`;
  headTags += `<meta property="og:image:alt" content="${ogAlt}" />\n`;
  headTags += `<meta name="twitter:card" content="summary_large_image" />\n`;
  headTags += `<meta name="twitter:image" content="${ogImage}" />\n`;
  headTags += `<meta name="twitter:image:alt" content="${ogAlt}" />\n`;

  if (meta.robots) {
    headTags += `<meta name="robots" content="${meta.robots}" />\n`;
  }
  if (meta.faqJsonLd) {
    headTags += `<script type="application/ld+json">\n${JSON.stringify(meta.faqJsonLd, null, 2)}\n</script>\n`;
  }

  return html.replace('</head>', `${headTags}</head>`);
}

// Vercel / Netlify Serverless Function handler for Neo Coat SEO injection & 301 redirects
export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const kParam = url.searchParams.get('k')?.trim() || '';
  const pathname = url.pathname;

  // 1. Check for empty k query (?k=) and redirect to main page (308 Permanent)
  const rawQuery = url.search;
  if (rawQuery.includes('k=') && !kParam) {
    res.setHeader('Location', 'https://www.neocoat.co.kr/');
    return res.status(308).send('Redirecting to main page...');
  }

  // Read template index.html
  let htmlPath = path.join(process.cwd(), 'dist', 'index.html');
  if (!fs.existsSync(htmlPath)) htmlPath = path.join(process.cwd(), 'index.html');
  let html = fs.readFileSync(htmlPath, 'utf-8');

  // 2. Check for invalid or unknown paths (404 Page)
  const validPaths = ['/', '/sitemap-seoul', '/privacy-policy', '/terms'];
  if (!validPaths.includes(pathname)) {
    const meta = getSeoMetadata({ isNotFound: true, path: pathname });
    html = injectSeoHead(html, meta);

    // H1 and navigation for not found page
    let botContent = `\n<div style="display:none;" id="seo-pre-rendered">\n`;
    botContent += `  <h1>${meta.h1}</h1>\n`;
    botContent += `  <p>${meta.description}</p>\n`;
    botContent += `  <a href="/">홈으로 이동</a>\n`;
    botContent += `  <a href="/sitemap-seoul">지역별 서비스 안내</a>\n`;
    botContent += `</div>\n`;
    html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${botContent}`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(404).send(html);
  }

  // 3. /sitemap-seoul (Directory Hub)
  if (pathname === '/sitemap-seoul') {
    const meta = getSeoMetadata({ path: '/sitemap-seoul' });
    html = injectSeoHead(html, meta);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  }

  // 4. /privacy-policy or /terms
  if (pathname === '/privacy-policy' || pathname === '/terms') {
    const meta = getSeoMetadata({ path: pathname });
    html = injectSeoHead(html, meta);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  }

  // 5. Dynamic landing pages with ?k=
  if (kParam) {
    const usePreview = url.searchParams.get('preview') === 'true';
    const parseResult = parseAndValidateK(kParam, usePreview);

    if (parseResult.isValid) {
      const meta = getSeoMetadata({ parsedKeyword: parseResult });
      html = injectSeoHead(html, meta);

      // Pre-rendered SEO content for search bots (H1, description, FAQ list, and internal linking links)
      let botContent = `\n<div style="display:none;" id="seo-pre-rendered">\n`;
      botContent += `  <h1>${meta.h1}</h1>\n`;
      botContent += `  <p>${meta.description}</p>\n`;

      // Pre-render FAQs
      const faqItems = getFaqItems(parseResult);
      if (faqItems && faqItems.length > 0) {
        botContent += `  <h2>자주 묻는 질문</h2>\n`;
        faqItems.forEach(item => {
          botContent += `  <div>\n    <h3>${item.question}</h3>\n    <p>${item.answer}</p>\n  </div>\n`;
        });
      }

      // Pre-render related linking links
      const relatedServices = parseResult.service.relatedServices || [];
      if (relatedServices.length > 0) {
        botContent += `  <h2>관련 서비스 정보</h2>\n  <ul>\n`;
        relatedServices.forEach(task => {
          const href = generateDynamicUrl(parseResult.region.urlRegion, task);
          botContent += `    <li><a href="${href}">${parseResult.region.name} ${task}</a></li>\n`;
        });
        botContent += `  </ul>\n`;
      }

      const activeRegions = getActiveRegions().filter(
        r => r.parentId === parseResult.region.parentId && r.id !== parseResult.region.id
      ).slice(0, 6);
      if (activeRegions.length > 0) {
        botContent += `  <h2>인근 시공 지역 바로가기</h2>\n  <ul>\n`;
        activeRegions.forEach(reg => {
          const href = generateDynamicUrl(reg.urlRegion, parseResult.service.keyword);
          botContent += `    <li><a href="${href}">${reg.name} ${parseResult.service.keyword}</a></li>\n`;
        });
        botContent += `  </ul>\n`;
      }

      botContent += `</div>\n`;
      html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${botContent}`);

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    } else {
      // Invalid kParam -> Soft 404 / Invalid k handling
      const meta = getSeoMetadata({ isNotFound: true, path: '/' });
      html = injectSeoHead(html, meta);

      // Pre-render not found screen content for search crawlers
      let botContent = `\n<div style="display:none;" id="seo-pre-rendered">\n`;
      botContent += `  <h1>${meta.h1}</h1>\n`;
      botContent += `  <p>${meta.description}</p>\n`;
      botContent += `  <a href="/">홈으로 이동</a>\n`;
      botContent += `  <a href="/sitemap-seoul">지역별 서비스 안내</a>\n`;
      botContent += `</div>\n`;
      html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${botContent}`);

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(404).send(html);
    }
  }

  // 6. Root Main Page /
  const meta = getSeoMetadata({ path: '/' });
  html = injectSeoHead(html, meta);

  // Pre-rendered content for bots on main page
  let botContent = `\n<div style="display:none;" id="seo-pre-rendered">\n`;
  botContent += `  <h1>${meta.h1}</h1>\n`;
  botContent += `  <p>${meta.description}</p>\n`;

  const mainFaqs = getFaqItems(null);
  if (mainFaqs && mainFaqs.length > 0) {
    botContent += `  <h2>자주 묻는 질문</h2>\n`;
    mainFaqs.forEach(item => {
      botContent += `  <div>\n    <h3>${item.question}</h3>\n    <p>${item.answer}</p>\n  </div>\n`;
    });
  }
  botContent += `</div>\n`;
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${botContent}`);

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.status(200).send(html);
}
