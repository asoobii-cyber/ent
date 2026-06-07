'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   모든 CSS — Tailwind 없이 직접 주입
   (globals.css / tailwind.config.ts 영향 안 받음)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const CSS = `
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.css');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Pretendard', 'Pretendard Variable', -apple-system,
               'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  background: #fff;
  color: #0F172A;
  line-height: 1.7;
  letter-spacing: -0.01em;
}
h1,h2,h3,h4,h5,h6 {
  font-family: 'Pretendard', 'Pretendard Variable', sans-serif;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.25;
  word-break: keep-all;
}
a { text-decoration: none; color: inherit; }
img { display: block; max-width: 100%; }

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #0B1F45; }
::-webkit-scrollbar-thumb { background: #3B82F6; border-radius: 3px; }

/* ── 공통 컨테이너 ── */
.ek-wrap { max-width: 1440px; margin: 0 auto; padding: 0 20px; }

/* ── 섹션 공통 ── */
.ek-section { padding: 80px 0; overflow: hidden; position: relative; }
@media(min-width:768px){ .ek-section { padding: 120px 0; } }

/* ── 헤더 ── */
.ek-header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  transition: background 0.4s, backdrop-filter 0.4s, box-shadow 0.4s;
}
.ek-header-inner {
  max-width: 1440px; margin: 0 auto; padding: 0 20px;
  height: 64px; display: flex; align-items: center; justify-content: space-between;
}
@media(min-width:768px){ .ek-header-inner { height: 80px; } }
.ek-logo-sub {
  font-size: 10px; font-weight: 400; letter-spacing: 0.4em;
  text-transform: uppercase; line-height: 1; margin-bottom: 3px;
}
.ek-logo-main { font-size: 14px; font-weight: 600; letter-spacing: 0.08em; color: #fff; }
@media(min-width:768px){ .ek-logo-main { font-size: 16px; } }
.ek-nav { display: none; align-items: center; gap: 28px; }
@media(min-width:1024px){ .ek-nav { display: flex; } }
.ek-nav a {
  font-size: 14px; font-weight: 400; letter-spacing: 0.02em;
  color: rgba(255,255,255,0.72); transition: color 0.2s;
}
.ek-nav a:hover { color: #60A5FA; }
.ek-header-cta { display: none; }
@media(min-width:1024px){ .ek-header-cta { display: flex; } }
.ek-hamburger { background: none; border: none; cursor: pointer; color: #fff; padding: 8px; }
@media(min-width:1024px){ .ek-hamburger { display: none; } }
.ek-mobile-menu { overflow: hidden; }
.ek-mobile-menu-inner {
  padding: 16px 20px; display: flex; flex-direction: column; gap: 16px;
  border-top: 1px solid rgba(255,255,255,0.08);
}
.ek-mobile-menu a { font-size: 14px; font-weight: 400; color: rgba(255,255,255,0.8); padding: 4px 0; }

/* ── 버튼 ── */
.ek-btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 600; letter-spacing: -0.01em;
  padding: 12px 28px; border-radius: 8px; border: none; cursor: pointer;
  transition: all 0.2s; white-space: nowrap;
}
.ek-btn-blue { background: #3B82F6; color: #fff; }
.ek-btn-blue:hover { background: #60A5FA; transform: translateY(-2px); }
.ek-btn-kakao { background: #FEE500; color: #1A1A1A; }
.ek-btn-kakao:hover { opacity: 0.88; }
.ek-btn-outline {
  background: transparent; color: rgba(255,255,255,0.75);
  border: 1px solid rgba(255,255,255,0.2);
}
.ek-btn-outline:hover { border-color: #60A5FA; color: #60A5FA; }
.ek-btn-sm { padding: 10px 20px; font-size: 13px; }

/* ── CTAs 행 ── */
.ek-cta-row { display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-top: 40px; }

/* ── HERO ── */
.ek-hero {
  min-height: 100vh; display: flex; flex-direction: column;
  justify-content: center; overflow: hidden; position: relative;
  background: linear-gradient(150deg, #0B1F45 0%, #0D2757 45%, #1249A0 100%);
}
.ek-hero-bg-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(96,165,250,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(96,165,250,0.04) 1px, transparent 1px);
  background-size: 64px 64px;
}
.ek-hero-glow {
  position: absolute; pointer-events: none; border-radius: 50%;
  background: radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%);
  width: 500px; height: 500px; top: 33%; right: 25%;
}
.ek-hero-line {
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, #60A5FA 40%, #3B82F6 60%, transparent);
}
.ek-hero-inner { position: relative; z-index: 1; padding-top: 120px; padding-bottom: 80px; }
@media(min-width:768px){ .ek-hero-inner { padding-top: 144px; } }
.ek-hero-badge {
  display: inline-flex; align-items: center; gap: 12px;
  margin-bottom: 24px;
}
.ek-hero-badge-line { height: 1px; width: 32px; background: #60A5FA; }
.ek-hero-badge-text {
  font-size: 11px; font-weight: 500; letter-spacing: 0.3em;
  text-transform: uppercase; color: #60A5FA;
}
/* 대제목 크기 확대 */
.ek-hero-h1 {
  font-size: clamp(36px, 5.5vw, 72px); font-weight: 700;
  color: #fff; line-height: 1.25; letter-spacing: -0.03em;
  margin-bottom: 20px; word-break: keep-all;
}
.ek-hero-h1 .ek-grad {
  background: linear-gradient(100deg, #60A5FA, #93C5FD, #60A5FA);
  background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text; font-weight: 700;
}
.ek-hero-sub {
  font-size: clamp(20px, 3vw, 36px); font-weight: 300;
  color: rgba(255,255,255,0.72); letter-spacing: 0.05em;
  margin-bottom: 24px; word-break: keep-all;
}
.ek-hero-divider {
  width: 48px; height: 2px; border-radius: 2px;
  background: linear-gradient(90deg, #3B82F6, #60A5FA);
  margin: 0 auto 32px;
}
.ek-hero-desc {
  font-size: 16px; font-weight: 300; line-height: 1.8;
  color: rgba(255,255,255,0.6); max-width: 560px; margin: 0 auto;
}
@media(min-width:768px){ .ek-hero-desc { font-size: 18px; } }
.ek-hero-center { text-align: center; margin-bottom: 56px; }

/* 대학병원 외래교수 마크 스타일 */
.ek-hero-university-mark {
  width: 140px;        /* 👈 가로 크기를 140~160px 정도로 대폭 확대 */
  height: auto;         /* 비율에 맞게 세로는 자동으로 조절 */
  margin-bottom: 20px;  /* 아래쪽 글씨들과의 간격 띄우기 */
  display: block;
}

/* ── 전공 카드 그리드 크기 확대 ── */
.ek-specialty-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
@media(min-width:640px){ .ek-specialty-grid { grid-template-columns: repeat(3, 1fr); } }
@media(min-width:1024px){ .ek-specialty-grid { grid-template-columns: repeat(6, 1fr); } }
.ek-specialty-card {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10);
  border-radius: 14px; padding: 24px 16px; display: flex; flex-direction: column;
  align-items: center; text-align: center; cursor: pointer;
  transition: all 0.25s; backdrop-filter: blur(10px);
}
.ek-specialty-card:hover {
  background: rgba(96,165,250,0.12); border-color: rgba(96,165,250,0.4);
  transform: translateY(-4px);
}
.ek-specialty-icon { font-size: 36px; margin-bottom: 12px; }
.ek-specialty-title { font-size: 15px; font-weight: 600; color: #fff; margin-bottom: 6px; line-height: 1.3; }
.ek-specialty-sub { font-size: 11px; font-weight: 300; color: rgba(255,255,255,0.5); line-height: 1.3; }

/* ── 자격 배지 목록 ── */
.ek-badges {
  display: flex; flex-wrap: wrap; justify-content: center;
  gap: 16px; margin-top: 40px;
}
.ek-badge-item { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.38); }

/* ── 스크롤 인디케이터 ── */
.ek-scroll-indicator {
  position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
  width: 20px; height: 36px; border-radius: 10px;
  border: 1px solid rgba(96,165,250,0.4);
  display: flex; align-items: flex-start; justify-content: center;
  padding-top: 6px;
}
.ek-scroll-dot { width: 2px; height: 10px; border-radius: 1px; background: rgba(96,165,250,0.6); }

/* ── 섹션 공통 레이블 ── */
.ek-label {
  font-size: 11px; font-weight: 500; letter-spacing: 0.4em;
  text-transform: uppercase; color: #60A5FA; margin-bottom: 12px;
}
.ek-section-h2 {
  font-size: clamp(24px, 3.5vw, 36px); font-weight: 700; margin-bottom: 6px;
}
.ek-section-h3 {
  font-size: clamp(20px, 2.8vw, 30px); font-weight: 600; margin-bottom: 20px;
}
.ek-divider {
  width: 48px; height: 2px; border-radius: 2px;
  background: linear-gradient(90deg, #3B82F6, #60A5FA);
  margin-bottom: 28px;
}
.ek-divider-center { margin-left: auto; margin-right: auto; }
.ek-body-text { font-size: 15px; font-weight: 300; line-height: 1.85; }

/* ━━━ 수면 클리닉 ━━━ */
.ek-sleep-layout { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: center; }
@media(min-width:1024px){ .ek-sleep-layout { grid-template-columns: 1fr 1fr; gap: 64px; } }
.ek-stats-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 36px; }
.ek-stat-card {
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px; padding: 16px; text-align: center;
}
.ek-stat-val { font-size: 24px; font-weight: 700; color: #60A5FA; margin-bottom: 4px; }
.ek-stat-lbl { font-size: 11px; font-weight: 300; color: rgba(255,255,255,0.55); white-space: pre-line; line-height: 1.4; }
.ek-feature-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
@media(min-width:640px){ .ek-feature-grid { grid-template-columns: repeat(2,1fr); } }
.ek-feature-card {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
  border-radius: 12px; padding: 18px; display: flex; align-items: flex-start; gap: 12px;
  transition: all 0.25s;
}
.ek-feature-card:hover { background: rgba(96,165,250,0.1); border-color: rgba(96,165,250,0.3); }
.ek-feature-dot { width: 6px; height: 6px; border-radius: 50%; background: #60A5FA; flex-shrink: 0; margin-top: 8px; }
.ek-feature-title { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 4px; }
.ek-feature-desc { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.5); line-height: 1.6; }

/* ── 어지럼증 ── */
.ek-condition-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; margin-bottom: 48px; }
@media(min-width:768px){ .ek-condition-grid { grid-template-columns: repeat(3,1fr); } }
.ek-condition-card {
  background: #fff; border: 1px solid #DBEAFE; border-radius: 16px;
  padding: 24px; transition: all 0.25s;
}
.ek-condition-card:hover { border-color: #3B82F6; box-shadow: 0 8px 30px rgba(59,130,246,0.12); }
.ek-condition-icon-wrap {
  width: 40px; height: 40px; border-radius: 10px;
  background: #EFF6FF; display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: #1E62C8; margin-bottom: 10px; flex-shrink: 0;
}
.ek-condition-name { font-size: 14px; font-weight: 600; color: #0B1F45; margin-bottom: 6px; }
.ek-condition-desc { font-size: 13px; font-weight: 300; color: #64748B; line-height: 1.6; }
.ek-step-box { background: linear-gradient(135deg, #0B1F45, #1249A0); border-radius: 16px; padding: 40px; }
.ek-step-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; }
@media(min-width:640px){ .ek-step-grid { grid-template-columns: repeat(4,1fr); } }
.ek-step-item { text-align: center; }
.ek-step-num {
  width: 48px; height: 48px; border-radius: 50%;
  border: 1px solid rgba(96,165,250,0.45);
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 12px; font-size: 14px; font-weight: 600; color: #60A5FA;
}
.ek-step-title { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 6px; }
.ek-step-desc { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.55); line-height: 1.6; }
.ek-step-box-title { font-size: 20px; font-weight: 600; color: #fff; text-align: center; margin-bottom: 32px; }

/* ── 고압산소 ── */
.ek-hbot-layout { display: grid; grid-template-columns: 1fr; gap: 28px; }
@media(min-width:640px){ .ek-hbot-layout { grid-template-columns: 1fr 2fr; } }
.ek-principle-card {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10);
  border-radius: 16px; padding: 28px;
}
.ek-principle-icon { font-size: 28px; margin-bottom: 20px; }
.ek-principle-title { font-size: 20px; font-weight: 600; color: #fff; margin-bottom: 20px; }
.ek-principle-item { display: flex; gap: 12px; font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.7); margin-bottom: 16px; line-height: 1.7; }
.ek-principle-num { color: #60A5FA; flex-shrink: 0; margin-top: 2px; font-weight: 600; }
.ek-indication-title { font-size: 20px; font-weight: 600; color: #fff; margin-bottom: 20px; }
.ek-indication-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; margin-bottom: 20px; }
.ek-indication-item { border-radius: 10px; padding: 12px 8px; text-align: center; }
.ek-indication-item p { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.8); line-height: 1.4; }
.ek-indication-badge {
  display: inline-block; font-size: 9px; font-weight: 500; letter-spacing: 0.1em;
  border: 1px solid rgba(96,165,250,0.4); color: #60A5FA;
  padding: 2px 6px; border-radius: 4px; margin-bottom: 6px;
}
.ek-golden-box {
  background: rgba(59,130,246,0.12); border: 1px solid rgba(96,165,250,0.25);
  border-radius: 12px; padding: 20px; display: flex; align-items: flex-start; gap: 14px;
}
.ek-golden-icon {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(96,165,250,0.2); display: flex; align-items: center;
  justify-content: center; flex-shrink: 0; font-size: 16px;
}
.ek-golden-title { font-size: 14px; font-weight: 600; color: #60A5FA; margin-bottom: 6px; }
.ek-golden-desc { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.6); line-height: 1.7; }

/* ── 청능 클리닉 ── */
.ek-hearing-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin-bottom: 40px; }
@media(min-width:1024px){ .ek-hearing-grid { grid-template-columns: repeat(3,1fr); } }
.ek-hearing-card {
  background: #fff; border: 1px solid #DBEAFE; border-radius: 16px;
  padding: 28px; transition: all 0.25s;
}
.ek-hearing-card:hover {
  border-color: #3B82F6; transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(59,130,246,0.14);
}
.ek-hearing-icon {
  width: 48px; height: 48px; border-radius: 12px;
  background: #0B1F45; color: #60A5FA;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; margin-bottom: 20px;
}
.ek-hearing-title { font-size: 18px; font-weight: 700; color: #0B1F45; margin-bottom: 12px; }
.ek-hearing-desc { font-size: 14px; font-weight: 300; color: #64748B; line-height: 1.75; margin-bottom: 20px; }
.ek-hearing-points { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.ek-hearing-point { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 400; color: #1E62C8; }
.ek-hearing-point-dot { width: 6px; height: 6px; border-radius: 50%; background: #3B82F6; flex-shrink: 0; }
.ek-subsidy-bar {
  background: linear-gradient(135deg, #0B1F45, #1249A0);
  border-radius: 16px; padding: 28px;
  display: flex; flex-direction: column; gap: 20px; align-items: flex-start;
}
@media(min-width:768px){ .ek-subsidy-bar { flex-direction: row; align-items: center; justify-content: space-between; } }
.ek-subsidy-title { font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 6px; word-break: keep-all; }
.ek-subsidy-desc { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.65); line-height: 1.7; }

/* ── 의료진 ── */
.ek-doctor-layout { display: grid; grid-template-columns: 1fr; gap: 40px; align-items: start; }
@media(min-width:1024px){ .ek-doctor-layout { grid-template-columns: 2fr 3fr; gap: 40px; } }
.ek-photo-placeholder {
  border-radius: 16px; overflow: hidden; aspect-ratio: 4/5;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  margin-bottom: 20px;
}
.ek-photo-avatar {
  width: 112px; height: 112px; border-radius: 50%;
  background: rgba(255,255,255,0.08); border: 2px solid rgba(96,165,250,0.3);
  display: flex; align-items: center; justify-content: center;
  font-size: 48px; margin-bottom: 12px;
}
.ek-photo-hint { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.4); }
.ek-doctor-card {
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px; padding: 24px;
}
.ek-doctor-role { font-size: 11px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #60A5FA; margin-bottom: 4px; }
.ek-doctor-name { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 4px; }
.ek-doctor-spec { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.5); margin-bottom: 16px; }
.ek-doctor-divider { height: 1px; background: rgba(255,255,255,0.1); margin-bottom: 16px; }
.ek-doctor-quote { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.65); line-height: 1.75; }
.ek-cred-list { display: flex; flex-direction: column; gap: 16px; }
.ek-cred-card {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
  border-radius: 12px; padding: 20px;
}
.ek-cred-header { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; }
.ek-cred-dot { width: 8px; height: 8px; border-radius: 50%; background: #60A5FA; flex-shrink: 0; }
.ek-cred-cat { font-size: 12px; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; color: #60A5FA; }
.ek-cred-items { list-style: none; display: flex; flex-direction: column; gap: 6px; padding-left: 16px; }
.ek-cred-item { display: flex; align-items: flex-start; gap: 8px; font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.65); }
.ek-cred-dash { color: rgba(255,255,255,0.3); font-size: 12px; margin-top: 4px; flex-shrink: 0; }
.ek-philosophy-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-top: 16px; }
.ek-philosophy-card {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px; padding: 20px; text-align: center; transition: border-color 0.25s;
}
.ek-philosophy-card:hover { border-color: rgba(96,165,250,0.3); }
.ek-philosophy-icon { font-size: 24px; margin-bottom: 8px; }
.ek-philosophy-title { font-size: 14px; font-weight: 600; color: #fff; margin-bottom: 6px; }
.ek-philosophy-desc { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.5); line-height: 1.6; }

/* ── 푸터 ── */
.ek-footer-cta {
  padding: 56px 0;
  display: flex; flex-direction: column; gap: 32px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
@media(min-width:768px){ .ek-footer-cta { flex-direction: row; align-items: center; justify-content: space-between; } }
.ek-footer-cta-title { font-size: clamp(22px,3vw,30px); font-weight: 600; color: #fff; margin-bottom: 8px; word-break: keep-all; }
.ek-footer-cta-sub { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.5); }
.ek-footer-cta-btns { display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; }
@media(min-width:640px){ .ek-footer-cta-btns { flex-direction: row; } }
.ek-footer-grid { padding: 56px 0; display: grid; grid-template-columns: 1fr; gap: 48px; }
@media(min-width:768px){ .ek-footer-grid { grid-template-columns: repeat(3,1fr); } }
.ek-footer-brand-sub { font-size: 10px; font-weight: 400; letter-spacing: 0.4em; text-transform: uppercase; color: #60A5FA; margin-bottom: 4px; }
.ek-footer-brand-main { font-size: 18px; font-weight: 600; color: #fff; letter-spacing: 0.06em; margin-bottom: 20px; }
.ek-footer-info { display: flex; flex-direction: column; gap: 12px; }
.ek-footer-info-row { display: flex; align-items: flex-start; gap: 12px; }
.ek-footer-info-icon { font-size: 16px; flex-shrink: 0; margin-top: 2px; }
.ek-footer-info-text { font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.55); line-height: 1.6; }
.ek-footer-info-text a:hover { color: #fff; }
.ek-hours-title { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 20px; }
.ek-hours-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
.ek-hours-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 16px; border-radius: 8px; font-size: 14px; font-weight: 300;
}
.ek-hours-note { font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.35); line-height: 1.7; }
.ek-links-title { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 20px; }
.ek-links-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
.ek-links-item { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.5); transition: color 0.2s; }
.ek-links-item:hover { color: #60A5FA; }
.ek-links-dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(59,130,246,0.6); flex-shrink: 0; }
.ek-map-btn {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 14px; font-weight: 300; color: rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.1); padding: 10px 16px;
  border-radius: 10px; transition: all 0.2s;
}
.ek-map-btn:hover { color: #60A5FA; border-color: rgba(96,165,250,0.3); }
.ek-footer-bottom {
  padding: 24px 0; border-top: 1px solid rgba(255,255,255,0.07);
  display: flex; flex-direction: column; gap: 12px; align-items: center;
  font-size: 12px; font-weight: 300; color: rgba(255,255,255,0.3); text-align: center;
}
@media(min-width:768px){ .ek-footer-bottom { flex-direction: row; justify-content: space-between; text-align: left; } }
.ek-footer-legal { display: flex; gap: 20px; }
.ek-footer-legal a:hover { color: #fff; }

/* ─── 플로팅 버튼 ─── */
.ek-floating { position: fixed; bottom: 24px; right: 20px; z-index: 999; display: flex; flex-direction: column; gap: 12px; }
.ek-float-btn {
  width: 56px; height: 56px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; border: none; transition: transform 0.2s;
  box-shadow: 0 4px 20px rgba(0,0,0,0.25); position: relative;
}
.ek-float-btn:hover { transform: scale(1.1); }
.ek-float-btn:active { transform: scale(0.95); }
.ek-float-tooltip {
  position: absolute; right: 68px;
  font-size: 12px; font-weight: 400;
  padding: 6px 12px; border-radius: 8px;
  white-space: nowrap; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.ek-pulse { animation: phonePulse 3s ease-in-out infinite; }

@keyframes phonePulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.5); }
  50% { box-shadow: 0 0 0 14px rgba(59,130,246,0); }
}

/* ─── 링 데코레이션 ─── */
.ek-ring { position: absolute; top:50%; left:50%; transform:translate(-50%,-50%); border-radius:50%; pointer-events:none; }

/* ─── 섹션 구분선 ─── */
.ek-top-line {
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, #60A5FA 40%, #3B82F6 60%, transparent);
}
`

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   DATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PHONE = '042-000-0000'   // ← 실제 번호로 교체
const KAKAO = 'https://open.kakao.com/'  // ← 실제 오픈채팅 URL로 교체

