// Advent of Code 2022 - Day 11a

const file = await Deno.readTextFile('input.txt');
const groups = file.replace(/\r/g, '').split('\n\n').map((g) => g.split('\n'));

const monkeys = groups.map((g) => {
  const id = Number(g[0].replace(/.* ([0-9]*):/, '$1'));
  const items = g[1].replace(/.*: (.*)/, '$1').split(', ').map(Number);
  const next = (val: number) => eval(g[2].replace(/.*= (.*)/, '$1').replace(/old/g, val.toString()));
  const test = (val: number) => val % Number(g[3].replace(/.*by ([0-9]+)/g, '$1')) === 0;
  const pass = (val: number) => Number((test(val) ? g[4] : g[5]).replace(/.* ([0-9]+)/, '$1'));
  const inspected = 0;
  return { id, items, next, test, pass, inspected };
});

for (let r = 1; r <= 20; r++) {
  monkeys.forEach((monkey) => {
    while (monkey.items.length > 0) {
      const next = Math.floor(monkey.next(monkey.items.shift()!) / 3);
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
