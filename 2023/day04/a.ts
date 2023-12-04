const input = await Bun.file('input.txt').text();
const lines = input.split('\n');

let sum = 0;

for (const line of lines) {
  const [winning, yours] = line
    .replace(/Card .+: /, '')
    .split(' | ')
    .map((x) => x.split(' ').filter(Boolean).map(Number));

  const matches = winning.reduce((sum, num) => sum + +yours.includes(num), 0);
  sum += matches > 0 ? 2 ** (matches - 1) : 0;
}

console.log(sum);
