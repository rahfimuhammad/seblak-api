const prisma = require("../db")

const createOrderList = async (orderListData) => {

    const orderlist = await prisma.orderlist.create({
        data: {
            orderId: orderListData.orderId,
            additional: orderListData.additional,
            spicylevelId: orderListData.spicylevelId
        }
    })

    return orderlist
}

const getOrderList = async () => {
    const orderlist = await prisma.orderlist.findMany({
        include: {
            orderlistitem: {
                include: {
                    product: true,
                }
            },
            spicylevel: true
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    return orderlist
}

const getOrderListByOrderId = async (orderId) => {
    const orderlist = await prisma.orderlist.findMany({
        where: {
            orderId: orderId
        },
        include: {
            orderlistitem: {
                include: {
                    product: true,
                }
            },
            spicylevel: true
        },
        orderBy: {
            createdAt: "asc"
        }
    })

    return orderlist
}

const deleteOrderList = async (orderlistId) => {
    await prisma.orderlist.delete({
        where: {
            id: orderlistId
        }
    })
}

module.exports = {
    createOrderList,
    getOrderList,
    getOrderListByOrderId,
    deleteOrderList
}