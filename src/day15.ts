export default function (input: string): string {
  //const numbers: Array<number> = input.split(",").map((i) => parseInt(i));
  const numbers = [7, 12, 1, 0, 16]
  let prevNumber = 2;
  const prevOccuranceOfNumber = [3, 2, -1, -1, -1, -1, -1, 0, -1, -1, -1, -1, 1, -1, -1, -1, 4];

  for (let i = numbers.length; i < 29999999; i++){
    const prevIndexOfPrevNumber = prevOccuranceOfNumber[prevNumber];
    prevOccuranceOfNumber[prevNumber] = i;

    if(prevIndexOfPrevNumber === -1 || prevIndexOfPrevNumber === undefined){
      prevNumber = 0;
    } else {
      prevNumber = i - prevIndexOfPrevNumber;
    }
  }

  return prevNumber.toString();
}