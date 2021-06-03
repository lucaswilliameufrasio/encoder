module.exports = class Encoder {
  codeLength = 6;
  specialCharacter = "+";
  dictionary = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%*()|-_=^/?".split("");

  encode(number) {
    let encodedNumber = "";
    let quotient = number;
    let dividend = number;

    if (number < 0 || number > 99999999)
      throw new Error(
        "Invalid number provided. Only numbers between 0 and 99999999 are allowed"
      );

    if (number === 0) encodedNumber += this.dictionary[number];

    while (quotient !== 0) {
      quotient = Math.trunc(quotient / 32);
      const remainder = dividend - quotient * 32;
      dividend = quotient;
      encodedNumber += this.dictionary[remainder];
    }

    if (encodedNumber.length < this.codeLength) {
      const missingCharacters = this.codeLength - encodedNumber.length;

      // Concatenate N times the special character
      encodedNumber += this.specialCharacter
        .repeat(missingCharacters)
        .toString();
    }

    return encodedNumber.toString();
  }

  decode(code) {
    let decoded = 0;
    let power = 0;

    // Removes the special character
    const codeWithoutSpecialCharacter = code.replace(
      new RegExp(`\\${this.specialCharacter}+`, "g"),
      ""
    );

    codeWithoutSpecialCharacter.split("").forEach((character) => {
      const positionOnDictionary = this.dictionary.findIndex(
        (word) => word === character
      );
      if (positionOnDictionary === -1) {
        throw new Error("Invalid code provided");
      }
      decoded += +positionOnDictionary * Math.pow(32, power);
      power++;
    });

    if (decoded > 99999999 || decoded < 0) {
      throw new Error("Invalid code provided");
    }

    return decoded;
  }
};
