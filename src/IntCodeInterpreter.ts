// returns array of length <# of parameters>
function getAddressesToActOn(instruction: number[], opcodeAddress: number) {
  let parameterModes = Math.floor(instruction[0] / 100);
  let addresses: number[] = [];

  for (let i = 1; i < instruction.length; i++) {
    if (parameterModes % 10 === 1) {
      // immediate mode
      addresses.push(opcodeAddress + i);
    } else {
      // position mode
      addresses.push(instruction[i]);
    }

    parameterModes = Math.floor(parameterModes / 10);
  }

  return addresses;
}

export default function(code: string): string {
  const memory: Array<number> = code.split(",").map(i => parseInt(i));
  const input = [5];
  let inputIndex = 0;
  let output = "";

  for (let i = 0; ; ) {
    const opcode = memory[i] % 100;

    if (opcode === 99) {
      break;
    } else if (opcode === 1) {
      const addressesToActOn = getAddressesToActOn(memory.slice(i, i + 4), i);
      memory[addressesToActOn[2]] =
        memory[addressesToActOn[0]] + memory[addressesToActOn[1]];
      i += 4;
    } else if (opcode === 2) {
      const addressesToActOn = getAddressesToActOn(memory.slice(i, i + 4), i);
      memory[addressesToActOn[2]] =
        memory[addressesToActOn[0]] * memory[addressesToActOn[1]];
      i += 4;
    } else if (opcode === 3) {
      const addressesToActOn = getAddressesToActOn(memory.slice(i, i + 2), i);
      memory[addressesToActOn[0]] = input[inputIndex];
      inputIndex++;
      i += 2;
    } else if (opcode === 4) {
      const addressesToActOn = getAddressesToActOn(memory.slice(i, i + 2), i);
      output += `${memory[addressesToActOn[0]]}\n`;
      i += 2;
    } else if (opcode === 5) {
      const addressesToActOn = getAddressesToActOn(memory.slice(i, i + 3), i);
      if (memory[addressesToActOn[0]]) {
        i = memory[addressesToActOn[1]];
      } else {
        i += 3;
      }
    } else if (opcode === 6) {
      const addressesToActOn = getAddressesToActOn(memory.slice(i, i + 3), i);
      if (!memory[addressesToActOn[0]]) {
        i = memory[addressesToActOn[1]];
      } else {
        i += 3;
      }
    } else if (opcode === 7) {
      const addressesToActOn = getAddressesToActOn(memory.slice(i, i + 4), i);
      memory[addressesToActOn[2]] =
        memory[addressesToActOn[0]] < memory[addressesToActOn[1]] ? 1 : 0;
      i += 4;
    } else if (opcode === 8) {
      const addressesToActOn = getAddressesToActOn(memory.slice(i, i + 4), i);
      memory[addressesToActOn[2]] =
        memory[addressesToActOn[0]] === memory[addressesToActOn[1]] ? 1 : 0;
      i += 4;
    } else {
      return "Invalid instruction!";
    }
  }

  return output;
}
