export default function(input: string) {
  let layers: string[] = [];
  for (let i = 0; i < input.length / 150; i++) {
    layers[i] = input.substr(i * 150, 150);
  }
  let imageArray: string[] = [];

  // get top visible pixel for each position
  for (let i = 0; i < 150; i++) {
    for (let j = 0; j < layers.length; j++) {
      if (layers[j][i] !== "2") {
        imageArray.push(layers[j][i]);
        break;
      }
    }
  }

  // print nicely
  let imageString = "";
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 25; j++) {
      if (imageArray[i * 25 + j] === "0") {
        imageString += "▮";
      } else {
        imageString += "▯";
      }
    }
    imageString += "\n";
  }

  return imageString;
}
