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