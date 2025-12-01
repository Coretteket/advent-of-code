import input from './input.txt';

const START = 50;
const SIZE = 100;

const password = input.split('\n').reduce(
  (last, line) => {
    const direction = line.charAt(0) === 'R' ? 1 : -1;
    const distance = Number(line.slice(1));
    const next = last.value + distance * direction;
    const fullRotations = Math.floor(distance / SIZE);
    const rest = distance % SIZE;
    const additionalRotations =
      last.value === 0
        ? 0
        : Number(
            direction === 1 ? 100 - last.value <= rest : last.value <= rest
          );
    const rotations = fullRotations + additionalRotations;
    return {
      rotations: last.rotations + rotations,
      value: (next + SIZE * (rotations + 1)) % SIZE,
    };
  },
  { rotations: 0, value: START }
).rotations;

console.log(password);
