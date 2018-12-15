function recursiveThing(input, totalThusFar) {
  let childCount = input[0];
  let metadataCount = input[1];
  let startIndex = 2;
  let childResults = [];
  console.log(
    "recursiveThing starting childCount = " +
      childCount +
      " and metadataCount = " +
      metadataCount
  );
  console.log("input = ", input);

  for (let i = 0; i < childCount; i++) {
    const result = recursiveThing(input.slice(startIndex), 0);
    startIndex += result.nodeSize;
    childResults.push(result.totalThusFar);
    console.log("child complete, childResults = ", childResults);
  }

  metadataCount += startIndex;
  for (; startIndex < metadataCount; startIndex++) {
    if (childCount === 0) {
      totalThusFar = totalThusFar + input[startIndex];
    } else {
      if (childResults[input[startIndex] - 1]) {
        totalThusFar = totalThusFar + childResults[input[startIndex] - 1];
      }
    }

    console.log("metadata complete, total = " + totalThusFar);
  }

  return {
    totalThusFar,
    nodeSize: startIndex
  };
}

export default function(input) {
  input = input.split(" ").map(element => {
    return parseInt(element);
  });

  return recursiveThing(input, 0).totalThusFar.toString();
}
