function calculate(question:Array<string>, index: number): Array<number> {
    let total = 0;
    if(question[index] === '('){
        [total, index] = calculate(question, index + 1)
    } else {
        total = parseInt(question[index]);
        index++;
    }
    while(index < question.length){
        if(question[index] === '+'){
            if(question[index + 1] === '('){
                let result = 0;
                [result, index] = calculate(question, index + 2);
                total = total + result;
            } else {
                total += parseInt(question[index + 1])
                index += 2;
            }
        } else if (question[index] === '*'){
            if(question[index + 1] === '('){
                let result = 0;
                [result, index] = calculate(question, index + 2);
                total = total * result;
            } else {
                total *= parseInt(question[index + 1])
                index += 2;
            }
        }
        else if (question[index] === ')'){
            return [total, index + 1];
        } else {
            throw new Error;
        }
    }
    return [total, -1];
}

export default function (input: string): string {
  const questions: Array<Array<string>> = input.split("\n").map((question) => {return question.replaceAll(' ', '').split('')});
  const answers: Array<number> = [];

  for(let i = 0; i < questions.length; i++){
    answers[i] = calculate(questions[i], 0)[0]
  }

  return answers.reduce((accumulator, currentValue) => accumulator + currentValue).toString();
}