// Let's say we have an array
console.log('Let\'s say we have an array');
const players = ["Wes", "Sarah", "Ryan", "Poppy"];
console.log('players', players);

// and we want to make a copy of it.
console.log('and we want to make a copy of it');
const team = players;
console.log('const team = players');
console.log("");
// You might think we can just do something like this:
console.log('You might think we can just do something like this:');
team[3] = "Lux";
console.log('team[3] = "Lux"');
console.log("");
// however what happens when we update that array?
console.log('But when we console log both of the arrays...');
console.log('players', players);
console.log('team', team);
console.log("");
// now here is the problem!
console.log('Houston, we have a problem!');

// oh no - we have edited the original array too!
console.log('We edited both of the arrays instead');

// Why? It's because that is an array reference, not an array copy. They both point to the same array!
console.log('This is because arrays are passed by reference, not by value');
console.log("");
// So, how do we fix this? We take a copy instead!
console.log('We have to make a copy, rather than a reference!')
// one way
console.log('These are a couple ways i know how to make an array copy:');
console.log('arr.slice(), [...arr], Array.from(arr), arr.concat(), including array methods like map() and reduce()');
console.log("");

console.log('In the case of deep copies (arrays with objects and nested arrays) we can use JSON.parse(JSON.stringify(arr)) and structuredClone(arr)');
console.log("");

// The same thing goes for objects, let's say we have a person object
console.log('The same concept applies to objects');
// with Objects
const person = {
  name: "Wes Bos",
  age: 80,
};
console.log('person', person);
console.log("");
// and think we make a copy:
console.assert('When we try to make a copy...');
const captain = person;
console.log('const captain = person');
captain.number = 99;
console.log('captain.number = 99');
console.log("");

console.log('captain', captain);
console.log('person', person);
console.log("");
// how do we take a copy instead?
console.log('To make an object copy, instead of referencing it, we can use:');
console.log('Object.assign({}, obj) or {...obj}');
console.log("");

console.log('For deep copies we can use:');
console.log('JSON.parse(JSON.stringify(obj)) or structuredClone(obj)');
console.log("");

console.log('The key takeaway is that strings, numbers, and booleans are passed by value, but objects and arrays are passed by reference!')