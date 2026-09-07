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

// 5. 세탁실탄성코트 전용 FAQ (5개)
export const LAUNDRY_ELASTIC_FAQ_LIST = [
  {
    id: "laundry-faq-1",
    question: "습기와 물 사용이 많은 세탁실에도 탄성코트 시공이 가능한가요?",
    answer: "세탁실은 물 사용과 배관 습기, 환기 상태에 따라 벽면 조건이 다를 수 있습니다. 시공 전 수분 상태와 기존 도막의 들뜸 여부를 확인하고 필요한 바탕 정리를 거쳐 적용할 수 있습니다."
  },
  {
    id: "laundry-faq-2",
    question: "세탁실 벽면의 물자국이 누수인지 결로인지 어떻게 확인하나요?",
    answer: "특정 배관 연결부나 수도 주변에 지속적으로 물이 비치는 경우는 설비·누수 점검을 먼저 검토해야 합니다. 외부 기온 차나 환기 부족으로 인한 이슬 맺힘은 결로 가능성을 함께 점검해야 합니다."
  },
  {
    id: "laundry-faq-3",
    question: "기존 탄성코트가 들뜨거나 벗겨졌다면 어떻게 하나요?",
    answer: "들뜨거나 박리된 기존 도막은 깔끔하게 긁어내고 표면을 정돈한 후 시공하는 것이 원칙입니다. 손상 범위와 바탕면 상태에 따라 부분 정리 또는 넓은 범위 보수가 결정됩니다."
  },
  {
    id: "laundry-faq-4",
    question: "시공 전에 세탁기나 건조기를 이동해야 하나요?",
    answer: "벽면에 작업자가 접근할 수 있는 공간 확보가 필요하며, 가전 이동 여부는 설치 상태와 작업 범위에 따라 상담 시 확인합니다."
  },
  {
    id: "laundry-faq-5",
    question: "시공 후 환기와 건조는 어떻게 관리해야 하나요?",
    answer: "건조·환기 시간은 사용 자재와 기온·습도·환기 상태에 따라 달라질 수 있으므로 시공 후 안내되는 관리 기준을 따릅니다."
  }
];

// 6. 탄성코트 전용 FAQ (5개)
export const GENERAL_ELASTIC_FAQ_LIST = [
  {
    id: "general-elastic-faq-1",
    question: "탄성코트는 어떤 벽면 상태일 때 시공이 필요한가요?",
    answer: "기존 페인트나 탄성코트가 들뜨고 부풀어 오르거나, 베란다·세탁실 벽면에 오염 및 결로 흔적이 반복될 때 바탕 정리를 거쳐 시공을 검토할 수 있습니다."
  },
  {
    id: "general-elastic-faq-2",
    question: "곰팡이나 결로 흔적이 있는 벽면에도 시공할 수 있나요?",
    answer: "오염된 표면 위에 그대로 덧칠하는 것은 적절하지 않을 수 있습니다. 습도 환경과 표면 상태를 확인하고, 들뜬 도막 긁어내기 및 바탕 정리를 진행한 후 시공하는 것이 원칙입니다."
  },
  {
    id: "general-elastic-faq-3",
    question: "기존 페인트나 탄성코트가 들떠 있는 경우 다시 시공할 수 있나요?",
    answer: "현장 점검 시 기존 도막의 접착 상태와 손상 범위를 확인한 뒤 재시공 가능 여부와 정리 범위를 판단하게 됩니다."
  },
  {
    id: "general-elastic-faq-4",
    question: "벽면 일부만 오염된 경우 부분 보수가 가능한가요?",
    answer: "손상 범위가 국소적이고 주변 도막 접착력이 양호하다면 부분 정리를 검토할 수 있습니다. 다만 손상이 여러 구역에 퍼져 있다면 전체 상태를 확인하는 것이 안전합니다."
  },
  {
    id: "general-elastic-faq-5",
    question: "탄성코트 시공 후 건조와 환기 관리는 어떻게 하나요?",
    answer: "건조 및 환기 시간은 사용 자재, 기온, 습도, 환기 상태 등 현장 조건에 따라 달라지므로 시공 후 안내받은 관리 지침을 지켜주시는 것이 좋습니다."
  }
];

