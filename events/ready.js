const Discord = require("discord.js");
      Config = require ('../Storage/config.json')
      chalk = require ('chalk')

module.exports = async () => {
    const botName = chalk.blueBright(Config.bot_name + ' Bot')
    const helpSyntax = chalk.blueBright(Config.prefix + 'help')
    console.log(`Welcome to ${botName}, use ${helpSyntax} to get a list of commands.`)

}