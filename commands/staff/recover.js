const vouch = require("../../database/vouch")
const vouches = require("../../database/vouches")
const userfind = require("../../models/userfind")
const { token, admin_roleId } = require("../../settings/config")

module.exports = {
    name: 'transfer',
    description: 'w',

    async execute(client,message,args) {


        if (!message.member.roles.cache.has(admin_roleId)) {
            return console.log('You Need Admin Role To Use This')
        }


        // ig this command have some bug i didn't test this

        const OneUser = await userfind(args[0],message,client)

        const TwoUser = await userfind(args[1],message,client)

                    
                    if (!OneUser ) {
                        
                        
                        return  message.channel.send(`Old User Not Found`)
                    }
                    
                    if (!TwoUser) {
                        
                      return  message.channel.send(`New User Not Found`)
        }

        const Oneuserdb = await vouch.findOne({userid: OneUser.id})
        const Twouserdb = await vouch.findOne({userid: TwoUser.id})

        if (!Oneuserdb) {

            return message.channel.send("Old Not Found In Database")
        }

        if (Twouserdb)  {

            const positive =  Twouserdb.positive
            const negative = Twouserdb.negative
            const pending = Twouserdb.pending
            const imported = Twouserdb.imported
            
            await vouch.findOneAndUpdate({userid: OneUser.id},{userid: TwoUser.id})
            await vouch.findOneAndUpdate({userid: TwoUser.id},{$inc: {positive: positive,negative: negative,pending: pending,imported: imported}})

            await vouches.findOneAndUpdate({userid: OneUser.id},{userid: TwoUser.id})

            message.channel.send(`Account transferred : ${OneUser.username}  ----> ${TwoUser.username}`)
            return
        } else {
            
            await vouch.findOneAndUpdate({userid: OneUser.id},{userid: TwoUser.id})
 

            await vouches.findOneAndUpdate({userid: OneUser.id},{userid: TwoUser.id})

            message.channel.send(`Account transferred : ${OneUser.username}  ----> ${TwoUser.username}`)
            return

        }

        

    }
}