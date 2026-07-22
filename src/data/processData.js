/**
 * 네오코트 시공 원칙 및 서비스군별 작업 과정 마스터 데이터 & 작업명별 강조 매핑
 */

// 1. 네오코트 5대 시공 원칙 데이터
export const WORK_STANDARD_CONTENT = {
  label: "NEO COAT STANDARD",
  title: "보이는 마감보다 보이지 않는 준비가 중요합니다",
  description: "탄성코트와 줄눈시공은 마감재를 바르는 과정만으로 결정되지 않습니다. 기존 표면 상태와 작업 환경을 확인하고, 필요한 기초 작업과 보양 범위를 구분해야 안정적인 마감을 기대할 수 있습니다.",
  principles: [
    {
      num: "01",
      id: "surface-check",
      title: "기존 표면 상태 확인",
      desc: "오염·들뜸·균열·수분 흔적을 먼저 확인합니다."
    },
    {
      num: "02",
      id: "scope-division",
      title: "작업 범위 구분",
      desc: "제거·보수·추가 확인이 필요한 범위를 구분합니다."
    },
    {
      num: "03",
      id: "space-protection",
      title: "주변 공간 보양",
      desc: "창호와 바닥 등 작업 대상이 아닌 부분을 보호합니다."
    },
    {
      num: "04",
      id: "step-execution",
      title: "공정별 시공",
      desc: "바탕 정리부터 재료 적용과 마감까지 순서대로 진행합니다."
    },
    {
      num: "05",
      id: "final-review",
      title: "마감 상태 확인",
      desc: "마감 균일도와 주변 오염 여부를 최종 확인합니다."
    }
  ]
};

// 2. 탄성코트 6단계 작업 과정 데이터
export const ELASTIC_PROCESS_STEPS = [
  {
    stepNum: 1,
    key: "consultation",
    title: "상담 및 공간 정보 확인",
    desc: "시공을 원하는 공간과 면적, 기존 곰팡이와 들뜸 여부, 누수 또는 결로 의심 증상을 확인합니다."
  },
  {
    stepNum: 2,
    key: "inspection",
    title: "현장 상태 및 작업 범위 확인",
    desc: "기존 도막과 벽면 오염, 균열, 수분 흔적을 확인하고 필요한 기초 정리와 보수 범위를 구분합니다."
  },
  {
    stepNum: 3,
    key: "protection",
    title: "창호·바닥·설비 보양",
    desc: "창호와 바닥, 배관, 문틀, 수납장 등 작업 대상이 아닌 주변 요소를 보호합니다."
  },
  {
    stepNum: 4,
    key: "surfacePreparation",
    title: "바탕면 정리",
    desc: "표면의 먼지와 들뜬 도막, 오염 부위를 정리하고 시공 가능한 상태인지 다시 확인합니다."
  },
  {
    stepNum: 5,
    key: "coating",
    title: "탄성코트 시공",
    desc: "준비된 벽면에 작업 범위와 제품 특성에 맞춰 코팅재를 적용하고 전체적인 마감 상태를 조정합니다."
  },
  {
    stepNum: 6,
    key: "finalInspection",
    title: "마감 검수 및 공간 정리",
    desc: "코팅 상태와 주변 오염 여부를 확인하고 보양재를 제거한 뒤 작업 공간을 정리합니다."
  }
];

// 3. 줄눈시공 6단계 작업 과정 데이터
export const GROUT_PROCESS_STEPS = [
  {
    stepNum: 1,
    key: "consultation",
    title: "상담 및 공간 정보 확인",
    desc: "욕실과 화장실, 현관, 베란다 등 작업 공간과 타일 종류, 기존 줄눈 상태를 확인합니다."
  },
  {
    stepNum: 2,
    key: "inspection",
    title: "기존 줄눈 상태 확인",
    desc: "백시멘트의 오염과 마모, 균열, 탈락 여부를 확인하고 제거 가능 범위와 시공 방식을 구분합니다."
  },
  {
    stepNum: 3,
    key: "protection",
    title: "주변 보양 및 오염 방지",
    desc: "타일과 배수구, 문틀, 수납장 등 작업 주변이 오염되지 않도록 필요한 범위를 보호합니다."
  },
  {
    stepNum: 4,
    key: "removal",
    title: "기존 마감 정리",
    desc: "시공 부위의 기존 백시멘트와 분진, 오염물을 작업 가능한 범위에서 정리합니다."
  },
  {
    stepNum: 5,
    key: "application",
    title: "줄눈재 시공",
    desc: "정리된 타일 틈에 공간과 작업 범위에 맞는 줄눈재를 적용하고 표면을 정돈합니다."
  },
  {
    stepNum: 6,
    key: "finalInspection",
    title: "마감 확인 및 사용 안내",
    desc: "줄눈의 균일도와 주변 오염 여부를 확인하고 건조와 물 사용 시점 등 필요한 관리사항을 안내합니다."
  }
];

// 4. 작업명 키워드별 관련 강조 단계(keys) 매핑
export const PROCESS_HIGHLIGHT_BY_WORKTYPE = {
  "베란다탄성코트": ["inspection", "surfacePreparation", "coating"],
  "세탁실탄성코트": ["inspection", "surfacePreparation"],
  "아파트탄성코트": ["inspection", "protection", "coating"],
  "탄성코트": ["inspection", "coating"],
  "탄성코트시공": ["surfacePreparation", "coating"],
  "탄성코트업체": ["consultation", "inspection"],

  "욕실줄눈시공": ["inspection", "removal", "application"],
  "화장실줄눈시공": ["inspection", "removal", "application"],
  "현관줄눈시공": ["inspection", "removal", "application"],
  "베란다줄눈시공": ["inspection", "removal"],
  "줄눈시공": ["inspection", "application"],
  "줄눈시공업체": ["consultation", "inspection"]
};

/**
 * 작업 과정 단계 데이터 및 강조 단계 추출 함수
 */
export function getProcessStepsData(groupKey, taskName) {
  const isElastic = groupKey === 'elasticCoat';
  const steps = isElastic ? ELASTIC_PROCESS_STEPS : GROUT_PROCESS_STEPS;
  const highlightKeys = taskName && PROCESS_HIGHLIGHT_BY_WORKTYPE[taskName]
    ? PROCESS_HIGHLIGHT_BY_WORKTYPE[taskName]
    : [];

  return {
    steps,
    highlightKeys
  };
}
