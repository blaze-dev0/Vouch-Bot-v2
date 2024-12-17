const {Schema,model} = require('mongoose');

const vouches = new Schema({
    userid: String,
    vouch_id: String,
    comment: String,
    vouch_by: Number,
    vouch_date: { type : Date, default: Date.now },
    status: {type: String,default: 'pending'}

})


module.exports = model('vouches',vouches)
