// Advent of Code 2022 - Day 2a

const file = await Deno.readTextFile('input.txt');
const games = file.split('\n').map((file) => file.split(' '));

const moves = [
  { name: 'rock', wins: 'scissors', them: 'A', us: 'X', score: 1 },
  { name: 'paper', wins: 'rock', them: 'B', us: 'Y', score: 2 },
  { name: 'scissors', wins: 'paper', them: 'C', us: 'Z', score: 3 },
];

const score = games.reduce((prev, game) => {
  const them = moves.find(({ them }) => them === game[0])!;
  const us = moves.find(({ us }) => us === game[1])!;
  if (them.name === us.wins) prev += 6;
  if (them.name === us.name) prev += 3;
  return prev + us.score;
}, 0);

console.log(score);