const NAV = [
  { label: '수면 클리닉',   href: '#sleep'     },
  { label: '어지럼증',      href: '#dizziness' },
  { label: '고압산소치료', href: '#hbot'      },
  { label: '청능 클리닉',   href: '#hearing'   },
  { label: '의료진',       href: '#doctor'    },
  { label: '오시는 길',    href: '#footer'    },
]

const CARDS = [
  { icon: '🌙', title: '수면 클리닉',    sub: '코골이 · 수면무호흡', href: '#sleep'     },
  { icon: '🌀', title: '어지럼증 클리닉', sub: '전정기능 정밀검사',   href: '#dizziness' },
  { icon: '💠', title: '고압산소치료',   sub: '최신 챔버 운영',      href: '#hbot'      },
  { icon: '👂', title: '난청 · 이명',    sub: '정밀 청력 검사',      href: '#hearing'   },
  { icon: '🎧', title: '보청기',          sub: '전문가 자격증 보유',   href: '#hearing'   },
  { icon: '⭐', title: '이비인후과',      sub: '전문의 직접 진료',     href: '#doctor'    },
]

const SLEEP_FEATURES = [
  { title: '수면다원검사 (PSG)',     desc: '병원급 수면다원검사로 코골이·수면무호흡 중증도를 정밀 분석합니다.' },
  { title: '양압기(CPAP) 처방·관리', desc: '최신 양압기 처방 및 지속 사용 관리를 전문의가 직접 지원합니다.' },
  { title: '수술적 치료',            desc: '구개수구개인두성형술(UPPP), 고주파 설근부 축소술 등 원인별 맞춤 수술.' },
  { title: '비수술적 치료',          desc: '구강 내 장치(OAT), 체위요법 등 수술 없이 효과적인 치료를 제시합니다.' },
  { title: '소아 코골이',            desc: '성장기 코골이는 발달에 영향을 줍니다. 소아 전문 접근으로 안전 치료.' },
  { title: '수면 전문의 자격 보유',  desc: '대한수면연구학회 공인 수면 전문의가 초진부터 추적 관찰까지 담당.' },
]

