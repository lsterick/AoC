let globalFinishedOptions = 0;

function findPath(startIndex: number, endIndex: number, adapters: Array<number>){
  if(startIndex === endIndex){
    globalFinishedOptions++;
    return;
  }
  if(adapters[startIndex + 1] - adapters[startIndex] <= 3){
    findPath(startIndex + 1, endIndex, adapters)
  }
  if(adapters[startIndex + 2] - adapters[startIndex] <= 3){
    findPath(startIndex + 2, endIndex, adapters)
  }
  if(adapters[startIndex + 3] - adapters[startIndex] <= 3){
    findPath(startIndex + 3, endIndex, adapters)
  }
}

export default function (input: string): string {
  const adapters: Array<number> = input.split("\n").map((i) => parseInt(i)).sort(function (a, b) {
    return a - b;
  });
  adapters.unshift(0);
  console.log(JSON.stringify(adapters))
  let countOfOptions = 1;
  // contains index of end of gap
  let divisionIndices = [0];
  let countOfOptionsPerGap = [];

  for(let i = 1; i < adapters.length - 1; i++){
    if(adapters[i] - adapters[i-1] === 3){
      divisionIndices.push(i);
    } 
  }

  for(let j = 1; j < divisionIndices.length; j++){
    if(divisionIndices[j] > divisionIndices[j - 1] + 2){
      globalFinishedOptions = 0;
      // there could be options for rearranging the chunk since the last 3-gap
      findPath(divisionIndices[j - 1], divisionIndices[j] - 1, adapters)
      countOfOptionsPerGap.push(globalFinishedOptions)
    }
  }
  globalFinishedOptions = 0;
  findPath(divisionIndices[divisionIndices.length - 1], adapters.length - 1, adapters)
  countOfOptionsPerGap.push(globalFinishedOptions)

  for(let k = 0; k < countOfOptionsPerGap.length; k++){
    countOfOptions *= countOfOptionsPerGap[k]
  }

  return (countOfOptions).toString();
}