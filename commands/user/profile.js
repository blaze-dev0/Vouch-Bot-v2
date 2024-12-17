const {EmbedBuilder} = require('discord.js')
const user = require('../../models/userfind')
const vouch = require('../../database/vouch')
const vouches = require('../../database/vouches')
const profile = require('../../models/Profile')
const marked = require('../../models/marked_user_find')

module.exports = {
    name: 'profile',
    description: "w",
    aliases: ['p'],
    async  execute(client,message,args) {
        try {

            
            
            let users;
            
   
            if (args.length > 0) {
                
                users = await user(args[0],message,client)
            } else {
                
                users = message.author
            }
            
            if (!users) {
                return message.channel.send('user Not Found')
            }
            
            const checkusereligibility = await marked(users)
            
            const normal = new profile(users,client)
            if (checkusereligibility) {
                switch(true) {
                    case checkusereligibility.scammer:
                        
                      
                        
                        message.channel.send({embeds: [await normal.getscam(checkusereligibility)]})
                        break
                        case checkusereligibility.dwc:
                            message.channel.send({embeds: [await normal.getdwc(checkusereligibility)]})
                            break
                            
                        }
                    } else {
                        
                        
                        await message.channel.send({embeds: [await normal.getNormal(message)]}).then(i=>{
                            setTimeout(() => {
                                
                                i.delete()
                                
                            }, 40000);
                        })
                    }
                    
                } catch (e) {
                    console.log(e)
                }

        

    }
}