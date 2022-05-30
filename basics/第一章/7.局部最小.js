let readline = require('readline')

let r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let N = -1
let nums = []

r1.on('line', (line) => {
  if (N < 0) N = parseInt(line.trim())
  else {
    nums = line.trim().split(" ").map(i => parseInt(i))

    if (N < 2 || nums[0] < nums[1]) return console.log(0);
    if (nums[N - 1] < nums[N - 2]) return console.log(N - 1);

    for (let i = 1; i < N - 1; i++) {
      if (nums[i] < nums[i - 1] && nums[i] < nums[i + 1]) return console.log(i);
    }
  }
})