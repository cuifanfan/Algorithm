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

## [牛客：字符串排序](https://www.nowcoder.com/study/live/716/2/15)

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

## [牛客：最短排序](https://www.nowcoder.com/study/live/716/2/16)

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

## [牛客：最大点集](https://www.nowcoder.com/questionTerminal/089dbc5ec7ac468589ce143d43248949)

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

# Day04

## [面试题 02.07. 链表相交](https://leetcode.cn/problems/intersection-of-two-linked-lists-lcci/)

练习快慢指针。

```js
var getIntersectionNode = function(pHead1, pHead2) {
  if (!pHead1 || !pHead2) return null

  let n = 0
  let curr1 = pHead1
  let curr2 = pHead2
  while (curr1.next) {
    n++
    curr1 = curr1.next
  }

  while (curr2.next) {
    n--
    curr2 = curr2.next
  }

  // 重定向两个指针，curr1指向长链表，curr2指向短链表
  curr1 = n > 0 ? pHead1 : pHead2
  curr2 = curr1 === pHead1 ? pHead2 : pHead1
  n = Math.abs(n)

  // 快指针先走n步
  while (n-- !== 0) curr1 = curr1.next

  while (curr1 !== curr2) {
    curr1 = curr1.next
    curr2 = curr2.next
  }

  return curr1
};
```

## [剑指 Offer II 022. 链表中环的入口节点](https://leetcode.cn/problems/c32eOV/)

借助hashmap，时间复杂度O(N)，空间复杂度O(N)

```js
var detectCycle = function(head) {
  // 借助hash表
  let set = new Set()
  while (head && !set.has(head)) {
    set.add(head)
    head = head.next
  }
  return head
};
```

面试的时候，想办法缩小空间，使用快慢指针：

快指针和满指针在环内相遇时，快指针归位head，然后和慢指针以同样的速度向前，必在入口节点相遇。证明过程见leetcode

```js
var detectCycle = function(head) {
  if (!head || !head.next || !head.next.next) return null
  
  // write code here
  let fast = head.next.next
  let slow = head.next
  
  while (fast !== slow) {
    if (!fast || !fast.next) return null
    fast = fast.next.next
    slow = slow.next
  } 
  
  // 有环且环内相遇
  fast = head
  while (fast !== slow) {
    fast = fast.next
    slow = slow.next
  }
  
  return fast
};
```

## [牛客：有环单链表判相交](https://www.nowcoder.com/study/live/716/4/14)

```js
function getLoopNode(head) {
  // 无环
  if (!head || !head.next || !head.next.next) return null

  let fast = head.next.next
  let slow = head.next

  while (fast !== slow) {
    // 无环
    if (!fast || !fast.next) return null

    fast = fast.next.next
    slow = slow.next
  }

  // 环内相遇
  fast = head
  while (fast !== slow) {
    fast = fast.next
    slow = slow.next
  }

  return fast
}

function noLoop(head1, head2) {
  // 快慢指针
  let curr1 = head1
  let curr2 = head2

  // 链表长度差
  let n = 0
  while (curr1.next) {
    curr1 = curr1.next
    n++
  }

  while (curr2.next) {
    curr2 = curr2.next
    n--
  }

  // curr1指向长链表， curr2指向短链表
  curr1 = n > 0 ? head1 : head2
  curr2 = curr1 === head1 ? head2 : head1

  n = Math.abs(n)

  while (n-- !== 0) curr1 = curr1.next

  while (curr1 !== curr2) {
    curr1 = curr1.next
    curr2 = curr2.next
  }

  return curr1
}

function bothLoop(loop1, loop2) {
  let curr = loop1.next
  while (curr !== loop1) {
    if (curr === loop2) return loop2
    curr = curr.next
  }
  return null
}

function getIntersectNode(head1, head2) {
  if (!head1 || !head2) return null
  let loop1 = getLoopNode(head1)
  let loop2 = getLoopNode(head2)

  // 两个都没有环
  if (!loop1 && !loop2) return noLoop(head1, head2)
  // 一个有环，一个没有 => 这种情况没有交点
  // 两个都有环
  if (loop1 && loop2) return bothLoop(loop1, loop2)
  return null
}
```

