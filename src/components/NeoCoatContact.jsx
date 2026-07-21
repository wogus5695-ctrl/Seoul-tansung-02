import React, { useState, useEffect } from 'react';
import { contactConfig } from '../config/contactConfig.js';
import { imageConfig } from '../config/imageConfig.js';

/**
 * 네오코트 문의 안내 및 상담 신청 컴포넌트 (NeoCoatContact)
 * - `#contact` 앵커 연동 (헤더 '문의' 메뉴 및 각종 CTA 버튼 이동 지점)
 * - PC 비대칭 2컬럼: 좌측 안내 영역 (38~42%) + 우측 신청 폼 (58~62%)
 * - 동적 키워드 기반 초기값 자동 세팅 (서비스, 시공 지역, 추천 공간, sourceKeyword, sourcePath)
 * - 한국 휴대전화 번호 자동 하이픈 및 유효성 검증
 * - 개인정보 동의 필수 및 모달 내용 보기 지원
 * - 바름공간 수신처/Sheet/Slack 미사용 및 네오코트 전용 안심 상태 관리 (가짜 전송 금지)
 */
export function NeoCoatContact({ parsedKeyword }) {
  // 동적 초기값 세팅
  const initialService = parsedKeyword
    ? (parsedKeyword.service.serviceGroup === 'elastic' ? '탄성코트' : '줄눈시공')
    : '아직 결정하지 못함';

  const initialRegion = parsedKeyword ? parsedKeyword.region.displayName : '';

  // 작업명별 공간 추천값 계산
  const getInitialRecommendedSpaces = () => {
    if (!parsedKeyword) return [];
    const task = parsedKeyword.service.keyword;
    if (task.includes('베란다')) return ['베란다'];
    if (task.includes('세탁실')) return ['세탁실'];
    if (task.includes('욕실')) return ['욕실'];
    if (task.includes('화장실')) return ['화장실'];
    if (task.includes('현관')) return ['현관'];
    if (task.includes('탄성코트')) return ['베란다', '세탁실'];
    if (task.includes('줄눈')) return ['욕실', '현관'];
    return [];
  };

  const [serviceType, setServiceType] = useState(initialService);
  const [region, setRegion] = useState(initialRegion);
  const [selectedSpaces, setSelectedSpaces] = useState(getInitialRecommendedSpaces());
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // 폼 검증 오류 상태
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'notice_unconnected'

  // 동적 키워드 변경 시 초기값 갱신
  useEffect(() => {
    if (parsedKeyword) {
      setServiceType(parsedKeyword.service.serviceGroup === 'elastic' ? '탄성코트' : '줄눈시공');
      setRegion(parsedKeyword.region.displayName);
      setSelectedSpaces(getInitialRecommendedSpaces());
    } else {
      setServiceType('아직 결정하지 못함');
      setRegion('');
      setSelectedSpaces([]);
    }
    setErrors({});
    setSubmitStatus('idle');
  }, [parsedKeyword]);

  // 전화번호 자동 하이픈 및 검증
  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    let formatted = raw;
    if (raw.length > 3 && raw.length <= 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    } else if (raw.length > 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
    }
    setPhone(formatted);
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: null }));
    }
  };

  // 공간 체크박스 토글
  const toggleSpace = (spaceName) => {
    setSelectedSpaces(prev =>
      prev.includes(spaceName) ? prev.filter(s => s !== spaceName) : [...prev, spaceName]
    );
  };

  // 문제 상태 체크박스 토글
  const toggleIssue = (issueName) => {
    setSelectedIssues(prev =>
      prev.includes(issueName) ? prev.filter(i => i !== issueName) : [...prev, issueName]
    );
  };

  // 유효성 검증
  const validateForm = () => {
    const newErrors = {};
    if (!serviceType) newErrors.serviceType = '시공 서비스를 선택해주세요.';
    if (!region.trim()) newErrors.region = '시공 지역을 입력해주세요.';

    const rawPhone = phone.replace(/-/g, '');
    if (!rawPhone || rawPhone.length < 10 || !rawPhone.startsWith('01')) {
      newErrors.phone = '연락 가능한 전화번호를 확인해주세요.';
    }
    if (!privacyAgreed) {
      newErrors.privacyAgreed = '개인정보 수집 및 이용에 동의해야 신청이 가능합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitStatus('submitting');

    setTimeout(() => {
      // 바름공간 수신처가 미연결된 네오코트 전용 안내 처리 (가짜 성공 표기 금지)
      setSubmitStatus('notice_unconnected');
    }, 600);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
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
        <div className="neo-contact-grid">
          {/* ====================================================
             LEFT COLUMN: Contact Guidance & Checklists (40%)
             ==================================================== */}
          <div className="neo-contact-left">
            <div className="uppercase-track" style={{ marginBottom: '8px' }}>
              상담 문의
            </div>

            <h2
              id="contact-title"
              className="section-h2"
              style={{
                color: 'var(--neo-color-primary, #1E3A8A)',
                marginBottom: '16px',
                wordBreak: 'keep-all',
              }}
            >
              현재 공간 상태를 알려주시면<br />확인할 내용을 안내해드립니다
            </h2>

            <p
              className="body-default"
              style={{
                color: 'var(--neo-color-text-secondary, #475569)',
                marginBottom: '32px',
                lineHeight: '1.65',
                wordBreak: 'keep-all',
              }}
            >
              작업을 원하는 공간과 현재 문제가 보이는 사진, 기존 시공 여부를 함께 알려주시면 상담에 필요한 내용을 보다 구체적으로 확인할 수 있습니다.
            </p>

            {/* 상담 전 준비사항 체크리스트 */}
            <div className="prep-checklist-card">
              <h3 className="card-h3" style={{ fontSize: '16.5px', color: 'var(--neo-color-primary, #1E3A8A)', marginBottom: '16px' }}>
                상담 전 준비하면 좋은 내용
              </h3>

              <div className="prep-checklist-list">
                <div className="prep-item">
                  <span className="prep-num">1</span>
                  <div>
                    <strong className="prep-title">작업을 원하는 공간</strong>
                    <p className="prep-desc">베란다, 세탁실, 욕실, 현관 등 시공을 원하는 공간을 알려주세요.</p>
                  </div>
                </div>

                <div className="prep-item">
                  <span className="prep-num">2</span>
                  <div>
                    <strong className="prep-title">현재 문제 상태</strong>
                    <p className="prep-desc">곰팡이, 오염, 들뜸, 균열, 기존 줄눈 마모 등 확인되는 상태를 알려주세요.</p>
                  </div>
                </div>

                <div className="prep-item">
                  <span className="prep-num">3</span>
                  <div>
                    <strong className="prep-title">기존 시공 여부</strong>
                    <p className="prep-desc">기존 탄성코트나 줄눈시공 이력이 있다면 함께 알려주세요.</p>
                  </div>
                </div>

                <div className="prep-item">
                  <span className="prep-num">4</span>
                  <div>
                    <strong className="prep-title">확인 가능한 사진</strong>
                    <p className="prep-desc">공간 전체와 문제가 발생한 부분을 함께 촬영하면 상담에 도움이 됩니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 전화 및 카카오 채널 안내 박스 */}
            <div className="contact-methods-box">
              <div className="contact-method-row">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-primary, #1E3A8A)" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <div>
                  <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--neo-color-primary, #1E3A8A)' }}>전화 상담</span>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--neo-color-text-secondary, #475569)' }}>
                    {contactConfig.phone ? contactConfig.phone : '대표 전화번호 등록 예정'}
                  </p>
                </div>
              </div>

              <div className="contact-method-row">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-accent, #0D9488)" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <div>
                  <span style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--neo-color-primary, #1E3A8A)' }}>사진 상담</span>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--neo-color-text-secondary, #475569)' }}>
                    {contactConfig.kakaoUrl ? '공식 채널 연결 가능' : '상담 채널 등록 예정'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ====================================================
             RIGHT COLUMN: Form & Fields (60%)
             ==================================================== */}
          <div className="neo-contact-right">
            <form onSubmit={handleSubmit} className="neo-contact-form" noValidate>
              {/* 1. 서비스 선택 */}
              <div className="form-group">
                <label className="form-label required">시공 서비스 선택</label>
                <div className="form-radio-grid">
                  {['탄성코트', '줄눈시공', '탄성코트·줄눈 함께 상담', '아직 결정하지 못함'].map((opt) => (
                    <label key={opt} className={`radio-chip ${serviceType === opt ? 'is-selected' : ''}`}>
                      <input
                        type="radio"
                        name="serviceType"
                        value={opt}
                        checked={serviceType === opt}
                        onChange={(e) => setServiceType(e.target.value)}
                        style={{ display: 'none' }}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
                {errors.serviceType && <span className="form-error-msg">{errors.serviceType}</span>}
              </div>

              {/* 2. 지역 입력 */}
              <div className="form-group">
                <label htmlFor="contact-region" className="form-label required">시공 지역</label>
                <input
                  id="contact-region"
                  type="text"
                  placeholder="예: 서울 강남구 역삼동"
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value);
                    if (errors.region) setErrors(prev => ({ ...prev, region: null }));
                  }}
                  className={`form-input ${errors.region ? 'has-error' : ''}`}
                />
                {errors.region && <span className="form-error-msg">{errors.region}</span>}
              </div>

              {/* 3. 공간 선택 (복수 체크) */}
              <div className="form-group">
                <label className="form-label">시공 원하시는 공간 (복수 선택 가능)</label>
                <div className="form-checkbox-grid">
                  {['베란다', '세탁실', '실외기실', '대피공간', '다용도실', '욕실', '화장실', '현관', '기타'].map((sp) => (
                    <label key={sp} className={`checkbox-chip ${selectedSpaces.includes(sp) ? 'is-selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedSpaces.includes(sp)}
                        onChange={() => toggleSpace(sp)}
                        style={{ display: 'none' }}
                      />
                      <span>{sp}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 4. 현재 문제 상태 (복수 체크) */}
              <div className="form-group">
                <label className="form-label">현재 확인되는 공간 문제 (복수 선택 가능)</label>
                <div className="form-checkbox-grid">
                  {['곰팡이', '결로 흔적', '벽면 오염', '기존 도막 들뜸', '벽면 균열', '타일 틈 오염', '기존 줄눈 탈락', '기존 백시멘트 마모', '기타'].map((iss) => (
                    <label key={iss} className={`checkbox-chip ${selectedIssues.includes(iss) ? 'is-selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedIssues.includes(iss)}
                        onChange={() => toggleIssue(iss)}
                        style={{ display: 'none' }}
                      />
                      <span>{iss}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 5. 연락처 */}
              <div className="form-group">
                <label htmlFor="contact-phone" className="form-label required">연락받을 전화번호</label>
                <input
                  id="contact-phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="숫자만 입력해주세요 (예: 01012345678)"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`form-input ${errors.phone ? 'has-error' : ''}`}
                />
                {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
              </div>

              {/* 6. 추가 문의 내용 */}
              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">추가 문의 내용</label>
                <textarea
                  id="contact-message"
                  rows="3"
                  placeholder="현재 상태, 기존 시공 여부, 원하는 작업 범위를 작성해주세요."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-textarea"
                />
              </div>

              {/* 7. 사진 첨부 영역 (백엔드 미연결 안전 안내) */}
              <div className="form-group">
                <label className="form-label">현장 사진 전달 방법</label>
                <div className="photo-notice-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--neo-color-accent, #0D9488)" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="3" strokeLinecap="round"/>
                    <circle cx="8.5" cy="8.5" r="1.5" fill="var(--neo-color-accent, #0D9488)"/>
                    <polyline points="21 15 16 10 5 21" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: '13.5px', color: 'var(--neo-color-text-secondary, #475569)' }}>
                    사진 전달이 필요한 경우 상담 연결 후 안내받은 채널로 보내주세요.
                  </span>
                </div>
              </div>

              {/* 8. 개인정보 수집 동의 */}
              <div className="form-group">
                <label className="privacy-checkbox-label">
                  <input
                    type="checkbox"
                    checked={privacyAgreed}
                    onChange={(e) => {
                      setPrivacyAgreed(e.target.checked);
                      if (errors.privacyAgreed) setErrors(prev => ({ ...prev, privacyAgreed: null }));
                    }}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '14px', color: 'var(--neo-color-text-primary, #0F172A)' }}>
                    상담을 위한 개인정보 수집 및 이용에 동의합니다.
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPrivacyModal(true)}
                    className="privacy-modal-btn"
                  >
                    [내용 보기]
                  </button>
                </label>
                {errors.privacyAgreed && <span className="form-error-msg">{errors.privacyAgreed}</span>}
              </div>

              {/* 9. 신청 버튼 & 미연결 안심 처리 박스 */}
              {submitStatus === 'notice_unconnected' ? (
                <div className="unconnected-notice-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--neo-color-primary, #1E3A8A)', fontWeight: '700', fontSize: '16px', marginBottom: '6px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>상담 신청 수신처 설정 준비 중입니다</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--neo-color-text-secondary, #475569)', lineHeight: '1.6' }}>
                    현재 네오코트 전용 문의 전송 채널(전화/카카오/이메일)이 최종 연결 준비 단계입니다. 바름공간 등 다른 업체의 수신처로 잘못 전송되는 것을 방지하기 위해 가짜 성공 처리를 시키지 않고 안전하게 안내해 드립니다.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="btn-secondary"
                    style={{ marginTop: '14px', height: '40px', fontSize: '13.5px' }}
                  >
                    다시 작성하기
                  </button>
                </div>
              ) : (
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitStatus === 'submitting'}
                  style={{
                    width: '100%',
                    height: '54px',
                    fontSize: '17px',
                    borderRadius: '14px',
                  }}
                >
                  {submitStatus === 'submitting' ? '상담 내용을 전송하고 있습니다...' : '상담 신청하기'}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* 개인정보 수집 및 이용 동의 모달 */}
      {showPrivacyModal && (
        <div className="neo-modal-backdrop" onClick={() => setShowPrivacyModal(false)} aria-hidden="true">
          <div className="neo-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--neo-color-primary, #1E3A8A)' }}>
                개인정보 수집 및 이용 동의
              </h3>
              <button onClick={() => setShowPrivacyModal(false)} className="modal-close-btn" type="button">✕</button>
            </div>
            <div className="modal-body" style={{ fontSize: '14px', color: 'var(--neo-color-text-secondary, #475569)', lineHeight: '1.65' }}>
              <p><strong>1. 수집 항목:</strong> 연락처, 시공 지역, 선택 서비스, 시공 공간, 공간 문제 상태, 추가 문의 내용</p>
              <p><strong>2. 수집 및 이용 목적:</strong> 탄성코트 및 줄눈시공 상담, 문의 응대 및 견적 안내</p>
              <p><strong>3. 보유 및 이용 기간:</strong> 상담 완료 및 이용 목적 달성 시까지 (보유 기간은 개인정보처리방침 확정 후 적용됩니다.)</p>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section Styling */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .neo-contact-grid {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        @media (min-width: 1024px) {
          .neo-contact-grid {
            display: grid;
            grid-template-columns: 40fr 60fr;
            gap: 48px;
            align-items: start;
          }
        }

        .neo-contact-left {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .prep-checklist-card {
          background-color: var(--neo-color-bg-main, #F8FAFC);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 18px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .prep-checklist-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .prep-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .prep-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: var(--neo-color-primary, #1E3A8A);
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .prep-title {
          font-size: 14.5px;
          color: var(--neo-color-primary, #1E3A8A);
          display: block;
          margin-bottom: 2px;
        }

        .prep-desc {
          font-size: 13.5px;
          color: var(--neo-color-text-secondary, #475569);
          margin: 0;
          line-height: 1.5;
        }

        .contact-methods-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background-color: var(--neo-color-bg-white, #FFFFFF);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 16px;
          padding: 18px 20px;
        }

        .contact-method-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .neo-contact-right {
          background-color: var(--neo-color-bg-main, #F8FAFC);
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 24px;
          padding: 32px 24px;
          text-align: left;
        }

        @media (min-width: 640px) {
          .neo-contact-right {
            padding: 36px;
          }
        }

        .form-group {
          margin-bottom: 22px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 14.5px;
          font-weight: 700;
          color: var(--neo-color-primary, #1E3A8A);
        }

        .form-label.required::after {
          content: ' *';
          color: #E11D48;
        }

        .form-radio-grid,
        .form-checkbox-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .radio-chip, .checkbox-chip {
          padding: 8px 14px;
          border-radius: 10px;
          border: 1px solid var(--neo-color-border, #E2E8F0);
          background-color: #FFFFFF;
          font-size: 14px;
          color: var(--neo-color-text-secondary, #475569);
          cursor: pointer;
          transition: all 0.15s ease;
          user-select: none;
        }

        .radio-chip.is-selected, .checkbox-chip.is-selected {
          background-color: var(--neo-color-primary, #1E3A8A);
          color: #FFFFFF;
          border-color: var(--neo-color-primary, #1E3A8A);
          font-weight: 600;
        }

        .form-input, .form-textarea {
          width: 100%;
          min-height: 48px;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid var(--neo-color-border, #E2E8F0);
          background-color: #FFFFFF;
          font-size: 15px;
          color: var(--neo-color-text-primary, #0F172A);
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.2s ease;
        }

        .form-input:focus, .form-textarea:focus {
          border-color: var(--neo-color-accent, #0D9488);
          box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
        }

        .form-input.has-error {
          border-color: #E11D48;
        }

        .form-error-msg {
          font-size: 13px;
          color: #E11D48;
          font-weight: 500;
        }

        .photo-notice-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: #FFFFFF;
          border: 1px solid var(--neo-color-border, #E2E8F0);
          padding: 12px 16px;
          border-radius: 12px;
        }

        .privacy-checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          flex-wrap: wrap;
        }

        .privacy-modal-btn {
          background: none;
          border: none;
          color: var(--neo-color-accent, #0D9488);
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          padding: 0;
        }

        .unconnected-notice-card {
          background-color: #FFFFFF;
          border: 1px solid var(--neo-color-border, #E2E8F0);
          border-radius: 16px;
          padding: 20px;
        }
      `,
        }}
      />
    </section>
  );
}

export default NeoCoatContact;
