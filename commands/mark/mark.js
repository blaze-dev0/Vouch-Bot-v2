const mark = require("../../models/Mark_")
const {admin_RoleID,DwcMark_Channel_id,ScammerMark_Channel_id} = require("../../settings/config")
const userfind = require('../../models/userfind')
module.exports = {
    name: 'mark',
    description: 'Use To Mark SomeOne',
    async execute(client,message,args) {

        try {

            
            
            if (!message.member.roles.cache.has(admin_roleId)) {
                return console.log('You Need Mark permission To use this command')
            }
            
            if (args.length < 2) {
                
                return message.channel.send("Invalid Usage")
                
            }
            
            
            const user = await userfind(args[1],message,client)
            
            if (!user){
                return message.channel.send("User Not Defind")
            }
            
            
            
            let inp =  args[0].toLowerCase()
            
            
            const markUSer = new mark(user,message)
            
            const reason = args.slice(2).join(" ")
            
            
            switch(inp) {
                
                
                case "scammer":
                    
                    const updates = markUSer.scam(reason)
                    
                    if (!updates) {
                        return message.channel.send("scammer Mark Has Been Remove")
                    }
                    
                    const scamchannel = ScammerMark_Channel_id ? await client.channels.fetch(ScammerMark_Channel_id) : undefined
                    
                    if (scamchannel) {
                        
                        scamchannel.send(`Scam: ${user.username} | ${reason}`)
                    }
                    return message.channel.send(" User Has Been Marked As scammer")
                    
                    
                    
                    
                    
                    case "dwc":
                        
                        
                        const dwcupdates = markUSer.dwc(reason)
                        
                        if (!dwcupdates) {
                            return message.channel.send("dwc Mark Has Been Remove")
                        }
                        
                        
                        
                        const dwcchannel = DwcMark_Channel_id? await client.channels.fetch(DwcMark_Channel_id) : undefined
                        
                        if (dwcchannel) {
                            
                            dwcchannel.send(`Dwc: ${user.username} | ${reason}`)
                        }
                        
                        return message.channel.send(" User Has Been Marked As dwc")
                        
                        
                        
                        
                    }
                }  catch (e) {
                    console.log(e)
                }
                    
                    
                    
                }
            }