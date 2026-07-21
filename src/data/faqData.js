/**
 * 네오코트 FAQ 데이터 마스터 및 동적 추출 함수 (faqData.js)
 */

// 1. 메인 공통 FAQ (5개)
export const MAIN_FAQ_LIST = [
  {
    id: "main-faq-1",
    question: "탄성코트와 줄눈시공은 어떤 차이가 있나요?",
    answer: "탄성코트는 주로 베란다와 세탁실, 실외기실 등의 벽면 상태를 정리하고 코팅 마감을 적용하는 작업입니다. 줄눈시공은 욕실과 현관, 베란다 바닥 등 타일 사이의 기존 백시멘트 또는 줄눈 상태를 확인하고 줄눈재를 적용하는 작업입니다."
  },
  {
    id: "main-faq-2",
    question: "사진만으로도 대략적인 상담이 가능한가요?",
    answer: "작업 공간 전체와 문제가 발생한 부분, 기존 마감 상태가 보이는 사진이 있으면 기본적인 상담에 도움이 됩니다. 다만 사진만으로 수분 상태나 누수 원인, 기존 도막의 접착 상태를 정확히 판단하기 어려운 경우에는 추가 확인이 필요할 수 있습니다."
  },
  {
    id: "main-faq-3",
    question: "곰팡이나 오염이 있으면 바로 시공할 수 있나요?",
    answer: "곰팡이와 오염의 범위, 벽면 수분 상태, 누수 여부를 먼저 확인해야 합니다. 단순 표면 오염이 아닌 누수나 지속적인 결로가 원인이라면 원인 점검 또는 별도 보수 작업이 먼저 필요할 수 있습니다."
  },
  {
    id: "main-faq-4",
    question: "시공 시간은 얼마나 걸리나요?",
    answer: "작업 공간의 크기와 기존 마감 상태, 보양 및 제거 범위에 따라 달라집니다. 상담 단계에서 공간과 현재 상태를 확인한 뒤 예상 작업 범위를 안내해야 합니다."
  },
  {
    id: "main-faq-5",
    question: "상담 전에 어떤 정보를 준비하면 좋나요?",
    answer: "작업을 원하는 공간, 대략적인 면적, 신축 또는 구축 여부, 기존 시공 여부, 곰팡이·들뜸·오염 상태를 확인할 수 있는 사진을 준비하면 상담이 더 수월합니다."
  }
];

// 2. 탄성코트 기본 FAQ (5개)
export const ELASTIC_BASE_FAQ_LIST = [
  {
    id: "elastic-base-1",
    question: "탄성코트는 곰팡이를 완전히 막아주나요?",
    answer: "탄성코트만으로 모든 곰팡이 발생을 완전히 막는다고 단정할 수는 없습니다. 곰팡이는 결로, 환기 부족, 누수, 벽체 수분 등 여러 원인으로 발생할 수 있으므로 현재 원인을 먼저 확인해야 합니다."
  },
  {
    id: "elastic-base-2",
    question: "기존 곰팡이나 오염을 그대로 두고 시공하나요?",
    answer: "기존 곰팡이와 오염, 들뜬 도막을 그대로 덮는 방식은 적절하지 않을 수 있습니다. 오염 범위와 표면 상태를 확인하고 필요한 정리와 보수 범위를 구분한 뒤 시공해야 합니다."
  },
  {
    id: "elastic-base-3",
    question: "기존 탄성코트가 들떠 있어도 재시공할 수 있나요?",
    answer: "재시공 가능 여부는 들뜬 범위와 기존 도막의 접착 상태, 벽면 수분 상태에 따라 달라집니다. 손상된 부분의 제거와 바탕 정리가 선행되어야 할 수 있습니다."
  },
  {
    id: "elastic-base-4",
    question: "탄성코트 시공은 얼마나 걸리나요?",
    answer: "공간 크기와 보양 범위, 기존 도막 제거 여부, 균열과 오염 상태에 따라 작업 시간이 달라집니다. 시공 후에는 제품과 현장 조건에 맞는 건조 시간이 필요합니다."
  },
  {
    id: "elastic-base-5",
    question: "시공 후 공간은 언제부터 사용할 수 있나요?",
    answer: "건조 시간은 사용한 제품과 온도, 습도, 환기 상태에 따라 달라질 수 있습니다. 시공 직후 물건을 붙이거나 벽면을 닦기보다는 현장에서 안내받은 건조 시간을 지키는 것이 좋습니다."
  }
];

