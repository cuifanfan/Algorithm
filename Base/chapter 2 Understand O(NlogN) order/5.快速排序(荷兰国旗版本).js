function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]]
}

function quick_sort(arr, left, right) {
  left = left || 0
  right = right || arr.length - 1
  if (!arr || left >= right || arr.length < 2) return

  // 在[left, right]上随机选取一个枢纽，与right交换。
  swap(arr, left + Math.floor(Math.random() * (right - left + 1)), right)
  // 把整个数组根据枢纽分为三块区域(左边：小于枢纽，中间：等于枢纽，右边：大于枢纽)，返回的section是一个区间：该区间内的数字全部等于枢纽
  const section = partition(arr, left, right)

  quick_sort(arr, left, section[0] - 1)
  quick_sort(arr, section[1] + 1, right)
}

// function partition(arr, left, right) {
//   // 把整个数组根据枢纽分为三块区域，返回一个数组[a,b];是一个区间：该区间内的数字全部等于枢纽
//   let less = left - 1
//   let more = right
//   while (left < more) {
//     if (arr[left] < arr[right]) {
//       swap(arr, left++, ++less)
//     } else if (arr[left] > arr[right]) {
//       swap(arr, left, --more)
//     } else {
//       left++
//     }
//   }
//   // left === more
//   swap(arr, more, right)
//   return [less + 1, more]
// }

// function partition(arr, left, right) {
//   let less = left - 1
//   let i = left
//   while (i < right) {
//     if (arr[i] <= arr[right]) {
//       swap(arr, i++, ++less)
//     } else {
//       i++
//     }
//   }
//   swap(arr, right, ++less)
// }

function partition(arr, left, right) {
  // 荷兰国旗问题
  let index = left
  let less = left - 1 // 小于枢纽的那部分
  let more = right // 大于枢纽的那部分
  while (index < more) {
    if (arr[index] < arr[right]) {
      swap(arr, index++, ++less)
    } else if (arr[index] > arr[right]) {
      swap(arr, index, --more)
    } else {
      index++
    }
  }
  swap(arr, right, more)
  return [less + 1, more]
}

let arr = [3, 1, 9, 6, 4, 2, 7, 5]
partition(arr, 0, arr.length - 1)
console.log(arr);