// @ts-nocheck
function countOrbits(
  countSoFar: number,
  currentOrbiter: string,
  orbits: { [key: string]: string },
  target: string
): number {
  if (currentOrbiter === target) {
    return countSoFar;
  } else {
    return countOrbits(countSoFar + 1, orbits[currentOrbiter], orbits, target);
  }
}

function arrayOfChildren(
  nextParent: string,
  arraySoFar: string[],
  orbits: { [key: string]: string }
): string[] {
  if (nextParent === "COM") {
    return arraySoFar;
  } else {
    arraySoFar.unshift(nextParent);
    return arrayOfChildren(orbits[nextParent], arraySoFar, orbits);
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

  // construct array of YOU children
  const youKids = arrayOfChildren(orbits["YOU"], [], orbits);
  // construct array of SAN children
  const sanKids = arrayOfChildren(orbits["SAN"], [], orbits);
  // find first common child
  let commonChild: string = "COM";
  for (;;) {
    const youKid = youKids.shift();
    const sanKid = sanKids.shift();
    if (youKid === sanKid) {
      commonChild = youKid;
    } else {
      break;
    }
  }

  // get YOU count
  total += countOrbits(0, orbits["YOU"], orbits, commonChild);
  // get SAN count
  total += countOrbits(0, orbits["SAN"], orbits, commonChild);

  return total.toString();
}
