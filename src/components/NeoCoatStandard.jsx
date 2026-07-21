import React from 'react';
import { WORK_STANDARD_CONTENT } from '../data/processData.js';

/**
 * 네오코트 시공 원칙 컴포넌트 (NeoCoatStandard)
 * - 딥 블루 (#1E3A8A) 고품격 브랜드 영역
 * - PC: 5개 원칙 연결선 선형 타임라인 (01 ─ 02 ─ 03 ─ 04 ─ 05)
 * - 모바일: 수직 타임라인 (좌측 번호/연결선 + 우측 제목/설명)
 * - 단색 틸/화이트 라인 아이콘 적용
 */
export function NeoCoatStandard() {
  const { label, title, description, principles } = WORK_STANDARD_CONTENT;

  // 원칙별 단색 SVG 라인 아이콘 맵
  const renderStandardIcon = (id) => {
    switch (id) {
      case 'surface-check':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <path d="M11 8v6M8 11h6" stroke="var(--neo-color-accent, #0D9488)" />
          </svg>
        );
      case 'scope-division':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" stroke="var(--neo-color-accent, #0D9488)" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        );
      case 'space-protection':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case 'step-execution':
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        );
      case 'final-review':
      default:
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" stroke="var(--neo-color-accent, #0D9488)" />
          </svg>
        );
    }
  };

  return (
    <section
      aria-labelledby="standard-title"
      style={{
        backgroundColor: 'var(--neo-color-primary, #1E3A8A)',
        color: '#FFFFFF',
        padding: '88px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft Ambient Background Highlight */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(13, 148, 136, 0.12) 0%, rgba(30, 58, 138, 0) 70%)',
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
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div
            style={{
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '2px',
              color: 'var(--neo-color-accent, #0D9488)',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            {label}
          </div>
          <h2
            id="standard-title"
            className="section-h2"
            style={{
              color: '#FFFFFF',
              marginBottom: '16px',
              wordBreak: 'keep-all',
            }}
          >
            보이는 마감보다<br />보이지 않는 준비가 중요합니다
          </h2>
          <p
            className="body-default"
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '680px',
              margin: '0 auto',
              wordBreak: 'keep-all',
              lineHeight: '1.65',
            }}
          >
            {description}
          </p>
        </div>

        {/* 5 Principles Linear Timeline (PC & Mobile Responsive) */}
        <div className="neo-standard-timeline">
          {principles.map((item, idx) => (
            <div key={item.id} className="neo-standard-step-item">
              <div className="step-num-icon-row">
                <div className="step-num-badge">{item.num}</div>
                <div className="step-icon-box">{renderStandardIcon(item.id)}</div>
                {idx < principles.length - 1 && <div className="pc-timeline-line" />}
              </div>

              <div className="step-text-content">
                <h3 className="card-h3" style={{ fontSize: '18px', color: '#FFFFFF', marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p className="body-default" style={{ fontSize: '14.5px', color: 'rgba(255, 255, 255, 0.75)', margin: 0, lineHeight: '1.55', wordBreak: 'keep-all' }}>
                  {item.desc}
                </p>
              </div>

              {idx < principles.length - 1 && <div className="mobile-timeline-line" />}
            </div>
          ))}
        </div>
      </div>

      {/* Standard Timeline Styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .neo-standard-timeline {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        @media (min-width: 1024px) {
          .neo-standard-timeline {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            align-items: start;
          }
        }

        .neo-standard-step-item {
          display: flex;
          flex-direction: column;
          text-align: left;
          position: relative;
        }

        .step-num-icon-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          position: relative;
        }

        .step-num-badge {
          font-size: 13px;
          font-weight: 800;
          color: var(--neo-color-accent, #0D9488);
          background-color: rgba(13, 148, 136, 0.15);
          border: 1px solid rgba(13, 148, 136, 0.4);
          padding: 2px 10px;
          border-radius: 12px;
        }

        .step-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pc-timeline-line {
          display: none;
        }

        @media (min-width: 1024px) {
          .pc-timeline-line {
            display: block;
            flex: 1;
            height: 1px;
            background-color: rgba(255, 255, 255, 0.2);
            margin-left: 8px;
          }
        }

        .mobile-timeline-line {
          display: block;
          width: 2px;
          height: 24px;
          background-color: rgba(255, 255, 255, 0.15);
          margin-top: 16px;
          margin-left: 20px;
        }

        @media (min-width: 1024px) {
          .mobile-timeline-line {
            display: none;
          }
        }
      `,
        }}
      />
    </section>
  );
}

export default NeoCoatStandard;
