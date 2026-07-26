const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.defineLayout({ name: 'BUAN', width: 20, height: 11.25 });
pres.layout = 'BUAN';
pres.author = '부안군 · 전북특별자치도';
pres.title  = '부안 닭축제 종합제안서';

require('./part1')(pres);
require('./part2')(pres);
require('./part3')(pres);

pres.writeFile({ fileName: '부안닭축제_제안서_v4.pptx' })
  .then(f => console.log('OK ->', f))
  .catch(e => { console.error('ERR', e); process.exit(1); });
