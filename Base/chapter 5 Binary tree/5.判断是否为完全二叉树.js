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