// 7. 탄성코트시공 전용 FAQ (5개)
export const PROCESS_ELASTIC_FAQ_LIST = [
  {
    id: "process-elastic-faq-1",
    question: "탄성코트시공은 어떤 순서와 과정으로 진행되나요?",
    answer: "현장 보양 및 마스킹 -> 손상 도막 긁어내기 -> 벽면 균열 및 바탕면 보수 필요 여부 확인 -> 선택 자재 적용 마감 -> 현장 건조 및 안내 순으로 진행됩니다."
  },
  {
    id: "process-elastic-faq-2",
    question: "기존 도막을 긁어내는 바탕 정리 작업이 왜 중요한가요?",
    answer: "접착력을 잃고 들뜬 도막 위에 덧칠하면 신규 마감재까지 함께 박리될 수 있으므로, 손상 부위를 정돈하고 바탕면을 고르게 만드는 작업이 선행되어야 합니다."
  },
  {
    id: "process-elastic-faq-3",
    question: "시공 작업 시 주변 오염을 방지하는 보양 작업은 어떻게 이루어지나요?",
    answer: "샷시, 유리창, 수도꼭지, 전등, 계량기 등 자재가 묻으면 안 되는 구조물 전체를 전용 비닐과 마스킹 테이프로 세심하게 보호합니다."
  },
  {
    id: "process-elastic-faq-4",
    question: "시공 후 완충 건조 시간은 어떻게 관리되나요?",
    answer: "사용 자재와 현장의 기온·습도·환기 환경에 따라 건조 시간이 달라지므로, 충분히 경화될 때까지 벽면 접촉이나 수분 노출을 자제하는 관리가 필요합니다."
  },
  {
    id: "process-elastic-faq-5",
    question: "시공 전 사용자가 미리 준비해야 할 사항은 무엇인가요?",
    answer: "작업자가 벽면에 접근하여 보양 및 작업할 수 있는 동선 공간을 확보해 주시고, 물 비침이 의심되는 구역은 사전에 알려주시면 상담에 도움이 됩니다."
  }
];

// 8. 베란다탄성코트 전용 FAQ (5개)
export const BALCONY_ELASTIC_FAQ_LIST = [
  {
    id: "balcony-elastic-faq-1",
    question: "베란다 결로나 곰팡이 오염이 심한 벽면에도 시공이 가능한가요?",
    answer: "벽면의 수분 상태와 오염 원인을 먼저 점검해야 합니다. 환기 및 외벽 온도차 환경을 확인하고 들뜬 페인트를 정돈한 후 선택 자재 마감을 적용합니다."
  },
  {
    id: "balcony-elastic-faq-2",
    question: "베란다 창 주변이나 외벽 접점의 미세 균열은 어떻게 보수하나요?",
    answer: "균열의 폭과 표면 상태를 확인하여 적절한 보수재로 바탕을 정돈한 후 탄성코트 작업 범위를 결정합니다."
  },
  {
    id: "balcony-elastic-faq-3",
    question: "베란다와 연결된 실외기실이나 다용도실도 함께 확인할 수 있나요?",
    answer: "베란다와 연결된 실외기실/다용도실도 공기 흐름과 벽면 상태를 함께 확인하여 시공 필요 여부를 결정할 수 있습니다."
  },
  {
    id: "balcony-elastic-faq-4",
    question: "기존 베란다 탄성코트가 들떠 있는 경우 어떻게 조치하나요?",
    answer: "현장 확인 시 기존 도막의 접착 상태와 손상 범위를 점검한 뒤 긁어내기 및 바탕 정리 범위를 정해 재시공 여부를 판단합니다."
  },
  {
    id: "balcony-elastic-faq-5",
    question: "베란다 탄성코트 시공 후 환기와 습기 관리는 어떻게 하나요?",
    answer: "평소 베란다 창문을 통한 주기적인 환기를 권장하며, 벽면 건조 상태는 현장의 기온·습도 지침에 맞춰 관리하는 것이 안전합니다."
  }
];

