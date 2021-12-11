const Discord = require("discord.js");
class CommandHandler {
	constructor(folderName, client, config) {
		this.prefix = config.prefix;
		this.ownerID = config.ownerID;
		this.client = client;
		const fs = require("fs");

		client.commands = new Discord.Collection();

		const commandFiles = fs
			.readdirSync(__dirname + "/../" + folderName)
			.filter((file) => file.endsWith(".js"));
		for (const file of commandFiles) {
			const command = require(`${__dirname + "/../" + folderName}/${file}`);
			client.commands.set(command.name, command);
		}
	}
	possibleCommand(msge) {
		let msg = msge.content;
		if (msg.startsWith(this.prefix)) return true;
		return false;
	}
	getCmdData(msge) {
		let msg = msge.content;
		const args = msg.slice(this.prefix.length).trim().split(/ +/);
		const command = args.shift().toLowerCase();
		return {args: args, commandName: command};
	}
	executeCommand(name, msg, args) {
		let cmd = this.client.commands.get(name);
		if (!cmd) return;
		try {
			cmd.execute(msg, args);
		} catch (error) {
			msg.channel.send("Error ```" + error + "```");
		}
	}
}

module.exports = CommandHandler;
