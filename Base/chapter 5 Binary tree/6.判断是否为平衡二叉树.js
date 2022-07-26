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