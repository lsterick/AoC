function validateHeight(hgtWithUnit: string) {
  const hgt = parseInt(hgtWithUnit);
  if (hgtWithUnit.endsWith("cm") && hgt >= 150 && hgt <= 193) {
    return true;
  } else if (hgtWithUnit.endsWith("in") && hgt >= 59 && hgt <= 76) {
    return true;
  }
  return false;
}

export default function (input: string): string {
  const passports: Array<string> = input.split("\n\n");
  let validPassportCount = 0;

  passports.forEach((passport) => {
    try {
      passport = passport.replace(/\n/g, " ");
      console.log(passport);
      const byr = parseInt(passport.split("byr:")[1]);
      const iyr = parseInt(passport.split("iyr:")[1]);
      const eyr = parseInt(passport.split("eyr:")[1]);
      const isHgtValid = validateHeight(
        passport.split("hgt:")[1].split(" ")[0]
      );
      const hcl = passport.split("hcl:")[1].split(" ")[0];
      const ecl = passport.split("ecl:")[1].split(" ")[0];
      const pid = passport.split("pid:")[1].split(" ")[0];
      if (
        byr >= 1920 &&
        byr <= 2002 &&
        iyr >= 2010 &&
        iyr <= 2020 &&
        eyr >= 2020 &&
        eyr <= 2030 &&
        isHgtValid &&
        hcl.match(/^#[0-9a-f]{6}$/) &&
        (ecl === "amb" ||
          ecl === "blu" ||
          ecl === "brn" ||
          ecl === "gry" ||
          ecl === "grn" ||
          ecl === "hzl" ||
          ecl === "oth") &&
        pid.match(/^[0-9]{9}$/)
      ) {
        validPassportCount++;
      }
    } catch (e) {}
  });

  return validPassportCount.toString();
}
