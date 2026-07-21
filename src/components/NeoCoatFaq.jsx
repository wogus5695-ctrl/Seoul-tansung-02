import React, { useState, useEffect } from 'react';
import { contactConfig } from '../config/contactConfig.js';
import { getFaqItems } from '../data/faqData.js';

/**
 * 네오코트 FAQ 컴포넌트 (NeoCoatFaq)
 * - `#faq` 앵커 연동 (헤더의 'FAQ' 메뉴 연결)
 * - 동적 작업명별 1순위 특화 질문 + 기본 4개 조합 (총 5개 중복 없는 정돈된 질문)
 * - 첫 번째 질문 기본 열림, 키보드 접근성 `button` & `aria-expanded` & `aria-controls` 완벽 지원
 * - 하단 인라인 시공 범위 문의 안내 박스 배치
 */
export function NeoCoatFaq({ parsedKeyword, onNavigate }) {
  const [openIndex, setOpenIndex] = useState(0); // 첫 번째 질문 기본 열림

  const faqItems = getFaqItems(parsedKeyword);

  // 접속 키워드 변경 시 첫 번째 질문 열림으로 초기화
  useEffect(() => {
    setOpenIndex(0);
  }, [parsedKeyword]);

  const toggleFaq = (idx) => {
    setOpenIndex(prev => (prev === idx ? -1 : idx));
  };

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

  const handleCTAClick = (e) => {
    const targetHref = getContactHref();
    if (targetHref.startsWith('#') || targetHref.startsWith('/#')) {
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
    <section
      id="faq"
      aria-labelledby="faq-title"
      style={{
        backgroundColor: 'var(--neo-color-bg-main, #F8FAFC)',
        padding: '88px 0',
        borderTop: '1px solid var(--neo-color-border, #E2E8F0)',
      }}
    >
      <div
        style={{
          maxWidth: '860px',
          width: '100%',
          margin: '0 auto',
          padding: '0 var(--mobile-side-margin, 20px)',
        }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <div className="uppercase-track" style={{ marginBottom: '8px' }}>
            자주 묻는 질문
          </div>
          <h2
            id="faq-title"
            className="section-h2"
            style={{
              color: 'var(--neo-color-primary, #1E3A8A)',
              marginBottom: '16px',
              wordBreak: 'keep-all',
            }}
          >
            시공 전에 많이 묻는 내용을<br />먼저 정리했습니다
          </h2>
          <p
            className="body-default"
            style={{
              color: 'var(--neo-color-text-secondary, #475569)',
              maxWidth: '600px',
              margin: '0 auto',
              wordBreak: 'keep-all',
            }}
          >
            공간 상태와 기존 마감에 따라 작업 범위와 사용 가능 시점이 달라질 수 있습니다. 상담 전에 자주 확인하는 내용을 살펴보세요.
          </p>
        </div>

        {/* Technical Document-style Accordion List */}
        <div className="neo-faq-accordion-stack">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            const btnId = `faq-btn-${idx}`;
            const panelId = `faq-panel-${idx}`;

            return (
              <article key={item.id} className={`neo-faq-item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    id={btnId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(idx)}
                    className="neo-faq-btn"
                    type="button"
                  >
                    <span className="faq-q-text">
                      <span className="faq-q-badge">Q</span>
                      {item.question}
                    </span>
                    <svg
                      className="faq-arrow-icon"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="neo-faq-panel"
                  >
                    <p className="body-default" style={{ margin: 0, fontSize: '15px', color: 'var(--neo-color-text-secondary, #475569)', lineHeight: '1.65', wordBreak: 'keep-all' }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Inline Contact Prompt Box */}
        <div className="neo-faq-contact-prompt">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--neo-color-text-primary, #0F172A)' }}>
              현재 공간 상태가 FAQ만으로 판단하기 어렵다면 사진과 함께 문의해주세요.
            </span>
          </div>

          <a
            href={getContactHref()}
            onClick={handleCTAClick}
            className="btn-secondary"
            style={{
              height: '40px',
              padding: '0 16px',
              fontSize: '14px',
              borderRadius: '10px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            시공 범위 문의하기 →
          </a>
        </div>
      </div>

      {/* FAQ Styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .neo-faq-accordion-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 40px;
        }

        .neo-faq-item {
          background-color: var(--neo-color-bg-white, #FFFFFF);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 16px;
          overflow: hidden;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .neo-faq-item.is-open {
          border-color: rgba(30, 58, 138, 0.3);
          box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.04);
        }

        .neo-faq-btn {
          width: 100%;
          min-height: 56px;
          padding: 18px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: var(--neo-color-text-primary, #0F172A);
          font-weight: 700;
          font-size: 16.5px;
        }

        .faq-q-text {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-right: 12px;
        }

        .faq-q-badge {
          font-size: 14px;
          font-weight: 800;
          color: var(--neo-color-primary, #1E3A8A);
          background-color: var(--neo-color-bg-blue-light, #EFF6FF);
          padding: 2px 8px;
          border-radius: 6px;
        }

        .faq-arrow-icon {
          color: var(--neo-color-text-muted, #64748B);
          flex-shrink: 0;
        }

        .neo-faq-panel {
          padding: 0 22px 20px 22px;
          border-top: 1px dashed var(--neo-color-border, #E2E8F0);
          padding-top: 16px;
          text-align: left;
        }

        .neo-faq-contact-prompt {
          background-color: var(--neo-color-bg-white, #FFFFFF);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
          justify-content: space-between;
          text-align: left;
        }

        @media (min-width: 640px) {
          .neo-faq-contact-prompt {
            flex-direction: row;
            gap: 16px;
          }
        }
      `,
        }}
      />
    </section>
  );
}

export default NeoCoatFaq;
