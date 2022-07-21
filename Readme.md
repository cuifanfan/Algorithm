# Day01

## [剑指 Offer 04. 二维数组中的查找](https://leetcode.cn/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

解题思路，从右上角开始。当前值等于目标值就退出循环，小于目标值就舍弃该行，大于目标值就舍弃该列。实现代码如下：

```js
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
  if (matrix.length < 1) return false
  let m = matrix[0].length - 1 // 列
  let n = 0 // 行
  while (m >= 0 && n < matrix.length) {
    if (matrix[n][m] > target) m-- 
    else if (matrix[n][m] < target) n++
    else return true
  }
  return false
};
```

空间复杂度O(1)，时间复杂度O(m+n)

## [字符串排序](https://www.nowcoder.com/study/live/716/2/15)

堆排序的应用，代码如下：

```js
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
  while (fIndex >= 0 && char_code_at(arr[index]) > char_code_at(arr[fIndex])) {
    if (check_eng(arr[fIndex])) swap(arr, fIndex, index)
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
    const maxIndex = left + 1 <= size && char_code_at(arr[left + 1]) > char_code_at(arr[left]) ? left + 1 : left
    
    if (char_code_at(arr[index]) >= char_code_at(arr[maxIndex])) return
    
    // 孩子比自己大
    if (check_eng(arr[maxIndex])) swap(arr, index, maxIndex)
    index = maxIndex
    left = 2 * index + 1
  }
}

function heap_sort(arr, left, right) {
  left = left || 0
  right = right || arr.length - 1
  // 堆化数组
  for (let i = Math.floor((right - left)/ 2) - 1; i >= left; i--) {
    heapify(arr, i, arr.length - 1)
  }
  
  let size = right
  while (size > 0) {
    swap(arr, 0, size--)
    heapify(arr, 0, size)
  }
}

function merge(arr, left, middle, right) {
  const help = []
  let i = left
  let j = middle + 1
  while (true) {
    if (i === middle + 1) {
      while (j <= right) help.push(arr[j++])
      break
    }
    
    if (j === right + 1) {
      while (i <= middle) help.push(arr[i++])
      break
    }
    
    if (char_code_at(arr[i]) > char_code_at(arr[j])) help.push(arr[j++])
    else help.push(arr[i++])
  }
  
  for (let i = left; i <= right; i++) {
    arr[i] = help[i-left]
  }
}

function merge_sort(arr, left, right) {
  if (!arr || left >= right || arr.length < 2) return 
  
  const middle = Math.floor(left + ((right - left) >> 1))
  merge_sort(arr, left, middle)
  merge_sort(arr, middle + 1, right)
  merge(arr, left, middle, right)
}

const strArr = readline().split("")
const arr1 = []
const arr2 = []
for (let i = 0; i < strArr.length; i++) {
  if (check_eng(strArr[i])) {
    arr2.push(strArr[i])
  } else {
    arr1.push([strArr[i], i])
  }
}

merge_sort(arr2, 0 ,arr2.length - 1)

let i = 0
let j = 0

for (let k = 0; k < strArr.length; k++) {
  if (arr1[i] && k === arr1[i][1]) {
    strArr[k] = arr1[i++][0]
  } else {
    strArr[k] = arr2[j++]
  }
}

console.log(strArr.join(""))
```

## [最短排序](https://www.nowcoder.com/study/live/716/2/16)

最小堆化数组的时候寻找最大的元素索引变化差。从当前index位置堆化到正确位置的索引差部分一定要发生交换，具体代码如下：

```js
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
```

## [荷兰国旗版本快排](https://www.nowcoder.com/study/live/716/2/13)

时间复杂度O(NlogN)，空间复杂度O(logN)，不稳定。

```js
function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]]
}

function partition(arr, left, right) {
  // 荷兰国旗问题
  let index = left
  let less = left - 1 // 小于枢纽的那部分
  let more = right // 大于枢纽的那部分
  while (index < more) {
    if (arr[index] < arr[right]) {
      swap(arr, index++, ++less)
    } else if (arr[index] > arr[right]) {
      // 这里是从右边交换过来的数字，还没参与比较
      swap(arr, index, --more)
    } else {
      index++
    }
  }
  swap(arr, right, more)
  return [less + 1, more]
}

function quick_sort(arr, left, right) {
  // 递归出口
  if(left >= right) return 
  
  // 随机把数组的一位和最后一位交换，作为枢纽
  swap(arr, right, left + Math.floor(Math.random() * (right - left + 1)))
  
  // section是一个区间，该区间上arr所有的数字都等于枢纽,左边小于枢纽，右边大于枢纽
  const section = partition(arr, left, right)
  quick_sort(arr, left, section[0] - 1)
  quick_sort(arr, section[1] + 1, right)
}
```

