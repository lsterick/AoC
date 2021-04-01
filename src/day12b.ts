function right90 (waypointX:number, waypointY:number, x:number, y:number): Array<number> {
  let newX = x - (y - waypointY);
  let newY = y - (x - waypointX);

  return [newX, newY];
}

function turn180 (waypointX:number, waypointY:number, x:number, y:number): Array<number> {
  let newX = waypointX - 2*(waypointX - x);
  let newY = waypointY - 2*(waypointY - y);

  return [newX, newY];
}

function left90 (waypointX:number, waypointY:number, x:number, y:number): Array<number> {
  let newX = x + (y - waypointY);
  let newY = y + (x - waypointX);

  return [newX, newY];
}

export default function (input: string): string {
  const instructions: Array<{action: string, value: number}> = input.split("\n").map((line) => {return {action: line.slice(0, 1), value: parseInt(line.slice(1))}});
  let currentDirection = 90;
  let x = 0;
  let y = 0;
  let waypointX = 10;
  let waypointY = 1;

  for (let i = 0; i < instructions.length; i++) {
    switch (instructions[i].action){
      case "N":
        waypointY += instructions[i].value;
        break;
      case "S":
        waypointY -= instructions[i].value;
        break;
      case "E":
        waypointX += instructions[i].value;
        break;
      case "W":
        waypointX -= instructions[i].value;
        break;

      case "L":
        switch(instructions[i].value){
          case 90:
            [waypointX, waypointY] = left90(waypointX, waypointY, x, y)
            break;
          case 180:
            [waypointX, waypointY] = turn180(waypointX, waypointY, x, y)
            break;
          case 270:
            [waypointX, waypointY] = right90(waypointX, waypointY, x, y)
            break;
        } 
        break;
      case "R":
        switch(instructions[i].value){
          case 90:
            [waypointX, waypointY] = right90(waypointX, waypointY, x, y)
            break;
          case 180:
            [waypointX, waypointY] = turn180(waypointX, waypointY, x, y)
            break;
          case 270:
            [waypointX, waypointY] = left90(waypointX, waypointY, x, y)
            break;
        }
        break;

      case "F":
        // This bit's messed up
        const oldX = x;
        const oldY = y;
        x += ((oldX-waypointX) * instructions[i].value);
        y += ((oldY - waypointY) * instructions[i].value);
        waypointX = x + (oldX - waypointX);
        waypointY = y + (oldY - waypointY);
        break;
      
      default:
        return "Error: invalid action"
    }
  }

  return (Math.abs(x) + Math.abs(y)).toString();
}
