const express = require("express")
const router = express.Router()

const { createOrder, getOrder, deleteOrder, finishOrder, getFinishedOrder } = require("./order.service")

router.post("/", async (req, res) => {

    try {
        const responseOrderData = await createOrder(req.body)
        res.status(200).send({message: "success create order", data: responseOrderData})

    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.get("/", async (req, res) => {
    try {
        const order = await getOrder()
        res.status(200).send({message: "success get orders", data: order})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

router.get("/finishedorder/:status", async (req, res) => {
    try {
        const status = req.params.status
        const finishedOrder = await getFinishedOrder(status)
        res.status(200).send({message: "success get orders", data: finishedOrder})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

router.patch("/:orderId", async (req, res) => {
    try {
        const data = req.body
        const id = req.params.orderId
        const transaction = await finishOrder(id, data)
        res.status(200).send({message: "success finish order", data: transaction})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.delete("/:orderId", async (req, res) => {

    try {
        const orderId = req.params.orderId

        await deleteOrder(orderId)
        res.status(200).send({message: "order deleted"})

    } catch (error) {
        res.status(404).send({message: error.message})
        
    }
})

module.exports = router