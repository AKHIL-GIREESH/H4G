const USER = require("../model/user")

const createUser = async(req,res) => {
    try{
        const {username,phone} = req.body
        const newUser = await USER.create({username:username,phone:phone})
        res.status(200).json({status:"SUCCESS",user:newUser})
    }catch(e){
        console.log(e)
    }
}

module.exports = {createUser}