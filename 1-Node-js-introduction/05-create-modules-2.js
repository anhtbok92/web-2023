var createModules = require('./04-create-modules-1');

console.log('======= Module duoc import =======');
console.log(createModules);

console.log('======= Module hien tai =======');
console.log(module);

const myDateTime = createModules.getMyDateTime();
const myDir = createModules.getDirName();
const myAge = createModules.myAge;

console.log('myDateTime: ', myDateTime);
console.log('myDir: ', myDir);
console.log('myAge: ', myAge);