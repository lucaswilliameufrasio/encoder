const Encoder = require('../src/encoder')

describe('Encoder', () => {
  it('Should return a code with fixed length of 6', () => {
    const numberWithOneDigit = 9
    const numberWithTwoDigits = 12
    const sut = new Encoder()

    const code1 = sut.encode(numberWithOneDigit)
    const code2 = sut.encode(numberWithTwoDigits)
    
    expect(code1).toHaveLength(6)
    expect(code2).toHaveLength(6)
  })
})
