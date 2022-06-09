// 堆：是个完全二叉树，分为大根堆和小根堆
function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]]
}

// 某个数处于index位置，往上继续移动(插入堆中)
function heapInsert(arr, index) {
  // 父节点的索引
  let pIndex = Math.floor((index - 1) / 2)
  while (pIndex >= 0 && arr[index] > arr[pIndex]) {
    swap(arr, index, pIndex)
    index = pIndex
    pIndex = Math.floor((index - 1) / 2)
  }
}

// 某个数在index位置，向下移动(维持堆结构)
function heapify(arr, index, size) {
  let left = 2 * index + 1
  while (left <= size) {
    // 有左孩子
    let largestIndex = left + 1 <= size && arr[left + 1] > arr[left] ? left + 1 : left

    // 不用再下移
    if (arr[index] >= arr[largestIndex]) return

    swap(arr, index, largestIndex)
    index = largestIndex
    left = 2 * index + 1
  }
}


function heap_sort(arr) {
  if (!arr || arr.length < 2) return

  // 把数组堆化
  // for (let i = 0; i < arr.length; i++) {
  //   heapInsert(arr, i)
  // }

  for (let i = Math.floor(arr.length); i >= 0; i--) {
    heapify(arr, i, arr.length - 1)
  }


  // size代表堆的范围 => [0-size]范围是最大堆
  let size = arr.length - 1
  while (size > 0) {
    // 交换堆中最大值与数组末尾值
    swap(arr, 0, size--)
    // 向下移动 保持堆的结构性
    heapify(arr, 0, size)
  }
}

let arr = [-2, 3, -5]

heap_sort(arr)
console.log(arr);


// 如果只是一个数组需要堆化，没必要一个个进行heapInsert() [时间复杂度nlog(n)]