const fs = require('fs');

const jsonStr = fs.readFileSync('stats.json');

const json = JSON.parse(jsonStr);
console.log(Object.keys(json));
console.log(json.chunks[0].modules.length);
