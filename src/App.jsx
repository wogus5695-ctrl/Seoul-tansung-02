import React, { useState, useEffect, useMemo } from 'react';
import { siteConfig, featureConfig } from './config';
import { NeoCoatHeader } from './components/NeoCoatHeader';
import { NeoCoatHero } from './components/NeoCoatHero';
import { NeoCoatTrustStrip } from './components/NeoCoatTrustStrip';
import { NeoCoatDiagnosis } from './components/NeoCoatDiagnosis';
import { NeoCoatServices } from './components/NeoCoatServices';
import { NeoCoatSpaces } from './components/NeoCoatSpaces';
import { NeoCoatStandard } from './components/NeoCoatStandard';
import { NeoCoatCases } from './components/NeoCoatCases';
import { NeoCoatFaq } from './components/NeoCoatFaq';
import { NeoCoatFinalCTA } from './components/NeoCoatFinalCTA';
import { NeoCoatMobileStickyCTA } from './components/NeoCoatMobileStickyCTA';
import { NeoCoatFooter } from './components/NeoCoatFooter';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { getSeoMetadata } from './data/seoTemplates';
import {
  SectionContainer,
  PrimaryButton,
  SecondaryButton,
  SEOContentSection
} from './components/Common';

// Ingest datasets
import { seoulRegions } from './data/seoulRegions';
import { serviceKeywords } from './data/serviceKeywords';
import { parseAndValidateK, getActiveRegions, ENABLE_CAPITAL_REGION_EXPANSION, generateDynamicUrl, generateAbsoluteDynamicUrl } from './data/regionResolver';
import { incheonRegions } from './data/incheonRegions';
import { gyeonggiRegions } from './data/gyeonggiRegions';
import { keywordMetadata } from './data/keywordMetadata';

// Space Guide static descriptions (1-2 sentences)
const SPACE_GUIDE_DATA = {
  balcony: { name: '베란다', img: 'BALCONY_IMAGE', desc: '외부 온도와 습기의 영향을 많이 받는 공간입니다. 벽면의 들뜸, 오염, 균열 여부를 먼저 확인합니다.' },
  laundry: { name: '세탁실', img: 'LAUNDRY_ROOM_IMAGE', desc: '물 사용과 환기 상태에 따라 벽면 오염이 발생하기 쉬운 공간입니다. 배관 주변 and 기존 마감 상태를 함께 확인합니다.' },
  bathroom: { name: '욕실', img: 'BATHROOM_IMAGE', desc: '물과 세정제에 자주 노출되는 공간입니다. 타일 틈의 오염과 갈라짐, 기존 줄눈의 접착 상태를 확인합니다.' },
  toilet: { name: '화장실', img: 'TOILET_IMAGE', desc: '바닥과 벽면의 사용 환경에 맞춰 줄눈 상태를 점검합니다. 부분 보수와 전체 시공 중 적절한 범위를 안내합니다.' },
  entrance: { name: '현관', img: 'ENTRANCE_IMAGE', desc: '먼지와 외부 오염이 반복적으로 유입되는 공간입니다. 타일 색상과 관리 방식을 고려해 줄눈 색상을 선택합니다.' },
  utility: { name: '다용도실', img: 'UTILITY_ROOM_IMAGE', desc: '세탁기, 배관, 수납장 주변의 작업 공간을 먼저 확인합니다. 좁은 공간에서도 필요한 보양과 작업 동선을 검토합니다.' },
};

// Base FAQ catalog reference
const FAQ_CATALOG = {
  '기존 탄성코트가 들뜬 곳도 다시 시공할 수 있나요?': '재시공 가능 여부는 기존 마감의 접착 상태를 확인한 후에 판단할 수 있습니다. 들뜬 부분을 정리하지 않고 바로 덧시공을 하게 되면 다시 떨어질 우려가 있으므로, 사전에 상태를 확인하고 필요한 부분 보수 또는 전체 재시공 범위를 결정해야 합니다.',
  '곰팡이나 결로가 있으면 바로 시공해도 되나요?': '표면만 덮어서 시공을 진행하면 원인이 해결되지 않아 마감 후에 다시 문제가 생길 수 있습니다. 결로나 누수 의심 원인을 먼저 확인해 조치를 취하고, 바탕면의 건조 상태가 완전히 확인된 후에 시공하는 것이 바람직합니다.',
  '탄성코트 시공 전에 짐을 모두 빼야 하나요?': '작업할 벽면 및 보양을 진행할 공간의 확보와 작업 동선이 마련되어야 합니다. 세탁기, 선반, 실외기 등 부피가 큰 짐들의 이동 가능 여부는 사전 사진 상담 시 상태를 확인한 후에 안내해 드립니다.',
  '기존 줄눈을 제거하고 시공하나요?': '기존 타일 사이 줄눈의 오염도, 갈라짐 정도, 접착 상태를 면밀히 분석한 후 작업을 시작합니다. 필요한 작업 범위 내에 있는 기존 백시멘트를 제거하고 틈새를 꼼꼼히 정리하는 과정을 거친 후에 다시 시공하게 됩니다.',
  '욕실과 현관에 같은 자재를 사용하나요?': '공간마다 물을 접하는 빈도와 오염물이 유입되는 경로가 다릅니다. 타일의 종류와 기존 마감재 상태도 다르기 때문에, 해당 공간의 환경에 가장 잘 부합하는 적합한 등급의 자재와 마감 색상을 선정하여 안내해 드립니다.',
  '시공 후 언제부터 물을 사용할 수 있나요?': '정확한 사용 가능 시점은 현장에서 적용한 자재의 특성, 그리고 당일 현장의 온도와 습도 조건에 따라 다르게 나타납니다. 시공이 완료된 후 현장에서 양생 건조 관련 세부 주의사항과 함께 안내해 드립니다.',
  '줄눈 일부만 보수할 수 있나요?': '줄눈의 훼손 부위 접착 특성을 판단해 마감 탈락 위험성이 높지 않은 경우 국소 보수가 가능합니다. 단, 전체 균일도 유지를 위해 가능한 타일 면 단위 정리를 권장합니다.',
  '시공 전 기존 마감 상태를 확인하나요?': '벽체의 수분 함침 정도나 백시멘트의 딱딱하게 굳은 노후 수준에 맞춰 긁어내는 전용 장비와 마감 자재 배합이 달라지므로 시공 전 상태 진단은 반드시 필요합니다.',
};

