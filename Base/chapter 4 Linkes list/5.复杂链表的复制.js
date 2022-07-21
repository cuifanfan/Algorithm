function RandomListNode(x) {
  this.label = x;
  this.next = null;
  this.random = null;
}

function Clone(head) {
  // write code here
  let curr = head
  while (curr) {
    const next = curr.next
    curr.next = new RandomListNode(curr.label)
    curr.next.next = next
    curr = next
  }

  curr = head
  while (curr) {
    curr.next.random = curr.random ? curr.random.next : null
    curr = curr.next.next
  }

  curr = head ? head.next : null
  let prev = head
  let cHead = curr

  while (prev) {
    prev.next = curr.next
    prev = curr.next
    curr.next = prev ? prev.next : null
    curr = prev ? prev.next : null
  }

  return cHead
}
module.exports = {
  Clone: Clone
};