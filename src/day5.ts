// NOTE: code doesn't work, but inspecting console output does.

export default function (input: string): string {
  const boardingPasses: Array<string> = input.split("\n");
  let maxSeatId = 0;

  const seatIds = boardingPasses.map((boardingPass) => {
    // convert to a binary string
    boardingPass = boardingPass.replace(/B/g, "1");
    boardingPass = boardingPass.replace(/F/g, "0");
    boardingPass = boardingPass.replace(/R/g, "1");
    boardingPass = boardingPass.replace(/L/g, "0");

    const row = parseInt(boardingPass.slice(0, 7), 2);
    const column = parseInt(boardingPass.slice(7), 2);

    const seatId = row * 8 + column;

    if (seatId > maxSeatId) {
      maxSeatId = seatId;
    }

    return seatId;
  });

  seatIds.sort(function (a, b) {
    return a - b;
  });

  let nextSeat = seatIds[0];
  console.log(JSON.stringify(seatIds));
  console.log(nextSeat);

  let mySeat = "";

  seatIds.forEach((seatId) => {
    console.log(seatId, nextSeat);
    if (seatId !== nextSeat) {
      mySeat = nextSeat.toString();
    }
    nextSeat++;
  });

  return mySeat;
}
