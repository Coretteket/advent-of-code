const input = await Bun.file('input.txt').text();
const lines = input.split('\n');

const regex = /[0-9]+/g;
let numbers: { num: number; x: number; y: number }[] = [];
let sum = 0;

for (const [y, line] of lines.entries()) {
  let match: RegExpExecArray | null;
  while ((match = regex.exec(line)) !== null)
    numbers.push({ num: parseInt(match[0]), x: match.index, y });
};

for (const { num, y, x } of numbers) {
  let check: [number, number][] = [];
  for (let i = -1; i <= `${num}`.length; i++)
    check = [...check, [x + i, y], [x + i, y - 1], [x + i, y + 1]];

  for (const [x, y] of check)
    if (lines[y]?.[x] && !regex.test(lines[y][x]) && lines[y][x] !== '.')
      sum += num;
}

console.log(sum);
