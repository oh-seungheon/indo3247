const L = require('./lib');
const { C, F, G, T } = L;
const { txt, card, header, src, banner, img, stat, section, reg } = L;

reg('gyerim.jpg',   '계림(鷄林) 신라 설화 / 전통 회화풍 · 저작권 확인 필수', '1400×1100px');
reg('kchicken.jpg', 'K-Chicken 글로벌 — 해외 매장 또는 외국인 취식', '2000×1100px · 가로형');
reg('masil.jpg',    '부안마실축제 현장 (2026.5 · 부안해뜰마루)', '1400×1000px · 부안군 제공 요청');
reg('autumn.jpg',   '가을 부안 — 변산반도 해안 또는 새만금 일몰', '1400×1000px');
reg('venue.jpg',    '축제장 조감도 또는 행사장 전경', '2000×900px');
reg('sig_a.jpg',    '변산 해안 일출 (새벽 계명식 컨셉)', '1300×950px');
reg('sig_b.jpg',    '닭요리 경연 / 셰프 조리 장면', '1300×950px');
reg('sig_c.jpg',    '해안 불꽃놀이', '1300×950px');
reg('welfare.jpg',  '동물복지 인증 농장 / 어린이 체험', '1600×1000px');

module.exports = function (pres) {

  section(pres, '02', '닭, 그 이름의 역사', 'THE NAME WE LOST AND FOUND');

  // ══════════════════════════════════════════════════
  // S8 — 계림
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 02', kr: '계림 설화', en: 'The Origin',
      lead: '건국신화에 등장하는 유일한 가축, 그것이 닭이었습니다.' });

    img(s, 'gyerim.jpg', { x: G.ml, y: G.bodyY, w: 7.6, h: 5.20 });

    const rx = G.ml + 8.04, rw = G.cw - 8.04;
    card(s, { x: rx, y: G.bodyY, w: rw, h: 2.32, fill: C.navy });
    txt(s, '鷄  林', { x: rx + 0.5, y: G.bodyY + 0.32, w: 3.2, h: 0.92, size: 46, bold: true, color: C.cyan, valign: 'middle', ls: 1.0 });
    txt(s, '신라 국호의 기원', { x: rx + 3.9, y: G.bodyY + 0.44, w: 5.6, h: 0.66, size: 22, bold: true, color: C.white, valign: 'middle' });
    txt(s, '김알지가 태어난 계림(鷄林)은 신라 국호의 기원입니다.\n한국사에서 닭은 가축이기 전에, 국가의 기원 서사에 등장하는 유일한 동물입니다.', {
      x: rx + 0.5, y: G.bodyY + 1.32, w: rw - 1.0, h: 0.86, size: T.body, color: C.light, valign: 'top', ls: 1.32 });

    const syms = [
      { t: '새벽', d: '어둠을 여는 유일한 소리.\n하루의 시작을 알리는 존재' },
      { t: '벽사(辟邪)', d: '액운을 쫓는 수호의 상징.\n제사와 혼례 의례의 중심' },
      { t: '희망', d: '한 해의 시작을 여는 십이지.\n새로움과 재생의 표상' },
    ];
    const sw = (rw - 0.6) / 3;
    syms.forEach((sy, i) => {
      const x = rx + i * (sw + 0.30);
      const y = G.bodyY + 2.60;
      card(s, { x, y, w: sw, h: 2.60, fill: i === 0 ? C.light : C.card });
      txt(s, sy.t, { x: x + 0.26, y: y + 0.34, w: sw - 0.52, h: 0.56, size: 24, bold: true, color: C.blue, align: 'center', valign: 'middle' });
      s.addShape('line', { x: x + 0.7, y: y + 1.02, w: sw - 1.4, h: 0, line: { color: C.edge, width: 1.25 } });
      txt(s, sy.d, { x: x + 0.26, y: y + 1.20, w: sw - 0.52, h: 1.2, size: 16, color: C.sub, align: 'center', valign: 'top', ls: 1.32 });
    });

    banner(s, '한국인에게 닭은 음식이기 전에, 나라의 이름이었습니다.');
    src(s, '『삼국사기』· 『삼국유사』 김알지 탄생설화');
  }

  // ══════════════════════════════════════════════════
  // S9 — 상징의 회복
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 02', kr: '상징의 회복', en: 'Reclaiming the Name',
      lead: '20세기 초 조선은 「닭」으로 그려졌습니다. 그 이름을 되찾는 일에서 축제가 시작됩니다.' });

    const stages = [
      { no: '①', tag: '1900 ~ 1945', head: '왜곡', fill: C.card, hc: C.sub, tc: C.sub,
        li: ['일본 시사만화 속 조선의 도상화', '새장에 갇힌 닭 — 자립 불능', '서로 싸우는 닭 — 무지와 내분'] },
      { no: '②', tag: '작동 구조', head: '시선의 정치', fill: C.tint, hc: C.text, tc: C.text,
        li: ['반복된 이미지가 인식을 규율한다', '침략을 시혜로 포장하는 서사', '자기비하의 내면화'] },
      { no: '③', tag: '2028 ~', head: '회복', fill: C.navy, hc: C.cyan, tc: C.light,
        li: ['K-Chicken, 세계가 사랑하는 한식', '상징의 주체를 되찾는 일', '부안이 그 선언의 장소가 된다'] },
    ];
    const w = 5.7, gap = 0.45;
    stages.forEach((st, i) => {
      const x = G.ml + i * (w + gap);
      card(s, { x, y: G.bodyY, w, h: 4.52, fill: st.fill, shadow: i === 2 });
      txt(s, st.no, { x: x + 0.42, y: G.bodyY + 0.32, w: 0.8, h: 0.56, size: 26, bold: true, color: st.hc, valign: 'middle' });
      txt(s, st.tag, { x: x + 1.24, y: G.bodyY + 0.36, w: w - 1.66, h: 0.48, size: 15, color: st.tc, valign: 'middle' });
      txt(s, st.head, { x: x + 0.42, y: G.bodyY + 1.00, w: w - 0.84, h: 0.70, size: 30, bold: true, color: st.hc, valign: 'middle' });
      s.addShape('line', { x: x + 0.42, y: G.bodyY + 1.84, w: w - 0.84, h: 0, line: { color: i === 2 ? '3A3AA8' : C.edge, width: 1.25 } });
      st.li.forEach((t, j) => {
        const y = G.bodyY + 2.08 + j * 0.78;
        s.addShape('ellipse', { x: x + 0.46, y: y + 0.16, w: 0.13, h: 0.13, fill: { color: i === 2 ? C.cyan : C.blueMid }, line: { type: 'none' } });
        txt(s, t, { x: x + 0.80, y, w: w - 1.24, h: 0.66, size: T.body, color: st.tc, valign: 'top', ls: 1.3 });
      });
      if (i < 2) s.addShape('rightArrow', { x: x + w + 0.06, y: G.bodyY + 2.10, w: 0.33, h: 0.32, fill: { color: C.edge }, line: { type: 'none' } });
    });

    card(s, { x: G.ml, y: G.bodyY + 4.72, w: G.cw, h: 0.66, fill: C.card });
    txt(s, '학술 근거 · 한상일 · 한정선, 『일본, 만화로 제국을 그리다 — 조선병탄과 시선의 정치』, 일조각, 2006 (2008 대한민국학술원 우수학술도서 / 2010 일본어판 출간)', {
      x: G.ml + 0.44, y: G.bodyY + 4.72, w: G.cw - 0.88, h: 0.66, size: 15, color: C.sub, valign: 'middle' });

    banner(s, '닭은 원래 새벽이었습니다. 부안이 그 이름을 되찾습니다.');
  }

  // ══════════════════════════════════════════════════
  // S10 — K-Chicken
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 02', kr: 'K-Chicken', en: 'The Name Today',
      lead: '치킨은 해외 한식 소비자가 가장 선호하는 메뉴입니다. 그 뿌리를 부안에 세웁니다.' });

    img(s, 'kchicken.jpg', { x: G.ml, y: G.bodyY, w: 12.6, h: 2.30 });

    const rx = G.ml + 13.04, rw = G.cw - 13.04;
    [{ v: '1위', l: '해외 한식 소비자 선호 메뉴\n치킨 14% (김치 9.5% · 비빔밥 8.2%)', fill: C.blue },
     { v: '1위', l: '방한 외래관광객 주요 활동\n식도락 · K-Food 소비', fill: C.navy }]
      .forEach((k, i) => {
        const y = G.bodyY + i * 1.22;
        card(s, { x: rx, y, w: rw, h: 1.08, fill: k.fill });
        txt(s, k.v, { x: rx + 0.36, y, w: 2.0, h: 1.08, size: 34, bold: true, color: C.cyan, valign: 'middle', ls: 1.0 });
        txt(s, k.l, { x: rx + 2.44, y, w: rw - 2.80, h: 1.08, size: 15, color: C.light, valign: 'middle', ls: 1.28 });
      });

    // 타임라인
    const nodes = [
      { era: '삼국시대', t: '계림', d: '나라의 이름' },
      { era: '조선 ~ 근대', t: '삼계탕 · 백숙', d: '민족의 보양식' },
      { era: '1970 ~ 2000', t: '치킨 문화', d: '국민 야식' },
      { era: '2000 ~ 현재', t: 'K-Chicken', d: '세계의 미식' },
      { era: '2028 ~', t: '부  안', d: '이름의 뿌리', on: true },
    ];
    const nw = 3.36, ng = 0.30, ny = G.bodyY + 2.86;
    s.addShape('line', { x: G.ml + 1.4, y: ny + 0.48, w: G.cw - 2.8, h: 0, line: { color: C.edge, width: 2 } });
    nodes.forEach((n, i) => {
      const x = G.ml + i * (nw + ng);
      const r = n.on ? 0.32 : 0.20;
      s.addShape('ellipse', { x: x + nw / 2 - r / 2, y: ny + 0.48 - r / 2, w: r, h: r,
        fill: { color: n.on ? C.cyan : C.blueMid }, line: { color: C.white, width: 3 } });
      txt(s, n.era, { x, y: ny - 0.06, w: nw, h: 0.38, size: 14, color: C.sub, align: 'center', valign: 'middle' });
      card(s, { x, y: ny + 0.92, w: nw, h: 1.44, fill: n.on ? C.blue : C.card, shadow: n.on });
      txt(s, n.t, { x, y: ny + 1.12, w: nw, h: 0.56, size: n.on ? 26 : 22, bold: true, color: n.on ? C.white : C.text, align: 'center', valign: 'middle' });
      txt(s, n.d, { x, y: ny + 1.72, w: nw, h: 0.44, size: 15, color: n.on ? C.light : C.sub, align: 'center', valign: 'middle' });
    });

    txt(s, '농림축산식품부는 치킨을 「외국인이 가장 선호하는 한식 메뉴」로 규정하고 2026년 K-미식벨트의 주제로 선정했습니다.', {
      x: G.ml, y: G.bodyY + 4.86, w: G.cw, h: 0.42, size: 15, color: C.sub, valign: 'middle' });

    banner(s, '2,000년의 이름이 지금 세계로 갑니다. 그 출발점을 부안에 둡니다.');
    src(s, '농림축산식품부(2026.3.19 / 6.29) · 해외 한식 소비자 조사 · 외래관광객 조사');
  }

  // ══════════════════════════════════════════════════
  section(pres, '03', '사업 계획', 'THE PLAN');

  // ══════════════════════════════════════════════════
  // S11 — 사계절
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 03', kr: '사계절 전략', en: 'Two Seasons',
      lead: '새 축제를 만드는 것이 아니라, 비어 있는 계절을 채웁니다.' });

    const seasons = [
      { img: 'masil.jpg', tag: '5월 · 봄', name: '부안마실축제', fill: C.card, ac: C.blueMid,
        rows: [['회차', '제13회 (2026)'], ['기간', '5월 2일 ~ 5일 · 4일간'], ['장소', '부안해뜰마루'], ['성격', '가족 · 정원 · 체험']],
        note: '개막 첫날 약 59,000명 방문' },
      { img: 'autumn.jpg', tag: '10월 · 가을', name: '부안 닭축제 (신설)', fill: C.light, ac: C.blue, on: true,
        rows: [['회차', '제1회 (2028 목표)'], ['기간', '10월 중 · 3일간'], ['장소', '변산반도 · 새만금 연계'], ['성격', '산업 · 미식 · 문화']],
        note: '목표 15만명 → 3년차 40만명' },
    ];
    const w = 8.78, gap = 0.44;
    seasons.forEach((sn, i) => {
      const x = G.ml + i * (w + gap);
      card(s, { x, y: G.bodyY, w, h: 3.94, fill: sn.fill, line: sn.on ? C.blue : null, lw: 2, shadow: sn.on });
      img(s, sn.img, { x: x + 0.34, y: G.bodyY + 0.34, w: 3.4, h: 2.56 });

      s.addShape('roundRect', { x: x + 3.96, y: G.bodyY + 0.34, w: 2.4, h: 0.50, fill: { color: sn.ac }, rectRadius: 0.08, line: { type: 'none' } });
      txt(s, sn.tag, { x: x + 3.96, y: G.bodyY + 0.34, w: 2.4, h: 0.50, size: 15, bold: true, color: C.white, align: 'center', valign: 'middle' });
      txt(s, sn.name, { x: x + 3.96, y: G.bodyY + 0.96, w: w - 4.30, h: 0.56, size: 24, bold: true, color: sn.on ? C.blue : C.text, valign: 'middle' });

      sn.rows.forEach((r, j) => {
        const ry = G.bodyY + 1.62 + j * 0.44;
        txt(s, r[0], { x: x + 3.96, y: ry, w: 1.0, h: 0.40, size: 14, color: C.sub, valign: 'middle' });
        txt(s, r[1], { x: x + 5.02, y: ry, w: w - 5.36, h: 0.40, size: 16, bold: true, color: C.text, valign: 'middle' });
      });
      txt(s, sn.note, { x: x + 0.34, y: G.bodyY + 3.34, w: w - 0.68, h: 0.44, size: 17, bold: true, color: sn.ac, align: 'center', valign: 'middle' });
    });

    txt(s, '두 축제가 공유하는 것', { x: G.ml, y: G.bodyY + 4.16, w: 6, h: 0.42, size: 18, bold: true, color: C.blue, valign: 'middle' });
    const shares = [
      { t: '조직 공유', d: '부안군대표축제추진위원회 운영 노하우 승계' },
      { t: '인프라 공유', d: '부안해뜰마루 등 기존 축제장 인프라 활용' },
      { t: '인력 공유', d: '축제 운영 인력 · 자원봉사 풀 연중 가동' },
    ];
    const sw = 5.7, sg = 0.45;
    shares.forEach((sh, i) => {
      const x = G.ml + i * (sw + sg);
      const y = G.bodyY + 4.62;
      card(s, { x, y, w: sw, h: 0.78, fill: C.white, line: C.edge });
      txt(s, sh.t, { x: x + 0.34, y: y + 0.06, w: sw - 0.68, h: 0.36, size: 17, bold: true, color: C.blue, valign: 'middle' });
      txt(s, sh.d, { x: x + 0.34, y: y + 0.42, w: sw - 0.68, h: 0.32, size: 15, color: C.sub, valign: 'middle' });
    });

    banner(s, "마실축제가 '봄의 부안'을 만들었다면, 닭축제는 '가을의 부안'을 만듭니다.");
    src(s, '부안군 · 부안마실축제 공식 · 다음뉴스(2026.5.3)');
  }

  // ══════════════════════════════════════════════════
  // S12 — 사업 개요
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 03', kr: '사업 개요', en: 'Project Overview',
      lead: '3일의 행사가 아니라, 365일 브랜드의 출발점입니다.' });

    img(s, 'venue.jpg', { x: G.ml, y: G.bodyY, w: G.cw, h: 2.10 });

    const rows = [
      ['명칭', '부안 닭축제 (가칭)', '주최', '부안군 · 전북특별자치도'],
      ['시기', '매년 10월 중 3일간', '주관', '부안군대표축제추진위원회'],
      ['장소', '변산반도 · 새만금 연계', '협력', '참프레 · 농식품부 · 문체부'],
      ['성격', '산업연계형 문화관광축제', '목표', '1년차 15만 → 3년차 40만명'],
      ['개최', '2028년 제1회', '재원', '지방소멸대응기금 · 국비 · 기업협찬'],
    ];
    const ty = G.bodyY + 2.36;
    const cw = [1.5, 6.6, 1.5, 8.4];
    rows.forEach((r, i) => {
      const y = ty + i * 0.62;
      if (i % 2 === 0) s.addShape('rect', { x: G.ml, y, w: G.cw, h: 0.62, fill: { color: C.card }, line: { type: 'none' } });
      let x = G.ml;
      r.forEach((cell, j) => {
        const isLabel = j % 2 === 0;
        txt(s, cell, {
          x: x + (isLabel ? 0.30 : 0.16), y, w: cw[j] - 0.3, h: 0.62,
          size: isLabel ? 15 : T.body, bold: isLabel,
          color: isLabel ? C.blue : C.text, valign: 'middle',
        });
        x += cw[j];
      });
    });

    // 3개년 목표
    const gy = ty + 3.28;
    txt(s, '3개년 방문객 목표', { x: G.ml, y: gy, w: 5, h: 0.42, size: 18, bold: true, color: C.blue, valign: 'middle' });
    [['1년차 2028', '15만명', C.blueMid], ['2년차 2029', '25만명', C.blue], ['3년차 2030', '40만명', C.navy]]
      .forEach((g, i) => {
        const x = G.ml + i * 6.15;
        const y = gy + 0.50;
        card(s, { x, y, w: 5.7, h: 0.92, fill: g[2] });
        txt(s, g[0], { x: x + 0.40, y, w: 2.4, h: 0.92, size: 16, color: C.light, valign: 'middle' });
        txt(s, g[1], { x: x + 2.7, y, w: 2.6, h: 0.92, size: 28, bold: true, color: C.white, align: 'right', valign: 'middle' });
      });

    banner(s, '첫해 15만은 지킬 수 있는 숫자입니다. 지킨 숫자만이 다음 예산을 부릅니다.');
  }

  // ══════════════════════════════════════════════════
  // S13 — 공간 구성
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 03', kr: '공간 구성', en: 'Three Zones',
      lead: '뿌리에서 시작해 맛으로 이어지고 문화로 끝납니다.' });

    const zones = [
      { no: '01', en: 'ORIGIN', kr: '뿌리존', q: '어디서 왔나', fill: C.navy, ac: C.cyan,
        li: ['참프레 견학 연계 셔틀', '익산 치킨로드 연계 패스', '동물복지 인증 현장 체험'] },
      { no: '02', en: 'TASTE', kr: '미식존', q: '어떤 맛인가', fill: C.blue, ac: 'FFE9C9',
        li: ['K-치킨벨트 30선 초청 부스', '전국 닭요리 명인전', '부안 농특산물 직거래장'] },
      { no: '03', en: 'CULTURE', kr: '문화존', q: '왜 소중한가', fill: C.blueMid, ac: C.white,
        li: ['계림 서사관 · 닭 문화 전시', '야간 문화공연', '변산 해안 불꽃 피날레'] },
    ];
    const w = 5.7, gap = 0.45;
    zones.forEach((z, i) => {
      const x = G.ml + i * (w + gap);
      card(s, { x, y: G.bodyY, w, h: 5.20, fill: z.fill, shadow: true });
      txt(s, z.no, { x: x + 0.44, y: G.bodyY + 0.34, w: 1.2, h: 0.5, size: 20, bold: true, color: z.ac, valign: 'middle' });
      txt(s, z.en, { x: x + 1.70, y: G.bodyY + 0.36, w: 3.0, h: 0.46, size: 15, color: z.ac, valign: 'middle', cs: 2 });
      txt(s, z.kr, { x: x + 0.44, y: G.bodyY + 1.00, w: w - 0.88, h: 0.80, size: 34, bold: true, color: C.white, valign: 'middle', ls: 1.0 });
      s.addShape('line', { x: x + 0.44, y: G.bodyY + 1.96, w: w - 0.88, h: 0, line: { color: 'FFFFFF', width: 1 } });
      z.li.forEach((t, j) => {
        const y = G.bodyY + 2.20 + j * 0.80;
        s.addShape('ellipse', { x: x + 0.48, y: y + 0.18, w: 0.13, h: 0.13, fill: { color: z.ac }, line: { type: 'none' } });
        txt(s, t, { x: x + 0.82, y, w: w - 1.26, h: 0.68, size: T.body, color: C.white, valign: 'top', ls: 1.3 });
      });
      s.addShape('roundRect', { x: x + 0.44, y: G.bodyY + 4.42, w: w - 0.88, h: 0.52, fill: { color: 'FFFFFF' }, rectRadius: 0.08, line: { type: 'none' }, });
      txt(s, '"' + z.q + '"', { x: x + 0.44, y: G.bodyY + 4.42, w: w - 0.88, h: 0.52, size: 17, bold: true, italic: true, color: z.fill, align: 'center', valign: 'middle' });
      if (i < 2) s.addShape('rightArrow', { x: x + w + 0.06, y: G.bodyY + 2.34, w: 0.33, h: 0.32, fill: { color: C.edge }, line: { type: 'none' } });
    });

    banner(s, '먹고 끝나는 축제가 아니라, 알고 먹는 축제입니다.');
  }

  // ══════════════════════════════════════════════════
  // S14 — 시그니처
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 03', kr: '시그니처', en: 'Signature Programs',
      lead: '백 개의 프로그램보다, 사진 한 장으로 기억되는 세 개가 낫습니다.' });

    const sig = [
      { img: 'sig_a.jpg', no: '01', t: '새벽 계명식 (鷄鳴式)',
        li: ['축제 첫날 일출 · 변산 해안', '계림 설화 재현 · 액운 물리기', '부안에서만 가능한 의식 콘텐츠'] },
      { img: 'sig_b.jpg', no: '02', t: '전국 닭요리 명인전',
        li: ['K-치킨벨트 30선 지역 대표 초청', '춘천 · 안동 · 속초 · 수원 · 목포', '관람객 투표 + 레시피 아카이빙'] },
      { img: 'sig_c.jpg', no: '03', t: '변산 불꽃 피날레',
        li: ['폐막일 해안 배경 불꽃쇼', '체류시간 연장 → 숙박 유도', '안전관리계획 의무 대상'] },
    ];
    const w = 5.7, gap = 0.45;
    sig.forEach((g, i) => {
      const x = G.ml + i * (w + gap);
      card(s, { x, y: G.bodyY, w, h: 5.20, fill: C.white, line: C.edge, shadow: true });
      img(s, g.img, { x: x + 0.001, y: G.bodyY + 0.001, w, h: 2.44 });
      s.addShape('roundRect', { x: x + 0.40, y: G.bodyY + 2.66, w: 0.86, h: 0.50, fill: { color: C.blue }, rectRadius: 0.08, line: { type: 'none' } });
      txt(s, g.no, { x: x + 0.40, y: G.bodyY + 2.66, w: 0.86, h: 0.50, size: 17, bold: true, color: C.white, align: 'center', valign: 'middle' });
      txt(s, g.t, { x: x + 0.40, y: G.bodyY + 3.28, w: w - 0.80, h: 0.56, size: 22, bold: true, color: C.text, valign: 'middle' });
      g.li.forEach((t, j) => {
        const y = G.bodyY + 3.96 + j * 0.42;
        s.addShape('ellipse', { x: x + 0.44, y: y + 0.14, w: 0.11, h: 0.11, fill: { color: C.blueMid }, line: { type: 'none' } });
        txt(s, t, { x: x + 0.74, y, w: w - 1.14, h: 0.38, size: 16, color: C.sub, valign: 'middle' });
      });
    });

    banner(s, '축제의 성패는 프로그램 수가 아니라, 기억되는 한 장면에서 갈립니다.');
  }

  // ══════════════════════════════════════════════════
  // S15 — 동물복지
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 03', kr: '동물복지', en: 'Animal Welfare',
      lead: '닭을 먹는 축제이기에, 더 정직해야 합니다. 피하지 않고 정면으로 다룹니다.' });

    card(s, { x: G.ml, y: G.bodyY, w: G.cw, h: 1.18, fill: 'FBEAE8', line: C.warn, lw: 1.75 });
    txt(s, '예상되는 문제 제기', { x: G.ml + 0.44, y: G.bodyY + 0.16, w: 5, h: 0.38, size: 15, bold: true, color: C.warn, valign: 'middle' });
    txt(s, '"동물을 소비하는 축제가 생명존중을 말할 수 있는가"', {
      x: G.ml + 0.44, y: G.bodyY + 0.56, w: G.cw - 0.88, h: 0.48, size: 22, bold: true, color: C.text, valign: 'middle' });

    img(s, 'welfare.jpg', { x: G.ml, y: G.bodyY + 1.44, w: 6.0, h: 3.76 });

    const rx = G.ml + 6.44, rw = G.cw - 6.44;
    const answers = [
      { t: '인증된 사실로 답한다', d: '참프레는 2015년 국내 최초 동물복지 육용계 인증과 동물복지 도축장 지정을 받았습니다. 부안은 한국에서 동물복지 축산을 가장 먼저 시작한 곳입니다.' },
      { t: '감추지 않고 보여준다', d: '사육 · 운송 · 도계 전 과정을 공개 견학합니다. 알고 먹는 것이 윤리의 출발점입니다.' },
      { t: '다음 세대에 가르친다', d: '어린이 생명존중 교육 프로그램을 축제 기간과 연중 상설로 운영합니다.' },
    ];
    answers.forEach((a, i) => {
      const y = G.bodyY + 1.44 + i * 1.30;
      card(s, { x: rx, y, w: rw, h: 1.16, fill: i === 0 ? C.light : C.card });
      s.addShape('roundRect', { x: rx + 0.34, y: y + 0.30, w: 0.56, h: 0.56, fill: { color: C.blue }, rectRadius: 0.08, line: { type: 'none' } });
      txt(s, String(i + 1), { x: rx + 0.34, y: y + 0.30, w: 0.56, h: 0.56, size: 18, bold: true, color: C.white, align: 'center', valign: 'middle' });
      txt(s, a.t, { x: rx + 1.10, y: y + 0.14, w: rw - 1.5, h: 0.42, size: 19, bold: true, color: C.blue, valign: 'middle' });
      txt(s, a.d, { x: rx + 1.10, y: y + 0.56, w: rw - 1.5, h: 0.54, size: 16, color: C.sub, valign: 'top', ls: 1.25 });
    });

    banner(s, '부안은 동물복지를 마케팅이 아니라 이력으로 증명합니다.');
    src(s, '참프레 · 농림축산식품부 동물복지축산농장 인증제도');
  }
};
