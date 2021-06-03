const Encoder = require("./encoder");

const encoder = new Encoder();

console.log(encoder.encode(99999985));
// console.log(encoder.decode('*HYL*C'))
console.log(encoder.decode("HUVFB+"));
for (let number = 11111111; number < 99999999; number++) {
  const code = encoder.encode(number);

  // expect(code).toHaveLength(6)
}

// console.log(encoder.encode(99999999))
// console.log(encoder.encode(8))
// console.log(encoder.encode(99999811))
// console.log(encoder.encode(99999796))
// console.log(encoder.encode(99999826))
// console.log(encoder.encode(99999781))
// console.log(encoder.encode(99999766))
// console.log(encoder.encode(99999841))
