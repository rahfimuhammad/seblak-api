const prisma = require("../db")

const getLevels = async () => {
    const levels = await prisma.spicylevel.findMany()

    return {
        levels
    }
}
module.exports = {
    getLevels
}