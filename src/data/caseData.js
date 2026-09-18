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
      workType: "세탁실탄성코트",
      caseLabel: "CASE 01",
      title: "세탁실 배관 주변 오염 정돈 및 탄성코트 시공",
      locationLabel: "",
      spaceType: "세탁실",
      beforeImage: "/images/cases/elastic/elastic-case-01-before.webp",
      afterImage: "/images/cases/elastic/elastic-case-01-after.webp",
      beforeCaption: "배관 주변 벽면에 넓은 곰팡이·오염 흔적이 확인된 상태",
      afterCaption: "벽면 정리 후 탄성코트 마감이 완료된 상태",
      beforeAlt: "배관 주변 벽면에 곰팡이와 오염이 있는 시공 전 상태",
      afterAlt: "벽면 탄성코트 마감이 완료된 시공 후 상태",
      beforeObjectPosition: "center top",
      afterObjectPosition: "center top",
      summary: "배관 주변 오염된 기존 벽면을 정돈하고 탄성코트로 마감한 실제 현장입니다.",
      issues: ["배관 주변 벽면 곰팡이·오염 흔적", "기존 도막 오염"],
      workDetails: ["기존 벽면 정리 및 보양", "탄성코트 도포 및 마감 검수"],
      featured: true,
      displayOrder: 1,
      status: "published"
    },
    {
      id: "elastic-case-02",
      serviceGroup: "elasticCoat",
      workType: "세탁실탄성코트",
      caseLabel: "CASE 02",
      title: "세탁실 창호 하부 오염 정돈 및 탄성코트 시공",
      locationLabel: "",
      spaceType: "세탁실",
      beforeImage: "/images/cases/elastic/elastic-case-02-before.webp",
      afterImage: "/images/cases/elastic/elastic-case-02-after.webp",
      beforeCaption: "창호 하부 벽면에 오염과 얼룩이 넓게 남아 있는 상태",
      afterCaption: "바탕면 정리 후 탄성코트 마감이 완료된 상태",
      beforeAlt: "창호 아래 벽면에 오염이 있는 시공 전 상태",
      afterAlt: "창호 아래 벽면 탄성코트 마감이 완료된 상태",
      beforeObjectPosition: "center center",
      afterObjectPosition: "center center",
      summary: "창호 하부 벽면 오염을 정돈하고 탄성코트로 마감한 실제 현장입니다.",
      issues: ["창호 하부 벽면 오염 및 얼룩", "기존 바탕면 노후"],
      workDetails: ["바탕면 정리 및 창호 보양", "탄성코트 도포 및 마감"],
      featured: true,
      displayOrder: 2,
      status: "published"
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

/**
 * 세탁실탄성코트 파일럿 전용 사례 추출 함수
 * - 오직 세탁실탄성코트 작업일 때만 Case 01, Case 02 반환
 * - 타 작업명 또는 메인 페이지에서는 빈 배열 반환하여 100% 격리
 */
export function getLaundryPilotCases(taskName) {
  if (taskName !== '세탁실탄성코트') {
    return [];
  }
  return CASE_STUDIES.elasticCoat.filter(
    c => c.status === 'published' && c.workType === '세탁실탄성코트' && c.beforeImage && c.afterImage
  );
}
