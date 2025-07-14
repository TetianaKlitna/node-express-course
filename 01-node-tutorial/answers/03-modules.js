const { peter, john } = require('./04-names');
const sayHi = require('./05-utils');
const data = require('./06-alternative-flavor');
require('./07-mind-grenade');

sayHi('Susan');
sayHi(peter);
sayHi(john);

console.log(data.items);
console.log(data.singlePerson.name);