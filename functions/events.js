const { readdirSync } = require("fs");
const { join } = require("path");
const eventDir = join(__dirname, "..", "events");

module.exports.run = (Client) => {

    const eventFiles = readdirSync(eventDir);

    for(const eventFile of eventFiles) {
        const event = require(`${eventDir}/${eventFile}`);
        const eventName = eventFile.split(".").shift();
        Client.on(eventName, event.bind(null, Client));
        delete require.cache[require.resolve(`${eventDir}/${eventFile}`)];
    }
    Client.events = eventFiles.length;
    console.log(`Loaded ${eventFiles.length} events !`);
}