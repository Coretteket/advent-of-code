// Advent of Code 2022 - Day 3a

const file = await Deno.readTextFile('input.txt');
const output = file
  .split('\n')
  .map((line) => line.split(''))
  .map((line) => [
    line.slice(0, line.length / 2),
    line.slice(line.length / 2)
  ])
  .map((rucksacks) =>
    Array.from(new Set(
      rucksacks[0].filter((item) => rucksacks[1].includes(item))
    ))[0]
  )
  .map((item) =>
    item.toUpperCase() === item
      ? item.charCodeAt(0) - 65 + 27
      : item.charCodeAt(0) - 97 + 1
  )
  .reduce((prev, curr) => prev + curr, 0);

console.log(output);
