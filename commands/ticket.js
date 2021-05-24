const Discord = require('discord.js')
    Moment = require('moment')
    Config = require('../Storage/config.json');
    color = require('../Storage/color.json');


            let watermark = 'squiggles.cc | fuck ticket tool | ' + Moment().format(' MM/DD/YYYY');

module.exports = {
    command: 'ticket',
    alias: [],
    desc: 'creates a ticket in channel where ticket command is entered',

    async run(client, rawArgs, message) {
        if(message && message.deletable) message.delete().catch(e => {});

        let embed = new Discord.MessageEmbed()
            .setFooter(watermark)
            .setColor(color.yellow)
            .setDescription(`**Open Ticket**\nreact with  📩  to open a ticket`);
        message.channel.send({embed: embed}).then(m => {
            m.react('📩');
        });
        message.delete();
    }


}


