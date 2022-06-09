// 在一个数组中， 每一个数左边比当前数小的数累加起来， 叫做这个数组 的小和。 求一个数组 的小和。 例子: [1, 3, 4, 2, 5] 1 左边比1小的数， 没有;
// 3 左边比3小的数， 1;
// 4 左 边比4小的数， 1、 3;
// 2 左边比2小的数， 1;
// 5 左边比5小的数， 1、 3、 4、 2;
// 所以小和为1 + 1 + 3 + 1 + 1 + 3 + 4 + 2 = 16

// 归并排序
function merge_sort(arr, left, right, sum) {
  if (left >= right) return
  const middle = Math.floor(left + ((right - left) >> 1))
  merge_sort(arr, left, middle, sum)
  merge_sort(arr, middle + 1, right, sum)
  // 合并两个局部有序的数组
  merge(arr, left, middle, right, sum)
}

function merge(arr, left, middle, right, sum) {
  // 合并有序部分
  const result = []
  let i = left
  let j = middle + 1
  let currentSum = 0 // 记录当前j这一轮的和
  let lastSum = 0 // 当前j之前的所有和，left到i之间的
  while (true) {
    if (i === middle + 1) {
      while (j <= right) result.push(arr[j++])
      sum.value += currentSum
      break
    }
    if (j === right + 1) {
      while (i <= middle) result.push(arr[i++])
      break
    }
    if (arr[j] > arr[i]) {
      currentSum += arr[i]
      result.push(arr[i++])
    } else {
      sum.value += currentSum
      lastSum = currentSum
      currentSum = lastSum
      result.push(arr[j++])
    }
  }

  for (let i = left; i <= right; i++) {
    arr[i] = result[i - left]
  }
}

function getSmallSum(arr) {
  let sum = {
    value: 0
  }
  merge_sort(arr, 0, arr.length - 1, sum)
  return sum.value
}

let arr = [1, 5, 3, 6, 8, 7, 9, 8, 2, 3, 6]
console.log(getSmallSum(arr));
console.log(arr);