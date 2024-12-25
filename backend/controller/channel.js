const CHANNEL = require("../model/channel")
const GROUP = require("../model/group")

const createChannel = async (req,res) => {
    try{
        const {name,members} = req.body
        const {gp} = req.params
        const newChannel = await CHANNEL.create({name:name,members:members,groupId:gp})
        await GROUP.findOneAndUpdate({ _id: gp },{ $push: { channel: newChannel._id } },{ new: true })
        res.status(200).json({status:"SUCCESS",channel:newChannel})
    }catch(e){
        console.log(e)
    }
}

module.exports = {createChannel}