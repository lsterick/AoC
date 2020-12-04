export default function (input: string): string {
  const expenses: Array<number> = input.split("\n").map((i) => parseInt(i));
  console.log(`expenses = ${expenses}`);

  for (let i = 0; i < expenses.length; i++) {
    for (let j = 0; j < expenses.length; j++) {
      for (let k = 0; k < expenses.length; k++) {
        if (expenses[i] + expenses[j] + expenses[k] === 2020) {
          return (expenses[i] * expenses[j] * expenses[k]).toString();
        }
      }
    }
  }

  return "Failed";
}
