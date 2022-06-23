// 已知一个几乎有序的数组， 几乎有序是指， 如果把数组排好顺序的话， 每个元素移动的距离可以不超过k， 并且k相对于数组来说比较小。 请选择一个合适的排序算法针对这个数据进行排序。
function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]]
}


// 当前值处于index，向上移动（加入堆）
function heapInsert(arr, index) {
  let pIndex = Math.floor((index - 1) / 2)
  while (pIndex >= 0 && arr[index] < arr[pIndex]) {
    swap(arr, pIndex, index)
    index = pIndex
    pIndex = Math.floor((index - 1) / 2)
  }
}


// 当前值出处于index， 向下移动(保持堆结构)
function heapify(arr, index, size) {
  // size为堆范围索引值
  let left = index * 2 + 1
  while (left <= size) {
    // 有孩子
    let minestIndex = left + 1 <= size && arr[left + 1] < arr[left] ? left + 1 : left

    if (arr[minestIndex] >= arr[index]) return

    swap(arr, minestIndex, index)
    index = minestIndex
    left = index * 2 + 1
  }
}

function add(arr, value) {
  arr[arr.length] = value
  heapInsert(arr, arr.length - 1)
}

function poll(arr) {
  let temp = arr[0]
  swap(arr, 0, arr.length - 1)
  arr.length--
  heapify(arr, 0, arr.length - 1)
  return temp
}

function sortedArrDistanceLessK(arr, k) {
  // 创建长度为k的堆heap
  let heap = []
  for (let i = 0; i <= k; i++) add(heap, arr[i])

  let i = 0
  for (; i < arr.length - k - 1; i++) {
    arr[i] = poll(heap)
    add(heap, arr[i + k + 1])

  }
  while (i < arr.length) arr[i++] = poll(heap)
}

let arr = [6, 8, 3, 10, 11, 1, 7, 2, 13, 4, 5, 12, 9]
sortedArrDistanceLessK(arr, 7)
console.log(arr);