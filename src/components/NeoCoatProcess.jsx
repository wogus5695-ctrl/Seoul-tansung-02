import React, { useState } from 'react';
import { imageConfig } from '../config/imageConfig.js';
import { getProcessStepsData } from '../data/processData.js';

/**
 * 네오코트 작업 과정 컴포넌트 (NeoCoatProcess)
 * - `#process` 앵커 연동 (헤더의 '시공 과정' 메뉴 연결)
 * - 밝은 배경 (#F8FAFC) 세로형 프로세스 보드
 * - 서비스군(탄성코트 6단계 vs 줄눈시공 6단계) 및 동적 작업명 관련 단계 제한적 포인트 강조
 * - 이미지 유/무/에러 시 안전한 중립 아이콘 Placeholder 및 구조화 ALT 제공
 */
export function NeoCoatProcess({ activeTab, onTabChange, parsedKeyword }) {
  const [imgError, setImgError] = useState({});

  const taskName = parsedKeyword ? parsedKeyword.service.keyword : '';
  const { steps, highlightKeys } = getProcessStepsData(activeTab, taskName);

  const handleImageError = (key) => {
    setImgError(prev => ({ ...prev, [key]: true }));
  };

  // 과정 단계별 아이콘 맵
  const renderStepIcon = (key) => {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    );
  };

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      style={{
        backgroundColor: 'var(--neo-color-bg-main, #F8FAFC)',
        padding: '88px 0',
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
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className="uppercase-track" style={{ marginBottom: '8px' }}>
            작업 과정
          </div>
          <h2
            id="process-title"
            className="section-h2"
            style={{
              color: 'var(--neo-color-primary, #1E3A8A)',
              marginBottom: '16px',
              wordBreak: 'keep-all',
            }}
          >
            시공 결과는<br />과정에서 결정됩니다
          </h2>
          <p
            className="body-default"
            style={{
              color: 'var(--neo-color-text-secondary, #475569)',
              maxWidth: '640px',
              margin: '0 auto',
              wordBreak: 'keep-all',
            }}
          >
            작업 공간과 기존 마감 상태에 따라 세부 공정은 달라질 수 있습니다. 네오코트는 상담부터 마감 확인까지 필요한 과정을 순서대로 안내합니다.
          </p>
        </div>

        {/* 서비스군 전환 탭 (Process Independent / Synced Tab) */}
        <div
          role="tablist"
          aria-label="작업 과정 서비스 선택"
          className="neo-tab-list-container"
          style={{ marginBottom: '48px' }}
        >
          <button
            role="tab"
            aria-selected={activeTab === 'elasticCoat'}
            aria-controls="process-tabpanel-elasticCoat"
            id="process-tab-elasticCoat"
            onClick={() => onTabChange('elasticCoat')}
            className={`neo-service-tab-btn ${activeTab === 'elasticCoat' ? 'is-active' : ''}`}
            type="button"
          >
            <span>탄성코트 작업 과정</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'grout'}
            aria-controls="process-tabpanel-grout"
            id="process-tab-grout"
            onClick={() => onTabChange('grout')}
            className={`neo-service-tab-btn ${activeTab === 'grout' ? 'is-active' : ''}`}
            type="button"
          >
            <span>줄눈시공 작업 과정</span>
          </button>
        </div>

        {/* Vertical Process Board Stack (ol & li semantic structure) */}
        <div
          id={`process-tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`process-tab-${activeTab}`}
        >
          <ol className="neo-process-board-list">
            {steps.map((st) => {
              const isHighlighted = highlightKeys.includes(st.key);
              const groupImages = imageConfig.processImages[activeTab] || {};
              const stepImgSrc = groupImages[st.key] || '';
              
              // ALT text construction
              const altText = activeTab === 'elasticCoat'
                ? `탄성코트 ${st.stepNum}단계 ${st.title} 시공 과정`
                : `줄눈시공 ${st.stepNum}단계 ${st.title} 시공 과정`;

              return (
                <li
                  key={st.key}
                  className={`neo-process-step-card ${isHighlighted ? 'is-highlighted' : ''}`}
                >
                  {/* Left Column: Number, Title, Description */}
                  <div className="process-text-col">
                    <div className="process-step-header">
                      <span className="process-num-badge">STEP 0{st.stepNum}</span>
                      {isHighlighted && <span className="highlight-tag">핵심 점검 단계</span>}
                    </div>
                    <h3 className="card-h3" style={{ fontSize: '19px', color: 'var(--neo-color-primary, #1E3A8A)', marginBottom: '8px' }}>
                      {st.title}
                    </h3>
                    <p className="body-default" style={{ fontSize: '15px', color: 'var(--neo-color-text-secondary, #475569)', margin: 0, lineHeight: '1.6', wordBreak: 'keep-all' }}>
                      {st.desc}
                    </p>
                  </div>

                  {/* Right Column: Step Image or Placeholder */}
                  <div className="process-img-col">
                    {stepImgSrc && !imgError[st.key] ? (
                      <img
                        src={stepImgSrc}
                        alt={altText}
                        onError={() => handleImageError(st.key)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="process-placeholder">
                        {renderStepIcon(st.key)}
                        <span style={{ fontSize: '13.5px', fontWeight: '600', color: 'var(--neo-color-text-secondary, #475569)', marginTop: '6px' }}>
                          과정 이미지 등록 예정
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Bottom Informational Caution Note */}
          <div className="neo-process-caution-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span style={{ fontSize: '13.5px', color: 'var(--neo-color-text-secondary, #475569)', lineHeight: '1.55', wordBreak: 'keep-all' }}>
              현장 상태와 기존 마감, 작업 공간의 크기에 따라 실제 공정과 작업 시간은 달라질 수 있습니다. 누수나 구조적 균열이 의심되는 경우에는 원인 확인 또는 별도의 보수 작업이 먼저 필요할 수 있습니다.
            </span>
          </div>
        </div>
      </div>

      {/* Process Section Styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .neo-process-board-list {
          list-style: none;
          padding: 0;
          margin: 0 0 32px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .neo-process-step-card {
          background-color: var(--neo-color-bg-white, #FFFFFF);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        @media (min-width: 768px) {
          .neo-process-step-card {
            display: grid;
            grid-template-columns: 1fr 220px;
            gap: 24px;
            align-items: center;
          }
        }

        .neo-process-step-card.is-highlighted {
          border-color: var(--neo-color-accent, #0D9488);
          box-shadow: 0 4px 20px -4px rgba(13, 148, 136, 0.12);
        }

        .process-text-col {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .process-step-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .process-num-badge {
          font-size: 12.5px;
          font-weight: 800;
          color: var(--neo-color-primary, #1E3A8A);
          background-color: var(--neo-color-bg-blue-light, #EFF6FF);
          padding: 3px 10px;
          border-radius: 8px;
        }

        .highlight-tag {
          font-size: 12px;
          font-weight: 700;
          color: var(--neo-color-accent, #0D9488);
          background-color: var(--neo-color-bg-teal-light, #ECFDF5);
          padding: 3px 10px;
          border-radius: 8px;
          border: 1px solid rgba(13, 148, 136, 0.25);
        }

        .process-img-col {
          width: 100%;
          aspect-ratio: 16 / 10;
          background-color: #F1F5F9;
          border-radius: 14px;
          overflow: hidden;
        }

        .process-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px;
          text-align: center;
        }

        .neo-process-caution-box {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background-color: var(--neo-color-bg-blue-light, #EFF6FF);
          border: 1px solid rgba(30, 58, 138, 0.15);
          padding: 16px 20px;
          border-radius: 14px;
          text-align: left;
        }
      `,
        }}
      />
    </section>
  );
}

export default NeoCoatProcess;
