const router = require("express").Router()
const {createGroup,addMembers,inviteGroups,getAllGroups} = require("../controller/group")

router.route("/").post(createGroup).patch(inviteGroups).get(getAllGroups)
router.route("/:gp").patch(addMembers)

module.exports = router