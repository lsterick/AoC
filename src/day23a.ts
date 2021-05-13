export default function (input: string): string {
    let cupOrder = '394618527'.split('').map((i) => parseInt(i))
    let currentCupIndex = 0;

    for(let i = 0; i < 100; i++){
        // pick up 3 cups, even if wrap around is needed
        let pickedUpCups = cupOrder.splice(currentCupIndex + 1, 3);
        let wrapLength = 3 - pickedUpCups.length
        pickedUpCups.push(...cupOrder.splice(0, wrapLength));

        let destination = -1;
        for(let j = 1; destination === -1; j++){
            destination = cupOrder.findIndex((q) => q === (cupOrder[currentCupIndex - wrapLength] - j + 10) % 10)
        }
        
        cupOrder.splice(destination + 1, 0, ...pickedUpCups);

        // if we wrapped to start with, wrap back at the end
        if(currentCupIndex !== 8 && (wrapLength  || (destination + 1) % 10 <= currentCupIndex)){
            //remove the number originally removed from the end from the begining
            let wrapBack = cupOrder.splice(0, 3 - wrapLength)
            // add to end
            cupOrder.push(...wrapBack)
        }

        console.log(...cupOrder)

        currentCupIndex = (currentCupIndex + 1) % cupOrder.length;
    }

    let temp = cupOrder.splice((cupOrder.findIndex(q => q === 1) + 1) % 10);
    cupOrder.unshift(...temp);

    return cupOrder.join('')
}