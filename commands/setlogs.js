const Discord = require("discord.js");
const db = require("quick.db");
const Moment = require("moment");

module.exports = {
        command: 'setlogs',
        alias: ['logs'],
        desc: 'sets ticket logs channel',

    async run (Client, args, message ,functions) {

        let channel = message.mentions.channels.first();
        if(!channel || channel.type !== "text") return functions.errorEmbed(message, message.channel, "put a valid text channel");

        let channelFetched = message.guild.channels.cache.find(c => c.id === channel.id);
        if(!channelFetched || channelFetched.type !== "text") return functions.errorEmbed(message, message.channel, "put a valid text channel");

        let embed = new Discord.MessageEmbed()
            .setAuthor(`channel logs`)
            .setColor('#64DF5B')
            .setTimestamp()
            .setFooter('squiggles.cc | fuck ticket tool | ' + Moment().format(' MM/DD/YYYY'), Client.user.displayAvatarURL())
            .addField(`Logs Channel`, channelFetched, true)
            .addField(`Command ran by`, message.author, true)

        db.set(`logs_${message.guild.id}`, channelFetched.id);
        channelFetched.send(message.author, {embed: embed});
        message.delete();
    }
}
