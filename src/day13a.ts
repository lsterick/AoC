export default function (input: string): string {
  const earliestDeparture = 1008141;
  const busses = [17, 41, 523, 13, 19, 23, 787, 37, 29]
  let firstDepartPerBus: Array<number> = [];

  for(let i = 0; i < busses.length; i++){
    firstDepartPerBus[i] = busses[i] - (earliestDeparture % busses[i]);
  }

  let bestBusIndex = 0;

  for(let i = 1; i < firstDepartPerBus.length; i++){
    if(firstDepartPerBus[i] < firstDepartPerBus[bestBusIndex]){
      bestBusIndex = i;
    }
  }

  return (busses[bestBusIndex] * firstDepartPerBus[bestBusIndex]).toString();
}
