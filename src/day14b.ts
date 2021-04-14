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

function recursivePermutations(address: number, bitmask: string, value: number, memory: any, index = -1){
  index++;
  
  if(index === 36){
    memory[address] = value;
    return;
  } 

  let addressString = address.toString(2);

  while (addressString.length < 36) {
    addressString = '0' + addressString;
  }

  if (bitmask[index] === '0') {
    recursivePermutations(address, bitmask, value, memory, index);
  } else if (bitmask[index] === "1"){
    recursivePermutations(parseInt(addressString.substr(0, index) + '1' + addressString.substr(index + 1), 2), bitmask, value, memory, index);
  } else {
    recursivePermutations(parseInt(addressString.substr(0, index) + '1' + addressString.substr(index + 1), 2), bitmask, value, memory, index);
    recursivePermutations(parseInt(addressString.substr(0, index) + '0' + addressString.substr(index + 1), 2), bitmask, value, memory, index);
  }
}

export default function (input: string): string {
  const instructions: Array<{type: string, address: number, value: string}> = input.split("\n")
    .map((line) => {return {type: line.slice(0, 4), address: parseInt(line.split('[')[1]?.split(']')[0]), value: line.split(' = ')[1]}});

  const memory: any = {};

  //68719476735; //36 ones
  let bitmask = '';

  for(let i = 0; i < instructions.length; i++){
    if(instructions[i].type === 'mask'){
      bitmask = instructions[i].value;
    } else {
      recursivePermutations(instructions[i].address, bitmask, parseInt(instructions[i].value), memory)
    }
  }

  let sumOfMemory = 0;
  for(const index in memory){
      sumOfMemory += memory[index];
  }
  
  return (sumOfMemory).toString();
}
