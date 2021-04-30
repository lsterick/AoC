let rules: {[key: string]: {option1: Array<string>, option2: Array<string>}} = {};

function buildRegex(ruleIndex: string):string{
    if(ruleIndex === 'a' || ruleIndex === 'b'){
        return ruleIndex;
    }
    if(ruleIndex === '8'){
        return `${buildRegex('42')}+`
    } else if(ruleIndex === '11'){
        const forty2  = buildRegex('42');
        const thirty1 = buildRegex('31');

        let result = `(?:${forty2}${thirty1}`
        for(let i = 2; i < 50; i++){
            result = result + '|' + forty2.repeat(i) + thirty1.repeat(i)
        }
        return `${result})`;
    }

    const rule = rules[ruleIndex]
    if(rule.option2){
        let result =  '(?:';
        for(let i = 0; i < rule.option1.length; i++){
            result = result + buildRegex(rule.option1[i]);
        }
        result = result + '|'
        for(let i = 0; i < rule.option2.length; i++){
            result = result + buildRegex(rule.option2[i]);
        }
        result = result + ')'

        return result;
    } else {
        // only one option. Return its evaluation directly
        let result = "";
        for(let i = 0; i < rule.option1.length; i++){
            result = result + buildRegex(rule.option1[i]);
        }
        return result;
    }
}

export default function (input: string): string {
    let temp = input.split('\n\n');
    // consider additional rule processing once an approach is selected
    let rulesTemp = temp[0].split('\n');
    // let rules: {[key: string]: {option1: Array<string>, option2: Array<string>}} = {};
    for(let i = 0; i < rulesTemp.length; i++){
        let option1 = rulesTemp[i].split(': ')[1].split(" | ")[0].split(' ');
        if(option1[0] === '"a"'){
            option1[0] = 'a';
        } else if (option1[0] === '"b"'){
            option1[0] = 'b';
        }

        let key = rulesTemp[i].split(': ')[0];
        rules[key] = { 
            option1,
            option2: rulesTemp[i].split(': ')[1].split(" | ")[1]?.split(' ')
        }
    }

    const regex = new RegExp(`^${buildRegex('0')}$`, 'g')

    let messages = temp[1].split('\n');
    let countOfMatches = 0;

    for(let i = 0; i < messages.length; i++){
        if(messages[i].match(regex)){
            countOfMatches++
        }
    }

    return countOfMatches.toString()
}