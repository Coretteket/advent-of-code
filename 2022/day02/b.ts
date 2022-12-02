// Advent of Code 2022 - Day 2b

const file = await Deno.readTextFile('input.txt');
const games = file.split('\n').map((file) => file.split(' '));

const moves = [
  { name: 'rock', wins: 'scissors', them: 'A', score: 1 },
  { name: 'paper', wins: 'rock', them: 'B', score: 2 },
  { name: 'scissors', wins: 'paper', them: 'C', score: 3 },
];

const getUs = (them: typeof moves[number], outcome: string) =>
  outcome === 'X'
    ? moves.find(({ name }) => name === them.wins)
    : outcome === 'Z'
    ? moves.find(({ wins }) => wins === them.name)
    : them;

const score = games.reduce((prev, game) => {
  const them = moves.find(({ them }) => them === game[0])!;
  const us = getUs(them, game[1])!;
  if (them.name === us.wins) prev += 6;
  if (them.name === us.name) prev += 3;
  return prev + us.score;
}, 0);

console.log(score);
