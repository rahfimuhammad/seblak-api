const express = require("express")
const router = express.Router()

const { createOrderList, getOrderList, getOrderListByOrderId, deleteOrderList } = require("./orderList.service")

router.post("/", async (req, res) => {

    try {
        const responseOrderListData = await createOrderList(req.body)
        res.status(200).send({message: "success create orderlist", data: responseOrderListData})

    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.get("/", async (req, res) => {

    try {
        const orderlist = await getOrderList()
        res.status(200).send({data: orderlist})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.get("/:orderId", async (req, res) => {

    try {
        const orderId = req.params.orderId
        const orderlist = await getOrderListByOrderId(orderId)
        res.status(200).send({data: orderlist})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.delete("/:orderlistId", async (req, res) => {

    try {
        const orderlistId = req.params.orderlistId

        await deleteOrderList(orderlistId)
        res.status(200).send({message: "orderlist deleted"})

    } catch (error) {
        res.status(404).send({message: error.message})
        
    }
})

module.exports = router