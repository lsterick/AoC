function reducePolymer(input) {
  for (let i = 0; i < input.length - 1; i++) {
    if ((input[i] === input[i + 1].toUpperCase() || input[i] === input[i + 1].toLowerCase()) && input[i] !== input[i + 1]) {
      const frontHalf = input.slice(0, i);
      const backHalf = input.slice(i + 2);
      input = frontHalf + backHalf;
      i -= 2;
    }
  }

  return input.length;
}

export default function(input) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let minLength = 11894;
  for (let i = 0; i < 26; i++) {
    const reArg = `${alphabet[i]}`;
    const re = new RegExp(reArg, "gi");
    let emptiedString = input.replace(re, '');
    const currentLength = reducePolymer(emptiedString);
    if (currentLength < minLength) {
      minLength = currentLength;
    }
  }

  return minLength.toString();
}
