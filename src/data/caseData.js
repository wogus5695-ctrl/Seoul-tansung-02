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
    },
    {
      id: "balcony-case-01",
      serviceGroup: "elasticCoat",
      workType: "베란다탄성코트",
      caseLabel: "CASE 01",
      title: "베란다 창호 및 코너 벽면 오염 정돈 및 탄성코트 시공",
      locationLabel: "",
      spaceType: "베란다",
      beforeImage: "/images/cases/elastic/balcony-case-01-before.webp",
      afterImage: "/images/cases/elastic/balcony-case-01-after.webp",
      beforeCaption: "창호 주변 벽면과 코너에 곰팡이와 오염 흔적이 확인된 상태",
      afterCaption: "바탕면 정리 후 탄성코트 마감이 완료된 상태",
      beforeAlt: "베란다 창호 주변 벽면과 코너의 시공 전 상태",
      afterAlt: "베란다 벽면 탄성코트 마감 후 상태",
      beforeObjectPosition: "center center",
      afterObjectPosition: "center center",
      summary: "창호 주변과 벽면 코너의 오염 흔적을 정돈하고 탄성코트로 마감한 실제 현장입니다.",
      issues: ["창호 주변 벽면 오염", "코너 부위 곰팡이 흔적"],
      workDetails: ["기존 벽면 정리 및 창호 보양", "탄성코트 도포 및 마감"],
      featured: true,
      displayOrder: 1,
      status: "published"
    },
    {
      id: "balcony-case-02",
      serviceGroup: "elasticCoat",
      workType: "베란다탄성코트",
      caseLabel: "CASE 02",
      title: "베란다 천장 및 창호 상부 접점 정돈 및 탄성코트 시공",
      locationLabel: "",
      spaceType: "베란다",
      beforeImage: "/images/cases/elastic/balcony-case-02-before.webp",
      afterImage: "/images/cases/elastic/balcony-case-02-after.webp",
      beforeCaption: "천장 및 창호 상부 접점에 오염과 균열 흔적이 확인된 상태",
      afterCaption: "바탕면 정리 후 탄성코트 마감이 완료된 상태",
      beforeAlt: "베란다 천장 및 창호 상부의 시공 전 상태",
      afterAlt: "베란다 천장 탄성코트 마감 후 상태",
      beforeObjectPosition: "center center",
      afterObjectPosition: "center center",
      summary: "천장과 창호 상부 접점의 오염 흔적을 정돈하고 탄성코트로 마감한 실제 현장입니다.",
      issues: ["창호 상부 접점 오염", "천장 균열 흔적"],
      workDetails: ["접점 부위 바탕 정리 및 보양", "탄성코트 도포 및 마감"],
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

export const BROAD_ELASTIC_INTENTS = new Set([
  '탄성코트',
  '탄성코트시공',
  '아파트탄성코트',
  '탄성코트업체'
]);

export const SHARED_ELASTIC_EVIDENCE_CASE_IDS = [
  'elastic-case-01',
  'balcony-case-01'
];

/**
 * Intent별 실제 시공 사례 추출 함수 (Exact Intent Matching)
 * - 작업명과 정확히 일치하고 published 상태이며 beforeImage & afterImage가 유효한 사례만 반환
 * - 일치하는 사례가 없으면 빈 배열 반환 (0 fallback)
 */
export function getExactIntentCases(taskName) {
  if (!taskName) return [];
  return CASE_STUDIES.elasticCoat.filter(
    c => c.status === 'published' && c.workType === taskName && c.beforeImage && c.afterImage
  );
}

/**
 * Intent별 실제 시공 사례 추출 셀렉터 (CRO Architecture)
 * - Exact Space Intent (세탁실탄성코트, 베란다탄성코트): 각각 고유한 published 2건 반환
 * - Broad Elastic Intent (탄성코트, 탄성코트시공, 아파트탄성코트, 탄성코트업체):
 *   검증 완료된 세탁실(Case 01) 및 베란다(Case 01)의 실제 현장 2건을 Shared Evidence로 재사용
 * - 그 외(줄눈 등): 빈 배열 반환 (0건)
 */
export function getBeforeAfterCasesForIntent(serviceKeyword) {
  if (!serviceKeyword) return [];

  if (serviceKeyword === '세탁실탄성코트') {
    return CASE_STUDIES.elasticCoat.filter(
      c => c.status === 'published' && c.workType === '세탁실탄성코트' && c.beforeImage && c.afterImage
    );
  }

  if (serviceKeyword === '베란다탄성코트') {
    return CASE_STUDIES.elasticCoat.filter(
      c => c.status === 'published' && c.workType === '베란다탄성코트' && c.beforeImage && c.afterImage
    );
  }

  if (BROAD_ELASTIC_INTENTS.has(serviceKeyword)) {
    const laundryCase = CASE_STUDIES.elasticCoat.find(c => c.id === 'elastic-case-01');
    const balconyCase = CASE_STUDIES.elasticCoat.find(c => c.id === 'balcony-case-01');
    if (!laundryCase || !balconyCase) return [];

    return [
      {
        ...laundryCase,
        id: 'shared-elastic-case-01',
        caseLabel: 'CASE 01',
        title: '세탁실 벽면 탄성코트 시공 전후'
      },
      {
        ...balconyCase,
        id: 'shared-balcony-case-01',
        caseLabel: 'CASE 02',
        title: '베란다 벽면 탄성코트 시공 전후'
      }
    ];
  }

  return [];
}

/**
 * 세탁실탄성코트 파일럿 하위 호환 함수
 */
export function getLaundryPilotCases(taskName) {
  return getExactIntentCases(taskName);
}
