function List(val) {
  this.val = val
  this.next = null
}

const n = parseInt(readline())
const list1 = readline().split(" ").map(i => parseInt(i))
const m = parseInt(readline())
const list2 = readline().split(" ").map(i => parseInt(i))

let head1 = new List(list1[0])
let current1 = head1
for (let i = 1; i < n; i++) {
  current1.next = new List(list1[i])
  current1 = current1.next
}

let head2 = new List(list2[0])
let current2 = head2
for (let i = 1; i < m; i++) {
  current2.next = new List(list2[i])
  current2 = current2.next
}

const ans = []
while (head1 && head2) {
  if (head1.val < head2.val) {
    head1 = head1.next
  } else if (head1.val > head2.val) {
    head2 = head2.next
  } else {
    ans.push(head1.val)
    head1 = head1.next
    head2 = head2.next
  }
}

console.log(ans.join(" "))