/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function preOrderRecur(node, handler) {
  if (node === null) return
  handler(node)
  preOrderRecur(node.left, handler)
  preOrderRecur(node.right, handler)
}

// 迭代解法
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

// 层序遍历
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