export default function (input: string): string {
  const hillOfStrings: Array<string> = input.split("\n");
  const hill = hillOfStrings.map((rowString) => {
    return rowString.split("");
  });
  let treeCount = 0;

  console.log(hill);

  for (let y = 0, x = 0; y < hill.length; y += 2) {
    console.log(x, y, hill[y][x]);
    if (hill[y][x] === "#") {
      treeCount++;
    }

    x = (x + 1) % hill[y].length;
  }

  return treeCount.toString();
}
