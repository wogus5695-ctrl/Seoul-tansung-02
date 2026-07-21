/**
 * 서비스 및 공간별 적용 범위 마스터 콘텐츠 및 작업명별 우선순위 매핑 데이터
 */

// 1. 탄성코트 서비스 데이터 (대표 1 + 보조 3)
export const ELASTIC_SERVICES = {
  "balconyElasticCoat": {
    id: "balconyElasticCoat",
    title: "베란다 탄성코트",
    description: "결로와 습기, 기존 도막의 오염과 들뜸이 발생하기 쉬운 베란다 벽면 상태를 확인하고 필요한 바탕 정리와 마감 범위를 안내합니다.",
    checkpoints: ["벽면 오염", "기존 도막", "결로 흔적", "표면 들뜸"],
    group: "elasticCoat"
  },
  "laundryElasticCoat": {
    id: "laundryElasticCoat",
    title: "세탁실 탄성코트",
    description: "물 사용과 건조가 반복되는 세탁실의 습기, 오염, 기존 벽면 상태를 확인한 뒤 작업 범위를 구분합니다.",
    group: "elasticCoat"
  },
  "apartmentElasticCoat": {
    id: "apartmentElasticCoat",
    title: "아파트 탄성코트",
    description: "신축과 구축 아파트의 베란다·세탁실·실외기실 등 공간별 벽면 상태에 맞춰 시공 범위를 확인합니다.",
    group: "elasticCoat"
  },
  "elasticCoatConsulting": {
    id: "elasticCoatConsulting",
    title: "공간별 탄성코트 상담",
    description: "대피공간과 실외기실, 다용도실 등 사용 환경이 다른 공간의 상태를 확인하고 적용 가능 여부를 안내합니다.",
    group: "elasticCoat"
  }
};

// 2. 줄눈시공 서비스 데이터 (대표 1 + 보조 3)
export const GROUT_SERVICES = {
  "bathroomGrout": {
    id: "bathroomGrout",
    title: "욕실·화장실 줄눈시공",
    description: "물과 세정제에 반복적으로 노출되는 욕실과 화장실 타일 틈의 오염, 마모, 기존 백시멘트 상태를 확인합니다.",
    checkpoints: ["기존 백시멘트", "타일 틈 오염", "균열과 탈락", "물 사용 환경"],
    group: "grout"
  },
  "entranceGrout": {
    id: "entranceGrout",
    title: "현관 줄눈시공",
    description: "외부 먼지와 신발 오염이 쌓이기 쉬운 현관 바닥 타일의 기존 줄눈 상태와 작업 범위를 확인합니다.",
    group: "grout"
  },
  "balconyGrout": {
    id: "balconyGrout",
    title: "베란다 줄눈시공",
    description: "먼지와 물기에 노출되는 베란다 바닥의 타일 틈 상태를 확인하고 줄눈 적용 범위를 안내합니다.",
    group: "grout"
  },
  "groutConsulting": {
    id: "groutConsulting",
    title: "공간별 줄눈시공 상담",
    description: "타일 종류와 기존 마감 상태, 공간별 사용 환경을 확인한 뒤 줄눈시공 가능 범위를 구분합니다.",
    group: "grout"
  }
};

// 3. 탄성코트 적용 공간 (6개)
export const ELASTIC_SPACES = [
  { id: "balcony", name: "베란다", desc: "외부 온도 차이와 환기 상태에 따라 결로와 벽면 오염이 발생하기 쉬운 공간입니다." },
  { id: "laundryRoom", name: "세탁실", desc: "물 사용과 건조가 반복되어 습기와 기존 마감 손상을 함께 확인해야 합니다." },
  { id: "outdoorUnitRoom", name: "실외기실", desc: "외기 유입과 온도 변화가 잦아 표면 오염과 분진 상태를 확인해야 합니다." },
  { id: "evacuationSpace", name: "대피공간", desc: "환기와 사용 빈도에 따라 곰팡이, 먼지, 기존 도막 상태가 달라질 수 있습니다." },
  { id: "utilityRoom", name: "다용도실", desc: "수납과 물 사용이 함께 이루어지는 경우 공간 전체의 습도와 오염 범위를 확인해야 합니다." },
  { id: "storageSpace", name: "창고형 보조공간", desc: "환기가 부족하거나 장기간 닫혀 있는 공간은 습기와 표면 오염 상태를 우선 확인해야 합니다." }
];

