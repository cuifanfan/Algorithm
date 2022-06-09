// 在一个数组中， 每一个数左边比当前数小的数累加起来， 叫做这个数组 的小和。 求一个数组 的小和。 例子: [1, 3, 4, 2, 5] 1 左边比1小的数， 没有;
// 3 左边比3小的数， 1;
// 4 左 边比4小的数， 1、 3;
// 2 左边比2小的数， 1;
// 5 左边比5小的数， 1、 3、 4、 2;
// 所以小和为1 + 1 + 3 + 1 + 1 + 3 + 4 + 2 = 16

// 归并排序

function merge_sort(arr, left, right, map) {
  if (left >= right) return
  const middle = Math.floor(left + ((right - left) >> 1))
  merge_sort(arr, left, middle, map)
  merge_sort(arr, middle + 1, right, map)
  // 合并两个局部有序的数组
  merge(arr, left, middle, right, map)
}

function merge(arr, left, middle, right, map) {
  // 合并有序部分
  const result = []
  let i = left
  let j = middle + 1
  while (true) {
    if (i === middle + 1) {
      while (j <= right) result.push(arr[j++])
      break
    }
    if (j === right + 1) {
      while (i <= middle) result.push(arr[i++])
      break
    }
    if (arr[j] < arr[i]) {
      let count = right - j + 1
      if (map.has(arr[i])) {
        map.set(arr[i], map.get(arr[i]) + count)
      } else {
        map.set(arr[i], count)
      }
      result.push(arr[i++])
    } else {
      // 相等的时候，先拷贝右边
      result.push(arr[j++])
    }
  }

  for (let i = left; i <= right; i++) {
    arr[i] = result[i - left]
  }
}

function getSmallSum(arr) {
  let map = new Map()
  merge_sort(arr, 0, arr.length - 1, map)

  let sum = 0
  for (let [key, value] of map) {
    sum += key * value
  }
  console.log(map);
  return sum
}

let arr = [1, 1, 1, 1, 2, 2, 3, 3, 5, 1, 1, 1, 2, 2, 6, 6, 7]
console.log(getSmallSum(arr));
console.log(arr);