module.exports = class Encoder {
  codeLength
  specialCharacter
  dictionary

  constructor(codeLength, specialCharacter, dictionary) {
    if (typeof codeLength !== 'number') {
      throw new Error('codeLength could be only a number')
    }

    if (dictionary.includes(specialCharacter)) {
      throw new Error(
        'specialCharacter could not be included in the dictionary',
      )
    }

    if (!Array.isArray(dictionary)) {
      throw new Error('dictionary needs to be an array of characters')
    }

    if (
      dictionary.filter((word) => typeof word !== 'string' && isNaN(word))
        .length
    ) {
      throw new Error('dictionary could only contain characters and numbers')
    }

    this.codeLength = codeLength
    this.specialCharacter = specialCharacter
    this.dictionary = dictionary
  }

  encode(number) {
    let encodedNumber = ''
    let quotient = number
    let dividend = number

    if (number < 0 || number > 99999999)
      throw new Error(
        'Invalid number provided. Only numbers between 0 and 99999999 are allowed',
      )

    if (number === 0) encodedNumber += this.dictionary[number]

    while (quotient !== 0) {
      quotient = Math.trunc(quotient / 32)
      const remainder = dividend - quotient * 32
      dividend = quotient
      encodedNumber += this.dictionary[remainder]
    }

    if (encodedNumber.length < this.codeLength) {
      const missingCharacters = this.codeLength - encodedNumber.length

      // Concatenate N times the special character
      encodedNumber += this.specialCharacter
        .repeat(missingCharacters)
        .toString()
    }

    return encodedNumber.toString()
  }

  decode(code) {
    let decoded = 0
    let power = 0

    // Removes the special character
    const codeWithoutSpecialCharacter = code.replace(
      new RegExp(`\\${this.specialCharacter}+`, 'g'),
      '',
    )

    codeWithoutSpecialCharacter.split('').forEach((character) => {
      const positionOnDictionary = this.dictionary.findIndex(
        (word) => word === character,
      )
      if (positionOnDictionary === -1) {
        throw new Error('Invalid code provided')
      }
      decoded += +positionOnDictionary * Math.pow(32, power)
      power++
    })

    if (decoded > 99999999 || decoded < 0) {
      throw new Error('Invalid code provided')
    }

    return decoded
  }
}
