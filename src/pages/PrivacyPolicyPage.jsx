import React from 'react';
import { brandConfig } from '../config/brandConfig.js';
import { businessConfig } from '../config/businessConfig.js';
import { NeoCoatHeader } from '../components/NeoCoatHeader.jsx';
import { NeoCoatFooter } from '../components/NeoCoatFooter.jsx';

/**
 * 네오코트 개인정보처리방침 독립 기본 구조 페이지 (PrivacyPolicyPage)
 */
export function PrivacyPolicyPage({ onNavigate, currentPath }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <NeoCoatHeader onNavigate={onNavigate} currentPath={currentPath} />

      <main style={{ flex: 1, padding: '64px 20px', maxWidth: '800px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '36px 28px', borderRadius: '20px', border: '1px solid #E2E8F0', textAlign: 'left' }}>
          <h1 style={{ fontSize: '24px', color: 'var(--neo-color-primary, #1E3A8A)', marginBottom: '8px' }}>
            개인정보처리방침
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
            {brandConfig.brandName} (이하 '회사')는 이용자의 개인정보를 중요시하며, 개인정보보호법 등 관련 법령을 준수합니다.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '14.5px', color: '#334155', lineHeight: '1.7' }}>
            <section>
              <h2 style={{ fontSize: '17px', color: '#0F172A', marginBottom: '8px' }}>1. 수집하는 개인정보 항목</h2>
              <p style={{ margin: 0 }}>회사는 시공 상담 및 견적 안내를 위해 다음 개인정보를 수집합니다.</p>
              <ul style={{ paddingLeft: '20px', marginTop: '6px' }}>
                <li>필수항목: 시공 서비스 선택, 시공 지역, 연락받을 전화번호</li>
                <li>선택항목: 시공 원하시는 공간, 현재 문제 상태, 추가 문의 내용</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '17px', color: '#0F172A', marginBottom: '8px' }}>2. 개인정보의 수집 및 이용 목적</h2>
              <p style={{ margin: 0 }}>수집한 개인정보는 탄성코트 및 줄눈시공 현장 상담, 예상 작업 범위 확인, 견적 안내 및 관련 문의 응대 목적에 한하여 이용됩니다.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '17px', color: '#0F172A', marginBottom: '8px' }}>3. 개인정보의 보유 및 이용 기간</h2>
              <p style={{ margin: 0 }}>원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계 법령의 규정에 의하여 보존할 필요가 있는 경우 관련 법령에서 정한 기간 동안 보관합니다.</p>
              <p style={{ fontSize: '13.5px', color: '#64748B', marginTop: '4px' }}>(상세 보유 기간은 운영 정책 확정 후 자동 업데이트됩니다.)</p>
            </section>

            <section>
              <h2 style={{ fontSize: '17px', color: '#0F172A', marginBottom: '8px' }}>4. 개인정보의 제3자 제공 및 위탁</h2>
              <p style={{ margin: 0 }}>회사는 이용자의 동의 없이 개인정보를 외부에 제공하거나 위탁하지 않습니다.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '17px', color: '#0F172A', marginBottom: '8px' }}>5. 이용자의 권리 및 행사 방법</h2>
              <p style={{ margin: 0 }}>이용자는 언제든지 등록되어 있는 본인의 개인정보를 열람하거나 정정, 삭제를 요청할 수 있습니다.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '17px', color: '#0F172A', marginBottom: '8px' }}>6. 개인정보 보호책임자</h2>
              <p style={{ margin: 0 }}>성명/담당: {businessConfig.privacyOfficer || '개인정보 보호담당자'}</p>
              <p style={{ margin: 0 }}>상호명: {businessConfig.companyName || brandConfig.brandName}</p>
            </section>
          </div>
        </div>
      </main>

      <NeoCoatFooter onNavigate={onNavigate} />
    </div>
  );
}

export default PrivacyPolicyPage;
