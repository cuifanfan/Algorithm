/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
  const ans = []
  let left = newInterval[0]
  let right = newInterval[1]

  // 提高效率办法：用二分确定起始位置；对原数组从起始位置开始替换。

  // 区间是否被插入
  let placed = false

  for (let [li, ri] of intervals) {
    if (li > right) {
      // 在插入列表的右边且没有交集
      if (!placed) {
        placed = true
        ans.push([left, right])
      }
      ans.push([li, ri])
    } else if (ri < left) {
      // 在插入区间左边且没有交集
      ans.push([li, ri])
    } else {
      // 和插入区间有交集
      left = Math.min(li, left)
      right = Math.max(ri, right)
    }
  }

  if (!placed) {
    placed = true
    ans.push([left, right])
  }
  return ans
};