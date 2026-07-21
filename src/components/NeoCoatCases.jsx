import React, { useState, useEffect, useRef } from 'react';
import { getPublishedCaseStudies } from '../data/caseData.js';

/**
 * 네오코트 시공 사례 컴포넌트 (NeoCoatCases)
 * - `#cases` 앵커 연동 (헤더의 '시공 사례' 메뉴 연결)
 * - 서비스군(탄성코트 사례 ↔ 줄눈시공 사례) 탭 전환
 * - 시공 전(BEFORE) vs 시공 후(AFTER) 1:1 명확한 비교 레이아웃
 * - 공개 사례(published)가 0개인 경우 정직한 '시공 사례 준비 중' 안내 카드 표시
 * - 공개 사례 >= 2개 시 수동 슬라이드, >= 3개 시 자동 슬라이드(5~7초, hover/focus/prefers-reduced-motion 시 일시 정지)
 * - 360px 모바일 가로 스크롤 없음, 접근성 ARIA 및 모달 상세 보기 지원
 */
export function NeoCoatCases({ activeTab, onTabChange, parsedKeyword }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCase, setSelectedCase] = useState(null); // 모달 상세 보기
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const taskName = parsedKeyword ? parsedKeyword.service.keyword : '';
  const publishedCases = getPublishedCaseStudies(activeTab, taskName);

  // prefers-reduced-motion 체크
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // 탭 변경 시 인덱스 리셋
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  // 자동 슬라이드 (공개 사례 3개 이상 & reduced-motion false & hover false 시 작동)
  useEffect(() => {
    if (publishedCases.length < 3 || prefersReducedMotion || isHovered || selectedCase) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % publishedCases.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [publishedCases.length, prefersReducedMotion, isHovered, selectedCase]);

  // 슬라이드 수동 조작
  const handlePrev = () => {
    if (publishedCases.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + publishedCases.length) % publishedCases.length);
  };

  const handleNext = () => {
    if (publishedCases.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % publishedCases.length);
  };

  // 터치 스와이프 조작
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null || publishedCases.length <= 1) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    if (diffX > 40) {
      handleNext();
    } else if (diffX < -40) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  // 모달 닫기
  const closeModal = () => setSelectedCase(null);

  // ESC 키 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (selectedCase) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedCase]);

  return (
    <section
      id="cases"
      aria-labelledby="cases-title"
      style={{
        backgroundColor: 'var(--neo-color-bg-white, #FFFFFF)',
        padding: '88px 0',
        borderTop: '1px solid var(--neo-color-border, #E2E8F0)',
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
            시공 사례
          </div>
          <h2
            id="cases-title"
            className="section-h2"
            style={{
              color: 'var(--neo-color-primary, #1E3A8A)',
              marginBottom: '16px',
              wordBreak: 'keep-all',
            }}
          >
            공간의 상태를 확인하고<br />필요한 과정을 적용했습니다
          </h2>
          <p
            className="body-default"
            style={{
              color: 'var(--neo-color-text-secondary, #475569)',
              maxWidth: '640px',
              margin: '0 auto',
              wordBreak: 'keep-all',
            }}
          >
            탄성코트와 줄눈시공은 같은 공간이라도 기존 마감과 오염 범위에 따라 작업 과정이 달라질 수 있습니다. 시공 전 상태와 작업 내용을 함께 확인해보세요.
          </p>
        </div>

        {/* 서비스군 사례 전환 탭 */}
        <div
          role="tablist"
          aria-label="시공 사례 서비스 선택"
          className="neo-tab-list-container"
          style={{ marginBottom: '40px' }}
        >
          <button
            role="tab"
            aria-selected={activeTab === 'elasticCoat'}
            aria-controls="cases-tabpanel-elasticCoat"
            id="cases-tab-elasticCoat"
            onClick={() => onTabChange('elasticCoat')}
            className={`neo-service-tab-btn ${activeTab === 'elasticCoat' ? 'is-active' : ''}`}
            type="button"
          >
            <span>탄성코트 사례</span>
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'grout'}
            aria-controls="cases-tabpanel-grout"
            id="cases-tab-grout"
            onClick={() => onTabChange('grout')}
            className={`neo-service-tab-btn ${activeTab === 'grout' ? 'is-active' : ''}`}
            type="button"
          >
            <span>줄눈시공 사례</span>
          </button>
        </div>

        {/* 사례 콘텐츠 영역 */}
        <div
          id={`cases-tabpanel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`cases-tab-${activeTab}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {publishedCases.length === 0 ? (
            /* 1. 정직한 등록 예정 빈 상태 (Published 사례가 0개일 경우) */
            <div className="neo-case-empty-card">
              <div className="empty-icon-circle">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-accent, #0D9488)" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="3" strokeLinecap="round" />
                  <circle cx="8.5" cy="8.5" r="1.5" fill="var(--neo-color-accent, #0D9488)" />
                  <polyline points="21 15 16 10 5 21" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="card-h3" style={{ fontSize: '20px', color: 'var(--neo-color-primary, #1E3A8A)', marginBottom: '8px' }}>
                네오코트 시공 사례를 준비하고 있습니다
              </h3>
              <p className="body-default" style={{ fontSize: '15px', color: 'var(--neo-color-text-secondary, #475569)', maxWidth: '540px', margin: '0 auto', wordBreak: 'keep-all', lineHeight: '1.6' }}>
                탄성코트와 줄눈시공 현장 이미지는 실제 시공 사례 검수 후 순차적으로 등록할 예정입니다.
              </p>
            </div>
          ) : (
            /* 2. 실제 시공 사례 카드 슬라이더 */
            <div className="neo-cases-slider-wrapper" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <div className="neo-case-main-card">
                {/* Header & Badges */}
                <div className="case-card-header">
                  <span className={`case-service-badge ${publishedCases[currentIndex].serviceGroup}`}>
                    {publishedCases[currentIndex].serviceGroup === 'elasticCoat' ? '탄성코트' : '줄눈시공'}
                  </span>
                  <span className="case-space-tag">
                    {publishedCases[currentIndex].spaceType}
                  </span>
                </div>

                <h3 className="card-h3" style={{ fontSize: '22px', color: 'var(--neo-color-primary, #1E3A8A)', marginBottom: '20px', textAlign: 'left' }}>
                  {publishedCases[currentIndex].title}
                </h3>

                {/* BEFORE vs AFTER Dual Image Box */}
                <div className="neo-before-after-grid">
                  <div className="ba-image-box">
                    <span className="ba-label before">BEFORE</span>
                    <img
                      src={publishedCases[currentIndex].beforeImage}
                      alt={`${publishedCases[currentIndex].title} 시공 전 상태`}
                      style={{ objectPosition: publishedCases[currentIndex].beforeObjectPosition || 'center' }}
                    />
                  </div>
                  <div className="ba-image-box">
                    <span className="ba-label after">AFTER</span>
                    <img
                      src={publishedCases[currentIndex].afterImage}
                      alt={`${publishedCases[currentIndex].title} 시공 후 마감 상태`}
                      style={{ objectPosition: publishedCases[currentIndex].afterObjectPosition || 'center' }}
                    />
                  </div>
                </div>

                {/* Issues & Work Details */}
                <div className="case-details-grid">
                  <div className="case-info-block">
                    <span className="info-block-title">확인한 상태</span>
                    <ul className="info-block-list">
                      {publishedCases[currentIndex].issues.map((iss, i) => (
                        <li key={i}>{iss}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="case-info-block">
                    <span className="info-block-title">주요 작업 내용</span>
                    <ul className="info-block-list">
                      {publishedCases[currentIndex].workDetails.map((det, i) => (
                        <li key={i}>{det}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action CTA */}
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--neo-color-border, #E2E8F0)', textAlign: 'center' }}>
                  <button
                    onClick={() => setSelectedCase(publishedCases[currentIndex])}
                    className="btn-secondary"
                    style={{ height: '46px', padding: '0 24px', fontSize: '15px' }}
                    type="button"
                  >
                    사례 자세히 보기
                  </button>
                </div>
              </div>

              {/* Slider Controls (이전 / 다음 / 위치 표시) */}
              {publishedCases.length > 1 && (
                <div className="slider-control-bar">
                  <button
                    onClick={handlePrev}
                    className="slider-nav-btn"
                    aria-label="이전 시공 사례"
                    type="button"
                  >
                    ‹
                  </button>
                  <span className="slider-indicator-text">
                    {currentIndex + 1} / {publishedCases.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="slider-nav-btn"
                    aria-label="다음 시공 사례"
                    type="button"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. 사례 상세 보기 모달 (Modal) */}
      {selectedCase && (
        <div className="neo-modal-backdrop" onClick={closeModal} aria-hidden="true">
          <div
            className="neo-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedCase.title} 상세 보기`}
          >
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '20px', color: 'var(--neo-color-primary, #1E3A8A)' }}>
                {selectedCase.title}
              </h3>
              <button onClick={closeModal} aria-label="모달 닫기" className="modal-close-btn" type="button">
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="neo-before-after-grid" style={{ marginBottom: '20px' }}>
                <div className="ba-image-box">
                  <span className="ba-label before">BEFORE</span>
                  <img src={selectedCase.beforeImage} alt={`${selectedCase.title} 시공 전 원본`} />
                </div>
                <div className="ba-image-box">
                  <span className="ba-label after">AFTER</span>
                  <img src={selectedCase.afterImage} alt={`${selectedCase.title} 시공 후 원본`} />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--neo-color-text-muted, #64748B)' }}>시공 요약</span>
                <p className="body-default" style={{ marginTop: '4px', lineHeight: '1.6' }}>{selectedCase.summary}</p>
              </div>

              <div className="case-details-grid">
                <div className="case-info-block">
                  <span className="info-block-title">확인한 상태</span>
                  <ul className="info-block-list">
                    {selectedCase.issues.map((iss, i) => <li key={i}>{iss}</li>)}
                  </ul>
                </div>
                <div className="case-info-block">
                  <span className="info-block-title">주요 작업 내용</span>
                  <ul className="info-block-list">
                    {selectedCase.workDetails.map((det, i) => <li key={i}>{det}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cases Section Styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .neo-case-empty-card {
          background-color: var(--neo-color-bg-main, #F8FAFC);
          border: 1px dashed var(--neo-color-border, #E2E8F0);
          border-radius: 24px;
          padding: 64px 24px;
          text-align: center;
        }

        .empty-icon-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background-color: var(--neo-color-bg-teal-light, #ECFDF5);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px auto;
        }

        .neo-cases-slider-wrapper {
          max-width: 860px;
          margin: 0 auto;
        }

        .neo-case-main-card {
          background-color: var(--neo-color-bg-white, #FFFFFF);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 24px;
          padding: 32px;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.05);
        }

        .case-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .case-service-badge.elasticCoat {
          background-color: var(--neo-color-bg-blue-light, #EFF6FF);
          color: var(--neo-color-primary, #1E3A8A);
          font-size: 13px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 8px;
        }

        .case-service-badge.grout {
          background-color: var(--neo-color-bg-teal-light, #ECFDF5);
          color: var(--neo-color-accent, #0D9488);
          font-size: 13px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 8px;
        }

        .case-space-tag {
          font-size: 13px;
          color: var(--neo-color-text-secondary, #475569);
          background-color: #F1F5F9;
          padding: 4px 10px;
          border-radius: 8px;
        }

        .neo-before-after-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          margin-bottom: 24px;
        }

        @media (min-width: 640px) {
          .neo-before-after-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .ba-image-box {
          width: 100%;
          aspect-ratio: 4 / 3;
          background-color: #F1F5F9;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }

        .ba-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .ba-label {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 12px;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 6px;
          letter-spacing: 1px;
        }

        .ba-label.before {
          background-color: rgba(15, 23, 42, 0.75);
          color: #FFFFFF;
        }

        .ba-label.after {
          background-color: var(--neo-color-accent, #0D9488);
          color: #FFFFFF;
        }

        .case-details-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
          text-align: left;
        }

        @media (min-width: 640px) {
          .case-details-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }

        .case-info-block {
          background-color: var(--neo-color-bg-main, #F8FAFC);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 14px;
          padding: 16px;
        }

        .info-block-title {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--neo-color-primary, #1E3A8A);
          display: block;
          margin-bottom: 8px;
        }

        .info-block-list {
          margin: 0;
          padding-left: 18px;
          fontSize: 14px;
          color: var(--neo-color-text-secondary, #475569);
          line-height: 1.6;
        }

        .slider-control-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 24px;
        }

        .slider-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--neo-color-border, #E2E8F0);
          background-color: #FFFFFF;
          color: var(--neo-color-primary, #1E3A8A);
          font-size: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .slider-nav-btn:hover {
          background-color: var(--neo-color-bg-blue-light, #EFF6FF);
        }

        .slider-indicator-text {
          font-size: 15px;
          font-weight: 700;
          color: var(--neo-color-text-primary, #0F172A);
        }

        .neo-modal-backdrop {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          z-index: 1100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .neo-modal-dialog {
          background-color: #FFFFFF;
          border-radius: 20px;
          max-width: 720px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 28px;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--neo-color-border, #E2E8F0);
        }

        .modal-close-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: var(--neo-color-text-secondary, #475569);
          padding: 4px;
        }
      `,
        }}
      />
    </section>
  );
}

export default NeoCoatCases;
