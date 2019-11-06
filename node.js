const ChunkExtractor = require('@loadable/server').ChunkExtractor;
const path = require('path');

const nodeStatsFile = path.resolve('dist/server/loadable-stats.json');
const nodeExtractor = new ChunkExtractor({ statsFile:nodeStatsFile,entrypoints:'pages-Home' });
const entry = nodeExtractor.requireEntrypoint();
console.log('entry',entry);