import React, { useState } from 'react';
import { contactConfig } from '../config/contactConfig.js';
import { imageConfig } from '../config/imageConfig.js';
import { getServicesByGroupAndTask } from '../data/serviceSpaceContent.js';

/**
 * 네오코트 서비스 구분 컴포넌트 (NeoCoatServices)
 * - 비대칭 그리드: 대표 서비스 카드 1개 (48~55%) + 보조 카드 3개
 * - 동적 작업명에 따라 대표 서비스 카드 우선순위 변경 (중복 없음)
 * - 대표 카드 하단에만 '시공 범위 상담하기' CTA 배치
 * - 이미지가 존재할 때만 표시하고, 미등록 시 중립 아이콘 Placeholder 안전 노출
 */
export function NeoCoatServices({ activeTab, onTabChange, parsedKeyword, onNavigate }) {
  const [imgError, setImgError] = useState({});

  const taskName = parsedKeyword ? parsedKeyword.service.keyword : '';
  const { primary, secondary } = getServicesByGroupAndTask(activeTab, taskName);

  // 문의 CTA 안전 링크 구하기
  const getContactHref = () => {
    if (contactConfig && contactConfig.kakaoUrl && contactConfig.kakaoUrl.trim() !== '') {
      return contactConfig.kakaoUrl;
    }
    if (contactConfig && contactConfig.phone && contactConfig.phone.trim() !== '') {
      return `tel:${contactConfig.phone.replace(/-/g, '')}`;
    }
    return parsedKeyword ? '/#contact' : '#contact';
  };

  const handleCTAClick = (e) => {
    const targetHref = getContactHref();
    if (targetHref.startsWith('#') || targetHref.startsWith('/#')) {
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

  const handleImageError = (id) => {
    setImgError(prev => ({ ...prev, [id]: true }));
  };

  // 서비스 아이콘 SVG 맵
  const renderServiceIcon = (id) => {
    if (id.includes('balcony') || id.includes('Balcony')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      );
    }
    if (id.includes('laundry') || id.includes('Laundry')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <circle cx="12" cy="13" r="5" stroke="var(--neo-color-accent, #0D9488)" />
          <circle cx="8" cy="6" r="1" fill="currentColor" />
        </svg>
      );
    }
    if (id.includes('bathroom') || id.includes('Bathroom')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1z" />
          <path d="M6 12V5a2 2 0 0 1 2-2h3" stroke="var(--neo-color-accent, #0D9488)" />
        </svg>
      );
    }
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" stroke="var(--neo-color-accent, #0D9488)" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    );
  };

  const primaryImgSrc = imageConfig.serviceImages[primary.id] || '';

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      style={{
        backgroundColor: 'var(--neo-color-bg-main, #F8FAFC)',
        padding: '80px 0',
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
            네오코트 서비스
          </div>
          <h2
            id="services-title"
            className="section-h2"
            style={{
              color: 'var(--neo-color-primary, #1E3A8A)',
              marginBottom: '16px',
              wordBreak: 'keep-all',
            }}
          >
            <span className="pc-only-services-title">공간과 마감 상태에 맞는<br />시공 서비스를 확인해보세요</span>
            <span className="mobile-only-services-title">현재 공간에 필요한<br />시공 범위를 확인하세요</span>
          </h2>
          <p
            className="body-default services-intro-desc"
            style={{
              color: 'var(--neo-color-text-secondary, #475569)',
              maxWidth: '640px',
              margin: '0 auto',
              wordBreak: 'keep-all',
            }}
          >
            벽면을 보호하고 정돈하는 탄성코트부터 타일 틈의 오염과 관리 불편을 줄이는 줄눈시공까지, 공간의 현재 상태와 사용 환경에 맞춰 필요한 작업 범위를 구분합니다.
          </p>
        </div>

        {/* 1. 서비스군 전환 탭 (Tablist) */}
        <div
          role="tablist"
          aria-label="서비스군 선택"
          className="neo-tab-list-container"
        >
          <button
            role="tab"
            aria-selected={activeTab === 'elasticCoat'}
            aria-controls="services-tabpanel-elasticCoat"
            id="services-tab-elasticCoat"
            onClick={() => onTabChange('elasticCoat')}
            className={`neo-service-tab-btn ${activeTab === 'elasticCoat' ? 'is-active' : ''}`}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>탄성코트</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'grout'}
            aria-controls="services-tabpanel-grout"
            id="services-tab-grout"
            onClick={() => onTabChange('grout')}
            className={`neo-service-tab-btn ${activeTab === 'grout' ? 'is-active' : ''}`}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="12" y1="3" x2="12" y2="21" />
            </svg>
            <span>줄눈시공</span>
          </button>
        </div>

        {/* 2. Tabpanel & Asymmetric Service Grid */}
        <div
          id={`services-tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`services-tab-${activeTab}`}
          className="neo-services-grid-wrapper"
        >
          {/* LEFT: 큰 대표 서비스 카드 (48~55%) */}
          <div className="neo-primary-service-card">
            <div className="primary-service-img-wrapper">
              {primaryImgSrc && !imgError[primary.id] ? (
                <img
                  src={primaryImgSrc}
                  alt={`${primary.title} 서비스 대표 이미지`}
                  onError={() => handleImageError(primary.id)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div className="service-img-placeholder">
                  {renderServiceIcon(primary.id)}
                  <span style={{ fontSize: '15px', fontWeight: '700', color: 'var(--neo-color-primary, #1E3A8A)', marginTop: '8px' }}>
                    {primary.title} 이미지 등록 예정
                  </span>
                </div>
              )}
              <div className="primary-badge">대표 추천 서비스</div>
            </div>

            <div className="primary-service-content">
              <h3 className="card-h3" style={{ color: 'var(--neo-color-primary, #1E3A8A)', marginBottom: '10px' }}>
                {primary.title}
              </h3>
              <p className="body-default" style={{ color: 'var(--neo-color-text-secondary, #475569)', marginBottom: '20px', lineHeight: '1.6', wordBreak: 'keep-all' }}>
                {primary.description}
              </p>

              {primary.checkpoints && (
                <div className="primary-checkpoints-wrapper">
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--neo-color-text-muted, #64748B)', marginBottom: '8px', display: 'block' }}>
                    핵심 확인사항
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {primary.checkpoints.map((pt, i) => (
                      <span key={i} className="checkpoint-chip">
                        ✓ {pt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="services-consultation-cta-container" style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--neo-color-border, #E2E8F0)' }}>
                <a
                  href={getContactHref()}
                  onClick={handleCTAClick}
                  className="btn-secondary"
                  style={{ width: '100%', textDecoration: 'none', height: '48px', fontSize: '15.5px' }}
                >
                  시공 범위 상담하기 →
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: 작은 보조 서비스 카드 3개 스택 (45~52%) */}
          <div className="neo-secondary-services-stack">
            {secondary.slice(0, 2).map((sec) => {
              const secImgSrc = imageConfig.serviceImages[sec.id] || '';

              return (
                <div key={sec.id} className="neo-secondary-service-card">
                  <div className="sec-icon-box">
                    {renderServiceIcon(sec.id)}
                  </div>
                  <div className="sec-content-box">
                    <h3 className="card-h3" style={{ fontSize: '17.5px', color: 'var(--neo-color-primary, #1E3A8A)', marginBottom: '6px' }}>
                      {sec.title}
                    </h3>
                    <p className="body-default" style={{ fontSize: '14.5px', color: 'var(--neo-color-text-secondary, #475569)', margin: 0, lineHeight: '1.55', wordBreak: 'keep-all' }}>
                      {sec.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Services Section Styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .neo-tab-list-container {
          display: flex;
          justify-content: center;
          gap: 8px;
          background-color: var(--neo-color-bg-white, #FFFFFF);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          padding: 6px;
          border-radius: 16px;
          max-width: 320px;
          margin: 0 auto 40px auto;
        }

        .neo-service-tab-btn {
          flex: 1;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 12px;
          border: none;
          background: transparent;
          color: var(--neo-color-text-secondary, #475569);
          font-weight: 600;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .neo-service-tab-btn:hover {
          background-color: var(--neo-color-bg-blue-light, #EFF6FF);
          color: var(--neo-color-primary, #1E3A8A);
        }

        .neo-service-tab-btn.is-active {
          background-color: var(--neo-color-primary, #1E3A8A);
          color: #FFFFFF;
        }

        .neo-services-grid-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        @media (min-width: 1024px) {
          .neo-services-grid-wrapper {
            display: grid;
            grid-template-columns: 50fr 50fr;
            gap: 32px;
            align-items: stretch;
          }
        }

        .neo-primary-service-card {
          background-color: var(--neo-color-bg-white, #FFFFFF);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.05);
        }

        .primary-service-img-wrapper {
          width: 100%;
          aspect-ratio: 16 / 9;
          background-color: #F1F5F9;
          position: relative;
        }

        .service-img-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          text-align: center;
        }

        .primary-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background-color: var(--neo-color-accent, #0D9488);
          color: #FFFFFF;
          font-size: 12.5px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .primary-service-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
          text-align: left;
        }

        .checkpoint-chip {
          background-color: var(--neo-color-bg-teal-light, #ECFDF5);
          color: var(--neo-color-accent, #0D9488);
          font-size: 13px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(13, 148, 136, 0.2);
        }

        .neo-secondary-services-stack {
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: space-between;
        }

        .neo-secondary-service-card {
          background-color: var(--neo-color-bg-white, #FFFFFF);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          text-align: left;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .neo-secondary-service-card:hover {
          transform: translateY(-2px);
          border-color: rgba(30, 58, 138, 0.3);
        }

        .sec-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: var(--neo-color-bg-blue-light, #EFF6FF);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sec-content-box {
          flex: 1;
        }

        .mobile-only-services-title {
          display: none;
        }
        .pc-only-services-title {
          display: inline;
        }

        @media (max-width: 767px) {
          .mobile-only-services-title {
            display: inline !important;
          }
          .pc-only-services-title {
            display: none !important;
          }
          .services-consultation-cta-container {
            display: none !important;
          }
          .neo-secondary-service-card {
            padding: 16px 20px !important;
            gap: 12px !important;
          }
          .sec-icon-box {
            width: 36px !important;
            height: 36px !important;
            border-radius: 8px !important;
          }
          .sec-icon-box svg {
            width: 18px !important;
            height: 18px !important;
          }
        }
      `,
        }}
      />
    </section>
  );
}

export default NeoCoatServices;
