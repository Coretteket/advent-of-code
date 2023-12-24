const input = await Bun.file('input.txt').text();

const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

function getType(hand: string) {
  const result: Record<string, number> = {};
  for (const card of hand) (result[card] = result[card] || 0), result[card]++;
  const counts = Object.values(result).sort((a, b) => b - a);
  return counts[0] - counts.length;
}

function compareHands(a: string, b: string) {
  const [typeA, typeB] = [getType(a), getType(b)];
  if (typeA !== typeB) return typeA - typeB;
  for (let i = 0; i < a.length; i++) {
    const [cardA, cardB] = [cards.indexOf(a[i]), cards.indexOf(b[i])];
    if (cardA !== cardB) return cardB - cardA;
  }
}

const sum = input
  .split('\n')
  .map((line) => line.split(' ') as [string, number])
  .sort(([a], [b]) => compareHands(a, b) ?? 0)
  .reduce((acc, [, score], i) => acc + score * (i + 1), 0);

console.log(sum);
