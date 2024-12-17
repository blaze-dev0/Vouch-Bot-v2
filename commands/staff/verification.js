const vouches = require("../../database/vouches")
const vouch = require("../../database/vouch")
const { EmbedBuilder } = require("discord.js")
const {VouchStaff_Roleid, verificationVouch_channel_id} = require("../../settings/config")
module.exports = {

    name: 'verify',
    description: 'w',
    async execute(client,message,args) {
        try {
        if (!message.member.roles.cache.has(VouchStaff_Roleid)) {

            console.log('You Need Staff Role To Use This')


            return
        }




        const FindVouchInDb = await vouches.findOne({vouch_id: args[0]})

        if (!FindVouchInDb) {
            return message.channel.send("Vouch Not Found")
        }

        switch(true){

            case FindVouchInDb.status == 'verification':
                return message.channel.send("Vouch ALready Send for Verification")


            default:
            
            await vouches.findOneAndUpdate({vouch_id: args[0]},{status: 'verification'})
            const channel = await client.channels.fetch(verificationVouch_channel_id)
            const user = await client.users.fetch(FindVouchInDb.userid)
            const vouch_byUSer = await client.users.fetch(FindVouchInDb.vouch_by)
            if (user) {

                const embed = new EmbedBuilder()
                .addFields({name: '__Vouch Notification__',value: `
You have recieved the Positive vouch \#${FindVouchInDb.vouch_id}\` from ${message.author.username}\. This vouch requires manual verification by a staff member. Please join the Support Server and open a support ticket to provide proof for the vouch. If a ticket is not opened within 2 days , this vouch will be denied.Should this happen more regularly, you may be blacklisted from our vouch-system.
                    `})
                    
                    user.send({embeds: [embed]})

            }

            if (channel) {
                channel.send(`Denied Vouch Information__
**Vouch_id**: \`${FindVouchInDb.vouch_id}\`
**User**: \`${user.username}(${user.id})\`
**Vouch_by**: \`${vouch_byUSer.username}(${vouch_byUSer.id})\`
**Vouch_Date**: <t:${Math.floor(FindVouchInDb.vouch_date / 1000)}:R>
**Vouch_status**: \`${FindVouchInDb.status}\`
**Comment**: \`${FindVouchInDb.comment}\``)
                    
            }
            break
        }

        message.channel.send(` Vouch has been send for verification Id: #${FindVouchInDb.vouch_id}`)
        

        
    } catch (e) {
        console.log(e)
    }

    }

}