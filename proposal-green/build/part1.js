const L = require('./lib');
const { C, F, G, T } = L;
const { txt, wbox, box, pill, chip, bullet, darrow, header, src, banner, hl, img, hex, ring, stat, section, reg } = L;

reg('cover.jpg',      '부안 변산반도 해안 또는 새만금 항공 전경', '2800×1600px 이상 · 가로형');
reg('cover2.jpg',     '부안 닭요리 / 축제 현장', '1200×1200px');
reg('cover3.jpg',     '변산반도 국립공원 해안', '1200×1200px');
reg('charmfre.jpg',   '참프레 견학관 내부 (발골쇼 · 참프레파크 · 시식)', '1600×1200px · 참프레 공식 요청');
reg('buan_farm.jpg',  '참프레 공장 외관 또는 동물복지 인증 농장', '1600×1200px');
reg('gulbi.jpg',      '영광 법성포 굴비 (건조 장면 권장)', '1200×900px');
reg('insam.jpg',      '금산 인삼 / 인삼시장', '1200×900px');
reg('jangryu.jpg',    '순창 고추장민속마을 / 장독대', '1200×900px');
reg('buan_chicken.jpg','부안 닭 / 닭요리 대표 이미지', '1200×900px');

module.exports = function (pres) {

  // ══════════════════════════════════════════════════ 표지
  {
    const s = pres.addSlide();
    s.background = { color: C.soft2 };
    s.addShape('rect', { x: 0, y: 0, w: 20, h: 0.20, fill: { color: C.dark }, line: { type: 'none' } });
    s.addShape('rect', { x: 0, y: 0, w: 8, h: 0.20, fill: { color: C.lime }, line: { type: 'none' } });
    // 우측 장식 + 육각 포토 허니콤
    s.addShape('roundRect', { x: 13.6, y: -2.4, w: 9, h: 16, fill: { color: 'E4EFDA' }, rectRadius: 0.9, line: { type: 'none' } });
    hex(s, 'cover.jpg',  { x: 13.2, y: 2.15, w: 4.7, h: 4.2, label: 'cover.jpg' });
    hex(s, 'cover2.jpg', { x: 15.7, y: 5.3, w: 3.7, h: 3.3, label: 'cover2.jpg' });
    hex(s, 'cover3.jpg', { x: 12.1, y: 5.9, w: 3.7, h: 3.3, label: 'cover3.jpg' });
    // 좌측 타이틀
    s.addShape('rect', { x: G.ml, y: 2.5, w: 0.6, h: 0.6, fill: { color: C.dark }, line: { type: 'none' } });
    txt(s, 'K-CHICKEN BELT', { x: 1.45, y: 2.53, w: 8, h: 0.56, size: 17, bold: true, color: C.mid, valign: 'middle', cs: 3 });
    txt(s, '부안 닭축제', { x: G.ml, y: 3.55, w: 12, h: 1.6, size: 86, bold: true, color: C.text, valign: 'middle', ls: 1.0 });
    txt(s, '종합 제안서', { x: 0.75, y: 5.25, w: 11, h: 1.0, size: 50, bold: true, color: C.dark, valign: 'middle' });
    s.addShape('line', { x: 0.78, y: 6.5, w: 3.0, h: 0, line: { color: C.lime, width: 4 } });
    txt(s, '전북 치킨벨트를 완성하는 마지막 한 조각', { x: G.ml, y: 6.7, w: 12, h: 0.6, size: 23, color: C.sub, valign: 'middle' });
    [['제출', '부안군 · 전북특별자치도'], ['작성', '2026. 07'], ['목표', '제1회 2028년 10월 개최']]
      .forEach((r, i) => {
        const y = 8.5 + i * 0.5;
        txt(s, r[0], { x: G.ml, y, w: 1.2, h: 0.44, size: 15, bold: true, color: C.mid, valign: 'middle' });
        txt(s, r[1], { x: 2.0, y, w: 8, h: 0.44, size: 16, color: C.text, valign: 'middle' });
      });
  }

  // ══════════════════════════════════════════════════ 목차
  {
    const s = pres.addSlide();
    header(s, { title: '목차', lead: '왜 지금 부안인가에서 시작해, 재원과 일정으로 끝맺습니다.' });
    const items = [
      ['01', '왜 지금, 왜 부안인가', '제안 요약 · 정책 연계 · 전북 치킨벨트 · 시장의 빈칸 · 부안의 자산 · 생활인구 · 지역브랜드'],
      ['02', '닭, 그 이름의 역사', '계림 설화 · 상징의 회복 · K-Chicken'],
      ['03', '사업 계획', '사계절 전략 · 사업 개요 · 공간 구성 · 시그니처 · 동물복지'],
      ['04', '검증과 리스크', '경쟁 분석 · 단계 목표 · 방역 리스크 대응'],
      ['05', '재원과 추진', '재원 조달 · 예산 계획 · 추진 체계 · 추진 일정 · 기대효과'],
    ];
    let y = G.bodyY + 0.15;
    items.forEach((it, i) => {
      wbox(s, { x: G.ml, y, w: G.cw, h: 1.14, fill: i === 0 ? C.soft : C.white, line: i === 0 ? C.mid : C.line, lw: i === 0 ? 1.75 : 1.25, shadow: false });
      box(s, { x: G.ml + 0.30, y: y + 0.22, w: 1.15, h: 0.70, fill: i === 0 ? C.dark : C.mid2, r: 0.10 });
      txt(s, it[0], { x: G.ml + 0.30, y: y + 0.22, w: 1.15, h: 0.70, size: 24, bold: true, color: C.white, align: 'center', valign: 'middle' });
      txt(s, it[1], { x: G.ml + 1.72, y: y + 0.16, w: 8, h: 0.46, size: 22, bold: true, color: C.text, valign: 'middle' });
      txt(s, it[2], { x: G.ml + 1.72, y: y + 0.64, w: 16.4, h: 0.42, size: 15, color: C.sub, valign: 'middle' });
      y += 1.28;
    });
  }

  // ══════════════════════════════════════════════════ 간지 01
  section(pres, '01', '왜 지금, 왜 부안인가', 'WHY BUAN, WHY NOW',
    '제안 요약 · 정책 연계 · 전북 치킨벨트 · 시장의 빈칸 · 부안의 자산 · 생활인구 · 지역브랜드');

  // ══════════════════════════════════════════════════ 1.1 제안 요약
  {
    const s = pres.addSlide();
    header(s, { n: '1.1', title: '제안 요약',
      lead: '익산에 「치킨로드」가 있습니다. 부안에는 「치킨 페스티벌」이 필요합니다.' });
    const cols = [
      { tag: '문제', en: 'PROBLEM', big: '견학뿐', hero: false, mk: C.sub,
        li: ['전북의 닭 산업 관광은 평일 · 개인 중심의 상설 견학에 머물러 있습니다', '주말 · 가족 단위 유입 장치가 없습니다', '부안 = 닭이라는 연상이 형성되지 않았습니다'] },
      { tag: '해법', en: 'SOLUTION', big: '축제', hero: false, mk: C.mid,
        li: ['익산은 산업관광, 부안은 미식축제로 역할 분담', '참프레 견학관과 변산 관광을 결합합니다', '마실축제(봄)와 계절을 분담합니다'] },
      { tag: '요청', en: 'REQUEST', big: '2028', hero: true, mk: C.lime,
        li: ['제1회 개최까지 준비기간 24개월', '2028년도 지방소멸대응기금 투자계획 반영', '도 차원 예산 매칭과 K-치킨벨트 거점 등재'] },
    ];
    const w = 5.94, gap = 0.42, y0 = 2.85;
    cols.forEach((c, i) => {
      const x = G.ml + i * (w + gap);
      pill(s, { x, y: y0, w, h: 0.86, t: c.tag, fill: c.hero ? C.dark : C.mid2, size: 22,
        badge: c.en, badgeW: 2.1, badgeFill: c.hero ? C.lime : C.mid, badgeTc: c.hero ? C.dark : C.white });
      wbox(s, { x, y: y0 + 1.02, w, h: 5.05, hero: c.hero, line: c.hero ? C.mid : C.line });
      txt(s, c.big, { x, y: y0 + 1.32, w, h: 1.10, size: 52, bold: true, color: c.hero ? C.dark : C.text, align: 'center', valign: 'middle', ls: 1.0 });
      s.addShape('line', { x: x + 0.5, y: y0 + 2.58, w: w - 1.0, h: 0, line: { color: C.line, width: 1.25 } });
      c.li.forEach((t, j) => {
        const yy = y0 + 2.82 + j * 0.86;
        bullet(s, x + 0.44, yy, t, { mk: c.mk, w: w - 0.9, h: 0.80, valign: 'top', ls: 1.28 });
      });
    });
    banner(s, hl('전북은 이미 절반을 가졌습니다. 나머지 절반이 ', '부안', '에 있습니다.'));
    src(s, '농림축산식품부(2026.3.19 / 6.29) · 하림 · 참프레 · 부안군');
  }

  // ══════════════════════════════════════════════════ 1.2 정책 연계
  {
    const s = pres.addSlide();
    header(s, { n: '1.2', title: '정책 연계',
      lead: '농림축산식품부 「K-푸드 세계화의 전진기지, 농생명수도 전북」의 이행입니다.' });
    // 3 링 (국정 위계)
    const rings = [
      { text: '국민 먹거리를 지키는\n국가전략산업', tab: '핵심 국정과제', color: C.lime, tc: C.text, tabW: 2.4 },
      { text: '모두가 잘사는\n균형성장', tab: '5대 국정목표', color: C.mid, tc: C.text, tabW: 2.1 },
      { text: '전북을 농생명산업\n수도로 육성', tab: '전북 지역공약', color: C.dark, tc: C.text, tabW: 2.2 },
    ];
    const d = 2.35, rgap = 0.9, startX = G.ml + 0.3;
    rings.forEach((r, i) => {
      const x = startX + i * (d + rgap);
      ring(s, { x, y: 2.55, d, color: r.color, text: r.text, tc: r.tc, size: 16, tab: r.tab, tabW: r.tabW });
      if (i < 2) darrow(s, x + d + 0.14, 2.55 + d / 2, rgap - 0.5);
    });
    // 4대 약속
    const rx = startX + 3 * (d + rgap) - rgap + 0.3, rw = G.cw - (rx - G.ml);
    txt(s, '4대 약속', { x: rx, y: 2.5, w: rw, h: 0.4, size: 16, bold: true, color: C.dark });
    const pr = [
      { n: '01', t: '국가식품클러스터', d: 'K-푸드 수출·혁신 중심' },
      { n: '02', t: '음식·문화자원', d: '수출·관광상품 전환', on: true },
      { n: '03', t: 'AI 스마트농업', d: '재생에너지 모델' },
      { n: '04', t: '농생명 전후방', d: '종자·농기계 혁신' },
    ];
    pr.forEach((p, i) => {
      const y = 3.0 + i * 0.94;
      wbox(s, { x: rx, y, w: rw, h: 0.82, fill: p.on ? C.soft : C.white, line: p.on ? C.mid : C.line, lw: p.on ? 1.75 : 1.25, shadow: false });
      chip(s, { x: rx + 0.18, y: y + 0.18, w: 0.68, h: 0.46, t: p.n, fill: p.on ? C.dark : C.mid2, size: 15 });
      txt(s, p.t, { x: rx + 1.02, y: y + 0.10, w: rw - 1.2, h: 0.40, size: 17, bold: true, color: C.text, valign: 'middle' });
      txt(s, p.d, { x: rx + 1.02, y: y + 0.46, w: rw - 1.2, h: 0.32, size: 13, color: C.sub, valign: 'middle' });
    });
    // 정책 원문 (그린 인용 박스)
    box(s, { x: G.ml, y: 6.95, w: G.cw, h: 1.72, fill: C.dark, r: 0.12 });
    s.addShape('rect', { x: G.ml, y: 7.15, w: 0.14, h: 1.32, fill: { color: C.lime }, line: { type: 'none' } });
    txt(s, '「4.2 지역의 맛을 수출 · 관광 브랜드로」 핵심 내용', { x: G.ml + 0.55, y: 7.14, w: 10, h: 0.4, size: 14, color: 'CFE3BF', valign: 'middle' });
    txt(s, '"지역 음식과 관광자원을 결합한 K-미식벨트 조성"', { x: G.ml + 0.55, y: 7.6, w: 9.2, h: 0.5, size: 19, bold: true, color: C.lime, valign: 'middle' });
    txt(s, '"치킨로드 등 지역 음식관광 상품과 시너지 창출"', { x: G.ml + 9.9, y: 7.6, w: 8.4, h: 0.5, size: 19, bold: true, color: C.lime, valign: 'middle' });
    banner(s, hl('부안 닭축제는 새로운 요청이 아니라, 이미 발표된 정책의 ', '이행', '입니다.'));
    src(s, '농림축산식품부 「K-푸드 세계화의 전진기지, 농생명수도 전북」 정책 발표자료');
  }

  // ══════════════════════════════════════════════════ 1.3 전북 치킨벨트
  {
    const s = pres.addSlide();
    header(s, { n: '1.3', title: '전북 치킨벨트',
      lead: '닭고기 계열화 대기업 두 곳을 동시에 보유한 시·도는 전국에서 전북이 유일합니다.' });
    const two = [
      { city: '익산', corp: '하림', badge: '상설 산업관광', hero: false, big: '2,600억', bigL: '스마트 도계장 리모델링 (2017~2019)',
        li: ['하림 치킨로드 — 견학로 · 투어창', '발골쇼 · 시식키친 · 미디어 체험', '하림 푸드로드 등으로 확장'],
        note: '농식품부 K-치킨벨트 체험형 콘텐츠로 명시' },
      { city: '부안', corp: '참프레', badge: '연례 미식축제', hero: true, big: '2,310억', bigL: '동물복지 가공공장 완공 (2013)',
        li: ['국내 최초 동물복지 육용계 인증 (2015)', '동물복지 도축장 지정', '견학관 상시 운영 · 전북 공식 관광콘텐츠'],
        note: '변산반도 국립공원을 낀 유일한 닭 산업 도시' },
    ];
    const cw = 9.0, gap = 0.6, y0 = 2.7;
    two.forEach((c, i) => {
      const x = G.ml + i * (cw + gap);
      pill(s, { x, y: y0, w: cw, h: 0.9, t: c.city + ' · ' + c.corp, fill: c.hero ? C.dark : C.mid2, size: 25, badge: c.badge, badgeFill: c.hero ? C.lime : C.mid, badgeTc: c.hero ? C.dark : C.white });
      const by = y0 + 1.08, bh = 4.05;
      wbox(s, { x, y: by, w: cw, h: bh, hero: c.hero, line: c.hero ? C.mid : C.line });
      chip(s, { x: x + 0.44, y: by + 0.38, w: 1.8, h: 0.54, t: '투자 규모', fill: C.dark });
      txt(s, c.big, { x: x + 0.44, y: by + 1.02, w: 4.4, h: 0.86, size: 44, bold: true, color: c.hero ? C.dark : C.mid, valign: 'middle', ls: 1.0 });
      txt(s, c.bigL, { x: x + 0.46, y: by + 1.92, w: cw - 3.2, h: 0.36, size: 13, color: C.sub, valign: 'middle' });
      hex(s, i === 0 ? 'buan_farm.jpg' : 'charmfre.jpg', { x: x + cw - 2.8, y: by + 0.35, w: 2.4, h: 2.0 });
      s.addShape('line', { x: x + 0.44, y: by + 2.5, w: cw - 0.88, h: 0, line: { color: C.line, width: 1.25 } });
      c.li.forEach((t, j) => bullet(s, x + 0.48, by + 2.7 + j * 0.44, t, { mk: c.hero ? C.mid : '7FB25E', w: cw - 1.1, h: 0.4 }));
    });
    // 순환 코스
    txt(s, '전북 치킨벨트 순환 코스', { x: G.ml, y: 7.85, w: 6, h: 0.4, size: 16, bold: true, color: C.dark, valign: 'middle' });
    const route = ['익산 하림 치킨로드', '국가식품클러스터', '부안 참프레 견학관', '부안 닭축제', '변산 · 새만금'];
    const rw = 3.36, rg = 0.34;
    route.forEach((r, i) => {
      const x = G.ml + i * (rw + rg), y = 8.3;
      const on = i >= 2;
      box(s, { x, y, w: rw, h: 0.56, fill: on ? C.mid : C.white, line: on ? null : C.line, r: 0.09 });
      txt(s, r, { x, y, w: rw, h: 0.56, size: 14, bold: true, color: on ? C.white : C.sub, align: 'center', valign: 'middle' });
      if (i < 4) s.addShape('rightArrow', { x: x + rw + 0.04, y: y + 0.18, w: 0.24, h: 0.2, fill: { color: C.mid }, line: { type: 'none' } });
    });
    src(s, '하림 보도자료 · 참프레 · 농림축산식품부 K-치킨벨트');
  }

  // ══════════════════════════════════════════════════ 1.4 시장의 빈칸
  {
    const s = pres.addSlide();
    header(s, { n: '1.4', title: '시장의 빈칸',
      lead: '전국의 닭 관광은 「맛집」과 「견학」 둘뿐. 산업 기반 위의 가족형 축제는 없습니다.' });
    const mx = G.ml, my = 2.75, mw = 12.0, mh = 5.55;
    const cw = (mw - 1.9) / 2, ch = (mh - 0.8) / 2, ox = mx + 1.8, oy = my + 0.7;
    txt(s, '개인 · 평일', { x: ox, y: my + 0.16, w: cw, h: 0.42, size: 15, bold: true, color: C.sub, align: 'center', valign: 'middle' });
    txt(s, '가족 · 주말', { x: ox + cw + 0.12, y: my + 0.16, w: cw, h: 0.42, size: 15, bold: true, color: C.sub, align: 'center', valign: 'middle' });
    txt(s, '소  비\n(맛집)', { x: mx, y: oy, w: 1.64, h: ch, size: 15, bold: true, color: C.sub, align: 'center', valign: 'middle', ls: 1.3 });
    txt(s, '생  산\n(산업)', { x: mx, y: oy + ch + 0.12, w: 1.64, h: ch, size: 15, bold: true, color: C.sub, align: 'center', valign: 'middle', ls: 1.3 });
    const cells = [
      { cx: 0, cy: 0, t: '지역 닭요리 맛집', d: '춘천 닭갈비 · 안동 찜닭 · 속초 닭강정\n소비 거점이나 생산 기반이 없습니다' },
      { cx: 1, cy: 0, t: '대형 소비 축제', d: '대구 치맥페스티벌 115만명\n규모는 크지만 생산 서사가 없습니다' },
      { cx: 0, cy: 1, t: '기업 견학', d: '익산 하림 · 부안 참프레\n주말 가족 유입에 한계가 있습니다' },
      { cx: 1, cy: 1, t: '비어 있는 칸', d: '산업 기반 위에 세워진\n가족형 미식 축제', on: true },
    ];
    cells.forEach((c) => {
      const x = ox + c.cx * (cw + 0.12), y = oy + c.cy * (ch + 0.12);
      if (c.on) { box(s, { x, y, w: cw, h: ch, fill: C.dark, r: 0.10 }); s.addShape('roundRect', { x, y, w: cw, h: ch, fill: { type: 'none' }, rectRadius: 0.10, line: { color: C.lime, width: 2.5 } }); }
      else wbox(s, { x, y, w: cw, h: ch, shadow: false, line: C.line });
      txt(s, c.t, { x: x + 0.3, y: y + 0.42, w: cw - 0.6, h: 0.52, size: 22, bold: true, color: c.on ? C.white : C.text, align: 'center', valign: 'middle' });
      txt(s, c.d, { x: x + 0.3, y: y + 1.02, w: cw - 0.6, h: 0.92, size: T.body, color: c.on ? C.lime : C.sub, align: 'center', valign: 'top', ls: 1.3 });
    });
    const rx = mx + mw + 0.44, rw = G.cw - mw - 0.44;
    box(s, { x: rx, y: my, w: rw, h: mh, fill: C.dark, r: 0.12 });
    txt(s, '왜 이 칸이 비어 있나', { x: rx + 0.42, y: my + 0.34, w: rw - 0.84, h: 0.46, size: 20, bold: true, color: C.white, valign: 'middle' });
    ['맛집 거점은 산업 기반이 없다', '기업 견학은 주말·가족 유입 한계', '대형 축제는 생산 서사가 없다'].forEach((t, i) => {
      bullet(s, rx + 0.44, my + 1.0 + i * 0.66, t, { mk: C.lime, w: rw - 1.0, h: 0.5, color: 'E4EFDA' });
    });
    s.addShape('line', { x: rx + 0.42, y: my + 3.2, w: rw - 0.84, h: 0, line: { color: '4A6B40', width: 1.25 } });
    txt(s, '부안만 세 조건을 모두 충족', { x: rx + 0.42, y: my + 3.38, w: rw - 0.84, h: 0.44, size: 19, bold: true, color: C.lime, valign: 'middle' });
    ['생산·가공 기반 (참프레)', '관광 자원 (변산·새만금)', '축제 운영 역량 (마실축제)'].forEach((t, i) => {
      const y = my + 3.9 + i * 0.5;
      box(s, { x: rx + 0.42, y, w: rw - 0.84, h: 0.42, fill: C.mid, r: 0.06 });
      txt(s, t, { x: rx + 0.62, y, w: rw - 1.2, h: 0.42, size: 14, bold: true, color: C.white, valign: 'middle' });
    });
    banner(s, hl('전국에서 이 칸을 채울 수 있는 곳은 ', '부안', '뿐입니다.'));
  }

  // ══════════════════════════════════════════════════ 1.5 부안의 자산
  {
    const s = pres.addSlide();
    header(s, { n: '1.5', title: '부안의 자산',
      lead: '축제를 위해 새 건물을 짓지 않습니다. 이미 문을 연 시설을 연결합니다.' });
    img(s, 'charmfre.jpg', { x: G.ml, y: 2.75, w: 8.4, h: 3.7 });
    pill(s, { x: G.ml, y: 6.6, w: 8.4, h: 1.6, t: '', fill: C.dark });
    txt(s, '참프레 견학관', { x: G.ml + 0.44, y: 6.78, w: 7.5, h: 0.5, size: 21, bold: true, color: C.lime, valign: 'middle' });
    txt(s, '발골쇼 · 참프레 파크 · 시식 프로그램 상시 운영', { x: G.ml + 0.44, y: 7.32, w: 7.5, h: 0.7, size: 15, color: 'E4EFDA', valign: 'top', ls: 1.3 });
    const rx = G.ml + 8.84, rw = G.cw - 8.84;
    const stats = [
      { v: '2,310억', l: '공장 투자액 · 2013년 완공' },
      { v: '787명', l: '고용 규모 · 2019년 기준' },
      { v: '2015', l: '국내 최초 동물복지 육용계 인증' },
      { v: '국내 최초', l: '동물복지 도축장 지정', sz: 38 },
    ];
    stats.forEach((st, i) => {
      const y = 2.75 + i * 1.42;
      wbox(s, { x: rx, y, w: rw, h: 1.22, fill: i % 2 ? C.white : C.soft, line: C.line, shadow: false });
      s.addShape('rect', { x: rx, y: y + 0.2, w: 0.14, h: 0.82, fill: { color: C.mid }, line: { type: 'none' } });
      txt(s, st.v, { x: rx + 0.44, y, w: 4.0, h: 1.22, size: st.sz || 44, bold: true, color: C.dark, valign: 'middle', ls: 1.0 });
      txt(s, st.l, { x: rx + 4.7, y, w: rw - 5.1, h: 1.22, size: T.body, color: C.sub, valign: 'middle', ls: 1.25 });
    });
    banner(s, hl('필요한 것은 건물이 아니라, 그 건물에 사람을 부를 ', '이유', '입니다.'));
    src(s, '디지털부안문화대전 · 참프레 공식 · 투어전북 · 전북특별자치도');
  }

  // ══════════════════════════════════════════════════ 1.6 생활인구
  {
    const s = pres.addSlide();
    header(s, { n: '1.6', title: '생활인구',
      lead: '부안에는 이미 사람이 옵니다. 다만 그 방문에 아직 이름이 없습니다.' });
    wbox(s, { x: G.ml, y: 2.75, w: 10.6, h: 5.55, fill: C.white, line: C.line });
    const baseY = 2.75 + 4.5, maxH = 3.2;
    const h1 = maxH * (46946 / 363921), h2 = maxH;
    s.addShape('rect', { x: G.ml + 1.9, y: baseY - h1, w: 2.1, h: h1, fill: { color: C.mid }, line: { type: 'none' } });
    s.addShape('rect', { x: G.ml + 6.6, y: baseY - h2, w: 2.1, h: h2, fill: { color: C.dark }, line: { type: 'none' } });
    txt(s, '46,946', { x: G.ml + 1.2, y: baseY - h1 - 0.64, w: 3.5, h: 0.56, size: 28, bold: true, color: C.mid, align: 'center', valign: 'middle' });
    txt(s, '363,921', { x: G.ml + 5.9, y: baseY - h2 - 0.7, w: 3.5, h: 0.62, size: 36, bold: true, color: C.dark, align: 'center', valign: 'middle' });
    s.addShape('line', { x: G.ml + 0.7, y: baseY, w: 9.2, h: 0, line: { color: C.line, width: 1.5 } });
    txt(s, '등록인구\n2026. 6', { x: G.ml + 1.2, y: baseY + 0.14, w: 3.5, h: 0.9, size: 15, color: C.sub, align: 'center', valign: 'top', ls: 1.3 });
    txt(s, '생활인구\n2025. 4Q', { x: G.ml + 5.9, y: baseY + 0.14, w: 3.5, h: 0.9, size: 15, bold: true, color: C.text, align: 'center', valign: 'top', ls: 1.3 });
    box(s, { x: G.ml + 4.34, y: baseY - 2.1, w: 1.94, h: 0.9, fill: C.lime, r: 0.12 });
    txt(s, '× 7.7', { x: G.ml + 4.34, y: baseY - 2.1, w: 1.94, h: 0.9, size: 30, bold: true, color: C.dark, align: 'center', valign: 'middle' });
    const rx = G.ml + 11.04, rw = G.cw - 11.04;
    txt(s, '부안의 인구 위상', { x: rx, y: 2.85, w: rw, h: 0.5, size: 21, bold: true, color: C.dark, valign: 'middle' });
    txt(s, '전북 인구감소지역 10곳 기준 · 2025년', { x: rx, y: 3.36, w: rw, h: 0.34, size: 14, color: C.sub, valign: 'middle' });
    const ranks = [
      { m: '체류인구', rank: '도내 1위', v: '292,141명', p: '2025년 연평균 · 방문 · 통근 인구', hero: true },
      { m: '생활인구', rank: '도내 2위', v: '341,104명', p: '2025년 연평균 · 등록 + 체류 인구', hero: false },
    ];
    ranks.forEach((r, i) => {
      const y = 3.9 + i * 1.66;
      wbox(s, { x: rx, y, w: rw, h: 1.44, fill: C.white, hero: r.hero, line: r.hero ? C.mid : C.line });
      s.addShape('rect', { x: rx, y: y + 0.18, w: 0.16, h: 1.08, fill: { color: r.hero ? C.dark : C.mid }, line: { type: 'none' } });
      txt(s, r.m, { x: rx + 0.44, y: y + 0.2, w: 3, h: 0.4, size: 18, bold: true, color: C.text, valign: 'middle' });
      chip(s, { x: rx + rw - 2.0, y: y + 0.2, w: 1.6, h: 0.46, t: r.rank, fill: r.hero ? C.dark : C.mid, size: 15 });
      txt(s, r.v, { x: rx + 0.44, y: y + 0.62, w: 4.5, h: 0.56, size: 32, bold: true, color: r.hero ? C.dark : C.mid, valign: 'middle' });
      txt(s, r.p, { x: rx + 0.44, y: y + 1.14, w: rw - 0.8, h: 0.28, size: 12, color: C.sub, valign: 'middle' });
    });
    txt(s, '※ 체류·생활인구는 산정 기준이 달라 수치가 다릅니다. 어느 지표로도 부안은 전북 최상위권입니다.', { x: rx, y: 7.35, w: rw, h: 0.8, size: 12.5, color: C.sub, valign: 'top', ls: 1.28 });
    banner(s, hl('행안부는 2026년부터 시설이 아니라 ', '인구유입 효과', '로 기금을 평가합니다.'));
    src(s, '부안군 · 행정안전부 · 국가데이터처 생활인구 산정결과(2025) · 전북일보(2026.6.3)');
  }

  // ══════════════════════════════════════════════════ 1.7 지역브랜드
  {
    const s = pres.addSlide();
    header(s, { n: '1.7', title: '지역브랜드',
      lead: '지역의 이름과 하나의 상품이 결합할 때 브랜드가 됩니다. 영광 하면 굴비, 부안 하면 닭입니다.' });
    const brands = [
      { img: 'gulbi.jpg', place: '영광', prod: '굴비', d: '법성포 굴비. 지역명이 곧 품질 보증이 되어 프리미엄 수산물 브랜드로 자리잡았습니다.' },
      { img: 'insam.jpg', place: '금산', prod: '인삼', d: '국제인삼축제와 인삼시장을 축으로 생산·유통·관광을 묶어 세계 인삼 거래 중심지가 되었습니다.' },
      { img: 'jangryu.jpg', place: '순창', prod: '장류', d: '고추장민속마을·장류 클러스터. 농식품부 K-미식벨트로 이어지는 전북의 성공 사례입니다.', tag: '전북 선례' },
      { img: 'buan_chicken.jpg', place: '부안', prod: '닭', d: '생산(참프레)·문화(계림)·관광(변산)이 이미 한 곳에. 남은 것은 이름을 붙이는 일뿐입니다.', hero: true },
    ];
    const w = 4.44, gap = 0.28, y0 = 2.75;
    brands.forEach((b, i) => {
      const x = G.ml + i * (w + gap);
      wbox(s, { x, y: y0, w, h: 5.55, hero: b.hero, line: b.hero ? C.mid : C.line });
      hex(s, b.img, { x: x + w / 2 - 1.35, y: y0 + 0.3, w: 2.7, h: 2.3 });
      txt(s, b.place, { x: x + 0.3, y: y0 + 2.75, w: 1.5, h: 0.62, size: 28, bold: true, color: C.text, valign: 'middle' });
      txt(s, '=', { x: x + 1.7, y: y0 + 2.75, w: 0.5, h: 0.62, size: 24, bold: true, color: b.hero ? C.mid : C.line, align: 'center', valign: 'middle' });
      txt(s, b.prod, { x: x + 2.2, y: y0 + 2.75, w: 1.9, h: 0.62, size: 28, bold: true, color: b.hero ? C.dark : C.mid, valign: 'middle' });
      if (b.tag) chip(s, { x: x + 0.3, y: y0 + 3.5, w: 1.66, h: 0.4, t: b.tag, fill: C.mid2, size: 13 });
      s.addShape('line', { x: x + 0.3, y: y0 + (b.tag ? 4.05 : 3.55), w: w - 0.6, h: 0, line: { color: C.line, width: 1.25 } });
      txt(s, b.d, { x: x + 0.3, y: y0 + (b.tag ? 4.22 : 3.75), w: w - 0.6, h: 1.7, size: 15, color: C.sub, valign: 'top', ls: 1.3 });
    });
    banner(s, hl('순창은 이미 해냈습니다. 같은 방식으로 ', '부안', '이 다음 차례입니다.'));
    src(s, '농림축산식품부 K-미식벨트 · 각 지자체');
  }
};
