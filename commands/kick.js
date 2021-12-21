const Discord = require("discord.js");
module.exports = {
  name: "kick",
  description: "Kicks a member",
  execute(message, args) {
    //kick logic

    if (!message.mentions.members.first() && !message.mentions.users.first())
      return message.reply({
        embeds: [
          {
            title: "You did not mention a member",
            color: db.get("embedColor"),
          },
        ],
      });
    if (
      !message.member.permissions.has("KICK_MEMBERS") ||
      message.member.roles.highest.position <=
        message.mentions.members.first().roles.highest.position
    )
      return message.reply({
        embeds: [
          {
            title: "You do not have permission to do this",
            color: db.get("embedColor"),
          },
        ],
      });
    if (message.author.id === message.mentions.users.first().id)
      return message.reply({
        embeds: [
          {
            title: "You do not have permission to do this",
            color: db.get("embedColor"),
          },
        ],
      });
    if (message.mentions.members.first().kickable === false)
      return message.reply({
        embeds: [
          {
            title: "I cannot kick that user",
            color: db.get("embedColor"),
          },
        ],
      });

    //confirm?

    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setCustomId("kick")
        .setLabel("Kick " + message.mentions.users.first().username)
        .setStyle("DANGER"),
      new Discord.MessageButton()
        .setCustomId("cancel")
        .setLabel("Cancel")
        .setStyle("SECONDARY")
    );

    message.reply({
      content:
        "Are you sure you want to kick `" +
        message.mentions.users.first().username +
        "`",
      components: [row],
    });

    const filter = (i) =>
      i.customId === "kick" ||
      (i.customId === "cancel" && i.user.id === message.author.id);

    let collector = message.channel.createMessageComponentCollector({
      filter,
      time: 30000,
    });

    //kick and send reply
    collector.on("collect", async (i) => {
      if (i.customId === "kick") {
        await i.message.edit({
          embeds: [
            {
              title: "Kicking...",
              description: message.mentions.members.first().tag,
              color: db.get("embedColor"),
            },
          ],
          components: [],
        });
        message.mentions.members.first().kick();
        await i.message.edit({
          embeds: [
            {
              title: "Kicked",
              description: message.mentions.members.first().tag,
              color: db.get("embedColor"),
            },
          ],
        });
        if (db.get("embedColor") === "#FF0000") {
          db.set("embedColor", "#00FF00");
        } else {
          db.set("embedColor", "#FF0000");
        }
      } else if (i.customId === "cancel") {
        await i.update({ content: "Canceled", components: [] });
      }
    });
  },
};
