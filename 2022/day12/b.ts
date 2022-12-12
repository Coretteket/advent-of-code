// Advent of Code 2022 - Day 12b

const file = await Deno.readTextFile('input.txt');

type Coord = { val: number; x: number; y: number };
const paths: Coord[][] = [];
let end: Coord;

const coords = file.split('\r\n').map((l, y) =>
  l.split('').map((g, x) => {
    switch (g) {
      case 'a':
      case 'S':
        paths.push([{ val: 0, x, y }]);
        return 0;
      case 'E':
        end = { val: 25, x, y };
        return 25;
      default:
        return g.charCodeAt(0) - 97;
    }
  })
);

const visited = new Set<`${number},${number}`>();

loop: while (paths.length > 0) {
  for (const path of paths) {
    const { x, y, val } = path[path.length - 1];
    const moves = [
      { x: x + 1, y },
      { x, y: y + 1 },
      { x: x - 1, y },
      { x, y: y - 1 },
    ];

    for (const move of moves) {
      const next = coords[move.y]?.[move.x];

      if (!next || next > val + 1 || visited.has(`${move.x},${move.y}`)) continue;

      if (move.x === end!.x && move.y === end!.y) {
        console.log(path.length);
        break loop;
      }

      visited.add(`${move.x},${move.y}`);
      paths.push([...path, { val: next, ...move }]);
    }
  }
}
