const { readFile, writeFile, appendFile } = require('fs');

writeFile('./temporary/fileB.txt', 'B: Line 1.', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Write Line 1 is SUCCESS');

  appendFile('./temporary/fileB.txt', '\nB: Line 2.', (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Write Line 2 is SUCCESS');
    appendFile('./temporary/fileB.txt', '\nB: Line 3.', (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('Write Line 3 is SUCCESS');
      readFile('./temporary/fileB.txt', 'utf8', (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        const contentFileB = result;
        console.log(`Read:\n${contentFileB}`);
      });
    });
  });
});
