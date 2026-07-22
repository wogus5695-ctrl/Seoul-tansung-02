import React from 'react';

/**
 * 네오코트 핵심 신뢰 요약 섹션 (NeoCoatTrustStrip)
 * - PC: 하나의 연결된 가로형 정보 스트립, 세로 구분선
 * - 모바일: 수직 배치, 가로 구분선
 * - 3개 핵심 운영 원칙 (공간 상태 확인, 공정별 작업 안내, 시공 후 마감 확인)
 */
export function NeoCoatTrustStrip() {
  const trustItems = [
    {
      id: 'state-check',
      title: '공간 상태 확인',
      description: '오염·들뜸·기존 도막 상태를 먼저 확인합니다.',
      accentDot: false,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <path d="M11 8v6M8 11h6" stroke="var(--neo-color-accent, #0D9488)" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'process-guide',
      title: '공정별 작업 안내',
      description: '보양부터 바탕 정리와 마감까지 필요한 범위를 안내합니다.',
      accentDot: false,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" stroke="var(--neo-color-accent, #0D9488)" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      )
    },
    {
      id: 'completion-review',
      title: '시공 후 마감 확인',
      description: '마감 상태와 주변 오염 여부를 확인합니다.',
      accentDot: true,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" stroke="var(--neo-color-accent, #0D9488)" strokeWidth="2.5" />
        </svg>
      )
    }
  ];

  return (
    <section style={{ backgroundColor: 'var(--neo-color-bg-main, #F8FAFC)', padding: '0 0 48px 0' }}>
      <div
        style={{
          maxWidth: 'var(--desktop-max-width, 1280px)',
          width: '100%',
          margin: '0 auto',
          padding: '0 var(--mobile-side-margin, 20px)',
        }}
      >
        <div className="neo-trust-container">
          {trustItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              {idx > 0 && <div className="neo-trust-strip-divider" />}
              <div className="neo-trust-card-item">
                <div className="trust-icon-wrapper">
                  {item.icon}
                </div>
                <div className="trust-text-block">
                  <h3 className="card-h3" style={{ fontSize: '18px', fontWeight: '700', color: 'var(--neo-color-primary, #1E3A8A)', marginBottom: '6px' }}>
                    {item.title}
                  </h3>
                  <p className="body-default" style={{ fontSize: '14.5px', color: 'var(--neo-color-text-secondary, #475569)', margin: 0, lineHeight: '1.55', wordBreak: 'keep-all' }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .neo-trust-container {
          background-color: var(--neo-color-bg-white, #FFFFFF);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 20px;
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow: 0 4px 20px -4px rgba(15, 23, 42, 0.03);
        }

        @media (min-width: 1024px) {
          .neo-trust-container {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 28px 36px;
            gap: 0;
          }
        }

        .neo-trust-card-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          flex: 1;
        }

        @media (min-width: 1024px) {
          .neo-trust-card-item {
            padding: 0 24px;
          }
          .neo-trust-card-item:first-child {
            padding-left: 0;
          }
          .neo-trust-card-item:last-child {
            padding-right: 0;
          }
        }

        .trust-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background-color: var(--neo-color-bg-blue-light, #EFF6FF);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .trust-text-block {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .neo-trust-strip-divider {
          height: 1px;
          width: 100%;
          background-color: var(--neo-color-border, #E2E8F0);
        }

        @media (max-width: 767px) {
          .neo-trust-container {
            padding: 16px 18px !important;
            gap: 12px !important;
            border-radius: 12px !important;
          }
          .neo-trust-card-item {
            gap: 12px !important;
          }
          .trust-icon-wrapper {
            width: 32px !important;
            height: 32px !important;
            border-radius: 8px !important;
          }
          .trust-icon-wrapper svg {
            width: 18px !important;
            height: 18px !important;
          }
          .trust-text-block h3 {
            font-size: 15.5px !important;
            margin-bottom: 2px !important;
            display: inline-flex !important;
            align-items: center !important;
          }
          .trust-text-block p {
            font-size: 13.5px !important;
            line-height: 1.5 !important;
          }
        }

        @media (min-width: 1024px) {
          .neo-trust-strip-divider {
            width: 1px;
            height: 52px;
            flex-shrink: 0;
          }
        }
      `
        }}
      />
    </section>
  );
}

export default NeoCoatTrustStrip;
