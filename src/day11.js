function createArray(x, y) {
  return Array(x)
    .fill()
    .map(() =>
      Array(y)
        .fill()
        .map(() => -10)
    );
}

function calcPowerLevel(i, j, input) {
  const rackId = i + 10;
  let output = rackId * j;
  // initial mucking around
  output += input;
  output *= rackId;
  // pick out the hundreds digit
  output = Math.floor(output / 100) % 10;
  // subtract 5
  output -= 5;

  return output;
}

function powerOfAddedArea(rack, x, y, size) {
  let output = 0;
  for (let i = x; i < x + size; i++) {
    output += rack[i][y + size - 1];
  }

  for (let j = y; j < y + size - 1; j++) {
    output += rack[x + size - 1][j];
  }
  return output;
}

export default function(input) {
  input = parseInt(input);
  let rack = createArray(301, 301);
  let totalsUpToK = createArray(301, 301);

  // Find all power levels
  for (let i = 1; i < rack.length; i++) {
    for (let j = 1; j < rack[i].length; j++) {
      rack[i][j] = calcPowerLevel(i, j, input);
      totalsUpToK[i][j] = rack[i][j];
    }
  }

  let maxTotal = {
    value: -46,
    x: 0,
    y: 0
  };

  // Find grid with the most power
  for (let i = 1; i < rack.length; i++) {
    for (let j = 1; j < rack[i].length; j++) {
      for (let k = 2; k <= 300; k++) {
        if (i + k < rack.length && j + k < rack.length) {
          totalsUpToK[i][j] += powerOfAddedArea(rack, i, j, k);

          if (totalsUpToK[i][j] > maxTotal.value) {
            maxTotal.value = totalsUpToK[i][j];
            maxTotal.x = i;
            maxTotal.y = j;
            maxTotal.size = k;
          }
        }
      }
    }
  }

  return `${maxTotal.x},${maxTotal.y},${maxTotal.size}`;
}
