// 构建最小堆然后从[0, arr.length / 2]找元素heapify最大的索引差

function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]]
}

function heapify(arr, index, size) {
  let initIndex = index
  let left = 2 * index + 1
  while (left <= size) {
    let minIndex = left + 1 <= size && arr[left + 1] < arr[left] ? left + 1 : left
    if (arr[index] <= arr[minIndex]) return index - initIndex + 1
    swap(arr, minIndex, index)
    index = minIndex
    left = 2 * index + 1
  }
  return index - initIndex + 1
}

function shortest_sort_count(arr) {
  let max = 0
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    max = Math.max(max, heapify(arr, i, arr.length - 1))
  }
  return max
}

const arr = [1, 5, 3, 4, 2, 6, 7]
console.log(shortest_sort_count(arr));