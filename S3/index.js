const express = require("express");
const { connction } = require("./db.js")
const { userRouter } = require("./Routes/user.routes.js")
const app = express();

app.use(express.json())
app.use("/users", userRouter)

const PORT = process.env.port;
app.listen(PORT, async () => {
    console.log(`server is live at port :${PORT}`)
    try {
        await connction;
        console.log("connected to DB")
    } catch (error) {
        console.log(`somthing went wrong to connect DB ${error}`)
    }

})