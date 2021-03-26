export default function (input: string): string {
  const stream: Array<number> = input.split("\n").map((i) => parseInt(i));

  for(let i = 25; i < stream.length; i++){
    let isThisIOkay = false
    for(let j = i - 25; j < i; j++){
      for(let k = i -24; k < i; k++){
        if(j !== k && stream[j] + stream[k] === stream[i]){
          isThisIOkay = true;
        }
      }
    }
    if(!isThisIOkay){
      return stream[i].toString()
    }
  }

  return "Failed";
}