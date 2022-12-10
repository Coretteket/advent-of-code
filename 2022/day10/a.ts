// Advent of Code 2022 - Day 10a

const file = await Deno.readTextFile('input.txt');
const lines = file.split('\r\n').map((l) => {
  const [comm, num] = l.split(' ');
  if (comm === 'addx') return { comm, num: Number(num) } as const;
  if (comm === 'noop') return { comm } as const;
  else return {};
});

const strengths: number[] = [];
let cycle = 0;
let x = 1;

const execute = (c: number, fn?: () => void) => {
  for (let i = 0; i < c; i++) {
    cycle++;
    if ((cycle + 20) % 40 === 0) strengths.push(x * cycle);
  }
  if (fn) fn();
};

lines.forEach((line) => {
  if (line.comm === 'addx') execute(2, () => (x += line.num));
  if (line.comm === 'noop') execute(1);
});

console.log(strengths.reduce((a, b) => a + b, 0));
