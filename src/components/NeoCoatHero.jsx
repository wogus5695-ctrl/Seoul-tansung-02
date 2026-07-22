import React, { useState } from 'react';
import { brandConfig } from '../config/brandConfig.js';
import { contactConfig } from '../config/contactConfig.js';
import { imageConfig } from '../config/imageConfig.js';
import { serviceContent } from '../data/serviceContent.js';

/**
 * 네오코트 전용 비대칭 분할형 Hero 컴포넌트 (NeoCoatHero)
 * - PC: 좌측 텍스트 (45%), 우측 이미지 (55%) 비대칭 분할
 * - 모바일: 수직 배치, 모바일 최적화 폰트 및 여백
 * - 메인 vs 동적 키워드 H1 / 보조설명 / 서비스군(elasticCoat vs grout) 자동 분기
 * - 이미지 유/무/에러 시 안전한 중립 Placeholder 지원
 */
export function NeoCoatHero({ parsedKeyword, onNavigate }) {
  const [imgError, setImgError] = useState(false);

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

  // 서비스 확인 CTA 안전 링크 구하기
  const getServicesHref = () => {
    return parsedKeyword ? '/#services' : '#services';
  };

  const handleCTAClick = (e, targetHref, anchorId) => {
    if (targetHref.startsWith('#') || targetHref.startsWith('/#')) {
      e.preventDefault();
      const el = document.querySelector(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (onNavigate) {
        onNavigate('/', '');
        setTimeout(() => {
          const targetEl = document.querySelector(anchorId);
          if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    }
  };

  // 동적/메인 데이터 바인딩
  const isDynamic = !!parsedKeyword;
  const regionName = isDynamic ? parsedKeyword.region.displayName : '';
  const taskName = isDynamic ? parsedKeyword.service.keyword : '';
  const serviceGroup = isDynamic ? (parsedKeyword.service.serviceGroup === 'elastic' ? 'elasticCoat' : 'grout') : 'main';

  // 세부 문구 정보 추출
  const currentServiceInfo = isDynamic && serviceContent[taskName] ? serviceContent[taskName] : null;

  // 1. 상단 라벨
  const heroBadgeLabel = isDynamic
    ? `${regionName} ${taskName} 시공 안내`
    : brandConfig.businessType;

  // 2. H1 제목
  const heroH1 = isDynamic ? (
    <>
      <span style={{ color: 'var(--neo-color-accent, #0D9488)', fontWeight: '800' }}>
        {regionName} {taskName}
      </span>
      ,<br />
      <span style={{ color: 'var(--neo-color-primary, #1E3A8A)' }}>
        공간 상태부터 확인하고 시공합니다
      </span>
    </>
  ) : (
    <>
      <span style={{ color: 'var(--neo-color-primary, #1E3A8A)' }}>
        공간을 오래 지키는
      </span>
      <br />
      <span style={{ color: 'var(--neo-color-accent, #0D9488)', fontWeight: '800' }}>
        새로운 코팅 기준
      </span>
    </>
  );

  // 3. 보조 설명
  const heroDescription = isDynamic
    ? (currentServiceInfo ? currentServiceInfo.heroDescriptionTemplate : '공간에 필요한 작업 범위를 정확히 확인하고 세대 환경에 부합하는 마감 시공을 안내합니다.')
    : '베란다와 세탁실의 벽면 상태부터 욕실과 현관의 타일 틈까지, 공간에 필요한 작업 범위를 확인하고 적합한 시공 방향을 안내합니다.';

  // 4. 이미지 우측 상단 정보 라벨
  const imageInfoLabel = isDynamic
    ? (serviceGroup === 'elasticCoat' ? '벽면 상태 확인부터 마감까지' : '타일 틈 상태 확인부터 마감까지')
    : '탄성코트·줄눈시공 전문 케어';

  // 5. 품질 배지
  const qualityBadge = isDynamic
    ? (serviceGroup === 'elasticCoat' ? '바탕 상태 확인' : '기존 줄눈 상태 확인')
    : '공정별 체크';

  // ALT 태그 구조화
  const imageAltText = isDynamic
    ? `${regionName} ${taskName} 시공 이미지`
    : `${brandConfig.brandName} 탄성코트 및 줄눈시공 대표 이미지`;

  // Hero 전용 이미지 경로 (Hero와 시공 전 확인사항 이미지 완전 독립 관리)
  const heroImageSrc = isDynamic && serviceGroup === 'grout'
    ? (imageConfig?.groutHeroImage || imageConfig?.heroImage)
    : (imageConfig?.elasticCoatHeroImage || imageConfig?.heroImage);

  return (
    <section
      aria-labelledby="hero-title"
      style={{
        backgroundColor: 'var(--neo-color-bg-main, #F8FAFC)',
        padding: '48px 0 64px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient accent soft blur */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.06) 0%, rgba(248, 250, 252, 0) 70%)',
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
        }}
      >
        <div className="neo-hero-grid">
          {/* ====================================================
             LEFT COLUMN: Text & CTA Block (45%)
             ==================================================== */}
          <div className="neo-hero-left">
            {/* 1. Category Tag */}
            <div className="uppercase-track" style={{ marginBottom: '12px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'var(--neo-color-bg-teal-light, #ECFDF5)',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  border: '1px solid rgba(13, 148, 136, 0.2)',
                  fontSize: '13px',
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--neo-color-accent, #0D9488)',
                  }}
                />
                {heroBadgeLabel}
              </span>
            </div>

            {/* 2. Main H1 Title */}
            <h1
              id="hero-title"
              className="hero-h1"
              style={{
                marginBottom: '20px',
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
              }}
            >
              {heroH1}
            </h1>

            {/* 3. Sub-description */}
            <p
              className="body-large"
              style={{
                color: 'var(--neo-color-text-secondary, #475569)',
                marginBottom: '32px',
                maxWidth: '520px',
                wordBreak: 'keep-all',
                overflowWrap: 'normal',
                whiteSpace: 'pre-line',
              }}
            >
              {heroDescription}
            </p>

            {/* 4. Dual CTA Buttons */}
            <div className="neo-hero-cta-group">
              <a
                href={getContactHref()}
                onClick={(e) => handleCTAClick(e, getContactHref(), '#contact')}
                className="btn-primary"
                style={{ textDecoration: 'none' }}
              >
                견적 문의하기
              </a>
              <a
                href={getServicesHref()}
                onClick={(e) => handleCTAClick(e, getServicesHref(), '#services')}
                className="btn-secondary"
                style={{ textDecoration: 'none' }}
              >
                서비스 확인
              </a>
            </div>

            {/* 5. Trust Points List */}
            <div className="neo-trust-points">
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2.2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>공간 상태 확인</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2.2">
                  <rect x="2" y="3" width="20" height="14" rx="2" strokeLinecap="round"/>
                  <line x1="8" y1="21" x2="16" y2="21" strokeLinecap="round"/>
                  <line x1="12" y1="17" x2="12" y2="21" strokeLinecap="round"/>
                </svg>
                <span>공정별 작업 안내</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-accent, #0D9488)" strokeWidth="2.2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>시공 후 마감 확인</span>
              </div>
            </div>
          </div>

          {/* ====================================================
             RIGHT COLUMN: Image Frame & Info Badges (55%)
             ==================================================== */}
          <div className="neo-hero-right">
            <div className="neo-hero-image-card">
              {heroImageSrc && !imgError ? (
                <img
                  src={heroImageSrc}
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
                <div className="neo-hero-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-accent, #0D9488)" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="3" strokeLinecap="round"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="var(--neo-color-accent, #0D9488)"/>
                    <polyline points="21 15 16 10 5 21" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: '15px', fontWeight: '600', color: 'var(--neo-color-text-secondary, #475569)', marginTop: '8px' }}>
                    Hero 이미지 등록 예정
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--neo-color-text-muted, #64748B)' }}>
                    ({brandConfig.brandName} 전문 시공 케어)
                  </span>
                </div>
              )}

              {/* Floating Overlay Info Badge (Bottom Left) */}
              <div className="neo-hero-overlay-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-accent, #0D9488)" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>{imageInfoLabel}</span>
              </div>

              {/* Floating Quality Badge (Top Right) */}
              <div className="neo-hero-quality-badge">
                <span className="badge-dot" />
                <span>{qualityBadge}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Layout & Responsive Media Queries */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .neo-hero-grid {
          display: flex;
          flex-direction: column;
          gap: 40px;
          align-items: stretch;
        }

        @media (min-width: 1024px) {
          .neo-hero-grid {
            display: grid;
            grid-template-columns: 45fr 55fr;
            gap: 48px;
            align-items: center;
            min-height: 560px;
          }
        }

        .neo-hero-left {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .neo-hero-cta-group {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .neo-hero-cta-group .btn-primary,
        .neo-hero-cta-group .btn-secondary {
          flex: 1;
          min-width: 150px;
        }

        @media (min-width: 640px) {
          .neo-hero-cta-group .btn-primary,
          .neo-hero-cta-group .btn-secondary {
            flex: initial;
            min-width: 160px;
          }
        }

        .neo-trust-points {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid var(--neo-color-border, #E2E8F0);
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 600;
          color: var(--neo-color-text-primary, #0F172A);
          white-space: nowrap;
        }

        .trust-divider {
          width: 1px;
          height: 14px;
          background-color: var(--neo-color-border, #E2E8F0);
        }

        @media (max-width: 480px) {
          .trust-divider {
            display: none;
          }
          .neo-trust-points {
            gap: 10px 16px;
          }
        }

        .neo-hero-right {
          width: 100%;
          position: relative;
        }

        .neo-hero-image-card {
          width: 100%;
          aspect-ratio: 4 / 3;
          background-color: var(--neo-color-bg-white, #FFFFFF);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.07);
        }

        .neo-hero-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #F1F5F9;
          padding: 24px;
          text-align: center;
        }

        .neo-hero-overlay-label {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(4px);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          padding: 8px 16px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--neo-color-primary, #1E3A8A);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
        }

        .neo-hero-quality-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background-color: var(--neo-color-primary, #1E3A8A);
          color: #FFFFFF;
          padding: 6px 14px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(30, 58, 138, 0.25);
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--neo-color-accent, #0D9488);
        }
      `,
        }}
      />
    </section>
  );
}

export default NeoCoatHero;
