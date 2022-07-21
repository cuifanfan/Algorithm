// 要求时间复杂度O(N);空间复杂度O(1)
// 本题使用双指针解法
/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 * 
 * @param head ListNode类 the head
 * @return bool布尔型
 */
function isPail(head) {
  // 快慢指针
  let slow = head
  let fast = head
  let prev = null
  while (fast && fast.next) {
    fast = fast.next.next
    // 移动慢指针，同时反转慢指针前的链表
    const next = slow.next
    slow.next = prev
    prev = slow
    slow = next
  }

  let right = fast ? slow.next : slow
  let left = prev
  while (left && right) {
    if (left.val !== right.val) return false
    left = left.next
    right = right.next
  }
  return true

}
module.exports = {
  isPail: isPail
};