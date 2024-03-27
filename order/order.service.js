const prisma = require("../db")

const createOrder = async (ordersData) => {

    const order = await prisma.order.create({
        data: {
            client: ordersData.client,
            status: "pending"
        }
    })

    return order
}

const getOrder = async () => {

    const order = await prisma.order.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            orderlist: {
                orderBy: {
                    createdAt: 'asc'
                },
                include: {
                    orderlistitem: {
                        include: {
                            product: true
                        }
                    },
                    spicylevel: true
                }
            }
        }
    })

    return order
}

const getFinishedOrder = async (status) => {
    const finishedOrder = await prisma.order.findMany({
        where: {
            status
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            orderlist: {
                include: {
                    orderlistitem: {
                        include: {
                            product: true
                        }
                    },
                    spicylevel: true
                }
            }
        }
    })

    return finishedOrder
}

const processOrder = async (id, data) => {

    const orderToFinish = await prisma.order.update({
        where: {
            id: id
        },
        data : {
            client: data.client,
            status: "processed"
        }
    })

    return orderToFinish
}

const finishOrder = async (id, data) => {

    const orderToFinish = await prisma.order.update({
        where: {
            id: id
        },
        data : {
            client: data.client,
            status: "finished"
        }
    })

    return orderToFinish
}

const deleteOrder = async (orderId) => {
    await prisma.order.delete({
        where: {
            id: orderId
        }
    })
}

module.exports = {
    createOrder,
    getOrder,
    processOrder,
    finishOrder,
    getFinishedOrder,
    deleteOrder
}