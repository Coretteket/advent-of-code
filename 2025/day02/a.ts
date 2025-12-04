import input from './input.txt';

let invalidIDs: number[] = [];

for (const range of input.split(',')) {
  const [from, to] = range.split('-').map(Number);
  for (let i = from!; i <= to!; i++) {
    const value = String(i);
    const half = value.length / 2;
    if (value.slice(0, half) === value.slice(half)) invalidIDs.push(i);
  }
}

console.log(invalidIDs.reduce((a, b) => a + b, 0));
