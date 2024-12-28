const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
require("dotenv").config()
const dbConnect = require("./db/dbConnect")
const authRouter = require("./routes/user")
const groupRouter = require("./routes/group")
const channelRouter = require("./routes/channel")
const {app, server} = require('./socket/socket');
app.use(cors())
app.use(express.json());
app.use(morgan("dev"))

app.get("/",(req,res) => res.status(200).send("Welcome"))
app.use("/api/v1/user",authRouter)
app.use("/api/v1/group",groupRouter)
app.use("/api/v1/channel",channelRouter)

server.listen(process.env.PORT,async () => {
    try{
        await dbConnect(process.env.MONGO)
        console.log("Server is up")
    }catch(e){
        console.log(e)
    }
})