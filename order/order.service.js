const prisma = require("../db")

const getTotalOrder = async (date, status) => {

    let where = {
        status,
    };

    if (date) {
        where.createdAt = {
            gte: new Date(new Date(date).setHours(0, 0, 0)), // Mulai dari tanggal yang diberikan
            lt: new Date(new Date(date).setHours(23, 59, 59, 999)), // Hingga akhir hari tersebut
        };
    }

    const totalOrders = await prisma.order.count({
        where,
    })
    return totalOrders
}

const getTotalPages = async (pageSize, totalOrders) => {
    const totalPages = Math.ceil(totalOrders / pageSize);
    
    return totalPages;
};

const createOrder = async (ordersData) => {

    const frontendDate = new Date(ordersData.createdAt)
    const prismaDate = frontendDate.toISOString();

    const order = await prisma.order.create({
        data: {
            createdAt: prismaDate,
            client: ordersData.client,
            status: "pending"
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

// const getOrder = async (status, date, sortBy, page, pageSize) => {

//     const skip = (page - 1) * pageSize;
//     let where = {
//         status,
//     };

//     if(date === 'all') {
//         where = {
//             ...where
//         }
//     } else if (date === 'today') {
//         where = {
//             ...where,
//             createdAt: {
//                 gte: new Date(new Date().setHours(0, 0, 0, 0)), // Mulai dari hari ini
//                 lt: new Date(new Date().setHours(23, 59, 59, 999)), // Hingga akhir hari ini
//             },
//         };
//     } else if (date === 'lastWeek') {
//         const lastWeek = new Date();
//         lastWeek.setDate(lastWeek.getDate() - 7); // Mengurangi 7 hari dari hari ini
//         where = {
//             ...where,
//             createdAt: {
//                 gte: lastWeek, // Mulai dari 7 hari yang lalu
//                 lt: new Date(), // Hingga saat ini
//             },
//         };
//     } else if (date === 'lastMonth') {
//         const lastMonth = new Date();
//         lastMonth.setMonth(lastMonth.getMonth() - 1); // Mengurangi 1 bulan dari hari ini
//         where = {
//             ...where,
//             createdAt: {
//                 gte: lastMonth, // Mulai dari 1 bulan yang lalu
//                 lt: new Date(), // Hingga saat ini
//             },
//         };
//     } else if (date === 'lastThreeMonths') {
//         const lastThreeMonths = new Date();
//         lastThreeMonths.setMonth(lastThreeMonths.getMonth() - 3); // Mengurangi 3 bulan dari hari ini
//         where = {
//             ...where,
//             createdAt: {
//                 gte: lastThreeMonths, // Mulai dari 3 bulan yang lalu
//                 lt: new Date(), // Hingga saat ini
//             },
//         };
//     }

//     let orderBy = {};

//     if (sortBy === 'datedesc') {
//         orderBy = { createdAt: 'desc' };
//     } else if (sortBy === 'dateasc') {
//         orderBy = { createdAt: 'asc' };
//     } else if (sortBy === 'namedesc') {
//         orderBy = { client: 'desc' };
//     } else if (sortBy === 'nameasc') {
//         orderBy = { client: 'asc' }; 
//     } else if (sortBy === 'pricedesc') {
//         orderBy = { totalPrice: 'desc' };
//     } else if (sortBy === 'priceasc') {
//         orderBy = { totalPrice: 'asc' };
//     }

//     const finishedOrder = await prisma.order.findMany({
//         where,
//         skip,
//         take: pageSize,
//         orderBy,
//         include: {
//             orderlist: true,
//         },
//     });

//     return finishedOrder;
// };

const getOrder = async (status, date, sortBy, page, pageSize) => {

    const skip = (page - 1) * pageSize;
    let where = {
        status,
    };

    if (date) {
        where.createdAt = {
            gte: new Date(new Date(date).setHours(0, 0, 0)), // Mulai dari tanggal yang diberikan
            lt: new Date(new Date(date).setHours(23, 59, 59, 999)), // Hingga akhir hari tersebut
        };
    }

    let orderBy = {};

    if (sortBy === 'datedesc') {
        orderBy = { createdAt: 'desc' };
    } else if (sortBy === 'dateasc') {
        orderBy = { createdAt: 'asc' };
    } else if (sortBy === 'namedesc') {
        orderBy = { client: 'desc' };
    } else if (sortBy === 'nameasc') {
        orderBy = { client: 'asc' }; 
    } else if (sortBy === 'pricedesc') {
        orderBy = { total: 'desc' };
    } else if (sortBy === 'priceasc') {
        orderBy = { total: 'asc' };
    }

    const finishedOrder = await prisma.order.findMany({
        where,
        skip,
        take: pageSize,
        orderBy,
        include: {
            orderlist: true,
        },
    });

    return finishedOrder;
};
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

const finishOrder = async (id, totalData) => {

    const order = await getOrderById(id)

    const orderToFinish = await prisma.order.update({
        where: {
            id: id
        },
        data : {
            client: order.client,
            status: "finished",
            total: totalData.total
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
    deleteOrder,
    getTotalOrder,
    getTotalPages
}