// 3. 줄눈시공 기본 FAQ (5개)
export const GROUT_BASE_FAQ_LIST = [
  {
    id: "grout-base-1",
    question: "기존 백시멘트를 제거하고 시공하나요?",
    answer: "기존 백시멘트의 상태와 작업 부위에 따라 정리 또는 제거 범위가 달라질 수 있습니다. 오염되거나 약해진 부분을 그대로 덮기보다 기존 상태를 먼저 확인해야 합니다."
  },
  {
    id: "grout-base-2",
    question: "기존 줄눈 위에 덧시공할 수 있나요?",
    answer: "기존 줄눈의 접착 상태와 오염, 균열, 탈락 여부에 따라 다릅니다. 기존 마감이 불안정한 상태에서는 단순 덧시공보다 제거와 표면 정리가 필요할 수 있습니다."
  },
  {
    id: "grout-base-3",
    question: "줄눈 색상은 선택할 수 있나요?",
    answer: "사용할 수 있는 색상은 적용 제품과 타일 색상, 공간의 밝기와 관리 방식에 따라 달라질 수 있습니다. 실제 샘플이나 색상표를 확인한 뒤 선택하는 것이 안전합니다."
  },
  {
    id: "grout-base-4",
    question: "줄눈시공 후 물은 언제부터 사용할 수 있나요?",
    answer: "물 사용 가능 시점은 사용한 줄눈재의 특성과 현장 온도, 습도에 따라 달라질 수 있습니다. 충분히 경화되기 전에 물을 사용하면 마감에 영향을 줄 수 있으므로 현장에서 안내받은 시간을 지켜야 합니다."
  },
  {
    id: "grout-base-5",
    question: "욕실과 현관을 함께 시공할 수 있나요?",
    answer: "두 공간을 함께 시공할 수 있지만 공간별 타일과 기존 백시멘트 상태가 다르므로 작업 범위를 각각 확인해야 합니다. 상담 시 원하는 공간을 모두 알려주면 전체 범위를 확인하는 데 도움이 됩니다."
  }
];

