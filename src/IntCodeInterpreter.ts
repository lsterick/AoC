export default function(input: string): string {
  const memory: Array<number> = input.split(",").map(i => parseInt(i));

  for (let i = 0; ; i += 4) {
    if (memory[i] === 99) {
      break;
    } else if (memory[i] === 1) {
      memory[memory[i + 3]] = memory[memory[i + 1]] + memory[memory[i + 2]];
    } else if (memory[i] === 2) {
      memory[memory[i + 3]] = memory[memory[i + 1]] * memory[memory[i + 2]];
    } else {
      return "Invalid instruction!";
    }
  }

  return memory[0].toString();
}
