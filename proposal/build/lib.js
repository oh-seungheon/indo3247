// ============================================================
//  부안 닭축제 제안서 v4 — 디자인 시스템
//  템플릿 톤앤매너 기반 / 캔버스 20" x 11.25"
// ============================================================
const fs = require('fs');
const path = require('path');

// ── 컬러 (템플릿 팔레트) ──────────────────────────────────
const C = {
  navy:     '110B79',   // 딥 네이비 — 표지·섹션
  blue:     '0038BF',   // 메인 블루
  blueMid:  '5587CB',   // 중간 블루
  cyan:     '5CE1E6',   // 시안 액센트
  light:    'D7ECFF',   // 연블루 배경
  tint:     'EAF0F6',   // 최연한 블루
  card:     'F5F8FC',   // 카드 배경
  edge:     'DDE5F3',   // 경계선
  text:     '222222',   // 본문
  sub:      '545454',   // 보조 텍스트
  white:    'FFFFFF',
  warn:     'C0392B',
};

// ── 폰트 ────────────────────────────────────────────────
// Noto Sans KR 미설치 시 아래를 '맑은 고딕' 으로 변경
const F = 'Noto Sans KR';

// ── 그리드 (20 x 11.25) ─────────────────────────────────
const G = {
  W: 20, H: 11.25,
  ml: 1.0,          // 좌여백
  cw: 18.0,         // 콘텐츠 폭
  chapY: 0.80,      // chapter 라벨
  krY: 0.66,        // 한글 챕터명
  lineY: 1.72,      // 구분선
  enY: 2.06,        // 영문 대제목
  leadY: 2.94,      // 리드 문장
  bodyY: 3.86,      // 본문 시작
  bodyB: 10.20,     // 본문 하단
  footY: 10.48,     // 출처
};

// ── 타이포 스케일 ────────────────────────────────────────
const T = {
  coverTitle: 84,
  coverSub:   34,
  sectionNo:  120,
  sectionKr:  46,
  en:         42,   // 영문 대제목
  kr:         30,   // 한글 챕터명
  chap:       16,
  doc:        16,
  lead:       20,   // 리드 문장
  cardTitle:  24,
  body:       18,   // 본문 ★
  small:      15,
  caption:    13,
  huge:       96,   // 대형 수치
  big:        60,
  mid:        40,
};

const DOC = '부안 닭축제 종합제안서';
const IMG_DIR = path.join(__dirname, 'images');
const IMAGES = {};
const reg = (k, desc, size) => { IMAGES[k] = { desc, size }; return k; };

// ── 텍스트 ──────────────────────────────────────────────
function txt(s, t, o) {
  s.addText(t, {
    x: o.x, y: o.y, w: o.w, h: o.h,
    fontSize: o.size || T.body, bold: !!o.bold, italic: !!o.italic,
    color: o.color || C.text, fontFace: o.face || F,
    align: o.align || 'left', valign: o.valign || 'top',
    margin: o.margin === undefined ? 0 : o.margin,
    lineSpacingMultiple: o.ls || 1.30,
    charSpacing: o.cs,
  });
}

// ── 카드 ────────────────────────────────────────────────
function card(s, o) {
  s.addShape('roundRect', {
    x: o.x, y: o.y, w: o.w, h: o.h,
    fill: { color: o.fill || C.card },
    rectRadius: o.r === undefined ? 0.12 : o.r,
    line: o.line ? { color: o.line, width: o.lw || 1.5 } : { type: 'none' },
    shadow: o.shadow ? { type: 'outer', color: '0038BF', blur: 14, offset: 2, angle: 90, opacity: 0.10 } : undefined,
  });
}

// ── 공통 헤더 (템플릿 문법) ──────────────────────────────
function header(s, o) {
  // chapter 라벨 (좌상)
  if (o.chap) {
    txt(s, o.chap, { x: G.ml, y: G.chapY, w: 4, h: 0.4, size: T.chap, bold: true, color: C.blue, valign: 'middle', cs: 1 });
  }
  // 한글 챕터명 (중앙)
  txt(s, o.kr, { x: 5, y: G.krY, w: 10, h: 0.62, size: T.kr, bold: true, color: C.text, align: 'center', valign: 'middle' });
  // 문서명 (우상)
  txt(s, DOC, { x: 14, y: G.chapY, w: 5, h: 0.4, size: T.doc, color: C.blueMid, align: 'right', valign: 'middle' });
  // 구분선
  s.addShape('line', { x: G.ml, y: G.lineY, w: G.cw, h: 0, line: { color: C.edge, width: 1.25 } });

  // 영문 대제목 (첫 글자 시안)
  if (o.en) {
    const first = o.en.charAt(0), rest = o.en.slice(1);
    s.addText([
      { text: first, options: { color: C.cyan } },
      { text: rest,  options: { color: C.blue } },
    ], {
      x: G.ml, y: G.enY, w: G.cw, h: 0.78,
      fontSize: T.en, bold: true, fontFace: F,
      align: 'center', valign: 'middle', margin: 0,
    });
  }
  // 리드 문장
  if (o.lead) {
    txt(s, o.lead, {
      x: 2.6, y: G.leadY, w: 14.8, h: 0.72,
      size: T.lead, color: C.sub, align: 'center', valign: 'middle', ls: 1.35,
    });
  }
}

