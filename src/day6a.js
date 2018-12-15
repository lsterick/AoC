function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function manhattanDistance(a, b) {
  return Math.abs(b.x-a.x) + Math.abs(b.y-a.y);
}

export default function(input) {
  let spots = createArray(354 - 45, 361 - 46);
  input = input.split("\n").map(element => {
    element = element.split(", ")
    return {
      x: parseInt(element[0]) - 45,
      y: parseInt(element[1]) - 46,
      // x: parseInt(element[0]),
      // y: parseInt(element[1]),
    }
  });

  // TODO: parse input into [{ x:#, y:# }] and subtract 45 from x and 46 from y


  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < spots.length; j++) {
      for (let k = 0; k < spots[j].length; k++) {
        const mDistance = manhattanDistance(input[i], {x: j, y: k});

        if (!spots[j][k] || mDistance < spots[j][k].distance) {
          spots[j][k] = {
            distance: mDistance,
            id: i,
          }
        } else if (mDistance === spots[j][k].distance) {
          spots[j][k].id = undefined;
        }
      }
    }
  }

  input.fill(0);

  // Now the spots array is filled out
  for (let j = 0; j < spots.length; j++) {
    for (let k = 0; k < spots[j].length; k++) {
      if (input[spots[j][k].id] || input[spots[j][k].id] === 0) {
        if (j === 0 || j === spots.length - 1 || k === 0 || k === spots[j].length - 1) {
          input[spots[j][k].id] = false;
          continue;
        } else {
          input[spots[j][k].id]++;
        }
      }
    }
  }

  return input.reduce(function(a, b) {
    return Math.max(a, b);
  });
}
