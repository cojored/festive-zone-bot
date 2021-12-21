const Discord = require("discord.js");
const CommandHandler = require(__dirname + "/handlers/commandHandler.js");
const client = new Discord.Client({
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    Discord.Intents.FLAGS.GUILD_BANS,
    Discord.Intents.FLAGS.GUILD_PRESENCES,
  ],
});
const config = require(__dirname + "/config.json");
const commandHandler = new CommandHandler("commands", client, config);
const db = require("quick.db");

client.on("messageCreate", (message) => {
  if (commandHandler.possibleCommand(message)) {
    let data = commandHandler.getCmdData(message);
    commandHandler.executeCommand(data.commandName, message, data.args);
  }
});

/*client.on("guildMemberAdd", (member) => {
  let MemberAdd = new Discord.MessageEmbed();
  MemberAdd.setTitle("Welcome " + member.user.tag);
  MemberAdd.setImage(member.avatarURL({ dynamic: true }));
  MemberAdd.setDescription(
    "Welcome to our server " + member.user.username + " enjoy your stay!"
  );
  MemberAdd.setColor(db.get("embedColor"));
  if (db.get("embedColor") === "#FF0000") {
    db.set("embedColor", "#00FF00");
  } else {
`    db.set("embedColor", "#FF0000");
`  }
  member.guild.channels.cache
    .get(db.get("welcome"))
    .send({ embeds: [MemberAdd] });
});

client.on("guildMemberRemove", (member) => {
  let MemberRemove = new Discord.MessageEmbed();
  MemberRemove.setTitle("Bye " + member.user.tag);
  MemberRemove.setImage(member.avatarURL({ dynamic: true }));
  MemberRemove.setDescription("Sad to see you go :(");
  MemberRemove.setColor(db.get("embedColor"));
  if (db.get("embedColor") === "#FF0000") {
    db.set("embedColor", "#00FF00");
  } else {
    db.set("embedColor", "#FF0000");
  }
  member.guild.channels.cache
    .get(db.get("welcome"))
    .send({ embeds: [MemberRemove] });
});*/

client.login(config.token);
