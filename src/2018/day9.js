function createArray(length) {
  var arr = new Array(length || 0),
    i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }

  return arr;
}

function print(marbles, seenNumbers) {
  if (seenNumbers.includes(marbles.number)) {
    return "";
  }
  seenNumbers.push(marbles.number);
  return `${marbles.number}, ` + print(marbles.next, seenNumbers);
}

export default function(input) {
  const totalElves = input.split("\n")[0];
  const totalTurns = input.split("\n")[1];
  let scores = [];
  for (let i = 0; i < totalElves; i++) {
    scores.push(0);
  }
  let marbles = {
    number: 0
  };
  marbles.next = marbles; // Clockwise
  marbles.prev = marbles; // Counter-clockwise
  let turn = 1;

  for (let i = 0; ; i = (i + 1) % totalElves) {
    if (turn > totalTurns) {
      console.log(scores);
      return scores
        .reduce(function(a, b) {
          return Math.max(a, b);
        })
        .toString();
    } else if (turn % 23 !== 0) {
      let newMarble = {
        number: turn,
        next: marbles.next.next,
        prev: marbles.next
      };

      newMarble.prev.next = newMarble;
      newMarble.next.prev = newMarble;

      marbles = newMarble;
    } else {
      scores[i] += turn;
      let marbleToRemove = marbles.prev.prev.prev.prev.prev.prev.prev;
      scores[i] += marbleToRemove.number;
      marbles = marbleToRemove.next;

      marbleToRemove.next.prev = marbleToRemove.prev;
      marbleToRemove.prev.next = marbleToRemove.next;
    }

    turn++;
  }
}