## [牛客：单链表的插入排序](https://www.nowcoder.com/study/live/716/4/15)

```js
function insertionSortList(head) {
  if (!head || !head.next) return head

  let pHead = new ListNode(-1)
  pHead.next = head
  head = head.next
  pHead.next.next = null

  while (head !== null) {
    let prev = pHead
    let curr = prev.next
    while (curr !== null && curr.val <= head.val) {
      prev = curr
      curr = curr.next
    }

    // curr为null 或者 curr.val > head.val
    prev.next = head
    let next = head.next
    head.next = curr

    head = next

  }
  return pHead.next
}
```

## [牛客：链表中环的入口节点](https://www.nowcoder.com/study/live/716/4/17)

```js
function detectCycle(head) {
 if (!head || !head.next || !head.next.next) return null
  
  // write code here
  let fast = head.next.next
  let slow = head.next
  
  while (fast !== slow) {
    if (!fast || !fast.next) return null
    fast = fast.next.next
    slow = slow.next
  } 
  
  // 有环且环内相遇
  fast = head
  while (fast !== slow) {
    fast = fast.next
    slow = slow.next
  }
  
  return fast
}
```

## [144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/)

迭代解法：

```js
var preorderTraversal = function(root) {
  if (!root) return []
  let ans = []
  let stack = [root]
  while (stack.length !== 0) {
    let node = stack.pop()
    ans.push(node.val)
    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }
  return ans
};
```

递归：

```js
var preorderTraversal = function(root) {
  let ans = []
  preOrderRecur(root, (node)=>{
    ans.push(node.val)
  })
  return ans
};

function preOrderRecur(node, handler) {
  if (node === null) return 
  handler(node)
  preOrderRecur(node.left, handler)
  preOrderRecur(node.right, handler)
}
```

## [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/)

迭代解法：

```js
var inorderTraversal = function(root) {
  if (!root) return [] 
  const ans = []
  const stack = []
  while (root !== null || stack.length !== 0) {
    if (root !== null) {
      // 把当前节点的左子树全部加入栈
      stack.push(root)
      root = root.left
    } else {
      root = stack.pop()
      ans.push(root.val)
      root = root.right
    }
  }
  return ans
};
```

递归解法：

```js
var inorderTraversal = function(root) {
  const ans = []
  inOrderRecur(root, (node) => {
    ans.push(node.val)
  })
  return ans
};

function inOrderRecur(node, handler) {
  if (node === null) return 
  inOrderRecur(node.left, handler)
  handler(node)
  inOrderRecur(node.right, handler)
}
```

## [145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)

递归解法：

```js
var postorderTraversal = function(root) {
  const ans = []
  postOrderRecur(root, (node) => {
    ans.push(node.val)
  })
  return ans
};

function postOrderRecur(node, handler) {
  if (node === null) return 
  postOrderRecur(node.left, handler)
  postOrderRecur(node.right, handler)
  handler(node)
}
```

迭代解法：

```js
var postorderTraversal = function(root) {
  if (!root) return []
  const stack = [root]
  const ans = []
  while (stack.length !== 0) {
    const node = stack.pop()
    ans.push(node.val)
    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  }
  return ans.reverse()
};
```

# Day05

## [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/)

亮点是使用size记录每层元素的个数。时间复杂度O(N)，空间复杂度O(1)

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

class Node {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
} 

class MyQueue {
  constructor() {
    this.head = null
    this.tail = null
    this.count = 0
  }

  get() {
    if (this.head === null) return null
    let tempNode = this.head
    this.head = tempNode.left
    tempNode.left = null
    if (this.head) this.head.right = null
    this.count--
    return tempNode.val
  }

  put(val) {
    let node = new Node(val)
    if (this.head === null) {
      this.head = this.tail = node
    } else {
      this.tail.left = node
      node.right = this.tail
      this.tail = node
    }
    this.count++
  }
    
  size() {
    return this.count
  }

