const input = await Bun.file('input.txt').text();
const groups = input.split('\n\n');

const output = groups.slice(1).reduce(
  (nums, group) =>
    nums.map((n) => {
      for (const [dst, src, len] of group
        .split('\n')
        .slice(1)
        .map((m) => m.split(' ').map(Number)))
        if (n >= src && n < src + len) return n - src + dst;
      return n;
    }),
  groups[0].replace('seeds: ', '').split(' ').map(Number)
);

console.log(Math.min(...output));