// 4. 작업명별 전용 특화 FAQ 매핑
export const WORKTYPE_PRIORITY_FAQ = {
  "베란다탄성코트": {
    id: "faq-balcony-elastic",
    question: "베란다 결로가 있어도 탄성코트를 시공할 수 있나요?",
    answer: "결로가 발생하는 원인과 벽면 수분 상태를 먼저 확인해야 합니다. 환기와 단열 문제로 반복되는 결로는 탄성코트만으로 원인을 없앨 수 없으므로 현재 상태와 관리 환경을 함께 확인해야 합니다."
  },
  "세탁실탄성코트": {
    id: "faq-laundry-elastic",
    question: "세탁실처럼 습기가 많은 공간에도 시공할 수 있나요?",
    answer: "시공은 가능할 수 있지만 벽면 수분과 환기 상태, 기존 도막의 들뜸 여부를 먼저 확인해야 합니다. 물 사용이 반복되는 공간은 시공 후 건조와 환기 관리도 중요합니다."
  },
  "아파트탄성코트": {
    id: "faq-apartment-elastic",
    question: "신축 아파트와 구축 아파트의 시공 방식이 다른가요?",
    answer: "신축과 구축은 기존 벽면 상태와 오염, 균열, 마감 이력이 다를 수 있습니다. 건물 연식만으로 결정하기보다 실제 벽면과 기존 도막 상태를 기준으로 작업 범위를 확인해야 합니다."
  },
  "탄성코트업체": {
    id: "faq-elastic-company",
    question: "시공업체를 선택할 때 무엇을 확인해야 하나요?",
    answer: "기존 마감 상태를 확인하는지, 보양과 제거 범위를 사전에 설명하는지, 제품과 작업 범위 및 추가 비용 발생 조건을 명확하게 안내하는지 확인하는 것이 좋습니다."
  },
  "욕실줄눈시공": {
    id: "faq-bathroom-grout",
    question: "욕실을 사용 중인 상태에서도 줄눈시공이 가능한가요?",
    answer: "시공 전 타일 틈과 주변이 충분히 건조된 상태가 필요할 수 있습니다. 시공 전후로 일정 시간 물 사용을 제한해야 하므로 실제 사용 일정과 건조 조건을 함께 확인해야 합니다."
  },
  "화장실줄눈시공": {
    id: "faq-toilet-grout",
    question: "화장실 바닥과 벽면을 함께 줄눈시공할 수 있나요?",
    answer: "바닥과 벽면 모두 시공할 수 있는지는 타일 종류와 기존 줄눈 상태, 작업 가능한 틈의 깊이에 따라 달라질 수 있습니다. 각각의 작업 범위를 구분해 확인해야 합니다."
  },
  "현관줄눈시공": {
    id: "faq-entrance-grout",
    question: "현관 줄눈은 오염 관리가 더 쉬워지나요?",
    answer: "기존 백시멘트보다 표면 오염을 정리하기 편한 재료를 사용할 수 있지만, 오염이 전혀 발생하지 않는 것은 아닙니다. 신발 먼지와 물기는 주기적으로 관리해야 합니다."
  },
  "베란다줄눈시공": {
    id: "faq-balcony-grout",
    question: "베란다 바닥에 물을 자주 사용해도 괜찮나요?",
    answer: "충분히 경화된 뒤에는 일반적인 관리가 가능하지만, 사용 제품과 시공 환경에 따라 물 사용 가능 시점이 달라질 수 있습니다. 배수 상태와 기존 타일 틈의 균열 여부도 함께 확인해야 합니다."
  },
  "줄눈시공업체": {
    id: "faq-grout-company",
    question: "시공업체를 선택할 때 무엇을 확인해야 하나요?",
    answer: "기존 마감 상태를 확인하는지, 보양과 제거 범위를 사전에 설명하는지, 제품과 작업 범위 및 추가 비용 발생 조건을 명확하게 안내하는지 확인하는 것이 좋습니다."
  }
};

/**
 * FAQ 5개 세트 동적 추출 함수 (Fallback 및 중복 제거 처리)
 */
export function getFaqItems(parsedKeyword) {
  if (!parsedKeyword) {
    return MAIN_FAQ_LIST;
  }

  const taskName = parsedKeyword.service.keyword;
  const isElastic = parsedKeyword.service.serviceGroup === 'elastic';
  const baseList = isElastic ? ELASTIC_BASE_FAQ_LIST : GROUT_BASE_FAQ_LIST;
  const priorityFaq = WORKTYPE_PRIORITY_FAQ[taskName];

  let combined = [];
  if (priorityFaq) {
    // 특화 질문 1개 + 기본 질문 4개 (중복 제거)
    combined = [priorityFaq, ...baseList.filter(f => f.question !== priorityFaq.question)].slice(0, 5);
  } else {
    combined = baseList.slice(0, 5);
  }

  // Fallback: 만약 5개 미만인 경우 메인 공통 질문으로 채움
  if (combined.length < 5) {
    for (const item of MAIN_FAQ_LIST) {
      if (!combined.some(f => f.question === item.question)) {
        combined.push(item);
      }
      if (combined.length === 5) break;
    }
  }

  return combined;
}
