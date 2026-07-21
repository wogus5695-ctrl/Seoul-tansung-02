import { serviceKeywords } from './serviceKeywords.js';

export const workTypes = serviceKeywords.map(item => ({
  id: item.keyword,
  keyword: item.keyword,
  serviceGroup: item.serviceGroup === 'elastic' ? 'elasticCoat' : 'grout',
  searchIntent: item.searchIntent,
  primarySpace: item.primarySpace,
  relatedServices: item.relatedServices,
  imagePlaceholderKey: item.imagePlaceholderKey,
}));
