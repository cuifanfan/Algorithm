const readline = require('readline')

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let N = -1
let nums = []

r1.on('line', (line) => {
  if (N < 0) N = parseInt(line.trim())
  else {
    if (N <= 2) {
      console.log(N);
      return
    }

    let count = 2
    let maxCount = 2
    if (num[0] >= nums[1]) {
      for (let i = 2; i < N; i++) {
        if (nums[i] > nums[i - 1]) {
          count++
        } else {
          let maxCount = Math.max(maxCount, count)

        }
      }
    }
  }
})