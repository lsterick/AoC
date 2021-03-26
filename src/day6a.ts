export default function (input: string): string {
  const families: Array<string> = input.split("\n\n");
  let totalYes = 0;

  families.forEach((family) => {
    totalYes += family
      .replace(/\n/g, "")
      .split("")
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      }).length;
    console.log(totalYes);
  });

  return totalYes.toString();
}
