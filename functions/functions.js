const Discord = require("discord.js");
const Filesys = require("fs");
const color = JSON.parse(Filesys.readFileSync(`Storage/color.json`, `utf8`));

module.exports = {

    loadCommands: function(Client, dirname) {
        Filesys.readdir(dirname, (err, files) => {
            if(err) console.error(err);
            var jsFiles = files.filter(f => f.split(".").pop() === "js");
            if(jsFiles.length <= 0){
                console.log(`No command to load in the folder : ${dirname.replace(/.\/commands\//gi, "")}`);
                return;
            }

            console.log("");
            console.log(`Commands ${dirname.replace(/.\/commands\//gi, "")}`);
            console.log("");
            jsFiles.forEach((f, i) => {
                delete require.cache[require.resolve(`${dirname}${f}`)];
                var props = require(`${dirname}${f}`);
                console.log(`${i + 1}: ${f} Loaded`);
                Client.commands.set(props.help.name, props);

                if(props.help.aliases) for (const alias of props.help.aliases){
                    Client.aliases.set(alias, props);
                }
            })
        })
    },

    // =================================== EMBED SUCCESS & ERROR =================================== //

    errorEmbed: function(message, channel, argument) {
        channel.send(new Discord.MessageEmbed().setDescription(`\\ **Error:** ${argument} \\ `).setColor(color.red))
    },

    successEmbed: function(message, channel, argument) {
        channel.send(new Discord.MessageEmbed().setDescription(`\\ **Success:** ${argument}`).setColor(color.green))
    },

}






