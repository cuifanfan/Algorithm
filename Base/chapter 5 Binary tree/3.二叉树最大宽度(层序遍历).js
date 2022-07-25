/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 求这可树的最大宽度
 * @param head TreeNode类 树的根节点
 * @return int整型
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

function getMaxWidth(root) {
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
      map.set(node.left, level + 1)
    }
    if (node.right) {
      queue.add(node.right)
      map.set(node.right, level + 1)
    }
  }
  maxWidth = Math.max(maxWidth, currWidth)
  return maxWidth
}

// 不使用哈希表的解法：
function getMaxWidth(root) {
  if (!root) return 0
  const queue = new MyQueue()
  // 当前行最后一个结点
  let currend = root
  // 标识下一行的结点，当前行遍历结束时，所有当前行的元素加入队列，此时指向下一行最后一个结点
  let nextend = null
  // 当前行宽度
  let currWidth = 1
  let maxWidth = 0

  queue.add(root)
  while (!queue.isEmpty()) {
    const node = queue.get()
    if (node === currend) {
      maxWidth = Math.max(maxWidth, currWidth)
      currWidth = 0
      currend = nextend
      nextend = null
    }

    if (node.left) {
      queue.add(node.left)
      nextend = node.left
      currWidth++
    }
    if (node.right) {
      queue.add(node.right)
      nextend = node.right
      currWidth++
    }

  }
  return maxWidth
}
module.exports = {
  getMaxWidth: getMaxWidth
};