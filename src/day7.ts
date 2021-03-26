function foundGold (rule: {colour: string, children: string[]}, rules: Array<{colour: string, children: string[]}>) {
  //console.log(JSON.stringify(rule))
  if(rule.children.includes('shiny gold')){
    return true;
  }
  let foundGoldInChild = false;

  rule.children.forEach(child => {
    if(foundGold(rules[rules.findIndex((element)=>element.colour === child)], rules)){
      foundGoldInChild = true;
    }
  });

  return foundGoldInChild
}

function countChildren (rule: {colour: string, children: {colour: string, count: number}[]}, rules: Array<{colour: string, children: {colour: string, count: number}[]}>, totalBags:number, countOfThisChild:any): number{
  let newTotal = totalBags + countOfThisChild;
  console.log(newTotal)
  if(rule.children.length === 0){
    return newTotal
  }
  for(let i = 0; i < countOfThisChild; i++){
    rule.children.forEach(child => {
      console.log(child)
      newTotal = countChildren(rules[rules.findIndex((element)=>element.colour === child.colour)], rules, newTotal, child.count)
    })
  }
  
  return newTotal;
}

export default function (input: string): string {
  const rules: Array<{colour: string, children: {colour: string, count: number}[]}> = input.split("\n").map((ruleString) => {
    const handySplit = ruleString.split(" bags contain ");
    let children: {colour: string, count: number}[] = [];

    if(!handySplit[1].endsWith('other bags.')){
      const childrenBags = handySplit[1].split(', ');
      childrenBags.forEach((childBag) => {
        const childBagWords = childBag.split(' ')
        children.push({colour: `${childBagWords[1]} ${childBagWords[2]}`, count: parseInt(childBagWords[0])})
      })
    }

    return {
      colour: handySplit[0],
      children
    }
  });

  

  return (countChildren(rules[rules.findIndex((element)=>element.colour === 'shiny gold')], rules, 0, 1) - 1).toString();
}
