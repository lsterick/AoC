export default function (input: string): string {
  const items: Array<{ingredients: Array<string>, allergens: Array<string>}> = input.split("\n").map((i) => {
      return {
          ingredients: i.split(' (contains ')[0].split(' '),
          allergens: i.split(' (contains ')[1].split(')')[0].split(', ')
      }
  });
  
  let allergens: Array<string> = [];
  let validIngredients: Array<string> = [];

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

      // anything left in currentPossibilties could be an allergen (even if there is more than 1 thing). Remove them from validIngredients
      for (let o = 0; o < currentPossibilities.length; o++){
          const possibleAllergenIndex = validIngredients.findIndex(element => element === currentPossibilities[o])
          if(possibleAllergenIndex !== -1){
              validIngredients.splice(possibleAllergenIndex, 1);
          }
      }
  }

  // everything left in validIngredients is not an allergen. Count them :)
  let nonAllergenOccuranceCount = 0;
  for(let p = 0; p < items.length; p++){
      for(let q = 0; q < validIngredients.length; q++){
          for(let r = 0; r < items[p].ingredients.length; r++){
              if(items[p].ingredients[r] === validIngredients[q]){
                  nonAllergenOccuranceCount++;
              }
          }
      }
  }

  return nonAllergenOccuranceCount.toString();
}