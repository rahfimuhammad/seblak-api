const express = require("express")
const router = express.Router()

const { createOrderListItem, deleteOrderListItem } = require("./orderListItem.service")

router.post("/", async (req, res) => {

    try {
        const responseOrderListItem = await createOrderListItem(req.body)
        res.status(200).send({message: "success create orderList", data: responseOrderListItem})

    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.delete("/:orderListItemId", async (req, res) => {

    try {
        const orderListItemId = req.params.orderListItemId

        await deleteOrderListItem(orderListItemId)
        res.status(200).send({message: "item deleted"})

    } catch (error) {
        res.status(404).send({message: error.message})
        
    }
})

module.exports = router