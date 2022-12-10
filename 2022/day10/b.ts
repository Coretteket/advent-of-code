// Advent of Code 2022 - Day 10b

const file = await Deno.readTextFile('input.txt');
const lines = file.split('\r\n').map((l) => {
  const [comm, num] = l.split(' ');
  if (comm === 'addx') return { comm, num: Number(num) } as const;
  if (comm === 'noop') return { comm } as const;
  else return {};
});

const rows: typeof row[] = [];
let row: ('#' | '.')[] = [];
let sprite = 1;
let cycle = 0;

const execute = (c: number, fn?: () => void) => {
  for (let i = 0; i < c; i++) {
    cycle++;
    const x = (cycle % 40) - 1;
    row.push(x >= sprite - 1 && x <= sprite + 1 ? '#' : '.');
    if (x === -1) { rows.push(row); row = []; }
  }
  if (fn) fn();
};

lines.forEach((line) => {
  if (line.comm === 'addx') execute(2, () => (sprite += line.num));
  if (line.comm === 'noop') execute(1);
});

rows.forEach((row) => console.log(row.join('')));
