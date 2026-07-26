// ============================================================
//  부안 닭축제 제안서 — 그린(농생명수도 전북 정책발표) 디자인 시스템
//  캔버스 20" x 11.25"
// ============================================================
const fs = require('fs');
const path = require('path');

// ── 컬러 (그린 정부 팔레트) ──────────────────────────────
const C = {
  dark:   '33502E',   // 딥 포레스트 그린 — 헤더 알약·라벨칩·배너·강조
  darkA:  '2A4326',   // 더 짙은 그린
  mid:    '5A9E43',   // 중간 그린 — 수치·강조·마커
  mid2:   '4A6B40',   // 톤다운 그린 (보조 헤더)
  lime:   '8CC63F',   // 라임 — 하이라이트·상단바
  soft:   'EEF4E7',   // 옅은 그린 — 박스/노트 배경
  soft2:  'F5F9F0',   // 최연한 그린 — 존브라운
  line:   'CBDDBE',   // 카드 경계
  edge:   'DDE6D5',   // 옅은 경계
  orange: 'EC7A1C',   // 배너 강조 키워드
  gold:   'E8A400',   // 보조 강조
  text:   '1E1E1E',
  sub:    '5C5C5C',
  white:  'FFFFFF',
  warn:   'C0392B',
};

const F = 'Noto Sans KR';
const RUN = '전북 치킨벨트의 완성, 부안 닭축제';
const CI  = '부안군 · 전북특별자치도';

// ── 그리드 ──────────────────────────────────────────────
const G = {
  W: 20, H: 11.25,
  ml: 0.70, cw: 18.60,
  bodyY: 2.10, bodyB: 9.10,
  bannerY: 9.42, bannerH: 0.95,
  srcY: 10.52,
};

const T = {
  title: 34, big: 46, huge: 90, mid: 40, cardTitle: 24,
  body: 17, small: 15, caption: 13,
};

const DOC = CI;
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
    lineSpacingMultiple: o.ls || 1.28, charSpacing: o.cs,
  });
}

// ── 흰 박스 ─────────────────────────────────────────────
function wbox(s, o) {
  s.addShape('roundRect', {
    x: o.x, y: o.y, w: o.w, h: o.h,
    fill: { color: o.fill || C.white }, rectRadius: o.r === undefined ? 0.10 : o.r,
    line: o.line === null ? { type: 'none' } : { color: o.line || C.line, width: o.lw || (o.hero ? 2 : 1.25) },
    shadow: o.shadow === false ? undefined : { type: 'outer', color: '33502E', blur: 9, offset: 3, angle: 90, opacity: 0.10 },
  });
}
// 단순 채움 박스 (그림자 없음)
function box(s, o) {
  s.addShape('roundRect', {
    x: o.x, y: o.y, w: o.w, h: o.h, fill: { color: o.fill }, rectRadius: o.r === undefined ? 0.08 : o.r,
    line: o.line ? { color: o.line, width: o.lw || 1.25 } : { type: 'none' },
  });
}

// ── 딥그린 헤더 알약 ─────────────────────────────────────
function pill(s, o) {
  const h = o.h || 0.92;
  s.addShape('roundRect', { x: o.x, y: o.y, w: o.w, h, fill: { color: o.fill || C.dark }, rectRadius: 0.12, line: { type: 'none' } });
  txt(s, o.t, { x: o.x + 0.44, y: o.y, w: o.w - 0.88, h, size: o.size || 24, bold: true, color: C.white, valign: 'middle', align: o.align || 'left' });
  if (o.badge) {
    const bw = o.badgeW || 2.6;
    s.addShape('roundRect', { x: o.x + o.w - bw - 0.24, y: o.y + (h - 0.46) / 2, w: bw, h: 0.46, fill: { color: o.badgeFill || C.lime }, rectRadius: 0.08, line: { type: 'none' } });
    txt(s, o.badge, { x: o.x + o.w - bw - 0.24, y: o.y + (h - 0.46) / 2, w: bw, h: 0.46, size: 14, bold: true, color: o.badgeTc || C.dark, align: 'center', valign: 'middle' });
  }
}

// ── 라벨 칩 ─────────────────────────────────────────────
function chip(s, o) {
  s.addShape('roundRect', { x: o.x, y: o.y, w: o.w, h: o.h, fill: { color: o.fill || C.dark }, rectRadius: o.r === undefined ? 0.07 : o.r, line: o.line ? { color: o.line, width: 1.25 } : { type: 'none' } });
  txt(s, o.t, { x: o.x, y: o.y, w: o.w, h: o.h, size: o.size || 14, bold: true, color: o.tc || C.white, align: 'center', valign: 'middle', ls: 1.15 });
}

// ── 그린 사각 불릿 ──────────────────────────────────────
function bullet(s, x, y, t, o) {
  o = o || {};
  s.addShape('rect', { x, y: y + 0.13, w: 0.15, h: 0.15, fill: { color: o.mk || C.mid }, line: { type: 'none' } });
  txt(s, t, { x: x + 0.36, y, w: o.w || 6, h: o.h || 0.5, size: o.size || T.body, color: o.color || C.text, valign: o.valign || 'middle', bold: o.bold, ls: o.ls || 1.25 });
}

