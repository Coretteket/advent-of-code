import input from './input.txt';

const START = 50;
const SIZE = 100;

const password = input
  .split('\n')
  .reduce(
    (history, line) => {
      const direction = line.charAt(0) === 'R' ? 1 : -1;
      const distance = Number(line.slice(1));
      const last = history.at(-1)!;
      const next = (last + distance * direction + SIZE) % SIZE;
      return history.concat(next);
    },
    [START]
  )
  .reduce((sum, value) => (value === 0 ? ++sum : sum), 0);

console.log(password);
