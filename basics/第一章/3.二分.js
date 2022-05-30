// Array.prototype.dichotomia = function (target) {
//   let left = 0;
//   let right = this.length - 1;
//   let middle = Math.floor((left + right) / 2);
//   while (left <= right) {
//     if (arr[middle] < target) {
//       left = middle + 1;
//     } else if (arr[middle] > target) {
//       right = middle - 1;
//     } else {
//       return middle;
//     }
//     middle = Math.floor((left + right) / 2);
//   }
//   return -1;
// };

// // let arr = [1, 3, 5, 7, 9, 11, 13, 15];
// // console.log(arr.dichotomia(5));

// let arr1 = [1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5];

// // 找最左侧大于等于target的值
// // 二分之后在确定位置坐标之前继续二分

Array.prototype.dichotomiaLeft = function(target) {
  let left = 0;
  let right = this.length - 1;
  let middle = Math.floor((left + right) / 2);
  while (left <= right) {
    if (this[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
    middle = Math.floor((left + right) / 2);
  }
  return left;
};

// console.log(arr1.dichotomiaLeft(5));

// 局部最小值问题
// arr无序，任何相邻的两个数不相等，求一个局部最小值的索引
// 要求：时间复杂度好于O(N)

const readline = require('readline');

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let target = -1
let N = -1
let nums = []

r1.on('line', (line) => {
  if (N < 0) {
    [N, target] = line.trim().split(" ").map(i => parseInt(i))
  } else {
    nums = line.trim().split(" ").map(i => parseInt(i))

    let left = 0;
    let right = N - 1;
    let middle = Math.floor(left + ((right - left) >> 1));
    while (left <= right) {
      if (nums[middle] < target) {
        left = middle + 1;
      } else if (nums[middle] > target) {
        right = middle - 1;
      } else {
        while (nums[--middle] === target) {}
        return console.log(middle + 1);
      }
      middle = Math.floor(left + ((right - left) >> 1));
    }
    console.log(-1);
  }


})