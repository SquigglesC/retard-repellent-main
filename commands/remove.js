const Filesys = require('fs'),
    Config = require('../Storage/config.json');


module.exports = {
    command: 'remove',
    alias: ['Remove'],
    desc: 'removes user access to bot commands',

   async run(client, rawArgs, message) {

    let user = message.content.split(" ")[1];
    if (isNaN(user) === false) {
        let removed = Config.owner.filter(id => id === message.author.id).length > 0;

        if (removed === Config.owner.includes(user)) {
            Config.owner.splice(Config.owner.indexOf(user));
            Filesys.writeFile('./config.json', JSON.stringify(Config, null, 4), (err) => {
                if (err)
                    throw err;
                message.channel.send(`user id removed`)
            });
            }
        }else {
            message.channel.send(`could not find user with id "${user}"`)

    }


    },
}