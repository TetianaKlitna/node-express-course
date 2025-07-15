const { writeFile, readFile } = require('fs').promises;

const writer = async (fileName) => {
  await writeFile(fileName, 'A: Line 1.');
  await writeFile(fileName, '\nA: Line 2.', { flag: 'a' });
  await writeFile(fileName, '\nA: Line 3.', { flag: 'a' });
};

const reader = async (fileName) => readFile(`${fileName}`, 'utf8');

const readWrite = async (fileName) => {
  try {
    await writer(fileName);
    const text = await reader(fileName);
    console.log(text);
  } catch (error) {
    console.log('An error occurred: ', error);
  }
};

readWrite('temp.txt');
