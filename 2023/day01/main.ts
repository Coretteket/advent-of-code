const input = await Bun.file('input.txt').text();

const isNumber = (n: string) => !isNaN(parseInt(n, 10));

const value = input.split('\n').reduce((count, line) => {
  const numbers = line
    .split('')
    .filter((n) => isNumber(n))
    .map((n) => parseInt(n, 10));
  return numbers.at(0)! * 10 + numbers.at(-1)! * 1 + count;
}, 0);

console.log(value);
