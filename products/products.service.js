const prisma = require("../db")

const createProducts = async (productsData) => {

    const product = await prisma.products.create({
        data: {
            name: productsData.name,
            category: productsData.category,
            price: productsData.price,
        }
    })

    return {
        product
    }
}

const getProducts = async () => {
    const products = await prisma.products.findMany()

    return {
        products
    }
}

const deleteProduct = async (productId) => {
    await prisma.products.delete({
        where: {
            id:productId
        }
    })
}

module.exports = {
    createProducts,
    getProducts,
    deleteProduct
}