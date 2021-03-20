class Help extends require("../../commandClass") {
    constructor() {
        super(
            "help",
            {
                base: "Display the help page for a specific command or list all commands.",
                usage: "help (commandName) (subCommand)"
            })
    }

    run(message, bot, args) {
        const { MessageEmbed } = require("discord.js")
        if (args.length > 0) {
            const cmd = bot.commands.get(args[0])
            if (args.length === 1 && cmd) {
                checkCommand(cmd)
            } else if (cmd) {
                checkSubCommand(cmd)
            } else {
                message.channel.send({embed: invalidArgument()})
            }
        } else {
            let str = ""
            bot.commands.forEach(c =>
                str += `**${c.getName()}** - ${c.getHelp().base}\n`
            )
            let embed = constructEmbed([
                { name: "Bot commands", value: str },
                { name: "Developer", value: "Ten#0010" }
            ])
            message.channel.send({embed: embed})
        }

        function checkCommand(cmd){
            let fields = [{name: "Command: " + cmd.getName(), value: cmd.getHelp().base}]
            let subCommands = ""
            for (const x in cmd.getHelp())
                if(x !== "base" && x !== "usage") subCommands += x + "\n"

            if (subCommands !== "") fields.push({
                name: "Arguments: ", value: subCommands
            })

            message.channel.send({embed: constructEmbed(fields, 0x00CC00)})
        }

        function checkSubCommand(cmd) {
            let embed;
            if (cmd.getHelp()[args[1].toLowerCase()] !== undefined) {
                const fields = [
                    {
                        name: "Command: " + cmd.getName() + "'s argument: " + args[1].toLowerCase(),
                        value: bot.prefix + cmd.getName() + " " + cmd.getHelp()[args[1].toLowerCase()]
                    }
                ]
                embed = constructEmbed(fields,0x00DDCC)
            } else {
                embed = invalidArgument()
            }
            message.channel.send({embed: embed})
        }

        function constructEmbed(fields, gotColor) {
            const color = gotColor ? gotColor : 0xAABBCC
            return new MessageEmbed()
                .setAuthor("Called by " + message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()
                .setColor(color)
                .addFields(fields)
                .setFooter(bot.user.username, bot.user.displayAvatarURL())
        }

        function invalidArgument() {
            return new MessageEmbed()
                .setAuthor("Called by " + message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()
                .setColor(0xFF142C)
                .setDescription("Invalid argument.")
                .setFooter(bot.user.username, bot.user.displayAvatarURL())
        }
    }
}
module.exports = new Help()