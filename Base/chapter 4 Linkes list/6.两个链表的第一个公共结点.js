/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/

// 两个无环链表相交：证明从第一个相交结点开始，后面的节点都可以访问得到，因此结束的节点必然是同一个。
// 使用快慢指针，让快指针先从链表头走n(链表长度差)步，然后再和慢指针一起走。
function FindFirstCommonNode(pHead1, pHead2) {
  // write code here
  let n = 0
  let curr1 = pHead1
  let curr2 = pHead2
  while (curr1.next) {
    n++
    curr1 = curr1.next
  }

  while (curr2.next) {
    n--
    curr2 = curr2.next
  }

  // 重定向两个指针，curr1指向长链表，curr2指向短链表
  curr1 = n > 0 ? pHead1 : pHead2
  curr2 = curr1 === pHead1 ? pHead2 : pHead1
  n = Math.abs(n)

  // 快指针先走n步
  while (n-- !== 0) curr1 = curr1.next

  while (curr1 !== curr2) {
    curr1 = curr1.next
    curr2 = curr2.next
  }

  return curr1
}
module.exports = {
  FindFirstCommonNode: FindFirstCommonNode
};