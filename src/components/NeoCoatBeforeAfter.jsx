import React, { useState } from 'react';
import { getExactIntentCases } from '../data/caseData.js';

/**
 * 네오코트 시공 전후 비교 컴포넌트 (NeoCoatBeforeAfter)
 * - Exact Intent 시공 전후 증거 섹션
 * - PC: CASE별 [시공 전 | 시공 후] 1:1 좌우 비교 카드 + 하단 설명 캡션
 * - 모바일: 시공 전(사진+캡션) -> 시공 후(사진+캡션) 1컬럼 수직 스택
 * - 순수 시공 전후 팩트 기반 기술 (과장/인증/결로누수 확정 금지)
 * - 유효한 이미지가 없는 경우 자동 렌더링 생략 (null 반환, 0 gap)
 */
export function NeoCoatBeforeAfter({ parsedKeyword }) {
  const [imgErrors, setImgErrors] = useState({});

  const taskName = parsedKeyword?.service?.keyword;
  const cases = getExactIntentCases(taskName);

  if (!cases || cases.length === 0) {
    return null;
  }

  const handleImgError = (key) => {
    setImgErrors((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <section
      id="before-after"
      className="neo-before-after"
      aria-labelledby="before-after-title"
      style={{
        backgroundColor: '#FFFFFF',
        padding: '64px 0',
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
        {/* Section Header */}
        <div className="ba-header-box" style={{ textAlign: 'left', marginBottom: '36px' }}>
          <div
            className="uppercase-track"
            style={{
              fontSize: '13px',
              fontWeight: '700',
              color: 'var(--neo-color-accent, #0D9488)',
              letterSpacing: '1px',
              marginBottom: '8px',
            }}
          >
            BEFORE &amp; AFTER
          </div>
          <h2
            id="before-after-title"
            className="section-h2"
            style={{
              fontSize: '28px',
              fontWeight: '800',
              color: 'var(--neo-color-primary, #1E3A8A)',
              marginBottom: '12px',
              wordBreak: 'keep-all',
              lineHeight: '1.3',
            }}
          >
            실제 시공 전후를 비교해보세요
          </h2>
          <p
            className="ba-intro-desc"
            style={{
              fontSize: '15.5px',
              color: 'var(--neo-color-text-secondary, #475569)',
              margin: 0,
              lineHeight: '1.6',
              wordBreak: 'keep-all',
            }}
          >
            {taskName === '베란다탄성코트' ? (
              <>
                <span className="pc-text">베란다 벽면의 기존 상태를 정리하고 탄성코트로 마감한 실제 작업 사례입니다.</span>
                <span className="mo-text">베란다 벽면의 기존 상태를 정리하고<br />탄성코트로 마감한 실제 작업 사례입니다.</span>
              </>
            ) : (
              <>
                <span className="pc-text">오염된 기존 벽면을 정리하고 탄성코트로 마감한 실제 현장입니다.</span>
                <span className="mo-text">오염된 기존 벽면을 정리하고<br />탄성코트로 마감한 실제 현장입니다.</span>
              </>
            )}
          </p>
        </div>

        {/* Cases List */}
        <div className="ba-cases-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {cases.map((item, index) => {
            const beforeKey = `${item.id}-before`;
            const afterKey = `${item.id}-after`;

            return (
              <article
                key={item.id}
                className="ba-case-card"
                style={{
                  backgroundColor: 'var(--neo-color-bg-main, #F8FAFC)',
                  border: '1px solid var(--neo-color-border, #E2E8F0)',
                  borderRadius: '16px',
                  padding: '24px',
                }}
              >
                {/* Case Header Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                  <span
                    style={{
                      fontSize: '12.5px',
                      fontWeight: '800',
                      color: 'var(--neo-color-accent, #0D9488)',
                      backgroundColor: 'var(--neo-color-bg-teal-light, #ECFDF5)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {item.caseLabel || `CASE 0${index + 1}`}
                  </span>
                  <span
                    style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: 'var(--neo-color-primary, #1E3A8A)',
                    }}
                  >
                    {item.title}
                  </span>
                </div>

                {/* 2-Column or Stacked Grid */}
                <div className="ba-dual-grid">
                  {/* Before Side */}
                  <figure className="ba-item-figure" style={{ margin: 0 }}>
                    <div className="ba-img-container">
                      <span className="ba-badge before">BEFORE</span>
                      {!imgErrors[beforeKey] ? (
                        <img
                          src={item.beforeImage}
                          alt={item.beforeAlt}
                          loading="lazy"
                          decoding="async"
                          onError={() => handleImgError(beforeKey)}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: item.beforeObjectPosition || 'center',
                            display: 'block',
                          }}
                        />
                      ) : (
                        <div className="ba-fallback-box">시공 전 사진 준비 중</div>
                      )}
                    </div>
                    <figcaption
                      className="ba-caption before-caption"
                      style={{
                        marginTop: '12px',
                        fontSize: '14px',
                        color: 'var(--neo-color-text-secondary, #475569)',
                        lineHeight: '1.5',
                        wordBreak: 'keep-all',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px',
                      }}
                    >
                      <span style={{ color: '#94A3B8', flexShrink: 0, fontWeight: 'bold' }}>•</span>
                      <span>{item.beforeCaption}</span>
                    </figcaption>
                  </figure>

                  {/* After Side */}
                  <figure className="ba-item-figure" style={{ margin: 0 }}>
                    <div className="ba-img-container">
                      <span className="ba-badge after">AFTER</span>
                      {!imgErrors[afterKey] ? (
                        <img
                          src={item.afterImage}
                          alt={item.afterAlt}
                          loading="lazy"
                          decoding="async"
                          onError={() => handleImgError(afterKey)}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: item.afterObjectPosition || 'center',
                            display: 'block',
                          }}
                        />
                      ) : (
                        <div className="ba-fallback-box">시공 후 사진 준비 중</div>
                      )}
                    </div>
                    <figcaption
                      className="ba-caption after-caption"
                      style={{
                        marginTop: '12px',
                        fontSize: '14px',
                        color: 'var(--neo-color-primary, #1E3A8A)',
                        fontWeight: '600',
                        lineHeight: '1.5',
                        wordBreak: 'keep-all',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '6px',
                      }}
                    >
                      <span style={{ color: 'var(--neo-color-accent, #0D9488)', flexShrink: 0, fontWeight: 'bold' }}>✓</span>
                      <span>{item.afterCaption}</span>
                    </figcaption>
                  </figure>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .ba-dual-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }

        @media (min-width: 768px) {
          .ba-dual-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }

        .ba-img-container {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 12px;
          overflow: hidden;
          background-color: #E2E8F0;
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .ba-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 11.5px;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 6px;
          letter-spacing: 0.8px;
          z-index: 2;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        }

        .ba-badge.before {
          background-color: rgba(15, 23, 42, 0.78);
          color: #FFFFFF;
        }

        .ba-badge.after {
          background-color: var(--neo-color-accent, #0D9488);
          color: #FFFFFF;
        }

        .ba-fallback-box {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13.5px;
          color: #64748B;
          background-color: #F1F5F9;
        }

        .mo-text {
          display: none;
        }
        .pc-text {
          display: inline;
        }

        @media (max-width: 767px) {
          .neo-before-after {
            padding: 48px 0 !important;
          }
          .ba-case-card {
            padding: 16px !important;
            border-radius: 14px !important;
          }
          #before-after-title {
            font-size: 22px !important;
          }
          .pc-text {
            display: none !important;
          }
          .mo-text {
            display: inline !important;
          }
        }
      `,
        }}
      />
    </section>
  );
}

export default NeoCoatBeforeAfter;
