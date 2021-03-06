const Encoder = require('../src/encoder')

const makeSut = (
  codeLength = 6,
  specialCharacter = '+',
  dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%*()|-_=^/?'.split(''),
) => {
  const sut = new Encoder(codeLength, specialCharacter, dictionary)

  return {
    sut,
  }
}

describe('Encoder', () => {
  it('Should throw if a codeLength provided is not a number', () => {
    const sutError = () => makeSut('6')
    expect(sutError).toThrowError('codeLength could be only a number')
  })

  it('Should throw if specialCharacter is included on dictionary', () => {
    const sutError = () => makeSut(6, 'A')
    expect(sutError).toThrowError(
      'specialCharacter could not be included in the dictionary',
    )
  })

  it('Should throw if dictionary is not an array', () => {
    const sutError = () => makeSut(6, '+', 'AB')
    expect(sutError).toThrowError(
      'dictionary needs to be an array of characters',
    )
  })

  it('Should throw if dictionary not contains characters or numbers', () => {
    const sutError = () => makeSut(6, '+', ['A', () => {}])
    expect(sutError).toThrowError(
      'dictionary could only contain characters and numbers',
    )
  })

  describe('encode()', () => {
    it('Should return a code with fixed length of 6', () => {
      const numberWithOneDigit = 9
      const numberWithTwoDigits = 12
      const numberWithThreeDigits = 123
      const numberWithFourDigits = 1234
      const numberWithFiveDigits = 12345
      const numberWithSixDigits = 123456
      const numberWithSevenDigits = 1234567
      const numberWithEightDigits = 99999999
      const { sut } = makeSut()

      const code1 = sut.encode(numberWithOneDigit)
      const code2 = sut.encode(numberWithTwoDigits)
      const code3 = sut.encode(numberWithThreeDigits)
      const code4 = sut.encode(numberWithFourDigits)
      const code5 = sut.encode(numberWithFiveDigits)
      const code6 = sut.encode(numberWithSixDigits)
      const code7 = sut.encode(numberWithSevenDigits)
      const code8 = sut.encode(numberWithEightDigits)

      expect(code1).toHaveLength(6)
      expect(code2).toHaveLength(6)
      expect(code3).toHaveLength(6)
      expect(code4).toHaveLength(6)
      expect(code5).toHaveLength(6)
      expect(code6).toHaveLength(6)
      expect(code7).toHaveLength(6)
      expect(code8).toHaveLength(6)
    })

    it('Should return a code with fixed length of 77', () => {
      const numberWithOneDigit = 9
      const numberWithTwoDigits = 12
      const numberWithThreeDigits = 123
      const numberWithFourDigits = 1234
      const numberWithFiveDigits = 12345
      const numberWithSixDigits = 123456
      const numberWithSevenDigits = 1234567
      const numberWithEightDigits = 99999999
      const { sut } = makeSut(77)

      const code1 = sut.encode(numberWithOneDigit)
      const code2 = sut.encode(numberWithTwoDigits)
      const code3 = sut.encode(numberWithThreeDigits)
      const code4 = sut.encode(numberWithFourDigits)
      const code5 = sut.encode(numberWithFiveDigits)
      const code6 = sut.encode(numberWithSixDigits)
      const code7 = sut.encode(numberWithSevenDigits)
      const code8 = sut.encode(numberWithEightDigits)

      expect(code1).toHaveLength(77)
      expect(code2).toHaveLength(77)
      expect(code3).toHaveLength(77)
      expect(code4).toHaveLength(77)
      expect(code5).toHaveLength(77)
      expect(code6).toHaveLength(77)
      expect(code7).toHaveLength(77)
      expect(code8).toHaveLength(77)
    })

    it('Should throw if number is invalid', () => {
      const invalidNumber = '999999859'

      const { sut } = makeSut()

      const error = () => sut.encode(invalidNumber)

      expect(error).toThrow(Error)
      expect(error).toThrow(
        'Invalid number provided. Only numbers between 0 and 99999999 are allowed',
      )
    })
  })

  describe('decode()', () => {
    it('Should return a number', () => {
      const codeWithSpecialCharacter = '+++++J'
      const codeWithoutSpecialCharacter = 'HUVFB+'
      const codeWithDictionaryCharacter1 = '*HYL*C'
      const codeWithDictionaryCharacter2 = '+++++W'
      const codeWithDictionaryCharacter3 = 'RHYL*C'
      const { sut } = makeSut()

      const number1 = sut.decode(codeWithSpecialCharacter)
      const number2 = sut.decode(codeWithoutSpecialCharacter)
      const number3 = sut.decode(codeWithDictionaryCharacter1)
      const number4 = sut.decode(codeWithDictionaryCharacter2)
      const number5 = sut.decode(codeWithDictionaryCharacter3)

      expect(number1).toBe(9)
      expect(number2).toBe(1234567)
      expect(number3).toBe(99999999)
      expect(number4).toBe(22)
      expect(number5).toBe(99999985)
    })

    it('Should throw if code is invalid', () => {
      const invalidCode = '5f5e0Q'

      const { sut } = makeSut()

      const error = () => sut.decode(invalidCode)

      expect(error).toThrow(Error)
      expect(error).toThrow('Invalid code provided')
    })

    it('Should throw if code has invalid character', () => {
      const invalidCode = 'RHYL*a'

      const { sut } = makeSut()

      const error = () => sut.decode(invalidCode)

      expect(error).toThrow(Error)
      expect(error).toThrow('Invalid code provided')
    })
  })
})