## [一趟快排](https://leetcode.cn/problems/sort-an-array/)

```js
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
      break
    }
  }
  quick_sort(arr, left, j)
  quick_sort(arr, i + 1, right)
}
```

这种快排一次递归可以确定四个元素的位置，而且partition是双指针 ，要快于荷兰国旗版本。

# Day02

## [57. 插入区间](https://leetcode.cn/problems/insert-interval/)

没有交集，直接push进ans，有交集，则取插入区间和遍历的区间的并集，再继续重复上述过程。

```js
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
  const ans = []
  let left = newInterval[0]
  let right = newInterval[1]

  // 提高效率办法：用二分确定起始位置；对原数组从起始位置开始替换。

  // 区间是否被插入
  let placed = false
  
  for (let [li, ri] of intervals) {
    if (li > right) {
      // 在插入列表的右边且没有交集
      if (!placed) {
        placed = true
        ans.push([left, right])
      }
      ans.push([li, ri])
    } else if (ri < left) {
      // 在插入区间左边且没有交集
      ans.push([li, ri])
    } else {
      // 和插入区间有交集
      left = Math.min(li, left)
      right = Math.max(ri, right)
    }
  }

  if (!placed) {
    placed = true
    ans.push([left, right])
  }
  return ans
};
```

## [最大点集](https://www.nowcoder.com/questionTerminal/089dbc5ec7ac468589ce143d43248949)

根据X从小到大排序。然后遍历数组，当前项的y如果大于所有已经遍历项的最大y。则说明该项不满足存在x,y都比该项大的点。

```js
const length = parseInt(readline())
const nums = []
for (let i = 0; i < length; i++) {
  const [x, y] = readline().split(" ").map(i => parseInt(i))
  nums.push({
    x,
    y
  })
}

// 根据x从大到小排序
nums.sort((x, y) => y.x - x.x)

let max = nums[0].y
const ans = [nums[0]]
for (let i = 1; i < length; i++) {
  if (nums[i].y >= max) {
    ans.push(nums[i])
    max = nums[i].y
  }
}

for (let i = ans.length - 1; i >= 0; i--) {
  console.log(ans[i].x, ans[i].y)
}
```

# Day03

## [138. 复制带随机指针的链表](https://leetcode.cn/problems/copy-list-with-random-pointer/)

遍历链表，根据每个节点的值创建新的Node，添加在当前节点后。然后再次遍历确定random，最后再分开。哈希表也可以做，这种解法实际上就是利用链表记录了位置。

时间复杂度O(N)，额外空间复杂度O(1).

```js
var copyRandomList = function(head) {
  let curr = head
  while(curr) {
    const next = curr.next
    curr.next = new Node(curr.val)
    curr.next.next = next
    curr = next
  }
  
  curr = head
  while (curr) {
    curr.next.random = curr.random ? curr.random.next : null
    curr = curr.next.next
  }

  curr = head ? head.next : null
  let prev = head
  let cHead = curr

  while (prev) {
    prev.next = curr.next
    prev = curr.next
    curr.next = prev ? prev.next : null
    curr = prev ? prev.next : null
  }

  return cHead
};
```

## [剑指 Offer II 027. 回文链表](https://leetcode.cn/problems/aMhZSa/)

有很多解法，用数组或者栈。但以下快慢指针解法可以使得空间复杂度缩小到O(1)

```js
var isPalindrome = function(head) {
  let slow = head
  let fast = head
  let prev = null
  while (fast && fast.next) {
    fast = fast.next.next
    // 移动慢指针，同时反转慢指针前的链表
    const next = slow.next
    slow.next = prev
    prev = slow
    slow = next
  }

  let right = fast ? slow.next : slow
  let left = prev
  while (left && right) {
    if (left.val !== right.val) return false
    left = left.next
    right = right.next
  }
  return true
};
```

