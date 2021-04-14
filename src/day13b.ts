export default function (input: string): string {
  const busses = [17,-1,-1,-1,-1,-1,-1,41,-1,-1,-1,-1,-1,-1,-1,-1,-1,523,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,13,19,-1,-1,-1,23,-1,-1,-1,-1,-1,-1,-1,787,-1,-1,-1,-1,-1,37,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,29]
  let success = -1;

  for(let i = 100000000000000; i < 10000000000000000; i += 17){
    for(let j = 0; j < busses.length; j++){
      if(busses[j] !== -1 && i % busses[j] !== j){
        success = -2;
        break;
      }
    }
    if(success === -1){
      success = i;
      break;
    } else {
      success = -1
    }
  }

  return (success).toString();
}
