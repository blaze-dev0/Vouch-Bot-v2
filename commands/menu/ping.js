module.exports = {

    name: "ping",
    description: "Show\'s Ping",
    execute(client,message,args) {
        message.channel.send(`ping  ${Date.now() - message.createdTimestamp}ms`)
    }

}