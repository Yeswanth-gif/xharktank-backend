const mongoose = require("mongoose");

const pitchSchema = new mongoose.Schema({
    id : {type : String, required : true},
    entrepreneur : {type : String, required : true},
    pitchTitle : {type : String, required : true},
    pitchIdea : {type : String, required : true},
    askAmount : {type : Number, required : true},
    equity : {type : Number, required : true},
    offers : { type : Array , "default" : [] }
}, {versionKey : false})

module.exports = mongoose.model("Pitch", pitchSchema);