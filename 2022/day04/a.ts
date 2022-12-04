// Advent of Code 2022 - Day 4a

const file = await Deno.readTextFile('input.txt');

const lines = file
  .split('\n')
  .map((line) => line.split(',').map((part) => part.split('-').map(Number)));

let sum = 0;

for (const line of lines) {
  const [first, second] = line.map((part) =>
    Array.from(new Array(part[1] - part[0] + 1), (_, i) => i + part[0])
  );
  const full = Array.from(new Set([...first, ...second]));
  if (full.length === first.length || full.length === second.length) sum++;
}

console.log(sum);
