/////////////////////////// CHALLENGES ////////////////////////////////////////

// Each challenge will be related to this array of names. It will pose a
// problem related to these names, and then implement the solution. The
// challenges are:
//
// - Create a new array with only each person's last name
// - Filter names that don't match the format "<first> <last>"
//   - Should remove Tam because she has a double-space
//   - Should remove Carlow because he has a middle-name
//   - Should also remove names like:
//     - "Timothy      Cook"
//     - "Nick_Masters"
//     - "Timmy-Turner"
//     - "Billy\nBob"
//     - etc.
// - Create a new array where everyone's name is converted to "Title Case"
//   - The first character of each word should be uppercase
//   - All other characters in the word should be lowercase
//   - expected output is ['Dimitry Santiago', 'Carlos D. Perez', 'Tam Person', ...]
// - Last Challenge:
//     Remove names with the wrong format
//     AND change it to "Title Case"
//     AND remove people whose last name ends with z
//     AND write a message asking them to sign up
//
// For an extra assignment, you may implement these yourself! Include your
// changes to this file with your MR for week 3.

const names = [
  'Dimitry SantiAgo',
  'Carlos d. Perez',
  'tam  person',
  'Mariana Gomez',
  'Amy You',
];

const lastNames = names.map((name) => name.trim().split(' ').pop());
console.log(lastNames);

const filteredNames = names.filter(
  (name) => name.trim().split(' ').length === 2
);
console.log(filteredNames);

const titleCaseFirstName = names.map((name) =>
  name
    .trim()
    .split(/\s+/)
    .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
);
console.log(titleCaseFirstName);

names
  .filter((name) => name.trim().split(' ').length === 2)
  .map((name) =>
    name
      .trim()
      .split(/\s+/)
      .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  )
  .filter((name) => name[name.length - 1] !== 'z')
  .forEach((name) => console.log(`${name}, please sign up`));
