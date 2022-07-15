const length = parseInt(readline())
const nums = []
const ans = []

for (let i = 0; i < length; i++) {
  const [x, y] = readline().split(" ").map(i => parseInt(i))
  nums.push({
    x,
    y
  })
}

// 根据x从大到小排序
nums.sort((x, y) => y.x - x.x)

let max = nums[0].y
const ans = [nums[0]]
for (let i = 1; i < length; i++) {
  if (nums[i].y >= max) {
    ans.push(nums[i])
    max = nums[i].y
  }
}

console.log(ans);