// Advent of Code 2022 - Day 1a

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

console.log(Math.max(...elves));