const CONDITIONS = [
  { icon: '⟳', name: '이석증 (BPPV)',  desc: '이석치환술(Epley법)로 단기간에 증상 해소' },
  { icon: '◎', name: '메니에르병',      desc: '저염식이·이뇨제·내림프낭 수술 등 단계별 치료' },
  { icon: '⟲', name: '전정신경염',      desc: '스테로이드 치료 및 전정재활 운동' },
  { icon: '✦', name: '중추성 어지럼증', desc: '영상검사 협진으로 신속한 원인 감별' },
  { icon: '◈', name: '청성 어지럼증',  desc: '청력 검사 병행으로 달팽이관·전정 동시 평가' },
  { icon: '◉', name: '만성 어지럼증',  desc: '전정재활치료(VRT) 프로그램 운영' },
]

const STEPS = [
  { step: '01', title: '초진 문진',      desc: '발생 양상·동반 증상·과거력 청취' },
  { step: '02', title: '비디오 안진검사', desc: '눈 움직임으로 이석증·전정신경염 감별' },
  { step: '03', title: '전정기능검사',    desc: '온도안진검사로 좌우 전정 기능 비교' },
  { step: '04', title: '맞춤 치료',      desc: '이석치환술·약물·수술·재활 중 최적 치료' },
]

const HBOT_PRINCIPLES = [
  '챔버 내 기압을 2~3기압으로 높여 혈액·조직의 산소 용해도를 최대 20배까지 증가시킵니다.',
  '혈관이 없는 손상 조직까지 산소가 확산되어 세포 재생과 회복을 촉진합니다.',
  '달팽이관(와우)의 산소 공급을 개선하여 돌발성 난청의 회복 가능성을 높입니다.',
]

