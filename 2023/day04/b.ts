const input = await Bun.file('input.txt').text();
const lines = input.split('\n');

let copies = Array(lines.length).fill(1);

for (const [i, line] of lines.entries()) {
  const [winning, yours] = line
    .replace(/Card .+: /, '')
    .split(' | ')
    .map((x) => x.split(' ').filter(Boolean).map(Number));

  const matches = winning.reduce((sum, num) => sum + +yours.includes(num), 0);
  for (let j = 1; j <= matches; j++) copies[i + j] += copies[i];
}

console.log(copies.reduce((sum, num) => sum + num, 0));
