const { writeFile, readFile } = require('fs').promises;

const readWrite = (fileName) => {
  writeFile(fileName, 'A: Line 1.')
    .then(() => writeFile(fileName, '\nA: Line 2.', { flag: 'a' }))
    .then(() => writeFile(fileName, '\nA: Line 3.', { flag: 'a' }))
    .then(() => readFile(`${fileName}`, 'utf8'))
    .then((text) => console.log(text))
    .catch((error) => {
      console.log('An error occurred: ', error);
    });
};

readWrite('temp.txt');
