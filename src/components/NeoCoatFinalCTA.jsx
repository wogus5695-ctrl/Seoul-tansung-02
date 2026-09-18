import React from 'react';
import { contactConfig } from '../config/contactConfig.js';
import { imageConfig } from '../config/imageConfig.js';

// Intent별 3가지 사진 상담 안내 데이터
const CONSULTATION_GUIDE_BY_INTENT = {
  '세탁실탄성코트': [
    {
      num: '01',
      title: '공간 전체',
      desc: '세탁실 전체 구조와 벽면이 보이는 사진'
    },
    {
      num: '02',
      title: '문제가 있는 부분',
      desc: '곰팡이·오염·들뜸 등이 보이는 벽면'
    },
    {
      num: '03',
      title: '주변 설비',
      desc: '배관·수도 설비·창틀 등 주변 환경'
    }
  ],
  '베란다탄성코트': [
    {
      num: '01',
      title: '공간 전체',
      desc: '베란다 전체 구조와 벽면이 보이는 사진'
    },
    {
      num: '02',
      title: '문제가 있는 부분',
      desc: '곰팡이·오염·들뜸 또는 창틀 주변 상태가 보이는 부분'
    },
    {
      num: '03',
      title: '주변 환경',
      desc: '창틀·샷시·우수관 등 벽면과 접하는 주변 환경'
    }
  ]
};

/**
 * 네오코트 최종 문의 CTA 섹션 (NeoCoatFinalCTA)
 * - 딥 블루 (`#1E3A8A`) 배경의 브랜드 하단 배너
 * - 세탁실/베란다탄성코트: MO 복원 + 3가지 사진 안내 가이드 카드 탑재
 * - 기타 Intent: 기존 PC 배너 유지 및 MO 비노출 격리
 * - 전화번호/카카오URL 미확정 시 안전하게 `#contact` 앵커 이동 및 빈 링크 방지
 */
