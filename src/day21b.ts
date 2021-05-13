export default function (input: string): string {
  const items: Array<{ingredients: Array<string>, allergens: Array<string>}> = input.split("\n").map((i) => {
      return {
          ingredients: i.split(' (contains ')[0].split(' '),
          allergens: i.split(' (contains ')[1].split(')')[0].split(', ')
      }
  });
  
  let allergens: Array<string> = [];
  let validIngredients: Array<string> = [];
  let allergenMeaningList: Array<{allergen: string, options: Array<string>}> = [];

  // create list of all allergens in english (and while we're at it, a list of all ingredients)
  for(let i = 0; i < items.length; i++){
    for(let j = 0; j < items[i].allergens.length; j++){
        if(!allergens.find(element => element === items[i].allergens[j])){
            allergens.push(items[i].allergens[j])
        }
    }

    for(let k = 0; k < items[i].ingredients.length; k++){
        if(!validIngredients.includes(items[i].ingredients[k])){
            validIngredients.push(items[i].ingredients[k])
        }
    }
  }

  // for each allergen, create a list of ingredients it could be, and eliminate down to 1(?)
  for(let l = 0; l < allergens.length; l++){
      let firstItem = items.findIndex((element) => element.allergens.includes(allergens[l]))
      let currentPossibilities = JSON.parse(JSON.stringify(items[firstItem].ingredients));

      for(let m = firstItem + 1; m < items.length; m++){
          if(items[m].allergens.includes(allergens[l])){
              // go through each element of currentPossibilities and eliminate the ones that aren't in items[m].ingredients
              for(let n = 0; n < currentPossibilities.length; n++){
                  if(!items[m].ingredients.includes(currentPossibilities[n])){
                      currentPossibilities.splice(n, 1)
                      n--;
                  }
              }
          }
      }

      // really hoping now that there's only one thing. Let's assume the worst for the moment
      allergenMeaningList.push({allergen: allergens[l], options: currentPossibilities});
  }
  
  // assuming the worst was correct! Need to get down to a single item for each allergen
  let countOfSingleOptions = 0;
  while (countOfSingleOptions !== allergenMeaningList.length){
      countOfSingleOptions = 0;
    for(let o = 0; o < allergenMeaningList.length; o++){
        if(allergenMeaningList[o].options.length === 1){
            countOfSingleOptions++;
            for(let p = 0; p < allergenMeaningList.length; p++){
                if(o !== p && allergenMeaningList[p].options.includes(allergenMeaningList[o].options[0])){
                    let index = allergenMeaningList[p].options.findIndex(element => element === allergenMeaningList[o].options[0])
                    allergenMeaningList[p].options.splice(index, 1)
                }
            }
        }
    }
  }

  // now sort by english allergen name to generate formatted list
  allergenMeaningList.sort((a, b) => {
      if(a.allergen < b.allergen){
          return -1;
      } else if (a.allergen === b.allergen){
          return 0;
      }
      return 1;
  })

  let dangerList = '';
  for(let q = 0; q < allergenMeaningList.length; q++){
      dangerList += `${allergenMeaningList[q].options[0]},`
  }

  return dangerList;
}