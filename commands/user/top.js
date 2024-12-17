const { EmbedBuilder } = require("discord.js")
const vouch = require("../../database/vouch")

module.exports = {
    name: 'top',
    description: 'w',
    async execute(client,message,args) {


        try {

            const FindTopUser =await vouch.find().sort( { positive: -1 } ).limit(10)
            
         
            
            const top = []
            
            for (const i of FindTopUser) {

                if (FindTopUser.length <= 0) {

                    top.push("No Vouch Found!")
                    break;


                }
                
                const user = await client.users.fetch(i.userid)
                
                top.push(`**UserName**: \`${user.username}\` | **Vouch**: \`${i.positive}\``)
                
            }
            
            const topembed = new EmbedBuilder()
            .setAuthor({name:`${message.author.username}`})
            .setDescription(`${top.join('\n')}`)
            .setThumbnail(message.author.avatarURL())
            
            
            message.channel.send({embeds: [topembed]})
        } catch (e) {
            console.log(e)
        }
        }
    }