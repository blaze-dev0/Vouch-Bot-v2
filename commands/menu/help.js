const { EmbedBuilder } = require("discord.js")
const {prefix} = require("../../settings/config")

module.exports = {

    name: 'help',
    description: 'show\'s Help Command Panel',
    execute(client,message,args) {

        

        const embed = new EmbedBuilder()
        .setAuthor({name: `${message.author.username}`})
        .addFields({name: 'Help Panel',value: `**${prefix[0]}help** - \`Use To View Help Command\`\n**${prefix[0]}profile** - \`Use To View Profile\`\n**${prefix[0]}vouch** - \`Use To Give Vouch To User\`\n**${prefix[0]}top** - \`use To View Top 10 Vouch User List\`\n**${prefix[0]}set thumbnail [url]** - \`use to set thumbnail in your profile\`\n**${prefix[0]}set image [url]** - \`use to set image in your profile\`\n**${prefix[0]}set product [a-zA-Z]**- \`use to set product in your profile\`\n**${prefix[0]}set shop [a-zA-Z]** - \`use to set shop in your profile\`\n**${prefix[0]}set forum [a-zA-Z]** - \`use to set forum in your profile\``})
        .setColor('Blue')
        .setThumbnail(client.user.avatarURL())
        .setFooter({text: `${new Date().toLocaleString()}`})
        message.channel.send({embeds: [embed]})
    }
}