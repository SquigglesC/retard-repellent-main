const Discord = require('discord.js'),
    Moment = require('moment');

module.exports = {
    command: 'say',
    alias: ['talk'],
    desc: 'say {channel id} {message}',


    async run(bot, args, message) {
        let watermark = 'gelt.shop | ' + Moment().format(' MM/DD/YYYY');
        let user = message.author.username;
        let pfp = message.author.avatarURL();

            let sendChannel = message.guild.channels.cache.get(args[0]);
        if (!sendChannel)
            return message.channel.send(
                `You did not specify your channel to send the message too!`
            );

        let msg = "";
        let str = message.content.split(" ");
        for (var i = 2; i < str.length; i++) {
            msg += str[i] + " ";
        }
        if (!msg)
            return message.channel.send(`You didn't put a message to send`);
        const sendEmbed = new Discord.MessageEmbed()
            .setAuthor(user, pfp)
            .setDescription(`${msg}`)
            .setColor('#6acefd')
            .setFooter(watermark);

        sendChannel.send(sendEmbed);
        message.delete();
    },
}