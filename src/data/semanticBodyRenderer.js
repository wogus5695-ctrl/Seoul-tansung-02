/**
 * Pure Semantic HTML Body Renderer for NeoCoat Dynamic Landing Pages
 * Serializes the shared Page Model (from pageModelEngine.js) into pristine,
 * accessible semantic HTML for initial HTTP response body (first-byte SEO).
 * 
 * STRICT COMPLIANCE:
 * - Pure data serialization only (zero new marketing content)
 * - 100% Shared Source with React UI (pageModelEngine)
 * - Safe HTML entity escaping
 * - Zero hidden CSS / zero cloaking
 */

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderSemanticBody(pageModel) {
  if (!pageModel) return '';

  const { hero, diagnosis, services, spaces, faq, internalLinks } = pageModel;

  // 1. Hero Section (Exact React H1 text from heroTitlePrefix & heroTitleSuffix)
  const heroHtml = `
    <section class="neo-hero" aria-labelledby="hero-title" style="padding: 48px 20px 64px; max-width: 1280px; margin: 0 auto;">
      <div class="hero-badge" style="margin-bottom: 12px;">
        <span style="display: inline-flex; align-items: center; gap: 6px; background-color: #ECFDF5; padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(13, 148, 136, 0.2); font-size: 13px; color: #0D9488; font-weight: 600;">
          <span style="width: 6px; height: 6px; border-radius: 50%; background-color: #0D9488;"></span>
          ${escapeHtml(hero.heroBadgeLabel)}
        </span>
      </div>
      <h1 id="hero-title" class="hero-h1" style="font-size: 2.25rem; font-weight: 800; line-height: 1.25; margin-bottom: 20px; word-break: keep-all;">
        <span style="color: #0D9488; font-weight: 800;">${escapeHtml(hero.heroTitlePrefix)}</span>,<br />
        <span style="color: #1E3A8A;">${escapeHtml(hero.heroTitleSuffix)}</span>
      </h1>
      <p class="hero-desc" style="color: #475569; font-size: 1.125rem; line-height: 1.65; max-width: 580px; word-break: keep-all; margin-bottom: 32px;">
        ${escapeHtml(hero.heroDescription)}
      </p>
    </section>
  `;

  // 2. Diagnosis Section
  const diagnosisItemsHtml = (diagnosis.items || []).map((item, idx) => `
    <li class="diagnosis-item" style="border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px 20px; margin-bottom: 12px; background-color: #FFFFFF; list-style: none;">
      <h3 class="diagnosis-item-title" style="font-size: 1.05rem; font-weight: 700; color: #1E3A8A; margin-bottom: 8px;">
        <span style="font-size: 13px; font-weight: 700; color: #0D9488; background-color: #ECFDF5; padding: 2px 8px; border-radius: 6px; margin-right: 8px;">0${idx + 1}</span>
        ${escapeHtml(item.title)}
      </h3>
      <p class="diagnosis-item-content" style="font-size: 0.95rem; color: #475569; line-height: 1.6; margin: 0;">
        ${escapeHtml(item.content)}
      </p>
    </li>
  `).join('');

  const diagnosisHtml = `
    <section class="neo-diagnosis" aria-labelledby="diagnosis-title" style="padding: 60px 20px; max-width: 1280px; margin: 0 auto; border-top: 1px solid #E2E8F0;">
      <div style="font-size: 0.85rem; font-weight: bold; color: #0D9488; letter-spacing: 1px; margin-bottom: 8px;">시공 전 확인사항</div>
      <h2 id="diagnosis-title" class="section-h2" style="font-size: 1.85rem; font-weight: 700; color: #1E3A8A; margin-bottom: 16px; word-break: keep-all;">
        ${escapeHtml(diagnosis.title)}
      </h2>
      <p class="section-desc" style="font-size: 1rem; color: #475569; line-height: 1.65; max-width: 640px; margin-bottom: 28px; word-break: keep-all;">
        ${escapeHtml(diagnosis.intro)}
      </p>
      <ul class="diagnosis-list" style="padding: 0; margin: 0;">
        ${diagnosisItemsHtml}
      </ul>
    </section>
  `;

  // 3. Services Section
  const primaryService = services?.primary;
  const secondaryServices = services?.secondary || [];

  const checkpointsHtml = (primaryService?.checkpoints || []).map(cp => `
    <span style="display: inline-block; font-size: 0.8rem; background-color: #F1F5F9; color: #475569; padding: 4px 10px; border-radius: 4px; margin-right: 6px; margin-top: 8px;">${escapeHtml(cp)}</span>
  `).join('');

  const primaryServiceHtml = primaryService ? `
    <article class="primary-service-card" style="border: 2px solid #0D9488; border-radius: 12px; padding: 24px; background-color: #FFFFFF; margin-bottom: 20px;">
      <h3 style="font-size: 1.25rem; font-weight: 700; color: #1E3A8A; margin-bottom: 10px;">${escapeHtml(primaryService.title)}</h3>
      <p style="font-size: 0.95rem; color: #475569; line-height: 1.6; margin: 0;">${escapeHtml(primaryService.description)}</p>
      ${checkpointsHtml ? `<div style="margin-top: 12px;">${checkpointsHtml}</div>` : ''}
    </article>
  ` : '';

  const secondaryServicesHtml = secondaryServices.map(sec => `
    <article class="secondary-service-card" style="border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; background-color: #FFFFFF; margin-bottom: 12px;">
      <h3 style="font-size: 1.1rem; font-weight: 700; color: #1E3A8A; margin-bottom: 8px;">${escapeHtml(sec.title)}</h3>
      <p style="font-size: 0.9rem; color: #475569; line-height: 1.55; margin: 0;">${escapeHtml(sec.description)}</p>
    </article>
  `).join('');

  const servicesHtml = `
    <section class="neo-services" id="services" aria-labelledby="services-title" style="padding: 60px 20px; max-width: 1280px; margin: 0 auto; border-top: 1px solid #E2E8F0;">
      <div style="font-size: 0.85rem; font-weight: bold; color: #0D9488; letter-spacing: 1px; margin-bottom: 8px;">네오코트 서비스</div>
      <h2 id="services-title" class="section-h2" style="font-size: 1.85rem; font-weight: 700; color: #1E3A8A; margin-bottom: 16px; word-break: keep-all;">
        공간과 마감 상태에 맞는<br />시공 서비스를 확인해보세요
      </h2>
      <p class="section-desc" style="font-size: 1rem; color: #475569; line-height: 1.65; max-width: 640px; margin-bottom: 28px; word-break: keep-all;">
        벽면을 보호하고 정돈하는 탄성코트부터 타일 틈의 오염과 관리 불편을 줄이는 줄눈시공까지, 공간의 현재 상태와 사용 환경에 맞춰 필요한 작업 범위를 구분합니다.
      </p>
      <div class="services-wrapper">
        ${primaryServiceHtml}
        <div class="secondary-services-grid">
          ${secondaryServicesHtml}
        </div>
      </div>
    </section>
  `;

  // 4. Spaces Section
  const spacesListHtml = (spaces || []).map(sp => `
    <article class="space-card" style="border: 1px solid #E2E8F0; border-radius: 12px; padding: 18px 20px; margin-bottom: 12px; background-color: #FFFFFF;">
      <h3 style="font-size: 1.05rem; font-weight: 700; color: #1E3A8A; margin-bottom: 6px;">${escapeHtml(sp.name)}</h3>
      <p style="font-size: 0.9rem; color: #475569; line-height: 1.55; margin: 0;">${escapeHtml(sp.desc)}</p>
    </article>
  `).join('');

  const spacesHtml = `
    <section class="neo-spaces" aria-labelledby="spaces-title" style="padding: 60px 20px; max-width: 1280px; margin: 0 auto; border-top: 1px solid #E2E8F0;">
      <div style="font-size: 0.85rem; font-weight: bold; color: #0D9488; letter-spacing: 1px; margin-bottom: 8px;">공간별 적용 안내</div>
      <h2 id="spaces-title" class="section-h2" style="font-size: 1.85rem; font-weight: 700; color: #1E3A8A; margin-bottom: 16px; word-break: keep-all;">
        같은 시공도 공간에 따라<br />확인해야 할 부분이 다릅니다
      </h2>
      <p class="section-desc" style="font-size: 1rem; color: #475569; line-height: 1.65; max-width: 640px; margin-bottom: 28px; word-break: keep-all;">
        베란다와 세탁실, 욕실과 현관은 습도와 오염 원인, 기존 마감 상태가 서로 다릅니다. 각 공간의 특징을 확인한 뒤 작업 범위를 구분해야 합니다.
      </p>
      <div class="spaces-grid">
        ${spacesListHtml}
      </div>
    </section>
  `;

  // 5. FAQ Section (Pristine Semantic <dl>, <dt>, <dd> for all 5 FAQs)
  const faqListHtml = (faq.items || []).map(item => `
    <div class="faq-item" style="border-bottom: 1px solid #E2E8F0; padding: 16px 0;">
      <dt class="faq-question" style="font-size: 1.05rem; font-weight: 700; color: #1E3A8A; margin-bottom: 8px;">
        ${escapeHtml(item.question)}
      </dt>
      <dd class="faq-answer" style="font-size: 0.95rem; color: #475569; line-height: 1.6; margin: 0; padding-left: 0;">
        ${escapeHtml(item.answer)}
      </dd>
    </div>
  `).join('');

  const faqHtml = `
    <section class="neo-faq" id="faq" aria-labelledby="faq-title" style="padding: 60px 20px; max-width: 860px; margin: 0 auto; border-top: 1px solid #E2E8F0;">
      <div style="font-size: 0.85rem; font-weight: bold; color: #0D9488; letter-spacing: 1px; margin-bottom: 8px; text-align: center;">자주 묻는 질문</div>
      <h2 id="faq-title" class="section-h2" style="font-size: 1.85rem; font-weight: 700; color: #1E3A8A; margin-bottom: 16px; word-break: keep-all; text-align: center;">
        시공 전에 많이 묻는 내용을<br />먼저 정리했습니다
      </h2>
      <p class="section-desc" style="font-size: 1rem; color: #475569; line-height: 1.65; max-width: 600px; margin: 0 auto 32px; word-break: keep-all; text-align: center;">
        ${escapeHtml(faq.intro)}
      </p>
      <dl class="faq-list" style="margin: 0; padding: 0;">
        ${faqListHtml}
      </dl>
    </section>
  `;

  // 6. Internal Links Section
  const relatedLinks = (internalLinks?.relatedServices || []).slice(0, 4);
  const nearbyLinks = (internalLinks?.nearbyRegions || []).slice(0, 6);

  const relatedHtml = relatedLinks.map(link => `
    <a href="${escapeHtml(link.href)}" class="internal-link" style="display: inline-block; font-size: 0.85rem; padding: 6px 12px; border: 1px solid #E2E8F0; border-radius: 4px; background-color: #FFFFFF; color: #1E293B; text-decoration: none; margin: 4px;">${escapeHtml(link.label)}</a>
  `).join('');

  const nearbyHtml = nearbyLinks.map(link => `
    <a href="${escapeHtml(link.href)}" class="internal-link" style="display: inline-block; font-size: 0.85rem; padding: 6px 12px; border: 1px solid #E2E8F0; border-radius: 4px; background-color: #FFFFFF; color: #1E293B; text-decoration: none; margin: 4px;">${escapeHtml(link.label)}</a>
  `).join('');

  const internalLinksHtml = `
    <section class="neo-internal-links" aria-label="관련 시공 및 인근 지역 안내" style="padding: 40px 20px 80px; max-width: 1280px; margin: 0 auto; border-top: 1px solid #E2E8F0;">
      ${relatedLinks.length > 0 ? `
        <div style="margin-bottom: 24px;">
          <h4 style="font-size: 1rem; font-weight: 700; color: #0D9488; margin-bottom: 12px;">관련 서비스 정보</h4>
          <nav aria-label="관련 서비스 목록">
            ${relatedHtml}
          </nav>
        </div>
      ` : ''}
      ${nearbyLinks.length > 0 ? `
        <div>
          <h4 style="font-size: 1rem; font-weight: 700; color: #0D9488; margin-bottom: 12px;">인근 시공 지역 바로가기</h4>
          <nav aria-label="인근 지역 목록">
            ${nearbyHtml}
          </nav>
        </div>
      ` : ''}
    </section>
  `;

  return `
    <main class="semantic-entry" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0F172A; background-color: #F8FAFC; min-height: 100vh;">
      ${heroHtml}
      ${diagnosisHtml}
      ${servicesHtml}
      ${spacesHtml}
      ${faqHtml}
      ${internalLinksHtml}
    </main>
  `.trim();
}
