const input = await Bun.file('input.txt').text();

const [routes, instr] = input.split('\n\n').map((x) => x.split('\n'));
const route = routes[0].split('');

const nodes = Object.fromEntries(
  instr.map((x) => {
    const [from, rest] = x.split(' = (');
    const [L, R] = rest.replace(')', '').split(', ');
    return [from, { L, R }];
  })
);

let steps = 0;
let found = false;
let current = 'AAA';

while (!found) {
  const dir = route[steps % route.length] as 'L' | 'R';
  const node = nodes[current][dir];
  if (node === current) throw new Error('loop');
  if (node === 'ZZZ') found = true;
  else current = node;
  steps++;
}

console.log(steps);
