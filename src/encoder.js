module.exports = class Encoder {
    codeLength = 6
    specialCode = '+'
    
    encode(number) {
        let encodedNumber = number.toString(16)

        if (encodedNumber.length < 6) {
            const missingCharacters = this.codeLength - encodedNumber.length
            encodedNumber += this.specialCode.repeat(missingCharacters).toString()
        }

        return encodedNumber
    }
}