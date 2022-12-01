// Advent of Code 2022 - Day 1b

const file = await Deno.readTextFile('input.txt');
const lines = file.split('\n').map(Number);

const elves: number[] = [];
let cals = 0;

for (const line of lines) {
  if (line === 0) {
    elves.push(cals);
    cals = 0;
  }
  cals += line;
}

const sorted = elves.sort((a, b) => b - a);
const top = sorted.slice(0, 3).reduce((p, c) => p + c, 0);

console.log(top);
