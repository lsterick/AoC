export default function(input: string): string {
  const initalMemory: Array<number> = input.split(",").map(i => parseInt(i));

  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      let memory = [...initalMemory];
      memory[1] = noun;
      memory[2] = verb;
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
      console.log(`noun = ${noun}, verb = ${verb}`);
      if (memory[0] === 19690720) {
        let result: number = 100 * noun + verb;
        return result.toString();
      }
    }
  }

  return "No valid noun/verb combos found";
}
