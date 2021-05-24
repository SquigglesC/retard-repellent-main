const Discord = require('discord.js');
const functions = require("../functions/functions.js");
const Moment = require('moment');
const db = require('quick.db');
const fs = require('fs');
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`))
const fetchAll = require('discord-fetch-all');
const { MessageAttachment } = require("discord.js")

module.exports = async (Client, reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    let message = reaction.message;
    if(!message) return;
    if(user.bot) return;

    let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));

    let already = new Discord.MessageEmbed()
        .setColor(color.red)
        .setDescription(`**Error**\nyou already have a open ticket.`);

    let success = new Discord.MessageEmbed()
        .setColor(color.yellow)
        .setDescription(`**support request**\nplease wait, our support will be with you shortly`)
        .setFooter('squiggles.cc | fuck ticket tool | ' + Moment().format(' MM/DD/YYYY'), user.displayAvatarURL());

    let split = '';
    let usr = user.id.split(split);
    for (var i = 0; i < usr.length; i++) usr[i] = usr[i].trim();

    if(message.embeds.length === 1 && message.embeds[0].description === `**Open Ticket**\nreact with  📩  to open a ticket`){
        if(reaction.emoji.name === "📩"){
            if(!message.guild.channels.cache.find(c => c.name === `ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`)){

                let role = message.guild.roles.cache.find(r => r.name === "Ticket Support");
                if(!role) {
                    message.guild.roles.create({data:{name: "Ticket Support", permissions: 0}, reason: 'role needed to see the tickets.'});
                    message.channel.send(`ticket support role needed..`).then(m => m.delete({timeout: 5000}).catch(e => {}));
                    reaction.users.remove(user.id);
                    return
                }
                let category = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");
                if(!category) category = await message.guild.channels.create("tickets", {type: "category", position: 1}).catch(e => {return functions.errorEmbed(message, message.channel, "Une erreur a été rencontrée.")});

                let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

                message.guild.channels.create(`ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, { permissionOverwrites:[
                        {
                            deny: 'VIEW_CHANNEL',
                            id: message.guild.id
                        },
                        {
                            allow: permsToHave,
                            id: user.id
                        },
                        {
                            allow: permsToHave,
                            id: role.id
                        },
                    ],
                    parent: category.id,
                    reason: `user needs assistance.`,
                    topic: `**ID:** ${user.id} | **Tag:** ${user.tag} | '>close' to close your ticket or react with the '🔒'`
                }).then(channel => {

                    let createdEmbed = new Discord.MessageEmbed()
                        .setTimestamp()
                        .setColor(color.yellow)
                        .setFooter('squiggles.cc | fuck ticket tool | ' + Moment().format(' MM/DD/YYYY'), Client.user.displayAvatarURL())
                        .setDescription(`**Open Ticket**\nuser opened a ticket and is waiting for request to be processed.`)
                        .addField(`Information`, `**User :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** ${channel}\n**Date :** \`${Moment().format('MM/DD/YYYY - h:mm')}\``);

                    if(logsChannel) logsChannel.send(createdEmbed);
                    channel.send(`${user}`, {embed: success}, db.set(`ticket.ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, { user: user.id })).then(m => {
                        m.react('🔒');
                    });
                })

                reaction.users.remove(user.id);
                return;
            } else {
                reaction.users.remove(user.id);
                user.send({embed: already}).then(m => m.delete({timeout: 10000}).catch(e => {}));
            }
        } else {
            reaction.users.remove(user.id);
        }
    }

    // ========================= //

    if(message.embeds.length === 1 && message.embeds[0].description === `**support request**\nplease wait, our support will be with you shortly`) {
        if (reaction.emoji.name === "🔒") {
            if (user.id === db.get(`ticket.${message.channel.name}.user`)) {

                let msgs = await fetchAll.messages(reaction.message.channel, {
                    reverseArray: true
                })
                const content = msgs.map(m => `${m.author.tag} - ${m.content}`)
                fs.writeFileSync(`${user.username}-transcript.txt`, content.join(`\n`, error => {
                    if(error) throw error
                }))



                let userEmbed = new Discord.MessageEmbed()
                    .setColor(color.red)
                    .setDescription(`**closed ticket**\nmember has closed a ticket`)
                    .setTimestamp()
                    .setFooter('squiggles.cc | fuck ticket tool | ' + Moment().format(' MM/DD/YYYY'), Client.user.displayAvatarURL())
                    .addField(`Information`, `**User :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${Moment().format('MM/DD/YYYY - h:mm')}\``);

                if(logsChannel) await logsChannel.send(userEmbed);
                logsChannel.send(new MessageAttachment(`${user.username}-transcript.txt`, `${user.username}-transcript.txt`))
                message.channel.delete();


            }
        }

    }
}