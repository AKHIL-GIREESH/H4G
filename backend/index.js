const express = require("express")
const cors = require("cors")
require("dotenv").config()
const dbConnect = require("./db/dbConnect")
const authRouter = require("./routes/user")
const groupRouter = require("./routes/group")

const app = express()

app.use(cors())
app.use(express.json());

app.get("/",(req,res) => res.status(200).send("Welcome"))
app.use("/api/v1/user",authRouter)
app.use("/api/v1/group",groupRouter)

app.listen(process.env.PORT,async () => {
    try{
        await dbConnect(process.env.MONGO)
        console.log("Server is up")
    }catch(e){
        console.log(error)
    }
})