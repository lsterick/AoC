export default function (input: string): string {
  const validValues = input.split('\n\nyour')[0].split('\n').map((requirement) => { 
    return { 
      type: requirement.split(':')[0], 
      possibleFieldIndex: ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'],
      fieldIndex: -1,
      range1start: parseInt(requirement.split(': ')[1].split(' or ')[0].split('-')[0]),
      range1end: parseInt(requirement.split(': ')[1].split(' or ')[0].split('-')[1]),
      range2start: parseInt(requirement.split(': ')[1].split(' or ')[1].split('-')[0]),
      range2end: parseInt(requirement.split(': ')[1].split(' or ')[1].split('-')[1])
    }})
  const tickets: Array<Array<number>> = input.split("nearby tickets:\n")[1].split('\n').map((i) => i.split(',').map((i) => parseInt(i)));

  let errorRate = 0;
  let badTickets: Array<number> = [];
  let settledFieldIndexs: Array<boolean> = [];

  for(let i = 0; i < tickets.length; i++){
    for (let j = 0; j < tickets[i].length; j++) {
      let isValid = false;
      for (let k = 0; k < validValues.length; k++){
        if ((tickets[i][j] >= validValues[k].range1start && tickets[i][j] <= validValues[k].range1end) || (tickets[i][j] >= validValues[k].range2start && tickets[i][j] <= validValues[k].range2end)) {
          isValid = true;
          break;
        }
      }
      if(!isValid){
        errorRate += tickets[i][j];
        badTickets.push(i)
      }
    }
  }

  for (let i = 0; i < tickets.length; i++) {
    if(!badTickets.includes(i)){
      for (let j = 0; j < tickets[i].length; j++) {
        for (let k = 0; k < validValues.length; k++) {
          if (!((tickets[i][j] >= validValues[k].range1start && tickets[i][j] <= validValues[k].range1end) || (tickets[i][j] >= validValues[k].range2start && tickets[i][j] <= validValues[k].range2end))) {
            validValues[k].possibleFieldIndex[j] = 'N'
          }
        }
      }
    }
  }


    for(let i = 0; i < 20; i++){
      console.log(i.toString() + '\t' + JSON.stringify(validValues[i].possibleFieldIndex))
    }
    // then solve the output in a spreadsheet :)

  return JSON.stringify(validValues);
}