// 4. 줄눈시공 적용 공간 (6개)
export const GROUT_SPACES = [
  { id: "bathroom", name: "욕실", desc: "물과 세정제에 반복적으로 노출되어 기존 백시멘트의 변색과 마모를 확인해야 합니다." },
  { id: "toilet", name: "화장실", desc: "바닥과 벽면 타일 틈의 오염 범위와 물 사용 환경을 함께 확인해야 합니다." },
  { id: "entrance", name: "현관", desc: "외부 먼지와 신발 오염이 집중되는 바닥 타일 틈의 상태를 확인해야 합니다." },
  { id: "balcony", name: "베란다 바닥", desc: "먼지와 물기에 노출되는 바닥의 기존 줄눈과 타일 상태를 확인해야 합니다." },
  { id: "kitchenTile", name: "주방 타일 구간", desc: "기름과 생활 오염에 노출되는 타일 틈의 상태와 시공 가능 범위를 확인해야 합니다." },
  { id: "utilityFloor", name: "다용도실 바닥", desc: "물 사용과 수납이 반복되는 공간의 오염과 기존 백시멘트 상태를 확인해야 합니다." }
];

// 5. 작업명 키워드별 대표 서비스 & 대표 공간 매핑 데이터
export const WORKTYPE_DISPLAY_PRIORITY = {
  "베란다탄성코트": { primaryService: "balconyElasticCoat", primarySpaces: ["balcony"] },
  "세탁실탄성코트": { primaryService: "laundryElasticCoat", primarySpaces: ["laundryRoom"] },
  "아파트탄성코트": { primaryService: "apartmentElasticCoat", primarySpaces: ["balcony", "laundryRoom"] },
  "탄성코트": { primaryService: "balconyElasticCoat", primarySpaces: ["balcony"] },
  "탄성코트시공": { primaryService: "balconyElasticCoat", primarySpaces: ["balcony"] },
  "탄성코트업체": { primaryService: "elasticCoatConsulting", primarySpaces: ["balcony", "laundryRoom"] },

  "욕실줄눈시공": { primaryService: "bathroomGrout", primarySpaces: ["bathroom"] },
  "화장실줄눈시공": { primaryService: "bathroomGrout", primarySpaces: ["toilet"] },
  "현관줄눈시공": { primaryService: "entranceGrout", primarySpaces: ["entrance"] },
  "베란다줄눈시공": { primaryService: "balconyGrout", primarySpaces: ["balcony"] },
  "줄눈시공": { primaryService: "bathroomGrout", primarySpaces: ["bathroom"] },
  "줄눈시공업체": { primaryService: "groutConsulting", primarySpaces: ["bathroom", "entrance"] }
};

/**
 * 현재 서비스군 및 작업명에 따른 서비스 카드 데이터 추출 함수
 * - primaryService 1개 (대표) + 보조 3개 반환 (중복 없음)
 */
export function getServicesByGroupAndTask(groupKey, taskName) {
  const isElastic = groupKey === 'elasticCoat';
  const serviceCatalog = isElastic ? ELASTIC_SERVICES : GROUT_SERVICES;
  const defaultPrimaryId = isElastic ? 'balconyElasticCoat' : 'bathroomGrout';

  const priorityConfig = taskName ? WORKTYPE_DISPLAY_PRIORITY[taskName] : null;
  const targetPrimaryId = (priorityConfig && serviceCatalog[priorityConfig.primaryService])
    ? priorityConfig.primaryService
    : defaultPrimaryId;

  const primaryService = serviceCatalog[targetPrimaryId];
  const secondaryServices = Object.values(serviceCatalog).filter(s => s.id !== targetPrimaryId);

  return {
    primary: primaryService,
    secondary: secondaryServices
  };
}

/**
 * 현재 서비스군 및 작업명에 따른 적용 공간 데이터 추출 함수
 * - 대표 공간 2개 + 작은 공간 4개 (중복 없이 순서 정렬)
 */
export function getSpacesByGroupAndTask(groupKey, taskName) {
  const isElastic = groupKey === 'elasticCoat';
  const baseSpaces = isElastic ? [...ELASTIC_SPACES] : [...GROUT_SPACES];
  
  const priorityConfig = taskName ? WORKTYPE_DISPLAY_PRIORITY[taskName] : null;
  const primarySpaceIds = priorityConfig ? priorityConfig.primarySpaces : [];

  if (primarySpaceIds.length > 0) {
    const matched = baseSpaces.filter(s => primarySpaceIds.includes(s.id));
    const remaining = baseSpaces.filter(s => !primarySpaceIds.includes(s.id));
    return [...matched, ...remaining];
  }

  return baseSpaces;
}
