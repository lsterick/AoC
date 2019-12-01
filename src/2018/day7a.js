export default function(input) {
  let stepsToPerform = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  let prereqs = input.split("\n").map(element => {
    return element.slice(5, 6);
  });
  let stepNowPossible = input.split("\n").map(element => {
    return element.slice(36, 37);
  });
  let stepOrder = "";

  while (stepOrder.length < 26) {
    for (let i = 0; i < stepsToPerform.length; i++){
      if (!stepNowPossible.includes(stepsToPerform[i])) {
        stepOrder += stepsToPerform[i];
        for (let j = 0; j < prereqs.length; j++) {
          if (prereqs[j] === stepsToPerform[i]){
            prereqs.splice(j, 1);
            stepNowPossible.splice(j, 1);
            j--;
          }
        }
        stepsToPerform.splice(i, 1);
        break;
      }
    }
  }

  return stepOrder;
}
