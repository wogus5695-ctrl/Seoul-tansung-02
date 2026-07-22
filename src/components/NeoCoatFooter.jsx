import React from 'react';
import { brandConfig } from '../config/brandConfig.js';
import { contactConfig } from '../config/contactConfig.js';
import { businessConfig } from '../config/businessConfig.js';
import { NeoCoatLogo } from './NeoCoatLogo.jsx';

/**
 * 네오코트 통합 푸터 컴포넌트 (NeoCoatFooter)
 * - `#0F172A` 딥 네이비 배경의 기술 브랜드 스타일
 * - PC 4개 독립 영역 (브랜드 소개, 주요 서비스, 상담 및 사업자정보, 정책/운영 링크)
 * - 모바일 한 열 가독성 레이아웃 & 모바일 하단 CTA 가림 방지 padding (bottom 96px)
 * - 사업자정보 및 전화번호/카카오 미확정 항목 조건부 깔끔한 안전 처리 (undefined/null 완전 방지)
 * - 통합 허브 (`/sitemap-seoul`), 개인정보처리방침 (`/privacy-policy`), 이용약관 (`/terms`) 안전 연결
 * - 자동 연도 계산 Copyright (`© {currentYear} Neo Coat. All rights reserved.`)
 */
export function NeoCoatFooter({ onNavigate, isSimple = false }) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e, targetHref) => {
    e.preventDefault();

    if (targetHref.startsWith('/#')) {
      const sectionId = targetHref.replace('/', '');
      if (onNavigate) {
        onNavigate('/', '');
        setTimeout(() => {
          const el = document.querySelector(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      }
    } else if (onNavigate) {
      onNavigate(targetHref, '');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 1. 간소화된 푸터 (통합 허브 /sitemap-seoul 용)
  if (isSimple) {
    return (
      <footer style={{ backgroundColor: '#0F172A', color: '#94A3B8', padding: '32px 20px', borderTop: '1px solid #1E293B', textAlign: 'center' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
          <NeoCoatLogo isFooter />
          <div style={{ display: 'flex', gap: '20px', fontSize: '13.5px' }}>
            <a href="/" onClick={(e) => handleLinkClick(e, '/')} style={{ color: '#F8FAFC', textDecoration: 'none' }}>홈으로 이동</a>
            <a href="/privacy-policy" onClick={(e) => handleLinkClick(e, '/privacy-policy')} style={{ color: '#94A3B8', textDecoration: 'none' }}>개인정보처리방침</a>
            <a href="/terms" onClick={(e) => handleLinkClick(e, '/terms')} style={{ color: '#94A3B8', textDecoration: 'none' }}>이용약관</a>
          </div>
          <div style={{ fontSize: '13px', opacity: 0.7 }}>
            © {currentYear} {brandConfig.englishName || 'Neo Coat'}. All rights reserved.
          </div>
        </div>
      </footer>
    );
  }

  // 2. 표준 브랜드 푸터 (메인 & 모든 동적 페이지)
  const hasPhone = contactConfig.phone && contactConfig.phone.trim() !== '';
  const phoneDisplay = contactConfig.phoneDisplay || contactConfig.phone;
  const phoneHref = hasPhone ? `tel:${contactConfig.phone.replace(/-/g, '')}` : null;
  const hasKakao = contactConfig.kakaoUrl && contactConfig.kakaoUrl.trim() !== '';

  const hasBusinessDetails = [
    businessConfig.representative,
    businessConfig.businessNumber,
    businessConfig.address,
    businessConfig.ecommerceNumber,
    businessConfig.privacyOfficer
  ].some(val => val && val.trim() !== '');

  return (
    <footer className="neo-footer-container">
      <div className="neo-footer-inner">
        <div className="neo-footer-grid">
          {/* Col 1: 브랜드 소개 */}
          <div className="footer-col brand-col">
            <div style={{ marginBottom: '16px' }}>
              <NeoCoatLogo isFooter />
            </div>
            <p className="footer-brand-desc">
              베란다와 세탁실의 탄성코트부터 욕실과 현관의 줄눈시공까지, 공간 상태와 마감 환경을 확인하고 필요한 작업 범위를 안내합니다.
            </p>
            <span className="footer-slogan-tag">
              {brandConfig.mainSlogan || '공간을 오래 지키는 새로운 코팅 기준'}
            </span>
          </div>

          {/* Col 2: 주요 서비스 */}
          <div className="footer-col">
            <h3 className="footer-col-title">주요 시공 서비스</h3>
            <ul className="footer-link-list">
              <li><a href="/#services" onClick={(e) => handleLinkClick(e, '/#services')}>탄성코트</a></li>
              <li><a href="/#services" onClick={(e) => handleLinkClick(e, '/#services')}>베란다 탄성코트</a></li>
              <li><a href="/#services" onClick={(e) => handleLinkClick(e, '/#services')}>세탁실 탄성코트</a></li>
              <li><a href="/#services" onClick={(e) => handleLinkClick(e, '/#services')}>아파트 탄성코트</a></li>
              <li><a href="/#services" onClick={(e) => handleLinkClick(e, '/#services')}>줄눈시공</a></li>
              <li><a href="/#services" onClick={(e) => handleLinkClick(e, '/#services')}>욕실 줄눈시공</a></li>
              <li><a href="/#services" onClick={(e) => handleLinkClick(e, '/#services')}>현관 줄눈시공</a></li>
            </ul>
          </div>

          {/* Col 3: 상담 및 사업자정보 */}
          <div className="footer-col">
            <h3 className="footer-col-title">상담 안내 & 사업자 정보</h3>
            <div className="footer-info-block">
              {hasPhone ? (
                <p className="info-row">
                  <strong>전화 문의:</strong> <a href={phoneHref} className="phone-link">{phoneDisplay}</a>
                </p>
              ) : (
                <p className="info-row text-muted"><strong>전화 문의:</strong> 등록 예정</p>
              )}

              {hasKakao ? (
                <p className="info-row">
                  <strong>카카오 문의:</strong> <a href={contactConfig.kakaoUrl} target="_blank" rel="noopener noreferrer" className="kakao-link">카카오 채널 연결 ↗</a>
                </p>
              ) : (
                <p className="info-row text-muted"><strong>카카오 문의:</strong> 채널 등록 예정</p>
              )}

              {contactConfig.operatingHours && (
                <p className="info-row"><strong>상담 가능 시간:</strong> {contactConfig.operatingHours}</p>
              )}

              <p className="info-row" style={{ marginTop: '12px' }}>
                <strong>서비스 지역:</strong> {businessConfig.serviceRegionLabel || '서울·인천·경기'}
              </p>

              {/* 사업자정보 조건부 안심 출력 */}
              <div className="business-details-box">
                <p className="info-row"><strong>상호명:</strong> {businessConfig.companyName || '네오코트'}</p>
                {businessConfig.representative && <p className="info-row"><strong>대표자:</strong> {businessConfig.representative}</p>}
                {businessConfig.businessNumber && <p className="info-row"><strong>사업자등록번호:</strong> {businessConfig.businessNumber}</p>}
                {businessConfig.address && <p className="info-row"><strong>주소:</strong> {businessConfig.address}</p>}
                {businessConfig.ecommerceNumber && <p className="info-row"><strong>통신판매업:</strong> {businessConfig.ecommerceNumber}</p>}
                {!hasBusinessDetails && <p className="info-row text-muted" style={{ fontSize: '12.5px' }}>사업자정보 확정 후 자동 갱신됩니다.</p>}
              </div>
            </div>
          </div>

          {/* Col 4: 주요 이동 & 정책 링크 */}
          <div className="footer-col">
            <h3 className="footer-col-title">빠른 이동 & 정책</h3>
            <ul className="footer-link-list">
              <li><a href="/" onClick={(e) => handleLinkClick(e, '/')}>홈</a></li>
              <li><a href="/#services" onClick={(e) => handleLinkClick(e, '/#services')}>서비스</a></li>
              <li><a href="/#standard" onClick={(e) => handleLinkClick(e, '/#standard')}>시공 원칙</a></li>
              <li><a href="/#faq" onClick={(e) => handleLinkClick(e, '/#faq')}>FAQ</a></li>
              <li><a href="/#contact" onClick={(e) => handleLinkClick(e, '/#contact')}>문의</a></li>
              <li style={{ marginTop: '8px' }}>
                <a href="/sitemap-seoul" onClick={(e) => handleLinkClick(e, '/sitemap-seoul')} className="hub-link-btn">
                  지역별 서비스 안내 ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom: Policies & Copyright */}
        <div className="footer-bottom-bar">
          <div className="policy-links-group">
            <a href="/privacy-policy" onClick={(e) => handleLinkClick(e, '/privacy-policy')} className="policy-link highlight">개인정보처리방침</a>
            <span className="policy-divider">|</span>
            <a href="/terms" onClick={(e) => handleLinkClick(e, '/terms')} className="policy-link">이용약관</a>
          </div>

          <div className="copyright-text">
            © {currentYear} {brandConfig.englishName || 'Neo Coat'}. All rights reserved.
          </div>
        </div>
      </div>

      {/* Footer Styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .neo-footer-container {
          background-color: #0F172A;
          color: #94A3B8;
          padding: 64px 0 96px 0; /* 모바일 하단 sticky CTA 가림 완벽 방지 (bottom 96px) */
          border-top: 1px solid #1E293B;
          text-align: left;
        }

        .neo-footer-inner {
          max-width: var(--desktop-max-width, 1280px);
          width: 100%;
          margin: 0 auto;
          padding: 0 var(--mobile-side-margin, 20px);
        }

        .neo-footer-grid {
          display: flex;
          flex-direction: column;
          gap: 36px;
          margin-bottom: 48px;
        }

        @media (min-width: 1024px) {
          .neo-footer-grid {
            display: grid;
            grid-template-columns: 32fr 20fr 28fr 20fr;
            gap: 40px;
          }
        }

        .footer-col-title {
          font-size: 15px;
          font-weight: 700;
          color: #F8FAFC;
          margin-bottom: 16px;
          letter-spacing: -0.2px;
        }

        .footer-brand-desc {
          font-size: 14px;
          color: #94A3B8;
          line-height: 1.65;
          margin-bottom: 14px;
          word-break: keep-all;
        }

        .footer-slogan-tag {
          display: inline-block;
          font-size: 13px;
          color: var(--neo-color-accent, #0D9488);
          background-color: rgba(13, 148, 136, 0.1);
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 600;
        }

        .footer-link-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-link-list a {
          color: #94A3B8;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.15s ease;
        }

        .footer-link-list a:hover {
          color: var(--neo-color-accent, #0D9488);
        }

        .hub-link-btn {
          color: #38BDF8 !important;
          font-weight: 600;
        }

        .footer-info-block {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 13.5px;
        }

        .info-row {
          margin: 0;
          color: #94A3B8;
          line-height: 1.5;
        }

        .info-row strong {
          color: #CBD5E1;
        }

        .info-row.text-muted {
          color: #64748B;
        }

        .phone-link, .kakao-link {
          color: #F8FAFC;
          text-decoration: none;
          font-weight: 600;
        }

        .phone-link:hover, .kakao-link:hover {
          color: var(--neo-color-accent, #0D9488);
        }

        .business-details-box {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px dashed #334155;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .footer-bottom-bar {
          padding-top: 24px;
          border-top: 1px solid #1E293B;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          justify-content: space-between;
          font-size: 13.5px;
        }

        @media (min-width: 640px) {
          .footer-bottom-bar {
            flex-direction: row;
          }
        }

        .policy-links-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .policy-link {
          color: #94A3B8;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .policy-link.highlight {
          color: #F8FAFC;
          font-weight: 700;
        }

        .policy-link:hover {
          color: var(--neo-color-accent, #0D9488);
        }

        .policy-divider {
          color: #334155;
        }

        .copyright-text {
          color: #64748B;
          font-size: 13px;
        }
      `,
        }}
      />
    </footer>
  );
}

export default NeoCoatFooter;
