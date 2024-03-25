const express = require("express")
const router = express.Router()

const { createProducts, getProducts, deleteProduct } = require("./products.service")

router.post("/", async (req, res) => {

    try {
        const product = req.body
        const responseCreateProduct = await createProducts(product)
        res.status(200).send({message: "success create product", data: responseCreateProduct})
        
    } catch (error) {
        res.status(400).send({message: error.message})
    }
})

router.get("/", async (req, res) => {

    try {
        const products = await getProducts()

        res.status(200).send(products)

    } catch (error) {
        res.status(404).send({message : error.message})
    }
})

router.delete("/:productId", async (req,res) => {

    try {
        const productId = req.params.productId

        await deleteProduct(productId)

        res.status(200).send({message: "product delete"})

    } catch (error) {
        res.status(404).send({message : error.message})

    }
})

module.exports = router