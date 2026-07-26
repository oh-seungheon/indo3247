const L = require('./lib');
const { C, F, G, T } = L;
const { txt, card, header, src, banner, img, stat, section, reg } = L;

reg('closing.jpg', '부안 변산 일출 또는 축제 야경 (마무리 이미지)', '2800×1600px 이상');

module.exports = function (pres) {

  section(pres, '04', '검증과 리스크', 'VALIDATION & RISK');

  // ══════════════════════════════════════════════════
  // S16 — 경쟁 분석
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 04', kr: '경쟁 분석', en: 'Competitive Position',
      lead: '경쟁이 아니라 보완입니다. 누구도 「산업 기반 위의 가족형 축제」를 하고 있지 않습니다.' });

    const cols = ['구분', '대구 치맥페스티벌', '익산 치킨로드', '부안 닭축제'];
    const data = [
      ['주체', '지자체 · 협회', '기업 (하림)', '지자체 + 기업'],
      ['형태', '연 1회 대형 축제', '상설 견학 프로그램', '연 1회 축제 + 상설 연계'],
      ['방문 단위', '개인 · 청년', '단체 · 학생', '가족 · 관광객'],
      ['핵심 축', '소비 · 유흥', '산업 · 교육', '산업 + 미식 + 관광'],
      ['규모', '115만명 (2025)', '연 수천명 규모', '15만 → 40만 (목표)'],
    ];
    const tw = 12.2, colW = [2.0, 3.5, 3.2, 3.5];
    let cx = G.ml;
    cols.forEach((c, i) => {
      const last = i === 3;
      s.addShape('rect', { x: cx, y: G.bodyY, w: colW[i], h: 0.72, fill: { color: last ? C.blue : C.navy }, line: { type: 'none' } });
      txt(s, c, { x: cx, y: G.bodyY, w: colW[i], h: 0.72, size: 17, bold: true, color: last ? C.cyan : C.white, align: 'center', valign: 'middle' });
      cx += colW[i];
    });
    data.forEach((row, r) => {
      const y = G.bodyY + 0.72 + r * 0.84;
      let x = G.ml;
      row.forEach((cell, i) => {
        const last = i === 3;
        s.addShape('rect', { x, y, w: colW[i], h: 0.84,
          fill: { color: last ? C.light : (r % 2 ? C.card : C.white) },
          line: { color: C.edge, width: 0.75 } });
        txt(s, cell, { x: x + 0.14, y, w: colW[i] - 0.28, h: 0.84,
          size: i === 0 ? 16 : T.body, bold: (i === 0 || last),
          color: i === 0 ? C.blue : C.text, align: 'center', valign: 'middle' });
        x += colW[i];
      });
    });

    // 포지셔닝
    const mx = G.ml + tw + 0.44, mw = G.cw - tw - 0.44;
    card(s, { x: mx, y: G.bodyY, w: mw, h: 4.92, fill: C.card });
    txt(s, '포지셔닝', { x: mx + 0.40, y: G.bodyY + 0.26, w: 3, h: 0.42, size: 18, bold: true, color: C.blue, valign: 'middle' });
    const cxm = mx + mw / 2, cym = G.bodyY + 2.90;
    s.addShape('line', { x: cxm, y: G.bodyY + 1.10, w: 0, h: 3.40, line: { color: C.edge, width: 1.5 } });
    s.addShape('line', { x: mx + 0.55, y: cym, w: mw - 1.10, h: 0, line: { color: C.edge, width: 1.5 } });
    txt(s, '산업 기반 있음', { x: cxm - 1.6, y: G.bodyY + 0.94, w: 3.2, h: 0.34, size: 13, color: C.sub, align: 'center', valign: 'middle' });
    txt(s, '산업 기반 없음', { x: cxm - 1.6, y: G.bodyY + 4.42, w: 3.2, h: 0.34, size: 13, color: C.sub, align: 'center', valign: 'middle' });
    txt(s, '개인', { x: mx + 0.14, y: cym - 0.18, w: 0.9, h: 0.36, size: 13, color: C.sub, align: 'center', valign: 'middle' });
    txt(s, '가족', { x: mx + mw - 1.04, y: cym - 0.18, w: 0.9, h: 0.36, size: 13, color: C.sub, align: 'center', valign: 'middle' });

    const dots = [
      { x: cxm + 0.42, y: cym - 1.42, w: 1.45, h: 0.66, t: '부안', fill: C.blue },
      { x: cxm - 1.90, y: cym - 0.86, w: 1.45, h: 0.66, t: '익산', fill: C.blueMid },
      { x: cxm + 0.55, y: cym + 0.86, w: 1.45, h: 0.66, t: '대구', fill: C.sub },
    ];
    dots.forEach((d) => {
      s.addShape('ellipse', { x: d.x, y: d.y, w: d.w, h: d.h, fill: { color: d.fill }, line: { type: 'none' } });
      txt(s, d.t, { x: d.x, y: d.y, w: d.w, h: d.h, size: 16, bold: true, color: C.white, align: 'center', valign: 'middle' });
    });

    banner(s, '대구는 소비의 정점, 익산은 산업의 관문. 부안은 그 둘을 잇는 다리입니다.');
    src(s, '매일신문(2026.7.6) · 하림 보도자료 · 대구치맥페스티벌 공식');
  }

  // ══════════════════════════════════════════════════
  // S17 — 단계 목표
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 04', kr: '단계 목표', en: 'Staged Targets',
      lead: '50만은 결과이지 약속이 아닙니다. 지킬 수 있는 숫자로 시작합니다.' });

    s.addChart('bar', [{
      name: '방문객 목표', labels: ['2028 · 1년차', '2029 · 2년차', '2030 · 3년차'], values: [15, 25, 40],
    }], {
      x: G.ml, y: G.bodyY, w: 10.6, h: 5.20,
      barDir: 'col', barGapWidthPct: 100,
      chartColors: [C.blueMid, C.blue, C.navy], varyColors: true,
      showTitle: true, title: '3개년 방문객 목표 (만명)', titleFontSize: 17, titleColor: C.blue, titleFontFace: F,
      showValue: true, dataLabelPosition: 'outEnd', dataLabelFontSize: 20,
      dataLabelColor: C.text, dataLabelFontBold: true, dataLabelFontFace: F,
      showLegend: false,
      catAxisLabelColor: C.text, catAxisLabelFontSize: 15, catAxisLabelFontFace: F,
      valAxisLabelColor: C.sub, valAxisLabelFontSize: 13, valAxisLabelFontFace: F,
      valAxisMaxVal: 50, valAxisMajorUnit: 10,
      valGridLine: { color: C.edge, size: 0.75 }, catGridLine: { style: 'none' },
    });

    const rx = G.ml + 11.04, rw = G.cw - 11.04;
    card(s, { x: rx, y: G.bodyY, w: rw, h: 5.20, fill: C.card });
    txt(s, '직접소비 산출 근거', { x: rx + 0.44, y: G.bodyY + 0.32, w: rw - 0.88, h: 0.46, size: 20, bold: true, color: C.blue, valign: 'middle' });

    card(s, { x: rx + 0.44, y: G.bodyY + 0.94, w: rw - 0.88, h: 1.00, fill: C.white, line: C.edge });
    txt(s, '1인 평균 지출', { x: rx + 0.76, y: G.bodyY + 0.94, w: 3.0, h: 1.00, size: 16, color: C.sub, valign: 'middle' });
    txt(s, '35,000원', { x: rx + 3.4, y: G.bodyY + 0.94, w: rw - 3.9, h: 1.00, size: 28, bold: true, color: C.blue, align: 'right', valign: 'middle' });

    [['1년차 · 15만명', '52.5억원'], ['2년차 · 25만명', '87.5억원'], ['3년차 · 40만명', '140.0억원']]
      .forEach((c, i) => {
        const y = G.bodyY + 2.16 + i * 0.78;
        s.addShape('rect', { x: rx + 0.44, y, w: rw - 0.88, h: 0.66, fill: { color: i === 2 ? C.light : C.white }, line: { type: 'none' } });
        txt(s, c[0], { x: rx + 0.76, y, w: 3.4, h: 0.66, size: 16, color: C.text, valign: 'middle' });
        txt(s, c[1], { x: rx + 3.4, y, w: rw - 3.9, h: 0.66, size: 20, bold: true, color: i === 2 ? C.blue : C.text, align: 'right', valign: 'middle' });
      });

    s.addShape('line', { x: rx + 0.44, y: G.bodyY + 4.62, w: rw - 0.88, h: 0, line: { color: C.edge, width: 1.25 } });
    txt(s, '직접소비 기준 · 승수효과 별도\n문화관광축제 방문객 소비지출 조사 평균치 준용', {
      x: rx + 0.44, y: G.bodyY + 4.76, w: rw - 0.88, h: 0.40, size: 13, color: C.sub, valign: 'top', ls: 1.25 });

    banner(s, '과장된 숫자는 첫해에 무너집니다. 지킨 숫자만이 다음 예산을 부릅니다.');
  }

  // ══════════════════════════════════════════════════
  // S18 — 리스크
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 04', kr: '리스크 관리', en: 'Risk Management',
      lead: '축산 소재 축제의 최대 변수는 방역입니다. 숨기지 않고 먼저 말합니다.' });

    card(s, { x: G.ml, y: G.bodyY, w: G.cw, h: 1.56, fill: 'FBEAE8', line: C.warn, lw: 1.75 });
    txt(s, '2025 ~ 2026 동절기 고병원성 조류인플루엔자 발생 현황', {
      x: G.ml + 0.44, y: G.bodyY + 0.16, w: 10, h: 0.40, size: 16, bold: true, color: C.warn, valign: 'middle' });
    [['53건', '가금농장 · 전북 포함'], ['63건', '야생조류 · 전년 43건 대비 1.5배'], ['10월', '철새 도래 시작기와 근접']]
      .forEach((r, i) => {
        const x = G.ml + 0.44 + i * 5.9;
        txt(s, r[0], { x, y: G.bodyY + 0.66, w: 1.7, h: 0.72, size: 32, bold: true, color: C.warn, valign: 'middle', ls: 1.0 });
        txt(s, r[1], { x: x + 1.80, y: G.bodyY + 0.66, w: 3.9, h: 0.72, size: 15, color: C.text, valign: 'middle', ls: 1.2 });
      });

    txt(s, '3단계 대응 시나리오', { x: G.ml, y: G.bodyY + 1.84, w: 6, h: 0.42, size: 18, bold: true, color: C.blue, valign: 'middle' });
    const steps = [
      { lv: '정상', c: C.blue, cond: '발생 없음', act: '전 프로그램 정상 운영' },
      { lv: '주의', c: 'D9A404', cond: '전북권 발생', act: '생체 접촉 프로그램 전면 대체\n(병아리 관찰 → VR · 미디어 체험)' },
      { lv: '심각', c: C.warn, cond: '부안 인근 발생 / 이동제한', act: '온라인 전환 또는 11월 연기\n사전 계약에 연기조항 삽입' },
    ];
    steps.forEach((st, i) => {
      const y = G.bodyY + 2.34 + i * 1.06;
      s.addShape('roundRect', { x: G.ml, y, w: 2.2, h: 0.92, fill: { color: st.c }, rectRadius: 0.10, line: { type: 'none' } });
      txt(s, st.lv, { x: G.ml, y, w: 2.2, h: 0.92, size: 22, bold: true, color: C.white, align: 'center', valign: 'middle' });
      card(s, { x: G.ml + 2.4, y, w: 5.0, h: 0.92, fill: C.card });
      txt(s, st.cond, { x: G.ml + 2.7, y, w: 4.4, h: 0.92, size: T.body, bold: true, color: C.text, valign: 'middle' });
      card(s, { x: G.ml + 7.6, y, w: G.cw - 7.6, h: 0.92, fill: C.white, line: C.edge });
      txt(s, st.act, { x: G.ml + 7.9, y, w: G.cw - 8.2, h: 0.92, size: 16, color: C.text, valign: 'middle', ls: 1.25 });
    });

    card(s, { x: G.ml, y: G.bodyY + 5.60, w: G.cw, h: 0.86, fill: C.light });
    txt(s, '법정 안전관리', { x: G.ml + 0.44, y: G.bodyY + 5.60, w: 2.6, h: 0.86, size: 16, bold: true, color: C.blue, valign: 'middle' });
    txt(s, '「재난 및 안전관리 기본법」제66조의11 대상 (순간 최대 관람객 1천명 이상 · 불꽃 사용) · 안전관리계획 개최 3주 전 제출 의무 · 인파 밀집구간 실시간 모니터링', {
      x: G.ml + 3.2, y: G.bodyY + 5.60, w: G.cw - 3.64, h: 0.86, size: 15, color: C.text, valign: 'middle', ls: 1.25 });

    src(s, '농림축산식품부 중수본(2026.3.9) · 기후에너지환경부(2026.5.29) · 재난 및 안전관리 기본법 시행령 제73조의9');
  }

  // ══════════════════════════════════════════════════
  section(pres, '05', '재원과 추진', 'FUNDING & EXECUTION');

  // ══════════════════════════════════════════════════
  // S19 — 재원
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 05', kr: '재원 조달', en: 'Funding Structure',
      lead: '없는 국비를 기대하지 않고, 이미 확보된 재원을 설계합니다.' });

    const pillars = [
      { no: '01', name: '지방소멸대응기금', role: '주력', fill: C.navy, roleFill: C.cyan, roleTxt: C.navy,
        v: '348억', vl: '부안군 5년 누적 배분액(2022~2026)',
        li: ['부안군은 인구감소지역 지정', '행안부 평가, 시설→인구유입 효과로 전환', '전북도 소멸대응 사업 우선 반영'] },
      { no: '02', name: '문화관광축제 국비', role: '보조', fill: C.blue, roleFill: C.white, roleTxt: C.blue,
        v: '4천만원', vl: '지정 시 축제당 국비',
        li: ['2026~2027 전국 27개 선정', '한국관광공사 홍보 · 마케팅 지원', '예비 글로벌축제 승격 시 증액'] },
      { no: '03', name: '기업 협찬', role: '확대', fill: C.blueMid, roleFill: C.white, roleTxt: C.blueMid,
        v: '민간', vl: '참프레 · 프랜차이즈',
        li: ['참프레 (부안 소재 · 최우선)', '하림 · BBQ · bhc · 교촌', 'ESG · 신제품 마케팅 수요 연계'] },
    ];
    const w = 5.7, gap = 0.45;
    pillars.forEach((p, i) => {
      const x = G.ml + i * (w + gap);
      card(s, { x, y: G.bodyY, w, h: 4.24, fill: p.fill, shadow: i === 0 });
      txt(s, p.no, { x: x + 0.44, y: G.bodyY + 0.30, w: 1.0, h: 0.46, size: 18, bold: true, color: C.white, valign: 'middle' });
      s.addShape('roundRect', { x: x + w - 1.66, y: G.bodyY + 0.30, w: 1.22, h: 0.44, fill: { color: p.roleFill }, rectRadius: 0.07, line: { type: 'none' } });
      txt(s, p.role, { x: x + w - 1.66, y: G.bodyY + 0.30, w: 1.22, h: 0.44, size: 14, bold: true, color: p.roleTxt, align: 'center', valign: 'middle' });
      txt(s, p.name, { x: x + 0.44, y: G.bodyY + 0.88, w: w - 0.88, h: 0.52, size: 21, bold: true, color: C.white, valign: 'middle' });
      txt(s, p.v, { x: x + 0.44, y: G.bodyY + 1.46, w: w - 0.88, h: 0.84, size: 40, bold: true, color: i === 0 ? C.cyan : C.white, valign: 'middle', ls: 1.0 });
      txt(s, p.vl, { x: x + 0.44, y: G.bodyY + 2.30, w: w - 0.88, h: 0.36, size: 14, color: C.light, valign: 'middle' });
      s.addShape('line', { x: x + 0.44, y: G.bodyY + 2.76, w: w - 0.88, h: 0, line: { color: 'FFFFFF', width: 1 } });
      p.li.forEach((t, j) => {
        const y = G.bodyY + 2.94 + j * 0.44;
        txt(s, '· ' + t, { x: x + 0.44, y, w: w - 0.88, h: 0.40, size: 14, color: C.white, valign: 'top', ls: 1.2 });
      });
    });

    card(s, { x: G.ml, y: G.bodyY + 4.52, w: G.cw, h: 0.88, fill: 'FBEAE8', line: C.warn, lw: 1.75 });
    txt(s, '오해 정정', { x: G.ml + 0.44, y: G.bodyY + 4.52, w: 2.0, h: 0.88, size: 16, bold: true, color: C.warn, valign: 'middle' });
    txt(s, '문화관광축제로 선정돼도 국비는 축제당 4천만원입니다. 대구 치맥페스티벌조차 예비 글로벌축제 선정으로 2.5억원을 추가 지원받는 수준입니다.  →  "국비 50% 지원"은 존재하지 않는 재원입니다.', {
      x: G.ml + 2.6, y: G.bodyY + 4.52, w: G.cw - 3.04, h: 0.88, size: 15, color: C.text, valign: 'middle', ls: 1.25 });

    src(s, '전북특별자치도(2026) · 문화체육관광부(2026.1) · 행정안전부');
  }

  // ══════════════════════════════════════════════════
  // S19b — 예산 계획  ★신설
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 05', kr: '예산 계획', en: 'Budget Plan',
      lead: '초년도 총사업비는 이미 확보된 기금으로 충당 가능한 규모로 설계했습니다.' });

    // 좌: 총사업비 헤드라인
    const lw2 = 5.4;
    card(s, { x: G.ml, y: G.bodyY, w: lw2, h: 5.20, fill: C.navy });
    txt(s, '초년도 총사업비 (개산)', { x: G.ml + 0.46, y: G.bodyY + 0.40, w: lw2 - 0.9, h: 0.40, size: 16, color: C.light, valign: 'middle' });
    txt(s, '약 18억원', { x: G.ml + 0.46, y: G.bodyY + 0.86, w: lw2 - 0.9, h: 1.10, size: 54, bold: true, color: C.cyan, valign: 'middle', ls: 1.0 });
    txt(s, '15 ~ 20억원 규모 · 2028년 제1회 기준', { x: G.ml + 0.46, y: G.bodyY + 1.98, w: lw2 - 0.9, h: 0.38, size: 14, color: C.light, valign: 'middle' });
    s.addShape('line', { x: G.ml + 0.46, y: G.bodyY + 2.54, w: lw2 - 0.92, h: 0, line: { color: '3A3AA8', width: 1.25 } });
    ['지방소멸대응기금 연 배분 규모 내 충당', '신규 대규모 국비 없이 실행 가능', '회차별 성과 검증 후 단계적 확대']
      .forEach((t, i) => {
        const y = G.bodyY + 2.78 + i * 0.76;
        s.addShape('ellipse', { x: G.ml + 0.48, y: y + 0.14, w: 0.13, h: 0.13, fill: { color: C.cyan }, line: { type: 'none' } });
        txt(s, t, { x: G.ml + 0.80, y, w: lw2 - 1.2, h: 0.68, size: 16, color: C.white, valign: 'top', ls: 1.28 });
      });

    // 중: 항목별 배분
    const mx = G.ml + lw2 + 0.40, mw = 6.5;
    txt(s, '항목별 배분', { x: mx, y: G.bodyY, w: 5, h: 0.42, size: 18, bold: true, color: C.blue, valign: 'middle' });
    const items = [['프로그램 · 콘텐츠 운영', '6.3억', 35], ['무대 · 시설 · 설치', '4.5억', 25], ['홍보 · 마케팅', '3.2억', 18], ['안전 · 의료 · 보험', '2.2억', 12], ['운영 · 인건비', '1.8억', 10]];
    items.forEach((it, i) => {
      const y = G.bodyY + 0.70 + i * 0.90;
      txt(s, it[0], { x: mx, y, w: mw - 1.6, h: 0.36, size: 15, bold: true, color: C.text, valign: 'middle' });
      txt(s, it[1] + ' · ' + it[2] + '%', { x: mx + mw - 2.2, y, w: 2.2, h: 0.36, size: 14, bold: true, color: C.blue, align: 'right', valign: 'middle' });
      s.addShape('roundRect', { x: mx, y: y + 0.42, w: mw, h: 0.24, fill: { color: C.tint }, rectRadius: 0.05, line: { type: 'none' } });
      s.addShape('roundRect', { x: mx, y: y + 0.42, w: mw * it[2] / 35, h: 0.24, fill: { color: i === 0 ? C.blue : C.blueMid }, rectRadius: 0.05, line: { type: 'none' } });
    });

    // 우: 재원 매칭
    const rx = mx + mw + 0.40, rw = G.cw - (lw2 + 0.40 + mw + 0.40);
    card(s, { x: rx, y: G.bodyY, w: rw, h: 5.20, fill: C.card });
    txt(s, '재원 매칭', { x: rx + 0.40, y: G.bodyY + 0.30, w: rw - 0.8, h: 0.42, size: 18, bold: true, color: C.blue, valign: 'middle' });
    const srcs = [['지방소멸대응기금', '주력', C.navy], ['전북도비 매칭', '지원', C.blue], ['문화관광축제 국비', '보조', C.blueMid], ['기업 협찬 (참프레 등)', '확대', C.blueMid], ['자체수입 (입점료 · 수수료)', '보완', C.blueMid]];
    srcs.forEach((sc, i) => {
      const y = G.bodyY + 0.90 + i * 0.84;
      card(s, { x: rx + 0.40, y, w: rw - 0.80, h: 0.68, fill: C.white, line: C.edge });
      s.addShape('roundRect', { x: rx + 0.60, y: y + 0.16, w: 0.86, h: 0.36, fill: { color: sc[2] }, rectRadius: 0.06, line: { type: 'none' } });
      txt(s, sc[1], { x: rx + 0.60, y: y + 0.16, w: 0.86, h: 0.36, size: 13, bold: true, color: C.white, align: 'center', valign: 'middle' });
      txt(s, sc[0], { x: rx + 1.60, y, w: rw - 2.0, h: 0.68, size: 15, bold: true, color: C.text, valign: 'middle' });
    });

    banner(s, '총사업비의 대부분을 이미 확보된 기금으로 충당합니다. 신규 대규모 국비 없이 실행됩니다.');
    src(s, '지자체 문화관광축제 표준 산정 준용 · 확정 예산은 실행계획 단계에서 확정(개산 기준)');
  }

  // ══════════════════════════════════════════════════
  // S19c — 추진 체계  ★신설
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 05', kr: '추진 체계', en: 'Governance',
      lead: '민관이 함께, 각자 가장 잘하는 일을 맡습니다.' });

    const roles = [
      { who: '부안군', tag: '주최 · 총괄', tc: C.navy, on: true,
        li: ['예산 편성 · 인허가', '안전관리 · 부지 제공', '기금 투자계획 반영'] },
      { who: '부안군대표축제추진위원회', tag: '주관 · 운영', tc: C.blue, on: true,
        li: ['프로그램 기획 · 현장 운영', '마실축제 운영 노하우 승계', '자원봉사 · 인력 풀 가동'] },
      { who: '전북특별자치도', tag: '지원 · 연계', tc: C.blueMid,
        li: ['도비 매칭 · 광역 홍보', 'K-치킨벨트 거점 연계', '익산 치킨로드 광역 코스화'] },
      { who: '참프레', tag: '산업 파트너', tc: C.blueMid,
        li: ['견학관 연계 · 셔틀', '동물복지 · 시식 콘텐츠', '기업 협찬 · 마케팅'] },
      { who: '농식품부 · 문체부', tag: '정책 · 인증', tc: C.blueMid,
        li: ['K-미식벨트 거점 등재', '문화관광축제 지정', '국비 · 마케팅 지원'] },
      { who: '주민 · 상인 · 농가', tag: '참여 주체', tc: C.blueMid,
        li: ['주민 부스 · 먹거리 참여', '지역 농특산물 직거래', '축제 소득의 지역 환류'] },
    ];
    const w = 5.7, gap = 0.45, ch = 2.46;
    roles.forEach((r, i) => {
      const x = G.ml + (i % 3) * (w + gap);
      const y = G.bodyY + Math.floor(i / 3) * (ch + 0.30);
      card(s, { x, y, w, h: ch, fill: r.on ? C.light : C.card, line: r.on ? C.blue : C.edge, lw: r.on ? 2 : 1, shadow: r.on });
      txt(s, r.who, { x: x + 0.40, y: y + 0.28, w: w - 1.4, h: 0.80, size: r.who.length > 8 ? 19 : 24, bold: true, color: C.text, valign: 'middle', ls: 1.05 });
      s.addShape('roundRect', { x: x + w - 1.86, y: y + 0.32, w: 1.5, h: 0.44, fill: { color: r.tc }, rectRadius: 0.08, line: { type: 'none' } });
      txt(s, r.tag, { x: x + w - 1.86, y: y + 0.32, w: 1.5, h: 0.44, size: 13, bold: true, color: C.white, align: 'center', valign: 'middle' });
      s.addShape('line', { x: x + 0.40, y: y + 1.16, w: w - 0.80, h: 0, line: { color: r.on ? '9FBEE8' : C.edge, width: 1.25 } });
      r.li.forEach((t, j) => {
        const ly = y + 1.32 + j * 0.36;
        s.addShape('ellipse', { x: x + 0.44, y: ly + 0.12, w: 0.11, h: 0.11, fill: { color: r.tc }, line: { type: 'none' } });
        txt(s, t, { x: x + 0.72, y: ly, w: w - 1.1, h: 0.34, size: 14.5, color: C.sub, valign: 'middle' });
      });
    });

    banner(s, '부안군이 이끌고, 참프레와 주민이 채우고, 도와 정부가 뒷받침합니다.');
  }

  // ══════════════════════════════════════════════════
  // S20 — 로드맵
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 05', kr: '추진 일정', en: 'Roadmap',
      lead: '지방소멸대응기금 투자계획은 매년 6~7월 제출입니다. 지금 시작해야 2028년에 열립니다.' });

    const phases = [
      { p: '2026 하반기', c: C.blueMid, li: ['기본계획 수립', '참프레 MOU 체결', '추진위 확대 구성'] },
      { p: '2027 상반기', c: C.blueMid, li: ['타당성 검토 · 프로그램 설계', 'K-치킨벨트 거점 등재 신청', '★ 6~7월 기금 투자계획(안) 제출'] },
      { p: '2027 하반기', c: C.blue, li: ['기금 평가 대응', '기업 협찬 확정', '★ 12월 배분금액 확정'] },
      { p: '2028년', c: C.navy, li: ['실행계획 · 안전관리계획 수립', '★ 10월 제1회 부안 닭축제 개최'] },
    ];
    const w = 4.24, gap = 0.32;
    phases.forEach((ph, i) => {
      const x = G.ml + i * (w + gap);
      s.addShape('roundRect', { x, y: G.bodyY, w, h: 0.78, fill: { color: ph.c }, rectRadius: 0.10, line: { type: 'none' } });
      txt(s, ph.p, { x, y: G.bodyY, w, h: 0.78, size: 20, bold: true, color: C.white, align: 'center', valign: 'middle' });
      card(s, { x, y: G.bodyY + 0.92, w, h: 2.30, fill: C.card });
      ph.li.forEach((t, j) => {
        const y = G.bodyY + 1.16 + j * 0.74;
        s.addShape('ellipse', { x: x + 0.32, y: y + 0.16, w: 0.12, h: 0.12, fill: { color: ph.c }, line: { type: 'none' } });
        txt(s, t, { x: x + 0.62, y, w: w - 0.94, h: 0.66, size: 16, color: C.text, valign: 'top', ls: 1.28 });
      });
      if (i < 3) s.addShape('rightArrow', { x: x + w + 0.02, y: G.bodyY + 0.26, w: 0.26, h: 0.26, fill: { color: C.edge }, line: { type: 'none' } });
    });

    txt(s, '이후 단계', { x: G.ml, y: G.bodyY + 3.46, w: 4, h: 0.42, size: 18, bold: true, color: C.blue, valign: 'middle' });
    [['2029 ~ 2030', '2 ~ 3회차 개최 / 문화관광축제 지정 신청'],
     ['2031 ~ 2033', '상설 콘텐츠화 / K-치킨벨트 대표 거점 확립'],
     ['2034 ~ 2035', '국제화 단계 검토 / 해외 관광객 유치 본격화']]
      .forEach((lt, i) => {
        const y = G.bodyY + 3.90 + i * 0.54;
        card(s, { x: G.ml, y, w: G.cw, h: 0.48, fill: i % 2 ? C.card : C.white, line: C.edge });
        txt(s, lt[0], { x: G.ml + 0.40, y, w: 3.0, h: 0.48, size: 16, bold: true, color: C.blue, valign: 'middle' });
        txt(s, lt[1], { x: G.ml + 3.6, y, w: G.cw - 4.0, h: 0.48, size: 16, color: C.text, valign: 'middle' });
      });

    banner(s, '지금 시작해야 2028년에 열립니다.');
    src(s, '행정안전부 지방소멸대응기금 운영 절차');
  }

  // ══════════════════════════════════════════════════
  // S21 — 기대효과
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    header(s, { chap: 'CHAPTER 05', kr: '기대효과', en: 'Expected Impact',
      lead: '방문객 수가 아니라, 체류인구 증가가 목표입니다.' });

    card(s, { x: G.ml, y: G.bodyY, w: 10.6, h: 5.20, fill: C.white, line: C.edge });
    txt(s, '행정안전부 기금 평가기준  ↔  부안 닭축제 KPI', {
      x: G.ml + 0.44, y: G.bodyY + 0.32, w: 9.8, h: 0.46, size: 19, bold: true, color: C.blue, valign: 'middle' });
    const maps = [
      { a: '사람\n정주 · 체류인구', b: '10월 체류인구 전년 대비 증가율\n축제 기간 생활인구 순증' },
      { a: '산업 · 일자리', b: '축제 연계 신규 고용\n참프레 협력 농가 소득 변화' },
      { a: '마을공동체', b: '주민 참여 부스 수\n자원봉사 참여율' },
    ];
    maps.forEach((m, i) => {
      const y = G.bodyY + 1.02 + i * 1.38;
      card(s, { x: G.ml + 0.44, y, w: 3.6, h: 1.16, fill: C.light });
      txt(s, m.a, { x: G.ml + 0.60, y, w: 3.3, h: 1.16, size: 17, bold: true, color: C.blue, align: 'center', valign: 'middle', ls: 1.28 });
      s.addShape('rightArrow', { x: G.ml + 4.24, y: y + 0.42, w: 0.42, h: 0.32, fill: { color: C.cyan }, line: { type: 'none' } });
      card(s, { x: G.ml + 4.90, y, w: 5.26, h: 1.16, fill: C.card });
      txt(s, m.b, { x: G.ml + 5.16, y, w: 4.8, h: 1.16, size: 16, color: C.text, valign: 'middle', ls: 1.28 });
    });

    const rx = G.ml + 11.04, rw = G.cw - 11.04;
    card(s, { x: rx, y: G.bodyY, w: rw, h: 5.20, fill: C.navy });
    txt(s, '선순환 구조', { x: rx + 0.44, y: G.bodyY + 0.32, w: rw - 0.88, h: 0.46, size: 19, bold: true, color: C.white, valign: 'middle' });
    ['축제 개최', '체류인구 증가', '기금 평가 상승 → 배분액 증가', '재투자 · 상설 콘텐츠화', '연중 체류인구 증가']
      .forEach((t, i) => {
        const y = G.bodyY + 1.00 + i * 0.84;
        const on = i === 4;
        s.addShape('roundRect', { x: rx + 0.50, y, w: rw - 1.0, h: 0.62, fill: { color: on ? C.cyan : C.blue }, rectRadius: 0.09, line: { type: 'none' } });
        txt(s, t, { x: rx + 0.50, y, w: rw - 1.0, h: 0.62, size: 16, bold: true, color: on ? C.navy : C.white, align: 'center', valign: 'middle' });
        if (i < 4) s.addShape('downArrow', { x: rx + rw / 2 - 0.11, y: y + 0.64, w: 0.22, h: 0.16, fill: { color: '4A6FD8' }, line: { type: 'none' } });
      });

    banner(s, '행안부는 이제 시설이 아니라 사람으로 평가합니다. 축제는 가장 빠른 사람 사업입니다.');
    src(s, '행정안전부 지방소멸대응기금 투자계획 평가 개편(2025.12)');
  }

  // ══════════════════════════════════════════════════
  // 결론
  // ══════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };
    img(s, 'closing.jpg', { x: 10.0, y: 0, w: 10.0, h: 11.25 });
    s.addShape('rect', { x: 0, y: 0, w: 10.8, h: 11.25, fill: { color: C.navy }, line: { type: 'none' } });
    s.addShape('roundRect', { x: 8.6, y: -3, w: 6, h: 18, fill: { color: C.navy }, rectRadius: 1.2, line: { type: 'none' } });

    s.addShape('line', { x: G.ml, y: 2.40, w: 2.6, h: 0, line: { color: C.cyan, width: 3.5 } });
    txt(s, 'THANK YOU', { x: G.ml, y: 2.64, w: 9, h: 0.5, size: 18, bold: true, color: C.cyan, valign: 'middle', cs: 4 });

    txt(s, '닭 하면 부안,\n부안 하면 닭', {
      x: G.ml, y: 3.40, w: 9.2, h: 2.30, size: 56, bold: true, color: C.white, valign: 'middle', ls: 1.22 });

    txt(s, '2,000년 전 이 땅에서 닭은 나라의 이름이었습니다.\n지금 세계는 그 닭을 K-Chicken이라 부릅니다.\n그 이름의 출발점을 부안에 세우고자 합니다.', {
      x: G.ml, y: 5.90, w: 9.0, h: 1.40, size: 19, color: C.light, valign: 'top', ls: 1.45 });

    const reqs = [
      { who: '부안군', what: '2028년도 기금\n투자계획 반영' },
      { who: '전북특별자치도', what: '도 차원 예산 매칭\nK-치킨벨트 등재' },
      { who: '기업 파트너', what: '참프레 시설 연계\n프랜차이즈 참여' },
    ];
    reqs.forEach((r, i) => {
      const x = G.ml + i * 3.10;
      const y = 7.70;
      s.addShape('roundRect', { x, y, w: 2.86, h: 1.46, fill: { color: C.blue }, rectRadius: 0.10, line: { type: 'none' } });
      txt(s, r.who, { x: x + 0.28, y: y + 0.16, w: 2.3, h: 0.42, size: 16, bold: true, color: C.cyan, valign: 'middle' });
      txt(s, r.what, { x: x + 0.28, y: y + 0.60, w: 2.3, h: 0.74, size: 14, color: C.white, valign: 'top', ls: 1.25 });
    });

    txt(s, '2028년 10월, 부안에서 대한민국의 닭이 다시 새벽을 알립니다.', {
      x: G.ml, y: 9.60, w: 9.2, h: 0.52, size: 19, bold: true, color: C.cyan, valign: 'middle' });
    txt(s, '부안군 · 전북특별자치도  |  2026. 07', {
      x: G.ml, y: 10.24, w: 9.2, h: 0.40, size: 14, color: '8A8AC8', valign: 'middle' });
  }
};