// 9. 아파트탄성코트 전용 FAQ (5개)
export const APARTMENT_ELASTIC_FAQ_LIST = [
  {
    id: "apartment-elastic-faq-1",
    question: "신축 아파트 입주 시에도 발코니 탄성코트 시공을 검토하나요?",
    answer: "신축 아파트도 외기 온도 차이로 발코니 습도가 올라갈 수 있습니다. 입주 전 바탕면 상태를 확인하고 탄성 마감을 적용해 쾌적성을 높일 수 있습니다."
  },
  {
    id: "apartment-elastic-faq-2",
    question: "구축 아파트의 오래된 탄성코트나 수성페인트는 어떻게 작업하나요?",
    answer: "세월이 지나 들뜨거나 오염된 도막의 접착 상태를 점검하여 손상 부위를 긁어내고 바탕 보수를 거쳐 시공을 진행합니다."
  },
  {
    id: "apartment-elastic-faq-3",
    question: "아파트 입주 청소나 이사 일정 중 언제 탄성코트를 시공하는 것이 좋나요?",
    answer: "보양 비닐 설치 및 마감재 건조 시간이 필요하므로, 일반적으로 이사나 입주 청소 전에 탄성코트 시공을 완료하는 일정을 권장합니다."
  },
  {
    id: "apartment-elastic-faq-4",
    question: "아파트 베란다, 세탁실, 실외기실을 한 번에 확인할 수 있나요?",
    answer: "발코니 전체 공간의 벽면 상태와 작업 필요 여부를 한 번에 통합 점검하여 균일한 마감 범위를 결정할 수 있습니다."
  },
  {
    id: "apartment-elastic-faq-5",
    question: "현재 거주 중인 아파트 세대에서도 탄성코트 시공이 가능한가요?",
    answer: "거주 중에도 시공할 수 있습니다. 다만 작업 대상 벽면 앞의 물건이나 가전을 이동하여 작업 동선을 확보해 주시는 조치가 필요합니다."
  }
];

// 10. 탄성코트업체 전용 FAQ (5개)
export const AGENCY_ELASTIC_FAQ_LIST = [
  {
    id: "agency-elastic-faq-1",
    question: "탄성코트 업체를 비교할 때 어떤 항목을 확인해야 하나요?",
    answer: "들뜬 도막을 꼼꼼히 긁어내는지, 보양 작업을 세심하게 진행하는지, 바탕 처리 기준과 사후 관리 지침을 투명하게 설명하는지 확인하는 것이 좋습니다."
  },
  {
    id: "agency-elastic-faq-2",
    question: "탄성코트 시공 견적은 어떤 요소에 따라 차이가 나나요?",
    answer: "시공 면적, 기존 도막 긁어내기 작업량, 바탕 보수 범위, 가전/가구 보양 난이도에 따라 정직하게 산정됩니다."
  },
  {
    id: "agency-elastic-faq-3",
    question: "바탕면 긁어내기 작업이나 균열 보수가 시공 범위에 포함되는지 확인하는 방법은?",
    answer: "단순 덧칠 시공인지 바탕 전처리가 포함된 정석 작업인지 상담 시 사전에 명확히 안내받는 것이 중요합니다."
  },
  {
    id: "agency-elastic-faq-4",
    question: "시공 후 A/S 및 사후 관리 기준은 어떻게 확인하나요?",
    answer: "자재 경화 지침과 하자 발생 시 처리 기준, 환기 안내 지침을 성실히 제시하는 업체를 선택하는 것이 안전합니다."
  },
  {
    id: "agency-elastic-faq-5",
    question: "방문 전 현장 사진만으로 대략적인 업체 상담이 가능한가요?",
    answer: "작업 공간 전체 모습과 기존 들뜸/오염이 보이는 벽면 사진을 보내주시면 대략적인 예상 작업 범위와 사전 상담이 가능합니다."
  }
];

/**
 * FAQ 5개 세트 동적 추출 함수 (Fallback 및 중복 제거 처리)
 */
export function getFaqItems(parsedKeyword) {
  if (!parsedKeyword) {
    return MAIN_FAQ_LIST;
  }

  const taskName = parsedKeyword.service.keyword;
  if (taskName === '세탁실탄성코트') return LAUNDRY_ELASTIC_FAQ_LIST;
  if (taskName === '탄성코트') return GENERAL_ELASTIC_FAQ_LIST;
  if (taskName === '탄성코트시공') return PROCESS_ELASTIC_FAQ_LIST;
  if (taskName === '베란다탄성코트') return BALCONY_ELASTIC_FAQ_LIST;
  if (taskName === '아파트탄성코트') return APARTMENT_ELASTIC_FAQ_LIST;
  if (taskName === '탄성코트업체') return AGENCY_ELASTIC_FAQ_LIST;

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
