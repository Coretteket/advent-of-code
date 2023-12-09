const input = await Bun.file('input.txt').text();
const groups = input.split('\n\n');

type Range = [src: number, len: number];
type Map = [dst: number, src: number, len: number];

let ranges = groups[0]
  .replace('seeds: ', '')
  .split(' ')
  .map(Number)
  .reduce<Range[]>(
    (arr, item, idx) =>
      idx % 2 === 0
        ? [...arr, [item, 0]]
        : [...arr.slice(0, -1), [arr.at(-1)![0], item]],
    []
  );

for (const group of groups.slice(1).map((m) => m.split('\n'))) {
  const maps = group
    .slice(1)
    .map((m) => m.split(' ').map(Number))
    .sort(([_, a], [__, b]) => a - b) as Map[];

  let newRanges: Range[] = [];
  for (const [rngSrc, rngLen] of ranges) {
    let newMaps: Map[] = [];

    for (const [mapDst, mapSrc, mapLen] of maps)
      if (mapSrc + mapLen > rngSrc && mapSrc < rngSrc + rngLen) {
        const tsf = mapDst - mapSrc;
        const src = Math.max(rngSrc, mapSrc);
        const len = Math.min(rngSrc + rngLen, mapSrc + mapLen) - src;

        newMaps.push([src + tsf, src, len]);
      }

    let lastSrc = rngSrc;
    for (const [dst, src, len] of newMaps) {
      if (src > lastSrc) newRanges.push([lastSrc, src - lastSrc]);
      lastSrc = src + len;
      newRanges.push([dst, len]);
    }

    if (newRanges.length === 0) newRanges.push([rngSrc, rngLen]);
  }

  ranges = newRanges;
}

const lowest = ranges.reduce((min, [src]) => Math.min(min, src), Infinity);

console.log(lowest);
