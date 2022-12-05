// Advent of Code 2022 - Day 5b

const file = await Deno.readTextFile('input.txt');
const [input, moves] = file.split('\n\n').map((p) => p.split('\n'));

const stacks: string[][] = [];

for (let i = 0; i < new Number(input.at(-1)?.trim().at(-1)); i++) {
  const stack: string[] = [];

  for (let j = input.length - 2; j >= 0; j--) {
    const char = input[j][i * 4 + 1]?.trim();
    if (char) stack.push(char);
  }

  stacks.push(stack);
}

moves.forEach((move) => {
  const [no, fr, to] = move
    .split(/(move | from | to )/g)
    .filter((l) => !/[\sa-z]/.test(l) && l.length > 0)
    .map(Number);

  const moving: string[] = [];
  for (let j = 0; j < no; j++) {
    moving.push(stacks[fr - 1].pop()!);
  }

  moving.reverse().forEach((m) => stacks[to - 1].push(m));
});

const output = stacks.map((s) => s.pop()).join('');

console.log(output);
