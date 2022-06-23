function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]]
}

function shell_sort(arr) {
  let gap = Math.floor(arr.length / 2)

  while (gap > 0) {
    for (let i = gap; i < arr.length; i += gap) {
      let temp = arr[i]
      let j = i - gap
      while (arr[j] && arr[j] > temp) {
        arr[j + gap] = arr[j]
        j -= gap
      }
      arr[j + gap] = temp
    }

    gap = Math.floor(gap / 2)
  }
}

let arr = [1, 5, 9, 3, 5, 7, 4, 3, 8, 8, 5, 7]
shell_sort(arr)
console.log(arr);