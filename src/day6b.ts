export default function (input: string): string {
  const families: Array<string> = input.split("\n\n");
  let totalYes = 0;

  families.forEach((family) => {
    const people = family.split("\n").map((person) => {
      return person.split("");
    });

    if (people.length === 1) {
      totalYes += people[0].length;
    } else {
      for (let i = 0; i < people[0].length; i++) {
        let allYes = true;
        for (let j = 0; j < people.length; j++) {
          if (!people[j].includes(people[0][i])) {
            allYes = false;
          }
        }
        if (allYes) {
          totalYes++;
        }
      }
    }
  });

  return totalYes.toString();
}
