/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(head) {
  let prev = null
  let curr = head
  while (curr) {
    const next = curr.next
    curr.next = prev
    prev = curr
    curr = next
  }
  return prev
}
module.exports = {
  ReverseList: ReverseList
};