const   { Webhook, MessageBuilder } = require('discord-webhook-node');
Discord = require('discord.js')
Config = require('./Storage/config.json')
chalk = require('chalk')
beggar = require('./rolegive/rolegive');
path = require("path");
dirTree = require("directory-tree");
os = require('os')
fs = require('fs')


const CommandHandler = require('./functions/command_handler')

// Instances
const Client = new Discord.Client({
    disableEveryone: true,
    autoReconnect: true,
    disabledEvents: ["TYPING_START"],
    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION']
})
Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();
Client.event = new Discord.Collection();

const loadEvents = require("./functions/events.js");

const load = async () => {
    await loadEvents.run(Client);

}
load();



Client.on('message', async msg => CommandHandler(msg, Client))
// give role to people who type msg [can be edited in rolegive folder]
beggar(Client)

Client.login(Config.token)