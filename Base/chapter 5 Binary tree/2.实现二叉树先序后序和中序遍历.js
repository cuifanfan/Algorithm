/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
 * 
 * @param root TreeNode类 the root of binary tree
 * @return int整型二维数组
 */
function threeOrders(root) {
  if (!root) return [
    [],
    [],
    []
  ]

  const pre = []
  const ino = []
  const post = []

  let head = root
  const stack = [head]

  // 前序遍历
  while (stack.length !== 0) {
    const node = stack.pop()
    pre.push(node.val)
    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }

  // 中序遍历
  stack.push()
  while (head !== null || stack.length !== 0) {
    if (head !== null) {
      // 把当前结点的所有左子树结点全部加入
      stack.push(head)
      head = head.left
    } else {
      head = stack.pop()
      ino.push(head.val)
      head = head.right
    }
  }

  // 后序遍历
  head = root
  stack.push(head)
  while (stack.length !== 0) {
    const node = stack.pop()
    post.push(node.val)
    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  }

  return [pre, ino, post.reverse()]
}

module.exports = {
  threeOrders: threeOrders
};