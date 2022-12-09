// Advent of Code 2022 - Day 9a

const { abs } = Math;

const file = await Deno.readTextFile('input.txt');
const lines = file.split('\r\n').map((l) => {
  const [dir, num] = l.split(' ');
  return { dir: dir as keyof typeof dirs, num: Number(num) };
});

const dirs = { U: [0, 1], D: [0, -1], L: [-1, 0], R: [1, 0] };
let [head, tail] = [[0, 0], [0, 0]];
const visited = new Set();

const norm = (d: number) => (d !== 0 ? d / abs(d) : 0);

lines.forEach((line) => {
  for (let i = 0; i < line.num; i++) {
    head = head.map((c, j) => c + dirs[line.dir][j]);
    const [dx, dy] = tail.map((c, k) => head[k] - c);
    const m = abs(dx) + abs(dy) > 2 || !(abs(dx) === 1 || abs(dy) === 1);
    if (m) tail = [dx, dy].map((d, _) => tail[_] + norm(d));
    visited.add(JSON.stringify(tail));
  }
});

console.log(visited.size);
