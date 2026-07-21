import React from 'react';
import { brandConfig } from '../config/brandConfig.js';
import { businessConfig } from '../config/businessConfig.js';
import { NeoCoatHeader } from '../components/NeoCoatHeader.jsx';
import { NeoCoatFooter } from '../components/NeoCoatFooter.jsx';

/**
 * 네오코트 이용약관 독립 기본 구조 페이지 (TermsPage)
 */
export function TermsPage({ onNavigate, currentPath }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <NeoCoatHeader onNavigate={onNavigate} currentPath={currentPath} />

      <main style={{ flex: 1, padding: '64px 20px', maxWidth: '800px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '36px 28px', borderRadius: '20px', border: '1px solid #E2E8F0', textAlign: 'left' }}>
          <h1 style={{ fontSize: '24px', color: 'var(--neo-color-primary, #1E3A8A)', marginBottom: '8px' }}>
            서비스 이용약관
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '28px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
            본 약관은 {brandConfig.brandName}(이하 '회사')가 제공하는 홈페이지 서비스의 이용조건 및 절차에 관한 사항을 규정합니다.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '14.5px', color: '#334155', lineHeight: '1.7' }}>
            <section>
              <h2 style={{ fontSize: '17px', color: '#0F172A', marginBottom: '8px' }}>제 1 조 (목적)</h2>
              <p style={{ margin: 0 }}>본 약관은 회사가 운영하는 웹사이트에서 제공하는 인터넷 관련 상담 안내 서비스의 이용과 관련하여 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '17px', color: '#0F172A', marginBottom: '8px' }}>제 2 조 (서비스의 범위 및 한계)</h2>
              <p style={{ margin: 0 }}>1. 회사가 본 웹사이트에서 제공하는 정보는 탄성코트 및 줄눈시공에 관한 사전 정보 제공 및 현장 상담 신청에 국한됩니다.</p>
              <p style={{ margin: 0 }}>2. 웹사이트상의 예상 안내 문구는 사전 참고용이며, 실제 시공 범위와 단가는 현장 바탕 상태, 수분 및 오염 제거 범위 확인 후 최종 확정됩니다.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '17px', color: '#0F172A', marginBottom: '8px' }}>제 3 조 (이용자의 의무)</h2>
              <p style={{ margin: 0 }}>이용자는 상담 신청 시 허위 정보를 작성해서는 안 되며, 타인의 개인정보를 도용하여 신청할 수 없습니다.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '17px', color: '#0F172A', marginBottom: '8px' }}>제 4 조 (책임 제한)</h2>
              <p style={{ margin: 0 }}>회사는 천재지변, 건물의 구조적 결함(누수, 벽체 수분 차오름 등)으로 인한 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.</p>
            </section>

            <section>
              <h2 style={{ fontSize: '17px', color: '#0F172A', marginBottom: '8px' }}>제 5 조 (약관의 개정)</h2>
              <p style={{ margin: 0 }}>회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있으며, 개정 시 웹사이트를 통해 공지합니다.</p>
            </section>
          </div>
        </div>
      </main>

      <NeoCoatFooter onNavigate={onNavigate} />
    </div>
  );
}

export default TermsPage;
