export default function (input: string): string {
    let tempPlayers = input.split('\n\n');
    let player1Cards: Array<number> = tempPlayers[0].split('\n').splice(1).map(i => parseInt(i))
    let player2Cards: Array<number> = tempPlayers[1].split('\n').splice(1).map(i => parseInt(i))

    while(player1Cards.length > 0 && player2Cards.length > 0){
        if(player1Cards[0] > player2Cards[0]){
            //@ts-ignore
            player1Cards.push(player1Cards.shift())
            //@ts-ignore
            player1Cards.push(player2Cards.shift())
        } else {
            //@ts-ignore
            player2Cards.push(player2Cards.shift())
            //@ts-ignore
            player2Cards.push(player1Cards.shift())
        }
    }

    let winner = player1Cards.length ? player1Cards : player2Cards
    let score  = 0;

    for(let i = 0; i < winner.length; i++){
        score += winner[i] * (winner.length - i)
    }

    return score.toString();
}