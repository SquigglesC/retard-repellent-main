
module.exports = {
    command: 'kick',
    alias: ['retard'],
    desc: 'kick {user} {reason}',

// pasted this whole cmd cuz fuck coding shit thats alrdy been done type beat

    async run(bot, args, message) {

        const user = message.mentions.users.first();

        if (user) {

            const member = message.guild.members.resolve(user);

            if (member) {

                member
                    .kick(`kicked - member id: ${user.id}`)
                    .then(() => {
                        // We let the message author know we were able to kick the person
                        message.channel.send(`kicked that retard ${user.tag}`);
                    })
                    .catch(err => {
                        // An error happened
                        // This is generally due to the bot not being able to kick the member,
                        // either due to missing permissions or role hierarchy
                        message.channel.send('unable to kick');
                        // Log the error
                        console.error(err);
                    });
            } else {
                // The mentioned user isn't in this guild
                message.channel.send("user ain't in the server");
            }
            // Otherwise, if no user was mentioned
        } else {
            message.channel.send("no user mentioned");
        }

    },
}