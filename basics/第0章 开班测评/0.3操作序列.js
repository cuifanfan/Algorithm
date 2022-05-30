let readline = require('readline')

let r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let N = -1
let nums = []

class Node {
  constructor(value) {
    this.last = null
    this.next = null
    this.value = value
  }

}

r1.on('line', (line) => {
  if (N < 0) N = parseInt(line.trim())
  else {
    // 使用双向链表
    nums = line.trim().split(" ").map(num => parseInt(num))

    let newNode = new Node(nums[0])
    let head = newNode
    let tail = newNode
    for (let i = 1; i < nums.length; i++) {
      if (tail.next === null) {
        tail.next = new Node(nums[i])
        tail.next.last = tail
        tail = tail.next
      } else {
        tail.last = new Node(nums[i])
        tail.last.next = tail
        tail = tail.last
      }
      let temp = tail
      tail = head
      head = temp
    }
    let current = head
    let result = ''
    if (current.last) {
      while (current) {
        result += current.value + ' '
        current = current.last
      }
    } else {
      while (current) {
        result += current.value + ' '
        current = current.next
      }
    }
    console.log(result);
  }
})