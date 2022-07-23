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