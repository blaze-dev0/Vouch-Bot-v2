const setservices = require("../database/setservices")


class set {
    constructor(user,message) {

   
        this.user = user
        this.message = message
        
    }
    

    imagehelper(args) {
       
        const user = this.user

        if (args.match(/(https?:\/\/.*\.(?:png|jpg|webp|gif))/g)) {
            console.log('yo')
            return true
        }
        
        return  false
    }
    
   async thumbnail(args) {
        
   
        const user = this.user
        const message = this.message
        
        if (!args) {
            
            await setservices.findOneAndUpdate({userid: user.id},{thumbnail: 'false'})
            
            message.channel.send(" Thumbnail Has Been Reset")
            return
        }
        const thum = this.imagehelper(args)

        if (!thum) {
            return message.channel.send(' Invalid Thumbnail Url Provided')
        }

          
          
          await setservices.findOneAndUpdate({userid: user.id},{thumbnail: args})
        
        message.channel.send('Thumbnail Has Been Set')
        return 1
    }
    
    async Image(args) {
        
        
        const user = this.user
        const message = this.message
        
        if (!args) {
            
            
            
            await setservices.findOneAndUpdate({userid: user.id},{Image: 'false'})
            
            message.channel.send(" Image Has Been Reset")
            return
        }
        const image = this.imagehelper(args)
        if (!image) {
            return message.channel.send(' Invalid Thumbnail Url Provided')
        }
       
            await setservices.findOneAndUpdate({userid: user.id},{Image: args})
        
        message.channel.send('Image Has Been Set')
        return 1
    }
    
    async product(args) {
        
        const user = this.user
        const message = this.message
        if (args.length > 100) {
            return message.channel.send("Only 100 Characters Accepted")
        }

        if (!args) {

            
            await setservices.findOneAndUpdate({userid: user.id},{product: 'false'})
            
            message.channel.send(" Product Has Been Reset")
            return
        } 
        
        
      
            
            await setservices.findOneAndUpdate({userid: user.id},{product: args})
            message.channel.send('Product Has Been Set')
        
        return 1
    }
    async forum(args) {

        const user = this.user
        const message = this.message
        if (args.length > 100) {
            return message.channel.send("Only 100 Characters Accepted")
        }

        
        if (!args) {

            
            await setservices.findOneAndUpdate({userid: user.id},{forum: 'false'})
            
            message.channel.send(" Forum Has Been Reset")
            return
        } 
        
      

            await setservices.findOneAndUpdate({userid: user.id},{forum: args})
        

        message.channel.send('Forum Has Been Set')
        return 1
    }
    
    async shop(args) {
        const user = this.user
        const message = this.message
        let shop;



        if (args.length > 100) {
            return message.channel.send("Only 100 Characters Accepted")
        }

        
        if (!args) {

            
            await setservices.findOneAndUpdate({userid: user.id},{shop: 'false'})
            
            message.channel.send(" Shop Has Been Reset")
            return
        } 
        
      
            await setservices.findOneAndUpdate({userid: user.id},{shop: args})
        
        message.channel.send('Shop Has Been Set')
        return 1



    }
    
}

module.exports = set