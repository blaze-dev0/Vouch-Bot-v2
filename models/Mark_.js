const mark_db = require('../database/mark')




class mark {

    constructor(user, message) {
        this.user = user
        this.message = message

    }

    async scam(reason) {
        try {
        const user = this.user
        const message = this.message


        const FindUserInDb = await mark_db.findOne({ userid: user.id })
        if (FindUserInDb) {

            switch (true) {


                case FindUserInDb.dwc && FindUserInDb.scammer:

                    await mark_db.findOneAndUpdate({ userid: user.id }, { scammer: false, reason_scammer: '' })

                    return false

                case !FindUserInDb.dwc && FindUserInDb.scammer:
                    await mark_db.findOneAndDelete({ userid: user.id })

                    return false

                case FindUserInDb && !FindUserInDb.scammer:
                    await mark_db.findOneAndUpdate({ userid: user.id }, { scammer: true, reason_scammer: reason })
                    return true

            }



        }




        new mark_db({
            userid: user.id,
            dwc: true,
            reason_dwc: reason,
            marked_by: message.author.id
        }).save()

        return true

    } catch (e) {
        console.log(e)
    }

    }

    async dwc(reason) {
        try {
        const user = this.user
        const message = this.message


        const FindUserInDb = await mark_db.findOne({ userid: user.id })
        if (FindUserInDb) {

            switch (true) {


                case FindUserInDb.dwc && FindUserInDb.scammer:

                    await mark_db.findOneAndUpdate({ userid: user.id }, { dwc: false, reason_dwc: '' })

                    return false


                case FindUserInDb.dwc && !FindUserInDb.scammer:
                    await mark_db.findOneAndDelete({ userid: user.id })

                    return false
                case FindUserInDb && !FindUserInDb.dwc:
                    await mark_db.findOneAndUpdate({ userid: user.id }, { dwc: true, reason_dwc: reason })
                    return true
            }



        }




        new mark_db({
            userid: user.id,
            dwc: true,
            reason_dwc: reason,
            marked_by: message.author.id
        }).save()

        return true

    } catch (e) {
        console.log(e)
    }






    }

}

module.exports = mark