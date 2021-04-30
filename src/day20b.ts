function arranger(
    finishedGridOrder: Array<Array<number>>, 
    tiles: {[key: string]: {edges: Array<string>, innerGrid: Array<Array<string>>, placed: boolean}}, 
    iStart: number, 
    jStart: number) {
    for(let i = iStart; i < 3; i++){// was 12
        for(let j = jStart; j < 3; j++){// was 12
            if(i !== 0 || j !== 0){
                for(let tile in tiles){
                    if(!tiles[tile].placed){
                        let matchLeft = true;
                        let matchTop = true;
                        let flipVert = false;
                        let flipHoriz = false;
                        let newTop = -1;

                        if(i > 0){
                            // check for a match at i-1 (above)
                            for(let k = 0; k < tiles[tile].edges.length; k++){
                                if(tiles[tile].edges[k] === tiles[finishedGridOrder[i - 1][j]].edges[2]){
                                    newTop = k;
                                    matchTop = true;
                                    if(k === 2){
                                        flipHoriz = true;
                                    }
                                    break;
                                } else if(tiles[tile].edges[k].split('').reverse().join('') === tiles[finishedGridOrder[i - 1][j]].edges[2]){
                                    // check flipped 
                                    newTop = k;
                                    if(k !== 2){
                                        flipHoriz = true
                                    }
                                    matchTop = true;
                                    break;
                                } else {
                                    matchTop = false
                                }
                            }
                        }
                        if(j > 0){
                            // check for a match at j-1
                            if(newTop === -1){
                                for(let k = 0; k < tiles[tile].edges.length; k++){
                                    if(tiles[tile].edges[k] === tiles[finishedGridOrder[i][j - 1]].edges[1]){
                                        newTop = (k - 3 + 4) % 4;
                                        matchLeft = true;
                                        if(k === 1){
                                            flipVert = true;
                                        }
                                        break;
                                    } else if(tiles[tile].edges[k].split('').reverse().join('') === tiles[finishedGridOrder[i][j - 1]].edges[1]){
                                        // check flipped 
                                        newTop = (k - 3 + 4) % 4;
                                        matchLeft = true;
                                        if(k !== 1){
                                            flipVert = true;
                                        }
                                        break;
                                    } else {
                                        matchLeft = false
                                    }
                                }
                            } else {
                                // only need to check the one side
                                // need to account for flips
                                if(tiles[tile].edges[(newTop + 3) % 4] === tiles[finishedGridOrder[i][j - 1]].edges[1]){
                                    matchLeft = true;
                                } else if (tiles[tile].edges[(newTop + 3) % 4].split('').reverse().join('') === tiles[finishedGridOrder[i][j - 1]].edges[1]) {
                                    // check flipped
                                    matchLeft = true
                                    if(newTop !== 2 && newTop !== 1){
                                        flipVert = true
                                    }
                                } else if(tiles[tile].edges[(newTop + 1) % 4] === tiles[finishedGridOrder[i][j - 1]].edges[1]){
                                    matchLeft = true;
                                } else if (tiles[tile].edges[(newTop + 1) % 4].split('').reverse().join('') === tiles[finishedGridOrder[i][j - 1]].edges[1]) {
                                    // check flipped
                                    matchLeft = true
                                    if(newTop !== 2 && newTop !== 1){
                                        flipVert = true
                                    }
                                }else{
                                    matchLeft = false;
                                }

                                // but wait! what about a vertical flip that's interchangable with rotation and a horizontal flip?
                            }
                        }

                        if(matchLeft && matchTop){
                            finishedGridOrder[i][j] = parseInt(tile);
                            tiles[tile].placed = true;

                            // if there's a match, update edges and main grid to reflect correct orientation!
                            // rotate grid up here, only deal with flips below
                            let oldTile = JSON.parse(JSON.stringify(tiles[tile]))
                            if(newTop === 3){
                                for(let w = 0; w < oldTile.innerGrid.length; w++){
                                    for(let s = 0; s < oldTile.innerGrid[0].length; s++){
                                        tiles[tile].innerGrid[w][s] = oldTile.innerGrid[s][w];
                                    }
                                }
                                oldTile = JSON.parse(JSON.stringify(tiles[tile]))
                                for(let w = 0; w < oldTile.innerGrid.length; w++){
                                    tiles[tile].innerGrid[w].reverse();
                                }
                                tiles[tile].edges[0] = oldTile.edges[3].split('').reverse().join('');
                                tiles[tile].edges[1] = oldTile.edges[0]
                                tiles[tile].edges[2] = oldTile.edges[1].split('').reverse().join('')
                                tiles[tile].edges[3] = oldTile.edges[2]
                            } else if (newTop === 2){
                                for(let x = 0; x < oldTile.innerGrid.length; x++){
                                    tiles[tile].innerGrid[x].reverse()
                                }
                                tiles[tile].innerGrid.reverse()
                                for(let e = 0; e < oldTile.edges.length; e++){
                                    tiles[tile].edges[e] = oldTile.edges[(e + 2) % 4].split('').reverse().join('');
                                }
                            } else if (newTop === 1){
                                for(let w = 0; w < oldTile.innerGrid.length; w++){
                                    tiles[tile].innerGrid[w].reverse();
                                }
                                oldTile = JSON.parse(JSON.stringify(tiles[tile]))
                                for(let w = 0; w < oldTile.innerGrid.length; w++){
                                    for(let s = 0; s < oldTile.innerGrid[0].length; s++){
                                        tiles[tile].innerGrid[w][s] = oldTile.innerGrid[s][w];
                                    }
                                }
                                tiles[tile].edges[0] = oldTile.edges[1]
                                tiles[tile].edges[1] = oldTile.edges[2].split('').reverse().join('')
                                tiles[tile].edges[2] = oldTile.edges[3]
                                tiles[tile].edges[3] = oldTile.edges[0].split('').reverse().join('')
                            }

                            oldTile = JSON.parse(JSON.stringify(tiles[tile]))

                            if(!flipHoriz && !flipVert){
                                // no longer need to do anything
                            } else if (flipHoriz && !flipVert){
                                tiles[tile].edges[0] = oldTile.edges[0].split('').reverse().join('');
                                tiles[tile].edges[1] = oldTile.edges[3];
                                tiles[tile].edges[2] = oldTile.edges[2].split('').reverse().join('');
                                tiles[tile].edges[3] = oldTile.edges[1];

                                for(let k = 0; k < oldTile.innerGrid.length; k++){
                                    tiles[tile].innerGrid[k] = oldTile.innerGrid[k].reverse();
                                }
                            } else if(!flipHoriz && flipVert){
                                tiles[tile].edges[0] = oldTile.edges[2];
                                tiles[tile].edges[1] = oldTile.edges[1].split('').reverse().join('');
                                tiles[tile].edges[2] = oldTile.edges[0];
                                tiles[tile].edges[3] = oldTile.edges[3].split('').reverse().join('');
                                
                                tiles[tile].innerGrid = oldTile.innerGrid.reverse()
                            } else {
                                tiles[tile].edges[0] = oldTile.edges[2].split('').reverse().join('');
                                tiles[tile].edges[1] = oldTile.edges[3].split('').reverse().join('');
                                tiles[tile].edges[2] = oldTile.edges[0].split('').reverse().join('');
                                tiles[tile].edges[3] = oldTile.edges[1].split('').reverse().join('');
                                
                                tiles[tile].innerGrid = oldTile.innerGrid.reverse()
                                for(let k = 0; k < oldTile.innerGrid.length; k++){
                                    tiles[tile].innerGrid[k] = oldTile.innerGrid[k].reverse();
                                }
                            }                          
                            break;
                        }
                    }
                }
                if(finishedGridOrder[i][j] === -1){
                    return;
                }
            }
        }
    }
}

