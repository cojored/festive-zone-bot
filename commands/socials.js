const Discord = require("discord.js");
const db = require("quick.db")
module.exports = {
  name: "socials",
  description: "Socials",
  execute(message, args) {
    let embed = new Discord.MessageEmbed();
    embed.setTitle("Socials");
    embed.addField(
      "Youtube",
      "https://www.youtube.com/channel/UCsAs-VdhPqMINT0ueu_TVaQ"
    );
    embed.setColor(db.get("embedColor"));
    if (db.get("embedColor") === "#FF0000") {
      db.set("embedColor", "#00FF00");
    } else {
      db.set("embedColor", "#FF0000");
    }
    message.channel.send({ embeds: [embed] });
  },
};
