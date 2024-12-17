const {Schema,model} = require('mongoose');

const token = new Schema({
    
    userid: String,
    token: String,

})


module.exports = model('token',token)
