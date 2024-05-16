const mongoose = require("mongoose");


const noteSchema = mongoose.Schema({
    name: String,
    title: String,
    dis: String,
    userID:String,
    
})

const NoteModel = mongoose.model('note', noteSchema)

module.exports = {
    NoteModel
}
