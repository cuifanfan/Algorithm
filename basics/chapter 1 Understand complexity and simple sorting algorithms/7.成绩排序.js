const readline = require('readline')

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let N = -1
let flag = -1
let results = []
let target = false

r1.on('line', (line) => {
  if (N < 0) N = parseInt(line.trim())
  else if (flag < 0) {
    flag = parseInt(line.trim())
  } else {
    let inputs = line.trim()
    if (inputs.split(" ").length === 1) {
      if (!target) {
        N = parseInt(line.trim())
        target = true
      } else {
        flag = parseInt(line.trim())
        target = false
        results = []
      }
    } else {
      let key_value = inputs.split(" ")
      key_value[1] = parseInt(key_value[1])
      results.push(key_value)


      if (results.length > 1) {
        let j = results.length - 2
        let tempValue = key_value[1]
        let tempKey = key_value[0]
        while (results[j] && results[j][1] > tempValue) {
          results[j + 1][0] = results[j][0]
          results[j + 1][1] = results[j][1]
          j--
        }
        results[j + 1][0] = tempKey
        results[j + 1][1] = tempValue
      }

      if (results.length === N) {
        // 执行逻辑
        if (flag === 1) {
          for (let i = 0; i < N; i++) {
            console.log(results[i][0], results[i][1]);
          }
        } else {
          for (let i = N - 1; i >= 0; i--) {
            console.log(results[i][0], results[i][1]);
          }
        }
      }
    }
  }
})