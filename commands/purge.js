const Discord = require('discord.js'),
    Config = require('../Storage/config.json'),
    Moment = require('moment');

function deleteMsg(msg) {
    try {
        msg.delete().catch();
    } catch (e) {
    }
}

module.exports = {
    command: 'purge',
    alias: ['prune', 'delete'],
    desc: 'Deletes messages in the current channel.',

    async run(client, rawArgs, message) {
        let watermark = 'gelt.shop | ' + Moment().format(' MM/DD/YYYY');

        if (rawArgs.length === 0)
            return message.channel.send(new Discord.MessageEmbed().setColor('#ff4a4a').setFooter(watermark).setDescription(`Usage: \n ${Config.prefix}purge {amount}`))

        const amount = rawArgs[0];
        if (isNaN(amount)) return

        let i = -1;
        const channel = client.channels.fetch(message.channel.id);
        if (!channel) return message.delete();
        message.channel.messages.fetch().then(msgs => {
            const messages = msgs.array();
            messages.forEach(msgA => {
                if (i >= amount) return;
                if (msgA.author === client.user || msgA.author !== client.user) {
                    i++;
                    deleteMsg(msgA);
                }
            })
        })
    }
}

//        if (msg.startsWith(Config.prefix + 'purge')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
//             // We have to wrap this in an async since awaits only work in them.
//                 msg.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.
//
//                 // We want to check if the argument is a number
//                 if (isNaN(rawArgs[0])) {
//                     // Sends a message to the channel.
//                     msg.channel.send(new Discord.MessageEmbed().setColor('#ff4a4a').setFooter(watermark).setDescription(`Usage: \n ${Config.prefix}purge {amount}`)) //\n means new line.
//                     // Cancels out of the script, so the rest doesn't run.
//                     return;
//                 }
//
//                 const fetched = await msg.channel.messages.fetch({limit: rawArgs[0]}); // This grabs the last number(rawArgs) of messages in the channel.
//                 console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting
//
//                 // Deleting the messages
//                 msg.channel.bulkDelete(fetched)
//                     .catch(error => msg.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.
//
//             }
//
//
//         }
//     }