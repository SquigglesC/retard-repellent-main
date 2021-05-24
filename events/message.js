const Discord = require("discord.js");
const functions = require("../functions/functions.js");
      Config = require("../Storage/config.json")

module.exports = async (Client, message) => {

    let prefix = Config.prefix;

    const args = message.content.split(/ +/g);
    const command = args.shift().slice(prefix.length).toLowerCase();
    const cmd = Client.commands.get(command) || Client.aliases.get(command);

    if(!message.content.toLowerCase().startsWith(prefix) || !message.guild || message.author.bot || !cmd) return;

    cmd.run(Client, message, args, functions).catch(e => {return console.log(e)});

}