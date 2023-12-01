const input = await Bun.file('input.txt').text();

const strings = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const value = input.split('\n').reduce((count, line) => {
  let numbers: { num: number; idx: number }[] = [];

  for (const string of strings) {
    const matches = line.matchAll(new RegExp(string, 'g'));
    for (const match of matches) {
      numbers.push({ num: strings.indexOf(match[0]) + 1, idx: match.index! });
    }
  }

  for (const number of [...Array(10).keys()]) {
    const matches = line.matchAll(new RegExp(`${number}`, 'g'));
    for (const match of matches) {
      numbers.push({ num: number, idx: match.index! });
    }
  }

  numbers.sort((a, b) => a.idx - b.idx);

  return numbers.at(0)!.num * 10 + numbers.at(-1)!.num * 1 + count;
}, 0);

console.log(value);
