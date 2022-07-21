/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 * 
 * @param head ListNode类 
 * @param x int整型 
 * @return ListNode类
 */
function partition(head, x) {
  // write code here
  let head1 = new ListNode(0)
  let current1 = head1
  let head2 = new ListNode(0)
  let current2 = head2

  while (head) {
    if (head.val < x) {
      current1.next = head
      current1 = current1.next
    } else {
      current2.next = head
      current2 = current2.next
    }
    head = head.next
  }
  current1.next = head2.next
  current2.next = null
  return head1.next
}

module.exports = {
  partition: partition
};