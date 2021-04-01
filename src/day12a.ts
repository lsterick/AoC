export default function (input: string): string {
  const instructions: Array<{action: string, value: number}> = input.split("\n").map((line) => {return {action: line.slice(0, 1), value: parseInt(line.slice(1))}});
  let currentDirection = 90;
  let x = 0;
  let y = 0;

  for (let i = 0; i < instructions.length; i++) {
    if(instructions[i].action === "F"){
      switch(currentDirection){
        case 0:
          instructions[i].action = "N";
          break;
        case 90:
          instructions[i].action = "E";
          break;
        case 180:
          instructions[i].action = "S";
          break;
        case 270:
          instructions[i].action = "W";
          break;
        default: 
          return "Error: invalid current direction"
      }
    }

    switch (instructions[i].action){
      case "N":
        y += instructions[i].value;
        break;
      case "S":
        y -= instructions[i].value;
        break;
      case "E":
        x += instructions[i].value;
        break;
      case "W":
        x -= instructions[i].value;
        break;

      case "L":
        currentDirection = (currentDirection - instructions[i].value + 360) % 360;
        break;
      case "R":
        currentDirection = (currentDirection + instructions[i].value) % 360
        break;
      
      default:
        return "Error: invalid action"
    }
  }

  return (Math.abs(x) + Math.abs(y)).toString();
}
