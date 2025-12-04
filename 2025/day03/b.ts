import input from './input.txt';

const joltage = input
  .split('\n')
  .map((line) => {
    const bank = line.split('').map(Number);

    let joltage = 0;
    let lastIdx = 0;

    for (let i = 11; i >= 0; i--) {
      const bankPart = bank.slice(lastIdx, i > 0 ? -i : undefined);
      const idx = bankPart.findIndex((j) => j === Math.max(...bankPart))!;
      joltage += bankPart[idx]! * Math.pow(10, i);
      lastIdx += idx + 1;
    }

    return joltage;
  })
  .reduce((a, b) => a + b, 0);

console.log(joltage);
