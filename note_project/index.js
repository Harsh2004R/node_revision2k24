const express = require("express");
const { connection } = require("./db.js");
const { userRouter } = require("./routes/user.route.js");
const { noteRouter } = require("./routes/note.route.js");
const app = express();
app.use(express.json());
app.use("/users", userRouter)
app.use("/notes", noteRouter)

const PORT = 4000;
app.listen(PORT, async () => {
    console.log("server is live")
    try {
        await connection;
        console.log("connested to mongodb")
    } catch (error) {
        console.log(error)
    }
})