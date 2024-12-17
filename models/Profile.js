const { EmbedBuilder, BitField } = require('discord.js')
const vouch = require('../database/vouch')
const vouches = require('../database/vouches')
const { RoleFlagsBitField } = require('discord.js')
const setservices = require('../database/setservices')
const {VouchStaff_Roleid, guildid} = require('../settings/config')


class profile {
    constructor(user, client) {
        this.user = user
        this.client = client
    }


    async helper() {

        try {

            
            
            const user = this.user
            const client = this.client
            const vouchFind = await vouch.findOne({ userid: user.id })
            const vouchesFind = await vouches.find({ userid: user.id })
            
            
            console.log(vouchFind)
            
            const positive = vouchFind && vouchFind.positive || 0
            const imported = vouchFind && vouchFind.imported || 0
            const negative = vouchFind && vouchFind.negative || 0
            const overall = positive ? positive + imported : 0
            let commentholder = []
            let comment = []
            
            let count = 1
            if (vouchesFind) {
                
                const comm = vouchesFind.sort()
                
                
                for (const i of comm.reverse()) {
                    
                    if (i.status === 'approved') {
                        
                        
                        commentholder.push(`${count}. ${i.comment}`)
                        
                        if (count >= 5) {
                            
                            break;
                            
                        } else {
                            
                            count++
                        }
                    }
                    
                }
                
                commentholder = commentholder.reverse()
                
                
                
            }
            
            comment = commentholder.length <= 0 ? 'No Vouches!' : commentholder.reverse().join(`\n`)
            
            
            console.log(comment)
            
            let badgeholde = []
            let badge = []
            
            const guild = await client.guilds.fetch(guildid)
            const member = guild.members.cache.get(user.id)
            if (member) {
                
                switch (true) {
                    case member.roles.cache.has('1285706950805426359'):
                        badgeholde.push('Owner')
                        
                        case member.roles.cache.has('1313538025300561960'):
                            badgeholde.push('Developer')
                            
                            case member.roles.cache.has(VouchStaff_Roleid):
                                badgeholde.push('Vouch Staff')
                                
                                case member.roles.cache.has('1313538081516814476'):
                                    badgeholde.push('Member')
                                    break
                                    
                                }
                            }
                            
                            badge = badgeholde.length <= 0 ? 'No Badge!' : badgeholde.join('\n')
                            
                            let serv;
                            const services = await setservices.findOne({userid: user.id})
                            console.log(services)
                            if (!services) {
                                
                                serv = false
                                
                            } else {
                                serv = {
                                    thumbnail: services.thumbnail == 'false' ? 0 : services.thumbnail,
                                    image: services.Image == 'false' ? false : services.Image,
                                    product: services.product == 'false' ? 'Not Set!' : services.product,
                                    forum: services.forum == 'false' ? 'Not Set!' : services.forum,
                                    shop: services.shop == 'false' ? 'Not Set!' : services.shop,
                                }
                            }
                            
                            
                            return {
                                positive,
                                imported,
                                negative,
                                overall,
                                comment,
                                badge,
                                serv
                            }
                            
                            
                        } catch (e) {
                            console.log(e)
                        }
    }


    async getNormal(message) {
        try {

            const user = this.user
            const url = user.avatarURL()
            const { positive, negative, imported, overall, badge, comment ,serv } = await this.helper()
            
            const embed = new EmbedBuilder()
            
            .setAuthor({ name: `${user.globalName || user.username}'s Profile` })
            .addFields({ name: '**User Information**', value: `User: ${user}\nUsername: **${user.username}**\nUserid: **${user.id}**\nCreatedAt: <t:${Math.floor(user.createdAt / 1000)}:R>` })
            
            .addFields({ name: "**Vouch Information**", value: `Positive: **${positive}**\nNegative: **${negative}**\nImported: **${imported}**\nOverall: **${overall}**` })
            .addFields({ name: "Badge", value: `${badge}` })
            .addFields({ name: 'Service And Product', value: `Shop: ${!serv? '`Not Set!`': `${serv.shop}`}\nProduct: ${!serv? '`Not Set!`':`${serv.product}`}\nForum: ${!serv? '`Not Set!`':`${serv.forum}`}`})
            
            
            .addFields({ name: "**Vouch Comments**", value: `${comment}` })
            
            .setColor(`#0000FF`)
            .setThumbnail(serv? serv.thumbnail ?  serv.thumbnail : url : url)
            .setImage(serv? serv.image ?  serv.image : null :null)
            
            
            
            return embed
            
            
            
            
            
        } catch (e) {
            console.log(e)
        }
        }
        
        getscam(checkusereligibility) {
            try {

                const user = this.user
                
                const scamembed = new EmbedBuilder()
                .setAuthor({ name: `${user.username}'s Profile` })
                
                .setDescription(`${user} **Marked As Scammer** \nReason: ${checkusereligibility.reason_scammer}`)
                
                .setColor(`Red`)
                .setThumbnail(user.avatarURL())
                
                return scamembed
            } catch (e) {
                console.log(e)
            }

    }
    async getdwc(checkusereligibility) {


        try {

            const user = this.user
            
            console.log(user)
            const url = user.avatarURL()
            const { positive, negative, imported, overall, badge, comment ,serv } = await this.helper()
            
            
            const dwcembed = new EmbedBuilder()
            
            .setAuthor({ name: `${user.globalName || user.username}'s Profile` })
            .addFields({ name: "⚠️Deal With Caution⚠️", value: `Reason: ${checkusereligibility.reason_dwc}` })
            .addFields({ name: '**User Information**', value: `User: ${user}\nUsername: **${user.username}**\nUserid: **${user.id}**\nCreatedAt: <t:${Math.floor(user.createdAt / 1000)}:R>` })
            
            .addFields({ name: "**Vouch Information**", value: `Positive: **${positive}**\nNegative: **${negative}**\nImported: **${imported}**\nOverall: **${overall}**` })
            .addFields({ name: "Badge", value: `${badge}` })
            .addFields({ name: 'Service And Product', value: `Shop: ${!serv? '`Not Set!`': `${serv.shop}`}\nProduct: ${!serv? '`Not Set!`':`${serv.product}`}\nForum: ${!serv? '`Not Set!`':`${serv.forum}`}`})
            
            
            .addFields({ name: "**Vouch Comments**", value: `${comment}` })
            
            .setColor(`#FFA500`)
            
            .setThumbnail(serv? serv.thumbnail ?  serv.thumbnail : url : url)
            
            
            return dwcembed
        } catch (e) {
            console.log(e)
        }


    }

}

module.exports = profile