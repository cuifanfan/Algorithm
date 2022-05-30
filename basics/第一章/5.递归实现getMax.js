// Array.prototype.getMax = function (left = 0, right = this.length - 1) {
//   if (left === right) return this[left];

//   // mid = (left + right) / 2,右移 是防止left+right超出数的范围，同时右移速度也比较快
//   let mid = left + ((right - left) >> 1);
//   let leftMax = this.getMax(left, mid);
//   let rightMax = this.getMax(left + 1, right);
//   return Math.max(leftMax, rightMax);
// };

// // let arr = [1, 2, 3, 4, 5, 6];
// // console.log(arr.getMax());

// function getMax(arr, left, right) {
//   if (left === right) return arr[left];
//   let middle = left + ((right - left) >> 2);
//   let leftMax = getMax(arr, left, middle);
//   let rightMax = getMax(arr, middle + 1, right);
//   return Math.max(leftMax, rightMax);
// }

// let arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
// console.log(getMax(arr, 0, arr.length - 1));


function getMax(arr, left, right) {
  if (left === right) return arr[left]

  let middle = Math.floor(left + ((right - left) >> 1))
  let leftMax = getMax(arr, left, middle)
  let rightMax = getMax(arr, middle + 1, right)
  return Math.max(leftMax, rightMax)
}

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
    nums = line.trim().split(" ").map(i => parseInt(i))

    let max = getMax(nums, 0, nums.length - 1)
    console.log(max)
  }
})