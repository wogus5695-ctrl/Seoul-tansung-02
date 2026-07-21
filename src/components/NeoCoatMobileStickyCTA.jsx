import React from 'react';
import { contactConfig } from '../config/contactConfig.js';

/**
 * 네오코트 모바일 전용 하단 고정 CTA 컴포넌트 (NeoCoatMobileStickyCTA)
 * - 1024px 미만 해상도 모바일 화면 하단 고정
 * - safe-area-inset-bottom 완벽 고려
 * - 전화번호 유무에 따른 유연한 버튼 비율 분기 (전화 42% : 견적 58% 또는 견적 100%)
 * - 빈 링크 방지 및 안전한 `#contact` 스무스 이동
 */
export function NeoCoatMobileStickyCTA({ parsedKeyword, onNavigate }) {
  const getContactHref = () => {
    if (contactConfig && contactConfig.kakaoUrl && contactConfig.kakaoUrl.trim() !== '') {
      return contactConfig.kakaoUrl;
    }
    return parsedKeyword ? '/#contact' : '#contact';
  };

  const hasPhone = contactConfig && contactConfig.phone && contactConfig.phone.trim() !== '';
  const phoneHref = hasPhone ? `tel:${contactConfig.phone.replace(/-/g, '')}` : null;
  const quoteHref = getContactHref();

  const handleQuoteClick = (e) => {
    if (quoteHref.startsWith('#') || quoteHref.startsWith('/#')) {
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

  return (
    <div className="neo-mobile-sticky-cta-bar" role="region" aria-label="모바일 상담 바로가기">
      <div className="mobile-cta-inner">
        {hasPhone && (
          <a
            href={phoneHref}
            className="mobile-cta-btn phone-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>전화 상담</span>
          </a>
        )}

        <a
          href={quoteHref}
          onClick={handleQuoteClick}
          className="mobile-cta-btn quote-btn"
          style={{ flex: hasPhone ? '1.38' : '1' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>견적 문의하기</span>
        </a>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .neo-mobile-sticky-cta-bar {
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 990;
          background-color: #FFFFFF;
          border-top: 1px solid var(--neo-color-border, #E2E8F0);
          padding: 10px 16px;
          padding-bottom: calc(10px + env(safe-area-inset-bottom, 0px));
          box-shadow: 0 -4px 16px rgba(15, 23, 42, 0.08);
        }

        @media (min-width: 1024px) {
          .neo-mobile-sticky-cta-bar {
            display: none !important;
          }
        }

        .mobile-cta-inner {
          display: flex;
          align-items: center;
          gap: 10px;
          max-width: 500px;
          margin: 0 auto;
        }

        .mobile-cta-btn {
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 15px;
          font-weight: 700;
          text-decoration: none;
          box-sizing: border-box;
        }

        .mobile-cta-btn.phone-btn {
          flex: 1;
          background-color: var(--neo-color-bg-blue-light, #EFF6FF);
          color: var(--neo-color-primary, #1E3A8A);
          border: 1px solid rgba(30, 58, 138, 0.2);
        }

        .mobile-cta-btn.quote-btn {
          background-color: var(--neo-color-accent, #0D9488);
          color: #FFFFFF;
          border: none;
        }
      `,
        }}
      />
    </div>
  );
}

export default NeoCoatMobileStickyCTA;
