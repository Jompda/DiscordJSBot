class Say extends require("../../commandClass"){
    constructor() {
        super(
            "say",
            {
                base: "Send a message to a channel. Defaults to the current channel.",
                usage: "say (#Channel) text"
            });
    }

    run(message,bot,args){
        if(message.member.permissions.has("MANAGE_MESSAGES") || message.member.permissions.has("ADMINISTRATOR")){
            if(message.mentions.channels.size === 1){
                args.shift();
                message.mentions.channels.first().send(args.join(" ")).catch(e => console.error(e));
            } else {
                message.channel.send(args.join(" ")).catch(e => console.error(e));
            }
        } else {
            message.channel.send("You don't have the permissions to use this command.\nEither `MANAGE_MESSAGES` or `ADMINISTRATOR` permission required.");
        }
    }
}
module.exports = new Say();