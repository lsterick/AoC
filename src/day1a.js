export default function(input) {
  const numbers = input.split("\n");
  let result = 0;
  numbers.forEach(element => {
    result += parseInt(element);
  });
  return result.toString();
}
