// 12 Service Keywords classified under 4 search intents (general, intent, space, agency).
// Defines content variation templates, image mappings, and custom FAQs for each category.

export const serviceKeywords = [
  // ---------------- 탄성코트 서비스군 (6개) ----------------
  {
    keyword: '탄성코트',
    breakParts: ['탄성코트'],
    serviceGroup: 'elastic',
    searchIntent: 'general',
    primarySpace: '베란다 · 세탁실 · 다용도실',
    heroTitleTemplate: '벽면 상태부터 확인하는 시공',
    heroDescriptionTemplate: '베란다·세탁실의 기존 도막 들뜸, 곰팡이 오염, 결로 흔적 등 벽체 상태를 종합 진단하여 탄성코트 시공 필요 여부와 알맞은 바탕 정리 범위를 안내합니다.',
    metaTitleTemplate: '탄성코트 시공 안내 | 베란다·세탁실 벽면 마감',
    metaDescriptionTemplate: '베란다 및 세탁실 탄성코트 안내입니다. 기존 도장막 들뜸 상태를 진단하고 세대 환경에 맞춘 벽면 마감을 지원합니다.',
    faqSet: [
      '탄성코트는 어떤 벽면 상태일 때 시공이 필요한가요?',
      '곰팡이나 결로 흔적이 있는 벽면에도 시공할 수 있나요?',
      '기존 페인트나 탄성코트가 들떠 있는 경우 다시 시공할 수 있나요?',
      '벽면 일부만 오염된 경우 부분 보수가 가능한가요?',
      '탄성코트 시공 후 건조와 환기 관리는 어떻게 하나요?'
    ],
    relatedServices: ['탄성코트시공', '베란다탄성코트', '세탁실탄성코트', '탄성코트업체'],
    imagePlaceholderKey: 'ELASTIC_COATING_HERO'
  },
  {
    keyword: '탄성코트시공',
    breakParts: ['탄성코트', '시공'],
    serviceGroup: 'elastic',
    searchIntent: 'intent',
    primarySpace: '베란다 · 세탁실 · 다용도실',
    heroTitleTemplate: '공정 단계별 정밀 도포 마감',
    heroDescriptionTemplate: '시공 대상 주변 보양부터 기존 손상 도막 긁어내기, 벽면 균열 보수 필요 여부 확인 및 선택 자재 마감까지 정밀한 시공 과정과 기준을 안내합니다.',
    metaTitleTemplate: '탄성코트시공 과정 및 기준 안내',
    metaDescriptionTemplate: '탄성코트시공의 정밀한 바탕면 정리와 보수 범위 파악 기준을 안내합니다. 꼼꼼한 마감 결과를 확인하세요.',
    faqSet: [
      '탄성코트시공은 어떤 순서와 과정으로 진행되나요?',
      '기존 도막을 긁어내는 바탕 정리 작업이 왜 중요한가요?',
      '시공 작업 시 주변 오염을 방지하는 보양 작업은 어떻게 이루어지나요?',
      '시공 후 완충 건조 시간은 어떻게 관리되나요?',
      '시공 전 사용자가 미리 준비해야 할 사항은 무엇인가요?'
    ],
    relatedServices: ['탄성코트', '베란다탄성코트', '아파트탄성코트', '탄성코트업체'],
    imagePlaceholderKey: 'ELASTIC_COATING_HERO'
  },
  {
    keyword: '베란다탄성코트',
    breakParts: ['베란다', '탄성코트'],
    serviceGroup: 'elastic',
    searchIntent: 'space',
    primarySpace: '베란다',
    heroTitleTemplate: '온도차와 습기를 고려한 마감',
    heroDescriptionTemplate: '외부 온도 차이와 환기 상태에 노출되는 베란다 외벽 접점, 창 주변 균열 및 습기 오염 상태를 진단하여 필요한 바탕 정리와 마감 방향을 안내합니다.',
    metaTitleTemplate: '베란다탄성코트 시공 안내 | 오염 및 들뜸 예방',
    metaDescriptionTemplate: '베란다 벽면 탄성코트 시공 정보입니다. 창틀 주변 크랙 및 들뜬 도막 정돈을 중심으로 세밀하게 마감합니다.',
    faqSet: [
      '베란다 결로나 곰팡이 오염이 심한 벽면에도 시공이 가능한가요?',
      '베란다 창 주변이나 외벽 접점의 미세 균열은 어떻게 보수하나요?',
      '베란다와 연결된 실외기실이나 다용도실도 함께 확인할 수 있나요?',
      '기존 베란다 탄성코트가 들떠 있는 경우 어떻게 조치하나요?',
      '베란다 탄성코트 시공 후 환기와 습기 관리는 어떻게 하나요?'
    ],
    relatedServices: ['탄성코트', '탄성코트시공', '아파트탄성코트', '탄성코트업체'],
    imagePlaceholderKey: 'BALCONY_ELASTIC_IMAGE'
  },
  {
    keyword: '세탁실탄성코트',
    breakParts: ['세탁실', '탄성코트'],
    serviceGroup: 'elastic',
    searchIntent: 'space',
    primarySpace: '세탁실',
    heroTitleTemplate: '높은 습기를 방어하는 마감',
    heroDescriptionTemplate: '세탁기·건조기 사용과 배관·수도 설비가 있는 세탁실은 벽면의 습기 원인이 서로 다를 수 있습니다. 시공 전 물자국 위치, 배관 주변 상태, 기존 도막의 들뜸·박리 여부를 확인해 필요한 작업 범위를 구분합니다.',
    metaTitleTemplate: '세탁실탄성코트 맞춤형 벽면 관리 가이드',
    metaDescriptionTemplate: '세탁실 벽면 탄성코트 안내입니다. 배관 주위와 하단 코너의 곰팡이 방지 보수 및 탄성 마감을 제공합니다.',
    faqSet: [
      '습기와 물 사용이 많은 세탁실에도 탄성코트 시공이 가능한가요?',
      '세탁실 벽면의 물자국이 누수인지 결로인지 어떻게 확인하나요?',
      '기존 탄성코트가 들뜨거나 벗겨졌다면 어떻게 하나요?',
      '시공 전에 세탁기나 건조기를 이동해야 하나요?',
      '시공 후 환기와 건조는 어떻게 관리해야 하나요?'
    ],
    relatedServices: ['탄성코트', '탄성코트시공', '베란다탄성코트', '탄성코트업체'],
    imagePlaceholderKey: 'LAUNDRY_ELASTIC_IMAGE'
  },
  {
    keyword: '아파트탄성코트',
    breakParts: ['아파트', '탄성코트'],
    serviceGroup: 'elastic',
    searchIntent: 'space',
    primarySpace: '아파트 발코니 전역',
    heroTitleTemplate: '신축 및 구축 아파트 맞춤형 시공',
    heroDescriptionTemplate: '신축 아파트 입주 전 바탕 점검부터 구축 아파트 발코니 노후 도막 보수까지, 아파트 세대 환경에 맞춘 발코니 벽면 마감을 안내합니다.',
    metaTitleTemplate: '아파트탄성코트 확인 사항과 시공 기준',
    metaDescriptionTemplate: '아파트 베란다와 다용도실의 탄성코트 안내입니다. 들뜸과 오염을 예방하는 꼼꼼한 전처리 기준을 확인하세요.',
    faqSet: [
      '신축 아파트 입주 시에도 발코니 탄성코트 시공을 검토하나요?',
      '구축 아파트의 오래된 탄성코트나 수성페인트는 어떻게 작업하나요?',
      '아파트 입주 청소나 이사 일정 중 언제 탄성코트를 시공하는 것이 좋나요?',
      '아파트 베란다, 세탁실, 실외기실을 한 번에 확인할 수 있나요?',
      '현재 거주 중인 아파트 세대에서도 탄성코트 시공이 가능한가요?'
    ],
    relatedServices: ['탄성코트', '탄성코트시공', '베란다탄성코트', '탄성코트업체'],
    imagePlaceholderKey: 'ELASTIC_COATING_HERO'
  },
  {
    keyword: '탄성코트업체',
    breakParts: ['탄성코트', '업체'],
    serviceGroup: 'elastic',
    searchIntent: 'agency',
    primarySpace: '베란다 · 세탁실 벽체',
    heroTitleTemplate: '시공 전 확인 기준부터 비교하세요',
    heroDescriptionTemplate: '과장된 덧칠 시공 대신 바탕면 긁어내기 포함 여부, 보양 범위, 정직한 견적 구성 및 A/S 기준을 확인하는 업체 선택 가이드를 제공합니다.',
    metaTitleTemplate: '탄성코트업체 비교 및 선택 기준 안내',
    metaDescriptionTemplate: '탄성코트 전문 업체 선택 가이드입니다. 덧칠 대신 바탕면 긁어내기와 적절한 균열 보수 포함 여부 등 시공 과정 기준을 확인하세요.',
    faqSet: [
      '탄성코트 업체를 비교할 때 어떤 항목을 확인해야 하나요?',
      '탄성코트 시공 견적은 어떤 요소에 따라 차이가 나나요?',
      '바탕면 긁어내기 작업이나 균열 보수가 시공 범위에 포함되는지 확인하는 방법은?',
      '시공 후 A/S 및 사후 관리 기준은 어떻게 확인하나요?',
      '방문 전 현장 사진만으로 대략적인 업체 상담이 가능한가요?'
    ],
    relatedServices: ['탄성코트', '탄성코트시공', '베란다탄성코트', '세탁실탄성코트'],
    imagePlaceholderKey: 'ELASTIC_COATING_HERO'
  },

  // ---------------- 줄눈시공 서비스군 (6개) ----------------
  {
    keyword: '줄눈시공',
    breakParts: ['줄눈시공'],
    serviceGroup: 'grout',
    searchIntent: 'general',
    primarySpace: '욕실 · 화장실 · 현관 · 베란다',
    heroTitleTemplate: '기존 줄눈 상태에 맞춘 마감',
    heroDescriptionTemplate: '욕실과 현관 등 타일 틈의 기존 줄눈 오염과 갈라짐을 확인하고, 공간의 사용 환경에 맞는 자재와 색상을 안내합니다.',
    metaTitleTemplate: '줄눈시공 안내 | 타일 틈새 오염 관리 기준',
    metaDescriptionTemplate: '욕실 및 현관 타일 줄눈시공 안내입니다. 백시멘트 탈락 및 오염 상태를 진단하고 알맞은 친환경 줄눈제를 추천합니다.',
    faqSet: [
      '기존 줄눈을 제거하고 시공하나요?',
      '욕실와 현관에 같은 자재를 사용하나요?',
      '줄눈 일부만 보수할 수 있나요?',
      '시공 후 언제부터 물을 사용할 수 있나요?',
      '타일 색상에 맞춰 줄눈 색상을 선택할 수 있나요?',
      '오염된 줄눈 위에 바로 덧시공하나요?'
    ],
    relatedServices: ['욕실줄눈시공', '현관줄눈시공', '베란다줄눈시공', '줄눈시공업체'],
    imagePlaceholderKey: 'GROUT_HERO'
  },
  {
    keyword: '욕실줄눈시공',
    breakParts: ['욕실', '줄눈시공'],
    serviceGroup: 'grout',
    searchIntent: 'space',
    primarySpace: '욕실 바닥 및 샤워부스 벽면',
    heroTitleTemplate: '오염과 균열을 방지하는 정돈',
    heroDescriptionTemplate: '항상 물이 고이고 세제가 도포되는 욕실 바닥 타일의 백시멘트 부식을 진단하고, 방습력이 우수한 마감을 안내합니다.',
    metaTitleTemplate: '욕실줄눈시공 자재 선택과 청결 관리 가이드',
    metaDescriptionTemplate: '욕실 타일 줄눈시공 정보입니다. 변기 테두리 오염과 줄눈 갈라짐 현상을 해결하는 정교한 마감 방식을 설명합니다.',
    faqSet: [
      '기존 줄눈을 제거하고 시공하나요?',
      '시공 후 언제부터 물을 사용할 수 있나요?',
      '줄눈 일부만 보수할 수 있나요?',
      '오염된 줄눈 위에 바로 덧시공하나요?',
      '타일 색상에 맞춰 줄눈 색상을 선택할 수 있나요?'
    ],
    relatedServices: ['줄눈시공', '현관줄눈시공', '화장실줄눈시공', '줄눈시공업체'],
    imagePlaceholderKey: 'BATHROOM_GROUT_IMAGE'
  },
  {
    keyword: '현관줄눈시공',
    serviceGroup: 'grout',
    searchIntent: 'space',
    primarySpace: '현관 타일',
    heroTitleTemplate: '외부 오염물질 유입을 차단하는 마감',
    heroDescriptionTemplate: '흙먼지와 외부 오염물에 지속적으로 마모되는 현관 타일 틈의 내마모성 강화 줄눈 마감을 제공합니다.',
    metaTitleTemplate: '현관줄눈시공 조색 조합 및 마감 기준 안내',
    metaDescriptionTemplate: '현관 타일 틈새 줄눈시공 안내입니다. 오염 관리가 용이한 펄 및 메탈 색상 매칭과 테두리 코킹 마감을 안내합니다.',
    faqSet: [
      '기존 줄눈을 제거하고 시공하나요?',
      '타일 색상에 맞춰 줄눈 색상을 선택할 수 있나요?',
      '줄눈 일부만 보수할 수 있나요?',
      '오염된 줄눈 위에 바로 덧시공하나요?',
      '욕실과 현관에 같은 자재를 사용하나요?'
    ],
    relatedServices: ['줄눈시공', '욕실줄눈시공', '베란다줄눈시공', '줄눈시공업체'],
    imagePlaceholderKey: 'ENTRANCE_GROUT_IMAGE'
  },
  {
    keyword: '베란다줄눈시공',
    serviceGroup: 'grout',
    searchIntent: 'space',
    primarySpace: '베란다 타일',
    heroTitleTemplate: '비난방 공간의 수축 팽창에 강한 줄눈',
    heroDescriptionTemplate: '베란다 타일의 사계절 온도 변화에 유연하게 대처할 수 있는 탄성력 높은 줄눈 마감재를 배치합니다.',
    metaTitleTemplate: '베란다줄눈시공 온도 변화에 강한 자재 선정',
    metaDescriptionTemplate: '베란다 타일 틈새 줄눈시공 정보입니다. 온도와 습기 노출에 따른 백시멘트 유실 보강 및 경화 건조 과정을 설명합니다.',
    faqSet: [
      '기존 줄눈을 제거하고 시공하나요?',
      '시공 후 언제부터 물을 사용할 수 있나요?',
      '줄눈 일부만 보수할 수 있나요?',
      '욕실과 현관에 같은 자재를 사용하나요?',
      '타일 색상에 맞춰 줄눈 색상을 선택할 수 있나요?'
    ],
    relatedServices: ['줄눈시공', '욕실줄눈시공', '현관줄눈시공', '줄눈시공업체'],
    imagePlaceholderKey: 'BALCONY_GROUT_IMAGE'
  },
  {
    keyword: '줄눈시공업체',
    serviceGroup: 'grout',
    searchIntent: 'agency',
    primarySpace: '욕실 · 현관 타일 전 구역',
    heroTitleTemplate: '줄눈시공의 올바른 정돈 기준 비교',
    heroDescriptionTemplate: '눈으로 보이는 조색 펄의 화려함보다 타일 옆면의 기존 백시멘트를 정교한 깊이로 정돈해 채워 넣는 업체의 공정 기준을 분석합니다.',
    metaTitleTemplate: '줄눈시공업체 비교 포인트 및 품질 검토 가이드',
    metaDescriptionTemplate: '줄눈 전문 업체 선택 포인트입니다. 무조건적인 덧시공 방식을 차단하고 깔끔한 백시멘트 홈파기 및 채움 공정을 확인하세요.',
    faqSet: [
      '줄눈시공 업체의 견적은 어떤 내용을 비교해야 하나요?',
      '시공 전 기존 마감 상태를 확인하나요?',
      '시공 사례는 어떤 기준으로 확인해야 하나요?',
      '부분 보수와 전체 시공은 어떻게 구분하나요?',
      '기존 줄눈을 제거하고 시공하나요?'
    ],
    relatedServices: ['줄눈시공', '욕실줄눈시공', '현관줄눈시공', '화장실줄눈시공'],
    imagePlaceholderKey: 'GROUT_HERO'
  },
  {
    keyword: '화장실줄눈시공',
    serviceGroup: 'grout',
    searchIntent: 'space',
    primarySpace: '안방 및 공동 화장실 바닥',
    heroTitleTemplate: '화장실 물고임을 방지하는 견고한 라인',
    heroDescriptionTemplate: '화장실 변기 테두리 오염과 모서리 실리콘 코킹 부위의 곰팡이 침투를 억제하는 줄눈 라인을 구현합니다.',
    metaTitleTemplate: '화장실줄눈시공 범위 안내 및 보수 가이드',
    metaDescriptionTemplate: '화장실 타일 줄눈시공 안내입니다. 바닥 틈새 오염과 틈새 갈라짐을 방지하는 코팅 채움 시공을 설명합니다.',
    faqSet: [
      '기존 줄눈을 제거하고 시공하나요?',
      '시공 후 언제부터 물을 사용할 수 있나요?',
      '줄눈 일부만 보수할 수 있나요?',
      '오염된 줄눈 위에 바로 덧시공하나요?',
      '타일 색상에 맞춰 줄눈 색상을 선택할 수 있나요?'
    ],
    relatedServices: ['줄눈시공', '욕실줄눈시공', '현관줄눈시공', '줄눈시공업체'],
    imagePlaceholderKey: 'TOILET_GROUT_IMAGE'
  }
];
