import { keywordMetadata } from './keywordMetadata.js';

export const regionRoutes = keywordMetadata.map(item => ({
  regionId: item.regionId,
  regionName: item.displayRegion,
  parentRegionName: item.parentRegion,
  regionLevel: item.type,
  routeKey: item.routeKey,
  legacySlug: item.legacySlug || null,
}));
