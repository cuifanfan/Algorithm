// 中序遍历

// 上一部分树的最大值
let preValue = -Infinity

function checkBst(head) {
  if (!head) return true

  // 左树不是二叉树
  if (!checkBst(head.left)) {
    return false
  }

  if (preValue >= head.value) {
    return false
  } else {
    preValue = head.value
  }

  return checkBst(head.right)
}