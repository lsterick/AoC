// these work by reference
function handleP1Win(p1Cards: Array<number>, p2Cards: Array<number>){
    //@ts-ignore
    p1Cards.push(p1Cards.shift())
    //@ts-ignore
    p1Cards.push(p2Cards.shift())
}

function handleP2Win(p1Cards: Array<number>, p2Cards: Array<number>){
    //@ts-ignore
    p2Cards.push(p2Cards.shift())
    //@ts-ignore
    p2Cards.push(p1Cards.shift())
}

function isRepeat(p1Cards: Array<number>, p2Cards: Array<number>, previousArrangements: Array<{p1Cards: Array<number>, p2Cards: Array<number>}>): boolean{
    for(let j = 0; j < previousArrangements.length; j++){
        let p1Match = true;
        let p2Match = true;

        if(p1Cards.length === previousArrangements[j].p1Cards.length){
            for(let k = 0; k < p1Cards.length; k++){
                if(p1Cards[k] !== previousArrangements[j].p1Cards[k]){
                    p1Match = false;
                    break;
                }
            }
        } else {
            p1Match = false;
        }

        if(p2Cards.length === previousArrangements[j].p2Cards.length){
            for(let k = 0; k < p2Cards.length; k++){
                if(p2Cards[k] !== previousArrangements[j].p2Cards[k]){
                    p2Match = false;
                    break;
                }
            }
        } else {
            p2Match = false;
        }

        if(p1Match && p2Match){
            return true;
        }
    }
    return false;
}

function game(p1Cards: Array<number>, p2Cards: Array<number>): boolean {
    let previousArrangements: Array<{p1Cards: Array<number>, p2Cards: Array<number>}> = []
    while(p1Cards.length > 0 && p2Cards.length > 0){
        if(isRepeat(p1Cards, p2Cards, previousArrangements)){
            // the current state has been seen before
            return true;
        } 

        previousArrangements.push({p1Cards: JSON.parse(JSON.stringify(p1Cards)), p2Cards: JSON.parse(JSON.stringify(p2Cards))})
        
        if(p1Cards[0] <= p1Cards.length - 1 && p2Cards[0] <= p2Cards.length - 1){
            let newP1Cards = JSON.parse(JSON.stringify(p1Cards));
            newP1Cards.shift()
            newP1Cards.splice(p1Cards[0]);
            let newP2Cards = JSON.parse(JSON.stringify(p2Cards));
            newP2Cards.shift()
            newP2Cards.splice(p2Cards[0]);
            game(newP1Cards, newP2Cards) ? handleP1Win(p1Cards, p2Cards) : handleP2Win(p1Cards, p2Cards)
        } else if(p1Cards[0] > p2Cards[0]){
            handleP1Win(p1Cards, p2Cards);
        } else {
            handleP2Win(p1Cards, p2Cards)
        }
        
    }

    return p1Cards.length ? true : false
}

export default function (input: string): string {
    let tempPlayers = input.split('\n\n');
    let player1Cards: Array<number> = tempPlayers[0].split('\n').splice(1).map(i => parseInt(i))
    let player2Cards: Array<number> = tempPlayers[1].split('\n').splice(1).map(i => parseInt(i))

    game(player1Cards, player2Cards);

    let winner = player1Cards.length ? player1Cards : player2Cards
    let score  = 0;

    for(let i = 0; i < winner.length; i++){
        score += winner[i] * (winner.length - i)
    }

    return score.toString();
}