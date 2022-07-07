while (length = parseInt(readline())) {
  const method = parseInt(readline())
  const arr = new Array(length)

  for (let i = 0; i < length; i++) {
    // 数组的最后一项
    let j = i - 1
    // 要插入的键值对
    let temp = readline().split(" ")
    temp[1] = parseInt(temp[1])
    while (arr[j] && (method === 1 ? arr[j][1] > temp[1] : arr[j][1] < temp[1])) arr[j + 1] = arr[j--]
    arr[j + 1] = temp
  }

  for (let i = 0; i < length; i++) {
    console.log(arr[i].join(" "))
  }
}