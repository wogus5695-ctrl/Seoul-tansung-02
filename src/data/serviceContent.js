import { serviceKeywords } from './serviceKeywords.js';

// 서비스군별 기본 Hero 설명 데이터
export const groupDescriptions = {
  elasticCoat: "베란다·세탁실·실외기실의 기존 벽면과 오염 상태를 확인하고,\n보양부터 바탕 정리와 마감까지 필요한 작업 범위를 안내합니다.",
  grout: "욕실·화장실·현관 타일 틈의 오염과 기존 백시멘트 상태를 확인하고,\n공간에 맞는 줄눈시공 범위와 관리 방법을 안내합니다."
};

// 서비스군별 이미지 라벨
export const groupLabels = {
  elasticCoat: "벽면 상태 확인부터 마감까지",
  grout: "타일 틈 상태 확인부터 마감까지"
};

// 작업명별 세부 조정 원고 데이터 구조
export const serviceContent = serviceKeywords.reduce((acc, item) => {
  const isElastic = item.serviceGroup === 'elastic';
  const groupKey = isElastic ? 'elasticCoat' : 'grout';
  
  let specificDescription = groupDescriptions[groupKey];
  let imageLabel = groupLabels[groupKey];

  if (item.keyword === '베란다탄성코트') {
    specificDescription = "베란다 내외벽의 외부 온도차와 습기 노출도, 창 주변 균열을 정밀 진단하여 결로와 오염에 강한 마감을 지원합니다.";
  } else if (item.keyword === '세탁실탄성코트') {
    specificDescription = "지속적인 배수와 환기 부족으로 오염되기 쉬운 세탁실 배관 및 세탁기 주변 벽체의 기존 마감 상태를 진단합니다.";
  } else if (item.keyword === '아파트탄성코트') {
    specificDescription = "신축 입주 및 구축 리모델링 아파트 발코니 전역의 노후 상태를 체크하여 균열 보수와 세라믹 탄성 마감을 제안합니다.";
  } else if (item.keyword === '욕실줄눈시공') {
    specificDescription = "항상 물이 고이고 세제가 도포되는 욕실 타일의 백시멘트 부식을 정돈하고, 방습력과 청결 관리가 뛰어난 줄눈을 시공합니다.";
  } else if (item.keyword === '현관줄눈시공') {
    specificDescription = "흙먼지와 외부 오염물 유입이 심한 현관 바닥 타일 틈의 내마모성 강화 및 타일 톤과 어울리는 맞춤 조색 줄눈을 안내합니다.";
  }

  acc[item.keyword] = {
    keyword: item.keyword,
    serviceGroup: groupKey,
    heroTitleTemplate: item.heroTitleTemplate,
    heroDescriptionTemplate: specificDescription,
    imageLabel: imageLabel,
    primarySpace: item.primarySpace,
    faqSet: item.faqSet,
  };
  return acc;
}, {});