const HBOT_INDICATIONS = [
  '돌발성 난청 집중 치료', '이명 병행 치료',   '급성 저음형 감각신경성 난청',
  '상처 치유 촉진',       '이압손상',         '일산화탄소 중독',
  '당뇨성 족부궤양',      '방사선 조직 괴사',  '근골격계 질환',
]

const HEARING_SERVICES = [
  { icon: '🔊', title: '서울고려 난청 클리닉',
    desc: '순음청력검사(PTA)·어음청력검사·임피던스검사를 포함한 정밀 청력 평가로 원인별 맞춤 치료를 제공합니다. 노인성·소음성·감각신경성 난청 모두 아우릅니다.',
    points: ['정밀 청력검사 일체', '노인성·소음성·감각신경성 난청', '소아 청력검사'] },
  { icon: '🎵', title: '서울고려 이명 클리닉',
    desc: '이명도검사·최소차폐레벨 검사로 이명의 특성을 정밀 분석하고 이명재훈련치료(TRT)·소리치료·인지행동치료를 복합 적용합니다.',
    points: ['이명 전문가 자격증 보유', '이명재훈련치료(TRT)', '고압산소치료 병행'] },
  { icon: '🎧', title: '서울고려 보청기 전문',
    desc: '보청기전문가자격증을 보유한 전문의가 청력도에 맞춘 보청기를 처방하고 실이측정(REM) 기반으로 정밀 피팅합니다. 국가 보조금 처방전 발급 가능.',
    points: ['보청기전문가 자격증 보유', '실이측정(REM) 기반 피팅', '국가 보조금 처방전 발급'] },
]