function seaMonsterCheck (overallGrid: Array<Array<string>>): boolean{
    let seaMonsterFound = false;
    for(let r = 1; r < overallGrid.length - 1; r++){
        for(let f = 0; f < overallGrid.length - 19; f++){
            if((overallGrid[r][f] === '#' || overallGrid[r][f] === 's') && 
            (overallGrid[r+1][f+1] === '#' || overallGrid[r+1][f+1] === 's') && 
            (overallGrid[r+1][f+4] === '#' || overallGrid[r+1][f+4] === 's') && 
            (overallGrid[r][f+5] === '#' || overallGrid[r][f+5] === 's') && 
            (overallGrid[r][f+6] === '#' || overallGrid[r][f+6] === 's') && 
            (overallGrid[r+1][f+7] === '#' || overallGrid[r+1][f+7] === 's') && 
            (overallGrid[r+1][f+10] === '#' || overallGrid[r+1][f+10] === 's') && 
            (overallGrid[r][f+11] === '#' || overallGrid[r][f+11] === 's') && 
            (overallGrid[r][f+12] === '#' || overallGrid[r][f+12] === 's') && 
            (overallGrid[r+1][f+13] === '#' || overallGrid[r+1][f+13] === 's') && 
            (overallGrid[r+1][f+16] === '#' || overallGrid[r+1][f+16] === 's') && 
            (overallGrid[r][f+17] === '#' || overallGrid[r][f+17] === 's') && 
            (overallGrid[r][f+18] === '#' || overallGrid[r][f+18] === 's') && 
            (overallGrid[r][f+19] === '#' || overallGrid[r][f]+19 === 's') && 
            (overallGrid[r-1][f+18] === '#' || overallGrid[r-1][f+18] === 's')){
                seaMonsterFound = true;
                overallGrid[r][f] ='s';
                overallGrid[r+1][f+1] = 's'; 
                overallGrid[r+1][f+4] = 's'; 
                overallGrid[r][f+5] = 's'; 
                overallGrid[r][f+6] = 's';
                overallGrid[r+1][f+7] = 's';
                overallGrid[r+1][f+10] = 's';
                overallGrid[r][f+11] = 's'; 
                overallGrid[r][f+12] = 's';
                overallGrid[r+1][f+13] = 's';
                overallGrid[r+1][f+16] = 's';
                overallGrid[r][f+17] = 's';
                overallGrid[r][f+18] = 's'; 
                overallGrid[r][f+19] = 's';
                overallGrid[r-1][f+18] = 's';
            }

        }
    }
    return seaMonsterFound;
}

