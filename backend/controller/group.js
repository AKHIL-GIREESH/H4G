const GROUP = require("../model/group")

const getAllGroups = async( req,res) => {
    try{
        const allGroups = await GROUP.find()
        res.status(200).json({status:"SUCCESS",group:allGroups})
    }catch(e){
        console.log(e)
    }
}

const createGroup = async (req,res) => {
    try{
        const {name,desc,members} = req.body
        const newGroup = await GROUP.create({name:name,desc:desc,members:members})
        res.status(200).json({status:"SUCCESS",group:newGroup})
    }catch(e){
        console.log(e)
    }
}
//676c7948b351c96d36606e36
const inviteGroups = async ( req,res ) => {
    try{
        const {gp1,gp2} = req.body
        const newGroup = await GROUP.findOneAndUpdate({ _id: gp1 },{ $push: { invites: gp2 } },{ new: true })
        res.status(200).json({status:"SUCCESS",group:newGroup})
    }catch(e){
        console.log(e)
    }
}

const acceptInvite = async ( req,res ) => {

}

const addMembers = async ( req,res ) => {
    try{
        const {gp} = req.params
        const {users} = req.body
        const newGroup = await GROUP.findOneAndUpdate({ _id: gp },{ $push: { members: { $each: users } } },{ new: true })
        res.status(200).json({status:"SUCCESS",group:newGroup})
    }catch(e){
        console.log(e)
    }
}

module.exports = {createGroup,inviteGroups,acceptInvite,addMembers,getAllGroups}