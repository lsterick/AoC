export default function (input: string): string {
  const passwordStrings: Array<string> = input.split("\n");
  let validPasswordCount = 0;

  for (let i = 0; i < passwordStrings.length; i++) {
    const first = parseInt(passwordStrings[i].split("-")[0]) - 1;
    const second = parseInt(passwordStrings[i].split("-")[1].split(" ")[0]) - 1;
    const character = passwordStrings[i].split(" ")[1].split(":")[0];
    const password = passwordStrings[i].split(" ")[2];

    if (
      (password[first] === character && password.length <= second) ||
      (password[first] === character && password[second] !== character) ||
      (password[first] !== character && password[second] === character)
    ) {
      validPasswordCount++;
    }
  }

  return validPasswordCount.toString();
}