export default function (input: string): string {
    const tempTiles = input.split('\n\n')
    const tiles: {[key: string]: {edges: Array<string>, innerGrid: Array<Array<string>>, placed: boolean}} = {}
    for(let z = 0; z < tempTiles.length; z++){
        const lines: any = tempTiles[z].split('\n');
        let top = lines[1];
        let bottom = lines[lines.length - 1]
        let left = '';
        let right = '';
        const tempId: any = lines.shift();
        for(let a = 0; a < lines.length; a++){
            left = left + lines[a][0];
            right = right + lines[a][lines[a].length - 1]
            lines[a] = lines[a].slice(1, lines[a].length - 1).split('')
        }

        // make a copy of lines with lines 0, 1, and length-1 removed
        
        lines.shift();
        lines.pop();
        
        tiles[parseInt(tempId.split('Tile ')[1])] = {
            edges: [top, right, bottom, left],
            innerGrid: lines,
            placed: false
        }
    };

    let finishedGridOrder: Array<Array<number>> = [[1951, -1, -1]];//, -1, -1, -1, -1, -1, -1, -1, -1, -1]] // was 2251
    for(let q = 1; q < 3; q++){ // was 12
        finishedGridOrder.push([-1, -1, -1]);//, -1, -1, -1, -1, -1, -1, -1, -1, -1])
    }

    const oldTileTopCorner = JSON.parse(JSON.stringify(tiles[1951]))
    tiles[1951].placed = true; // was 2251
    const newTopCorner = 0
    tiles[1951].edges[0] = oldTileTopCorner.edges[(newTopCorner + 2) % 4];
    tiles[1951].edges[1] = oldTileTopCorner.edges[(newTopCorner + 1) % 4].split('').reverse().join('');
    tiles[1951].edges[2] = oldTileTopCorner.edges[(newTopCorner)];
    tiles[1951].edges[3] = oldTileTopCorner.edges[(newTopCorner + 3) % 4].split('').reverse().join('');

    tiles[1951].innerGrid = oldTileTopCorner.innerGrid.reverse()

    arranger(finishedGridOrder, tiles, 0, 0)

    // build a single grid out of all the innerGrids
    const overallGrid: Array<Array<string>> = [[]]
    for(let d = 0; d < finishedGridOrder.length; d++){//row of finishedGridOrder
        for(let c = 0; c < finishedGridOrder[0].length; c++){//column of finishedGridOrder
            let toTransfer = tiles[finishedGridOrder[d][c]].innerGrid;
            for(let r = 0; r < toTransfer.length; r++){//row of tile
                if(!overallGrid[d * toTransfer[0].length + r]){
                    overallGrid[d * toTransfer[0].length + r] = [];
                }
                overallGrid[d * toTransfer[0].length + r].push(...(toTransfer[r]))
            }
        }
    }

    // find sea monsters, trying each orientation until some are found. 
    // Change tiles in sea monsters to a different character
    // remember to check for both options when checking for sea monsters
    let seaMonsterFound = false;
    seaMonsterFound = checkFlipsOfRotation(overallGrid);
    if(!seaMonsterFound){
        turn90Degrees(overallGrid)
        seaMonsterFound = checkFlipsOfRotation(overallGrid);
    }
    if(!seaMonsterFound){
        turn90Degrees(overallGrid)
        seaMonsterFound = checkFlipsOfRotation(overallGrid);
    }
    if(!seaMonsterFound){
        turn90Degrees(overallGrid)
        seaMonsterFound = checkFlipsOfRotation(overallGrid);
    }

    // count '#' occurances that are not part of sea monsters
    let hashCount = 0;
    for(let r = 0; r < overallGrid.length; r++){
        for(let f = 0; f < overallGrid.length; f++){
            if(overallGrid[r][f] === '#'){
                hashCount++;
            }
        }
    }

    return hashCount.toString();
}

