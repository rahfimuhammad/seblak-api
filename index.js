const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('hello world')
  })

const orderController = require("./order/order.controller")
const orderListController = require("./orderList/orderList.controller")
const productsController = require("./products/products.controller")
const orderListItemController = require("./orderListItem/orderListItem.controller")
app.use("/order", orderController)
app.use("/orderlist", orderListController)
app.use("/products", productsController)
app.use("/orderlistitem", orderListItemController)


app.listen(2000, () => {
    console.log(`port running at port 2000`)
})

