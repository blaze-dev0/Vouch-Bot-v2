const {Schema,model} = require('mongoose')


const sets = new Schema({
    userid: String,
    thumbnail: {type: String,default: false},
    Image: {type: String,default: false},
    product: {type: String,default: false},
    shop: {type: String,default: false},
    forum: {type: String,default: false}
})

module.exports = model("sets",sets)