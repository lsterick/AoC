function findMatch(message: Array<string>, rules: Array<{ruleNumber: string, option1: Array<string>, option2: any}>): boolean{
    if (message.length === 1 && message[0] === '0'){
        return true
    }
    for(let i = 0; i < message.length; i++){
        for(let j = 0; j < rules.length; j++){
            // match cases:
            // option 1 or two is only one character long and matches the character at i
            if((rules[j].option1.length === 1 && rules[j].option1[0] === message[i]) ||
            (rules[j].option2 && rules[j].option2.length === 1 && rules[j].option2[0] === message[i])){
                const messageCopy = JSON.parse(JSON.stringify(message));
                messageCopy.splice(i, 1, rules[j].ruleNumber)
                if(findMatch(messageCopy, rules)){
                    return true;
                }
            }
            // we're not too close to the end and option 1 or 2 is two characters long and the first matches the first character and the second matches i + 1
            if(i < message.length - 1 && 
                ((rules[j].option1.length === 2 && rules[j].option1[0] === message[i] && rules[j].option1[1] === message[i + 1]) || 
                (rules[j].option2 &&  rules[j].option2.length === 2 && rules[j].option2[0] === message[i] && rules[j].option2[1] === message[i + 1]))){
                    const messageCopy = JSON.parse(JSON.stringify(message));
                    messageCopy.splice(i, 2, rules[j].ruleNumber)
                    if(findMatch(messageCopy, rules)){
                        return true;
                    }
            }
        }
    }

    return false;
}

export default function (input: string): string {
    let temp = input.split('\n\n');
    // consider additional rule processing once an approach is selected
    let rules = temp[0].split('\n').map((ruleString) => { 
        let option1 = ruleString.split(': ')[1].split(" | ")[0].split(' ');
        if(option1[0] === '"a"'){
            option1[0] = 'a';
        } else if (option1[0] === '"b"'){
            option1[0] = 'b';
        }
        return {
        ruleNumber: ruleString.split(': ')[0], 
        option1,
        option2: ruleString.split(': ')[1].split(" | ")[2]?.split(' ')
    }});
    let messages = temp[1].split('\n').map((message) => message.split(''));
    let countOfMatches = 0;

    for(let i = 0; i < messages.length; i++){
        if(findMatch(messages[i], rules)){
            countOfMatches++
        }
    }

    return countOfMatches.toString()
}