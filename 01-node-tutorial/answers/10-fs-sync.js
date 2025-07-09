const { readFileSync, writeFileSync } = require('fs');

writeFileSync('./temporary/fileA.txt', 'A: Line 1.');
writeFileSync('./temporary/fileA.txt', '\nA: Line 2.', { flag: 'a' });
writeFileSync('./temporary/fileA.txt', '\nA: Line 3.', { flag: 'a' });

const result = readFileSync('./temporary/fileA.txt', 'utf8');
console.log(result);
