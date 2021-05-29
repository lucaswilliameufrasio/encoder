module.exports = class Encoder {
    codeLength = 6
    specialCharacter = '+'
    dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%*()|-_=^/?'.split("")
    
    encode(number) {
        let encodedNumber = number.toString(16)

        if (encodedNumber.length < 6) {
            const missingCharacters = this.codeLength - encodedNumber.length

            // Concatenate N times the special character
            encodedNumber += this.specialCharacter.repeat(missingCharacters).toString()
        }

        if (encodedNumber.length > 6) {
            const usablePortion = encodedNumber.substring(0, 5)

            // Get the sixth position digit and convert to decimal
            const decimalOfTheDigitAtSixthPosition = parseInt(encodedNumber.substring(5, 6), 16)
            // Get the seven position digit and convert to decimal
            const decimalOfTheDigitAtSeventhPosition = parseInt(encodedNumber.substring(6, 7), 16)
            console.log(decimalOfTheDigitAtSixthPosition)
            // Get a substitute on the dictionary to the sixth position character
            let characterSubstitute

            // To reduce collision we verify if the digit at sixth position is
            // greater than the digit at seventh position.
            // If it is true, we subtract by the dictionary length.
            // Think of it as we are getting the N element from the left to the right,
            // or from right to the left 
            if (decimalOfTheDigitAtSixthPosition > decimalOfTheDigitAtSeventhPosition) {
                characterSubstitute = this.dictionary[decimalOfTheDigitAtSixthPosition + decimalOfTheDigitAtSeventhPosition]
            } else {
                characterSubstitute = this.dictionary[this.dictionary.length - (decimalOfTheDigitAtSixthPosition + decimalOfTheDigitAtSeventhPosition)]
            }
            
            encodedNumber = usablePortion.toString() + characterSubstitute.toString()
        }
        
        return encodedNumber
    }

    convertValueFromHexadecimalToDecimal(value, exponent = 1) {
        return value * Math.pow(16, exponent)
    }

    findDictionaryCharacterPositionOnCode(code) {
        let position
        code.split('').forEach((character) => {
            const found = this.dictionary.findIndex((dictionaryCharacter) => dictionaryCharacter === character)
            if (found === -1) return false

            position = found
        })

        return position
    }

    decode(code) {
        let decoded = 0
        
        // Removes the special character
        const codeWithoutSpecialCharacter = code.replace(`${this.specialCharacter}`, '')

        const foundDictionaryCharacterPosition = this.findDictionaryCharacterPositionOnCode(codeWithoutSpecialCharacter)

        if (foundDictionaryCharacterPosition !== undefined) {
            const usablePortion = codeWithoutSpecialCharacter.substring(0, 5)
            
            for (let index = 5; index > 0; index--) {
                // Reverse the string and extract a character from the code
                const character = usablePortion.split('').reverse().join('').substring(index - 1, index);

                // Convert each character to decimal and multiply per 16 by power of a number,
                // Where this number is the current index.
                decoded += this.convertValueFromHexadecimalToDecimal(parseInt(character, 16), index + 1)
            }
            
            decoded += this.convertValueFromHexadecimalToDecimal(foundDictionaryCharacterPosition, 1) + foundDictionaryCharacterPosition
            
            return decoded
        }

        decoded = parseInt(codeWithoutSpecialCharacter, 16)

        return decoded
    }
}