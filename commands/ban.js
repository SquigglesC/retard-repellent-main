const Discord = require('discord.js'),
    Config = require('../Storage/config.json');

module.exports = {
    command: 'ban',
    alias: ['nigger'],
    desc: 'ban {user} {reason}',

    // pasted this whole cmd cuz fuck coding shit thats alrdy been done type beat

    async run(bot, args, message) {

        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.members.resolve(user);
            if (member) {

                member
                    .ban({reason: `banned - member id: ${user.id}`,})
                    .then(() => {
                        // We let the message author know we were able to ban the person
                        message.channel.send(`banned ${user.tag}`);
                    })
                    .catch(err => {
                        // An error happened
                        // This is generally due to the bot not being able to ban the member,
                        // either due to missing permissions or role hierarchy
                        message.channel.send('unable to ban');
                        // Log the error
                        console.error(err);
                    });
            } else {
                // The mentioned user isn't in this guild
                message.channel.send("user isn't in the server");
            }
        } else {
            // Otherwise, if no user was mentioned
            message.channel.send("no user mentioned");
        }

    },
}