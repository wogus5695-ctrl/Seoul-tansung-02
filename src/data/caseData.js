/**
 * 시공 사례 마스터 데이터 및 작업명별 우선순위 매핑 데이터
 * - status: "draft" | "published" | "hidden"
 * - 실제 사용자가 정식 등록하기 전까지는 안전하게 draft/hidden으로 관리하거나, 
 *   published 상태가 0개일 때 정직하게 "등록 예정" 화면을 표시하도록 구조화
 */

export const CASE_STUDIES = {
  elasticCoat: [
    {
      id: "elastic-case-01",
      serviceGroup: "elasticCoat",
      workType: "베란다탄성코트",
      title: "베란다 벽면 탄성코트 시공",
      locationLabel: "",
      spaceType: "베란다",
      beforeImage: "",
      afterImage: "",
      beforeObjectPosition: "center",
      afterObjectPosition: "center",
      summary: "결로와 습기로 인한 기존 벽면 들뜸과 곰팡이를 정돈하고 친환경 세라믹 탄성 마감을 완료했습니다.",
      issues: ["기존 도막 들뜸 및 박리", "벽면 곰팡이 오염", "창호 주변 결로 흔적"],
      workDetails: ["주변 창호 및 설비 보양", "들뜬 도막 긁어내기 및 바탕 정돈", "탄성코트 분사 및 마감 검수"],
      featured: true,
      displayOrder: 1,
      status: "draft"
    },
    {
      id: "elastic-case-02",
      serviceGroup: "elasticCoat",
      workType: "세탁실탄성코트",
      title: "세탁실 습기 방지 탄성코트",
      locationLabel: "",
      spaceType: "세탁실",
      beforeImage: "",
      afterImage: "",
      beforeObjectPosition: "center",
      afterObjectPosition: "center",
      summary: "세탁기 및 건조기 사용으로 습도가 높은 세탁실 배관 주변 및 벽체의 바탕 정리를 거쳐 시공했습니다.",
      issues: ["습기로 인한 표면 분진", "배관 주변 도막 손상"],
      workDetails: ["세탁기 배관 보양", "표면 정리 및 프라이머 처리", "세라믹 탄성 마감"],
      featured: false,
      displayOrder: 2,
      status: "draft"
    }
  ],
  grout: [
    {
      id: "grout-case-01",
      serviceGroup: "grout",
      workType: "욕실줄눈시공",
      title: "욕실 타일 틈 줄눈 재시공",
      locationLabel: "",
      spaceType: "욕실",
      beforeImage: "",
      afterImage: "",
      beforeObjectPosition: "center",
      afterObjectPosition: "center",
      summary: "물때와 세제 오염으로 마모된 기존 백시멘트를 제거하고 방습성 높은 줄눈재를 도포했습니다.",
      issues: ["기존 백시멘트 변색", "타일 틈 곰팡이", "줄눈 탈락 현상"],
      workDetails: ["기존 백시멘트 파내기", "타일 틈 이물질 분진 청소", "친환경 줄눈재 주입 및 정돈"],
      featured: true,
      displayOrder: 1,
      status: "draft"
    },
    {
      id: "grout-case-02",
      serviceGroup: "grout",
      workType: "현관줄눈시공",
      title: "현관 바닥 타일 줄눈시공",
      locationLabel: "",
      spaceType: "현관",
      beforeImage: "",
      afterImage: "",
      beforeObjectPosition: "center",
      afterObjectPosition: "center",
      summary: "외부 먼지와 흙오염이 쌓이는 현관 바닥 타일의 착색 오염을 정돈하고 맞춤 조색 줄눈을 시공했습니다.",
      issues: ["신발 먼지로 인한 흑변", "기존 마감재 균열"],
      workDetails: ["바닥 먼지 흡입 및 정돈", "타일 틈 V자 정밀 가공", "줄눈재 정밀 정돈"],
      featured: false,
      displayOrder: 2,
      status: "draft"
    }
  ]
};

/**
 * 작업명별 사례 우선순위 정렬 함수
 * - published 상태이면서 images가 유효한 사례만 추출
 * - 작업명과 일치하는 사례 우선 정렬
 */
export function getPublishedCaseStudies(groupKey, taskName) {
  const isElastic = groupKey === 'elasticCoat';
  const catalog = isElastic ? CASE_STUDIES.elasticCoat : CASE_STUDIES.grout;

  // published 조건 검증 (beforeImage && afterImage 존재)
  const publishedList = catalog.filter(c => c.status === 'published' && c.beforeImage && c.afterImage);

  if (publishedList.length === 0) {
    return [];
  }

  // 작업명과 일치하는 항목을 첫 번째로 배치
  if (taskName) {
    const matched = publishedList.filter(c => c.workType === taskName);
    const remaining = publishedList.filter(c => c.workType !== taskName);
    return [...matched, ...remaining];
  }

  return publishedList.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
}
