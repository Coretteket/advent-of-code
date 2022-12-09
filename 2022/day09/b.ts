// Advent of Code 2022 - Day 9b

const { abs } = Math;

const file = await Deno.readTextFile('input.txt');
const lines = file.split('\r\n').map((l) => {
  const [dir, num] = l.split(' ');
  return { dir: dir as keyof typeof dirs, num: Number(num) };
});

const dirs = { U: [0, 1], D: [0, -1], L: [-1, 0], R: [1, 0] };
const rope = Array.from({ length: 10 }, () => [0, 0]);
const visited = new Set();

const norm = (d: number) => (d !== 0 ? d / abs(d) : 0);

lines.forEach((line) => {
  for (let i = 0; i < line.num; i++) {
    rope[0] = rope[0].map((c, j) => c + dirs[line.dir][j]);
    for (let j = 1; j < rope.length; j++) {
      const [dx, dy] = rope[j].map((c, k) => rope[j - 1][k] - c);
      const m = abs(dx) + abs(dy) > 2 || !(abs(dx) === 1 || abs(dy) === 1);
      if (m) rope[j] = [dx, dy].map((d, _) => rope[j][_] + norm(d));
    }
    visited.add(JSON.stringify(rope.at(-1)));
  }
});

console.log(visited.size);
