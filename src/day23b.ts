function printInOrder(cupOrder: Array<number>, startingCup: number = 1){
    let next = startingCup;
    let output = ''
    for(let i = 0; i < 10000000; i++){
        output += `${next},`;
        next = cupOrder[next]
    }
    console.log(output)
}

export default function (input: string): string {
    let cupOrder = [0, 8, 7, 9, 6, 2, 1, 10, 5, 4]
    //let cupOrder = [0, 2, 5, 8, 6, 4, 7, 10, 9, 1] // the example
    let currentCup = 3; // 3 is correct for both inputs

    for(let j = 10; j < 1000000; j++){
        cupOrder[j] = j + 1;
    }
    cupOrder[1000000] = 3; // 3 is correct for both inputs

    //printInOrder(cupOrder, 3)

    for(let i = 0; i < 10000000; i++){
        let firstToMove = cupOrder[currentCup];
        let secondToMove = cupOrder[firstToMove];
        let thirdToMove = cupOrder[secondToMove];

        // remove the moved cups from their current location
        cupOrder[currentCup] = cupOrder[thirdToMove];

        let destination = -1;
        for(let k = 1; k < 5; k++){
            destination = (currentCup - k + 1000000) % 1000000;
            if(destination === 0){
                destination = 1000000
            }

            if(destination !== firstToMove && destination !== secondToMove && destination !== thirdToMove){
                break;
            }
        }

        // go to the current location of nextCup and tuck the moved ones in. secondToMove doesn't need anything :)
        cupOrder[thirdToMove] = cupOrder[destination];
        cupOrder[destination] = firstToMove

        currentCup = cupOrder[currentCup];
    }

    printInOrder(cupOrder, 1)

    return (cupOrder[1] * cupOrder[cupOrder[1]]).toString()
}