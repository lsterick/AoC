export default function(input) {
  input = input.split("\n");
  let currentGeneration = input[0].slice(15).split("");
  let nextGeneration = {};
  let start = -2;
  let end = currentGeneration.length + 2;
  let rules = {};
  for (let i = 2; i < input.length; i++) {
    rules[input[i].slice(0, 5)] = input[i].slice(9);
  }

  for (
    let generationCounter = 1;
    generationCounter <= 200;
    generationCounter++
  ) {
    for (let q = start; q < end; q++) {
      const interestingChunk = `${currentGeneration[q - 2] ||
        "."}${currentGeneration[q - 1] || "."}${currentGeneration[q] ||
        "."}${currentGeneration[q + 1] || "."}${currentGeneration[q + 2] ||
        "."}`;
      nextGeneration[q] = rules[interestingChunk];

      if (nextGeneration[q] === "#") {
        if (start > q - 2) {
          start = q - 2;
        } else if (end < q + 2) {
          end = q + 3;
        }
      }
    }

    currentGeneration = JSON.parse(JSON.stringify(nextGeneration));

    let total = 0;
    for (let i = start; i < end; i++) {
      if (nextGeneration[i] === "#") {
        total += i;
      }
    }
    console.log("generation: ", generationCounter, " total: ", total);
  }

  let total = 0;
  for (let i = start; i < end; i++) {
    if (nextGeneration[i] === "#") {
      total += i;
    }
  }

  total += 49999999800 * 22;
  return total.toString();
}
