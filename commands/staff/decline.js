const vouches = require("../../database/vouches")
const vouch = require("../../database/vouch")
const {Vouch_staff_Role_id, DeniedVouch_channel_id} = require("../../settings/config")

module.exports = {

    name: 'denied',
    description: 'w',
    async execute(client,message,args) {

        try {

        if (!message.member.roles.cache.has(Vouch_staff_Role_id)) {

            console.log('You Need Staff Role To Use This')


            return
        }


        const FindVouchInDb = await vouches.findOne({vouch_id: args[0]})

        if (!FindVouchInDb) {
            return message.channel.send("No Vouch Found")
        }

        switch(true) {
            case FindVouchInDb.status == 'approved': 
            
            await vouches.findOneAndUpdate({vouch_id: args[0]},{status: 'denied'})
            await vouch.findOneAndUpdate({userid: FindVouchInDb.userid},{$inc: {positive: -1}})
            break;
            
            case FindVouchInDb.status == 'denied': 
            
            return message.channel.send("Vouch Already Denied")
          
            
            default:
            
                
                await vouches.findOneAndUpdate({vouch_id: args[0]},{status: 'denied'})
                await vouch.findOneAndUpdate({userid: FindVouchInDb.userid},{$inc: {pending: -1}})

                break;
                
            }

            message.channel.send(`${FindVouchInDb.vouch_id} Vouch Has Been Denied`)
        try {

            const channel = await client.channels.fetch(DeniedVouch_channel_id)
            const user = await client.users.fetch(FindVouchInDb.userid)
            const vouch_byUSer = await client.users.fetch(FindVouchInDb.vouch_by)
            if (channel) {
                
                channel.send(`Denied Vouch Information__
**Vouch_id**: \`${FindVouchInDb.vouch_id}\`
**User**: \`${user.username}(${user.id})\`
**Vouch_by**: \`${vouch_byUSer.username}(${vouch_byUSer.id})\`
**Vouch_Date**: <t:${Math.floor(FindVouchInDb.vouch_date / 1000)}:R>
**Vouch_status**: \`${FindVouchInDb.status}\`
**Comment**: \`${FindVouchInDb.comment}\``)
                    
                }
                
                if (user) {
                    
                    const embed = new EmbedBuilder()
                    .addFields({name: '__Vouch Notification__',value: `
                        VouchID:  \`${FindVouchInDb.vouch_id}\` Your Vouch Has Been Denied by \`${message.author.username}\`
                        `})
                        
                        user.send({embeds: [embed]})
                        
                        
                    }

                    message.channel.send(` Vouch has been denied Id: #${FindVouchInDb.vouch_id}`)
                } catch (e) {
                    console.log(e)
                }
            
        } catch (e) {
            console.log(e)
        }
        }

}