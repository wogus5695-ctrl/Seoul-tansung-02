import React, { useState } from 'react';
import { WORK_STANDARD_CONTENT } from '../data/processData.js';

// 세탁실탄성코트 Pilot MO용 3단계 핵심 Summary 데이터
const LAUNDRY_PILOT_SUMMARY_STEPS = [
  {
    num: '01',
    title: '바탕 상태 확인',
    desc: '기존 상태와 필요한 작업 범위를 확인합니다.'
  },
  {
    num: '02',
    title: '보양·공정별 시공',
    desc: '주변 공간을 보호하고 필요한 공정을 순서대로 진행합니다.'
  },
  {
    num: '03',
    title: '마감 확인 및 관리',
    desc: '마감 상태와 건조·관리 내용을 확인합니다.'
  }
];

/**
 * 네오코트 시공 원칙 컴포넌트 (NeoCoatStandard)
 * - 딥 블루 (#1E3A8A) 고품격 브랜드 영역
 * - PC: 5개 원칙 연결선 선형 타임라인 (01 ─ 02 ─ 03 ─ 04 ─ 05) 유지
 * - 모바일(세탁실탄성코트 Pilot): 기본 3개 핵심 Summary 노출 + 5단계 전환 토글 스위치
 * - 모바일(기타 키워드): 기존 수직 타임라인 유지
 * - 단색 틸/화이트 라인 아이콘 적용
 */
export function NeoCoatStandard({ parsedKeyword }) {
  const { label, title, description, principles } = WORK_STANDARD_CONTENT;
  const taskName = parsedKeyword?.service?.keyword;
  const isCompactStandard = taskName === '세탁실탄성코트' || taskName === '베란다탄성코트';
  const [isDetailOpen, setIsDetailOpen] = useState(false);

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
      id="standard"
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

        {/* 1. Compact Standard MO Summary 3 Steps (Mobile only when isCompactStandard && !isDetailOpen) */}
        {isCompactStandard && !isDetailOpen && (
          <div className="pilot-mo-summary-stack">
            {LAUNDRY_PILOT_SUMMARY_STEPS.map((item, idx) => (
              <div key={item.num} className="pilot-summary-item">
                <div className="step-num-icon-row">
                  <div className="step-num-badge">{item.num}</div>
                  <h3 className="card-h3" style={{ fontSize: '16.5px', color: '#FFFFFF', margin: 0, fontWeight: '700' }}>
                    {item.title}
                  </h3>
                </div>
                <p className="body-default" style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', margin: '4px 0 0 0', paddingLeft: '4px', lineHeight: '1.55', wordBreak: 'keep-all' }}>
                  {item.desc}
                </p>
                {idx < LAUNDRY_PILOT_SUMMARY_STEPS.length - 1 && (
                  <div className="pilot-summary-line" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* 2. 5 Principles Linear Timeline (PC always, MO depends on isDetailOpen for Pilot) */}
        <div
          id="standard-full-detail"
          className={`neo-standard-timeline ${isCompactStandard ? (isDetailOpen ? 'pilot-mo-full-open' : 'pilot-mo-full-closed') : ''}`}
        >
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

        {/* 3. Compact Standard Detail Toggle Button (MO only) */}
        {isCompactStandard && (
          <div className="pilot-standard-toggle-wrapper">
            <button
              type="button"
              onClick={() => setIsDetailOpen(prev => !prev)}
              aria-expanded={isDetailOpen}
              aria-controls="standard-full-detail"
              className="pilot-standard-toggle-btn"
            >
              <span>{isDetailOpen ? '네오코트 5단계 시공 기준 접기 ▴' : '네오코트 5단계 시공 기준 자세히 보기 ▾'}</span>
            </button>
          </div>
        )}
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
            display: grid !important;
            grid-template-columns: repeat(5, 1fr) !important;
            gap: 20px !important;
            align-items: start !important;
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

        /* MO Pilot Summary 3 Steps Styling */
        .pilot-mo-summary-stack {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-align: left;
        }

        .pilot-summary-item {
          display: flex;
          flex-direction: column;
        }

        .pilot-summary-line {
          width: 2px;
          height: 16px;
          background-color: rgba(255, 255, 255, 0.2);
          margin: 10px 0 10px 18px;
        }

        .pilot-standard-toggle-wrapper {
          margin-top: 24px;
          display: flex;
          justify-content: center;
        }

        .pilot-standard-toggle-btn {
          width: 100%;
          max-width: 400px;
          min-height: 48px;
          padding: 12px 20px;
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #FFFFFF;
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .pilot-standard-toggle-btn:hover {
          background-color: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 767px) {
          .pilot-mo-full-closed {
            display: none !important;
          }
          .pilot-mo-full-open {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
          }
          .neo-standard-timeline {
            gap: 16px !important;
          }
          .neo-standard-step-item {
            padding-bottom: 8px !important;
          }
          .mobile-timeline-line {
            height: 16px !important;
            margin-top: 8px !important;
            margin-bottom: 8px !important;
          }
          .step-num-icon-row {
            margin-bottom: 8px !important;
          }
          .step-icon-box {
            width: 32px !important;
            height: 32px !important;
            border-radius: 8px !important;
          }
          .step-icon-box svg {
            width: 16px !important;
            height: 16px !important;
          }
          .step-text-content h3 {
            font-size: 15.5px !important;
            margin-bottom: 2px !important;
          }
          .step-text-content p {
            font-size: 13.5px !important;
            line-height: 1.5 !important;
          }
        }

        @media (min-width: 768px) {
          .pilot-mo-summary-stack {
            display: none !important;
          }
          .pilot-standard-toggle-wrapper {
            display: none !important;
          }
        }

        @media (min-width: 1024px) {
          .mobile-timeline-line {
            display: none;
          }
          .pilot-mo-full-closed {
            display: grid !important;
          }
        }
      `,
        }}
      />
    </section>
  );
}

export default NeoCoatStandard;
