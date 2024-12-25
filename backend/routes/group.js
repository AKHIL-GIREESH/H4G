const router = require("express").Router()
const {createGroup,addMembers,inviteGroups} = require("../controller/group")

router.route("/").post(createGroup).patch(inviteGroups)
router.route("/:gp").patch(addMembers)

module.exports = router