function isSightlineOccupied(i: number, j: number, currentSeatsOccupied: Array<Array<String>>, nextI: (i: number) => number, nextJ: (j:number) => number ): boolean {
  i = nextI(i);
  j = nextJ(j);

  if(i === -1 || j === -1 || i === currentSeatsOccupied.length || j === currentSeatsOccupied[i].length || currentSeatsOccupied[i][j] === "L"){
    return false;
  }

  if(currentSeatsOccupied[i][j] === "#"){
    return true;
  }

  return isSightlineOccupied(i, j, currentSeatsOccupied, nextI, nextJ);
}

function countAdjacentOccupiedSeats (i: number, j: number, currentSeatsOccupied: Array<Array<String>>): number {
  let count = 0;

  if (isSightlineOccupied(i, j, currentSeatsOccupied, (i) => i - 1, (j) => j - 1)){
    count++;
  }
  if(isSightlineOccupied(i, j, currentSeatsOccupied, (i) => i - 1, (j) => j)){
    count++;
  }
  if(isSightlineOccupied(i, j, currentSeatsOccupied, (i) => i - 1, (j) => j + 1)){
    count++;
  }
  if(isSightlineOccupied(i, j, currentSeatsOccupied, (i) => i, (j) => j - 1)){
    count++;
  }
  if(isSightlineOccupied(i, j, currentSeatsOccupied, (i) => i, (j) => j + 1)){
    count++;
  }
  if(isSightlineOccupied(i, j, currentSeatsOccupied, (i) => i + 1, (j) => j - 1)){
    count++;
  }
  if(isSightlineOccupied(i, j, currentSeatsOccupied, (i) => i + 1, (j) => j)){
    count++;
  }
  if(isSightlineOccupied(i, j, currentSeatsOccupied, (i) => i + 1, (j) => j + 1)){
    count++;
  }

  return count;
}

export default function (input: string): string {
  let currentSeatsOccupied: Array<Array<String>>;
  let nextSeatsOccupied = input.split('\n').map(row => row.split(''));

  do {
    currentSeatsOccupied = JSON.parse(JSON.stringify(nextSeatsOccupied))

    for(let i = 0; i < currentSeatsOccupied.length; i++){
      for(let j = 0; j < currentSeatsOccupied[i].length; j++){
        switch (currentSeatsOccupied[i][j]){
          case '.':
            break;
          case 'L':
            if(countAdjacentOccupiedSeats(i, j, currentSeatsOccupied) === 0){
              nextSeatsOccupied[i][j] = '#';
            }
            break;
          case '#':
            if(countAdjacentOccupiedSeats(i, j, currentSeatsOccupied) >= 5){
              nextSeatsOccupied[i][j] = 'L'
            }
            break;
        }
      }
    }

  } while (JSON.stringify(currentSeatsOccupied) !== JSON.stringify(nextSeatsOccupied))

  // Now that we have a steady state, count occupied seats. 
  let finalCount = 0;

  for(let i = 0; i < nextSeatsOccupied.length; i++){
    for(let j = 0; j < nextSeatsOccupied[i].length; j++){
      if (nextSeatsOccupied[i][j] === '#'){
        finalCount++;
      }
    }
  }

  return (finalCount).toString();
}