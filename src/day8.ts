function runCode(lines: Array<{operation: string, value: number}>){
  let lineVisited: boolean[] = [];
  let accumulator = 0;
  let nextInstruction = 0;

  while (!lineVisited[nextInstruction] && nextInstruction < lines.length){
    lineVisited[nextInstruction] = true;
    switch (lines[nextInstruction].operation){
      case 'nop':
        nextInstruction++;
        break;
      case 'acc':
        accumulator += lines[nextInstruction].value;
        nextInstruction++;
        break;
      case 'jmp':
        nextInstruction += lines[nextInstruction].value
        break;
    }
  }
  console.log(nextInstruction)

  return {isFinished: nextInstruction >= lines.length, accumulator}
}

export default function (input: string): string {
  const lines: Array<{operation: string, value: number}> = input.split("\n").map((line) => {
    const lineSplit = line.split(' ');
    return {
      operation: lineSplit[0],
      value: parseInt(lineSplit[1])
    }
  });
  
  for(let i = 0; i < lines.length; i++){
    if(lines[i].operation === 'nop' || lines[i].operation === 'jmp'){
      console.log('i = ', i)
      let tempCode = JSON.parse(JSON.stringify(lines));
      tempCode[i].operation = tempCode[i].operation === 'nop' ? 'jmp' : 'nop';
      const result = runCode(tempCode);
      if (result.isFinished){
        return result.accumulator.toString()
      }
    }
  }

  return "failed";
}