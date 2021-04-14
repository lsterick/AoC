function calculate(question:Array<string>): Array<string> {
    // recurse on open brackets
    let bracketIndex = question.findIndex((thing) => thing === '(');
    while(bracketIndex !== -1){
        let child = calculate(question.slice(bracketIndex + 1));
        question.splice(bracketIndex, question.length, ...child);

        bracketIndex = question.findIndex((thing) => thing === '(');
    }

    // find first close bracket, ignore results past there
    let closeIndex = question.findIndex((thing) => thing === ')');
    if(closeIndex === -1){
        closeIndex = Number.MAX_SAFE_INTEGER;
    } else {
        question.splice(closeIndex, 1)
    }

    // look for +, evaluate
    let plusIndex = question.findIndex((thing) => thing === '+');
    while(plusIndex !== -1 && plusIndex < closeIndex){
        question[plusIndex - 1] = (parseInt(question[plusIndex - 1]) + parseInt(question[plusIndex + 1])).toString();
        question.splice(plusIndex, 2);
        closeIndex -= 2;
        plusIndex = question.findIndex((thing) => thing === '+');
    }

    // look for *, evaluate
    let timesIndex = question.findIndex((thing) => thing === '*');
    while(timesIndex !== -1 && timesIndex < closeIndex){
        question[timesIndex - 1] = (parseInt(question[timesIndex - 1]) * parseInt(question[timesIndex + 1])).toString();
        question.splice(timesIndex, 2);
        closeIndex -= 2;
        timesIndex = question.findIndex((thing) => thing === '*');
    }

    return question
}

export default function (input: string): string {
  const questions: Array<Array<string>> = input.split("\n").map((question) => {return question.replaceAll(' ', '').split('')});
  const answers: Array<number> = [];

  for(let i = 0; i < questions.length; i++){
    answers[i] = parseInt(calculate(questions[i])[0])
  }

  return answers.reduce((accumulator, currentValue) => accumulator + currentValue).toString();
}