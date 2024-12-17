const {
    Client,
    GatewayIntentBits,
    Collection,
    PermissionsBitField
  } = require('discord.js');
  const client = new Client({
    intents: [
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ]
  });
  const fs = require('fs');
  
  const mongoose = require('mongoose');
const {token,prefix, mongo} = require('./settings/config');


  
client.commands = new Collection();
client.aliases = new Collection()

mongoose.set("strictQuery", false);
mongoose.connect(mongo).catch((e)=> {
  console.log(e)
  process.exit()

}).then(()=> {
  console.log('Connected To Mongo')
});



const commandFiles = fs.readdirSync('./commands')


let date = new Date()


for (const folder of commandFiles) {

 const option = fs.readdirSync(`./commands/${folder}`).filter(f=> f.endsWith('.js'))
  option.forEach(item=> {

    const command = require(`./commands/${folder}/${item}`);
   
    console.log(`\x1b[36m%s\x1b[0m`,`[${date.toLocaleString()}] ${command.name}`)
    
    
    
    client.commands.set(command.name, command);
  })
}


client.on("ready", async () => {





    console.log(`\x1b[31m%s\x1b[0m`,`${client.user.username} Is Ready`)
  })
  

  
  
client.on("messageCreate", async message => {


  




  
    if (!prefix.find(e=> message.content.startsWith(e)) || message.author.bot || message.mentions.users.get('1312750746776637452') == client.user) return;
  
  
  
  
    const args = message.content.slice("-".length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
  
  
  
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;
  
  
  
    try {
      command.execute(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply('There was an error trying to execute that command!');
    }
  
  
  
  })
  
  

  

  client.login(token)