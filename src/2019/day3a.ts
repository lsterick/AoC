function markSpot(x: number, y: number, arrayToMark: any[]) {
  let markedArray = [...arrayToMark];

  if (!markedArray[x]) {
    markedArray[x] = [];
  }

  markedArray[x][y] = 1;

  return markedArray;
}

function checkSpot(
  x: number,
  y: number,
  arrayToCheck: any[],
  minDistanceSoFar: number
) {
  if (arrayToCheck[x] && arrayToCheck[x][y] === 1) {
    const distance = Math.abs(x) + Math.abs(y);
    if (distance < minDistanceSoFar) {
      return distance;
    }
  }

  return minDistanceSoFar;
}

function doSomethingToWire(
  wire: { direction: string; distance: number }[],
  operation: any,
  wire1Array: any[],
  minDistanceSoFar: number
) {}

export default function(input: string): string {
  const inputs = input.split("\n");
  const wire1 = inputs[0].split(",").map(a => {
    return { direction: a.substr(0, 1), distance: parseInt(a.substr(1)) };
  });
  const wire2 = inputs[1].split(",").map(a => {
    return { direction: a.substr(0, 1), distance: parseInt(a.substr(1)) };
  });
  let result = Number.MAX_SAFE_INTEGER;
  let wire1Array: any[] = [];
  let minDistanceSoFar = Number.MAX_SAFE_INTEGER;

  // create wire1Array
  let currentPosition = { x: 0, y: 0 };
  wire1.forEach(vector => {
    if (vector.direction === "R") {
      for (let i = 0; i < vector.distance; i++) {
        wire1Array = markSpot(
          currentPosition.x + i,
          currentPosition.y,
          wire1Array
        );
      }
      currentPosition = {
        x: currentPosition.x + vector.distance,
        y: currentPosition.y
      };
    } else if (vector.direction === "U") {
      for (let i = 0; i < vector.distance; i++) {
        wire1Array = markSpot(
          currentPosition.x,
          currentPosition.y + i,
          wire1Array
        );
      }
      currentPosition = {
        x: currentPosition.x,
        y: currentPosition.y + vector.distance
      };
    } else if (vector.direction === "L") {
      for (let i = 0; i < vector.distance; i++) {
        wire1Array = markSpot(
          currentPosition.x - i,
          currentPosition.y,
          wire1Array
        );
      }
      currentPosition = {
        x: currentPosition.x - vector.distance,
        y: currentPosition.y
      };
    } else if (vector.direction === "D") {
      for (let i = 0; i < vector.distance; i++) {
        wire1Array = markSpot(
          currentPosition.x,
          currentPosition.y - i,
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
  wire2.forEach(vector => {
    if (vector.direction === "R") {
      for (let i = 0; i < vector.distance; i++) {
        minDistanceSoFar = checkSpot(
          currentPosition.x + i,
          currentPosition.y,
          wire1Array,
          minDistanceSoFar
        );
      }
      currentPosition = {
        x: currentPosition.x + vector.distance,
        y: currentPosition.y
      };
    } else if (vector.direction === "U") {
      for (let i = 0; i < vector.distance; i++) {
        minDistanceSoFar = checkSpot(
          currentPosition.x,
          currentPosition.y + i,
          wire1Array,
          minDistanceSoFar
        );
      }
      currentPosition = {
        x: currentPosition.x,
        y: currentPosition.y + vector.distance
      };
    } else if (vector.direction === "L") {
      for (let i = 0; i < vector.distance; i++) {
        minDistanceSoFar = checkSpot(
          currentPosition.x - i,
          currentPosition.y,
          wire1Array,
          minDistanceSoFar
        );
      }
      currentPosition = {
        x: currentPosition.x - vector.distance,
        y: currentPosition.y
      };
    } else if (vector.direction === "D") {
      for (let i = 0; i < vector.distance; i++) {
        minDistanceSoFar = checkSpot(
          currentPosition.x,
          currentPosition.y - i,
          wire1Array,
          minDistanceSoFar
        );
      }
      currentPosition = {
        x: currentPosition.x,
        y: currentPosition.y - vector.distance
      };
    }
  });
  return minDistanceSoFar.toString();
}
