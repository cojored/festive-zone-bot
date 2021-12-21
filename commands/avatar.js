const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "avatar",
  description: "Sends a users Avatar",
  execute(message, args) {
    let embed = new Discord.MessageEmbed();
    let user = message.mentions.users.first() || message.author;
    embed.setTitle(user.tag + "'s Avatar");
    embed.setDescription(
      `[PNG](${user.avatarURL({
        dynamic: true,
        format: "png",
      })})\n[JPG](${user.avatarURL({ dynamic: true, format: "jpg" })})`
    );
    embed.setImage(user.avatarURL({ dynamic: true }));
    embed.setColor(db.get("embedColor"));
    if (db.get("embedColor") === "#FF0000") {
      db.set("embedColor", "#00FF00");
    } else {
      db.set("embedColor", "#FF0000");
    }
    message.channel.send({ embeds: [embed] });
  },
};
