/**
 * 공간 문제 진단 마스터 콘텐츠 및 작업명/서비스군별 우선순위 구조
 */

// 6대 마스터 진단 문제 데이터
export const DIAGNOSIS_ITEMS = {
  "balcony-mold": {
    id: "balcony-mold",
    title: "베란다 벽면의 곰팡이와 얼룩",
    content: "외부와 내부의 온도 차이로 결로가 반복되거나 환기가 부족하면 벽면에 습기와 오염이 쌓일 수 있습니다. 누수 여부와 기존 도막 상태도 함께 확인해야 합니다.",
    category: "elasticCoat"
  },
  "laundry-humidity": {
    id: "laundry-humidity",
    title: "세탁실과 실외기실의 습기",
    content: "물 사용과 건조 과정, 외기 유입이 반복되는 공간은 습도가 높아질 수 있습니다. 벽면의 들뜸과 분진, 기존 마감 상태에 따라 바탕 정리 범위가 달라집니다.",
    category: "elasticCoat"
  },
  "elastic-peeling": {
    id: "elastic-peeling",
    title: "기존 탄성코트의 들뜸과 박리",
    content: "벽면 수분이나 불충분한 바탕 정리, 기존 도막의 접착 상태에 따라 마감이 들뜨거나 떨어질 수 있습니다. 손상 범위를 먼저 확인한 뒤 시공 방법을 결정해야 합니다.",
    category: "elasticCoat"
  },
  "wall-crack": {
    id: "wall-crack",
    title: "벽면 균열과 표면 분진",
    content: "미세 균열이나 분진이 많은 벽면은 코팅 전에 보수와 표면 정리가 필요할 수 있습니다. 균열의 원인과 크기에 따라 탄성코트만으로 처리하기 어려운 경우도 있습니다.",
    category: "elasticCoat"
  },
  "bathroom-discoloration": {
    id: "bathroom-discoloration",
    title: "욕실 타일 틈의 변색과 오염",
    content: "물과 세정제에 반복적으로 노출되는 타일 틈은 기존 백시멘트가 변색되거나 오염될 수 있습니다. 곰팡이와 표면 오염을 구분하고 기존 줄눈 상태를 확인해야 합니다.",
    category: "grout"
  },
  "entrance-contamination": {
    id: "entrance-contamination",
    title: "현관 바닥 틈의 먼지와 오염",
    content: "외부 먼지와 신발 오염이 반복적으로 쌓이는 현관은 타일 사이가 쉽게 어두워질 수 있습니다. 타일과 기존 줄눈의 손상 여부에 따라 작업 범위가 달라질 수 있습니다.",
    category: "grout"
  },
  "grout-peeling": {
    id: "grout-peeling",
    title: "기존 줄눈의 탈락과 균열",
    content: "기존 줄눈이 떨어지거나 균열이 발생한 경우 단순 덧시공보다 기존 마감과 바탕 상태 확인이 우선입니다. 손상 원인에 따라 제거 범위가 달라질 수 있습니다.",
    category: "grout"
  },
  "grout-wear": {
    id: "grout-wear",
    title: "기존 백시멘트의 분진과 마모",
    content: "오래된 백시멘트는 표면이 마모되거나 가루가 발생할 수 있습니다. 기존 상태와 제거 가능 범위를 확인한 뒤 줄눈시공 방법을 정해야 합니다.",
    category: "grout"
  }
};

// 작업명 키워드별 첫 번째 (Top Priority) 문제 ID 매핑
export const WORKTYPE_DIAGNOSIS_PRIORITY = {
  "베란다탄성코트": "balcony-mold",
  "세탁실탄성코트": "laundry-humidity",
  "아파트탄성코트": "elastic-peeling",
  "탄성코트": "balcony-mold",
  "탄성코트시공": "elastic-peeling",
  "탄성코트업체": "wall-crack",
  
  "욕실줄눈시공": "bathroom-discoloration",
  "현관줄눈시공": "entrance-contamination",
  "화장실줄눈시공": "bathroom-discoloration",
  "베란다줄눈시공": "grout-peeling",
  "줄눈시공": "bathroom-discoloration",
  "줄눈시공업체": "grout-wear"
};

/**
 * 접속 조건(메인/탄성/줄눈) 및 작업명에 따른 문제 목록 렌더링 순서 추출 함수
 */
export function getDiagnosisItems(parsedKeyword) {
  if (!parsedKeyword) {
    // 메인 페이지: 탄성 2개 + 줄눈 2개 (4개 기본 + 전체 6개)
    return [
      DIAGNOSIS_ITEMS["balcony-mold"],
      DIAGNOSIS_ITEMS["laundry-humidity"],
      DIAGNOSIS_ITEMS["bathroom-discoloration"],
      DIAGNOSIS_ITEMS["entrance-contamination"],
      DIAGNOSIS_ITEMS["elastic-peeling"],
      DIAGNOSIS_ITEMS["grout-peeling"]
    ];
  }

  const taskName = parsedKeyword.service.keyword;
  const isElastic = parsedKeyword.service.serviceGroup === 'elastic';
  const priorityId = WORKTYPE_DIAGNOSIS_PRIORITY[taskName];

  let groupItemIds = isElastic
    ? ["balcony-mold", "laundry-humidity", "elastic-peeling", "wall-crack"]
    : ["bathroom-discoloration", "entrance-contamination", "grout-peeling", "grout-wear"];

  // 작업명 매핑 priorityId가 있다면 해당 항목을 최우선 첫 번째로 배치
  if (priorityId && groupItemIds.includes(priorityId)) {
    groupItemIds = [priorityId, ...groupItemIds.filter(id => id !== priorityId)];
  }

  return groupItemIds.map(id => DIAGNOSIS_ITEMS[id]);
}
