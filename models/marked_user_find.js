const mark = require('../database/mark')

const marked = async (user) => {

    try {

        
        let obj = {scam: {value: {type: Boolean,default: false},reason: String},dwc:  {type: Boolean,default: false},reason: String}
        const userfind  = await mark.findOne({userid: user.id})
        
        if (!userfind) {
            return undefined
        }
        
        return userfind
    } catch (e) {
        console.log(e)
    }


}

module.exports = marked