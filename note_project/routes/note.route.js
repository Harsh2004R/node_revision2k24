const express = require("express");
const { auth } = require("../middlewares/auth.middleware.js")
const { NoteModel } = require("../models/note.model.js")
const noteRouter = express.Router()
noteRouter.use(express.json());

noteRouter.use(auth)
noteRouter.post("/add", async (req, res) => {

    try {
        const note = new NoteModel(req.body);
        await note.save();
        res.status(200).json({ msg: "new note has been added", note: req.bosy })
    } catch (error) {
        res.status(400).json({ error_msg: error.message })
    }


})
noteRouter.get("/get", async (req, res) => {

    try {
        const notes = await NoteModel.find({ userID: req.body.userID })
        res.send(notes)
    } catch (error) {
        res.status(400).json({ error_msg: error.message })
    }
})
noteRouter.patch("/update/:noteID", async (req, res) => {
    const userIDinUserDoc = req.body.userID
    const { noteID } = req.params
    try {
        const note = await NoteModel.findOne({ _id: noteID })
        const userIDinNoteDoc = note.userID
        if (userIDinUserDoc == userIDinNoteDoc) {
            await NoteModel.findByIdAndUpdate({ _id: noteID }, req.body)
            res.json({ msg: "note is up to date" })

        } else {
            res.status(400).json({ msg: "user is not authorized to do this task" })
        }
    } catch (error) {
        res.status(400).json({ error_msg: error.message })
    }

})
noteRouter.delete("/delete/:noteID", async (req, res) => {
    const userIDinUserDoc = req.body.userID
    const { noteID } = req.params
    try {
        const note = await NoteModel.findOne({ _id: noteID })
        const userIDinNoteDoc = note.userID
        if (userIDinUserDoc == userIDinNoteDoc) {
            await NoteModel.findByIdAndDelete({ _id: noteID })
            res.json({ msg: "your not is deleted" })

        } else {
            res.status(400).json({ msg: "user is not authorized to do this task" })
        }
    } catch (error) {
        res.status(400).json({ error_msg: error.message })
    }
})

module.exports = {
    noteRouter
}




























