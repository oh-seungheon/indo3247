const L = require('./lib');
const { C, F, G, T } = L;
const { txt, wbox, box, pill, chip, bullet, darrow, header, src, banner, hl, img, hex, ring, stat, section, reg } = L;

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

  section(pres, '02', '닭, 그 이름의 역사', 'THE NAME WE LOST AND FOUND', '계림 설화 · 상징의 회복 · K-Chicken');

  // ══════════════════════════════════════════════════ 2.1 계림 설화
  {
    const s = pres.addSlide();
    header(s, { n: '2.1', title: '계림 설화',
      lead: '건국신화에 등장하는 유일한 가축, 그것이 닭이었습니다.' });
    hex(s, 'gyerim.jpg', { x: G.ml, y: 2.9, w: 7.4, h: 5.2 });
    const rx = G.ml + 8.0, rw = G.cw - 8.0;
    box(s, { x: rx, y: 2.75, w: rw, h: 2.3, fill: C.dark, r: 0.12 });
    s.addShape('rect', { x: rx, y: 2.95, w: 0.14, h: 1.9, fill: { color: C.lime }, line: { type: 'none' } });
    txt(s, '鷄  林', { x: rx + 0.5, y: 3.05, w: 3.2, h: 0.92, size: 46, bold: true, color: C.lime, valign: 'middle', ls: 1.0 });
    txt(s, '신라 국호의 기원', { x: rx + 3.9, y: 3.18, w: 5.6, h: 0.66, size: 22, bold: true, color: C.white, valign: 'middle' });
    txt(s, '김알지가 태어난 계림(鷄林)은 신라 국호의 기원입니다. 한국사에서 닭은 가축이기 전에, 국가의 기원 서사에 등장하는 유일한 동물입니다.', {
      x: rx + 0.5, y: 4.05, w: rw - 1.0, h: 0.86, size: T.body, color: 'E4EFDA', valign: 'top', ls: 1.32 });
    const syms = [
      { t: '새벽', d: '어둠을 여는 유일한 소리.\n하루의 시작을 알리는 존재' },
      { t: '벽사(辟邪)', d: '액운을 쫓는 수호의 상징.\n제사와 혼례 의례의 중심' },
      { t: '희망', d: '한 해의 시작을 여는 십이지.\n새로움과 재생의 표상' },
    ];
    const sw = (rw - 0.6) / 3;
    syms.forEach((sy, i) => {
      const x = rx + i * (sw + 0.3), y = 5.3;
      wbox(s, { x, y, w: sw, h: 2.8, fill: i === 0 ? C.soft : C.white, line: i === 0 ? C.mid : C.line, shadow: false });
      pill(s, { x: x + 0.3, y: y + 0.3, w: sw - 0.6, h: 0.6, t: sy.t, fill: C.mid2, size: 19, align: 'center' });
      txt(s, sy.d, { x: x + 0.26, y: y + 1.15, w: sw - 0.52, h: 1.4, size: 15, color: C.sub, align: 'center', valign: 'top', ls: 1.32 });
    });
    banner(s, hl('한국인에게 닭은 음식이기 전에, 나라의 ', '이름', '이었습니다.'));
    src(s, '『삼국사기』· 『삼국유사』 김알지 탄생설화');
  }

  // ══════════════════════════════════════════════════ 2.2 상징의 회복
  {
    const s = pres.addSlide();
    header(s, { n: '2.2', title: '상징의 회복',
      lead: '20세기 초 조선은 「닭」으로 그려졌습니다. 그 이름을 되찾는 일에서 축제가 시작됩니다.' });
    const stages = [
      { no: '①', tag: '1900 ~ 1945', head: '왜곡', hero: false, fill: C.white, mk: '9AA48F',
        li: ['일본 시사만화 속 조선의 도상화', '새장에 갇힌 닭 — 자립 불능', '서로 싸우는 닭 — 무지와 내분'] },
      { no: '②', tag: '작동 구조', head: '시선의 정치', hero: false, fill: C.soft, mk: C.mid,
        li: ['반복된 이미지가 인식을 규율한다', '침략을 시혜로 포장하는 서사', '자기비하의 내면화'] },
      { no: '③', tag: '2028 ~', head: '회복', hero: true, fill: C.dark, mk: C.lime,
        li: ['K-Chicken, 세계가 사랑하는 한식', '상징의 주체를 되찾는 일', '부안이 그 선언의 장소가 된다'] },
    ];
    const w = 5.94, gap = 0.42, y0 = 2.75;
    stages.forEach((st, i) => {
      const x = G.ml + i * (w + gap);
      if (st.hero) box(s, { x, y: y0, w, h: 4.55, fill: C.dark, r: 0.10 });
      else wbox(s, { x, y: y0, w, h: 4.55, fill: st.fill, line: i === 1 ? C.mid : C.line, shadow: false });
      txt(s, st.no, { x: x + 0.42, y: y0 + 0.3, w: 0.8, h: 0.56, size: 26, bold: true, color: st.hero ? C.lime : C.mid, valign: 'middle' });
      txt(s, st.tag, { x: x + 1.24, y: y0 + 0.34, w: w - 1.66, h: 0.48, size: 15, color: st.hero ? 'CFE3BF' : C.sub, valign: 'middle' });
      txt(s, st.head, { x: x + 0.42, y: y0 + 1.0, w: w - 0.84, h: 0.7, size: 30, bold: true, color: st.hero ? C.white : C.text, valign: 'middle' });
      s.addShape('line', { x: x + 0.42, y: y0 + 1.84, w: w - 0.84, h: 0, line: { color: st.hero ? '4A6B40' : C.line, width: 1.25 } });
      st.li.forEach((t, j) => bullet(s, x + 0.46, y0 + 2.06 + j * 0.78, t, { mk: st.mk, w: w - 1.0, h: 0.66, valign: 'top', ls: 1.3, color: st.hero ? 'E4EFDA' : C.text }));
      if (i < 2) darrow(s, x + w + 0.06, y0 + 2.2, gap - 0.5);
    });
    box(s, { x: G.ml, y: 7.5, w: G.cw, h: 0.7, fill: C.soft, r: 0.08 });
    txt(s, '학술 근거 · 한상일 · 한정선, 『일본, 만화로 제국을 그리다 — 조선병탄과 시선의 정치』, 일조각, 2006 (2008 대한민국학술원 우수학술도서 / 2010 일본어판)', {
      x: G.ml + 0.44, y: 7.5, w: G.cw - 0.88, h: 0.7, size: 15, color: C.sub, valign: 'middle' });
    banner(s, hl('닭은 원래 새벽이었습니다. ', '부안', '이 그 이름을 되찾습니다.'));
  }

  // ══════════════════════════════════════════════════ 2.3 K-Chicken
  {
    const s = pres.addSlide();
    header(s, { n: '2.3', title: 'K-Chicken',
      lead: '치킨은 해외 한식 소비자가 가장 선호하는 메뉴입니다. 그 뿌리를 부안에 세웁니다.' });
    img(s, 'kchicken.jpg', { x: G.ml, y: 2.75, w: 12.6, h: 2.4 });
    const rx = G.ml + 13.04, rw = G.cw - 13.04;
    [{ v: '1위', l: '해외 한식 선호 메뉴\n치킨 14% (김치 9.5%)', fill: C.dark },
     { v: '1위', l: '방한 외래관광객\n주요 활동 · 식도락', fill: C.mid2 }]
      .forEach((k, i) => {
        const y = 2.75 + i * 1.28;
        box(s, { x: rx, y, w: rw, h: 1.12, fill: k.fill, r: 0.1 });
        txt(s, k.v, { x: rx + 0.36, y, w: 1.7, h: 1.12, size: 34, bold: true, color: C.lime, valign: 'middle', ls: 1.0 });
        txt(s, k.l, { x: rx + 2.2, y, w: rw - 2.5, h: 1.12, size: 14, color: 'E4EFDA', valign: 'middle', ls: 1.28 });
      });
    const nodes = [
      { era: '삼국시대', t: '계림', d: '나라의 이름' },
      { era: '조선 ~ 근대', t: '삼계탕 · 백숙', d: '민족의 보양식' },
      { era: '1970 ~ 2000', t: '치킨 문화', d: '국민 야식' },
      { era: '2000 ~ 현재', t: 'K-Chicken', d: '세계의 미식' },
      { era: '2028 ~', t: '부  안', d: '이름의 뿌리', on: true },
    ];
    const nw = 3.36, ng = 0.3, ny = 5.55;
    s.addShape('line', { x: G.ml + 1.4, y: ny + 0.48, w: G.cw - 2.8, h: 0, line: { color: C.line, width: 2 } });
    nodes.forEach((n, i) => {
      const x = G.ml + i * (nw + ng), r = n.on ? 0.32 : 0.2;
      s.addShape('ellipse', { x: x + nw / 2 - r / 2, y: ny + 0.48 - r / 2, w: r, h: r, fill: { color: n.on ? C.lime : C.mid }, line: { color: C.white, width: 3 } });
      txt(s, n.era, { x, y: ny - 0.06, w: nw, h: 0.38, size: 14, color: C.sub, align: 'center', valign: 'middle' });
      if (n.on) box(s, { x, y: ny + 0.92, w: nw, h: 1.44, fill: C.dark, r: 0.1 });
      else wbox(s, { x, y: ny + 0.92, w: nw, h: 1.44, fill: C.white, line: C.line, shadow: false });
      txt(s, n.t, { x, y: ny + 1.12, w: nw, h: 0.56, size: n.on ? 26 : 22, bold: true, color: n.on ? C.white : C.text, align: 'center', valign: 'middle' });
      txt(s, n.d, { x, y: ny + 1.72, w: nw, h: 0.44, size: 15, color: n.on ? C.lime : C.sub, align: 'center', valign: 'middle' });
    });
    txt(s, '농림축산식품부는 치킨을 「외국인이 가장 선호하는 한식 메뉴」로 규정하고 2026년 K-미식벨트의 주제로 선정했습니다.', {
      x: G.ml, y: 8.35, w: G.cw, h: 0.42, size: 15, color: C.sub, valign: 'middle', align: 'center' });
    banner(s, hl('2,000년의 이름이 지금 세계로 갑니다. 그 출발점을 ', '부안', '에 둡니다.'));
    src(s, '농림축산식품부(2026.3.19 / 6.29) · 해외 한식 소비자 조사 · 외래관광객 조사');
  }

  section(pres, '03', '사업 계획', 'THE PLAN', '사계절 전략 · 사업 개요 · 공간 구성 · 시그니처 · 동물복지');

  // ══════════════════════════════════════════════════ 3.1 사계절 전략
  {
    const s = pres.addSlide();
    header(s, { n: '3.1', title: '사계절 전략',
      lead: '새 축제를 만드는 것이 아니라, 비어 있는 계절을 채웁니다.' });
    const seasons = [
      { img: 'masil.jpg', tag: '5월 · 봄', name: '부안마실축제', hero: false,
        rows: [['회차', '제13회 (2026)'], ['기간', '5월 2일 ~ 5일 · 4일간'], ['장소', '부안해뜰마루'], ['성격', '가족 · 정원 · 체험']],
        note: '개막 첫날 약 59,000명 방문' },
      { img: 'autumn.jpg', tag: '10월 · 가을', name: '부안 닭축제 (신설)', hero: true,
        rows: [['회차', '제1회 (2028 목표)'], ['기간', '10월 중 · 3일간'], ['장소', '변산반도 · 새만금 연계'], ['성격', '산업 · 미식 · 문화']],
        note: '목표 15만명 → 3년차 40만명' },
    ];
    const w = 9.0, gap = 0.6, y0 = 2.75;
    seasons.forEach((sn, i) => {
      const x = G.ml + i * (w + gap);
      wbox(s, { x, y: y0, w, h: 4.0, hero: sn.hero, line: sn.hero ? C.mid : C.line });
      img(s, sn.img, { x: x + 0.34, y: y0 + 0.34, w: 3.4, h: 2.56 });
      pill(s, { x: x + 3.96, y: y0 + 0.34, w: 2.4, h: 0.5, t: sn.tag, fill: sn.hero ? C.dark : C.mid2, size: 15, align: 'center' });
      txt(s, sn.name, { x: x + 3.96, y: y0 + 0.98, w: w - 4.3, h: 0.56, size: 24, bold: true, color: sn.hero ? C.dark : C.text, valign: 'middle' });
      sn.rows.forEach((r, j) => {
        const ry = y0 + 1.62 + j * 0.44;
        txt(s, r[0], { x: x + 3.96, y: ry, w: 1.0, h: 0.4, size: 14, color: C.sub, valign: 'middle' });
        txt(s, r[1], { x: x + 5.0, y: ry, w: w - 5.3, h: 0.4, size: 16, bold: true, color: C.text, valign: 'middle' });
      });
      box(s, { x: x + 0.34, y: y0 + 3.36, w: w - 0.68, h: 0.5, fill: sn.hero ? C.soft : 'F0F0F0', r: 0.07 });
      txt(s, sn.note, { x: x + 0.34, y: y0 + 3.36, w: w - 0.68, h: 0.5, size: 17, bold: true, color: sn.hero ? C.dark : C.mid2, align: 'center', valign: 'middle' });
    });
    txt(s, '두 축제가 공유하는 것', { x: G.ml, y: 7.0, w: 6, h: 0.4, size: 16, bold: true, color: C.dark, valign: 'middle' });
    const shares = [
      { t: '조직 공유', d: '부안군대표축제추진위원회 운영 노하우 승계' },
      { t: '인프라 공유', d: '부안해뜰마루 등 기존 축제장 인프라 활용' },
      { t: '인력 공유', d: '축제 운영 인력 · 자원봉사 풀 연중 가동' },
    ];
    const sw = 5.94, sg = 0.42;
    shares.forEach((sh, i) => {
      const x = G.ml + i * (sw + sg), y = 7.45;
      wbox(s, { x, y, w: sw, h: 0.82, fill: C.white, line: C.line, shadow: false });
      chip(s, { x: x + 0.24, y: y + 0.18, w: 1.5, h: 0.46, t: sh.t, fill: C.mid, size: 14 });
      txt(s, sh.d, { x: x + 1.9, y, w: sw - 2.1, h: 0.82, size: 14, color: C.sub, valign: 'middle', ls: 1.2 });
    });
    banner(s, hl("마실축제가 '봄의 부안'을 만들었다면, 닭축제는 '", '가을의 부안', "'을 만듭니다."));
    src(s, '부안군 · 부안마실축제 공식 · 다음뉴스(2026.5.3)');
  }

  // ══════════════════════════════════════════════════ 3.2 사업 개요
  {
    const s = pres.addSlide();
    header(s, { n: '3.2', title: '사업 개요',
      lead: '3일의 행사가 아니라, 365일 브랜드의 출발점입니다.' });
    img(s, 'venue.jpg', { x: G.ml, y: 2.68, w: G.cw, h: 2.2 });
    const rows = [
      ['명칭', '부안 닭축제 (가칭)', '주최', '부안군 · 전북특별자치도'],
      ['시기', '매년 10월 중 3일간', '주관', '부안군대표축제추진위원회'],
      ['장소', '변산반도 · 새만금 연계', '협력', '참프레 · 농식품부 · 문체부'],
      ['성격', '산업연계형 문화관광축제', '목표', '1년차 15만 → 3년차 40만명'],
      ['개최', '2028년 제1회', '재원', '지방소멸대응기금 · 국비 · 기업협찬'],
    ];
    const ty = 4.98, cw = [1.5, 6.6, 1.5, 8.4];
    rows.forEach((r, i) => {
      const y = ty + i * 0.54;
      if (i % 2 === 0) box(s, { x: G.ml, y, w: G.cw, h: 0.54, fill: C.soft, r: 0 });
      let x = G.ml;
      r.forEach((cell, j) => {
        const lab = j % 2 === 0;
        txt(s, cell, { x: x + (lab ? 0.3 : 0.16), y, w: cw[j] - 0.3, h: 0.54, size: lab ? 15 : T.body, bold: lab, color: lab ? C.dark : C.text, valign: 'middle' });
        x += cw[j];
      });
    });
    const gy = 7.78;
    txt(s, '3개년 방문객 목표', { x: G.ml, y: gy, w: 5, h: 0.4, size: 16, bold: true, color: C.dark, valign: 'middle' });
    [['1년차 2028', '15만명', C.mid], ['2년차 2029', '25만명', C.mid2], ['3년차 2030', '40만명', C.dark]]
      .forEach((g, i) => {
        const x = G.ml + i * 6.2, y = gy + 0.44;
        box(s, { x, y, w: 5.94, h: 0.82, fill: g[2], r: 0.1 });
        txt(s, g[0], { x: x + 0.4, y, w: 2.4, h: 0.84, size: 16, color: 'E4EFDA', valign: 'middle' });
        txt(s, g[1], { x: x + 2.7, y, w: 2.9, h: 0.84, size: 28, bold: true, color: C.white, align: 'right', valign: 'middle' });
      });
    banner(s, hl('첫해 15만은 지킬 수 있는 숫자입니다. 지킨 숫자만이 다음 ', '예산', '을 부릅니다.'));
  }

  // ══════════════════════════════════════════════════ 3.3 공간 구성
  {
    const s = pres.addSlide();
    header(s, { n: '3.3', title: '공간 구성',
      lead: '뿌리에서 시작해 맛으로 이어지고 문화로 끝납니다.' });
    const zones = [
      { no: '01', en: 'ORIGIN', kr: '뿌리존', q: '어디서 왔나', head: C.dark,
        li: ['참프레 견학 연계 셔틀', '익산 치킨로드 연계 패스', '동물복지 인증 현장 체험'] },
      { no: '02', en: 'TASTE', kr: '미식존', q: '어떤 맛인가', head: C.mid,
        li: ['K-치킨벨트 30선 초청 부스', '전국 닭요리 명인전', '부안 농특산물 직거래장'] },
      { no: '03', en: 'CULTURE', kr: '문화존', q: '왜 소중한가', head: C.mid2,
        li: ['계림 서사관 · 닭 문화 전시', '야간 문화공연', '변산 해안 불꽃 피날레'] },
    ];
    const w = 5.94, gap = 0.42, y0 = 2.75, H = 5.55;
    zones.forEach((z, i) => {
      const x = G.ml + i * (w + gap);
      wbox(s, { x, y: y0, w, h: H });
      s.addShape('roundRect', { x, y: y0, w, h: 1.34, fill: { color: z.head }, rectRadius: 0.10, line: { type: 'none' } });
      s.addShape('rect', { x, y: y0 + 0.9, w, h: 0.44, fill: { color: z.head }, line: { type: 'none' } });
      txt(s, z.no, { x: x + 0.42, y: y0 + 0.24, w: 1.4, h: 0.4, size: 17, bold: true, color: C.lime, valign: 'middle' });
      txt(s, z.en, { x: x + w - 2.6, y: y0 + 0.26, w: 2.2, h: 0.36, size: 13, color: 'CFE3BF', align: 'right', valign: 'middle', cs: 2 });
      txt(s, z.kr, { x: x + 0.42, y: y0 + 0.62, w: w - 0.84, h: 0.6, size: 30, bold: true, color: C.white, valign: 'middle' });
      z.li.forEach((t, j) => bullet(s, x + 0.46, y0 + 1.7 + j * 0.82, t, { mk: z.head, w: w - 1.0, h: 0.7, valign: 'top', ls: 1.3 }));
      s.addShape('roundRect', { x: x + 0.42, y: y0 + H - 0.86, w: w - 0.84, h: 0.56, fill: { color: C.soft }, rectRadius: 0.08, line: { color: z.head, width: 1 } });
      txt(s, '"' + z.q + '"', { x: x + 0.42, y: y0 + H - 0.86, w: w - 0.84, h: 0.56, size: 17, bold: true, italic: true, color: z.head, align: 'center', valign: 'middle' });
      if (i < 2) s.addShape('rightArrow', { x: x + w + 0.03, y: y0 + 2.5, w: 0.28, h: 0.28, fill: { color: C.mid }, line: { type: 'none' } });
    });
    banner(s, hl('먹고 끝나는 축제가 아니라, ', '알고 먹는', ' 축제입니다.'));
  }

  // ══════════════════════════════════════════════════ 3.4 시그니처
  {
    const s = pres.addSlide();
    header(s, { n: '3.4', title: '시그니처',
      lead: '백 개의 프로그램보다, 사진 한 장으로 기억되는 세 개가 낫습니다.' });
    const sig = [
      { img: 'sig_a.jpg', no: '01', t: '새벽 계명식 (鷄鳴式)', li: ['축제 첫날 일출 · 변산 해안', '계림 설화 재현 · 액운 물리기', '부안에서만 가능한 의식 콘텐츠'] },
      { img: 'sig_b.jpg', no: '02', t: '전국 닭요리 명인전', li: ['K-치킨벨트 30선 지역 대표 초청', '춘천 · 안동 · 속초 · 수원 · 목포', '관람객 투표 + 레시피 아카이빙'] },
      { img: 'sig_c.jpg', no: '03', t: '변산 불꽃 피날레', li: ['폐막일 해안 배경 불꽃쇼', '체류시간 연장 → 숙박 유도', '안전관리계획 의무 대상'] },
    ];
    const w = 5.94, gap = 0.42, y0 = 2.75;
    sig.forEach((g, i) => {
      const x = G.ml + i * (w + gap);
      wbox(s, { x, y: y0, w, h: 5.55 });
      img(s, g.img, { x: x + 0.28, y: y0 + 0.28, w: w - 0.56, h: 2.4 });
      chip(s, { x: x + 0.4, y: y0 + 2.92, w: 0.86, h: 0.5, t: g.no, fill: C.dark, size: 17 });
      txt(s, g.t, { x: x + 1.4, y: y0 + 2.92, w: w - 1.7, h: 0.5, size: 21, bold: true, color: C.text, valign: 'middle' });
      g.li.forEach((t, j) => bullet(s, x + 0.44, y0 + 3.72 + j * 0.5, t, { mk: C.mid, w: w - 1.0, h: 0.44, size: 16, color: C.sub }));
    });
    banner(s, hl('축제의 성패는 프로그램 수가 아니라, ', '기억되는 한 장면', '에서 갈립니다.'));
  }

  // ══════════════════════════════════════════════════ 3.5 동물복지
  {
    const s = pres.addSlide();
    header(s, { n: '3.5', title: '동물복지',
      lead: '닭을 먹는 축제이기에, 더 정직해야 합니다. 피하지 않고 정면으로 다룹니다.' });
    box(s, { x: G.ml, y: 2.75, w: G.cw, h: 1.18, fill: 'FBEAE8', r: 0.1 });
    s.addShape('roundRect', { x: G.ml, y: 2.75, w: G.cw, h: 1.18, fill: { type: 'none' }, rectRadius: 0.1, line: { color: C.warn, width: 1.75 } });
    txt(s, '예상되는 문제 제기', { x: G.ml + 0.44, y: 2.9, w: 5, h: 0.38, size: 15, bold: true, color: C.warn, valign: 'middle' });
    txt(s, '"동물을 소비하는 축제가 생명존중을 말할 수 있는가"', { x: G.ml + 0.44, y: 3.3, w: G.cw - 0.88, h: 0.48, size: 22, bold: true, color: C.text, valign: 'middle' });
    img(s, 'welfare.jpg', { x: G.ml, y: 4.15, w: 6.0, h: 4.0 });
    const rx = G.ml + 6.44, rw = G.cw - 6.44;
    const answers = [
      { t: '인증된 사실로 답한다', d: '참프레는 2015년 국내 최초 동물복지 육용계 인증과 동물복지 도축장 지정을 받았습니다. 부안은 한국에서 동물복지 축산을 가장 먼저 시작한 곳입니다.' },
      { t: '감추지 않고 보여준다', d: '사육 · 운송 · 도계 전 과정을 공개 견학합니다. 알고 먹는 것이 윤리의 출발점입니다.' },
      { t: '다음 세대에 가르친다', d: '어린이 생명존중 교육 프로그램을 축제 기간과 연중 상설로 운영합니다.' },
    ];
    answers.forEach((a, i) => {
      const y = 4.15 + i * 1.38;
      wbox(s, { x: rx, y, w: rw, h: 1.22, fill: i === 0 ? C.soft : C.white, line: i === 0 ? C.mid : C.line, shadow: false });
      chip(s, { x: rx + 0.3, y: y + 0.33, w: 0.56, h: 0.56, t: String(i + 1), fill: C.dark, size: 18 });
      txt(s, a.t, { x: rx + 1.06, y: y + 0.14, w: rw - 1.4, h: 0.42, size: 19, bold: true, color: C.dark, valign: 'middle' });
      txt(s, a.d, { x: rx + 1.06, y: y + 0.56, w: rw - 1.4, h: 0.6, size: 15, color: C.sub, valign: 'top', ls: 1.25 });
    });
    banner(s, hl('부안은 동물복지를 마케팅이 아니라 ', '이력', '으로 증명합니다.'));
    src(s, '참프레 · 농림축산식품부 동물복지축산농장 인증제도');
  }
};
