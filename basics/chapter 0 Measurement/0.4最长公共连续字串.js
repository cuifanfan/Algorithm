let readline = require('readline')

let r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let strs = []
r1.on('line', (line) => {
  strs.push(line.trim())
  if (strs.length === 2) {
    let str1 = strs[0]
    let str2 = strs[1]
    let maxIndex = 0
    for (let i = 0; i < str1.length; i++) {
      let j = 0
      let index = 0
      while (j < str2.length) {
        if (str1[i + index] === str2[j]) {
          index++
        } else {
          maxIndex = Math.max(maxIndex, index)
          index = 0
        }
        j++
      }
      maxIndex = Math.max(maxIndex, index)
    }
    console.log(maxIndex);
  }
})