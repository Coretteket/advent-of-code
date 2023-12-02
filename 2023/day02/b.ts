const input = await Bun.file('input.txt').text();

let sum = 0;

for (const game of input.split('\n')) {
  let max = { red: 0, green: 0, blue: 0 };
  for (const round of game.replace(/.+:\s/, '').split('; ')) {
    for (const ball of round.split(', ')) {
      const [num, col] = ball.split(' ') as [string, 'red' | 'green' | 'blue'];
      const int = parseInt(num);
      if (max[col] < int) max[col] = int;
    }
  }
  sum += max.red * max.green * max.blue;
}

console.log(sum);
