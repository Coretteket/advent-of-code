import input from './input.txt';

let invalidIDs: number[] = [];

for (const range of input.split(',')) {
  const [from, to] = range.split('-').map(Number);
  for (let i = from!; i <= to!; i++) {
    const value = String(i);
    for (let j = 2; j <= value.length; j++) {
      if (value === value.slice(0, value.length / j).repeat(j)) {
        invalidIDs.push(i);
        break;
      }
    }
  }
}

console.log(invalidIDs.reduce((a, b) => a + b, 0));
