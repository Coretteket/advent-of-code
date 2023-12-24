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
let founds: boolean[] = [false];
let currents: Record<string, string> = {};

console.log(Object.keys(nodes).filter((x) => x.endsWith('A')));

while (!founds.every(Boolean)) {
  founds = [];
  Object.keys(nodes)
    .filter((x) => x.endsWith('A'))
    .forEach((from) => {
      const dir = route[steps % route.length] as 'L' | 'R';
      const node = nodes[currents[from] ?? from][dir];
      if (node === currents[from]) throw new Error('loop');
      founds.push(node.endsWith('Z'));
      currents[from] = node;
    });

  if (founds.some(Boolean)) console.log(founds, steps);
  steps++;
}

console.log(steps);
