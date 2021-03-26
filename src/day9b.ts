export default function (input: string): string {
  const stream: Array<number> = input.split("\n").map((i) => parseInt(i));

  for(let i = 0; i < stream.length; i++){
    let runningTotal = stream[i];
    let smallestSoFar = stream[i];
    let largestSoFar = stream[i];
    for(let j = i+1; j < stream.length; j++){
      runningTotal += stream[j];
      if(runningTotal > 177777905){
        break;
      }
      if(stream[j] < smallestSoFar){
        smallestSoFar = stream[j]
      } else if (stream[j] > largestSoFar){
        largestSoFar = stream[j]
      }

      if(runningTotal === 177777905){
        return (smallestSoFar + largestSoFar).toString()
      }
    }
  }

  return "Failed";
}