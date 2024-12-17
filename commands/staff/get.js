
const vouches = require("../../database/vouches")
const vouch = require("../../database/vouch")
const { EmbedBuilder } = require("discord.js")
const {VouchStaff_Roleid} = require("../../settings/config")

module.exports = {

    name: 'get',
    description: 'w',
    async execute(client, message, args) {
        try {

            
            if (!message.member.roles.cache.has(config.VouchStaff_Roleid)) {
                
                console.log('You Need Staff Role To Use This')
                
                
                return
            }
            
            
            
            
            
            
            
            
            const FindVouchInDb = await vouches.findOne({ vouch_id: args[0] })
            
            if (!FindVouchInDb) {
                return message.channel.send("No Vouch Found")
                
            }
            
            const user = await client.users.fetch(FindVouchInDb.userid)
            
            
            
            const embed = new EmbedBuilder()
            .setAuthor({name: `${message.author.username}`})
            .setFields({name: '__Vouch Information__',value: `**Vouch_id**: \`${FindVouchInDb.vouch_id}\`
                **User**: ${user.username}
                **Vouch_by**: \`${FindVouchInDb.vouch_by}\`
                **Vouch_Date**: <t:${Math.floor(FindVouchInDb.vouch_date / 1000)}:R>
                **Vouch_status**: \`${FindVouchInDb.status}\`
                **Comment**: \`${FindVouchInDb.comment}\``})
                .setColor('NotQuiteBlack')
                .setFooter({text: `${new Date().toLocaleString()}`})
                
                message.channel.send({embeds: [embed]})
                
                
                
                
                
                
                
                
            }  catch (e) {
                console.log(e)
            }
            }
        }