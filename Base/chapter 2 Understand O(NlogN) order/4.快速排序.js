function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]]
}

function getPivot(arr, left, right) {
  // 只有一个元素的时候
  if (left >= right) return arr[left]

  let middle = Math.floor(left + ((right - left) >> 1))

  // 给left, middle, right排序
  if (arr[left] > arr[middle]) swap(arr, left, middle)
  if (arr[middle] > arr[right]) swap(arr, middle, right)
  if (arr[left] > arr[middle]) swap(arr, left, middle)

  // 把中位数middle放到right-1位置
  swap(arr, middle, right - 1)
  return arr[right - 1]
}

function quick_sort(arr, left, right) {
  if (left >= right) return

  // 获取枢纽，同时给left, middle, right排好序(选取中位数作为枢纽，尽量保证枢纽选取在中间，时间复杂度接近O(nlogn),更加稳定)
  const privot = getPivot(arr, left, right)

  let i = left
  let j = right - 1
  while (i < j) {
    while (arr[++i] < privot) {}
    while (arr[--j] > privot) {}
    // 到这里可能的情况只会是：
    // 1. i < j => arr[i] >= privot; arr[j] <= privot
    // 2. i > j => arr[i] >= privot; arr[j] <= privot (i~j范围全是privot)
    if (i < j) {
      swap(arr, i, j)
    } else {
      swap(arr, i, right - 1)
      quick_sort(arr, left, j)
      quick_sort(arr, i, right)
    }
  }
}

let arr = [5, 6, 1, 3, 8, 5, 9, 4, 7]
quick_sort(arr, 0, arr.length - 1)
console.log(arr);