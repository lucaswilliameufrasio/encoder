module.exports = class Encoder {
    codeLength = 6
    specialCode = '+'
    dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%*()|-_=^/?'.split("")
    
    encode(number) {
        let encodedNumber = number.toString(16)

        if (encodedNumber.length < 6) {
            const missingCharacters = this.codeLength - encodedNumber.length
            encodedNumber += this.specialCode.repeat(missingCharacters).toString()
        }

        if (encodedNumber.length > 6) {
            const usablePortion = encodedNumber.substring(0, 5)
            const decimalOfTheDigitAtSixthPosition = parseInt(encodedNumber.substring(5, 6), 16)
            const characterSubstitute = this.dictionary[decimalOfTheDigitAtSixthPosition]
            
            encodedNumber = usablePortion.toString() + characterSubstitute.toString()
        }
        
        return encodedNumber
    }
}