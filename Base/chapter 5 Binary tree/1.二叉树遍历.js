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