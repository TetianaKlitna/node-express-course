const { createReadStream } = require('fs');

let cnt = 0;
const stream = createReadStream('../content/big.txt', {
  encoding: 'utf8',
  highWaterMark: 200,
});
stream.on('data', () => {
  cnt++;
});
stream.on('end', () => {
  console.log(cnt);
});

stream.on('error', (error) => {
  console.log('An error occurred: ', error);
});
