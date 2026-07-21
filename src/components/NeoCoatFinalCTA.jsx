import React from 'react';
import { contactConfig } from '../config/contactConfig.js';
import { imageConfig } from '../config/imageConfig.js';

/**
 * 네오코트 최종 문의 CTA 섹션 (NeoCoatFinalCTA)
 * - 딥 블루 (`#1E3A8A`) 배경의 브랜드 하단 배너
 * - 사진 문의 CTA & 전화 상담 CTA 분기
 * - 전화번호/카카오URL 미확정 시 안전하게 `#contact` 앵커 이동 및 빈 링크 금지
 * - `imageConfig.finalCtaImage` 독립 이미지 필드 참조
 */
export function NeoCoatFinalCTA({ parsedKeyword, onNavigate }) {
  const getPhotoContactHref = () => {
    if (contactConfig && contactConfig.kakaoUrl && contactConfig.kakaoUrl.trim() !== '') {
      return contactConfig.kakaoUrl;
    }
    return parsedKeyword ? '/#contact' : '#contact';
  };

  const getPhoneContactHref = () => {
    if (contactConfig && contactConfig.phone && contactConfig.phone.trim() !== '') {
      return `tel:${contactConfig.phone.replace(/-/g, '')}`;
    }
    return null;
  };

  const handleCTAClick = (e, targetHref) => {
    if (targetHref && (targetHref.startsWith('#') || targetHref.startsWith('/#'))) {
      e.preventDefault();
      const el = document.querySelector('#contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (onNavigate) {
        onNavigate('/', '');
        setTimeout(() => {
          const targetEl = document.querySelector('#contact');
          if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  };

  const phoneHref = getPhoneContactHref();
  const photoHref = getPhotoContactHref();
  const finalCtaImgSrc = imageConfig.finalCtaImage || '';

  return (
    <section
      aria-labelledby="final-cta-title"
      style={{
        backgroundColor: 'var(--neo-color-primary, #1E3A8A)',
        color: '#FFFFFF',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Soft Accent Circle */}
      <div
        style={{
          position: 'absolute',
          bottom: '-30%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.15) 0%, rgba(30, 58, 138, 0) 70%)',
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      />

      <div
        style={{
          maxWidth: 'var(--desktop-max-width, 1280px)',
          width: '100%',
          margin: '0 auto',
          padding: '0 var(--mobile-side-margin, 20px)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="neo-final-cta-grid">
          {/* Left Text Block */}
          <div className="final-cta-text-block">
            <h2
              id="final-cta-title"
              className="section-h2"
              style={{
                color: '#FFFFFF',
                marginBottom: '16px',
                wordBreak: 'keep-all',
              }}
            >
              우리 집 공간에는<br />어떤 시공이 필요할까요?
            </h2>

            <p
              className="body-default"
              style={{
                color: 'rgba(255, 255, 255, 0.82)',
                marginBottom: '32px',
                maxWidth: '560px',
                wordBreak: 'keep-all',
                lineHeight: '1.65',
              }}
            >
              공간의 현재 상태와 기존 마감을 확인한 뒤 필요한 작업 범위를 안내해드립니다. 사진과 함께 문의하면 보다 구체적인 상담에 도움이 됩니다.
            </p>

            <div className="final-cta-btn-group">
              <a
                href={photoHref}
                onClick={(e) => handleCTAClick(e, photoHref)}
                className="btn-primary"
                style={{
                  height: '52px',
                  padding: '0 28px',
                  fontSize: '16px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                }}
              >
                사진으로 시공 문의
              </a>

              {phoneHref ? (
                <a
                  href={phoneHref}
                  className="btn-secondary"
                  style={{
                    height: '52px',
                    padding: '0 28px',
                    fontSize: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    textDecoration: 'none',
                  }}
                >
                  전화 상담
                </a>
              ) : (
                <button
                  disabled
                  className="btn-secondary"
                  style={{
                    height: '52px',
                    padding: '0 24px',
                    fontSize: '15px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.5)',
                    borderColor: 'transparent',
                    cursor: 'not-allowed',
                  }}
                >
                  전화 상담 (번호 등록 예정)
                </button>
              )}
            </div>
          </div>

          {/* Right Optional Image or Decorative Frame */}
          {finalCtaImgSrc && (
            <div className="final-cta-img-card">
              <img src={finalCtaImgSrc} alt="네오코트 최종 시공 문의 대표 이미지" />
            </div>
          )}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .neo-final-cta-grid {
          display: flex;
          flex-direction: column;
          gap: 32px;
          align-items: flex-start;
          text-align: left;
        }

        @media (min-width: 1024px) {
          .neo-final-cta-grid {
            display: grid;
            grid-template-columns: ${finalCtaImgSrc ? '60fr 40fr' : '1fr'};
            gap: 48px;
            align-items: center;
          }
        }

        .final-cta-text-block {
          display: flex;
          flex-direction: column;
        }

        .final-cta-btn-group {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .final-cta-btn-group .btn-primary,
        .final-cta-btn-group .btn-secondary {
          flex: 1;
          min-width: 160px;
        }

        @media (min-width: 640px) {
          .final-cta-btn-group .btn-primary,
          .final-cta-btn-group .btn-secondary {
            flex: initial;
          }
        }

        .final-cta-img-card {
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 20px;
          overflow: hidden;
          background-color: rgba(255, 255, 255, 0.1);
        }

        .final-cta-img-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `,
        }}
      />
    </section>
  );
}

export default NeoCoatFinalCTA;
