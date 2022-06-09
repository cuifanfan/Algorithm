const readline = require('readline')

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let N = -1
let inputs = []

r1.on('line', (line) => {
  if (N < 0) N = parseInt(line.trim())
  else {
    let map = new Map()

    inputs = line.trim().split(' ').map((i) => parseInt(i))
    inputs.sort((x, y) => x - y)

    for (let i = 0; i < inputs.length; i++) {
      for (let j = i + 1; j < inputs.length; j++) {
        for (let k = j + 1; k < inputs.length; k++) {
          if (inputs[i] + inputs[j] <= inputs[k]) break
          else if (inputs[i] + inputs[k] > inputs[j] && inputs[k] + inputs[j] > inputs[i]) {
            let str = [inputs[i], inputs[j], inputs[k]].join("")
            if (!map.has(str)) map.set(str, str)
          }
        }
      }
    }

    console.log(map.size);
  }
})