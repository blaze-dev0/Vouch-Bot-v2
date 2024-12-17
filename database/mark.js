const {Schema,model} = require('mongoose');

const mark = new Schema({
    userid: String,
    scammer: {type: Boolean,default: false},
    dwc: {type: Boolean,default: false},
    marked_by: String,
    reason_scammer: String,
    reason_dwc: String,
    marked_date: { type : Date, default: Date.now }

})


module.exports = model('mark',mark)
