const Encoder = require('../src/encoder')

describe('Encoder', () => {
  it('Should return a code with fixed length of 6', () => {
    const numberWithOneDigit = 9
    const sut = new Encoder()

    const code = sut.encode(numberWithOneDigit)
    
    expect(code).toHaveLength(6)
  })
})
