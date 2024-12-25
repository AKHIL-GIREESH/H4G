const router = require("express").Router()
const {createChannel} = require("../controller/channel")

router.route("/:gp").post(createChannel)

module.exports = router