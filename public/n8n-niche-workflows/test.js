try { require('./generate_subworkflows.js'); } catch(e) { require('fs').writeFileSync('err.txt', e.stack); }