// ── 점선 화살표(⇢) 연결 ─────────────────────────────────
function darrow(s, x, y, w) {
  const n = Math.max(3, Math.round(w / 0.18));
  for (let i = 0; i < n; i++) {
    const r = 0.05 - i * (0.02 / n);
    s.addShape('ellipse', { x: x + i * (w / n), y: y - r / 2, w: 0.07, h: 0.07, fill: { color: C.mid }, line: { type: 'none' } });
  }
  s.addShape('rightArrow', { x: x + w, y: y - 0.11, w: 0.26, h: 0.22, fill: { color: C.mid }, line: { type: 'none' } });
}

// ── 공통 헤더 (그린 정부 스타일) ─────────────────────────
function header(s, o) {
  s.background = { color: C.white };
  s.addShape('rect', { x: 0, y: 0, w: G.W, h: 0.12, fill: { color: C.dark }, line: { type: 'none' } });
  s.addShape('rect', { x: 0, y: 0, w: 7.5, h: 0.12, fill: { color: C.lime }, line: { type: 'none' } });
  txt(s, RUN, { x: G.ml, y: 0.30, w: 12, h: 0.32, size: 13, color: C.sub, valign: 'middle' });
  s.addShape('rect', { x: G.ml, y: 0.80, w: 0.46, h: 0.46, fill: { color: C.dark }, line: { type: 'none' } });
  txt(s, (o.n ? o.n + '  ' : '') + o.title, { x: G.ml + 0.66, y: 0.70, w: 13, h: 0.66, size: T.title, bold: true, color: C.text, valign: 'middle' });
  txt(s, CI, { x: 13.1, y: 0.82, w: 6.2, h: 0.44, size: 15, bold: true, color: C.dark, align: 'right', valign: 'middle' });
  s.addShape('line', { x: G.ml, y: 1.52, w: G.cw, h: 0, line: { color: 'D5D5D5', width: 1.25 } });
  s.addShape('rect', { x: G.ml, y: 1.47, w: 3.2, h: 0.07, fill: { color: C.mid }, line: { type: 'none' } });
  if (o.lead) txt(s, o.lead, { x: G.ml, y: 1.62, w: G.cw, h: 0.40, size: 15, color: C.sub, valign: 'middle' });
}

// ── 출처 ────────────────────────────────────────────────
function src(s, t) {
  txt(s, '출처 · ' + t, { x: G.ml, y: G.srcY, w: G.cw, h: 0.34, size: T.caption, color: C.sub, align: 'right', valign: 'middle' });
}

// ── 하단 배너 (그린 + 주황 강조) ─────────────────────────
function banner(s, arg, o) {
  o = o || {};
  s.addShape('roundRect', { x: G.ml, y: G.bannerY, w: G.cw, h: G.bannerH, fill: { color: C.dark }, rectRadius: 0.10, line: { type: 'none' } });
  s.addShape('rect', { x: G.ml, y: G.bannerY + 0.18, w: 0.14, h: G.bannerH - 0.36, fill: { color: C.lime }, line: { type: 'none' } });
  const runs = Array.isArray(arg) ? arg : [{ text: arg, options: { color: C.white } }];
  s.addText(runs, { x: G.ml + 0.6, y: G.bannerY, w: G.cw - 1.2, h: G.bannerH, fontSize: o.size || 22, bold: true, fontFace: F, align: 'center', valign: 'middle', margin: 0 });
}
// 주황 강조 헬퍼: hl('앞', '부안', '뒤')
function hl(a, key, b) {
  return [{ text: a, options: { color: C.white } }, { text: key, options: { color: C.orange } }, { text: b, options: { color: C.white } }];
}

// ── 이미지 / 플레이스홀더 (사각) ─────────────────────────
function img(s, key, o) {
  const file = path.join(IMG_DIR, key);
  const b = { x: o.x, y: o.y, w: o.w, h: o.h };
  if (fs.existsSync(file)) { s.addImage(Object.assign({ path: file, sizing: { type: 'cover', w: o.w, h: o.h } }, b)); return; }
  const spec = IMAGES[key] || {};
  s.addShape('roundRect', Object.assign({}, b, { fill: { color: C.soft }, rectRadius: 0.08, line: { color: C.mid, width: 1.25, dashType: 'dash' } }));
  s.addText([
    { text: 'PHOTO', options: { fontSize: 12, bold: true, color: C.mid, breakLine: true, charSpacing: 2 } },
    { text: key, options: { fontSize: 11, bold: true, color: C.text, breakLine: true } },
    { text: spec.desc || '', options: { fontSize: 10, color: C.sub, breakLine: true } },
  ], Object.assign({}, b, { align: 'center', valign: 'middle', margin: 8, fontFace: F, lineSpacingMultiple: 1.22 }));
}

