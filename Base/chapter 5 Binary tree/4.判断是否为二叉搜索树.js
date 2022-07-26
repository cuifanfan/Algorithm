// 中序遍历

// 上一部分树的最大值


function checkBst(head, preValue) {
  if (!head) return true

  // 左树不是二叉树
  if (!checkBst(head.left, preValue)) {
    return false
  }

  if (preValue >= head.value) {
    return false
  } else {
    preValue = head.value
  }

  return checkBst(head.right, preValue)
}

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