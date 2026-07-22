import React, { useState, useEffect } from 'react';
import { brandConfig } from '../config/brandConfig.js';
import { contactConfig } from '../config/contactConfig.js';
import { NeoCoatLogo } from './NeoCoatLogo.jsx';

/**
 * 네오코트 전용 헤더 컴포넌트 (NeoCoatHeader)
 * - Sticky Header 및 스크롤 감지 높이 소폭 축소
 * - PC: 5개 메뉴 (#services, #cases, #process, #faq, #contact) 및 견적 문의하기 CTA
 * - 모바일: 햄버거 슬라이드/확장 드로어, ESC/외부클릭/메뉴선택 시 자동 닫기, 스크롤 방지
 * - 동적 랜딩 페이지 접속 시 메인 기준 /#id 링크 렌더링
 */
export function NeoCoatHeader({ onNavigate, currentPath = '/', onMenuOpenChange }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Notify parent on mobile menu state changes
  useEffect(() => {
    if (onMenuOpenChange) {
      onMenuOpenChange(menuOpen);
    }
  }, [menuOpen, onMenuOpenChange]);

  // 스크롤 감지 (Sticky header height adjustment)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ESC 키 눌렀을 때 모바일 메뉴 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 모바일 메뉴 열렸을 때 배경 스크롤 방지
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // 메뉴 리스트 정의
  const menuItems = [
    { label: '서비스', anchor: '#services' },
    { label: '시공 원칙', anchor: '#standard' },
    { label: 'FAQ', anchor: '#faq' },
    { label: '문의', anchor: '#contact' },
  ];

  // 안전한 CTA 문의 링크 구하기
  const getContactHref = () => {
    if (contactConfig && contactConfig.kakaoUrl && contactConfig.kakaoUrl.trim() !== '') {
      return contactConfig.kakaoUrl;
    }
    if (contactConfig && contactConfig.phone && contactConfig.phone.trim() !== '') {
      return `tel:${contactConfig.phone.replace(/-/g, '')}`;
    }
    return currentPath === '/' ? '#contact' : '/#contact';
  };

  // 앵커 클릭 처리
  const handleNavClick = (e, anchor) => {
    e.preventDefault();
    setMenuOpen(false);

    if (currentPath !== '/') {
      // 동적 랜딩 페이지 등에서는 메인 페이지로 이동 후 해당 앵커로 이동
      onNavigate('/', '');
      setTimeout(() => {
        const el = document.querySelector(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
    } else {
      // 메인 페이지 내부 앵커 스크롤
      const el = document.querySelector(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleCTAClick = (e) => {
    const targetHref = getContactHref();
    if (targetHref.startsWith('#') || targetHref.startsWith('/#')) {
      handleNavClick(e, '#contact');
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--neo-color-border, #E2E8F0)',
        height: isScrolled ? '68px' : '78px',
        transition: 'height 0.25s ease, box-shadow 0.25s ease',
        boxShadow: isScrolled ? '0 4px 20px -2px rgba(15, 23, 42, 0.06)' : 'none',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--desktop-max-width, 1280px)',
          width: '100%',
          margin: '0 auto',
          padding: '0 var(--mobile-side-margin, 20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* 1. 좌측 로고 영역 */}
        <NeoCoatLogo
          onClick={(e) => {
            if (currentPath === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
              onNavigate('/');
            }
          }}
        />

        {/* 2. PC 내비게이션 (1024px 이상 시 노출) */}
        <nav className="pc-only-nav" aria-label="메인 내비게이션">
          {menuItems.map((item) => (
            <a
              key={item.anchor}
              href={currentPath === '/' ? item.anchor : `/${item.anchor}`}
              onClick={(e) => handleNavClick(e, item.anchor)}
              style={styles.pcNavLink}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* 3. PC CTA 버튼 (1024px 이상 시 노출) */}
        <div className="pc-only-cta">
          <a
            href={getContactHref()}
            onClick={handleCTAClick}
            className="btn-primary"
            style={{
              height: '46px',
              fontSize: '15px',
              borderRadius: '12px',
              padding: '0 20px',
              textDecoration: 'none',
            }}
          >
            견적 문의하기
          </a>
        </div>

        {/* 4. 모바일 햄버거 버튼 (1024px 미만 시 노출) */}
        <button
          className="mobile-hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation-panel"
        >
          <span
            style={{
              ...styles.hamburgerLine,
              transform: menuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none',
            }}
          />
          <span
            style={{
              ...styles.hamburgerLine,
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              ...styles.hamburgerLine,
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* 5. 모바일 메뉴 슬라이드 패널 / 백드롭 */}
      {menuOpen && (
        <div
          style={styles.mobileBackdrop}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        >
          <div
            id="mobile-navigation-panel"
            style={styles.mobileDrawerPanel}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="모바일 메뉴"
          >
            <div style={styles.mobileDrawerHeader}>
              <NeoCoatLogo
                onClick={() => {
                  setMenuOpen(false);
                  onNavigate('/');
                }}
              />
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="메뉴 닫기"
                style={styles.closeBtn}
              >
                ✕
              </button>
            </div>

            <nav style={styles.mobileNavList}>
              {menuItems.map((item) => (
                <a
                  key={item.anchor}
                  href={currentPath === '/' ? item.anchor : `/${item.anchor}`}
                  onClick={(e) => handleNavClick(e, item.anchor)}
                  style={styles.mobileNavLink}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
              <a
                href={getContactHref()}
                onClick={(e) => {
                  setMenuOpen(false);
                  handleCTAClick(e);
                }}
                className="btn-primary"
                style={{
                  width: '100%',
                  height: '52px',
                  fontSize: '16px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  boxSizing: 'border-box',
                }}
              >
                견적 문의하기
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Header-specific Responsive CSS & Media Queries */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 767px) {
          header {
            height: 64px !important;
          }
          .mobile-hamburger-btn {
            width: 40px !important;
            height: 40px !important;
          }
        }
        @media (min-width: 1024px) {
          .pc-only-nav {
            display: flex !important;
            align-items: center;
            gap: 36px;
          }
          .pc-only-cta {
            display: block !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .pc-only-nav {
            display: none !important;
          }
          .pc-only-cta {
            display: none !important;
          }
          .mobile-hamburger-btn {
            display: flex !important;
          }
        }
        .mobile-hamburger-btn {
          width: 44px;
          height: 44px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
        }
        .mobile-hamburger-btn:hover {
          background-color: var(--neo-color-bg-blue-light, #EFF6FF);
        }
      `,
        }}
      />
    </header>
  );
}

const styles = {
  pcNavLink: {
    color: 'var(--neo-color-text-primary, #0F172A)',
    fontWeight: '600',
    fontSize: '16px',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
    position: 'relative',
    padding: '4px 0',
  },
  hamburgerLine: {
    width: '22px',
    height: '2px',
    backgroundColor: 'var(--neo-color-primary, #1E3A8A)',
    borderRadius: '2px',
    transition: 'transform 0.2s ease, opacity 0.2s ease',
    display: 'block',
  },
  mobileBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    backdropFilter: 'blur(3px)',
    zIndex: 1050,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  mobileDrawerPanel: {
    width: '85%',
    maxWidth: '360px',
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-10px 0 30px rgba(15, 23, 42, 0.15)',
    animation: 'slideInRight 0.25s ease-out forwards',
  },
  mobileDrawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '20px',
    borderBottom: '1px solid var(--neo-color-border, #E2E8F0)',
    marginBottom: '20px',
  },
  closeBtn: {
    fontSize: '20px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'none',
    color: 'var(--neo-color-text-secondary, #475569)',
    cursor: 'pointer',
    borderRadius: '8px',
  },
  mobileNavList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  mobileNavLink: {
    color: 'var(--neo-color-text-primary, #0F172A)',
    fontWeight: '600',
    fontSize: '18px',
    textDecoration: 'none',
    padding: '10px 12px',
    borderRadius: '8px',
    display: 'block',
    transition: 'background-color 0.15s ease, color 0.15s ease',
  },
};

export default NeoCoatHeader;
