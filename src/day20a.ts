export default function (input: string): string {
  const tiles: Array<{id: number, edges: Array<string>, matchCount: number}> = input.split('\n\n').map((tile) => {
    const lines = tile.split('\n');
    let left = '';
    let right = '';
    for(let i = 1; i < lines.length; i++){
        left = left + lines[i][0];
        right = right + lines[i][lines[i].length - 1]
    }

    return {
        id: parseInt(lines[0].split('Tile ')[1]),
        edges: [lines[1], right, lines[lines.length - 1], left],
        matchCount: 0
    }
  });

  let tilesWith2Matches = []

  for(let i = 0; i < tiles.length; i++){
      for(let j = 0; j < tiles.length; j++){
          if(i !== j){
              let jMatched = false;
              for(let k = 0; k < tiles[i].edges.length; k++){
                  for(let l = 0; l < tiles[j].edges.length; l++){
                      if(tiles[i].edges[k] === tiles[j].edges[l]){
                          tiles[i].matchCount++;
                          jMatched = true;
                          break;
                      } else if (tiles[i].edges[k] === tiles[j].edges[l].split('').reverse().join('')){
                          tiles[i].matchCount++;
                          jMatched = true;
                          break;
                      }
                  }
                  if(jMatched){
                      break;
                  }
              }
          }
      }
      if(tiles[i].matchCount === 2){
          tilesWith2Matches.push(tiles[i].id)
      }
  }

  if(tilesWith2Matches.length === 4){
      return (tilesWith2Matches[0] * tilesWith2Matches[1] * tilesWith2Matches[2] * tilesWith2Matches[3]).toString()
  } else {
      return "debugging time!"
  }
}