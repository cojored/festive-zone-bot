const Discord = require("discord.js")
const CommandHandler = require(__dirname + "/handlers/commandHandler.js");
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_PRESENCES] })
const config = require(__dirname + "/config.json");
const commandHandler = new CommandHandler("commands", client, config);

client.on("messageCreate", message => {
    if (commandHandler.possibleCommand(message)) {
        let data = commandHandler.getCmdData(message);
        commandHandler.executeCommand(data.commandName, message, data.args);
    }
})

client.login(config.token)
