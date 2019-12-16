function countOrbits(
  countSoFar: number,
  currentOrbiter: string,
  orbits: { [key: string]: string }
): number {
  if (currentOrbiter === "COM") {
    return countSoFar;
  } else {
    return countOrbits(countSoFar + 1, orbits[currentOrbiter], orbits);
  }
}

export default function(input: string) {
  const bracketNotation = input.split("\n");
  const orbits: { [key: string]: string } = {};
  bracketNotation.forEach(bracketOrbit => {
    const [orbited, orbiter] = bracketOrbit.split(")");
    orbits[orbiter] = orbited;
  });

  let total = 0;

  Object.keys(orbits).forEach(orbiter => {
    total += countOrbits(0, orbiter, orbits);
  });

  return total.toString();
}