export function NeoCoatFinalCTA({ parsedKeyword, onNavigate }) {
  const taskName = parsedKeyword?.service?.keyword;
  const isConsultationActive = taskName === '세탁실탄성코트' || taskName === '베란다탄성코트';
  const guideItems = CONSULTATION_GUIDE_BY_INTENT[taskName] || CONSULTATION_GUIDE_BY_INTENT['세탁실탄성코트'];

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
      className={`neo-final-cta-section ${isConsultationActive ? 'is-laundry-pilot' : 'is-legacy'}`}
      aria-labelledby="final-cta-title"
      style={{
        backgroundColor: 'var(--neo-color-primary, #1E3A8A)',
        color: '#FFFFFF',
        padding: '72px 0',
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
        {isConsultationActive ? (
          /* ============================================================ */
          /* 탄성코트 PILOT: 사진 상담 안내 중심 FINAL CONSULTATION */
          /* ============================================================ */
          <div className="laundry-pilot-consultation">
            <div className="consultation-header">
              <div className="consultation-eyebrow">CONSULTATION</div>
              <h2 id="final-cta-title" className="section-h2 consultation-title">
                우리 집도 시공이 필요한지<br />먼저 확인하세요
              </h2>
              <p className="body-default consultation-intro">
                사진으로 문의하실 때 아래 부분이 보이면 공간 상태를 확인하는 데 도움이 됩니다.
              </p>
            </div>

            {/* 3 Guide Cards */}
            <div className="consultation-guide-grid">
              {guideItems.map(item => (
                <div key={item.num} className="guide-card">
                  <div className="guide-card-header">
                    <span className="guide-num">{item.num}</span>
                    <span className="guide-name">{item.title}</span>
                  </div>
                  <p className="guide-desc">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* 2 CTA Buttons */}
            <div className="consultation-btn-group">
              {contactConfig.kakaoUrl && contactConfig.kakaoUrl.trim() !== '' ? (
                <a
                  href={contactConfig.kakaoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary consultation-kakao-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>카카오톡으로 사진 보내기</span>
                </a>
              ) : (
                <a
                  href={photoHref}
                  onClick={(e) => handleCTAClick(e, photoHref)}
                  className="btn-primary consultation-kakao-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>카카오톡으로 사진 보내기</span>
                </a>
              )}

              {phoneHref ? (
                <a
                  href={phoneHref}
                  className="btn-secondary consultation-phone-btn"
                >
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>전화로 상담하기</span>
                </a>
              ) : (
                <a
                  href="#contact"
                  onClick={(e) => handleCTAClick(e, '#contact')}
                  className="btn-secondary consultation-phone-btn"
                >
                  <span>전화로 상담하기</span>
                </a>
              )}
            </div>
          </div>
        ) : (
          /* ============================================================ */
          /* 기타 INTENT: 기존 레이아웃 보존                             */
          /* ============================================================ */
          <div className="neo-final-cta-grid">
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
                  href={`tel:${contactConfig.phone}`}
                  className="btn-secondary"
                  style={{
                    height: '52px',
                    padding: '0 28px',
                    fontSize: '16px',
                    borderRadius: '12px',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700'
                  }}
                >
                  전화 문의
                </a>

                {contactConfig.kakaoUrl && contactConfig.kakaoUrl.trim() !== '' ? (
                  <a
                    href={contactConfig.kakaoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{
                      height: '52px',
                      padding: '0 28px',
                      fontSize: '16px',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700'
                    }}
                  >
                    카카오 문의
                  </a>
                ) : (
                  <button
                    disabled
                    className="btn-primary"
                    style={{
                      height: '52px',
                      padding: '0 24px',
                      fontSize: '15px',
                      borderRadius: '12px',
                      opacity: 0.5,
                      cursor: 'not-allowed',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700'
                    }}
                  >
                    카카오 문의 (준비중)
                  </button>
                )}
              </div>
            </div>

            {finalCtaImgSrc && (
              <div className="final-cta-img-card">
                <img src={finalCtaImgSrc} alt="네오코트 최종 시공 문의 대표 이미지" />
              </div>
            )}
          </div>
        )}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Pilot Consultation Styling */
        .laundry-pilot-consultation {
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .consultation-header {
          margin-bottom: 28px;
          max-width: 680px;
        }

        .consultation-eyebrow {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 2px;
          color: var(--neo-color-accent, #0D9488);
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .consultation-title {
          color: #FFFFFF;
          margin-bottom: 14px;
          word-break: keep-all;
          line-height: 1.35;
        }

        .consultation-intro {
          color: rgba(255, 255, 255, 0.82);
          margin: 0 auto;
          word-break: keep-all;
          line-height: 1.6;
          font-size: 15.5px;
        }

        .consultation-guide-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
          max-width: 920px;
          margin-bottom: 32px;
          text-align: left;
        }

        .guide-card {
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .guide-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .guide-num {
          font-size: 12.5px;
          font-weight: 800;
          color: var(--neo-color-accent, #0D9488);
          background-color: rgba(13, 148, 136, 0.18);
          padding: 2px 7px;
          border-radius: 6px;
        }

        .guide-name {
          font-size: 16px;
          font-weight: 700;
          color: #FFFFFF;
        }

        .guide-desc {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.78);
          margin: 0;
          line-height: 1.5;
          word-break: keep-all;
        }

        .consultation-btn-group {
          display: flex;
          gap: 12px;
          justify-content: center;
          width: 100%;
          max-width: 500px;
        }

        .consultation-kakao-btn, .consultation-phone-btn {
          flex: 1;
          height: 50px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-decoration: none;
          white-space: nowrap;
        }

        .consultation-phone-btn {
          background-color: transparent;
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.35);
        }
        .consultation-phone-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        /* Legacy Styling */
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

        /* Responsive Mobile Behavior */
        @media (max-width: 767px) {
          .consultation-title {
            font-size: 22px !important;
          }
          .consultation-intro {
            font-size: 14px !important;
          }
          .consultation-guide-grid {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
            margin-bottom: 24px !important;
          }
          .guide-card {
            padding: 14px 16px !important;
          }
          .guide-name {
            font-size: 15px !important;
          }
          .guide-desc {
            font-size: 13px !important;
          }
          .consultation-btn-group {
            flex-direction: column !important;
            gap: 10px !important;
            max-width: 100% !important;
          }
          .consultation-kakao-btn, .consultation-phone-btn {
            width: 100% !important;
            height: 48px !important;
            font-size: 14.5px !important;
          }

          /* Pilot: MO visible */
          .neo-final-cta-section.is-laundry-pilot {
            display: block !important;
            padding: 56px 0 !important;
          }

          /* Legacy non-pilot: keep hidden on MO */
          .neo-final-cta-section.is-legacy {
            display: none !important;
          }
        }
      `,
        }}
      />
    </section>
  );
}

export default NeoCoatFinalCTA;