function checkFlipsOfRotation(rotatedGrid: Array<Array<string>>){
    let seaMonsterFound = false;
    seaMonsterFound = seaMonsterCheck(rotatedGrid);
    if(!seaMonsterFound){
        // flipVert
        rotatedGrid.reverse();
        seaMonsterFound = seaMonsterCheck(rotatedGrid);
    }
    if(!seaMonsterFound){
        // flip - both
        flipHorizontal(rotatedGrid)
        seaMonsterFound = seaMonsterCheck(rotatedGrid);
    }
    if(!seaMonsterFound){
        // flipHoriz
        rotatedGrid.reverse();
        seaMonsterFound = seaMonsterCheck(rotatedGrid);
    }
    flipHorizontal(rotatedGrid);
    return seaMonsterFound;
}

function flipHorizontal (grid: Array<Array<string>>){
    for(let w = 0; w < grid.length; w++){
        grid[w].reverse();
    }
}

function turn90Degrees(grid: Array<Array<string>>){
    let oldGrid = JSON.parse(JSON.stringify(grid))
    for(let w = 0; w < grid.length; w++){
        for(let s = 0; s < grid[0].length; s++){
            grid[w][s] = oldGrid[s][w];
        }
    }
    oldGrid = JSON.parse(JSON.stringify(grid))
    for(let w = 0; w < oldGrid.length; w++){
        grid[w].reverse();
    }
}