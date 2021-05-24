const Filesys = require('fs'),
        Config = require('../Storage/config.json');


module.exports = {
    command: 'add',
    alias: ['access'],
    desc: 'gives user access to ALL bot commands',

    async run(client, rawArgs, message) {
        let user = message.content.split(" ")[1];
        if (isNaN(user) === false) {
            let allowed = Config.owner.filter(id => id === message.author.id).length > 0;

            if (allowed) {
                Config.owner.push(user);
                Filesys.writeFile('./config.json', JSON.stringify(Config, null, 4), (err) => {
                    if (err)
                        throw err;
                    message.channel.send(`user id added`)
                });
            }
            console.log(user, allowed)
        } else {
            message.channel.send(`user "${user}" does not exist or input included letters`)
            console.log(user)

        }


    },
}