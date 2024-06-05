const people = [
  { name: "Wes", year: 1988 },
  { name: "Kait", year: 1986 },
  { name: "Irv", year: 1970 },
  { name: "Lux", year: 2015 },
];

const comments = [
  { text: "Love this!", id: 523423 },
  { text: "Super good", id: 823423 },
  { text: "You are the best", id: 2039842 },
  { text: "Ramen is my fav food ever", id: 123523 },
  { text: "Nice Nice Nice!", id: 542328 },
];

console.table(people);
console.table(comments);

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
const isAdult = people.some((person) => {
    const currentYear = (new Date()).getFullYear();
    return currentYear - person.year >= 19;
});

console.log('Is at least one person 19 or older?', isAdult);

// Array.prototype.every() // is everyone 19 or older?
const allAdults = people.every((person) => {
    const currentYear = (new Date()).getFullYear();
    return currentYear - person.year >= 19;
})
console.log('Is everyone 19 or older?', allAdults);

//Array.prototype.find()
const comment = comments.find((comment) => comment.id === 823423);
console.log('find comment of id 823423', comment);

//Array.prototype.findIndex()

const index = comments.findIndex((comment) => comment.id === 823423);
console.log('find index of comment of id 823423', index);
console.log("deleted comment id 823423: ");
console.table(
  comments.slice(0, index).concat(comments.slice(index + 1))
);

