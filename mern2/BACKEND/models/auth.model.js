const mongoose = require('mongoose');

const authSignUp = new mongoose.Schema({
    fullName: {type: String, default: ""},
    userName: {type: String, unique: true, lowercase: true, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const Authmodel = new mongoose.model("Authors", authSignUp, "author")


module.exports = Authmodel;