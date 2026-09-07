/**
 * 네오코트 Initial Semantic Body HTML Renderer (semanticBodyRenderer.js)
 * - Shared Page Model(pageModelEngine.js)의 Pure Data를 시맨틱 HTML 문자열로 변환
 * - 검색봇 및 JS 비활성화 사용자를 위한 100% 가독성 보장 (display:none / hidden 0건)
 * - React CSR 마운트 전 First-Byte HTML <body> 영역에 주입
 */

export function generateSemanticBodyHtml(pageModel) {
  if (!pageModel || !pageModel.hero) return '';

  const { hero, diagnosis, services, spaces, standard, faq, internalLinks } = pageModel;

  let html = `<main id="neocoat-semantic-root" style="max-width:1280px;margin:0 auto;padding:40px 20px;font-family:sans-serif;line-height:1.6;color:#0F172A;">\n`;

  // 1. Hero Section
  html += `  <section id="semantic-hero" style="margin-bottom:48px;">\n`;
  html += `    <span style="display:inline-block;background-color:#ECFDF5;color:#0D9488;font-size:13px;font-weight:700;padding:4px 10px;border-radius:6px;margin-bottom:12px;">${hero.heroBadgeLabel}</span>\n`;
  html += `    <h1 style="font-size:2rem;color:#1E3A8A;margin-bottom:16px;word-break:keep-all;">${hero.heroH1Text}</h1>\n`;
  html += `    <p style="font-size:1.05rem;color:#475569;max-width:640px;margin:0;">${hero.heroDescription}</p>\n`;
  html += `  </section>\n\n`;

  // 2. Diagnosis Section
  if (diagnosis && diagnosis.items && diagnosis.items.length > 0) {
    html += `  <section id="semantic-diagnosis" style="margin-bottom:48px;padding-top:32px;border-top:1px solid #E2E8F0;">\n`;
    html += `    <h2 style="font-size:1.5rem;color:#1E3A8A;margin-bottom:12px;">${diagnosis.title}</h2>\n`;
    html += `    <p style="color:#475569;margin-bottom:20px;">${diagnosis.intro}</p>\n`;
    html += `    <ul style="padding-left:20px;margin:0;">\n`;
    diagnosis.items.forEach(item => {
      html += `      <li style="margin-bottom:10px;"><strong style="color:#0F172A;">${item.title}</strong>: ${item.content}</li>\n`;
    });
    html += `    </ul>\n`;
    html += `  </section>\n\n`;
  }

  // 3. Services Section
  if (services && services.primary) {
    html += `  <section id="semantic-services" style="margin-bottom:48px;padding-top:32px;border-top:1px solid #E2E8F0;">\n`;
    html += `    <h2 style="font-size:1.5rem;color:#1E3A8A;margin-bottom:16px;">공간에 맞춘 시공 범위와 관리 방법</h2>\n`;
    html += `    <div style="margin-bottom:20px;background-color:#F8FAFC;padding:20px;border-radius:12px;border:1px solid #E2E8F0;">\n`;
    html += `      <h3 style="font-size:1.2rem;color:#1E3A8A;margin:0 0 8px 0;">${services.primary.title}</h3>\n`;
    html += `      <p style="color:#475569;margin:0;">${services.primary.description}</p>\n`;
    html += `    </div>\n`;
    if (services.secondary && services.secondary.length > 0) {
      services.secondary.forEach(s => {
        html += `    <div style="margin-bottom:16px;background-color:#FFFFFF;padding:16px;border-radius:10px;border:1px solid #E2E8F0;">\n`;
        html += `      <h3 style="font-size:1.1rem;color:#1E3A8A;margin:0 0 6px 0;">${s.title}</h3>\n`;
        html += `      <p style="color:#475569;margin:0;">${s.description}</p>\n`;
        html += `    </div>\n`;
      });
    }
    html += `  </section>\n\n`;
  }

  // 4. Spaces Section
  if (spaces && spaces.length > 0) {
    html += `  <section id="semantic-spaces" style="margin-bottom:48px;padding-top:32px;border-top:1px solid #E2E8F0;">\n`;
    html += `    <h2 style="font-size:1.5rem;color:#1E3A8A;margin-bottom:16px;">시공이 필요한 주요 공간</h2>\n`;
    html += `    <ul style="padding-left:20px;margin:0;">\n`;
    spaces.forEach(sp => {
      html += `      <li style="margin-bottom:10px;"><strong style="color:#0F172A;">${sp.name}</strong>: ${sp.desc}</li>\n`;
    });
    html += `    </ul>\n`;
    html += `  </section>\n\n`;
  }

  // 5. Standard Section
  if (standard && standard.principles && standard.principles.length > 0) {
    html += `  <section id="semantic-standard" style="margin-bottom:48px;padding-top:32px;border-top:1px solid #E2E8F0;">\n`;
    html += `    <h2 style="font-size:1.5rem;color:#1E3A8A;margin-bottom:12px;">${standard.title}</h2>\n`;
    html += `    <p style="color:#475569;margin-bottom:20px;">${standard.description}</p>\n`;
    html += `    <ol style="padding-left:20px;margin:0;">\n`;
    standard.principles.forEach(p => {
      html += `      <li style="margin-bottom:12px;"><strong style="color:#0F172A;">${p.num}. ${p.title}</strong> — ${p.desc}</li>\n`;
    });
    html += `    </ol>\n`;
    html += `  </section>\n\n`;
  }

  // 6. FAQ Section
  if (faq && faq.items && faq.items.length > 0) {
    html += `  <section id="semantic-faq" style="margin-bottom:48px;padding-top:32px;border-top:1px solid #E2E8F0;">\n`;
    html += `    <h2 style="font-size:1.5rem;color:#1E3A8A;margin-bottom:12px;">${faq.title}</h2>\n`;
    html += `    <p style="color:#475569;margin-bottom:20px;">${faq.intro}</p>\n`;
    html += `    <dl style="margin:0;">\n`;
    faq.items.forEach(item => {
      html += `      <dt style="font-weight:700;color:#1E3A8A;margin-top:16px;font-size:1.05rem;">Q: ${item.question}</dt>\n`;
      html += `      <dd style="margin-left:0;margin-top:6px;color:#475569;line-height:1.6;">A: ${item.answer}</dd>\n`;
    });
    html += `    </dl>\n`;
    html += `  </section>\n\n`;
  }

  // 7. Internal Links Section
  if (internalLinks) {
    html += `  <nav id="semantic-internal-links" style="padding-top:32px;border-top:1px solid #E2E8F0;">\n`;
    if (internalLinks.relatedServices && internalLinks.relatedServices.length > 0) {
      html += `    <div style="margin-bottom:24px;">\n`;
      html += `      <h3 style="font-size:1.1rem;color:#0D9488;margin-bottom:12px;">관련 서비스 정보</h3>\n`;
      html += `      <ul style="list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:10px;">\n`;
      internalLinks.relatedServices.forEach(link => {
        html += `        <li><a href="${link.href}" style="display:inline-block;padding:6px 12px;background-color:#F1F5F9;color:#0F172A;text-decoration:none;border-radius:6px;font-size:14px;border:1px solid #E2E8F0;">${link.label}</a></li>\n`;
      });
      html += `      </ul>\n`;
      html += `    </div>\n`;
    }
    if (internalLinks.nearbyRegions && internalLinks.nearbyRegions.length > 0) {
      html += `    <div>\n`;
      html += `      <h3 style="font-size:1.1rem;color:#0D9488;margin-bottom:12px;">인근 시공 지역 바로가기</h3>\n`;
      html += `      <ul style="list-style:none;padding:0;margin:0;display:flex;flex-wrap:wrap;gap:10px;">\n`;
      internalLinks.nearbyRegions.forEach(link => {
        html += `        <li><a href="${link.href}" style="display:inline-block;padding:6px 12px;background-color:#F1F5F9;color:#0F172A;text-decoration:none;border-radius:6px;font-size:14px;border:1px solid #E2E8F0;">${link.label}</a></li>\n`;
      });
      html += `      </ul>\n`;
      html += `    </div>\n`;
    }
    html += `  </nav>\n`;
  }

  html += `</main>`;
  return html;
}