const CREDENTIALS = [
  { cat: '학력',     items: ['고려대학교 의과대학 의학사', '고려대학교 대학원 의학석사'] },
  { cat: '수련',     items: ['고려대학교 안산병원 이비인후과 레지던트 수료', '고려대학교 안산병원 이비인후과 전임의'] },
  { cat: '자격증',   items: ['보건복지부 인증 이비인후과 전문의', '대한수면연구학회 수면 전문의', '이비인후과 어지럼증 전문가 자격증', '이명 전문가 자격증', '보청기전문가 자격증'] },
  { cat: '학회 활동', items: ['대한이비인후과학회 정회원', '대한수면연구학회 정회원', '대한평형의학회 정회원', '한국이명학회 정회원'] },
]

const HOURS = [
  { day: '월 · 화 · 수 · 금', time: '09:00 – 18:00', hl: false },
  { day: '목요일 (야간진료)',  time: '09:00 – 20:00', hl: true  },
  { day: '토요일',             time: '09:00 – 13:00', hl: false },
  { day: '일 · 공휴일',        time: '휴진',           hl: false },
]

const PHILOSOPHY = [
  { icon: '🔬', title: '정밀 진단', desc: '최첨단 검사 장비와 체계적인 프로토콜로 원인을 정확히 파악합니다.' },
  { icon: '🎯', title: '맞춤 치료', desc: '환자 개개인의 상태에 최적화된 치료 계획을 수립합니다.' },
  { icon: '♾️', title: '지속 관리', desc: '체계적인 추적 관찰로 재발을 방지하고 건강을 유지합니다.' },
]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ANIMATION HELPERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const easeOut = [0.25, 0.46, 0.45, 0.94] as const
const fadeUp    = (d = 0) => ({ hidden: { opacity: 0, y: 28 },  visible: { opacity: 1, y: 0,   transition: { duration: 0.6, delay: d, ease: easeOut } } })
const fadeLeft  = (d = 0) => ({ hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0,   transition: { duration: 0.6, delay: d, ease: 'easeOut' as const } } })
const fadeRight = (d = 0) => ({ hidden: { opacity: 0, x: 32 },  visible: { opacity: 1, x: 0,   transition: { duration: 0.6, delay: d, ease: 'easeOut' as const } } })

