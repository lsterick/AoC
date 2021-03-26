export default function (input: string): string {
  const adapters: Array<number> = input.split("\n").map((i) => parseInt(i)).sort(function (a, b) {
    return a - b;
  });
  console.log(JSON.stringify(adapters))
  let countOfOptions = 0;

  for(let i = 1; i < adapters.length - 1; i++){
    if(adapters[i] - adapters[i-1] === 1){
      
    } 

    // If the gap was 3 to start with, there's nothing interesting to do.
  }

  return (countOfOptions).toString();
}