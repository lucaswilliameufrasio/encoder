const repl = require('repl')
const Encoder = require('./encoder')

const encoder = new Encoder()

const replServer = repl.start({ prompt: '> ' })

replServer.defineCommand('encode', {
  help: 'Encode number',
  action(number) {
    const code = encoder.encode(number)
    this.clearBufferedCommand()
    console.log(code)
    this.displayPrompt(code)
  },
})

replServer.defineCommand('decode', {
  help: 'Decode code',
  action(code) {
    const number = encoder.decode(code)
    this.clearBufferedCommand()
    console.log(number)
    this.displayPrompt(number)
  },
})
