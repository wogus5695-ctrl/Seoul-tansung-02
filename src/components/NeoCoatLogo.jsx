import React from 'react';
import { brandConfig } from '../config/brandConfig.js';
import { imageConfig } from '../config/imageConfig.js';

/**
 * 네오코트 공식 로고 컴포넌트 (NeoCoatLogo)
 * - 새 NC 심볼 이미지 (`/brand/neocoat-logo.png`) + `brandConfig` 텍스트 조합
 * - `object-fit: contain` 및 explicit width/height로 layout shift 방지
 * - PC Header (약 44px), Mobile Header (약 38px), Footer (약 46px) 가독성 고려
 * - 로고 클릭 시 `/` 홈 이동 및 ALT `네오코트 로고`
 */
export function NeoCoatLogo({ onClick, className = '', isFooter = false }) {
  const logoSrc = imageConfig.logoImage || '/brand/neocoat-logo.png';
  const symbolSize = isFooter ? 46 : 42;

  return (
    <a
      href="/"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      }}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        userSelect: 'none',
        cursor: 'pointer',
      }}
      aria-label={`${brandConfig.brandName} 홈으로 이동`}
    >
      {/* Official NC Symbol Image */}
      <img
        src={logoSrc}
        alt="네오코트 로고"
        width={symbolSize}
        height={symbolSize}
        style={{
          width: `${symbolSize}px`,
          height: `${symbolSize}px`,
          objectFit: 'contain',
          display: 'block',
          flexShrink: 0,
        }}
      />

      {/* Brand Text Block (Using brandConfig values) */}
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: '1.1' }}>
        <span
          style={{
            fontSize: isFooter ? '1.2rem' : '1.15rem',
            fontWeight: '800',
            color: isFooter ? '#F8FAFC' : 'var(--neo-color-primary, #1E3A8A)',
            letterSpacing: '-0.02em',
          }}
        >
          {brandConfig.brandName}
        </span>
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: '700',
            color: isFooter ? 'var(--neo-color-accent, #0D9488)' : 'var(--neo-color-accent, #0D9488)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}
        >
          {brandConfig.englishName}
        </span>
      </div>
    </a>
  );
}

export default NeoCoatLogo;
