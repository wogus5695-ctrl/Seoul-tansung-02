import { brandConfig } from './config/brandConfig.js';
import { contactConfig } from './config/contactConfig.js';
import { imageConfig } from './config/imageConfig.js';

export { brandConfig, contactConfig, imageConfig };

// 네오코트 공통 사이트 설정 (siteConfig)
export const siteConfig = {
  siteUrl: contactConfig.siteUrl || "", // 환경변수 또는 domain 설정값 (미설정 시 상대경로/현재 origin 사용)
  siteName: brandConfig.brandName || "네오코트",
  englishName: brandConfig.englishName || "Neo Coat",
  defaultLocale: "ko_KR",

  // 기존 호환성 필드
  brandName: brandConfig.brandName,
  phoneNumber: contactConfig.phone,
  consultationUrl: contactConfig.kakaoUrl,
  businessInformation: contactConfig.businessNumber ? `${contactConfig.representative} | 사업자등록번호: ${contactConfig.businessNumber}` : '',
  operatingHours: contactConfig.operatingHours,
  pricingPlaceholder: '상담 시 안내',
  warrantyPlaceholder: '시공 후 개별 안내',
};

// SEO 독립 이미지 필드 분리 관리 (seoImages)
export const seoImages = {
  searchThumbnail: imageConfig.searchThumbnail || "/images/seo/neocoat-search-thumbnail.jpg",
  defaultOgImage: imageConfig.ogImage || "/images/seo/neocoat-search-thumbnail.jpg",
  elasticCoatOgImage: "",
  groutOgImage: "",
  logoImage: imageConfig.logoImage || "",
  faviconImage: imageConfig.faviconImage || "",
};

export const siteImages = {
  hero: imageConfig.heroImage || null,
  searchThumbnail: imageConfig.searchThumbnail || null,
  elasticServiceBefore: null,
  elasticServiceAfter: null,
  elasticClosetBefore: null,
  elasticClosetAfter: null,
  groutHero: null,
  groutPanel: null,
  groutBefore: null,
  groutAfter: null,
  process01: null,
  portfolio01: null,
};

export const featureConfig = {
  caseStudies: false
};

