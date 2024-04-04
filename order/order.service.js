const prisma = require("../db")

const getTotalOrder = async () => {
    const totalOrders = await prisma.order.count()
    return totalOrders
}

const getTotalPages = async (pageSize) => {
    const totalOrders = await prisma.order.count();
    const totalPages = Math.ceil(totalOrders / pageSize);
    return totalPages;
};

const createOrder = async (ordersData) => {

    const order = await prisma.order.create({
        data: {
            client: ordersData.client,
            status: "pending"
        }
    })

    return order
}

const getOrder = async (page, pageSize) => {

    const skip = (page - 1) * pageSize;
    const order = await prisma.order.findMany({
        skip,
        take: pageSize,
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

const getOrderById = async (id) => {

    const order = await prisma.order.findUnique({
        where: {
            id
        }
    })
    return order
}

const getFinishedOrder = async (status, page, pageSize) => {

    const skip = (page - 1) * pageSize;
    const finishedOrder = await prisma.order.findMany({
        where: {
            status
        },
        skip,
        take: pageSize,
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

const processOrder = async (id) => {

    const order = await getOrderById(id)

    const orderToFinish = await prisma.order.update({
        where: {
            id: id
        },
        data : {
            client: order.client,
            status: "processed"
        }
    })

    return orderToFinish
}

const finishOrder = async (id) => {

    const order = await getOrderById(id)

    const orderToFinish = await prisma.order.update({
        where: {
            id: id
        },
        data : {
            client: order.client,
            status: "finished"
        }
    })

    return orderToFinish
}

const deleteOrder = async (id) => {
    await prisma.order.delete({
        where: {
            id
        }
    })
}

module.exports = {
    createOrder,
    getOrder,
    processOrder,
    finishOrder,
    getFinishedOrder,
    deleteOrder,
    getTotalOrder,
    getTotalPages
}