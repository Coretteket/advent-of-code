import input from './input.txt';

const joltage = input
  .split('\n')
  .map((line) => {
    const bank = line.split('').map(Number);
    const bank1 = bank.slice(0, -1);
    const firstDigitIdx = bank1.findIndex((j) => j === Math.max(...bank1))!;
    const bank2 = bank.slice(firstDigitIdx + 1);
    const secondDigit = bank2.find((j) => j === Math.max(...bank2))!;
    return bank1[firstDigitIdx]! * 10 + secondDigit;
  })
  .reduce((a, b) => a + b, 0);

console.log(joltage);
