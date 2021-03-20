const { readdirSync, statSync } = require("fs")
const { join } = require("path")
const commandClass = require("./commandClass")


const commands = new Map()
handleDirectory("./cmd")
module.exports = commands

function handleDirectory(path) {
    readdirSync(path).forEach(filename => {
        const tempFilepath = join(path, filename)
        const stat = statSync(tempFilepath)
        if (stat.isDirectory()) return handleDirectory(tempFilepath)
        if (!tempFilepath.endsWith(".js")) return console.log(`Non-command file under cmd folder: ${tempFilepath}`)
        const command = require('./' + tempFilepath)
        if (!(command instanceof commandClass)) return console.log(`Non-command file under cmd folder: ${tempFilepath}`)
        commands.set(command.getName(), command)
    })
}