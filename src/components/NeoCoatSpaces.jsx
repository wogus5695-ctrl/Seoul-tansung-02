import React, { useState } from 'react';
import { brandConfig } from '../config/brandConfig.js';
import { imageConfig } from '../config/imageConfig.js';
import { getSpacesByGroupAndTask } from '../data/serviceSpaceContent.js';

/**
 * 네오코트 공간별 적용 범위 컴포넌트 (NeoCoatSpaces)
 * - 매거진형 비대칭 그리드: 대표 공간 2개 (큰 이미지 카드) + 작은 공간 4개 (2x2)
 * - 서비스군(elasticCoat vs grout) 및 동적 작업명에 따라 대표 공간 우선순위 정렬 (중복 없음)
 * - 이미지 유/무/에러 시 안전한 중립 아이콘 Placeholder 지원
 */
export function NeoCoatSpaces({ activeTab, parsedKeyword, isDesktop }) {
  const [imgError, setImgError] = useState({});
  const [showMore, setShowMore] = useState(false);

  const taskName = parsedKeyword ? parsedKeyword.service.keyword : '';
  const spaceList = getSpacesByGroupAndTask(activeTab, taskName);

  // 대표 공간 2개 + 작은 공간 4개 분리
  const primarySpaces = spaceList.slice(0, 2);
  const secondarySpaces = spaceList.slice(2, 6);

  const handleImageError = (id) => {
    setImgError(prev => ({ ...prev, [id]: true }));
  };

  // 공간 아이콘 SVG 맵
  const renderSpaceIcon = (id) => {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-accent, #0D9488)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  };

  return (
    <section
      aria-labelledby="spaces-title"
      style={{
        backgroundColor: 'var(--neo-color-bg-white, #FFFFFF)',
        padding: '80px 0',
        borderTop: '1px solid var(--neo-color-border, #E2E8F0)',
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
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div className="uppercase-track" style={{ marginBottom: '8px' }}>
            공간별 적용 안내
          </div>
          <h2
            id="spaces-title"
            className="section-h2"
            style={{
              color: 'var(--neo-color-primary, #1E3A8A)',
              marginBottom: '16px',
              wordBreak: 'keep-all',
            }}
          >
            같은 시공도 공간에 따라<br />확인해야 할 부분이 다릅니다
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
            베란다와 세탁실, 욕실과 현관은 습도와 오염 원인, 기존 마감 상태가 서로 다릅니다. 각 공간의 특징을 확인한 뒤 작업 범위를 구분해야 합니다.
          </p>
        </div>

        {/* Magazine-style Asymmetric Space Grid */}
        <div className="neo-spaces-magazine-grid">
          {/* Top Row: 2 Primary Large Space Cards */}
          <div className="primary-spaces-row">
            {(isDesktop || showMore ? primarySpaces : primarySpaces.slice(0, 1)).map((sp) => {
              const imageKey = `${activeTab}_${sp.id}`;
              const spImgSrc = imageConfig.spaceImages[imageKey] || imageConfig.spaceImages[sp.id] || '';

              return (
                <div key={sp.id} className="neo-primary-space-card">
                  <div className="primary-space-img-box">
                    {spImgSrc && !imgError[sp.id] ? (
                      <img
                        src={spImgSrc}
                        alt={`${sp.name} 적용 공간 시공 이미지`}
                        onError={() => handleImageError(sp.id)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="space-img-placeholder">
                        {renderSpaceIcon(sp.id)}
                        <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--neo-color-text-secondary, #475569)', marginTop: '6px' }}>
                          {sp.name} 이미지 등록 예정
                        </span>
                      </div>
                    )}
                    <div className="space-primary-tag">주요 적용 공간</div>
                  </div>

                  <div className="primary-space-info">
                    <h3 className="card-h3" style={{ fontSize: '19px', color: 'var(--neo-color-primary, #1E3A8A)', marginBottom: '6px' }}>
                      {sp.name}
                    </h3>
                    <p className="body-default" style={{ fontSize: '14.5px', color: 'var(--neo-color-text-secondary, #475569)', margin: 0, lineHeight: '1.55', wordBreak: 'keep-all' }}>
                      {sp.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Row: 4 Secondary Small Space Cards (2x2 Grid) */}
          <div className="secondary-spaces-grid">
            {(isDesktop || showMore ? secondarySpaces : secondarySpaces.slice(0, 2)).map((sp) => {
              const spImgSrc = imageConfig.spaceImages[sp.id] || '';

              return (
                <div key={sp.id} className="neo-secondary-space-card">
                  <div className="sec-space-header">
                    <div className="space-icon-circle">
                      {renderSpaceIcon(sp.id)}
                    </div>
                    <h3 className="card-h3" style={{ fontSize: '16.5px', color: 'var(--neo-color-primary, #1E3A8A)', margin: 0 }}>
                      {sp.name}
                    </h3>
                  </div>

                  <p className="body-default" style={{ fontSize: '14px', color: 'var(--neo-color-text-secondary, #475569)', margin: 0, lineHeight: '1.5', wordBreak: 'keep-all' }}>
                    {sp.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Show More toggle button for mobile */}
          {!isDesktop && spaceList.length > 3 && (
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="spaces-show-more-btn"
              style={{
                width: '100%',
                height: '44px',
                border: '1px solid var(--neo-color-border, #E2E8F0)',
                backgroundColor: 'var(--neo-color-bg-white, #FFFFFF)',
                borderRadius: '8px',
                fontSize: '14.5px',
                fontWeight: '600',
                color: 'var(--neo-color-primary, #1E3A8A)',
                cursor: 'pointer',
                marginTop: '12px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <span>{showMore ? '적용 공간 접기' : '다른 적용 공간 3곳 보기'}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                style={{
                  transform: showMore ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease'
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Spaces Magazine Grid Styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .neo-spaces-magazine-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .primary-spaces-row {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        @media (min-width: 1024px) {
          .primary-spaces-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
        }

        .neo-primary-space-card {
          background-color: var(--neo-color-bg-white, #FFFFFF);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.04);
          transition: transform 0.2s ease;
        }

        .neo-primary-space-card:hover {
          transform: translateY(-3px);
        }

        .primary-space-img-box {
          width: 100%;
          aspect-ratio: 16 / 9;
          background-color: #F1F5F9;
          position: relative;
        }

        .space-img-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 16px;
          text-align: center;
        }

        .space-primary-tag {
          position: absolute;
          top: 12px;
          left: 12px;
          background-color: rgba(30, 58, 138, 0.9);
          backdrop-filter: blur(4px);
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 12px;
        }

        .primary-space-info {
          padding: 20px;
          text-align: left;
        }

        .secondary-spaces-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 640px) {
          .secondary-spaces-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .secondary-spaces-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
        }

        .neo-secondary-space-card {
          background-color: var(--neo-color-bg-main, #F8FAFC);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 16px;
          padding: 20px;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.2s ease;
        }

        .neo-secondary-space-card:hover {
          border-color: rgba(13, 148, 136, 0.4);
        }

        .sec-space-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .space-icon-circle {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background-color: var(--neo-color-bg-teal-light, #ECFDF5);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 767px) {
          .spaces-show-more-btn {
            display: flex !important;
          }
          .neo-secondary-space-card {
            padding: 14px 18px !important;
            gap: 6px !important;
          }
          .neo-primary-space-card {
            border-radius: 12px !important;
          }
          .primary-space-info {
            padding: 16px !important;
          }
          .primary-space-info p {
            font-size: 13.5px !important;
            line-height: 1.5 !important;
          }
        }
      `,
        }}
      />
    </section>
  );
}

export default NeoCoatSpaces;
