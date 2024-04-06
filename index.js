const express = require("express")
const cors = require("cors")

const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 2000;

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


app.listen(PORT, () => {
    console.log(`port running at port ${PORT}`)
})

