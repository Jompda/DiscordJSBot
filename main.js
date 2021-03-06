const {Client} = require("discord.js");
const bot = new Client();
const {token} = require("./token.json");

bot.prefix = "!";
bot.commands = require("./commands").get();

console.log("Bot starting up ^^");

bot.once("ready", ()=>{
    console.log("Bot has started, using account: " + bot.user.tag);
});

bot.on("message", message => {
    if(!message.guild) return;
    if(message.content === "<@" + bot.user.id + ">" || message.content === "<@!" + bot.user.id + ">"){
        return message.channel.send("Hi there! I'm " + message.guild.me.displayName + "!\nMy prefix is: " + bot.prefix);
    }
    if(!message.content.startsWith(bot.prefix)) return;
    const args = message.content.slice(bot.prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    const cmd = bot.commands.get(command);
    if(cmd){ cmd.run(message,bot,args); }
});

bot.login(token);
