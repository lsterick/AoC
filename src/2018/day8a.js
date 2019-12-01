function recursiveThing(input, totalThusFar) {
  let childCount = input[0];
  let metadataCount = input[1];
  let startIndex = 2;
  console.log(
    "recursiveThing starting childCount = " +
      childCount +
      " and metadataCount = " +
      metadataCount
  );
  console.log("input = ", input);

  for (let i = 0; i < childCount; i++) {
    const result = recursiveThing(input.slice(startIndex), totalThusFar);
    startIndex += result.nodeSize;
    totalThusFar = result.totalThusFar;
    console.log("child complete, total = " + totalThusFar);
  }

  metadataCount += startIndex;
  for (; startIndex < metadataCount; startIndex++) {
    totalThusFar = totalThusFar + input[startIndex];
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
