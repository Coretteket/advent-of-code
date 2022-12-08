// Advent of Code 2022 - Day 8a

const file = await Deno.readTextFile('input.txt');
const lines = file.split('\r\n').map((l) => l.split('').map(Number));

let visible = 0;

lines.forEach((line, y) =>
  line.forEach((_, x) => {
    const l = lines[y].slice(0, x);
    const r = lines[y].slice(x + 1);
    const u = lines.filter((_, i) => i < y).map((l) => l[x]);
    const d = lines.filter((_, i) => i > y).map((l) => l[x]);
    visible += +[l, r, u, d].map((arr) => Math.max(...arr) < lines[y][x]).includes(true);
  })
);

console.log(lines);
console.log(visible);
