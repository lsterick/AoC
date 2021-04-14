function countAdjacentActive (x:number, y:number, z:number, w:number, cubes: Array<Array<Array<Array<string>>>>): number {
    let adjacent = 0;
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            for(let k = -1; k <= 1; k++){
                for(let l = -1; l <= 1; l++){
                    if((i !== 0 || j !== 0 || k !== 0 || l !== 0) && cubes[x+i]?.[y+j]?.[z+k]?.[w+l] === '#'){
                        adjacent++;
                    }
                }
            }
        }
    }

    return adjacent;
}

export default function (input: string): string {
  let cubes: Array<Array<Array<Array<string>>>> = [[],[],[],[],[],[],[input.split('\n').map(row => row.split(''))],[],[],[],[],[],[]]

  for(let i = 0; i < cubes.length; i++){
      if(cubes[i].length === 0){
        cubes[i].push([],[],[],[],[],[],[],[]);
      }
      cubes[i].unshift([],[],[],[],[],[]);
      cubes[i].push([],[],[],[],[],[]);

      for(let j = 0; j < cubes[i].length; j++){
          if(cubes[i][j].length === 0){
            cubes[i][j].push([],[],[],[],[],[],[],[]);
          }
          cubes[i][j].unshift([],[],[],[],[],[]);
          cubes[i][j].push([],[],[],[],[],[]);

          for(let k = 0; k < cubes[i][j].length; k++){
            if(cubes[i][j][k].length === 0){
                cubes[i][j][k].push('.','.','.','.','.','.','.','.');
            }
            cubes[i][j][k].unshift('.','.','.','.','.','.');
            cubes[i][j][k].push('.','.','.','.','.','.');
          }
          
      }
  }

  for(let i = 0; i < 6; i++){ // 6 cycles
    const lastCubes = JSON.parse(JSON.stringify(cubes))
    for (let x = 0; x < cubes.length; x++){
        for (let y = 0; y < cubes[x].length; y++){
            for (let z = 0; z < cubes[x][y].length; z++){ // for each point in the grid
                for(let w = 0; w < cubes[x][y][z].length; w++){
                    let adjacentActive = countAdjacentActive(x, y, z, w, lastCubes);
                    if (cubes[x][y][z][w] === '#' && (!(adjacentActive === 2 || adjacentActive === 3))){
                        cubes[x][y][z][w] = '.'
                    } else if (cubes[x][y][z][w] !== '#' && adjacentActive === 3){
                        cubes[x][y][z][w] = '#';
                    }
                }
            }
        }
    }
  }
  
  let totalActive = 0;
  for (let x = 0; x < cubes.length; x++){
        for (let y = 0; y < cubes[x].length; y++){
            for (let z = 0; z < cubes[x][y].length; z++){ // for each point in the grid
                for(let w = 0; w < cubes[x][y][z].length; w++){
                    if (cubes[x][y][z][w] === '#'){
                        totalActive++;
                    }
                }
            }
        }
    }

  return totalActive.toString();
}