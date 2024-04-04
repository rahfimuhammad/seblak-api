const express = require("express")
const router = express.Router()

const { createOrder, getOrder, deleteOrder, processOrder, finishOrder, getFinishedOrder, getTotalOrder, getTotalPages } = require("./order.service")

router.post("/", async (req, res) => {

    try {
        const responseOrderData = await createOrder(req.body)
        res.status(200).send({message: "success create order", data: responseOrderData})

    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.size) || 10;

    try {
        const totalOrder = await getTotalOrder();
        const totalPages = await getTotalPages(pageSize);
        const order = await getOrder(page, pageSize)
        res.status(200).send({message: "success get orders", data: {order, totalOrder, totalPages}})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

router.get("/finishedorder/:status", async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.size) || 10;

    try {
        const totalOrder = await getTotalOrder();
        const totalPages = await getTotalPages(pageSize);
        const status = req.params.status
        const finishedOrder = await getFinishedOrder(status, page, pageSize)
        res.status(200).send({message: "success get orders", data: finishedOrder, totalOrder, totalPages})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

router.patch("/finish/:orderId", async (req, res) => {
    try {
        const id = req.params.orderId
        const transaction = await finishOrder(id)
        res.status(200).send({message: "success finish order", data: transaction})
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.patch("/process/:orderId", async (req, res) => {
    try {
        const id = req.params.orderId
        const transaction = await processOrder(id)
        res.status(200).send({message: "success process order", data: transaction})
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