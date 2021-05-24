const   Filesys = require('fs');
const   { join } = require("path");
const   filePath = join(__dirname + '/../commands/');
        Config = require('../Storage/config.json')
        Discord = require('discord.js')

module.exports = async (message, client) => {
    // Destructuring assignment is cool. Grab the content member on assignment :sunglasses:
    const {content} = message;

    // If prefix wasn't used ignore it fuck face
    if (!content.startsWith(Config.prefix))
        return;

    // Split message content to create a string array of arguments
    let rawArgs = content.replace(Config.prefix, '').split(' ')

    // Get the first argument and remove it from the array
    let commandId = rawArgs[0].toLowerCase()
    rawArgs.shift()


    //Checks to see if the user saying the cmd is a owner with  | array.filter(element => condition |

    if (Config.owner.filter(ownerId => ownerId ===   message.author.id).length === 0)
        return

    for (const fileName of await Filesys.readdirSync(__dirname + '/../commands/')){
        const commandImpl = require(__dirname + `/../commands/${fileName .toString()}`);

        if (commandImpl.command === commandId || commandImpl.alias.filter(dudeWTF => dudeWTF === commandId ).length !== 0) {

            commandImpl.run(client, rawArgs, message).catch(console.log)

            // Stop the function and return so the 'not found' message isn't sent
            return;
        }
    }

    message.channel.send(new Discord.MessageEmbed().setColor('#ff4a4a').setDescription(`Command '${commandId }' was not found.`))



}
