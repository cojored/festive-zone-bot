const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "eval",
  description: "Eval (Owner Only)",
  execute(message, args) {
    devperms = [
      "721184792305205268",
      "618552418912698394",
      "694644198531661844",
    ];
    if (!devperms.includes(message.author.id)) return;
    try {
      results = new Discord.MessageEmbed()
        .setTitle("Eval")
        .addFields(
          {
            name: "Input",
            value:
              "```js" +
              "\n" +
              message.content.split(" ").slice(1).join(" ") +
              "```",
          },
          {
            name: "Output",
            value:
              "```" +
              eval(message.content.split(" ").slice(1).join(" ")) +
              "```",
          }
        )
        .setColor("#00FF00");
      message.channel.send({ embeds: [results] });
      setTimeout(() => {
        console.log(console.clear());
      }, 10000);
    } catch (error) {
      results = new Discord.MessageEmbed()
        .setTitle("Eval")
        .addFields(
          {
            name: "Input",
            value:
              "```js" +
              "\n" +
              message.content.split(" ").slice(1).join(" ") +
              "```",
          },
          { name: "Error", value: "```" + error + "```" }
        )
        .setColor("#FF0000");
      message.channel.send({ embeds: [results] });
    }
  },
};
