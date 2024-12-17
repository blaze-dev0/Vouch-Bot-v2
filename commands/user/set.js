const set = require("../../models/set");
const setservices = require("../../database/setservices")



module.exports = {
    name: 'set',
    description: 'w',
    async execute(client, message, args) {
        try {

      
            
            if (args.length < 1) {
                return message.channel.send("invalid Argument Provided")
            }
            
            const user = message.author
            
            
            const setitem = new set(user, message)
            const FindUserInServices = await setservices.findOne({ userid: user.id })
            
            if (!FindUserInServices) {

                console.log('im in there',FindUserInServices)
                await new setservices({
                    userid: user.id
                }).save()
            }
            
            const arg = args[0]
            
            switch (arg.toLowerCase()) {
                case "thumbnail":
                    
                    const thum = setitem.thumbnail(args[1])
                    
                    
                    break;
                    case "image":
                        
                        const img = setitem.Image(args[1])
                        
                        
                        break;
                        case "product":
                            
                            const prod = setitem.product(args.slice(1).join(" "))
                            
                            break;
                            case "forum":
                                break;
                                case "shop":
                                    const shop = setitem.shop(args[1])
                                    
                                    break;
                                }
                                
                            } catch (e) {
                                console.log(e)
                            }
                            }
                        }