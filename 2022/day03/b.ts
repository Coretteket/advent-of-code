// Advent of Code 2022 - Day 3a

const file = await Deno.readTextFile('input.txt');
const output = file
  .split('\n')
  .map((line) => line.split(''))
  .map((_, i, lines) => lines.slice(i * 3, (i + 1) * 3))
  .filter((line) => line.length > 0)
  .map((group) =>
    group[0].filter((letter) =>
      group[1].includes(letter) && group[2].includes(letter)
    )[0]
  )
  .map((item) =>
    item.toUpperCase() === item
      ? item.charCodeAt(0) - 65 + 27
      : item.charCodeAt(0) - 97 + 1
  )
  .reduce((prev, curr) => prev + curr, 0);

console.log(output);
