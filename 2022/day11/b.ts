// Advent of Code 2022 - Day 11b

const file = await Deno.readTextFile('input.txt');
const groups = file.replace(/\r/g, '').split('\n\n').map((g) => g.split('\n'));

const monkeys = groups.map((g) => {
  const id = Number(g[0].replace(/.* ([0-9]*):/, '$1'));
  const items = g[1].replace(/.*: (.*)/, '$1').split(', ').map(Number);
  const oper = g[2].replace(/.*= (.*)/, '$1').split(' ');
  const [_, sym, bVal] = oper;
  const next = (val: number) => {
    const b = bVal === 'old' ? val : parseInt(bVal, 10);
    return sym === '*' ? val * b : val + b;
  };
  const divisor = Number(g[3].replace(/.*by ([0-9]+)/g, '$1'));
  const pass = (val: number) => Number((val % divisor === 0 ? g[4] : g[5]).replace(/.* ([0-9]+)/, '$1'));
  const inspected = 0;
  return { id, items, next, divisor, pass, inspected };
});

const mod = monkeys.reduce((a, b) => a * b.divisor, 1);

for (let r = 1; r <= 1e4; r++) {
  monkeys.forEach((monkey) => {
    while (monkey.items.length > 0) {
      const next = monkey.next(monkey.items.shift()!) % mod;
      const pass = monkey.pass(next);
      monkeys[pass].items.push(next);
      monkey.inspected++;
    }
  });
}

const output = monkeys
  .map((m) => m.inspected)
  .sort((a, b) => b - a)
  .slice(0, 2)
  .reduce((a, b) => a * b, 1);

console.log(output);