  isEmpty() {
    return this.head === null
  }
}
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (!root) return []
  const ans = []
  const queue = new MyQueue()
  ans.push([root.val])
  queue.put(root)

  while (!queue.isEmpty()) {
    // 当前层元素的个数
    let size = queue.size()

    const children = []

    while (size > 0) {
      const node = queue.get()
      size--
      if (node.left) {
        children.push(node.left.val)
        queue.put(node.left)
      }
      if (node.right) {
        children.push(node.right.val)
        queue.put(node.right)
      }
    }
    
    if (children.length > 0) ans.push(children)
  }
  return ans
};
```

## [牛客：二叉树的最大宽度](https://www.nowcoder.com/study/live/716/5/6)

哈希表解法：时间复杂度O(N)，空间复杂度O(N)

```js
class Node {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

class MyQueue {
  constructor() {
    this.head = null
    this.tail = null
    this.count = 0
  }

  get() {
    if (this.head === null) return null
    let tempNode = this.head
    this.head = tempNode.left
    tempNode.left = null
    if (this.head) this.head.right = null
    this.count--
    return tempNode.val
  }

  add(val) {
    let node = new Node(val)
    if (this.head === null) {
      this.head = this.tail = node
    } else {
      this.tail.left = node
      node.right = this.tail
      this.tail = node
    }
    this.count++
  }

  size() {
    return this.count
  }

  isEmpty() {
    return this.head === null
  }
}

function getMaxWidth( root ) {
  if (root == null) return 0
  const queue = new MyQueue()
  // 当前结点和所在层数的映射
  const map = new Map()
  let currLevel = 0
  let maxWidth = 0
  let currWidth = 0

  queue.add(root)
  map.set(root, ++currLevel)
  maxWidth = 1

  while (!queue.isEmpty()) {
    const node = queue.get()
    const level = map.get(node)
    if (level > currLevel) {
      // 到达下一层
      maxWidth = Math.max(maxWidth, currWidth)
      currWidth = 1
      currLevel = level
    } else {
      // 仍在当前层
      currWidth++
    }
    
    if (node.left) {
      queue.add(node.left)
      map.set(node.left, level+1)
    }
    if (node.right) {
      queue.add(node.right)
      map.set(node.right, level+1)
    }
  }
  maxWidth = Math.max(maxWidth, currWidth)
  return maxWidth
}
module.exports = {
    getMaxWidth : getMaxWidth
};
```

空间复杂度O(1)解法：

```js
function getMaxWidth(root) {
  if (!root) return 0
  const queue = new MyQueue()
  // 当前行最后一个结点
  let currend = root
  // 标识下一行的结点，当前行遍历结束时，所有当前行的元素加入队列，此时指向下一行最后一个结点
  let nextend = null
  // 当前行宽度
  let currWidth = 0
  let maxWidth = 0

  queue.add(root)
  while (!queue.isEmpty()) {
    const node = queue.get()
    currWidth++
    
    if (node.left) {
      queue.add(node.left)
      nextend = node.left
    }
    if (node.right) {
      queue.add(node.right)
      nextend = node.right
    }
     
    if (node === currend) {
      maxWidth = Math.max(maxWidth, currWidth)
      currWidth = 0
      currend = nextend
      nextend = null
    }
    
  }
  return maxWidth
}

module.exports = {
  getMaxWidth: getMaxWidth
};
```

## [TODO: 662. 二叉树最大宽度](https://leetcode.cn/problems/maximum-width-of-binary-tree/)

## [剑指 Offer II 052. 展平二叉搜索树](https://leetcode.cn/problems/NYBBNL/)

水题，中序遍历：时间复杂度O(N)，空间复杂度O(N)

```js
var increasingBST = function(root) {
  // 中序遍历
  if (!root) return null
  const stack = []
  let head = new TreeNode(0)
  let prev = head
  while (root) {
    stack.push(root)
    root = root.left
  }

  while (stack.length !== 0) {
    let node = stack.pop()

    if (node.right) {
      let curr = node.right
      while (curr) {
        stack.push(curr)
        curr = curr.left
      }
    }

    prev.right = node
    node.left = null
    prev = node
  }
  
  return head.right
};
```

# Day06

## [98. 验证二叉搜索树](https://leetcode.cn/problems/validate-binary-search-tree/)

```js
function checkBst(head, data) {
  if (!head) return true

  // 左树不是二叉树
  if (!checkBst(head.left, data)) {
    return false
  }
  
  if (data.val >= head.val) {
    return false
  } else {
    data.val = head.val
  }

  return checkBst(head.right, data)
}

var isValidBST = function(root) {
  return checkBst(root, {
    val:-Infinity
  })
};
```

这题很有记录意义，平时只顾做题也忘记有这种问题存在了，就是按值和按引用传递。如果是按值传递的话，里层递归修改的数据，在外层是访问不到的。前几天还写JavaScript调用栈的文章呢。怎么到了刷题就忘记了😂。

非递归解法，中序遍历：

```js
var isValidBST = function(root) {
  // 中序遍历
  let preValue = -Infinity
  const stack = []
  // 左孩子全部入栈
  let curr = root
  while (curr) {
    stack.push(curr)
    curr = curr.left
  }

  while (stack.length !== 0) {
    const node = stack.pop()

    if (preValue >= node.val) return false
    else preValue = node.val

    if (node.right) {
      // 把当前结点连同所有左孩子入栈
      curr = node.right
      while (curr) {
        stack.push(curr)
        curr = curr.left
      }
    }
  }
  return true
};
```

## [958. 二叉树的完全性检验](https://leetcode.cn/problems/check-completeness-of-a-binary-tree/)

宽度优先遍历每个节点。

- 当前节点右孩子存在而左孩子不存在，不是完全二叉树。
- 当前节点有孩子不存在，则当前节点以后的所有结点都是叶子节点。

```js
class Node {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

class MyQueue {
  constructor() {
    this.head = null
    this.tail = null
    this.count = 0
  }

