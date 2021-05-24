    const Config = require('../Storage/config.json');

    let regexConst = new RegExp(/give.*role|role.*role/)

    module.exports = (Client) => {

        Client.on('message', message => {
            const { content } = message


                var testMsg = regexConst.test(content)
                if (testMsg === true) {
                    message.guild.members.cache.get(message.author.id).roles.add(Config.begar);
                    console.log("role given")


            }
        })
    }