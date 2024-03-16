const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/Authentication')

const UserSchema= mongoose.Schema({
username: String,
password :String,
secret:String,
})
UserSchema.plugin(plm)
module.exports= mongoose.model("Users",UserSchema)