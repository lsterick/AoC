function countSurround(blackTiles: {[key: string]: boolean}, x: number, y:number): number {
    let total = 0;
    if(blackTiles[`${x + 1},${y}`]){
        total++;
    }
    if(blackTiles[`${x - 1},${y}`]){
        total++;
    }
    if(blackTiles[`${x},${y + 1}`]){
        total++;
    }
    if(blackTiles[`${x},${y - 1}`]){
        total++;
    }
    if((y + 1000000) % 2 === 0){
        // east changes
        if(blackTiles[`${x + 1},${y + 1}`]){
            total++;
        }
        if(blackTiles[`${x + 1},${y - 1}`]){
            total++;
        }
    } else {
        //west changes
        if(blackTiles[`${x - 1},${y + 1}`]){
            total++;
        }
        if(blackTiles[`${x - 1},${y - 1}`]){
            total++;
        }
    }

    return total;
}

function countBlack(blackTiles: {[key: string]: boolean}): number {
    let countOfBlack = 0;
    for(let tile in blackTiles){
        if(blackTiles[tile]){
            countOfBlack++;
        }
    }
    return countOfBlack
}

export default function (input: string): string{
    let toFlip: Array<Array<string>> = input.split('\n').map((line) => {
        let output = [];
        for(let q = 0; q < line.length; q++){
            if(line[q] === 'n' || line[q] === 's'){
                output.push(line[q] + line[q + 1]);
                q++;
            } else {
                output.push(line[q])
            }
        }
        return output;
    });

    let blackTiles: {[key: string]: boolean} = {}

    for(let i = 0; i < toFlip.length; i++){
        //for each instruction
        let x = 0;
        let y = 0;
        for(let j = 0; j < toFlip[i].length; j++){
            //for each direction in the instruction
            if(toFlip[i][j] === 'e'){
                x++;
            } else if (toFlip[i][j] === 'w'){
                x--;
            } else if (toFlip[i][j] === 'ne'){
                y++;
                if( (y + 1000000) % 2 === 1){
                    x++;
                }
            } else if (toFlip[i][j] === 'nw'){
                y++;
                if((y + 1000000) % 2 === 0){
                    x--;
                }
            } else if (toFlip[i][j] === 'se'){
                y--;
                if( (y + 1000000) % 2 === 1){
                    x++;
                }
            } else if (toFlip[i][j] === 'sw'){
                y--;
                if((y + 1000000) % 2 === 0){
                    x--;
                }
            }
        }
        // flip the destination
        blackTiles[`${x},${y}`] = !blackTiles[`${x},${y}`]
    }

    let lastIterationBlackCount = countBlack(blackTiles);

    for(let k = 0; k < 100; k++){
        // 100 days
        let oldTiles = JSON.parse(JSON.stringify(blackTiles));
        for(let l = -120; l < 120; l++){
            for(let m = -120; m < 120; m++){
                // for each possible position in the grid
                // call function to count surrounding black tiles
                const surround = countSurround(oldTiles, l, m);

                if(oldTiles[`${l},${m}`]){
                    // black
                    if(surround === 0 || surround > 2){
                        blackTiles[`${l},${m}`] = false;
                    }
                } else {
                    // white
                    if(surround === 2){
                        blackTiles[`${l},${m}`] = true;
                    }
                }
            }
        }
        lastIterationBlackCount = countBlack(blackTiles);
        //console.log(k, countBlack(blackTiles));
    }

    

    return countBlack(blackTiles).toString()
}