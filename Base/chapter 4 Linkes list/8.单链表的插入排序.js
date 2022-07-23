function ListNode(x) {
  this.val = x;
  this.next = null;
}
/**
 * 
 * @param head ListNode类 
 * @return ListNode类
 */
function insertionSortList(head) {
  if (!head || !head.next) return head

  let pHead = new ListNode(-1)
  pHead.next = head
  head = head.next
  pHead.next.next = null

  while (head !== null) {
    let prev = pHead
    let curr = prev.next
    while (curr !== null && curr.val <= head.val) {
      prev = curr
      curr = curr.next
    }

    // curr为null 或者 curr.val > head.val
    prev.next = head
    let next = head.next
    head.next = curr

    head = next

  }
  return pHead.next
}

// module.exports = {
//   insertionSortList: insertionSortList
// };

let head = new ListNode(34)
head.next = new ListNode(20)
head.next.next = new ListNode(15)
head.next.next.next = new ListNode(38)
head.next.next.next.next = new ListNode(18)
console.log(insertionSortList(head));