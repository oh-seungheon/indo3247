const L = require('./lib');
const { C, F, G, T } = L;
const { txt, card, header, src, banner, img, stat, section, reg } = L;

reg('cover.jpg',      '부안 변산반도 해안 또는 새만금 항공 전경', '2800×1600px 이상 · 가로형');
reg('charmfre.jpg',   '참프레 견학관 내부 (발골쇼 · 참프레파크 · 시식)', '1600×1200px · 참프레 공식 요청');
reg('buan_farm.jpg',  '참프레 공장 외관 또는 동물복지 인증 농장', '1600×1200px');
reg('gulbi.jpg',      '영광 법성포 굴비 (건조 장면 권장)', '1200×900px');
reg('insam.jpg',      '금산 인삼 / 인삼시장', '1200×900px');
reg('jangryu.jpg',    '순창 고추장민속마을 / 장독대', '1200×900px');
reg('buan_chicken.jpg','부안 닭 / 닭요리 대표 이미지', '1200×900px');

module.exports = function (pres) {

  // ══════════════════════════════════════════════════
  // 표지
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    img(s, 'cover.jpg', { x: 10.4, y: 0, w: 9.6, h: 11.25 });
    s.addShape('rect', { x: 0, y: 0, w: 11.2, h: 11.25, fill: { color: C.navy }, line: { type: 'none' } });
    s.addShape('roundRect', { x: 9.0, y: -3, w: 6, h: 18, fill: { color: C.navy }, rectRadius: 1.2, line: { type: 'none' } });

    s.addShape('line', { x: G.ml, y: 2.55, w: 2.6, h: 0, line: { color: C.cyan, width: 3.5 } });
    txt(s, 'K-CHICKEN BELT', { x: G.ml, y: 2.80, w: 9, h: 0.5, size: 18, bold: true, color: C.cyan, valign: 'middle', cs: 4 });

    txt(s, '부안 닭축제', { x: G.ml, y: 3.60, w: 9.5, h: 1.5, size: T.coverTitle, bold: true, color: C.white, valign: 'middle', ls: 1.0 });
    txt(s, '종합 제안서', { x: G.ml, y: 5.05, w: 9.5, h: 1.0, size: 52, bold: true, color: C.light, valign: 'middle', ls: 1.0 });

    txt(s, '전북 치킨벨트를 완성하는 마지막 한 조각', {
      x: G.ml, y: 6.35, w: 9.0, h: 0.6, size: T.coverSub, color: C.white, valign: 'middle' });

    s.addShape('line', { x: G.ml, y: 8.50, w: 8.4, h: 0, line: { color: '3A3AA8', width: 1.25 } });
    [['제출', '부안군 · 전북특별자치도'], ['작성', '2026. 07'], ['목표', '제1회 2028년 10월 개최']]
      .forEach((r, i) => {
        const y = 8.75 + i * 0.52;
        txt(s, r[0], { x: G.ml, y, w: 1.2, h: 0.44, size: 15, color: C.cyan, valign: 'middle' });
        txt(s, r[1], { x: G.ml + 1.3, y, w: 7, h: 0.44, size: 17, color: C.white, valign: 'middle' });
      });
  }

  // ══════════════════════════════════════════════════
  // 목차
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    header(s, { chap: 'CONTENTS', kr: '목  차', en: 'Index',
      lead: '왜 지금 부안인가에서 시작해, 재원과 일정으로 끝맺습니다.' });

    const items = [
      ['01', '왜 지금, 왜 부안인가', '정책 연계 · 전북 치킨벨트 · 시장의 빈칸 · 부안의 자산 · 생활인구 · 지역브랜드'],
      ['02', '닭, 그 이름의 역사', '계림 설화 · 상징의 회복 · K-Chicken'],
      ['03', '사업 계획', '사계절 전략 · 사업 개요 · 공간 구성 · 시그니처 프로그램 · 동물복지'],
      ['04', '검증과 리스크', '경쟁 분석 · 단계 목표 · 방역 리스크 대응'],
      ['05', '재원과 추진', '재원 조달 · 예산 계획 · 추진 체계 · 추진 일정 · 기대효과'],
    ];
    let y = G.bodyY + 0.10;
    items.forEach((it, i) => {
      card(s, { x: G.ml, y, w: G.cw, h: 1.06, fill: i === 0 ? C.light : C.card });
      s.addShape('roundRect', { x: G.ml + 0.34, y: y + 0.20, w: 1.0, h: 0.66, fill: { color: i === 0 ? C.blue : C.blueMid }, rectRadius: 0.10, line: { type: 'none' } });
      txt(s, it[0], { x: G.ml + 0.34, y: y + 0.20, w: 1.0, h: 0.66, size: 22, bold: true, color: C.white, align: 'center', valign: 'middle' });
      txt(s, it[1], { x: G.ml + 1.66, y: y + 0.14, w: 6.4, h: 0.44, size: 22, bold: true, color: C.text, valign: 'middle' });
      txt(s, it[2], { x: G.ml + 1.66, y: y + 0.58, w: 15.4, h: 0.40, size: 15, color: C.sub, valign: 'middle' });
      y += 1.20;
    });
  }

  // ══════════════════════════════════════════════════
  section(pres, '01', '왜 지금, 왜 부안인가', 'WHY BUAN, WHY NOW');

  // ══════════════════════════════════════════════════
  // S1 — 제안 요약
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 01', kr: '제안 요약', en: 'Executive Summary',
      lead: '익산에 「치킨로드」가 있습니다. 부안에는 「치킨 페스티벌」이 필요합니다.' });

    const cols = [
      { tag: 'PROBLEM', kr: '문제', big: '견학뿐', fill: C.card, bar: C.sub, bigC: C.sub,
        li: ['전북의 닭 산업 관광은 평일 · 개인 중심의\n상설 견학에 머물러 있습니다',
             '주말 · 가족 단위 유입 장치가 없습니다',
             '부안 = 닭이라는 연상이 형성되지 않았습니다'] },
      { tag: 'SOLUTION', kr: '해법', big: '축제', fill: C.light, bar: C.blue, bigC: C.blue,
        li: ['익산은 산업관광,\n부안은 미식축제로 역할 분담',
             '참프레 견학관과\n변산 관광을 결합합니다',
             '마실축제(봄)와 계절을 분담합니다'] },
      { tag: 'REQUEST', kr: '요청', big: '2028', fill: C.tint, bar: C.cyan, bigC: C.blue,
        li: ['제1회 개최까지 준비기간 24개월',
             '2028년도 지방소멸대응기금 투자계획 반영',
             '도 차원 예산 매칭과 K-치킨벨트 거점 등재'] },
    ];
    const w = 5.7, gap = 0.45;
    cols.forEach((c, i) => {
      const x = G.ml + i * (w + gap);
      card(s, { x, y: G.bodyY, w, h: 5.10, fill: c.fill, shadow: i === 1 });
      s.addShape('roundRect', { x: x + 0.42, y: G.bodyY + 0.40, w: 1.9, h: 0.46, fill: { color: c.bar }, rectRadius: 0.08, line: { type: 'none' } });
      txt(s, c.tag, { x: x + 0.42, y: G.bodyY + 0.40, w: 1.9, h: 0.46, size: 13, bold: true, color: C.white, align: 'center', valign: 'middle', cs: 1 });
      txt(s, c.kr, { x: x + 2.48, y: G.bodyY + 0.40, w: 2, h: 0.46, size: 17, bold: true, color: c.bar, valign: 'middle' });

      txt(s, c.big, { x: x + 0.42, y: G.bodyY + 1.06, w: w - 0.84, h: 1.10, size: 54, bold: true, color: c.bigC, align: 'center', valign: 'middle', ls: 1.0 });
      s.addShape('line', { x: x + 0.7, y: G.bodyY + 2.32, w: w - 1.4, h: 0, line: { color: C.edge, width: 1.25 } });

      c.li.forEach((t, j) => {
        const yy = G.bodyY + 2.56 + j * 0.86;
        s.addShape('ellipse', { x: x + 0.46, y: yy + 0.14, w: 0.13, h: 0.13, fill: { color: c.bar }, line: { type: 'none' } });
        txt(s, t, { x: x + 0.78, y: yy, w: w - 1.24, h: 0.80, size: T.body, color: C.text, valign: 'top', ls: 1.28 });
      });
    });

    banner(s, '전북은 이미 절반을 가졌습니다. 나머지 절반이 부안에 있습니다.');
    src(s, '농림축산식품부(2026.3.19 / 6.29) · 하림 · 참프레 · 부안군');
  }

  // ══════════════════════════════════════════════════
  // S2 — 정부 정책 연계
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 01', kr: '정책 연계', en: 'Policy Alignment',
      lead: '농림축산식품부는 「K-푸드 세계화의 전진기지, 농생명수도 전북」을 통해 4대 약속을 제시했습니다.' });

    // 국정 위계
    const hier = [
      { t: '핵심 국정과제', d: '국민 먹거리를 지키는\n국가전략산업으로 농업 육성', fill: C.blueMid },
      { t: '5대 국정목표', d: '모두가 잘사는\n균형성장', fill: C.blue },
      { t: '전북 지역공약', d: '전북을 농생명산업\n수도로 육성', fill: C.navy, on: true },
    ];
    const hw = 5.7, hg = 0.45;
    hier.forEach((h, i) => {
      const x = G.ml + i * (hw + hg);
      card(s, { x, y: G.bodyY, w: hw, h: 1.72, fill: h.fill, shadow: h.on });
      txt(s, h.t, { x: x + 0.3, y: G.bodyY + 0.20, w: hw - 0.6, h: 0.36, size: 14, color: h.on ? C.cyan : C.light, align: 'center', valign: 'middle' });
      txt(s, h.d, { x: x + 0.3, y: G.bodyY + 0.58, w: hw - 0.6, h: 0.96, size: 19, bold: true, color: C.white, align: 'center', valign: 'middle', ls: 1.28 });
      if (i < 2) s.addShape('rightArrow', { x: x + hw + 0.06, y: G.bodyY + 0.70, w: 0.33, h: 0.32, fill: { color: C.edge }, line: { type: 'none' } });
    });

    // 4대 약속
    const pr = [
      { n: '01', t: '국가식품클러스터', d: 'K-푸드 수출과 혁신의 중심지로 육성' },
      { n: '02', t: '음식 · 문화자원', d: '수출 · 관광상품으로 전환', on: true },
      { n: '03', t: 'AI 스마트농업', d: '전북형 재생에너지 모델 구축' },
      { n: '04', t: '농생명 전후방', d: '종자 · 지능형 농기계 혁신' },
    ];
    const pw = 4.24, pg = 0.32;
    pr.forEach((p, i) => {
      const x = G.ml + i * (pw + pg);
      const y = G.bodyY + 2.06;
      card(s, { x, y, w: pw, h: 1.46, fill: p.on ? C.light : C.card, line: p.on ? C.blue : null, lw: 2 });
      txt(s, p.n, { x: x + 0.28, y: y + 0.18, w: 1, h: 0.36, size: 15, bold: true, color: p.on ? C.blue : C.blueMid, valign: 'middle' });
      txt(s, p.t, { x: x + 0.28, y: y + 0.54, w: pw - 0.56, h: 0.40, size: 19, bold: true, color: C.text, valign: 'middle' });
      txt(s, p.d, { x: x + 0.28, y: y + 0.96, w: pw - 0.56, h: 0.38, size: 15, color: C.sub, valign: 'middle' });
    });

    // 정책 원문
    card(s, { x: G.ml, y: G.bodyY + 3.74, w: G.cw, h: 1.40, fill: C.navy });
    txt(s, '「4.2 지역의 맛을 수출 · 관광 브랜드로」 핵심 내용', {
      x: G.ml + 0.5, y: G.bodyY + 3.90, w: 8, h: 0.36, size: 14, color: C.light, valign: 'middle' });
    txt(s, '"지역 음식과 관광자원을 결합한 K-미식벨트 조성"', {
      x: G.ml + 0.5, y: G.bodyY + 4.26, w: 8.4, h: 0.44, size: 18, bold: true, color: C.cyan, valign: 'middle' });
    txt(s, '"치킨로드 등 지역 음식관광 상품과 시너지 창출"', {
      x: G.ml + 9.4, y: G.bodyY + 4.26, w: 8.1, h: 0.44, size: 18, bold: true, color: C.cyan, valign: 'middle' });

    banner(s, '부안 닭축제는 새로운 요청이 아니라, 이미 발표된 정책의 이행입니다.');
    src(s, '농림축산식품부 「K-푸드 세계화의 전진기지, 농생명수도 전북」 정책 발표자료');
  }

  // ══════════════════════════════════════════════════
  // S3 — 전북 치킨벨트
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 01', kr: '전북 치킨벨트', en: 'Jeonbuk Chicken Belt',
      lead: '닭고기 계열화 대기업 두 곳을 동시에 보유한 시 · 도는 전국에서 전북이 유일합니다.' });

    const two = [
      { city: '익산', corp: '하림', badge: '상설 산업관광', fill: C.card, accent: C.blueMid,
        big: '2,600억', bigL: '스마트 도계장 리모델링\n(2017~2019 완공)',
        li: ['하림 치킨로드 — 견학로 · 투어창', '발골쇼 · 시식키친 · 미디어 체험', '하림 푸드로드 등으로 확장'],
        note: '농식품부 K-치킨벨트 체험형 콘텐츠로 명시' },
      { city: '부안', corp: '참프레', badge: '연례 미식축제', fill: C.light, accent: C.blue, on: true,
        big: '2,310억', bigL: '2013년 공장 완공 투자',
        li: ['국내 최초 동물복지 육용계 인증(2015)', '동물복지 도축장 지정', '견학관 상시 운영 · 전북 공식 관광콘텐츠'],
        note: '변산반도 국립공원을 낀 유일한 닭 산업 도시' },
    ];
    const w = 8.78, gap = 0.44;
    two.forEach((t, i) => {
      const x = G.ml + i * (w + gap);
      card(s, { x, y: G.bodyY, w, h: 4.44, fill: t.fill, line: t.on ? C.blue : null, lw: 2, shadow: t.on });
      txt(s, t.city, { x: x + 0.44, y: G.bodyY + 0.28, w: 2.2, h: 0.72, size: 40, bold: true, color: t.accent, valign: 'middle', ls: 1.0 });
      txt(s, t.corp, { x: x + 2.30, y: G.bodyY + 0.42, w: 2.4, h: 0.48, size: 22, bold: true, color: C.text, valign: 'middle' });
      s.addShape('roundRect', { x: x + w - 3.10, y: G.bodyY + 0.38, w: 2.66, h: 0.52, fill: { color: t.accent }, rectRadius: 0.09, line: { type: 'none' } });
      txt(s, t.badge, { x: x + w - 3.10, y: G.bodyY + 0.38, w: 2.66, h: 0.52, size: 15, bold: true, color: C.white, align: 'center', valign: 'middle' });

      txt(s, t.big, { x: x + 0.44, y: G.bodyY + 1.16, w: 3.6, h: 0.86, size: 44, bold: true, color: t.accent, valign: 'middle', ls: 1.0 });
      txt(s, t.bigL, { x: x + 4.20, y: G.bodyY + 1.30, w: w - 4.64, h: 0.60, size: 15, color: C.sub, valign: 'middle', ls: 1.2 });

      s.addShape('line', { x: x + 0.44, y: G.bodyY + 2.16, w: w - 0.88, h: 0, line: { color: C.edge, width: 1.25 } });
      t.li.forEach((l, j) => {
        const yy = G.bodyY + 2.36 + j * 0.54;
        s.addShape('ellipse', { x: x + 0.48, y: yy + 0.16, w: 0.12, h: 0.12, fill: { color: t.accent }, line: { type: 'none' } });
        txt(s, l, { x: x + 0.80, y: yy, w: w - 1.24, h: 0.46, size: T.body, color: C.text, valign: 'middle' });
      });
      txt(s, t.note, { x: x + 0.44, y: G.bodyY + 3.98, w: w - 0.88, h: 0.36, size: 15, italic: true, color: t.accent, valign: 'middle' });
    });

    // 순환 코스
    txt(s, '전북 치킨벨트 순환 코스', { x: G.ml, y: G.bodyY + 4.66, w: 5, h: 0.4, size: 17, bold: true, color: C.blue, valign: 'middle' });
    const route = ['익산 하림 치킨로드', '국가식품클러스터', '부안 참프레 견학관', '부안 닭축제', '변산반도 · 새만금'];
    const rw = 3.24, rg = 0.30;
    route.forEach((r, i) => {
      const x = G.ml + i * (rw + rg);
      const y = G.bodyY + 5.12;
      const on = i >= 2;
      s.addShape('roundRect', { x, y, w: rw, h: 0.56, fill: { color: on ? C.blue : C.white }, rectRadius: 0.09, line: on ? { type: 'none' } : { color: C.edge, width: 1.25 } });
      txt(s, r, { x, y, w: rw, h: 0.56, size: 14, bold: true, color: on ? C.white : C.sub, align: 'center', valign: 'middle' });
      if (i < 4) s.addShape('rightArrow', { x: x + rw + 0.03, y: y + 0.18, w: 0.24, h: 0.2, fill: { color: C.edge }, line: { type: 'none' } });
    });

    src(s, '하림 보도자료(2022) · 참프레 · 농림축산식품부 K-치킨벨트');
  }

  // ══════════════════════════════════════════════════
  // S4 — 시장의 빈칸
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 01', kr: '시장의 빈칸', en: 'The Empty Quadrant',
      lead: '전국의 닭 관광은 「맛집」과 「견학」 둘뿐입니다. 산업 기반 위의 가족형 축제는 없습니다.' });

    const mx = G.ml, my = G.bodyY, mw = 12.0, mh = 5.20;
    const cw = (mw - 1.9) / 2, ch = (mh - 0.86) / 2;
    const ox = mx + 1.78, oy = my + 0.74;

    txt(s, '개인 · 평일', { x: ox, y: my + 0.18, w: cw, h: 0.44, size: 15, bold: true, color: C.sub, align: 'center', valign: 'middle' });
    txt(s, '가족 · 주말', { x: ox + cw + 0.12, y: my + 0.18, w: cw, h: 0.44, size: 15, bold: true, color: C.sub, align: 'center', valign: 'middle' });
    txt(s, '소  비\n(맛집)', { x: mx, y: oy, w: 1.62, h: ch, size: 15, bold: true, color: C.sub, align: 'center', valign: 'middle', ls: 1.3 });
    txt(s, '생  산\n(산업)', { x: mx, y: oy + ch + 0.12, w: 1.62, h: ch, size: 15, bold: true, color: C.sub, align: 'center', valign: 'middle', ls: 1.3 });

    const cells = [
      { cx: 0, cy: 0, t: '지역 닭요리 맛집', d: '춘천 닭갈비 · 안동 찜닭 · 속초 닭강정\n소비 거점이나 생산 기반이 없습니다' },
      { cx: 1, cy: 0, t: '대형 소비 축제', d: '대구 치맥페스티벌 115만명\n규모는 크지만 생산 서사가 없습니다' },
      { cx: 0, cy: 1, t: '기업 견학', d: '익산 하림 · 부안 참프레\n주말 가족 유입에 한계가 있습니다' },
      { cx: 1, cy: 1, t: '비어 있는 칸', d: '산업 기반 위에 세워진\n가족형 미식 축제', on: true },
    ];
    cells.forEach((c) => {
      const x = ox + c.cx * (cw + 0.12);
      const y = oy + c.cy * (ch + 0.12);
      card(s, { x, y, w: cw, h: ch, fill: c.on ? C.blue : C.card, line: c.on ? C.cyan : C.edge, lw: c.on ? 2.5 : 1, shadow: c.on });
      txt(s, c.t, { x: x + 0.3, y: y + 0.42, w: cw - 0.6, h: 0.52, size: 22, bold: true, color: c.on ? C.white : C.text, align: 'center', valign: 'middle' });
      txt(s, c.d, { x: x + 0.3, y: y + 1.02, w: cw - 0.6, h: 0.92, size: T.body, color: c.on ? C.light : C.sub, align: 'center', valign: 'top', ls: 1.3 });
    });

    const rx = mx + mw + 0.44, rw = G.cw - mw - 0.44;
    card(s, { x: rx, y: my, w: rw, h: mh, fill: C.navy });
    txt(s, '왜 이 칸이 비어 있나', { x: rx + 0.42, y: my + 0.34, w: rw - 0.84, h: 0.46, size: 21, bold: true, color: C.white, valign: 'middle' });
    ['맛집 거점은 산업 기반이 없다', '기업 견학은 주말 · 가족 유입에 한계', '대형 축제는 생산 서사가 없다']
      .forEach((t, i) => {
        const y = my + 1.00 + i * 0.72;
        s.addShape('ellipse', { x: rx + 0.46, y: y + 0.16, w: 0.13, h: 0.13, fill: { color: C.cyan }, line: { type: 'none' } });
        txt(s, t, { x: rx + 0.80, y, w: rw - 1.24, h: 0.5, size: T.body, color: C.light, valign: 'middle' });
      });
    s.addShape('line', { x: rx + 0.42, y: my + 3.24, w: rw - 0.84, h: 0, line: { color: '3A3AA8', width: 1.25 } });
    txt(s, '부안만 세 조건을 모두 충족', { x: rx + 0.42, y: my + 3.42, w: rw - 0.84, h: 0.44, size: 19, bold: true, color: C.cyan, valign: 'middle' });
    ['생산 · 가공 기반 (참프레)', '관광 자원 (변산 · 새만금)', '축제 운영 역량 (마실축제)']
      .forEach((t, i) => {
        const y = my + 3.94 + i * 0.42;
        s.addShape('roundRect', { x: rx + 0.42, y, w: rw - 0.84, h: 0.34, fill: { color: C.blue }, rectRadius: 0.06, line: { type: 'none' } });
        txt(s, t, { x: rx + 0.58, y, w: rw - 1.16, h: 0.34, size: 14, bold: true, color: C.white, valign: 'middle' });
      });

    banner(s, '전국에서 이 칸을 채울 수 있는 곳은 부안뿐입니다.');
  }

  // ══════════════════════════════════════════════════
  // S5 — 부안의 자산 (참프레)
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 01', kr: '부안의 자산', en: 'Assets in Place',
      lead: '축제를 위해 새 건물을 짓지 않습니다. 이미 문을 연 시설을 연결합니다.' });

    img(s, 'charmfre.jpg', { x: G.ml, y: G.bodyY, w: 8.4, h: 3.60 });
    img(s, 'buan_farm.jpg', { x: G.ml, y: G.bodyY + 3.76, w: 4.05, h: 1.44 });
    card(s, { x: G.ml + 4.35, y: G.bodyY + 3.76, w: 4.05, h: 1.44, fill: C.navy });
    txt(s, '참프레 견학관', { x: G.ml + 4.60, y: G.bodyY + 3.92, w: 3.6, h: 0.42, size: 19, bold: true, color: C.cyan, valign: 'middle' });
    txt(s, '발골쇼 · 참프레 파크\n시식 프로그램 상시 운영', { x: G.ml + 4.60, y: G.bodyY + 4.36, w: 3.6, h: 0.78, size: 15, color: C.light, valign: 'top', ls: 1.3 });

    const rx = G.ml + 8.84, rw = G.cw - 8.84;
    const stats = [
      { v: '2,310억', l: '공장 투자액 · 2013년 완공' },
      { v: '787명', l: '고용 규모 · 2019년 기준' },
      { v: '2015', l: '국내 최초 동물복지 육용계 인증' },
      { v: '국내 최초', l: '동물복지 도축장 지정', sz: 38 },
    ];
    stats.forEach((st, i) => {
      const y = G.bodyY + i * 1.42;
      card(s, { x: rx, y, w: rw, h: 1.22, fill: i % 2 ? C.card : C.light });
      txt(s, st.v, { x: rx + 0.44, y, w: 4.0, h: 1.22, size: st.sz || 44, bold: true, color: C.blue, valign: 'middle', ls: 1.0 });
      txt(s, st.l, { x: rx + 4.60, y, w: rw - 5.04, h: 1.22, size: T.body, color: C.sub, valign: 'middle', ls: 1.25 });
    });

    banner(s, '필요한 것은 건물이 아니라, 그 건물에 사람을 부를 이유입니다.');
    src(s, '디지털부안문화대전 · 참프레 공식 · 투어전북 · 전북특별자치도');
  }

  // ══════════════════════════════════════════════════
  // S6 — 생활인구
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 01', kr: '생활인구', en: 'Real Population',
      lead: '부안에는 이미 사람이 옵니다. 다만 그 방문에 아직 이름이 없습니다.' });

    // 좌: 막대 대비
    card(s, { x: G.ml, y: G.bodyY, w: 10.6, h: 5.20, fill: C.card });
    const baseY = G.bodyY + 4.30, maxH = 3.10;
    const h1 = maxH * (46946 / 363921), h2 = maxH;
    s.addShape('rect', { x: G.ml + 1.9, y: baseY - h1, w: 2.1, h: h1, fill: { color: C.blueMid }, line: { type: 'none' } });
    s.addShape('rect', { x: G.ml + 6.6, y: baseY - h2, w: 2.1, h: h2, fill: { color: C.blue }, line: { type: 'none' } });
    txt(s, '46,946', { x: G.ml + 1.2, y: baseY - h1 - 0.66, w: 3.5, h: 0.58, size: 28, bold: true, color: C.blueMid, align: 'center', valign: 'middle' });
    txt(s, '363,921', { x: G.ml + 5.9, y: baseY - h2 - 0.72, w: 3.5, h: 0.64, size: 36, bold: true, color: C.blue, align: 'center', valign: 'middle' });
    s.addShape('line', { x: G.ml + 0.7, y: baseY, w: 9.2, h: 0, line: { color: C.edge, width: 1.5 } });
    txt(s, '등록인구\n2026. 6 기준', { x: G.ml + 1.2, y: baseY + 0.16, w: 3.5, h: 0.9, size: 16, color: C.sub, align: 'center', valign: 'top', ls: 1.3 });
    txt(s, '생활인구\n2025. 4Q 평균', { x: G.ml + 5.9, y: baseY + 0.16, w: 3.5, h: 0.9, size: 16, bold: true, color: C.text, align: 'center', valign: 'top', ls: 1.3 });
    s.addShape('roundRect', { x: G.ml + 4.34, y: baseY - 2.10, w: 1.94, h: 0.90, fill: { color: C.cyan }, rectRadius: 0.12, line: { type: 'none' } });
    txt(s, '× 7.7', { x: G.ml + 4.34, y: baseY - 2.10, w: 1.94, h: 0.90, size: 30, bold: true, color: C.navy, align: 'center', valign: 'middle' });

    // 우: 부안의 인구 위상 (검증된 순위)
    const rx = G.ml + 11.04, rw = G.cw - 11.04;
    card(s, { x: rx, y: G.bodyY, w: rw, h: 5.20, fill: C.white, line: C.edge });
    txt(s, '부안의 인구 위상', { x: rx + 0.44, y: G.bodyY + 0.30, w: rw - 0.88, h: 0.44, size: 21, bold: true, color: C.blue, valign: 'middle' });
    txt(s, '전북 인구감소지역 10곳 기준 · 2025년', { x: rx + 0.44, y: G.bodyY + 0.76, w: rw - 0.88, h: 0.34, size: 14, color: C.sub, valign: 'middle' });

    const ranks = [
      { metric: '체류인구', rank: '도내 1위', v: '292,141명', period: '2025년 연평균 · 방문 · 통근 인구', on: true },
      { metric: '생활인구', rank: '도내 2위', v: '341,104명', period: '2025년 연평균 · 등록 + 체류 인구' },
    ];
    ranks.forEach((rk, i) => {
      const y = G.bodyY + 1.22 + i * 1.52;
      card(s, { x: rx + 0.34, y, w: rw - 0.68, h: 1.34, fill: rk.on ? C.light : C.card, line: rk.on ? C.blue : null, lw: 1.75 });
      txt(s, rk.metric, { x: rx + 0.62, y: y + 0.18, w: 3.0, h: 0.40, size: 17, bold: true, color: C.text, valign: 'middle' });
      s.addShape('roundRect', { x: rx + rw - 2.06, y: y + 0.18, w: 1.6, h: 0.44, fill: { color: rk.on ? C.blue : C.blueMid }, rectRadius: 0.08, line: { type: 'none' } });
      txt(s, rk.rank, { x: rx + rw - 2.06, y: y + 0.18, w: 1.6, h: 0.44, size: 15, bold: true, color: C.white, align: 'center', valign: 'middle' });
      txt(s, rk.v, { x: rx + 0.62, y: y + 0.58, w: 4.0, h: 0.56, size: 30, bold: true, color: C.blue, valign: 'middle', ls: 1.0 });
      txt(s, rk.period, { x: rx + 0.62, y: y + 1.08, w: rw - 1.24, h: 0.30, size: 12, color: C.sub, valign: 'middle' });
    });
    txt(s, '※ 체류·생활인구는 산정 기준이 달라 수치가 다릅니다. 어느 지표로도 부안은 전북 최상위권입니다.', {
      x: rx + 0.44, y: G.bodyY + 4.34, w: rw - 0.88, h: 0.74, size: 12.5, color: C.sub, valign: 'top', ls: 1.28 });

    banner(s, '행안부는 2026년부터 시설이 아니라 인구유입 효과로 기금을 평가합니다.');
    src(s, '부안군 · 행정안전부 · 국가데이터처 생활인구 산정결과(2025) · 전북일보(2026.6.3)');
  }

  // ══════════════════════════════════════════════════
  // S7 — 지역브랜드  ★신설
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 01', kr: '지역브랜드', en: 'Place & Product',
      lead: '지역의 이름과 하나의 상품이 결합할 때 브랜드가 됩니다. 영광 하면 굴비, 부안 하면 닭입니다.' });

    const brands = [
      { img: 'gulbi.jpg', place: '영광', eq: '=', prod: '굴비',
        d: '법성포 조기를 천일염에 절여 말린 굴비. 지역명이 곧 품질 보증이 되어 프리미엄 수산물 브랜드로 자리잡았습니다.' },
      { img: 'insam.jpg', place: '금산', eq: '=', prod: '인삼',
        d: '국제인삼축제와 인삼시장을 축으로 생산 · 유통 · 관광을 묶어 세계 인삼 거래의 중심지가 되었습니다.' },
      { img: 'jangryu.jpg', place: '순창', eq: '=', prod: '장류',
        d: '고추장민속마을과 장류 클러스터. 2024년 농식품부 K-미식벨트 첫 주제 거점으로 선정된 전북의 성공 사례입니다.',
        tag: '전북 선례' },
      { img: 'buan_chicken.jpg', place: '부안', eq: '=', prod: '닭',
        d: '생산(참프레) · 문화(계림) · 관광(변산)이 이미 한 곳에 있습니다. 남은 것은 이름을 붙이는 일뿐입니다.',
        on: true },
    ];
    const w = 4.24, gap = 0.32;
    brands.forEach((b, i) => {
      const x = G.ml + i * (w + gap);
      card(s, { x, y: G.bodyY, w, h: 5.20, fill: b.on ? C.blue : C.card, line: b.on ? C.cyan : null, lw: 2.5, shadow: b.on });
      img(s, b.img, { x: x + 0.001, y: G.bodyY + 0.001, w, h: 2.10 });

      txt(s, b.place, { x: x + 0.30, y: G.bodyY + 2.28, w: 1.5, h: 0.62, size: 30, bold: true, color: b.on ? C.white : C.text, valign: 'middle', ls: 1.0 });
      txt(s, b.eq, { x: x + 1.72, y: G.bodyY + 2.28, w: 0.5, h: 0.62, size: 24, bold: true, color: b.on ? C.cyan : C.blueMid, align: 'center', valign: 'middle' });
      txt(s, b.prod, { x: x + 2.20, y: G.bodyY + 2.28, w: 1.8, h: 0.62, size: 30, bold: true, color: b.on ? C.cyan : C.blue, valign: 'middle', ls: 1.0 });

      if (b.tag) {
        s.addShape('roundRect', { x: x + 0.30, y: G.bodyY + 3.02, w: 1.66, h: 0.38, fill: { color: C.blueMid }, rectRadius: 0.06, line: { type: 'none' } });
        txt(s, b.tag, { x: x + 0.30, y: G.bodyY + 3.02, w: 1.66, h: 0.38, size: 13, bold: true, color: C.white, align: 'center', valign: 'middle' });
      }
      s.addShape('line', { x: x + 0.30, y: G.bodyY + (b.tag ? 3.56 : 3.06), w: w - 0.60, h: 0, line: { color: b.on ? '4A6FD8' : C.edge, width: 1.25 } });
      txt(s, b.d, { x: x + 0.30, y: G.bodyY + (b.tag ? 3.74 : 3.24), w: w - 0.60, h: 1.70, size: 16, color: b.on ? C.light : C.sub, valign: 'top', ls: 1.32 });
    });

    banner(s, '순창은 이미 해냈습니다. 같은 방식으로 부안이 다음 차례입니다.');
    src(s, '농림축산식품부 K-미식벨트 · 각 지자체');
  }
};