// ── 출처 ────────────────────────────────────────────────
function src(s, t) {
  txt(s, '출처 · ' + t, {
    x: G.ml, y: G.footY, w: G.cw, h: 0.38,
    size: T.caption, color: C.sub, align: 'right', valign: 'middle',
  });
}

// ── 핵심 메시지 배너 (하단) ──────────────────────────────
function banner(s, t, o) {
  const y = (o && o.y) || 9.34;
  s.addShape('roundRect', {
    x: G.ml, y, w: G.cw, h: 0.82,
    fill: { color: C.navy }, rectRadius: 0.12, line: { type: 'none' },
  });
  txt(s, t, {
    x: G.ml + 0.5, y, w: G.cw - 1.0, h: 0.82,
    size: 21, bold: true, color: C.white, align: 'center', valign: 'middle',
  });
}

// ── 이미지 / 플레이스홀더 ────────────────────────────────
function img(s, key, o) {
  const file = path.join(IMG_DIR, key);
  const box = { x: o.x, y: o.y, w: o.w, h: o.h };
  if (fs.existsSync(file)) {
    s.addImage(Object.assign({ path: file, sizing: { type: 'cover', w: o.w, h: o.h } }, box));
    return;
  }
  const spec = IMAGES[key] || {};
  s.addShape('roundRect', Object.assign({}, box, {
    fill: { color: C.tint }, rectRadius: 0.10,
    line: { color: C.blueMid, width: 1.25, dashType: 'dash' },
  }));
  s.addText([
    { text: 'PHOTO', options: { fontSize: 13, bold: true, color: C.blueMid, breakLine: true, charSpacing: 2 } },
    { text: key, options: { fontSize: 12, bold: true, color: C.text, breakLine: true } },
    { text: spec.desc || '', options: { fontSize: 11, color: C.sub, breakLine: true } },
    { text: spec.size || '', options: { fontSize: 10, color: C.sub } },
  ], Object.assign({}, box, { align: 'center', valign: 'middle', margin: 10, fontFace: F, lineSpacingMultiple: 1.25 }));
}

// ── 대형 수치 ───────────────────────────────────────────
function stat(s, o) {
  txt(s, o.v, {
    x: o.x, y: o.y, w: o.w, h: o.h || 1.2,
    size: o.size || T.big, bold: true, color: o.color || C.blue,
    align: o.align || 'center', valign: 'middle', ls: 1.0,
  });
  if (o.l) {
    txt(s, o.l, {
      x: o.x, y: o.y + (o.h || 1.2) - 0.06, w: o.w, h: 0.5,
      size: T.small, color: C.sub, align: o.align || 'center', valign: 'top',
    });
  }
}

// ── 섹션 표지 ───────────────────────────────────────────
function section(pres, no, kr, en) {
  const s = pres.addSlide();
  s.background = { color: C.navy };
  s.addShape('roundRect', { x: 12.4, y: -2.2, w: 11, h: 11, fill: { color: C.blue }, rectRadius: 2.0, line: { type: 'none' } });
  s.addShape('roundRect', { x: 15.0, y: 5.6, w: 8, h: 8, fill: { color: '1A1490' }, rectRadius: 1.6, line: { type: 'none' } });
  txt(s, no, { x: G.ml, y: 3.5, w: 6, h: 2.2, size: T.sectionNo, bold: true, color: C.cyan, valign: 'middle', ls: 1.0 });
  txt(s, kr, { x: G.ml, y: 5.9, w: 11, h: 1.1, size: T.sectionKr, bold: true, color: C.white, valign: 'middle' });
  txt(s, en, { x: G.ml, y: 7.1, w: 11, h: 0.6, size: 18, color: C.light, valign: 'middle', cs: 3 });
  s.addShape('line', { x: G.ml, y: 5.72, w: 3.2, h: 0, line: { color: C.cyan, width: 3 } });
  return s;
}

module.exports = { C, F, G, T, DOC, IMAGES, reg, txt, card, header, src, banner, img, stat, section };
