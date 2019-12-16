function countParticularDigit(layer: string, target: string) {
  let count = 0;
  for (let i = 0; i < layer.length; i++) {
    if (layer[i] === target) {
      count++;
    }
  }
  return count;
}

export default function(input: string) {
  let layers: string[] = [];
  for (let i = 0; i < input.length / 150; i++) {
    layers[i] = input.substr(i * 150, 150);
  }
  let leastZeros = Number.MAX_SAFE_INTEGER;
  let layerWithLeastZeros = -1;

  for (let i = 0; i < layers.length; i++) {
    const zerosHere = countParticularDigit(layers[i], "0");
    if (zerosHere < leastZeros) {
      layerWithLeastZeros = i;
      leastZeros = zerosHere;
    }
  }

  return (
    countParticularDigit(layers[layerWithLeastZeros], "1") *
    countParticularDigit(layers[layerWithLeastZeros], "2")
  ).toString();
}
