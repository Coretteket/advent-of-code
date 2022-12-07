// Advent of Code 2022 - Day 7b

const file = await Deno.readTextFile('input.txt');
const lines = file.split('\r\n');

class File {
  name: string;
  size: number;

  constructor(name: string, size: string | number) {
    this.name = name;
    this.size = Number(size);
  }
}

class Dir {
  parent: Dir;
  name: string;
  children: File[] = [];
  dirs: Dir[] = [];

  constructor(parent: Dir, name: string) {
    this.parent = parent;
    this.name = name;
  }

  addKid(name: string, size: string) {
    this.children.push(new File(name, size));
  }

  addDir(dir: Dir) {
    this.dirs.push(dir);
  }

  get size(): number {
    return [...this.children, ...this.dirs].reduce((prev, curr) => prev + curr.size, 0);
  }
}

let dir = new Dir(null!, '/');

lines.slice(1).forEach((line) => {
  if (line.includes('$ cd ')) {
    if (line.includes('..')) {
      dir = dir.parent;
    } else {
      const new_dir = new Dir(dir, line.replace('$ cd ', ''));
      dir.addDir(new_dir);
      dir = new_dir;
    }
  }
  if (!line.match(/(dir|\$)/)) {
    const [number, name] = line.split(' ');
    dir.addKid(name, number);
  }
});

const total_size = 70_000_000;
const min_unused = 30_000_000;

const getRoot = (dir: Dir) => {
  if (dir.name === '/' && dir.parent === null) return dir;
  return dir.parent;
};

const root = getRoot(dir);

const list = (root: Dir) => {
  const dirs = [...root.dirs];
  root.dirs.forEach((dir) => dirs.push(...list(dir)));
  return dirs;
};

const output = list(root)
  .filter((dir) => dir.size >= min_unused + root.size - total_size)
  .sort((a, b) => a.size - b.size)[0].size;

console.log(output);
