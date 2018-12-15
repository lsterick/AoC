function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

export default function(input) {
  input = input.split("\n").map(element => {
    const id = element.split(' @ ')[0].slice(1)
    element = element.split('@ ')[1];
    element = element.split(':'); // [0] == "left, top". [1] == "width, height"
    const distance = element[0].split(',');
    const size = element[1].split('x');
    return {
      id: parseInt(id),
      left: parseInt(distance[0]),
      top: parseInt(distance[1]),
      width: parseInt(size[0]),
      height: parseInt(size[1]),
      valid: true,
    }
  });

  // 1 => single claim, not reported
  // -2 => multiple claims, reported
  let fabric = createArray(10000, 10000)

  input.forEach(claim => {
    for (let i = claim.left; i < (claim.left + claim.width); i++) {
      for (let j = claim.top; j < (claim.top + claim.height); j++) {
        if (fabric[i][j]) {
          claim.valid = false;
          input[fabric[i][j] - 1].valid = false;
        } else {
          fabric[i][j] = claim.id;
        }
      }
    }
  })

  let output = -1;

  input.forEach(claim => {
    if(claim.valid) {
      output = claim.id.toString();
    }
  })

  return output.toString();
}
