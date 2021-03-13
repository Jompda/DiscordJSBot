class Command {
    constructor(cmdName, help) {
        this.cmdName = cmdName;
        this.help = help;
    }
    getName(){return this.cmdName;}
    getHelp(){return this.help;}
    run(){return console.log(this.cmdName + " ran, but run method wasn't overridden.");}
}

module.exports = Command;