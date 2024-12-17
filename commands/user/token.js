const { EmbedBuilder } = require("discord.js")
const token = require("../../database/token")
const GetTheThings = require("../../models/GetTheThings")

module.exports = {
    name: 'token',
    description: 'w',
    async execute(client,message,args) {
        try {
            
            
            const user = message.author
            
            
            let tokenFind = await token.findOne({userid: user.id})
            
            if (!tokenFind) {
                const tokenGen = `ArthurMorgan-${GetTheThings(10)}-${GetTheThings(5)}-${GetTheThings(10)}`
                new token({
                    userid: user.id,
                    token: tokenGen
                }).save()
                
                const tokenembed = new EmbedBuilder()
                .setAuthor({name: user.username})
                .setDescription(`**Token**: \`${tokenGen}\``)
                .setFooter({text: `${new Date().toLocaleString()}`})
                .setColor(`Blue`)
                user.send({embeds: [tokenembed]})
                return 
                
                
            }
            
            const tokenembed = new EmbedBuilder()
            .setAuthor({name: user.username})
            .setDescription(`**Token**: \`${tokenFind.token}\``)
            .setFooter({text: `${new Date().toLocaleString()}`})
            .setColor(`Blue`)
            user.send({embeds: [tokenembed]})
            
            
         } catch (e) {
            console.log(e)
         }

    }
}