function markSpot(x: number, y: number, steps: number, arrayToMark: any[]) {
  let markedArray = [...arrayToMark];

  if (!markedArray[x]) {
    markedArray[x] = [];
  }

  //if (!markedArray[x][y]) {
  // Possible problem?
  markedArray[x][y] = steps;
  //}

  return markedArray;
}

function checkSpot(
  x: number,
  y: number,
  steps: number,
  arrayToCheck: any[],
  minStepsSoFar: number
) {
  if (arrayToCheck[x] && arrayToCheck[x][y]) {
    if (steps + arrayToCheck[x][y] < minStepsSoFar) {
      return steps + arrayToCheck[x][y];
    }
  }

  return minStepsSoFar;
}

export default function(input: string): string {
  const inputs = input.split("\n");
  const wire1 = inputs[0].split(",").map(a => {
    return { direction: a.substr(0, 1), distance: parseInt(a.substr(1)) };
  });
  const wire2 = inputs[1].split(",").map(a => {
    return { direction: a.substr(0, 1), distance: parseInt(a.substr(1)) };
  });
  let wire1Array: any[] = [];
  let minStepsSoFar = Number.MAX_SAFE_INTEGER;

  // create wire1Array
  let currentPosition = { x: 0, y: 0 };
  let totalSteps = -1;
  wire1.forEach(vector => {
    if (vector.direction === "R") {
      for (let i = 0; i < vector.distance; i++) {
        totalSteps++;
        wire1Array = markSpot(
          currentPosition.x + i,
          currentPosition.y,
          totalSteps,
          wire1Array
        );
      }
      currentPosition = {
        x: currentPosition.x + vector.distance,
        y: currentPosition.y
      };
    } else if (vector.direction === "U") {
      for (let i = 0; i < vector.distance; i++) {
        totalSteps++;
        wire1Array = markSpot(
          currentPosition.x,
          currentPosition.y + i,
          totalSteps,
          wire1Array
        );
      }
      currentPosition = {
        x: currentPosition.x,
        y: currentPosition.y + vector.distance
      };
    } else if (vector.direction === "L") {
      for (let i = 0; i < vector.distance; i++) {
        totalSteps++;
        wire1Array = markSpot(
          currentPosition.x - i,
          currentPosition.y,
          totalSteps,
          wire1Array
        );
      }
      currentPosition = {
        x: currentPosition.x - vector.distance,
        y: currentPosition.y
      };
    } else if (vector.direction === "D") {
      for (let i = 0; i < vector.distance; i++) {
        totalSteps++;
        wire1Array = markSpot(
          currentPosition.x,
          currentPosition.y - i,
          totalSteps,
          wire1Array
        );
      }
      currentPosition = {
        x: currentPosition.x,
        y: currentPosition.y - vector.distance
      };
    }
  });

  wire1Array[0][0] = 0;

  // process wire2
  currentPosition = { x: 0, y: 0 };
  totalSteps = -1;
  wire2.forEach(vector => {
    if (vector.direction === "R") {
      for (let i = 0; i < vector.distance; i++) {
        totalSteps++;
        minStepsSoFar = checkSpot(
          currentPosition.x + i,
          currentPosition.y,
          totalSteps,
          wire1Array,
          minStepsSoFar
        );
      }
      currentPosition = {
        x: currentPosition.x + vector.distance,
        y: currentPosition.y
      };
    } else if (vector.direction === "U") {
      for (let i = 0; i < vector.distance; i++) {
        totalSteps++;
        minStepsSoFar = checkSpot(
          currentPosition.x,
          currentPosition.y + i,
          totalSteps,
          wire1Array,
          minStepsSoFar
        );
      }
      currentPosition = {
        x: currentPosition.x,
        y: currentPosition.y + vector.distance
      };
    } else if (vector.direction === "L") {
      for (let i = 0; i < vector.distance; i++) {
        totalSteps++;
        minStepsSoFar = checkSpot(
          currentPosition.x - i,
          currentPosition.y,
          totalSteps,
          wire1Array,
          minStepsSoFar
        );
      }
      currentPosition = {
        x: currentPosition.x - vector.distance,
        y: currentPosition.y
      };
    } else if (vector.direction === "D") {
      for (let i = 0; i < vector.distance; i++) {
        totalSteps++;
        minStepsSoFar = checkSpot(
          currentPosition.x,
          currentPosition.y - i,
          totalSteps,
          wire1Array,
          minStepsSoFar
        );
      }
      currentPosition = {
        x: currentPosition.x,
        y: currentPosition.y - vector.distance
      };
    }
  });
  return minStepsSoFar.toString();
}
