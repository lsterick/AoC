function and36 (a: number, b: number): number{
  var w = 4294967296; // 2^32

  var aHI = Math.round(a / w);
  var aLO = a % w;
  var bHI = Math.round(b / w);
  var bLO = b % w;

  return (aHI & bHI) * w + (aLO & bLO);
}

function or36(a: number, b: number): number {
  var w = 4294967296; // 2^32

  var aHI = Math.round(a / w);
  var aLO = a % w;
  var bHI = Math.round(b / w);
  var bLO = b % w;

  return (aHI | bHI) * w + (aLO | bLO);
}

export default function (input: string): string {
  const instructions: Array<{type: string, address: number, value: string}> = input.split("\n")
    .map((line) => {return {type: line.slice(0, 4), address: parseInt(line.split('[')[1]?.split(']')[0]), value: line.split(' = ')[1]}});

  const memory: Array<number> = [];

  let andBitmask = 68719476735; //36 ones
  let orBitmask = 0;
  for(let i = 0; i < instructions.length; i++){
    if(instructions[i].type === 'mask'){
      andBitmask = parseInt(instructions[i].value.replaceAll('X', '1'), 2)
      orBitmask = parseInt(instructions[i].value.replaceAll('X', '0'), 2);
    } else {
      let value = parseInt(instructions[i].value)
      value = and36(andBitmask, value);
      value = or36(orBitmask, value);
      memory[instructions[i].address] = value;
    }
  }

  let sumOfMemory = 0;
  for(let i = 0; i < memory.length; i++){
    if(memory[i]){
      sumOfMemory += memory[i];
    }
  }
  
  return (sumOfMemory).toString();
}
