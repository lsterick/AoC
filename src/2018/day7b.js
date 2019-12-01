// 914 too high (so is 913)

function getNextStepToStart(stepNowPossible, stepsToPerform) {
  for (let i = 0; i < stepsToPerform.length; i++){
    const retVal = stepsToPerform[i];
    if (!stepNowPossible.includes(retVal)) {
      stepsToPerform.splice(i, 1);
      return retVal;
    }

  }
  return false;
}

export default function(input) {
  let stepsToPerform = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  let prereqs = input.split("\n").map(element => {
    return element.slice(5, 6);
  });
  let stepNowPossible = input.split("\n").map(element => {
    return element.slice(36, 37);
  });
  let stepOrder = "";
  let workers = [{busy: false, currentStep: '', timeRemaining: 0}, {busy: false, currentStep: '', timeRemaining: 0}, {busy: false, currentStep: '', timeRemaining: 0}, {busy: false, currentStep: '', timeRemaining: 0}, {busy: false, currentStep: '', timeRemaining: 0}];
  let second = 0;

  while (stepOrder.length < 26) {
    for (let i = 0; i < workers.length; i++) {
      if (!workers[i].busy) {
        const nextStep = getNextStepToStart(stepNowPossible, stepsToPerform);
        if (nextStep) {
          workers[i].busy = true;
          workers[i].currentStep = nextStep;
          workers[i].timeRemaining = nextStep.charCodeAt(0) - 4;
        }
      } else if (workers[i].timeRemaining === 1){
        stepOrder += workers[i].currentStep;
        workers[i].busy = false;
        for (let j = 0; j < prereqs.length; j++) {
          if (prereqs[j] === workers[i].currentStep){
            prereqs.splice(j, 1);
            stepNowPossible.splice(j, 1);
            j--;
          }
        }
        i--;
      } else {
        workers[i].timeRemaining--;
      }
    }
    second++;
  }

  return (second - 1).toString();
}
