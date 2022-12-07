// Advent of Code 2022 - Day 7a

const file = await Deno.readTextFile('input.txt');
const lines = file.split('\r\n');

type File = { name: string; size: number };

class Dir {
  parent: Dir;
  name: string;
  files: File[] = [];
  dirs: Dir[] = [];

  constructor(parent: Dir, name: string) {
    this.parent = parent;
    this.name = name;
  }

  get size(): number {
    return [...this.files, ...this.dirs].reduce((prev, curr) => prev + curr.size, 0);
  }
}

let dir = new Dir(null!, '/');

lines.slice(1).forEach((line) => {
  if (line.includes('$ cd ')) {
    if (line.includes('..')) {
      dir = dir.parent;
    } else {
      const new_dir = new Dir(dir, line.replace('$ cd ', ''));
      dir.dirs.push(new_dir);
      dir = new_dir;
    }
  }
  if (!line.match(/(dir|\$)/)) {
    const [size, name] = line.split(' ');
    dir.files.push({ name, size: Number(size) });
  }
});

const getRoot = (dir: Dir): Dir => (dir.name === '/' ? dir : getRoot(dir.parent));
const root = getRoot(dir);

const list = (root: Dir) => {
  const dirs = root.dirs.filter((dir) => dir.size <= 100_000);
  root.dirs.forEach((dir) => dirs.push(...list(dir)));
  return dirs;
};

const ouput = list(root).reduce((prev, curr) => prev + curr.size, 0);

console.log(ouput);
