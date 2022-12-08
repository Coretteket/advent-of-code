// Advent of Code 2022 - Day 8a

const file = await Deno.readTextFile('input.txt');
const lines = file.split('\r\n').map((l) => l.split('').map(Number));

let max = 0;

const getSight = (tree: number) => (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= tree) return i + 1;
  }
  return arr.length;
};

lines.forEach((line, y) =>
  line.forEach((tree, x) => {
    const s = getSight(tree);
    const l = s(lines[y].slice(0, x).reverse());
    const r = s(lines[y].slice(x + 1));
    const u = s(lines.filter((_, i) => i < y).map((l) => l[x]).reverse());
    const d = s(lines.filter((_, i) => i > y).map((l) => l[x]));
    const score = l * r * u * d;
    max = Math.max(max, score);
  })
);

console.log(max);
