const fruits = []
const [length, count] = readline().split(" ").map(i => parseInt(i))
for (let i = 0; i < length; i++) {
  const [id, name, price] = readline().split(" ")
  fruits.push({
    id: parseInt(id),
    name: name,
    price: parseInt(price)
  })
}

fruits.sort((x, y) => {
  if (x.price === y.price) return x.name - y.name
  else return x.price - y.price
})

let totalPrice = 0


for (let i = 0; i < count; i++) {
  totalPrice += fruits[i].price
}
console.log(totalPrice)