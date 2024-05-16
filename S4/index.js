const express = require("express")
const { userRouter } = require("./Routes/user.routes.js")
const { connection } = require("./db.js")
const { contentRouter } = require("./Routes/content.route.js")
require("dotenv").config()
const app = express()
app.use(express.json())
app.use("/user", userRouter)
app.use("/content", contentRouter)


const PORT = process.env.port;
app.listen(PORT, async () => {
    console.log(`server is live at port:- ${PORT}`)
    try {
        await connection
        console.log("conneted to the Auth DB")
    } catch (error) {
        console.log("error in server ", error)
    }

})