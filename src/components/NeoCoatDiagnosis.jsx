import React, { useState } from 'react';
import { brandConfig } from '../config/brandConfig.js';
import { imageConfig } from '../config/imageConfig.js';
import { getDiagnosisItems } from '../data/diagnosisContent.js';

/**
 * 네오코트 공간 문제 진단 컴포넌트 (NeoCoatDiagnosis)
 * - PC: 좌측 대표 이미지/Placeholder (47%) + 우측 H2/도입문/아코디언 (53%) 비대칭
 * - 모바일: 1컬럼 수직배치 (라벨 -> H2 -> 도입문 -> 이미지 -> 아코디언 -> 주의문구)
 * - 접속 서비스군 및 12개 세부 작업명에 따른 첫 번째 문제 항목 우선순위 자동 정렬
 * - 접근성 ARIA (aria-expanded, aria-controls, button) 및 키보드 조작 완벽 지원
 */
export function NeoCoatDiagnosis({ parsedKeyword }) {
  const [openIndex, setOpenIndex] = useState(0); // 첫 번째 항목 기본 열림
  const [imgError, setImgError] = useState(false);

  // 동적/메인 구분
  const isDynamic = !!parsedKeyword;
  const serviceGroup = isDynamic ? (parsedKeyword.service.serviceGroup === 'elastic' ? 'elasticCoat' : 'grout') : 'main';

  // 문제 목록 추출 (작업명별 첫 번째 항목 자동 정렬 적용)
  const items = getDiagnosisItems(parsedKeyword);

  // 이미지 선택 (독립 분리 설정 참조)
  let currentDiagnosisImage = imageConfig.problemDiagnosisImage || '';
  if (serviceGroup === 'elasticCoat' && imageConfig.elasticCoatDiagnosisImage) {
    currentDiagnosisImage = imageConfig.elasticCoatDiagnosisImage;
  } else if (serviceGroup === 'grout' && imageConfig.groutDiagnosisImage) {
    currentDiagnosisImage = imageConfig.groutDiagnosisImage;
  }

  // 이미지 라벨
  const imageLabelText = !isDynamic
    ? '공간별 마감 상태 확인'
    : (serviceGroup === 'elasticCoat' ? '벽면 오염·들뜸·기존 도막 확인' : '타일 틈 오염·마모·기존 줄눈 확인');

  // ALT 문구 구조화
  const imageAltText = isDynamic
    ? `${parsedKeyword.region.displayName} ${parsedKeyword.service.keyword} 시공 전 상태 진단`
    : `${brandConfig.brandName} 시공 전 상태 진단 대표 이미지`;

  const toggleAccordion = (idx) => {
    setOpenIndex(prev => (prev === idx ? -1 : idx));
  };

  return (
    <section
      aria-labelledby="diagnosis-title"
      style={{
        backgroundColor: 'var(--neo-color-bg-white, #FFFFFF)',
        padding: '80px 0',
        borderTop: '1px solid var(--neo-color-border, #E2E8F0)',
        borderBottom: '1px solid var(--neo-color-border, #E2E8F0)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--desktop-max-width, 1280px)',
          width: '100%',
          margin: '0 auto',
          padding: '0 var(--mobile-side-margin, 20px)',
        }}
      >
        <div className="neo-diagnosis-grid">
          {/* ====================================================
             LEFT COLUMN: Diagnosis Representative Image Card (47%)
             ==================================================== */}
          <div className="neo-diagnosis-left">
            <div className="neo-diagnosis-img-card">
              {currentDiagnosisImage && !imgError ? (
                <img
                  src={currentDiagnosisImage}
                  alt={imageAltText}
                  onError={() => setImgError(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              ) : (
                /* Safe Neutral Image Placeholder */
                <div className="neo-diagnosis-placeholder">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="1.5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round"/>
                    <polyline points="10 9 9 9 8 9" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--neo-color-text-secondary, #475569)', marginTop: '10px' }}>
                    문제 공간 이미지 등록 예정
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--neo-color-text-muted, #64748B)', marginTop: '2px' }}>
                    ({imageLabelText})
                  </span>
                </div>
              )}

              {/* Bottom Overlay State Label */}
              <div className="neo-diagnosis-img-label">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-accent, #0D9488)" strokeWidth="2.2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                <span>{imageLabelText}</span>
              </div>
            </div>
          </div>

          {/* ====================================================
             RIGHT COLUMN: Titles & Diagnosis Accordions (53%)
             ==================================================== */}
          <div className="neo-diagnosis-right">
            {/* 1. Section Sub-label */}
            <div className="uppercase-track" style={{ marginBottom: '8px' }}>
              시공 전 확인사항
            </div>

            {/* 2. H2 Title */}
            <h2
              id="diagnosis-title"
              className="section-h2"
              style={{
                color: 'var(--neo-color-primary, #1E3A8A)',
                marginBottom: '16px',
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
              }}
            >
              표면의 문제보다<br />발생 원인을 먼저 확인합니다
            </h2>

            {/* 3. Introduction Description */}
            <p
              className="body-default"
              style={{
                color: 'var(--neo-color-text-secondary, #475569)',
                marginBottom: '28px',
                maxWidth: '580px',
                wordBreak: 'keep-all',
                lineHeight: '1.65',
              }}
            >
              곰팡이와 오염, 도막 들뜸이나 줄눈 변색은 공간의 습도와 사용 환경, 기존 마감 상태에 따라 원인이 달라질 수 있습니다. 시공 전 현재 상태와 작업 범위를 구분해서 확인해야 합니다.
            </p>

            {/* 4. Diagnosis Accordion List */}
            <div className="neo-accordion-group">
              {items.map((item, idx) => {
                const isOpen = openIndex === idx;
                const accordionHeaderId = `diagnosis-header-${idx}`;
                const accordionPanelId = `diagnosis-panel-${idx}`;

                return (
                  <div
                    key={item.id}
                    className={`neo-accordion-item ${isOpen ? 'is-open' : ''}`}
                  >
                    <button
                      id={accordionHeaderId}
                      aria-expanded={isOpen}
                      aria-controls={accordionPanelId}
                      onClick={() => toggleAccordion(idx)}
                      className="neo-accordion-btn"
                      type="button"
                    >
                      <span className="accordion-title-text">
                        <span className="accordion-num">0{idx + 1}</span>
                        {item.title}
                      </span>
                      <svg
                        className="accordion-arrow-icon"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div
                        id={accordionPanelId}
                        role="region"
                        aria-labelledby={accordionHeaderId}
                        className="neo-accordion-body"
                      >
                        <p className="body-default" style={{ margin: 0, fontSize: '15px', color: 'var(--neo-color-text-secondary, #475569)', lineHeight: '1.6' }}>
                          {item.content}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 5. Informational Caution Box */}
            <div className="neo-diagnosis-caution-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span style={{ fontSize: '13.5px', color: 'var(--neo-color-text-secondary, #475569)', lineHeight: '1.55', wordBreak: 'keep-all' }}>
                결로, 곰팡이, 누수, 도막 손상은 발생 원인이 다를 수 있습니다. 현장 상태에 따라 탄성코트나 줄눈시공 외의 보수 작업이 먼저 필요할 수 있습니다.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnosis Section Layout & Responsive Styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .neo-diagnosis-grid {
          display: flex;
          flex-direction: column;
          gap: 36px;
        }

        @media (min-width: 1024px) {
          .neo-diagnosis-grid {
            display: grid;
            grid-template-columns: 46fr 54fr;
            gap: 48px;
            align-items: start;
          }
        }

        .neo-diagnosis-left {
          width: 100%;
        }

        .neo-diagnosis-img-card {
          width: 100%;
          aspect-ratio: 4 / 3;
          background-color: var(--neo-color-bg-main, #F8FAFC);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 20px;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 1024px) {
          .neo-diagnosis-img-card {
            position: sticky;
            top: 100px;
          }
        }

        .neo-diagnosis-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          text-align: center;
          background-color: #F1F5F9;
        }

        .neo-diagnosis-img-label {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(4px);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          padding: 10px 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--neo-color-primary, #1E3A8A);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
        }

        .neo-diagnosis-right {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .neo-accordion-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .neo-accordion-item {
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 12px;
          background-color: var(--neo-color-bg-white, #FFFFFF);
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .neo-accordion-item.is-open {
          border-color: rgba(30, 58, 138, 0.3);
          box-shadow: 0 4px 14px -2px rgba(15, 23, 42, 0.04);
        }

        .neo-accordion-btn {
          width: 100%;
          min-height: 52px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: var(--neo-color-primary, #1E3A8A);
          font-weight: 700;
          font-size: 16.5px;
        }

        .accordion-title-text {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .accordion-num {
          font-size: 13px;
          font-weight: 700;
          color: var(--neo-color-accent, #0D9488);
          background-color: var(--neo-color-bg-teal-light, #ECFDF5);
          padding: 2px 8px;
          border-radius: 6px;
        }

        .accordion-arrow-icon {
          color: var(--neo-color-text-muted, #64748B);
          flex-shrink: 0;
        }

        .neo-accordion-body {
          padding: 0 20px 18px 20px;
          border-top: 1px dashed var(--neo-color-border, #E2E8F0);
          padding-top: 14px;
        }

        .neo-diagnosis-caution-box {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background-color: var(--neo-color-bg-blue-light, #EFF6FF);
          border: 1px solid rgba(30, 58, 138, 0.15);
          padding: 14px 18px;
          border-radius: 12px;
        }
      `,
        }}
      />
    </section>
  );
}

export default NeoCoatDiagnosis;
