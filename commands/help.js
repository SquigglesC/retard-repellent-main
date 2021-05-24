const Discord = require('discord.js'),
    Filesys = require('fs'),
    Config = require('../Storage/config.json'),
    Moment = require('moment');

module.exports = {
    command: 'help',
    alias: ['commands'],
    desc: 'List all commands.',

    async run(client, rawArgs, message) {
        const commandImpls = [];

        for (const file of await Filesys.readdirSync('./commands')) {
            if (await Filesys.lstatSync('./commands/' + file.toString()).isDirectory()) continue;
            const req = require(`../commands/${file.toString()}`);
            commandImpls.push(req);
        }

        let watermark = 'gelt.shop  | ' + Moment().format(' MM/DD/YYYY');

        if (rawArgs.length === 0) {
            const _embed = new Discord.MessageEmbed()
                .setTitle('Command List')
                .setColor('#6acefd')
                .setFooter(watermark)

            for (const command of commandImpls)
                _embed.addField(
                    Config.prefix + command.command,
                    command.desc,
                    false);

            message.channel.send({embed: _embed})
        } else {
            const filteredCommands = commandImpls.filter(cmd => cmd.command === rawArgs[0] || cmd.alias.includes(rawArgs[0]));


            //command u entered was not found nigger.
            if (filteredCommands.length === 0) {
                const _embed = new Discord.MessageEmbed()
                    .setColor('#ff4a4a')
                    .setDescription(`Command '${rawArgs[0]}' was not found.`)
                    .setFooter(watermark)

                message.channel.send(_embed);
                return
            }
            //Command Aliases
            const embed = new Discord.MessageEmbed()
                .setTitle(`Command ${rawArgs[0]}`)
                .setColor('#6acefd')
                .setFooter(watermark)

            for (const cmd of filteredCommands)
                embed.addField(
                    Config.prefix + cmd.command,
                    cmd.desc + (cmd.alias.length !== 0 ? ' Aliases are: ' + cmd.alias.join(', ') : ''),
                    false);

            message.channel.send({embed});
        }
    }
}