function useReveal() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-64px' })
  return { ref, inView }
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HEADER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <header className="ek-header" style={{
      background: scrolled ? 'rgba(11,31,69,0.97)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      boxShadow: scrolled ? '0 1px 0 rgba(255,255,255,0.06)' : 'none',
    }}>
      <div className="ek-header-inner ek-wrap">
        <a href="#">
          <div className="ek-logo-sub" style={{ color: '#60A5FA' }}>Seoul Korea ENT</div>
          <div className="ek-logo-main">서울고려이비인후과</div>
        </a>
        <nav className="ek-nav">
          {NAV.map(n => <a key={n.label} href={n.href}>{n.label}</a>)}
        </nav>
        <a href={`tel:${PHONE}`} className="ek-btn ek-btn-blue ek-btn-sm ek-header-cta">
          📞 전화 예약
        </a>
        <button className="ek-hamburger ek-mobile-toggle" onClick={() => setOpen(!open)} aria-label="메뉴">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/>}
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="ek-mobile-menu"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(11,31,69,0.98)' }}>
            <div className="ek-mobile-menu-inner">
              {NAV.map(n => <a key={n.label} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
              <a href={`tel:${PHONE}`} className="ek-btn ek-btn-blue" style={{ justifyContent: 'center' }}>📞 전화 예약</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HERO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HeroSection() {
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
  const item    = { hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } }
  return (
    <section className="ek-hero">
      <div className="ek-hero-bg-grid" />
      <div className="ek-hero-glow" />
      <div className="ek-hero-line" />

      <div className="ek-wrap ek-hero-inner">
        <motion.div className="ek-hero-center" variants={stagger} initial="hidden" animate="visible">

          {/* ★ 고대병원 마크 (alt 글씨 제거 및 정상 매칭) */}
          <motion.img 
            variants={item}
            src="/hospital-mark.png"
            alt=""
            className="ek-hero-university-mark"
          />

          {/* 자격 배지 */}
          <motion.div variants={item} className="ek-hero-badge">
            <div className="ek-hero-badge-line" />
            <span className="ek-hero-badge-text">
              고려대 의과대학 출신 &middot; 보건복지부 인증 이비인후과 전문의 &middot; 수면 전문의
            </span>
            <div className="ek-hero-badge-line" />
          </motion.div>

          {/* H1 */}
          <motion.h1 variants={item} className="ek-hero-h1">
            대전의 잠과 숨, 어지럼증,
            <br />
            <span className="ek-grad">소리를 책임지는</span>
          </motion.h1>

          <motion.p variants={item} className="ek-hero-sub">서울고려이비인후과</motion.p>

          <motion.div variants={item} className="ek-hero-divider" />

          <motion.p variants={item} className="ek-hero-desc">
            수면 전문의 · 어지럼증 전문가 · 이명 전문가 · 보청기전문가 자격증을 보유한<br />
            전문의가 정밀 검사부터 맞춤 치료까지 직접 담당합니다.
          </motion.p>

          {/* CTA 버튼 */}
          <motion.div variants={item} className="ek-cta-row">
            <a href={`tel:${PHONE}`} className="ek-btn ek-btn-blue">📞 전화 예약 · {PHONE}</a>
            <a href={KAKAO} target="_blank" rel="noopener noreferrer" className="ek-btn ek-btn-kakao">💬 카카오톡 상담</a>
            <a href="#sleep" className="ek-btn ek-btn-outline">진료 안내 보기 ↓</a>
          </motion.div>
        </motion.div>

        {/* 6개 전공 카드 */}
        <div className="ek-specialty-grid">
          {CARDS.map((c, i) => (
            <motion.a key={c.title} href={c.href} className="ek-specialty-card"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.07 }}>
              <div className="ek-specialty-icon">{c.icon}</div>
              <div className="ek-specialty-title">{c.title}</div>
              <div className="ek-specialty-sub">{c.sub}</div>
            </motion.a>
          ))}
        </div>

        {/* 자격 배지 하단 */}
        <motion.div className="ek-badges"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }}>
          {['보건복지부 인증 이비인후과 전문의','수면 전문의','어지럼증 전문가 자격증','이명 전문가 자격증','보청기전문가 자격증'].map(b => (
            <span key={b} className="ek-badge-item">
              <span style={{ color: '#60A5FA' }}>·</span> {b}
            </span>
          ))}
        </motion.div>
      </div>

      {/* 스크롤 인디케이터 */}
      <motion.div className="ek-scroll-indicator"
        animate={{ y: [0, 9, 0] }} transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}>
        <div className="ek-scroll-dot" />
      </motion.div>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   수면 클리닉
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SleepSection() {
  const { ref, inView } = useReveal()
  return (
    <section id="sleep" ref={ref} className="ek-section"
             style={{ background: 'linear-gradient(150deg, #0B1F45 0%, #0D2757 60%, #133580 100%)', position: 'relative' }}>
      <div className="ek-top-line" />
      <div className="ek-wrap">
        <div className="ek-sleep-layout">
          {/* 좌측 */}
          <motion.div variants={fadeLeft()} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="ek-label">Sleep Clinic</div>
            <h2 className="ek-section-h2" style={{ color: '#fff' }}>대전 코골이·수면무호흡</h2>
            <h3 className="ek-section-h3" style={{ color: '#60A5FA' }}>전문 수면 클리닉</h3>
            <div className="ek-divider" />
            <div className="ek-body-text" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 16 }}>
              대전 코골이는 심뇌혈관 질환, 당뇨, 인지기능 저하와 연관된 심각한 건강 문제입니다.
              <strong style={{ color: '#fff', fontWeight: 600 }}> 수면 전문의</strong>가 수면다원검사로 중증도를
              정밀 평가하고, 비수술·수술적 치료를 아우르는 맞춤 전략을 제시합니다.
            </div>
            <div style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, marginBottom: 36 }}>
              AHI(무호흡지수)와 산소 포화도 저하 양상에 따라 개인화된 치료 계획이 필요합니다.
              단순 코골이부터 중증 폐쇄성 수면무호흡(OSA)까지 전문의가 직접 관리합니다.
            </div>
            <div className="ek-stats-grid">
              {[{ v: '15+', l: '수면다원\n검사 항목' }, { v: '98%', l: '진단 정확도' }, { v: '수면', l: '전문의\n자격 보유' }].map(s => (
                <div key={s.v} className="ek-stat-card">
                  <div className="ek-stat-val">{s.v}</div>
                  <div className="ek-stat-lbl">{s.l}</div>
                </div>
              ))}
            </div>
            <a href={`tel:${PHONE}`} className="ek-btn ek-btn-blue">수면 클리닉 예약 →</a>
          </motion.div>

          {/* 우측 피처 카드 */}
          <motion.div variants={fadeRight(0.15)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="ek-feature-grid">
              {SLEEP_FEATURES.map((f, i) => (
                <motion.div key={f.title} className="ek-feature-card"
                  variants={fadeUp(0.1 + i * 0.06)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                  <div className="ek-feature-dot" />
                  <div>
                    <div className="ek-feature-title">{f.title}</div>
                    <div className="ek-feature-desc">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   어지럼증 클리닉
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function DizzinessSection() {
  const { ref, inView } = useReveal()
  return (
    <section id="dizziness" ref={ref} className="ek-section" style={{ background: '#fff' }}>
      <div className="ek-wrap">
        <motion.div variants={fadeUp()} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="ek-label">Dizziness Clinic</div>
          <h2 className="ek-section-h2" style={{ color: '#0B1F45' }}>대전 어지럼증 클리닉</h2>
          <h3 className="ek-section-h3" style={{ color: '#1E62C8' }}>체계적인 원인별 맞춤 치료</h3>
          <div className="ek-divider ek-divider-center" />
          <div className="ek-body-text" style={{ color: '#334155', maxWidth: 560, margin: '0 auto' }}>
            어지럼증의 약 50%는 이비인후과적 원인인{' '}
            <strong style={{ color: '#0B1F45', fontWeight: 700 }}>전정 기관 이상</strong>에서 비롯됩니다.
            <strong style={{ color: '#0B1F45', fontWeight: 700 }}> 이비인후과 어지럼증 전문가 자격증</strong>을 보유한 전문의가
            비디오 안진검사·전정기능검사를 통해 원인을 정밀하게 감별하고 맞춤 치료를 제공합니다.
          </div>
        </motion.div>

        <div className="ek-condition-grid">
          {CONDITIONS.map((c, i) => (
            <motion.div key={c.name} className="ek-condition-card"
              variants={fadeUp(0.08 + i * 0.07)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <div className="ek-condition-icon-wrap">{c.icon}</div>
                <div className="ek-condition-name">{c.name}</div>
              </div>
              <div className="ek-condition-desc">{c.desc}</div>
            </motion.div>
          ))}
        </div>

        <motion.div className="ek-step-box"
          variants={fadeUp(0.3)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <div className="ek-step-box-title">
            대전 어지럼증 <span style={{ color: '#60A5FA' }}>정밀 검사 과정</span>
          </div>
          <div className="ek-step-grid">
            {STEPS.map(s => (
              <div key={s.step} className="ek-step-item">
                <div className="ek-step-num">{s.step}</div>
                <div className="ek-step-title">{s.title}</div>
                <div className="ek-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   고압산소치료
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HBOTSection() {
  const { ref, inView } = useReveal()
  return (
    <section id="hbot" ref={ref} className="ek-section"
             style={{ background: 'linear-gradient(160deg, #050E1F 0%, #0B1F45 50%, #0D2757 100%)', position: 'relative' }}>
      <div className="ek-top-line" />
      {/* 동심원 링 */}
      {[700, 500, 300].map((sz, i) => (
        <div key={sz} className="ek-ring" style={{ width: sz, height: sz, border: `1px solid rgba(96,165,250,${0.04 + i * 0.02})` }} />
      ))}
      <div className="ek-wrap" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div variants={fadeUp()} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="ek-label">Hyperbaric Oxygen Therapy</div>
          <h2 className="ek-section-h2" style={{ color: '#fff' }}>대전 고압산소치료</h2>
          <h3 className="ek-section-h3" style={{ color: '#60A5FA' }}>서울고려이비인후과 최신 고압산소챔버</h3>
          <div className="ek-divider ek-divider-center" />
          <div className="ek-body-text" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 560, margin: '0 auto' }}>
            고압산소치료(HBOT)는 2~3기압 환경에서{' '}
            <strong style={{ color: '#fff', fontWeight: 600 }}>고농도 순수 산소</strong>를 흡입하여 조직의 산소 분압을 극대화하는 치료입니다.
            최신 1인용 고압산소챔버를 도입하여{' '}
            <strong style={{ color: '#fff', fontWeight: 600 }}>돌발성 난청과 이명 치료</strong>에 특화된 집중 프로그램을 운영합니다.
          </div>
        </motion.div>

        <div className="ek-hbot-layout">
          {/* 치료 원리 */}
          <motion.div className="ek-principle-card" variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="ek-principle-icon">💠</div>
            <div className="ek-principle-title">치료 원리</div>
            {HBOT_PRINCIPLES.map((t, i) => (
              <div key={i} className="ek-principle-item">
                <span className="ek-principle-num">{'①②③'[i]}</span>
                <p>{t}</p>
              </div>
            ))}
          </motion.div>

          {/* 적응증 + 골든타임 */}
          <motion.div variants={fadeUp(0.18)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <div className="ek-indication-title">적응증</div>
            <div className="ek-indication-grid">
              {HBOT_INDICATIONS.map((item, i) => (
                <div key={item} className="ek-indication-item"
                     style={{ background: i < 2 ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.05)', border: i < 2 ? '1px solid rgba(96,165,250,0.3)' : '1px solid rgba(255,255,255,0.08)' }}>
                  {i < 2 && <div className="ek-indication-badge">대표</div>}
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <motion.div className="ek-golden-box" variants={fadeUp(0.3)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              <div className="ek-golden-icon">⏱</div>
              <div>
                <div className="ek-golden-title">대전 돌발성 난청, 치료 골든타임을 지키세요</div>
                <div className="ek-golden-desc">
                  돌발성 난청은 증상 발생 후{' '}
                  <strong style={{ color: '#fff', fontWeight: 600 }}>2주 이내</strong> 치료를 시작하는 것이 예후에 결정적입니다.
                  고압산소치료와 스테로이드 치료를 병행하면 회복 가능성이 유의미하게 높아집니다.
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   청능 클리닉
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HearingSection() {
  const { ref, inView } = useReveal()
  return (
    <section id="hearing" ref={ref} className="ek-section" style={{ background: '#EFF6FF', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#0B1F45 30%,#1249A0 50%,#0B1F45 70%,transparent)' }} />
      <div className="ek-wrap">
        <motion.div variants={fadeUp()} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="ek-label">Hearing Clinic</div>
          <h2 className="ek-section-h2" style={{ color: '#0B1F45' }}>대전 난청·이명·보청기</h2>
          <h3 className="ek-section-h3" style={{ color: '#1E62C8' }}>청능 클리닉</h3>
          <div className="ek-divider ek-divider-center" />
          <div className="ek-body-text" style={{ color: '#334155', maxWidth: 560, margin: '0 auto' }}>
            귀는 단순한 청각 기관이 아닙니다. 삶의 질, 인지기능, 사회적 관계와 직결됩니다.
            <strong style={{ color: '#0B1F45', fontWeight: 700 }}> 이명 전문가·보청기전문가 자격증</strong> 보유 전문의가
            정밀 청력 검사부터 보청기 피팅, 청각 재활까지 원스톱으로 제공합니다.
          </div>
        </motion.div>

        <div className="ek-hearing-grid">
          {HEARING_SERVICES.map((s, i) => (
            <motion.div key={s.title} className="ek-hearing-card"
              variants={fadeUp(0.1 + i * 0.1)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
              <div className="ek-hearing-icon">{s.icon}</div>
              <div className="ek-hearing-title">{s.title}</div>
              <div className="ek-hearing-desc">{s.desc}</div>
              <ul className="ek-hearing-points">
                {s.points.map(p => (
                  <li key={p} className="ek-hearing-point">
                    <div className="ek-hearing-point-dot" />{p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div className="ek-subsidy-bar" variants={fadeUp(0.35)} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <div>
            <div className="ek-subsidy-title">대전 보청기 국가 보조금 처방전 발급</div>
            <div className="ek-subsidy-desc">
              청각장애 등록 여부에 따라 최대 131만 원의 보청기 구입 보조금을 받을 수 있습니다.<br />
              처방전 발급부터 보청기 선택, 피팅까지 한 곳에서 해결하세요.
            </div>
          </div>
          <a href={`tel:${PHONE}`} className="ek-btn ek-btn-blue" style={{ flexShrink: 0 }}>청능 클리닉 예약 →</a>
        </motion.div>
      </div>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   의료진
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function DoctorSection() {
  const { ref, inView } = useReveal()
  return (
    <section id="doctor" ref={ref} className="ek-section"
             style={{ background: 'linear-gradient(150deg, #0B1F45 0%, #0D2757 100%)', position: 'relative' }}>
      <div className="ek-top-line" />
      <div className="ek-wrap">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="ek-label">Our Specialist</div>
          <h2 className="ek-section-h2" style={{ color: '#fff' }}>의료진 소개</h2>
          <h3 className="ek-section-h3" style={{ color: '#60A5FA' }}>고려대학교 의과대학 출신 이비인후과 전문의</h3>
          <div className="ek-divider ek-divider-center" />
        </motion.div>

        <div className="ek-doctor-layout">
          {/* 좌측 프로필 */}
          <motion.div initial={{ opacity: 0, x: -28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="ek-photo-placeholder" style={{ padding: 0, overflow: 'hidden' }}>
              <img 
                src="/doctor.png" 
                alt="원장 사진" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <div className="ek-doctor-card">
              <div className="ek-doctor-role">원장</div>
              <div className="ek-doctor-name">박성빈 원장</div>
              <div className="ek-doctor-spec">이비인후과 전문의 · 수면 전문의</div>
              <div className="ek-doctor-divider" />
              <div className="ek-doctor-quote">
                "단순히 증상을 치료하는 것을 넘어, 환자의 수면의 질·삶의 질이 근본적으로 개선될 때까지 함께하는 의료를 추구합니다."
              </div>
            </div>
          </motion.div>

          {/* 우측 자격증 */}
          <div>
            <div className="ek-cred-list">
              {CREDENTIALS.map((cred, i) => (
                <motion.div key={cred.cat} className="ek-cred-card"
                  initial={{ opacity: 0, x: 28 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}>
                  <div className="ek-cred-header">
                    <div className="ek-cred-dot" />
                    <div className="ek-cred-cat">{cred.cat}</div>
                  </div>
                  <ul className="ek-cred-items">
                    {cred.items.map(it => (
                      <li key={it} className="ek-cred-item">
                        <span className="ek-cred-dash">–</span>{it}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <motion.div className="ek-philosophy-grid"
              initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }}>
              {PHILOSOPHY.map(p => (
                <div key={p.title} className="ek-philosophy-card">
                  <div className="ek-philosophy-icon">{p.icon}</div>
                  <div className="ek-philosophy-title">{p.title}</div>
                  <div className="ek-philosophy-desc">{p.desc}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FOOTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Footer() {
  const { ref, inView } = useReveal()
  const QUICK_LINKS = [
    { l: '수면 클리닉 (대전 코골이·수면무호흡)', h: '#sleep'     },
    { l: '어지럼증 클리닉',                      h: '#dizziness' },
    { l: '고압산소치료',                         h: '#hbot'      },
    { l: '청능 클리닉 (대전 난청·이명·보청기)',  h: '#hearing'   },
    { l: '의료진 소개',                          h: '#doctor'    },
  ]
  return (
    <footer id="footer" ref={ref} style={{ background: '#070F1E', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,#60A5FA 25%,#3B82F6 50%,#60A5FA 75%,transparent)' }} />
      <div className="ek-wrap">

        {/* CTA 배너 */}
        <motion.div className="ek-footer-cta"
          initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <div>
            <div className="ek-footer-cta-title">서울고려이비인후과와 함께</div>
            <div className="ek-footer-cta-sub">코골이, 어지럼증, 난청·이명으로 고민이 있으시다면 전문의와 상담하세요.</div>
          </div>
          <div className="ek-footer-cta-btns">
            <a href={`tel:${PHONE}`} className="ek-btn ek-btn-blue">📞 {PHONE}</a>
            <a href={KAKAO} target="_blank" rel="noopener noreferrer" className="ek-btn ek-btn-kakao">💬 카카오톡 상담</a>
          </div>
        </motion.div>

        {/* 3단 그리드 */}
        <motion.div className="ek-footer-grid"
          initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>

          {/* 병원 정보 */}
          <div>
            <div className="ek-footer-brand-sub">Seoul Korea ENT</div>
            <div className="ek-footer-brand-main">서울고려이비인후과</div>
            <div className="ek-footer-info">
              {[
                { icon: '📍', text: '대전광역시 중구 대종로 OOO\nOO빌딩 O층' },
                { icon: '📞', text: PHONE,           href: `tel:${PHONE}` },
                { icon: '✉️', text: 'djkoreaent@gmail.com' },
                { icon: '🌐', text: 'djkoreaent.kr', href: 'https://djkoreaent.kr' },
              ].map(({ icon, text, href }) => (
                <div key={text} className="ek-footer-info-row">
                  <span className="ek-footer-info-icon">{icon}</span>
                  {href
                    ? <a href={href} className="ek-footer-info-text">{text}</a>
                    : <span className="ek-footer-info-text" style={{ whiteSpace: 'pre-line' }}>{text}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* 진료 시간 */}
          <div>
            <div className="ek-hours-title">진료 시간</div>
            <div className="ek-hours-list">
              {HOURS.map(h => (
                <div key={h.day} className="ek-hours-row" style={{
                  background:  h.hl ? 'rgba(59,130,246,0.15)' : 'transparent',
                  border:      `1px solid ${h.hl ? 'rgba(96,165,250,0.25)' : 'rgba(255,255,255,0.06)'}`,
                  color:       h.hl ? '#60A5FA' : 'rgba(255,255,255,0.55)',
                  fontWeight:  h.hl ? 600 : 300,
                }}>
                  <span>{h.day}</span><span>{h.time}</span>
                </div>
              ))}
            </div>
            <div className="ek-hours-note">
              ※ 점심시간 12:30 – 14:00 (토요일 제외)<br />
              ※ 진료 시간은 변동될 수 있으니 방문 전 전화 확인 부탁드립니다.
            </div>
          </div>

          {/* 퀵 링크 */}
          <div>
            <div className="ek-links-title">진료 과목</div>
            <div className="ek-links-list">
              {QUICK_LINKS.map(ql => (
                <a key={ql.l} href={ql.h} className="ek-links-item">
                  <div className="ek-links-dot" />{ql.l}
                </a>
              ))}
            </div>
            <a href="https://maps.google.com/?q=서울고려이비인후과"
               target="_blank" rel="noopener noreferrer" className="ek-map-btn">
              🗺️ Google 지도로 보기
            </a>
          </div>
        </motion.div>

        {/* 최하단 */}
        <div className="ek-footer-bottom">
          <span>© {new Date().getFullYear()} 서울고려이비인후과. All rights reserved.</span>
          <span style={{ display: 'none' }} id="ek-seo-footer">대전 코골이 · 수면무호흡 · 어지럼증 · 고압산소치료 · 난청 · 이명 · 보청기</span>
          <div className="ek-footer-legal">
            <a href="/privacy">개인정보처리방침</a>
            <a href="/terms">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FLOATING BUTTONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function FloatingButtons() {
  const [visible,      setVisible]     = useState(false)
  const [showLabels, setShowLabels] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true),    2000); return () => clearTimeout(t) }, [])
  useEffect(() => { if (!visible) return; const t = setTimeout(() => setShowLabels(true), 700);  return () => clearTimeout(t) }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <div className="ek-floating">
          {/* 카카오 */}
          <motion.div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            initial={{ opacity: 0, scale: 0, x: 60 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}>
            {showLabels && (
              <motion.div className="ek-float-tooltip" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                style={{ background: '#1A1A1A', color: '#FEE500' }}>
                카카오톡 상담
              </motion.div>
            )}
            <a href={KAKAO} target="_blank" rel="noopener noreferrer" aria-label="카카오톡"
               className="ek-float-btn" style={{ background: '#FEE500', fontSize: 22 }}>
              💬
            </a>
          </motion.div>

          {/* 전화 */}
          <motion.div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            initial={{ opacity: 0, scale: 0, x: 60 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}>
            {showLabels && (
              <motion.div className="ek-float-tooltip" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }}
                style={{ background: '#0B1F45', color: '#fff' }}>
                {PHONE}
              </motion.div>
            )}
            <a href={`tel:${PHONE}`} aria-label="전화 예약" className="ek-float-btn ek-pulse"
               style={{ background: '#3B82F6' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd"/>
              </svg>
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE EXPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <Header />
      <main style={{ position: 'relative', overflowX: 'hidden' }}>
        <HeroSection />
        <SleepSection />
        <DizzinessSection />
        <HBOTSection />
        <HearingSection />
        <DoctorSection />
        <Footer />
      </main>
      <FloatingButtons />
    </>
  )
}