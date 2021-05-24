const Discord = require("discord.js");
const Filesys = require("fs");
const db = require("quick.db");
const Moment = require("moment");
const color = JSON.parse(Filesys.readFileSync(`Storage/color.json`, `utf8`));

module.exports = {
    command: 'close',
    alias: ['force'],
    desc: 'closes a ticket',

    async run(Client, args, message,functions) {

let watermark = 'gelt.shop | fuck ticket tool | ' + Moment().format(' MM/DD/YYYY');

        let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));


    if(!message.channel.name.startsWith(`ticket-`)) return;

    if(message.author.id === db.get(`ticket.${message.channel.name}.user`)) {

        let userEmbed = new Discord.MessageEmbed()
            .setColor(color.red)
            .setDescription(`**closed ticket**\nmember has closed a ticket`)
            .setTimestamp()
            .setFooter(watermark, Client.user.displayAvatarURL())
            .addField(`Information`, `**User :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${Moment().format('MM/DD/YYYY - h:mm')}\``);

        db.delete(`ticket.${message.channel.name}`);
        if(logsChannel) await logsChannel.send(userEmbed);
       //await message.channel.delete();
    } else {

        let support = message.guild.roles.cache.find(r => r.name === "Ticket Support");
        if(!support) return functions.errorEmbed(message, message.channel, "Ticket Support role not found");
        if(message.deletable) message.delete();

    }
        await message.delete();

            //transcriptions
        if (message.author.bot) return;
    }

}
