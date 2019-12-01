function createArray(x, y) {
  return Array(x)
    .fill()
    .map(() =>
      Array(y)
        .fill()
        .map(() => " ")
    );
}

function prepareStringVersion(input, minX, minY, maxX, maxY) {
  // basically, subtract minimums from everything

  let output = createArray(maxX - minX + 1, maxY - minY + 1);
  // console.log(output);

  for (let i = 0; i < input.length; i++) {
    // console.log("x: ", input[i].position.x - minX);
    // console.log("y: ", input[i].position.y - minY);
    output[input[i].position.x - minX][input[i].position.y - minY] = "#";
  }

  for (let i = 0; i < output.length; i++) {
    output[i] = output[i].join("");
  }
  return output.join("\n");
}

export default function(input) {
  // Sample input line:
  // position=< 50200,  10144> velocity=<-5, -1>
  input = input.split("\n").map(element => {
    return {
      position: {
        x: parseInt(element.slice(10, 16)),
        y: parseInt(element.slice(18, 24))
      },
      velocity: {
        x: parseInt(element.slice(36, 38)),
        y: parseInt(element.slice(40, 43))
      }
    };
  });

  let second = 0;

  while (true) {
    let minX = 1000000;
    let minY = 10000000;
    let maxX = -1000000;
    let maxY = -1000000;
    // Update all points to the next second

    for (let i = 0; i < input.length; i++) {
      input[i].position.x += input[i].velocity.x;
      input[i].position.y += input[i].velocity.y;

      if (input[i].position.x < minX) {
        minX = input[i].position.x;
      }
      if (input[i].position.x > maxX) {
        maxX = input[i].position.x;
      }
      if (input[i].position.y < minY) {
        minY = input[i].position.y;
      }
      if (input[i].position.y > maxY) {
        maxY = input[i].position.y;
      }
    }
    second++;

    if (Math.abs(maxY - minY) < 16) {
      return second.toString();
      //return prepareStringVersion(input, minX, minY, maxX, maxY);
    }
  }
}
