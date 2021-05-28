module.exports = class Encoder {
    codeLength = 6
    specialCharacter = '+'
    dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%*()|-_=^/?'.split("")
    
    encode(number) {
        let encodedNumber = number.toString(16)

        if (encodedNumber.length < 6) {
            const missingCharacters = this.codeLength - encodedNumber.length
            encodedNumber += this.specialCharacter.repeat(missingCharacters).toString()
        }

        if (encodedNumber.length > 6) {
            const usablePortion = encodedNumber.substring(0, 5)
            const decimalOfTheDigitAtSixthPosition = parseInt(encodedNumber.substring(5, 6), 16)
            const characterSubstitute = this.dictionary[decimalOfTheDigitAtSixthPosition]
            
            encodedNumber = usablePortion.toString() + characterSubstitute.toString()
        }
        
        return encodedNumber
    }

    decode(code) {
        let decoded = 0
        const codeWithoutSpecialCharacter = code.replace(`${this.specialCharacter}`, '')

        let foundDictionaryCharacterPosition
        codeWithoutSpecialCharacter.split('').forEach((character) => {
            const found = this.dictionary.findIndex((dictionaryCharacter) => dictionaryCharacter === character)
            if (found === -1) return false

            foundDictionaryCharacterPosition = found
        })

        if (foundDictionaryCharacterPosition !== undefined) {
            const usablePortion = codeWithoutSpecialCharacter.substring(0, 5)
            
            for (let index = 5; index > 0; index--) {
                const character = usablePortion.split('').reverse().join('').substring(index - 1, index);

                decoded += parseInt(character, 16) * Math.pow(16, index + 1)
            }
            
            decoded += foundDictionaryCharacterPosition * 16 + foundDictionaryCharacterPosition
            
            return decoded
        }

        decoded = parseInt(codeWithoutSpecialCharacter, 16)

        return decoded
    }
}