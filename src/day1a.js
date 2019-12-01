function fuelPerCargo(calculateFor, totalSoFar) {
  let newFuel = Math.floor(calculateFor / 3) - 2;
  if (newFuel <= 0) {
    return totalSoFar;
  } else {
    return fuelPerCargo(newFuel, totalSoFar + newFuel);
  }
}

export default function(input) {
  const numbers = input.split("\n");
  let result = 0;
  numbers.forEach(element => {
    result += fuelPerCargo(parseInt(element), 0);
  });

  return result.toString();
}
