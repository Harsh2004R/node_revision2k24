// // const {add,sub,mul,div} = require("./modules.js");
// // console.log(add(2,3))

const fs = require("fs")

// // fs.readFile("./index.txt", { encoding: "utf-8" }, (err, data) => {
// //     if (err) {
// //         console.log(err)
// //     }
// //     else {
// //         console.log(data)
// //     }

// // })




// // let data = fs.readFileSync("./index.txt", { encoding: "utf-8" })

// // try {
// //     console.log(data)
// // } catch (error) {
// //     console.log(err)
// // }



// const text = "add this in index.js"
// const status = "true"


// // fs.writeFile("./index.txt", text, (err) => {
// //     if (err) {
// //         console.log(err);

// //     } else {
// //         console.log(`status = ${status}`)
// //     }
// // })




// // try {
// //     fs.writeFileSync("index.txt",text)
// //     console.log(status)
// // } catch (error) {
// //     console.log(error)
// // }




// // const http = require("http");

// // const server = http.createServer((req, res) => {
// //     if (req.url === "/") {
// //         res.end("Home Page")
// //     } else if (req.url === "/users") {
// //         try {
// //             let data = fs.readFileSync("./db.json", { encoding: "utf-8" })
// //             res.end(data)
// //         } catch (error) {
// //             console.log(error)
// //         }

// //     } else {
// //         res.end("path not found")

// //     }
// // })
// // PORT = 8086
// // server.listen(PORT, () => {
// //     console.log("server is live")
// // })


// // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>



// const express = require("express");

// const app = express();
// app.use(express.json())
// app.use((req,res,next)=>{
//     let initial_time = new Date().getTime()

//     console.log(`initial time is :- ${initial_time}`)
//     next()
//     console.log(`initial time is :- ${new Date().getTime()}`)

// })
// app.get("/", (req, res) => {
//     res.send("home")
// })
// app.post("/post", (req, res) => {

//     try {
//         let data = JSON.parse(fs.readFileSync("./db.json", { encoding: "utf-8" }))
//         data.users.push(req.body);
//         fs.writeFileSync("./db.json", JSON.stringify(data))
//         console.log("new user updated in db")
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//     }
//     res.send("new post added!")

// })

// app.listen(4000, () => {
//     console.log("server is live at port 4500")
// })







const mongoose = require("mongoose");
const { type } = require("os");
const main = async () => {
    try {
        let connection = await mongoose.connect("mongodb://127.0.0.1:27017/learn")
        console.log("connected to mongodb")
        // await UserModal.insertMany([{ name: "harsh", age: 51, email: "hfciuyfhidv" }, { name: "rahul", age: 41, email: "dfvdsvsdv" }, { name: "riya", age: 25, email: "hgerdsvdsfv" }]);
        // console.log("new user has been added.")
        const users_data = await UserModal.find();
        console.log(users_data);
    } catch (error) {
        console.log(`error!!!!!!!!!! in connecting to db : ${error}`)
    }

}
main()


// function Modal(name, age) {
//     this.name = name
//     this.age = age
// }

// const newModal = new Modal("harsh", 21)
// console.log(newModal)

const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    age: { type: Number, require: true },
    email: { type: String, require: true }
})

const UserModal = mongoose.model("user", userSchema)