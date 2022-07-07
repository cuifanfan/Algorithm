function check_eng(s) {
  // 判断字符是否为英文字母
  const reg = /^[A-Za-z]$/
  return reg.test(s)
}

function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]]
}

function char_code_at(s) {
  // 返回字符的ASCLL值
  if (check_eng(s)) return s.toLowerCase().charCodeAt(0)
  else return s.charCodeAt(0)
}

// 当前元素位于index，向上调整堆结构
function heap_insert(arr, index) {
  let fIndex = Math.floor((index - 1) / 2)
  while (fIndex >= 0 && char_code_at(arr[index][0]) > char_code_at(arr[fIndex][0])) {
    if (check_eng(arr[fIndex][0])) swap(arr, fIndex, index)
    index = fIndex
    fIndex = Math.floor((index - 1) / 2)
  }
}

// 当前元素位于index, 向下调整堆结构；size含义是数组[0, size]范围为堆结构
function heapify(arr, index, size) {
  // 当前元素的左孩子
  let left = index * 2 + 1
  while (left <= size) {
    // 最大的孩子的索引
    const maxIndex = left + 1 <= size && char_code_at(arr[left + 1][0]) > char_code_at(arr[left][0]) ? left + 1 : left

    if (char_code_at(arr[index][0]) >= char_code_at(arr[maxIndex][0])) return

    // 孩子比自己大
    if (check_eng(arr[maxIndex][0])) swap(arr, index, maxIndex)
    index = maxIndex
    left = 2 * index + 1
  }
}

function heap_sort(arr, left, right) {
  left = left || 0
  right = right || arr.length - 1
  // 堆化数组
  for (let i = Math.floor((right - left) / 2) - 1; i >= left; i--) {
    heapify(arr, i, arr.length - 1)
  }

  let size = right
  while (size > 0) {
    swap(arr, 0, size--)
    heapify(arr, 0, size)
  }
}

const strArr = "EjMay"
const arr1 = []
const arr2 = []
for (let i = 0; i < strArr.length; i++) {
  if (check_eng(strArr[i])) {
    arr2.push([strArr[i], i])
  } else {
    arr1.push([strArr[i], i])
  }
}

let i = 0
let j = 0
while (true) {
  if (i === arr1.length) {
    while (j <= arr2.length) strArr[i + j] = arr2[j++][0]
    break
  }

  if (j === arr2.length) {
    while (i <= arr1.length) strArr[i + j] = arr1[i++][0]
    break
  }

  if (arr1[i][1] > arr2[j][1]) strArr[i + j] = arr2[j++][0]
  else strArr[i + j] = arr1[i++][0]
}

console.log(strArr)