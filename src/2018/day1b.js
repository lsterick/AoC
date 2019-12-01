export default function(input) {
  const numbers = input.split("\n");
  let currentNumber = 0;
  let observedNumbers = [];

  for (let i = 0; ; i = (i + 1) % numbers.length) {
    if (observedNumbers.includes(currentNumber)) {
      return currentNumber.toString();
    }
    observedNumbers.push(currentNumber);
    currentNumber += parseInt(numbers[i]);
  }
}