function Breadcrumb({ region, task }) {
  return (
    <div style={{ fontSize: '0.85rem', opacity: 0.7, textAlign: 'left', marginBottom: '16px', display: 'flex', gap: '8px' }}>
      <a href="/" style={{ textDecoration: 'underline' }}>홈</a>
      <span>&gt;</span>
      <a href="/sitemap-seoul" style={{ textDecoration: 'underline' }}>서울시 시공</a>
      {region && (
        <>
          <span>&gt;</span>
          <span>{region}</span>
        </>
      )}
      {task && (
        <>
          <span>&gt;</span>
          <span>{task}</span>
        </>
      )}
    </div>
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));
  
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);

  const [showMoreServices, setShowMoreServices] = useState(false);
  const [showMoreRegions, setShowMoreRegions] = useState(false);

  // Sitemap Hub Search & Filter States
  const [sitemapFilter, setSitemapFilter] = useState('전체'); // '전체' | '탄성코트' | '줄눈시공'
  const [metroFilter, setMetroFilter] = useState('전체'); // '전체' | '서울' | '인천' | '경기'
  const [regionSearch, setRegionSearch] = useState('');
  const [taskSearch, setTaskSearch] = useState('');
  
  // Track open state of each district (all closed by default)
  const [openDistricts, setOpenDistricts] = useState({});

  // Sync state with browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Client-side URL redirection fallback for older legacy URLs
  useEffect(() => {
    const kParam = searchParams.get('k')?.trim() || '';
    if (kParam) {
      const sortedKeywords = [...serviceKeywords].sort((a, b) => b.keyword.length - a.keyword.length);
      let matchedService = null;
      let prefix = '';
      for (const s of sortedKeywords) {
        if (kParam.endsWith(`-${s.keyword}`)) {
          matchedService = s;
          prefix = kParam.substring(0, kParam.length - s.keyword.length - 1);
          break;
        }
      }
      if (matchedService && prefix) {
        const legacyMatch = keywordMetadata.find(km => km.legacySlug === prefix || km.originalSlug === prefix);
        let targetRouteKey = null;
        if (legacyMatch && legacyMatch.routeKey !== prefix) {
          targetRouteKey = legacyMatch.routeKey;
        } else {
          const directMatch = keywordMetadata.find(km => km.routeKey === prefix);
          if (!directMatch) {
            const parts = prefix.split('-');
            const dongName = parts[parts.length - 1];
            const parentPrefix = parts.slice(0, -1).join('-');
            const candidates = keywordMetadata.filter(km => km.displayRegion === dongName && km.type === 'dong');
            if (candidates.length === 1) {
              targetRouteKey = candidates[0].routeKey;
            } else if (candidates.length > 1 && parentPrefix) {
              const cleanParentPrefix = parentPrefix.replace(/구$/, '').replace(/시$/, '');
              const matchedTarget = candidates.find(cand => {
                const parentClean = cand.parentRegion.replace(/구/g, '').replace(/시/g, '').replace(/권/g, '');
                return parentClean.includes(cleanParentPrefix);
              });
              if (matchedTarget) {
                targetRouteKey = matchedTarget.routeKey;
              }
            }
          }
        }
        if (targetRouteKey) {
          const newUrl = `/?k=${encodeURIComponent(targetRouteKey + '-' + matchedService.keyword)}`;
          window.location.replace(newUrl);
        }
      }
    }
  }, [searchParams]);

  const navigate = (newPath, query = '') => {
    const fullUrl = newPath + (query ? `?${query}` : '');
    window.history.pushState({}, '', fullUrl);
    setPath(newPath);
    setSearchParams(new URLSearchParams(query));
    window.scrollTo(0, 0);
  };

  // Parse and validate 'k' parameter
  const kParam = searchParams.get('k')?.trim() || '';
  let parsedKeyword = null;
  let isKeywordInvalid = false;

  if (kParam) {
    const usePreview = searchParams.get('preview') === 'true';
    const result = parseAndValidateK(kParam, usePreview);
    if (result.isValid) {
      parsedKeyword = result;
    } else {
      isKeywordInvalid = true;
    }
  }

  // Service Tab State (elasticCoat vs grout)
  const [serviceTab, setServiceTab] = useState('elasticCoat');

  // Sync serviceTab automatically when parsedKeyword changes
  useEffect(() => {
    if (parsedKeyword) {
      setServiceTab(parsedKeyword.service.serviceGroup === 'elastic' ? 'elasticCoat' : 'grout');
    } else {
      setServiceTab('elasticCoat');
    }
  }, [kParam]);

  // Pre-calculate Hub parameters and metrics for high performance
  const metrics = useMemo(() => {
    const list = getActiveRegions();
    
    // Total Dongs (dong units)
    const dongsCount = list.filter(r => r.type === 'dong').length;
    
    // Total regions (display names)
    const totalRegionsCount = list.length;
    
    // Total tasks
    const totalTasksCount = serviceKeywords.length;
    
    // Total potential URL combinations
    const totalUrlsCount = totalRegionsCount * totalTasksCount;

    // Construct hierarchy
    const metroGroups = {
      '서울권': { label: '서울권', cities: {} },
      '경기권': { label: '경기권', cities: {} },
      '인천권': { label: '인천권', cities: {} }
    };

    list.forEach(r => {
      const metroKey = r.metro === '서울' ? '서울권' : (r.metro === '인천' ? '인천권' : '경기권');
      const group = metroGroups[metroKey];
      
      if (r.metro === '서울' || r.metro === '인천') {
        const cityKey = r.groupName;
        if (!group.cities[cityKey]) {
          group.cities[cityKey] = {
            name: cityKey,
            districts: {
              '전체': { name: '전체', regions: [] }
            }
          };
        }
        group.cities[cityKey].districts['전체'].regions.push(r);
      } else {
        // Gyeonggi
        const cityKey = r.city;
        if (!group.cities[cityKey]) {
          group.cities[cityKey] = {
            name: cityKey,
            districts: {}
          };
        }
        
        const isDistrict = r.groupName && r.groupName.endsWith('구') && r.groupName !== r.city;
        const distKey = isDistrict ? r.groupName : '시 단위';
        
        if (!group.cities[cityKey].districts[distKey]) {
          group.cities[cityKey].districts[distKey] = {
            name: distKey,
            regions: []
          };
        }
        group.cities[cityKey].districts[distKey].regions.push(r);
      }
    });

    const uniqueDistricts = [];
    Object.keys(metroGroups).forEach(mKey => {
      Object.keys(metroGroups[mKey].cities).forEach(cKey => {
        uniqueDistricts.push(cKey);
      });
    });

    return {
      dongsCount,
      totalRegionsCount,
      totalTasksCount,
      totalUrlsCount,
      metroGroups,
      uniqueDistricts
    };
  }, []);

  // Determine active layouts
  const activeGroup = parsedKeyword ? parsedKeyword.service.serviceGroup : 'both';
  const activeIntent = parsedKeyword ? parsedKeyword.service.searchIntent : 'general';

  const currentFaqList = parsedKeyword 
    ? parsedKeyword.service.faqSet.map(q => ({ question: q, answer: FAQ_CATALOG[q] || '상세 시공 문의 시 전문 답변을 준비해 드립니다.' }))
    : [
        { question: '기존 탄성코트가 들뜬 곳도 다시 시공할 수 있나요?', answer: FAQ_CATALOG['기존 탄성코트가 들뜬 곳도 다시 시공할 수 있나요?'] },
        { question: '곰팡이나 결로가 있으면 바로 시공해도 되나요?', answer: FAQ_CATALOG['곰팡이나 결로가 있으면 바로 시공해도 되나요?'] },
        { question: '탄성코트 시공 전에 짐을 모두 빼야 하나요?', answer: FAQ_CATALOG['탄성코트 시공 전에 짐을 모두 빼야 하나요?'] },
        { question: '기존 줄눈을 제거하고 시공하나요?', answer: FAQ_CATALOG['기존 줄눈을 제거하고 시공하나요?'] },
        { question: '욕실과 현관에 같은 자재를 사용하나요?', answer: FAQ_CATALOG['욕실과 현관에 같은 자재를 사용하나요?'] },
        { question: '시공 후 언제부터 물을 사용할 수 있나요?', answer: FAQ_CATALOG['시공 후 언제부터 물을 사용할 수 있나요?'] },
        { question: '줄눈 일부만 보수할 수 있나요?', answer: FAQ_CATALOG['줄눈 일부만 보수할 수 있나요?'] },
        { question: '시공 전 기존 마감 상태를 확인하나요?', answer: FAQ_CATALOG['시공 전 기존 마감 상태를 확인하나요?'] }
      ];

  // Sync title, meta tags, and canonical dynamically on mount/update
  useEffect(() => {
    let titleStr = `탄성코트·줄눈시공 전문`;
    let descStr = `베란다·세탁실 탄성코트와 욕실·현관 줄눈시공을 안내합니다. 기존 벽면과 타일 상태를 확인하고 공간에 필요한 시공 범위를 상담해 드립니다.`;
    const defaultSiteUrl = siteConfig.siteUrl || '';
    const seoThumbnailUrl = defaultSiteUrl ? `${defaultSiteUrl}/images/seo/bareumgonggan-search-thumbnail-v1.png` : '';
    
    // Schema generation arrays
    const schemas = [];

    const updateMetaTag = (selector, attr, val) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[property')) {
          el.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
        } else {
          el.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };

    // Remove any previous noindex tags if any
    const existingNoIndex = document.querySelector('meta[name="robots"]');
    if (existingNoIndex) existingNoIndex.remove();

    if (isKeywordInvalid) {
      titleStr = '잘못된 요청 정보';
      descStr = '요청하신 시공 정보 또는 지역명이 정확하지 않습니다.';
      updateMetaTag('meta[name="robots"]', 'content', 'noindex, nofollow');
    } else if (parsedKeyword) {
      const regionName = parsedKeyword.region.name;
      const taskName = parsedKeyword.service.keyword;
      
      if (parsedKeyword.service.serviceGroup === 'elastic') {
        titleStr = `${regionName} ${taskName} 시공 | 베란다·세탁실 벽면 마감`;
      } else {
        titleStr = `${regionName} ${taskName} | 기존 줄눈 제거와 마감 안내`;
      }
      if (parsedKeyword.service.searchIntent === 'agency') {
        titleStr = `${regionName} ${taskName} | 시공 전 확인 기준`;
      }
      
      descStr = `${regionName} ${taskName} 안내입니다. ${parsedKeyword.service.primarySpace} 구역의 기존 상태를 확인하고 환경에 최적화된 마감 시공 범위를 안내해 드립니다.`;

      // 1. Service schema
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': `${regionName} ${taskName}`,
        'provider': {
          '@type': 'Organization',
          'name': siteConfig.brandName
        },
        'areaServed': {
          '@type': 'AdministrativeArea',
          'name': parsedKeyword.region.districtName
        },
        'description': descStr,
        'image': seoThumbnailUrl
      });

      // 2. Breadcrumb schema
      if (defaultSiteUrl) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': '홈', 'item': defaultSiteUrl },
            { '@type': 'ListItem', 'position': 2, 'name': '수도권 지역별 안내', 'item': `${defaultSiteUrl}/sitemap-seoul` },
            { '@type': 'ListItem', 'position': 3, 'name': `${regionName} ${taskName}`, 'item': generateAbsoluteDynamicUrl(defaultSiteUrl, parsedKeyword.region.urlRegion, parsedKeyword.service.keyword) }
          ]
        });
      }

      // 3. FAQPage schema
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': currentFaqList.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      });

    } else if (path === '/sitemap-seoul') {
      titleStr = `서울 탄성코트·줄눈시공 지역별 안내`;
      descStr = `서울 자치구와 동 단위 지역별 탄성코트·줄눈시공 페이지를 확인할 수 있습니다. 지역명과 시공 서비스를 선택해 필요한 정보를 확인해 보세요.`;

      // Sitemap Page Schemas
      if (defaultSiteUrl) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          'name': titleStr,
          'description': descStr,
          'url': `${defaultSiteUrl}/sitemap-seoul`
        });

        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          'itemListElement': [
            { '@type': 'ListItem', 'position': 1, 'name': '홈', 'item': defaultSiteUrl },
            { '@type': 'ListItem', 'position': 2, 'name': '서울 지역별 안내', 'item': `${defaultSiteUrl}/sitemap-seoul` }
          ]
        });
      }
    } else {
      // Main Page schemas
      if (defaultSiteUrl) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': titleStr,
          'url': defaultSiteUrl
        });
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': siteConfig.brandName,
          'url': defaultSiteUrl
        });
      }
    }

    document.title = titleStr;

    updateMetaTag('meta[name="description"]', 'content', descStr);
    updateMetaTag('meta[property="og:title"]', 'content', titleStr);
    updateMetaTag('meta[property="og:description"]', 'content', descStr);

    // Sync SEO Search Thumbnail dynamically for normal dynamic landing pages
    let imageSrcEl = document.querySelector('link[rel="image_src"]');

    if (parsedKeyword && seoThumbnailUrl) {
      updateMetaTag('meta[property="og:image"]', 'content', seoThumbnailUrl);
      updateMetaTag('meta[property="og:image:width"]', 'content', '1200');
      updateMetaTag('meta[property="og:image:height"]', 'content', '1200');
      updateMetaTag('meta[property="og:image:type"]', 'content', 'image/png');
      updateMetaTag('meta[property="og:image:alt"]', 'content', `${siteConfig.brandName} 탄성코트·줄눈시공 전문`);

      updateMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
      updateMetaTag('meta[name="twitter:image"]', 'content', seoThumbnailUrl);
      updateMetaTag('meta[name="twitter:image:alt"]', 'content', `${siteConfig.brandName} 탄성코트·줄눈시공 전문`);

      if (!imageSrcEl) {
        imageSrcEl = document.createElement('link');
        imageSrcEl.setAttribute('rel', 'image_src');
        document.head.appendChild(imageSrcEl);
      }
      imageSrcEl.setAttribute('href', seoThumbnailUrl);
    } else {
      // Revert/Clean up image tags for non-dynamic landing pages
      const tagsToCleanup = [
        'meta[property="og:image"]',
        'meta[property="og:image:width"]',
        'meta[property="og:image:height"]',
        'meta[property="og:image:type"]',
        'meta[property="og:image:alt"]',
        'meta[name="twitter:card"]',
        'meta[name="twitter:image"]',
        'meta[name="twitter:image:alt"]'
      ];
      tagsToCleanup.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) el.remove();
      });
      if (imageSrcEl) imageSrcEl.remove();
    }

    let canonicalUrl = "";
    if (!isKeywordInvalid) {
      if (parsedKeyword) {
        canonicalUrl = generateAbsoluteDynamicUrl(siteConfig.siteUrl, parsedKeyword.region.urlRegion, parsedKeyword.service.keyword);
      } else {
        canonicalUrl = siteConfig.siteUrl + (path === '/' ? '' : path);
      }
    }

    let linkEl = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!linkEl) {
        linkEl = document.createElement('link');
        linkEl.setAttribute('rel', 'canonical');
        document.head.appendChild(linkEl);
      }
      linkEl.setAttribute('href', canonicalUrl);
      updateMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    } else {
      if (linkEl) linkEl.remove();
      const existingOgUrl = document.querySelector('meta[property="og:url"]');
      if (existingOgUrl) existingOgUrl.remove();
    }

    // Sync JSON-LD structured script tag
    let scriptEl = document.getElementById('jsonld-schema');
    if (scriptEl) scriptEl.remove();

    if (!isKeywordInvalid && schemas.length > 0) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'jsonld-schema';
      scriptEl.type = 'application/ld+json';
      scriptEl.innerHTML = JSON.stringify(schemas);
      document.head.appendChild(scriptEl);
    }

  }, [parsedKeyword, path, kParam, isKeywordInvalid, currentFaqList]);

  const handleCTA = () => {
    window.open(siteConfig.consultationUrl, '_blank', 'noopener,noreferrer');
  };

  const spaceGuideKeys = activeGroup === 'elastic' 
    ? ['balcony', 'laundry', 'utility'] 
    : activeGroup === 'grout' 
      ? ['bathroom', 'toilet', 'entrance', 'balcony'] 
      : ['balcony', 'laundry', 'bathroom', 'toilet', 'entrance', 'utility'];

  const activeSpaceKey = spaceGuideKeys[activeSpaceIndex] || spaceGuideKeys[0];

  const relatedServicesLinks = parsedKeyword ? parsedKeyword.service.relatedServices.map(task => ({
    label: `${parsedKeyword.region.name} ${task}`,
    href: generateDynamicUrl(parsedKeyword.region.urlRegion, task)
  })) : null;

  const relatedRegionsLinks = parsedKeyword ? getActiveRegions().filter(
    r => r.parentId === parsedKeyword.region.parentId && r.id !== parsedKeyword.region.id
  ).slice(0, 6).map(reg => ({
    label: `${reg.name} ${parsedKeyword.service.keyword}`,
    href: generateDynamicUrl(reg.urlRegion, parsedKeyword.service.keyword)
  })) : null;

  // Toggle district view
  const toggleDistrict = (distName) => {
    setOpenDistricts(prev => ({
      ...prev,
      [distName]: !prev[distName]
    }));
  };

  const handleToggleAll = (val) => {
    const next = {};
    metrics.uniqueDistricts.forEach(dist => {
      next[dist] = val;
    });
    setOpenDistricts(next);
  };

  // Dynamic layout check hook
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkWidth = () => setIsDesktop(window.innerWidth >= 1024);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  // Synchronize Document Title, Meta Description, Canonical, OG Tags, and FAQPage JSON-LD
  useEffect(() => {
    const seoMeta = getSeoMetadata({
      parsedKeyword,
      path,
      isNotFound: isKeywordInvalid
    });

    if (seoMeta) {
      document.title = seoMeta.title;

      // Meta Description
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.setAttribute('name', 'description');
        document.head.appendChild(descMeta);
      }
      descMeta.setAttribute('content', seoMeta.description);

      // Meta Robots
      let robotsMeta = document.querySelector('meta[name="robots"]');
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', seoMeta.robots);

      // Canonical
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', seoMeta.canonical);

      // OG Title & Description & URL
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', seoMeta.title);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', seoMeta.description);

      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', seoMeta.canonical);

      // FAQPage JSON-LD Script Tag
      const existingScript = document.getElementById('neo-faq-jsonld');
      if (existingScript) {
        existingScript.remove();
      }
      if (seoMeta.faqJsonLd) {
        const script = document.createElement('script');
        script.id = 'neo-faq-jsonld';
        script.type = 'application/ld+json';
        script.text = JSON.stringify(seoMeta.faqJsonLd);
        document.head.appendChild(script);
      }
    }
  }, [parsedKeyword, path, isKeywordInvalid]);

  const renderContent = () => {
    if (isKeywordInvalid) {
      return (
        <SectionContainer padding="80px 20px">
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <h2 style={{ marginBottom: '16px', color: 'var(--forest-green-main)' }}>요청한 지역 또는 시공 서비스를 찾을 수 없습니다.</h2>
            <p style={{ marginBottom: '24px', opacity: 0.8 }}>등록된 지역과 서비스는 통합 페이지에서 확인해 주세요.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <PrimaryButton onClick={() => navigate('/')}>메인으로 돌아가기</PrimaryButton>
              <SecondaryButton onClick={() => navigate('/sitemap-seoul')}>지역 시공안내 보기</SecondaryButton>
            </div>
          </div>
        </SectionContainer>
      );
    }

    // B: Sitemap Hub Page (/sitemap-seoul)
    if (path === '/sitemap-seoul') {
      return (
        <SectionContainer padding="60px 20px">
          {/* Header titles */}
          <div style={{ textAlign: 'left', marginBottom: '40px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--forest-green-sub)', letterSpacing: '1px', fontWeight: 'bold' }}>
              SEO DIRECTORY
            </span>
            <h1 style={{ marginTop: '8px', marginBottom: '16px', fontSize: '2.5rem' }}>
              수도권 탄성코트·줄눈시공<br />지역별 페이지 안내
            </h1>
            <p style={{ opacity: 0.8, maxWidth: '720px', lineHeight: 1.6, fontSize: '1.05rem' }}>
              서울·경기·인천 주요 시·구·읍·면·동 단위의 탄성코트 및 줄눈시공 서비스 페이지를 확인할 수 있습니다.
            </p>
          </div>

          {/* Database parameters display cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'repeat(5, 1fr)' : 'repeat(2, 1fr)',
            gap: '16px',
            marginBottom: '40px'
          }}>
            {[
              { label: '등록된 행정구역', value: `${metrics.uniqueDistricts.length} 개 시/구` },
              { label: '등록된 동 단위', value: `${metrics.dongsCount} 개 동` },
              { label: '등록 전체 지역명', value: `${metrics.totalRegionsCount} 개` },
              { label: '등록 작업명', value: `${metrics.totalTasksCount} 개` },
              { label: '생성 가능 전체 URL', value: `${metrics.totalUrlsCount.toLocaleString()} 개` }
            ].map((m, idx) => (
              <div key={idx} style={{
                backgroundColor: 'var(--white)',
                border: '1px solid var(--light-sand)',
                padding: '16px',
                borderRadius: '4px',
                textAlign: 'left'
              }}>
                <span style={{ fontSize: '0.8rem', opacity: 0.7, display: 'block', marginBottom: '4px' }}>{m.label}</span>
                <span style={{ fontSize: '1.15rem', fontWeight: 'bold', color: 'var(--forest-green-main)' }}>{m.value}</span>
              </div>
            ))}
          </div>

          {/* Real-time search filters */}
          <div style={{
            backgroundColor: 'var(--light-sand)',
            padding: '24px',
            borderRadius: '6px',
            marginBottom: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['전체', '탄성코트', '줄눈시공'].map(btn => (
                <button
                  key={btn}
                  onClick={() => setSitemapFilter(btn)}
                  style={{
                    padding: '8px 24px',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    backgroundColor: sitemapFilter === btn ? 'var(--forest-green-main)' : 'var(--white)',
                    color: sitemapFilter === btn ? 'var(--white)' : 'var(--charcoal-text)',
                    border: '1px solid var(--sand-beige)'
                  }}
                >
                  {btn}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', borderTop: '1px dashed var(--sand-beige)', paddingTop: '16px' }}>
              {['전체', '서울', '인천', '경기'].map(btn => (
                <button
                  key={btn}
                  onClick={() => setMetroFilter(btn)}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    backgroundColor: metroFilter === btn ? 'var(--forest-green-sub)' : 'var(--white)',
                    color: metroFilter === btn ? 'var(--white)' : 'var(--charcoal-text)',
                    border: '1px solid var(--sand-beige)'
                  }}
                >
                  {btn} 권역
                </button>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
              gap: '16px'
            }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '6px' }}>지역명 검색</label>
                <input
                  type="text"
                  placeholder="예: 화곡본동, 강남구, 역삼동"
                  value={regionSearch}
                  onChange={(e) => setRegionSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid var(--sand-beige)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '6px' }}>작업명 검색</label>
                <input
                  type="text"
                  placeholder="예: 탄성코트업체, 욕실줄눈시공"
                  value={taskSearch}
                  onChange={(e) => setTaskSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid var(--sand-beige)',
                    fontSize: '0.95rem'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Quick jump to cities */}
          <div style={{ textAlign: 'left', marginBottom: '40px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '0.95rem', color: 'var(--forest-green-sub)' }}>시/구 빠른 이동</h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {metrics.uniqueDistricts.map(dist => (
                <a
                  key={dist}
                  href={`#city-${dist}`}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--light-sand)',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    color: 'var(--charcoal-text)'
                  }}
                >
                  {dist}
                </a>
              ))}
            </div>
          </div>

          {/* Bulk accordion buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', justifyContent: 'flex-end' }}>
            <SecondaryButton style={{ minHeight: '36px', padding: '6px 16px', fontSize: '0.85rem' }} onClick={() => handleToggleAll(true)}>
              모두 펼치기
            </SecondaryButton>
            <SecondaryButton style={{ minHeight: '36px', padding: '6px 16px', fontSize: '0.85rem' }} onClick={() => handleToggleAll(false)}>
              모두 접기
            </SecondaryButton>
          </div>

          {/* Hierarchical links listing */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {Object.keys(metrics.metroGroups).map(metroKey => {
              const metroVal = metroFilter === '서울' ? '서울권' : (metroFilter === '경기' ? '경기권' : (metroFilter === '인천' ? '인천권' : '전체'));
              if (metroFilter !== '전체' && metroKey !== metroVal) return null;

              const metro = metrics.metroGroups[metroKey];
              return (
                <div key={metroKey} style={{ textAlign: 'left' }}>
                  <h2 style={{
                    fontSize: '1.6rem',
                    color: 'var(--forest-green-main)',
                    borderBottom: '2px solid var(--forest-green-main)',
                    paddingBottom: '8px',
                    marginBottom: '20px'
                  }}>{metro.label}</h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {Object.keys(metro.cities).map(cityKey => {
                      const city = metro.cities[cityKey];
                      
                      // Count children
                      let childCount = 0;
                      let keywordLinkCount = 0;
                      Object.keys(city.districts).forEach(dk => {
                        childCount += city.districts[dk].regions.length;
                        keywordLinkCount += city.districts[dk].regions.length * 12;
                      });

                      const isOpen = !!openDistricts[cityKey];

                      return (
                        <div
                          key={cityKey}
                          id={`city-${cityKey}`}
                          style={{
                            border: '1px solid var(--light-sand)',
                            backgroundColor: 'var(--white)',
                            borderRadius: '6px',
                            overflow: 'hidden'
                          }}
                        >
                          {/* City header toggle */}
                          <button
                            onClick={() => toggleDistrict(cityKey)}
                            style={{
                              width: '100%',
                              padding: '20px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              backgroundColor: 'var(--white)',
                              border: 'none',
                              fontWeight: 'bold',
                              fontSize: '1.1rem',
                              color: 'var(--forest-green-main)',
                              cursor: 'pointer'
                            }}
                          >
                            <div>
                              <span>{cityKey}</span>
                              <span style={{ fontSize: '0.85rem', fontWeight: 'normal', opacity: 0.7, marginLeft: '10px' }}>
                                (하위 지역: {childCount}개 / 검색 지역명: {childCount}개 / 최종 링크: {keywordLinkCount.toLocaleString()}개)
                              </span>
                            </div>
                            <span>{isOpen ? '−' : '+'}</span>
                          </button>

                          {/* Accordion body */}
                          {isOpen && (
                            <div style={{
                              borderTop: '1px solid var(--light-sand)',
                              padding: '24px',
                              backgroundColor: 'var(--warm-white)'
                            }}>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {Object.keys(city.districts).map(distKey => {
                                  const district = city.districts[distKey];
                                  return (
                                    <div key={distKey}>
                                      {distKey !== '전체' && (
                                        <h3 style={{
                                          fontSize: '1.05rem',
                                          color: 'var(--forest-green-sub)',
                                          borderLeft: '4px solid var(--forest-green-sub)',
                                          paddingLeft: '8px',
                                          marginBottom: '14px',
                                          fontWeight: 'bold'
                                        }}>{distKey}</h3>
                                      )}
                                      
                                      <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
                                        gap: '12px'
                                      }}>
                                        {district.regions.map(reg => {
                                          const isRegionMatched = reg.displayName.includes(regionSearch) || reg.officialName.includes(regionSearch);
                                          if (!isRegionMatched) return null;

                                          const isDongOpen = !!openDistricts[`dong-${reg.id}`];

                                          return (
                                            <div
                                              key={reg.id}
                                              style={{
                                                border: '1px solid var(--light-sand)',
                                                borderRadius: '4px',
                                                backgroundColor: 'var(--white)',
                                                padding: '12px 16px'
                                              }}
                                            >
                                              <div
                                                onClick={() => setOpenDistricts(prev => ({ ...prev, [`dong-${reg.id}`]: !prev[`dong-${reg.id}`] }))}
                                                style={{
                                                  display: 'flex',
                                                  justifyContent: 'space-between',
                                                  alignItems: 'center',
                                                  cursor: 'pointer',
                                                  fontWeight: '600',
                                                  color: 'var(--charcoal-text)',
                                                  fontSize: '0.9rem'
                                                }}
                                              >
                                                <span>{reg.name}</span>
                                                <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{isDongOpen ? '접기' : '키워드 링크 보기 (12)'}</span>
                                              </div>

                                              {isDongOpen && (
                                                <div style={{
                                                  marginTop: '12px',
                                                  paddingTop: '12px',
                                                  borderTop: '1px dashed var(--light-sand)',
                                                  display: 'flex',
                                                  flexDirection: 'column',
                                                  gap: '6px'
                                                }}>
                                                  {serviceKeywords.map(tk => {
                                                    const isFilterMatched = sitemapFilter === '전체' || tk.serviceGroup === (sitemapFilter === '탄성코트' ? 'elastic' : 'grout');
                                                    const isTaskSearchMatched = tk.keyword.includes(taskSearch);
                                                    if (!isFilterMatched || !isTaskSearchMatched) return null;

                                                    return (
                                                      <a
                                                        key={tk.keyword}
                                                        href={generateDynamicUrl(reg.urlRegion, tk.keyword)}
                                                        style={{
                                                          fontSize: '0.85rem',
                                                          color: 'var(--forest-green-sub)',
                                                          textDecoration: 'none',
                                                          padding: '4px 0'
                                                        }}
                                                      >
                                                        {reg.displayName} {tk.keyword}
                                                      </a>
                                                    );
                                                  })}
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back to top links */}
          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <a href="#" style={{ fontSize: '0.9rem', color: 'var(--forest-green-sub)', textDecoration: 'underline' }}>
              상단으로 바로 가기 ↑
            </a>
          </div>
        </SectionContainer>
      );
    }

    if (path === '/privacy-policy') {
      return <PrivacyPolicyPage onNavigate={navigate} currentPath={path} />;
    }

    if (path === '/terms') {
      return <TermsPage onNavigate={navigate} currentPath={path} />;
    }

    // C: Main Page & Dynamic Landing Page
    return (
      <>
        {parsedKeyword && isDesktop && (
          <div className="dynamic-notice-bar" style={{ backgroundColor: 'var(--light-sand)', padding: '12px 20px', textAlign: 'center', fontSize: '0.9rem' }}>
            <span className="notice-pc-only" style={{ display: 'inline' }}>
              <strong>{parsedKeyword.region.displayName}</strong> 지역을 위한 맞춤형 <strong>{parsedKeyword.service.keyword}</strong> 제안입니다.
            </span>
          </div>
        )}

        {/* 1. HERO SECTION */}
        <NeoCoatHero parsedKeyword={parsedKeyword} onNavigate={navigate} />

        {/* 2. TRUST STRIP & PROBLEM DIAGNOSIS SECTIONS */}
        <NeoCoatTrustStrip />
        <NeoCoatDiagnosis parsedKeyword={parsedKeyword} />

        {/* 3. SERVICES SELECTION & SPACES MAPPING SECTIONS */}
        <NeoCoatServices
          activeTab={serviceTab}
          onTabChange={setServiceTab}
          parsedKeyword={parsedKeyword}
          onNavigate={navigate}
        />
        <NeoCoatSpaces
          activeTab={serviceTab}
          parsedKeyword={parsedKeyword}
        />

        {/* 4. NEO COAT STANDARD */}
        <NeoCoatStandard />

        {/* 5. CASES SECTION (Conditional Rendering via featureConfig) */}
        {featureConfig.caseStudies && (
          <NeoCoatCases
            activeTab={serviceTab}
            onTabChange={setServiceTab}
            parsedKeyword={parsedKeyword}
          />
        )}

        {/* 6. TECHNICAL FAQ SECTION */}
        <NeoCoatFaq
          parsedKeyword={parsedKeyword}
          onNavigate={navigate}
        />

        {/* 8. FINAL CTA SECTION */}
        <NeoCoatFinalCTA
          parsedKeyword={parsedKeyword}
          onNavigate={navigate}
        />

        {/* 9. INTERNAL LINKING SECTION */}
        {parsedKeyword && (
          <SectionContainer background="white" padding="40px 20px">
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {relatedServicesLinks && relatedServicesLinks.length > 0 && (
                <div>
                  <h4 style={{ marginBottom: '12px', fontSize: '1rem', color: 'var(--forest-green-sub)' }}>관련 서비스 정보</h4>
                  <div className="linking-links-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {(isDesktop || showMoreServices ? relatedServicesLinks : relatedServicesLinks.slice(0, 4)).map((link, idx) => (
                      <a
                        key={idx}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          const url = new URL(e.target.href);
                          navigate('/', url.search.substring(1));
                        }}
                        style={{
                          fontSize: '0.85rem',
                          padding: '6px 12px',
                          border: '1px solid var(--light-sand)',
                          borderRadius: '4px',
                          backgroundColor: 'var(--warm-white)',
                          color: 'var(--charcoal-text)'
                        }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                  {!isDesktop && relatedServicesLinks.length > 4 && (
                    <button
                      type="button"
                      onClick={() => setShowMoreServices(!showMoreServices)}
                      style={{
                        marginTop: '12px',
                        padding: '6px 12px',
                        fontSize: '0.82rem',
                        fontWeight: '600',
                        color: 'var(--forest-green-main)',
                        backgroundColor: 'transparent',
                        border: '1px solid var(--light-sand)',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {showMoreServices ? '관련 서비스 접기' : '관련 서비스 더 보기'}
                    </button>
                  )}
                </div>
              )}

              {relatedRegionsLinks && relatedRegionsLinks.length > 0 && (
                <div>
                  <h4 style={{ marginBottom: '12px', fontSize: '1rem', color: 'var(--forest-green-sub)' }}>인근 시공 지역 바로가기</h4>
                  <div className="linking-links-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {(isDesktop || showMoreRegions ? relatedRegionsLinks : relatedRegionsLinks.slice(0, 4)).map((link, idx) => (
                      <a
                        key={idx}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          const url = new URL(e.target.href);
                          navigate('/', url.search.substring(1));
                        }}
                        style={{
                          fontSize: '0.85rem',
                          padding: '6px 12px',
                          border: '1px solid var(--light-sand)',
                          borderRadius: '4px',
                          backgroundColor: 'var(--warm-white)',
                          color: 'var(--charcoal-text)'
                        }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                  {!isDesktop && relatedRegionsLinks.length > 4 && (
                    <button
                      type="button"
                      onClick={() => setShowMoreRegions(!showMoreRegions)}
                      style={{
                        marginTop: '12px',
                        padding: '6px 12px',
                        fontSize: '0.82rem',
                        fontWeight: '600',
                        color: 'var(--forest-green-main)',
                        backgroundColor: 'transparent',
                        border: '1px solid var(--light-sand)',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      {showMoreRegions ? '인근 지역 접기' : '인근 지역 더 보기'}
                    </button>
                  )}
                </div>
              )}
            </div>
          </SectionContainer>
        )}

        {/* Dynamic SEO section container */}
        {parsedKeyword && (
          <SEOContentSection keywordInfo={{ region: parsedKeyword.region.displayName, service: parsedKeyword.service.keyword }} />
        )}
      </>
    );
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NeoCoatHeader onNavigate={navigate} currentPath={path} onMenuOpenChange={setIsMobileMenuOpen} />
      <main style={{ 
        flex: 1,
        paddingBottom: (path !== '/sitemap-seoul' && !isDesktop) ? 'calc(58px + env(safe-area-inset-bottom) + 16px)' : '0px'
      }}>
        {renderContent()}
      </main>
      <NeoCoatFooter onNavigate={navigate} isSimple={path === '/sitemap-seoul'} />
      {/* NeoCoat Mobile Sticky CTA */}
      {path !== '/sitemap-seoul' && !isMobileMenuOpen && (
        <NeoCoatMobileStickyCTA parsedKeyword={parsedKeyword} onNavigate={navigate} />
      )}
    </div>
  );
}

export default App;
