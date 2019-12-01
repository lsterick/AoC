export default function(input) {
  input = input.split("\n").map(element => {
    return element.split("");
  });

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      let foundFirstDifference = false;
      let foundSecondDifference = false;
      for (let k = 0; k < input[i].length; k++) {
        if (input[i][k] !== input[j][k]) {
          if (foundFirstDifference) {
            foundSecondDifference = true;
            break;
          }
          foundFirstDifference = true;
        }
      }
      if (!foundSecondDifference) {
        return input[i] + " " + input[j];
      }
    }
  }
  return "N/A";
}
