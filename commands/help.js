const Discord = require("discord.js");
module.exports = {
  name: "Help",
  description: "Help Command",
  execute(message, args) {
    let embed = new Discord.MessageEmbed();
    embed.setTitle("Help");
    embed.setColor(db.get("embedColor"));
    if (db.get("embedColor") === "#FF0000") {
      db.set("embedColor", "#00FF00");
    } else {
      db.set("embedColor", "#FF0000");
    }
    for (command in message.client.commands) {
      embed.addField("!" + command.name, command.description);
    }
    message.channel.send({ embeds: [embed] });
  },
};
