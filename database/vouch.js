const {Schema,model} = require('mongoose');

const vouch = new Schema({
    userid: String,
    positive: {type:Number,default: 0},
    pending: {type:Number,default: 0},
    negative: {type:Number,default: 0},
    imported: {type:Number,default: 0},

})


module.exports = model('vouchs',vouch)
 