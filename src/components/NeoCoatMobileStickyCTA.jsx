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
  const hasKakao = contactConfig && contactConfig.kakaoUrl && contactConfig.kakaoUrl.trim() !== '';
  const phoneHref = hasPhone ? `tel:${contactConfig.phone.replace(/-/g, '')}` : null;
  const quoteHref = getContactHref();

  const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const handleFocus = () => setIsKeyboardVisible(true);
    const handleBlur = () => setIsKeyboardVisible(false);

    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(el => {
      el.addEventListener('focus', handleFocus);
      el.addEventListener('blur', handleBlur);
    });

    return () => {
      inputs.forEach(el => {
        el.removeEventListener('focus', handleFocus);
        el.removeEventListener('blur', handleBlur);
      });
    };
  }, []);

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

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <div className="neo-mobile-sticky-cta-bar" role="region" aria-label="모바일 상담 바로가기">
      <div className="mobile-cta-inner">
        {hasPhone && (
          <a
            href={phoneHref}
            className="mobile-cta-btn phone-btn"
            style={{ flex: '42', whiteSpace: 'nowrap' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>전화 문의</span>
          </a>
        )}

        {hasKakao ? (
          <a
            href={contactConfig.kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-cta-btn quote-btn"
            style={{ flex: '58', whiteSpace: 'nowrap', backgroundColor: '#FEE500', color: '#191919' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 3.185-9 7.11 0 2.507 1.642 4.718 4.12 5.922-.162.59-.586 2.138-.67 2.458-.105.39.135.385.285.285.118-.08 1.888-1.285 2.64-1.8 1.134.336 2.378.515 3.625.515 4.97 0 9-3.185 9-7.11S16.97 3 12 3z" />
            </svg>
            <span>카카오톡 문의하기</span>
          </a>
        ) : (
          <button
            disabled
            aria-disabled="true"
            className="mobile-cta-btn quote-btn"
            style={{
              flex: '58',
              whiteSpace: 'nowrap',
              backgroundColor: '#E2E8F0',
              color: '#94A3B8',
              opacity: 0.7,
              cursor: 'not-allowed',
              border: 'none'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-4.97 0-9 3.185-9 7.11 0 2.507 1.642 4.718 4.12 5.922-.162.59-.586 2.138-.67 2.458-.105.39.135.385.285.285.118-.08 1.888-1.285 2.64-1.8 1.134.336 2.378.515 3.625.515 4.97 0 9-3.185 9-7.11S16.97 3 12 3z" />
            </svg>
            <span>카카오톡 문의하기 (준비중)</span>
          </button>
        )}
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
