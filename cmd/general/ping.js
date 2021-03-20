class Ping extends require("../../commandClass") {
    constructor() {
        super(
            "ping",
            {
                base: "Get the latency between bot and gateway.",
                usage: "ping"
            })
    }

    run(message){
        message.channel.send("Pinging...").then(m => {
           m.edit(`Ping: \`${m.createdAt - message.createdAt}ms\`.`)
        })
    }
}
module.exports = new Ping()