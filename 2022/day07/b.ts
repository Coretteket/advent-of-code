// Advent of Code 2022 - Day 7b

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

const getRoot = (dir: Dir) => (dir.name === '/' ? dir : dir.parent);
const root = getRoot(dir);

const list = (root: Dir) => {
  const dirs = [...root.dirs];
  root.dirs.forEach((dir) => dirs.push(...list(dir)));
  return dirs;
};

const output = list(root)
  .filter((dir) => dir.size >= root.size - 4e7)
  .sort((a, b) => a.size - b.size)[0].size;

console.log(output);