  get() {
    if (this.head === null) return null
    let tempNode = this.head
    this.head = tempNode.left
    tempNode.left = null
    if (this.head) this.head.right = null
    this.count--
    return tempNode.val
  }

  add(val) {
    let node = new Node(val)
    if (this.head === null) {
      this.head = this.tail = node
    } else {
      this.tail.left = node
      node.right = this.tail
      this.tail = node
    }
    this.count++
  }

  size() {
    return this.count
  }

  isEmpty() {
    return this.head === null
  }
}

function checkCbt(root) {
  if (!root) return true
  // 对整个树进行层序遍历
  const stack = [root]
  const queue = new MyQueue()
  queue.add(root)

  // 剩余结点是否全为叶子结点
  let flag = false
  while (!queue.isEmpty()) {
    const node = queue.get()
    // 如果出现了有右孩子而无左孩子的情况，直接返回false
    // 如果已经确认某节点之后全是叶子结点，但之后的结点却有子节点，直接返回false
    if ((node.right && !node.left) || (flag && (node.left || node.right))) return false

    // 如果某个结点出现了右孩子为空，则标识从该节点的下个结点开始，一定都是叶子节点
    if (!flag && !node.right) flag = true

    // 有两个子结点或者为叶子结点或者只有左节点
    if (node.left) queue.add(node.left)
    if (node.right) queue.add(node.right)
  }
  return true
}

var isCompleteTree = function(root) {
  return checkCbt(root)
};
```

## [110. 平衡二叉树](https://leetcode.cn/problems/balanced-binary-tree/)

```js
function ReturnType(isBT, height) {
  this.isBT = isBT
  this.height = height
}

function checkBalancedTree(root) {
  if (!root) return new ReturnType(true, 0)

  const leftReturn = checkBalancedTree(root.left)
  const rightReturn = checkBalancedTree(root.right)

  const isBT = leftReturn.isBT && rightReturn.isBT && Math.abs(leftReturn.height - rightReturn.height) < 2
  const height = Math.max(leftReturn.height, rightReturn.height) + 1
  return new ReturnType(isBT, height)
} 

var isBalanced = function(root) {
  return checkBalancedTree(root).isBT
};
```

