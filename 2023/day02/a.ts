const input = await Bun.file('input.txt').text();

let sum = 0;

for (const [idx, game] of input.split('\n').entries()) {
  let possible = true;
  for (const round of game.replace(/.+:\s/, '').split('; ')) {
    for (const ball of round.split(', ')) {
      const [num, col] = ball.split(' ');
      const int = parseInt(num);
      if (col === 'red' && int > 12) possible = false;
      else if (col === 'green' && int > 13) possible = false;
      else if (col === 'blue' && int > 14) possible = false;
    }
  }
  if (possible) sum += idx + 1;
}

console.log(sum);
