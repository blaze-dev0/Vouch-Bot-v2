const userfind = async (user,message,client) =>  {   
    
    
    try {

        let userx = message.mentions.users.first() ||
        await client.users.cache.find(x => (x.tag === user)) || await client.users.fetch(user)
        if (!user) {
            
            return undefined
        }
        
        return userx
    } catch (e) {
        console.log(e)
    }
}

module.exports =  userfind