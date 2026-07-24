import { siteConfig, seoImages } from '../config.js';
import { brandConfig } from '../config/brandConfig.js';
import { getFaqItems } from './faqData.js';

/**
 * 네오코트 동적 SEO 메타데이터 및 구조화 데이터 전용 템플릿 마스터 (seoTemplates.js)
 */

export const SEO_MASTERS = {
  main: {
    title: "서울·인천·경기 탄성코트·줄눈시공 | 네오코트",
    description: "베란다·세탁실 탄성코트와 욕실·현관 줄눈시공을 상담하는 네오코트입니다. 기존 마감 상태와 공간 환경을 확인하고 필요한 작업 범위를 안내합니다.",
    h1: "공간을 오래 지키는 새로운 코팅 기준"
  },
  sitemapHub: {
    title: "서울·인천·경기 탄성코트·줄눈시공 지역 안내 | 네오코트",
    description: "네오코트의 서울·인천·경기 지역별 탄성코트와 줄눈시공 안내 페이지를 확인할 수 있는 통합 지역 서비스 목록입니다.",
    h1: "서울·인천·경기 지역별 서비스 안내"
  },
  privacyPolicy: {
    title: "개인정보처리방침 | 네오코트",
    description: "네오코트 홈페이지의 상담 문의 과정에서 수집되는 개인정보의 처리 기준을 안내합니다.",
    h1: "개인정보처리방침"
  },
  terms: {
    title: "이용약관 | 네오코트",
    description: "네오코트 홈페이지와 상담 서비스 이용에 필요한 기본 사항을 안내합니다.",
    h1: "서비스 이용약관"
  },
  notFound: {
    title: "페이지를 찾을 수 없습니다 | 네오코트",
    description: "요청하신 페이지가 존재하지 않거나 주소가 변경되었습니다.",
    h1: "페이지를 찾을 수 없습니다"
  }
};

/**
 * 작업명별 Title 생성 규칙 (문법 중복 완벽 제거)
 */
export function getWorkTypeTitle(displayRegion, workType) {
  switch (workType) {
    case '탄성코트':
      return `${displayRegion} 탄성코트 시공 안내 | 네오코트`;
    case '탄성코트시공':
      return `${displayRegion} 탄성코트 시공 상담 | 네오코트`;
    case '베란다탄성코트':
      return `${displayRegion} 베란다 탄성코트 | 네오코트`;
    case '세탁실탄성코트':
      return `${displayRegion} 세탁실 탄성코트 | 네오코트`;
    case '아파트탄성코트':
      return `${displayRegion} 아파트 탄성코트 | 네오코트`;
    case '탄성코트업체':
      return `${displayRegion} 탄성코트 업체 상담 | 네오코트`;
    case '줄눈시공':
      return `${displayRegion} 줄눈시공 안내 | 네오코트`;
    case '욕실줄눈시공':
      return `${displayRegion} 욕실 줄눈시공 | 네오코트`;
    case '현관줄눈시공':
      return `${displayRegion} 현관 줄눈시공 | 네오코트`;
    case '베란다줄눈시공':
      return `${displayRegion} 베란다 줄눈시공 | 네오코트`;
    case '화장실줄눈시공':
      return `${displayRegion} 화장실 줄눈시공 | 네오코트`;
    case '줄눈시공업체':
      return `${displayRegion} 줄눈시공 업체 상담 | 네오코트`;
    default:
      return `${displayRegion} ${workType} | 네오코트`;
  }
}

/**
 * 작업명별 Meta Description 생성 규칙
 */
export function getWorkTypeDescription(displayRegion, workType, serviceGroup) {
  switch (workType) {
    case '베란다탄성코트':
      return `${displayRegion} 베란다 탄성코트 상담이 필요하신가요? 벽면의 곰팡이와 오염, 기존 도막의 들뜸과 결로 흔적을 확인하고 필요한 작업 범위를 안내합니다.`;
    case '세탁실탄성코트':
      return `${displayRegion} 세탁실 탄성코트 상담이 필요하신가요? 물 사용과 건조가 반복되는 공간의 습기, 오염, 기존 벽면 상태를 확인합니다.`;
    case '아파트탄성코트':
      return `${displayRegion} 아파트 탄성코트 시공을 알아보고 계신가요? 베란다·세탁실·실외기실 등 공간별 벽면 상태에 맞춰 작업 범위를 안내합니다.`;
    case '욕실줄눈시공':
      return `${displayRegion} 욕실 줄눈시공 상담이 필요하신가요? 타일 틈의 오염과 기존 백시멘트 상태, 물 사용 환경을 확인하고 시공 범위를 안내합니다.`;
    case '현관줄눈시공':
      return `${displayRegion} 현관 줄눈시공을 알아보고 계신가요? 먼지와 신발 오염이 쌓이기 쉬운 바닥 타일 틈과 기존 줄눈 상태를 확인합니다.`;
    case '화장실줄눈시공':
      return `${displayRegion} 화장실 줄눈시공 상담이 필요하신가요? 바닥과 벽면 타일 틈의 오염과 기존 마감 상태를 확인하고 필요한 작업 범위를 안내합니다.`;
    default:
      if (serviceGroup === 'elastic') {
        return `${displayRegion} ${workType} 상담이 필요하신가요? 베란다·세탁실·실외기실의 기존 벽면과 오염 상태를 확인하고 보양부터 바탕 정리와 마감까지 필요한 작업 범위를 안내합니다.`;
      } else {
        return `${displayRegion} ${workType} 상담이 필요하신가요? 욕실·화장실·현관의 기존 백시멘트와 타일 틈 상태를 확인하고 공간에 맞는 줄눈시공 범위를 안내합니다.`;
      }
  }
}

/**
 * 통합 SEO 메타데이터 및 구조화 데이터 추출 함수
 */
