function createArray(x, y) {
  return Array(x)
    .fill()
    .map(() =>
      Array(y)
        .fill()
        .map(() => " ")
    );
}

function incrementDirection(currentDirection) {
  if (currentDirection === "left") {
    return "straight";
  } else if (currentDirection === "straight") {
    return "right";
  } else if (currentDirection === "right") {
    return "left";
  }

  return false;
}

function rotateArrowLeft(currentArrow) {
  switch (currentArrow) {
    case "^":
      return "<";
    case "<":
      return "v";
    case "v":
      return ">";
    case ">":
      return "^";
  }
}

function rotateArrowRight(currentArrow) {
  switch (currentArrow) {
    case "^":
      return ">";
    case "<":
      return "^";
    case "v":
      return "<";
    case ">":
      return "v";
  }
}

export default function(input) {
  let currentTrack = input.split("\n").map(element => {
    return element.split("");
  });
  let nextTrack = createArray(currentTrack.length, currentTrack[0].length);

  // Convert arrows to cart objects
  for (let q = 0; q < currentTrack.length; q++) {
    for (let w = 0; w < currentTrack[q].length; w++) {
      if (currentTrack[q][w] === "<") {
        currentTrack[q][w] = {
          underlyingTrackElement: "-",
          direction: "<",
          nextTurn: "left"
        };
      } else if (currentTrack[q][w] === ">") {
        currentTrack[q][w] = {
          underlyingTrackElement: "-",
          direction: ">",
          nextTurn: "left"
        };
      } else if (currentTrack[q][w] === "v") {
        currentTrack[q][w] = {
          underlyingTrackElement: "|",
          direction: "V",
          nextTurn: "left"
        };
      } else if (currentTrack[q][w] === "^") {
        currentTrack[q][w] = {
          underlyingTrackElement: "|",
          direction: "^",
          nextTurn: "left"
        };
      }
    }
  }

  // simulate in infinite loop until collision
  for (let tick = 1; ; tick++) {
    for (let i = 0; i < currentTrack[0].length; i++) {
      for (let j = 0; j < currentTrack.length; j++) {
        // if the current spot contains a cart
        if (typeof currentTrack[j][i] === "object") {
          let newX, newY;
          // move forward
          switch (currentTrack[j][i].direction) {
            case "<":
              newX = i - 1;
              newY = j;
              break;
            case ">":
              newX = i + 1;
              newY = j;
              break;
            case "V":
              newX = i;
              newY = j + 1;
            case "^":
              newX = i;
              newY = j - 1;
            default:
              throw new Error();
          }
          if (typeof nextTrack[newX][newY] === "object") {
            // collision!
            return `${newX},${newY}`;
          }
          nextTrack[j][i] = currentTrack[j][i].underlyingTrackElement;
          nextTrack[newX][newY] = {
            underlyingTrackElement: currentTrack[newX][newY]
            // direction/next turn to be set later
          };
          switch (currentTrack[newX][newY]) {
            case "|":
            case "-":
              nextTrack[newX][newY].direction = currentTrack[j][i].direction;
              nextTrack[newX][newY].nextTurn = currentTrack[j][i].nextTurn;
              break;
            case "/":
              nextTrack[newX][newY].direction =
                currentTrack[j][i].direction === "^" ? ">" : "v";
              nextTrack[newX][newY].nextTurn = currentTrack[j][i].nextTurn;
              break;
            case "\\":
              nextTrack[newX][newY].direction =
                currentTrack[j][i].direction === "v" ? ">" : "^";
              nextTrack[newX][newY].nextTurn = currentTrack[j][i].nextTurn;
              break;
            case "+":
              switch (currentTrack[j][i].nextTurn) {
                case "straight":
                  nextTrack[newX][newY].direction =
                    currentTrack[j][i].direction;
                  break;
                case "left":
                  nextTrack[newX][newY].direction = rotateArrowLeft(
                    currentTrack[j][i].direction
                  );
                  break;
                case "right":
                  nextTrack[newX][newY].direction = rotateArrowRight(
                    currentTrack[j][i].direction
                  );
                  break;
                default:
                  throw new Error();
              }
              nextTrack[newX][newY].nextTurn = incrementDirection(
                currentTrack[j][i].nextTurn
              );
              break;
            default:
              throw new Error();
          }
        } else {
          if (
            nextTrack[j][i] !== "<" &&
            nextTrack[j][i] !== ">" &&
            nextTrack[j][i] !== "v" &&
            nextTrack[j][i] !== "^"
          ) {
            nextTrack[j][i] = currentTrack[j][i];
          }
        }
      }
    }
    currentTrack = JSON.parse(JSON.stringify(nextTrack));
  }
}