// ── 육각 사진 ───────────────────────────────────────────
function hex(s, key, o) {
  const file = path.join(IMG_DIR, key);
  s.addShape('hexagon', { x: o.x, y: o.y, w: o.w, h: o.h, fill: fs.existsSync(file) ? { color: C.soft } : { color: C.soft }, line: { color: C.mid, width: 1.5 } });
  if (fs.existsSync(file)) s.addImage({ path: file, x: o.x + o.w * 0.15, y: o.y + o.h * 0.08, w: o.w * 0.70, h: o.h * 0.84, sizing: { type: 'cover', w: o.w * 0.70, h: o.h * 0.84 } });
  else txt(s, o.label || 'PHOTO', { x: o.x, y: o.y + o.h / 2 - 0.2, w: o.w, h: 0.4, size: 12, bold: true, color: C.mid, align: 'center', valign: 'middle', cs: 1 });
}

// ── 원형 링 (핵심 국정과제형) ───────────────────────────
function ring(s, o) {
  // 외곽 링(컬러) + 내부 흰 원 = 링 효과
  s.addShape('ellipse', { x: o.x, y: o.y, w: o.d, h: o.d, fill: { color: o.color || C.mid }, line: { type: 'none' } });
  const t = o.t === undefined ? 0.22 : o.t;
  s.addShape('ellipse', { x: o.x + t, y: o.y + t, w: o.d - 2 * t, h: o.d - 2 * t, fill: { color: C.white }, line: { type: 'none' } });
  txt(s, o.text, { x: o.x + t, y: o.y + t, w: o.d - 2 * t, h: o.d - 2 * t, size: o.size || 18, bold: true, color: o.tc || C.text, align: 'center', valign: 'middle', ls: 1.2 });
  if (o.tab) {
    s.addShape('roundRect', { x: o.x + o.d / 2 - o.tabW / 2, y: o.y + o.d - 0.18, w: o.tabW, h: 0.5, fill: { color: o.color || C.mid }, rectRadius: 0.08, line: { type: 'none' } });
    txt(s, o.tab, { x: o.x + o.d / 2 - o.tabW / 2, y: o.y + o.d - 0.18, w: o.tabW, h: 0.5, size: 14, bold: true, color: C.white, align: 'center', valign: 'middle' });
  }
}

// ── 대형 수치 ───────────────────────────────────────────
function stat(s, o) {
  txt(s, o.v, { x: o.x, y: o.y, w: o.w, h: o.h || 1.0, size: o.size || T.big, bold: true, color: o.color || C.mid, align: o.align || 'left', valign: 'middle', ls: 1.0 });
  if (o.l) txt(s, o.l, { x: o.x, y: o.y + (o.h || 1.0) - 0.02, w: o.w, h: 0.44, size: T.small, color: C.sub, align: o.align || 'left', valign: 'top' });
}

// ── 섹션 간지 (그린) ────────────────────────────────────
function section(pres, no, kr, en, items) {
  const s = pres.addSlide();
  s.background = { color: C.soft2 };
  s.addShape('rect', { x: 0, y: 0, w: G.W, h: 0.16, fill: { color: C.dark }, line: { type: 'none' } });
  s.addShape('rect', { x: 0, y: 0, w: 7.5, h: 0.16, fill: { color: C.lime }, line: { type: 'none' } });
  s.addShape('roundRect', { x: 15.2, y: -1.8, w: 7, h: 8.5, fill: { color: 'E4EFDA' }, rectRadius: 0.7, line: { type: 'none' } });
  s.addShape('roundRect', { x: 16.9, y: 6.6, w: 5, h: 6, fill: { color: 'E4EFDA' }, rectRadius: 0.7, line: { type: 'none' } });
  s.addShape('roundRect', { x: 1.0, y: 3.3, w: 3.1, h: 3.1, fill: { color: C.dark }, rectRadius: 0.16, line: { type: 'none' } });
  s.addShape('rect', { x: 1.0, y: 3.3, w: 0.72, h: 0.72, fill: { color: C.lime }, line: { type: 'none' } });
  txt(s, no, { x: 1.0, y: 3.5, w: 3.1, h: 2.7, size: 118, bold: true, color: C.white, align: 'center', valign: 'middle', ls: 1.0 });
  s.addShape('line', { x: 4.55, y: 3.72, w: 3.2, h: 0, line: { color: C.mid, width: 3 } });
  txt(s, kr, { x: 4.5, y: 3.9, w: 12, h: 1.0, size: 46, bold: true, color: C.text, valign: 'middle' });
  txt(s, en, { x: 4.5, y: 5.0, w: 12, h: 0.5, size: 18, color: C.mid, valign: 'middle', cs: 3 });
  if (items) txt(s, items, { x: 4.5, y: 5.7, w: 13, h: 0.5, size: 15, color: C.sub, valign: 'middle' });
  return s;
}

module.exports = { C, F, G, T, DOC, RUN, CI, IMAGES, reg, txt, wbox, box, pill, chip, bullet, darrow, header, src, banner, hl, img, hex, ring, stat, section };
