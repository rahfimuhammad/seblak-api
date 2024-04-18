const express = require("express")
const router = express.Router()

const { getLevels } = require("./spicylevel.service")

router.get("/", async (req, res) => {

    try {
        const levels = await getLevels()

        res.status(200).send(levels)

    } catch (error) {
        res.status(404).send({message : error.message})
    }
})

module.exports = router