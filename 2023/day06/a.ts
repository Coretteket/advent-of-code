const input = await Bun.file('input.txt').text();

const [time, distance] = input
  .split('\n')
  .map((line) => line.trim().split(/\s+/).slice(1).map(Number));

const product = time.reduce((p, t, i) => {
  let opts = 0;
  for (let j = 1; j < t; j++) if ((t - j) * j > distance[i]) opts++;
  return opts * p;
}, 1);

console.log(product);
