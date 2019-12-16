//911 too low day 1

export default function(input: string) {
  const [start, end] = input.split("-").map(number => parseInt(number));
  let validPasswordCount = 0;

  for (let i = start; i <= end; i++) {
    let hasDoubleNumber = [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    ];
    let lessEqual = true;
    let iString = i.toString();
    for (let j = 1; j < 7; j++) {
      if (iString[j] === iString[j - 1]) {
        hasDoubleNumber[parseInt(iString[j])] = true;
        if (j >= 2 && iString[j] === iString[j - 2]) {
          hasDoubleNumber[parseInt(iString[j])] = false;
        }
      } else if (iString[j] < iString[j - 1]) {
        lessEqual = false;
        break;
      }
    }
    //console.log(`hasDoubleNumber = ${hasDoubleNumber}`);
    //console.log(`lessEqual = ${lessEqual}`);
    if (lessEqual) {
      for (var k = 0; k < hasDoubleNumber.length; k++) {
        if (hasDoubleNumber[k]) {
          validPasswordCount++;
          break;
        }
      }
    }
  }

  return validPasswordCount.toString();
}
