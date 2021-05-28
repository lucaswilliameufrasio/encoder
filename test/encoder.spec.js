const Encoder = require('../src/encoder')

describe('Encoder', () => {
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
      const sut = new Encoder()
  
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
  })

  describe('decode()', () => {
    it ('Should return a number', () => {
      const codeWithSpecialCharacter = '9+++++'
      const codeWithoutSpecialCharacter = '12d687'
      const sut = new Encoder()

      const number1 = sut.decode(codeWithSpecialCharacter)
      const number2 = sut.decode(codeWithoutSpecialCharacter)

      expect(number1).toBe(9)
      expect(number2).toBe(1234567)
    })
  })
})
