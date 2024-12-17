const user = require('../../models/userfind')
const vouch = require('../../database/vouch')
const vouches = require('../../database/vouches')
const scam = require('../../database/mark')
const mark = require('../../models/marked_user_find')
const { EmbedBuilder } = require('discord.js')
const token = require('../../database/token')
const GetTheThings = require('../../models/GetTheThings')

module.exports = {
    name: "vouch",
    description: "w",
    
    async execute(client,message,args) {
        try {

            
            
            if (args.length < 2) {
                
                return message.channel.send("Invalid Usage")
            
            
            }

    
            
            
            let users = await user(args[0],message,client)
            if (!users) {
                
                return message.channel.send("user Not Found")
            }


            

            


            if (users.id === message.author.id) {
                return message.channel.send('You Cant Vouch Your Self')
            }

            const checkusereligibility = await mark(users)

            if (checkusereligibility) {

                
                switch(true) {
                    case checkusereligibility.scammer == true:
                      
                        const scamembed = new EmbedBuilder()
                        .setAuthor({name: `${users.username}'s Profile`})
                        .setTitle(`You Cant Vouch Him Because User Marked As Scammer`)
                        .setDescription(`${users} **Marked As Scammer** \nReason: ${checkusereligibility.reason}`)
    
                        .setColor(`Red`)
                        
                        message.channel.send({embeds: [scamembed]})
                        
                        return
                        case checkusereligibility.dwc:
                            const dwcembed = new EmbedBuilder()
                            .setAuthor({name: `${users.username}'s Profile`})
                            .setTitle(`You Cant Vouch Him Because User Marked As Dwc`)
                            .setDescription(`${users} **Marked As Dwc** \nReason: ${checkusereligibility.reason}`)
        
                            .setColor('#FFA500')
                            
                            message.channel.send({embeds: [dwcembed]})
                            
                            
                            return

                            
                        }
            }
            
            // if (users.bot) {
            //     return message.channel.send("You Can't Give Vouch To Bot")
            // }



            const date = new Date()

            console.log(date.getDate() - 2 > users.createdAt,'new date')
            

            console.log(users.createdAt)

            date.setDate(date.getDate() - 2)
            if (date < message.author.createdAt) {
                return message.channel.send('Your account should be 2 days old to give vouch')
            }
            if (date < users.createdAt) {
                return message.channel.send('His account should be 2 days old to recive vouch')
            }
                

            const regex  = /((\$|inr|usd)(\d))|((\d)(\$|inr|usd))/;
            console.log(args.slice(1).join(""))
            const checkcomment = args.slice(1).join("").toLowerCase().match(regex)

            if (!checkcomment)  {

                return message.channel.send("Price Need To Mention")
               
            }

         

            
        const FindUserInVouch = await vouch.findOne({userid: users.id})
        const FindUserIndb = await token.findOne({userid: users.id})

        if (!FindUserIndb) {
            const tokenGen = `ArthurMorgan-${GetTheThings(10)}-${GetTheThings(5)}-${GetTheThings(10)}`
            new token({
                userid: users.id,
                token: tokenGen
            }).save()

        }

        if (!FindUserInVouch) {

            new vouch({
                userid: users.id,

            }).save()

        }

    

       

        

  


          const vouchId = GetTheThings(5)

            new vouches({
                userid: users.id,
                vouch_id: vouchId,
                vouch_by: message.author.id,
                comment: args.slice(1).join(' ')
            
            }).save()



            const channel = await client.channels.fetch('1285728147693637663')
            const option = {
                timeZone: 'Asia/Kolkata',
              
                month: "long",
                day: "numeric",
                hour: 'numeric',
                minute: "numeric",
                hour12: true,
                year: 'numeric'
            }

            const vd = new Date(Date.now()).toLocaleString('en-US',option)
            if (channel) {

                const embed = new EmbedBuilder() 
                .addFields({name: '__New Vouch Information__',value: `
**Vouch_id**: \`${vouchId}\`
**Vouch_by**: \`${message.author.id}\`
**Vouch_Date**: <t:${Math.floor(Date.now() / 1000)}:R>
**Vouch_status**: \`Pending\`
**Comment**: \`${args.slice(1).join(' ')}\``})
.setColor(`Random`)
                channel.send({embeds: [embed]})

            }

            const userembed = new EmbedBuilder()
            .addFields({
                name: '__Vouch Notification__', value: `VouchID:  \`${vouchId}\` You Have Recived New Vouch From \`${message.author.username}\``})
            .setColor('Random')
            
            users.send({embeds: [userembed]})

        await vouch.findOneAndUpdate({userid: users.id},{$inc: {pending: 1}})
            
            

        const succembed= new EmbedBuilder()
        .setAuthor({name: `${message.author.username}`})

        .setDescription(`Successfully Gived Vouch To \`${users.username}\``)
        .setFooter({text: `${new Date().toLocaleString()}`})
        .setColor('Green')
        message.channel.send({embeds: [succembed]})
            
            
            
        } catch (e) {

            console.log(e)
        }
        }
    }