export function getSeoMetadata({ pageType, parsedKeyword, path = '/', isNotFound = false }) {
  const baseUrl = (siteConfig.siteUrl ? siteConfig.siteUrl.replace(/\/$/, '') : '') || 'https://www.neocoat.co.kr';

  const defaultOgPath = seoImages.defaultOgImage || "/images/seo/neocoat-search-thumbnail.jpg";
  const defaultOgImage = defaultOgPath.startsWith('http') ? defaultOgPath : `${baseUrl}${defaultOgPath}`;
  const ogImageWidth = 1200;
  const ogImageHeight = 1200;
  const ogImageType = "image/jpeg";
  const ogImageAlt = "탄성코트와 줄눈 전문 시공 네오코트";

  // 1. 404 또는 잘못된 k값
  if (isNotFound) {
    return {
      title: SEO_MASTERS.notFound.title,
      description: SEO_MASTERS.notFound.description,
      canonical: `${baseUrl}${path}`,
      robots: "noindex,nofollow",
      ogTitle: SEO_MASTERS.notFound.title,
      ogDescription: SEO_MASTERS.notFound.description,
      ogUrl: `${baseUrl}${path}`,
      ogImage: defaultOgImage,
      ogImageWidth,
      ogImageHeight,
      ogImageType,
      ogImageAlt,
      h1: SEO_MASTERS.notFound.h1,
      faqJsonLd: null
    };
  }

  // 2. 통합 허브 (/sitemap-seoul)
  if (path === '/sitemap-seoul') {
    return {
      title: SEO_MASTERS.sitemapHub.title,
      description: SEO_MASTERS.sitemapHub.description,
      canonical: `${baseUrl}/sitemap-seoul`,
      robots: "index,follow",
      ogTitle: SEO_MASTERS.sitemapHub.title,
      ogDescription: SEO_MASTERS.sitemapHub.description,
      ogUrl: `${baseUrl}/sitemap-seoul`,
      ogImage: defaultOgImage,
      ogImageWidth,
      ogImageHeight,
      ogImageType,
      ogImageAlt,
      h1: SEO_MASTERS.sitemapHub.h1,
      faqJsonLd: null
    };
  }

  // 3. 개인정보처리방침 (/privacy-policy)
  if (path === '/privacy-policy') {
    return {
      title: SEO_MASTERS.privacyPolicy.title,
      description: SEO_MASTERS.privacyPolicy.description,
      canonical: `${baseUrl}/privacy-policy`,
      robots: "index,follow",
      ogTitle: SEO_MASTERS.privacyPolicy.title,
      ogDescription: SEO_MASTERS.privacyPolicy.description,
      ogUrl: `${baseUrl}/privacy-policy`,
      ogImage: defaultOgImage,
      ogImageWidth,
      ogImageHeight,
      ogImageType,
      ogImageAlt,
      h1: SEO_MASTERS.privacyPolicy.h1,
      faqJsonLd: null
    };
  }

  // 4. 이용약관 (/terms)
  if (path === '/terms') {
    return {
      title: SEO_MASTERS.terms.title,
      description: SEO_MASTERS.terms.description,
      canonical: `${baseUrl}/terms`,
      robots: "index,follow",
      ogTitle: SEO_MASTERS.terms.title,
      ogDescription: SEO_MASTERS.terms.description,
      ogUrl: `${baseUrl}/terms`,
      ogImage: defaultOgImage,
      ogImageWidth,
      ogImageHeight,
      ogImageType,
      ogImageAlt,
      h1: SEO_MASTERS.terms.h1,
      faqJsonLd: null
    };
  }

  // 5. 동적 랜딩 페이지 (parsedKeyword 및 유효 k값 존재)
  if (parsedKeyword) {
    const regionName = parsedKeyword.region.displayName;
    const workType = parsedKeyword.service.keyword;
    const serviceGroup = parsedKeyword.service.serviceGroup;
    const routeKey = parsedKeyword.region.routeKey;

    const title = getWorkTypeTitle(regionName, workType);
    const description = getWorkTypeDescription(regionName, workType, serviceGroup);
    const canonical = `${baseUrl}/?k=${encodeURIComponent(`${routeKey}-${workType}`)}`;

    const groupOgPath = serviceGroup === 'elastic' ? seoImages.elasticCoatOgImage : seoImages.groutOgImage;
    const ogImg = groupOgPath
      ? (groupOgPath.startsWith('http') ? groupOgPath : `${baseUrl}${groupOgPath}`)
      : defaultOgImage;

    // 화면 FAQ와 100% 동일한 FAQPage JSON-LD 생성
    const faqItems = getFaqItems(parsedKeyword);
    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    };

    return {
      title,
      description,
      canonical,
      robots: "index,follow",
      ogTitle: title,
      ogDescription: description,
      ogUrl: canonical,
      ogImage: ogImg,
      ogImageWidth,
      ogImageHeight,
      ogImageType,
      ogImageAlt,
      h1: `${regionName} ${workType}`,
      faqJsonLd
    };
  }

  // 6. 메인 페이지 기본값 (Fallback)
  const mainFaqItems = getFaqItems(null);
  const mainFaqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": mainFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return {
    title: SEO_MASTERS.main.title,
    description: SEO_MASTERS.main.description,
    canonical: `${baseUrl}/`,
    robots: "index,follow",
    ogTitle: SEO_MASTERS.main.title,
    ogDescription: SEO_MASTERS.main.description,
    ogUrl: `${baseUrl}/`,
    ogImage: defaultOgImage,
    ogImageWidth,
    ogImageHeight,
    ogImageType,
    ogImageAlt,
    h1: SEO_MASTERS.main.h1,
    faqJsonLd: mainFaqJsonLd
  };
}
