// Advent of Code 2022 - Day 6b

const file = await Deno.readTextFile('input.txt');

const getMarker = (size: number) => {
  for (let i = size; i <= file.length; i++) {
    const set = new Set(file.slice(i - size, i));
    if (set.size === size) return i;
  }
};

console.log(getMarker(14));
