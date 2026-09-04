import { getSeoMetadata } from './seoTemplates.js';
import { getDiagnosisItems } from './diagnosisContent.js';
import { getServicesByGroupAndTask, getSpacesByGroupAndTask } from './serviceSpaceContent.js';
import { WORK_STANDARD_CONTENT } from './processData.js';
import { getFaqItems } from './faqData.js';
import { getActiveRegions, generateDynamicUrl } from './regionResolver.js';
import { serviceContent } from './serviceContent.js';
import { brandConfig } from '../config/brandConfig.js';

/**
 * Pure generator for Hero Content
 */
export function getHeroContent(parsedKeyword) {
  const isDynamic = !!parsedKeyword;
  const regionName = isDynamic ? parsedKeyword.region.displayName : '';
  const taskName = isDynamic ? parsedKeyword.service.keyword : '';
  const serviceGroup = isDynamic ? (parsedKeyword.service.serviceGroup === 'elastic' ? 'elasticCoat' : 'grout') : 'main';

  const currentServiceInfo = isDynamic && serviceContent[taskName] ? serviceContent[taskName] : null;

  const heroBadgeLabel = isDynamic
    ? `${regionName} ${taskName} 시공 안내`
    : brandConfig.businessType;

  const heroTitlePrefix = isDynamic ? `${regionName} ${taskName}` : '공간을 오래 지키는';
  const heroTitleSuffix = isDynamic ? '공간 상태부터 확인하고 시공합니다' : '새로운 코팅 기준';
  const heroH1Text = isDynamic ? `${regionName} ${taskName}, 공간 상태부터 확인하고 시공합니다` : '공간을 오래 지키는 새로운 코팅 기준';

  const heroDescription = isDynamic
    ? (currentServiceInfo ? currentServiceInfo.heroDescriptionTemplate : '공간에 필요한 작업 범위를 정확히 확인하고 세대 환경에 부합하는 마감 시공을 안내합니다.')
    : '베란다와 세탁실의 벽면 상태부터 욕실과 현관의 타일 틈까지, 공간에 필요한 작업 범위를 확인하고 적합한 시공 방향을 안내합니다.';

  const imageInfoLabel = isDynamic
    ? (serviceGroup === 'elasticCoat' ? '벽면 상태 확인부터 마감까지' : '타일 틈 상태 확인부터 마감까지')
    : '탄성코트·줄눈시공 전문 케어';

  const qualityBadge = isDynamic
    ? (serviceGroup === 'elasticCoat' ? '바탕 상태 확인' : '기존 줄눈 상태 확인')
    : '공정별 체크';

  const imageAltText = isDynamic
    ? `${regionName} ${taskName} 시공 이미지`
    : `${brandConfig.brandName} 탄성코트 및 줄눈시공 대표 이미지`;

  return {
    isDynamic,
    regionName,
    taskName,
    serviceGroup,
    heroBadgeLabel,
    heroTitlePrefix,
    heroTitleSuffix,
    heroH1Text,
    heroDescription,
    imageInfoLabel,
    qualityBadge,
    imageAltText
  };
}

/**
 * Pure generator for Internal Links
 */
export function getInternalLinks(parsedKeyword) {
  if (!parsedKeyword) return null;

  const relatedServices = parsedKeyword.service.relatedServices ? parsedKeyword.service.relatedServices.map(task => ({
    label: `${parsedKeyword.region.name} ${task}`,
    href: generateDynamicUrl(parsedKeyword.region.urlRegion, task)
  })) : [];

  const nearbyRegions = getActiveRegions().filter(
    r => r.parentId === parsedKeyword.region.parentId && r.id !== parsedKeyword.region.id
  ).slice(0, 6).map(reg => ({
    label: `${reg.name} ${parsedKeyword.service.keyword}`,
    href: generateDynamicUrl(reg.urlRegion, parsedKeyword.service.keyword)
  }));

  return {
    relatedServices,
    nearbyRegions
  };
}

/**
 * Master Aggregator Function for Dynamic Page Model (Pure Function)
 */
export function getDynamicPageModel({ parsedKeyword, path = '/', isNotFound = false }) {
  const metadata = getSeoMetadata({ parsedKeyword, path, isNotFound });
  const hero = getHeroContent(isNotFound ? null : parsedKeyword);
  const diagnosisItems = getDiagnosisItems(isNotFound ? null : parsedKeyword);
  
  const serviceGroup = parsedKeyword ? (parsedKeyword.service.serviceGroup === 'elastic' ? 'elasticCoat' : 'grout') : 'elasticCoat';
  const taskName = parsedKeyword ? parsedKeyword.service.keyword : null;

  const services = getServicesByGroupAndTask(serviceGroup, taskName);
  const spaces = getSpacesByGroupAndTask(serviceGroup, taskName);
  const faqItems = getFaqItems(isNotFound ? null : parsedKeyword);
  const internalLinks = getInternalLinks(isNotFound ? null : parsedKeyword);

  return {
    metadata,
    hero,
    diagnosis: {
      title: '표면의 문제보다 발생 원인을 먼저 확인합니다',
      intro: '곰팡이와 오염, 도막 들뜸이나 줄눈 변색은 공간의 습도와 사용 환경, 기존 마감 상태에 따라 원인이 달라질 수 있습니다. 시공 전 현재 상태와 작업 범위를 구분해서 확인해야 합니다.',
      items: diagnosisItems
    },
    services,
    spaces,
    standard: WORK_STANDARD_CONTENT,
    faq: {
      title: '자주 묻는 질문',
      intro: '공간 상태와 기존 마감에 따라 작업 범위와 사용 가능 시점이 달라질 수 있습니다. 상담 전에 자주 확인하는 내용을 살펴보세요.',
      items: faqItems
    },
    internalLinks
  };
}
