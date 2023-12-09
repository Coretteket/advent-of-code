const input = await Bun.file('input.txt').text();

const [time, distance] = input
  .split('\n')
  .map((line) => +line.trim().split(/:\s+/).at(1)!.replace(/\s+/g, ''));

let opts = 0;
for (let j = 1; j < time; j++) if ((time - j) * j > distance) opts++;

console.log(opts);
